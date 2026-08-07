-- =========================================================================
-- MIGRACIÓN 28: SEGURIDAD RLS CANÓNICA DE EQUIPOS Y JUGADORES (BLOQUE 4F.3 - M10-B)
-- Implementación de RLS para public.teams, public.jugadores y public.jugador_equipos.
-- =========================================================================

-- 1. FUNCIONES HELPER DE SEGURIDAD POSTGRESQL (SECURITY DEFINER CON SEARCH_PATH SEGURO)

-- Helper F11: Identifica si un equipo es Fútbol 11
CREATE OR REPLACE FUNCTION public.is_f11_team(p_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.teams
    WHERE id = p_team_id
      AND LOWER(sport) = 'fútbol'
      AND LOWER(category) IN ('infantil', 'cadete', 'juvenil', 'senior')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Helper Team Access: Evalúa el acceso de lectura a un equipo por usuario autenticado
CREATE OR REPLACE FUNCTION public.current_user_has_team_access(p_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- A. ADMIN_GENERAL -> Acceso Global
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;

  -- B. STAFF F11 (PREPARADOR_FISICO / FISIOTERAPEUTA) -> Acceso únicamente a equipos F11
  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('PREPARADOR_FISICO', 'FISIOTERAPEUTA')
      AND status = 'ACTIVE'
  ) THEN
    IF public.is_f11_team(p_team_id) THEN
      RETURN TRUE;
    END IF;
  END IF;

  -- C. ENTRENADOR / SEGUNDO_ENTRENADOR / DELEGADO -> Acceso si tiene asignación activa para el equipo o scope
  IF EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('ENTRENADOR', 'SEGUNDO_ENTRENADOR', 'DELEGADO')
      AND status = 'ACTIVE'
      AND (equipo_id = p_team_id OR scope_id = p_team_id::text)
  ) THEN
    RETURN TRUE;
  END IF;

  -- D. COORDINADOR / DIR_DEPORTIVA -> Acceso si el equipo pertenece a su ámbito activo
  IF EXISTS (
    SELECT 1 FROM public.user_roles ur
    JOIN public.teams t ON t.id = p_team_id
    WHERE ur.user_id = auth.uid()
      AND ur.role IN ('COORDINADOR', 'DIR_DEPORTIVA')
      AND ur.status = 'ACTIVE'
      AND (
        ur.scope_type = 'CLUB' OR
        (ur.deporte_codigo IS NOT NULL AND LOWER(ur.deporte_codigo) = LOWER(t.sport)) OR
        (ur.categoria_id IS NOT NULL AND LOWER(ur.categoria_id) = LOWER(t.category))
      )
  ) THEN
    RETURN TRUE;
  END IF;

  -- E. FAMILIA -> Acceso únicamente si su hijo tutelado está asignado al equipo
  IF EXISTS (
    SELECT 1 FROM public.vinculos_familiares vf
    JOIN public.jugador_equipos je ON je.player_id = vf.jugador_id
    WHERE vf.tutor_user_id = auth.uid()
      AND vf.status = 'ACTIVE'
      AND je.team_id = p_team_id
      AND je.is_active = TRUE
  ) THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Helper Player Access: Evalúa el acceso de lectura a un deportista
