import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { FamiliaMensajesView } from '../../src/components/views/FamiliaMensajesView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function MensajesDrawerScreen() {
  const { user } = useAuth();
  const currentRole = user?.role || 'FAMILIA';

  if (currentRole === 'FAMILIA') {
    return (
      <View style={styles.container}>
        <PremiumHeader title="COMUNICACIONES" subtitle="MENSAJES Y NOTIFICACIONES" />
        <FamiliaMensajesView />
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
