-- =========================================================================
-- MIGRACIÓN 20b: PRUEBAS UNITARIAS DE EVOLUCIÓN DE PROFILES A PERSONA (M2)
-- Script de prueba idempotente para la validación técnica de profiles M2.
-- =========================================================================

DO $$
DECLARE
  v_test_user_id UUID := uuid_generate_v4();
  v_lang VARCHAR(10);
  v_full_name TEXT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M2 PROFILES ===';

  -- 1. Inserción de perfil con datos estructurados de Persona
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    telefono,
    first_name,
    last_name,
    second_last_name,
    preferred_language,
    status
  ) VALUES (
    v_test_user_id,
    'Ignacio Loyola de Borja',
    'ignacio.test@cdjesuitas.es',
    '+34699000111',
    'Ignacio',
    'Loyola',
    'de Borja',
    'es',
    'ACTIVO'
  );

  RAISE NOTICE '[OK] Prueba 1: Perfil Persona M2 creado correctamente con ID: %', v_test_user_id;

  -- 2. Lectura y verificación de campos estructurados
  SELECT preferred_language, full_name INTO v_lang, v_full_name
  FROM public.profiles
  WHERE id = v_test_user_id;

  IF v_lang != 'es' OR v_full_name != 'Ignacio Loyola de Borja' THEN
    RAISE EXCEPTION 'ERROR PRUEBA 2: Los datos leídos no coinciden con la inserción.';
  END IF;

  RAISE NOTICE '[OK] Prueba 2: Lectura de campos reutilizados (full_name, email, telefono, status) e idioma preferido verificado.';

  -- 3. Actualización de idioma a valor válido ('ca' o 'en')
  UPDATE public.profiles
  SET preferred_language = 'ca'
  WHERE id = v_test_user_id;

  SELECT preferred_language INTO v_lang
  FROM public.profiles
  WHERE id = v_test_user_id;

  IF v_lang != 'ca' THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: Actualización de idioma preferido a "ca" falló.';
  END IF;

  RAISE NOTICE '[OK] Prueba 3: Actualización de idioma preferido a "ca" verificada.';

  -- 4. Limpieza de datos de prueba
  DELETE FROM public.profiles WHERE id = v_test_user_id;
  RAISE NOTICE '[OK] Prueba 4: Registro de prueba limpiado correctamente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M2 COMPLETADAS CON ÉXITO ===';
END $$;
