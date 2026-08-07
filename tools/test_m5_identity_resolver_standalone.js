// Test standalone M5 Identity Resolver priority and cases
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

function runM5ResolverTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M5 IDENTITY RESOLVER ===');

  // Caso 1: Un solo rol (FAMILIA)
  const case1Roles = ['FAMILIA'];
  const rec1 = resolveRecommendedProfile(case1Roles);
  if (rec1 !== 'FAMILIA') throw new Error('Caso 1 Falló');
  console.log('[OK] Caso 1: Único rol FAMILIA -> Perfil recomendado: FAMILIA');

  // Caso 2: Familia + Entrenador
  const case2Roles = ['FAMILIA', 'ENTRENADOR'];
  const rec2 = resolveRecommendedProfile(case2Roles);
  if (rec2 !== 'ENTRENADOR') throw new Error('Caso 2 Falló');
  console.log('[OK] Caso 2: FAMILIA + ENTRENADOR -> Perfil recomendado: ENTRENADOR (Cuerpo técnico prima)');

  // Caso 3: Coordinador + Entrenador
  const case3Roles = ['ENTRENADOR', 'COORDINADOR'];
  const rec3 = resolveRecommendedProfile(case3Roles);
  if (rec3 !== 'COORDINADOR') throw new Error('Caso 3 Falló');
  console.log('[OK] Caso 3: COORDINADOR + ENTRENADOR -> Perfil recomendado: COORDINADOR');

  // Caso 4: Administrador + Otros
  const case4Roles = ['FAMILIA', 'ENTRENADOR', 'ADMIN_GENERAL'];
  const rec4 = resolveRecommendedProfile(case4Roles);
  if (rec4 !== 'ADMIN_GENERAL') throw new Error('Caso 4 Falló');
  console.log('[OK] Caso 4: ADMIN_GENERAL + OTROS -> Perfil recomendado: ADMIN_GENERAL (Prioridad máxima)');

  // Caso 5: Preparador Físico
  const case5Roles = ['PREPARADOR_FISICO'];
  const rec5 = resolveRecommendedProfile(case5Roles);
  if (rec5 !== 'PREPARADOR_FISICO') throw new Error('Caso 5 Falló');
  console.log('[OK] Caso 5: PREPARADOR_FISICO -> Perfil recomendado del Cuerpo Técnico');

  // Caso 6: Fisioterapeuta
  const case6Roles = ['FISIOTERAPEUTA'];
  const rec6 = resolveRecommendedProfile(case6Roles);
  if (rec6 !== 'FISIOTERAPEUTA') throw new Error('Caso 6 Falló');
  console.log('[OK] Caso 6: FISIOTERAPEUTA -> Perfil recomendado del Cuerpo Técnico');

  // Caso 7: Delegado + Familia
  const case7Roles = ['FAMILIA', 'DELEGADO'];
  const rec7 = resolveRecommendedProfile(case7Roles);
  if (rec7 !== 'DELEGADO') throw new Error('Caso 7 Falló');
  console.log('[OK] Caso 7: DELEGADO + FAMILIA -> Perfil recomendado: DELEGADO');

  console.log('=== TODAS LAS PRUEBAS M5 COMPLETADAS CON ÉXITO ===');
}

runM5ResolverTests();
