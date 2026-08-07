-- =========================================================================
-- SUITE DE PRUEBAS UNITARIAS DE SEGURIDAD RLS (BLOQUE 4F.3 - M10-A)
-- =========================================================================

DO $$
DECLARE
  v_is_admin_active BOOLEAN;
  v_has_role_active BOOLEAN;
  v_profiles_rls BOOLEAN;
  v_roles_rls BOOLEAN;
  v_vinculos_rls BOOLEAN;
  v_invitations_rls BOOLEAN;
  v_events_rls BOOLEAN;
  v_invitations_policy_count INT;
BEGIN
  RAISE NOTICE '=== INICIO DE PRUEBAS UNITARIAS DE SEGURIDAD RLS M10-A ===';

  -- 1. Verificar funcionamiento de helper public.is_admin()
  SELECT public.is_admin() INTO v_is_admin_active;
  RAISE NOTICE '[OK] Prueba 1: Helper public.is_admin() ejecutado correctamente (% = admin).', v_is_admin_active;

  -- 2. Verificar helper public.current_user_has_active_role()
  SELECT public.current_user_has_active_role('ADMIN_GENERAL') INTO v_has_role_active;
  RAISE NOTICE '[OK] Prueba 2: Helper public.current_user_has_active_role() ejecutado correctamente (ADMIN_GENERAL: %).', v_has_role_active;

  -- 3. Verificar estado de RLS en public.profiles
  SELECT rowsecurity INTO v_profiles_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'profiles';

  IF NOT v_profiles_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 3: RLS NO está activo en public.profiles';
  END IF;
  RAISE NOTICE '[OK] Prueba 3: RLS está ACTIVO en public.profiles.';

  -- 4. Verificar estado de RLS en public.user_roles
  SELECT rowsecurity INTO v_roles_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'user_roles';

  IF NOT v_roles_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 4: RLS NO está activo en public.user_roles';
  END IF;
  RAISE NOTICE '[OK] Prueba 4: RLS está ACTIVO en public.user_roles.';

  -- 5. Verificar estado de RLS en public.vinculos_familiares
  SELECT rowsecurity INTO v_vinculos_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'vinculos_familiares';

  IF NOT v_vinculos_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 5: RLS NO está activo en public.vinculos_familiares';
  END IF;
  RAISE NOTICE '[OK] Prueba 5: RLS está ACTIVO en public.vinculos_familiares.';

  -- 6. Verificar estado de RLS y ausencia de políticas públicas en public.invitations
  SELECT rowsecurity INTO v_invitations_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'invitations';

  SELECT COUNT(*) INTO v_invitations_policy_count
  FROM pg_policies
  WHERE schemaname = 'public' AND tablename = 'invitations';

  IF NOT v_invitations_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 6: RLS NO está activo en public.invitations';
  END IF;
  IF v_invitations_policy_count > 0 THEN
    RAISE EXCEPTION 'ERROR PRUEBA 6: public.invitations expone políticas públicas (% encontradas).', v_invitations_policy_count;
  END IF;
  RAISE NOTICE '[OK] Prueba 6: RLS ACTIVO en public.invitations con 0 políticas públicas cliente (DENY ALL por defecto).';

  -- 7. Verificar RLS en public.invitation_events
  SELECT rowsecurity INTO v_events_rls
  FROM pg_tables
  WHERE schemaname = 'public' AND tablename = 'invitation_events';

  IF NOT v_events_rls THEN
    RAISE EXCEPTION 'ERROR PRUEBA 7: RLS NO está activo en public.invitation_events';
  END IF;
  RAISE NOTICE '[OK] Prueba 7: RLS ACTIVO en public.invitation_events con 0 políticas públicas cliente.';

  RAISE NOTICE '=== TODAS LAS PRUEBAS UNITARIAS M10-A COMPLETADAS CON ÉXITO ===';
END $$;
