-- =========================================================================
-- MIGRACIÓN 13: RECONCILIACIÓN CANÓNICA DE CLUBES RIVALES Y RESOLUCIÓN
-- DE VINCULACIONES DE PARTIDOS PENDIENTES
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

BEGIN;

-- 1. Actualización de Estados de Verificación para Clubes Canónicos Validados
UPDATE public.opponent_clubs
SET 
  verification_status = 'VERIFIED',
  notes = 'Coincidencia federativa verificada (ID 1597). Estado de verificación actualizado a VERIFIED.',
  updated_at = timezone('utc'::text, now())
WHERE slug = 'imposibles-betero';

UPDATE public.opponent_clubs
SET 
  verification_status = 'VERIFIED',
  notes = 'Coincidencia federativa verificada (ID 2638). Sección femenina asociada a C.F. Mare Nostrum Puerto Sagunto.',
  updated_at = timezone('utc'::text, now())
WHERE slug = 'sagunto-fem';


-- 2. Vinculación de los 7 Partidos Pendientes a sus Clubes Canónicos
-- a) Imposibles Bétero A e Imposibles Bétero C -> imposibles-betero (ID: b2000001-0000-4000-8000-000000000035)
UPDATE public.partidos
SET 
  opponent_club_id = (SELECT id FROM public.opponent_clubs WHERE slug = 'imposibles-betero'),
  updated_at = timezone('utc'::text, now())
WHERE opponent_slug IN ('imposibles-betero-a', 'imposibles-betero-c')
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

-- b) Sagunto FEM (2 partidos) -> sagunto-fem (ID: b2000001-0000-4000-8000-000000000036)
UPDATE public.partidos
SET 
  opponent_club_id = (SELECT id FROM public.opponent_clubs WHERE slug = 'sagunto-fem'),
  updated_at = timezone('utc'::text, now())
WHERE opponent_slug = 'sagunto-fem'
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

-- c) Ciutat E y Ciutat F -> ciutat-de-valencia (ID: b2000001-0000-4000-8000-000000000020)
UPDATE public.partidos
SET 
  opponent_club_id = (SELECT id FROM public.opponent_clubs WHERE slug = 'ciutat-de-valencia'),
  updated_at = timezone('utc'::text, now())
WHERE opponent_slug IN ('ciutat-e', 'ciutat-f')
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';

-- d) Crack E -> cracks (ID: b2000001-0000-4000-8000-000000000002)
UPDATE public.partidos
SET 
  opponent_club_id = (SELECT id FROM public.opponent_clubs WHERE slug = 'cracks'),
  updated_at = timezone('utc'::text, now())
WHERE opponent_slug = 'crack-e'
  AND sync_status IS DISTINCT FROM 'MANUAL_OVERRIDE';


-- 3. Limpieza Idempotente de Registros Huérfanos
-- Eliminar exclusivamente ciutat-e, ciutat-f y crack-e solo si no poseen partidos vinculados
DELETE FROM public.opponent_clubs
WHERE slug IN ('ciutat-e', 'ciutat-f', 'crack-e')
  AND NOT EXISTS (
    SELECT 1 
    FROM public.partidos 
    WHERE public.partidos.opponent_club_id = public.opponent_clubs.id
  );

COMMIT;
