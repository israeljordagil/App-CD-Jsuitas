-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-A.3: HARDENING DE HANDLE_NEW_USER()
-- =========================================================================

DO $$
DECLARE
  v_secdef BOOLEAN;
  v_search_path TEXT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-A.3 ===';

  -- 1. Verificar SECURITY DEFINER en public.handle_new_user()
  SELECT prosecdef INTO v_secdef
  FROM pg_proc
  WHERE proname = 'handle_new_user';

  IF NOT v_secdef THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: handle_new_user() NO es SECURITY DEFINER.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: handle_new_user() posee SECURITY DEFINER.';

  -- 2. Verificar que search_path está explícitamente configurado a public, pg_temp
  SELECT proconfig::text INTO v_search_path
  FROM pg_proc
  WHERE proname = 'handle_new_user';

  IF v_search_path IS NULL OR NOT (v_search_path LIKE '%search_path=public, pg_temp%') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: handle_new_user() no posee la cláusula explícita SET search_path = public, pg_temp (% encontrado).', v_search_path;
  END IF;
  RAISE NOTICE '[OK] Prueba 2: handle_new_user() posee search_path explícito seguro (search_path=public, pg_temp).';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-A.3 COMPLETADAS CON ÉXITO ===';
END $$;
