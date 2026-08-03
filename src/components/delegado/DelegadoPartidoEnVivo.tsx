import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TacticalPitch, PitchPlayer } from './liveMatch/TacticalPitch';
import { TacticalJersey } from './liveMatch/TacticalJersey';

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
  goalkeeper: '#F59E0B',
  yellowCard: '#F59E0B',
  redCard: '#EF4444',
  purpleAI: '#A855F7',
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
  { id: '10', dorsal: '10', name: 'MARCOS', role: 'MP', xPercent: 50, yPercent: 33 },
  { id: '7', dorsal: '7', name: 'IVÁN', role: 'ED', xPercent: 82, yPercent: 34 },
  { id: '9', dorsal: '9', name: 'ALEJANDRO', role: 'DC', xPercent: 50, yPercent: 14 },
];

const INITIAL_BENCH: PitchPlayer[] = [
  { id: '13', dorsal: '13', name: 'ÁLVARO G.', isGoalkeeper: true, role: 'POR', xPercent: 0, yPercent: 0 },
  { id: '12', dorsal: '12', name: 'DIEGO', role: 'DEF', xPercent: 0, yPercent: 0 },
  { id: '14', dorsal: '14', name: 'SERGIO', role: 'MED', xPercent: 0, yPercent: 0 },
  { id: '15', dorsal: '15', name: 'ADRIÁN', role: 'MED', xPercent: 0, yPercent: 0 },
  { id: '16', dorsal: '16', name: 'IAN', role: 'DEL', xPercent: 0, yPercent: 0 },
  { id: '17', dorsal: '17', name: 'ÁLEX', role: 'DEL', xPercent: 0, yPercent: 0 },
];

interface PlayerStats {
  yellowCards: number;
  isRedCarded: boolean;
  isInjured: boolean;
  goals: number;
  assists: number;
}

export type MatchStatus = 'BEFORE_START' | 'IN_PROGRESS' | 'PAUSED' | 'FINISHED';

export type PlayerActionType = 'GOAL' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'INJURY';
export type PlayerActionStep = 'MENU' | 'SELECT_ASSIST' | 'SELECT_SUBSTITUTE' | 'CONFIRM';

export interface PlayerActionFlow {
  visible: boolean;
  player: PitchPlayer | null;
  action: PlayerActionType | null;
  step: PlayerActionStep;
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

export function DelegadoPartidoEnVivo() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // 1. ESTADO CENTRAL DEL CRONÓMETRO (BEFORE_START | IN_PROGRESS | PAUSED | FINISHED)
  const [matchStatus, setMatchStatus] = useState<MatchStatus>('BEFORE_START');
  const [matchSeconds, setMatchSeconds] = useState(0);

  // 2. MARCADOR Y REGLAMENTO
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [systemName, setSystemName] = useState('1-4-2-3-1');
  const [isSuspended, setIsSuspended] = useState(false);

  // 3. JUGADORES Y ESTADÍSTICAS
  const [pitchPlayers, setPitchPlayers] = useState<PitchPlayer[]>(INITIAL_STARTERS_14231);
  const [benchPlayers, setBenchPlayers] = useState<PitchPlayer[]>(INITIAL_BENCH);
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerStats>>({});

  // 4. TIMELINE DE EVENTOS CON ID ÚNICO Y CLAVE ESTABLE
  const [events, setEvents] = useState<any[]>([]);

  // 5. MÁQUINA DE ESTADOS ÚNICA PARA EL PANEL DE ACCIONES DE JUGADOR (RENDERIZADO DENTRO DEL ÁRBOL NORMAL SIN MODAL NI PORTAL)
  const [playerAction, setPlayerAction] = useState<PlayerActionFlow>(initialPlayerActionFlow);

  // Overlays independientes para Eventos Generales e IA (Renderizados en árbol normal sin Modal ni Portal)
  const [showAIReorgModal, setShowAIReorgModal] = useState(false);
  const [showGeneralEventModal, setShowGeneralEventModal] = useState(false);
  const [showIncidenceInput, setShowIncidenceInput] = useState(false);
  const [incidenceText, setIncidenceText] = useState('');

