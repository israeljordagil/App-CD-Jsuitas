import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, AppState, AppStateStatus, Modal, TextInput } from 'react-native';
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
  pinkMedical: '#EC4899',
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

export const CATEGORY_TIME_CONFIGS: Record<string, CategoryTimeConfig> = {
  'Querubín': { halves: 3, halfDurationMinutes: 12, restDurationMinutes: 1 },
  'Prebenjamín': { halves: 2, halfDurationMinutes: 25, restDurationMinutes: 5 },
  'Benjamín': { halves: 2, halfDurationMinutes: 25, restDurationMinutes: 5 },
  'Alevín': { halves: 2, halfDurationMinutes: 30, restDurationMinutes: 5 },
  'Infantil': { halves: 2, halfDurationMinutes: 35, restDurationMinutes: 10 },
  'Cadete': { halves: 2, halfDurationMinutes: 40, restDurationMinutes: 10 },
  'Juvenil': { halves: 2, halfDurationMinutes: 45, restDurationMinutes: 15 },
};

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
      if (!jsonVal) return null;

      const parsed = JSON.parse(jsonVal);
      if (!parsed || typeof parsed !== 'object') return null;

      if (parsed.matchPhase && typeof parsed.matchPhase === 'string') {
        return {
          matchId: parsed.matchId || 'cadete-b-patacona-c-test-1',
          category: parsed.category || 'Cadete',
          matchPhase: parsed.matchPhase as MatchPhase,
          currentPeriod: parsed.currentPeriod === 2 ? 2 : 1,
          regulationAccumulatedSeconds: typeof parsed.regulationAccumulatedSeconds === 'number' ? parsed.regulationAccumulatedSeconds : 0,
          runningSinceTimestamp: typeof parsed.runningSinceTimestamp === 'number' ? parsed.runningSinceTimestamp : null,
          isRunning: Boolean(parsed.isRunning),
          addedTimeSeconds: typeof parsed.addedTimeSeconds === 'number' ? parsed.addedTimeSeconds : 0,
          addedTimeRunningSinceTimestamp: typeof parsed.addedTimeRunningSinceTimestamp === 'number' ? parsed.addedTimeRunningSinceTimestamp : null,
          halfTimeStartedAtTimestamp: typeof parsed.halfTimeStartedAtTimestamp === 'number' ? parsed.halfTimeStartedAtTimestamp : null,
          configuredRestSeconds: typeof parsed.configuredRestSeconds === 'number' ? parsed.configuredRestSeconds : 600,
          savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now(),
        };
      }

      if (parsed.status && typeof parsed.status === 'string') {
        const oldStatus = parsed.status;
        const oldSecs = typeof parsed.accumulatedSeconds === 'number' ? parsed.accumulatedSeconds : 0;
        const oldRunningTs = typeof parsed.runningSinceTimestamp === 'number' ? parsed.runningSinceTimestamp : null;

        let migratedPhase: MatchPhase = 'BEFORE_START';
        if (oldStatus === 'IN_PROGRESS') {
          migratedPhase = 'FIRST_HALF';
        } else if (oldStatus === 'PAUSED') {
          migratedPhase = 'PAUSED';
        } else if (oldStatus === 'FINISHED') {
          migratedPhase = 'FINISHED';
        }

        return {
          matchId: parsed.matchId || 'cadete-b-patacona-c-test-1',
          category: 'Cadete',
          matchPhase: migratedPhase,
          currentPeriod: 1,
          regulationAccumulatedSeconds: oldSecs,
          runningSinceTimestamp: oldRunningTs,
          isRunning: oldRunningTs !== null,
          addedTimeSeconds: 0,
          addedTimeRunningSinceTimestamp: null,
          halfTimeStartedAtTimestamp: null,
          configuredRestSeconds: 600,
          savedAt: parsed.savedAt || Date.now(),
        };
      }
    }
  } catch (e) {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(TIMER_SNAPSHOT_KEY);
      }
    } catch (_) {}
  }
  return null;
};

type ActionStep = 
  | 'MENU' 
  | 'CONFIRM_GOAL'
  | 'ASSIST_SELECT'
  | 'PENALTY_MENU'
  | 'CONFIRM_PENALTY_SCORED'
  | 'CONFIRM_PENALTY_MISSED'
  | 'CONFIRM_YELLOW'
  | 'CONFIRM_RED'
  | 'CONFIRM_INJURY'
  | 'CONFIRM_SUB'
  | 'SUB_SELECT';

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

type GeneralEventStep = 
  | 'MENU'
  | 'CONFIRM_RIVAL_GOAL'
  | 'CONFIRM_REST'
  | 'CONFIRM_HYDRATION'
  | 'INCIDENCE_INPUT'
  | 'CONFIRM_PAUSE'
  | 'CONFIRM_RESUME'
  | 'CONFIRM_FINISH';

export interface DelegadoPartidoEnVivoProps {
  category?: string;
  teamName?: string;
  rivalName?: string;
  matchCondition?: 'LOCAL' | 'VISITANTE';
}

