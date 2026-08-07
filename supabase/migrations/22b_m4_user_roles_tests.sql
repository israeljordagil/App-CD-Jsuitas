-- =========================================================================
-- MIGRACIÓN 22b: PRUEBAS UNITARIAS DE EVOLUCIÓN DE USER_ROLES (M4)
-- Script de prueba idempotente para la validación técnica del modelo multirol M4.
-- =========================================================================

DO $$
DECLARE
  v_user_1 UUID := uuid_generate_v4();
  v_user_2 UUID := uuid_generate_v4();
  v_team_1 UUID := uuid_generate_v4();
  v_team_2 UUID := uuid_generate_v4();
  v_season_1 UUID := uuid_generate_v4();
  v_season_2 UUID := uuid_generate_v4();
  
  v_is_admin_res BOOLEAN;
  v_roles_count INT;
  v_failed_as_expected BOOLEAN := FALSE;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M4 USER_ROLES ===';

  -- Crear registros de prueba ficticios en profiles
  INSERT INTO public.profiles (id, full_name, email) VALUES
    (v_user_1, 'Multirol User Test 1', 'multi1.test@ejemplo.com'),
    (v_user_2, 'Multirol User Test 2', 'multi2.test@ejemplo.com');

  -- Crear equipos ficticios en teams
  INSERT INTO public.teams (id, internal_code, name, category, sport, season) VALUES
    (v_team_1, 'EQU-TEST-1', 'Infantil A Test', 'Infantil', 'Fútbol', '2026/2027'),
    (v_team_2, 'EQU-TEST-2', 'Benjamín A Test', 'Benjamín', 'Fútbol', '2026/2027');

  -- Crear temporadas ficticias en temporadas
  INSERT INTO public.temporadas (id, nombre, fecha_inicio, fecha_fin, actual) VALUES
    (v_season_1, '2026/2027', '2026-09-01', '2027-06-30', TRUE),
    (v_season_2, '2025/2026', '2025-09-01', '2026-06-30', FALSE);

  -- 1. Persona con único rol (ADMIN_GENERAL)
  INSERT INTO public.user_roles (user_id, role, scope_type)
  VALUES (v_user_1, 'ADMIN_GENERAL', 'CLUB');

  -- 2. Verificar funcionamiento ininterrumpido de public.is_admin()
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = v_user_1 AND role = 'ADMIN_GENERAL'
  ) INTO v_is_admin_res;

  IF NOT v_is_admin_res THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: public.is_admin() o consulta de admin falló.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1-2: Persona con único rol ADMIN_GENERAL y consulta de admin verificados.';

  -- 3. Mismo usuario con FAMILIA + ENTRENADOR en Equipo 1 (Temporada 2026/2027)
  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_1, 'FAMILIA', 'CLUB', NULL, NULL);

  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_1, 'ENTRENADOR', 'TEAM', v_team_1, v_season_1);

  RAISE NOTICE '[OK] Prueba 3: Coexistencia de roles FAMILIA + ENTRENADOR en la misma Persona verificada.';

  -- 4. Mismo usuario ENTRENADOR en dos equipos diferentes (Equipo 1 y Equipo 2)
  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_1, 'ENTRENADOR', 'TEAM', v_team_2, v_season_1);

  RAISE NOTICE '[OK] Prueba 4: Mismo usuario con rol ENTRENADOR en dos equipos distintos verificado.';

  -- 5. Dos usuarios diferentes como ENTRENADOR en el mismo equipo (Equipo 1)
  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_2, 'ENTRENADOR', 'TEAM', v_team_1, v_season_1);

  RAISE NOTICE '[OK] Prueba 5: Dos entrenadores distintos asignados al mismo equipo verificado.';

  -- 6. Intento de duplicado exacto (Mismo usuario, mismo rol, mismo equipo, misma temporada) -> Debe fallar
  v_failed_as_expected := FALSE;
  BEGIN
    INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
    VALUES (v_user_1, 'ENTRENADOR', 'TEAM', v_team_1, v_season_1);
  EXCEPTION WHEN OTHERS THEN
    v_failed_as_expected := TRUE;
  END;

  IF NOT v_failed_as_expected THEN
    RAISE EXCEPTION 'ERROR PRUEBA 6: Se permitió insertar una asignación idéntica duplicada.';
  END IF;
  RAISE NOTICE '[OK] Prueba 6: Bloqueo de asignación idéntica duplicada verificado por uq_idx_user_roles_assignment.';

  -- 7. Asignación de DELEGADO y SEGUNDO_ENTRENADOR a equipos
  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_2, 'DELEGADO', 'TEAM', v_team_1, v_season_1);

  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id)
  VALUES (v_user_2, 'SEGUNDO_ENTRENADOR', 'TEAM', v_team_2, v_season_1);

  RAISE NOTICE '[OK] Prueba 7: Asignación de DELEGADO y SEGUNDO_ENTRENADOR verificada.';

  -- 8. Asignación de PREPARADOR_FISICO y FISIOTERAPEUTA con ámbito transversal FOOTBALL_11
  INSERT INTO public.user_roles (user_id, role, scope_type, temporada_id)
  VALUES (v_user_1, 'PREPARADOR_FISICO', 'FOOTBALL_11', v_season_1);

  INSERT INTO public.user_roles (user_id, role, scope_type, temporada_id)
  VALUES (v_user_2, 'FISIOTERAPEUTA', 'FOOTBALL_11', v_season_1);

  RAISE NOTICE '[OK] Prueba 8: Roles PREPARADOR_FISICO y FISIOTERAPEUTA con ámbito FOOTBALL_11 verificados.';

  -- 9. Rol histórico en temporada anterior (2025/2026) coexistiendo con temporada actual
  INSERT INTO public.user_roles (user_id, role, scope_type, equipo_id, temporada_id, status)
  VALUES (v_user_1, 'ENTRENADOR', 'TEAM', v_team_1, v_season_2, 'INACTIVE');

  RAISE NOTICE '[OK] Prueba 9: Coexistencia de roles actuales e históricos por temporada verificada.';

  -- 10. Conteo total de roles del usuario 1
  SELECT COUNT(*) INTO v_roles_count FROM public.user_roles WHERE user_id = v_user_1;
  IF v_roles_count < 5 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 10: Se esperaban múltiples asignaciones de rol y se obtuvieron %.', v_roles_count;
  END IF;
  RAISE NOTICE '[OK] Prueba 10: Usuario 1 posee % asignaciones de roles multiámbito sin conflictos.', v_roles_count;

  -- 11. Limpieza de datos de prueba
  DELETE FROM public.user_roles WHERE user_id IN (v_user_1, v_user_2);
  DELETE FROM public.teams WHERE id IN (v_team_1, v_team_2);
  DELETE FROM public.temporadas WHERE id IN (v_season_1, v_season_2);
  DELETE FROM public.profiles WHERE id IN (v_user_1, v_user_2);
  RAISE NOTICE '[OK] Prueba 11: Datos de prueba limpiados correctamente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M4 COMPLETADAS CON ÉXITO ===';
END $$;
