import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface KitConfig {
  outfieldShirt: string;
  outfieldNumber: string;
  goalkeeperShirt: string;
  goalkeeperNumber: string;
  captainArmband: string;
  collar: string;
  cuff: string;
}

export const HOME_KIT: KitConfig = {
  outfieldShirt: '#38BDF8',   // Celeste
  outfieldNumber: '#071A3D',  // Navy Blue
  goalkeeperShirt: '#800020', // Granate
  goalkeeperNumber: '#FF6600',// Naranja
  captainArmband: '#071A3D',  // Navy Blue
  collar: '#071A3D',
  cuff: '#071A3D',
};

export const AWAY_KIT: KitConfig = {
  outfieldShirt: '#0F172A',   // Negro
  outfieldNumber: '#FACC15',  // Amarillo
  goalkeeperShirt: '#4ADE80', // Verde claro
  goalkeeperNumber: '#14532D',// Verde oscuro
  captainArmband: '#FFFFFF',  // Blanco
  collar: '#FACC15',
  cuff: '#FACC15',
};

export interface TacticalJerseyProps {
  dorsal: string;
  name: string;
  isGoalkeeper?: boolean;
  isAway?: boolean;
  variant?: 'HOME' | 'AWAY';
  yellowCardCount?: number;
  isRedCarded?: boolean;
  isInjured?: boolean;
  isCaptain?: boolean;
  timeText?: string;
  onPress?: () => void;
  scale?: number;
}

export function TacticalJersey({
  dorsal,
  name,
  isGoalkeeper = false,
  isAway = false,
  variant,
  yellowCardCount = 0,
  isRedCarded = false,
  isInjured = false,
  isCaptain = false,
  timeText,
  onPress,
  scale = 1,
}: TacticalJerseyProps) {

  const activeVariant = variant || (isAway ? 'AWAY' : 'HOME');
  const kit = activeVariant === 'AWAY' ? AWAY_KIT : HOME_KIT;

  const bodyColor = isGoalkeeper ? kit.goalkeeperShirt : kit.outfieldShirt;
  const sleeveColor = bodyColor;
  const collarColor = isGoalkeeper ? (activeVariant === 'AWAY' ? '#14532D' : kit.collar) : kit.collar;
  const cuffColor = isGoalkeeper ? (activeVariant === 'AWAY' ? '#14532D' : kit.cuff) : kit.cuff;
  const dorsalColor = isGoalkeeper ? kit.goalkeeperNumber : kit.outfieldNumber;
  const armbandColor = kit.captainArmband;
  const armbandBorderColor = activeVariant === 'AWAY' ? '#0F172A' : '#FFFFFF';

  return (
    <TouchableOpacity 
      style={[styles.container, { transform: [{ scale }] }]} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.85}
    >
      {/* CAMISETA REAL DE FÚTBOL (CUERPO + MANGAS UNIDAS + PUÑOS + CUELLO) */}
      <View style={styles.jerseyWrapper}>
        {/* INDICADOR DE TARJETA AMARILLA PEQUEÑO EN LA ESQUINA SUPERIOR DERECHA */}
        {yellowCardCount === 1 && !isRedCarded && (
          <View style={styles.yellowCardBadge} />
        )}

        {/* INDICADOR DE TARJETA ROJA EN LA ESQUINA SUPERIOR DERECHA */}
        {isRedCarded && (
          <View style={styles.redCardBadge} />
        )}

        {/* INDICADOR DE LESIÓN */}
        {isInjured && (
          <View style={styles.injuryBadge}>
            <Text style={styles.injuryBadgeTxt}>+</Text>
          </View>
        )}

        {/* MANGA IZQUIERDA CON BRAZALETE DE CAPITÁN Y PUÑO */}
        <View style={[styles.sleeveLeft, { backgroundColor: sleeveColor }]}>
          {isCaptain && (
            <View style={[styles.captainArmband, { backgroundColor: armbandColor, borderColor: armbandBorderColor }]} />
          )}
          <View style={[styles.sleeveCuff, { backgroundColor: cuffColor }]} />
        </View>

        {/* MANGA DERECHA CON PUÑO */}
        <View style={[styles.sleeveRight, { backgroundColor: sleeveColor }]}>
          <View style={[styles.sleeveCuff, { backgroundColor: cuffColor }]} />
        </View>

        {/* CUERPO PRINCIPAL DE LA CAMISETA */}
        <View style={[styles.jerseyBody, { backgroundColor: bodyColor }]}>
          {/* CUELLO VISIBLE */}
          <View style={[styles.collarCut, { backgroundColor: collarColor }]} />

          {/* DORSAL GRANDE CENTRADO */}
          <Text style={[styles.dorsalTxt, { color: dorsalColor }]}>{dorsal}</Text>
        </View>
      </View>

      {/* PLACA INFERIOR CON EL NOMBRE Y TIEMPO DEL JUGADOR */}
      <View style={styles.nameBadge}>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {name.toUpperCase()}
        </Text>
        {Boolean(timeText) && (
          <Text style={styles.timeTxt}>
            {timeText}
          </Text>
        )}
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  jerseyWrapper: {
    width: 50,
    height: 48,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sleeveLeft: {
    position: 'absolute',
    top: 1,
    left: -3,
    width: 19,
    height: 23,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 6,
    transform: [{ rotate: '-20deg' }],
    overflow: 'hidden',
  },
  sleeveRight: {
    position: 'absolute',
    top: 1,
    right: -3,
    width: 19,
    height: 23,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 6,
    transform: [{ rotate: '20deg' }],
    overflow: 'hidden',
  },
  sleeveCuff: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  captainArmband: {
    position: 'absolute',
    top: 9,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: '#071A3D',
    borderTopWidth: 0.8,
    borderBottomWidth: 0.8,
    borderColor: '#FFFFFF',
  },


  jerseyBody: {
    width: 38,
    height: 46,
    borderRadius: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  collarCut: {
    position: 'absolute',
    top: 0,
    width: 16,
    height: 7,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  dorsalTxt: {
    fontSize: 21,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: -0.5,
  },
  nameBadge: {
    backgroundColor: 'rgba(2, 8, 20, 0.9)',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    maxWidth: 70,
  },
  nameTxt: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  timeTxt: {
    color: '#38BDF8',
    fontSize: 9,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 1,
    letterSpacing: 0.2,
  },

  yellowCardBadge: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 9,
    height: 13,
    backgroundColor: '#F59E0B',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
  injuryBadge: {
    position: 'absolute',
    top: -2,
    left: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    zIndex: 20,
  },
  injuryBadgeTxt: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    lineHeight: 11,
  },
  redCardBadge: {
    position: 'absolute',
    top: -2,
    right: -3,
    width: 9,
    height: 13,
    backgroundColor: '#EF4444',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
});



