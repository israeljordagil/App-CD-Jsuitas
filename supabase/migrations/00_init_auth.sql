-- =========================================================================
-- MIGRACIÓN 00: INITIAL AUTH & ROLES
-- Este script configura la base de datos para la autenticación y roles de CD Jesuitas.
-- CÓPIALO Y EJECÚTALO EN EL "SQL EDITOR" DE TU PANEL DE SUPABASE.
-- =========================================================================

-- 1. Crear extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear Enum de Roles disponibles
CREATE TYPE user_role_type AS ENUM (
  'FAMILIA', 
  'JUGADOR', 
  'ENTRENADOR', 
  'COORDINADOR', 
  'DIR_DEPORTIVA', 
  'ADMIN_GENERAL'
);

-- 3. Crear tabla public.profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  status TEXT DEFAULT 'ACTIVO',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Crear tabla de roles asignados a usuarios
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, role) -- Un usuario no puede tener el mismo rol duplicado
);

-- 5. Activar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de Seguridad (RLS) para profiles
-- Un usuario puede leer y actualizar su propio perfil
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
USING ( auth.uid() = id );

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING ( auth.uid() = id );

-- Un administrador general puede leer y actualizar TODOS los perfiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'ADMIN_GENERAL'
  )
);

CREATE POLICY "Admins can update all profiles" 
ON public.profiles FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'ADMIN_GENERAL'
  )
);

-- 7. Políticas de Seguridad (RLS) para user_roles
-- Un usuario puede ver sus propios roles
CREATE POLICY "Users can view own roles" 
ON public.user_roles FOR SELECT 
USING ( auth.uid() = user_id );

-- Solo un administrador puede ver, asignar o eliminar roles de cualquier persona
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() AND role = 'ADMIN_GENERAL'
  )
);

-- =========================================================================
-- TRIGGER AUTOMÁTICO: CREACIÓN DE PERFIL AL REGISTRARSE
-- =========================================================================

-- Función que se ejecuta cuando auth.users recibe un nuevo registro
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  
  -- Para que seas el primer Admin:
  -- Si el email coincide con el que vas a usar, se te asigna automáticamente el rol ADMIN_GENERAL.
  -- ¡CAMBIA 'tu_correo@ejemplo.com' POR EL CORREO CON EL QUE TE VAS A REGISTRAR EN SUPABASE!
  IF new.email = 'israel@ejemplo.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'ADMIN_GENERAL');
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que llama a la función
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =========================================================================
-- FUNCIONES AUXILIARES PARA EL RLS
-- =========================================================================
-- Crea una función segura para comprobar si un usuario es admin sin hacer joins en bucle
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'ADMIN_GENERAL'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
