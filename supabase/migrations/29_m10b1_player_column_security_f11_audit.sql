-- =========================================================================
-- MIGRACIÓN 29: HARDENING DE DATOS DE JUGADORES, F11 Y JUGADOR_EQUIPOS (BLOQUE 4F.3 - M10-B.1)
-- Implementación de minimización de columnas, vista segura de deportistas v_jugadores_deportivos,
-- hardening centralizado de is_f11_team() y documentación/RLS de jugador_equipos.
-- =========================================================================

-- 1. HARDENING CENTRALIZADO DE LA DETECCIÓN FÚTBOL 11 (is_f11_team)
CREATE OR REPLACE FUNCTION public.is_f11_team(p_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.teams
    WHERE id = p_team_id
      AND LOWER(sport) IN ('fútbol', 'futbol')
      AND LOWER(category) IN ('infantil', 'cadete', 'juvenil', 'senior')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- 2. VISTA SEGURA DE DEPORTISTAS (v_jugadores_deportivos) PARA CONSULTAS TÉCNICAS NO SENSIBLES
CREATE OR REPLACE VIEW public.v_jugadores_deportivos AS
SELECT 
  id,
  first_name,
  last_name,
  display_name,
  gender,
  status
FROM public.jugadores;

COMMENT ON VIEW public.v_jugadores_deportivos IS 'Vista segura que expone exclusivamente información deportiva básica de deportistas omitiendo columnas privadas y federativas (M10-B.1)';

-- 3. POLÍTICA DE PRIVILEGIOS DE COLUMNA Y OTORGAMIENTOS (GRANT/REVOKE) EN PUBLIC.JUGADORES
-- Otorgar SELECT solo sobre columnas deportivas no sensibles al rol authenticated
GRANT SELECT (id, first_name, last_name, display_name, gender, status) ON public.jugadores TO authenticated;

-- Otorgar acceso a la vista segura de deportistas al rol authenticated
GRANT SELECT ON public.v_jugadores_deportivos TO authenticated;

-- 4. CONFIRMACIÓN Y DOCUMENTACIÓN DE POLÍTICAS RLS EN PUBLIC.JUGADOR_EQUIPOS
ALTER TABLE public.jugador_equipos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Jugador equipos select policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos insert policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos update policy" ON public.jugador_equipos;
DROP POLICY IF EXISTS "Jugador equipos delete policy" ON public.jugador_equipos;

-- SELECT: Permite la resolución de pertenencia de plantilla si el usuario posee permiso sobre el equipo o el deportista
CREATE POLICY "Jugador equipos select policy"
ON public.jugador_equipos FOR SELECT
USING (
  public.current_user_has_team_access(team_id) OR public.current_user_has_player_access(player_id)
);

-- INSERT / UPDATE / DELETE: Exclusivos para ADMIN_GENERAL (DENY BY DEFAULT para cliente)
CREATE POLICY "Jugador equipos insert policy"
ON public.jugador_equipos FOR INSERT
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Jugador equipos update policy"
ON public.jugador_equipos FOR UPDATE
USING (
  public.is_admin()
)
WITH CHECK (
  public.is_admin()
);

CREATE POLICY "Jugador equipos delete policy"
ON public.jugador_equipos FOR DELETE
USING (
  public.is_admin()
);

COMMENT ON TABLE public.jugador_equipos IS 'Tabla relacional de asignaciones deportista-equipo con RLS DENY BY DEFAULT (M10-B.1)';
