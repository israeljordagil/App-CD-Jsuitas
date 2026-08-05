import { PitchPlayer } from '../components/delegado/liveMatch/TacticalPitch';

export interface MatchFormatConfig {
  teamName: string;
  category: string;
  formatLabel: 'Fútbol 8' | 'Fútbol 11';
  formatCode: 'F8' | 'F11';
  pitchPlayersCount: number;
  benchPlayersCount: number;
  halfDurationMinutes: number;
  restDurationMinutes: number;
  defaultTactic: string;
  defaultStarters: PitchPlayer[];
}

const STARTERS_F8: PitchPlayer[] = [
  { id: '1', dorsal: '1', name: 'ÁLVARO', role: 'POR', isGoalkeeper: true, xPercent: 50, yPercent: 87 },
  { id: '3', dorsal: '3', name: 'MARTÍN', role: 'DEF', xPercent: 22, yPercent: 70 },
  { id: '4', dorsal: '4', name: 'HUGO', role: 'DEF', xPercent: 50, yPercent: 72 },
  { id: '2', dorsal: '2', name: 'DANI', role: 'DEF', xPercent: 78, yPercent: 70 },
  { id: '11', dorsal: '11', name: 'DAVID', role: 'MED', xPercent: 22, yPercent: 44 },
  { id: '8', dorsal: '8', name: 'PABLO', role: 'MED', isCaptain: true, xPercent: 50, yPercent: 42 },
  { id: '7', dorsal: '7', name: 'IVÁN', role: 'MED', xPercent: 78, yPercent: 44 },
  { id: '9', dorsal: '9', name: 'ALEJANDRO', role: 'DEL', xPercent: 50, yPercent: 20 },
];

const STARTERS_F11: PitchPlayer[] = [
  { id: '1', dorsal: '1', name: 'ÁLVARO', role: 'POR', isGoalkeeper: true, xPercent: 50, yPercent: 87 },
  { id: '3', dorsal: '3', name: 'MARTÍN', role: 'LI', xPercent: 14, yPercent: 70 },
  { id: '4', dorsal: '4', name: 'HUGO', role: 'DFC', xPercent: 38, yPercent: 73 },
  { id: '5', dorsal: '5', name: 'LUCAS', role: 'DFC', xPercent: 62, yPercent: 73 },
  { id: '2', dorsal: '2', name: 'DANI', role: 'LD', xPercent: 86, yPercent: 70 },
  { id: '8', dorsal: '8', name: 'PABLO', role: 'MC', xPercent: 35, yPercent: 52 },
  { id: '6', dorsal: '6', name: 'JAVI', role: 'MC', xPercent: 65, yPercent: 52 },
  { id: '11', dorsal: '11', name: 'DAVID', role: 'EI', xPercent: 18, yPercent: 34 },
  { id: '10', dorsal: '10', name: 'MARCOS', role: 'MP', isCaptain: true, xPercent: 50, yPercent: 33 },
  { id: '7', dorsal: '7', name: 'IVÁN', role: 'ED', xPercent: 82, yPercent: 34 },
  { id: '9', dorsal: '9', name: 'ALEJANDRO', role: 'DC', xPercent: 50, yPercent: 14 },
];

/**
 * Resuelve automáticamente la categoría y parámetros reglamentarios de partido
 * a partir del equipo asignado al Delegado.
 */
export function getMatchConfigForTeam(teamName: string = 'Cadete B'): MatchFormatConfig {
  const normalized = teamName.toLowerCase();

  // 1. PREBENJAMÍN & BENJAMÍN (F8 - 25 min parte, 5 min descanso)
  if (normalized.includes('prebenjamín') || normalized.includes('prebenjamin') || normalized.includes('benjamín') || normalized.includes('benjamin')) {
    const categoryLabel = normalized.includes('prebenjamín') || normalized.includes('prebenjamin') ? 'Prebenjamín' : 'Benjamín';
    return {
      teamName,
      category: categoryLabel,
      formatLabel: 'Fútbol 8',
      formatCode: 'F8',
      pitchPlayersCount: 8,
      benchPlayersCount: 5,
      halfDurationMinutes: 25,
      restDurationMinutes: 5,
      defaultTactic: '1-3-3-1',
      defaultStarters: STARTERS_F8,
    };
  }

  // 2. ALEVÍN (F8 - 30 min parte, 5 min descanso)
  if (normalized.includes('alevín') || normalized.includes('alevin')) {
    return {
      teamName,
      category: 'Alevín',
      formatLabel: 'Fútbol 8',
      formatCode: 'F8',
      pitchPlayersCount: 8,
      benchPlayersCount: 5,
      halfDurationMinutes: 30,
      restDurationMinutes: 5,
      defaultTactic: '1-3-3-1',
      defaultStarters: STARTERS_F8,
    };
  }

  // 3. INFANTIL (F11 - 35 min parte, 10 min descanso)
  if (normalized.includes('infantil')) {
    return {
      teamName,
      category: 'Infantil',
      formatLabel: 'Fútbol 11',
      formatCode: 'F11',
      pitchPlayersCount: 11,
      benchPlayersCount: 6,
      halfDurationMinutes: 35,
      restDurationMinutes: 10,
      defaultTactic: '1-4-3-3',
      defaultStarters: STARTERS_F11,
    };
  }

  // 4. CADETE (F11 - 40 min parte, 10 min descanso)
  if (normalized.includes('cadete')) {
    return {
      teamName,
      category: 'Cadete',
      formatLabel: 'Fútbol 11',
      formatCode: 'F11',
      pitchPlayersCount: 11,
      benchPlayersCount: 6,
      halfDurationMinutes: 40,
      restDurationMinutes: 10,
      defaultTactic: '1-4-2-3-1',
      defaultStarters: STARTERS_F11,
    };
  }

  // 5. JUVENIL, SENIOR, AMATEUR O VALOR POR DEFECTO (F11 - 45 min parte, 15 min descanso)
  return {
    teamName,
    category: normalized.includes('juvenil') ? 'Juvenil' : 'Fútbol Base',
    formatLabel: 'Fútbol 11',
    formatCode: 'F11',
    pitchPlayersCount: 11,
    benchPlayersCount: 6,
    halfDurationMinutes: 45,
    restDurationMinutes: 15,
    defaultTactic: '1-4-3-3',
    defaultStarters: STARTERS_F11,
  };
}
