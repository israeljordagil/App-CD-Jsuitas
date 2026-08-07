-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS DE SEGURIDAD DE COLUMNAS EN PROFILES (BLOQUE 4F.3 - M10-A.1)
-- =========================================================================

DO $$
DECLARE
  v_trg_exists BOOLEAN;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS DE COLUMNAS EN PROFILES M10-A.1 ===';

  -- 1. Verificar existencia del trigger trg_protect_profile_columns en public.profiles
  SELECT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'trg_protect_profile_columns'
      AND tgrelid = 'public.profiles'::regclass
  ) INTO v_trg_exists;

  IF NOT v_trg_exists THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: Trigger trg_protect_profile_columns NO existe en public.profiles.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: Trigger trg_protect_profile_columns instalado correctamente en public.profiles.';

  -- 2. Verificar existencia de la función protect_profile_columns
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc
    WHERE proname = 'protect_profile_columns'
  ) THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: Función protect_profile_columns NO existe.';
  END IF;
  RAISE NOTICE '[OK] Prueba 2: Función protect_profile_columns instalada correctamente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS DE COLUMNAS M10-A.1 COMPLETADAS CON ÉXITO ===';
END $$;
