import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing } from '../../utils/theme';
import { getSportConfig } from '../../utils/sportConfig';

const { width } = Dimensions.get('window');
const COURT_WIDTH = width - spacing.m * 2;
const COURT_HEIGHT = COURT_WIDTH * 1.5; // Vista vertical por defecto

interface UnifiedTacticalBoardProps {
  sport: string | null;
  players: any[]; // Todos los jugadores de la plantilla
}

export function UnifiedTacticalBoard({ sport, players }: UnifiedTacticalBoardProps) {
  const config = getSportConfig(sport);
  const [formationId, setFormationId] = useState(config.formations[0]?.id || '');
  const [porteroJugador, setPorteroJugador] = useState(false);
  
  // Extraer posiciones de la formación seleccionada
  const currentFormation = config.formations.find(f => f.id === formationId) || config.formations[0];
  
  // Inicializar estado de pista y banquillo
  const [onPitch, setOnPitch] = useState<any[]>(() => {
    return players.slice(0, config.playerCount).map((p, i) => ({
      ...p,
      x: currentFormation?.positions[i]?.x || 50,
      y: currentFormation?.positions[i]?.y || 50,
      assignedRole: currentFormation?.positions[i]?.role || p.posicion
    }));
  });

  const [onBench, setOnBench] = useState<any[]>(players.slice(config.playerCount));
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const applyFormation = (fId: string) => {
    setFormationId(fId);
    setPorteroJugador(false);
    const form = config.formations.find(f => f.id === fId);
    if (!form) return;

    setOnPitch(prev => prev.map((p, i) => ({
      ...p,
      x: form.positions[i]?.x || 50,
      y: form.positions[i]?.y || 50,
      assignedRole: form.positions[i]?.role || p.assignedRole
    })));
  };

  const togglePorteroJugador = () => {
    if (sport !== 'futbol_sala') return;
    setPorteroJugador(!porteroJugador);
    if (!porteroJugador) {
      setOnPitch(prev => {
        const next = [...prev];
        if (next[0]) next[0].y = 40; // Adelanta al portero
        return next;
      });
    } else {
      applyFormation(formationId); // Reinicia
    }
  };

  const handleBenchSwap = (benchPlayer: any) => {
    if (!selectedPlayer) return;
    const pitchIndex = onPitch.findIndex(p => p.id === selectedPlayer);
    if (pitchIndex === -1) return;

    const playerToBench = onPitch[pitchIndex];
    const benchIndex = onBench.findIndex(p => p.id === benchPlayer.id);

    const newPitch = [...onPitch];
    newPitch[pitchIndex] = { ...benchPlayer, x: playerToBench.x, y: playerToBench.y, assignedRole: playerToBench.assignedRole };
    
    const newBench = [...onBench];
    newBench[benchIndex] = playerToBench;

    setOnPitch(newPitch);
    setOnBench(newBench);
    setSelectedPlayer(null);
  };

  return (
    <View style={styles.container}>
      {/* Selector de formaciones */}
      <View style={styles.toolbar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.formSelector}>
          {config.formations.map(f => (
            <TouchableOpacity 
              key={f.id} 
              style={[styles.formBtn, formationId === f.id && { backgroundColor: config.color }]}
              onPress={() => applyFormation(f.id)}
            >
              <Text style={[styles.formBtnText, formationId === f.id && { color: colors.white }]}>{f.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {sport === 'futbol_sala' && (
          <TouchableOpacity 
            style={[styles.pjBtn, porteroJugador && { backgroundColor: config.color }]}
            onPress={togglePorteroJugador}
          >
            <Text style={[styles.pjText, porteroJugador && { color: colors.white }]}>P.JUG</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Renderizado de la cancha dinámica */}
        <View style={styles.courtContainer}>
          <View style={[styles.court, { backgroundColor: config.pitchColor }]}>
            {/* Elementos fijos de la cancha (se pueden adaptar por deporte) */}
            <View style={styles.halfLine} />
            <View style={styles.centerCircle} />
            
            {/* Jugadores en pista */}
            {onPitch.map(p => (
              <TouchableOpacity
                key={p.id}
                style={[
                  styles.playerDot, 
                  { backgroundColor: config.color },
                  { left: `${p.x}%`, top: `${p.y}%`, transform: [{ translateX: -15 }, { translateY: -15 }] },
                  selectedPlayer === p.id && { borderColor: '#FFF', borderWidth: 3, transform: [{ translateX: -15 }, { translateY: -15 }, { scale: 1.2 }] }
                ]}
                onPress={() => setSelectedPlayer(selectedPlayer === p.id ? null : p.id)}
              >
                <Text style={styles.playerDotDorsal}>{p.dorsal || p.num || 'X'}</Text>
                <Text style={styles.playerDotName} numberOfLines={1}>{p.nombreCompleto?.split(' ')[0] || p.name?.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Banquillo Genérico */}
        <View style={styles.benchContainer}>
          <Text style={styles.benchTitle}>BANQUILLO (Toca pista y luego banquillo para cambio)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.benchScroll}>
            {onBench.map(p => (
              <TouchableOpacity 
                key={p.id} 
                style={styles.benchPlayer}
                onPress={() => handleBenchSwap(p)}
              >
                <View style={styles.benchDorsal}>
                  <Text style={styles.benchDorsalText}>{p.dorsal || p.num || 'X'}</Text>
                </View>
                <Text style={styles.benchPlayerName} numberOfLines={1}>{p.nombreCompleto?.split(' ')[0] || p.name?.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: { flexDirection: 'row', padding: spacing.m, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  formSelector: { flex: 1, marginRight: spacing.m },
  formBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', marginRight: 8 },
  formBtnText: { color: colors.muted, fontSize: 13, fontWeight: '800' },
  pjBtn: { borderWidth: 1, borderColor: '#F97316', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  pjText: { color: '#F97316', fontSize: 12, fontWeight: '800' },
  scrollContent: { paddingBottom: 40 },
  courtContainer: { padding: spacing.m, alignItems: 'center' },
  court: { width: COURT_WIDTH, height: COURT_HEIGHT, borderWidth: 3, borderColor: '#FFFFFF', position: 'relative', borderRadius: 8 },
  halfLine: { position: 'absolute', top: '50%', left: 0, right: 0, height: 2, backgroundColor: '#FFFFFF', transform: [{ translateY: -1 }] },
  centerCircle: { position: 'absolute', top: '50%', left: '50%', width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#FFFFFF', transform: [{ translateX: -30 }, { translateY: -30 }] },
  playerDot: { position: 'absolute', width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'transparent', zIndex: 10 },
  playerDotDorsal: { color: colors.white, fontSize: 12, fontWeight: '900' },
  playerDotName: { position: 'absolute', bottom: -20, color: colors.white, fontSize: 10, fontWeight: '700', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 4, borderRadius: 4, overflow: 'hidden', textAlign: 'center', width: 60 },
  benchContainer: { marginTop: spacing.m, paddingHorizontal: spacing.m },
  benchTitle: { color: colors.muted, fontSize: 12, fontWeight: '700', marginBottom: 8 },
  benchScroll: { gap: 12 },
  benchPlayer: { alignItems: 'center', width: 50 },
  benchDorsal: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  benchDorsalText: { color: colors.white, fontSize: 14, fontWeight: '900' },
  benchPlayerName: { color: colors.white, fontSize: 10, textAlign: 'center' },
});
