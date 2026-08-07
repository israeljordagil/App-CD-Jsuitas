/**
 * Catálogo Canónico de Navegación (M9.1 - Bloque 4F.3)
 * Clasificación funcional definitiva en ACTIVE (desarrolladas), FUTURE (aprobadas futuras) y HIDDEN.
 */

export interface NavigationCatalogItem {
  id: string;
  label: string;
  route: string;
  icon: string;
  status: 'ACTIVE' | 'FUTURE' | 'HIDDEN';
}

export const NAVIGATION_CATALOG: Record<string, NavigationCatalogItem> = {
  inicio: { id: 'inicio', label: 'Inicio', route: 'index', icon: '🏠', status: 'ACTIVE' },
  jugadores: { id: 'jugadores', label: 'Jugadores', route: 'jugadores', icon: '👦', status: 'ACTIVE' },
  personas: { id: 'personas', label: 'Personas', route: 'personas', icon: '👥', status: 'ACTIVE' },
  equipos: { id: 'equipos', label: 'Equipos', route: 'equipos', icon: '⚽', status: 'ACTIVE' },
  entrenadores: { id: 'entrenadores', label: 'Cuerpo Técnico', route: 'entrenadores', icon: '👨‍🏫', status: 'ACTIVE' },
  familias: { id: 'familias', label: 'Familias', route: 'familias', icon: '👨‍👩‍👧‍👦', status: 'ACTIVE' },
  plantillas: { id: 'plantillas', label: 'Plantilla', route: 'plantillas', icon: '👥', status: 'ACTIVE' },
  calendario: { id: 'calendario', label: 'Calendario', route: 'calendario', icon: '📅', status: 'ACTIVE' },
  convocatorias: { id: 'convocatorias', label: 'Convocatorias', route: 'convocatorias', icon: '📋', status: 'ACTIVE' },
  entrenamientos: { id: 'entrenamientos', label: 'Entrenamientos', route: 'entrenamientos', icon: '🏃', status: 'ACTIVE' },
  partidos: { id: 'partidos', label: 'Partidos', route: 'partidos', icon: '🏟️', status: 'ACTIVE' },
  partido_en_vivo: { id: 'partido_en_vivo', label: 'Partido en Vivo', route: 'delegado/partido-en-vivo', icon: '🏟️', status: 'ACTIVE' },
  acta: { id: 'acta', label: 'Acta del Partido', route: 'delegado/acta', icon: '📝', status: 'ACTIVE' },
  documentacion: { id: 'documentacion', label: 'Documentación', route: 'delegado/documentacion', icon: '📄', status: 'ACTIVE' },
  estadisticas: { id: 'estadisticas', label: 'Estadísticas', route: 'estadisticas', icon: '📊', status: 'ACTIVE' },
  informes: { id: 'informes', label: 'Informes', route: 'informes', icon: '📄', status: 'ACTIVE' },
  torneos: { id: 'torneos', label: 'Torneos', route: 'torneos', icon: '🏆', status: 'ACTIVE' },
  tactica: { id: 'tactica', label: 'Táctica', route: 'tactica', icon: '🧠', status: 'ACTIVE' },
  rendimiento: { id: 'rendimiento', label: 'Rendimiento', route: 'rendimiento', icon: '📈', status: 'ACTIVE' },
  comunicaciones: { id: 'comunicaciones', label: 'Comunicaciones', route: 'mensajes', icon: '💬', status: 'ACTIVE' },
  avisos: { id: 'avisos', label: 'Ayuda', route: 'avisos', icon: '❓', status: 'ACTIVE' },
  instalaciones: { id: 'instalaciones', label: 'Club / Instalaciones', route: 'instalaciones', icon: '🏛️', status: 'ACTIVE' },
  configuracion: { id: 'configuracion', label: 'Ajustes', route: 'configuracion', icon: '⚙️', status: 'ACTIVE' },
  usuarios_roles: { id: 'usuarios_roles', label: 'Usuarios y Roles', route: 'usuarios-roles', icon: '🔐', status: 'ACTIVE' },

  // Funciones Aprobadas Futuras (FUTURE - sin generar enlaces rotos)
  preparacion_fisica: { id: 'preparacion_fisica', label: 'Preparación Física', route: 'preparacion-fisica', icon: '💪', status: 'FUTURE' },
  lesiones: { id: 'lesiones', label: 'Lesiones', route: 'lesiones', icon: '🏥', status: 'FUTURE' },
  recuperaciones: { id: 'recuperaciones', label: 'Recuperaciones', route: 'recuperaciones', icon: '🩹', status: 'FUTURE' },
  campus: { id: 'campus', label: 'Campus', route: 'campus', icon: '🏕️', status: 'FUTURE' },
  noticias: { id: 'noticias', label: 'Noticias', route: 'noticias', icon: '📰', status: 'FUTURE' },
  galeria: { id: 'galeria', label: 'Galería', route: 'galeria', icon: '📸', status: 'HIDDEN' }
};
