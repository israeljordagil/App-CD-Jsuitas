import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

interface PremiumBackgroundProps {
  children: React.ReactNode;
}

export function PremiumBackground({ children }: PremiumBackgroundProps) {
  return (
    <View style={styles.container}>
      {/* DEGRADADO DEPORTIVO PROFUNDO */}
      <LinearGradient 
        colors={['#041026', '#0A2458', '#1A4D8F']} // Navy muy oscuro -> Navy medio -> Azul
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* FORMAS GEOMÉTRICAS Y PATRÓN (MARCAS DE AGUA) */}
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
         {/* Círculo superior derecho */}
         <View style={styles.circleTopRight} />
         
         {/* Escudo gigante difuminado abajo */}
         <FontAwesome 
           name="shield" 
           size={width * 1.5} 
           color="rgba(85, 199, 243, 0.03)" 
           style={styles.bgShield} 
         />

         {/* Líneas tácticas (simulación visual) */}
         <View style={styles.tacticalLine1} />
         <View style={styles.tacticalLine2} />
      </View>

      {/* CONTENIDO DE LA APP */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041026', // Backup
  },
  circleTopRight: {
    position: 'absolute',
    top: -height * 0.1,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(85, 199, 243, 0.05)', // Celeste destello sutil
  },
  bgShield: {
    position: 'absolute',
    bottom: -width * 0.5,
    left: -width * 0.2,
    transform: [{ rotate: '-15deg' }],
  },
  tacticalLine1: {
    position: 'absolute',
    top: '30%',
    left: -50,
    width: width * 1.5,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.02)',
    transform: [{ rotate: '45deg' }]
  },
  tacticalLine2: {
    position: 'absolute',
    bottom: '20%',
    right: -50,
    width: width * 1.5,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.02)',
    transform: [{ rotate: '-30deg' }]
  }
});
