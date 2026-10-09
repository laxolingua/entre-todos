-- ENTRE TODOS · Módulo socio "¿Cuál es el plan?" (elTOQUE / Más Voces Foundation)
-- El módulo reutiliza el banco de propuestas; no crea una segunda base de datos.
-- Añade tres piezas propias del proyecto presentado por elTOQUE:
--   1. Preocupaciones ciudadanas (clústeres de la Encuesta Cuba 2026) enlazadas a propuestas del banco ciudadano.
--   2. Registro de búsquedas sin resultado, para detectar vacíos programáticos. Sin datos personales.
--   3. Coincidencia entre actores (proponen lo mismo), base del grafo de cercanía.
-- Quién edita: usuarios con app_metadata.rol = 'admin' o 'editor_cep' (equipo de elTOQUE).

create function banco.es_editor_cep() returns boolean
language sql stable set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'rol') in ('admin', 'editor_cep'), false);
$$;

-- ---------------------------------------------------------------- preocupaciones

create table banco.preocupacion (
  slug                 text primary key check (slug ~ '^[a-z0-9-]+$'),
  ambito               text not null default 'CU' references banco.ambito(codigo),
  titulo               text not null,
  descripcion          text,
  origen               text not null default 'encuesta_cuba_2026',
  respuestas_estimadas int check (respuestas_estimadas >= 0),
  orden                int not null default 100,
  publicada            boolean not null default false,
  creado_en            timestamptz not null default now(),
  actualizado_en       timestamptz not null default now()
);
comment on table banco.preocupacion is 'Preocupación ciudadana agregada (clúster de respuestas abiertas). Nunca guarda respuestas individuales.';

create table banco.preocupacion_propuesta (
  preocupacion_slug text not null references banco.preocupacion(slug) on delete cascade,
  consolidada_id    text not null references banco.consolidada(id) on delete cascade,
  relevancia        smallint not null default 2 check (relevancia between 1 and 3),
  nota              text,
  revisado          boolean not null default false,
  creado_en         timestamptz not null default now(),
  primary key (preocupacion_slug, consolidada_id)
);
comment on column banco.preocupacion_propuesta.relevancia is '3 = responde directamente; 2 = responde en parte; 1 = relacionada.';
create index preocupacion_propuesta_cons_idx on banco.preocupacion_propuesta (consolidada_id);

alter table banco.preocupacion           enable row level security;
alter table banco.preocupacion_propuesta enable row level security;

create policy lectura_publica on banco.preocupacion for select to anon, authenticated
  using (publicada or banco.es_editor_cep());
create policy edicion on banco.preocupacion for all to authenticated
  using (banco.es_editor_cep()) with check (banco.es_editor_cep());

create policy lectura_publica on banco.preocupacion_propuesta for select to anon, authenticated
  using (banco.es_editor_cep() or exists (select 1 from banco.preocupacion pr
                                          where pr.slug = preocupacion_slug and pr.publicada));
create policy edicion on banco.preocupacion_propuesta for all to authenticated
  using (banco.es_editor_cep()) with check (banco.es_editor_cep());

grant select on banco.preocupacion, banco.preocupacion_propuesta to anon, authenticated;
grant insert, update, delete on banco.preocupacion, banco.preocupacion_propuesta to authenticated;

create view public.cep_preocupaciones with (security_invoker = true) as
select pr.slug, pr.ambito, pr.titulo, pr.descripcion, pr.origen, pr.respuestas_estimadas, pr.orden, pr.publicada,
       (select count(*) from banco.preocupacion_propuesta pp
          join banco.consolidada c on c.id = pp.consolidada_id and c.estado = 'publicada'
        where pp.preocupacion_slug = pr.slug) as propuestas,
       (select count(distinct coalesce(f.actor_id, 'ref-' || f.ref))
          from banco.preocupacion_propuesta pp
          join banco.consolidada c on c.id = pp.consolidada_id and c.estado = 'publicada'
          join banco.consolidada_entrada e on e.consolidada_id = c.id and e.rol <> 'diagnostico'
          join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
          join banco.fuente f on f.ref = p.fuente_ref
        where pp.preocupacion_slug = pr.slug) as autorias
from banco.preocupacion pr;

create view public.cep_preocupacion_propuestas with (security_invoker = true) as
select pp.preocupacion_slug, pp.relevancia, pp.nota as nota_enlace, pp.revisado, v.*
from banco.preocupacion_propuesta pp
join public.banco_consolidadas v on v.id = pp.consolidada_id;