  // UNICO USEEFFECT DEL CRONÓMETRO DEPENDIENTE EXCLUSIVAMENTE DE matchStatus === 'IN_PROGRESS'
  useEffect(() => {
    if (matchStatus !== 'IN_PROGRESS' || isSuspended) return;

    const intervalId = setInterval(() => {
      setMatchSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [matchStatus, isSuspended]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getMinuteText = () => `${Math.floor(matchSeconds / 60)}'`;

  const getPStats = (id: string): PlayerStats => {
    return playerStats[id] || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
  };

  // CONTROL DEL CRONÓMETRO (START, PAUSE, RESUME, FINISH)
  const handleStartMatch = () => {
    if (matchStatus !== 'BEFORE_START') return;

    setMatchStatus('IN_PROGRESS');
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: "00'00\"",
        type: 'INICIO',
        title: 'Comienza el partido',
        desc: '1ª Parte en juego · 0-0',
        icon: 'play',
        color: colors.emeraldGlow,
      },
      ...prev,
    ]);
  };

  const handlePauseMatch = (reason = 'Pausa manual') => {
    if (matchStatus !== 'IN_PROGRESS') return;

    setMatchStatus('PAUSED');
    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'PAUSA',
        title: 'Partido pausado',
        desc: reason,
        icon: 'pause',
        color: colors.yellowCard,
      },
      ...prev,
    ]);
  };

  const handleResumeMatch = () => {
    if (matchStatus !== 'PAUSED') return;

    setMatchStatus('IN_PROGRESS');
    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'REANUDACION',
        title: 'Partido reanudado',
        desc: 'El cronómetro continúa en juego',
        icon: 'play-forward',
        color: colors.skyPrimary,
      },
      ...prev,
    ]);
  };

  const handleFinishMatch = () => {
    setMatchStatus('FINISHED');
    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'FIN',
        title: '🏁 Fin del partido',
        desc: `Resultado final: Cadete B ${homeScore} - ${awayScore} Torrent CF`,
        icon: 'checkmark-done-circle',
        color: colors.skyGlow,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  // REINICIAR SISTEMA COMPLETO
  const resetDemo = () => {
    setMatchStatus('BEFORE_START');
    setMatchSeconds(0);
    setHomeScore(0);
    setAwayScore(0);
    setSystemName('1-4-2-3-1');
    setIsSuspended(false);
    setPitchPlayers(INITIAL_STARTERS_14231);
    setBenchPlayers(INITIAL_BENCH);
    setPlayerStats({});
    setEvents([]);
    setPlayerAction(initialPlayerActionFlow);
    setShowAIReorgModal(false);
    setShowGeneralEventModal(false);
    setShowIncidenceInput(false);
    setIncidenceText('');
  };

  // GESTIÓN DEL PANEL SUPERPUESTO DE ACCIONES (ÚNICA FUNCIÓN DE APERTURA Y CIERRE)
  const handleOpenPlayerActionPanel = (player: PitchPlayer) => {
    if (isSuspended || matchStatus === 'FINISHED') return;
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

  // ACCIÓN 1: FLUJO DE SELECCIÓN DE ASISTENCIA Y CONFIRMACIÓN DE GOL PROPIO
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

      // 1. Actualizar Marcador
      setHomeScore(prev => prev + 1);

      // 2. Actualizar Estadísticas
      setPlayerStats(prev => {
        const currentScorerStats = prev[scorerId] || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
        const updated = {
          ...prev,
          [scorerId]: {
            ...currentScorerStats,
            goals: currentScorerStats.goals + 1,
          }
        };

        if (assistId && assister) {
          const currentAssistStats = prev[assistId] || { yellowCards: 0, isRedCarded: false, isInjured: false, goals: 0, assists: 0 };
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

      // 3. Registrar Evento en Timeline
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

  // ACCIÓN 2: TARJETA AMARILLA (O 2ª AMARILLA -> EXPULSIÓN AUTOMÁTICA)
  const handleConfirmYellowCard = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const player = playerAction.player;
      const pId = player.id || player.dorsal;
      const currentStats = getPStats(pId);

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

  // ACCIÓN 3: TARJETA ROJA DIRECTA
  const handleConfirmRedCard = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      processExpulsion(playerAction.player, false);
    } finally {
      closePlayerActionPanel();
    }
  };

  // ACCIÓN 4: LESIÓN
  const handleConfirmInjury = () => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const player = playerAction.player;
      const pId = player.id || player.dorsal;

      setPlayerStats(prev => ({
        ...prev,
        [pId]: { ...getPStats(pId), isInjured: true }
      }));

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: 'LESION',
          title: 'Atención médica / Lesión',
          desc: `#${player.dorsal} ${player.name} (${player.role})`,
          icon: 'medkit',
          color: colors.redCard,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  // ACCIÓN 5: SUSTITUCIÓN
  const handleConfirmSub = (substitutePlayer: PitchPlayer) => {
    if (playerAction.isSubmitting || !playerAction.player || isSuspended) return;

    try {
      setPlayerAction(prev => ({ ...prev, isSubmitting: true }));
      const minTxt = getMinuteText();
      const subOutPlayer = playerAction.player;

      setPitchPlayers(prev => prev.map(p => p.dorsal === subOutPlayer.dorsal ? {
        ...substitutePlayer,
        xPercent: subOutPlayer.xPercent,
        yPercent: subOutPlayer.yPercent,
        role: subOutPlayer.role,
      } : p));

      setBenchPlayers(prev => prev.map(b => b.dorsal === substitutePlayer.dorsal ? {
        ...subOutPlayer,
        xPercent: 0,
        yPercent: 0,
      } : b));

      setEvents(prev => [
        {
          id: `ev-${Date.now()}`,
          minute: minTxt,
          type: 'CAMBIO',
          title: 'Sustitución',
          desc: `Entra #${substitutePlayer.dorsal} ${substitutePlayer.name} ⇆ Sale #${subOutPlayer.dorsal} ${subOutPlayer.name}`,
          icon: 'swap-horizontal',
          color: colors.skyGlow,
        },
        ...prev,
      ]);
    } finally {
      closePlayerActionPanel();
    }
  };

  // PROCESAR EXPULSIÓN Y SUSPENSIÓN REGLAMENTARIA
  const processExpulsion = (player: PitchPlayer, isSecondYellow: boolean) => {
    const minTxt = getMinuteText();
    const pId = player.id || player.dorsal;

    setPlayerStats(prev => ({
      ...prev,
      [pId]: { ...getPStats(pId), isRedCarded: true }
    }));

    const nextPitch = pitchPlayers.filter(p => p.dorsal !== player.dorsal);
    setPitchPlayers(nextPitch);

    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'ROJA',
        title: isSecondYellow ? '2ª Amarilla → Expulsión' : 'Tarjeta roja directa',
        desc: `#${player.dorsal} ${player.name} (${player.role})`,
        icon: 'square',
        color: colors.redCard,
      },
      ...prev,
    ]);

    if (nextPitch.length < 7) {
      setIsSuspended(true);
      setMatchStatus('FINISHED');
      setEvents(prev => [
        {
          id: `ev-${Date.now() + 1}`,
          minute: minTxt,
          type: 'SUSPENSION',
          title: '🚨 PARTIDO SUSPENDIDO',
          desc: 'El equipo no dispone del número mínimo reglamentario de jugadores.',
          icon: 'alert-circle',
          color: colors.redCard,
        },
        ...prev,
      ]);
    }
  };

  // EVENTOS GENERALES
  const handleConfirmAwayGoal = () => {
    if (isSuspended) return;
    const minTxt = getMinuteText();
    setAwayScore(prev => prev + 1);
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'GOL_RIVAL',
        title: 'Gol de Torrent CF',
        desc: 'Gol del equipo visitante',
        icon: 'football',
        color: colors.redCard,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handleGeneralHydration = () => {
    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'HIDRATACION',
        title: '🥤 Pausa de hidratación',
        desc: 'Pausa oficial acordada por el árbitro',
        icon: 'water',
        color: colors.skyPrimary,
      },
      ...prev,
    ]);
    setShowGeneralEventModal(false);
  };

  const handleGeneralBreak = () => {
    handlePauseMatch('Descanso del partido');
    setShowGeneralEventModal(false);
  };

  const handleGeneralResume = () => {
    handleResumeMatch();
    setShowGeneralEventModal(false);
  };

  const handleAddIncidence = () => {
    if (!incidenceText.trim()) return;
    const minTxt = getMinuteText();
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'INCIDENCIA',
        title: '⚠️ Incidencia registrada',
        desc: incidenceText.trim(),
        icon: 'warning',
        color: colors.yellowCard,
      },
      ...prev,
    ]);
    setIncidenceText('');
    setShowIncidenceInput(false);
    setShowGeneralEventModal(false);
  };

  // IA TÁCTICA
  const getAITacticalProposals = () => {
    const count = pitchPlayers.length;
    if (count === 10) return [{ name: '4-4-1', desc: 'Defensiva compacta con 1 delantero referencia' }, { name: '4-3-2', desc: 'Presión alta con doble mediapunta' }, { name: '5-3-1', desc: 'Bloque bajo con 5 defensas' }];
    if (count === 9) return [{ name: '4-3-1', desc: 'Estructura sólida 4 defensas y 3 medios' }, { name: '3-4-1', desc: 'Banda activa' }];
    return [{ name: '3-3-1', desc: 'Cierre central y velocidad en punta' }];
  };

  const applyAIProposal = (proposal: { name: string; desc: string }) => {
    const minTxt = getMinuteText();
    setSystemName(`${proposal.name} (IA)`);
    setEvents(prev => [
      {
        id: `ev-${Date.now()}`,
        minute: minTxt,
        type: 'IA',
        title: '🧠 Reorganización IA aplicada',
        desc: `Esquema táctico ${proposal.name} adaptado`,
        icon: 'git-compare',
        color: colors.purpleAI,
      },
      ...prev,
    ]);
    setShowAIReorgModal(false);
  };

  // HELPER PARA BADGE
  const getBadgeInfo = () => {
    switch (matchStatus) {
      case 'BEFORE_START':
        return { label: 'ANTES DEL INICIO', color: colors.skyPrimary };
      case 'IN_PROGRESS':
        return { label: '1ª PARTE · EN JUEGO', color: colors.redCard };
      case 'PAUSED':
        return { label: 'PARTIDO PAUSADO', color: colors.yellowCard };
      case 'FINISHED':
        return { label: isSuspended ? 'SUSPENDIDO' : 'PARTIDO FINALIZADO', color: colors.textMuted };
    }
  };

  const badgeInfo = getBadgeInfo();

  // HELPER PARA BOTÓN DE CONTROL DEL CRONÓMETRO
  const getTimerControlProps = () => {
    if (matchStatus === 'BEFORE_START') {
      return {
        onPress: handleStartMatch,
        bgColor: colors.emeraldGlow,
        icon: 'play',
        label: 'Empezar partido',
        disabled: false,
      };
    }
    if (matchStatus === 'IN_PROGRESS') {
      return {
        onPress: () => handlePauseMatch('Pausa manual'),
        bgColor: colors.yellowCard,
        icon: 'pause',
        label: 'Pausar partido',
        disabled: false,
      };
    }
    if (matchStatus === 'PAUSED') {
      return {
        onPress: handleResumeMatch,
        bgColor: colors.skyPrimary,
        icon: 'play-forward',
        label: 'Reanudar partido',
        disabled: false,
      };
    }
    return null;
  };

  const timerBtnProps = getTimerControlProps();

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
            <Text style={styles.subtitleTxt}>Liga Preferente · Cadete B vs Torrent CF</Text>
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

        {/* MARCADOR SUPERIOR */}
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
              <Text style={styles.timerTxt}>{formatTimer(matchSeconds)}</Text>
              <Text style={styles.timerSubTxt}>
                {matchStatus === 'BEFORE_START' ? 'Sin comenzar' : `Minuto ${getMinuteText()}`}
              </Text>

              {timerBtnProps && (
                <TouchableOpacity 
                  key="timer-control-btn-stable"
                  style={[styles.timerControlBtn, { backgroundColor: timerBtnProps.bgColor }]} 
                  onPress={timerBtnProps.onPress}
                  disabled={timerBtnProps.disabled}
                  activeOpacity={0.8}
                >
                  <Ionicons name={timerBtnProps.icon as any} size={14} color={colors.navyDark} />
                  <Text style={styles.timerControlBtnTxt}>{timerBtnProps.label}</Text>
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
            {pitchPlayers.length < 11 && !isSuspended && matchStatus !== 'FINISHED' && (
              <TouchableOpacity style={styles.aiReorgTriggerBtn} onPress={() => setShowAIReorgModal(true)}>
                <Text style={{ fontSize: 18 }}>🧠</Text>
                <Text style={styles.aiReorgTriggerTxt}>Generar reorganización táctica IA ({pitchPlayers.length} jugadores)</Text>
              </TouchableOpacity>
            )}

            {/* CAMPO TÁCTICO */}
            <TacticalPitch 
              systemName={systemName} 
              starters={pitchPlayers} 
              onPlayerPress={(p) => handleOpenPlayerActionPanel(p)} 
            />
          </View>

          <View style={isDesktop ? styles.sidebarColDesktop : { width: '100%' }}>
            {/* BOTÓN ÚNICO DE EVENTOS GENERALES */}
            <TouchableOpacity 
              style={[styles.generalEventTriggerBtn, (isSuspended || matchStatus === 'FINISHED') && { opacity: 0.5 }]}
              disabled={isSuspended || matchStatus === 'FINISHED'}
              onPress={() => setShowGeneralEventModal(true)}
            >
              <Ionicons name="add-circle-outline" size={18} color={colors.navyDark} />
              <Text style={styles.generalEventTriggerTxt}>+ NUEVO EVENTO GENERAL</Text>
            </TouchableOpacity>

            {/* BANQUILLO */}
            <View style={styles.sectionHeaderRow}>
              <Ionicons name="people-outline" size={20} color={colors.skyPrimary} />
              <Text style={styles.sectionTitleTxt}>BANQUILLO Y SUPLENTES ({benchPlayers.length})</Text>
            </View>
            <View style={styles.benchCard}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.benchScrollContent}>
                {benchPlayers.map((player) => (
                  <View key={`bench-${player.dorsal}`} style={styles.benchJerseyWrapper}>
                    <TacticalJersey 
                      dorsal={player.dorsal} 
                      name={player.name} 
                      isGoalkeeper={player.isGoalkeeper} 
                      onPress={() => handleOpenPlayerActionPanel(player)} 
                      scale={0.9} 
                    />
                  </View>
                ))}
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
      </ScrollView>

      {/* ========================================================================= */}
      {/* NUEVO PANEL DE ACCIONES DE JUGADORES (RENDERIZADO DENTRO DEL ÁRBOL REACT) */}
      {/* ========================================================================= */}
      {playerAction.visible && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity 
            style={styles.overlayBackdrop} 
            activeOpacity={1} 
            onPress={() => !playerAction.isSubmitting && closePlayerActionPanel()} 
          />
          
          <View style={styles.panelCard}>
            {/* CABECERA DE DORSAL Y JUGADOR */}
            <View style={styles.panelPlayerHeader}>
              <View style={[styles.panelPlayerBadge, { backgroundColor: playerAction.player?.isGoalkeeper ? colors.goalkeeper : colors.skyPrimary }]}>
                <Text style={styles.panelPlayerBadgeTxt}>#{playerAction.player?.dorsal}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.panelPlayerName}>{playerAction.player?.name}</Text>
                <Text style={styles.panelPlayerRole}>Posición: {playerAction.player?.role}</Text>
              </View>
              <TouchableOpacity style={styles.panelCloseIconBtn} onPress={() => !playerAction.isSubmitting && closePlayerActionPanel()}>
                <Ionicons name="close" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>

            {/* PASO 1: MENÚ DE ACCIONES */}
            {playerAction.step === 'MENU' && (
              <>
                <Text style={styles.panelSectionTitle}>SELECCIONAR ACCIÓN DEL JUGADOR</Text>
                <View style={styles.contextOptionsGrid}>
                  {/* ⚽ GOL */}
                  <TouchableOpacity 
                    style={styles.contextTileBtn} 
                    onPress={() => setPlayerAction(prev => ({ ...prev, action: 'GOAL', step: 'SELECT_ASSIST', assister: null }))}
                  >
                    <Text style={{ fontSize: 20 }}>⚽</Text>
                    <Text style={styles.contextTileTxt}>Gol</Text>
                  </TouchableOpacity>

                  {/* 🟨 TARJETA AMARILLA */}
                  <TouchableOpacity 
                    style={[styles.contextTileBtn, playerAction.isSubmitting && { opacity: 0.5 }]} 
                    disabled={playerAction.isSubmitting}
                    onPress={handleConfirmYellowCard}
                  >
                    <Text style={{ fontSize: 20 }}>🟨</Text>
                    <Text style={styles.contextTileTxt}>T. Amarilla</Text>
                  </TouchableOpacity>

                  {/* 🟥 TARJETA ROJA DIRECTA */}
                  <TouchableOpacity 
                    style={[styles.contextTileBtn, playerAction.isSubmitting && { opacity: 0.5 }]} 
                    disabled={playerAction.isSubmitting}
                    onPress={handleConfirmRedCard}
                  >
                    <Text style={{ fontSize: 20 }}>🟥</Text>
                    <Text style={styles.contextTileTxt}>T. Roja</Text>
                  </TouchableOpacity>

                  {/* 🔁 SUSTITUCIÓN */}
                  <TouchableOpacity 
                    style={styles.contextTileBtn} 
                    onPress={() => setPlayerAction(prev => ({ ...prev, action: 'SUBSTITUTION', step: 'SELECT_SUBSTITUTE', substitute: null }))}
                  >
                    <Text style={{ fontSize: 20 }}>🔁</Text>
                    <Text style={styles.contextTileTxt}>Sustitución</Text>
                  </TouchableOpacity>

                  {/* 🤕 LESIÓN */}
                  <TouchableOpacity 
                    style={[styles.contextTileBtn, playerAction.isSubmitting && { opacity: 0.5 }]} 
                    disabled={playerAction.isSubmitting}
                    onPress={handleConfirmInjury}
                  >
                    <Text style={{ fontSize: 20 }}>🤕</Text>
                    <Text style={styles.contextTileTxt}>Lesión</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.panelCancelFullBtn} onPress={closePlayerActionPanel}>
                  <Text style={styles.panelCancelFullTxt}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}

            {/* PASO 2: SELECCIÓN DE ASISTENCIA */}
            {playerAction.step === 'SELECT_ASSIST' && (
              <>
                <Text style={styles.panelTitle}>⚽ REGISTRAR GOL</Text>
                <Text style={styles.panelSubHeader}>SELECCIONAR ASISTENCIA (OPCIONAL):</Text>

                <ScrollView style={{ maxHeight: 180, marginVertical: 8 }}>
                  <TouchableOpacity 
                    key="assist-none"
                    style={styles.playerPickRow}
                    onPress={() => handleSelectAssistPlayer(null)}
                  >
                    <Text style={styles.playerPickDorsal}>-</Text>
                    <Text style={styles.playerPickName}>Sin asistencia (Acción individual / Penalti)</Text>
                  </TouchableOpacity>

                  {pitchPlayers.filter(p => p.dorsal !== playerAction.player?.dorsal).map(p => (
                    <TouchableOpacity 
                      key={`assist-${p.dorsal}`}
                      style={styles.playerPickRow}
                      onPress={() => handleSelectAssistPlayer(p)}
                    >
                      <Text style={styles.playerPickDorsal}>#{p.dorsal}</Text>
                      <Text style={styles.playerPickName}>{p.name} ({p.role})</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity style={styles.panelCancelBtn} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                  <Text style={styles.panelCancelBtnTxt}>Volver al menú</Text>
                </TouchableOpacity>
              </>
            )}

            {/* PASO 3: CONFIRMACIÓN DE GOL */}
            {playerAction.step === 'CONFIRM' && playerAction.action === 'GOAL' && (
              <>
                <Text style={styles.panelTitle}>⚽ CONFIRMAR GOL DE CADETE B</Text>
                
                <View style={styles.scorerSummaryBox}>
                  <Text style={styles.scorerSummaryTxt}>
                    GOLEADOR: #{playerAction.player?.dorsal} {playerAction.player?.name}
                  </Text>
                  <Text style={[styles.scorerSummaryTxt, { color: colors.skyGlow, marginTop: 4 }]}>
                    ASISTENCIA: {playerAction.assister ? `#${playerAction.assister.dorsal} ${playerAction.assister.name}` : 'Sin asistencia (Acción individual)'}
                  </Text>
                </View>

                <View style={{ gap: 8, marginTop: 12 }}>
                  <TouchableOpacity 
                    style={[styles.confirmGoalBtn, playerAction.isSubmitting && { opacity: 0.5 }]} 
                    disabled={playerAction.isSubmitting} 
                    onPress={handleConfirmGoal}
                  >
                    <Text style={styles.confirmGoalBtnTxt}>
                      {playerAction.isSubmitting ? 'Registrando gol...' : 'Confirmar Gol de Cadete B'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.panelCancelBtn} 
                    onPress={() => setPlayerAction(prev => ({ ...prev, step: 'SELECT_ASSIST' }))}
                  >
                    <Text style={styles.panelCancelBtnTxt}>Cambiar asistencia</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {/* PASO 4: SELECCIÓN DE SUPLENTE PARA SUSTITUCIÓN */}
            {playerAction.step === 'SELECT_SUBSTITUTE' && (
              <>
                <Text style={styles.panelTitle}>🔁 REALIZAR SUSTITUCIÓN</Text>
                <Text style={styles.panelSubHeader}>ENTRA DEL BANQUILLO:</Text>

                <ScrollView style={{ maxHeight: 180, marginVertical: 10 }}>
                  {benchPlayers.map(b => (
                    <TouchableOpacity key={`sub-${b.dorsal}`} style={styles.playerPickRow} onPress={() => handleConfirmSub(b)}>
                      <Text style={styles.playerPickDorsal}>#{b.dorsal}</Text>
                      <Text style={styles.playerPickName}>{b.name} ({b.role})</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity style={styles.panelCancelBtn} onPress={() => setPlayerAction(prev => ({ ...prev, step: 'MENU' }))}>
                  <Text style={styles.panelCancelBtnTxt}>Volver al menú</Text>
                </TouchableOpacity>
              </>
            )}

          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* PANEL SUPERPUESTO PARA EVENTOS GENERALES (DENTRO DEL ÁRBOL REACT) */}
      {/* ========================================================================= */}
      {showGeneralEventModal && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity style={styles.overlayBackdrop} activeOpacity={1} onPress={() => setShowGeneralEventModal(false)} />
          <View style={styles.panelCard}>
            <Text style={styles.panelTitle}>⚡ NUEVO EVENTO GENERAL</Text>
            <Text style={styles.panelSubTxt}>Selecciona la acción del partido:</Text>

            {!showIncidenceInput ? (
              <View style={{ gap: 8, marginVertical: 12 }}>
                {/* ⚽ GOL RIVAL */}
                <TouchableOpacity style={styles.generalOptionTile} onPress={handleConfirmAwayGoal}>
                  <Text style={{ fontSize: 18 }}>⚽</Text>
                  <Text style={styles.generalOptionTileTxt}>Gol rival (Torrent CF)</Text>
                </TouchableOpacity>

                {/* 🥤 PAUSA HIDRATACIÓN */}
                <TouchableOpacity style={styles.generalOptionTile} onPress={handleGeneralHydration}>
                  <Text style={{ fontSize: 18 }}>🥤</Text>
                  <Text style={styles.generalOptionTileTxt}>Pausa hidratación</Text>
                </TouchableOpacity>

                {/* ⏸ DESCANSO */}
                <TouchableOpacity style={styles.generalOptionTile} onPress={handleGeneralBreak}>
                  <Text style={{ fontSize: 18 }}>⏸</Text>
                  <Text style={styles.generalOptionTileTxt}>Descanso / Pausa de tiempo</Text>
                </TouchableOpacity>

                {/* ▶ REANUDACIÓN */}
                <TouchableOpacity style={styles.generalOptionTile} onPress={handleGeneralResume}>
                  <Text style={{ fontSize: 18 }}>▶</Text>
                  <Text style={styles.generalOptionTileTxt}>Reanudación del partido</Text>
                </TouchableOpacity>

                {/* ⚠️ INCIDENCIA */}
                <TouchableOpacity style={styles.generalOptionTile} onPress={() => setShowIncidenceInput(true)}>
                  <Text style={{ fontSize: 18 }}>⚠️</Text>
                  <Text style={styles.generalOptionTileTxt}>Incidencia / Observación</Text>
                </TouchableOpacity>

                {/* 🏁 FIN DEL PARTIDO */}
                <TouchableOpacity style={[styles.generalOptionTile, { borderColor: colors.redCard }]} onPress={handleFinishMatch}>
                  <Text style={{ fontSize: 18 }}>🏁</Text>
                  <Text style={[styles.generalOptionTileTxt, { color: colors.redCard }]}>Fin del partido</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginVertical: 10, gap: 10 }}>
                <Text style={styles.panelSubHeader}>DESCRIPCIÓN DE LA INCIDENCIA:</Text>
                <TextInput 
                  style={styles.incidenceTextInput}
                  placeholder="Ej: Balón pinchado / Protesta banquillo..."
                  placeholderTextColor={colors.textMuted}
                  value={incidenceText}
                  onChangeText={setIncidenceText}
                />
                <TouchableOpacity style={styles.confirmGoalBtn} onPress={handleAddIncidence}>
                  <Text style={styles.confirmGoalBtnTxt}>Guardar Incidencia</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.panelCancelBtn} onPress={() => { setShowGeneralEventModal(false); setShowIncidenceInput(false); }}>
              <Text style={styles.panelCancelBtnTxt}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* PANEL SUPERPUESTO PARA REORGANIZACIÓN IA (DENTRO DEL ÁRBOL REACT) */}
      {/* ========================================================================= */}
      {showAIReorgModal && (
        <View style={styles.overlayContainer}>
          <TouchableOpacity style={styles.overlayBackdrop} activeOpacity={1} onPress={() => setShowAIReorgModal(false)} />
          <View style={styles.panelAICard}>
            <Text style={styles.aiModalTitle}>🧠 PROPUESTAS DE REORGANIZACIÓN IA</Text>
            <Text style={styles.aiModalSub}>Dispones de {pitchPlayers.length} jugadores en campo.</Text>

            <View style={{ gap: 10, marginVertical: 14 }}>
              {getAITacticalProposals().map((prop, i) => (
                <TouchableOpacity key={`ai-${prop.name}`} style={styles.aiProposalCard} onPress={() => applyAIProposal(prop)}>
                  <View style={styles.aiPropBadge}>
                    <Text style={styles.aiPropBadgeTxt}>OPCIÓN {i + 1}</Text>
                    <Text style={styles.aiPropFormationTxt}>{prop.name}</Text>
                  </View>
                  <Text style={styles.aiPropDescTxt}>{prop.desc}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.panelCancelBtn} onPress={() => setShowAIReorgModal(false)}>
              <Text style={styles.panelCancelBtnTxt}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: colors.navyDark, position: 'relative' },
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 20, paddingBottom: 40 },
  contentDesktop: { maxWidth: 1100, alignSelf: 'center', width: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 18, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700' },
  resetDemoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  resetDemoBtnTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },

  suspensionBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(239, 68, 68, 0.18)', padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: '#EF4444', marginBottom: 16 },
  suspensionTitle: { color: '#EF4444', fontSize: 14, fontWeight: '900' },
  suspensionDesc: { color: '#FFFFFF', fontSize: 12, marginTop: 2, lineHeight: 16 },

  // MARCADOR SUPERIOR
  scoreboardCard: { backgroundColor: colors.navyDeep, borderRadius: 20, padding: 18, borderWidth: 1.5, borderColor: colors.emeraldGlow, marginBottom: 20, alignItems: 'center' },
  liveBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  liveRedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  liveBadgeTxt: { color: '#EF4444', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' },
  teamScoreBox: { alignItems: 'center', flex: 1 },
  teamScoreName: { color: colors.white, fontSize: 15, fontWeight: '900', marginBottom: 4 },
  scoreDigit: { color: colors.white, fontSize: 38, fontWeight: '900' },
  timerBox: { alignItems: 'center', paddingHorizontal: 16 },
  timerTxt: { color: colors.emeraldGlow, fontSize: 30, fontWeight: '900' },
  timerSubTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '600', marginBottom: 6 },
  timerControlBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.emeraldGlow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  timerControlBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 4 },
  sectionTitleTxt: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1 },

  // BOTONES DE ACCIÓN
  aiReorgTriggerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: 'rgba(168, 85, 247, 0.2)', paddingVertical: 12, borderRadius: 14, borderWidth: 1.5, borderColor: colors.purpleAI, marginBottom: 12 },
  aiReorgTriggerTxt: { color: '#F0ABFC', fontSize: 13, fontWeight: '900' },
  generalEventTriggerBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.emeraldGlow, paddingVertical: 12, borderRadius: 14, marginBottom: 16 },
  generalEventTriggerTxt: { color: colors.navyDark, fontSize: 13, fontWeight: '900' },

  // LAYOUT RESPONSIVO
  mobileStack: { gap: 16 },
  desktopGrid: { flexDirection: 'row', gap: 24 },
  mainColDesktop: { flex: 1.4 },
  sidebarColDesktop: { flex: 1 },

  // BANQUILLO Y TIMELINE
  benchCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  benchScrollContent: { flexDirection: 'row', gap: 12, paddingVertical: 4 },
  benchJerseyWrapper: { alignItems: 'center' },

  timelineCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, gap: 12, marginBottom: 20 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  timelineTime: { color: colors.skyGlow, fontSize: 12, fontWeight: '900', width: 42 },
  timelineTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  timelineDesc: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  emptyTimelineTxt: { color: colors.textMuted, fontSize: 12, fontStyle: 'italic', textAlign: 'center', paddingVertical: 10 },

  // OVERLAYS NATIVOS ESTABLES (SIN MODAL NI PORTAL)
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlayBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.82)',
  },
  panelCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.navyDeep,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.skyPrimary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  panelPlayerHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  panelPlayerBadge: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  panelPlayerBadgeTxt: { color: colors.navyDark, fontSize: 16, fontWeight: '900' },
  panelPlayerName: { color: colors.white, fontSize: 17, fontWeight: '900' },
  panelPlayerRole: { color: colors.skyGlow, fontSize: 12, fontWeight: '700', marginTop: 1 },
  panelCloseIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255, 255, 255, 0.1)', justifyContent: 'center', alignItems: 'center' },

  panelSectionTitle: { color: colors.textMuted, fontSize: 11, fontWeight: '900', letterSpacing: 1, textAlign: 'center', marginBottom: 14 },
  contextOptionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'space-between', marginBottom: 16 },
  contextTileBtn: { width: '48%', flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(2, 8, 20, 0.8)', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  contextTileTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },
  panelCancelFullBtn: { backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  panelCancelFullTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },

  panelTitle: { color: colors.white, fontSize: 16, fontWeight: '900', textAlign: 'center', marginBottom: 6 },
  panelSubTxt: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 10 },
  scorerSummaryBox: { backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.emeraldGlow, marginBottom: 12 },
  scorerSummaryTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '900', textAlign: 'center' },
  panelSubHeader: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', letterSpacing: 0.5, marginBottom: 6 },
  playerPickRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.05)', marginBottom: 6 },
  playerPickDorsal: { color: colors.skyPrimary, fontSize: 13, fontWeight: '900' },
  playerPickName: { color: colors.white, fontSize: 13, fontWeight: '700' },
  confirmGoalBtn: { backgroundColor: colors.emeraldGlow, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  confirmGoalBtnTxt: { color: colors.navyDark, fontSize: 13, fontWeight: '900' },
  panelCancelBtn: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  panelCancelBtnTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },

  // EVENTOS GENERALES
  generalOptionTile: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(2, 8, 20, 0.8)', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  generalOptionTileTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },
  incidenceTextInput: { backgroundColor: 'rgba(255, 255, 255, 0.08)', color: colors.white, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.border, fontSize: 13 },

  // IA
  panelAICard: { width: '100%', maxWidth: 440, backgroundColor: '#071A3D', borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: colors.purpleAI },
  aiModalTitle: { color: '#F0ABFC', fontSize: 16, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  aiModalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 10 },
  aiProposalCard: { backgroundColor: 'rgba(2, 8, 20, 0.85)', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.4)', gap: 6 },
  aiPropBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  aiPropBadgeTxt: { color: '#F0ABFC', fontSize: 11, fontWeight: '900' },
  aiPropFormationTxt: { backgroundColor: colors.purpleAI, color: '#FFFFFF', fontSize: 12, fontWeight: '900', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  aiPropDescTxt: { color: '#E2E8F0', fontSize: 12, lineHeight: 16 },
});
