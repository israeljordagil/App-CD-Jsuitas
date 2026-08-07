-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-B: SEGURIDAD RLS DE EQUIPOS Y JUGADORES
-- =========================================================================

DO $$
DECLARE
  v_teams_rls BOOLEAN;
  v_jugadores_rls BOOLEAN;
  v_jugador_equipos_rls BOOLEAN;
  v_f11_res BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-B ===';

  -- 1. Verificar estado RLS en public.teams
  SELECT rowsecurity INTO v_teams_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'teams';

  IF NOT v_teams_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: RLS NO está activo en public.teams';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: RLS está ACTIVO en public.teams.';

  -- 2. Verificar estado RLS en public.jugadores
  SELECT rowsecurity INTO v_jugadores_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'jugadores';

  IF NOT v_jugadores_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: RLS NO está activo en public.jugadores';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: RLS está ACTIVO en public.jugadores.';

  -- 3. Verificar estado RLS en public.jugador_equipos
  SELECT rowsecurity INTO v_jugador_equipos_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'jugador_equipos';

  IF NOT v_jugador_equipos_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: RLS NO está activo en public.jugador_equipos';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: RLS está ACTIVO en public.jugador_equipos.';

  -- 4. Verificar existencia de helper functions
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'is_f11_team') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: Función is_f11_team NO existe.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'current_user_has_team_access') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: Función current_user_has_team_access NO existe.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'current_user_has_player_access') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: Función current_user_has_player_access NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 4: Helpers de seguridad is_f11_team, current_user_has_team_access y current_user_has_player_access creados.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-B COMPLETADAS CON ÉXITO ===';
END $$;
