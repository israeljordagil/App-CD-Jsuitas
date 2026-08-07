-- =========================================================================
-- MIGRACIÓN 05: NORMALIZACIÓN DE TABLA CANÓNICA TEAMS — TEMPORADA 2026/2027
-- Nota técnica: public.equipos se conserva como esquema heredado pendiente de
-- consolidación futura. public.teams es la tabla operativa canónica actual.
-- Catalogo oficial: 31 equipos (14 F11, 16 F8, 1 F5).
-- =========================================================================

-- 1. Permite valores NULL en gender para los equipos pendientes de confirmación
ALTER TABLE public.teams
  ALTER COLUMN gender DROP NOT NULL;

-- 2. Añadir columnas de normalización a public.teams (no destructivas)
ALTER TABLE public.teams
  ADD COLUMN IF NOT EXISTS club_id UUID NULL,
  ADD COLUMN IF NOT EXISTS short_name VARCHAR(20),
  ADD COLUMN IF NOT EXISTS football_format VARCHAR(20) DEFAULT 'FOOTBALL_11',
  ADD COLUMN IF NOT EXISTS level VARCHAR(20) DEFAULT 'A',
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 3. Asegurar restricciones CHECK para formatos de fútbol permitidos
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_teams_football_format'
  ) THEN
    ALTER TABLE public.teams 
      ADD CONSTRAINT chk_teams_football_format 
      CHECK (football_format IN ('FOOTBALL_11', 'FOOTBALL_8', 'FOOTBALL_5'));
  END IF;
END $$;

-- 4. Sincronización automática de coherencia entre status e is_active
UPDATE public.teams
SET is_active = CASE 
  WHEN status = 'ACTIVE' THEN TRUE 
  ELSE FALSE 
END;

-- 5. Inserción / Upsert Idempotente de los 31 Equipos Oficiales Temporada 2026/2027
INSERT INTO public.teams (
  internal_code, 
  name, 
  short_name, 
  category, 
  sport, 
  football_format, 
  gender, 
  level, 
  season, 
  status, 
  is_active
) VALUES
  -- FÚTBOL 11 (14 equipos)
  ('EQU-000001', 'Juvenil A', 'JUV-A', 'Juvenil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000002', 'Juvenil B', 'JUV-B', 'Juvenil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'B', '2026/2027', 'ACTIVE', TRUE),

  ('EQU-000003', 'Cadete A', 'CAD-A', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000004', 'Cadete B', 'CAD-B', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'B', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000005', 'Cadete C', 'CAD-C', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'C', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000006', 'Cadete D', 'CAD-D', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'D', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000007', 'Cadete E', 'CAD-E', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'E', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000008', 'Cadete Femenino', 'CAD-FEM', 'Cadete', 'Fútbol', 'FOOTBALL_11', 'FEMENINO', 'FEMENINO', '2026/2027', 'ACTIVE', TRUE),

  ('EQU-000009', 'Infantil A', 'INF-A', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000010', 'Infantil B', 'INF-B', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'B', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000011', 'Infantil C', 'INF-C', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'C', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000012', 'Infantil D', 'INF-D', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'D', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000013', 'Infantil E', 'INF-E', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'MASCULINO', 'E', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000014', 'Infantil Femenino', 'INF-FEM', 'Infantil', 'Fútbol', 'FOOTBALL_11', 'FEMENINO', 'FEMENINO', '2026/2027', 'ACTIVE', TRUE),

  -- FÚTBOL BASE - FOOTBALL_8 (16 equipos)
  ('EQU-000015', 'Alevín A', 'ALE-A', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000016', 'Alevín B', 'ALE-B', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'B', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000017', 'Alevín C', 'ALE-C', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'C', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000018', 'Alevín D', 'ALE-D', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'D', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000019', 'Alevín E', 'ALE-E', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'E', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000020', 'Alevín F', 'ALE-F', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'F', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000021', 'Alevín G', 'ALE-G', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'G', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000022', 'Alevín H', 'ALE-H', 'Alevín', 'Fútbol', 'FOOTBALL_8', NULL, 'H', '2026/2027', 'ACTIVE', TRUE),

  ('EQU-000023', 'Benjamín A', 'BEN-A', 'Benjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000024', 'Benjamín B', 'BEN-B', 'Benjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'B', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000025', 'Benjamín C', 'BEN-C', 'Benjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'C', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000026', 'Benjamín D', 'BEN-D', 'Benjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'D', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000027', 'Benjamín E', 'BEN-E', 'Benjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'E', '2026/2027', 'ACTIVE', TRUE),

  ('EQU-000028', 'Prebenjamín A', 'PRE-A', 'Prebenjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'A', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000029', 'Prebenjamín B', 'PRE-B', 'Prebenjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'B', '2026/2027', 'ACTIVE', TRUE),
  ('EQU-000030', 'Prebenjamín C', 'PRE-C', 'Prebenjamín', 'Fútbol', 'FOOTBALL_8', NULL, 'C', '2026/2027', 'ACTIVE', TRUE),

  -- FÚTBOL BASE - FOOTBALL_5 (1 equipo)
  ('EQU-000031', 'Querubines', 'QUE-U', 'Querubín', 'Fútbol', 'FOOTBALL_5', NULL, 'UNICO', '2026/2027', 'ACTIVE', TRUE)

ON CONFLICT (internal_code) 
DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  category = EXCLUDED.category,
  sport = EXCLUDED.sport,
  football_format = EXCLUDED.football_format,
  gender = EXCLUDED.gender,
  level = EXCLUDED.level,
  season = EXCLUDED.season,
  status = EXCLUDED.status,
  is_active = EXCLUDED.is_active,
  updated_at = timezone('utc'::text, now());
