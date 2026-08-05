import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export type ThemePreference = 'Claro' | 'Oscuro' | 'Automático';

export interface DelegadoColors {
  navyDark: string;
  navyCard: string;
  white: string;
  textMuted: string;
  skyPrimary: string;
  skyGlow: string;
  accentGold: string;
  goldLight: string;
  accentGreen: string;
  accentRed: string;
  borderGlow: string;
  subCardBg: string;
  heroGradient: readonly [string, string];
  isDark: boolean;
}

export const darkColors: DelegadoColors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
  subCardBg: 'rgba(7, 26, 61, 0.6)',
  heroGradient: ['#0B224F', '#071A3D'],
  isDark: true,
};

export const lightColors: DelegadoColors = {
  navyDark: '#F1F5F9',
  navyCard: '#FFFFFF',
  white: '#0F172A',
  textMuted: '#64748B',
  skyPrimary: '#0284C7',
  skyGlow: '#0369A1',
  accentGold: '#D97706',
  goldLight: '#B45309',
  accentGreen: '#059669',
  accentRed: '#DC2626',
  borderGlow: 'rgba(2, 132, 199, 0.2)',
  subCardBg: '#F8FAFC',
  heroGradient: ['#E2E8F0', '#CBD5E1'],
  isDark: false,
};

interface DelegadoThemeContextType {
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => void;
  colors: DelegadoColors;
  isDark: boolean;
}

const STORAGE_KEY = '@delegado_theme_preference';

const DelegadoThemeContext = createContext<DelegadoThemeContextType>({
  themePreference: 'Oscuro',
  setThemePreference: () => {},
  colors: darkColors,
  isDark: true,
});

export const DelegadoThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themePreference, setThemePreferenceState] = useState<ThemePreference>('Oscuro');
  const systemColorScheme = useColorScheme();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(saved => {
      if (saved && (saved === 'Claro' || saved === 'Oscuro' || saved === 'Automático')) {
        setThemePreferenceState(saved as ThemePreference);
      }
    }).catch(() => {});
  }, []);

  const setThemePreference = (pref: ThemePreference) => {
    setThemePreferenceState(pref);
    AsyncStorage.setItem(STORAGE_KEY, pref).catch(() => {});
  };

  const activeTheme = themePreference === 'Automático'
    ? (systemColorScheme === 'light' ? 'Claro' : 'Oscuro')
    : themePreference;

  const isDark = activeTheme === 'Oscuro';
  const colors = isDark ? darkColors : lightColors;

  return (
    <DelegadoThemeContext.Provider value={{ themePreference, setThemePreference, colors, isDark }}>
      {children}
    </DelegadoThemeContext.Provider>
  );
};

export const useDelegadoTheme = () => useContext(DelegadoThemeContext);
