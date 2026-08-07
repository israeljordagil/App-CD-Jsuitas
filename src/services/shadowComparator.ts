import { AppRole } from '../types/roles';
import { ResolvedIdentity } from '../types/identity';

export interface ShadowComparisonResult {
  matchStatus: 'MATCH' | 'DIFFERENCE' | 'NOT_COMPARABLE';
  rolesMatch: boolean;
  recommendedProfileMatch: boolean;
  teamsMatch: boolean;
  linkedPlayersMatch: boolean;
  details: string[];
}

/**
 * Comparador Legacy vs. Canónico en Modo Sombra (M6 - Bloque 4F.3)
 * Evalúa silenciosamente la equivalencia entre el sistema heredado y el Resolver Canónico.
 * NO genera notificaciones a usuarios, emails, push ni alertas administrativas.
 */
export function compareLegacyVsCanonical(
  legacyData: {
    roles: AppRole[];
    activeContext: string | null;
    assignedTeams: any[];
    linkedPlayers: any[];
  },
  canonicalIdentity: ResolvedIdentity | null
): ShadowComparisonResult {
  if (!canonicalIdentity) {
    return {
      matchStatus: 'NOT_COMPARABLE',
      rolesMatch: false,
      recommendedProfileMatch: false,
      teamsMatch: false,
      linkedPlayersMatch: false,
      details: ['Identidad canónica aún no resuelta']
    };
  }

  const details: string[] = [];

  // 1. Comparar Roles
  const legacyRolesSorted = [...(legacyData.roles || [])].sort();
  const canonicalRolesSorted = [...(canonicalIdentity.roles || [])].sort();
  const rolesMatch = JSON.stringify(legacyRolesSorted) === JSON.stringify(canonicalRolesSorted);

  if (!rolesMatch) {
    details.push(`Diferencia de roles: Legacy=${JSON.stringify(legacyRolesSorted)}, Canónico=${JSON.stringify(canonicalRolesSorted)}`);
  }

  // 2. Comparar Perfil Recomendado / Activo
  const recommendedProfileMatch = legacyData.activeContext 
    ? legacyData.activeContext === canonicalIdentity.recommendedProfile 
    : true;

  if (!recommendedProfileMatch) {
    details.push(`Diferencia de perfil recomendado: Legacy Context=${legacyData.activeContext}, Canónico Recommended=${canonicalIdentity.recommendedProfile}`);
  }

  // 3. Comparar Equipos Asignados
  const legacyTeamIds = (legacyData.assignedTeams || []).map(t => t.id || t).sort();
  const canonicalTeamIds = (canonicalIdentity.teams || []).map(t => t.id).sort();
  const teamsMatch = JSON.stringify(legacyTeamIds) === JSON.stringify(canonicalTeamIds);

  if (!teamsMatch) {
    details.push(`Diferencia de equipos: Legacy=${JSON.stringify(legacyTeamIds)}, Canónico=${JSON.stringify(canonicalTeamIds)}`);
  }

  // 4. Comparar Jugadores Vinculados
  const legacyPlayerIds = (legacyData.linkedPlayers || []).map(p => p.id || p).sort();
  const canonicalPlayerIds = (canonicalIdentity.linkedPlayers || []).map(p => p.id).sort();
  const linkedPlayersMatch = JSON.stringify(legacyPlayerIds) === JSON.stringify(canonicalPlayerIds);

  if (!linkedPlayersMatch) {
    details.push(`Diferencia de deportistas vinculados: Legacy=${JSON.stringify(legacyPlayerIds)}, Canónico=${JSON.stringify(canonicalPlayerIds)}`);
  }

  const allMatched = rolesMatch && recommendedProfileMatch && teamsMatch && linkedPlayersMatch;
  const matchStatus = allMatched ? 'MATCH' : 'DIFFERENCE';

  // Logging técnico controlado únicamente en modo desarrollo
  if (__DEV__ && !allMatched) {
    console.log('[SHADOW_MODE_DIAGNOSTIC]', { matchStatus, details });
  }

  return {
    matchStatus,
    rolesMatch,
    recommendedProfileMatch,
    teamsMatch,
    linkedPlayersMatch,
    details
  };
}
