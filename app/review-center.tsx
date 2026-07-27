import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useReview } from '../src/context/ReviewContext';
import { ActiveContextType } from '../src/context/AuthContext';
import { REVIEW_SPORT } from '../src/config/reviewMode';

const { width } = Dimensions.get('window');

const ROLES: { id: ActiveContextType; label: string; icon: any }[] = [
  { id: 'FAMILIA', label: '👨‍👩‍👧 FAMILIA', icon: 'group' },
  { id: 'JUGADOR', label: '👦 JUGADOR', icon: 'user' },
  { id: 'ENTRENADOR', label: '👨‍🏫 ENTRENADOR', icon: 'id-badge' },
  { id: 'COORDINADOR', label: '⚽ COORDINADOR', icon: 'shield' },
];

const EQUIPOS_FUTBOL = ['Infantil A', 'Cadete B', 'Alevín C', 'Todos los equipos'];

export default function ReviewCenterScreen() {
  const router = useRouter();
  const { activeReviewRole, setActiveReviewRole, activeReviewTeam, setActiveReviewTeam } = useReview();

  const handleSelectRole = (role: ActiveContextType) => {
    setActiveReviewRole(role);
    if (role === 'ENTRENADOR') setActiveReviewTeam('Infantil A');
    if (role === 'COORDINADOR') setActiveReviewTeam('Todos los equipos');
    router.push('/(drawer)/inicio' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* CABECERA */}
        <View style={styles.header}>
          <Text style={styles.title}>🛠️ MODO REVISIÓN</Text>
          <Text style={styles.subtitle}>⚽ Fútbol</Text>
          <Text style={styles.description}>
            Revisa todos los perfiles y apartados de la aplicación.
          </Text>
        </View>

        {/* CONTROLES */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlBtn} onPress={() => {}}>
            <Text style={styles.controlBtnText}>Volver a deportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtnDanger} onPress={() => {}}>
            <Text style={styles.controlBtnText}>Salir del modo revisión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtnAction} onPress={() => {}}>
            <Text style={styles.controlBtnText}>Ver estado de pantallas</Text>
          </TouchableOpacity>
        </View>

        {/* SELECTOR DE PERFILES */}
        <Text style={styles.sectionTitle}>Selecciona un Perfil para Revisar:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.rolesScroll}>
          {ROLES.map((role) => {
            const isActive = activeReviewRole === role.id;
            return (
              <TouchableOpacity
                key={role.id}
                style={[styles.roleCard, isActive ? styles.roleCardActive : styles.roleCardInactive]}
                onPress={() => handleSelectRole(role.id)}
              >
                <Text style={[styles.roleLabel, isActive ? styles.roleLabelActive : styles.roleLabelInactive]}>
                  {role.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* SELECTOR DE EQUIPO (SOLO ENTRENADOR/COORDINADOR) */}
        {(activeReviewRole === 'ENTRENADOR' || activeReviewRole === 'COORDINADOR') && (
          <View style={styles.teamSection}>
            <Text style={styles.sectionTitle}>Equipo en revisión:</Text>
            <View style={styles.teamGrid}>
              {EQUIPOS_FUTBOL.map((team) => {
                const isActiveTeam = activeReviewTeam === team;
                return (
                  <TouchableOpacity
                    key={team}
                    style={[styles.teamBadge, isActiveTeam ? styles.teamBadgeActive : styles.teamBadgeInactive]}
                    onPress={() => setActiveReviewTeam(team)}
                  >
                    <Text style={[styles.teamLabel, isActiveTeam ? styles.teamLabelActive : styles.teamLabelInactive]}>
                      {team}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F4D',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4FC3F7',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#81D4FA',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  controlBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  controlBtnDanger: {
    backgroundColor: 'rgba(239,68,68,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ef4444',
  },
  controlBtnAction: {
    backgroundColor: 'rgba(79,195,247,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4FC3F7',
  },
  controlBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  rolesScroll: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  roleCard: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    minWidth: 160,
    alignItems: 'center',
  },
  roleCardActive: {
    backgroundColor: '#81D4FA', // Celeste
    borderColor: '#FFFFFF', // Borde blanco
    shadowColor: '#81D4FA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  roleCardInactive: {
    backgroundColor: '#0B1F4D', // Azul marino
    borderColor: '#81D4FA', // Borde celeste
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '900',
  },
  roleLabelActive: {
    color: '#0B1F4D', // Texto azul marino
  },
  roleLabelInactive: {
    color: '#FFFFFF', // Texto blanco
  },
  teamSection: {
    marginTop: 20,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  teamBadge: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  teamBadgeActive: {
    backgroundColor: '#4FC3F7',
    borderColor: '#4FC3F7',
  },
  teamBadgeInactive: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.2)',
  },
  teamLabel: {
    fontWeight: '700',
    fontSize: 14,
  },
  teamLabelActive: {
    color: '#0B1F4D',
  },
  teamLabelInactive: {
    color: '#FFFFFF',
  }
});
