// Script de pruebas M6: Integración Progresiva del Resolver Canónico en Modo Sombra

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

function compareLegacyVsCanonical(legacyData, canonicalIdentity) {
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

  const details = [];

  const legacyRolesSorted = [...(legacyData.roles || [])].sort();
  const canonicalRolesSorted = [...(canonicalIdentity.roles || [])].sort();
  const rolesMatch = JSON.stringify(legacyRolesSorted) === JSON.stringify(canonicalRolesSorted);

  if (!rolesMatch) {
    details.push(`Diferencia de roles: Legacy=${JSON.stringify(legacyRolesSorted)}, Canónico=${JSON.stringify(canonicalRolesSorted)}`);
  }

  const recommendedProfileMatch = legacyData.activeContext 
    ? legacyData.activeContext === canonicalIdentity.recommendedProfile 
    : true;

  if (!recommendedProfileMatch) {
    details.push(`Diferencia de perfil recomendado: Legacy Context=${legacyData.activeContext}, Canónico Recommended=${canonicalIdentity.recommendedProfile}`);
  }

  const legacyTeamIds = (legacyData.assignedTeams || []).map(t => t.id || t).sort();
  const canonicalTeamIds = (canonicalIdentity.teams || []).map(t => t.id).sort();
  const teamsMatch = JSON.stringify(legacyTeamIds) === JSON.stringify(canonicalTeamIds);

  if (!teamsMatch) {
    details.push(`Diferencia de equipos: Legacy=${JSON.stringify(legacyTeamIds)}, Canónico=${JSON.stringify(canonicalTeamIds)}`);
  }

  const legacyPlayerIds = (legacyData.linkedPlayers || []).map(p => p.id || p).sort();
  const canonicalPlayerIds = (canonicalIdentity.linkedPlayers || []).map(p => p.id).sort();
  const linkedPlayersMatch = JSON.stringify(legacyPlayerIds) === JSON.stringify(canonicalPlayerIds);

  if (!linkedPlayersMatch) {
    details.push(`Diferencia de deportistas vinculados: Legacy=${JSON.stringify(legacyPlayerIds)}, Canónico=${JSON.stringify(canonicalPlayerIds)}`);
  }

  const allMatched = rolesMatch && recommendedProfileMatch && teamsMatch && linkedPlayersMatch;
  const matchStatus = allMatched ? 'MATCH' : 'DIFFERENCE';

  return {
    matchStatus,
    rolesMatch,
    recommendedProfileMatch,
    teamsMatch,
    linkedPlayersMatch,
    details
  };
}

