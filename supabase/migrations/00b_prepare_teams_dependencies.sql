-- =========================================================================
-- MIGRACIÓN 00b: PREPARACIÓN DE INFRAESTRUCTURA Y DEPENDENCIAS DE EQUIPOS
-- CD Jesuitas — Temporada 2026/2027
-- Script idempotente y no destructivo para soportar public.teams y RLS
-- =========================================================================

-- 1. Crear extensión para soporte UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear tipo ENUM para roles de usuario si no existe
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_type') THEN
    CREATE TYPE user_role_type AS ENUM (
      'FAMILIA', 
      'JUGADOR', 
      'ENTRENADOR', 
      'COORDINADOR', 
      'DIR_DEPORTIVA', 
      'ADMIN_GENERAL'
    );
  END IF;
END $$;

-- 3. Crear tabla public.profiles de autenticación si no existe
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  status TEXT DEFAULT 'ACTIVO',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Crear tabla public.user_roles si no existe
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role_type NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, role)
);

-- 5. Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 6. Políticas RLS estrictas (Sin USING (true) ni correos hardcodeados)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can view own profile'
  ) THEN
    CREATE POLICY "Users can view own profile" 
      ON public.profiles FOR SELECT 
      TO authenticated 
      USING ( auth.uid() = id );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile" 
      ON public.profiles FOR UPDATE 
      TO authenticated 
      USING ( auth.uid() = id );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_roles' AND policyname = 'Users can view own roles'
  ) THEN
    CREATE POLICY "Users can view own roles" 
      ON public.user_roles FOR SELECT 
      TO authenticated 
      USING ( auth.uid() = user_id );
  END IF;
END $$;
