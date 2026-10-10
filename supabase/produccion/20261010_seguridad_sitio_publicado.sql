-- ENTRE TODOS · Seguridad de la base de datos del sitio publicado (10 oct 2026)
--
-- Corrige lo que la política de privacidad prometía y no se cumplía:
--   1. Los votos de la consulta guardaban el código del carné sin clave secreta y la tabla
--      se podía leer desde fuera: con fuerza bruta se sabía cómo votó un carné concreto.
--      Ahora el código se cifra con una clave secreta guardada en el servidor (HMAC),
--      la tabla queda cerrada y solo se publican totales.
--   2. Cualquiera podía cambiar o borrar votos, aportes y propuestas de otros.
--      Ahora solo se escribe a través de funciones que comprueban el dispositivo.
--   3. El registro de eventos y otras tablas no tenían protección.
--   4. Correo y teléfono de las propuestas enviadas por organizaciones eran legibles.
--
-- La clave secreta se genera dentro de la base de datos y nunca aparece en este archivo.

begin;

-- ═══ 0. Esquema privado, clave secreta y funciones internas ═══════════════════════
create schema if not exists privado;
revoke all on schema privado from public;
revoke all on schema privado from anon, authenticated;

do $$
begin
  if not exists (select 1 from vault.secrets where name = 'et_clave_credenciales') then
    perform vault.create_secret(
      encode(extensions.gen_random_bytes(32), 'hex'),
      'et_clave_credenciales',
      'Clave HMAC para los códigos de credencial de consultas y firmas'
    );
  end if;
end $$;

create or replace function privado.cifrar_credencial(p text)
returns text language sql stable security definer set search_path = '' as $$
  select encode(extensions.hmac(
    p,
    (select decrypted_secret from vault.decrypted_secrets where name = 'et_clave_credenciales'),
    'sha256'), 'hex')
$$;

-- Siempre cifra: así nadie puede presentarse con el código ya cifrado (que es público).
create or replace function privado.hash_token(p text)
returns text language sql immutable set search_path = '' as $$
  select case when p is null or btrim(p) = '' then null
              else encode(extensions.digest(p, 'sha256'), 'hex') end
$$;

-- Solo para la migración de datos existentes: no vuelve a cifrar lo ya cifrado.
create or replace function privado.hash_token_migracion(p text)
returns text language sql immutable set search_path = '' as $$
  select case when p ~ '^[0-9a-f]{64}$' then p else privado.hash_token(p) end
$$;

revoke all on function privado.cifrar_credencial(text) from public, anon, authenticated;
revoke all on function privado.hash_token(text) from public, anon, authenticated;
revoke all on function privado.hash_token_migracion(text) from public, anon, authenticated;

-- ═══ 1. Consulta sobre la continuidad ════════════════════════════════════════════
-- Los 253 votos existentes se conservan: su código se vuelve a cifrar con la clave secreta.
-- Una sola vez (marca en privado.migraciones).
create table if not exists privado.migraciones (nombre text primary key, fecha timestamptz not null default now());
revoke all on privado.migraciones from public, anon, authenticated;
do $$
begin
  if not exists (select 1 from privado.migraciones where nombre = 'consulta_hmac') then
    update public.consulta_continuidad_votos
       set credential_hash = privado.cifrar_credencial(credential_hash);
    insert into privado.migraciones (nombre) values ('consulta_hmac');
  end if;
end $$;

create unique index if not exists consulta_continuidad_votos_unico
  on public.consulta_continuidad_votos (consulta_id, credential_hash);

drop policy if exists insert_voto on public.consulta_continuidad_votos;
drop policy if exists read_votos on public.consulta_continuidad_votos;
alter table public.consulta_continuidad_votos enable row level security;
revoke all on public.consulta_continuidad_votos from anon, authenticated;