grant select on public.cep_preocupaciones, public.cep_preocupacion_propuestas to anon, authenticated;

-- ---------------------------------------------------------------- vacíos (búsquedas sin resultado)

create table banco.busqueda_sin_resultado (
  dia      date not null default current_date,
  contexto text not null check (contexto in ('banco', 'cep')),
  termino  text not null check (char_length(termino) between 2 and 80),
  veces    int not null default 1,
  primary key (dia, contexto, termino)
);
comment on table banco.busqueda_sin_resultado is 'Conteo diario de términos buscados sin resultado. Sin IP, sesión ni usuario.';

alter table banco.busqueda_sin_resultado enable row level security;
create policy lectura_editores on banco.busqueda_sin_resultado for select to authenticated
  using (banco.es_editor_cep());
revoke all on banco.busqueda_sin_resultado from anon, authenticated;
grant select on banco.busqueda_sin_resultado to authenticated;

create function public.registrar_busqueda_sin_resultado(p_termino text, p_contexto text default 'banco')
returns void
language plpgsql security definer set search_path = '' as $$
declare
  t text := left(regexp_replace(lower(btrim(coalesce(p_termino, ''))), '\s+', ' ', 'g'), 80);
begin
  if char_length(t) < 2 or p_contexto not in ('banco', 'cep') then
    return;  -- se ignora en silencio; no es un error para quien busca
  end if;
  insert into banco.busqueda_sin_resultado (dia, contexto, termino)
  values (current_date, p_contexto, t)
  on conflict (dia, contexto, termino) do update
    set veces = banco.busqueda_sin_resultado.veces + 1;
end $$;
revoke all on function public.registrar_busqueda_sin_resultado(text, text) from public;
grant execute on function public.registrar_busqueda_sin_resultado(text, text) to anon, authenticated;

-- ---------------------------------------------------------------- coincidencia entre actores

-- Dos actores coinciden cuando ambos sostienen la misma propuesta consolidada (en su idea central, un inciso o
-- una variante). Divergen cuando, en una misma cuestión, sostienen opciones distintas.
create view public.banco_coincidencias_actores with (security_invoker = true) as
with autoria as (
  select e.consolidada_id, f.actor_id
  from banco.consolidada_entrada e
  join banco.consolidada c on c.id = e.consolidada_id and c.estado = 'publicada'
  join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
  join banco.fuente f on f.ref = p.fuente_ref
  where f.actor_id is not null and e.rol <> 'diagnostico'
  group by e.consolidada_id, f.actor_id
)
select a1.actor_id as actor_a, a2.actor_id as actor_b,
       count(*) as propuestas_compartidas,
       array_agg(a1.consolidada_id order by a1.consolidada_id) as propuestas
from autoria a1
join autoria a2 on a2.consolidada_id = a1.consolidada_id and a1.actor_id < a2.actor_id
group by a1.actor_id, a2.actor_id;

create view public.banco_divergencias_actores with (security_invoker = true) as
with postura as (
  select o.cuestion_id, o.consolidada_id, f.actor_id
  from banco.cuestion_opcion o
  join banco.consolidada_entrada e on e.consolidada_id = o.consolidada_id and e.rol <> 'diagnostico'
  join banco.propuesta p on p.id = e.propuesta_id and p.estado = 'publicada'
  join banco.fuente f on f.ref = p.fuente_ref
  where f.actor_id is not null
  group by o.cuestion_id, o.consolidada_id, f.actor_id
)
select a1.actor_id as actor_a, a2.actor_id as actor_b, a1.cuestion_id as cuestion,
       a1.consolidada_id as opcion_a, a2.consolidada_id as opcion_b
from postura a1
join postura a2 on a2.cuestion_id = a1.cuestion_id and a1.actor_id < a2.actor_id
               and a1.consolidada_id <> a2.consolidada_id
where not exists (select 1 from postura x where x.cuestion_id = a1.cuestion_id and x.actor_id = a2.actor_id
                    and x.consolidada_id = a1.consolidada_id)
  and not exists (select 1 from postura y where y.cuestion_id = a1.cuestion_id and y.actor_id = a1.actor_id
                    and y.consolidada_id = a2.consolidada_id);

grant select on public.banco_coincidencias_actores, public.banco_divergencias_actores to anon, authenticated;
revoke insert, update, delete, truncate on public.cep_preocupaciones, public.cep_preocupacion_propuestas,
       public.banco_coincidencias_actores, public.banco_divergencias_actores from anon, authenticated;
