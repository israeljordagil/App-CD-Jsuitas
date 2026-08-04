import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, AppState, AppStateStatus, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// IMPORTS DE COMPONENTES INTERNOS Y UTILIDADES
import { TacticalPitch, PitchPlayer } from './liveMatch/TacticalPitch';
import { TacticalJersey } from './liveMatch/TacticalJersey';
import { PlayerMatchState, PlayerCard, PlayerInjury } from '../../types/liveMatch';
import {
  createInitialPlayerState,
  calculatePlayerPlayedSeconds,
  formatPlayerTimer,
  transitionPlayerToField,
  transitionPlayerToBench,
  recordGoal,
  recordAssist,
  recordYellowCard,
  recordInjury,
} from '../../utils/liveMatchState';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  skyGlow: '#7DD3FC',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  yellowCard: '#F59E0B',
  redCard: '#EF4444',
  accentBlue: '#2563EB',
};

const INITIAL_STARTERS_14231: PitchPlayer[] = [
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

const INITIAL_BENCH: PitchPlayer[] = [
  { id: '13', dorsal: '13', name: 'ÁLVARO G.', isGoalkeeper: true, role: 'POR', xPercent: 0, yPercent: 0 },
  { id: '12', dorsal: '12', name: 'DIEGO', role: 'DFC', xPercent: 0, yPercent: 0 },
  { id: '14', dorsal: '14', name: 'SERGIO', role: 'MC', xPercent: 0, yPercent: 0 },
  { id: '15', dorsal: '15', name: 'ADRIÁN', role: 'MC', xPercent: 0, yPercent: 0 },
  { id: '16', dorsal: '16', name: 'IAN', role: 'EI', xPercent: 0, yPercent: 0 },
  { id: '17', dorsal: '17', name: 'ÁLEX', role: 'MC', xPercent: 0, yPercent: 0 },
];

const buildInitialPlayerStates = (): Record<string, PlayerMatchState> => {
  const map: Record<string, PlayerMatchState> = {};
  INITIAL_STARTERS_14231.forEach((p) => {
    const id = p.id || p.dorsal;
    map[id] = createInitialPlayerState({
      playerId: id,
      dorsal: p.dorsal,
      name: p.name,
      isGoalkeeper: p.isGoalkeeper,
      role: p.role,
      isStarter: true,
      xPercent: p.xPercent,
      yPercent: p.yPercent,
    });
  });
  INITIAL_BENCH.forEach((b) => {
    const id = b.id || b.dorsal;
    map[id] = createInitialPlayerState({
      playerId: id,
      dorsal: b.dorsal,
      name: b.name,
      isGoalkeeper: b.isGoalkeeper,
      role: b.role,
      isStarter: false,
    });
  });
  return map;
};

export interface PlayerStats {
  yellowCards: number;
  isRedCarded: boolean;
  isInjured: boolean;
  goals: number;
  assists: number;
}

// =============================================================================
// MÁQUINA DE ESTADOS Y CONFIGURACIÓN DE FASES DEL PARTIDO
// =============================================================================

export type MatchPhase = 
  | 'BEFORE_START'
  | 'FIRST_HALF'
  | 'FIRST_HALF_ADDED'
  | 'HALF_TIME'
  | 'SECOND_HALF'
  | 'SECOND_HALF_ADDED'
  | 'FINISHED'
  | 'PAUSED';

export interface CategoryTimeConfig {
  halves: number;
  halfDurationMinutes: number;
  restDurationMinutes: number;
}

// TABLA DE CONFIGURACIÓN OFICIAL DE TIEMPOS POR CATEGORÍA
export const CATEGORY_TIME_CONFIGS: Record<string, CategoryTimeConfig> = {
  'Querubín': { halves: 3, halfDurationMinutes: 12, restDurationMinutes: 1 },
  'Prebenjamín': { halves: 2, halfDurationMinutes: 25, restDurationMinutes: 5 },
  'Benjamín': { halves: 2, halfDurationMinutes: 25, restDurationMinutes: 5 },
  'Alevín': { halves: 2, halfDurationMinutes: 30, restDurationMinutes: 5 },
  'Infantil': { halves: 2, halfDurationMinutes: 35, restDurationMinutes: 10 },
  'Cadete': { halves: 2, halfDurationMinutes: 40, restDurationMinutes: 10 },
  'Juvenil': { halves: 2, halfDurationMinutes: 45, restDurationMinutes: 15 },
};

// SNAPSHOT COMPLETO DE PERSISTENCIA LOCAL MULTIPLATAFORMA
interface TimerSnapshot {
  matchId: string;
  category: string;
  matchPhase: MatchPhase;
  currentPeriod: 1 | 2;
  regulationAccumulatedSeconds: number;
  runningSinceTimestamp: number | null;
  isRunning: boolean;
  addedTimeSeconds: number;
  addedTimeRunningSinceTimestamp: number | null;
  halfTimeStartedAtTimestamp: number | null;
  configuredRestSeconds: number;
  savedAt: number;
}

const TIMER_SNAPSHOT_KEY = '@cd_jesuitas_live_match_timer_snapshot';

const saveTimerSnapshot = (snapshot: TimerSnapshot) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(TIMER_SNAPSHOT_KEY, JSON.stringify(snapshot));
    }
  } catch (e) {
    // Silent catch
  }
};

const loadTimerSnapshot = (): TimerSnapshot | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const jsonVal = window.localStorage.getItem(TIMER_SNAPSHOT_KEY);
      if (jsonVal) {
        return JSON.parse(jsonVal) as TimerSnapshot;
      }
    }
  } catch (e) {
    // Silent catch
  }
  return null;
};

// TIPOS DE EVENTOS Y ACCIONES DE JUGADOR
type ActionStep = 'MENU' | 'ASSIST_SELECT' | 'CONFIRM' | 'SUB_SELECT';

interface PlayerActionFlow {
  visible: boolean;
  player: PitchPlayer | null;
  action: 'GOAL' | 'PENALTY_SCORED' | 'PENALTY_MISSED' | 'YELLOW' | 'RED' | 'SUB' | 'INJURY' | null;
  step: ActionStep;
  assister: PitchPlayer | null;
  substitute: PitchPlayer | null;
  isSubmitting: boolean;
}

const initialPlayerActionFlow: PlayerActionFlow = {
  visible: false,
  player: null,
  action: null,
  step: 'MENU',
  assister: null,
  substitute: null,
  isSubmitting: false,
};

export interface DelegadoPartidoEnVivoProps {
  category?: string;
}