create or replace function public.consulta_votar(
  p_consulta text, p_codigo text, p_opcion text, p_tipo text,
  p_pais text default null, p_provincia text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
begin
  if p_consulta is distinct from 'continuidad_2026_03_27' then
    return jsonb_build_object('ok', false, 'error', 'consulta');
  end if;
  if p_codigo is null or p_codigo !~ '^[0-9a-f]{64}$' then
    return jsonb_build_object('ok', false, 'error', 'credencial');
  end if;
  if p_opcion is null or p_opcion not in ('continuidad', 'cambio') then
    return jsonb_build_object('ok', false, 'error', 'opcion');
  end if;
  if p_tipo is null or p_tipo not in ('ci', 'pasaporte') then
    return jsonb_build_object('ok', false, 'error', 'tipo');
  end if;
  if length(coalesce(p_pais, '')) > 60 or length(coalesce(p_provincia, '')) > 60 then
    return jsonb_build_object('ok', false, 'error', 'ubicacion');
  end if;
  insert into public.consulta_continuidad_votos (consulta_id, credential_hash, opcion, tipo_credencial, pais, provincia)
  values (p_consulta, privado.cifrar_credencial(p_codigo), p_opcion, p_tipo,
          nullif(btrim(p_pais), ''), nullif(btrim(p_provincia), ''));
  return jsonb_build_object('ok', true);
exception when unique_violation then
  return jsonb_build_object('ok', false, 'error', 'duplicado');
end $$;

create or replace function public.consulta_resultados(p_consulta text default 'continuidad_2026_03_27')
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'total',       count(*),
    'continuidad', count(*) filter (where opcion = 'continuidad'),
    'cambio',      count(*) filter (where opcion = 'cambio'),
    'cuba',        count(*) filter (where tipo_credencial = 'ci'),
    'extranjero',  count(*) filter (where tipo_credencial = 'pasaporte'),
    'paises', coalesce((
      select jsonb_object_agg(pais, n) from (
        select pais, count(*) n from public.consulta_continuidad_votos
         where consulta_id = p_consulta and pais is not null group by pais) x), '{}'::jsonb))
  from public.consulta_continuidad_votos
  where consulta_id = p_consulta
$$;

revoke all on function public.consulta_votar(text, text, text, text, text, text) from public;
revoke all on function public.consulta_resultados(text) from public;
grant execute on function public.consulta_votar(text, text, text, text, text, text) to anon, authenticated;
grant execute on function public.consulta_resultados(text) to anon, authenticated;

-- ═══ 2. Tablas de firmas y apoyos sin uso en el sitio: cerradas ═══════════════════
alter table public.presos_politicos_firmas enable row level security;
revoke all on public.presos_politicos_firmas from anon, authenticated;

drop policy if exists insert_apoyo on public.candidatos_apoyo;
drop policy if exists read_apoyo on public.candidatos_apoyo;
revoke all on public.candidatos_apoyo from anon, authenticated;

drop policy if exists insert_plataforma_voto on public.candidatos_plataforma_votos;
drop policy if exists read_plataforma_votos on public.candidatos_plataforma_votos;
revoke all on public.candidatos_plataforma_votos from anon, authenticated;

alter table public.test_table enable row level security;
revoke all on public.test_table from anon, authenticated;

-- ═══ 3. Registro de eventos: solo se puede añadir; los identificadores se cifran ═══
update public.et_event_log
   set actor_token = privado.hash_token_migracion(actor_token),
       session_token = privado.hash_token_migracion(session_token);

create or replace function privado.tg_event_log_tokens()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.actor_token := privado.hash_token(new.actor_token);
  new.session_token := privado.hash_token(new.session_token);
  return new;
end $$;
revoke all on function privado.tg_event_log_tokens() from public, anon, authenticated;

drop trigger if exists trg_et_event_log_tokens on public.et_event_log;
create trigger trg_et_event_log_tokens before insert on public.et_event_log
  for each row execute function privado.tg_event_log_tokens();

-- Conservación máxima de 12 meses: cada inserción borra lo más antiguo.
create or replace function privado.tg_event_log_retencion()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  delete from public.et_event_log where created_at < now() - interval '12 months';
  return null;
end $$;
revoke all on function privado.tg_event_log_retencion() from public, anon, authenticated;
drop trigger if exists trg_et_event_log_retencion on public.et_event_log;
create trigger trg_et_event_log_retencion after insert on public.et_event_log
  for each statement execute function privado.tg_event_log_retencion();

alter table public.et_event_log enable row level security;
revoke all on public.et_event_log from anon, authenticated;
grant insert on public.et_event_log to anon, authenticated;
drop policy if exists et_event_log_insertar on public.et_event_log;
create policy et_event_log_insertar on public.et_event_log
  for insert to anon, authenticated with check (true);

-- ═══ 4. Votos, aportes y propuestas de las páginas de Transición y Constitución ═══
-- El identificador de dispositivo se guarda cifrado (SHA-256). Solo quien tiene el
-- identificador original (su navegador) puede cambiar lo suyo, y solo mediante funciones.
update public.votes            set device_token = privado.hash_token_migracion(device_token);
update public.feedbacks        set device_token = privado.hash_token_migracion(device_token);
update public.feedback_ratings set device_token = privado.hash_token_migracion(device_token);
update public.citizen_proposals set device_token = privado.hash_token_migracion(device_token);

