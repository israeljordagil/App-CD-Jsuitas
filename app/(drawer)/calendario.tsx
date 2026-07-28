import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { useAuth } from '../../src/context/AuthContext';
import { useRole } from '../../src/context/RoleContext';
import { FamiliaCalendarioView } from '../../src/components/views/FamiliaCalendarioView';
import CalendarioJugadorScreen from './jugador/calendario';

export default function CalendarioScreen() {
  const { user, activeContext } = useAuth();
  const { role } = useRole();

  const currentRole = role || user?.role || activeContext || 'FAMILIA';

  if (currentRole === 'jugadores' || currentRole === 'JUGADOR') {
    return <CalendarioJugadorScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PremiumHeader 
          title="CALENDARIO DEPORTIVO"
          subtitle="AGENDA DE ENTRENAMIENTOS, PARTIDOS Y EVENTOS"
          showSearchAndActions={false}
          showAvatar={false}
        />
        <FamiliaCalendarioView />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071A3D' },
  container: { flex: 1, backgroundColor: '#071A3D' }
});
