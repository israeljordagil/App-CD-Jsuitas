import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaCalendarioView } from '../../src/components/views/FamiliaCalendarioView';
import { PendingScreen } from '../../src/components/ui/PendingScreen';

export default function CalendarioScreen() {
  const { activeContext } = useAuth();

  if (activeContext === 'FAMILIA' || activeContext === 'ADMIN') {
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

  return <PendingScreen title="Calendario Deportivo" />;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071A3D' },
  container: { flex: 1, backgroundColor: '#071A3D' }
});
