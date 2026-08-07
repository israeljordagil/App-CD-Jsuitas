// Script de pruebas M9: Navegación Canónica por Perfil y Permisos

const NAVIGATION_CATALOG = {
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
  preparacion: { id: 'preparacion', label: 'Preparación de Partido', route: 'delegado/preparacion', icon: '📋', status: 'ACTIVE' },
  estadisticas: { id: 'estadisticas', label: 'Estadísticas', route: 'estadisticas', icon: '📊', status: 'ACTIVE' },
  informes: { id: 'informes', label: 'Informes', route: 'informes', icon: '📄', status: 'ACTIVE' },
  torneos: { id: 'torneos', label: 'Torneos', route: 'torneos', icon: '🏆', status: 'ACTIVE' },
  tactica: { id: 'tactica', label: 'Táctica', route: 'tactica', icon: '🧠', status: 'ACTIVE' },
  rendimiento: { id: 'rendimiento', label: 'Rendimiento', route: 'rendimiento', icon: '📈', status: 'ACTIVE' },
  avisos: { id: 'avisos', label: 'Avisos', route: 'avisos', icon: '📢', status: 'ACTIVE' },
  mensajes: { id: 'mensajes', label: 'Mensajes', route: 'mensajes', icon: '💬', status: 'ACTIVE' },
  instalaciones: { id: 'instalaciones', label: 'Club / Instalaciones', route: 'instalaciones', icon: '🏛️', status: 'ACTIVE' },
  configuracion: { id: 'configuracion', label: 'Ajustes', route: 'configuracion', icon: '⚙️', status: 'ACTIVE' },
  usuarios_roles: { id: 'usuarios_roles', label: 'Usuarios y Roles', route: 'usuarios-roles', icon: '🔐', status: 'ACTIVE' },

  // Rutas Futuras aprobadas
  campus: { id: 'campus', label: 'Campus', route: 'campus', icon: '🏕️', status: 'FUTURE' },
  noticias: { id: 'noticias', label: 'Noticias', route: 'noticias', icon: '📰', status: 'FUTURE' },
  galeria: { id: 'galeria', label: 'Galería', route: 'galeria', icon: '📸', status: 'HIDDEN' },
  fisioterapia: { id: 'fisioterapia', label: 'Lesiones y Recuperaciones', route: 'fisioterapia', icon: '🏥', status: 'FUTURE' }
};

function resolveNavigationForIdentity(resolvedIdentity, activeProfile) {
  const currentProfile = activeProfile || resolvedIdentity?.recommendedProfile || 'FAMILIA';

  const isGlobalAdmin = 
    currentProfile === 'ADMIN_GENERAL' || 
    resolvedIdentity?.scopes?.hasGlobalAccess || 
    resolvedIdentity?.roles?.includes('ADMIN_GENERAL');

  if (isGlobalAdmin) {
    return Object.values(NAVIGATION_CATALOG).filter(item => item.status === 'ACTIVE');
  }

  let targetKeys = [];

  switch (currentProfile) {
    case 'FAMILIA':
      targetKeys = ['inicio', 'jugadores', 'calendario', 'convocatorias', 'entrenamientos', 'partidos', 'torneos', 'mensajes', 'avisos', 'instalaciones', 'configuracion'];
      break;
    case 'ENTRENADOR':
    case 'SEGUNDO_ENTRENADOR':
      targetKeys = ['inicio', 'plantillas', 'calendario', 'convocatorias', 'entrenamientos', 'partido_en_vivo', 'partidos', 'estadisticas', 'informes', 'torneos', 'tactica', 'mensajes', 'avisos', 'documentacion', 'instalaciones', 'configuracion'];
      break;
    case 'DELEGADO':
      targetKeys = ['inicio', 'preparacion', 'partido_en_vivo', 'acta', 'documentacion', 'mensajes', 'avisos', 'configuracion'];
      break;
    case 'PREPARADOR_FISICO':
      targetKeys = ['inicio', 'equipos', 'calendario', 'preparacion', 'mensajes', 'avisos', 'configuracion'];
      break;
    case 'FISIOTERAPEUTA':
      targetKeys = ['inicio', 'rendimiento', 'jugadores', 'calendario', 'mensajes', 'avisos', 'configuracion'];
      break;
    case 'COORDINADOR':
    case 'DIR_DEPORTIVA':
      targetKeys = ['inicio', 'personas', 'equipos', 'jugadores', 'entrenadores', 'familias', 'calendario', 'convocatorias', 'entrenamientos', 'partidos', 'partido_en_vivo', 'estadisticas', 'informes', 'torneos', 'documentacion', 'mensajes', 'avisos', 'usuarios_roles', 'instalaciones', 'configuracion'];
      break;
    default:
      targetKeys = ['inicio', 'mensajes', 'avisos', 'configuracion'];
      break;
  }

  const resolvedItems = [];
  targetKeys.forEach(key => {
    const item = NAVIGATION_CATALOG[key];
    if (item && item.status === 'ACTIVE') {
      resolvedItems.push(item);
    }
  });

  return resolvedItems;
}

