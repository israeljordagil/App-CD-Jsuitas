import {
  PlayerMatchState,
  PlayerFieldStatus,
  TacticalLine,
  PlayerGoal,
  PlayerCard,
  PlayerInjury,
  PlayerStint,
} from '../types/liveMatch';

/**
 * Mapea un rol táctico (ej. 'POR', 'DFC', 'MC', 'DC') a la línea táctica general.
 */
export function mapRoleToTacticalLine(role?: string, isGoalkeeper?: boolean): TacticalLine {
  if (isGoalkeeper || role === 'POR') {
    return 'PORTERO';
  }

  if (!role) return 'CENTROCAMPISTA';

  const normalizedRole = role.toUpperCase().trim();

  switch (normalizedRole) {
    case 'POR':
    case 'GK':
      return 'PORTERO';

    case 'DFC':
    case 'LD':
    case 'LI':
    case 'DEF':
    case 'CB':
    case 'LB':
    case 'RB':
    case 'CAD':
    case 'CAI':
      return 'DEFENSA';

    case 'MC':
    case 'MCD':
    case 'MCO':
    case 'MP':
    case 'MED':
    case 'MI':
    case 'MD':
    case 'CM':
    case 'CDM':
    case 'CAM':
      return 'CENTROCAMPISTA';

    case 'DC':
    case 'EI':
    case 'ED':
    case 'DEL':
    case 'ST':
    case 'CF':
    case 'LW':
    case 'RW':
      return 'DELANTERO';

    default:
      return 'CENTROCAMPISTA';
  }
}

/**
 * Calcula de forma dinámica y determinista los segundos totales jugados por un jugador.
 * Utiliza el reloj central del partido (currentMatchSeconds). No requiere escrituras por segundo en Supabase.
 */
export function calculatePlayerPlayedSeconds(
  player: Pick<PlayerMatchState, 'status' | 'playedSeconds' | 'currentStintStartSecond'>,
  currentMatchSeconds: number
): number {
  if (player.status !== 'FIELD' || player.currentStintStartSecond === null) {
    return player.playedSeconds;
  }

  const activeStintDuration = Math.max(0, currentMatchSeconds - player.currentStintStartSecond);
  return player.playedSeconds + activeStintDuration;
}

/**
 * Crea la estructura inicial de estado de partido para un jugador.
 */
export function createInitialPlayerState(params: {
  playerId: string;
  dorsal: string;
  name: string;
  isGoalkeeper?: boolean;
  role?: string;
  isStarter: boolean;
  xPercent?: number;
  yPercent?: number;
}): PlayerMatchState {
  const isGoalkeeper = Boolean(params.isGoalkeeper || params.role === 'POR');
  const status: PlayerFieldStatus = params.isStarter ? 'FIELD' : 'BENCH';
  const tacticalLine = mapRoleToTacticalLine(params.role, isGoalkeeper);

  return {
    playerId: params.playerId,
    dorsal: params.dorsal,
    name: params.name,
    isGoalkeeper,
    status,
    tacticalLine,
    tacticalRole: params.role,
    coordinates: params.xPercent !== undefined && params.yPercent !== undefined
      ? { xPercent: params.xPercent, yPercent: params.yPercent }
      : undefined,
    playedSeconds: 0,
    currentStintStartSecond: params.isStarter ? 0 : null,
    stints: params.isStarter ? [{ enteredAtSecond: 0, exitedAtSecond: null }] : [],
    yellowCards: 0,
    isRedCarded: false,
    isInjured: false,
    goals: [],
    assistsCount: 0,
  };
}

/**
 * Transiciona a un jugador al campo (Sustitución ENTRADA o alineación).
 * Protecciones:
 * - Si ya está en campo (FIELD -> FIELD): ignora.
 * - Si está expulsado (EXPELLED -> FIELD): ignora.
 * - Si está lesionado (isInjured === true): ignora (debe retirarse la lesión expresamente antes de entrar).
 */
