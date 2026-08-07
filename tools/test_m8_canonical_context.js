// Script de pruebas M8: Contexto Canónico de Equipos y Jugadores

const FEATURE_FLAGS = {
  USE_CANONICAL_PROFILE_ROUTING: process.env.EXPO_PUBLIC_USE_CANONICAL_PROFILE_ROUTING !== 'false',
  USE_CANONICAL_CONTEXT: process.env.EXPO_PUBLIC_USE_CANONICAL_CONTEXT !== 'false',
};

function resolveInitialActiveTeam(teams, savedTeamId) {
  if (!teams || teams.length === 0) return null;
  if (teams.length === 1) return teams[0].id;
  if (savedTeamId) {
    const exists = teams.some(t => t.id === savedTeamId);
    if (exists) return savedTeamId;
  }
  return teams[0].id;
}

function resolveInitialActivePlayer(role, linkedPlayers, savedPlayerId) {
  if (role !== 'FAMILIA') return null;
  if (!linkedPlayers || linkedPlayers.length === 0) return null;
  if (linkedPlayers.length === 1) return linkedPlayers[0].id;
  if (savedPlayerId) {
    const exists = linkedPlayers.some(p => p.id === savedPlayerId);
    if (exists) return savedPlayerId;
  }
  return linkedPlayers[0].id;
}

function runM8CanonicalContextTests() {
  console.log('=== INICIO DE PRUEBAS UNITARIAS M8 CONTEXTO CANÓNICO ===');

  // 1. Feature Flag M8
  if (FEATURE_FLAGS.USE_CANONICAL_CONTEXT !== true) throw new Error('Feature flag USE_CANONICAL_CONTEXT no está activa');
  console.log('[OK] Prueba 1: Feature Flag USE_CANONICAL_CONTEXT está ACTIVA (true).');

  // 2. Familia con un hijo -> Selección automática
  const fam1Players = [{ id: 'child-1', name: 'Hugo García' }];
  const activeChild1 = resolveInitialActivePlayer('FAMILIA', fam1Players, null);
  if (activeChild1 !== 'child-1') throw new Error('P2 Child1');
  console.log('[OK] Prueba 2: Familia con único hijo -> Autoselección de hijo único.');

  // 3. Familia con varios hijos -> Restaurar último o primer válido
  const famMultiPlayers = [{ id: 'child-1', name: 'Hugo' }, { id: 'child-2', name: 'Lucas' }];
  const activeChildMultiSaved = resolveInitialActivePlayer('FAMILIA', famMultiPlayers, 'child-2');
  if (activeChildMultiSaved !== 'child-2') throw new Error('P3 ChildMultiSaved');
  console.log('[OK] Prueba 3: Familia con varios hijos -> Restauración de último hijo guardado.');

  // 4. Entrenador con un equipo -> Selección automática
  const coach1Teams = [{ id: 'team-infantil-a', name: 'Infantil A' }];
  const activeTeam1 = resolveInitialActiveTeam(coach1Teams, null);
  if (activeTeam1 !== 'team-infantil-a') throw new Error('P4 Team1');
  console.log('[OK] Prueba 4: Entrenador con único equipo -> Autoselección de equipo único.');

  // 5. Entrenador con varios equipos -> Restaurar último equipo usado
  const coachMultiTeams = [{ id: 'team-infantil-a' }, { id: 'team-benjamin-a' }];
  const activeTeamSaved = resolveInitialActiveTeam(coachMultiTeams, 'team-benjamin-a');
  if (activeTeamSaved !== 'team-benjamin-a') throw new Error('P5 TeamSaved');
  console.log('[OK] Prueba 5: Entrenador con varios equipos -> Restauración de último equipo usado.');

  // 6. Entrenador -> activePlayerId es null (nunca autoseleccionar un jugador de plantilla)
  const coachPlayers = [{ id: 'player-x', name: 'Deportista Plantilla' }];
  const activeChildCoach = resolveInitialActivePlayer('ENTRENADOR', coachPlayers, 'player-x');
  if (activeChildCoach !== null) throw new Error('P6 CoachChildNull');
  console.log('[OK] Prueba 6: Entrenador -> activePlayerId es NULL (nunca autoselecciona jugador de plantilla).');

  // 7. Equipo desaparecido -> Selecciona automáticamente el primer equipo válido permitido
  const teamDisappeared = resolveInitialActiveTeam(coachMultiTeams, 'team-borrado');
  if (teamDisappeared !== 'team-infantil-a') throw new Error('P7 TeamDisappeared');
  console.log('[OK] Prueba 7: Equipo desaparecido -> Conmuta automáticamente al primer equipo válido.');

  // 8. Hijo desaparecido -> Selecciona automáticamente el primer hijo válido
  const childDisappeared = resolveInitialActivePlayer('FAMILIA', famMultiPlayers, 'child-borrado');
  if (childDisappeared !== 'child-1') throw new Error('P8 ChildDisappeared');
  console.log('[OK] Prueba 8: Hijo desaparecido -> Conmuta automáticamente al primer hijo válido.');

  console.log('=== TODAS LAS PRUEBAS M8 COMPLETADAS CON ÉXITO ===');
}

runM8CanonicalContextTests();
