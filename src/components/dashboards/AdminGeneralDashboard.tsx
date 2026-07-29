import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';

interface AdminModuleCard {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
  color: string;
  route?: string;
}

const ADMIN_MODULES: AdminModuleCard[] = [
  {
    id: 'people',
    title: 'Centro de Personas',
    subtitle: 'Gestión única de personas, roles, equipos e historial',
    icon: 'people-outline',
    badge: 'NÚCLEO',
    color: '#4FC3F7',
    route: '/(drawer)/personas',
  },
  {
    id: 'users',
    title: 'Usuarios y Roles',
    subtitle: 'Gestión de permisos, perfiles y accesos',
    icon: 'people-circle-outline',
    badge: 'ACTIVO',
    color: '#4FC3F7',
    route: '/(drawer)/usuarios-roles',
  },
  {
    id: 'sports',
    title: 'Deportes',
    subtitle: 'Fútbol, Fútbol Sala, Basket y Vóley',
    icon: 'trophy-outline',
    badge: 'Próximamente',
    color: '#F59E0B',
  },
  {
    id: 'teams',
    title: 'Equipos',
    subtitle: 'Configuración de plantilla por categoría',
    icon: 'shirt-outline',
    badge: 'Próximamente',
    color: '#10B981',
  },
  {
    id: 'players',
    title: 'Jugadores',
    subtitle: 'Censo oficial y licencias de deportistas',
    icon: 'body-outline',
    badge: 'Próximamente',
    color: '#8B5CF6',
  },
  {
    id: 'coaches',
    title: 'Entrenadores',
    subtitle: 'Cuerpo técnico y delegados asignados',
    icon: 'briefcase-outline',
    badge: 'Próximamente',
    color: '#EC4899',
  },
  {
    id: 'calendar',
    title: 'Calendario General',
    subtitle: 'Horarios, partidos e instalaciones',
    icon: 'calendar-outline',
    badge: 'Próximamente',
    color: '#3B82F6',
  },
  {
    id: 'comms',
    title: 'Comunicados',
    subtitle: 'Notificaciones oficiales del club',
    icon: 'megaphone-outline',
    badge: 'Próximamente',
    color: '#14B8A6',
  },
  {
    id: 'config',
    title: 'Configuración',
    subtitle: 'Ajustes institucionales y parámetros',
    icon: 'settings-outline',
    badge: 'Próximamente',
    color: '#64748B',
  },
];

export function AdminGeneralDashboard() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* CABECERA INSTITUCIONAL */}
      <View style={styles.headerBox}>
        <LinearGradient 
          colors={['rgba(79, 195, 247, 0.15)', 'rgba(11, 31, 77, 0.4)']} 
          style={styles.headerGradient}
        >
          <View style={styles.badgeRow}>
            <View style={styles.adminBadge}>
              <Ionicons name="shield-checkmark" size={14} color="#4FC3F7" />
              <Text style={styles.adminBadgeText}>ADMINISTRACIÓN GENERAL</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>Panel de Administración</Text>
          <Text style={styles.headerSub}>Control general de CD Jesuitas</Text>
        </LinearGradient>
      </View>

      {/* REJILLA DE MÓDULOS */}
      <View style={[styles.grid, isDesktop && styles.gridDesktop]}>
        {ADMIN_MODULES.map((module) => (
          <TouchableOpacity 
            key={module.id} 
            style={[styles.card, isDesktop && styles.cardDesktop]}
            activeOpacity={0.8}
            onPress={() => {
              if (module.route) {
                router.push(module.route as any);
              }
            }}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: `${module.color}20` }]}>
                <Ionicons name={module.icon} size={24} color={module.color} />
              </View>
              {module.badge && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{module.badge}</Text>
                </View>
              )}
            </View>

            <Text style={styles.cardTitle}>{module.title}</Text>
            <Text style={styles.cardSub}>{module.subtitle}</Text>

            <View style={styles.cardFooter}>
              <Text style={[styles.cardAction, { color: module.color }]}>Acceder</Text>
              <Ionicons name="chevron-forward" size={14} color={module.color} />
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  headerBox: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
  headerGradient: {
    padding: 20,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  adminBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
  },
  adminBadgeText: {
    color: '#4FC3F7',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridDesktop: {
    gap: 16,
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(15, 30, 70, 0.7)',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
  },
  cardDesktop: {
    width: '48.5%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  badgeText: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 16,
    marginBottom: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  cardAction: {
    fontSize: 12,
    fontWeight: '800',
  },
});
