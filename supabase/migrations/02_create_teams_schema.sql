-- =========================================================================
-- ESQUEMA Y MIGRACIÓN DEL MÓDULO NÚCLEO EQUIPOS — CD JESUITAS
-- Ejecuta este script directamente en el SQL Editor de Supabase / PostgreSQL.
-- =========================================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA TEAMS (CON NOMBRE COMPLETO Y CATEGORÍA COMO TEXTO. ¡SIN CAMPO letter!)
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  internal_code VARCHAR(20) UNIQUE NOT NULL, -- Ej: 'EQU-000001'
  name TEXT NOT NULL,                         -- Nombre completo del equipo: 'Alevín A', 'Cadete Femenino'. ¡SIN CAMPO letter!
  category TEXT NOT NULL,                     -- Categoría como texto: 'Alevín', 'Cadete', etc.
  sport TEXT DEFAULT 'Fútbol' NOT NULL,        -- 'Fútbol', 'Fútbol Sala', 'Baloncesto', 'Voleibol'
  gender VARCHAR(20) DEFAULT 'MIXTO',          -- 'MASCULINO', 'FEMENINO', 'MIXTO'
  season VARCHAR(20) DEFAULT '2026/2027' NOT NULL,
  status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL CHECK (status IN ('ACTIVE', 'INACTIVE', 'ARCHIVED')),
  observations TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by TEXT,
  updated_by TEXT
);

-- 2. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- 3. POLÍTICAS RLS SEGURAS (SIN SERVICE_ROLE EN LA APP CLIENTE EXPO)
CREATE POLICY "Lectura de equipos para usuarios autenticados" 
  ON public.teams FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Inserción de equipos para personal autorizado" 
  ON public.teams FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('ADMIN_GENERAL', 'DIR_DEPORTIVA', 'COORDINADOR')
    )
  );

CREATE POLICY "Modificación de equipos para personal autorizado" 
  ON public.teams FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() 
      AND role IN ('ADMIN_GENERAL', 'DIR_DEPORTIVA', 'COORDINADOR')
    )
  );

-- 4. SEED DE LOS 31 EQUIPOS REALES INICIALES TEMPORADA 2026/2027
INSERT INTO public.teams (internal_code, name, category, sport, gender, season, status) VALUES
  ('EQU-000001', 'Juvenil A', 'Juvenil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000002', 'Juvenil B', 'Juvenil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000003', 'Cadete A', 'Cadete', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000004', 'Cadete B', 'Cadete', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000005', 'Cadete C', 'Cadete', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000006', 'Cadete D', 'Cadete', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000007', 'Cadete E', 'Cadete', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000008', 'Cadete Femenino', 'Cadete', 'Fútbol', 'FEMENINO', '2026/2027', 'ACTIVE'),
  ('EQU-000009', 'Infantil A', 'Infantil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000010', 'Infantil B', 'Infantil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000011', 'Infantil C', 'Infantil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000012', 'Infantil D', 'Infantil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000013', 'Infantil E', 'Infantil', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000014', 'Infantil Femenino', 'Infantil', 'Fútbol', 'FEMENINO', '2026/2027', 'ACTIVE'),
  ('EQU-000015', 'Alevín A', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000016', 'Alevín B', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000017', 'Alevín C', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000018', 'Alevín D', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000019', 'Alevín E', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000020', 'Alevín F', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000021', 'Alevín G', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000022', 'Alevín H', 'Alevín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000023', 'Benjamín A', 'Benjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000024', 'Benjamín B', 'Benjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000025', 'Benjamín C', 'Benjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000026', 'Benjamín D', 'Benjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000027', 'Benjamín E', 'Benjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000028', 'Prebenjamín A', 'Prebenjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000029', 'Prebenjamín B', 'Prebenjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000030', 'Prebenjamín C', 'Prebenjamín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE'),
  ('EQU-000031', 'Querubines', 'Querubín', 'Fútbol', 'MIXTO', '2026/2027', 'ACTIVE')
ON CONFLICT (internal_code) DO NOTHING;
