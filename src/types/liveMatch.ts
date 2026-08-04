/**
 * Tipos y modelos de datos para la arquitectura del estado del jugador durante el Partido en Vivo.
 * Fase 2 - Bloque 1
 */

export type TacticalLine = 'PORTERO' | 'DEFENSA' | 'CENTROCAMPISTA' | 'DELANTERO';

// Estado de ubicación principal en el partido: Campo, Banquillo o Expulsado.
// La lesión (isInjured) es un estado persistente independiente del jugador.
export type PlayerFieldStatus = 'FIELD' | 'BENCH' | 'EXPELLED';

export interface PlayerStint {
  enteredAtSecond: number;
  exitedAtSecond: number | null;
}

export interface PlayerGoal {
  id: string;
  minute: number;
  second: number;
  assistedByPlayerId?: string;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
}

export interface PlayerCard {
  id: string;
  type: 'YELLOW' | 'RED';
  minute: number;
  second: number;
  reason?: string;
}

export interface PlayerInjury {
  id: string;
  minute: number;
  second: number;
  isOutForMatch: boolean;
  notes?: string;
}

export interface PlayerMatchState {
  playerId: string;
  dorsal: string;
  name: string;
  isGoalkeeper: boolean;

  // Estado de ubicación principal y rol táctico
  status: PlayerFieldStatus;
  tacticalLine: TacticalLine;
  tacticalRole?: string;
  coordinates?: {
    xPercent: number;
    yPercent: number;
  };

  // Cronómetro individual determinista y acumulativo
  playedSeconds: number;
  currentStintStartSecond: number | null;
  stints: PlayerStint[];

  // Sanciones y lesiones (pertenecen al jugador y persisten independientemente de su posición)
  yellowCards: number;
  isRedCarded: boolean;
  redCardDetails?: PlayerCard;
  isInjured: boolean;
  injuryDetails?: PlayerInjury;

  // Estadísticas del partido
  goals: PlayerGoal[];
  assistsCount: number;
}
