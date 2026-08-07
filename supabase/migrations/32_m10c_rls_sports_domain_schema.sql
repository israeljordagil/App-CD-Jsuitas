-- =========================================================================
-- MIGRACIÓN 32: SEGURIDAD CANÓNICA DEL DOMINIO DEPORTIVO (BLOQUE 4F.3 - M10-C)
-- Implementación de RLS DENY BY DEFAULT en partidos, convocatorias, actas, eventos,
-- entrenamientos, comunicados y receptores_comunicados.
-- =========================================================================

-- 1. HELPERS POSTGRESQL (SECURITY DEFINER SET SEARCH_PATH = PUBLIC, PG_TEMP)

-- Helper Match Access: Evalúa el acceso de lectura a un partido
CREATE OR REPLACE FUNCTION public.current_user_has_match_access(p_match_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_team_id UUID;
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;

  SELECT team_id INTO v_team_id
  FROM public.partidos
  WHERE id = p_match_id;

  IF v_team_id IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN public.current_user_has_team_access(v_team_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Helper Live Match Management: Evalúa la autorización para gestionar un partido en vivo o acta
CREATE OR REPLACE FUNCTION public.current_user_can_manage_live_match(p_match_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_team_id UUID;
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;

  SELECT team_id INTO v_team_id
  FROM public.partidos
  WHERE id = p_match_id;

  IF v_team_id IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('ENTRENADOR', 'SEGUNDO_ENTRENADOR', 'DELEGADO', 'COORDINADOR', 'DIR_DEPORTIVA')
      AND status = 'ACTIVE'
      AND (equipo_id = v_team_id OR scope_id = v_team_id::text OR scope_type = 'CLUB')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Helper Training Access: Evalúa el acceso a un horario de entrenamiento
CREATE OR REPLACE FUNCTION public.current_user_has_training_access(p_schedule_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_team_id UUID;
BEGIN
  IF public.is_admin() THEN
    RETURN TRUE;
  END IF;

  SELECT team_id INTO v_team_id
  FROM public.training_schedules
  WHERE id = p_schedule_id;

  IF v_team_id IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN public.current_user_has_team_access(v_team_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- =========================================================================
-- 2. POLÍTICAS RLS EN PUBLIC.PARTIDOS
-- =========================================================================

ALTER TABLE public.partidos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Partidos select policy" ON public.partidos;
DROP POLICY IF EXISTS "Partidos insert policy" ON public.partidos;
DROP POLICY IF EXISTS "Partidos update policy" ON public.partidos;
DROP POLICY IF EXISTS "Partidos delete policy" ON public.partidos;

CREATE POLICY "Partidos select policy" ON public.partidos
FOR SELECT USING ( public.current_user_has_match_access(id) );

CREATE POLICY "Partidos insert policy" ON public.partidos
FOR INSERT WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('COORDINADOR', 'DIR_DEPORTIVA')
      AND status = 'ACTIVE'
  )
);

CREATE POLICY "Partidos update policy" ON public.partidos
FOR UPDATE USING ( public.current_user_can_manage_live_match(id) )
WITH CHECK ( public.current_user_can_manage_live_match(id) );

CREATE POLICY "Partidos delete policy" ON public.partidos
FOR DELETE USING ( public.is_admin() );

-- =========================================================================
-- 3. POLÍTICAS RLS EN PUBLIC.CONVOCATORIAS Y CONVOCATORIA_JUGADORES
-- =========================================================================

ALTER TABLE public.convocatorias ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Convocatorias select policy" ON public.convocatorias;
DROP POLICY IF EXISTS "Convocatorias insert policy" ON public.convocatorias;
DROP POLICY IF EXISTS "Convocatorias update policy" ON public.convocatorias;
DROP POLICY IF EXISTS "Convocatorias delete policy" ON public.convocatorias;

CREATE POLICY "Convocatorias select policy" ON public.convocatorias
FOR SELECT USING ( public.current_user_has_match_access(partido_id) );

CREATE POLICY "Convocatorias insert policy" ON public.convocatorias
FOR INSERT WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Convocatorias update policy" ON public.convocatorias
FOR UPDATE USING ( public.current_user_can_manage_live_match(partido_id) )
WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Convocatorias delete policy" ON public.convocatorias
FOR DELETE USING ( public.is_admin() );

ALTER TABLE public.convocatoria_jugadores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Convocatoria jugadores select policy" ON public.convocatoria_jugadores;
DROP POLICY IF EXISTS "Convocatoria jugadores insert policy" ON public.convocatoria_jugadores;
DROP POLICY IF EXISTS "Convocatoria jugadores update policy" ON public.convocatoria_jugadores;
DROP POLICY IF EXISTS "Convocatoria jugadores delete policy" ON public.convocatoria_jugadores;

CREATE POLICY "Convocatoria jugadores select policy" ON public.convocatoria_jugadores
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.convocatorias c
    WHERE c.id = convocatoria_id AND public.current_user_has_match_access(c.partido_id)
  ) OR public.current_user_has_player_access(jugador_id)
);

CREATE POLICY "Convocatoria jugadores insert policy" ON public.convocatoria_jugadores
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.convocatorias c
    WHERE c.id = convocatoria_id AND public.current_user_can_manage_live_match(c.partido_id)
  )
);

