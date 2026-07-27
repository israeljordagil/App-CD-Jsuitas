import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRole, UserRole } from '../../context/RoleContext';
import { USER_ROLES } from '../../constants/roles';
import { useRouter } from 'expo-router';

import { useSport } from '../../context/SportContext';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  white: '#FFFFFF',
};

export function GlobalRoleSelector() {
  const { role, setRole } = useRole();
  const { sport, setSport } = useSport();
  const router = useRouter();

  const TABS = [
    { id: 'familias', label: 'Familias', icon: '👨‍👩‍👧‍👦' },
    { id: 'jugador', label: 'Jugador', icon: '👦' },
    { id: 'entrenador', label: 'Entrenador', icon: '👨‍🏫' },
    { id: 'coordinador', label: 'Coordinador', icon: sport === 'baloncesto' ? '🏀' : '⚽' },
  ] as const;

  const handleRoleChange = (newRole: UserRole) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setRole(newRole);
    router.replace('/(drawer)/inicio' as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backBtn}
        onPress={() => setSport(null)}
      >
        <Text style={{ fontSize: 20 }}>⬅️</Text>
      </TouchableOpacity>
      
      {TABS.map((tab) => {
        const isActive = role === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            onPress={() => handleRoleChange(tab.id)}
            style={[
              styles.tabBtn,
              isActive ? styles.tabBtnActive : styles.tabBtnInactive
            ]}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]} numberOfLines={1}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: clubColors.navy, // Base background to blend with SafeArea
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  tabBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 2,
  },
  tabBtnInactive: {
    backgroundColor: clubColors.navy,
    borderWidth: 1,
    borderColor: clubColors.skyPrimary,
  },
  tabBtnActive: {
    backgroundColor: clubColors.skyPrimary,
    borderWidth: 1,
    borderColor: clubColors.skyPrimary,
  },
  icon: {
    fontSize: 16,
    marginBottom: 4,
  },
  iconActive: {
    fontSize: 22, // Icono grande
  },
  label: {
    color: clubColors.white,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelActive: {
    fontWeight: '900',
    fontSize: 11,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  }
});
