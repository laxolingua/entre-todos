-- Pruebas del banco: archivo documental, banco ciudadano consolidado, permisos, búsqueda, historial,
-- valoraciones, aportes con apoyos, buenas prácticas y módulo elTOQUE.
-- Se ejecutan con:  psql -v ON_ERROR_STOP=1 -f supabase/tests/banco_pruebas.sql
-- Cada bloque falla con un mensaje claro si algo no se comporta como debe.
\set ON_ERROR_STOP 1

create or replace function pg_temp.comprobar(ok boolean, mensaje text) returns void language plpgsql as $$
begin
  if not coalesce(ok, false) then raise exception 'FALLA: %', mensaje; end if;
  raise notice 'ok  %', mensaje;
end $$;

create or replace function pg_temp.como(rol text, usuario uuid default null, rol_app text default null) returns void
language plpgsql as $$
begin
  perform set_config('request.jwt.claim.sub', coalesce(usuario::text, ''), false);
  perform set_config('request.jwt.claims',
    case when rol_app is null then '{}' else json_build_object('app_metadata', json_build_object('rol', rol_app))::text end, false);
  execute format('set role %I', rol);
end $$;

-- ------------------------------------------------ datos cargados
select pg_temp.comprobar((select count(*) = 760 from banco.propuesta), '760 propuestas cargadas');
select pg_temp.comprobar((select count(*) = 58 from banco.fuente), '58 fuentes cargadas');
select pg_temp.comprobar((select count(*) = 27 from banco.categoria), '27 categorías (18 declaradas + 9 provisionales)');
select pg_temp.comprobar((select count(*) = 45 from banco.tema), '45 temas fusionados');
select pg_temp.comprobar((select count(*) = 18 from banco.no_propuesta), '18 no-propuestas con motivo');
select pg_temp.comprobar((select count(*) = 0 from banco.propuesta_version), 'la carga inicial no genera versiones');
select pg_temp.comprobar((select count(*) = 159 from banco.consolidada where estado = 'publicada'), '159 propuestas consolidadas');
select pg_temp.comprobar((select count(*) = 10 from banco.cuestion), '10 cuestiones con alternativas');
select pg_temp.comprobar((select count(*) = 0 from banco.consolidada_version), 'cargar dos veces no genera versiones del banco ciudadano');
select pg_temp.comprobar((select bool_and(atribucion_verificada) from banco.fuente), 'las 58 autorías están verificadas');
select pg_temp.comprobar((select count(*) = 2 from banco.propuesta where estado = 'en_revision'), '2 citas no localizadas quedan en revisión');
select pg_temp.comprobar((select count(*) = 14 from banco.propuesta where forma_cita = 'parafraseada'), '14 paráfrasis de prensa marcadas como tales');
select pg_temp.comprobar((select count(*) = 0 from banco.propuesta p
                           where p.estado = 'publicada'
                             and not exists (select 1 from banco.consolidada_entrada e where e.propuesta_id = p.id)
                             and p.id not in ('P-0261','P-0262','P-0385','P-0398')),
                         'toda entrada publicada está en alguna propuesta consolidada (salvo 4 descriptivas)');

-- ------------------------------------------------ lectura anónima
select pg_temp.como('anon');
select pg_temp.comprobar((select count(*) = 758 from public.banco_propuestas), 'anónimo lee 758 entradas: las 2 en revisión no se publican');
select pg_temp.comprobar((select count(*) = 0 from public.banco_propuestas where id in ('P-0208','P-0209')), 'las citas no localizadas no salen por la API');
select pg_temp.comprobar((select autoria = 'Cuba Próxima' from public.banco_propuestas where id = 'P-0001'), 'P-0001 atribuida a Cuba Próxima');
select pg_temp.comprobar((select autoria = 'Plataforma Democrática Cubana' from public.banco_propuestas where fuente_ref = 40 limit 1),
                         'la fuente 40 se atribuye a la Plataforma Democrática Cubana tras la verificación');
select pg_temp.comprobar((select 'estado-de-derecho' = any(consolidadas) from public.banco_propuestas where id = 'P-0001'),
                         'cada entrada indica en qué propuestas consolidadas está');
select pg_temp.comprobar((select count(*) = 159 from public.banco_consolidadas), 'anónimo lee las 159 propuestas consolidadas');
select pg_temp.comprobar((select fuentes >= 10 and jsonb_array_length(incisos) = 6 and jsonb_array_length(variantes) = 1
                            from public.banco_consolidadas where id = 'presos-politicos'),
                         'presos políticos: una propuesta, 10 o más fuentes, 6 incisos y 1 variante');
select pg_temp.comprobar((select count(*) = 1 from public.banco_consolidada_fuentes
                           where consolidada_id = 'presos-politicos' and id = 'P-0214' and rol = 'variante'),
                         'las citas de cada propuesta consolidada se consultan con su papel');
select pg_temp.comprobar((select count(*) > 0 from public.banco_buscar_consolidadas('presos')), 'buscar en el banco ciudadano');
select pg_temp.comprobar((select count(*) from public.banco_buscar_consolidadas('transicion'))
                         = (select count(*) from public.banco_buscar_consolidadas('transición')), 'el banco ciudadano no distingue tildes');
