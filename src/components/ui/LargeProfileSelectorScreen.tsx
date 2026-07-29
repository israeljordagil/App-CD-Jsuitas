import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useWindowDimensions,
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAuth, ActiveContextType } from '../../context/AuthContext';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  accentGreen: '#10B981',
  accentGold: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.3)',
};

const PROFILE_CARDS = [
  {
    id: 'FAMILIA' as ActiveContextType,
    title: 'FAMILIA',
    subtitle: 'ÁREA DE PADRES Y TUTORES',
    description: 'Consulta a tus hijos, equipos, convocatorias, calendario y Mi Zona.',
    icon: '👨‍👩‍👧‍👦',
    accentColor: '#4FC3F7',
    gradientColors: ['rgba(79, 195, 247, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(79, 195, 247, 0.5)',
  },
  {
    id: 'ENTRENADOR' as ActiveContextType,
    title: 'ENTRENADOR',
    subtitle: 'CUERPO TÉCNICO Y MÍSTERS',
    description: 'Gestiona plantilla, entrenamientos, convocatorias, tácticas y partidos.',
    icon: '👨‍🏫',
    accentColor: '#10B981',
    gradientColors: ['rgba(16, 185, 129, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    id: 'COORDINADOR' as ActiveContextType,
    title: 'COORDINACIÓN',
    subtitle: 'DIRECCIÓN Y SUPERVISIÓN',
    description: 'Supervisa equipos, entrenadores, planificación e instalaciones.',
    icon: '🧭',
    accentColor: '#F59E0B',
    gradientColors: ['rgba(245, 158, 11, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
];

interface LargeProfileSelectorScreenProps {
  onSelectProfile: (profileId: ActiveContextType) => void;
}

export function LargeProfileSelectorScreen({ onSelectProfile }: LargeProfileSelectorScreenProps) {
  const { switchContext } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const isDesktop = screenWidth >= 900;
  const isTablet = screenWidth >= 600 && screenWidth < 900;

  const handleSelect = (profileId: ActiveContextType) => {
    switchContext(profileId);
    onSelectProfile(profileId);
  };

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER PRINCIPAL PERFIL PRIMERO */}
        <View style={styles.headerBox}>
          <View style={styles.clubBadgeRow}>
            <Text style={{ fontSize: 18, marginRight: 6 }}>🛡️</Text>
            <Text style={styles.clubBadgeText}>CD JESUITAS</Text>
          </View>

          <Text style={styles.title}>Selecciona un perfil para continuar</Text>
          <Text style={styles.subtitle}>Modo demostración</Text>
        </View>

        {/* CONTENEDOR DE TARJETAS GRANDES */}
        <View style={[
          styles.cardsGrid, 
          isDesktop && styles.cardsGridDesktop,
          isTablet && styles.cardsGridTablet
        ]}>
          {PROFILE_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.85}
              style={[
                styles.largeCard, 
                { borderColor: card.borderColor },
                isDesktop && styles.largeCardDesktop,
                isTablet && styles.largeCardTablet
              ]}
              onPress={() => handleSelect(card.id)}
            >
              <LinearGradient
                colors={card.gradientColors as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                    <Text style={{ fontSize: 36 }}>{card.icon}</Text>
                  </View>
                  <View style={styles.actionArrow}>
                    <Ionicons name="chevron-forward" size={22} color={card.accentColor} />
                  </View>
                </View>

                <Text style={[styles.cardTitle, { color: card.accentColor }]}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                <Text style={styles.cardDesc}>{card.description}</Text>

                <View style={styles.enterButtonRow}>
                  <Text style={[styles.enterText, { color: card.accentColor }]}>SELECCIONAR PERFIL</Text>
                  <FontAwesome name="arrow-right" size={12} color={card.accentColor} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* PIE DE PÁGINA INSTITUCIONAL CON IDENTIFICADOR VISUAL */}
        <View style={styles.footer}>
          <Text style={styles.footerClub}>Club Deportivo Colegio Jesuitas</Text>
          <Text style={styles.footerCopy}>Sistema Integrado de Gestión Deportiva • 2026</Text>
          <Text style={styles.buildBadge}>COMPILACIÓN: PLAYERCARD-DEFINITIVO-01</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  scrollContentDesktop: {
    paddingTop: 70,
    maxWidth: 1150,
    alignSelf: 'center',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 36,
    width: '100%',
  },
  clubBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
    marginBottom: 16,
  },
  clubBadgeText: {
    color: colors.white,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 1,
  },
  title: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    color: colors.skyPrimary,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  cardsGrid: {
    width: '100%',
    gap: 20,
  },
  cardsGridDesktop: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },
  cardsGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  largeCard: {
    width: '100%',
    borderRadius: 22,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  largeCardDesktop: {
    flex: 1,
    maxWidth: 350,
  },
  largeCardTablet: {
    width: '47%',
    minWidth: 280,
  },
  cardGradient: {
    padding: 26,
    minHeight: 240,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  cardSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardDesc: {
    color: colors.textMuted,
    fontSize: 13.5,
    lineHeight: 20,
    marginBottom: 20,
  },
  enterButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  enterText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerClub: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  footerCopy: {
    color: colors.textMuted,
    fontSize: 9,
    marginTop: 2,
  },
  buildBadge: {
    color: colors.skyPrimary,
    fontSize: 10,
    fontWeight: '900',
    marginTop: 6,
    letterSpacing: 1,
  },
});
