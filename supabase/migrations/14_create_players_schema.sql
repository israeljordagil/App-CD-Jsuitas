-- =========================================================================
-- MIGRACIÓN 14: TABLA CANÓNICA DE JUGADORES (public.jugadores)
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.jugadores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  federation_player_id TEXT UNIQUE NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  birth_date DATE NULL,
  gender VARCHAR(20) NOT NULL DEFAULT 'MALE',
  federation_status VARCHAR(30) NOT NULL DEFAULT 'PENDING_DOCUMENTATION',
  source VARCHAR(30) NOT NULL DEFAULT 'FFCV',
  source_reference TEXT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_by TEXT NULL,
  updated_by TEXT NULL
);

-- Restricciones CHECK de Validación
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_jugadores_gender') THEN
    ALTER TABLE public.jugadores ADD CONSTRAINT chk_jugadores_gender 
      CHECK (gender IN ('MALE', 'FEMALE', 'UNSPECIFIED'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_jugadores_federation_status') THEN
    ALTER TABLE public.jugadores ADD CONSTRAINT chk_jugadores_federation_status 
      CHECK (federation_status IN ('IN_PROCESS', 'PENDING_DOCUMENTATION', 'PENDING_RENEWAL', 'ACTIVE', 'NOT_REGISTERED', 'UNKNOWN'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_jugadores_status') THEN
    ALTER TABLE public.jugadores ADD CONSTRAINT chk_jugadores_status 
      CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'PENDING_VERIFICATION'));
  END IF;
END $$;

-- Habilitación RLS por Defecto (Acceso cerrado por defecto sin políticas de escritura abierta)
ALTER TABLE public.jugadores ENABLE ROW LEVEL SECURITY;

-- Índices de búsqueda por identificador federativo y nombre
CREATE INDEX IF NOT EXISTS idx_jugadores_federation_id ON public.jugadores(federation_player_id);
CREATE INDEX IF NOT EXISTS idx_jugadores_last_name ON public.jugadores(last_name);
