import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TacticalJersey } from './TacticalJersey';

export interface PitchPlayer {
  id?: string;
  dorsal: string;
  name: string;
  role?: string;
  isGoalkeeper?: boolean;
  yellowCardCount?: number;
  isRedCarded?: boolean;
  isInjured?: boolean;
  isCaptain?: boolean;
  timeText?: string;
  xPercent: number; // Porcentaje X (0-100)
  yPercent: number; // Porcentaje Y (0-100)
}

const STARTERS_14231: PitchPlayer[] = [
  // DELANTERO (#9 ALEJANDRO)
  { id: '9', dorsal: '9', name: 'ALEJANDRO', role: 'DC', xPercent: 50, yPercent: 14 },

  // MEDIAPUNTAS Y EXTREMOS (#11 DAVID, #10 MARCOS, #7 IVÁN)
  { id: '11', dorsal: '11', name: 'DAVID', role: 'EI', xPercent: 18, yPercent: 34 },
  { id: '10', dorsal: '10', name: 'MARCOS', role: 'MP', isCaptain: true, xPercent: 50, yPercent: 33 },
  { id: '7', dorsal: '7', name: 'IVÁN', role: 'ED', xPercent: 82, yPercent: 34 },

  // DOBLE PIVOTE (#8 PABLO, #6 JAVI)
  { id: '8', dorsal: '8', name: 'PABLO', role: 'MC', xPercent: 35, yPercent: 52 },
  { id: '6', dorsal: '6', name: 'JAVI', role: 'MC', xPercent: 65, yPercent: 52 },

  // DEFENSAS (#3 MARTÍN, #4 HUGO, #5 LUCAS, #2 DANI)
  { id: '3', dorsal: '3', name: 'MARTÍN', role: 'LI', xPercent: 14, yPercent: 70 },
  { id: '4', dorsal: '4', name: 'HUGO', role: 'DFC', xPercent: 38, yPercent: 73 },
  { id: '5', dorsal: '5', name: 'LUCAS', role: 'DFC', xPercent: 62, yPercent: 73 },
  { id: '2', dorsal: '2', name: 'DANI', role: 'LD', xPercent: 86, yPercent: 70 },

  // PORTERO (#1 ÁLVARO)
  { id: '1', dorsal: '1', name: 'ÁLVARO', role: 'POR', isGoalkeeper: true, xPercent: 50, yPercent: 87 },
];

export interface TacticalPitchProps {
  systemName?: string;
  starters?: PitchPlayer[];
  onPlayerPress?: (player: PitchPlayer) => void;
}

export function TacticalPitch({
  systemName = '1-4-2-3-1',
  starters = STARTERS_14231,
  onPlayerPress,
}: TacticalPitchProps) {
  return (
    <View style={styles.container}>
      {/* CABECERA TÁCTICA SOBRE EL CAMPO */}
      <View style={styles.tacticalHeaderBox}>
        <Text style={styles.tacticalLabelTxt}>SISTEMA TÁCTICO</Text>
        <View style={styles.systemPill}>
          <Ionicons name="lock-closed" size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={styles.systemPillTxt}>{systemName}</Text>
        </View>
        <Text style={styles.lockedNoticeTxt}>Bloqueado por el entrenador</Text>
      </View>

      {/* TERRENO DE JUEGO (CÉSPED VERDE REALISTA) */}
      <View style={styles.pitchField}>
        {/* FRANJAS VERDES DEL CÉSPED (POINTER EVENTS NONE PARA NO BLOQUEAR CLICK/TOUCH) */}
        <View style={styles.stripeOverlay} pointerEvents="none">
          <View style={styles.stripeItem} />
          <View style={[styles.stripeItem, { backgroundColor: '#15803D' }]} />
          <View style={styles.stripeItem} />
          <View style={[styles.stripeItem, { backgroundColor: '#15803D' }]} />
          <View style={styles.stripeItem} />
        </View>

        {/* LÍNEAS BLANCAS DEL CAMPO (POINTER EVENTS NONE) */}
        <View style={styles.pitchBoundary} pointerEvents="none" />
        <View style={styles.centerLine} pointerEvents="none" />
        <View style={styles.centerCircle} pointerEvents="none" />
        <View style={styles.centerDot} pointerEvents="none" />

        {/* ÁREAS Y PORTERÍAS (POINTER EVENTS NONE) */}
        <View style={styles.topGoalArea} pointerEvents="none" />
        <View style={styles.bottomGoalArea} pointerEvents="none" />

        {/* JUGADORES TITULARES CON CAMISETAS 3D EN CADA POSICIÓN */}
        {starters.map((player) => (
          <View
            key={player.dorsal}
            style={[
              styles.playerMarkerPosition,
              { left: `${player.xPercent}%`, top: `${player.yPercent}%` },
            ]}
          >
            <TacticalJersey
              dorsal={player.dorsal}
              name={player.name}
              isGoalkeeper={player.isGoalkeeper}
              yellowCardCount={player.yellowCardCount}
              isRedCarded={player.isRedCarded}
              isInjured={player.isInjured}
              isCaptain={player.isCaptain}
              timeText={player.timeText}
              onPress={() => onPlayerPress && onPlayerPress(player)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  tacticalHeaderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#091B3E',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 12,
  },
  tacticalLabelTxt: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  systemPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  systemPillTxt: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  lockedNoticeTxt: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '600',
  },
  pitchField: {
    width: '100%',
    height: 520,
    backgroundColor: '#166534',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    position: 'relative',
  },
  stripeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  stripeItem: {
    flex: 1,
    backgroundColor: '#166534',
  },
  pitchBoundary: {
    position: 'absolute',
    top: 14,
    bottom: 14,
    left: 14,
    right: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 14,
    right: 14,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    marginTop: -1,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    marginLeft: -50,
    marginTop: -50,
  },
  centerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginLeft: -3,
    marginTop: -3,
  },
  topGoalArea: {
    position: 'absolute',
    top: 14,
    left: '25%',
    right: '25%',
    height: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderTopWidth: 0,
  },
  bottomGoalArea: {
    position: 'absolute',
    bottom: 14,
    left: '25%',
    right: '25%',
    height: 80,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 0,
  },
  playerMarkerPosition: {
    position: 'absolute',
    width: 64,
    height: 70,
    marginLeft: -32,
    marginTop: -35,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
});
