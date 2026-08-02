import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { useAuth, ActiveContextType } from '../../src/context/AuthContext';
import { useSport } from '../../src/context/SportContext';
import { useRouter } from 'expo-router';

import { FamiliaDashboard } from '../../src/components/dashboards/FamiliaDashboard';
import { EntrenadorDashboard } from '../../src/components/dashboards/EntrenadorDashboard';
import { DelegadoDashboard } from '../../src/components/dashboards/DelegadoDashboard';
import { CoordinadorDashboard } from '../../src/components/dashboards/CoordinadorDashboard';
import { DireccionDeportivaDashboard } from '../../src/components/dashboards/DireccionDeportivaDashboard';
import { AdminGeneralDashboard } from '../../src/components/dashboards/AdminGeneralDashboard';

import { useDemoNavigation } from '../../src/context/DemoNavigationContext';

const ALL_PROFILES: { id: ActiveContextType; label: string; icon: string }[] = [
  { id: 'FAMILIA', label: 'Familia', icon: '👨‍👩‍👧' },
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫' },
  { id: 'DELEGADO', label: 'Delegado', icon: '📋' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭' },
  { id: 'DIR_DEPORTIVA', label: 'Dirección deportiva', icon: '📊' },
  { id: 'ADMIN_GENERAL', label: 'Administración', icon: '⚙️' },
];

export default function DashboardRouterScreen() {
  const { selectedDemoProfile, setSelectedDemoProfile } = useDemoNavigation();
  const { user, activeContext, switchContext, isLoading } = useAuth();
  const { sport, setSport } = useSport();
  const router = useRouter();

  // El perfil de demo prevalece de forma absoluta durante la demostración
  const effectiveProfile = selectedDemoProfile || activeContext || 'FAMILIA';

  const userRoles = user?.roles || [];
  const availableProfiles = ALL_PROFILES.filter(p => userRoles.includes(p.id));

  const getHeaderTitle = () => {
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

  const handleChangeProfile = () => {
    setSport(null);
    setSelectedDemoProfile(null);
    switchContext(null as any);
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

    switch (effectiveProfile) {
      case 'FAMILIA': 
        return <FamiliaDashboard />;
      case 'ENTRENADOR': 
        return <EntrenadorDashboard />;
      case 'DELEGADO':
        return <DelegadoDashboard />;
      case 'COORDINADOR': 
        return <CoordinadorDashboard />;
      case 'DIR_DEPORTIVA': 
        return <DireccionDeportivaDashboard />;
      case 'ADMIN_GENERAL': 
        return <AdminGeneralDashboard />;
      default: 
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: '700' }}>Perfil no reconocido</Text>
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
            subtitle={`Perfil activo: ${effectiveProfile === 'ENTRENADOR' ? 'Entrenador' : effectiveProfile === 'DELEGADO' ? 'Delegado' : effectiveProfile === 'COORDINADOR' ? 'Coordinación' : 'Familia'}`}
            showSearchAndActions={false}
            showAvatar={false}
            showBackButton={false}
          />

          {/* BARRA COMPACTA DE ACCIONES DE CAMBIO EN DEMO */}
          <View style={styles.demoChangeActionsRow}>
            <TouchableOpacity 
              style={styles.changeSportBtn} 
              onPress={handleBackToSports}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 12 }}>⚽</Text>
              <Text style={styles.changeSportBtnText}>Cambiar deporte</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.changeProfileBtn} 
              onPress={handleChangeProfile}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 12 }}>👥</Text>
              <Text style={styles.changeProfileBtnText}>Cambiar perfil</Text>
            </TouchableOpacity>
          </View>

          {/* Pestañas de Perfil (Solo si el usuario posee MÁS DE UN ROL) */}
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

        {/* Dashboard del perfil seleccionado */}
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
    paddingVertical: 4,
    paddingBottom: 6,
  },
  tabsScrollContent: {
    paddingHorizontal: 14,
    gap: 6,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 10,
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
    fontSize: 13,
    marginRight: 4,
  },
  tabLabel: {
    fontSize: 11,
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
  },
  demoChangeActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'rgba(11, 31, 77, 0.6)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  changeProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.4)',
    gap: 4,
  },
  changeProfileBtnText: {
    color: '#4FC3F7',
    fontSize: 11,
    fontWeight: '800',
  },
  changeSportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    gap: 4,
  },
  changeSportBtnText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '800',
  },
});
