import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { MiZona } from '../../src/components/familia/MiZona';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function MiZonaScreen() {
  const { activeContext, user } = useAuth();
  const isFamilia = activeContext === 'FAMILIA' || user?.roles.includes('FAMILIA');

  if (!isFamilia) {
    return (
      <View style={styles.restrictedContainer}>
        <Text style={styles.restrictedIcon}>🔒</Text>
        <Text style={styles.restrictedTitle}>ACCESO RESTRINGIDO</Text>
        <Text style={styles.restrictedSub}>
          Esta sección está disponible únicamente para cuentas familiares autenticadas con deportistas vinculados.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <PremiumHeader 
        title="MI ZONA" 
        subtitle="GAMIFICACIÓN Y RETOS"
        showSearchAndActions={false}
        showAvatar={false}
      />
      <MiZona />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
  restrictedContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  restrictedIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  restrictedTitle: {
    color: '#4FC3F7',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  restrictedSub: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
