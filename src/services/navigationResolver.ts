import { AppRole } from '../types/roles';
import { ResolvedIdentity } from '../types/identity';
import { NAVIGATION_CATALOG, NavigationCatalogItem } from '../config/navigationCatalog';

/**
 * Resolver Canónico de Navegación por Perfil e Identidad (M9.1 - Bloque 4F.3)
 * Determina dinámicamente las pestañas/rutas autorizadas y activas para cada perfil.
 */
export function resolveNavigationForIdentity(
  resolvedIdentity: ResolvedIdentity | null,
  activeProfile: AppRole | null
): NavigationCatalogItem[] {
  // Si no se especifica perfil activo, tomar recommendedProfile o primer rol
  const currentProfile = activeProfile || resolvedIdentity?.recommendedProfile || 'FAMILIA';

  // Regla Global: ADMIN_GENERAL -> Acceso Global Dinámico a TODAS las rutas ACTIVE existentes
  const isGlobalAdmin = 
    currentProfile === 'ADMIN_GENERAL' || 
    resolvedIdentity?.scopes?.hasGlobalAccess || 
    resolvedIdentity?.roles?.includes('ADMIN_GENERAL');

  if (isGlobalAdmin) {
    return Object.values(NAVIGATION_CATALOG).filter(item => item.status === 'ACTIVE');
  }

  // M9.1: Listas definitivas de navegación aprobadas por el producto
  let targetKeys: string[] = [];

  switch (currentProfile) {
    case 'FAMILIA':
      targetKeys = [
        'inicio', 
        'jugadores', 
        'calendario', 
        'entrenamientos', 
        'partidos', 
        'convocatorias', 
        'torneos', 
        'campus', 
        'comunicaciones', 
        'noticias', 
        'configuracion', 
        'avisos'
      ];
      break;

    case 'ENTRENADOR':
    case 'SEGUNDO_ENTRENADOR':
      targetKeys = [
        'inicio', 
        'plantillas', 
        'calendario', 
        'entrenamientos', 
        'partido_en_vivo', 
        'convocatorias', 
        'estadisticas', 
        'torneos', 
        'campus', 
        'comunicaciones', 
        'documentacion', 
        'configuracion', 
        'avisos'
      ];
      break;

    case 'DELEGADO':
      // DELEGADO: Estrictamente SIN Torneos, Campus ni Preparación
      targetKeys = [
        'inicio', 
        'partido_en_vivo', 
        'acta', 
        'documentacion', 
        'comunicaciones', 
        'configuracion', 
        'avisos'
      ];
      break;

    case 'PREPARADOR_FISICO':
      targetKeys = [
        'inicio', 
        'preparacion_fisica', 
        'equipos', 
        'calendario', 
        'comunicaciones', 
        'configuracion', 
        'avisos'
      ];
      break;

    case 'FISIOTERAPEUTA':
      targetKeys = [
        'inicio', 
        'lesiones', 
        'recuperaciones', 
        'jugadores', 
        'calendario', 
        'comunicaciones', 
        'configuracion', 
        'avisos'
      ];
      break;

    case 'COORDINADOR':
    case 'DIR_DEPORTIVA':
      targetKeys = [
        'inicio', 
        'equipos', 
        'jugadores', 
        'familias', 
        'entrenadores', 
        'calendario', 
        'entrenamientos', 
        'partido_en_vivo', 
        'convocatorias', 
        'estadisticas', 
        'torneos', 
        'campus', 
        'documentacion', 
        'comunicaciones', 
        'noticias', 
        'configuracion', 
        'avisos'
      ];
      break;

    default:
      targetKeys = ['inicio', 'comunicaciones', 'configuracion', 'avisos'];
      break;
  }

  // Filtrar catálogo asegurando que ÚNICAMENTE se retornan ítems con estado ACTIVE
  const resolvedItems: NavigationCatalogItem[] = [];

  targetKeys.forEach(key => {
    const item = NAVIGATION_CATALOG[key];
    if (item && item.status === 'ACTIVE') {
      resolvedItems.push(item);
    }
  });

  return resolvedItems;
}
