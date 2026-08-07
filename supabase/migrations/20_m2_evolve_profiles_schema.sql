-- =========================================================================
-- MIGRACIÓN 20: EVOLUCIÓN DE PUBLIC.PROFILES A PERSONA CANÓNICA (BLOQUE 4F.3 - M2)
-- Migración aditiva, reversible y compatible con el esquema actual.
-- =========================================================================

-- 1. Añadir columnas estructuradas de Persona a public.profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS first_name VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS last_name VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS second_last_name VARCHAR(100) NULL,
  ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(10) DEFAULT 'es' NOT NULL;

-- 2. Restricción CHECK para idiomas permitidos ('es', 'en', 'ca')
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_profiles_preferred_language'
  ) THEN
    ALTER TABLE public.profiles 
      ADD CONSTRAINT chk_profiles_preferred_language 
      CHECK (preferred_language IN ('es', 'en', 'ca'));
  END IF;
END $$;

COMMENT ON COLUMN public.profiles.first_name IS 'Nombre de la Persona (M2 - Bloque 4F.3)';
COMMENT ON COLUMN public.profiles.last_name IS 'Primer Apellido de la Persona (M2 - Bloque 4F.3)';
COMMENT ON COLUMN public.profiles.second_last_name IS 'Segundo Apellido de la Persona (M2 - Bloque 4F.3)';
COMMENT ON COLUMN public.profiles.preferred_language IS 'Idioma preferido de la Persona (es, en, ca) (M2 - Bloque 4F.3)';
