-- ENTRE TODOS · Votación de propuestas con credencial de documento (acordado con Mitch el 21 oct 2026).
-- Un documento (carné o pasaporte) = un voto por propuesta. El número nunca llega al servidor: el navegador
-- envía SHA-256(número + tipo) y el servidor lo cifra otra vez con la clave secreta de Vault
-- (privado.cifrar_credencial), igual que la consulta «Continuidad o cambio».
-- El titular elige un PIN de 6 cifras la primera vez: documento + PIN recupera sus votos en cualquier dispositivo.
-- Si alguien reclama un documento (suplantación u olvido del PIN), sus votos se congelan, dejan de contar
-- y se pide prueba de identidad. El equipo resuelve con banco.resolver_reclamacion (solo rol de servicio).
-- Todas las funciones exigen una sesión de Supabase, que solo se obtiene pasando Cloudflare Turnstile.

create table banco.votante (
  id             uuid primary key default gen_random_uuid(),
  credencial     text not null unique,
  tipo           text not null check (tipo in ('ci', 'pasaporte')),
  pin_hash       text,
  pin_pendiente  boolean not null default false,
  estado         text not null default 'activo' check (estado in ('activo', 'congelado')),
  fallos         smallint not null default 0,
  bloqueado_hasta timestamptz,
  pais           text check (length(pais) <= 60),
  provincia      text check (length(provincia) <= 60),
  creado_en      timestamptz not null default now(),
  ultimo_acceso  timestamptz
);
comment on table banco.votante is 'Credencial cifrada (HMAC con clave secreta) de quien vota. Ni número de documento, ni nombre, ni correo.';

create table banco.votante_sesion (
  token_hash text primary key,
  votante_id uuid not null references banco.votante(id) on delete cascade,
  creado_en  timestamptz not null default now(),
  expira_en  timestamptz not null default now() + interval '180 days'
);
create index votante_sesion_votante_idx on banco.votante_sesion (votante_id);

create table banco.voto (
  consolidada_id text not null references banco.consolidada(id) on delete cascade,
  votante_id     uuid not null references banco.votante(id) on delete cascade,
  valor          smallint not null check (valor between 1 and 5),
  anulado        boolean not null default false,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  primary key (consolidada_id, votante_id)
);
create index voto_votante_idx on banco.voto (votante_id);
comment on table banco.voto is 'Un voto por documento y propuesta. Dato sensible: solo se publican totales.';

create table banco.reclamacion (
  id          bigint generated always as identity primary key,
  referencia  text not null unique,
  votante_id  uuid not null references banco.votante(id) on delete cascade,
  motivo      text not null check (motivo in ('pin_olvidado', 'suplantacion')),
  estado      text not null default 'abierta' check (estado in ('abierta', 'a_favor', 'rechazada')),
  creado_en   timestamptz not null default now(),
  resuelto_en timestamptz
);

create table banco.intento_acceso (
  sesion    uuid not null,
  creado_en timestamptz not null default now()
);
create index intento_acceso_idx on banco.intento_acceso (sesion, creado_en);

alter table banco.votante        enable row level security;
alter table banco.votante_sesion enable row level security;
alter table banco.voto           enable row level security;
alter table banco.reclamacion    enable row level security;
alter table banco.intento_acceso enable row level security;
revoke all on banco.votante, banco.votante_sesion, banco.voto, banco.reclamacion, banco.intento_acceso
  from anon, authenticated;

-- ---------------------------------------------------------------- utilidades internas

create function banco.sesion_votante(p_token text) returns uuid
language sql stable security definer set search_path = '' as $$
  select s.votante_id from banco.votante_sesion s
  where s.token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex') and s.expira_en > now();
$$;
revoke all on function banco.sesion_votante(text) from public, anon, authenticated;

