-- =========================================================================
-- MIGRACIÓN 08: CREACIÓN DEL MODELO CANÓNICO DE PARTIDOS (public.partidos)
-- Temporada 2026/2027 — CD Jesuitas
-- Estructura pura sin columnas heredadas obsoletas
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Crear tabla canónica public.partidos directamente con la estructura definitiva
CREATE TABLE IF NOT EXISTS public.partidos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,

  team_id UUID NOT NULL
    REFERENCES public.teams(id)
    ON DELETE RESTRICT,

  season VARCHAR(20) NOT NULL DEFAULT '2026/2027',

  competition_id UUID NULL,
  federation_match_id VARCHAR(100) NULL,
  source_event_key VARCHAR(255) NULL,

  source VARCHAR(30) NOT NULL DEFAULT 'MANUAL',
  source_reference TEXT NULL,

  matchday INTEGER NULL,
  round_name TEXT NULL,
  competition_name TEXT NULL,
  match_type VARCHAR(30) NOT NULL DEFAULT 'LEAGUE',

  opponent_name TEXT NOT NULL,
  opponent_slug TEXT NOT NULL,
  opponent_federation_id VARCHAR(100) NULL,

  is_home BOOLEAN NULL,
  home_team_name TEXT NULL,
  away_team_name TEXT NULL,

  scheduled_date DATE NOT NULL,
  scheduled_time TIME NULL,
  timezone VARCHAR(50) NOT NULL DEFAULT 'Europe/Madrid',
  scheduled_at TIMESTAMPTZ NULL,

  schedule_status VARCHAR(30) NOT NULL DEFAULT 'PROVISIONAL',
  weekend_start_date DATE NULL,
  weekend_end_date DATE NULL,

  venue_id UUID NULL,
  venue_name TEXT NULL,
  pitch_id UUID NULL,
  pitch_name TEXT NULL,

  referee_id UUID NULL,
  referee_name TEXT NULL,

  match_status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',

  home_score INTEGER NULL,
  away_score INTEGER NULL,
  result_confirmed BOOLEAN NOT NULL DEFAULT FALSE,

  last_federation_sync_at TIMESTAMPTZ NULL,
  federation_payload_hash TEXT NULL,
  federation_version TEXT NULL,

  sync_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  sync_error TEXT NULL,

  notes TEXT NULL,

  created_at TIMESTAMPTZ
    NOT NULL DEFAULT timezone('utc'::text, now()),

  updated_at TIMESTAMPTZ
    NOT NULL DEFAULT timezone('utc'::text, now()),

  created_by TEXT NULL,
  updated_by TEXT NULL
);

-- 2. Restricciones CHECK para validación de catálogos, marcadores, coherencia de resultado e intervalo
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_match_type') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_match_type 
      CHECK (match_type IN ('LEAGUE', 'FRIENDLY', 'CUP', 'TOURNAMENT', 'OTHER'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_schedule_status') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_schedule_status 
      CHECK (schedule_status IN ('PROVISIONAL', 'CONFIRMED', 'POSTPONED', 'SUSPENDED', 'CANCELLED'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_match_status') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_match_status 
      CHECK (match_status IN ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'SUSPENDED', 'CANCELLED'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_scores_non_negative') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_scores_non_negative 
      CHECK ((home_score IS NULL OR home_score >= 0) AND (away_score IS NULL OR away_score >= 0));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_result_confirmation') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_result_confirmation 
      CHECK (
        result_confirmed = FALSE 
        OR (home_score IS NOT NULL AND away_score IS NOT NULL)
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_weekend_range') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_weekend_range 
      CHECK (weekend_end_date IS NULL OR weekend_start_date IS NULL OR weekend_end_date >= weekend_start_date);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_partidos_sync_status') THEN
    ALTER TABLE public.partidos ADD CONSTRAINT chk_partidos_sync_status 
      CHECK (sync_status IS NULL OR sync_status IN ('PENDING', 'SYNCED', 'CHANGED', 'ERROR', 'MANUAL_OVERRIDE'));
  END IF;
END $$;

-- 3. Índices de unicidad deterministas e idempotencia
CREATE UNIQUE INDEX IF NOT EXISTS uq_partidos_federation_match_id 
  ON public.partidos(source, federation_match_id) 
  WHERE federation_match_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_partidos_source_event_key 
  ON public.partidos(source_event_key) 
  WHERE source_event_key IS NOT NULL;

-- 4. Habilitación RLS de Seguridad
ALTER TABLE public.partidos ENABLE ROW LEVEL SECURITY;

-- Eliminar política global abierta si existía previamente
DROP POLICY IF EXISTS "Lectura de partidos para usuarios autenticados" ON public.partidos;

-- RLS pendiente de políticas granulares cuando estén consolidadas las relaciones
-- Familia–Jugador–Equipo, asignaciones de entrenadores, delegados y ámbitos de coordinación.

-- 5. Índices de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_partidos_team_season ON public.partidos(team_id, season);
CREATE INDEX IF NOT EXISTS idx_partidos_date_status ON public.partidos(scheduled_date, match_status);
