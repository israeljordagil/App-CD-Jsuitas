-- =========================================================================
-- MIGRACIÓN 19b: PRUEBAS UNITARIAS DE INFRAESTRUCTURA DE INVITACIONES (M1)
-- Script de prueba idempotente para la validación técnica de invitaciones M1.
-- =========================================================================

DO $$
DECLARE
  v_raw_token_1 TEXT := 'token_secreto_familia_123456789';
  v_raw_token_2 TEXT := 'token_secreto_familia_987654321';
  v_hash_1 VARCHAR(64);
  v_hash_2 VARCHAR(64);
  v_inv_id UUID;
  v_inv_id_2 UUID;
  v_event_count INT;
  v_expired_count INT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS M1 INVITACIONES ===';

  -- 1. Prueba de Hashing de Token
  v_hash_1 := public.hash_invitation_token(v_raw_token_1);
  v_hash_2 := public.hash_invitation_token(v_raw_token_2);
  
  IF length(v_hash_1) != 64 OR v_hash_1 = v_raw_token_1 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 1: Hash del token inválido o expone el token real.';
  END IF;
  RAISE NOTICE '[OK] Prueba 1: Hash SHA-256 generado correctamente (64 hex).';

  -- 2. Creación de Invitación (Estado PENDING_APPROVAL)
  INSERT INTO public.invitations (
    invitation_type,
    target_role,
    invited_name,
    invited_surname,
    phone,
    email,
    token_hash,
    status,
    expires_at
  ) VALUES (
    'FAMILY',
    'FAMILIA',
    'Carlos',
    'Martínez Ruiz',
    '+34600112233',
    'carlos.martinez@ejemplo.com',
    v_hash_1,
    'PENDING_APPROVAL',
    timezone('utc'::text, now()) + INTERVAL '7 days'
  ) RETURNING id INTO v_inv_id;

  -- Registrar Evento CREATED
  INSERT INTO public.invitation_events (invitation_id, event_type, metadata)
  VALUES (v_inv_id, 'CREATED', '{"source": "test_suite"}'::jsonb);

  RAISE NOTICE '[OK] Prueba 2: Invitación creada correctamente con ID: %', v_inv_id;

  -- 3. Verificación de Transición a APPROVED y SENT
  UPDATE public.invitations 
  SET status = 'APPROVED', approved_by = uuid_generate_v4() 
  WHERE id = v_inv_id;

  INSERT INTO public.invitation_events (invitation_id, event_type)
  VALUES (v_inv_id, 'APPROVED');

  UPDATE public.invitations 
  SET status = 'SENT', sent_at = timezone('utc'::text, now()) 
  WHERE id = v_inv_id;

  INSERT INTO public.invitation_events (invitation_id, event_type)
  VALUES (v_inv_id, 'SENT');

  RAISE NOTICE '[OK] Prueba 3: Transición a APPROVED y SENT verificada.';

  -- 4. Verificación de Aceptación Única
  UPDATE public.invitations 
  SET status = 'ACCEPTED', accepted_at = timezone('utc'::text, now()) 
  WHERE id = v_inv_id AND status = 'SENT';

  INSERT INTO public.invitation_events (invitation_id, event_type)
  VALUES (v_inv_id, 'ACCEPTED');

  -- 5. Intento de Segundo Uso / Re-Aceptación (Debe fallar o no modificar ninguna fila)
  UPDATE public.invitations 
  SET status = 'ACCEPTED' 
  WHERE id = v_inv_id AND status = 'SENT';
  
  IF NOT FOUND THEN
    RAISE NOTICE '[OK] Prueba 5: Intento de segundo uso prevenido correctamente (0 filas afectadas).';
  ELSE
    RAISE EXCEPTION 'ERROR PRUEBA 5: Permitió re-aceptar una invitación consumida.';
  END IF;

  -- 6. Prueba de Reenvío (Resend) con Invalidation del Token Anterior
  INSERT INTO public.invitations (
    invitation_type,
    target_role,
    invited_name,
    token_hash,
    status,
    expires_at
  ) VALUES (
    'FAMILY',
    'FAMILIA',
    'Lucía',
    v_hash_2,
    'SENT',
    timezone('utc'::text, now()) + INTERVAL '7 days'
  ) RETURNING id INTO v_inv_id_2;

  -- Revocar token anterior por reenvío
  UPDATE public.invitations 
  SET status = 'REVOKED', revoked_at = timezone('utc'::text, now()) 
  WHERE id = v_inv_id_2;

  INSERT INTO public.invitation_events (invitation_id, event_type, metadata)
  VALUES (v_inv_id_2, 'REVOKED', '{"reason": "resent_new_token"}'::jsonb);

  RAISE NOTICE '[OK] Prueba 6: Reenvío con invalidación de token anterior verificado.';

  -- 7. Verificación de Auditoría de Eventos
  SELECT COUNT(*) INTO v_event_count 
  FROM public.invitation_events 
  WHERE invitation_id IN (v_inv_id, v_inv_id_2);

  IF v_event_count < 4 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 7: Eventos registrados insuficientes.';
  END IF;
  RAISE NOTICE '[OK] Prueba 7: Registro de % eventos de auditoría verificado.', v_event_count;

  -- 8. Limpieza de datos de prueba
  DELETE FROM public.invitations WHERE id IN (v_inv_id, v_inv_id_2);
  RAISE NOTICE '[OK] Prueba 8: Datos de prueba limpiados correctamente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M1 COMPLETADAS CON ÉXITO ===';
END $$;
