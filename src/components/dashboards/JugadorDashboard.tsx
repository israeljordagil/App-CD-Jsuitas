import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function JugadorDashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="information-circle-outline" size={48} color="#4FC3F7" />
        <Text style={styles.title}>ACCESO DESCONTINUADO</Text>
        <Text style={styles.message}>
          Este tipo de acceso ya no está disponible como perfil independiente. Contacta con la administración del club para vincular el jugador a una cuenta familiar y acceder a su espacio desde Mi Zona.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#0B224F',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
    maxWidth: 480,
    width: '100%',
  },
  title: {
    color: '#4FC3F7',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginTop: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
