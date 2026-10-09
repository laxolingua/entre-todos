-- ENTRE TODOS · Banco de propuestas · participación: valoraciones (1 a 5 estrellas), aportes y apoyos
-- Se valora y se comenta el banco ciudadano (banco.consolidada), no las entradas del archivo documental.
-- Reglas:
--   * Votar o aportar exige sesión. La sesión puede ser anónima de Supabase
--     (Authentication > Sign In / Providers > Anonymous sign-ins): da un identificador
--     sin correo, sin teléfono y sin documento de identidad.
--   * Una valoración por persona y propuesta; se puede cambiar.
--   * Nadie lee valoraciones ajenas. Solo se publican agregados.
--   * Los aportes entran como "pendiente" y solo se ven tras moderación.
--   * Los aportes publicados se pueden apoyar (uno por persona); solo se publica el total de apoyos.

-- ---------------------------------------------------------------- valoraciones

create table banco.valoracion (
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  usuario        uuid not null,
  estrellas      smallint not null check (estrellas between 1 and 5),
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  primary key (consolidada_id, usuario)
);
comment on table banco.valoracion is 'Valoración 1-5 por persona y propuesta. Dato sensible (opinión política): nunca se publica individualmente.';
create index valoracion_usuario_idx on banco.valoracion (usuario);

alter table banco.valoracion enable row level security;
create policy propia on banco.valoracion for select to authenticated using (usuario = (select auth.uid()));
revoke all on banco.valoracion from anon, authenticated;
grant select (consolidada_id, estrellas, actualizado_en) on banco.valoracion to authenticated;

create function public.banco_valorar(p_propuesta text, p_estrellas int)
returns void
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Hace falta iniciar sesión para valorar' using errcode = '28000';
  end if;
  if p_estrellas is null or p_estrellas not between 1 and 5 then
    raise exception 'La valoración debe estar entre 1 y 5' using errcode = '22023';
  end if;
  if not exists (select 1 from banco.consolidada where id = p_propuesta and estado = 'publicada') then
    raise exception 'Propuesta no disponible' using errcode = 'P0002';
  end if;
  insert into banco.valoracion (consolidada_id, usuario, estrellas)
  values (p_propuesta, uid, p_estrellas)
  on conflict (consolidada_id, usuario)
  do update set estrellas = excluded.estrellas, actualizado_en = now();
end $$;
revoke all on function public.banco_valorar(text, int) from public, anon;
grant execute on function public.banco_valorar(text, int) to authenticated;

-- Agregados públicos. aceptacion_pct: 1 estrella = 0 %, 5 estrellas = 100 %.
create function public.banco_valoracion_resumen(p_ids text[] default null)
returns table (propuesta_id text, votos bigint, media numeric, aceptacion_pct numeric,
               e1 bigint, e2 bigint, e3 bigint, e4 bigint, e5 bigint)
language sql stable security definer set search_path = '' as $$
  select v.consolidada_id,
         count(*),
         round(avg(v.estrellas)::numeric, 2),
         round((avg(v.estrellas)::numeric - 1) / 4 * 100, 1),
         count(*) filter (where v.estrellas = 1),
         count(*) filter (where v.estrellas = 2),
         count(*) filter (where v.estrellas = 3),
         count(*) filter (where v.estrellas = 4),
         count(*) filter (where v.estrellas = 5)
  from banco.valoracion v
  join banco.consolidada c on c.id = v.consolidada_id and c.estado = 'publicada'
  where p_ids is null or v.consolidada_id = any (p_ids)
  group by v.consolidada_id;
$$;
revoke all on function public.banco_valoracion_resumen(text[]) from public;
grant execute on function public.banco_valoracion_resumen(text[]) to anon, authenticated;

-- ---------------------------------------------------------------- aportes

create table banco.aporte (
  id                bigint generated always as identity primary key,
  consolidada_id    text not null references banco.consolidada(id) on delete cascade,
  usuario           uuid not null,
  tipo              text not null check (tipo in ('mejora','objecion','inciso','evidencia')),
  texto             text not null check (char_length(btrim(texto)) between 10 and 2000),
  estado            text not null default 'pendiente' check (estado in ('pendiente','publicado','rechazado')),
  motivo_moderacion text,
  creado_en         timestamptz not null default now(),
  moderado_en       timestamptz
);
comment on table banco.aporte is 'Mejoras, objeciones, incisos y evidencias dirigidas a una propuesta, no a una persona (Carta §4).';
create index aporte_consolidada_idx on banco.aporte (consolidada_id) where estado = 'publicado';
create index aporte_pendiente_idx on banco.aporte (creado_en) where estado = 'pendiente';

