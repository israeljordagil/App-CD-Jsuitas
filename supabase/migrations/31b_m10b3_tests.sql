-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-B.3: RPCS DE ACCESO AMPLIADO SEGURO
-- =========================================================================

DO $$
DECLARE
  v_view_hijos_deleted BOOLEAN;
  v_rpc_hijos BOOLEAN;
  v_rpc_delegado BOOLEAN;
  v_rpc_admin BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-B.3 ===';

  -- 1. Verificar que v_mis_hijos fue eliminada para evitar vistas inconsistentes con column grants
  SELECT EXISTS (
    SELECT 1 FROM pg_views 
    WHERE schemaname = 'public' AND viewname = 'v_mis_hijos'
  ) INTO v_view_hijos_deleted;

  IF v_view_hijos_deleted THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: Vista v_mis_hijos aún existe (debe ser sustituida por RPC get_mis_hijos()).';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: Vista v_mis_hijos eliminada y sustituida por RPC segura.';

  -- 2. Verificar existencia de RPC get_mis_hijos
  SELECT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'get_mis_hijos'
  ) INTO v_rpc_hijos;
  IF NOT v_rpc_hijos THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: RPC get_mis_hijos NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: RPC get_mis_hijos() existe y está activa.';

  -- 3. Verificar existencia de RPC get_jugador_expediente_delegado
  SELECT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'get_jugador_expediente_delegado'
  ) INTO v_rpc_delegado;
  IF NOT v_rpc_delegado THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: RPC get_jugador_expediente_delegado NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: RPC get_jugador_expediente_delegado() existe y está activa.';

  -- 4. Verificar existencia de RPC get_jugador_expediente_admin
  SELECT EXISTS (
    SELECT 1 FROM pg_proc WHERE proname = 'get_jugador_expediente_admin'
  ) INTO v_rpc_admin;
  IF NOT v_rpc_admin THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: RPC get_jugador_expediente_admin NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 4: RPC get_jugador_expediente_admin() existe y está activa.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-B.3 COMPLETADAS CON ÉXITO ===';
END $$;
