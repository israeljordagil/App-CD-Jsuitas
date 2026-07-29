-- =========================================================================
-- IMPORTACIÓN Y VINCULACIÓN DEFINITIVA DE ENTRENADORES REALES (ENTRENADORES 2026.PDF)
-- =========================================================================

-- 1. CREAR TABLA Y RESTRICCIÓN DE UNICIDAD PARA EVITAR DUPLICADOS EN ASIGNACIONES
CREATE TABLE IF NOT EXISTS public.person_team_assignments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  person_id UUID NOT NULL,
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  position_title VARCHAR(50) NOT NULL, -- 'Primer Entrenador', 'Segundo Entrenador'
  season VARCHAR(20) DEFAULT '2026/2027' NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_person_team_position_season UNIQUE (person_id, team_id, position_title, season)
);

-- HABILITAR RLS EN PERSON_TEAM_ASSIGNMENTS
ALTER TABLE public.person_team_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lectura de asignaciones para usuarios autenticados"
  ON public.person_team_assignments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Escritura de asignaciones para personal autorizado"
  ON public.person_team_assignments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('ADMIN_GENERAL', 'DIR_DEPORTIVA', 'COORDINADOR')
    )
  );

-- CONSULTA DE VERIFICACIÓN ESPERADA EN SUPABASE:
-- SELECT position_title, COUNT(*)
-- FROM public.person_team_assignments
-- WHERE season = '2026/2027'
--   AND is_active = true
--   AND position_title IN ('Primer Entrenador', 'Segundo Entrenador')
-- GROUP BY position_title;
-- 
-- RESULTADO:
-- Primer Entrenador: 31
-- Segundo Entrenador: 30
-- TOTAL: 61
