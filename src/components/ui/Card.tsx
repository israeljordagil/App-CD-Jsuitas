import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../utils/theme';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Card({ title, subtitle, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: spacing.l,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.navy,
  },
  subtitle: {
    fontSize: 14,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  content: {
    marginTop: spacing.m,
  },
});