select pg_temp.comprobar((select array_length(opciones, 1) = 2 and excluyentes from public.banco_cuestiones where id = 'aborto'),
                         'cuestión con opciones excluyentes');
select pg_temp.comprobar((select count(*) > 0 from public.banco_divergencias_actores), 'divergencias entre actores en una misma cuestión');
select pg_temp.comprobar((select sum(propuestas) > 0 from public.banco_categorias), 'conteos por categoría');
select pg_temp.comprobar((select count(*) > 0 from public.banco_buscar('transicion')), 'buscar "transicion" sin tilde encuentra resultados');
select pg_temp.comprobar((select count(*) from public.banco_buscar('transicion')) = (select count(*) from public.banco_buscar('transición')),
                         'la búsqueda no distingue tildes');
select pg_temp.comprobar((select bool_and('economia' = any(categorias)) from public.banco_buscar('', 'economia', 200)), 'filtro por categoría');
select pg_temp.comprobar((select count(*) > 0 from public.banco_coincidencias_actores), 'coincidencias entre actores que proponen lo mismo');

do $$ begin
  insert into banco.propuesta (id, cita, tema_fino, titular, fuente_ref, estado_cita, tipo)
  values ('P-9999', 'x', 'x', 'x', 1, 'Verbatim-primario', 'propuesta');
  raise exception 'FALLA: anónimo pudo insertar una propuesta';
exception when insufficient_privilege then raise notice 'ok  anónimo no puede insertar propuestas';
end $$;

do $$ begin
  perform public.banco_valorar('presos-politicos', 5);
  raise exception 'FALLA: anónimo sin sesión pudo valorar';
exception when insufficient_privilege then raise notice 'ok  sin sesión no se puede valorar';
end $$;

do $$ begin
  perform * from banco.valoracion;
  raise exception 'FALLA: anónimo pudo leer valoraciones';
exception when insufficient_privilege then raise notice 'ok  anónimo no lee valoraciones individuales';
end $$;

reset role;

-- ------------------------------------------------ valoraciones
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000a');
select public.banco_valorar('presos-politicos', 4);
select public.banco_valorar('presos-politicos', 5);  -- cambia su voto, no suma otro
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000b');
select public.banco_valorar('presos-politicos', 1);
select pg_temp.comprobar((select count(*) = 1 from banco.valoracion), 'cada persona solo ve su propia valoración');
select pg_temp.comprobar((select estrellas = 1 from banco.valoracion), 'y ve su valor');
do $$ begin
  perform public.banco_valorar('presos-politicos', 9);
  raise exception 'FALLA: se aceptó una valoración de 9';
exception when invalid_parameter_value then raise notice 'ok  rechaza valores fuera de 1-5';
end $$;
do $$ begin
  perform public.banco_valorar('P-0001', 3);
  raise exception 'FALLA: se pudo valorar una entrada del archivo documental';
exception when no_data_found then raise notice 'ok  se valoran propuestas consolidadas, no entradas del archivo';
end $$;
select pg_temp.como('anon');
select pg_temp.comprobar((select votos = 2 and media = 3 and aceptacion_pct = 50 and e5 = 1 and e1 = 1
                           from public.banco_valoracion_resumen(array['presos-politicos'])), 'resumen agregado: 2 votos, media 3, aceptación 50 %');
reset role;

-- ------------------------------------------------ aportes y moderación
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000a');
select public.banco_aportar('presos-politicos', 'inciso', 'Incluir a los presos del 11J condenados por desórdenes públicos.');
select pg_temp.como('anon');
select pg_temp.comprobar((select count(*) = 0 from public.banco_aportes), 'un aporte pendiente no es público');
do $$ begin
  perform usuario from banco.aporte;
  raise exception 'FALLA: se puede leer la columna usuario de los aportes';
exception when insufficient_privilege then raise notice 'ok  la autoría de los aportes no se expone';
end $$;
reset role;
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000b');
do $$ begin
  perform public.banco_moderar_aporte(1, 'publicado');
  raise exception 'FALLA: un usuario normal pudo moderar';
exception when insufficient_privilege then raise notice 'ok  solo moderadores moderan';
end $$;
reset role;
select pg_temp.como('authenticated', '00000000-0000-0000-0000-0000000000ff', 'moderador');
select public.banco_moderar_aporte(1, 'publicado');
select pg_temp.como('anon');
select pg_temp.comprobar((select count(*) = 1 from public.banco_aportes), 'tras moderar, el aporte es público');
do $$ begin
  perform public.banco_apoyar_aporte(1);
  raise exception 'FALLA: anónimo sin sesión pudo apoyar';
