import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  useWindowDimensions, 
  Animated, 
  ImageBackground, 
  Image, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSport, SportType } from '../../context/SportContext';
import { useAuth, ActiveContextType } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

// Colores corporativos de lujo
const colors = {
  navyDark: '#020814',
  navyDeep: '#0B1F4D',
  navyCard: 'rgba(15, 30, 70, 0.85)',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.3)',
};

const SPORTS = [
  { 
    id: 'futbol', 
    label: 'FÚTBOL', 
    category: 'F11 & F8',
    description: 'Equipos, entrenamientos, convocatorias, partido en directo y actas.',
    colorAccent: '#10B981', // Verde Césped
    gradientColors: ['rgba(16, 185, 129, 0.5)', 'rgba(5, 150, 105, 0.95)'],
    badgeText: '18 EQUIPOS',
    nextEvent: 'Sáb 10:00 vs Levante',
    unreadCount: 3,
    image3D: require('../../../assets/images/soccer_ball_3d.png'),
    bgImage: require('../../../assets/images/cesped-futbol.jpg'),
  },
  { 
    id: 'futbol_sala', 
    label: 'FÚTBOL SALA', 
    category: 'Futsal 5v5',
    description: 'Rotaciones rápidas, faltas acumuladas, marcador y cronómetro.',
    colorAccent: '#0284C7', // Azul Pista
    gradientColors: ['rgba(2, 132, 199, 0.5)', 'rgba(3, 105, 161, 0.95)'],
    badgeText: '5 EQUIPOS',
    nextEvent: 'Hoy 18:30 Sesión Pista',
    unreadCount: 1,
    image3D: require('../../../assets/images/futsal_ball_3d.png'),
    bgImage: require('../../../assets/images/pista-futbol-sala.jpg'),
  },
  { 
    id: 'baloncesto', 
    label: 'BALONCESTO', 
    category: 'Basket 5v5',
    description: 'Cuartos, quinteto inicial, tiros de 1-2-3 y faltas personales.',
    colorAccent: '#F97316', // Naranja Balón
    gradientColors: ['rgba(249, 115, 22, 0.5)', 'rgba(194, 65, 12, 0.95)'],
    badgeText: '4 EQUIPOS',
    nextEvent: 'Dom 12:00 vs Valencia Basket',
    unreadCount: 2,
    image3D: require('../../../assets/images/basketball_3d.png'),
    bgImage: require('../../../assets/images/pista-baloncesto.jpg'),
  },
  { 
    id: 'voleibol', 
    label: 'VOLEIBOL', 
    category: 'Vóley 6v6',
    description: 'Sets, rotaciones P1-P6, líbero, saques y recepción.',
    colorAccent: '#8B5CF6', // Morado Vóley
    gradientColors: ['rgba(139, 92, 246, 0.5)', 'rgba(109, 40, 217, 0.95)'],
    badgeText: '4 EQUIPOS',
    nextEvent: 'Sáb 12:30 Liga Escolar',
    unreadCount: 0,
    image3D: require('../../../assets/images/volleyball_3d.png'),
    bgImage: require('../../../assets/images/pista-voleibol.jpg'),
  },
];

const ROLES_INFO: { id: ActiveContextType; label: string; icon: string }[] = [
  { id: 'FAMILIA', label: 'Familia', icon: '👨‍👩‍👧‍👦' },
  { id: 'JUGADOR', label: 'Jugador', icon: '🧑‍🎽' },
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭' },
];

