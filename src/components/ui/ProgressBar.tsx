import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors } from '../../utils/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color = colors.sky, height = 10 }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 1);
  const widthAnim = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.spring(widthAnim, {
        toValue: safeProgress * containerWidth,
        useNativeDriver: false,
        bounciness: 8,
        speed: 12,
      }).start();
    }
  }, [safeProgress, containerWidth]);

  return (
    <View 
      style={[styles.container, { height }]} 
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.fill, { width: widthAnim, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(7, 26, 61, 0.05)', // fondo muy sutil
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  }
});
