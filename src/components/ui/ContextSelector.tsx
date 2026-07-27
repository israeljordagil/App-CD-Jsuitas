import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useAuth, ActiveContextType } from '../../context/AuthContext';
import { useSport } from '../../context/SportContext';

const TABS: { id: ActiveContextType; label: string; icon: string }[] = [
  { id: 'FAMILIA', label: 'FAMILIA', icon: '👨‍👩‍👧' },
  { id: 'JUGADOR', label: 'JUGADOR', icon: '👦' },
  { id: 'ENTRENADOR', label: 'ENTRENADOR', icon: '👨‍🏫' },
  { id: 'COORDINADOR', label: 'COORDINACIÓN', icon: '🧭' },
];

export function ContextSelector() {
  const { user, activeContext, switchContext } = useAuth();
  const { sport } = useSport();

  // Si no hay deporte seleccionado, o no hay usuario, ocultar la barra superior
  if (!sport || !user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TABS.map((tab) => {
          const isActive = activeContext === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => switchContext(tab.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0B1F4D', // Azul marino corporativo
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Manejo del notch/status bar
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    zIndex: 100,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#4FC3F7', // Celeste
    borderColor: '#FFFFFF',
    shadowColor: '#4FC3F7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
  },
  tabLabelActive: {
    color: '#0B1F4D',
  }
});
