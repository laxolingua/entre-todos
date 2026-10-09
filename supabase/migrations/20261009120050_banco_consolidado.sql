-- ENTRE TODOS · Banco ciudadano: propuestas consolidadas
-- Dos niveles:
--   * Archivo documental (banco.propuesta): las 760 entradas literales, con autoría y fuente. Nunca se reescriben.
--   * Banco ciudadano (banco.consolidada): una propuesta por idea, redactada respetando el lenguaje de las
--     fuentes, con todas sus referencias, incisos (elementos adicionales, cada uno con su fuente) y variantes
--     (diferencias de procedimiento). Es lo que la ciudadanía lee, valora y comenta.
-- Las alternativas incompatibles no se fusionan: se presentan como propuestas separadas y se agrupan en cuestiones.

create table banco.consolidada (
  id              text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  ambito          text not null default 'CU' references banco.ambito(codigo),
  categoria_clave text not null references banco.categoria(clave),
  titulo          text not null check (length(btrim(titulo)) > 0),
  texto           text not null check (length(btrim(texto)) > 0),
  nota            text,
  orden           int not null default 1000,
  estado          text not null default 'publicada' check (estado in ('publicada','en_revision','retirada')),
  version         int not null default 1,
  creado_en       timestamptz not null default now(),
  actualizado_en  timestamptz not null default now(),
  busqueda        tsvector generated always as (
                    setweight(to_tsvector('banco.es'::regconfig, coalesce(titulo, '')), 'A') ||
                    setweight(to_tsvector('banco.es'::regconfig, coalesce(texto, '')), 'B') ||
                    setweight(to_tsvector('banco.es'::regconfig, coalesce(nota, '')), 'C')
                  ) stored
);
comment on table banco.consolidada is 'Propuesta del banco ciudadano: reúne las entradas documentales que dicen lo mismo. Redacción editorial que respeta el lenguaje de las fuentes.';
create index consolidada_busqueda_idx on banco.consolidada using gin (busqueda);
create index consolidada_categoria_idx on banco.consolidada (categoria_clave);

create table banco.consolidada_inciso (
  id             bigint generated always as identity primary key,
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  tipo           text not null check (tipo in ('inciso','variante')),
  orden          smallint not null,
  texto          text not null check (length(btrim(texto)) > 0),
  fuentes        text[] not null default '{}',
  unique (consolidada_id, tipo, orden)
);
comment on table banco.consolidada_inciso is 'inciso = elemento adicional compatible; variante = diferencia de procedimiento entre fuentes. Cada uno conserva sus propias fuentes.';

create table banco.consolidada_entrada (
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  propuesta_id   text not null references banco.propuesta(id) on delete cascade,
  rol            text not null check (rol in ('respaldo','inciso','variante','diagnostico')),
  primary key (consolidada_id, propuesta_id, rol)
);
comment on column banco.consolidada_entrada.rol is 'respaldo = la entrada formula la idea central; diagnostico = crítica del sistema actual que la sustenta.';
create index consolidada_entrada_prop_idx on banco.consolidada_entrada (propuesta_id);

create table banco.cuestion (
  id          text primary key check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  pregunta    text not null,
  texto       text,
  excluyentes boolean not null default false,
  orden       int not null default 100
);
comment on table banco.cuestion is 'Asunto en el que las fuentes proponen soluciones distintas. excluyentes = las opciones son incompatibles entre sí.';

create table banco.cuestion_opcion (
  cuestion_id    text not null references banco.cuestion(id) on delete cascade,
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  orden          smallint not null default 0,
  primary key (cuestion_id, consolidada_id)
);

create table banco.buena_practica (
  id             bigint generated always as identity primary key,
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  pais           text not null,
  titulo         text not null,
  descripcion    text not null,
  fuente_nombre  text not null,
  fuente_url     text not null check (fuente_url ~ '^https?://'),
  verificada     boolean not null default false,
  verificada_por text,
  creado_en      timestamptz not null default now()
);
comment on table banco.buena_practica is 'Cómo resuelven el mismo asunto otras democracias. Solo se publica cuando está verificada contra su fuente.';
create index buena_practica_consolidada_idx on banco.buena_practica (consolidada_id) where verificada;

