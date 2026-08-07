-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-B.2: PRIVILEGIOS DE COLUMNA Y VISTAS RLS
-- =========================================================================

DO $$
DECLARE
  v_table_priv BOOLEAN;
  v_col_priv_name BOOLEAN;
  v_col_priv_notes BOOLEAN;
  v_view_sec_invoker BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-B.2 ===';

  -- 1. Verificar que SELECT a nivel de TABLA sobre public.jugadores NO está otorgado a authenticated
  SELECT has_table_privilege('authenticated', 'public.jugadores', 'SELECT') INTO v_table_priv;
  IF v_table_priv THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: authenticated conserva SELECT a nivel de TABLA sobre public.jugadores.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: SELECT a nivel de tabla sobre public.jugadores revocado correctamente para authenticated.';

  -- 2. Verificar que SELECT a nivel de COLUMNA sobre display_name SÍ está otorgado
  SELECT has_column_privilege('authenticated', 'public.jugadores', 'display_name', 'SELECT') INTO v_col_priv_name;
  IF NOT v_col_priv_name THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: authenticated no posee SELECT sobre la columna display_name.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: Permiso SELECT de columna display_name activo para authenticated.';

  -- 3. Verificar que SELECT a nivel de COLUMNA sobre notes NO está otorgado
  SELECT has_column_privilege('authenticated', 'public.jugadores', 'notes', 'SELECT') INTO v_col_priv_notes;
  IF v_col_priv_notes THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: authenticated posee SELECT sobre la columna sensible notes.';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: Permiso SELECT sobre la columna sensible notes bloqueado para authenticated.';

  -- 4. Verificar existencia de la vista v_mis_hijos y función get_jugador_expediente_delegado
  IF NOT EXISTS (SELECT 1 FROM pg_views WHERE schemaname = 'public' AND viewname = 'v_mis_hijos') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: Vista v_mis_hijos no existe.';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'get_jugador_expediente_delegado') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: Función get_jugador_expediente_delegado no existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 4: Vista v_mis_hijos y RPC get_jugador_expediente_delegado activas para acceso controlado.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-B.2 COMPLETADAS CON ÉXITO ===';
END $$;
