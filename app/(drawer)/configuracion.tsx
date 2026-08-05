import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../../src/utils/theme';
import { GradientCard } from '../../src/components/ui/GradientCard';
import { FontAwesome } from '@expo/vector-icons';
import { useRole } from '../../src/context/RoleContext';
import { useAuth } from '../../src/context/AuthContext';
import { useDemoNavigation } from '../../src/context/DemoNavigationContext';
import { FamiliaAjustes } from '../../src/components/dashboards/FamiliaAjustes';
import { DelegadoAjustesView } from '../../src/components/views/DelegadoAjustesView';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';

export default function ConfiguracionScreen() {
  const { role } = useRole();
  const { user } = useAuth();
  const { selectedDemoProfile } = useDemoNavigation();

  const currentRole = selectedDemoProfile || user?.role || role || 'FAMILIA';
  const isDelegado = String(currentRole).toUpperCase() === 'DELEGADO';

  if (isDelegado) {
    return (
      <View style={styles.familiasContainer}>
        <PremiumHeader 
          title="AJUSTES"
          subtitle="CONFIGURACIÓN Y PREFERENCIAS"
          showSearchAndActions={false}
          showAvatar={false}
        />
        <DelegadoAjustesView />
      </View>
    );
  }

  if (role === 'familias' || String(currentRole).toUpperCase() === 'FAMILIA') {
    return (
      <View style={styles.familiasContainer}>
         <PremiumHeader 
           title="AJUSTES"
           subtitle="CONFIGURACIÓN"
           showSearchAndActions={false}
           showAvatar={false}
         />
         <FamiliaAjustes />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MODO PREVIEW</Text>
          <Text style={styles.headerSubtitle}>CONFIGURACION</Text>
        </View>
        <GradientCard title="Sección en Construcción">
          <View style={{ alignItems: 'center', padding: 20 }}>
            <FontAwesome name="wrench" size={48} color={colors.sky} />
            <Text style={{ color: colors.navy, marginTop: 20, textAlign: 'center' }}>
              Esta pantalla está preparada para conectar con los datos de Supabase.
            </Text>
          </View>
        </GradientCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  familiasContainer: {
    flex: 1,
    backgroundColor: '#071A3D', // Matching dark theme background for families
  },
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.m },
  header: { alignItems: 'flex-start', marginVertical: spacing.l, paddingHorizontal: spacing.s },
  headerTitle: { color: colors.sky, fontSize: typography.sizes.small, fontWeight: typography.weights.black, letterSpacing: 4, marginBottom: spacing.xs },
  headerSubtitle: { color: colors.navy, fontSize: typography.sizes.h1, fontWeight: typography.weights.black, textTransform: 'uppercase' },
});
