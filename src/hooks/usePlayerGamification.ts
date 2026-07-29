import { useState, useEffect, useCallback } from 'react';
import { PlayerGamificationViewModel } from '../types/gamification';
import { getPlayerGamificationViewModel } from '../services/gamificationService';

export function usePlayerGamification(selectedPlayerId: string | null) {
  const [gamification, setGamification] = useState<PlayerGamificationViewModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGamification = useCallback(async (playerId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlayerGamificationViewModel(playerId);
      setGamification(data);
    } catch (err: any) {
      console.error('[usePlayerGamification] Error al cargar gamificación:', err);
      setError(err?.message || 'Error al obtener datos de gamificación');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Limpiar inmediatamente el estado previo al cambiar de deportista para evitar destellos
    setGamification(null);

    if (!selectedPlayerId) {
      setLoading(false);
      return;
    }

    fetchGamification(selectedPlayerId);
  }, [selectedPlayerId, fetchGamification]);

  return {
    gamification,
    loading,
    error,
    refresh: () => (selectedPlayerId ? fetchGamification(selectedPlayerId) : Promise.resolve()),
  };
}
