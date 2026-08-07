// Script de pruebas M9.1: Corrección Funcional del Catálogo Canónico de Navegación

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

  // Funciones Aprobadas Futuras (FUTURE)
  preparacion_fisica: { id: 'preparacion_fisica', label: 'Preparación Física', route: 'preparacion-fisica', icon: '💪', status: 'FUTURE' },
  lesiones: { id: 'lesiones', label: 'Lesiones', route: 'lesiones', icon: '🏥', status: 'FUTURE' },
  recuperaciones: { id: 'recuperaciones', label: 'Recuperaciones', route: 'recuperaciones', icon: '🩹', status: 'FUTURE' },
  campus: { id: 'campus', label: 'Campus', route: 'campus', icon: '🏕️', status: 'FUTURE' },
  noticias: { id: 'noticias', label: 'Noticias', route: 'noticias', icon: '📰', status: 'FUTURE' },
  galeria: { id: 'galeria', label: 'Galería', route: 'galeria', icon: '📸', status: 'HIDDEN' }
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
      targetKeys = ['inicio', 'jugadores', 'calendario', 'entrenamientos', 'partidos', 'convocatorias', 'torneos', 'campus', 'comunicaciones', 'noticias', 'configuracion', 'avisos'];
      break;
    case 'ENTRENADOR':
    case 'SEGUNDO_ENTRENADOR':
      targetKeys = ['inicio', 'plantillas', 'calendario', 'entrenamientos', 'partido_en_vivo', 'convocatorias', 'estadisticas', 'torneos', 'campus', 'comunicaciones', 'documentacion', 'configuracion', 'avisos'];
      break;
    case 'DELEGADO':
      targetKeys = ['inicio', 'partido_en_vivo', 'acta', 'documentacion', 'comunicaciones', 'configuracion', 'avisos'];
      break;
    case 'PREPARADOR_FISICO':
      targetKeys = ['inicio', 'preparacion_fisica', 'equipos', 'calendario', 'comunicaciones', 'configuracion', 'avisos'];
      break;
    case 'FISIOTERAPEUTA':
      targetKeys = ['inicio', 'lesiones', 'recuperaciones', 'jugadores', 'calendario', 'comunicaciones', 'configuracion', 'avisos'];
      break;
    case 'COORDINADOR':
    case 'DIR_DEPORTIVA':
      targetKeys = ['inicio', 'equipos', 'jugadores', 'familias', 'entrenadores', 'calendario', 'entrenamientos', 'partido_en_vivo', 'convocatorias', 'estadisticas', 'torneos', 'campus', 'documentacion', 'comunicaciones', 'noticias', 'configuracion', 'avisos'];
      break;
    default:
      targetKeys = ['inicio', 'comunicaciones', 'configuracion', 'avisos'];
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

function runM91FunctionalCatalogTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M9.1 CATÁLOGO FUNCIONAL ===');

  // 1. FAMILIA
  const famNav = resolveNavigationForIdentity(null, 'FAMILIA');
  const famIds = famNav.map(i => i.id);
  if (famIds.includes('instalaciones')) throw new Error('P1 Fam Instalaciones no debe estar en catálogo canónico');
  if (famIds.includes('campus') || famIds.includes('noticias')) throw new Error('P1 Fam Future expuesto');
  if (!famIds.includes('inicio') || !famIds.includes('jugadores') || !famIds.includes('torneos')) throw new Error('P1 Fam Faltan rutas');
  console.log('[OK] Prueba 1: FAMILIA -> Catálogo funcional definitivo correcto (Sin Instalaciones).');

  // 2. ENTRENADOR / SEGUNDO_ENTRENADOR
  const coachNav = resolveNavigationForIdentity(null, 'ENTRENADOR');
  const coachIds = coachNav.map(i => i.id);
  if (coachIds.includes('informes') || coachIds.includes('tactica') || coachIds.includes('instalaciones')) throw new Error('P2 Coach Legacy leftovers');
  if (!coachIds.includes('plantillas') || !coachIds.includes('partido_en_vivo') || !coachIds.includes('documentacion')) throw new Error('P2 Coach Faltan rutas');
  console.log('[OK] Prueba 2: ENTRENADOR -> Catálogo funcional definitivo correcto (Sin Informes, Táctica ni Instalaciones).');

  // 3. DELEGADO
  const delNav = resolveNavigationForIdentity(null, 'DELEGADO');
  const delIds = delNav.map(i => i.id);
  if (delIds.includes('preparacion') || delIds.includes('torneos') || delIds.includes('campus') || delIds.includes('instalaciones')) throw new Error('P3 Delegado Excluidos');
  if (!delIds.includes('acta') || !delIds.includes('partido_en_vivo') || !delIds.includes('documentacion')) throw new Error('P3 Delegado Faltan rutas');
  console.log('[OK] Prueba 3: DELEGADO -> Catálogo funcional definitivo correcto (Sin Preparación, Torneos, Campus ni Instalaciones).');

  // 4. PREPARADOR FISICO
  const pfNav = resolveNavigationForIdentity(null, 'PREPARADOR_FISICO');
  const pfIds = pfNav.map(i => i.id);
  if (pfIds.includes('preparacion_fisica')) throw new Error('P4 PF preparacion_fisica es FUTURE');
  if (!pfIds.includes('equipos') || !pfIds.includes('calendario')) throw new Error('P4 PF Faltan rutas');
  console.log('[OK] Prueba 4: PREPARADOR_FISICO -> Catálogo funcional definitivo correcto (Preparación Física en FUTURE).');

  // 5. FISIOTERAPEUTA
  const fisioNav = resolveNavigationForIdentity(null, 'FISIOTERAPEUTA');
  const fisioIds = fisioNav.map(i => i.id);
  if (fisioIds.includes('rendimiento')) throw new Error('P5 Fisio Rendimiento no debe usarse como sustituto');
  if (fisioIds.includes('lesiones') || fisioIds.includes('recuperaciones')) throw new Error('P5 Fisio Lesiones/Recuperaciones son FUTURE');
  if (!fisioIds.includes('jugadores') || !fisioIds.includes('calendario')) throw new Error('P5 Fisio Faltan rutas');
  console.log('[OK] Prueba 5: FISIOTERAPEUTA -> Catálogo funcional definitivo correcto (Lesiones y Recuperaciones en FUTURE, Sin Rendimiento).');

  // 6. COORDINACION
  const coordNav = resolveNavigationForIdentity(null, 'COORDINADOR');
  const coordIds = coordNav.map(i => i.id);
  if (!coordIds.includes('equipos') || !coordIds.includes('jugadores') || !coordIds.includes('familias') || !coordIds.includes('entrenadores')) throw new Error('P6 Coord Faltan rutas');
  console.log('[OK] Prueba 6: COORDINACION -> Catálogo funcional definitivo correcto.');

  // 7. ADMIN_GENERAL
  const adminNav = resolveNavigationForIdentity(null, 'ADMIN_GENERAL');
  const activeCount = Object.values(NAVIGATION_CATALOG).filter(i => i.status === 'ACTIVE').length;
  if (adminNav.length !== activeCount) throw new Error('P7 Admin Count');
  console.log('[OK] Prueba 7: ADMIN_GENERAL -> Manteniendo Acceso Global Dinámico a las %d rutas ACTIVE.', adminNav.length);

  console.log('=== TODAS LAS PRUEBAS M9.1 COMPLETADAS CON ÉXITO ===');
}

runM91FunctionalCatalogTests();
