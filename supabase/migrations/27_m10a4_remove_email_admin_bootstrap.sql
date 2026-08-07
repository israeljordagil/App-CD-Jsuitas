-- =========================================================================
-- MIGRACIÓN 27: ELIMINACIÓN DE BOOTSTRAP ADMIN POR EMAIL EN HANDLE_NEW_USER (BLOQUE 4F.3 - M10-A.4)
-- Elimina completamente la asignación automática de ADMIN_GENERAL por email en signup.
-- handle_new_user() únicamente inserta en public.profiles y retorna NEW.
-- =========================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Asegurar vinculación del trigger on_auth_user_created en auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Trigger de creación automática de perfil en public.profiles (sin asignación automática de roles en signup) (M10-A.4)';
