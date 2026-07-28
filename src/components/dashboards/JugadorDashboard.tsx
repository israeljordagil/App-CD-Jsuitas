import React, { useState } from 'react';
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
  citationTime: '09:15h (Vestuario 2)',

  nextMatch: {
    rival: 'Levante UD B',
    date: 'Sábado 10:00h',
    location: 'Campo 1 - CD Jesuitas (Local)',
    kit: '1ª Equipación Azul'
  },
  nextTraining: {
    date: 'Hoy Martes 18:30h - 20:00h',
    pitch: 'Campo 2 Anexo (Jesuitas)',
    kit: 'Camiseta de Entrenamiento Azul'
  },
  weeklyMission: {
    title: '🎯 Misión Formativa de la Semana',
    desc: 'Completar los 3 entrenamientos semanales con el máximo esfuerzo y compañerismo',
    reward: '+150 XP',
    progress: '2/3 completado'
  },
  birthdayToday: {
    name: 'Santi Giménez (#7)',
    age: '15 años hoy 🎉'
  },
  quickStats: {
    matches: 12,
    goals: 7,
    assists: 5,
    minutes: '840 min'
  },
  coachNotice: {
    coachName: 'Carlos Ruiz (Míster)',
    text: 'Recordad traer las botas de tacos de goma para el entreno de hoy. Puntualidad a las 18:30h.'
  }
};

