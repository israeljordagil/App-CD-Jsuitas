-- =========================================================================
-- MIGRACIÓN 07: SEED IDEMPOTENTE DE REGLAS DE ENTRENAMIENTO 2026/2027
-- CD JESUITAS — 89 REGLAS RECURRENTES (100% DE LOS 31 EQUIPOS CANÓNICOS)
-- =========================================================================

-- Función temporal de verificación de seguridad: aborta si no existen los 31 equipos
DO $$
DECLARE
  v_team_count INT;
  v_missing_codes TEXT;
BEGIN
  -- Validar recuento exacto de 31 equipos activos para 2026/2027
  SELECT COUNT(*) INTO v_team_count FROM public.teams WHERE season = '2026/2027' AND is_active = TRUE;
  IF v_team_count <> 31 THEN
    RAISE EXCEPTION '[CRITICAL SEED ERROR] Se requieren exactamente 31 equipos canónicos en public.teams para la temporada 2026/2027. Encontrados: %', v_team_count;
  END IF;

  -- Comprobar la existencia exacta de todos los códigos de EQU-000001 a EQU-000031
  SELECT string_agg(expected_code, ', ') INTO v_missing_codes
  FROM (
    SELECT 'EQU-' || lpad(i::text, 6, '0') AS expected_code
    FROM generate_series(1, 31) AS i
  ) sub
  WHERE NOT EXISTS (
    SELECT 1 FROM public.teams t WHERE t.internal_code = sub.expected_code AND t.season = '2026/2027' AND t.is_active = TRUE
  );

  IF v_missing_codes IS NOT NULL AND v_missing_codes <> '' THEN
    RAISE EXCEPTION '[CRITICAL SEED ERROR] Faltan los siguientes códigos internos de equipo obligatorios: %', v_missing_codes;
  END IF;
END $$;

-- Inserción / Upsert Idempotente de las 89 Reglas Recurrentes
INSERT INTO public.training_schedules (
  team_id,
  season,
  weekday,
  start_time,
  end_time,
  valid_from,
  valid_until,
  timezone,
  status,
  is_active,
  notes
) VALUES
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 1, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 3, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000001'), '2026/2027', 5, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 1, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 3, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000002'), '2026/2027', 5, '15:45:00', '17:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Juveniles'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-07', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Formato FOOTBALL_5. Inicio especial 07/09/2026'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000031'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-07', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Formato FOOTBALL_5. Inicio especial 07/09/2026'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000015'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes temporada completa'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000016'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000017'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000018'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000019'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes temporada completa'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000020'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000021'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 1, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 3, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Alevines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000022'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000023'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes temporada completa'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000024'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000025'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-05-31', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo reducido octubre-mayo'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000026'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo octubre-junio'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario principal Benjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000027'), '2026/2027', 5, '17:30:00', '19:00:00', '2026-10-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Viernes periodo octubre-junio'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000028'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000029'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 2, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000030'), '2026/2027', 4, '17:30:00', '19:00:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Prebenjamines'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000009'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000010'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000011'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000012'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000013'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil Femenino'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 3, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil Femenino'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000014'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Infantil Femenino'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000003'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete A'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000004'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete B'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000005'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete C'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000006'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete D'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000007'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete E'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 2, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete Femenino'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 4, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete Femenino'),
  ((SELECT id FROM public.teams WHERE internal_code = 'EQU-000008'), '2026/2027', 5, '18:45:00', '20:15:00', '2026-09-01', '2027-06-25', 'Europe/Madrid', 'ACTIVE', TRUE, 'Horario oficial Cadete Femenino')
ON CONFLICT (team_id, season, weekday, start_time, end_time, valid_from, valid_until)
DO UPDATE SET
  end_time = EXCLUDED.end_time,
  valid_from = EXCLUDED.valid_from,
  valid_until = EXCLUDED.valid_until,
  timezone = EXCLUDED.timezone,
  status = EXCLUDED.status,
  is_active = EXCLUDED.is_active,
  notes = EXCLUDED.notes,
  updated_at = timezone('utc'::text, now());