export function DelegadoPartidoEnVivo({ category = 'Cadete' }: DelegadoPartidoEnVivoProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // DEDUCCIÓN DINÁMICA DE LA CONFIGURACIÓN DE TIEMPO SEGÚN LA CATEGORÍA DEL ENCUENTRO
  const matchCategory = category && CATEGORY_TIME_CONFIGS[category] ? category : 'Cadete';
  const timeConfig = CATEGORY_TIME_CONFIGS[matchCategory];

  const firstHalfLimitSecs = timeConfig.halfDurationMinutes * 60; // Cadete: 40 min = 2400 s
  const secondHalfLimitSecs = timeConfig.halfDurationMinutes * 2 * 60; // Cadete: 80 min = 4800 s
  const restDurationSecs = timeConfig.restDurationMinutes * 60; // Cadete: 10 min = 600 s

  // =========================================================================
  // 1. MÁQUINA DE ESTADOS Y CRONÓMETRO ABSOLUTO BASADO EN Date.now()
  // =========================================================================
  const [matchPhase, setMatchPhase] = useState<MatchPhase>('BEFORE_START');
  const [currentPeriod, setCurrentPeriod] = useState<1 | 2>(1);
  const [matchSeconds, setMatchSeconds] = useState(0); // Tiempo reglamentario acumulado
  const [addedTimeSeconds, setAddedTimeSeconds] = useState(0); // Tiempo añadido independiente
  const [restSeconds, setRestSeconds] = useState(restDurationSecs); // Cuenta atrás del descanso

  // REFERENCIAS DE TIEMPO ABSOLUTO (FUENTE ÚNICA DE VERDAD MULTIPLATAFORMA)
  const stintStartTimestampRef = useRef<number | null>(null);
  const accumulatedMatchSecondsRef = useRef<number>(0);

  const addedTimeStartTimestampRef = useRef<number | null>(null);
  const accumulatedAddedTimeSecondsRef = useRef<number>(0);

  const halfTimeStartedAtTimestampRef = useRef<number | null>(null);

  // MODALES DE CONFIRMACIÓN Y NAVEGACIÓN
  const [showEarlySecondHalfConfirmModal, setShowEarlySecondHalfConfirmModal] = useState(false);

  // HELPER DETERMINISTA DE CÁLCULO DE TIEMPO REGULATORIO Y AÑADIDO CON Date.now()
  const calculateRegulationSeconds = useCallback(() => {
    let base = accumulatedMatchSecondsRef.current;
    if (stintStartTimestampRef.current !== null) {
      const elapsed = Math.floor((Date.now() - stintStartTimestampRef.current) / 1000);
      base = Math.max(0, base + elapsed);
    }
    const maxLimit = currentPeriod === 1 ? firstHalfLimitSecs : secondHalfLimitSecs;
    return Math.min(base, maxLimit);
  }, [currentPeriod, firstHalfLimitSecs, secondHalfLimitSecs]);

  const calculateAddedSeconds = useCallback(() => {
    let base = accumulatedAddedTimeSecondsRef.current;
    if (addedTimeStartTimestampRef.current !== null) {
      const elapsed = Math.floor((Date.now() - addedTimeStartTimestampRef.current) / 1000);
      base = Math.max(0, base + elapsed);
    }
    return base;
  }, []);

  const calculateRestSeconds = useCallback(() => {
    if (halfTimeStartedAtTimestampRef.current === null) return restDurationSecs;
    const elapsed = Math.floor((Date.now() - halfTimeStartedAtTimestampRef.current) / 1000);
    return Math.max(0, restDurationSecs - elapsed);
  }, [restDurationSecs]);

  // RECUPERACIÓN AUTOMÁTICA DESDE SNAPSHOT AL MONTAR
  useEffect(() => {
    const snapshot = loadTimerSnapshot();
    if (snapshot) {
      setMatchPhase(snapshot.matchPhase);
      setCurrentPeriod(snapshot.currentPeriod);
      accumulatedMatchSecondsRef.current = snapshot.regulationAccumulatedSeconds;
      stintStartTimestampRef.current = snapshot.runningSinceTimestamp;
      accumulatedAddedTimeSecondsRef.current = snapshot.addedTimeSeconds;
      addedTimeStartTimestampRef.current = snapshot.addedTimeRunningSinceTimestamp;
      halfTimeStartedAtTimestampRef.current = snapshot.halfTimeStartedAtTimestamp;

      const now = Date.now();
      const maxLimit = snapshot.currentPeriod === 1 ? firstHalfLimitSecs : secondHalfLimitSecs;

      if (snapshot.matchPhase === 'FIRST_HALF' || snapshot.matchPhase === 'SECOND_HALF') {
        const reg = Math.min(
          snapshot.regulationAccumulatedSeconds + (snapshot.runningSinceTimestamp ? Math.floor((now - snapshot.runningSinceTimestamp) / 1000) : 0),
          maxLimit
        );
        setMatchSeconds(reg);
      } else if (snapshot.matchPhase === 'FIRST_HALF_ADDED' || snapshot.matchPhase === 'SECOND_HALF_ADDED') {
        setMatchSeconds(maxLimit);
        const add = snapshot.addedTimeSeconds + (snapshot.addedTimeRunningSinceTimestamp ? Math.floor((now - snapshot.addedTimeRunningSinceTimestamp) / 1000) : 0);
        setAddedTimeSeconds(add);
      } else if (snapshot.matchPhase === 'HALF_TIME') {
        setMatchSeconds(firstHalfLimitSecs);
        if (snapshot.halfTimeStartedAtTimestamp) {
          const restElapsed = Math.floor((now - snapshot.halfTimeStartedAtTimestamp) / 1000);
          setRestSeconds(Math.max(0, restDurationSecs - restElapsed));
        }
      }
    }
  }, [firstHalfLimitSecs, secondHalfLimitSecs, restDurationSecs]);

  // 2. MARCADOR Y REGLAMENTO
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [systemName, setSystemName] = useState('1-4-2-3-1');
  const [isSuspended, setIsSuspended] = useState(false);

  // 3. JUGADORES Y ESTADÍSTICAS PERSISTENTES DE PARTIDO
  const [pitchPlayers, setPitchPlayers] = useState<PitchPlayer[]>(INITIAL_STARTERS_14231);
  const [benchPlayers, setBenchPlayers] = useState<PitchPlayer[]>(INITIAL_BENCH);
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerStats>>({});
  const [playerMatchStates, setPlayerMatchStates] = useState<Record<string, PlayerMatchState>>(buildInitialPlayerStates);

  // 4. TIMELINE DE EVENTOS CON ID ÚNICO
  const [events, setEvents] = useState<any[]>([]);

  // 5. PANEL DE ACCIONES DE JUGADOR & OVERLAYS
  const [playerAction, setPlayerAction] = useState<PlayerActionFlow>(initialPlayerActionFlow);
  const [showAIReorgModal, setShowAIReorgModal] = useState(false);
  const [showGeneralEventModal, setShowGeneralEventModal] = useState(false);
  const [showIncidenceInput, setShowIncidenceInput] = useState(false);
  const [incidenceText, setIncidenceText] = useState('');

  // =========================================================================
  // REFRESH EN TIEMPO REAL CON RECUPERACIÓN DEFENSIVA ANTE BLOQUEO / PERDIDA DE FOCO
  // =========================================================================
  const updateAllClocks = useCallback(() => {
    if (isSuspended) return;

    const now = Date.now();

    // A. Actualizar Tiempo Reglamentario
    if (matchPhase === 'FIRST_HALF' || matchPhase === 'SECOND_HALF') {
      const regSecs = calculateRegulationSeconds();
      setMatchSeconds(regSecs);

      // Transición automática al tiempo añadido al alcanzar el tiempo reglamentario dinámico de la categoría
      const maxLimit = currentPeriod === 1 ? firstHalfLimitSecs : secondHalfLimitSecs;
      if (regSecs >= maxLimit) {
        accumulatedMatchSecondsRef.current = maxLimit;
        stintStartTimestampRef.current = null;
        addedTimeStartTimestampRef.current = now;
        accumulatedAddedTimeSecondsRef.current = 0;
        setAddedTimeSeconds(0);
        setMatchPhase(currentPeriod === 1 ? 'FIRST_HALF_ADDED' : 'SECOND_HALF_ADDED');
      }
    }

    // B. Actualizar Tiempo Añadido
    if (matchPhase === 'FIRST_HALF_ADDED' || matchPhase === 'SECOND_HALF_ADDED') {
      setAddedTimeSeconds(calculateAddedSeconds());
    }

    // C. Actualizar Cuenta Atrás del Descanso
    if (matchPhase === 'HALF_TIME') {
      setRestSeconds(calculateRestSeconds());
    }
  }, [matchPhase, currentPeriod, isSuspended, calculateRegulationSeconds, calculateAddedSeconds, calculateRestSeconds, firstHalfLimitSecs, secondHalfLimitSecs]);

  useEffect(() => {
    if (matchPhase === 'BEFORE_START' || matchPhase === 'FINISHED' || matchPhase === 'PAUSED' || isSuspended) return;

    // Ticker continuo a 4Hz (250ms) para garantizar fluidez absoluta
    updateAllClocks();
    const intervalId = setInterval(updateAllClocks, 250);

    // PERSISTENCIA EN EVENTOS DE SEGUNDO PLANO Y VISIBILIDAD
    const handleBackgroundSave = () => {
      saveTimerSnapshot({
        matchId: 'cadete-b-live-1',
        category: matchCategory,
        matchPhase,
        currentPeriod,
        regulationAccumulatedSeconds: accumulatedMatchSecondsRef.current,
        runningSinceTimestamp: stintStartTimestampRef.current,
        isRunning: stintStartTimestampRef.current !== null,
        addedTimeSeconds: accumulatedAddedTimeSecondsRef.current,
        addedTimeRunningSinceTimestamp: addedTimeStartTimestampRef.current,
        halfTimeStartedAtTimestamp: halfTimeStartedAtTimestampRef.current,
        configuredRestSeconds: restDurationSecs,
        savedAt: Date.now(),
      });
    };

    // Listeners defensivos para AppState (RN), visibilitychange (Web), window focus y pageshow
    const appStateSub = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        updateAllClocks();
      } else if (nextState === 'background' || nextState === 'inactive') {
        handleBackgroundSave();
      }
    });

    const handleVisibilityChange = () => {
      if (typeof document !== 'undefined') {
        if (document.visibilityState === 'visible') {
          updateAllClocks();
        } else if (document.visibilityState === 'hidden') {
          handleBackgroundSave();
        }
      }
    };

    const handleFocus = () => updateAllClocks();

    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('focus', handleFocus);
      window.addEventListener('pageshow', handleFocus);
    }

    return () => {
      clearInterval(intervalId);
      appStateSub?.remove();
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('pageshow', handleFocus);
      }
    };
  }, [matchPhase, currentPeriod, isSuspended, updateAllClocks, matchCategory, restDurationSecs]);

  // FORMATO DE TIEMPOS
  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMinuteText = () => {
    if (matchPhase === 'FIRST_HALF_ADDED') {
      const addedMins = Math.floor(addedTimeSeconds / 60);
      return `${timeConfig.halfDurationMinutes}' (+${addedMins}' añ.)`;
    }
    if (matchPhase === 'SECOND_HALF_ADDED') {
      const addedMins = Math.floor(addedTimeSeconds / 60);
      return `${timeConfig.halfDurationMinutes * 2}' (+${addedMins}' añ.)`;
    }
    if (matchPhase === 'HALF_TIME') {
      return 'Descanso';
    }
    return `${Math.floor(matchSeconds / 60)}'`;
  };

  const getPStats = (id: string): PlayerStats => {
    const pState = playerMatchStates[id];
    if (pState) {
      return {
        yellowCards: pState.yellowCards,
        isRedCarded: pState.isRedCarded,
        isInjured: pState.isInjured,
        goals: pState.goals.length,
        assists: pState.assistsCount,
      };
    }
    return (playerStats[id] as PlayerStats) || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
  };

  // =========================================================================
  // CONTROL GENERAL DEL PARTIDO (START, DESCANSO, SEGUNDA PARTE, FINISH)
  // =========================================================================
  const handleStartMatch = () => {
    if (matchPhase !== 'BEFORE_START') return;

    accumulatedMatchSecondsRef.current = 0;
    stintStartTimestampRef.current = Date.now();
    setCurrentPeriod(1);
    setMatchSeconds(0);
    setMatchPhase('FIRST_HALF');

    saveTimerSnapshot({
      matchId: 'cadete-b-live-1',
      category: matchCategory,
      matchPhase: 'FIRST_HALF',
      currentPeriod: 1,
      regulationAccumulatedSeconds: 0,
      runningSinceTimestamp: stintStartTimestampRef.current,
      isRunning: true,
      addedTimeSeconds: 0,
      addedTimeRunningSinceTimestamp: null,
      halfTimeStartedAtTimestamp: null,
      configuredRestSeconds: restDurationSecs,
      savedAt: Date.now(),
    });

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: "00'00\"",
        type: 'INICIO',
        title: 'Comienza el partido',
        desc: `1ª Parte en juego · Categoría ${matchCategory} · Cadete B vs Torrent CF`,
        icon: 'play',
        color: colors.emeraldGlow,
      },
      ...prev,
    ]);
  };

  // ACCIÓN DESCANSO (CIERRA 1ª PARTE E INICIA CUENTA ATRÁS DEL DESCANSO)
  const handleGoToHalfTime = () => {
    if (matchPhase !== 'FIRST_HALF' && matchPhase !== 'FIRST_HALF_ADDED') return;

    // Conmutar minutos reglamentarios exactos de 1ª parte de la categoría (Cadete: 40:00 = 2400 s)
    accumulatedMatchSecondsRef.current = firstHalfLimitSecs;
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;

    const now = Date.now();
    halfTimeStartedAtTimestampRef.current = now;
    setRestSeconds(restDurationSecs);
    setMatchPhase('HALF_TIME');

    saveTimerSnapshot({
      matchId: 'cadete-b-live-1',
      category: matchCategory,
      matchPhase: 'HALF_TIME',
      currentPeriod: 1,
      regulationAccumulatedSeconds: firstHalfLimitSecs,
      runningSinceTimestamp: null,
      isRunning: false,
      addedTimeSeconds: accumulatedAddedTimeSecondsRef.current,
      addedTimeRunningSinceTimestamp: null,
      halfTimeStartedAtTimestamp: now,
      configuredRestSeconds: restDurationSecs,
      savedAt: now,
    });

    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'DESCANSO',
        title: 'Final de la 1ª Parte · Descanso',
        desc: `Tiempo de descanso configurado: ${timeConfig.restDurationMinutes} min`,
        icon: 'pause',
        color: colors.yellowCard,
      },
      ...prev,
    ]);
  };

  // INICIO DE LA SEGUNDA PARTE (DESDE EL MINUTO REGLAMENTARIO DE LA CATEGORÍA Y REANUDANDO JUGADORES EN FIELD)
  const executeStartSecondHalf = () => {
    setShowEarlySecondHalfConfirmModal(false);

    const now = Date.now();
    setCurrentPeriod(2);
    accumulatedMatchSecondsRef.current = firstHalfLimitSecs; // Cadete: Empezar en 40:00
    stintStartTimestampRef.current = now;

    accumulatedAddedTimeSecondsRef.current = 0;
    addedTimeStartTimestampRef.current = null;
    halfTimeStartedAtTimestampRef.current = null;

    setMatchSeconds(firstHalfLimitSecs);
    setAddedTimeSeconds(0);
    setMatchPhase('SECOND_HALF');

    // Reanudar stint de todos los jugadores actualmente en el campo (FIELD) con el segundo de inicio reglamentario
    setPlayerMatchStates(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pId => {
        if (updated[pId].status === 'FIELD') {
          updated[pId] = {
            ...updated[pId],
            currentStintStartSecond: firstHalfLimitSecs,
          };
        }
      });
      return updated;
    });

    saveTimerSnapshot({
      matchId: 'cadete-b-live-1',
      category: matchCategory,
      matchPhase: 'SECOND_HALF',
      currentPeriod: 2,
      regulationAccumulatedSeconds: firstHalfLimitSecs,
      runningSinceTimestamp: now,
      isRunning: true,
      addedTimeSeconds: 0,
      addedTimeRunningSinceTimestamp: null,
      halfTimeStartedAtTimestamp: null,
      configuredRestSeconds: restDurationSecs,
      savedAt: now,
    });

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: `${timeConfig.halfDurationMinutes}'00"`,
        type: 'SEGUNDA_PARTE',
        title: 'Inicio de la Segunda Parte',
        desc: `Segunda parte en juego · Cronómetro desde ${timeConfig.halfDurationMinutes}:00`,
        icon: 'play-forward',
        color: colors.skyPrimary,
      },
      ...prev,
    ]);
  };

  const handleStartSecondHalfPress = () => {
    if (matchPhase !== 'HALF_TIME') return;

    if (restSeconds > 0) {
      setShowEarlySecondHalfConfirmModal(true);
    } else {
      executeStartSecondHalf();
    }
  };

  // FINALIZAR PARTIDO DEFINITIVAMENTE
  const handleFinishMatch = () => {
    const finalSecs = calculateRegulationSeconds();
    accumulatedMatchSecondsRef.current = finalSecs;
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;

    setMatchPhase('FINISHED');
    const minTxt = getMinuteText();

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'FIN',
        title: '🏁 Final del partido',
        desc: `Resultado final: Cadete B ${homeScore} - ${awayScore} Torrent CF`,
        icon: 'checkmark-done-circle',
        color: colors.skyGlow,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  // REINICIAR COMPLETO PARA DEMOS
  const resetDemo = () => {
    accumulatedMatchSecondsRef.current = 0;
    stintStartTimestampRef.current = null;
    accumulatedAddedTimeSecondsRef.current = 0;
    addedTimeStartTimestampRef.current = null;
    halfTimeStartedAtTimestampRef.current = null;

    setMatchPhase('BEFORE_START');
    setCurrentPeriod(1);
    setMatchSeconds(0);
    setAddedTimeSeconds(0);
    setRestSeconds(restDurationSecs);
    setHomeScore(0);
    setAwayScore(0);
    setSystemName('1-4-2-3-1');
    setIsSuspended(false);
    setPitchPlayers(INITIAL_STARTERS_14231);
    setBenchPlayers(INITIAL_BENCH);
    setPlayerStats({});
    setPlayerMatchStates(buildInitialPlayerStates());
    setEvents([]);
    setPlayerAction(initialPlayerActionFlow);
    setShowAIReorgModal(false);
    setShowGeneralEventModal(false);
    setShowIncidenceInput(false);
    setIncidenceText('');
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TIMER_SNAPSHOT_KEY);
    }
  };

  // GESTIÓN DE ACCIONES DE JUGADORES
  const handleOpenPlayerActionPanel = (player: PitchPlayer) => {
    if (isSuspended || matchPhase === 'FINISHED') return;
    setPlayerAction({
      visible: true,
      player,
      action: null,
      step: 'MENU',
      assister: null,
      substitute: null,
      isSubmitting: false,
    });
  };

  const closePlayerActionPanel = () => {
    setPlayerAction(initialPlayerActionFlow);
  };

  const handleSelectAssistPlayer = (assister: PitchPlayer | null) => {
    setPlayerAction(prev => ({
      ...prev,
      assister,
      step: 'CONFIRM',
    }));
  };

  const handleConfirmGoal = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const scorer = playerAction.player;
      const assister = playerAction.assister;

      const scorerId = scorer.id || scorer.dorsal;
      const assistId = assister ? (assister.id || assister.dorsal) : null;

      setHomeScore(prev => prev + 1);

      setPlayerMatchStates(prev => {
        const updated = { ...prev };
        if (updated[scorerId]) {
          updated[scorerId] = recordGoal(updated[scorerId], {
            id: `goal-${Date.now()}`,
            minute: Math.floor(matchSeconds / 60),
            second: matchSeconds,
            assistedByPlayerId: assistId || undefined,
          });
        }
        if (assistId && updated[assistId]) {
          updated[assistId] = recordAssist(updated[assistId]);
        }
        return updated;
      });

      setPlayerStats(prev => {
        const currentScorerStats = (prev[scorerId] as PlayerStats) || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
        const updated: Record<string, PlayerStats> = {
          ...prev,
          [scorerId]: {
            ...currentScorerStats,
            goals: currentScorerStats.goals + 1,
          }
        };

        if (assistId && assister) {
          const currentAssistStats = (prev[assistId] as PlayerStats) || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
          updated[assistId] = {
            ...currentAssistStats,
            assists: currentAssistStats.assists + 1,
          };
        }

        return updated;
      });

      const descTxt = assister 
        ? `#${scorer.dorsal} ${scorer.name} (Asistencia: #${assister.dorsal} ${assister.name})`
        : `#${scorer.dorsal} ${scorer.name}`;

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: 'GOL',
          title: '¡Gol de Cadete B!',
          desc: descTxt,
          icon: 'football',
          color: colors.emeraldGlow,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  const handleConfirmPenaltyScored = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const scorer = playerAction.player;
      const scorerId = scorer.id || scorer.dorsal;

      setHomeScore(prev => prev + 1);

      setPlayerMatchStates(prev => {
        const updated = { ...prev };
        if (updated[scorerId]) {
          updated[scorerId] = recordGoal(updated[scorerId], {
            id: `pen-goal-${Date.now()}`,
            minute: Math.floor(matchSeconds / 60),
            second: matchSeconds,
            isPenalty: true,
          });
        }
        return updated;
      });

      setPlayerStats(prev => {
        const currentStats = (prev[scorerId] as PlayerStats) || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
        return {
          ...prev,
          [scorerId]: {
            ...currentStats,
            goals: currentStats.goals + 1,
          },
        };
      });

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: 'PENALTI_GOL',
          title: '¡Gol de penalti!',
          desc: `#${scorer.dorsal} ${scorer.name}`,
          icon: 'football',
          color: colors.emeraldGlow,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  const handleConfirmPenaltyMissed = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const player = playerAction.player;

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: 'PENALTI_FALLADO',
          title: 'Penalti fallado',
          desc: `#${player.dorsal} ${player.name}`,
          icon: 'close-circle',
          color: colors.redCard,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  const processExpulsion = (player: PitchPlayer, isSecondYellow: boolean) => {
    const minTxt = getMinuteText();
    const pId = player.id || player.dorsal;

    setPlayerMatchStates(prev => {
      if (!prev[pId]) return prev;
      return {
        ...prev,
        [pId]: {
          ...prev[pId],
          isRedCarded: true,
          status: 'BENCH',
          currentStintStartSecond: null,
        }
      };
    });

    setPlayerStats(prev => ({
      ...prev,
      [pId]: { ...getPStats(pId), isRedCarded: true }
    }));

    setPitchPlayers(prev => {
      const remainingStarters = prev.filter(p => p.dorsal !== player.dorsal);
      if (remainingStarters.length < 7) {
        setIsSuspended(true);
      }
      return remainingStarters;
    });

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'ROJA',
        title: isSecondYellow ? '2ª Amarilla y Expulsión' : 'Tarjeta Roja Directa',
        desc: `#${player.dorsal} ${player.name} (${player.role})`,
        icon: 'square',
        color: colors.redCard,
      },
      ...prev,
    ]);
  };

  const handleConfirmYellowCard = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const player = playerAction.player;
      const pId = player.id || player.dorsal;
      const currentStats = getPStats(pId);

      const card: PlayerCard = {
        id: `card-${Date.now()}`,
        type: 'YELLOW',
        minute: Math.floor(matchSeconds / 60),
        second: matchSeconds,
      };

      setPlayerMatchStates(prev => {
        if (!prev[pId]) return prev;
        return { ...prev, [pId]: recordYellowCard(prev[pId], card) };
      });

      if (currentStats.yellowCards === 0) {
        setPlayerStats(prev => ({
          ...prev,
          [pId]: { ...currentStats, yellowCards: 1 }
        }));

        setEvents(prev => [
          {
            id: `ev-${Date.now()}`,
            minute: minTxt,
            type: 'AMARILLA',
            title: 'Tarjeta amarilla',
            desc: `#${player.dorsal} ${player.name} (${player.role})`,
            icon: 'square',
            color: colors.yellowCard,
          },
          ...prev,
        ]);
      } else {
        processExpulsion(player, true);
      }
    } finally {
      closePlayerActionPanel();
    }
  };

  const handleConfirmRedCard = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      processExpulsion(playerAction.player, false);
    } finally {
      closePlayerActionPanel();
    }
  };

  const handleConfirmSub = (substitutePlayer: PitchPlayer) => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const subOutPlayer = playerAction.player;

      const subOutId = subOutPlayer.id || subOutPlayer.dorsal;
      const subInId = substitutePlayer.id || substitutePlayer.dorsal;
      const isInjurySub = playerAction.action === 'INJURY';

      setPlayerMatchStates(prev => {
        const updated = { ...prev };
        if (updated[subOutId]) {
          if (isInjurySub) {
            const injury: PlayerInjury = {
              id: `inj-${Date.now()}`,
              minute: Math.floor(matchSeconds / 60),
              second: matchSeconds,
              isOutForMatch: true,
            };
            updated[subOutId] = recordInjury(updated[subOutId], injury, matchSeconds);
          } else {
            updated[subOutId] = transitionPlayerToBench(updated[subOutId], matchSeconds);
          }
        }
        if (updated[subInId]) {
          updated[subInId] = transitionPlayerToField(
            updated[subInId],
            matchSeconds,
            { xPercent: subOutPlayer.xPercent, yPercent: subOutPlayer.yPercent },
            subOutPlayer.role
          );
        }
        return updated;
      });

      if (isInjurySub) {
        setPlayerStats(prev => ({
          ...prev,
          [subOutId]: { ...getPStats(subOutId), isInjured: true }
        }));
      }

      setPitchPlayers(prev => prev.map(p => p.dorsal === subOutPlayer.dorsal ? {
        ...substitutePlayer,
        xPercent: subOutPlayer.xPercent,
        yPercent: subOutPlayer.yPercent,
        role: subOutPlayer.role,
      } : p));

      setBenchPlayers(prev => prev.map(b => b.dorsal === substitutePlayer.dorsal ? subOutPlayer : b));

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: isInjurySub ? 'LESIÓN' : 'SUSTITUCIÓN',
          title: isInjurySub ? 'Sustitución por lesión' : 'Sustitución',
          desc: `Sale #${subOutPlayer.dorsal} ${subOutPlayer.name} ➔ Entra #${substitutePlayer.dorsal} ${substitutePlayer.name}`,
          icon: isInjurySub ? 'medical' : 'swap-horizontal',
          color: isInjurySub ? colors.redCard : colors.skyPrimary,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  // ETIQUETA E INFO DE BADGE DEL ENCUENTRO
  const getMatchBadgeInfo = () => {
    switch (matchPhase) {
      case 'BEFORE_START':
        return { label: 'SIN COMENZAR', color: colors.textMuted };
      case 'FIRST_HALF':
        return { label: '1ª PARTE EN JUEGO', color: colors.emeraldGlow };
      case 'FIRST_HALF_ADDED':
        return { label: '1ª PARTE (AÑADIDO)', color: colors.yellowCard };
      case 'HALF_TIME':
        return { label: 'DESCANSO', color: colors.yellowCard };
      case 'SECOND_HALF':
        return { label: '2ª PARTE EN JUEGO', color: colors.emeraldGlow };
      case 'SECOND_HALF_ADDED':
        return { label: '2ª PARTE (AÑADIDO)', color: colors.yellowCard };
      case 'FINISHED':
        return { label: 'PARTIDO FINALIZADO', color: colors.skyGlow };
      case 'PAUSED':
        return { label: 'PARTIDO PAUSADO', color: colors.yellowCard };
    }
  };

  const badgeInfo = getMatchBadgeInfo();

  return (
    <View style={styles.mainWrapper}>
      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]} showsVerticalScrollIndicator={false}>
        {/* CABECERA */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={20} color={colors.white} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleTxt}>PARTIDO EN VIVO</Text>
            <Text style={styles.subtitleTxt}>Liga Preferente {matchCategory} · Cadete B vs Torrent CF ({timeConfig.halfDurationMinutes} min/parte)</Text>
          </View>
          <TouchableOpacity style={styles.resetDemoBtn} onPress={resetDemo}>
            <Ionicons name="refresh" size={14} color="#94A3B8" />
            <Text style={styles.resetDemoBtnTxt}>Reiniciar demo</Text>
          </TouchableOpacity>
        </View>

        {/* AVISO DE SUSPENSIÓN REGLAMENTARIA */}
        {isSuspended && (
          <View style={styles.suspensionBanner}>
            <Ionicons name="warning" size={24} color="#EF4444" />
            <View style={{ flex: 1 }}>
              <Text style={styles.suspensionTitle}>🚨 PARTIDO SUSPENDIDO</Text>
              <Text style={styles.suspensionDesc}>El equipo no dispone del número mínimo reglamentario de jugadores.</Text>
            </View>
          </View>
        )}

        {/* MARCADOR SUPERIOR CON RELOJ ABSOLUTO Y DESCANSO */}
        <View style={styles.scoreboardCard}>
          <View style={styles.liveBadgeRow}>
            <View style={[styles.liveRedDot, { backgroundColor: badgeInfo.color }]} />
            <Text style={[styles.liveBadgeTxt, { color: badgeInfo.color }]}>
              {badgeInfo.label}
            </Text>
          </View>

          <View style={styles.scoreRow}>
            <View style={styles.teamScoreBox}>
              <Text style={styles.teamScoreName}>Cadete B</Text>
              <Text style={styles.scoreDigit}>{homeScore}</Text>
            </View>

            <View style={styles.timerBox}>
              {matchPhase === 'HALF_TIME' ? (
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.restLabelTxt}>DESCANSO RESTANTE</Text>
                  <Text style={styles.restTimerTxt}>{formatTimer(restSeconds)}</Text>
                  {restSeconds === 0 && (
                    <Text style={styles.restFinishedTxt}>Descanso finalizado</Text>
                  )}
                </View>
              ) : (
                <>
                  <Text style={styles.timerTxt}>{formatTimer(matchSeconds)}</Text>
                  {addedTimeSeconds > 0 && (
                    <View style={styles.extraTimeBadge}>
                      <Text style={styles.extraTimeBadgeTxt}>+{formatTimer(addedTimeSeconds)} AÑADIDO</Text>
                    </View>
                  )}
                  <Text style={styles.timerSubTxt}>
                    {matchPhase === 'BEFORE_START' ? 'Sin comenzar' : `Minuto ${getMinuteText()}`}
                  </Text>
                </>
              )}

              {/* BOTONES PRINCIPALES DE CONTROL DE FASE */}
              {matchPhase === 'BEFORE_START' && (
                <TouchableOpacity style={[styles.timerControlBtn, { backgroundColor: colors.emeraldGlow }]} onPress={handleStartMatch} activeOpacity={0.8}>
                  <Ionicons name="play" size={14} color={colors.navyDark} />
                  <Text style={styles.timerControlBtnTxt}>Iniciar Partido</Text>
                </TouchableOpacity>
              )}

              {(matchPhase === 'FIRST_HALF' || matchPhase === 'FIRST_HALF_ADDED') && (
                <TouchableOpacity style={[styles.timerControlBtn, { backgroundColor: colors.yellowCard }]} onPress={handleGoToHalfTime} activeOpacity={0.8}>
                  <Ionicons name="pause" size={14} color={colors.navyDark} />
                  <Text style={styles.timerControlBtnTxt}>Descanso</Text>
                </TouchableOpacity>
              )}

              {matchPhase === 'HALF_TIME' && (
                <TouchableOpacity style={[styles.timerControlBtn, { backgroundColor: colors.skyPrimary }]} onPress={handleStartSecondHalfPress} activeOpacity={0.8}>
                  <Ionicons name="play-forward" size={14} color={colors.navyDark} />
                  <Text style={styles.timerControlBtnTxt}>Iniciar segunda parte</Text>
                </TouchableOpacity>
              )}

              {(matchPhase === 'SECOND_HALF' || matchPhase === 'SECOND_HALF_ADDED') && (
                <TouchableOpacity style={[styles.timerControlBtn, { backgroundColor: colors.skyGlow }]} onPress={handleFinishMatch} activeOpacity={0.8}>
                  <Ionicons name="checkmark-done-circle" size={14} color={colors.navyDark} />
                  <Text style={styles.timerControlBtnTxt}>Finalizar Partido</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.teamScoreBox}>
              <Text style={styles.teamScoreName}>Torrent CF</Text>
              <Text style={styles.scoreDigit}>{awayScore}</Text>
            </View>
          </View>
        </View>

        {/* LAYOUT PRINCIPAL */}
        <View style={isDesktop ? styles.desktopGrid : styles.mobileStack}>
          <View style={isDesktop ? styles.mainColDesktop : { width: '100%' }}>
            {/* BOTÓN DE REORGANIZACIÓN IA TRAS EXPULSIÓN */}
            {pitchPlayers.length < 11 && !isSuspended && matchPhase !== 'FINISHED' && (
              <TouchableOpacity style={styles.aiReorgTriggerBtn} onPress={() => setShowAIReorgModal(true)}>
                <Text style={{ fontSize: 18 }}>🧠</Text>
                <Text style={styles.aiReorgTriggerTxt}>Generar reorganización táctica IA ({pitchPlayers.length} jugadores)</Text>
              </TouchableOpacity>
            )}

            {/* CAMPO TÁCTICO CON TIEMPOS INDIVIDUALES VISIBLES */}
            <TacticalPitch 
              systemName={systemName} 
              starters={pitchPlayers.map(p => {
                const pId = p.id || p.dorsal;
                const pState = playerMatchStates[pId];
                const stats = getPStats(pId);
                const playedSecs = pState
                  ? calculatePlayerPlayedSeconds(pState, matchSeconds)
                  : 0;
                return {
                  ...p,
                  yellowCardCount: stats.yellowCards,
                  isRedCarded: stats.isRedCarded,
                  isInjured: stats.isInjured,
                  timeText: formatPlayerTimer(playedSecs),
                };
              })} 
              onPlayerPress={(p: PitchPlayer) => handleOpenPlayerActionPanel(p)} 
            />
          </View>

          <View style={isDesktop ? styles.sidebarColDesktop : { width: '100%' }}>
            {/* BOTÓN ÚNICO DE EVENTOS GENERALES */}
            <TouchableOpacity 
              style={[styles.generalEventTriggerBtn, (isSuspended || matchPhase === 'FINISHED') && { opacity: 0.5 }]}
              disabled={isSuspended || matchPhase === 'FINISHED'}
              onPress={() => setShowGeneralEventModal(true)}
            >
              <Ionicons name="add-circle-outline" size={18} color={colors.navyDark} />
              <Text style={styles.generalEventTriggerTxt}>+ NUEVO EVENTO GENERAL</Text>
            </TouchableOpacity>

            {/* BANQUILLO CON TIEMPOS ACUMULADOS VISIBLES */}
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="people-outline" size={20} color={colors.skyPrimary} />
              <Text style={styles.sectionTitleTxt}>BANQUILLO Y SUPLENTES ({benchPlayers.length})</Text>
            </View>
            <View style={styles.benchCard}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.benchScrollContent}>
                {benchPlayers.map((player) => {
                  const pId = player.id || player.dorsal;
                  const pState = playerMatchStates[pId];
                  const stats = getPStats(pId);
                  const playedSecs = pState
                    ? calculatePlayerPlayedSeconds(pState, matchSeconds)
                    : 0;
                  return (
                    <View key={`bench-${player.dorsal}`} style={styles.benchJerseyWrapper}>
                      <TacticalJersey 
                        dorsal={player.dorsal} 
                        name={player.name} 
                        isGoalkeeper={player.isGoalkeeper} 
                        yellowCardCount={stats.yellowCards}
                        isRedCarded={stats.isRedCarded}
                        isInjured={stats.isInjured}
                        timeText={formatPlayerTimer(playedSecs)}
                        onPress={() => handleOpenPlayerActionPanel(player)} 
                        scale={0.9} 
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>

            {/* TIMELINE */}
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="time-outline" size={20} color={colors.skyGlow} />
              <Text style={styles.sectionTitleTxt}>LÍNEA TEMPORAL DE ACCIONES</Text>
            </View>
            <View style={styles.timelineCard}>
              {events.length === 0 ? (
                <Text style={styles.emptyTimelineTxt}>Sin eventos registrados. Empezar partido.</Text>
              ) : (
                events.map((ev) => (
                  <View key={`ev-${ev.id}`} style={styles.timelineItem}>
                    <Text style={styles.timelineTime}>{ev.minute}</Text>
                    <Ionicons name={ev.icon as any} size={16} color={ev.color} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.timelineTitle}>{ev.title}</Text>
                      <Text style={styles.timelineDesc}>{ev.desc}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>

        {/* MODAL DE CONFIRMACIÓN DE INICIO DE 2ª PARTE SI EL DESCANSO AÚN NO HA FINALIZADO */}
        <Modal visible={showEarlySecondHalfConfirmModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.confirmBox}>
              <Ionicons name="time-outline" size={32} color={colors.yellowCard} />
              <Text style={styles.confirmBoxTitle}>Descanso no finalizado</Text>
              <Text style={styles.confirmBoxDesc}>
                El tiempo de descanso configurado para {matchCategory} ({timeConfig.restDurationMinutes} min) aún no ha terminado (quedan {formatTimer(restSeconds)}). ¿Deseas iniciar la segunda parte ahora?
              </Text>
              <View style={styles.confirmBtnRow}>
                <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setShowEarlySecondHalfConfirmModal(false)}>
                  <Text style={styles.confirmBtnCancelTxt}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmBtnOk} onPress={executeStartSecondHalf}>
                  <Text style={styles.confirmBtnOkTxt}>Iniciar segunda parte</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* PANEL DE ACCIONES DE JUGADOR */}
        {playerAction.visible && playerAction.player && (
          <View style={styles.actionPanelCard}>
            <View style={styles.actionPanelHeader}>
              <View style={styles.actionPlayerInfo}>
                <Text style={styles.actionDorsalTxt}>#{playerAction.player.dorsal}</Text>
                <View>
                  <Text style={styles.actionPlayerName}>{playerAction.player.name}</Text>
                  <Text style={styles.actionPlayerRole}>{playerAction.player.role}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={closePlayerActionPanel}>
                <Ionicons name="close" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            {playerAction.step === 'MENU' && (
              <View style={styles.actionMenuGrid}>
                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.emeraldGlow }]} onPress={() => setPlayerAction(prev => ({ ...prev, action: 'GOAL', step: 'ASSIST_SELECT' }))}>
                  <Ionicons name="football" size={18} color={colors.navyDark} />
                  <Text style={[styles.actionGridBtnTxt, { color: colors.navyDark }]}>GOL PROPIO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.emeraldGlow }]} onPress={() => setPlayerAction(prev => ({ ...prev, action: 'PENALTY_SCORED', step: 'CONFIRM' }))}>
                  <Ionicons name="football-outline" size={18} color={colors.navyDark} />
                  <Text style={[styles.actionGridBtnTxt, { color: colors.navyDark }]}>GOL PENALTI</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.redCard }]} onPress={handleConfirmPenaltyMissed}>
                  <Ionicons name="close-circle" size={18} color={colors.white} />
                  <Text style={styles.actionGridBtnTxt}>PENALTI FALLADO</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.yellowCard }]} onPress={handleConfirmYellowCard}>
                  <Ionicons name="square" size={18} color={colors.navyDark} />
                  <Text style={[styles.actionGridBtnTxt, { color: colors.navyDark }]}>TARJETA AMARILLA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.redCard }]} onPress={handleConfirmRedCard}>
                  <Ionicons name="square" size={18} color={colors.white} />
                  <Text style={styles.actionGridBtnTxt}>ROJA DIRECTA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionGridBtn, { backgroundColor: colors.skyPrimary }]} onPress={() => setPlayerAction(prev => ({ ...prev, action: 'SUB', step: 'SUB_SELECT' }))}>
                  <Ionicons name="swap-horizontal" size={18} color={colors.navyDark} />
                  <Text style={[styles.actionGridBtnTxt, { color: colors.navyDark }]}>SUSTITUCIÓN</Text>
                </TouchableOpacity>
              </View>
            )}

            {playerAction.step === 'ASSIST_SELECT' && (
              <View style={styles.subSelectWrapper}>
                <Text style={styles.subSelectTitle}>¿QUIÉN HIZO LA ASISTENCIA?</Text>
                <TouchableOpacity style={styles.noAssistBtn} onPress={() => handleSelectAssistPlayer(null)}>
                  <Text style={styles.noAssistBtnTxt}>Sin asistencia directa</Text>
                </TouchableOpacity>
                <ScrollView style={{ maxHeight: 160 }}>
                  {pitchPlayers.filter(p => p.dorsal !== playerAction.player?.dorsal).map(assister => (
                    <TouchableOpacity key={`ast-${assister.dorsal}`} style={styles.subOptionRow} onPress={() => handleSelectAssistPlayer(assister)}>
                      <Text style={styles.subOptionDorsal}>#{assister.dorsal}</Text>
                      <Text style={styles.subOptionName}>{assister.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {playerAction.step === 'SUB_SELECT' && (
              <View style={styles.subSelectWrapper}>
                <Text style={styles.subSelectTitle}>SELECCIONAR JUGADOR DEL BANQUILLO</Text>
                <ScrollView style={{ maxHeight: 180 }}>
                  {benchPlayers.map(sub => (
                    <TouchableOpacity key={`sub-${sub.dorsal}`} style={styles.subOptionRow} onPress={() => handleConfirmSub(sub)}>
                      <Text style={styles.subOptionDorsal}>#{sub.dorsal}</Text>
                      <Text style={styles.subOptionName}>{sub.name} ({sub.role})</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {playerAction.step === 'CONFIRM' && playerAction.action === 'GOAL' && (
              <View style={styles.subSelectWrapper}>
                <Text style={styles.subSelectTitle}>CONFIRMAR GOL</Text>
                <Text style={styles.confirmGoalDesc}>
                  Gol de #{playerAction.player.dorsal} {playerAction.player.name}
                  {playerAction.assister ? ` (Asistencia: #${playerAction.assister.dorsal} ${playerAction.assister.name})` : ''}
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                  <TouchableOpacity style={styles.confirmBtnCancel} onPress={closePlayerActionPanel}>
                    <Text style={styles.confirmBtnCancelTxt}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmBtnOk} onPress={handleConfirmGoal}>
                    <Text style={styles.confirmBtnOkTxt}>Confirmar Gol</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {playerAction.step === 'CONFIRM' && playerAction.action === 'PENALTY_SCORED' && (
              <View style={styles.subSelectWrapper}>
                <Text style={styles.subSelectTitle}>CONFIRMAR GOL DE PENALTI</Text>
                <Text style={styles.confirmGoalDesc}>Gol de penalti anotado por #{playerAction.player.dorsal} {playerAction.player.name}</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                  <TouchableOpacity style={styles.confirmBtnCancel} onPress={closePlayerActionPanel}>
                    <Text style={styles.confirmBtnCancelTxt}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.confirmBtnOk} onPress={handleConfirmPenaltyScored}>
                    <Text style={styles.confirmBtnOkTxt}>Confirmar Penalti</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: colors.navyDark },
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 40 },
  contentDesktop: { maxWidth: 1080, alignSelf: 'center', width: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 18, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700' },
  resetDemoBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.navyCard, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  resetDemoBtnTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },

  suspensionBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#EF4444', marginBottom: 14 },
  suspensionTitle: { color: '#EF4444', fontSize: 13, fontWeight: '900' },
  suspensionDesc: { color: colors.white, fontSize: 11, marginTop: 2 },

  scoreboardCard: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 16 },
  liveBadgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 10 },
  liveRedDot: { width: 8, height: 8, borderRadius: 4 },
  liveBadgeTxt: { fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },

  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamScoreBox: { flex: 1, alignItems: 'center' },
  teamScoreName: { color: colors.white, fontSize: 13, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  scoreDigit: { color: colors.emeraldGlow, fontSize: 32, fontWeight: '900' },

  timerBox: { alignItems: 'center', paddingHorizontal: 10 },
  timerTxt: { color: colors.white, fontSize: 26, fontWeight: '900' },
  timerSubTxt: { color: colors.textMuted, fontSize: 10, fontWeight: '700', marginTop: 2 },

  restLabelTxt: { color: colors.yellowCard, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  restTimerTxt: { color: colors.yellowCard, fontSize: 26, fontWeight: '900' },
  restFinishedTxt: { color: colors.emeraldGlow, fontSize: 10, fontWeight: '800', marginTop: 2 },

  extraTimeBadge: { backgroundColor: 'rgba(245, 158, 11, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginTop: 2, borderWidth: 1, borderColor: colors.yellowCard },
  extraTimeBadgeTxt: { color: colors.yellowCard, fontSize: 10, fontWeight: '900' },

  timerControlBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  timerControlBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  desktopGrid: { flexDirection: 'row', gap: 16 },
  mobileStack: { gap: 16 },
  mainColDesktop: { flex: 1.6 },
  sidebarColDesktop: { flex: 1 },

  aiReorgTriggerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.skyPrimary, marginBottom: 12 },
  aiReorgTriggerTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '900' },

  generalEventTriggerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.skyPrimary, padding: 12, borderRadius: 12, marginBottom: 16 },
  generalEventTriggerTxt: { color: colors.navyDark, fontSize: 13, fontWeight: '900' },

  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 4 },
  sectionTitleTxt: { color: colors.white, fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },

  benchCard: { backgroundColor: colors.navyDeep, borderRadius: 14, padding: 12, borderWidth: 1, borderColor: colors.border, marginBottom: 16 },
  benchScrollContent: { gap: 12, paddingVertical: 4 },
  benchJerseyWrapper: { alignItems: 'center' },

  timelineCard: { backgroundColor: colors.navyDeep, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, gap: 10, minHeight: 120 },
  emptyTimelineTxt: { color: colors.textMuted, fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 20 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  timelineTime: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', width: 44 },
  timelineTitle: { color: colors.white, fontSize: 12, fontWeight: '800' },
  timelineDesc: { color: colors.textMuted, fontSize: 10, marginTop: 1 },

  // CONFIRM MODAL OVERLAY
  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 8, 20, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  confirmBox: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 20, maxWidth: 400, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  confirmBoxTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 10 },
  confirmBoxDesc: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  confirmBtnRow: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
  confirmBtnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: colors.navyCard, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  confirmBtnCancelTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },
  confirmBtnOk: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: colors.skyPrimary, alignItems: 'center' },
  confirmBtnOkTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  // PANEL DE ACCIONES DE JUGADOR
  actionPanelCard: { marginTop: 16, backgroundColor: colors.navyDeep, borderRadius: 16, padding: 16, borderWidth: 1.5, borderColor: colors.skyPrimary },
  actionPanelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: colors.border },
  actionPlayerInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  actionDorsalTxt: { color: colors.skyGlow, fontSize: 18, fontWeight: '900' },
  actionPlayerName: { color: colors.white, fontSize: 14, fontWeight: '900' },
  actionPlayerRole: { color: colors.textMuted, fontSize: 11 },

  actionMenuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  actionGridBtn: { flex: 1, minWidth: '45%', flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 10 },
  actionGridBtnTxt: { color: colors.white, fontSize: 11, fontWeight: '900' },

  subSelectWrapper: { gap: 8 },
  subSelectTitle: { color: colors.white, fontSize: 12, fontWeight: '900' },
  noAssistBtn: { backgroundColor: colors.navyCard, padding: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  noAssistBtnTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '800' },
  subOptionRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 10, backgroundColor: colors.navyCard, borderRadius: 8, marginBottom: 4 },
  subOptionDorsal: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '900' },
  subOptionName: { color: colors.white, fontSize: 12, fontWeight: '700' },
  confirmGoalDesc: { color: colors.white, fontSize: 13, fontWeight: '700', marginVertical: 6 },
});
