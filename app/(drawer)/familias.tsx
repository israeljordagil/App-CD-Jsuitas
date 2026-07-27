import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { colors, spacing, typography } from '../../src/utils/theme';
import { GradientCard } from '../../src/components/ui/GradientCard';
import { FontAwesome } from '@expo/vector-icons';

export default function FamiliasScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>COMUNIDAD</Text>
          <Text style={styles.headerSubtitle}>FAMILIAS</Text>
        </View>

        <GradientCard title="Aviso Importante">
          <View style={styles.alertBox}>
            <FontAwesome name="bell" size={24} color={colors.warning} />
            <Text style={styles.alertText}>Reunión inicio de temporada este viernes a las 19:00h en el salón de actos.</Text>
          </View>
        </GradientCard>

        <GradientCard title="Últimos Comunicados">
           <View style={styles.newsItem}>
             <Text style={styles.newsDate}>15 OCT</Text>
             <Text style={styles.newsTitle}>Nuevas equipaciones disponibles en tienda.</Text>
           </View>
           <View style={[styles.newsItem, styles.noBorder]}>
             <Text style={styles.newsDate}>10 OCT</Text>
             <Text style={styles.newsTitle}>Protocolo de acceso a las gradas.</Text>
           </View>
        </GradientCard>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.m,
  },
  header: {
    alignItems: 'flex-start',
    marginVertical: spacing.l,
    paddingHorizontal: spacing.s,
  },
  headerTitle: {
    color: colors.sky,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.black,
    letterSpacing: 4,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.navy,
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.black,
    textTransform: 'uppercase',
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)', // Warning light
    padding: spacing.m,
    borderRadius: 12,
    marginTop: spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  alertText: {
    color: colors.navy,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    marginLeft: spacing.m,
    flex: 1,
    lineHeight: 22,
  },
  newsItem: {
    paddingVertical: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  newsDate: {
    color: colors.sky,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.xs,
  },
  newsTitle: {
    color: colors.navy,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
  }
});
