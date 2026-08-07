import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AppRole } from '../types/roles';
import { 
  CanonicalPersona, 
  RoleAssignmentDetail, 
  ResolvedIdentity, 
  LinkedPlayerFamilyRef,
  ResolvedIdentityScope
} from '../types/identity';

/**
 * Jerarquía y prioridad oficial aprobada para recomendación de perfil inicial:
 * 1. ADMIN_GENERAL
 * 2. COORDINADOR
 * 3. DIR_DEPORTIVA
 * 4. CUERPO TÉCNICO (ENTRENADOR, SEGUNDO_ENTRENADOR, PREPARADOR_FISICO, FISIOTERAPEUTA)
 * 5. DELEGADO
 * 6. FAMILIA
 */
export function resolveRecommendedProfile(roles: AppRole[]): AppRole | null {
  if (!roles || roles.length === 0) return null;
  
  if (roles.includes('ADMIN_GENERAL')) return 'ADMIN_GENERAL';
  if (roles.includes('COORDINADOR')) return 'COORDINADOR';
  if (roles.includes('DIR_DEPORTIVA')) return 'DIR_DEPORTIVA';

  // Cuerpo técnico
  if (roles.includes('ENTRENADOR')) return 'ENTRENADOR';
  if (roles.includes('SEGUNDO_ENTRENADOR')) return 'SEGUNDO_ENTRENADOR';
  if (roles.includes('PREPARADOR_FISICO')) return 'PREPARADOR_FISICO';
  if (roles.includes('FISIOTERAPEUTA')) return 'FISIOTERAPEUTA';

  if (roles.includes('DELEGADO')) return 'DELEGADO';
  if (roles.includes('FAMILIA')) return 'FAMILIA';

  return roles[0] || null;
}

/**
 * Resolver Canónico de Identidad y Roles (M5 - Bloque 4F.3)
 * Fuente única de verdad para la resolución de Persona, roles, asignaciones, ámbitos y tutelas.
 */
