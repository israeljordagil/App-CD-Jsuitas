-- =========================================================================
-- ESQUEMA SQL COMPATIBLE CON DB BROWSER FOR SQLITE (CD JESUITAS)
-- Instrucciones: Abre DB Browser for SQLite -> File -> Execute SQL -> Abre este archivo -> Execute (F5)
-- =========================================================================

PRAGMA foreign_keys = ON;

-- 1. USUARIOS Y PERFILES
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telefono TEXT,
  avatar_url TEXT,
  fecha_nacimiento TEXT,
  status TEXT DEFAULT 'ACTIVO',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR', 'DIR_DEPORTIVA', 'ADMIN_GENERAL')),
  ambito_deporte_id TEXT,
  ambito_categoria_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, role)
);

-- 2. ESTRUCTURA DEL CLUB
CREATE TABLE IF NOT EXISTS deportes (
  id TEXT PRIMARY KEY,
  codigo TEXT UNIQUE NOT NULL CHECK (codigo IN ('FUTBOL', 'FUTBOL_SALA', 'BALONCESTO', 'VOLEIBOL')),
  nombre TEXT NOT NULL,
  icono_fa TEXT,
  configuracion_reglas TEXT DEFAULT '{}',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temporadas (
  id TEXT PRIMARY KEY,
  nombre TEXT UNIQUE NOT NULL,
  fecha_inicio TEXT NOT NULL,
  fecha_fin TEXT NOT NULL,
  actual INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS categorias (
  id TEXT PRIMARY KEY,
  deporte_id TEXT NOT NULL REFERENCES deportes(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL,
  nombre TEXT NOT NULL,
  edad_minima INTEGER NOT NULL,
  edad_maxima INTEGER NOT NULL,
  modalidad TEXT
);

CREATE TABLE IF NOT EXISTS instalaciones (
  id TEXT PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT,
  tipo_superficie TEXT,
  es_propia INTEGER DEFAULT 1
);

-- 3. EQUIPOS Y JUGADORES
CREATE TABLE IF NOT EXISTS equipos (
  id TEXT PRIMARY KEY,
  deporte_id TEXT NOT NULL REFERENCES deportes(id),
  categoria_id TEXT NOT NULL REFERENCES categorias(id),
  temporada_id TEXT NOT NULL REFERENCES temporadas(id),
  nombre TEXT NOT NULL,
  genero TEXT NOT NULL CHECK (genero IN ('MASCULINO', 'FEMENINO', 'MIXTO')),
  competicion_nombre TEXT,
  grupo_federativo TEXT,
  grupo_whatsapp_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jugadores (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  apellidos TEXT NOT NULL,
  fecha_nacimiento TEXT NOT NULL,
  genero TEXT NOT NULL CHECK (genero IN ('MASCULINO', 'FEMENINO', 'MIXTO')),
  dorsal_habitual TEXT,
  posicion_principal TEXT,
  posicion_secundaria TEXT,
  avatar_oficial_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vinculos_familiares (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutor_user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  jugador_id TEXT NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  parentesco TEXT NOT NULL CHECK (parentesco IN ('PADRE', 'MADRE', 'TUTOR_LEGAL', 'AUTORIZADO')),
  es_representante_principal INTEGER DEFAULT 1,
  recibe_notificaciones INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(tutor_user_id, jugador_id)
);

CREATE TABLE IF NOT EXISTS consentimientos_rgpd (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tutor_user_id TEXT NOT NULL REFERENCES profiles(id),
  jugador_id TEXT REFERENCES jugadores(id),
  tratamiento_fotografia_interna INTEGER DEFAULT 0,
  tratamiento_video_analisis INTEGER DEFAULT 0,
  publicacion_redes_sociales INTEGER DEFAULT 0,
  comunicaciones_promocionales INTEGER DEFAULT 0,
  fecha_firmado TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jugadores_equipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jugador_id TEXT NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  equipo_id TEXT NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
  dorsal TEXT NOT NULL,
  posicion_habitual TEXT,
  es_capitan INTEGER DEFAULT 0,
  estado_licencia TEXT DEFAULT 'PENDIENTE' CHECK (estado_licencia IN ('ALTA', 'PENDIENTE', 'BAJA', 'TRAMITE')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(jugador_id, equipo_id)
);

CREATE TABLE IF NOT EXISTS cuerpo_tecnico_equipos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entrenador_user_id TEXT NOT NULL REFERENCES profiles(id),
  equipo_id TEXT NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
  rol_cuerpo_tecnico TEXT NOT NULL CHECK (rol_cuerpo_tecnico IN ('PRIMER_ENTRENADOR', 'SEGUNDO_ENTRENADOR', 'PREPARADOR_FISICO', 'DELEGADO')),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entrenador_user_id, equipo_id, rol_cuerpo_tecnico)
);

CREATE TABLE IF NOT EXISTS estado_operativo_salud (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jugador_id TEXT UNIQUE NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  estado_aptitud TEXT NOT NULL CHECK (estado_aptitud IN ('APTO', 'NO_APTO', 'LIMITACION_TEMPORAL', 'VALORACION_PENDIENTE')),
  reconocimiento_medico_vigente INTEGER DEFAULT 1,
  fecha_vencimiento_reconocimiento TEXT,
  instruccion_emergencia_operativa TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 4. GAMIFICACION
CREATE TABLE IF NOT EXISTS retos_insignias (
  id TEXT PRIMARY KEY,
  deporte_id TEXT REFERENCES deportes(id),
  codigo TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  categoria TEXT CHECK (categoria IN ('ATAQUE', 'DEFENSA', 'ENTRENAMIENTO', 'COMPANERISMO', 'VALORES', 'TEMPORADA')),
  puntos_xp INTEGER DEFAULT 50,
  es_de_valores INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS progresion_jugador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jugador_id TEXT UNIQUE NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  xp_acumulada INTEGER DEFAULT 0,
  nivel_actual INTEGER DEFAULT 1,
  titulo_nivel TEXT DEFAULT 'Iniciado del Escudo'
);

CREATE TABLE IF NOT EXISTS insignias_jugador (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  jugador_id TEXT NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  reto_insignia_id TEXT NOT NULL REFERENCES retos_insignias(id),
  otorgado_en TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(jugador_id, reto_insignia_id)
);

-- 5. ENTRENAMIENTOS
CREATE TABLE IF NOT EXISTS sesiones_entrenamiento (
  id TEXT PRIMARY KEY,
  equipo_id TEXT NOT NULL REFERENCES equipos(id) ON DELETE CASCADE,
  instalacion_id TEXT REFERENCES instalaciones(id),
  fecha_hora_inicio TEXT NOT NULL,
  duracion_minutos INTEGER DEFAULT 90,
  objetivo_principal TEXT,
  entrenador_responsable_id TEXT REFERENCES profiles(id),
  valoracion_sesion INTEGER CHECK (valoracion_sesion BETWEEN 1 AND 5),
  observaciones_entrenador TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ejercicios_entrenamiento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sesion_id TEXT NOT NULL REFERENCES sesiones_entrenamiento(id) ON DELETE CASCADE,
  orden INTEGER NOT NULL,
  bloque TEXT CHECK (bloque IN ('ACTIVACION', 'TECNICA', 'TACTICA', 'FISICO', 'JUEGO_APLICADO', 'VUELTA_CALMA')),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  duracion_minutos INTEGER,
  material_necesario TEXT
);

CREATE TABLE IF NOT EXISTS asistencia_entrenamiento (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sesion_id TEXT NOT NULL REFERENCES sesiones_entrenamiento(id) ON DELETE CASCADE,
  jugador_id TEXT NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  estado TEXT NOT NULL CHECK (estado IN ('PRESENTE', 'AUSENCIA_JUSTIFICADA', 'AUSENCIA_INJUSTIFICADA', 'RETRASO', 'LESIONADO')),
  observacion TEXT,
  UNIQUE(sesion_id, jugador_id)
);

-- 6. PARTIDOS Y CONVOCATORIAS
CREATE TABLE IF NOT EXISTS partidos (
  id TEXT PRIMARY KEY,
  equipo_local_id TEXT REFERENCES equipos(id),
  equipo_visitante_id TEXT REFERENCES equipos(id),
  nombre_rival_externo TEXT,
  deporte_id TEXT NOT NULL REFERENCES deportes(id),
  temporada_id TEXT NOT NULL REFERENCES temporadas(id),
  instalacion_id TEXT REFERENCES instalaciones(id),
  es_local INTEGER DEFAULT 1,
  fecha_hora_partido TEXT NOT NULL,
  fecha_hora_citacion TEXT NOT NULL,
  estado TEXT DEFAULT 'PROGRAMADO' CHECK (estado IN ('PROGRAMADO', 'EN_DIRECTO', 'FINALIZADO', 'APLAZADO', 'SUSPENDIDO')),
  marcador_local INTEGER DEFAULT 0,
  marcador_visitante INTEGER DEFAULT 0,
  detalles_marcador_periodos TEXT DEFAULT '{}',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS convocatorias (
  id TEXT PRIMARY KEY,
  partido_id TEXT UNIQUE NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
  equipacion_color TEXT NOT NULL,
  indicaciones_entrenador TEXT,
  fecha_limite_confirmacion TEXT,
  publicada INTEGER DEFAULT 0,
  publicada_en TEXT
);

CREATE TABLE IF NOT EXISTS convocatoria_jugadores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  convocatoria_id TEXT NOT NULL REFERENCES convocatorias(id) ON DELETE CASCADE,
  jugador_id TEXT NOT NULL REFERENCES jugadores(id) ON DELETE CASCADE,
  estado_confirmacion TEXT DEFAULT 'PENDIENTE' CHECK (estado_confirmacion IN ('PENDIENTE', 'CONFIRMADO', 'NO_DISPONIBLE')),
  motivo_no_disponible TEXT,
  es_titular_previsto INTEGER DEFAULT 0,
  confirmado_por_user_id TEXT REFERENCES profiles(id),
  confirmado_en TEXT,
  UNIQUE(convocatoria_id, jugador_id)
);

CREATE TABLE IF NOT EXISTS eventos_partido (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  partido_id TEXT NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
  minuto_segundo TEXT,
  periodo_o_set INTEGER,
  tipo_evento TEXT NOT NULL,
  jugador_principal_id TEXT REFERENCES jugadores(id),
  jugador_secundario_id TEXT REFERENCES jugadores(id),
  payload_especifico TEXT DEFAULT '{}',
  registrado_en TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actas_partido (
  id TEXT PRIMARY KEY,
  partido_id TEXT UNIQUE NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
  resultado_final_local INTEGER NOT NULL,
  resultado_final_visitante INTEGER NOT NULL,
  resumen_periodos_sets TEXT NOT NULL,
  observaciones_coordinacion TEXT,
  incidencias_arbitrales TEXT,
  cerrado_por_entrenador_id TEXT REFERENCES profiles(id),
  validado_por_coordinador_id TEXT REFERENCES profiles(id),
  validado_en TEXT,
  estado_acta TEXT DEFAULT 'PENDIENTE_VALIDACION' CHECK (estado_acta IN ('BORRADOR', 'PENDIENTE_VALIDACION', 'VALIDADA', 'RECHAZADA'))
);

-- 7. PIZARRA TÁCTICA
CREATE TABLE IF NOT EXISTS sistemas_tacticos (
  id TEXT PRIMARY KEY,
  deporte_id TEXT NOT NULL REFERENCES deportes(id),
  equipo_id TEXT REFERENCES equipos(id),
  creador_user_id TEXT NOT NULL REFERENCES profiles(id),
  nombre_sistema TEXT NOT NULL,
  descripcion TEXT,
  disposicion_fichas TEXT NOT NULL,
  dibujos_trayectorias TEXT DEFAULT '[]',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 8. COMUNICACIONES Y AUDITORÍA
CREATE TABLE IF NOT EXISTS comunicados (
  id TEXT PRIMARY KEY,
  emisor_user_id TEXT NOT NULL REFERENCES profiles(id),
  deporte_id TEXT REFERENCES deportes(id),
  equipo_id TEXT REFERENCES equipos(id),
  titulo TEXT NOT NULL,
  contenido TEXT NOT NULL,
  nivel_prioridad TEXT DEFAULT 'NORMAL' CHECK (nivel_prioridad IN ('BAJA', 'NORMAL', 'URGENTE')),
  requiere_confirmacion_lectura INTEGER DEFAULT 0,
  publicado_en TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS receptores_comunicados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comunicado_id TEXT NOT NULL REFERENCES comunicados(id) ON DELETE CASCADE,
  receptor_user_id TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  leido INTEGER DEFAULT 0,
  leido_en TEXT,
  confirmado INTEGER DEFAULT 0,
  confirmado_en TEXT,
  UNIQUE(comunicado_id, receptor_user_id)
);

CREATE TABLE IF NOT EXISTS registro_auditoria_accesos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES profiles(id),
  tipo_accion TEXT NOT NULL,
  recurso_afectado TEXT NOT NULL,
  ip_origen TEXT,
  detalles TEXT,
  fecha_hora TEXT DEFAULT CURRENT_TIMESTAMP
);

-- DATOS SEMILLA PARA SQLITE
INSERT OR IGNORE INTO deportes (id, codigo, nombre, icono_fa) VALUES
  ('dep-futbol', 'FUTBOL', 'Fútbol', 'soccer-ball-o'),
  ('dep-futsal', 'FUTBOL_SALA', 'Fútbol Sala', 'soccer-ball-o'),
  ('dep-basket', 'BALONCESTO', 'Baloncesto', 'dribbble'),
  ('dep-voley', 'VOLEIBOL', 'Voleibol', 'trophy');

INSERT OR IGNORE INTO temporadas (id, nombre, fecha_inicio, fecha_fin, actual) VALUES
  ('temp-2026-2027', '2026/2027', '2026-09-01', '2027-06-30', 1);

INSERT OR IGNORE INTO categorias (id, deporte_id, codigo, nombre, edad_minima, edad_maxima, modalidad) VALUES
  ('cat-infantil-futbol', 'dep-futbol', 'INFANTIL', 'Infantil', 12, 13, 'F11'),
  ('cat-cadete-futbol', 'dep-futbol', 'CADETE', 'Cadete', 14, 15, 'F11');

INSERT OR IGNORE INTO equipos (id, deporte_id, categoria_id, temporada_id, nombre, genero, competicion_nombre) VALUES
  ('eq-infantil-a', 'dep-futbol', 'cat-infantil-futbol', 'temp-2026-2027', 'Infantil A', 'MASCULINO', 'Liga Infantil Preferente'),
  ('eq-cadete-b', 'dep-futbol', 'cat-cadete-futbol', 'temp-2026-2027', 'Cadete B', 'MASCULINO', 'Liga Cadete Primera');

-- PLANTILLA DEL INFANTIL A EN SQLITE
INSERT OR IGNORE INTO jugadores (id, nombre, apellidos, fecha_nacimiento, genero, dorsal_habitual, posicion_principal) VALUES
  ('a1111111-1111-1111-1111-111111111101', 'Pablo', 'Domínguez Marqués', '2013-03-15', 'MASCULINO', '3', 'Central'),
  ('a1111111-1111-1111-1111-111111111102', 'Hugo', 'Zubeldia Tortajada', '2013-05-20', 'MASCULINO', '4', 'Central'),
  ('a1111111-1111-1111-1111-111111111103', 'Martín', 'Sanchis Rodríguez', '2013-01-10', 'MASCULINO', '5', 'Medio'),
  ('a1111111-1111-1111-1111-111111111104', 'Lucas', 'Rocati Mansilla', '2013-07-04', 'MASCULINO', '6', 'Medio'),
  ('a1111111-1111-1111-1111-111111111105', 'José', 'Acosta Zaragoza', '2013-09-12', 'MASCULINO', '7', 'Medio'),
  ('a1111111-1111-1111-1111-111111111106', 'Romeo', 'Tomás Verde', '2013-02-28', 'MASCULINO', '8', 'Medio'),
  ('a1111111-1111-1111-1111-111111111107', 'Alejandro', 'Gómez Gómez', '2013-11-05', 'MASCULINO', '9', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111108', 'Jorge', 'Monleón Gómez', '2013-04-18', 'MASCULINO', '10', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111109', 'David', 'Bolumar Morata', '2013-08-22', 'MASCULINO', '11', 'Medio'),
  ('a1111111-1111-1111-1111-111111111110', 'Tymur', 'Zhyzhnevskyy', '2013-06-30', 'MASCULINO', '13', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111111', 'Pedro', 'Clavería Añón', '2013-10-14', 'MASCULINO', '17', 'Lateral'),
  ('a1111111-1111-1111-1111-111111111112', 'Aaron', 'Herraiz Medina', '2013-12-01', 'MASCULINO', '18', 'Central'),
  ('a1111111-1111-1111-1111-111111111113', 'Marco', 'García-Prieto Barja', '2013-03-25', 'MASCULINO', '19', 'Delantero'),
  ('a1111111-1111-1111-1111-111111111114', 'Daniel', 'Serrano Grau', '2013-05-11', 'MASCULINO', '21', 'Lateral'),
  ('a1111111-1111-1111-1111-111111111115', 'Máximo', 'Vento Ricó', '2013-07-19', 'MASCULINO', '22', 'Medio'),
  ('a1111111-1111-1111-1111-111111111116', 'Albert', 'García García', '2013-09-08', 'MASCULINO', '23', 'Medio'),
  ('a1111111-1111-1111-1111-111111111117', 'Javier', 'Mariscal Centelles', '2013-02-14', 'MASCULINO', '24', 'Central'),
  ('a1111111-1111-1111-1111-111111111118', 'Lucas', 'Martínez Broniarek', '2013-01-22', 'MASCULINO', '25', 'Portero');

INSERT OR IGNORE INTO jugadores_equipos (jugador_id, equipo_id, dorsal, posicion_habitual, estado_licencia)
SELECT id, 'eq-infantil-a', dorsal_habitual, posicion_principal, 'ALTA'
FROM jugadores WHERE id LIKE 'a1111111%';
