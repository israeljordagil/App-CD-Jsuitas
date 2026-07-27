import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../utils/theme';

interface AnimatedCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  flex?: number; // for grid layouts
  delay?: number; // for staggered entry animation
}

export function AnimatedCard({ title, subtitle, children, style, onPress, flex, delay = 0 }: AnimatedCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      })
    ]).start();
  }, [delay]);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 12,
    }).start();
  };

  const CardContent = (
    <Animated.View style={[
      styles.card, 
      { transform: [{ scale }, { translateY: slideAnim }], opacity: fadeAnim }, 
      flex ? { flex } : {}, 
      style
    ]}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={flex ? { flex } : {}}>
        {CardContent}
      </Pressable>
    );
  }

  return CardContent;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Glassmorphism base
    borderRadius: 24,
    padding: spacing.l,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(85, 199, 243, 0.3)', // Celeste fine border
    // Sombras sutiles oscuras para dar profundidad
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
    // (backdrop-filter no soportado en RN puro, simulamos con opacidad y border)
  },
  header: {
    marginBottom: spacing.m,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text, // now white
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.sky, // highlight in sky
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
});