create table banco.consolidada_version (
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  version        int not null,
  anterior       jsonb not null,
  motivo         text,
  cambiado_en    timestamptz not null default now(),
  primary key (consolidada_id, version)
);

create function banco.registrar_version_consolidada() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (old.titulo, old.texto, old.nota, old.categoria_clave, old.estado)
     is not distinct from (new.titulo, new.texto, new.nota, new.categoria_clave, new.estado) then
    return new;
  end if;
  insert into banco.consolidada_version (consolidada_id, version, anterior, motivo)
  values (old.id, old.version, to_jsonb(old) - 'busqueda', nullif(current_setting('banco.motivo_cambio', true), ''));
  new.version := old.version + 1;
  new.actualizado_en := now();
  return new;
end $$;

create trigger consolidada_historial
  before update on banco.consolidada
  for each row execute function banco.registrar_version_consolidada();

-- ---------------------------------------------------------------- permisos

alter table banco.consolidada          enable row level security;
alter table banco.consolidada_inciso   enable row level security;
alter table banco.consolidada_entrada  enable row level security;
alter table banco.cuestion             enable row level security;
alter table banco.cuestion_opcion      enable row level security;
alter table banco.buena_practica       enable row level security;
alter table banco.consolidada_version  enable row level security;

create policy lectura_publica on banco.consolidada for select to anon, authenticated using (estado = 'publicada');
create policy lectura_publica on banco.consolidada_inciso for select to anon, authenticated
  using (exists (select 1 from banco.consolidada c where c.id = consolidada_id and c.estado = 'publicada'));
create policy lectura_publica on banco.consolidada_entrada for select to anon, authenticated
  using (exists (select 1 from banco.consolidada c where c.id = consolidada_id and c.estado = 'publicada'));
create policy lectura_publica on banco.cuestion for select to anon, authenticated using (true);
create policy lectura_publica on banco.cuestion_opcion for select to anon, authenticated
  using (exists (select 1 from banco.consolidada c where c.id = consolidada_id and c.estado = 'publicada'));
create policy lectura_publica on banco.buena_practica for select to anon, authenticated using (verificada);
create policy lectura_publica on banco.consolidada_version for select to anon, authenticated
  using (exists (select 1 from banco.consolidada c where c.id = consolidada_id and c.estado = 'publicada'));

grant select on banco.consolidada, banco.consolidada_inciso, banco.consolidada_entrada, banco.cuestion,
                banco.cuestion_opcion, banco.buena_practica, banco.consolidada_version to anon, authenticated;
revoke insert, update, delete, truncate on banco.consolidada, banco.consolidada_inciso, banco.consolidada_entrada,
       banco.cuestion, banco.cuestion_opcion, banco.buena_practica, banco.consolidada_version from anon, authenticated;

-- ---------------------------------------------------------------- API pública

create view public.banco_consolidadas with (security_invoker = true) as
select c.id, c.ambito, c.categoria_clave as categoria, c.titulo, c.texto, c.nota, c.orden, c.version, c.actualizado_en,
       (select count(distinct e.propuesta_id) from banco.consolidada_entrada e
          join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
        where e.consolidada_id = c.id) as entradas,
       (select count(distinct p.fuente_ref) from banco.consolidada_entrada e
          join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
        where e.consolidada_id = c.id) as fuentes,
       array(select distinct coalesce(a.nombre, f.autor_texto)
               from banco.consolidada_entrada e
               join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
               join banco.fuente f on f.ref = p.fuente_ref
               left join banco.actor a on a.id = f.actor_id
              where e.consolidada_id = c.id and e.rol <> 'diagnostico') as autorias,
       array(select e.propuesta_id from banco.consolidada_entrada e
              where e.consolidada_id = c.id and e.rol = 'respaldo' order by e.propuesta_id) as respaldo,
       coalesce((select jsonb_agg(jsonb_build_object('letra', chr(96 + i.orden), 'texto', i.texto, 'fuentes', i.fuentes) order by i.orden)
                   from banco.consolidada_inciso i where i.consolidada_id = c.id and i.tipo = 'inciso'), '[]'::jsonb) as incisos,
       coalesce((select jsonb_agg(jsonb_build_object('texto', i.texto, 'fuentes', i.fuentes) order by i.orden)
                   from banco.consolidada_inciso i where i.consolidada_id = c.id and i.tipo = 'variante'), '[]'::jsonb) as variantes,
       array(select e.propuesta_id from banco.consolidada_entrada e
              where e.consolidada_id = c.id and e.rol = 'diagnostico' order by e.propuesta_id) as diagnostico,
       array(select o.cuestion_id from banco.cuestion_opcion o where o.consolidada_id = c.id order by o.cuestion_id) as cuestiones,
       (select count(*) from banco.buena_practica b where b.consolidada_id = c.id and b.verificada) as buenas_practicas
