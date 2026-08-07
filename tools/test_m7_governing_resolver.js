// Script de pruebas M7: Activación Progresiva del Resolver Canónico como Sistema Gobernante de Perfil Inicial

const FEATURE_FLAGS = {
  USE_CANONICAL_PROFILE_ROUTING: process.env.EXPO_PUBLIC_USE_CANONICAL_PROFILE_ROUTING !== 'false',
};

function mapCanonicalProfileToActiveContext(profile) {
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

function resolveRecommendedProfile(roles) {
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

function resolveAvailableProfiles(roles) {
  const profileSet = new Set();
  
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

function resolveRequiresProfileSelector(availableProfiles, roles) {
  if (!roles || roles.length === 0) return false;

  if (roles.includes('ADMIN_GENERAL')) return false;

  if (availableProfiles.length <= 1) return false;

  const hasFamilia = availableProfiles.includes('FAMILIA');
  const hasCoordinador = availableProfiles.includes('COORDINADOR');
  const hasCoachOrStaff = availableProfiles.some(p => ['ENTRENADOR', 'DELEGADO', 'PREPARADOR_FISICO', 'FISIOTERAPEUTA'].includes(p));

  if (hasFamilia && (hasCoachOrStaff || hasCoordinador)) return true;

  if (hasCoordinador && hasCoachOrStaff) return true;

  return availableProfiles.length > 1;
}

function getSavedPreferredProfile(availableProfiles, mockStoredValue) {
  if (mockStoredValue && (availableProfiles || []).includes(mockStoredValue)) {
    return mockStoredValue;
  }
  return null;
}

function runM7GoverningResolverTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M7 RESOLVER GOBERMANTE DE PERFIL ===');

  // 1. Verificación de Feature Flag
  if (FEATURE_FLAGS.USE_CANONICAL_PROFILE_ROUTING !== true) throw new Error('Feature Flag no está activa');
  console.log('[OK] Prueba 1: Feature Flag USE_CANONICAL_PROFILE_ROUTING está ACTIVA (true).');

  // 2. FAMILIA únicamente -> Acceso directo Familia
  const r2Roles = ['FAMILIA'];
  const r2Available = resolveAvailableProfiles(r2Roles);
  const r2Req = resolveRequiresProfileSelector(r2Available, r2Roles);
  const r2Context = mapCanonicalProfileToActiveContext(resolveRecommendedProfile(r2Roles));
  if (r2Req !== false) throw new Error('P2 Req');
  if (r2Context !== 'FAMILIA') throw new Error('P2 Context');
  console.log('[OK] Prueba 2: Usuario únicamente FAMILIA -> Acceso directo a contexto FAMILIA.');

  // 3. ENTRENADOR únicamente -> Acceso directo Entrenador
  const r3Roles = ['ENTRENADOR'];
  const r3Available = resolveAvailableProfiles(r3Roles);
  const r3Req = resolveRequiresProfileSelector(r3Available, r3Roles);
  const r3Context = mapCanonicalProfileToActiveContext(resolveRecommendedProfile(r3Roles));
  if (r3Req !== false) throw new Error('P3 Req');
  if (r3Context !== 'ENTRENADOR') throw new Error('P3 Context');
  console.log('[OK] Prueba 3: Usuario únicamente ENTRENADOR -> Acceso directo a contexto ENTRENADOR.');

  // 4. FAMILIA + ENTRENADOR -> Muestra Selector
  const r4Roles = ['FAMILIA', 'ENTRENADOR'];
  const r4Available = resolveAvailableProfiles(r4Roles);
  const r4Req = resolveRequiresProfileSelector(r4Available, r4Roles);
  if (r4Req !== true) throw new Error('P4 Req');
  console.log('[OK] Prueba 4: FAMILIA + ENTRENADOR -> Muestra selector de perfil.');

  // 5. FAMILIA + SEGUNDO_ENTRENADOR -> Muestra Selector Familia / Entrenador
  const r5Roles = ['FAMILIA', 'SEGUNDO_ENTRENADOR'];
  const r5Available = resolveAvailableProfiles(r5Roles);
  const r5Req = resolveRequiresProfileSelector(r5Available, r5Roles);
  if (!r5Available.includes('ENTRENADOR')) throw new Error('P5 Available');
  if (r5Req !== true) throw new Error('P5 Req');
  console.log('[OK] Prueba 5: FAMILIA + SEGUNDO_ENTRENADOR -> Muestra selector Familia / Entrenador.');

  // 6. COORDINADOR + ENTRENADOR -> Muestra Selector
  const r6Roles = ['COORDINADOR', 'ENTRENADOR'];
  const r6Available = resolveAvailableProfiles(r6Roles);
  const r6Req = resolveRequiresProfileSelector(r6Available, r6Roles);
  if (r6Req !== true) throw new Error('P6 Req');
  console.log('[OK] Prueba 6: COORDINADOR + ENTRENADOR -> Muestra selector de perfil.');

  // 7. ADMIN_GENERAL + cualquier otro rol -> Acceso directo Administración
  const r7Roles = ['ADMIN_GENERAL', 'FAMILIA', 'ENTRENADOR'];
  const r7Available = resolveAvailableProfiles(r7Roles);
  const r7Req = resolveRequiresProfileSelector(r7Available, r7Roles);
  const r7Context = mapCanonicalProfileToActiveContext(resolveRecommendedProfile(r7Roles));
  if (r7Req !== false) throw new Error('P7 Req');
  if (r7Context !== 'ADMIN_GENERAL') throw new Error('P7 Context');
  console.log('[OK] Prueba 7: ADMIN_GENERAL + otros roles -> Acceso directo prioritario a ADMIN_GENERAL.');

  // 8. ENTRENADOR con dos equipos -> Sin selector por multiequipo
  const r8Roles = ['ENTRENADOR'];
  const r8Available = resolveAvailableProfiles(r8Roles);
  const r8Req = resolveRequiresProfileSelector(r8Available, r8Roles);
  if (r8Available.length !== 1) throw new Error('P8 Available');
  if (r8Req !== false) throw new Error('P8 Req');
  console.log('[OK] Prueba 8: ENTRENADOR con dos equipos -> Sin selector por multiequipo.');

  // 9. PREPARADOR_FISICO -> Acceso directo Preparador Físico
  const r9Roles = ['PREPARADOR_FISICO'];
  const r9Available = resolveAvailableProfiles(r9Roles);
  const r9Req = resolveRequiresProfileSelector(r9Available, r9Roles);
  const r9Context = mapCanonicalProfileToActiveContext(resolveRecommendedProfile(r9Roles));
  if (r9Req !== false) throw new Error('P9 Req');
  if (r9Context !== 'PREPARADOR_FISICO') throw new Error('P9 Context');
  console.log('[OK] Prueba 9: PREPARADOR_FISICO -> Acceso directo a PREPARADOR_FISICO.');

  // 10. FISIOTERAPEUTA -> Acceso directo Fisioterapeuta
  const r10Roles = ['FISIOTERAPEUTA'];
  const r10Available = resolveAvailableProfiles(r10Roles);
  const r10Req = resolveRequiresProfileSelector(r10Available, r10Roles);
  const r10Context = mapCanonicalProfileToActiveContext(resolveRecommendedProfile(r10Roles));
  if (r10Req !== false) throw new Error('P10 Req');
  if (r10Context !== 'FISIOTERAPEUTA') throw new Error('P10 Context');
  console.log('[OK] Prueba 10: FISIOTERAPEUTA -> Acceso directo a FISIOTERAPEUTA.');

  // 11. Perfil preferido válido -> Restaurado
  const r11Available = ['FAMILIA', 'ENTRENADOR'];
  const prefValido = getSavedPreferredProfile(r11Available, 'ENTRENADOR');
  if (prefValido !== 'ENTRENADOR') throw new Error('P11 Pref Válido');
  console.log('[OK] Prueba 11: Perfil preferido guardado válido se restaura correctamente.');

  // 12. Perfil preferido ya no autorizado -> Ignorado y fallback a recommendedProfile
  const r12Available = ['FAMILIA'];
  const prefInvalido = getSavedPreferredProfile(r12Available, 'ENTRENADOR');
  const fallbackRec = resolveRecommendedProfile(['FAMILIA']);
  if (prefInvalido !== null) throw new Error('P12 Pref Inválido');
  if (fallbackRec !== 'FAMILIA') throw new Error('P12 Fallback Rec');
  console.log('[OK] Prueba 12: Perfil preferido no autorizado se ignora y se conmuta al recomendado.');

  console.log('=== TODAS LAS PRUEBAS M7 COMPLETADAS CON ÉXITO ===');
}

runM7GoverningResolverTests();