export function SportSelectionScreen() {
  const { setSport } = useSport();
  const { user, activeContext, switchContext, loginAsCoachInfantilA } = useAuth();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const isTablet = screenWidth >= 768;

  // Animaciones
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de pulso del escudo
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // Flotación suave de balones
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -6, duration: 2000, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleSelectSport = (sportId: SportType) => {
    setSport(sportId);
    if (!activeContext) {
      switchContext('FAMILIA');
    }
    router.replace('/(drawer)/inicio' as any);
  };

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.mainContainer}>
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={[styles.contentContainer, isTablet && styles.contentContainerTablet]} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* BARRA SUPERIOR DE CONTEXTO / USUARIO */}
        <View style={styles.topContextBar}>
          <View style={styles.userInfoRow}>
            <View style={styles.userAvatarBadge}>
              <Text style={{ fontSize: 16 }}>{activeContext === 'ENTRENADOR' ? '👨‍🏫' : activeContext === 'JUGADOR' ? '🧑‍🎽' : '👨‍👩‍👧‍👦'}</Text>
            </View>
            <View>
              <Text style={styles.userGreeting}>Buenos días,</Text>
              <Text style={styles.userName}>{user?.full_name || 'Familia Martínez'}</Text>
            </View>
          </View>

          <View style={styles.roleBadgesGroup}>
            {ROLES_INFO.map(r => {
              const isActive = activeContext === r.id;
              return (
                <TouchableOpacity 
                  key={r.id} 
                  style={[styles.rolePill, isActive && styles.rolePillActive]}
                  onPress={() => switchContext(r.id)}
                >
                  <Text style={{ fontSize: 11 }}>{r.icon}</Text>
                  <Text style={[styles.rolePillText, isActive && styles.rolePillTextActive]}>{r.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* HERO HEADER PRINCIPAL CON ESCUDO GLOW */}
        <View style={styles.heroHeader}>
          <Animated.View style={[styles.escudoWrapper, { transform: [{ scale: pulseAnim }] }]}>
            <Image 
              source={require('../../../assets/images/escudo-jesuitas.png')}
              style={styles.escudoImage}
              resizeMode="contain"
            />
          </Animated.View>

          <Text style={styles.heroTitle}>CD JESUITAS</Text>
          <View style={styles.mottoBadge}>
            <Text style={styles.mottoText}>DEPORTE & VALORES • TEMPORADA 2026/2027</Text>
          </View>
          <Text style={styles.heroSub}>Selecciona la modalidad para acceder a tu área deportiva</Text>
        </View>

        {/* ACCESO RÁPIDO PROBAR ENTRENADOR */}
        <TouchableOpacity style={styles.quickCoachBanner} onPress={() => loginAsCoachInfantilA()}>
          <LinearGradient colors={['#22c55e', '#15803d']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.quickCoachGradient}>
            <Text style={{fontSize: 20, marginRight: 8}}>👨‍🏫</Text>
            <View style={{flex: 1}}>
              <Text style={styles.quickCoachTitle}>Acceso de Prueba: Entrenador Infantil A</Text>
              <Text style={styles.quickCoachSub}>Entra directo al panel táctico y plantilla del Infantil A</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* PARRILLA RESPONSIVA DE DEPORTES */}
        <Text style={styles.sectionLabel}>NUESTROS 4 DEPORTES</Text>
        
        <View style={[styles.sportsGrid, isTablet && styles.sportsGridTablet]}>
          {SPORTS.map((sport) => {
            return (
              <TouchableOpacity
                key={sport.id}
                activeOpacity={0.9}
                style={[styles.cardContainer, isTablet && styles.cardContainerTablet]}
                onPress={() => handleSelectSport(sport.id as SportType)}
              >
                <View style={styles.cardFrame}>
                  <ImageBackground source={sport.bgImage} style={styles.cardBgImage} resizeMode="cover">
                    <LinearGradient colors={sport.gradientColors} style={StyleSheet.absoluteFillObject} />
                    
                    {/* Header de la tarjeta */}
                    <View style={styles.cardHeader}>
                      <View style={styles.badgeCategory}>
                        <Text style={styles.badgeCategoryText}>{sport.category}</Text>
                      </View>
                      {sport.unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                          <Text style={styles.unreadBadgeText}>{sport.unreadCount} AVISOS</Text>
                        </View>
                      )}
                    </View>

                    {/* Icono 3D flotante en centro exacto del círculo */}
                    <Animated.View style={[styles.ballContainer, { transform: [{ translateY: floatAnim }] }]}>
                      <View style={styles.ballCircleContainer}>
                        <Image source={sport.image3D} style={styles.ball3DImage} resizeMode="contain" />
                      </View>
                    </Animated.View>

                    {/* Título y Detalles */}
                    <View style={styles.cardBody}>
                      <Text style={styles.sportTitle}>{sport.label}</Text>
                      <Text style={styles.sportDesc} numberOfLines={2}>{sport.description}</Text>

                      {/* Próxima Actividad */}
                      <View style={styles.nextEventBox}>
                        <Ionicons name="calendar-outline" size={12} color={colors.skyPrimary} />
                        <Text style={styles.nextEventText} numberOfLines={1}>{sport.nextEvent}</Text>
                      </View>
                    </View>

                    {/* Botón Acción Entrar */}
                    <View style={[styles.enterBtn, { backgroundColor: sport.colorAccent }]}>
                      <Text style={styles.enterBtnText}>ACCEDER</Text>
                      <FontAwesome name="arrow-right" size={12} color="#fff" />
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PIE DE PÁGINA INSTITUCIONAL */}
        <View style={styles.footer}>
          <Text style={styles.footerClub}>Club Deportivo Colegio Jesuitas</Text>
          <Text style={styles.footerCopy}>Sistema Integrado de Gestión Deportiva • 2026</Text>
        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
    backgroundColor: colors.navyDark 
  },
  scroll: { 
    flex: 1,
    width: '100%'
  },
  contentContainer: { 
    paddingTop: Platform.OS === 'ios' ? 60 : 40, 
    paddingBottom: 60, 
    paddingHorizontal: 16,
    minHeight: '100%'
  },
  contentContainerTablet: { 
    paddingHorizontal: 40, 
    maxWidth: 1100, 
    alignSelf: 'center', 
    width: '100%' 
  },

  // BARRA DE CONTEXTO SUPERIOR
  topContextBar: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    flexDirection: 'column',
    gap: 12,
  },
  userInfoRow: { flexDirection: 'row', alignItems: 'center' },
  userAvatarBadge: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 10
  },
  userGreeting: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  userName: { fontSize: 15, color: colors.white, fontWeight: '900' },

  roleBadgesGroup: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  rolePill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  rolePillActive: { backgroundColor: colors.navyDeep, borderColor: colors.skyPrimary },
  rolePillText: { fontSize: 11, fontWeight: '700', color: colors.textMuted },
  rolePillTextActive: { color: colors.skyPrimary, fontWeight: '900' },

  // HERO HEADER
  heroHeader: { alignItems: 'center', marginBottom: 24 },
  escudoWrapper: { width: 90, height: 90, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  escudoImage: { width: 80, height: 80 },

  heroTitle: { fontSize: 26, fontWeight: '900', color: colors.white, letterSpacing: 2, textAlign: 'center' },
  mottoBadge: {
    backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 12, paddingVertical: 4,
    borderRadius: 12, marginTop: 6, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)'
  },
  mottoText: { fontSize: 10, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1 },
  heroSub: { fontSize: 13, color: colors.textMuted, marginTop: 8, textAlign: 'center', fontWeight: '500' },

  // BANNER RAPIDO COACH
  quickCoachBanner: { marginBottom: 24, borderRadius: 16, overflow: 'hidden' },
  quickCoachGradient: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  quickCoachTitle: { color: '#fff', fontSize: 14, fontWeight: '900' },
  quickCoachSub: { color: 'rgba(255,255,255,0.85)', fontSize: 11, fontWeight: '600' },

  sectionLabel: { fontSize: 12, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 16, textAlign: 'center' },

  // PARRILLA RESPONSIVA
  sportsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  sportsGridTablet: { gap: 20 },

  cardContainer: { width: '100%', borderRadius: 24, overflow: 'hidden' },
  cardContainerTablet: { width: '48%' },

  cardFrame: {
    borderRadius: 24, borderWidth: 1, borderColor: colors.borderGlow,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6
  },
  cardBgImage: { padding: 16, minHeight: 230, justifyContent: 'space-between' },

  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 },
  badgeCategory: { backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  badgeCategoryText: { color: '#fff', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },

  unreadBadge: { backgroundColor: colors.accentGold, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  unreadBadgeText: { color: '#000', fontSize: 9, fontWeight: '900' },

  ballContainer: { width: '100%', alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
  ballCircleContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4
  },
  ball3DImage: { width: 58, height: 58, alignSelf: 'center' },

  cardBody: { gap: 4 },
  sportTitle: { fontSize: 20, fontWeight: '900', color: '#fff', letterSpacing: 1 },
  sportDesc: { fontSize: 12, color: 'rgba(255,255,255,0.85)', lineHeight: 16, fontWeight: '500' },

  nextEventBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: 4
  },
  nextEventText: { fontSize: 11, color: colors.skyGlow, fontWeight: '700' },

  enterBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8,
    paddingVertical: 12, borderRadius: 14, marginTop: 8
  },
  enterBtnText: { color: '#fff', fontSize: 12, fontWeight: '900', letterSpacing: 1 },

  footer: { marginTop: 40, alignItems: 'center', paddingBottom: 20 },
  footerClub: { color: colors.white, fontSize: 12, fontWeight: '800' },
  footerCopy: { color: colors.textMuted, fontSize: 10, marginTop: 2 }
});
