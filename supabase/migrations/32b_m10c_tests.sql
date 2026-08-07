-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-C: SEGURIDAD CANÓNICA DEL DOMINIO DEPORTIVO
-- =========================================================================

DO $$
DECLARE
  v_partidos_rls BOOLEAN;
  v_convocatorias_rls BOOLEAN;
  v_actas_rls BOOLEAN;
  v_training_rls BOOLEAN;
  v_comunicados_rls BOOLEAN;
  v_match_func BOOLEAN;
  v_live_func BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-C ===';

  -- 1. Verificar estado RLS en public.partidos
  SELECT rowsecurity INTO v_partidos_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'partidos';

  IF NOT v_partidos_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: RLS NO está activo en public.partidos.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: RLS está ACTIVO en public.partidos.';

  -- 2. Verificar estado RLS en public.convocatorias
  SELECT rowsecurity INTO v_convocatorias_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'convocatorias';

  IF NOT v_convocatorias_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: RLS NO está activo en public.convocatorias.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: RLS está ACTIVO en public.convocatorias.';

  -- 3. Verificar estado RLS en public.actas_partido
  SELECT rowsecurity INTO v_actas_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'actas_partido';

  IF NOT v_actas_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: RLS NO está activo en public.actas_partido.';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: RLS está ACTIVO en public.actas_partido.';

  -- 4. Verificar estado RLS en public.training_schedules
  SELECT rowsecurity INTO v_training_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'training_schedules';

  IF NOT v_training_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: RLS NO está activo en public.training_schedules.';
  END IF;
  RAISE NOTICE '[OK] Prueba 4: RLS está ACTIVO en public.training_schedules.';

  -- 5. Verificar estado RLS en public.comunicados
  SELECT rowsecurity INTO v_comunicados_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'comunicados';

  IF NOT v_comunicados_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 5: RLS NO está activo en public.comunicados.';
  END IF;
  RAISE NOTICE '[OK] Prueba 5: RLS está ACTIVO en public.comunicados.';

  -- 6. Verificar helpers
  SELECT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'current_user_has_match_access') INTO v_match_func;
  SELECT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'current_user_can_manage_live_match') INTO v_live_func;

  IF NOT v_match_func OR NOT v_live_func THEN
    RAISE EXCEPTION 'ERROR PRUEBA 6: Helpers de seguridad de dominio deportivo no definidos correctamente.';
  END IF;
  RAISE NOTICE '[OK] Prueba 6: Helpers current_user_has_match_access() y current_user_can_manage_live_match() activos.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-C COMPLETADAS CON ÉXITO ===';
END $$;
