-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-A.2: CIERRE DE INSERT CLIENTE Y AUDITORÍA DE STATUS
-- =========================================================================

DO $$
DECLARE
  v_handle_user_secdef BOOLEAN;
  v_insert_policy_expr TEXT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-A.2 ===';

  -- 1. Verificar que public.handle_new_user() posee la propiedad SECURITY DEFINER
  SELECT (prosecdef) INTO v_handle_user_secdef
  FROM pg_proc
  WHERE proname = 'handle_new_user';

  IF NOT v_handle_user_secdef THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: handle_new_user() NO es SECURITY DEFINER (riesgo de bloqueo RLS en altas).';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: handle_new_user() posee SECURITY DEFINER (altas en auth.users omiten RLS en profiles).';

  -- 2. Verificar que Profiles insert policy restringe el INSERT cliente únicamente a ADMIN_GENERAL
  SELECT qual INTO v_insert_policy_expr
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename = 'profiles'
    AND policyname = 'Profiles insert policy';

  IF v_insert_policy_expr IS NULL OR NOT (v_insert_policy_expr LIKE '%is_admin%') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: Profiles insert policy no aplica restricción DENY BY DEFAULT con public.is_admin().';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: Profiles insert policy aplica DENY BY DEFAULT para clientes normales (INSERT restringido a ADMIN_GENERAL).';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-A.2 COMPLETADAS CON ÉXITO ===';
END $$;
