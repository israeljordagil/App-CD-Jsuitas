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
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭' },
];

interface SportSelectionScreenProps {
  onChangeProfile?: () => void;
}

export function SportSelectionScreen({ onChangeProfile }: SportSelectionScreenProps) {
  const { setSport } = useSport();
  const { user, activeContext, switchContext, loginAsCoachInfantilA } = useAuth();
  const router = useRouter();
  const { width: screenWidth } = useWindowDimensions();

  const isDesktop = screenWidth >= 640;

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -2, duration: 2000, useNativeDriver: true }),
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

  const renderSportCard = (sport: typeof SPORTS[0]) => {
    return (
      <TouchableOpacity
        key={sport.id}
        activeOpacity={0.9}
        style={styles.cardTouchable}
        onPress={() => handleSelectSport(sport.id as SportType)}
      >
        <View style={styles.cardFrame}>
          <ImageBackground source={sport.bgImage} style={styles.cardBgImage} resizeMode="cover">
            <LinearGradient colors={sport.gradientColors} style={StyleSheet.absoluteFillObject} />
            
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

            <View style={styles.cardMainRow}>
              <View style={styles.cardTextCol}>
                <Text style={styles.sportTitle}>{sport.label}</Text>
                <Text style={styles.sportDesc} numberOfLines={1}>{sport.description}</Text>
              </View>

              <Animated.View style={[styles.ballContainer, { transform: [{ translateY: floatAnim }] }]}>
                <View style={styles.ballCircleContainer}>
                  <Image source={sport.image3D} style={styles.ball3DImage} resizeMode="contain" />
                </View>
              </Animated.View>
            </View>

            <View style={styles.nextEventBox}>
              <Ionicons name="calendar-outline" size={10} color={colors.skyPrimary} />
              <Text style={styles.nextEventText} numberOfLines={1}>{sport.nextEvent}</Text>
            </View>

            <View style={[styles.enterBtn, { backgroundColor: sport.colorAccent }]}>
              <Text style={styles.enterBtnText}>ACCEDER</Text>
              <FontAwesome name="arrow-right" size={9.5} color="#fff" />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={[colors.navyDeep, colors.navyDark]} style={styles.mainContainer}>
      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={[styles.contentContainer, isDesktop && styles.contentContainerDesktop]} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* BARRA SUPERIOR DE PERFIL ACTIVO Y BOTÓN CAMBIAR PERFIL */}
        <View style={styles.topContextBar}>
          <View style={styles.userInfoRow}>
            <View style={styles.userAvatarBadge}>
              <Text style={{ fontSize: 14 }}>
                {activeContext === 'ENTRENADOR' ? '👨‍🏫' : activeContext === 'COORDINADOR' ? '🧭' : '👨‍👩‍👧‍👦'}
              </Text>
            </View>
            <View>
              <Text style={styles.userGreeting}>Perfil activo:</Text>
              <Text style={styles.userName}>
                {activeContext === 'ENTRENADOR' ? 'Entrenador' : activeContext === 'COORDINADOR' ? 'Coordinación' : 'Familia'}
              </Text>
            </View>
          </View>

          {onChangeProfile && (
            <TouchableOpacity 
              style={styles.changeProfileTopBtn}
              onPress={onChangeProfile}
              activeOpacity={0.8}
            >
              <Ionicons name="swap-horizontal" size={14} color={colors.skyPrimary} />
              <Text style={styles.changeProfileTopText}>Cambiar perfil</Text>
            </TouchableOpacity>
          )}
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
        </View>

        {/* ACCESO RÁPIDO PROBAR ENTRENADOR (SOLO SI DEMO_ACCESS ESTÁ ACTIVADO) */}
        {process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS === 'true' && (
          <TouchableOpacity style={styles.quickCoachBanner} onPress={() => loginAsCoachInfantilA()}>
            <LinearGradient colors={['#22c55e', '#15803d']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.quickCoachGradient}>
              <Text style={{fontSize: 14, marginRight: 6}}>👨‍🏫</Text>
              <View style={{flex: 1}}>
                <Text style={styles.quickCoachTitle}>Acceso de Prueba: Entrenador Infantil A</Text>
                <Text style={styles.quickCoachSub}>Entra directo al panel táctico y plantilla del Infantil A</Text>
              </View>
              <Ionicons name="chevron-forward" size={14} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* PARRILLA CON ESTRUCTURA EXPLÍCITA: 2 FILAS x 2 COLUMNAS EN ESCRITORIO / 1 COLUMNA EN MÓVIL */}
        <Text style={styles.sectionLabel}>NUESTROS 4 DEPORTES</Text>
        
        {isDesktop ? (
          /* ESTRUCTURA EXPLÍCITA 2x2 EN ESCRITORIO */
          <View style={styles.desktopGrid}>
            {/* FILA 1: FÚTBOL + FÚTBOL SALA */}
            <View style={styles.desktopRow}>
              <View style={styles.desktopCardWrapper}>
                {renderSportCard(SPORTS[0])}
              </View>
              <View style={styles.desktopCardWrapper}>
                {renderSportCard(SPORTS[1])}
              </View>
            </View>

            {/* FILA 2: BALONCESTO + VOLEIBOL */}
            <View style={styles.desktopRow}>
              <View style={styles.desktopCardWrapper}>
                {renderSportCard(SPORTS[2])}
              </View>
              <View style={styles.desktopCardWrapper}>
                {renderSportCard(SPORTS[3])}
              </View>
            </View>
          </View>
        ) : (
          /* ESTRUCTURA VERTICAL EN MÓVIL (<640px) */
          <View style={styles.mobileList}>
            {SPORTS.map((sport) => (
              <View key={sport.id} style={styles.mobileCardWrapper}>
                {renderSportCard(sport)}
              </View>
            ))}
          </View>
        )}

        {/* PIE DE PÁGINA INSTITUCIONAL */}
        <View style={styles.footer}>
          <Text style={styles.footerClub}>Club Deportivo Colegio Jesuitas</Text>
          <Text style={styles.footerCopy}>Sistema Integrado de Gestión Deportiva • 2026</Text>
          <Text style={{ color: '#4FC3F7', fontSize: 10, fontWeight: '900', marginTop: 4, letterSpacing: 1 }}>COMPILACIÓN: PLAYERCARD-DEFINITIVO-01</Text>
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
    paddingTop: Platform.OS === 'ios' ? 30 : 16, 
    paddingBottom: 20, 
    paddingHorizontal: 12,
    minHeight: '100%'
  },
  contentContainerDesktop: { 
    paddingHorizontal: 20, 
    maxWidth: 880, 
    alignSelf: 'center', 
    width: '100%' 
  },

  // BARRA DE CONTEXTO SUPERIOR
  topContextBar: {
    backgroundColor: colors.navyCard,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userInfoRow: { flexDirection: 'row', alignItems: 'center' },
  userAvatarBadge: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 8
  },
  userGreeting: { fontSize: 9, color: colors.textMuted, fontWeight: '600' },
  userName: { fontSize: 13, color: colors.white, fontWeight: '900' },

  changeProfileTopBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.4)',
    gap: 4,
  },
  changeProfileTopText: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '800',
  },

  // HERO HEADER
  heroHeader: { alignItems: 'center', marginBottom: 8 },
  escudoWrapper: { width: 44, height: 44, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  escudoImage: { width: 38, height: 38 },

  heroTitle: { fontSize: 18, fontWeight: '900', color: colors.white, letterSpacing: 2, textAlign: 'center' },
  mottoBadge: {
    backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 7, paddingVertical: 2,
    borderRadius: 6, marginTop: 2, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)'
  },
  mottoText: { fontSize: 8, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 0.8 },

  // BANNER RAPIDO COACH
  quickCoachBanner: { marginBottom: 10, borderRadius: 10, overflow: 'hidden' },
  quickCoachGradient: { flexDirection: 'row', alignItems: 'center', padding: 6, paddingHorizontal: 10 },
  quickCoachTitle: { color: '#fff', fontSize: 11, fontWeight: '900' },
  quickCoachSub: { color: 'rgba(255,255,255,0.85)', fontSize: 9, fontWeight: '600' },

  sectionLabel: { fontSize: 10, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 8, textAlign: 'center' },

  // ESTRUCTURA EXPLÍCITA ESCRITORIO (2 FILAS x 2 COLUMNAS)
  desktopGrid: {
    width: '100%',
  },
  desktopRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginHorizontal: -6,
  },
  desktopCardWrapper: {
    flex: 1,
    marginHorizontal: 6,
  },

  // ESTRUCTURA EXPLÍCITA MÓVIL (1 COLUMNA)
  mobileList: {
    width: '100%',
  },
  mobileCardWrapper: {
    width: '100%',
    marginBottom: 10,
  },

  // ESTILOS DE LA TARJETA REUTILIZABLE
  cardTouchable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardFrame: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardBgImage: {
    padding: 8,
    paddingHorizontal: 10,
    minHeight: 125,
    justifyContent: 'space-between',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  badgeCategory: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  badgeCategoryText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  unreadBadge: {
    backgroundColor: colors.accentGold,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  unreadBadgeText: {
    color: '#000',
    fontSize: 7.5,
    fontWeight: '900',
  },

  // FILA PRINCIPAL: TEXTOS Y BALÓN DECORATIVO COMPACTO (28px)
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
    marginBottom: 4,
  },
  cardTextCol: {
    flex: 1,
  },
  sportTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.8,
  },
  sportDesc: {
    fontSize: 9.5,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 13,
    fontWeight: '500',
    marginTop: 1,
  },

  ballContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ballCircleContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ball3DImage: {
    width: 22,
    height: 22,
  },

  nextEventBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginBottom: 4,
  },
  nextEventText: {
    fontSize: 9,
    color: colors.skyGlow,
    fontWeight: '700',
  },

  enterBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    borderRadius: 6,
  },
  enterBtnText: {
    color: '#fff',
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  footer: {
    marginTop: 14,
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerClub: {
    color: colors.white,
    fontSize: 9.5,
    fontWeight: '800',
  },
  footerCopy: {
    color: colors.textMuted,
    fontSize: 8,
    marginTop: 1,
  },
});