export async function resolveCanonicalIdentity(userId: string): Promise<ResolvedIdentity> {
  // 1. Estructura Persona por defecto en caso de no conexión o fallback
  let persona: CanonicalPersona = {
    id: userId,
    fullName: 'Usuario Jesuitas',
    firstName: null,
    lastName: null,
    secondLastName: null,
    email: null,
    phone: null,
    preferredLanguage: 'es',
    status: 'ACTIVO'
  };

  const assignments: RoleAssignmentDetail[] = [];
  const uniqueRolesSet = new Set<AppRole>();
  const assignedTeamIdsSet = new Set<string>();
  const assignedCategoryIdsSet = new Set<string>();
  const assignedSportsSet = new Set<string>();
  const linkedPlayers: LinkedPlayerFamilyRef[] = [];
  let hasGlobalAccess = false;
  let hasF11TransversalAccess = false;

  if (supabase && isSupabaseConfigured) {
    try {
      // A. Consultar public.profiles (M2 - Persona Canónica)
      const { data: pData } = await supabase
        .from('profiles')
        .select('id, full_name, first_name, last_name, second_last_name, email, telefono, preferred_language, status, avatar_url, fecha_nacimiento')
        .eq('id', userId)
        .maybeSingle();

      if (pData) {
        persona = {
          id: pData.id,
          fullName: pData.full_name || 'Usuario Jesuitas',
          firstName: pData.first_name || null,
          lastName: pData.last_name || null,
          secondLastName: pData.second_last_name || null,
          email: pData.email || null,
          phone: pData.telefono || null,
          preferredLanguage: pData.preferred_language || 'es',
          status: pData.status || 'ACTIVO',
          avatarUrl: pData.avatar_url || null,
          birthDate: pData.fecha_nacimiento || null
        };
      }

      // B. Consultar public.user_roles (M4 - Multirol y Ámbitos)
      const { data: rData } = await supabase
        .from('user_roles')
        .select('id, role, scope_type, scope_id, deporte_codigo, categoria_id, equipo_id, temporada_id, status')
        .eq('user_id', userId);

      if (rData && rData.length > 0) {
        rData.forEach((r: any) => {
          const roleEnum = r.role as AppRole;
          uniqueRolesSet.add(roleEnum);

          if (roleEnum === 'ADMIN_GENERAL' || r.scope_type === 'CLUB') {
            hasGlobalAccess = true;
          }

          if (roleEnum === 'PREPARADOR_FISICO' || roleEnum === 'FISIOTERAPEUTA' || r.scope_type === 'FOOTBALL_11') {
            hasF11TransversalAccess = true;
          }

          if (r.equipo_id) assignedTeamIdsSet.add(r.equipo_id);
          if (r.categoria_id) assignedCategoryIdsSet.add(r.categoria_id);
          if (r.deporte_codigo) assignedSportsSet.add(r.deporte_codigo);

          assignments.push({
            id: r.id,
            role: roleEnum,
            scopeType: r.scope_type || 'CLUB',
            scopeId: r.scope_id || null,
            deporteCodigo: r.deporte_codigo || null,
            categoriaId: r.categoria_id || null,
            equipoId: r.equipo_id || null,
            temporadaId: r.temporada_id || null,
            status: r.status || 'ACTIVE'
          });
        });
      }

      // C. Consultar public.vinculos_familiares (M3 - Relaciones Familiares)
      const { data: vData } = await supabase
        .from('vinculos_familiares')
        .select('id, parentesco, responsibility_level, is_primary_reference, status, jugador_id, jugadores(id, nombre, apellidos, dorsal_habitual, posicion_principal)')
        .eq('tutor_user_id', userId);

      if (vData && vData.length > 0) {
        vData.forEach((v: any) => {
          if (v.status !== 'REVOKED') {
            const j = v.jugadores;
            linkedPlayers.push({
              id: j?.id || v.jugador_id,
              name: j ? `${j.nombre} ${j.apellidos}`.trim() : 'Deportista Vinculado',
              parentesco: v.parentesco || 'AUTORIZADO',
              responsibilityLevel: v.responsibility_level || 'RESPONSIBLE',
              isPrimaryReference: Boolean(v.is_primary_reference),
              dorsal: j?.dorsal_habitual || 'N/A',
              position: j?.posicion_principal || 'Deportista'
            });
          }
        });
      }
    } catch (err) {
      console.warn('Advertencia en resolveCanonicalIdentity:', err);
    }
  }

  const rolesArray = Array.from(uniqueRolesSet);
  const availableProfiles = resolveAvailableProfiles(rolesArray);
  const recommendedProfile = resolveRecommendedProfile(rolesArray);
  const requiresProfileSelector = resolveRequiresProfileSelector(availableProfiles, rolesArray);

  const scopes: ResolvedIdentityScope = {
    hasGlobalAccess,
    hasF11TransversalAccess,
    assignedCategoryIds: Array.from(assignedCategoryIdsSet),
    assignedTeamIds: Array.from(assignedTeamIdsSet),
    assignedSports: Array.from(assignedSportsSet)
  };

  const teams = Array.from(assignedTeamIdsSet).map(id => ({ id }));

  return {
    persona,
    roles: rolesArray,
    availableProfiles,
    assignments,
    teams,
    scopes,
    linkedPlayers,
    recommendedProfile,
    requiresProfileSelector
  };
}

export function resolveAvailableProfiles(roles: AppRole[]): AppRole[] {
  const profileSet = new Set<AppRole>();
  
  (roles || []).forEach(role => {
    if (role === 'FAMILIA') profileSet.add('FAMILIA');
    else if (role === 'ENTRENADOR' || role === 'SEGUNDO_ENTRENADOR') profileSet.add('ENTRENADOR');
    else if (role === 'DELEGADO') profileSet.add('DELEGADO');
    else if (role === 'PREPARADOR_FISICO') profileSet.add('PREPARADOR_FISICO');
    else if (role === 'FISIOTERAPEUTA') profileSet.add('FISIOTERAPEUTA');
    else if (role === 'COORDINADOR' || role === 'DIR_DEPORTIVA') profileSet.add('COORDINADOR');
    else if (role === 'ADMIN_GENERAL') profileSet.add('ADMIN_GENERAL');
  });

  return Array.from(profileSet);
}

