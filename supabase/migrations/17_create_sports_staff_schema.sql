-- =========================================================================
-- MIGRACIÓN 17: TABLAS CANÓNICAS DE CUERPO TÉCNICO Y ASIGNACIÓN A EQUIPOS
-- (public.personal_deportivo Y public.personal_equipo)
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.personal_deportivo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NULL,
  display_name TEXT NOT NULL,
  federation_person_id TEXT UNIQUE NULL,
  person_type VARCHAR(30) NOT NULL DEFAULT 'COACH',
  status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.personal_equipo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID NOT NULL REFERENCES public.personal_deportivo(id) ON DELETE RESTRICT,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE RESTRICT,
  season VARCHAR(20) NOT NULL DEFAULT '2026/2027',
  operational_role VARCHAR(30) NULL,
  federation_role VARCHAR(30) NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  start_date DATE NULL,
  end_date DATE NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_person_team_season_role UNIQUE (person_id, team_id, season, operational_role)
);

-- Restricciones CHECK
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_personal_deportivo_person_type') THEN
    ALTER TABLE public.personal_deportivo ADD CONSTRAINT chk_personal_deportivo_person_type 
      CHECK (person_type IN ('COACH', 'PHYSICAL_TRAINER', 'PHYSIOTHERAPIST', 'DELEGATE', 'OTHER'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_personal_deportivo_status') THEN
    ALTER TABLE public.personal_deportivo ADD CONSTRAINT chk_personal_deportivo_status 
      CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_personal_equipo_operational_role') THEN
    ALTER TABLE public.personal_equipo ADD CONSTRAINT chk_personal_equipo_operational_role 
      CHECK (operational_role IN ('HEAD_COACH', 'ASSISTANT_COACH', 'DELEGATE', 'PHYSICAL_TRAINER', 'PHYSIOTHERAPIST', 'OTHER'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_personal_equipo_federation_role') THEN
    ALTER TABLE public.personal_equipo ADD CONSTRAINT chk_personal_equipo_federation_role 
      CHECK (federation_role IN ('HEAD_COACH', 'ASSISTANT_COACH', 'DELEGATE', 'NONE', 'UNKNOWN'));
  END IF;
END $$;

-- Habilitar RLS
ALTER TABLE public.personal_deportivo ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_equipo ENABLE ROW LEVEL SECURITY;

-- Índices de búsqueda
CREATE INDEX IF NOT EXISTS idx_personal_deportivo_display_name ON public.personal_deportivo(display_name);
CREATE INDEX IF NOT EXISTS idx_personal_equipo_team ON public.personal_equipo(team_id);
CREATE INDEX IF NOT EXISTS idx_personal_equipo_person ON public.personal_equipo(person_id);
