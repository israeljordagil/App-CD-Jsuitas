-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS M10-A.4: ELIMINACIÓN DE BOOTSTRAP ADMIN POR EMAIL
-- =========================================================================

DO $$
DECLARE
  v_func_src TEXT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M10-A.4 ===';

  -- 1. Verificar que public.handle_new_user() ya no contiene asignación hardcodeada de roles por email
  SELECT prosrc INTO v_func_src
  FROM pg_proc
  WHERE proname = 'handle_new_user';

  IF v_func_src LIKE '%ADMIN_GENERAL%' OR v_func_src LIKE '%user_roles%' THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: handle_new_user() aún contiene asignación automática de roles por email.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: handle_new_user() libre de asignación automática de roles por email.';

  -- 2. Verificar que se conserva la inserción limpia en public.profiles
  IF NOT (v_func_src LIKE '%INSERT INTO public.profiles%') THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: handle_new_user() no incluye la inserción en public.profiles.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: handle_new_user() conserva la inserción legítima en public.profiles.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-A.4 COMPLETADAS CON ÉXITO ===';
END $$;
