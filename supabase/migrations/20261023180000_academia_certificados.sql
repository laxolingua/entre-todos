-- Academia A+: lecciones completadas (sesión anónima), certificados verificables y verificación pública.
-- No guarda datos personales: solo el nombre que la persona elige para el certificado.
create schema if not exists academia;
revoke all on schema academia from public, anon, authenticated;

create table academia.catalogo (bloque text not null, leccion text not null, modulo text not null check (modulo in ('nc','pd')), primary key (bloque, leccion));
create table academia.lecciones_hechas (
  usuario uuid not null, bloque text not null, leccion text not null,
  antes smallint, despues smallint, hecha timestamptz not null default now(),
  primary key (usuario, bloque, leccion),
  foreign key (bloque, leccion) references academia.catalogo (bloque, leccion));
create table academia.certificados (
  codigo text primary key, tipo text not null check (tipo in ('bloque','modulo')), ref text not null,
  nombre text not null check (char_length(nombre) between 2 and 60), usuario uuid not null,
  emitido timestamptz not null default now(), revocado boolean not null default false,
  unique (usuario, tipo, ref));
alter table academia.catalogo enable row level security;
alter table academia.lecciones_hechas enable row level security;
alter table academia.certificados enable row level security;

insert into academia.catalogo (bloque, leccion, modulo) values
('derechos-humanos','universales','nc'),
('derechos-humanos','democracias','nc'),
('derechos-humanos','cuba-2019','nc'),
('derechos-humanos','practica','nc'),
('libertad-de-expresion','sin-permiso-previo','nc'),
('libertad-de-expresion','limites-distintos','nc'),
('libertad-de-expresion','prensa-independiente','nc'),
('libertad-de-expresion','internet-y-expresion','nc'),
('justicia','nadie-por-encima','nc'),
('justicia','jueces-independientes','nc'),
('justicia','juicio-justo','nc'),
('justicia','practica-justicia','nc'),
('rendicion-de-cuentas','separacion-de-poderes','nc'),
('rendicion-de-cuentas','elecciones-y-alternancia','nc'),
('rendicion-de-cuentas','transparencia','nc'),
('rendicion-de-cuentas','prensa-y-organizaciones','nc'),
('libertad-religiosa','conciencia-y-culto','nc'),
('libertad-religiosa','estado-y-religion','nc'),
('libertad-religiosa','minorias-religiosas','nc'),
('libertad-religiosa','practica-religion','nc'),
('sociedad-civil','asociarse-libremente','nc'),
('sociedad-civil','registro-y-financiacion','nc'),
('sociedad-civil','organizaciones-en-cuba','nc'),
('sociedad-civil','participar-con-seguridad','nc'),
('pensamiento-critico','que-es-un-argumento','pd'),
('pensamiento-critico','construir-un-argumento','pd'),
('pensamiento-critico','contraargumentos','pd'),
('pensamiento-critico','evidencia','pd'),
('pensamiento-critico','credibilidad-de-las-fuentes','pd'),
('pensamiento-critico','como-citar','pd'),
('pensamiento-critico','falacias','pd'),
('pensamiento-critico','sesgos-y-bulos','pd'),
('pensamiento-critico','ia-con-criterio','pd'),
('pensamiento-creativo','reformular-el-problema','pd'),
('pensamiento-creativo','generar-alternativas','pd'),
('pensamiento-creativo','inventar-o-resolver','pd'),
('pensamiento-etico','que-hace-que-algo-este-bien','pd'),
('pensamiento-etico','fines-y-medios','pd'),
('pensamiento-etico','circulo-moral','pd'),
('pensamiento-sistemico','soluciones-que-empeoran','pd'),
('pensamiento-sistemico','modelo-del-iceberg','pd'),
('pensamiento-sistemico','puntos-de-palanca','pd'),
('educacion-humana','que-es-educacion-humana','pd'),
('educacion-humana','discrepar-sin-humillar','pd'),
('educacion-humana','el-precio-real','pd'),
('pensamiento-solucionario','que-es-ser-solucionario','pd'),
('pensamiento-solucionario','marco-solucionario','pd'),
('pensamiento-solucionario','de-la-solucion-a-la-propuesta','pd');