export function transitionPlayerToField(
  player: PlayerMatchState,
  matchSecond: number,
  coordinates?: { xPercent: number; yPercent: number },
  newRole?: string
): PlayerMatchState {
  if (player.status === 'FIELD' || player.status === 'EXPELLED' || player.isInjured) {
    return player;
  }

  // Cerrar cualquier tramo previo si hubiera quedado inconsistente
  const sanitizedStints: PlayerStint[] = player.stints.map((stint) =>
    stint.exitedAtSecond === null ? { ...stint, exitedAtSecond: matchSecond } : stint
  );

  const updatedStints: PlayerStint[] = [
    ...sanitizedStints,
    { enteredAtSecond: matchSecond, exitedAtSecond: null },
  ];

  const role = newRole || player.tacticalRole;
  const line = mapRoleToTacticalLine(role, player.isGoalkeeper);

  return {
    ...player,
    status: 'FIELD',
    tacticalRole: role,
    tacticalLine: line,
    coordinates: coordinates || player.coordinates,
    currentStintStartSecond: matchSecond,
    stints: updatedStints,
  };
}

/**
 * Transiciona a un jugador al banquillo (Sustitución SALIDA).
 * Congela el contador de tiempo acumulado hasta el instante de salida.
 * Protecciones:
 * - Si no está en campo (BENCH -> BENCH o EXPELLED -> BENCH): ignora.
 */
export function transitionPlayerToBench(
  player: PlayerMatchState,
  matchSecond: number
): PlayerMatchState {
  if (player.status !== 'FIELD') {
    return player;
  }

  let additionalSeconds = 0;
  if (player.currentStintStartSecond !== null) {
    additionalSeconds = Math.max(0, matchSecond - player.currentStintStartSecond);
  }

  const updatedStints: PlayerStint[] = player.stints.map((stint) => {
    if (stint.exitedAtSecond === null) {
      return { ...stint, exitedAtSecond: matchSecond };
    }
    return stint;
  });

  return {
    ...player,
    status: 'BENCH',
    playedSeconds: player.playedSeconds + additionalSeconds,
    currentStintStartSecond: null,
    stints: updatedStints,
  };
}

/**
 * Registra un gol para el jugador manteniendo el estado del cronómetro.
 */
export function recordGoal(player: PlayerMatchState, goal: PlayerGoal): PlayerMatchState {
  return {
    ...player,
    goals: [...player.goals, goal],
  };
}

/**
 * Incrementa asistencia para el jugador.
 */
export function recordAssist(player: PlayerMatchState): PlayerMatchState {
  return {
    ...player,
    assistsCount: player.assistsCount + 1,
  };
}

/**
 * Registra una tarjeta amarilla. Las tarjetas pertenecen al jugador y nunca desaparecen al moverlo.
 */
export function recordYellowCard(player: PlayerMatchState, card: PlayerCard): PlayerMatchState {
  const newYellowCards = player.yellowCards + 1;
  const isRedByDoubleYellow = newYellowCards >= 2;

  return {
    ...player,
    yellowCards: newYellowCards,
    isRedCarded: player.isRedCarded || isRedByDoubleYellow,
    redCardDetails: isRedByDoubleYellow && !player.redCardDetails ? card : player.redCardDetails,
  };
}

/**
 * Registra una tarjeta roja directa o por expulsión.
 * Cambia el estado a EXPELLED y cierra el tramo en campo.
 */
export function recordRedCard(
  player: PlayerMatchState,
  card: PlayerCard,
  matchSecond: number
): PlayerMatchState {
  let updatedState = player;
  if (player.status === 'FIELD') {
    updatedState = transitionPlayerToBench(player, matchSecond);
  }

  return {
    ...updatedState,
    status: 'EXPELLED',
    isRedCarded: true,
    redCardDetails: card,
  };
}

/**
 * Registra una lesión para el jugador.
 * Si es sustituido por lesión (isOutForMatch), transiciona a BENCH y fija isInjured: true.
 */
export function recordInjury(
  player: PlayerMatchState,
  injury: PlayerInjury,
  matchSecond?: number
): PlayerMatchState {
  let updatedState = player;

  if (injury.isOutForMatch && player.status === 'FIELD' && matchSecond !== undefined) {
    updatedState = transitionPlayerToBench(player, matchSecond);
  }

  return {
    ...updatedState,
    isInjured: true,
    injuryDetails: injury,
  };
}

/**
 * Formatea los segundos totales a formato MM:SS (ej. "00:00", "12:35", "63:20").
 */
