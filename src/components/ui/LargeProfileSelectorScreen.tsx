import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useWindowDimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAuth, ActiveContextType } from '../../context/AuthContext';
import { useSport } from '../../context/SportContext';
import { useRouter } from 'expo-router';

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
    description: 'Consulta a tus hijos, equipos, convocatorias, horarios y accede a Mi Zona gamificada.',
    icon: '👨‍👩‍👧‍👦',
    faIcon: 'users',
    accentColor: '#4FC3F7',
    gradientColors: ['rgba(79, 195, 247, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(79, 195, 247, 0.5)',
  },
  {
    id: 'ENTRENADOR' as ActiveContextType,
    title: 'ENTRENADOR',
    subtitle: 'CUERPO TÉCNICO Y MÍSTERS',
    description: 'Gestiona la plantilla de tu equipo, convoca jugadores, prepara tácticas y registra partidos.',
    icon: '👨‍🏫',
    faIcon: 'graduation-cap',
    accentColor: '#10B981',
    gradientColors: ['rgba(16, 185, 129, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(16, 185, 129, 0.5)',
  },
  {
    id: 'COORDINADOR' as ActiveContextType,
    title: 'COORDINACIÓN',
    subtitle: 'DIRECCIÓN Y SUPERVISIÓN',
    description: 'Supervisa todos los equipos, entrenadores, instalaciones y planificación global del club.',
    icon: '🧭',
    faIcon: 'shield',
    accentColor: '#F59E0B',
    gradientColors: ['rgba(245, 158, 11, 0.2)', 'rgba(11, 34, 79, 0.95)'],
    borderColor: 'rgba(245, 158, 11, 0.5)',
  },
];

interface LargeProfileSelectorScreenProps {
  onSelectProfile?: (profileId: ActiveContextType) => void;
}

export function LargeProfileSelectorScreen({ onSelectProfile }: LargeProfileSelectorScreenProps) {
  const { switchContext } = useAuth();
  const { sport, setSport } = useSport();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();
  const isDesktop = screenWidth >= 768;

  const getSportLabel = () => {
    switch (sport) {
      case 'futbol': return 'FÚTBOL';
      case 'futbol_sala': return 'FÚTBOL SALA';
      case 'baloncesto': return 'BALONCESTO';
      case 'voleibol': return 'VOLEIBOL';
      default: return 'DEPORTE';
    }
  };

  const getSportEmoji = () => {
    switch (sport) {
      case 'futbol': return '⚽';
      case 'futbol_sala': return '⚽🥅';
      case 'baloncesto': return '🏀';
      case 'voleibol': return '🏐';
      default: return '🏆';
    }
  };

  const handleSelect = (profileId: ActiveContextType) => {
    switchContext(profileId);
    if (onSelectProfile) {
      onSelectProfile(profileId);
    }
  };

  const handleBackToSports = () => {
    setSport(null);
    router.replace('/');
  };

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER DE SELECCIÓN DE PERFIL */}
        <View style={styles.headerBox}>
          <TouchableOpacity style={styles.backSportBadge} onPress={handleBackToSports} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={16} color={colors.skyPrimary} />
            <Text style={styles.backSportText}>{getSportEmoji()} {getSportLabel()}</Text>
            <Text style={styles.changeSportSub}>(Cambiar deporte)</Text>
          </TouchableOpacity>

          <Text style={styles.title}>SELECCIONA TU PERFIL</Text>
          <Text style={styles.subtitle}>
            Elige el tipo de acceso para gestionar la experiencia en <Text style={{ color: colors.skyPrimary, fontWeight: '800' }}>{getSportLabel()}</Text>
          </Text>
        </View>

        {/* CONTENEDOR DE TARJETAS GRANDES */}
        <View style={[styles.cardsGrid, isDesktop && styles.cardsGridDesktop]}>
          {PROFILE_CARDS.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.85}
              style={[
                styles.largeCard, 
                { borderColor: card.borderColor },
                isDesktop && styles.largeCardDesktop
              ]}
              onPress={() => handleSelect(card.id)}
            >
              <LinearGradient
                colors={card.gradientColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={[styles.iconCircle, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                    <Text style={{ fontSize: 32 }}>{card.icon}</Text>
                  </View>
                  <View style={styles.actionArrow}>
                    <Ionicons name="chevron-forward" size={22} color={card.accentColor} />
                  </View>
                </View>

                <Text style={[styles.cardTitle, { color: card.accentColor }]}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
                <Text style={styles.cardDesc}>{card.description}</Text>

                <View style={styles.enterButtonRow}>
                  <Text style={[styles.enterText, { color: card.accentColor }]}>ENTRAR AL PANEL</Text>
                  <FontAwesome name="arrow-right" size={12} color={card.accentColor} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTÓN VOLVER DEPORTE */}
        <TouchableOpacity style={styles.bottomChangeSportBtn} onPress={handleBackToSports} activeOpacity={0.7}>
          <Ionicons name="grid-outline" size={18} color={colors.textMuted} />
          <Text style={styles.bottomChangeSportText}>Volver al selector de deportes</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  scrollContentDesktop: {
    paddingTop: 60,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  backSportBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.3)',
    marginBottom: 16,
    gap: 8,
  },
  backSportText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  changeSportSub: {
    color: colors.textMuted,
    fontSize: 12,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 480,
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
  largeCard: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  largeCardDesktop: {
    flex: 1,
    maxWidth: 340,
  },
  cardGradient: {
    padding: 24,
    minHeight: 230,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
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
    fontSize: 13,
    lineHeight: 19,
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
  bottomChangeSportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 32,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  bottomChangeSportText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});