create function banco.nueva_sesion(p_votante uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare t text := encode(extensions.gen_random_bytes(32), 'hex');
begin
  insert into banco.votante_sesion (token_hash, votante_id)
  values (encode(extensions.digest(t, 'sha256'), 'hex'), p_votante);
  update banco.votante set ultimo_acceso = now() where id = p_votante;
  return t;
end $$;
revoke all on function banco.nueva_sesion(uuid) from public, anon, authenticated;

-- Máximo 10 intentos de acceso por sesión y hora (frena el ensayo de PIN o de documentos ajenos).
create function banco.limitar_intentos() returns boolean
language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid();
begin
  if uid is null then return false; end if;
  if (select count(*) from banco.intento_acceso where sesion = uid and creado_en > now() - interval '1 hour') >= 10 then
    return false;
  end if;
  insert into banco.intento_acceso (sesion) values (uid);
  return true;
end $$;
revoke all on function banco.limitar_intentos() from public, anon, authenticated;

-- ---------------------------------------------------------------- API

create function public.votante_entrar(p_codigo text, p_tipo text, p_pin text,
                                      p_pais text default null, p_provincia text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  cred text; v banco.votante%rowtype;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'sesion'); end if;
  if p_codigo is null or p_codigo !~ '^[0-9a-f]{64}$' then return jsonb_build_object('ok', false, 'error', 'credencial'); end if;
  if p_tipo not in ('ci', 'pasaporte') then return jsonb_build_object('ok', false, 'error', 'tipo'); end if;
  if p_pin is null or p_pin !~ '^[0-9]{6}$' then return jsonb_build_object('ok', false, 'error', 'formato_pin'); end if;
  if not banco.limitar_intentos() then return jsonb_build_object('ok', false, 'error', 'limite'); end if;
  cred := privado.cifrar_credencial(p_codigo);
  select * into v from banco.votante where credencial = cred for update;
  if not found then
    insert into banco.votante (credencial, tipo, pin_hash, pais, provincia)
    values (cred, p_tipo, extensions.crypt(p_pin, extensions.gen_salt('bf', 10)),
            nullif(btrim(p_pais), ''), nullif(btrim(p_provincia), ''))
    returning * into v;
    return jsonb_build_object('ok', true, 'estado', 'nuevo', 'token', banco.nueva_sesion(v.id));
  end if;
  if v.estado = 'congelado' then return jsonb_build_object('ok', false, 'error', 'congelado'); end if;
  if v.bloqueado_hasta > now() then return jsonb_build_object('ok', false, 'error', 'bloqueado'); end if;
  if v.pin_pendiente then
    update banco.votante set pin_hash = extensions.crypt(p_pin, extensions.gen_salt('bf', 10)), pin_pendiente = false, fallos = 0
    where id = v.id;
    return jsonb_build_object('ok', true, 'estado', 'pin_nuevo', 'token', banco.nueva_sesion(v.id));
  end if;
  if extensions.crypt(p_pin, v.pin_hash) = v.pin_hash then
    update banco.votante set fallos = 0 where id = v.id;
    return jsonb_build_object('ok', true, 'estado', 'existente', 'token', banco.nueva_sesion(v.id));
  end if;
  if v.fallos + 1 >= 5 then
    update banco.votante set fallos = 0, bloqueado_hasta = now() + interval '1 hour' where id = v.id;
    return jsonb_build_object('ok', false, 'error', 'bloqueado');
  end if;
  update banco.votante set fallos = v.fallos + 1 where id = v.id;
  return jsonb_build_object('ok', false, 'error', 'pin', 'restantes', 4 - v.fallos);
end $$;

-- El titular de un documento ya registrado por otra persona (o que olvidó su PIN) lo reclama:
-- los votos de ese documento se congelan y dejan de contar hasta que el equipo verifique la identidad.
create function public.votante_reclamar(p_codigo text, p_tipo text, p_motivo text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  v banco.votante%rowtype; ref text;
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'sesion'); end if;
  if p_codigo is null or p_codigo !~ '^[0-9a-f]{64}$' or p_tipo not in ('ci', 'pasaporte')
     or p_motivo not in ('pin_olvidado', 'suplantacion') then
    return jsonb_build_object('ok', false, 'error', 'datos');
  end if;
  if not banco.limitar_intentos() then return jsonb_build_object('ok', false, 'error', 'limite'); end if;
  select * into v from banco.votante where credencial = privado.cifrar_credencial(p_codigo) for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_registrado'); end if;
  select referencia into ref from banco.reclamacion where votante_id = v.id and estado = 'abierta';
  if ref is null then
    ref := upper(substr(encode(extensions.gen_random_bytes(6), 'hex'), 1, 8));
    insert into banco.reclamacion (referencia, votante_id, motivo) values (ref, v.id, p_motivo);
  end if;
  update banco.votante set estado = 'congelado' where id = v.id;
  update banco.votante_sesion set expira_en = now() where votante_id = v.id;
  return jsonb_build_object('ok', true, 'referencia', ref);
end $$;

create function public.votar(p_token text, p_propuesta text, p_valor int)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare vid uuid := banco.sesion_votante(p_token);
begin
  if auth.uid() is null then return jsonb_build_object('ok', false, 'error', 'sesion'); end if;
  if vid is null then return jsonb_build_object('ok', false, 'error', 'identificacion'); end if;
  if (select estado from banco.votante where id = vid) <> 'activo' then return jsonb_build_object('ok', false, 'error', 'congelado'); end if;
  if p_valor is null or p_valor not between 1 and 5 then return jsonb_build_object('ok', false, 'error', 'valor'); end if;
  if not exists (select 1 from banco.consolidada where id = p_propuesta and estado = 'publicada') then
    return jsonb_build_object('ok', false, 'error', 'propuesta');
  end if;
  if exists (select 1 from banco.consolidada where id = p_propuesta and not votable) then
    return jsonb_build_object('ok', false, 'error', 'derecho_fundamental');
  end if;
  insert into banco.voto (consolidada_id, votante_id, valor) values (p_propuesta, vid, p_valor)
  on conflict (consolidada_id, votante_id) do update set valor = excluded.valor, anulado = false, actualizado_en = now();
  return jsonb_build_object('ok', true);
end $$;

create function public.mis_votos(p_token text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select case when banco.sesion_votante(p_token) is null then jsonb_build_object('ok', false, 'error', 'identificacion')
  else jsonb_build_object('ok', true,
         'estado', (select estado from banco.votante where id = banco.sesion_votante(p_token)),
         'votos', coalesce((select jsonb_object_agg(consolidada_id, valor) from banco.voto
                            where votante_id = banco.sesion_votante(p_token) and not anulado), '{}'::jsonb)) end;
$$;

create function public.votante_salir(p_token text) returns void
language sql security definer set search_path = '' as $$
  update banco.votante_sesion set expira_en = now() where token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex');
$$;

-- Totales públicos: solo cuentan los documentos activos (los congelados por reclamación no cuentan).
create function public.banco_votos_resumen(p_ids text[] default null)
returns table (propuesta_id text, votos bigint, media numeric, aceptacion_pct numeric,
               e1 bigint, e2 bigint, e3 bigint, e4 bigint, e5 bigint,
               votos_ci bigint, votos_pasaporte bigint)
language sql stable security definer set search_path = '' as $$
  select v.consolidada_id, count(*), round(avg(v.valor)::numeric, 2),
         round(100.0 * count(*) filter (where v.valor >= 4) / count(*), 1),
         count(*) filter (where v.valor = 1), count(*) filter (where v.valor = 2), count(*) filter (where v.valor = 3),
         count(*) filter (where v.valor = 4), count(*) filter (where v.valor = 5),
         count(*) filter (where t.tipo = 'ci'), count(*) filter (where t.tipo = 'pasaporte')
  from banco.voto v
  join banco.votante t on t.id = v.votante_id and t.estado = 'activo'
  join banco.consolidada c on c.id = v.consolidada_id and c.estado = 'publicada'
  where not v.anulado and (p_ids is null or v.consolidada_id = any (p_ids))
  group by v.consolidada_id;
$$;

revoke all on function public.votante_entrar(text, text, text, text, text), public.votante_reclamar(text, text, text),
       public.votar(text, text, int), public.mis_votos(text), public.votante_salir(text) from public, anon;
grant execute on function public.votante_entrar(text, text, text, text, text), public.votante_reclamar(text, text, text),
       public.votar(text, text, int), public.mis_votos(text), public.votante_salir(text) to authenticated;
revoke all on function public.banco_votos_resumen(text[]) from public;
grant execute on function public.banco_votos_resumen(text[]) to anon, authenticated;

-- ---------------------------------------------------------------- resolución (solo equipo, rol de servicio)
-- a_favor: la persona que reclama demostró ser la titular. Los votos anteriores se anulan y el documento
--          queda activo con PIN pendiente: el próximo acceso fija el PIN nuevo.
-- rechazada: el documento vuelve a estar activo con sus votos.
create function banco.resolver_reclamacion(p_referencia text, p_decision text) returns void
language plpgsql security definer set search_path = '' as $$
declare r banco.reclamacion%rowtype;
begin
  if p_decision not in ('a_favor', 'rechazada') then raise exception 'Decisión no válida'; end if;
  select * into r from banco.reclamacion where referencia = upper(p_referencia) and estado = 'abierta' for update;
  if not found then raise exception 'Reclamación inexistente o ya resuelta'; end if;
  if p_decision = 'a_favor' then
    update banco.voto set anulado = true where votante_id = r.votante_id;
    update banco.votante set estado = 'activo', pin_pendiente = true, pin_hash = null, fallos = 0, bloqueado_hasta = null
    where id = r.votante_id;
  else
    update banco.votante set estado = 'activo' where id = r.votante_id;
  end if;
  update banco.reclamacion set estado = p_decision, resuelto_en = now() where id = r.id;
end $$;
revoke all on function banco.resolver_reclamacion(text, text) from public, anon, authenticated;

-- La valoración con sesión anónima del navegador queda retirada.
revoke execute on function public.banco_valorar(text, int) from authenticated;
