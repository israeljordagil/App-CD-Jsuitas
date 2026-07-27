import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaEntrenamientosView } from '../../src/components/views/FamiliaEntrenamientosView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function EntrenamientosDrawerScreen() {
  const { user } = useAuth();
  const currentRole = user?.role || 'FAMILIA';

  if (currentRole === 'FAMILIA') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="ENTRENAMIENTOS" subtitle="HORARIOS Y RUTINA SEMANAL" />
        <FamiliaEntrenamientosView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="ENTRENAMIENTOS" subtitle="PLANIFICACIÓN DE SESIONES" />
      <FamiliaEntrenamientosView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
