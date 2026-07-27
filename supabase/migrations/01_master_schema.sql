-- =========================================================================
-- ESQUEMA COMPLETO Y DEFINITIVO DE BASE DE DATOS — CD JESUITAS
-- Ejecuta este script directamente en el SQL Editor de Supabase / PostgreSQL.
-- =========================================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================================================================
-- 1. TIPOS Y ENUMS
-- =========================================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role_type') THEN
    CREATE TYPE user_role_type AS ENUM ('FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR', 'DIR_DEPORTIVA', 'ADMIN_GENERAL');
  END IF;
END $$;

-- =========================================================================
-- 2. TABLAS BASE DE AUTENTICACIÓN Y ROLES (INTEGRADO CON SUPABASE AUTH)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefono VARCHAR(20),
  avatar_url TEXT,
  fecha_nacimiento DATE,
  status TEXT DEFAULT 'ACTIVO',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role user_role_type NOT NULL,
  ambito_deporte_id UUID,
  ambito_categoria_id UUID,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id, role)
);

-- =========================================================================
-- 3. INFRAESTRUCTURA DEL CLUB (DEPORTES, TEMPORADAS, CATEGORÍAS, INSTALACIONES)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.deportes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  codigo VARCHAR(20) UNIQUE NOT NULL CHECK (codigo IN ('FUTBOL', 'FUTBOL_SALA', 'BALONCESTO', 'VOLEIBOL')),
  nombre VARCHAR(50) NOT NULL,
  icono_fa VARCHAR(50),
  configuracion_reglas JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.temporadas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(50) UNIQUE NOT NULL, -- Ej: '2026/2027'
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  actual BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deporte_id UUID REFERENCES public.deportes(id) ON DELETE CASCADE NOT NULL,
  codigo VARCHAR(30) NOT NULL, -- Ej: 'CADETE', 'INFANTIL_BASKET'
  nombre VARCHAR(50) NOT NULL,
  edad_minima INT NOT NULL,
  edad_maxima INT NOT NULL,
  modalidad VARCHAR(30) -- Ej: 'F11', 'F8', 'BASKET_5V5', 'VOLEY_6V6'
);

CREATE TABLE IF NOT EXISTS public.instalaciones (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  direccion TEXT,
  tipo_superficie VARCHAR(50),
  es_propia BOOLEAN DEFAULT TRUE
);

-- =========================================================================
-- 4. EQUIPOS, JUGADORES Y TUTELA FAMILIAR (RGPD)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.equipos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deporte_id UUID REFERENCES public.deportes(id) NOT NULL,
  categoria_id UUID REFERENCES public.categorias(id) NOT NULL,
  temporada_id UUID REFERENCES public.temporadas(id) NOT NULL,
  nombre VARCHAR(100) NOT NULL, -- Ej: 'Infantil A', 'Cadete B'
  genero VARCHAR(20) NOT NULL CHECK (genero IN ('MASCULINO', 'FEMENINO', 'MIXTO')),
  competicion_nombre VARCHAR(150),
  grupo_federativo VARCHAR(50),
  grupo_whatsapp_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.jugadores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Puede ser nulo si el menor <14 años no tiene login propio
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(150) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  genero VARCHAR(20) NOT NULL CHECK (genero IN ('MASCULINO', 'FEMENINO', 'MIXTO')),
  dorsal_habitual VARCHAR(5),
  posicion_principal VARCHAR(50),
  posicion_secundaria VARCHAR(50),
  avatar_oficial_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.vinculos_familiares (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tutor_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  jugador_id UUID REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  parentesco VARCHAR(50) NOT NULL CHECK (parentesco IN ('PADRE', 'MADRE', 'TUTOR_LEGAL', 'AUTORIZADO')),
  es_representante_principal BOOLEAN DEFAULT TRUE,
  recibe_notificaciones BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(tutor_user_id, jugador_id)
);

CREATE TABLE IF NOT EXISTS public.consentimientos_rgpd (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tutor_user_id UUID REFERENCES public.profiles(id) NOT NULL,
  jugador_id UUID REFERENCES public.jugadores(id),
  tratamiento_fotografia_interna BOOLEAN DEFAULT FALSE,
  tratamiento_video_analisis BOOLEAN DEFAULT FALSE,
  publicacion_redes_sociales BOOLEAN DEFAULT FALSE,
  comunicaciones_promocionales BOOLEAN DEFAULT FALSE,
  fecha_firmado TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.jugadores_equipos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  jugador_id UUID REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  equipo_id UUID REFERENCES public.equipos(id) ON DELETE CASCADE NOT NULL,
  dorsal VARCHAR(5) NOT NULL,
  posicion_habitual VARCHAR(50),
  es_capitan BOOLEAN DEFAULT FALSE,
  estado_licencia VARCHAR(30) DEFAULT 'PENDIENTE' CHECK (estado_licencia IN ('ALTA', 'PENDIENTE', 'BAJA', 'TRAMITE')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(jugador_id, equipo_id)
);

CREATE TABLE IF NOT EXISTS public.cuerpo_tecnico_equipos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  entrenador_user_id UUID REFERENCES public.profiles(id) NOT NULL,
  equipo_id UUID REFERENCES public.equipos(id) ON DELETE CASCADE NOT NULL,
  rol_cuerpo_tecnico VARCHAR(50) NOT NULL CHECK (rol_cuerpo_tecnico IN ('PRIMER_ENTRENADOR', 'SEGUNDO_ENTRENADOR', 'PREPARADOR_FISICO', 'DELEGADO')),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(entrenador_user_id, equipo_id, rol_cuerpo_tecnico)
);

