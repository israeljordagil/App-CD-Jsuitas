-- =========================================================================
-- MIGRACIÓN 23: SEGURIDAD RLS CANÓNICA DE IDENTIDAD, ROLES Y VÍNCULOS (BLOQUE 4F.3 - M10-A)
-- Migración aislada, no destructiva, reversible y segura por defecto.
-- =========================================================================

-- 1. REFORZAMIENTO DE FUNCIONES HELPER SECURITY DEFINER CON SEARCH_PATH SEGURO

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() 
      AND role = 'ADMIN_GENERAL'
      AND status = 'ACTIVE'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

CREATE OR REPLACE FUNCTION public.current_user_has_active_role(p_role VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = p_role
      AND status = 'ACTIVE'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- =========================================================================
-- 2. POLÍTICAS DE SEGURIDAD RLS PARA PUBLIC.PROFILES
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles update policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles insert policy" ON public.profiles;
DROP POLICY IF EXISTS "Profiles delete policy" ON public.profiles;

-- SELECT: Propietario de la cuenta o ADMIN_GENERAL
CREATE POLICY "Profiles select policy"
ON public.profiles FOR SELECT
USING (
  auth.uid() = id OR public.is_admin()
);

-- UPDATE: Propietario de la cuenta o ADMIN_GENERAL
CREATE POLICY "Profiles update policy"
ON public.profiles FOR UPDATE
USING (
  auth.uid() = id OR public.is_admin()
)
WITH CHECK (
  auth.uid() = id OR public.is_admin()
);

-- INSERT: Propietario en registro inicial o ADMIN_GENERAL
CREATE POLICY "Profiles insert policy"
ON public.profiles FOR INSERT
WITH CHECK (
  auth.uid() = id OR public.is_admin()
);

-- DELETE: Exclusivo ADMIN_GENERAL
CREATE POLICY "Profiles delete policy"
ON public.profiles FOR DELETE
USING (
  public.is_admin()
);

-- =========================================================================
-- 3. POLÍTICAS DE SEGURIDAD RLS PARA PUBLIC.USER_ROLES
-- =========================================================================

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "User roles select policy" ON public.user_roles;
DROP POLICY IF EXISTS "User roles insert policy" ON public.user_roles;
DROP POLICY IF EXISTS "User roles update policy" ON public.user_roles;
DROP POLICY IF EXISTS "User roles delete policy" ON public.user_roles;

-- SELECT: Propietario de las asignaciones de rol o ADMIN_GENERAL
CREATE POLICY "User roles select policy"
ON public.user_roles FOR SELECT
USING (
  auth.uid() = user_id OR public.is_admin()
);

-- INSERT: Únicamente ADMIN_GENERAL (Bloqueo absoluto de autoconcesión de roles)
CREATE POLICY "User roles insert policy"
ON public.user_roles FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- UPDATE: Únicamente ADMIN_GENERAL
CREATE POLICY "User roles update policy"
ON public.user_roles FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

-- DELETE: Únicamente ADMIN_GENERAL
CREATE POLICY "User roles delete policy"
ON public.user_roles FOR DELETE
USING (
  public.is_admin()
);

-- =========================================================================
-- 4. POLÍTICAS DE SEGURIDAD RLS PARA PUBLIC.VINCULOS_FAMILIARES
-- =========================================================================

ALTER TABLE public.vinculos_familiares ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Vinculos select policy" ON public.vinculos_familiares;
DROP POLICY IF EXISTS "Vinculos insert policy" ON public.vinculos_familiares;
DROP POLICY IF EXISTS "Vinculos update policy" ON public.vinculos_familiares;
DROP POLICY IF EXISTS "Vinculos delete policy" ON public.vinculos_familiares;

-- SELECT: Únicamente el tutor autenticado del vínculo o ADMIN_GENERAL
CREATE POLICY "Vinculos select policy"
ON public.vinculos_familiares FOR SELECT
USING (
  auth.uid() = tutor_user_id OR public.is_admin()
);

-- INSERT: Únicamente ADMIN_GENERAL (Las mutaciones de familiares requieren backend/invitación)
CREATE POLICY "Vinculos insert policy"
ON public.vinculos_familiares FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- UPDATE: Únicamente ADMIN_GENERAL
CREATE POLICY "Vinculos update policy"
ON public.vinculos_familiares FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

-- DELETE: Únicamente ADMIN_GENERAL
CREATE POLICY "Vinculos delete policy"
ON public.vinculos_familiares FOR DELETE
USING (
  public.is_admin()
);

-- =========================================================================
-- 5. VERIFICACIÓN Y REFORZAMIENTO DE INVITACIONES E INVITATION_EVENTS
-- =========================================================================

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitation_events ENABLE ROW LEVEL SECURITY;

-- Se confirma expresamente que public.invitations y public.invitation_events 
-- mantienen 0 políticas públicas abiertas (DENY ALL para clientes frontend).
-- Únicamente accesibles mediante backend con la clave service-role.

COMMENT ON TABLE public.profiles IS 'Entidad Persona Canónica protegida con RLS M10-A';
COMMENT ON TABLE public.user_roles IS 'Asignaciones de rol y permisos protegidas con RLS M10-A';
COMMENT ON TABLE public.vinculos_familiares IS 'Relaciones familiares protegidas con RLS M10-A';