alter table banco.aporte enable row level security;
create policy publicados on banco.aporte for select to anon, authenticated using (estado = 'publicado');
create policy propios on banco.aporte for select to authenticated using (usuario = (select auth.uid()));
revoke all on banco.aporte from anon, authenticated;
-- La columna "usuario" no se expone: impide enlazar los aportes de una misma persona.
grant select (id, consolidada_id, tipo, texto, estado, creado_en) on banco.aporte to anon, authenticated;

create function public.banco_aportar(p_propuesta text, p_tipo text, p_texto text)
returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  nuevo bigint;
begin
  if uid is null then
    raise exception 'Hace falta iniciar sesión para aportar' using errcode = '28000';
  end if;
  if not exists (select 1 from banco.consolidada where id = p_propuesta and estado = 'publicada') then
    raise exception 'Propuesta no disponible' using errcode = 'P0002';
  end if;
  if (select count(*) from banco.aporte where usuario = uid and creado_en > now() - interval '24 hours') >= 10 then
    raise exception 'Límite de 10 aportes al día' using errcode = '53400';
  end if;
  insert into banco.aporte (consolidada_id, usuario, tipo, texto)
  values (p_propuesta, uid, p_tipo, btrim(p_texto))
  returning id into nuevo;
  return nuevo;
end $$;
revoke all on function public.banco_aportar(text, text, text) from public, anon;
grant execute on function public.banco_aportar(text, text, text) to authenticated;

-- Moderación: solo usuarios con app_metadata.rol = 'admin' o 'moderador'
-- (se asigna desde el panel de Supabase o con la clave de servicio, nunca desde el navegador).
create function banco.es_moderador() returns boolean
language sql stable set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'rol') in ('admin', 'moderador'), false);
$$;

create function public.banco_moderar_aporte(p_id bigint, p_estado text, p_motivo text default null)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not banco.es_moderador() then
    raise exception 'Sin permiso de moderación' using errcode = '42501';
  end if;
  if p_estado not in ('publicado', 'rechazado') then
    raise exception 'Estado no válido' using errcode = '22023';
  end if;
  update banco.aporte
     set estado = p_estado, motivo_moderacion = p_motivo, moderado_en = now()
   where id = p_id;
  if not found then
    raise exception 'Aporte inexistente' using errcode = 'P0002';
  end if;
end $$;
revoke all on function public.banco_moderar_aporte(bigint, text, text) from public, anon;
grant execute on function public.banco_moderar_aporte(bigint, text, text) to authenticated;

-- ---------------------------------------------------------------- apoyos a aportes
-- Un aporte publicado se puede apoyar: así los incisos y objeciones que más respaldo reciben suben.

create table banco.aporte_apoyo (
  aporte_id bigint not null references banco.aporte(id) on delete cascade,
  usuario   uuid not null,
  creado_en timestamptz not null default now(),
  primary key (aporte_id, usuario)
);
alter table banco.aporte_apoyo enable row level security;
create policy propio on banco.aporte_apoyo for select to authenticated using (usuario = (select auth.uid()));
revoke all on banco.aporte_apoyo from anon, authenticated;
grant select (aporte_id, creado_en) on banco.aporte_apoyo to authenticated;

create function public.banco_apoyar_aporte(p_aporte bigint, p_apoyo boolean default true)
returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Hace falta iniciar sesión para apoyar' using errcode = '28000';
  end if;
  if not exists (select 1 from banco.aporte where id = p_aporte and estado = 'publicado') then
    raise exception 'Aporte no disponible' using errcode = 'P0002';
  end if;
  if p_apoyo then
    insert into banco.aporte_apoyo (aporte_id, usuario) values (p_aporte, uid) on conflict do nothing;
  else
    delete from banco.aporte_apoyo where aporte_id = p_aporte and usuario = uid;
  end if;
  return (select count(*) from banco.aporte_apoyo where aporte_id = p_aporte);
end $$;
revoke all on function public.banco_apoyar_aporte(bigint, boolean) from public, anon;
grant execute on function public.banco_apoyar_aporte(bigint, boolean) to authenticated;

-- El recuento de apoyos se calcula con privilegios del propietario: el público ve totales, no quién apoyó.
create function banco.apoyos_de(p_aporte bigint) returns bigint
language sql stable security definer set search_path = '' as $$
  select count(*) from banco.aporte_apoyo where aporte_id = p_aporte;
$$;
revoke all on function banco.apoyos_de(bigint) from public;
grant execute on function banco.apoyos_de(bigint) to anon, authenticated;

create view public.banco_aportes with (security_invoker = true) as
select a.id, a.consolidada_id, a.tipo, a.texto, a.creado_en, banco.apoyos_de(a.id) as apoyos
from banco.aporte a where a.estado = 'publicado';
grant select on public.banco_aportes to anon, authenticated;
revoke insert, update, delete, truncate on public.banco_aportes from anon, authenticated;