function runM6ShadowModeTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M6 MODO SOMBRA ===');

  // 1. Usuario únicamente FAMILIA
  const u1Roles = ['FAMILIA'];
  const u1Available = resolveAvailableProfiles(u1Roles);
  const u1ReqSel = resolveRequiresProfileSelector(u1Available, u1Roles);
  const u1Rec = resolveRecommendedProfile(u1Roles);
  if (JSON.stringify(u1Available) !== JSON.stringify(['FAMILIA'])) throw new Error('P1 Available');
  if (u1ReqSel !== false) throw new Error('P1 Selector');
  if (u1Rec !== 'FAMILIA') throw new Error('P1 Recommended');
  console.log('[OK] Prueba 1: Usuario únicamente FAMILIA -> Perfil FAMILIA sin selector.');

  // 2. Usuario únicamente ENTRENADOR
  const u2Roles = ['ENTRENADOR'];
  const u2Available = resolveAvailableProfiles(u2Roles);
  const u2ReqSel = resolveRequiresProfileSelector(u2Available, u2Roles);
  const u2Rec = resolveRecommendedProfile(u2Roles);
  if (JSON.stringify(u2Available) !== JSON.stringify(['ENTRENADOR'])) throw new Error('P2 Available');
  if (u2ReqSel !== false) throw new Error('P2 Selector');
  if (u2Rec !== 'ENTRENADOR') throw new Error('P2 Recommended');
  console.log('[OK] Prueba 2: Usuario únicamente ENTRENADOR -> Perfil ENTRENADOR sin selector.');

  // 3. FAMILIA + ENTRENADOR
  const u3Roles = ['FAMILIA', 'ENTRENADOR'];
  const u3Available = resolveAvailableProfiles(u3Roles);
  const u3ReqSel = resolveRequiresProfileSelector(u3Available, u3Roles);
  if (!u3Available.includes('FAMILIA') || !u3Available.includes('ENTRENADOR')) throw new Error('P3 Available');
  if (u3ReqSel !== true) throw new Error('P3 Selector');
  console.log('[OK] Prueba 3: FAMILIA + ENTRENADOR -> Contiene ambos y SÍ requiere selector visual.');

  // 4. COORDINADOR + ENTRENADOR
  const u4Roles = ['ENTRENADOR', 'COORDINADOR'];
  const u4Available = resolveAvailableProfiles(u4Roles);
  const u4ReqSel = resolveRequiresProfileSelector(u4Available, u4Roles);
  if (!u4Available.includes('COORDINADOR') || !u4Available.includes('ENTRENADOR')) throw new Error('P4 Available');
  if (u4ReqSel !== true) throw new Error('P4 Selector');
  console.log('[OK] Prueba 4: COORDINADOR + ENTRENADOR -> Contiene ambos y SÍ requiere selector visual.');

  // 5. ADMIN_GENERAL
  const u5Roles = ['ADMIN_GENERAL', 'FAMILIA', 'ENTRENADOR'];
  const u5Available = resolveAvailableProfiles(u5Roles);
  const u5ReqSel = resolveRequiresProfileSelector(u5Available, u5Roles);
  const u5Rec = resolveRecommendedProfile(u5Roles);
  if (u5Rec !== 'ADMIN_GENERAL') throw new Error('P5 Recommended');
  if (u5ReqSel !== false) throw new Error('P5 Selector Admin');
  console.log('[OK] Prueba 5: ADMIN_GENERAL -> Administración directa sin selector innecesario.');

  // 6. ENTRENADOR de varios equipos (Mismo perfil funcional ENTRENADOR)
  const u6Roles = ['ENTRENADOR'];
  const u6Available = resolveAvailableProfiles(u6Roles);
  const u6ReqSel = resolveRequiresProfileSelector(u6Available, u6Roles);
  if (JSON.stringify(u6Available) !== JSON.stringify(['ENTRENADOR'])) throw new Error('P6 Available');
  if (u6ReqSel !== false) throw new Error('P6 Selector Multiequipo');
  console.log('[OK] Prueba 6: ENTRENADOR en 2 equipos -> Único perfil funcional ENTRENADOR, sin selector por multiequipo.');

  // 7. PREPARADOR_FISICO
  const u7Roles = ['PREPARADOR_FISICO'];
  const u7Available = resolveAvailableProfiles(u7Roles);
  if (!u7Available.includes('PREPARADOR_FISICO')) throw new Error('P7 Available');
  console.log('[OK] Prueba 7: PREPARADOR_FISICO -> Registrado en disponible.');

  // 8. FISIOTERAPEUTA
  const u8Roles = ['FISIOTERAPEUTA'];
  const u8Available = resolveAvailableProfiles(u8Roles);
  if (!u8Available.includes('FISIOTERAPEUTA')) throw new Error('P8 Available');
  console.log('[OK] Prueba 8: FISIOTERAPEUTA -> Registrado en disponible.');

  // 9. SEGUNDO_ENTRENADOR integrado en ENTRENADOR / Cuerpo Técnico
  const u9Roles = ['SEGUNDO_ENTRENADOR'];
  const u9Available = resolveAvailableProfiles(u9Roles);
  if (JSON.stringify(u9Available) !== JSON.stringify(['ENTRENADOR'])) throw new Error('P9 Available');
  console.log('[OK] Prueba 9: SEGUNDO_ENTRENADOR -> Integrado en el perfil funcional ENTRENADOR.');

  // 10. Comparador Legacy vs Canónico: Caso MATCH
  const legacyMatchData = {
    roles: ['ENTRENADOR'],
    activeContext: 'ENTRENADOR',
    assignedTeams: [{ id: 'team-1' }],
    linkedPlayers: []
  };
  const canonicalMatchIdentity = {
    roles: ['ENTRENADOR'],
    recommendedProfile: 'ENTRENADOR',
    teams: [{ id: 'team-1' }],
    linkedPlayers: []
  };
  const compMatch = compareLegacyVsCanonical(legacyMatchData, canonicalMatchIdentity);
  if (compMatch.matchStatus !== 'MATCH') throw new Error('P10 Match');
  console.log('[OK] Prueba 10: Comparador Modo Sombra detecta equivalencia exacta (MATCH).');

  // 11. Comparador Legacy vs Canónico: Caso DIFFERENCE
  const legacyDiffData = {
    roles: ['ENTRENADOR'],
    activeContext: 'ENTRENADOR',
    assignedTeams: [{ id: 'team-1' }],
    linkedPlayers: []
  };
  const canonicalDiffIdentity = {
    roles: ['ENTRENADOR', 'FAMILIA'],
    recommendedProfile: 'ENTRENADOR',
    teams: [{ id: 'team-1' }],
    linkedPlayers: [{ id: 'player-1' }]
  };
  const compDiff = compareLegacyVsCanonical(legacyDiffData, canonicalDiffIdentity);
  if (compDiff.matchStatus !== 'DIFFERENCE') throw new Error('P11 Diff');
  if (compDiff.details.length === 0) throw new Error('P11 Details');
  console.log('[OK] Prueba 11: Comparador Modo Sombra detecta discrepancias estructuradas (DIFFERENCE).');

  console.log('=== TODAS LAS PRUEBAS M6 COMPLETADAS CON ÉXITO ===');
}

runM6ShadowModeTests();
