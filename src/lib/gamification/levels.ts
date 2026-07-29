/**
 * MÓDULO PURO DE CÁLCULO DE NIVELES Y PROGRESIÓN XP DE CD JESUITAS
 * Fuente de verdad única para la progresión de los jugadores.
 */

// XP requerida para alcanzar cada nivel (curva progresiva equilibrada)
const LEVEL_THRESHOLDS = [
  0,     // Nivel 1
  150,   // Nivel 2
  350,   // Nivel 3
  650,   // Nivel 4
  1050,  // Nivel 5
  1550,  // Nivel 6
  2150,  // Nivel 7
  2850,  // Nivel 8
  3650,  // Nivel 9
  4550,  // Nivel 10
  5550,  // Nivel 11
  6650,  // Nivel 12
  7850,  // Nivel 13
  9150,  // Nivel 14
  10550, // Nivel 15
];

export function calculateXpForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level <= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[level - 1];
  }
  // Para niveles superiores a 15, incremento de 1500 XP por nivel
  const lastKnown = LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return lastKnown + (level - LEVEL_THRESHOLDS.length) * 1500;
}

export function calculateLevelFromXp(xp: number): number {
  const safeXp = Math.max(0, xp);
  let lvl = 1;
  while (calculateXpForLevel(lvl + 1) <= safeXp) {
    lvl++;
  }
  return lvl;
}

export function calculateProgressToNextLevel(xp: number): {
  level: number;
  levelBaseXp: number;
  nextLevelXp: number;
  currentXpInLevel: number;
  xpNeededForNext: number;
  progressPct: number;
} {
  const safeXp = Math.max(0, xp);
  const level = calculateLevelFromXp(safeXp);
  const levelBaseXp = calculateXpForLevel(level);
  const nextLevelXp = calculateXpForLevel(level + 1);

  const range = nextLevelXp - levelBaseXp;
  const currentXpInLevel = safeXp - levelBaseXp;
  const xpNeededForNext = nextLevelXp - safeXp;
  const progressPct = range > 0 ? Math.min(100, Math.max(0, Math.round((currentXpInLevel / range) * 100))) : 100;

  return {
    level,
    levelBaseXp,
    nextLevelXp,
    currentXpInLevel,
    xpNeededForNext,
    progressPct,
  };
}
