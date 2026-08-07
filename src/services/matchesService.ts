import { CanonicalMatch, normalizeOpponentSlug } from '../types/matches';

/**
 * Servicio en memoria de demostración y capa de datos abstraída para partidos canónicos.
 * Preparado para conectar con Supabase (public.partidos) en fases posteriores.
 */
class MatchesService {
  private localMatches: Map<string, CanonicalMatch> = new Map();

  /**
   * Listar partidos por teamId y temporada
   */
  async listByTeamId(teamId: string, season: string = '2026/2027'): Promise<CanonicalMatch[]> {
    return Array.from(this.localMatches.values()).filter(
      m => m.teamId === teamId && m.season === season
    );
  }

  /**
   * Listar partidos por temporada
   */
  async listBySeason(season: string = '2026/2027'): Promise<CanonicalMatch[]> {
    return Array.from(this.localMatches.values()).filter(m => m.season === season);
  }

  /**
   * Listar partidos por rango de fechas y opcionalmente filtrado por lista de teamIds
   */
  async listByDateRange(startDate: string, endDate: string, teamIds?: string[]): Promise<CanonicalMatch[]> {
    return Array.from(this.localMatches.values()).filter(m => {
      const dateOk = m.scheduledDate >= startDate && m.scheduledDate <= endDate;
      const teamOk = !teamIds || teamIds.length === 0 || teamIds.includes(m.teamId);
      return dateOk && teamOk;
    });
  }

  /**
   * Obtener partido por ID primario
   */
  async getById(id: string): Promise<CanonicalMatch | null> {
    return this.localMatches.get(id) || null;
  }

  /**
   * Obtener partido por ID federativo
   */
  async getByFederationMatchId(federationMatchId: string, source: string = 'FFCV_HTML'): Promise<CanonicalMatch | null> {
    for (const match of this.localMatches.values()) {
      if (match.federationMatchId === federationMatchId && match.source === source) {
        return match;
      }
    }
    return null;
  }

  /**
   * Obtener partido por clave técnica de evento fuente (sourceEventKey)
   */
  async getBySourceEventKey(sourceEventKey: string): Promise<CanonicalMatch | null> {
    for (const match of this.localMatches.values()) {
      if (match.sourceEventKey === sourceEventKey) {
        return match;
      }
    }
    return null;
  }

  /**
   * Upsert determinista por ID federativo
   */
  async upsertFederationMatch(matchData: Omit<CanonicalMatch, 'id' | 'opponentSlug' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<CanonicalMatch> {
    const slug = normalizeOpponentSlug(matchData.opponentName);
    const existing = matchData.federationMatchId 
      ? await this.getByFederationMatchId(matchData.federationMatchId, matchData.source)
      : null;

    const now = new Date().toISOString();
    const id = existing ? existing.id : (matchData.id || `match-fed-${matchData.source.toLowerCase()}-${matchData.federationMatchId}`);

    const match: CanonicalMatch = {
      ...matchData,
      id,
      opponentSlug: slug,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    };

    this.localMatches.set(id, match);
    return match;
  }

  /**
   * Upsert determinista por clave técnica de evento fuente (sourceEventKey)
   */
  async upsertProvisionalMatch(matchData: Omit<CanonicalMatch, 'id' | 'opponentSlug' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<CanonicalMatch> {
    const slug = normalizeOpponentSlug(matchData.opponentName);
    
    let existing: CanonicalMatch | null = null;
    if (matchData.sourceEventKey) {
      existing = await this.getBySourceEventKey(matchData.sourceEventKey);
    }

    const now = new Date().toISOString();
    const id = existing ? existing.id : (matchData.id || `match-prov-${matchData.teamId}-${matchData.matchday || 0}`);

    const match: CanonicalMatch = {
      ...matchData,
      id,
      opponentSlug: slug,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now
    };

    this.localMatches.set(id, match);
    return match;
  }

  /**
   * Limpiar almacén en memoria (utilizado para aislar tests unitarios)
   */
  clearMemory(): void {
    this.localMatches.clear();
  }
}

export const matchesService = new MatchesService();