export function JugadorDashboard() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // CHECKLIST DE MOCHILA INTERACTIVO
  const [backpack, setBackpack] = useState({
    boots: true,
    shinGuards: true,
    blueShirt: true,
    waterBottle: false,
  });

  const toggleItem = (key: keyof typeof backpack) => {
    setBackpack(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const xpPercent = Math.min(100, Math.round((MOCK_JUGADOR.currentXp / MOCK_JUGADOR.nextLevelXp) * 100));

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. HEADER GAMIFICADO CON CROMO Y BARRA DE PROGRESO DE NIVEL */}
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

      {/* 2. CUMPLEAÑOS DE COMPAÑEROS EN EL EQUIPO */}
      <View style={styles.bdayCard}>
        <Text style={{ fontSize: 20 }}>🎂</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.bdayTitle}>¡HOY ES EL CUMPLEAÑOS DE UN COMPAÑERO!</Text>
          <Text style={styles.bdaySub}>{MOCK_JUGADOR.birthdayToday.name} cumple {MOCK_JUGADOR.birthdayToday.age}</Text>
        </View>
        <TouchableOpacity style={styles.bdayBtn}>
          <Text style={styles.bdayBtnTxt}>Felicitar 💬</Text>
        </TouchableOpacity>
      </View>

      {/* 3. TARJETA PRÓXIMO PARTIDO CON ESTADO DE CONVOCATORIA */}
      <Text style={styles.sectionTitle}>🏟️ PRÓXIMO PARTIDO</Text>
      <View style={styles.matchCard}>
        <View style={styles.matchHeader}>
          <Text style={styles.matchDate}>{MOCK_JUGADOR.nextMatch.date}</Text>
          <Text style={styles.matchKit}>🎽 {MOCK_JUGADOR.nextMatch.kit}</Text>
        </View>

        <Text style={styles.matchRival}>CD Jesuitas vs {MOCK_JUGADOR.nextMatch.rival}</Text>
        <Text style={styles.matchLoc}>📍 {MOCK_JUGADOR.nextMatch.location}</Text>

        <View style={styles.citationBadgeRow}>
          <Ionicons name="time-outline" size={14} color={colors.goldLight} />
          <Text style={styles.citationBadgeTxt}>Citación vestuarios: {MOCK_JUGADOR.citationTime}</Text>
        </View>
      </View>

      {/* 4. TARJETA PRÓXIMO ENTRENAMIENTO */}
      <Text style={styles.sectionTitle}>🏃 PRÓXIMO ENTRENAMIENTO</Text>
      <View style={styles.trainingCard}>
        <View style={styles.trainingHeader}>
          <Text style={styles.trainingDate}>{MOCK_JUGADOR.nextTraining.date}</Text>
          <Text style={styles.trainingKit}>🎽 {MOCK_JUGADOR.nextTraining.kit}</Text>
        </View>

        <Text style={styles.trainingPitch}>📍 {MOCK_JUGADOR.nextTraining.pitch}</Text>
      </View>

      {/* 5. CHECKLIST RÁPIDO PARA LA MOCHILA DE HOY */}
      <Text style={styles.sectionTitle}>🎒 CHECKLIST RÁPIDO DE MI MOCHILA</Text>
      <View style={styles.backpackCard}>
        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('boots')}>
          <Ionicons name={backpack.boots ? "checkbox" : "square-outline"} size={20} color={backpack.boots ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.boots && styles.checkItemDone]}>Botas de Tacos (Goma)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('shinGuards')}>
          <Ionicons name={backpack.shinGuards ? "checkbox" : "square-outline"} size={20} color={backpack.shinGuards ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.shinGuards && styles.checkItemDone]}>Espinilleras Oficiales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('blueShirt')}>
          <Ionicons name={backpack.blueShirt ? "checkbox" : "square-outline"} size={20} color={backpack.blueShirt ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.blueShirt && styles.checkItemDone]}>Camiseta de Entreno Azul</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('waterBottle')}>
          <Ionicons name={backpack.waterBottle ? "checkbox" : "square-outline"} size={20} color={backpack.waterBottle ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.waterBottle && styles.checkItemDone]}>Botella de Agua Rellenable</Text>
        </TouchableOpacity>
      </View>

      {/* 6. MISIÓN FORMATIVA DE LA SEMANA (COMPAÑERISMO Y ESFUERZO) */}
      <Text style={styles.sectionTitle}>🎯 MISIÓN FORMATIVA DE LA SEMANA</Text>
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

      {/* 7. RENDIMIENTO Y ESTADÍSTICAS RÁPIDAS */}
      <Text style={styles.sectionTitle}>📊 RESUMEN MI TEMPORADA</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{MOCK_JUGADOR.quickStats.matches}</Text>
          <Text style={styles.statLabel}>Partidos</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.accentGold }]}>{MOCK_JUGADOR.quickStats.goals}</Text>
          <Text style={styles.statLabel}>Goles</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.skyGlow }]}>{MOCK_JUGADOR.quickStats.assists}</Text>
          <Text style={styles.statLabel}>Asistencias</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNum}>{MOCK_JUGADOR.quickStats.minutes}</Text>
          <Text style={styles.statLabel}>Minutos</Text>
        </View>
      </View>

      {/* 8. ÚLTIMO AVISO DEL MÍSTER */}
      <Text style={styles.sectionTitle}>💬 AVISO DEL MÍSTER</Text>
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <FontAwesome name="user-circle" size={16} color={colors.skyPrimary} />
          <Text style={styles.noticeAuthor}>{MOCK_JUGADOR.coachNotice.coachName}</Text>
        </View>
        <Text style={styles.noticeText}>"{MOCK_JUGADOR.coachNotice.text}"</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // HERO CARD JUGADOR
  playerHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 14 },
  heroGradient: { padding: 16 },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
  avatarGlowContainer: { position: 'relative' },
  avatarImage: { width: 74, height: 74, borderRadius: 37, borderWidth: 2, borderColor: colors.accentGold },
  dorsalBadge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: colors.navyDark, borderWidth: 1, borderColor: colors.accentGold, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
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

  // CUMPLEAÑOS
  bdayCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(245, 158, 11, 0.12)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.accentGold, marginBottom: 18 },
  bdayTitle: { color: colors.goldLight, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  bdaySub: { color: colors.white, fontSize: 12, fontWeight: '800', marginTop: 1 },
  bdayBtn: { backgroundColor: colors.accentGold, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  bdayBtnTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },

  // SECCIONES
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  
  matchCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 4, marginBottom: 20 },
  matchHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  matchDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  matchKit: { color: colors.textMuted, fontSize: 10 },
  matchRival: { color: colors.white, fontSize: 15, fontWeight: '900' },
  matchLoc: { color: colors.textMuted, fontSize: 11 },

  citationBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(245, 158, 11, 0.12)', padding: 8, borderRadius: 8, marginTop: 6 },
  citationBadgeTxt: { color: colors.goldLight, fontSize: 11, fontWeight: '800' },

  trainingCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 4, marginBottom: 20 },
  trainingHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  trainingDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  trainingKit: { color: colors.textMuted, fontSize: 10 },
  trainingPitch: { color: colors.white, fontSize: 13, fontWeight: '800' },

  // BACKPACK
  backpackCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkItemTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkItemDone: { textDecorationLine: 'line-through', color: colors.textMuted },

  missionCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 8, marginBottom: 20 },
  missionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  missionIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(245, 158, 11, 0.15)', justifyContent: 'center', alignItems: 'center' },
  missionTitle: { color: colors.white, fontSize: 13, fontWeight: '900' },
  missionDesc: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  rewardBadge: { backgroundColor: colors.accentGold, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  rewardTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },
  missionProgressTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '800', marginTop: 4 },

  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: colors.navyCard, padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  statNum: { color: colors.white, fontSize: 18, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', marginTop: 2 },

  noticeCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 6, marginBottom: 20 },
  noticeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  noticeAuthor: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  noticeText: { color: colors.white, fontSize: 12, fontStyle: 'italic', lineHeight: 17 }
});
