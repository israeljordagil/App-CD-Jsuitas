import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { useAuth, ActiveContextType } from '../../src/context/AuthContext';
import { useSport } from '../../src/context/SportContext';
import { useRouter } from 'expo-router';

import { FamiliaDashboard } from '../../src/components/dashboards/FamiliaDashboard';
import { JugadorDashboard } from '../../src/components/dashboards/JugadorDashboard';
import { EntrenadorDashboard } from '../../src/components/dashboards/EntrenadorDashboard';
import { CoordinadorDashboard } from '../../src/components/dashboards/CoordinadorDashboard';

const PROFILES: { id: ActiveContextType; label: string; icon: string }[] = [
  { id: 'FAMILIA', label: 'Familia', icon: '👨‍👩‍👧' },
  { id: 'JUGADOR', label: 'Jugador', icon: '👦' },
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭' },
];

export default function DashboardRouterScreen() {
  const { activeContext, switchContext } = useAuth();
  const { sport, setSport } = useSport();
  const router = useRouter();

  const getSportName = () => {
    switch (sport) {
      case 'futbol': return '⚽ FÚTBOL';
      case 'futbol_sala': return '⚽🥅 FÚTBOL SALA';
      case 'baloncesto': return '🏀 BALONCESTO';
      case 'voleibol': return '🏐 VOLEIBOL';
      default: return 'DEPORTE';
    }
  };

  const handleBackToSports = () => {
    setSport(null);
    router.replace('/');
  };

  const renderDashboard = () => {
    switch (activeContext) {
      case 'FAMILIA': return <FamiliaDashboard />;
      case 'JUGADOR': return <JugadorDashboard />;
      case 'ENTRENADOR': return <EntrenadorDashboard />;
      case 'COORDINADOR': return <CoordinadorDashboard />;
      default: return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <Text style={{color: 'white'}}>Selecciona un perfil arriba</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.mainContainer}>
        
        {/* Cabecera Fija Compacta */}
        <View style={styles.stickyHeader}>
          <PremiumHeader 
            title={getSportName()}
            subtitle="CD JESUITAS"
            showSearchAndActions={false}
            showAvatar={false}
            showBackButton={true}
            onBackPress={handleBackToSports}
          />

          {/* Pestañas de Perfil (Compactas) */}
          <View style={styles.tabsContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsScrollContent}
            >
              {PROFILES.map((profile) => {
                const isActive = activeContext === profile.id;
                return (
                  <TouchableOpacity
                    key={profile.id}
                    style={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]}
                    activeOpacity={0.8}
                    onPress={() => switchContext(profile.id)}
                  >
                    <Text style={styles.tabIcon}>{profile.icon}</Text>
                    <Text style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}>
                      {profile.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* Dashboard del perfil seleccionado con máxima amplitud */}
        <View style={styles.dashboardWrapper}>
          {renderDashboard()}
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#071A3D', 
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#071A3D', 
  },
  stickyHeader: {
    zIndex: 10,
    backgroundColor: '#071A3D',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(79, 195, 247, 0.2)',
  },
  tabsContainer: {
    paddingVertical: 6,
    paddingBottom: 8,
  },
  tabsScrollContent: {
    paddingHorizontal: 14,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: '#4FC3F7', // Celeste cian
    borderColor: '#FFFFFF',
  },
  tabInactive: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
  tabIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: '#071A3D',
    fontWeight: '900',
  },
  tabLabelInactive: {
    color: '#94A3B8',
    fontWeight: '700',
  },
  dashboardWrapper: {
    flex: 1, 
    width: '100%',
    backgroundColor: 'transparent',
  }
});
