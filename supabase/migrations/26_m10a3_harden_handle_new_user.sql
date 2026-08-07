-- =========================================================================
-- MIGRACIÓN 26: HARDENING Y VERIFICACIÓN DE HANDLE_NEW_USER() (BLOQUE 4F.3 - M10-A.3)
-- Añade la cláusula explícita SET search_path = public, pg_temp a la función handle_new_user().
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  
  -- Asignación automática inicial para administración si el correo coincide
  IF new.email = 'israel@ejemplo.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'ADMIN_GENERAL');
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Asegurar vinculación del trigger on_auth_user_created en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Trigger de creación automática de perfil en auth.users con search_path seguro y SECURITY DEFINER (M10-A.3)';
