-- =========================================================================
-- MIGRACIÓN 06: ESTRUCTURA CANÓNICA DE HORARIOS DE ENTRENAMIENTO RECURRENTES
-- Temporada 2026/2027 — CD Jesuitas
-- =========================================================================

-- 1. Crear tabla canónica public.training_schedules
CREATE TABLE IF NOT EXISTS public.training_schedules (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE RESTRICT,
  season VARCHAR(20) NOT NULL DEFAULT '2026/2027',
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 1 AND 7), -- 1=lunes, 7=domingo (ISO-8601)
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (end_time > start_time),
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL CHECK (valid_until >= valid_from),
  timezone VARCHAR(50) NOT NULL DEFAULT 'Europe/Madrid',
  facility_id UUID NULL,
  pitch_id UUID NULL,
  location_text TEXT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_by TEXT NULL,
  updated_by TEXT NULL,
  
  -- Restricción única estable que evita duplicados exactos de reglas recurrentes
  CONSTRAINT uq_training_schedule_rule UNIQUE (
    team_id, 
    season, 
    weekday, 
    start_time, 
    end_time, 
    valid_from, 
    valid_until
  )
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.training_schedules ENABLE ROW LEVEL SECURITY;

-- 3. Políticas RLS de lectura y modificación para usuarios autenticados
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'training_schedules' AND policyname = 'Lectura de horarios recurrentes para usuarios autenticados'
  ) THEN
    CREATE POLICY "Lectura de horarios recurrentes para usuarios autenticados"
      ON public.training_schedules FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'training_schedules' AND policyname = 'Gestión de horarios recurrentes para personal autorizado'
  ) THEN
    CREATE POLICY "Gestión de horarios recurrentes para personal autorizado"
      ON public.training_schedules FOR ALL
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_id = auth.uid()
          AND role IN ('ADMIN_GENERAL', 'DIR_DEPORTIVA', 'COORDINADOR', 'ENTRENADOR')
        )
      );
  END IF;
END $$;

-- 4. Índices de alto rendimiento para consultas por equipo y día de la semana
CREATE INDEX IF NOT EXISTS idx_training_schedules_team 
  ON public.training_schedules(team_id, season, is_active);

CREATE INDEX IF NOT EXISTS idx_training_schedules_weekday 
  ON public.training_schedules(weekday, is_active);