CREATE POLICY "Convocatoria jugadores update policy" ON public.convocatoria_jugadores
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.convocatorias c
    WHERE c.id = convocatoria_id AND public.current_user_can_manage_live_match(c.partido_id)
  ) OR public.current_user_has_player_access(jugador_id)
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.convocatorias c
    WHERE c.id = convocatoria_id AND public.current_user_can_manage_live_match(c.partido_id)
  ) OR public.current_user_has_player_access(jugador_id)
);

CREATE POLICY "Convocatoria jugadores delete policy" ON public.convocatoria_jugadores
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM public.convocatorias c
    WHERE c.id = convocatoria_id AND public.current_user_can_manage_live_match(c.partido_id)
  )
);

-- =========================================================================
-- 4. POLÍTICAS RLS EN PUBLIC.ACTAS_PARTIDO Y EVENTOS_PARTIDO
-- =========================================================================

ALTER TABLE public.actas_partido ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Actas select policy" ON public.actas_partido;
DROP POLICY IF EXISTS "Actas insert policy" ON public.actas_partido;
DROP POLICY IF EXISTS "Actas update policy" ON public.actas_partido;
DROP POLICY IF EXISTS "Actas delete policy" ON public.actas_partido;

CREATE POLICY "Actas select policy" ON public.actas_partido
FOR SELECT USING ( public.current_user_has_match_access(partido_id) );

CREATE POLICY "Actas insert policy" ON public.actas_partido
FOR INSERT WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Actas update policy" ON public.actas_partido
FOR UPDATE USING ( public.current_user_can_manage_live_match(partido_id) )
WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Actas delete policy" ON public.actas_partido
FOR DELETE USING ( public.is_admin() );

ALTER TABLE public.eventos_partido ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Eventos partido select policy" ON public.eventos_partido;
DROP POLICY IF EXISTS "Eventos partido insert policy" ON public.eventos_partido;
DROP POLICY IF EXISTS "Eventos partido update policy" ON public.eventos_partido;
DROP POLICY IF EXISTS "Eventos partido delete policy" ON public.eventos_partido;

CREATE POLICY "Eventos partido select policy" ON public.eventos_partido
FOR SELECT USING ( public.current_user_has_match_access(partido_id) );

CREATE POLICY "Eventos partido insert policy" ON public.eventos_partido
FOR INSERT WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Eventos partido update policy" ON public.eventos_partido
FOR UPDATE USING ( public.current_user_can_manage_live_match(partido_id) )
WITH CHECK ( public.current_user_can_manage_live_match(partido_id) );

CREATE POLICY "Eventos partido delete policy" ON public.eventos_partido
FOR DELETE USING ( public.is_admin() );

-- =========================================================================
-- 5. POLÍTICAS RLS EN PUBLIC.TRAINING_SCHEDULES
-- =========================================================================

ALTER TABLE public.training_schedules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura de horarios recurrentes para usuarios autenticados" ON public.training_schedules;
DROP POLICY IF EXISTS "Gestión de horarios recurrentes para personal autorizado" ON public.training_schedules;
DROP POLICY IF EXISTS "Training select policy" ON public.training_schedules;
DROP POLICY IF EXISTS "Training insert policy" ON public.training_schedules;
DROP POLICY IF EXISTS "Training update policy" ON public.training_schedules;
DROP POLICY IF EXISTS "Training delete policy" ON public.training_schedules;

CREATE POLICY "Training select policy" ON public.training_schedules
FOR SELECT USING ( public.current_user_has_team_access(team_id) );

