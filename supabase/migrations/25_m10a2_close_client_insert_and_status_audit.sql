-- =========================================================================
-- MIGRACIÓN 25: CIERRE DE INSERT CLIENTE Y VERIFICACIÓN DE STATUS (BLOQUE 4F.3 - M10-A.2)
-- Aplica el principio DENY BY DEFAULT en INSERT sobre public.profiles para clientes normales.
-- Conserva el funcionamiento de handle_new_user() vía SECURITY DEFINER.
-- =========================================================================

-- 1. Actualización de la política Profiles insert policy
DROP POLICY IF EXISTS "Profiles insert policy" ON public.profiles;

-- Únicamente ADMIN_GENERAL puede realizar INSERT directo vía API cliente.
-- El trigger handle_new_user() ejecuta con SECURITY DEFINER y omite RLS para altas de auth.users.
CREATE POLICY "Profiles insert policy"
ON public.profiles FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- 2. Asegurar que protect_profile_columns() mantenga la protección en UPDATE sin forzar ACTIVE en INSERTs deshabilitados
CREATE OR REPLACE FUNCTION public.protect_profile_columns()
RETURNS TRIGGER AS $$
BEGIN
  -- Si el usuario autenticado es ADMIN_GENERAL, permitir mutaciones administrativas completas
  IF public.is_admin() THEN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  -- En operaciones de UPDATE por un usuario normal
  IF TG_OP = 'UPDATE' THEN
    -- Rechazar modificación del ID de la persona
    IF NEW.id IS DISTINCT FROM OLD.id THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar el ID de un perfil.';
    END IF;

    -- Rechazar modificación del status de seguridad de la cuenta
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar el estado (status) de un perfil.';
    END IF;

    -- Rechazar modificación de la fecha de creación created_at
    IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar la fecha de creación del perfil.';
    END IF;

    -- Rechazar modificación directa del email de autenticación
    IF NEW.email IS DISTINCT FROM OLD.email THEN
      RAISE EXCEPTION 'Acceso Denegado: No está autorizado a modificar directamente el email del perfil. Utilice el flujo de autenticación de Supabase Auth.';
    END IF;

    -- Actualización automática del timestamp updated_at
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  -- En operaciones de INSERT por trigger del sistema (handle_new_user) o ADMIN_GENERAL
  IF TG_OP = 'INSERT' THEN
    IF NEW.created_at IS NULL THEN
      NEW.created_at = timezone('utc'::text, now());
    END IF;
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

COMMENT ON POLICY "Profiles insert policy" ON public.profiles IS 'Cierre de INSERT cliente directo en profiles. Alta gestionada vía handle_new_user() o ADMIN_GENERAL (M10-A.2)';
