import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type CoachBadgeType = 'principal' | 'segundo' | 'pendiente';

interface CoachBadgeProps {
  type: CoachBadgeType;
  style?: any;
}

export function CoachBadge({ type, style }: CoachBadgeProps) {
  let badgeStyle = styles.principalBadge;
  let textStyle = styles.principalText;
  let text = '🟢 ENTRENADOR PRINCIPAL';

  if (type === 'segundo') {
    badgeStyle = styles.segundoBadge;
    textStyle = styles.segundoText;
    text = '🟡 SEGUNDO ENTRENADOR';
  } else if (type === 'pendiente') {
    badgeStyle = styles.pendienteBadge;
    textStyle = styles.pendienteText;
    text = '⚪ PENDIENTE';
  }

  return (
    <View style={[styles.badgeContainer, badgeStyle, style]}>
      <Text style={[styles.badgeText, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  principalBadge: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  principalText: {
    color: '#166534',
  },
  segundoBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
  },
  segundoText: {
    color: '#854D0E',
  },
  pendienteBadge: {
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
  },
  pendienteText: {
    color: '#475569',
  },
});
