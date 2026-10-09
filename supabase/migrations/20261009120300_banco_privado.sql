-- El banco es el back end privado de ENTRE TODOS.
-- Las citas, su localización, la clasificación, los temas, las exclusiones y la verificación no se sirven
-- por la API pública. Con la clave pública (anon) y con cuentas normales solo se leen las propuestas
-- combinadas, sus incisos y variantes, las cuestiones, los actores y los documentos (título, autoría, año
-- y enlace al original).
-- El equipo consulta el banco completo desde el panel de Supabase (rol postgres o service role).
-- Importante: el esquema "banco" no debe añadirse nunca a los esquemas expuestos de la API.

-- ---------------------------------------------------------------- fuera de la API: vistas del archivo
drop function if exists public.banco_buscar_consolidadas(text, text, int);
drop function if exists public.banco_buscar(text, text, int);
drop view if exists public.cep_preocupacion_propuestas;
drop view if exists public.banco_consolidada_fuentes;
drop view if exists public.banco_consolidadas;
drop view if exists public.banco_propuestas;
drop view if exists public.banco_fuentes;
drop view if exists public.banco_temas;
drop view if exists public.banco_no_propuestas;
drop view if exists public.banco_historial;

-- ---------------------------------------------------------------- permisos sobre las tablas del banco
-- Sin lectura del archivo para anon ni authenticated.
revoke select on banco.propuesta, banco.propuesta_categoria, banco.tema, banco.tema_propuesta,
       banco.no_propuesta, banco.propuesta_version, banco.fuente
  from anon, authenticated;
-- Las vistas públicas (security_invoker) necesitan unas pocas columnas para saber qué documento
-- respalda qué propuesta. Ni la cita, ni la localización, ni la clasificación.
grant select (id, fuente_ref, anio, estado) on banco.propuesta to anon, authenticated;
grant select (ref, documento, url, tipo, actor_id, autor_texto) on banco.fuente to anon, authenticated;

-- ---------------------------------------------------------------- documentos de un conjunto de citas
-- Devuelve los documentos (fuente_ref) en el orden en que aparecen, sin repetir.
create function banco.documentos_de(ids text[])
returns int[]
language sql stable security invoker set search_path = '' as $$
  select coalesce(array_agg(s.fuente_ref order by s.pos), '{}')
  from (select p.fuente_ref, min(x.n) as pos
          from unnest(ids) with ordinality as x(id, n)
          join banco.propuesta p on p.id = x.id and p.estado = 'publicada'
         group by p.fuente_ref) s;
$$;
grant execute on function banco.documentos_de(text[]) to anon, authenticated;

-- ---------------------------------------------------------------- API pública

create view public.banco_documentos with (security_invoker = true) as
select f.ref as id, f.documento as titulo, coalesce(a.nombre, f.autor_texto) as autoria, f.actor_id as actor,
       (select min(p.anio) from banco.propuesta p where p.fuente_ref = f.ref and p.estado = 'publicada') as anio,
       f.url, f.tipo
from banco.fuente f
left join banco.actor a on a.id = f.actor_id
where exists (select 1 from banco.consolidada_entrada e
                join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
                join banco.consolidada c on c.id = e.consolidada_id and c.estado = 'publicada'
               where p.fuente_ref = f.ref);

create view public.banco_consolidadas with (security_invoker = true) as
select c.id, c.ambito, c.categoria_clave as categoria, c.titulo, c.texto, c.nota, c.orden, c.version, c.actualizado_en,
       banco.documentos_de(array(select e.propuesta_id from banco.consolidada_entrada e
                                  where e.consolidada_id = c.id and e.rol = 'respaldo' order by e.propuesta_id)) as documentos,
       coalesce((select jsonb_agg(jsonb_build_object('letra', chr(96 + i.orden), 'texto', i.texto,
                                                     'documentos', to_jsonb(banco.documentos_de(i.fuentes))) order by i.orden)
                   from banco.consolidada_inciso i where i.consolidada_id = c.id and i.tipo = 'inciso'), '[]'::jsonb) as incisos,
       coalesce((select jsonb_agg(jsonb_build_object('texto', i.texto,
                                                     'documentos', to_jsonb(banco.documentos_de(i.fuentes))) order by i.orden)
                   from banco.consolidada_inciso i where i.consolidada_id = c.id and i.tipo = 'variante'), '[]'::jsonb) as variantes,
       banco.documentos_de(array(select e.propuesta_id from banco.consolidada_entrada e
                                  where e.consolidada_id = c.id and e.rol = 'diagnostico' order by e.propuesta_id)) as analizan,
       cardinality(banco.documentos_de(array(select e.propuesta_id from banco.consolidada_entrada e
                                              where e.consolidada_id = c.id))) as total_documentos,
       array(select distinct coalesce(a.nombre, f.autor_texto)
               from banco.consolidada_entrada e
               join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
               join banco.fuente f on f.ref = p.fuente_ref
               left join banco.actor a on a.id = f.actor_id
              where e.consolidada_id = c.id and e.rol <> 'diagnostico') as autorias,
       array(select o.cuestion_id from banco.cuestion_opcion o where o.consolidada_id = c.id order by o.cuestion_id) as cuestiones,
       (select count(*) from banco.buena_practica b where b.consolidada_id = c.id and b.verificada) as buenas_practicas
