import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaPartidosView } from '../../src/components/views/FamiliaPartidosView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function PartidosDrawerScreen() {
  const { user } = useAuth();
  const currentRole = user?.role || 'FAMILIA';

  if (currentRole === 'FAMILIA') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="PARTIDOS" subtitle="DIRECTO Y COMPETICIÓN" />
        <FamiliaPartidosView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="PARTIDOS" subtitle="DIRECTO Y COMPETICIÓN" />
      <FamiliaPartidosView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
