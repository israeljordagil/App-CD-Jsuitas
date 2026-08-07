-- =========================================================================
-- MIGRACIÓN 15: ASIGNACIÓN DE JUGADORES A EQUIPOS POR TEMPORADA (public.jugador_equipos)
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

CREATE TABLE IF NOT EXISTS public.jugador_equipos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES public.jugadores(id) ON DELETE RESTRICT,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE RESTRICT,
  season VARCHAR(20) NOT NULL DEFAULT '2026/2027',
  assignment_type VARCHAR(30) NOT NULL DEFAULT 'FEDERATIVE',
  registration_status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
  is_primary_team BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  shirt_number INTEGER NULL,
  position TEXT NULL,
  joined_at DATE NULL,
  left_at DATE NULL,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_player_team_season_assignment UNIQUE (player_id, team_id, season, assignment_type)
);

-- Restricciones CHECK
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_jugador_equipos_assignment_type') THEN
    ALTER TABLE public.jugador_equipos ADD CONSTRAINT chk_jugador_equipos_assignment_type 
      CHECK (assignment_type IN ('FEDERATIVE', 'SPORTING', 'BOTH', 'SUPPORT'));
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_jugador_equipos_registration_status') THEN
    ALTER TABLE public.jugador_equipos ADD CONSTRAINT chk_jugador_equipos_registration_status 
      CHECK (registration_status IN ('ACTIVE', 'PENDING', 'CANCELLED', 'TRANSFERRED'));
  END IF;
END $$;

-- Habilitar RLS
ALTER TABLE public.jugador_equipos ENABLE ROW LEVEL SECURITY;

-- Índices de búsqueda por jugador, equipo y temporada
CREATE INDEX IF NOT EXISTS idx_jugador_equipos_player ON public.jugador_equipos(player_id);
CREATE INDEX IF NOT EXISTS idx_jugador_equipos_team ON public.jugador_equipos(team_id);
CREATE INDEX IF NOT EXISTS idx_jugador_equipos_season ON public.jugador_equipos(season);
