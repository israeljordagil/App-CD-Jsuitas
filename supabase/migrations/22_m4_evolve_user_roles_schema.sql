-- =========================================================================
-- MIGRACIÓN 22: EVOLUCIÓN DE PUBLIC.USER_ROLES (BLOQUE 4F.3 - M4)
-- Migración aditiva, reversible, compatible con el modelo multirol y multiequipo.
-- =========================================================================

-- 1. Ampliación del Enum user_role_type con nuevos roles
ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'DELEGADO';
ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'SEGUNDO_ENTRENADOR';
ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'PREPARADOR_FISICO';
ALTER TYPE user_role_type ADD VALUE IF NOT EXISTS 'FISIOTERAPEUTA';

-- 2. Añadir nuevas columnas a public.user_roles
ALTER TABLE public.user_roles
  ADD COLUMN IF NOT EXISTS scope_type VARCHAR(50) DEFAULT 'CLUB' NOT NULL,
  ADD COLUMN IF NOT EXISTS scope_id UUID NULL,
  ADD COLUMN IF NOT EXISTS deporte_codigo VARCHAR(50) NULL REFERENCES public.deportes(codigo) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS categoria_id UUID NULL REFERENCES public.categorias(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS equipo_id UUID NULL REFERENCES public.teams(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS temporada_id UUID NULL REFERENCES public.temporadas(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL;

-- 3. Restricciones CHECK para scope_type y status
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_roles_scope_type'
  ) THEN
    ALTER TABLE public.user_roles 
      ADD CONSTRAINT chk_user_roles_scope_type 
      CHECK (scope_type IN ('CLUB', 'SPORT', 'CATEGORY', 'TEAM', 'FOOTBALL_11'));
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'chk_user_roles_status'
  ) THEN
    ALTER TABLE public.user_roles 
      ADD CONSTRAINT chk_user_roles_status 
      CHECK (status IN ('ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE'));
  END IF;
END $$;

-- 4. Sustituir restricción plana UNIQUE(user_id, role) por Índice Único de Asignación Cómputo con COALESCE
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT conname 
    FROM pg_constraint 
    WHERE conrelid = 'public.user_roles'::regclass 
      AND contype = 'u' 
  ) LOOP
    EXECUTE 'ALTER TABLE public.user_roles DROP CONSTRAINT ' || quote_ident(r.conname);
  END LOOP;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS uq_idx_user_roles_assignment 
ON public.user_roles (
  user_id, 
  role, 
  COALESCE(equipo_id, '00000000-0000-0000-0000-000000000000'::uuid),
  COALESCE(scope_type, 'CLUB'),
  COALESCE(scope_id, '00000000-0000-0000-0000-000000000000'::uuid),
  COALESCE(temporada_id, '00000000-0000-0000-0000-000000000000'::uuid)
);

-- 5. Índices de Rendimiento y Búsqueda
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_user_roles_equipo_id ON public.user_roles(equipo_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_temporada_id ON public.user_roles(temporada_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_scope_type ON public.user_roles(scope_type);

-- 6. Trigger helper para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_user_roles_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_update_user_roles_timestamp ON public.user_roles;
CREATE TRIGGER trg_update_user_roles_timestamp
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE PROCEDURE public.update_user_roles_timestamp();

COMMENT ON TABLE public.user_roles IS 'Roles con ámbito, equipo y temporada por Persona (M4 - Bloque 4F.3)';
COMMENT ON COLUMN public.user_roles.scope_type IS 'Ámbito del rol: CLUB, SPORT, CATEGORY, TEAM, FOOTBALL_11';
COMMENT ON COLUMN public.user_roles.equipo_id IS 'Vinculación a equipo específico para roles de cuerpo técnico (Entrenador, Delegado, etc.)';
