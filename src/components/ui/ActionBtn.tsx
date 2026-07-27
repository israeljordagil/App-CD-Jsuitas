import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Pressable, View } from 'react-native';
import { colors, spacing, typography } from '../../utils/theme';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ActionBtnProps {
  label: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function ActionBtn({ label, icon, onPress, variant = 'primary' }: ActionBtnProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, speed: 20, bounciness: 12 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }).start();
  };

  const isOutline = variant === 'outline';

  const Content = (
    <Animated.View style={[styles.container, { transform: [{ scale }] }, isOutline && styles.outlineContainer]}>
      {variant === 'primary' && !isOutline ? (
        <LinearGradient 
          colors={[colors.sky, '#3AB0E2']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.gradient}
        >
          {icon && <FontAwesome name={icon} size={20} color={colors.white} style={styles.icon} />}
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      ) : variant === 'secondary' && !isOutline ? (
        <LinearGradient 
          colors={[colors.navy, '#0B265C']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.gradient}
        >
          {icon && <FontAwesome name={icon} size={20} color={colors.white} style={styles.icon} />}
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.outlineContent}>
          {icon && <FontAwesome name={icon} size={20} color={colors.sky} style={styles.icon} />}
          <Text style={styles.textOutline}>{label}</Text>
        </View>
      )}
    </Animated.View>
  );

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      {Content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    width: '100%',
    shadowColor: colors.sky,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
  outlineContainer: {
    shadowOpacity: 0.05,
    elevation: 0,
    shadowColor: colors.navy,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)', // Reflejo premium
  },
  outlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.l,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(85, 199, 243, 0.3)', // Borde celeste semitransparente
    backgroundColor: 'rgba(255,255,255,0.8)', // Glassmorphism
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  textOutline: {
    color: colors.sky,
    fontSize: 15,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  icon: {
    marginRight: spacing.m,
  }
});
