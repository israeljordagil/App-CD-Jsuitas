export const colors = {
  // Official CD Jesuitas Identity
  navy: '#071A3D',
  sky: '#55C7F3',
  white: '#FFFFFF',
  background: '#041026', // Deep dark navy
  text: '#FFFFFF',       // Inverted for readability
  muted: 'rgba(255,255,255,0.6)', // Light translucent text
  border: 'rgba(85, 199, 243, 0.2)', // Soft sky border
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444'
};

export const spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    small: 12,
    base: 16,
    large: 20,
    h2: 24,
    h1: 32,
    score: 48,
  },
  weights: {
    normal: '400' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  }
};