export function formatPlayerTimer(totalSecs: number): string {
  const safeSecs = Math.max(0, Math.floor(totalSecs));
  const mins = Math.floor(safeSecs / 60);
  const secs = safeSecs % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export interface RelocatedPitchPlayer {
  id?: string;
  dorsal: string;
  name: string;
  role?: string;
  isGoalkeeper?: boolean;
  xPercent: number;
  yPercent: number;
  [key: string]: any;
}

/**
 * Recolocación mínima y determinista de la estructura en campo tras la expulsión de un jugador.
 * Cubre la posición del expulsado moviendo a un jugador de una línea adyacente sin introducir suplentes.
 */
export function reorganizePitchAfterExpulsion<T extends RelocatedPitchPlayer>(
  pitchPlayers: T[],
  expelledDorsal: string
): { updatedPitch: T[]; relocatedPlayerDorsal?: string } {
  const expelledPlayer = pitchPlayers.find(p => p.dorsal === expelledDorsal);
  if (!expelledPlayer) {
    return { updatedPitch: pitchPlayers };
  }

  const remainingPitch = pitchPlayers.filter(p => p.dorsal !== expelledDorsal);
  const expelledLine = mapRoleToTacticalLine(expelledPlayer.role, expelledPlayer.isGoalkeeper);

  if (expelledLine === 'PORTERO') {
    return { updatedPitch: remainingPitch };
  }

  let candidateDorsal: string | undefined = undefined;

  if (expelledLine === 'DEFENSA') {
    const midfielders = remainingPitch.filter(
      p => mapRoleToTacticalLine(p.role, p.isGoalkeeper) === 'CENTROCAMPISTA'
    );

    if (midfielders.length > 0) {
      const mcMcd = midfielders.filter(
        m => m.role && (m.role.toUpperCase().includes('MC') || m.role.toUpperCase().includes('MCD'))
      );
      const pool = mcMcd.length > 0 ? mcMcd : midfielders;

      pool.sort((a, b) => {
        const distA = Math.hypot(a.xPercent - expelledPlayer.xPercent, a.yPercent - expelledPlayer.yPercent);
        const distB = Math.hypot(b.xPercent - expelledPlayer.xPercent, b.yPercent - expelledPlayer.yPercent);
        return distA - distB;
      });

      candidateDorsal = pool[0].dorsal;
    }
  } else if (expelledLine === 'CENTROCAMPISTA') {
    const attackers = remainingPitch.filter(
      p => mapRoleToTacticalLine(p.role, p.isGoalkeeper) === 'DELANTERO'
    );

    if (attackers.length > 0) {
      const mp = attackers.filter(a => a.role && a.role.toUpperCase() === 'MP');
      const wingers = attackers.filter(a => a.role && (a.role.toUpperCase() === 'EI' || a.role.toUpperCase() === 'ED'));
      const pool = mp.length > 0 ? mp : wingers.length > 0 ? wingers : attackers;

      pool.sort((a, b) => {
        const distA = Math.hypot(a.xPercent - expelledPlayer.xPercent, a.yPercent - expelledPlayer.yPercent);
        const distB = Math.hypot(b.xPercent - expelledPlayer.xPercent, b.yPercent - expelledPlayer.yPercent);
        return distA - distB;
      });

      candidateDorsal = pool[0].dorsal;
    }
  } else if (expelledLine === 'DELANTERO') {
    const remainingForwards = remainingPitch.filter(
      p => mapRoleToTacticalLine(p.role, p.isGoalkeeper) === 'DELANTERO'
    );

    if (remainingForwards.length === 0) {
      const midfielders = remainingPitch.filter(
        p => mapRoleToTacticalLine(p.role, p.isGoalkeeper) === 'CENTROCAMPISTA'
      );

      if (midfielders.length > 0) {
        midfielders.sort((a, b) => {
          const distA = Math.hypot(a.xPercent - expelledPlayer.xPercent, a.yPercent - expelledPlayer.yPercent);
          const distB = Math.hypot(b.xPercent - expelledPlayer.xPercent, b.yPercent - expelledPlayer.yPercent);
          return distA - distB;
        });
        candidateDorsal = midfielders[0].dorsal;
      }
    }
  }

  if (!candidateDorsal) {
    return { updatedPitch: remainingPitch };
  }

  const updatedPitch = remainingPitch.map(player => {
    if (player.dorsal === candidateDorsal) {
      return {
        ...player,
        xPercent: expelledPlayer.xPercent,
        yPercent: expelledPlayer.yPercent,
        role: expelledPlayer.role,
      };
    }
    return player;
  });

  return { updatedPitch, relocatedPlayerDorsal: candidateDorsal };
}

