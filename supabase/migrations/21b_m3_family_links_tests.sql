-- =========================================================================
-- MIGRACIÓN 21b: PRUEBAS UNITARIAS DE EVOLUCIÓN DE VÍNCULOS FAMILIARES (M3)
-- Script de prueba idempotente para la validación técnica del modelo familiar M3.
-- =========================================================================

DO $$
DECLARE
  v_jugador_id UUID := uuid_generate_v4();
  v_tutor_1 UUID := uuid_generate_v4();
  v_tutor_2 UUID := uuid_generate_v4();
  v_tutor_3 UUID := uuid_generate_v4();
  v_tutor_4 UUID := uuid_generate_v4();
  v_tutor_5 UUID := uuid_generate_v4();
  v_tutor_6 UUID := uuid_generate_v4();
  
  v_link_id_1 UUID;
  v_link_id_6 UUID;
  v_count INT;
  v_failed_as_expected BOOLEAN := FALSE;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M3 VÍNCULOS FAMILIARES ===';

  -- Crear registros de perfiles de prueba ficticios
  INSERT INTO public.profiles (id, full_name, email) VALUES
    (v_tutor_1, 'Padre Test', 'padre.test@ejemplo.com'),
    (v_tutor_2, 'Madre Test', 'madre.test@ejemplo.com'),
    (v_tutor_3, 'Tutor Legal Test', 'tutor.test@ejemplo.com'),
    (v_tutor_4, 'Abuelo Test', 'abuelo.test@ejemplo.com'),
    (v_tutor_5, 'Tía Test', 'tia.test@ejemplo.com'),
    (v_tutor_6, 'Sexto Familiar Test', 'sexto.test@ejemplo.com');

  -- Crear jugador de prueba ficticio
  INSERT INTO public.jugadores (id, nombre, apellidos, internal_code) VALUES
    (v_jugador_id, 'Jugador', 'Prueba M3', 'JUG-TEST-M3');

  -- 1. Inserción de PADRE (Responsable, Referencia Principal)
  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, is_primary_reference, status
  ) VALUES (
    v_tutor_1, v_jugador_id, 'PADRE', 'RESPONSIBLE', TRUE, 'ACTIVE'
  ) RETURNING id INTO v_link_id_1;

  -- 2. Inserción de MADRE (Responsable, Coexistencia sin jerarquía)
  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, is_primary_reference, status
  ) VALUES (
    v_tutor_2, v_jugador_id, 'MADRE', 'RESPONSIBLE', FALSE, 'ACTIVE'
  );

  -- 3. Inserción de TUTOR_LEGAL
  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, status
  ) VALUES (
    v_tutor_3, v_jugador_id, 'TUTOR_LEGAL', 'RESPONSIBLE', 'ACTIVE'
  );

  -- 4. Inserción de ABUELO (Familiar Autorizado) y TIA
  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, status
  ) VALUES (
    v_tutor_4, v_jugador_id, 'ABUELO', 'AUTHORIZED_FAMILY', 'ACTIVE'
  );

  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, status
  ) VALUES (
    v_tutor_5, v_jugador_id, 'TIA', 'AUTHORIZED_FAMILY', 'ACTIVE'
  );

  SELECT COUNT(*) INTO v_count FROM public.vinculos_familiares WHERE jugador_id = v_jugador_id AND status = 'ACTIVE';
  IF v_count != 5 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1-4: Se esperaban 5 familiares activos y se obtuvieron %.', v_count;
  END IF;
  RAISE NOTICE '[OK] Pruebas 1-4: 5 familiares activos creados correctamente (PADRE, MADRE, TUTOR_LEGAL, ABUELO, TIA).';

  -- 5. Intento de añadir un 6º familiar ACTIVE (Debe ser bloqueado por el trigger)
  v_failed_as_expected := FALSE;
  BEGIN
    INSERT INTO public.vinculos_familiares (
      tutor_user_id, jugador_id, parentesco, responsibility_level, status
    ) VALUES (
      v_tutor_6, v_jugador_id, 'OTRO_FAMILIAR_AUTORIZADO', 'AUTHORIZED_FAMILY', 'ACTIVE'
    );
  EXCEPTION WHEN OTHERS THEN
    v_failed_as_expected := TRUE;
  END;

  IF NOT v_failed_as_expected THEN
    RAISE EXCEPTION 'ERROR PRUEBA 5: Se permitió insertar un 6º familiar ACTIVE sin ser bloqueado.';
  END IF;
  RAISE NOTICE '[OK] Prueba 5: Bloqueo de 6º familiar ACTIVE verificado correctamente.';

  -- 6. Insertar el 6º familiar como PENDING / REVOKED (Debe ser permitido porque no cuenta como ACTIVE)
  INSERT INTO public.vinculos_familiares (
    tutor_user_id, jugador_id, parentesco, responsibility_level, status, revoked_at
  ) VALUES (
    v_tutor_6, v_jugador_id, 'OTRO_FAMILIAR_AUTORIZADO', 'AUTHORIZED_FAMILY', 'REVOKED', timezone('utc'::text, now())
  ) RETURNING id INTO v_link_id_6;

  RAISE NOTICE '[OK] Prueba 6: Familiar en estado REVOKED insertado correctamente sin contar para el límite de 5.';

  -- 7. Revocar uno de los familiares activos para dejar 4 activos
  UPDATE public.vinculos_familiares
  SET status = 'REVOKED', revoked_at = timezone('utc'::text, now())
  WHERE id = v_link_id_1;

  SELECT COUNT(*) INTO v_count FROM public.vinculos_familiares WHERE jugador_id = v_jugador_id AND status = 'ACTIVE';
  IF v_count != 4 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 7: Se esperaban 4 familiares activos tras revocación.';
  END IF;

  -- 8. Reactivar el 6º familiar ahora que el total activo es 4 (Debe ser permitido)
  UPDATE public.vinculos_familiares
  SET status = 'ACTIVE'
  WHERE id = v_link_id_6;

  SELECT COUNT(*) INTO v_count FROM public.vinculos_familiares WHERE jugador_id = v_jugador_id AND status = 'ACTIVE';
  IF v_count != 5 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 8: Se esperaban 5 familiares activos tras reactivación.';
  END IF;
  RAISE NOTICE '[OK] Pruebas 7-8: Revocación y reactivación dentro del límite de 5 verificadas.';

  -- 9. Probar bloqueo de duplicado tutor_user_id + jugador_id
  v_failed_as_expected := FALSE;
  BEGIN
    INSERT INTO public.vinculos_familiares (
      tutor_user_id, jugador_id, parentesco, status
    ) VALUES (
      v_tutor_2, v_jugador_id, 'MADRE', 'ACTIVE'
    );
  EXCEPTION WHEN OTHERS THEN
    v_failed_as_expected := TRUE;
  END;

  IF NOT v_failed_as_expected THEN
    RAISE EXCEPTION 'ERROR PRUEBA 9: Se permitió duplicar la relación tutor_user_id + jugador_id.';
  END IF;
  RAISE NOTICE '[OK] Prueba 9: Bloqueo de duplicados UNIQUE(tutor_user_id, jugador_id) verificado.';

  -- 10. Limpieza de datos de prueba
  DELETE FROM public.vinculos_familiares WHERE jugador_id = v_jugador_id;
  DELETE FROM public.jugadores WHERE id = v_jugador_id;
  DELETE FROM public.profiles WHERE id IN (v_tutor_1, v_tutor_2, v_tutor_3, v_tutor_4, v_tutor_5, v_tutor_6);
  RAISE NOTICE '[OK] Prueba 10: Datos de prueba limpiados correctamente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M3 COMPLETADAS CON ÉXITO ===';
END $$;
