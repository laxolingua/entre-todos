-- ENTRE TODOS · Propuestas ciudadanas por país (VOZ): cualquier persona propone una solución a un problema.
-- Reglas (mismas que los aportes del banco):
--   * Proponer o apoyar exige sesión; puede ser la sesión anónima de Supabase (sin correo, teléfono ni documento).
--   * Las propuestas entran como «pendiente» y solo se ven tras moderación.
--   * Un apoyo por sesión y propuesta. Solo se publica el total de apoyos; son apoyos, no una votación verificada.
--   * La columna «usuario» nunca se expone: impide enlazar las propuestas de una misma persona.
-- Solo añade objetos; no borra nada.

create table banco.propuesta_ciudadana (
  id                bigint generated always as identity primary key,
  pais              text not null check (pais in ('cu', 'es', 'de')),
  tema              text not null check (char_length(tema) between 2 and 40),
  problema          text not null check (char_length(btrim(problema)) between 10 and 600),
  propuesta         text not null check (char_length(btrim(propuesta)) between 20 and 1500),
  como              text check (como is null or char_length(como) <= 1500),
  usuario           uuid not null,
  estado            text not null default 'pendiente' check (estado in ('pendiente', 'publicada', 'rechazada')),
  motivo_moderacion text,
  creado_en         timestamptz not null default now(),
  moderado_en       timestamptz
);
comment on table banco.propuesta_ciudadana is 'Propuestas de la ciudadanía por país y tema (VOZ). Se moderan antes de publicarse.';
create index propuesta_ciudadana_pub_idx on banco.propuesta_ciudadana (pais, tema) where estado = 'publicada';
create index propuesta_ciudadana_pend_idx on banco.propuesta_ciudadana (creado_en) where estado = 'pendiente';

alter table banco.propuesta_ciudadana enable row level security;
create policy publicadas on banco.propuesta_ciudadana for select to anon, authenticated using (estado = 'publicada');
revoke all on banco.propuesta_ciudadana from anon, authenticated;

create table banco.propuesta_ciudadana_apoyo (
  propuesta_id bigint not null references banco.propuesta_ciudadana(id) on delete cascade,
  usuario      uuid not null,
  creado_en    timestamptz not null default now(),
  primary key (propuesta_id, usuario)
);
alter table banco.propuesta_ciudadana_apoyo enable row level security;
revoke all on banco.propuesta_ciudadana_apoyo from anon, authenticated;

create function public.ciudadania_proponer(p_pais text, p_tema text, p_problema text, p_propuesta text, p_como text default null)
returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
  nuevo bigint;
begin
  if uid is null then
    raise exception 'Hace falta iniciar sesión para proponer' using errcode = '28000';
  end if;
  if (select count(*) from banco.propuesta_ciudadana where usuario = uid and creado_en > now() - interval '24 hours') >= 5 then
    raise exception 'Límite de 5 propuestas al día' using errcode = '53400';
  end if;
  insert into banco.propuesta_ciudadana (pais, tema, problema, propuesta, como, usuario)
  values (p_pais, btrim(p_tema), btrim(p_problema), btrim(p_propuesta), nullif(btrim(coalesce(p_como, '')), ''), uid)
  returning id into nuevo;
  return nuevo;
end $$;
revoke all on function public.ciudadania_proponer(text, text, text, text, text) from public, anon;
grant execute on function public.ciudadania_proponer(text, text, text, text, text) to authenticated;

create function public.ciudadania_publicadas(p_pais text)
returns table (id bigint, tema text, problema text, propuesta text, como text, creado_en timestamptz, apoyos bigint)
language sql stable security definer set search_path = '' as $$
  select p.id, p.tema, p.problema, p.propuesta, p.como, p.creado_en,
         (select count(*) from banco.propuesta_ciudadana_apoyo a where a.propuesta_id = p.id)
    from banco.propuesta_ciudadana p
   where p.pais = p_pais and p.estado = 'publicada'
   order by p.creado_en desc
   limit 500;
$$;
revoke all on function public.ciudadania_publicadas(text) from public;
grant execute on function public.ciudadania_publicadas(text) to anon, authenticated;

create function public.ciudadania_apoyar(p_id bigint, p_apoyo boolean default true)
returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Hace falta iniciar sesión para apoyar' using errcode = '28000';
  end if;
  if not exists (select 1 from banco.propuesta_ciudadana where id = p_id and estado = 'publicada') then
    raise exception 'Propuesta no disponible' using errcode = 'P0002';
  end if;
  if p_apoyo then
    insert into banco.propuesta_ciudadana_apoyo (propuesta_id, usuario) values (p_id, uid) on conflict do nothing;
  else
    delete from banco.propuesta_ciudadana_apoyo where propuesta_id = p_id and usuario = uid;
  end if;
  return (select count(*) from banco.propuesta_ciudadana_apoyo where propuesta_id = p_id);
end $$;
revoke all on function public.ciudadania_apoyar(bigint, boolean) from public, anon;
grant execute on function public.ciudadania_apoyar(bigint, boolean) to authenticated;

create function public.ciudadania_mis_apoyos(p_pais text)
returns setof bigint
language sql stable security definer set search_path = '' as $$
  select a.propuesta_id from banco.propuesta_ciudadana_apoyo a
    join banco.propuesta_ciudadana p on p.id = a.propuesta_id
   where a.usuario = auth.uid() and p.pais = p_pais;
$$;
revoke all on function public.ciudadania_mis_apoyos(text) from public, anon;
grant execute on function public.ciudadania_mis_apoyos(text) to authenticated;

create function public.ciudadania_moderar(p_id bigint, p_estado text, p_motivo text default null)
returns void
language plpgsql security definer set search_path = '' as $$
begin
  if not banco.es_moderador() then
    raise exception 'Sin permiso de moderación' using errcode = '42501';
  end if;
  if p_estado not in ('publicada', 'rechazada') then
    raise exception 'Estado no válido' using errcode = '22023';
  end if;
  update banco.propuesta_ciudadana set estado = p_estado, motivo_moderacion = p_motivo, moderado_en = now() where id = p_id;
  if not found then
    raise exception 'Propuesta inexistente' using errcode = 'P0002';
  end if;
end $$;
revoke all on function public.ciudadania_moderar(bigint, text, text) from public, anon;
grant execute on function public.ciudadania_moderar(bigint, text, text) to authenticated;