CREATE OR REPLACE FUNCTION public.current_user_has_player_access(p_player_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  -- A. ADMIN_GENERAL -> Acceso Global
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;

  -- B. FAMILIA -> Acceso únicamente a sus hijos tutelados activos
  IF EXISTS (
    SELECT 1 FROM public.vinculos_familiares
    WHERE tutor_user_id = auth.uid()
      AND jugador_id = p_player_id
      AND status = 'ACTIVE'
  ) THEN
    RETURN TRUE;
  END IF;

  -- C. STAFF / ENTRENADORES / COORDINACIÓN -> Acceso si el jugador pertenece a un equipo al que el usuario tiene acceso
  IF EXISTS (
    SELECT 1 FROM public.jugador_equipos je
    WHERE je.player_id = p_player_id
      AND je.is_active = TRUE
      AND public.current_user_has_team_access(je.team_id)
  ) THEN
    RETURN TRUE;
  END IF;

  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- =========================================================================
-- 2. POLÍTICAS RLS PARA PUBLIC.TEAMS
-- =========================================================================

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura de equipos para usuarios autenticados" ON public.teams;
DROP POLICY IF EXISTS "Inserción de equipos para personal autorizado" ON public.teams;
DROP POLICY IF EXISTS "Modificación de equipos para personal autorizado" ON public.teams;
DROP POLICY IF EXISTS "Teams select policy" ON public.teams;
DROP POLICY IF EXISTS "Teams insert policy" ON public.teams;
DROP POLICY IF EXISTS "Teams update policy" ON public.teams;
DROP POLICY IF EXISTS "Teams delete policy" ON public.teams;

-- SELECT: Acceso mediante el helper current_user_has_team_access
CREATE POLICY "Teams select policy"
ON public.teams FOR SELECT
USING (
  public.current_user_has_team_access(id)
);

-- INSERT: Únicamente ADMIN_GENERAL (DENY BY DEFAULT para cliente)
CREATE POLICY "Teams insert policy"
ON public.teams FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- UPDATE: Únicamente ADMIN_GENERAL
CREATE POLICY "Teams update policy"
ON public.teams FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

-- DELETE: Únicamente ADMIN_GENERAL
CREATE POLICY "Teams delete policy"
ON public.teams FOR DELETE
USING (
  public.is_admin()
);

-- =========================================================================
-- 3. POLÍTICAS RLS PARA PUBLIC.JUGADORES
-- =========================================================================

ALTER TABLE public.jugadores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Jugadores select policy" ON public.jugadores;
DROP POLICY IF EXISTS "Jugadores insert policy" ON public.jugadores;
DROP POLICY IF EXISTS "Jugadores update policy" ON public.jugadores;
DROP POLICY IF EXISTS "Jugadores delete policy" ON public.jugadores;

-- SELECT: Acceso mediante el helper current_user_has_player_access
CREATE POLICY "Jugadores select policy"
ON public.jugadores FOR SELECT
USING (
  public.current_user_has_player_access(id)
);

-- INSERT: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugadores insert policy"
ON public.jugadores FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- UPDATE: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugadores update policy"
ON public.jugadores FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

-- DELETE: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugadores delete policy"
ON public.jugadores FOR DELETE
USING (
  public.is_admin()
);

-- =========================================================================
-- 4. POLÍTICAS RLS PARA PUBLIC.JUGADOR_EQUIPOS
-- =========================================================================

ALTER TABLE public.jugador_equipos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Jugador equipos select policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos insert policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos update policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos delete policy" ON public.jugador_equipos;

-- SELECT: Acceso si tiene permiso sobre el equipo o el jugador
CREATE POLICY "Jugador equipos select policy"
ON public.jugador_equipos FOR SELECT
USING (
  public.current_user_has_team_access(team_id) OR public.current_user_has_player_access(player_id)
);

-- INSERT: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugador equipos insert policy"
ON public.jugador_equipos FOR INSERT
WITH CHECK (
  public.is_admin()
);

-- UPDATE: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugador equipos update policy"
ON public.jugador_equipos FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

-- DELETE: Únicamente ADMIN_GENERAL
CREATE POLICY "Jugador equipos delete policy"
ON public.jugador_equipos FOR DELETE
USING (
  public.is_admin()
);

COMMENT ON TABLE public.teams IS 'Equipos deportivos protegidos con RLS M10-B';
COMMENT ON TABLE public.jugadores IS 'Expedientes deportivos de jugadores protegidos con RLS M10-B';
COMMENT ON TABLE public.jugador_equipos IS 'Asignaciones de jugadores a equipos protegidas con RLS M10-B';
