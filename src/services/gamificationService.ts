import { supabase } from '../lib/supabase';
import { 
  PlayerGamification, 
  PlayerBadgeProgress, 
  PlayerChallengeProgress, 
  PlayerGamificationViewModel 
} from '../types/gamification';
import { calculateProgressToNextLevel } from '../lib/gamification/levels';

// Datos de desarrollo con diferentes progresos para pruebas entre hermanos
const DEV_SEED_GAMIFICATION: Record<string, Partial<PlayerGamification>> = {
  // Pablo Martínez (Cadete B)
  'a1000001-0000-4000-8000-000000000046': {
    xp_total: 1250,
    nivel: 6,
    racha_actual: 4,
    mejor_racha: 6,
  },
  // Hugo Martínez (Infantil A)
  'a1000001-0000-4000-8000-000000000047': {
    xp_total: 450,
    nivel: 3,
    racha_actual: 2,
    mejor_racha: 3,
  },
};

/**
 * Consulta o inicializa de forma idempotente la tabla jugador_gamificacion
 */
export async function getOrInitPlayerGamification(jugadorId: string): Promise<PlayerGamification> {
  if (!jugadorId) {
    throw new Error('jugadorId es requerido');
  }

  // 1. Intentar consultar en Supabase
  const { data, error } = await supabase
    .from('jugador_gamificacion')
    .select('*')
    .eq('jugador_id', jugadorId)
    .maybeSingle();

  if (!error && data) {
    return data as PlayerGamification;
  }

  // 2. Si no existe registro en Supabase, inicializar idempotentemente
  const devSeed = DEV_SEED_GAMIFICATION[jugadorId];
  const initialPayload: Partial<PlayerGamification> = {
    jugador_id: jugadorId,
    xp_total: devSeed?.xp_total ?? 0,
    nivel: devSeed?.nivel ?? 1,
    racha_actual: devSeed?.racha_actual ?? 0,
    mejor_racha: devSeed?.mejor_racha ?? 0,
  };

  const { data: inserted, error: insertError } = await supabase
    .from('jugador_gamificacion')
    .insert(initialPayload)
    .select()
    .single();

  if (!insertError && inserted) {
    return inserted as PlayerGamification;
  }

  // 3. Fallback de desarrollo seguro si Supabase está sin migración aplicada
  return {
    id: `temp-${jugadorId}`,
    jugador_id: jugadorId,
    xp_total: initialPayload.xp_total || 0,
    nivel: initialPayload.nivel || 1,
    racha_actual: initialPayload.racha_actual || 0,
    mejor_racha: initialPayload.mejor_racha || 0,
  };
}

/**
 * Consulta el progreso de insignias registradas del jugador
 */
export async function getPlayerBadges(jugadorId: string): Promise<Record<string, PlayerBadgeProgress>> {
  const map: Record<string, PlayerBadgeProgress> = {};
  if (!jugadorId) return map;

  const { data, error } = await supabase
    .from('jugador_insignias')
    .select('*')
    .eq('jugador_id', jugadorId);

  if (!error && data) {
    data.forEach((row: any) => {
      map[row.insignia_slug] = row as PlayerBadgeProgress;
    });
  }

  return map;
}

/**
 * Consulta el progreso de retos registrados del jugador
 */
export async function getPlayerChallenges(jugadorId: string): Promise<Record<string, PlayerChallengeProgress>> {
  const map: Record<string, PlayerChallengeProgress> = {};
  if (!jugadorId) return map;

  const { data, error } = await supabase
    .from('jugador_retos')
    .select('*')
    .eq('jugador_id', jugadorId);

  if (!error && data) {
    data.forEach((row: any) => {
      map[row.reto_slug] = row as PlayerChallengeProgress;
    });
  }

  return map;
}

/**
 * Función principal del servicio que construye el ViewModel completo de la gamificación
 */
export async function getPlayerGamificationViewModel(jugadorId: string): Promise<PlayerGamificationViewModel> {
  const gamificationRecord = await getOrInitPlayerGamification(jugadorId);
  const badgesMap = await getPlayerBadges(jugadorId);
  const challengesMap = await getPlayerChallenges(jugadorId);

  const levelInfo = calculateProgressToNextLevel(gamificationRecord.xp_total);

  const insigniasConseguidasCount = Object.values(badgesMap).filter(b => b.conseguida).length;
  const retosCompletadosCount = Object.values(challengesMap).filter(c => c.estado === 'completado').length;

  return {
    jugadorId,
    xpTotal: gamificationRecord.xp_total,
    level: levelInfo.level,
    levelBaseXp: levelInfo.levelBaseXp,
    nextLevelXp: levelInfo.nextLevelXp,
    xpProgressPct: levelInfo.progressPct,
    rachaActual: gamificationRecord.racha_actual,
    mejorRacha: gamificationRecord.mejor_racha,
    insigniasConseguidasCount,
    retosCompletadosCount,
    badgesMap,
    challengesMap,
  };
}