CREATE POLICY "Training insert policy" ON public.training_schedules
FOR INSERT WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('ENTRENADOR', 'COORDINADOR', 'DIR_DEPORTIVA')
      AND status = 'ACTIVE'
      AND (equipo_id = team_id OR scope_id = team_id::text OR scope_type = 'CLUB')
  )
);

CREATE POLICY "Training update policy" ON public.training_schedules
FOR UPDATE USING (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('ENTRENADOR', 'COORDINADOR', 'DIR_DEPORTIVA')
      AND status = 'ACTIVE'
      AND (equipo_id = team_id OR scope_id = team_id::text OR scope_type = 'CLUB')
  )
)
WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role IN ('ENTRENADOR', 'COORDINADOR', 'DIR_DEPORTIVA')
      AND status = 'ACTIVE'
      AND (equipo_id = team_id OR scope_id = team_id::text OR scope_type = 'CLUB')
  )
);

CREATE POLICY "Training delete policy" ON public.training_schedules
FOR DELETE USING ( public.is_admin() );

-- =========================================================================
-- 6. POLÍTICAS RLS EN PUBLIC.COMUNICADOS Y RECEPTORES_COMUNICADOS
-- =========================================================================

ALTER TABLE public.comunicados ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Comunicados select policy" ON public.comunicados;
DROP POLICY IF EXISTS "Comunicados insert policy" ON public.comunicados;
DROP POLICY IF EXISTS "Comunicados update policy" ON public.comunicados;
DROP POLICY IF EXISTS "Comunicados delete policy" ON public.comunicados;

CREATE POLICY "Comunicados select policy" ON public.comunicados
FOR SELECT USING (
  public.is_admin() 
  OR emisor_user_id = auth.uid()
  OR EXISTS (
    SELECT 1 FROM public.receptores_comunicados rc
    WHERE rc.comunicado_id = id AND rc.receptor_user_id = auth.uid()
  )
);

CREATE POLICY "Comunicados insert policy" ON public.comunicados
FOR INSERT WITH CHECK (
  emisor_user_id = auth.uid()
);

CREATE POLICY "Comunicados update policy" ON public.comunicados
FOR UPDATE USING ( public.is_admin() OR emisor_user_id = auth.uid() )
WITH CHECK ( public.is_admin() OR emisor_user_id = auth.uid() );

CREATE POLICY "Comunicados delete policy" ON public.comunicados
FOR DELETE USING ( public.is_admin() OR emisor_user_id = auth.uid() );

ALTER TABLE public.receptores_comunicados ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Receptores comunicados select policy" ON public.receptores_comunicados;
DROP POLICY IF EXISTS "Receptores comunicados insert policy" ON public.receptores_comunicados;
DROP POLICY IF EXISTS "Receptores comunicados update policy" ON public.receptores_comunicados;
DROP POLICY IF EXISTS "Receptores comunicados delete policy" ON public.receptores_comunicados;

CREATE POLICY "Receptores comunicados select policy" ON public.receptores_comunicados
FOR SELECT USING (
  receptor_user_id = auth.uid() 
  OR public.is_admin()
  OR EXISTS (
    SELECT 1 FROM public.comunicados c
    WHERE c.id = comunicado_id AND c.emisor_user_id = auth.uid()
  )
);

CREATE POLICY "Receptores comunicados insert policy" ON public.receptores_comunicados
FOR INSERT WITH CHECK (
  public.is_admin() OR EXISTS (
    SELECT 1 FROM public.comunicados c
    WHERE c.id = comunicado_id AND c.emisor_user_id = auth.uid()
  )
);

CREATE POLICY "Receptores comunicados update policy" ON public.receptores_comunicados
FOR UPDATE USING (
  receptor_user_id = auth.uid() OR public.is_admin()
)
WITH CHECK (
  receptor_user_id = auth.uid() OR public.is_admin()
);

CREATE POLICY "Receptores comunicados delete policy" ON public.receptores_comunicados
FOR DELETE USING ( public.is_admin() );

COMMENT ON TABLE public.partidos IS 'Partidos del club protegidos con RLS M10-C';
COMMENT ON TABLE public.convocatorias IS 'Convocatorias a partidos protegidas con RLS M10-C';
COMMENT ON TABLE public.actas_partido IS 'Actas oficiales de partidos protegidas con RLS M10-C';
COMMENT ON TABLE public.training_schedules IS 'Horarios de entrenamiento protegidos con RLS M10-C';
COMMENT ON TABLE public.comunicados IS 'Comunicaciones internas protegidas con RLS M10-C';
