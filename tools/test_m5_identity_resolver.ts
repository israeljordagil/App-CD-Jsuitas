import { resolveRecommendedProfile } from '../src/services/identityResolver';
import { AppRole } from '../src/types/roles';

function runM5ResolverTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M5 IDENTITY RESOLVER ===');

  // Caso 1: Un solo rol (FAMILIA)
  const case1Roles: AppRole[] = ['FAMILIA'];
  const rec1 = resolveRecommendedProfile(case1Roles);
  console.assert(rec1 === 'FAMILIA', 'Caso 1 Falló');
  console.log('[OK] Caso 1: Único rol FAMILIA -> Perfil recomendado: FAMILIA');

  // Caso 2: Familia + Entrenador
  const case2Roles: AppRole[] = ['FAMILIA', 'ENTRENADOR'];
  const rec2 = resolveRecommendedProfile(case2Roles);
  console.assert(rec2 === 'ENTRENADOR', 'Caso 2 Falló');
  console.log('[OK] Caso 2: FAMILIA + ENTRENADOR -> Perfil recomendado: ENTRENADOR (Cuerpo técnico prima)');

  // Caso 3: Coordinador + Entrenador
  const case3Roles: AppRole[] = ['ENTRENADOR', 'COORDINADOR'];
  const rec3 = resolveRecommendedProfile(case3Roles);
  console.assert(rec3 === 'COORDINADOR', 'Caso 3 Falló');
  console.log('[OK] Caso 3: COORDINADOR + ENTRENADOR -> Perfil recomendado: COORDINADOR');

  // Caso 4: Administrador + Otros
  const case4Roles: AppRole[] = ['FAMILIA', 'ENTRENADOR', 'ADMIN_GENERAL'];
  const rec4 = resolveRecommendedProfile(case4Roles);
  console.assert(rec4 === 'ADMIN_GENERAL', 'Caso 4 Falló');
  console.log('[OK] Caso 4: ADMIN_GENERAL + OTROS -> Perfil recomendado: ADMIN_GENERAL (Prioridad máxima)');

  // Caso 5: Preparador Físico
  const case5Roles: AppRole[] = ['PREPARADOR_FISICO' as AppRole];
  const rec5 = resolveRecommendedProfile(case5Roles);
  console.assert(rec5 === ('PREPARADOR_FISICO' as AppRole), 'Caso 5 Falló');
  console.log('[OK] Caso 5: PREPARADOR_FISICO -> Perfil recomendado del Cuerpo Técnico');

  // Caso 6: Fisioterapeuta
  const case6Roles: AppRole[] = ['FISIOTERAPEUTA' as AppRole];
  const rec6 = resolveRecommendedProfile(case6Roles);
  console.assert(rec6 === ('FISIOTERAPEUTA' as AppRole), 'Caso 6 Falló');
  console.log('[OK] Caso 6: FISIOTERAPEUTA -> Perfil recomendado del Cuerpo Técnico');

  // Caso 7: Delegado + Familia
  const case7Roles: AppRole[] = ['FAMILIA', 'DELEGADO'];
  const rec7 = resolveRecommendedProfile(case7Roles);
  console.assert(rec7 === 'DELEGADO', 'Caso 7 Falló');
  console.log('[OK] Caso 7: DELEGADO + FAMILIA -> Perfil recomendado: DELEGADO');

  console.log('=== TODAS LAS PRUEBAS M5 COMPLETADAS CON ÉXITO ===');
}

runM5ResolverTests();
