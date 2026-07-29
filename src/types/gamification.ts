export interface PlayerGamification {
  id: string;
  jugador_id: string;
  xp_total: number;
  nivel: number;
  racha_actual: number;
  mejor_racha: number;
  ultima_actividad_fecha?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PlayerBadgeProgress {
  id: string;
  jugador_id: string;
  insignia_slug: string;
  conseguida: boolean;
  conseguida_at?: string | null;
  progreso_actual?: number | null;
  progreso_objetivo?: number | null;
}

export interface PlayerChallengeProgress {
  id: string;
  jugador_id: string;
  reto_slug: string;
  estado: 'disponible' | 'en_progreso' | 'completado' | 'bloqueado' | 'no_disponible';
  progreso_actual: number;
  progreso_objetivo?: number | null;
  iniciado_at?: string | null;
  completado_at?: string | null;
}

export interface PlayerGamificationViewModel {
  jugadorId: string;
  xpTotal: number;
  level: number;
  levelBaseXp: number;
  nextLevelXp: number;
  xpProgressPct: number;
  rachaActual: number;
  mejorRacha: number;
  insigniasConseguidasCount: number;
  retosCompletadosCount: number;
  badgesMap: Record<string, PlayerBadgeProgress>;
  challengesMap: Record<string, PlayerChallengeProgress>;
}