drop policy if exists votes_insert on public.votes;
drop policy if exists votes_update on public.votes;
revoke insert, update, delete, truncate on public.votes from anon, authenticated;

drop policy if exists feedbacks_insert on public.feedbacks;
drop policy if exists feedbacks_update on public.feedbacks;
revoke insert, update, delete, truncate on public.feedbacks from anon, authenticated;

drop policy if exists fb_ratings_insert on public.feedback_ratings;
drop policy if exists fb_ratings_update on public.feedback_ratings;
revoke insert, update, delete, truncate on public.feedback_ratings from anon, authenticated;

drop policy if exists citizen_insert on public.citizen_proposals;
drop policy if exists citizen_update_own on public.citizen_proposals;
drop policy if exists citizen_delete_own on public.citizen_proposals;
drop policy if exists insert_proposal on public.citizen_proposals;
drop policy if exists update_proposal on public.citizen_proposals;
revoke all on public.citizen_proposals from anon, authenticated;
-- Lectura pública sin correo ni teléfono.
grant select (id, device_token, content, category, author_name, created_at, social_link, updated_at,
              status, edit_history, texto, categoria, orden, autor_nombre, autor_org, autor_web,
              estado, votos_suma, votos_cnt, es_nueva, approved_at, fuente_nombre, fuente_tipo)
  on public.citizen_proposals to anon, authenticated;

create or replace function public.et_votar(p_token text, p_propuesta text, p_puntos int, p_incisos jsonb default '[]'::jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token);
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  if p_propuesta is null or length(p_propuesta) > 60 then return jsonb_build_object('ok', false, 'error', 'propuesta'); end if;
  if p_puntos is null or p_puntos < 0 or p_puntos > 5 then return jsonb_build_object('ok', false, 'error', 'puntos'); end if;
  if p_incisos is null then p_incisos := '[]'::jsonb; end if;
  if jsonb_typeof(p_incisos) <> 'array' or length(p_incisos::text) > 2000 then
    return jsonb_build_object('ok', false, 'error', 'incisos');
  end if;
  insert into public.votes (device_token, proposal_id, score, selected_clauses, updated_at)
  values (h, p_propuesta, p_puntos, p_incisos, now())
  on conflict (device_token, proposal_id)
  do update set score = excluded.score, selected_clauses = excluded.selected_clauses, updated_at = now();
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.et_aportar(p_token text, p_propuesta text, p_tipo text, p_texto text, p_autor text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token);
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  if p_propuesta is null or length(p_propuesta) > 60 then return jsonb_build_object('ok', false, 'error', 'propuesta'); end if;
  if p_tipo is null or p_tipo not in ('critica', 'adicion', 'nuevo') then return jsonb_build_object('ok', false, 'error', 'tipo'); end if;
  if p_texto is null or length(btrim(p_texto)) < 3 or length(p_texto) > 3000 then return jsonb_build_object('ok', false, 'error', 'texto'); end if;
  if length(coalesce(p_autor, '')) > 80 then return jsonb_build_object('ok', false, 'error', 'autor'); end if;
  insert into public.feedbacks (proposal_id, device_token, type, content, author_name)
  values (p_propuesta, h, p_tipo, btrim(p_texto), coalesce(nullif(btrim(p_autor), ''), 'Anónimo'));
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.et_valorar_aporte(p_token text, p_aporte text, p_puntos int)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token);
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  if p_aporte is null or length(p_aporte) > 80 then return jsonb_build_object('ok', false, 'error', 'aporte'); end if;
  if p_puntos is null or p_puntos < 0 or p_puntos > 5 then return jsonb_build_object('ok', false, 'error', 'puntos'); end if;
  insert into public.feedback_ratings (feedback_id, device_token, score)
  values (p_aporte, h, p_puntos)
  on conflict (feedback_id, device_token) do update set score = excluded.score;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.et_proponer(p_token text, p_texto text, p_categoria text default null,
                                              p_autor text default null, p_enlace text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token); nuevo bigint;
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  if p_texto is null or length(btrim(p_texto)) < 5 or length(p_texto) > 3000 then return jsonb_build_object('ok', false, 'error', 'texto'); end if;
  if length(coalesce(p_categoria, '')) > 10 or length(coalesce(p_autor, '')) > 80 or length(coalesce(p_enlace, '')) > 300 then
    return jsonb_build_object('ok', false, 'error', 'datos');
  end if;
  insert into public.citizen_proposals (device_token, content, category, author_name, social_link, estado)
  values (h, btrim(p_texto), coalesce(nullif(btrim(p_categoria), ''), 'Z'),
          coalesce(nullif(btrim(p_autor), ''), 'Anónimo'), coalesce(btrim(p_enlace), ''), 'pending')
  returning id into nuevo;
  return jsonb_build_object('ok', true, 'id', nuevo);