CREATE TABLE IF NOT EXISTS public.estado_operativo_salud (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  jugador_id UUID UNIQUE REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  estado_aptitud VARCHAR(30) NOT NULL CHECK (estado_aptitud IN ('APTO', 'NO_APTO', 'LIMITACION_TEMPORAL', 'VALORACION_PENDIENTE')),
  reconocimiento_medico_vigente BOOLEAN DEFAULT TRUE,
  fecha_vencimiento_reconocimiento DATE,
  instruccion_emergencia_operativa TEXT,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 5. GAMIFICACIÓN Y PROGRESIÓN DE JUGADORES
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.retos_insignias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deporte_id UUID REFERENCES public.deportes(id),
  codigo VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria VARCHAR(40) CHECK (categoria IN ('ATAQUE', 'DEFENSA', 'ENTRENAMIENTO', 'COMPANERISMO', 'VALORES', 'TEMPORADA')),
  puntos_xp INT DEFAULT 50,
  es_de_valores BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS public.progresion_jugador (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  jugador_id UUID UNIQUE REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  xp_acumulada INT DEFAULT 0,
  nivel_actual INT DEFAULT 1,
  titulo_nivel VARCHAR(80) DEFAULT 'Iniciado del Escudo'
);

CREATE TABLE IF NOT EXISTS public.insignias_jugador (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  jugador_id UUID REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  reto_insignia_id UUID REFERENCES public.retos_insignias(id) NOT NULL,
  otorgado_en TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(jugador_id, reto_insignia_id)
);

-- =========================================================================
-- 6. ENTRENAMIENTOS Y ASISTENCIA
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.sesiones_entrenamiento (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  equipo_id UUID REFERENCES public.equipos(id) ON DELETE CASCADE NOT NULL,
  instalacion_id UUID REFERENCES public.instalaciones(id),
  fecha_hora_inicio TIMESTAMPTZ NOT NULL,
  duracion_minutos INT DEFAULT 90,
  objetivo_principal TEXT,
  entrenador_responsable_id UUID REFERENCES public.profiles(id),
  valoracion_sesion INT CHECK (valoracion_sesion BETWEEN 1 AND 5),
  observaciones_entrenador TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.ejercicios_entrenamiento (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sesion_id UUID REFERENCES public.sesiones_entrenamiento(id) ON DELETE CASCADE NOT NULL,
  orden INT NOT NULL,
  bloque VARCHAR(50) CHECK (bloque IN ('ACTIVACION', 'TECNICA', 'TACTICA', 'FISICO', 'JUEGO_APLICADO', 'VUELTA_CALMA')),
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT,
  duracion_minutos INT,
  material_necesario TEXT
);

CREATE TABLE IF NOT EXISTS public.asistencia_entrenamiento (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sesion_id UUID REFERENCES public.sesiones_entrenamiento(id) ON DELETE CASCADE NOT NULL,
  jugador_id UUID REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  estado VARCHAR(30) NOT NULL CHECK (estado IN ('PRESENTE', 'AUSENCIA_JUSTIFICADA', 'AUSENCIA_INJUSTIFICADA', 'RETRASO', 'LESIONADO')),
  observacion VARCHAR(255),
  UNIQUE(sesion_id, jugador_id)
);

-- =========================================================================
-- 7. PARTIDOS, CONVOCATORIAS Y EVENTOS EN VIVO (MULTIDEPORTE)
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.partidos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  equipo_local_id UUID REFERENCES public.equipos(id),
  equipo_visitante_id UUID REFERENCES public.equipos(id),
  nombre_rival_externo VARCHAR(150),
  deporte_id UUID REFERENCES public.deportes(id) NOT NULL,
  temporada_id UUID REFERENCES public.temporadas(id) NOT NULL,
  instalacion_id UUID REFERENCES public.instalaciones(id),
  es_local BOOLEAN DEFAULT TRUE NOT NULL,
  fecha_hora_partido TIMESTAMPTZ NOT NULL,
  fecha_hora_citacion TIMESTAMPTZ NOT NULL,
  estado VARCHAR(30) DEFAULT 'PROGRAMADO' CHECK (estado IN ('PROGRAMADO', 'EN_DIRECTO', 'FINALIZADO', 'APLAZADO', 'SUSPENDIDO')),
  marcador_local INT DEFAULT 0,
  marcador_visitante INT DEFAULT 0,
  detalles_marcador_periodos JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.convocatorias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partido_id UUID UNIQUE REFERENCES public.partidos(id) ON DELETE CASCADE NOT NULL,
  equipacion_color VARCHAR(50) NOT NULL,
  indicaciones_entrenador TEXT,
  fecha_limite_confirmacion TIMESTAMPTZ,
  publicada BOOLEAN DEFAULT FALSE,
  publicada_en TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.convocatoria_jugadores (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  convocatoria_id UUID REFERENCES public.convocatorias(id) ON DELETE CASCADE NOT NULL,
  jugador_id UUID REFERENCES public.jugadores(id) ON DELETE CASCADE NOT NULL,
  estado_confirmacion VARCHAR(30) DEFAULT 'PENDIENTE' CHECK (estado_confirmacion IN ('PENDIENTE', 'CONFIRMADO', 'NO_DISPONIBLE')),
  motivo_no_disponible VARCHAR(255),
  es_titular_previsto BOOLEAN DEFAULT FALSE,
  confirmado_por_user_id UUID REFERENCES public.profiles(id),
  confirmado_en TIMESTAMPTZ,
  UNIQUE(convocatoria_id, jugador_id)
);

CREATE TABLE IF NOT EXISTS public.eventos_partido (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partido_id UUID REFERENCES public.partidos(id) ON DELETE CASCADE NOT NULL,
  minuto_segundo VARCHAR(10),
  periodo_o_set INT,
  tipo_evento VARCHAR(50) NOT NULL,
  jugador_principal_id UUID REFERENCES public.jugadores(id),
  jugador_secundario_id UUID REFERENCES public.jugadores(id),
  payload_especifico JSONB DEFAULT '{}'::jsonb,
  registrado_en TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.actas_partido (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  partido_id UUID UNIQUE REFERENCES public.partidos(id) ON DELETE CASCADE NOT NULL,
  resultado_final_local INT NOT NULL,
  resultado_final_visitante INT NOT NULL,
  resumen_periodos_sets JSONB NOT NULL,
  observaciones_coordinacion TEXT,
  incidencias_arbitrales TEXT,
  cerrado_por_entrenador_id UUID REFERENCES public.profiles(id),
  validado_por_coordinador_id UUID REFERENCES public.profiles(id),
  validado_en TIMESTAMPTZ,
  estado_acta VARCHAR(30) DEFAULT 'PENDIENTE_VALIDACION' CHECK (estado_acta IN ('BORRADOR', 'PENDIENTE_VALIDACION', 'VALIDADA', 'RECHAZADA'))
);

-- =========================================================================
-- 8. PIZARRA TÁCTICA
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.sistemas_tacticos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  deporte_id UUID REFERENCES public.deportes(id) NOT NULL,
  equipo_id UUID REFERENCES public.equipos(id),
  creador_user_id UUID REFERENCES public.profiles(id) NOT NULL,
  nombre_sistema VARCHAR(100) NOT NULL,
  descripcion TEXT,
  disposicion_fichas JSONB NOT NULL,
  dibujos_trayectorias JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 9. COMUNICACIONES Y AUDITORÍA RGPD
-- =========================================================================
CREATE TABLE IF NOT EXISTS public.comunicados (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  emisor_user_id UUID REFERENCES public.profiles(id) NOT NULL,
  deporte_id UUID REFERENCES public.deportes(id),
  equipo_id UUID REFERENCES public.equipos(id),
  titulo VARCHAR(200) NOT NULL,
  contenido TEXT NOT NULL,
  nivel_prioridad VARCHAR(20) DEFAULT 'NORMAL' CHECK (nivel_prioridad IN ('BAJA', 'NORMAL', 'URGENTE')),
  requiere_confirmacion_lectura BOOLEAN DEFAULT FALSE,
  publicado_en TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.receptores_comunicados (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  comunicado_id UUID REFERENCES public.comunicados(id) ON DELETE CASCADE NOT NULL,
  receptor_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  leido BOOLEAN DEFAULT FALSE,
  leido_en TIMESTAMPTZ,
  confirmado BOOLEAN DEFAULT FALSE,
  confirmado_en TIMESTAMPTZ,
  UNIQUE(comunicado_id, receptor_user_id)
);

CREATE TABLE IF NOT EXISTS public.registro_auditoria_accesos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  tipo_accion VARCHAR(50) NOT NULL,
  recurso_afectado VARCHAR(100) NOT NULL,
  ip_origen VARCHAR(45),
  detalles JSONB,
  fecha_hora TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- 10. DATOS INICIALES (SEED DATA: DEPORTES Y TEMPORADA)
-- =========================================================================
INSERT INTO public.deportes (codigo, nombre, icono_fa) VALUES
  ('FUTBOL', 'Fútbol', 'soccer-ball-o'),
  ('FUTBOL_SALA', 'Fútbol Sala', 'soccer-ball-o'),
  ('BALONCESTO', 'Baloncesto', 'dribbble'),
  ('VOLEIBOL', 'Voleibol', 'trophy')
ON CONFLICT (codigo) DO NOTHING;

INSERT INTO public.temporadas (nombre, fecha_inicio, fecha_fin, actual) VALUES
  ('2026/2027', '2026-09-01', '2027-06-30', TRUE)
ON CONFLICT (nombre) DO NOTHING;