from banco.consolidada c
where c.estado = 'publicada';

-- Qué documentos respaldan cada propuesta y con qué papel (idea central, inciso, variante o análisis).
create view public.banco_consolidada_documentos with (security_invoker = true) as
select distinct e.consolidada_id, p.fuente_ref as documento_id, e.rol as papel
from banco.consolidada_entrada e
join banco.consolidada c on c.id = e.consolidada_id and c.estado = 'publicada'
join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada';

-- Categorías y actores cuentan propuestas combinadas, no citas del archivo.
create or replace view public.banco_categorias with (security_invoker = true) as
select c.clave, c.nombre, c.fase, c.descripcion, c.declarada, c.orden,
       (select count(*) from banco.consolidada x where x.categoria_clave = c.clave and x.estado = 'publicada') as propuestas
from banco.categoria c;

create or replace view public.banco_actores with (security_invoker = true) as
select a.id, a.nombre, a.tipo, a.web, a.verificado,
       (select count(*) from banco.fuente f where f.actor_id = a.id) as documentos,
       (select count(distinct e.consolidada_id)
          from banco.consolidada_entrada e
          join banco.consolidada c on c.id = e.consolidada_id and c.estado = 'publicada'
          join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
          join banco.fuente f on f.ref = p.fuente_ref
         where f.actor_id = a.id and e.rol <> 'diagnostico') as propuestas
from banco.actor a;

create view public.cep_preocupacion_propuestas with (security_invoker = true) as
select pp.preocupacion_slug, pp.relevancia, pp.nota as nota_enlace, pp.revisado, v.*
from banco.preocupacion_propuesta pp
join public.banco_consolidadas v on v.id = pp.consolidada_id;

grant select on public.banco_documentos, public.banco_consolidadas, public.banco_consolidada_documentos,
                public.cep_preocupacion_propuestas to anon, authenticated;
revoke insert, update, delete, truncate on public.banco_documentos, public.banco_consolidadas,
       public.banco_consolidada_documentos, public.cep_preocupacion_propuestas from anon, authenticated;

-- Búsqueda en las propuestas. También busca en las citas que las sustentan, pero solo devuelve
-- propuestas: por eso corre con los permisos de su dueño, sin abrir las citas a quien consulta.
create function public.banco_buscar_consolidadas(q text default '', p_categoria text default null, p_limite int default 50)
returns setof public.banco_consolidadas
language sql stable security definer set search_path = '' as $$
  with consulta as (select websearch_to_tsquery('banco.es'::regconfig, coalesce(q, '')) as t)
  select v.*
  from public.banco_consolidadas v
  join banco.consolidada c on c.id = v.id
  cross join consulta
  where (p_categoria is null or v.categoria = p_categoria)
    and (coalesce(btrim(q), '') = ''
         or c.busqueda @@ consulta.t
         or exists (select 1 from banco.consolidada_entrada e
                      join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
                     where e.consolidada_id = c.id and p.busqueda @@ consulta.t))
  order by case when coalesce(btrim(q), '') = '' then 0 else ts_rank(c.busqueda, consulta.t) end desc, v.orden
  limit least(greatest(coalesce(p_limite, 50), 1), 200);
$$;
revoke all on function public.banco_buscar_consolidadas(text, text, int) from public;
grant execute on function public.banco_buscar_consolidadas(text, text, int) to anon, authenticated;
