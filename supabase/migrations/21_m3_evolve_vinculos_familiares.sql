-- =========================================================================
-- MIGRACIÓN 21: EVOLUCIÓN DE PUBLIC.VINCULOS_FAMILIARES (BLOQUE 4F.3 - M3)
-- Migración aditiva, reversible, compatible con los vínculos existentes.
-- =========================================================================

-- 1. Quitar la restricción CHECK antigua de parentesco si existe (para permitir nuevos valores)
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT conname 
    FROM pg_constraint 
    WHERE conrelid = 'public.vinculos_familiares'::regclass 
      AND contype = 'c' 
      AND pg_get_constraintdef(oid) LIKE '%parentesco%'
  ) LOOP
    EXECUTE 'ALTER TABLE public.vinculos_familiares DROP CONSTRAINT ' || quote_ident(r.conname);
  END LOOP;
END $$;

-- 2. Añadir nueva restricción CHECK de parentesco ampliada (incluye valores legacy y nuevos del Bloque 4C)
ALTER TABLE public.vinculos_familiares
  ADD CONSTRAINT chk_vinculos_parentesco 
  CHECK (parentesco IN ('PADRE', 'MADRE', 'TUTOR_LEGAL', 'ABUELO', 'ABUELA', 'TIO', 'TIA', 'OTRO_FAMILIAR_AUTORIZADO', 'AUTORIZADO'));

-- 3. Añadir nuevas columnas a public.vinculos_familiares
ALTER TABLE public.vinculos_familiares
  ADD COLUMN IF NOT EXISTS responsibility_level VARCHAR(50) DEFAULT 'RESPONSIBLE' NOT NULL,
  ADD COLUMN IF NOT EXISTS is_primary_reference BOOLEAN DEFAULT FALSE NOT NULL,
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  ADD COLUMN IF NOT EXISTS revoked_at TIMESTAMPTZ NULL,
  ADD COLUMN IF NOT EXISTS revoked_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL;

-- 4. Restricciones CHECK para responsibility_level, status y timestamp de revocación
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_vinculos_responsibility_level'
  ) THEN
    ALTER TABLE public.vinculos_familiares 
      ADD CONSTRAINT chk_vinculos_responsibility_level 
      CHECK (responsibility_level IN ('RESPONSIBLE', 'AUTHORIZED_FAMILY'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_vinculos_status'
  ) THEN
    ALTER TABLE public.vinculos_familiares 
      ADD CONSTRAINT chk_vinculos_status 
      CHECK (status IN ('ACTIVE', 'PENDING', 'SUSPENDED', 'REVOKED'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_vinculos_revoked_timestamp'
  ) THEN
    ALTER TABLE public.vinculos_familiares 
      ADD CONSTRAINT chk_vinculos_revoked_timestamp 
      CHECK (status != 'REVOKED' OR revoked_at IS NOT NULL);
  END IF;
END $$;

-- 5. Asegurar restricción UNIQUE(tutor_user_id, jugador_id) si no existiera
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conrelid = 'public.vinculos_familiares'::regclass 
      AND contype = 'u'
  ) THEN
    ALTER TABLE public.vinculos_familiares 
      ADD CONSTRAINT uq_vinculos_tutor_jugador UNIQUE (tutor_user_id, jugador_id);
  END IF;
END $$;

-- 6. Inicialización conservadora de datos para registros existentes
UPDATE public.vinculos_familiares
SET responsibility_level = CASE 
      WHEN parentesco IN ('PADRE', 'MADRE', 'TUTOR_LEGAL') THEN 'RESPONSIBLE'
      ELSE 'AUTHORIZED_FAMILY'
    END,
    is_primary_reference = COALESCE(es_representante_principal, FALSE)
WHERE responsibility_level IS NULL OR is_primary_reference IS NULL;

-- 7. Trigger de regla de negocio: Máximo de 5 familiares con status 'ACTIVE' por jugador
CREATE OR REPLACE FUNCTION public.check_max_active_family_members()
RETURNS TRIGGER AS $$
DECLARE
  v_active_count INT;
BEGIN
  IF NEW.status = 'ACTIVE' THEN
    SELECT COUNT(*) INTO v_active_count
    FROM public.vinculos_familiares
    WHERE jugador_id = NEW.jugador_id
      AND status = 'ACTIVE'
      AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid);

    IF v_active_count >= 5 THEN
      RAISE EXCEPTION 'Límite alcanzado: Un jugador no puede tener más de 5 familiares con estado ACTIVE (actuales: %).', v_active_count;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_max_active_family_members ON public.vinculos_familiares;
CREATE TRIGGER trg_check_max_active_family_members
  BEFORE INSERT OR UPDATE ON public.vinculos_familiares
  FOR EACH ROW EXECUTE PROCEDURE public.check_max_active_family_members();

-- Trigger helper para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_vinculos_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_vinculos_timestamp ON public.vinculos_familiares;
CREATE TRIGGER trg_update_vinculos_timestamp
  BEFORE UPDATE ON public.vinculos_familiares
  FOR EACH ROW EXECUTE PROCEDURE public.update_vinculos_timestamp();

COMMENT ON TABLE public.vinculos_familiares IS 'Relaciones familiares e independientes de temporada (M3 - Bloque 4F.3)';
COMMENT ON COLUMN public.vinculos_familiares.responsibility_level IS 'Nivel de responsabilidad: RESPONSIBLE (Padre/Madre/Tutor) o AUTHORIZED_FAMILY (Familiares autorizados)';
COMMENT ON COLUMN public.vinculos_familiares.is_primary_reference IS 'Referencia administrativa principal (Boolean). No concede permisos jerárquicos.';
