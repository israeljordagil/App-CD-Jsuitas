import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaAvisosView } from '../../src/components/views/FamiliaAvisosView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function AvisosDrawerScreen() {
  const { user } = useAuth();
  const currentRole = user?.role || 'FAMILIA';

  if (currentRole === 'FAMILIA') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="CENTRO DE AVISOS" subtitle="ALERTAS Y NOTIFICACIONES PUSH" />
        <FamiliaAvisosView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="CENTRO DE AVISOS" subtitle="ALERTAS Y NOTIFICACIONES PUSH" />
      <FamiliaAvisosView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
