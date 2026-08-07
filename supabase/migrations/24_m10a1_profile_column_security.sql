-- =========================================================================
-- MIGRACIÓN 24: PROTECCIÓN SEGURA DE COLUMNAS EN PUBLIC.PROFILES (BLOQUE 4F.3 - M10-A.1)
-- Trigger PostgreSQL BEFORE UPDATE y BEFORE INSERT para evitar manipulación de campos protegidos.
-- =========================================================================

CREATE OR REPLACE FUNCTION public.protect_profile_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- 1. Si el usuario autenticado es ADMIN_GENERAL, permitir mutaciones administrativas completas
  IF public.is_admin() THEN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  -- 2. En operaciones de UPDATE por un usuario normal
  IF TG_OP = 'UPDATE' THEN
    -- A. Rechazar modificación del ID de la persona
    IF NEW.id IS DISTINCT FROM OLD.id THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar el ID de un perfil.';
    END IF;

    -- B. Rechazar modificación del status de seguridad de la cuenta
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar el estado (status) de un perfil.';
    END IF;

    -- C. Rechazar modificación de la fecha de creación created_at
    IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar la fecha de creación del perfil.';
    END IF;

    -- D. Rechazar modificación directa del email de autenticación
    IF NEW.email IS DISTINCT FROM OLD.email THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar directamente el email del perfil. Utilice el flujo de autenticación de Supabase Auth.';
    END IF;

    -- Actualización automática del timestamp updated_at
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  -- 3. En operaciones de INSERT cliente por un usuario normal
  IF TG_OP = 'INSERT' THEN
    -- Garantizar que el ID coincida con auth.uid() si la inserción es iniciada por cliente
    IF auth.uid() IS NOT NULL AND NEW.id IS DISTINCT FROM auth.uid() THEN
      RAISE EXCEPTION 'Acceso Denegado: El ID del perfil debe coincidir con el usuario autenticado (auth.uid()).';
    END IF;

    -- Forzar status inicial ACTIVE (evita insertar con status administrativo manipulado)
    IF NOT public.is_admin() THEN
      NEW.status = 'ACTIVE';
    END IF;

    NEW.created_at = timezone('utc'::text, now());
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Vincular trigger BEFORE UPDATE OR INSERT en public.profiles
DROP TRIGGER IF EXISTS trg_protect_profile_columns ON public.profiles;
CREATE TRIGGER trg_protect_profile_columns
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.protect_profile_columns();

COMMENT ON FUNCTION public.protect_profile_columns() IS 'Protege columnas sensibles (id, status, created_at, email) contra mutaciones no autorizadas en profiles (M10-A.1)';