export function resolveRequiresProfileSelector(availableProfiles: AppRole[], roles: AppRole[]): boolean {
  if (!roles || roles.length === 0) return false;

  // Regla 1: ADMIN_GENERAL tiene prioridad y acceso directo a Administración -> No selector innecesario
  if (roles.includes('ADMIN_GENERAL')) return false;

  // Regla 2: Un único perfil funcional -> No selector
  if (availableProfiles.length <= 1) return false;

  // Regla 3: Casos explícitos aprobados que requieren selector
  const hasFamilia = availableProfiles.includes('FAMILIA');
  const hasCoordinador = availableProfiles.includes('COORDINADOR');
  const hasCoachOrStaff = availableProfiles.some(p => ['ENTRENADOR', 'DELEGADO', 'PREPARADOR_FISICO', 'FISIOTERAPEUTA'].includes(p));

  // Caso A: FAMILIA + algún rol de Cuerpo Técnico / Delegado / Coordinador
  if (hasFamilia && (hasCoachOrStaff || hasCoordinador)) return true;

  // Caso B: COORDINADOR + ENTRENADOR / Cuerpo Técnico
  if (hasCoordinador && hasCoachOrStaff) return true;

  return availableProfiles.length > 1;
}

/**
 * Mapa centralizado canónico -> Contexto funcional de la app (ActiveContextType)
 */
export function mapCanonicalProfileToActiveContext(profile: AppRole): AppRole {
  if (!profile) return 'FAMILIA';

  switch (profile) {
    case 'FAMILIA':
      return 'FAMILIA';
    case 'ENTRENADOR':
    case 'SEGUNDO_ENTRENADOR':
      return 'ENTRENADOR';
    case 'DELEGADO':
      return 'DELEGADO';
    case 'PREPARADOR_FISICO':
      return 'PREPARADOR_FISICO';
    case 'FISIOTERAPEUTA':
      return 'FISIOTERAPEUTA';
    case 'COORDINADOR':
    case 'DIR_DEPORTIVA':
      return 'COORDINADOR';
    case 'ADMIN_GENERAL':
      return 'ADMIN_GENERAL';
    default:
      return profile;
  }
}

/**
 * Obtener perfil preferido guardado en este dispositivo si sigue estando autorizado y activo.
 */
export function getSavedPreferredProfile(availableProfiles: AppRole[]): AppRole | null {
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const saved = localStorage.getItem('cd_jesuitas_preferred_profile');
    if (saved && (availableProfiles || []).includes(saved as AppRole)) {
      return saved as AppRole;
    }
  } catch (e) {
    console.warn('Advertencia leyendo cd_jesuitas_preferred_profile:', e);
  }
  return null;
}

/**
 * Guardar perfil preferido por dispositivo.
 */
export function savePreferredProfile(profile: AppRole): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    if (profile) {
      localStorage.setItem('cd_jesuitas_preferred_profile', profile);
    } else {
      localStorage.removeItem('cd_jesuitas_preferred_profile');
    }
  } catch (e) {
    console.warn('Advertencia guardando cd_jesuitas_preferred_profile:', e);
  }
}

/**
 * Resolver equipo activo inicial M8
 * - Equipo único -> Selección automática
 * - Múltiples equipos -> Restaurar el guardado si es válido; si no, el primero.
 */
export function resolveInitialActiveTeam(
  teams: Array<{ id: string; name?: string }>, 
  savedTeamId?: string | null
): string | null {
  if (!teams || teams.length === 0) return null;
  
  if (teams.length === 1) return teams[0].id;

  if (savedTeamId) {
    const exists = teams.some(t => t.id === savedTeamId);
    if (exists) return savedTeamId;
  }

  return teams[0].id;
}

/**
 * Resolver deportista activo inicial M8
 * - Rol FAMILIA con un hijo -> Selección automática
 * - Rol FAMILIA con múltiples hijos -> Restaurar el guardado si es válido; si no, el primero.
 * - Cuerpo técnico / Staff -> null (nunca autoselecciona a un jugador de plantilla como hijo).
 */
export function resolveInitialActivePlayer(
  role: AppRole, 
  linkedPlayers: LinkedPlayerFamilyRef[], 
  savedPlayerId?: string | null
): string | null {
  if (role !== 'FAMILIA') return null;

  if (!linkedPlayers || linkedPlayers.length === 0) return null;

  if (linkedPlayers.length === 1) return linkedPlayers[0].id;

  if (savedPlayerId) {
    const exists = linkedPlayers.some(p => p.id === savedPlayerId);
    if (exists) return savedPlayerId;
  }

  return linkedPlayers[0].id;
}



