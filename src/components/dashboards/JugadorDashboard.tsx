import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  useWindowDimensions 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const MOCK_JUGADOR = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B (Fútbol 11)',
  dorsal: 10,
  posicion: 'Delantero / Mediapunta',
  nivel: 14,
  currentXp: 1250,
  nextLevelXp: 2000,
  streakWeeks: 5,
  status: 'CONVOCADO',
  nextMatch: {
    rival: 'Levante UD B',
    date: 'Sábado 10:00h',
    location: 'Campo 1 - CD Jesuitas (Local)',
    kit: '1ª Equipación Azul'
  },
  nextTraining: {
    date: 'Hoy 18:30h - 20:00h',
    pitch: 'Campo 2 Anexo',
    kit: '1ª Equipación Azul'
  },
  weeklyMission: {
    title: '🎯 Misión de la Semana',
    desc: 'Completar 3 entrenamientos y dar 1 asistencia de gol',
    reward: '+150 XP',
    progress: '2/3 completado'
  }
};

export function JugadorDashboard() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const xpPercent = Math.min(100, Math.round((MOCK_JUGADOR.currentXp / MOCK_JUGADOR.nextLevelXp) * 100));

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. HERO BANNER GAMIFICADO DEL JUGADOR CON NIVEL Y XP */}
      <View style={styles.playerHeroCard}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.heroGradient}>
          
          <View style={styles.heroTopRow}>
            {/* Foto Cromo Gold */}
            <View style={styles.avatarGlowContainer}>
              <Image 
                source={require('../../../assets/images/cromo_pablo_gold.jpg')} 
                style={styles.avatarImage} 
                resizeMode="cover"
              />
              <View style={styles.dorsalBadge}>
                <Text style={styles.dorsalTxt}>#{MOCK_JUGADOR.dorsal}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.streakBadgeRow}>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakTxt}>🔥 Racha {MOCK_JUGADOR.streakWeeks} Semanas</Text>
                </View>
                <View style={styles.convocatedTag}>
                  <Text style={styles.convocatedTagTxt}>⭐ {MOCK_JUGADOR.status}</Text>
                </View>
              </View>

              <Text style={styles.playerName}>{MOCK_JUGADOR.nombre}</Text>
              <Text style={styles.playerTeam}>{MOCK_JUGADOR.equipo} • {MOCK_JUGADOR.posicion}</Text>
            </View>
          </View>

          {/* BARRA DE PROGRESO DE NIVEL XP */}
          <View style={styles.levelProgressBox}>
            <View style={styles.levelHeaderRow}>
              <Text style={styles.levelTitle}>NIVEL {MOCK_JUGADOR.nivel}</Text>
              <Text style={styles.xpText}>{MOCK_JUGADOR.currentXp} / {MOCK_JUGADOR.nextLevelXp} XP</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${xpPercent}%` }]} />
            </View>
          </View>

        </LinearGradient>
      </View>

      {/* 2. TARJETA PRÓXIMO PARTIDO */}
      <Text style={styles.sectionTitle}>🏟️ PRÓXIMO PARTIDO</Text>
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchDate}>{MOCK_JUGADOR.nextMatch.date}</Text>
          <Text style={styles.matchKit}>🎽 {MOCK_JUGADOR.nextMatch.kit}</Text>
        </View>

        <Text style={styles.matchRival}>CD Jesuitas vs {MOCK_JUGADOR.nextMatch.rival}</Text>
        <Text style={styles.matchLoc}>📍 {MOCK_JUGADOR.nextMatch.location}</Text>
      </View>

      {/* 3. TARJETA PRÓXIMO ENTRENAMIENTO */}
      <Text style={styles.sectionTitle}>🏃 PRÓXIMO ENTRENAMIENTO</Text>
      <View style={styles.trainingCard}>
        <View style={styles.trainingHeader}>
          <Text style={styles.trainingDate}>{MOCK_JUGADOR.nextTraining.date}</Text>
          <Text style={styles.trainingKit}>🎽 {MOCK_JUGADOR.nextTraining.kit}</Text>
        </View>

        <Text style={styles.trainingPitch}>📍 {MOCK_JUGADOR.nextTraining.pitch}</Text>
      </View>

      {/* 4. MISIÓN / RETO DE LA SEMANA */}
      <Text style={styles.sectionTitle}>🎯 MISIÓN DE LA SEMANA</Text>
      <View style={styles.missionCard}>
        <View style={styles.missionHeaderRow}>
          <View style={styles.missionIconCircle}>
            <Ionicons name="trophy-outline" size={24} color={colors.accentGold} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.missionTitle}>{MOCK_JUGADOR.weeklyMission.title}</Text>
            <Text style={styles.missionDesc}>{MOCK_JUGADOR.weeklyMission.desc}</Text>
          </View>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardTxt}>{MOCK_JUGADOR.weeklyMission.reward}</Text>
          </View>
        </View>
        <Text style={styles.missionProgressTxt}>Progreso: {MOCK_JUGADOR.weeklyMission.progress}</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // HERO CARD JUGADOR
  playerHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  heroGradient: { padding: 16 },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  avatarGlowContainer: { position: 'relative' },
  avatarImage: { width: 74, height: 74, borderRadius: 37, borderWidth: 2, borderColor: colors.accentGold },
  dorsalBadge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: colors.navyDark, borderHeight: 1, borderColor: colors.accentGold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  dorsalTxt: { color: colors.goldLight, fontSize: 11, fontWeight: '900' },

  streakBadgeRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  streakBadge: { backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.accentGold },
  streakTxt: { color: colors.goldLight, fontSize: 9, fontWeight: '900' },
  convocatedTag: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.accentGreen },
  convocatedTagTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },

  playerName: { color: colors.white, fontSize: 18, fontWeight: '900' },
  playerTeam: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginTop: 2 },

  levelProgressBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 14, gap: 6 },
  levelHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  levelTitle: { color: colors.goldLight, fontSize: 11, fontWeight: '900' },
  xpText: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },
  progressBarBg: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: colors.skyPrimary, borderRadius: 4 },

  // SECCIONES
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  
  matchCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 4, marginBottom: 20 },
  matchHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  matchDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  matchKit: { color: colors.textMuted, fontSize: 10 },
  matchRival: { color: colors.white, fontSize: 15, fontWeight: '900' },
  matchLoc: { color: colors.textMuted, fontSize: 11 },

  trainingCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 4, marginBottom: 20 },
  trainingHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  trainingDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  trainingKit: { color: colors.textMuted, fontSize: 10 },
  trainingPitch: { color: colors.white, fontSize: 13, fontWeight: '800' },

  missionCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 8, marginBottom: 20 },
  missionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  missionIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(245, 158, 11, 0.15)', justifyContent: 'center', alignItems: 'center' },
  missionTitle: { color: colors.white, fontSize: 13, fontWeight: '900' },
  missionDesc: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  rewardBadge: { backgroundColor: colors.accentGold, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  rewardTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },
  missionProgressTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '800', marginTop: 4 }
});
