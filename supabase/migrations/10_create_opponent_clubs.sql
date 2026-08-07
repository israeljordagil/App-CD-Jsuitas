-- =========================================================================
-- MIGRACIÓN 10: TABLA CANÓNICA DE CLUBES RIVALES (public.opponent_clubs)
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.opponent_clubs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  federation_club_id VARCHAR(50) UNIQUE NULL,
  official_name TEXT NOT NULL,
  normalized_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  crest_source_url TEXT NULL,
  crest_storage_path TEXT NULL,
  crest_storage_url TEXT NULL,
  crest_hash VARCHAR(64) NULL,
  crest_mime_type VARCHAR(100) NULL,
  crest_width INTEGER NULL,
  crest_height INTEGER NULL,
  crest_status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  source VARCHAR(30) NOT NULL DEFAULT 'FFCV',
  source_reference TEXT NULL,
  last_verified_at TIMESTAMPTZ NULL,
  verification_status VARCHAR(30) NOT NULL DEFAULT 'REVIEW_REQUIRED',
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_by TEXT NULL,
  updated_by TEXT NULL
);

-- Restricciones CHECK para validación de catálogos y coherencia dimensional
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_opponent_clubs_crest_status') THEN
    ALTER TABLE public.opponent_clubs ADD CONSTRAINT chk_opponent_clubs_crest_status 
      CHECK (crest_status IN ('PENDING', 'DOWNLOADED', 'CUSTOM', 'GENERIC_PLACEHOLDER', 'NOT_FOUND', 'ERROR'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_opponent_clubs_verification_status') THEN
    ALTER TABLE public.opponent_clubs ADD CONSTRAINT chk_opponent_clubs_verification_status 
      CHECK (verification_status IN ('VERIFIED', 'REVIEW_REQUIRED', 'AMBIGUOUS', 'NOT_FOUND'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_opponent_clubs_dimensions_positive') THEN
    ALTER TABLE public.opponent_clubs ADD CONSTRAINT chk_opponent_clubs_dimensions_positive 
      CHECK (
        (crest_width IS NULL OR crest_width > 0) AND 
        (crest_height IS NULL OR crest_height > 0)
      );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_opponent_clubs_slug_not_empty') THEN
    ALTER TABLE public.opponent_clubs ADD CONSTRAINT chk_opponent_clubs_slug_not_empty 
      CHECK (slug != '');
  END IF;
END $$;

-- Habilitación RLS de Seguridad y Documentación
ALTER TABLE public.opponent_clubs ENABLE ROW LEVEL SECURITY;

-- Eliminar política global abierta si existiera
DROP POLICY IF EXISTS "Lectura de opponent_clubs para usuarios autenticados" ON public.opponent_clubs;

-- RLS pendiente de implementación funcional cuando estén consolidados los permisos por rol.

-- Índices para búsqueda eficiente por slug e id federativo
CREATE INDEX IF NOT EXISTS idx_opponent_clubs_federation_id ON public.opponent_clubs(federation_club_id);
CREATE INDEX IF NOT EXISTS idx_opponent_clubs_slug ON public.opponent_clubs(slug);
