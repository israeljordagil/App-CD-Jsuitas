import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useDemoNavigation } from '../../src/context/DemoNavigationContext';
import { FamiliaMensajesView } from '../../src/components/views/FamiliaMensajesView';
import { DelegadoComunicacionesView } from '../../src/components/views/DelegadoComunicacionesView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function MensajesDrawerScreen() {
  const { user } = useAuth();
  const { selectedDemoProfile } = useDemoNavigation();

  const currentRole = selectedDemoProfile || user?.role || 'FAMILIA';
  const normalizedRole = String(currentRole).toUpperCase();
  const isDelegado = normalizedRole === 'DELEGADO';

  if (isDelegado) {
    return (
      <View style={styles.container}>
        <PremiumHeader title="COMUNICACIONES" subtitle="CANALES Y DIRECCIÓN" />
        <DelegadoComunicacionesView />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PremiumHeader title="COMUNICACIONES" subtitle="MENSAJES Y NOTIFICACIONES" />
      <FamiliaMensajesView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
