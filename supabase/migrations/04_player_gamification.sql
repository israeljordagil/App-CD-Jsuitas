-- =========================================================================
-- 04_PLAYER_GAMIFICATION.SQL
-- Persistencia de gamificación de jugadores (XP, Nivel, Racha, Insignias, Retos)
-- =========================================================================

-- 1. TABLA GENERAL DE GAMIFICACIÓN POR JUGADOR
CREATE TABLE IF NOT EXISTS public.jugador_gamificacion (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  jugador_id UUID UNIQUE NOT NULL REFERENCES public.jugadores(id) ON DELETE CASCADE,
  xp_total INT NOT NULL DEFAULT 0 CHECK (xp_total >= 0),
  nivel INT NOT NULL DEFAULT 1 CHECK (nivel >= 1),
  racha_actual INT NOT NULL DEFAULT 0 CHECK (racha_actual >= 0),
  mejor_racha INT NOT NULL DEFAULT 0 CHECK (mejor_racha >= 0),
  ultima_actividad_fecha DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. TABLA DE PROGRESO DE INSIGNIAS POR JUGADOR
CREATE TABLE IF NOT EXISTS public.jugador_insignias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  jugador_id UUID NOT NULL REFERENCES public.jugadores(id) ON DELETE CASCADE,
  insignia_slug TEXT NOT NULL,
  conseguida BOOLEAN NOT NULL DEFAULT FALSE,
  conseguida_at TIMESTAMPTZ,
  progreso_actual INT CHECK (progreso_actual >= 0),
  progreso_objetivo INT CHECK (progreso_objetivo > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_jugador_insignia UNIQUE (jugador_id, insignia_slug)
);

-- 3. TABLA DE PROGRESO DE RETOS POR JUGADOR
CREATE TABLE IF NOT EXISTS public.jugador_retos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  jugador_id UUID NOT NULL REFERENCES public.jugadores(id) ON DELETE CASCADE,
  reto_slug TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'disponible' CHECK (estado IN ('disponible', 'en_progreso', 'completado', 'bloqueado', 'no_disponible')),
  progreso_actual INT NOT NULL DEFAULT 0 CHECK (progreso_actual >= 0),
  progreso_objetivo INT CHECK (progreso_objetivo > 0),
  iniciado_at TIMESTAMPTZ,
  completado_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT unique_jugador_reto UNIQUE (jugador_id, reto_slug)
);

-- 4. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_jugador_gamificacion_jugador ON public.jugador_gamificacion(jugador_id);
CREATE INDEX IF NOT EXISTS idx_jugador_insignias_jugador ON public.jugador_insignias(jugador_id);
CREATE INDEX IF NOT EXISTS idx_jugador_retos_jugador ON public.jugador_retos(jugador_id);

-- 5. HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.jugador_gamificacion ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jugador_insignias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jugador_retos ENABLE ROW LEVEL SECURITY;

-- 6. POLÍTICAS RLS DE LECTURA PARA FAMILIAS AUTENTICADAS (SÓLO LECTURA)
DROP POLICY IF EXISTS "Familia puede leer gamificación de sus hijos vinculados" ON public.jugador_gamificacion;
CREATE POLICY "Familia puede leer gamificación de sus hijos vinculados"
  ON public.jugador_gamificacion FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.vinculos_familiares vf
      WHERE vf.jugador_id = jugador_gamificacion.jugador_id
      AND vf.tutor_user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('COORDINADOR', 'ENTRENADOR', 'ADMINISTRADOR', 'DIRECTOR_DEPORTIVO')
    )
  );

DROP POLICY IF EXISTS "Familia puede leer insignias de sus hijos vinculados" ON public.jugador_insignias;
CREATE POLICY "Familia puede leer insignias de sus hijos vinculados"
  ON public.jugador_insignias FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.vinculos_familiares vf
      WHERE vf.jugador_id = jugador_insignias.jugador_id
      AND vf.tutor_user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('COORDINADOR', 'ENTRENADOR', 'ADMINISTRADOR', 'DIRECTOR_DEPORTIVO')
    )
  );

DROP POLICY IF EXISTS "Familia puede leer retos de sus hijos vinculados" ON public.jugador_retos;
CREATE POLICY "Familia puede leer retos de sus hijos vinculados"
  ON public.jugador_retos FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.vinculos_familiares vf
      WHERE vf.jugador_id = jugador_retos.jugador_id
      AND vf.tutor_user_id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('COORDINADOR', 'ENTRENADOR', 'ADMINISTRADOR', 'DIRECTOR_DEPORTIVO')
    )
  );
