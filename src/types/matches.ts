export type MatchType = 
  | 'LEAGUE' 
  | 'FRIENDLY' 
  | 'CUP' 
  | 'TOURNAMENT' 
  | 'OTHER';

export type MatchStatus = 
  | 'SCHEDULED' 
  | 'LIVE' 
  | 'FINISHED' 
  | 'POSTPONED' 
  | 'SUSPENDED' 
  | 'CANCELLED';

export type MatchScheduleStatus = 
  | 'PROVISIONAL' 
  | 'CONFIRMED' 
  | 'POSTPONED' 
  | 'SUSPENDED' 
  | 'CANCELLED';

export type MatchSource = 
  | 'FFCV_HTML' 
  | 'FFCV_SYNC' 
  | 'MANUAL' 
  | 'IMPORT';

export type MatchSyncStatus = 
  | 'PENDING' 
  | 'SYNCED' 
  | 'CHANGED' 
  | 'ERROR' 
  | 'MANUAL_OVERRIDE';

export type DatePrecision = 
  | 'WEEKEND_RANGE' 
  | 'EXACT_DATE';

/**
 * Función pura para la normalización determinista del slug del rival
 */
export function normalizeOpponentSlug(opponentName: string): string {
  return opponentName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quitar diacríticos
    .replace(/[^a-z0-9]+/g, '-')     // Reemplazar no alfanuméricos por guion
    .replace(/^-+|-+$/g, '');        // Recortar guiones iniciales/finales
}

export interface CanonicalMatch {
  id: string;
  teamId: string;
  season: string;
  competitionId?: string | null;
  federationMatchId?: string | null;
  sourceEventKey?: string | null; // Identidad estable pura de importación
  source: MatchSource;
  sourceReference?: string | null;

  // Jornada y competición
  matchday?: number | null;
  roundName?: string | null;
  competitionName?: string | null;
  matchType: MatchType;

  // Equipos y rival
  opponentClubId?: string | null;
  opponentName: string;
  opponentSlug: string;
  opponentFederationId?: string | null;
  isHome?: boolean | null; // NULL = PENDIENTE DE CONFIRMACIÓN
  homeTeamName?: string | null; // NULL si la localía no está confirmada
  awayTeamName?: string | null; // NULL si la localía no está confirmada

  // Fecha, intervalo de fin de semana y programación
  scheduledDate: string; // Formato DATE 'YYYY-MM-DD' (Fecha inicio del fin de semana usada como referencia técnica de ordenación)
  scheduledTime?: string | null; // NULL para partidos provisionales
  timezone: 'Europe/Madrid' | string;
  scheduledAt?: string | null; // NULL mientras no haya hora confirmada
  scheduleStatus: MatchScheduleStatus; // PROVISIONAL
  datePrecision?: DatePrecision; // WEEKEND_RANGE
  weekendStartDate?: string | null; // Fecha inicio fin de semana ('YYYY-MM-DD')
  weekendEndDate?: string | null;   // Fecha fin fin de semana ('YYYY-MM-DD')

  // Instalación y arbitraje
  venueId?: string | null;
  venueName?: string | null;
  pitchId?: string | null;
  pitchName?: string | null;
  refereeId?: string | null;
  refereeName?: string | null;

  // Estado deportivo y marcador
  matchStatus: MatchStatus; // SCHEDULED
  homeScore?: number | null;
  awayScore?: number | null;
  resultConfirmed: boolean; // FALSE

  // Sincronización federativa FFCV
  lastFederationSyncAt?: string | null;
  federationPayloadHash?: string | null;
  federationVersion?: string | null;
  syncStatus?: MatchSyncStatus | null; // PENDING
  syncError?: string | null;

  // Auditoría
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}
