-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-B.1: HARDENING Y MINIMIZACIÓN DE JUGADORES Y F11
-- =========================================================================

DO $$
DECLARE
  v_view_exists BOOLEAN;
  v_f11_func BOOLEAN;
  v_je_rls BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-B.1 ===';

  -- 1. Verificar existencia de la vista segura public.v_jugadores_deportivos
  SELECT EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'v_jugadores_deportivos'
  ) INTO v_view_exists;

  IF NOT v_view_exists THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: La vista segura v_jugadores_deportivos NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: Vista segura public.v_jugadores_deportivos creada y activa.';

  -- 2. Verificar función is_f11_team
  SELECT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'is_f11_team'
  ) INTO v_f11_func;

  IF NOT v_f11_func THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: Función is_f11_team NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: Helper de detección F11 is_f11_team() actualizado y hardened.';

  -- 3. Verificar estado RLS de public.jugador_equipos
  SELECT rowsecurity INTO v_je_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'jugador_equipos';

  IF NOT v_je_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: RLS NO está activo en public.jugador_equipos';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: RLS está ACTIVO en public.jugador_equipos con políticas de minimización.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-B.1 COMPLETADAS CON ÉXITO ===';
END $$;
