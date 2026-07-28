import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useRole } from '../../src/context/RoleContext';
import { FamiliaEntrenamientosView } from '../../src/components/views/FamiliaEntrenamientosView';
import { JugadorEntrenamientosView } from '../../src/components/views/JugadorEntrenamientosView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function EntrenamientosDrawerScreen() {
  const { user } = useAuth();
  const { role } = useRole();

  const currentRole = role || user?.role || 'FAMILIA';

  if (currentRole === 'jugadores' || currentRole === 'JUGADOR') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="ENTRENAMIENTOS" subtitle="HORARIOS Y SESIONES DEL EQUIPO" showSearchAndActions={false} showAvatar={false} />
        <JugadorEntrenamientosView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="ENTRENAMIENTOS" subtitle="HORARIOS Y RUTINA SEMANAL" showSearchAndActions={false} showAvatar={false} />
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
