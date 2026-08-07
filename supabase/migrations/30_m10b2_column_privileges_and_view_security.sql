-- =========================================================================
-- MIGRACIÓN 30: REVOCACIÓN TABLA VS COLUMNA Y VISTAS SEGURAS (BLOQUE 4F.3 - M10-B.2)
-- Revoca SELECT a nivel de tabla en public.jugadores para roles no administrativos,
-- establece privilegios estrictos por columna, asegura v_jugadores_deportivos con security_invoker = true
-- y crea v_mis_hijos y RPC get_jugador_expediente_delegado para columnas ampliadas por perfil.
-- =========================================================================

-- 1. REVOCACIÓN DE PERMISO SELECT A NIVEL DE TABLA COMPLETO
REVOKE SELECT ON public.jugadores FROM authenticated;
REVOKE SELECT ON public.jugadores FROM anon;

-- 2. OTORGAMIENTO EXCLUSIVO DE PERMISOS SELECT A NIVEL DE COLUMNA NO SENSIBLE
GRANT SELECT (id, first_name, last_name, display_name, gender, status) ON public.jugadores TO authenticated;

-- 3. RE-DEFINICIÓN SEGURA DE V_JUGADORES_DEPORTIVOS CON SECURITY_INVOKER Y FILTRO RLS
DROP VIEW IF EXISTS public.v_jugadores_deportivos CASCADE;

CREATE VIEW public.v_jugadores_deportivos 
WITH (security_invoker = true) AS
SELECT 
  id,
  first_name,
  last_name,
  display_name,
  gender,
  status
FROM public.jugadores
WHERE public.current_user_has_player_access(id);

GRANT SELECT ON public.v_jugadores_deportivos TO authenticated;
COMMENT ON VIEW public.v_jugadores_deportivos IS 'Vista segura que expone información deportiva no sensible con RLS y security_invoker = true (M10-B.2)';

-- 4. VISTA SEGURA PARA EL PERFIL FAMILIA (v_mis_hijos)
DROP VIEW IF EXISTS public.v_mis_hijos CASCADE;

CREATE VIEW public.v_mis_hijos 
WITH (security_invoker = true) AS
SELECT 
  j.id,
  j.first_name,
  j.last_name,
  j.display_name,
  j.gender,
  j.status,
  j.birth_date,
  j.federation_player_id,
  j.federation_status,
  vf.parentesco,
  vf.responsibility_level,
  vf.is_primary_reference
FROM public.jugadores j
JOIN public.vinculos_familiares vf ON vf.jugador_id = j.id
WHERE vf.tutor_user_id = auth.uid()
  AND vf.status = 'ACTIVE';

GRANT SELECT ON public.v_mis_hijos TO authenticated;
COMMENT ON VIEW public.v_mis_hijos IS 'Vista segura para el perfil FAMILIA con columnas ampliadas de sus propios hijos tutelados (M10-B.2)';

-- 5. FUNCIÓN RPC SEGURA DE EXPEDIENTE PARA DELEGADOS Y COORDINACIÓN
CREATE OR REPLACE FUNCTION public.get_jugador_expediente_delegado(p_player_id UUID)
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  gender VARCHAR(20),
  status VARCHAR(30),
  birth_date DATE,
  federation_player_id TEXT,
  federation_status VARCHAR(30)
) AS $$
BEGIN
  -- Validar autorización del usuario sobre el deportista
  IF NOT public.current_user_has_player_access(p_player_id) THEN
    RAISE EXCEPTION 'Acceso Denegado: No está autorizado a consultar este expedientes de deportista.';
  END IF;

  -- Validar que el rol canónico sea DELEGADO, COORDINADOR, DIR_DEPORTIVA o ADMIN_GENERAL
  IF NOT (
    public.is_admin() OR EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('DELEGADO', 'COORDINADOR', 'DIR_DEPORTIVA')
        AND status = 'ACTIVE'
    )
  ) THEN
    RAISE EXCEPTION 'Acceso Denegado: Su rol no dispone de permisos para consultar expedientes con licencias federativas.';
  END IF;

  RETURN QUERY
  SELECT 
    j.id,
    j.first_name,
    j.last_name,
    j.display_name,
    j.gender,
    j.status,
    j.birth_date,
    j.federation_player_id,
    j.federation_status
  FROM public.jugadores j
  WHERE j.id = p_player_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

GRANT EXECUTE ON FUNCTION public.get_jugador_expediente_delegado(UUID) TO authenticated;
COMMENT ON FUNCTION public.get_jugador_expediente_delegado(UUID) IS 'Función RPC segura para consultar expediente federativo por Delegados/Coordinación (M10-B.2)';
