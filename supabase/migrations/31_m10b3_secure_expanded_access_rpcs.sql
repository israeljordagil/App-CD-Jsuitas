-- =========================================================================
-- MIGRACIÓN 31: CIERRE SEGURO DE ACCESOS AMPLIADOS A JUGADORES (BLOQUE 4F.3 - M10-B.3)
-- Elimina v_mis_hijos y crea las RPCs seguras get_mis_hijos(), get_jugador_expediente_delegado()
-- y get_jugador_expediente_admin() con SECURITY DEFINER y search_path explícito.
-- =========================================================================

-- 1. ELIMINACIÓN DE V_MIS_HIJOS (TÉCNICAMENTE INCOMPATIBLE CON COLUMN GRANTS EN AUTHENTICATED)
DROP VIEW IF EXISTS public.v_mis_hijos CASCADE;

-- 2. CREACIÓN DE RPC SEGURA PARA PERFIL FAMILIA (get_mis_hijos)
CREATE OR REPLACE FUNCTION public.get_mis_hijos()
RETURNS TABLE (
  id UUID,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  gender VARCHAR(20),
  status VARCHAR(30),
  birth_date DATE,
  federation_player_id TEXT,
  federation_status VARCHAR(30),
  parentesco VARCHAR(50),
  responsibility_level VARCHAR(30),
  is_primary_reference BOOLEAN
) AS $$
BEGIN
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
    j.federation_status,
    vf.parentesco,
    vf.responsibility_level,
    vf.is_primary_reference
  FROM public.jugadores j
  JOIN public.vinculos_familiares vf ON vf.jugador_id = j.id
  WHERE vf.tutor_user_id = auth.uid()
    AND vf.status = 'ACTIVE';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

GRANT EXECUTE ON FUNCTION public.get_mis_hijos() TO authenticated;
COMMENT ON FUNCTION public.get_mis_hijos() IS 'RPC segura para que el perfil FAMILIA consulte datos de sus propios hijos tutelados activos (M10-B.3)';

-- 3. REFINAMIENTO DE RPC SEGURA PARA DELEGADOS Y COORDINACIÓN (get_jugador_expediente_delegado)
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
    RAISE EXCEPTION 'Acceso Denegado: No está autorizado a consultar este expediente de deportista.';
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

-- 4. CREACIÓN DE RPC ADMINISTRATIVA SEGURA PARA ADMIN_GENERAL (get_jugador_expediente_admin)
CREATE OR REPLACE FUNCTION public.get_jugador_expediente_admin(p_player_id UUID)
RETURNS TABLE (
  id UUID,
  federation_player_id TEXT,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  birth_date DATE,
  gender VARCHAR(20),
  federation_status VARCHAR(30),
  source VARCHAR(30),
  source_reference TEXT,
  status VARCHAR(30),
  notes TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  created_by TEXT,
  updated_by TEXT
) AS $$
BEGIN
  -- Validar estrictamente la condición de ADMIN_GENERAL
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acceso Denegado: Operación reservada exclusivamente a ADMIN_GENERAL.';
  END IF;

  RETURN QUERY
  SELECT 
    j.id,
    j.federation_player_id,
    j.first_name,
    j.last_name,
    j.display_name,
    j.birth_date,
    j.gender,
    j.federation_status,
    j.source,
    j.source_reference,
    j.status,
    j.notes,
    j.created_at,
    j.updated_at,
    j.created_by,
    j.updated_by
  FROM public.jugadores j
  WHERE j.id = p_player_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

GRANT EXECUTE ON FUNCTION public.get_jugador_expediente_admin(UUID) TO authenticated;
COMMENT ON FUNCTION public.get_jugador_expediente_admin(UUID) IS 'RPC administrativa segura que permite a ADMIN_GENERAL consultar expedientes completos de deportistas (M10-B.3)';
