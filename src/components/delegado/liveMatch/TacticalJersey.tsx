import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface TacticalJerseyProps {
  dorsal: string;
  name: string;
  isGoalkeeper?: boolean;
  isAway?: boolean;
  onPress?: () => void;
  scale?: number;
}

export function TacticalJersey({
  dorsal,
  name,
  isGoalkeeper = false,
  isAway = false,
  onPress,
  scale = 1,
}: TacticalJerseyProps) {
  // PRIMERA EQUIPACIÓN OFICIAL CD JESUITAS (PARTIDO COMO LOCAL)
  // Jugador Campo: Cuerpo Celeste (#38BDF8), Mangas Celestes (#38BDF8), Cuello Azul Marino (#071A3D), Puños Azul Marino (#071A3D), Dorsal Azul Marino (#071A3D)
  // Portero Local: Cuerpo Granate (#800020), Mangas Granate (#800020), Cuello Azul Marino (#071A3D), Puños Azul Marino (#071A3D), Dorsal Naranja (#FF6600)
  let bodyColor = isGoalkeeper ? '#800020' : isAway ? '#FFFFFF' : '#38BDF8'; // Granate oficial para portero local
  let sleeveColor = bodyColor; // Mangas del mismo color principal
  let collarColor = isAway ? '#0F172A' : '#071A3D'; // Cuello en azul marino
  let cuffColor = isAway ? '#0F172A' : '#071A3D'; // Puños en azul marino
  let dorsalColor = isGoalkeeper ? '#FF6600' : isAway ? '#071A3D' : '#071A3D'; // Dorsal naranja oficial para portero sobre granate

  return (
    <TouchableOpacity 
      style={[styles.container, { transform: [{ scale }] }]} 
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.85}
    >
      {/* CAMISETA REAL DE FÚTBOL (CUERPO + MANGAS UNIDAS + PUÑOS AZUL MARINO + CUELLO AZUL MARINO) */}
      <View style={styles.jerseyWrapper}>
        {/* MANGA IZQUIERDA CON PUÑO AZUL MARINO */}
        <View style={[styles.sleeveLeft, { backgroundColor: sleeveColor }]}>
          <View style={[styles.sleeveCuff, { backgroundColor: cuffColor }]} />
        </View>
        
        {/* MANGA DERECHA CON PUÑO AZUL MARINO */}
        <View style={[styles.sleeveRight, { backgroundColor: sleeveColor }]}>
          <View style={[styles.sleeveCuff, { backgroundColor: cuffColor }]} />
        </View>

        {/* CUERPO PRINCIPAL DE LA CAMISETA */}
        <View style={[styles.jerseyBody, { backgroundColor: bodyColor }]}>
          {/* CUELLO AZUL MARINO VISIBLE */}
          <View style={[styles.collarCut, { backgroundColor: collarColor }]} />

          {/* DORSAL AZUL MARINO GRANDE CENTRADO (SIN NOMBRE EN LA CAMISETA) */}
          <Text style={[styles.dorsalTxt, { color: dorsalColor }]}>{dorsal}</Text>
        </View>
      </View>

      {/* PLACA INFERIOR CON EL NOMBRE DEL JUGADOR (DEBAJO DE LA CAMISETA) */}
      <View style={styles.nameBadge}>
        <Text style={styles.nameTxt} numberOfLines={1}>
          {name.toUpperCase()}
        </Text>
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
    top: 2,
    left: -4,
    width: 14,
    height: 22,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 6,
    transform: [{ rotate: '-22deg' }],
    overflow: 'hidden',
  },
  sleeveRight: {
    position: 'absolute',
    top: 2,
    right: -4,
    width: 14,
    height: 22,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 6,
    transform: [{ rotate: '22deg' }],
    overflow: 'hidden',
  },
  sleeveCuff: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
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
});


