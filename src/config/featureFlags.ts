/**
/**
 * Banderas de características (Feature Flags) — Bloque 4F.3 (M7)
 * Permite conmutar o revertir de forma instantánea el gobierno del Resolver Canónico.
 */

export const FEATURE_FLAGS = {
  /**
   * Habilita el Resolver Canónico de Identidad como fuente de verdad gobernante
   * para la selección de perfil inicial y contextos permitidos (M7-A).
   * Si es false o si el Resolver falla, el sistema conmuta automáticamente al legacy.
   */
  USE_CANONICAL_PROFILE_ROUTING: process.env.EXPO_PUBLIC_USE_CANONICAL_PROFILE_ROUTING !== 'false',

  /**
   * Habilita el Resolver Canónico como fuente de verdad gobernante de contexto operativo (M8):
   * assignedTeams, linkedPlayers, activeTeamId, activePlayerId.
   * Si es false o si el Resolver falla, el sistema conmuta automáticamente al legacy.
   */
  USE_CANONICAL_CONTEXT: process.env.EXPO_PUBLIC_USE_CANONICAL_CONTEXT !== 'false',

  /**
   * Habilita la Navegación Canónica por Perfil y Permisos (M9):
   * Determina dinámicamente las rutas autorizadas y activas para cada perfil.
   * Si es false o si la resolución falla, conmuta automáticamente a la navegación legacy.
   */
  USE_CANONICAL_NAVIGATION: process.env.EXPO_PUBLIC_USE_CANONICAL_NAVIGATION !== 'false',
};