from banco.consolidada c
where c.estado = 'publicada';

-- Citas que sustentan cada propuesta consolidada, con su papel.
create view public.banco_consolidada_fuentes with (security_invoker = true) as
select e.consolidada_id, e.rol, v.*
from banco.consolidada_entrada e
join public.banco_propuestas v on v.id = e.propuesta_id;

create view public.banco_cuestiones with (security_invoker = true) as
select q.id, q.pregunta, q.texto, q.excluyentes, q.orden,
       array(select o.consolidada_id from banco.cuestion_opcion o
               join banco.consolidada c on c.id = o.consolidada_id and c.estado = 'publicada'
              where o.cuestion_id = q.id order by o.orden) as opciones
from banco.cuestion q;

create view public.banco_buenas_practicas with (security_invoker = true) as
select b.id, b.consolidada_id, b.pais, b.titulo, b.descripcion, b.fuente_nombre, b.fuente_url
from banco.buena_practica b where b.verificada;

create view public.banco_consolidada_historial with (security_invoker = true) as
select v.consolidada_id, v.version, v.anterior, v.motivo, v.cambiado_en from banco.consolidada_version v;

-- La vista del archivo documental indica en qué propuestas consolidadas está cada entrada.
create or replace view public.banco_propuestas with (security_invoker = true) as
select p.id, p.ambito, p.titular, p.cita, p.localizacion, p.resumen, p.tema_fino,
       (select tp.tema_slug from banco.tema_propuesta tp
         where tp.propuesta_id = p.id order by tp.tema_slug limit 1) as tema,
       array(select pc.categoria_clave from banco.propuesta_categoria pc
             where pc.propuesta_id = p.id order by pc.orden) as categorias,
       p.anio, p.fecha_texto, p.estado_cita, p.forma_cita, p.tipo, p.origen, p.version, p.actualizado_en,
       f.ref as fuente_ref, f.documento as fuente_documento, f.url as fuente_url, f.tipo as fuente_tipo,
       a.id as actor_id, a.nombre as actor_nombre,
       coalesce(a.nombre, f.autor_texto) as autoria,
       f.atribucion_verificada, f.metodo_verificacion,
       array(select distinct e.consolidada_id from banco.consolidada_entrada e
              where e.propuesta_id = p.id order by e.consolidada_id) as consolidadas
from banco.propuesta p
join banco.fuente f on f.ref = p.fuente_ref
left join banco.actor a on a.id = f.actor_id
where p.estado = 'publicada';

grant select on public.banco_consolidadas, public.banco_consolidada_fuentes, public.banco_cuestiones,
                public.banco_buenas_practicas, public.banco_consolidada_historial to anon, authenticated;
revoke insert, update, delete, truncate on public.banco_consolidadas, public.banco_consolidada_fuentes,
       public.banco_cuestiones, public.banco_buenas_practicas, public.banco_consolidada_historial,
       public.banco_propuestas from anon, authenticated;

-- Búsqueda en el banco ciudadano: el texto consolidado y también las citas que lo sustentan.
create function public.banco_buscar_consolidadas(q text default '', p_categoria text default null, p_limite int default 50)
returns setof public.banco_consolidadas
language sql stable security invoker set search_path = '' as $$
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
grant execute on function public.banco_buscar_consolidadas(text, text, int) to anon, authenticated;