export function DelegadoPartidoEnVivo({ 
  category = 'Cadete',
  teamName = 'Cadete B',
  rivalName = 'Patacona C',
  matchCondition = 'LOCAL',
}: DelegadoPartidoEnVivoProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const matchCategory = category && CATEGORY_TIME_CONFIGS[category] ? category : 'Infantil';
  const timeConfig = CATEGORY_TIME_CONFIGS[matchCategory] || CATEGORY_TIME_CONFIGS['Infantil'];

  const isAwayMatch = matchCondition === 'VISITANTE';
  const homeTeamLabel = isAwayMatch ? rivalName : `CD Jesuitas (${teamName})`;
  const awayTeamLabel = isAwayMatch ? `CD Jesuitas (${teamName})` : rivalName;

  const firstHalfLimitSecs = timeConfig.halfDurationMinutes * 60;
  const secondHalfLimitSecs = timeConfig.halfDurationMinutes * 2 * 60;
  const restDurationSecs = timeConfig.restDurationMinutes * 60;

  // 1. CRONÓMETRO ABSOLUTO BASADO EN Date.now()
  const [matchPhase, setMatchPhase] = useState<MatchPhase>('BEFORE_START');
  const [currentPeriod, setCurrentPeriod] = useState<1 | 2>(1);
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [addedTimeSeconds, setAddedTimeSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(restDurationSecs);

  const stintStartTimestampRef = useRef<number | null>(null);
  const accumulatedMatchSecondsRef = useRef<number>(0);

  const addedTimeStartTimestampRef = useRef<number | null>(null);
  const accumulatedAddedTimeSecondsRef = useRef<number>(0);

  const halfTimeStartedAtTimestampRef = useRef<number | null>(null);

  const [showEarlySecondHalfConfirmModal, setShowEarlySecondHalfConfirmModal] = useState(false);

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

  useEffect(() => {
    const snapshot = loadTimerSnapshot();
    if (snapshot) {
      setMatchPhase(snapshot.matchPhase || 'BEFORE_START');
      setCurrentPeriod(snapshot.currentPeriod === 2 ? 2 : 1);
      accumulatedMatchSecondsRef.current = snapshot.regulationAccumulatedSeconds || 0;
      stintStartTimestampRef.current = snapshot.runningSinceTimestamp || null;
      accumulatedAddedTimeSecondsRef.current = snapshot.addedTimeSeconds || 0;
      addedTimeStartTimestampRef.current = snapshot.addedTimeRunningSinceTimestamp || null;
      halfTimeStartedAtTimestampRef.current = snapshot.halfTimeStartedAtTimestamp || null;

      const now = Date.now();
      const maxLimit = snapshot.currentPeriod === 2 ? secondHalfLimitSecs : firstHalfLimitSecs;

      if (snapshot.matchPhase === 'FIRST_HALF' || snapshot.matchPhase === 'SECOND_HALF') {
        const reg = Math.min(
          (snapshot.regulationAccumulatedSeconds || 0) + (snapshot.runningSinceTimestamp ? Math.floor((now - snapshot.runningSinceTimestamp) / 1000) : 0),
          maxLimit
        );
        setMatchSeconds(reg);
      } else if (snapshot.matchPhase === 'FIRST_HALF_ADDED' || snapshot.matchPhase === 'SECOND_HALF_ADDED') {
        setMatchSeconds(maxLimit);
        const add = (snapshot.addedTimeSeconds || 0) + (snapshot.addedTimeRunningSinceTimestamp ? Math.floor((now - snapshot.addedTimeRunningSinceTimestamp) / 1000) : 0);
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

  // 3. JUGADORES Y ESTADÍSTICAS
  const [pitchPlayers, setPitchPlayers] = useState<PitchPlayer[]>(INITIAL_STARTERS_14231);
  const [benchPlayers, setBenchPlayers] = useState<PitchPlayer[]>(INITIAL_BENCH);
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerStats>>({});
  const [playerMatchStates, setPlayerMatchStates] = useState<Record<string, PlayerMatchState>>(buildInitialPlayerStates);

  // 4. TIMELINE DE EVENTOS
  const [events, setEvents] = useState<any[]>([]);

  // 5. PANEL DE ACCIONES Y EVENTOS GENERALES
  const [playerAction, setPlayerAction] = useState<PlayerActionFlow>(initialPlayerActionFlow);
  const [showGeneralEventModal, setShowGeneralEventModal] = useState(false);
  const [generalEventStep, setGeneralEventStep] = useState<GeneralEventStep>('MENU');
  const [incidenceText, setIncidenceText] = useState('');

  const updateAllClocks = useCallback(() => {
    if (isSuspended) return;

    const now = Date.now();

    if (matchPhase === 'FIRST_HALF' || matchPhase === 'SECOND_HALF') {
      const regSecs = calculateRegulationSeconds();
      setMatchSeconds(regSecs);

      const maxLimit = currentPeriod === 1 ? firstHalfLimitSecs : secondHalfLimitSecs;
      if (regSecs >= maxLimit) {
        accumulatedMatchSecondsRef.current = maxLimit;
        stintStartTimestampRef.current = null;
        if (addedTimeStartTimestampRef.current === null) {
          addedTimeStartTimestampRef.current = now;
          accumulatedAddedTimeSecondsRef.current = 0;
          setAddedTimeSeconds(0);
        }
        setMatchPhase(currentPeriod === 1 ? 'FIRST_HALF_ADDED' : 'SECOND_HALF_ADDED');
        return;
      }
    }

    if (matchPhase === 'FIRST_HALF_ADDED' || matchPhase === 'SECOND_HALF_ADDED') {
      setAddedTimeSeconds(calculateAddedSeconds());
    }

    if (matchPhase === 'HALF_TIME') {
      setRestSeconds(calculateRestSeconds());
    }
  }, [matchPhase, currentPeriod, isSuspended, calculateRegulationSeconds, calculateAddedSeconds, calculateRestSeconds, firstHalfLimitSecs, secondHalfLimitSecs]);

  useEffect(() => {
    if (matchPhase === 'BEFORE_START' || matchPhase === 'FINISHED' || matchPhase === 'PAUSED' || isSuspended) return;

    updateAllClocks();
    const intervalId = setInterval(updateAllClocks, 250);

    const handleBackgroundSave = () => {
      saveTimerSnapshot({
        matchId: 'cadete-b-patacona-c-test-1',
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

  const formatTimer = (totalSecs: number) => {
    const safeSecs = Number.isFinite(totalSecs) && totalSecs >= 0 ? totalSecs : 0;
    const mins = Math.floor(safeSecs / 60);
    const secs = safeSecs % 60;
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
        yellowCards: pState.yellowCards || 0,
        isRedCarded: Boolean(pState.isRedCarded),
        isInjured: Boolean(pState.isInjured),
        goals: pState.goals ? pState.goals.length : 0,
        assists: pState.assistsCount || 0,
      };
    }
    return (playerStats[id] as PlayerStats) || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
  };

  const handleStartMatch = () => {
    if (matchPhase !== 'BEFORE_START') return;

    accumulatedMatchSecondsRef.current = 0;
    stintStartTimestampRef.current = Date.now();
    setCurrentPeriod(1);
    setMatchSeconds(0);
    setMatchPhase('FIRST_HALF');

    saveTimerSnapshot({
      matchId: 'cadete-b-patacona-c-test-1',
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
        desc: `1ª Parte en juego · Categoría ${matchCategory} · ${homeTeamLabel} vs ${awayTeamLabel}`,
        icon: 'play',
        color: colors.emeraldGlow,
      },
      ...prev,
    ]);
  };

  const handleGoToHalfTime = () => {
    if (matchPhase !== 'FIRST_HALF' && matchPhase !== 'FIRST_HALF_ADDED' && matchPhase !== 'BEFORE_START') return;

    accumulatedMatchSecondsRef.current = firstHalfLimitSecs;
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;

    const now = Date.now();
    halfTimeStartedAtTimestampRef.current = now;
    setRestSeconds(restDurationSecs);
    setMatchPhase('HALF_TIME');

    // CERRAR TRAMO DE 1ª PARTE Y CONSERVAR TIEMPO ACUMULADO DE CADA JUGADOR EN CAMPO
    setPlayerMatchStates(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pId => {
        const player = updated[pId];
        if (player.status === 'FIELD' && player.currentStintStartSecond !== null) {
          const stintDuration = Math.max(0, firstHalfLimitSecs - player.currentStintStartSecond);
          const updatedStints = player.stints.map(s =>
            s.exitedAtSecond === null ? { ...s, exitedAtSecond: firstHalfLimitSecs } : s
          );
          updated[pId] = {
            ...player,
            playedSeconds: player.playedSeconds + stintDuration,
            currentStintStartSecond: null,
            stints: updatedStints,
          };
        }
      });
      return updated;
    });

    saveTimerSnapshot({
      matchId: 'cadete-b-patacona-c-test-1',
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

  const executeStartSecondHalf = () => {
    setShowEarlySecondHalfConfirmModal(false);

    const now = Date.now();
    setCurrentPeriod(2);
    accumulatedMatchSecondsRef.current = firstHalfLimitSecs;
    stintStartTimestampRef.current = now;

    accumulatedAddedTimeSecondsRef.current = 0;
    addedTimeStartTimestampRef.current = null;
    halfTimeStartedAtTimestampRef.current = null;

    setMatchSeconds(firstHalfLimitSecs);
    setAddedTimeSeconds(0);
    setMatchPhase('SECOND_HALF');

    // ABRIR TRAMO DE 2ª PARTE PARA JUGADORES EN CAMPO CONSERVANDO playedSeconds PREVIO
    setPlayerMatchStates(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(pId => {
        const player = updated[pId];
        if (player.status === 'FIELD' && !player.isInjured && !player.isRedCarded) {
          const updatedStints = [
            ...player.stints,
            { enteredAtSecond: firstHalfLimitSecs, exitedAtSecond: null },
          ];
          updated[pId] = {
            ...player,
            currentStintStartSecond: firstHalfLimitSecs,
            stints: updatedStints,
          };
        }
      });
      return updated;
    });

    saveTimerSnapshot({
      matchId: 'cadete-b-patacona-c-test-1',
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

  const [finishedMatchContext, setFinishedMatchContext] = useState<any>(null);
  const [showMatchSummaryModal, setShowMatchSummaryModal] = useState(false);

  const handleFinishMatch = () => {
    const finalSecs = calculateRegulationSeconds();
    accumulatedMatchSecondsRef.current = finalSecs;
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;

    setMatchPhase('FINISHED');
    const minTxt = getMinuteText();

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const finishedAtStr = `${dateFormatted} · ${timeFormatted} hs`;

    const finalEventItem = {
      id: `ev-${Date.now()}`,
      minute: minTxt,
      type: 'FIN',
      title: '🏁 Final del partido',
      desc: `Resultado final: ${homeTeamLabel} ${homeScore} - ${awayScore} ${awayTeamLabel}`,
      icon: 'checkmark-done-circle',
      color: colors.skyGlow,
    };

    const updatedEvents = [finalEventItem, ...events];
    setEvents(updatedEvents);

    const newFinishedContext = {
      matchId: 'cadete-b-patacona-c-test-1',
      category: matchCategory,
      teamName: `CD Jesuitas (${teamName})`,
      rivalName: rivalName,
      homeTeamLabel: homeTeamLabel,
      awayTeamLabel: awayTeamLabel,
      isHome: !isAwayMatch,
      homeScore: homeScore,
      awayScore: awayScore,
      finishedAtFormatted: finishedAtStr,
      finishedTimestamp: Date.now(),
      matchPhase: 'FINISHED',
      actaGenerated: false,
      pendingActa: true,
      events: updatedEvents,
    };

    setFinishedMatchContext(newFinishedContext);

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('@cd_jesuitas_last_finished_match', JSON.stringify(newFinishedContext));
        window.localStorage.setItem('@cd_jesuitas_pending_acta_match', JSON.stringify(newFinishedContext));
      } catch (_) {}

      try {
        const rawHistory = window.localStorage.getItem('@cd_jesuitas_finished_matches_history');
        let historyArray: any[] = [];
        if (rawHistory) {
          try {
            const parsed = JSON.parse(rawHistory);
            if (Array.isArray(parsed)) {
              historyArray = parsed;
            }
          } catch (e) {
            console.warn('[FinishedMatchHistory] Corrupted history JSON recovered silently:', e);
            historyArray = [];
          }
        }

        const existingIdx = historyArray.findIndex((m: any) => m && m.matchId === newFinishedContext.matchId);
        if (existingIdx >= 0) {
          historyArray[existingIdx] = newFinishedContext;
        } else {
          historyArray.unshift(newFinishedContext);
        }

        historyArray.sort((a: any, b: any) => (b.finishedTimestamp || 0) - (a.finishedTimestamp || 0));

        window.localStorage.setItem('@cd_jesuitas_finished_matches_history', JSON.stringify(historyArray));
      } catch (err) {
        console.warn('[FinishedMatchHistory] Secondary history save failed gracefully:', err);
      }
    }

    setShowGeneralEventModal(false);
  };

  const handleOpenActaForFinishedMatch = () => {
    const matchData = finishedMatchContext || {
      matchId: 'cadete-b-patacona-c-test-1',
      category: matchCategory,
      teamName: `CD Jesuitas (${teamName})`,
      rivalName: rivalName,
      homeTeamLabel: homeTeamLabel,
      awayTeamLabel: awayTeamLabel,
      isHome: !isAwayMatch,
      homeScore: homeScore,
      awayScore: awayScore,
      finishedAtFormatted: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' hs',
      finishedTimestamp: Date.now(),
      matchPhase: 'FINISHED',
      actaGenerated: false,
      pendingActa: true,
      events: events,
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('@cd_jesuitas_active_acta_match', JSON.stringify(matchData));
        window.localStorage.setItem('@cd_jesuitas_pending_acta_match', JSON.stringify(matchData));
      } catch (_) {}
    }

    router.push('/delegado/acta' as any);
  };

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
    setShowGeneralEventModal(false);
    setGeneralEventStep('MENU');
    setIncidenceText('');
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(TIMER_SNAPSHOT_KEY);
    }
  };

  // GESTIÓN DE ACCIONES DE JUGADORES (MODAL INTRACTABLE & BLOQUEADO POR REGLA)
  const handleOpenPlayerActionPanel = (player: PitchPlayer) => {
    if (isSuspended || matchPhase === 'FINISHED') return;
    const pId = player.id || player.dorsal;
    const stats = getPStats(pId);
    if (stats.isRedCarded) return;

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
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const scorer = playerAction.player;

      const scorerId = scorer.id || scorer.dorsal;
      const assistId = assister ? (assister.id || assister.dorsal) : null;

      if (isAwayMatch) {
        setAwayScore(prev => prev + 1);
      } else {
        setHomeScore(prev => prev + 1);
      }

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
          title: `¡Gol del CD Jesuitas!`,
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

      if (isAwayMatch) {
        setAwayScore(prev => prev + 1);
      } else {
        setHomeScore(prev => prev + 1);
      }

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
          title: '¡Gol de penalti del CD Jesuitas!',
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

  // GESTIÓN DE ACCIONES GENERALES DEL PARTIDO (MODAL "NUEVO EVENTO")
  const handleOpenGeneralEventModal = () => {
    if (isSuspended || matchPhase === 'FINISHED') return;
    setGeneralEventStep('MENU');
    setIncidenceText('');
    setShowGeneralEventModal(true);
  };

  const handleConfirmRivalGoal = () => {
    if (isAwayMatch) {
      setHomeScore(prev => prev + 1);
    } else {
      setAwayScore(prev => prev + 1);
    }
    const minTxt = getMinuteText();

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'GOL_RIVAL',
        title: `¡Gol del ${rivalName}!`,
        desc: `Gol anotado por el equipo rival (${isAwayMatch ? 'Local' : 'Visitante'})`,
        icon: 'football',
        color: colors.redCard,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handleConfirmHydrationPause = () => {
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;
    const minTxt = getMinuteText();

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'HIDRATACIÓN',
        title: '💧 Pausa de hidratación',
        desc: 'Pausa temporal para hidratación de los jugadores',
        icon: 'water',
        color: colors.skyPrimary,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handleSaveIncidence = () => {
    const minTxt = getMinuteText();
    const note = incidenceText.trim() || 'Incidencia en el partido';

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'INCIDENCIA',
        title: '📝 Incidencia',
        desc: note,
        icon: 'create',
        color: colors.yellowCard,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handlePauseMatch = () => {
    stintStartTimestampRef.current = null;
    addedTimeStartTimestampRef.current = null;
    setMatchPhase('PAUSED');
    const minTxt = getMinuteText();

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'PAUSA',
        title: '⏸️ Partido pausado',
        desc: 'Cronómetro pausado por el delegado',
        icon: 'pause',
        color: colors.yellowCard,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handleResumeMatch = () => {
    const now = Date.now();
    stintStartTimestampRef.current = now;
    setMatchPhase(currentPeriod === 1 ? 'FIRST_HALF' : 'SECOND_HALF');
    const minTxt = getMinuteText();

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'REANUDACIÓN',
        title: '▶️ Partido reanudado',
        desc: 'Se reanuda el cronómetro del partido',
        icon: 'play',
        color: colors.emeraldGlow,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

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
      default:
        return { label: 'SIN COMENZAR', color: colors.textMuted };
    }
  };

  const badgeInfo = getMatchBadgeInfo();

  const availableBenchPlayers = benchPlayers.filter(b => {
    const stats = getPStats(b.id || b.dorsal);
    return !stats.isRedCarded && !stats.isInjured;
  });

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
            <Text style={styles.subtitleTxt}>Liga Preferente {matchCategory} · {homeTeamLabel} vs {awayTeamLabel} ({timeConfig.halfDurationMinutes} min/parte)</Text>
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
              <Text style={styles.teamScoreName}>{homeTeamLabel}</Text>
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
              <Text style={styles.teamScoreName}>{awayTeamLabel}</Text>
              <Text style={styles.scoreDigit}>{awayScore}</Text>
            </View>
          </View>
        </View>

        {/* PANTALLA DE CIERRE DEL ENCUENTRO CUANDO EL PARTIDO HA FINALIZADO */}
        {matchPhase === 'FINISHED' && (
          <View style={styles.matchCompletionContainer}>
            <View style={styles.matchCompletionCard}>
              <View style={styles.completionSuccessHeader}>
                <View style={styles.completionIconBadge}>
                  <Ionicons name="checkmark-circle" size={32} color={colors.emeraldGlow} />
                </View>
                <Text style={styles.completionSuccessTitle}>✅ Partido finalizado correctamente</Text>
                <Text style={styles.completionSuccessSub}>Se ha registrado el cierre definitivo del encuentro</Text>
              </View>

              {/* RESULTADO FINAL Y DATOS DEL PARTIDO */}
              <View style={styles.completionScoreBox}>
                <Text style={styles.completionScoreLabel}>RESULTADO FINAL</Text>
                <View style={styles.completionScoreRow}>
                  <Text style={styles.completionTeamName}>{homeTeamLabel}</Text>
                  <View style={styles.completionScoreBadge}>
                    <Text style={styles.completionScoreDigits}>{homeScore} - {awayScore}</Text>
                  </View>
                  <Text style={styles.completionTeamName}>{awayTeamLabel}</Text>
                </View>
              </View>

              <View style={styles.completionInfoGrid}>
                <View style={styles.completionInfoItem}>
                  <Ionicons name="calendar-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.completionInfoLabel}>Fecha y hora:</Text>
                  <Text style={styles.completionInfoVal}>{finishedMatchContext?.finishedAtFormatted || '5 de agosto de 2026 · 11:25 hs'}</Text>
                </View>

                <View style={styles.completionInfoItem}>
                  <Ionicons name="shield-checkmark-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.completionInfoLabel}>Equipo:</Text>
                  <Text style={styles.completionInfoVal}>{`CD Jesuitas (${teamName})`}</Text>
                </View>

                <View style={styles.completionInfoItem}>
                  <Ionicons name="people-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.completionInfoLabel}>Rival:</Text>
                  <Text style={styles.completionInfoVal}>{rivalName}</Text>
                </View>
              </View>

              {/* TRES ACCIONES */}
              <View style={styles.completionActionsCol}>
                {/* 1. BOTÓN PRINCIPAL: GIGANTE Y EL MÁS DESTACADO */}
                <TouchableOpacity 
                  style={styles.btnGenerarActaPrincipal} 
                  onPress={handleOpenActaForFinishedMatch}
                  activeOpacity={0.85}
                >
                  <Text style={styles.btnGenerarActaEmoji}>📝</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.btnGenerarActaTitle}>Generar Acta</Text>
                    <Text style={styles.btnGenerarActaSub}>Abrir el acta oficial correspondiente a este partido recién finalizado</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={24} color={colors.navyDark} />
                </TouchableOpacity>

                {/* 2. BOTÓN SECUNDARIO: VER RESUMEN DEL PARTIDO */}
                <TouchableOpacity 
                  style={styles.btnVerResumenSecundario} 
                  onPress={() => setShowMatchSummaryModal(true)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="document-text-outline" size={18} color={colors.skyGlow} />
                  <Text style={styles.btnVerResumenTxt}>📄 Ver Resumen del Partido</Text>
                </TouchableOpacity>

                {/* 3. BOTÓN TERCIARIO: VOLVER AL PANEL DEL DELEGADO */}
                <TouchableOpacity 
                  style={styles.btnVolverDashboardTerciario} 
                  onPress={() => router.push('/delegado' as any)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="home-outline" size={18} color={colors.textMuted} />
                  <Text style={styles.btnVolverDashboardTxt}>🏠 Volver al Panel del Delegado</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* LAYOUT PRINCIPAL */}
        <View style={isDesktop ? styles.desktopGrid : styles.mobileStack}>
          <View style={isDesktop ? styles.mainColDesktop : { width: '100%' }}>
            {/* CAMPO TÁCTICO */}
            <TacticalPitch 
              systemName={systemName} 
              isAway={isAwayMatch}
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
              onPress={handleOpenGeneralEventModal}
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
                        isAway={isAwayMatch}
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
        <Modal visible={showEarlySecondHalfConfirmModal} transparent animationType="fade" onRequestClose={() => setShowEarlySecondHalfConfirmModal(false)}>
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

        {/* MODAL CENTRADA Y SUPERPUESTA DE "NUEVO EVENTO GENERAL" */}
        <Modal 
          visible={showGeneralEventModal} 
          transparent 
          animationType="fade"
          onRequestClose={() => setShowGeneralEventModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalActionBox}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalPlayerHeaderLeft}>
                  <View style={styles.modalDorsalBadge}>
                    <Text style={{ fontSize: 18 }}>📋</Text>
                  </View>
                  <View>
                    <Text style={styles.modalPlayerName}>NUEVO EVENTO GENERAL</Text>
                    <Text style={styles.modalPlayerRole}>Categoría {matchCategory} · {homeTeamLabel} vs {awayTeamLabel}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.modalCloseIconBtn} onPress={() => setShowGeneralEventModal(false)}>
                  <Ionicons name="close" size={22} color={colors.white} />
                </TouchableOpacity>
              </View>

              {/* PASO 1: MENÚ DE OPCIONES DE EVENTOS GENERALES */}
              {generalEventStep === 'MENU' && (
                <View style={{ gap: 10 }}>
                  {/* GOL DEL RIVAL */}
                  <TouchableOpacity 
                    style={[styles.generalOptionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: colors.redCard }]} 
                    onPress={() => setGeneralEventStep('CONFIRM_RIVAL_GOAL')}
                  >
                    <View style={styles.icon3dBadge}>
                      <Text style={styles.icon3dEmoji}>⚽</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.generalOptionTitle, { color: colors.redCard }]}>Gol del rival</Text>
                      <Text style={styles.generalOptionSub}>Sumar 1 gol al marcador de {rivalName}</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 1. DESCANSO */}
                  <TouchableOpacity 
                    style={[styles.generalOptionBtn, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: colors.yellowCard }]} 
                    onPress={() => setGeneralEventStep('CONFIRM_REST')}
                  >
                    <View style={styles.icon3dBadge}>
                      <Text style={styles.icon3dEmoji}>🥤</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.generalOptionTitle, { color: colors.yellowCard }]}>1. Descanso</Text>
                      <Text style={styles.generalOptionSub}>Finalizar parte e iniciar cuenta atrás de descanso ({timeConfig.restDurationMinutes} min)</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 2. PAUSA DE HIDRATACIÓN */}
                  <TouchableOpacity 
                    style={[styles.generalOptionBtn, { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderColor: colors.skyPrimary }]} 
                    onPress={() => setGeneralEventStep('CONFIRM_HYDRATION')}
                  >
                    <View style={styles.icon3dBadge}>
                      <Text style={styles.icon3dEmoji}>💧</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.generalOptionTitle, { color: colors.skyGlow }]}>2. Pausa de hidratación</Text>
                      <Text style={styles.generalOptionSub}>Pausar temporalmente para la hidratación de los equipos</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 3. INCIDENCIA */}
                  <TouchableOpacity 
                    style={[styles.generalOptionBtn, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: colors.yellowCard }]} 
                    onPress={() => setGeneralEventStep('INCIDENCE_INPUT')}
                  >
                    <View style={styles.icon3dBadge}>
                      <Text style={styles.icon3dEmoji}>📝</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.generalOptionTitle, { color: colors.yellowCard }]}>3. Incidencia</Text>
                      <Text style={styles.generalOptionSub}>Añadir nota breve de suceso o incidencia en el timeline</Text>
                    </View>
                  </TouchableOpacity>

                  {/* 4. PAUSAR / REANUDAR PARTIDO */}
                  {matchPhase === 'PAUSED' ? (
                    <TouchableOpacity 
                      style={[styles.generalOptionBtn, { backgroundColor: 'rgba(52, 211, 153, 0.15)', borderColor: colors.emeraldGlow }]} 
                      onPress={() => setGeneralEventStep('CONFIRM_RESUME')}
                    >
                      <View style={styles.icon3dBadge}>
                        <Text style={styles.icon3dEmoji}>▶️</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.generalOptionTitle, { color: colors.emeraldGlow }]}>4. Reanudar partido</Text>
                        <Text style={styles.generalOptionSub}>Reanudar la marcha del tiempo transcurrido acumulado</Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={[styles.generalOptionBtn, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: colors.yellowCard }]} 
                      onPress={() => setGeneralEventStep('CONFIRM_PAUSE')}
                    >
                      <View style={styles.icon3dBadge}>
                        <Text style={styles.icon3dEmoji}>⏸️</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.generalOptionTitle, { color: colors.yellowCard }]}>4. Pausar partido</Text>
                        <Text style={styles.generalOptionSub}>Detener temporalmente el cronómetro general</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  {/* 5. FINALIZAR PARTIDO */}
                  <TouchableOpacity 
                    style={[styles.generalOptionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: colors.redCard }]} 
                    onPress={() => setGeneralEventStep('CONFIRM_FINISH')}
                  >
                    <View style={styles.icon3dBadge}>
                      <Text style={styles.icon3dEmoji}>🏁</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.generalOptionTitle, { color: colors.redCard }]}>5. Finalizar partido</Text>
                      <Text style={styles.generalOptionSub}>Dar por concluido el partido definitivamente</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}

              {/* CONFIRMACIÓN: GOL DEL RIVAL */}
              {generalEventStep === 'CONFIRM_RIVAL_GOAL' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>⚽</Text>
                  <Text style={styles.confirmActionTitle}>¿Confirmar gol del equipo rival?</Text>
                  <Text style={styles.confirmActionDesc}>
                    Se sumará 1 gol al marcador del rival ({rivalName}) y se registrará automáticamente en el minuto actual ({getMinuteText()}).
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.redCard }]} onPress={handleConfirmRivalGoal}>
                      <Text style={[styles.confirmBtnOkTxt, { color: colors.white }]}>Confirmar Gol Rival</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* CONFIRMACIÓN: DESCANSO */}
              {generalEventStep === 'CONFIRM_REST' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>🥤</Text>
                  <Text style={styles.confirmActionTitle}>¿Confirmar el inicio del descanso?</Text>
                  <Text style={styles.confirmActionDesc}>
                    Se dará por finalizada la 1ª parte y comenzará la cuenta atrás de descanso configurada para {matchCategory} ({timeConfig.restDurationMinutes} min).
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.yellowCard }]} onPress={() => { setShowGeneralEventModal(false); handleGoToHalfTime(); }}>
                      <Text style={[styles.confirmBtnOkTxt, { color: colors.navyDark }]}>Iniciar Descanso</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* CONFIRMACIÓN: PAUSA DE HIDRATACIÓN */}
              {generalEventStep === 'CONFIRM_HYDRATION' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>💧</Text>
                  <Text style={styles.confirmActionTitle}>¿Pausa de Hidratación?</Text>
                  <Text style={styles.confirmActionDesc}>
                    Se detendrán los cronómetros temporalmente y se añadirá la anotación de hidratación en la línea temporal.
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmBtnOk} onPress={handleConfirmHydrationPause}>
                      <Text style={styles.confirmBtnOkTxt}>Confirmar Pausa</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* FORMULARIO MINI DE INCIDENCIA */}
              {generalEventStep === 'INCIDENCE_INPUT' && (
                <View style={styles.subSelectWrapper}>
                  <Text style={styles.subSelectTitle}>REGISTRAR INCIDENCIA</Text>
                  <Text style={{ color: colors.textMuted, fontSize: 11, marginBottom: 8 }}>Escribe una breve descripción del suceso o nota para el acta interna:</Text>
                  <TextInput 
                    style={styles.incidenceTextInput} 
                    placeholder="Ej. Interrupción por lluvia / Nota arbitral..."
                    placeholderTextColor="#64748B"
                    value={incidenceText}
                    onChangeText={setIncidenceText}
                    multiline
                    numberOfLines={3}
                  />
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.yellowCard }]} onPress={handleSaveIncidence}>
                      <Text style={[styles.confirmBtnOkTxt, { color: colors.navyDark }]}>Registrar Incidencia</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* CONFIRMACIÓN: PAUSAR PARTIDO */}
              {generalEventStep === 'CONFIRM_PAUSE' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>⏸️</Text>
                  <Text style={styles.confirmActionTitle}>¿Pausar el Partido?</Text>
                  <Text style={styles.confirmActionDesc}>
                    Se detendrá el cronómetro reglamentario/añadido y los tiempos individuales. Podrás reanudarlo cuando desees.
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.yellowCard }]} onPress={handlePauseMatch}>
                      <Text style={[styles.confirmBtnOkTxt, { color: colors.navyDark }]}>Pausar Partido</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* CONFIRMACIÓN: REANUDAR PARTIDO */}
              {generalEventStep === 'CONFIRM_RESUME' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>▶️</Text>
                  <Text style={styles.confirmActionTitle}>¿Reanudar el Partido?</Text>
                  <Text style={styles.confirmActionDesc}>
                    El cronómetro se reanudará desde el minuto acumulado ({formatTimer(matchSeconds)}).
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmBtnOk} onPress={handleResumeMatch}>
                      <Text style={styles.confirmBtnOkTxt}>Reanudar Partido</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* CONFIRMACIÓN: FINALIZAR PARTIDO */}
              {generalEventStep === 'CONFIRM_FINISH' && (
                <View style={styles.confirmActionWrapper}>
                  <Text style={styles.big3dIcon}>🏁</Text>
                  <Text style={styles.confirmActionTitle}>¿Finalizar Partido Definitivamente?</Text>
                  <Text style={styles.confirmActionDesc}>
                    Se darán por concluidos los tiempos del partido. Se registrará el evento final en la línea temporal.
                  </Text>
                  <View style={styles.confirmActionBtnRow}>
                    <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setGeneralEventStep('MENU')}>
                      <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.redCard }]} onPress={handleFinishMatch}>
                      <Text style={[styles.confirmBtnOkTxt, { color: colors.white }]}>Finalizar Partido</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        </Modal>

        {/* MODAL PRINCIPAL CENTRADA DE ACCIONES DEL JUGADOR (BLOQUEADO E INTRACTABLE) */}
        <Modal 
          visible={playerAction.visible && Boolean(playerAction.player)} 
          transparent 
          animationType="fade"
          onRequestClose={closePlayerActionPanel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalActionBox}>
              {playerAction.player && (
                <>
                  <View style={styles.modalHeaderRow}>
                    <View style={styles.modalPlayerHeaderLeft}>
                      <View style={styles.modalDorsalBadge}>
                        <Text style={styles.modalDorsalTxt}>#{playerAction.player.dorsal}</Text>
                      </View>
                      <View>
                        <Text style={styles.modalPlayerName}>{playerAction.player.name}</Text>
                        <Text style={styles.modalPlayerRole}>{playerAction.player.role} · Cadete B</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.modalCloseIconBtn} onPress={closePlayerActionPanel}>
                      <Ionicons name="close" size={22} color={colors.white} />
                    </TouchableOpacity>
                  </View>

                  {playerAction.step === 'MENU' && (
                    <View style={styles.actionGridContainer}>
                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(52, 211, 153, 0.15)', borderColor: colors.emeraldGlow }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, action: 'GOAL', step: 'CONFIRM_GOAL' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>⚽</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.emeraldGlow }]}>Gol</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderColor: colors.skyPrimary }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, step: 'PENALTY_MENU' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>🎯</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.skyGlow }]}>Penalti</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: colors.yellowCard }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, action: 'YELLOW', step: 'CONFIRM_YELLOW' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>🟨</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.yellowCard }]}>Tarjeta amarilla</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: colors.redCard }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, action: 'RED', step: 'CONFIRM_RED' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>🟥</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.redCard }]}>Tarjeta roja</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(236, 72, 153, 0.15)', borderColor: colors.pinkMedical }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, action: 'INJURY', step: 'CONFIRM_INJURY' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>🚑</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.pinkMedical }]}>Lesión</Text>
                      </TouchableOpacity>

                      <TouchableOpacity 
                        style={[styles.actionGridCardBtn, { backgroundColor: 'rgba(56, 189, 248, 0.15)', borderColor: colors.skyPrimary }]} 
                        onPress={() => setPlayerAction(prev => ({ ...prev, action: 'SUB', step: 'CONFIRM_SUB' }))}
                      >
                        <View style={styles.icon3dBadge}>
                          <Text style={styles.icon3dEmoji}>🔄</Text>
                        </View>
                        <Text style={[styles.actionGridCardTxt, { color: colors.skyPrimary }]}>Sustitución</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {playerAction.step === 'PENALTY_MENU' && (
                    <View style={styles.penaltySubMenuWrapper}>
                      <Text style={styles.subSelectTitle}>OPCIONES DE PENALTI</Text>
                      <View style={{ gap: 10, marginVertical: 8 }}>
                        <TouchableOpacity 
                          style={[styles.penaltyOptionBtn, { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: colors.redCard }]} 
                          onPress={() => setPlayerAction(prev => ({ ...prev, action: 'PENALTY_MISSED', step: 'CONFIRM_PENALTY_MISSED' }))}
                        >
                          <Text style={styles.penaltyOptionEmoji}>❌</Text>
                          <Text style={[styles.penaltyOptionTxt, { color: colors.redCard }]}>1. Penalti fallado</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                          style={[styles.penaltyOptionBtn, { backgroundColor: 'rgba(52, 211, 153, 0.15)', borderColor: colors.emeraldGlow }]} 
                          onPress={() => setPlayerAction(prev => ({ ...prev, action: 'PENALTY_SCORED', step: 'CONFIRM_PENALTY_SCORED' }))}
                        >
                          <Text style={styles.penaltyOptionEmoji}>⚽</Text>
                          <Text style={[styles.penaltyOptionTxt, { color: colors.emeraldGlow }]}>2. Penalti marcado</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity style={[styles.confirmBtnCancel, { marginTop: 8 }]} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                        <Text style={styles.confirmBtnCancelTxt}>Volver al menú</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_GOAL' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>⚽</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Gol Propio?</Text>
                      <Text style={styles.confirmActionDesc}>
                        Se registrará un gol a favor de Cadete B anotado por #{playerAction.player.dorsal} {playerAction.player.name}.
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtnOk} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'ASSIST_SELECT' }))}>
                          <Text style={styles.confirmBtnOkTxt}>Confirmar e indicar Asistencia</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'ASSIST_SELECT' && (
                    <View style={styles.subSelectWrapper}>
                      <Text style={styles.subSelectTitle}>¿QUIÉN REALIZÓ LA ASISTENCIA?</Text>
                      <TouchableOpacity style={styles.noAssistBtn} onPress={() => handleSelectAssistPlayer(null)}>
                        <Text style={styles.noAssistBtnTxt}>Sin asistencia directa</Text>
                      </TouchableOpacity>
                      <ScrollView style={{ maxHeight: 180 }}>
                        {pitchPlayers.filter(p => p.dorsal !== playerAction.player?.dorsal).map(assister => (
                          <TouchableOpacity key={`ast-${assister.dorsal}`} style={styles.subOptionRow} onPress={() => handleSelectAssistPlayer(assister)}>
                            <Text style={styles.subOptionDorsal}>#{assister.dorsal}</Text>
                            <Text style={styles.subOptionName}>{assister.name} ({assister.role})</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_PENALTY_SCORED' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>🎯</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Gol de Penalti?</Text>
                      <Text style={styles.confirmActionDesc}>
                        Se sumará 1 gol al marcador anotado desde el punto de penalti por #{playerAction.player.dorsal} {playerAction.player.name}. No solicita asistencia.
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'PENALTY_MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmBtnOk} onPress={handleConfirmPenaltyScored}>
                          <Text style={styles.confirmBtnOkTxt}>Confirmar Gol de Penalti</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_PENALTY_MISSED' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>❌</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Penalti Fallado?</Text>
                      <Text style={styles.confirmActionDesc}>
                        Se registrará en el timeline el penalti fallado por #{playerAction.player.dorsal} {playerAction.player.name}. El marcador no cambiará.
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'PENALTY_MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.redCard }]} onPress={handleConfirmPenaltyMissed}>
                          <Text style={[styles.confirmBtnOkTxt, { color: colors.white }]}>Registrar Penalti Fallado</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_YELLOW' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>🟨</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Tarjeta Amarilla?</Text>
                      <Text style={styles.confirmActionDesc}>
                        {getPStats(playerAction.player.id || playerAction.player.dorsal).yellowCards === 0
                          ? `Se amonestará con tarjeta amarilla a #${playerAction.player.dorsal} ${playerAction.player.name}.`
                          : `⚠️ ATENCIÓN: #${playerAction.player.dorsal} ${playerAction.player.name} ya acumula 1 tarjeta amarilla. Confirmar esta acción provocará su EXPULSIÓN AUTOMÁTICA por doble amonestación.`
                        }
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.yellowCard }]} onPress={handleConfirmYellowCard}>
                          <Text style={[styles.confirmBtnOkTxt, { color: colors.navyDark }]}>Confirmar Amarilla</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_RED' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>🟥</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Tarjeta Roja?</Text>
                      <Text style={styles.confirmActionDesc}>
                        🚨 ATENCIÓN: Se expulsará directamente a #${playerAction.player.dorsal} ${playerAction.player.name} (${playerAction.player.role}). El equipo disputará el resto del partido con {pitchPlayers.length - 1} jugadores.
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.confirmBtnOk, { backgroundColor: colors.redCard }]} onPress={handleConfirmRedCard}>
                          <Text style={[styles.confirmBtnOkTxt, { color: colors.white }]}>Confirmar Roja Directa</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_INJURY' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>🚑</Text>
                      <Text style={styles.confirmActionTitle}>¿Confirmar Lesión de Jugador?</Text>
                      <Text style={styles.confirmActionDesc}>
                        Se registrará la lesión de #${playerAction.player.dorsal} ${playerAction.player.name}. Se abrirá el selector para sustituirlo.
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={[styles.confirmBtnOk, { backgroundColor: colors.pinkMedical }]} 
                          onPress={() => setPlayerAction(prev => ({ ...prev, action: 'INJURY', step: 'SUB_SELECT' }))}
                        >
                          <Text style={[styles.confirmBtnOkTxt, { color: colors.white }]}>Seleccionar Suplente</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'CONFIRM_SUB' && (
                    <View style={styles.confirmActionWrapper}>
                      <Text style={styles.big3dIcon}>🔄</Text>
                      <Text style={styles.confirmActionTitle}>¿Realizar Sustitución?</Text>
                      <Text style={styles.confirmActionDesc}>
                        ¿Deseas reemplazar a #${playerAction.player.dorsal} ${playerAction.player.name} por un suplente del banquillo?
                      </Text>
                      <View style={styles.confirmActionBtnRow}>
                        <TouchableOpacity style={styles.confirmBtnCancel} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                          <Text style={styles.confirmBtnCancelTxt}>Volver</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          style={styles.confirmBtnOk} 
                          onPress={() => setPlayerAction(prev => ({ ...prev, action: 'SUB', step: 'SUB_SELECT' }))}
                        >
                          <Text style={styles.confirmBtnOkTxt}>Seleccionar Suplente</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}

                  {playerAction.step === 'SUB_SELECT' && (
                    <View style={styles.subSelectWrapper}>
                      <Text style={styles.subSelectTitle}>
                        {playerAction.action === 'INJURY' ? 'SUPLENTE QUE INGRESA POR LESIÓN' : 'SUPLENTE QUE INGRESA AL CAMPO'}
                      </Text>
                      {availableBenchPlayers.length === 0 ? (
                        <Text style={styles.emptyBenchTxt}>No hay suplentes disponibles en el banquillo.</Text>
                      ) : (
                        <ScrollView style={{ maxHeight: 200 }}>
                          {availableBenchPlayers.map(sub => (
                            <TouchableOpacity key={`sub-${sub.dorsal}`} style={styles.subOptionRow} onPress={() => handleConfirmSub(sub)}>
                              <Text style={styles.subOptionDorsal}>#{sub.dorsal}</Text>
                              <Text style={styles.subOptionName}>{sub.name} ({sub.role})</Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      )}
                      <TouchableOpacity style={[styles.confirmBtnCancel, { marginTop: 10 }]} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                        <Text style={styles.confirmBtnCancelTxt}>Volver al menú</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        </Modal>

        {/* MODAL DE RESUMEN COMPLETO DEL PARTIDO */}
        <Modal
          visible={showMatchSummaryModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowMatchSummaryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalActionBox, { maxHeight: '85%' }]}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalPlayerHeaderLeft}>
                  <View style={styles.modalDorsalBadge}>
                    <Text style={{ fontSize: 18 }}>📄</Text>
                  </View>
                  <View>
                    <Text style={styles.modalPlayerName}>RESUMEN DEL ENCUENTRO</Text>
                    <Text style={styles.modalPlayerRole}>{homeTeamLabel} vs {awayTeamLabel}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.modalCloseIconBtn} onPress={() => setShowMatchSummaryModal(false)}>
                  <Ionicons name="close" size={22} color={colors.white} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ marginTop: 12 }} showsVerticalScrollIndicator={false}>
                <View style={styles.completionScoreBox}>
                  <Text style={styles.completionScoreLabel}>RESULTADO FINAL</Text>
                  <Text style={{ color: colors.emeraldGlow, fontSize: 26, fontWeight: '900' }}>
                    {homeTeamLabel} {homeScore} - {awayScore} {awayTeamLabel}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
                    {finishedMatchContext?.finishedAtFormatted || 'Partido finalizado'}
                  </Text>
                </View>

                <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
                  <Ionicons name="time-outline" size={18} color={colors.skyGlow} />
                  <Text style={styles.sectionTitleTxt}>EVENTOS Y LÍNEA TEMPORAL ({events.length})</Text>
                </View>

                {events.length === 0 ? (
                  <Text style={styles.emptyTimelineTxt}>Sin eventos registrados</Text>
                ) : (
                  <View style={{ gap: 8, marginTop: 6 }}>
                    {events.map((ev) => (
                      <View key={ev.id} style={styles.timelineItem}>
                        <Text style={styles.timelineTime}>{ev.minute}</Text>
                        <View style={[styles.timelineIconDot, { backgroundColor: ev.color }]}>
                          <Ionicons name={ev.icon as any} size={14} color={colors.navyDark} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.timelineTitle}>{ev.title}</Text>
                          <Text style={styles.timelineDesc}>{ev.desc}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity 
                style={[styles.confirmBtnCancel, { marginTop: 16, width: '100%', alignItems: 'center' }]} 
                onPress={() => setShowMatchSummaryModal(false)}
              >
                <Text style={styles.confirmBtnCancelTxt}>Cerrar Resumen</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: colors.navyDark },
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 40 },
  contentDesktop: { maxWidth: 1200, alignSelf: 'center', width: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.navyDeep, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 18, fontWeight: '900', letterSpacing: 0.5 },
  subtitleTxt: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  resetDemoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.navyDeep, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  resetDemoBtnTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },

  suspensionBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1.5, borderColor: '#EF4444', borderRadius: 12, padding: 14, marginBottom: 16 },
  suspensionTitle: { color: '#EF4444', fontSize: 14, fontWeight: '900' },
  suspensionDesc: { color: colors.white, fontSize: 11, marginTop: 2 },

  scoreboardCard: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 16 },
  liveBadgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 },
  liveRedDot: { width: 8, height: 8, borderRadius: 4 },
  liveBadgeTxt: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamScoreBox: { flex: 1, alignItems: 'center' },
  teamScoreName: { color: colors.white, fontSize: 14, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  scoreDigit: { color: colors.white, fontSize: 36, fontWeight: '900' },

  timerBox: { alignItems: 'center', flex: 1.2 },
  timerTxt: { color: colors.emeraldGlow, fontSize: 26, fontWeight: '900', letterSpacing: 1 },
  timerSubTxt: { color: colors.textMuted, fontSize: 10, marginTop: 2, fontWeight: '700' },
  extraTimeBadge: { backgroundColor: 'rgba(245, 158, 11, 0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 2 },
  extraTimeBadgeTxt: { color: colors.yellowCard, fontSize: 10, fontWeight: '900' },
  restLabelTxt: { color: colors.yellowCard, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  restTimerTxt: { color: colors.yellowCard, fontSize: 24, fontWeight: '900', marginVertical: 2 },
  restFinishedTxt: { color: colors.emeraldGlow, fontSize: 10, fontWeight: '800' },

  timerControlBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  timerControlBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  desktopGrid: { flexDirection: 'row', gap: 16 },
  mobileStack: { gap: 16 },
  mainColDesktop: { flex: 1.6 },
  sidebarColDesktop: { flex: 1 },

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
  timelineIconDot: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  timelineTitle: { color: colors.white, fontSize: 12, fontWeight: '800' },
  timelineDesc: { color: colors.textMuted, fontSize: 11, marginTop: 1 },

  // PANTALLA DE CIERRE DEL ENCUENTRO (PARTIDO FINALIZADO)
  matchCompletionContainer: { marginVertical: 16 },
  matchCompletionCard: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 20, borderWidth: 2, borderColor: colors.emeraldGlow, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8, gap: 16 },
  completionSuccessHeader: { alignItems: 'center', gap: 6 },
  completionIconBadge: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(52, 211, 153, 0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.emeraldGlow },
  completionSuccessTitle: { color: colors.emeraldGlow, fontSize: 18, fontWeight: '900', textAlign: 'center' },
  completionSuccessSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center' },
  completionScoreBox: { backgroundColor: colors.navyCard, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border, alignItems: 'center', gap: 8 },
  completionScoreLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  completionScoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, width: '100%' },
  completionTeamName: { color: colors.white, fontSize: 14, fontWeight: '800', flex: 1, textAlign: 'center' },
  completionScoreBadge: { backgroundColor: colors.navyDark, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: colors.emeraldGlow },
  completionScoreDigits: { color: colors.emeraldGlow, fontSize: 22, fontWeight: '900' },
  completionInfoGrid: { backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 12, padding: 12, gap: 8, borderWidth: 1, borderColor: colors.border },
  completionInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  completionInfoLabel: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  completionInfoVal: { color: colors.white, fontSize: 12, fontWeight: '800', flex: 1 },
  completionActionsCol: { gap: 12, marginTop: 8 },
  btnGenerarActaPrincipal: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.emeraldGlow, paddingHorizontal: 18, paddingVertical: 16, borderRadius: 14, shadowColor: '#34D399', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 },
  btnGenerarActaEmoji: { fontSize: 28 },
  btnGenerarActaTitle: { color: colors.navyDark, fontSize: 17, fontWeight: '900', letterSpacing: 0.3 },
  btnGenerarActaSub: { color: '#064E3B', fontSize: 11, fontWeight: '700', marginTop: 2 },
  btnVerResumenSecundario: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.skyPrimary },
  btnVerResumenTxt: { color: colors.skyGlow, fontSize: 13, fontWeight: '800' },
  btnVolverDashboardTerciario: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(255, 255, 255, 0.05)', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  btnVolverDashboardTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 8, 20, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  confirmBox: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 20, maxWidth: 400, width: '100%', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  confirmBoxTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 10 },
  confirmBoxDesc: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18 },
  confirmBtnRow: { flexDirection: 'row', gap: 10, marginTop: 16, width: '100%' },
  confirmBtnCancel: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: colors.navyCard, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  confirmBtnCancelTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },
  confirmBtnOk: { flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: colors.skyPrimary, alignItems: 'center' },
  confirmBtnOkTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  modalActionBox: { backgroundColor: colors.navyDeep, borderRadius: 20, padding: 20, width: '92%', maxWidth: 440, borderWidth: 1.5, borderColor: colors.skyPrimary, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 12 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalPlayerHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalDorsalBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(56, 189, 248, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalDorsalTxt: { color: colors.skyGlow, fontSize: 16, fontWeight: '900' },
  modalPlayerName: { color: colors.white, fontSize: 15, fontWeight: '900' },
  modalPlayerRole: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  modalCloseIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },

  generalOptionBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, borderWidth: 1.5 },
  generalOptionTitle: { fontSize: 13, fontWeight: '900' },
  generalOptionSub: { color: colors.textMuted, fontSize: 10, marginTop: 1 },

  incidenceTextInput: { backgroundColor: colors.navyCard, borderRadius: 10, borderWidth: 1, borderColor: colors.border, color: colors.white, padding: 12, fontSize: 12, textAlignVertical: 'top', minHeight: 70, marginVertical: 6 },

  actionGridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between' },
  actionGridCardBtn: { width: '48%', paddingVertical: 14, paddingHorizontal: 10, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  icon3dBadge: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(2, 8, 20, 0.4)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.12)' },
  icon3dEmoji: { fontSize: 20 },
  actionGridCardTxt: { fontSize: 12, fontWeight: '900', textAlign: 'center' },

  penaltySubMenuWrapper: { gap: 10 },
  penaltyOptionBtn: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 12, borderWidth: 1.5 },
  penaltyOptionEmoji: { fontSize: 22 },
  penaltyOptionTxt: { fontSize: 14, fontWeight: '900' },

  confirmActionWrapper: { alignItems: 'center', paddingVertical: 8 },
  big3dIcon: { fontSize: 42, marginBottom: 4 },
  confirmActionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 6, textAlign: 'center' },
  confirmActionDesc: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18, paddingHorizontal: 4 },
  confirmActionBtnRow: { flexDirection: 'row', gap: 10, marginTop: 18, width: '100%' },

  subSelectWrapper: { gap: 10 },
  subSelectTitle: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 0.5, marginBottom: 4 },
  noAssistBtn: { backgroundColor: colors.navyCard, padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary, marginBottom: 4 },
  noAssistBtnTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '900' },
  subOptionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, backgroundColor: colors.navyCard, borderRadius: 10, marginBottom: 6, borderWidth: 1, borderColor: colors.border },
  subOptionDorsal: { color: colors.emeraldGlow, fontSize: 14, fontWeight: '900', width: 32 },
  subOptionName: { color: colors.white, fontSize: 13, fontWeight: '700' },
  emptyBenchTxt: { color: colors.textMuted, fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginVertical: 10 },
});