function runM9CanonicalNavigationTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M9 NAVEGACIÓN CANÓNICA ===');

  // 1. FAMILIA
  const famNav = resolveNavigationForIdentity(null, 'FAMILIA');
  const famIds = famNav.map(i => i.id);
  if (!famIds.includes('inicio') || !famIds.includes('jugadores')) throw new Error('P1 Fam');
  if (famIds.includes('campus') || famIds.includes('noticias')) throw new Error('P1 Fam Future');
  console.log('[OK] Prueba 1: FAMILIA -> Rutas activas correctas (Sin campus/noticias no desarrollados).');

  // 2. ENTRENADOR y SEGUNDO_ENTRENADOR (Coincidencia idéntica de navegación)
  const coachNav = resolveNavigationForIdentity(null, 'ENTRENADOR');
  const secCoachNav = resolveNavigationForIdentity(null, 'SEGUNDO_ENTRENADOR');
  if (JSON.stringify(coachNav) !== JSON.stringify(secCoachNav)) throw new Error('P2 Coach/SecCoach');
  console.log('[OK] Prueba 2: SEGUNDO_ENTRENADOR -> Navegación funcional idéntica a ENTRENADOR.');

  // 3. DELEGADO (Estrictamente SIN Torneos ni Campus)
  const delNav = resolveNavigationForIdentity(null, 'DELEGADO');
  const delIds = delNav.map(i => i.id);
  if (delIds.includes('torneos') || delIds.includes('campus')) throw new Error('P3 Delegado Torneos/Campus');
  if (!delIds.includes('acta') || !delIds.includes('partido_en_vivo')) throw new Error('P3 Delegado Actas');
  console.log('[OK] Prueba 3: DELEGADO -> Pestañas autorizadas (Estrictamente SIN Torneos ni Campus).');

  // 4. PREPARADOR FISICO
  const pfNav = resolveNavigationForIdentity(null, 'PREPARADOR_FISICO');
  const pfIds = pfNav.map(i => i.id);
  if (!pfIds.includes('preparacion') || !pfIds.includes('equipos')) throw new Error('P4 PF');
  console.log('[OK] Prueba 4: PREPARADOR_FISICO -> Rutas de ámbito correspondiente.');

  // 5. FISIOTERAPEUTA
  const fisioNav = resolveNavigationForIdentity(null, 'FISIOTERAPEUTA');
  const fisioIds = fisioNav.map(i => i.id);
  if (!fisioIds.includes('rendimiento') || !fisioIds.includes('jugadores')) throw new Error('P5 Fisio');
  if (fisioIds.includes('fisioterapia')) throw new Error('P5 Fisio Future');
  console.log('[OK] Prueba 5: FISIOTERAPEUTA -> Rutas de ámbito correspondiente (Sin enlaces a funciones futuras deshabilitadas).');

  // 6. COORDINACION
  const coordNav = resolveNavigationForIdentity(null, 'COORDINADOR');
  const coordIds = coordNav.map(i => i.id);
  if (!coordIds.includes('personas') || !coordIds.includes('equipos') || !coordIds.includes('usuarios_roles')) throw new Error('P6 Coord');
  console.log('[OK] Prueba 6: COORDINACION -> Navegación de Coordinación completa.');

  // 7. ADMIN_GENERAL (REGLA GLOBAL DE ACCESO COMPLETO DINÁMICO A TODAS LAS RUTAS ACTIVE)
  const adminNav = resolveNavigationForIdentity(null, 'ADMIN_GENERAL');
  const activeCatalogCount = Object.values(NAVIGATION_CATALOG).filter(i => i.status === 'ACTIVE').length;
  if (adminNav.length !== activeCatalogCount) throw new Error('P7 Admin Global');
  console.log('[OK] Prueba 7: ADMIN_GENERAL -> Acceso Global Dinámico a las %d rutas ACTIVE del catálogo.', adminNav.length);

  // 8. Inmunidad a rutas FUTURE/HIDDEN
  const futureOrHiddenInNav = adminNav.some(i => i.status === 'FUTURE' || i.status === 'HIDDEN');
  if (futureOrHiddenInNav) throw new Error('P8 FutureInNav');
  console.log('[OK] Prueba 8: Inmunidad verificada -> Cero rutas FUTURE o HIDDEN expuestas.');

  console.log('=== TODAS LAS PRUEBAS M9 COMPLETADAS CON ÉXITO ===');
}

runM9CanonicalNavigationTests();