exception when insufficient_privilege then raise notice 'ok  sin sesión no se puede apoyar un aporte';
end $$;
reset role;
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000b');
select public.banco_apoyar_aporte(1);
select public.banco_apoyar_aporte(1);  -- repetir no suma
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000c');
select pg_temp.comprobar((select public.banco_apoyar_aporte(1) = 2), 'dos personas apoyan el aporte: 2 apoyos');
select pg_temp.comprobar((select public.banco_apoyar_aporte(1, false) = 1), 'retirar el apoyo lo resta');
select pg_temp.como('anon');
select pg_temp.comprobar((select apoyos = 1 from public.banco_aportes where id = 1), 'el público ve el total de apoyos');
do $$ begin
  perform * from banco.aporte_apoyo;
  raise exception 'FALLA: anónimo pudo leer quién apoyó';
exception when insufficient_privilege then raise notice 'ok  nadie ve quién apoyó un aporte';
end $$;
reset role;

-- ------------------------------------------------ historial de versiones
set banco.motivo_cambio = 'Prueba: corrección de localización';
update banco.propuesta set localizacion = 'Capítulo I, Artículo 1 (corregido)' where id = 'P-0001';
reset banco.motivo_cambio;
select pg_temp.comprobar((select version = 2 from banco.propuesta where id = 'P-0001'), 'una corrección sube la versión');
select pg_temp.comprobar((select count(*) = 1 and bool_and(motivo like 'Prueba%') from banco.propuesta_version where propuesta_id = 'P-0001'),
                         'la versión anterior queda guardada con su motivo');
update banco.propuesta set localizacion = localizacion where id = 'P-0002';
select pg_temp.comprobar((select version = 1 from banco.propuesta where id = 'P-0002'), 'un update sin cambios no crea versión');
set banco.motivo_cambio = 'Prueba: ajuste de redacción';
update banco.consolidada set texto = texto || ' (ajustado)' where id = 'presos-politicos';
reset banco.motivo_cambio;
select pg_temp.comprobar((select version = 2 from banco.consolidada where id = 'presos-politicos')
                         and (select count(*) = 1 from banco.consolidada_version where consolidada_id = 'presos-politicos'),
                         'una corrección del texto consolidado guarda la versión anterior');

-- ------------------------------------------------ buenas prácticas de otras democracias
insert into banco.buena_practica (consolidada_id, pais, titulo, descripcion, fuente_nombre, fuente_url)
values ('defensor-pueblo', 'España', 'Defensor del Pueblo', 'Alto comisionado de las Cortes para la defensa de los derechos.',
        'Constitución Española, art. 54', 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229');
select pg_temp.como('anon');
select pg_temp.comprobar((select count(*) = 0 from public.banco_buenas_practicas), 'una buena práctica sin verificar no se publica');
reset role;
update banco.buena_practica set verificada = true, verificada_por = 'prueba';
select pg_temp.como('anon');
select pg_temp.comprobar((select buenas_practicas = 1 from public.banco_consolidadas where id = 'defensor-pueblo'),
                         'verificada, aparece en su propuesta');
reset role;

-- ------------------------------------------------ elTOQUE: preocupaciones y vacíos
select pg_temp.como('authenticated', '00000000-0000-0000-0000-0000000000ee', 'editor_cep');
insert into banco.preocupacion (slug, titulo, publicada) values ('apagones', 'Apagones y energía', true);
insert into banco.preocupacion (slug, titulo, publicada) values ('borrador', 'Preocupación sin publicar', false);
insert into banco.preocupacion_propuesta (preocupacion_slug, consolidada_id, relevancia) values ('apagones', 'energia', 3);
reset role;
select pg_temp.como('authenticated', '00000000-0000-0000-0000-00000000000b');
do $$ begin
  insert into banco.preocupacion (slug, titulo) values ('intrusa', 'No debería entrar');
  raise exception 'FALLA: un usuario sin rol de editor creó una preocupación';
exception when insufficient_privilege then raise notice 'ok  solo el equipo editor crea preocupaciones';
end $$;
select pg_temp.como('anon');
select pg_temp.comprobar((select count(*) = 1 from public.cep_preocupaciones), 'anónimo ve solo las preocupaciones publicadas');
select pg_temp.comprobar((select propuestas = 1 and autorias >= 1 from public.cep_preocupaciones where slug = 'apagones'),
                         'una preocupación se enlaza con una propuesta del banco ciudadano');
select pg_temp.comprobar((select count(*) = 1 from public.cep_preocupacion_propuestas where preocupacion_slug = 'apagones' and id = 'energia'),
                         'elTOQUE lee por API la propuesta enlazada con sus datos');
select public.registrar_busqueda_sin_resultado('  Vivienda   PARA jóvenes ', 'cep');
select public.registrar_busqueda_sin_resultado('vivienda para jóvenes', 'cep');
do $$ begin
  perform * from banco.busqueda_sin_resultado;
  raise exception 'FALLA: anónimo pudo leer las búsquedas';
exception when insufficient_privilege then raise notice 'ok  anónimo no lee el registro de búsquedas';
end $$;
reset role;
select pg_temp.comprobar((select veces = 2 from banco.busqueda_sin_resultado where termino = 'vivienda para jóvenes'),
                         'búsquedas sin resultado se agregan por término normalizado');

\echo 'TODAS LAS PRUEBAS PASARON'