create or replace function public.academia_registrar_leccion(p_bloque text, p_leccion text, p_antes int default null, p_despues int default null)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid();
begin
  if u is null then return jsonb_build_object('ok', false, 'error', 'sesion'); end if;
  if not exists (select 1 from academia.catalogo where bloque = p_bloque and leccion = p_leccion) then
    return jsonb_build_object('ok', false, 'error', 'leccion'); end if;
  insert into academia.lecciones_hechas (usuario, bloque, leccion, antes, despues)
  values (u, p_bloque, p_leccion, least(greatest(p_antes, 0), 9), least(greatest(p_despues, 0), 9))
  on conflict (usuario, bloque, leccion) do nothing;
  return jsonb_build_object('ok', true);
end $$;

create or replace function public.academia_emitir_certificado(p_tipo text, p_ref text, p_nombre text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare u uuid := auth.uid(); n text := btrim(regexp_replace(coalesce(p_nombre, ''), '\s+', ' ', 'g'));
  falta int; c text; pre text;
begin
  if u is null then return jsonb_build_object('ok', false, 'error', 'sesion'); end if;
  if char_length(n) < 2 or char_length(n) > 60 then return jsonb_build_object('ok', false, 'error', 'nombre'); end if;
  if p_tipo = 'bloque' then
    select count(*) into falta from academia.catalogo k
      where k.bloque = p_ref and not exists (select 1 from academia.lecciones_hechas h where h.usuario = u and h.bloque = k.bloque and h.leccion = k.leccion);
    if not exists (select 1 from academia.catalogo where bloque = p_ref) then return jsonb_build_object('ok', false, 'error', 'ref'); end if;
    pre := upper(left(replace(p_ref, '-', ''), 2));
  elsif p_tipo = 'modulo' and p_ref in ('nc','pd') then
    select count(*) into falta from academia.catalogo k
      where k.modulo = p_ref and not exists (select 1 from academia.lecciones_hechas h where h.usuario = u and h.bloque = k.bloque and h.leccion = k.leccion);
    pre := upper(p_ref);
  else return jsonb_build_object('ok', false, 'error', 'ref'); end if;
  if falta > 0 then return jsonb_build_object('ok', false, 'error', 'incompleto', 'faltan', falta); end if;
  select codigo into c from academia.certificados where usuario = u and tipo = p_tipo and ref = p_ref;
  if c is not null then
    update academia.certificados set nombre = n where codigo = c;
  else
    loop
      c := 'A-' || pre || '-' || upper(substr(encode(extensions.gen_random_bytes(6), 'hex'), 1, 4)) || '-' || upper(substr(encode(extensions.gen_random_bytes(6), 'hex'), 1, 4));
      exit when not exists (select 1 from academia.certificados where codigo = c);
    end loop;
    insert into academia.certificados (codigo, tipo, ref, nombre, usuario) values (c, p_tipo, p_ref, n, u);
  end if;
  return jsonb_build_object('ok', true, 'codigo', c, 'nombre', n);
end $$;

create or replace function public.academia_verificar(p_codigo text)
returns jsonb language sql stable security definer set search_path = '' as $$
  select coalesce((select jsonb_build_object('ok', true, 'tipo', tipo, 'ref', ref, 'nombre', nombre, 'emitido', emitido, 'revocado', revocado)
    from academia.certificados where codigo = upper(btrim(p_codigo))), jsonb_build_object('ok', false));
$$;

-- Cifras agregadas para el seguimiento del grant (sin datos de nadie).
create or replace function public.academia_cifras()
returns jsonb language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'lecciones', (select count(*) from academia.lecciones_hechas),
    'personas', (select count(distinct usuario) from academia.lecciones_hechas),
    'certificados_bloque', (select count(*) from academia.certificados where tipo = 'bloque' and not revocado),
    'certificados_modulo', (select count(*) from academia.certificados where tipo = 'modulo' and not revocado));
$$;

revoke all on function public.academia_registrar_leccion(text, text, int, int), public.academia_emitir_certificado(text, text, text) from public, anon;
grant execute on function public.academia_registrar_leccion(text, text, int, int), public.academia_emitir_certificado(text, text, text) to authenticated;
revoke all on function public.academia_verificar(text), public.academia_cifras() from public;
grant execute on function public.academia_verificar(text), public.academia_cifras() to anon, authenticated;