end $$;

create or replace function public.et_editar_propuesta(p_token text, p_id bigint, p_texto text,
                                                      p_categoria text default null, p_enlace text default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token); n int;
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  if p_texto is null or length(btrim(p_texto)) < 5 or length(p_texto) > 3000 then return jsonb_build_object('ok', false, 'error', 'texto'); end if;
  if length(coalesce(p_categoria, '')) > 10 or length(coalesce(p_enlace, '')) > 300 then
    return jsonb_build_object('ok', false, 'error', 'datos');
  end if;
  update public.citizen_proposals
     set edit_history = coalesce(edit_history, '[]'::jsonb) || jsonb_build_array(jsonb_build_object('fecha', now(), 'texto', content)),
         content = btrim(p_texto),
         category = coalesce(nullif(btrim(p_categoria), ''), category),
         social_link = coalesce(btrim(p_enlace), social_link),
         updated_at = now()
   where id = p_id and device_token = h;
  get diagnostics n = row_count;
  if n = 0 then return jsonb_build_object('ok', false, 'error', 'no_autorizado'); end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.et_retirar_propuesta(p_token text, p_id bigint)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token); n int;
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  update public.citizen_proposals set estado = 'retired', updated_at = now()
   where id = p_id and device_token = h;
  get diagnostics n = row_count;
  if n = 0 then return jsonb_build_object('ok', false, 'error', 'no_autorizado'); end if;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.et_borrar_propuesta(p_token text, p_id bigint)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare h text := privado.hash_token(p_token); n int;
begin
  if h is null or length(p_token) > 120 then return jsonb_build_object('ok', false, 'error', 'token'); end if;
  delete from public.citizen_proposals where id = p_id and device_token = h;
  get diagnostics n = row_count;
  if n = 0 then return jsonb_build_object('ok', false, 'error', 'no_autorizado'); end if;
  return jsonb_build_object('ok', true);
end $$;

revoke all on function public.et_votar(text, text, int, jsonb) from public;
revoke all on function public.et_aportar(text, text, text, text, text) from public;
revoke all on function public.et_valorar_aporte(text, text, int) from public;
revoke all on function public.et_proponer(text, text, text, text, text) from public;
revoke all on function public.et_editar_propuesta(text, bigint, text, text, text) from public;
revoke all on function public.et_retirar_propuesta(text, bigint) from public;
revoke all on function public.et_borrar_propuesta(text, bigint) from public;
grant execute on function public.et_votar(text, text, int, jsonb) to anon, authenticated;
grant execute on function public.et_aportar(text, text, text, text, text) to anon, authenticated;
grant execute on function public.et_valorar_aporte(text, text, int) to anon, authenticated;
grant execute on function public.et_proponer(text, text, text, text, text) to anon, authenticated;
grant execute on function public.et_editar_propuesta(text, bigint, text, text, text) to anon, authenticated;
grant execute on function public.et_retirar_propuesta(text, bigint) to anon, authenticated;
grant execute on function public.et_borrar_propuesta(text, bigint) to anon, authenticated;

-- ═══ 5. Vistas internas con datos vinculables a personas: cerradas ═══════════════
revoke all on public.et_profile_base, public.et_profile_activity_feed, public.et_profile_stats,
              public.et_profile_supported_proposals, public.et_profile_cause_summary,
              public.et_risk_duplicate_tokens
  from anon, authenticated;

-- Ninguna vista admite escritura desde fuera.
do $$
declare v record;
begin
  for v in select table_name from information_schema.views where table_schema = 'public' loop
    execute format('revoke insert, update, delete, truncate on public.%I from anon, authenticated', v.table_name);
  end loop;
end $$;

-- ═══ 6. Cuentas e identidades de miembros: solo a través de sus funciones ════════
drop policy if exists et_member_identities_insert_anon on public.et_member_identities;
revoke all on public.et_member_identities from anon, authenticated;
revoke all on public.et_member_login_accounts from anon, authenticated;
revoke update, delete, truncate on public.et_members from anon, authenticated;

-- ═══ 7. Formularios de solo envío: nadie puede leer, cambiar ni borrar desde fuera ═
revoke select, update, delete, truncate on public.ciudadanos_opt_in, public.org_submissions,
              public.np_blog_comments, public.np_member_proposals, public.np_membership_applications
  from anon, authenticated;
revoke update, delete, truncate on public.objections from anon, authenticated;

commit;
