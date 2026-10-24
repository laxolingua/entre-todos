-- ENTRE TODOS · Valoración de propuestas publicadas en España (VOTO, nivel de acuerdo 1 a 5).
-- Sesión anónima de Supabase: sin documento de identidad. Se publica como valoración, no como votación verificada.
-- Una valoración por sesión y propuesta; se puede cambiar. Solo se publican totales. Solo añade objetos y filas.

create table banco.propuesta_es (
  id        text primary key check (id ~ '^es-[a-z0-9-]+$'),
  activa    boolean not null default true,
  creado_en timestamptz not null default now()
);
comment on table banco.propuesta_es is 'Identificadores de las propuestas publicadas en /espana/ que se pueden valorar.';
alter table banco.propuesta_es enable row level security;
revoke all on banco.propuesta_es from anon, authenticated;

create table banco.valoracion_es (
  propuesta_id text not null references banco.propuesta_es(id) on delete cascade,
  usuario      uuid not null,
  valor        smallint not null check (valor between 1 and 5),
  creado_en    timestamptz not null default now(),
  primary key (propuesta_id, usuario)
);
alter table banco.valoracion_es enable row level security;
revoke all on banco.valoracion_es from anon, authenticated;

create function public.es_valorar(p_id text, p_valor int)
returns void
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if uid is null then raise exception 'Hace falta sesión para valorar' using errcode = '28000'; end if;
  if p_valor is null or p_valor not between 1 and 5 then raise exception 'Valor no válido' using errcode = '22023'; end if;
  if not exists (select 1 from banco.propuesta_es where id = p_id and activa) then
    raise exception 'Propuesta no disponible' using errcode = 'P0002';
  end if;
  insert into banco.valoracion_es (propuesta_id, usuario, valor) values (p_id, uid, p_valor)
  on conflict (propuesta_id, usuario) do update set valor = excluded.valor, creado_en = now();
end $$;
revoke all on function public.es_valorar(text, int) from public, anon;
grant execute on function public.es_valorar(text, int) to authenticated;

create function public.es_valoraciones_resumen(p_ids text[])
returns table (id text, total bigint, v1 bigint, v2 bigint, v3 bigint, v4 bigint, v5 bigint)
language sql stable security definer set search_path = '' as $$
  select v.propuesta_id, count(*),
         count(*) filter (where valor = 1), count(*) filter (where valor = 2), count(*) filter (where valor = 3),
         count(*) filter (where valor = 4), count(*) filter (where valor = 5)
    from banco.valoracion_es v
   where v.propuesta_id = any (p_ids)
   group by v.propuesta_id;
$$;
revoke all on function public.es_valoraciones_resumen(text[]) from public;
grant execute on function public.es_valoraciones_resumen(text[]) to anon, authenticated;

create function public.es_mis_valoraciones()
returns table (id text, valor smallint)
language sql stable security definer set search_path = '' as $$
  select propuesta_id, valor from banco.valoracion_es where usuario = auth.uid();
$$;
revoke all on function public.es_mis_valoraciones() from public, anon;
grant execute on function public.es_mis_valoraciones() to authenticated;

insert into banco.propuesta_es (id) values
('es-pp-01'),
('es-pp-02'),
('es-pp-03'),
('es-pp-04'),
('es-pp-05'),
('es-pp-06'),
('es-pp-07'),
('es-pp-08'),
('es-pp-09'),
('es-pp-10'),
('es-pp-11'),
('es-pp-12'),
('es-frente-obrero-01'),
('es-frente-obrero-02'),
('es-frente-obrero-03'),
('es-frente-obrero-04'),
('es-frente-obrero-05'),
('es-frente-obrero-06'),
('es-frente-obrero-07'),
('es-frente-obrero-08'),
('es-frente-obrero-09'),
('es-frente-obrero-10'),
('es-iustitia-europa-01'),
('es-iustitia-europa-02'),
('es-iustitia-europa-03'),
('es-iustitia-europa-04'),
('es-iustitia-europa-05'),
('es-iustitia-europa-06'),
('es-escanos-en-blanco-01'),
('es-democracia21-01'),
('es-democracia21-02'),
('es-pacma-01'),
('es-junta-democratica-de-espana-01'),
('es-deliberativa-01'),
('es-decidim-01'),
('es-xnet-01'),
('es-civio-01');
