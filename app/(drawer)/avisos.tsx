import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useDemoNavigation } from '../../src/context/DemoNavigationContext';
import { FamiliaAvisosView } from '../../src/components/views/FamiliaAvisosView';
import { DelegadoAyudaView } from '../../src/components/views/DelegadoAyudaView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function AvisosDrawerScreen() {
  const { user } = useAuth();
  const { selectedDemoProfile } = useDemoNavigation();

  const currentRole = selectedDemoProfile || user?.role || 'FAMILIA';
  const isDelegado = String(currentRole).toUpperCase() === 'DELEGADO';

  if (isDelegado) {
    return (
      <View style={styles.container}>
        <PremiumHeader title="CENTRO DE AYUDA" subtitle="GUÍA RÁPIDA Y RESOLUCIÓN DE DUDAS" />
        <DelegadoAyudaView />
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
