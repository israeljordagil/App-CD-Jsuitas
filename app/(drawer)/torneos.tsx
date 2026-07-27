import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaTorneosView } from '../../src/components/views/FamiliaTorneosView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function TorneosDrawerScreen() {
  const { user } = useAuth();
  const currentRole = user?.role || 'FAMILIA';

  if (currentRole === 'FAMILIA') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="TORNEOS Y VIAJES" subtitle="EXPEDICIONES Y AUTORIZACIONES" />
        <FamiliaTorneosView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="TORNEOS Y VIAJES" subtitle="EXPEDICIONES Y AUTORIZACIONES" />
      <FamiliaTorneosView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
