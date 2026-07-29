import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FamiliaMiHijo } from '../../src/components/dashboards/FamiliaMiHijo';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function JugadoresScreen() {
  return (
    <View style={styles.screenContainer}>
      <PremiumHeader 
        title="MIS HIJOS" 
        subtitle="FICHA DE IDENTIDAD OFICIAL"
        showSearchAndActions={false}
        showAvatar={false}
      />
      <FamiliaMiHijo />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
});
