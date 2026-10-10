-- Pruebas como visitante anónimo. Se ejecutan después de la migración.
-- Cada prueba añade 'ok …' o 'FALLO …' a la variable r.
  -- ── Lecturas que deben estar cerradas
  set local role anon;
  perform set_config('request.headers', '{}', true);
  begin perform 1 from public.consulta_continuidad_votos limit 1; r := r || E'\nFALLO: anónimo lee votos de la consulta';
  exception when insufficient_privilege then r := r || E'\nok: votos de la consulta cerrados'; end;
  begin perform 1 from public.presos_politicos_firmas limit 1; r := r || E'\nFALLO: lee firmas';
  exception when insufficient_privilege then r := r || E'\nok: firmas cerradas'; end;
  begin perform 1 from public.candidatos_apoyo limit 1; r := r || E'\nFALLO: lee apoyos';
  exception when insufficient_privilege then r := r || E'\nok: apoyos cerrados'; end;
  begin perform 1 from public.et_event_log limit 1; r := r || E'\nFALLO: lee eventos';
  exception when insufficient_privilege then r := r || E'\nok: eventos no legibles'; end;
  begin perform 1 from public.et_profile_supported_proposals limit 1; r := r || E'\nFALLO: lee perfiles vinculados';
  exception when insufficient_privilege then r := r || E'\nok: vistas de perfil cerradas'; end;
  begin perform 1 from public.et_risk_duplicate_tokens limit 1; r := r || E'\nFALLO: lee tokens';
  exception when insufficient_privilege then r := r || E'\nok: vista de tokens cerrada'; end;
  begin perform autor_email from public.citizen_proposals limit 1; r := r || E'\nFALLO: lee correo de propuestas';
  exception when insufficient_privilege then r := r || E'\nok: correo y teléfono de propuestas ocultos'; end;
  begin perform 1 from public.et_member_login_accounts limit 1; r := r || E'\nFALLO: lee cuentas';
  exception when insufficient_privilege then r := r || E'\nok: cuentas cerradas'; end;
  begin perform 1 from public.ciudadanos_opt_in limit 1; r := r || E'\nFALLO: lee registros';
  exception when insufficient_privilege then r := r || E'\nok: registros de contacto cerrados'; end;

  -- ── Lecturas públicas que deben seguir funcionando
  begin perform id, content, device_token, estado from public.citizen_proposals limit 1; r := r || E'\nok: propuestas ciudadanas legibles';
  exception when others then r := r || E'\nFALLO: propuestas ciudadanas no legibles ' || sqlerrm; end;
  begin perform proposal_id, score, device_token from public.votes limit 1; r := r || E'\nok: votos de propuestas legibles (código cifrado)';
  exception when others then r := r || E'\nFALLO: votos de propuestas ' || sqlerrm; end;
  begin perform * from public.consulta_continuidad_resultados; r := r || E'\nok: vista de resultados agregados';
  exception when others then r := r || E'\nFALLO: vista de resultados ' || sqlerrm; end;
  begin perform 1 from public.et_members limit 1; r := r || E'\nok: miembros públicos legibles';
  exception when others then r := r || E'\nFALLO: miembros ' || sqlerrm; end;

  -- ── Escrituras directas que deben fallar
  begin insert into public.consulta_continuidad_votos (consulta_id, credential_hash, opcion, tipo_credencial) values ('continuidad_2026_03_27', repeat('a',64), 'cambio', 'ci'); r := r || E'\nFALLO: inserta voto directo';
  exception when insufficient_privilege then r := r || E'\nok: no se inserta voto directo'; end;
  begin update public.votes set score = 0; r := r || E'\nFALLO: cambia votos ajenos';
  exception when insufficient_privilege then r := r || E'\nok: no se cambian votos'; end;
  begin delete from public.citizen_proposals; r := r || E'\nFALLO: borra propuestas';
  exception when insufficient_privilege then r := r || E'\nok: no se borran propuestas'; end;
  begin update public.citizen_proposals set estado = 'approved'; r := r || E'\nFALLO: aprueba propuestas';
  exception when insufficient_privilege then r := r || E'\nok: no se aprueban propuestas'; end;
  begin update public.et_members set full_name = 'x'; r := r || E'\nFALLO: cambia miembros';
  exception when insufficient_privilege then r := r || E'\nok: no se cambian miembros'; end;
  begin insert into public.et_member_identities (member_id, source) values (gen_random_uuid(), 'x'); r := r || E'\nFALLO: crea identidades';
  exception when insufficient_privilege then r := r || E'\nok: no se crean identidades'; end;

  -- ── Consulta: votar y resultados
  j := public.consulta_resultados('continuidad_2026_03_27'); n_antes := (j->>'total')::int;
  r := r || E'\nresultados antes: ' || j::text;
  j := public.consulta_votar('continuidad_2026_03_27', encode(extensions.digest('99999999999ci','sha256'),'hex'), 'cambio', 'ci', 'Alemania', null);
  r := r || E'\nvoto nuevo: ' || j::text;
  j := public.consulta_votar('continuidad_2026_03_27', encode(extensions.digest('99999999999ci','sha256'),'hex'), 'continuidad', 'ci', null, null);
  r := r || E'\nmismo carné otra vez: ' || j::text;
  j := public.consulta_votar('otra', repeat('a',64), 'cambio', 'ci', null, null); r := r || E'\nconsulta inexistente: ' || j::text;
  j := public.consulta_votar('continuidad_2026_03_27', 'nohash', 'cambio', 'ci', null, null); r := r || E'\ncódigo inválido: ' || j::text;
  j := public.consulta_resultados('continuidad_2026_03_27');
  r := r || E'\nresultados después: total ' || (j->>'total') || ' (antes ' || n_antes || '), países ' || (j->'paises')::text;

  -- ── Propuestas: dueño y ajeno
  j := public.et_proponer('dt_prueba_A', 'Propuesta de prueba del dueño A', 'C', 'Prueba', '');
  r := r || E'\nproponer: ' || j::text; pid := (j->>'id')::bigint;
  r := r || E'\neditar por otro: ' || public.et_editar_propuesta('dt_prueba_B', pid, 'Texto cambiado por B')::text;
  select device_token into h from public.citizen_proposals where id = pid;
  r := r || E'\neditar con el código cifrado público: ' || public.et_editar_propuesta(h, pid, 'Texto cambiado con hash')::text;
  r := r || E'\neditar por el dueño: ' || public.et_editar_propuesta('dt_prueba_A', pid, 'Texto cambiado por A')::text;
  r := r || E'\nborrar por otro: ' || public.et_borrar_propuesta('dt_prueba_B', pid)::text;
  r := r || E'\nretirar por el dueño: ' || public.et_retirar_propuesta('dt_prueba_A', pid)::text;
  r := r || E'\nborrar por el dueño: ' || public.et_borrar_propuesta('dt_prueba_A', pid)::text;

  -- ── Votos y aportes
  r := r || E'\nvotar: ' || public.et_votar('dt_prueba_A', 'A-01', 4, '["a"]'::jsonb)::text;
  r := r || E'\nrevotar: ' || public.et_votar('dt_prueba_A', 'A-01', 2, '[]'::jsonb)::text;
  select count(*) into n_antes from public.votes where proposal_id = 'A-01' and device_token = encode(extensions.digest('dt_prueba_A','sha256'),'hex');
  r := r || E'\nfilas de voto del dueño en A-01: ' || n_antes;
  r := r || E'\nvoto fuera de rango: ' || public.et_votar('dt_prueba_A', 'A-01', 9, '[]'::jsonb)::text;
  r := r || E'\naportar: ' || public.et_aportar('dt_prueba_A', 'A-01', 'adicion', 'Aporte de prueba', 'Prueba')::text;
  r := r || E'\nvalorar aporte: ' || public.et_valorar_aporte('dt_prueba_A', 'A-01_0', 5)::text;

  -- ── Registro de eventos: insertar sí, y el token queda cifrado
  begin insert into public.et_event_log (event_type, actor_token, session_token, page_path) values ('prueba', 'dt_prueba_A', 'st_prueba', 'x');
    r := r || E'\nok: evento registrado';
  exception when others then r := r || E'\nFALLO: evento ' || sqlerrm; end;
  reset role;
  select actor_token into h from public.et_event_log where event_type = 'prueba' order by created_at desc limit 1;
  r := r || E'\ntoken del evento cifrado: ' || (h ~ '^[0-9a-f]{64}$')::text;
  select count(*) into n_antes from public.et_event_log where actor_token !~ '^[0-9a-f]{64}$';
  r := r || E'\neventos con token sin cifrar: ' || n_antes;
  select count(*) into n_antes from public.consulta_continuidad_votos where credential_hash !~ '^[0-9a-f]{64}$';
  r := r || E'\nvotos con código mal formado: ' || n_antes;
  select count(*) into n_antes from public.votes where device_token !~ '^[0-9a-f]{64}$';
  r := r || E'\nvotos de propuestas sin cifrar: ' || n_antes;
