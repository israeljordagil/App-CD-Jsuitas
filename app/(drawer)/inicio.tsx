import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { useAuth, ActiveContextType } from '../../src/context/AuthContext';
import { useSport } from '../../src/context/SportContext';
import { useRouter } from 'expo-router';

import { FamiliaDashboard } from '../../src/components/dashboards/FamiliaDashboard';
import { JugadorDashboard } from '../../src/components/dashboards/JugadorDashboard';
import { EntrenadorDashboard } from '../../src/components/dashboards/EntrenadorDashboard';
import { CoordinadorDashboard } from '../../src/components/dashboards/CoordinadorDashboard';
import { DireccionDeportivaDashboard } from '../../src/components/dashboards/DireccionDeportivaDashboard';
import { AdminGeneralDashboard } from '../../src/components/dashboards/AdminGeneralDashboard';

const ALL_PROFILES: { id: ActiveContextType; label: string; icon: string }[] = [
  { id: 'FAMILIA', label: 'Familia', icon: '👨‍👩‍👧' },
  { id: 'JUGADOR', label: 'Jugador', icon: '👦' },
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭' },
  { id: 'DIR_DEPORTIVA', label: 'Dirección deportiva', icon: '📋' },
  { id: 'ADMIN_GENERAL', label: 'Administración', icon: '⚙️' },
];

export default function DashboardRouterScreen() {
  const { user, activeContext, switchContext, isLoading } = useAuth();
  const { sport, setSport } = useSport();
  const router = useRouter();

  // Filtrar perfiles únicamente por los roles autorizados del usuario real de Supabase
  const userRoles = user?.roles || [];
  const availableProfiles = ALL_PROFILES.filter(p => userRoles.includes(p.id));

  const getHeaderTitle = () => {
    if (activeContext === 'ADMIN_GENERAL' && !sport) {
      return 'ADMINISTRACIÓN GENERAL';
    }
    if (activeContext === 'DIR_DEPORTIVA' && !sport) {
      return 'DIRECCIÓN DEPORTIVA';
    }
    switch (sport) {
      case 'futbol': return '⚽ FÚTBOL';
      case 'futbol_sala': return '⚽🥅 FÚTBOL SALA';
      case 'baloncesto': return '🏀 BALONCESTO';
      case 'voleibol': return '🏐 VOLEIBOL';
      default: 
        if (activeContext === 'ADMIN_GENERAL') return 'ADMINISTRACIÓN GENERAL';
        if (activeContext === 'DIR_DEPORTIVA') return 'DIRECCIÓN DEPORTIVA';
        return 'DEPORTE';
    }
  };

  const handleBackToSports = () => {
    setSport(null);
    router.replace('/');
  };

  const renderDashboard = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4FC3F7" />
        </View>
      );
    }

    switch (activeContext) {
      case 'FAMILIA': return <FamiliaDashboard />;
      case 'JUGADOR': return <JugadorDashboard />;
      case 'ENTRENADOR': return <EntrenadorDashboard />;
      case 'COORDINADOR': return <CoordinadorDashboard />;
      case 'DIR_DEPORTIVA': return <DireccionDeportivaDashboard />;
      case 'ADMIN_GENERAL': return <AdminGeneralDashboard />;
      default: return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#EF4444', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
            No se ha podido cargar tu área de acceso.
          </Text>
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
            title={getHeaderTitle()}
            subtitle="CD JESUITAS"
            showSearchAndActions={false}
            showAvatar={false}
            showBackButton={activeContext !== 'ADMIN_GENERAL' && activeContext !== 'DIR_DEPORTIVA'}
            onBackPress={handleBackToSports}
          />

          {/* Pestañas de Perfil (Solo se muestran si el usuario posee MÁS DE UN ROL autorizado) */}
          {availableProfiles.length > 1 && (
            <View style={styles.tabsContainer}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabsScrollContent}
              >
                {availableProfiles.map((profile) => {
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
          )}
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
    backgroundColor: '#4FC3F7',
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
