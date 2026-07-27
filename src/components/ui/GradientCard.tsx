import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../utils/theme';

interface GradientCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: string; // Kept for compatibility but not used
}

export function GradientCard({ title, subtitle, children, style }: GradientCardProps) {
  return (
    <View style={[styles.card, style]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.l,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: colors.sky, // Soft sky border
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    marginBottom: spacing.m,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: colors.sky,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
  },
});
