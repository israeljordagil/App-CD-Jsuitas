import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';
import { ProgressBar } from '../../../src/components/ui/ProgressBar';

const { width } = Dimensions.get('window');

const mockJugador = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B',
  dorsal: 9,
  posicion: 'Delantero',
  valoracion: 8.7,
  avatar: 'https://i.pravatar.cc/200?u=pablo'
};

const STATS_KPI = [
  { icon: 'soccer-ball-o', label: 'Goles', value: '8' },
  { icon: 'handshake-o', label: 'Asist.', value: '4' },
  { icon: 'clock-o', label: 'Minutos', value: '1150\'' },
  { icon: 'play-circle', label: 'Partidos', value: '18' },
  { icon: 'heartbeat', label: 'Entrenos', value: '32' },
  { icon: 'trophy', label: 'MVP', value: '2' },
  { icon: 'square', label: 'Amarillas', value: '1', color: '#EAB308' },
  { icon: 'square', label: 'Rojas', value: '0', color: '#E11D48' },
];

const MAPA_RENDIMIENTO = [
  { label: 'Finalización', value: 85 },
  { label: 'Pase', value: 72 },
  { label: 'Velocidad', value: 88 },
  { label: 'Fuerza', value: 75 },
  { label: 'Defensa', value: 60 },
  { label: 'Táctica', value: 80 },
  { label: 'Actitud', value: 95 },
  { label: 'Intensidad', value: 90 },
];

// Simple bar chart mock data
const CHART_MONTHS = ['Sep', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'];
const CHART_DATA = [
  { height: 30, val: 2 },
  { height: 60, val: 5 },
  { height: 45, val: 3 },
  { height: 80, val: 7 },
  { height: 50, val: 4 },
  { height: 100, val: 8 },
];

export default function RendimientoJugadorScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA (Volver) */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>MI RENDIMIENTO</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.heroCard}>
           <View style={styles.heroRow}>
              <Image source={{ uri: mockJugador.avatar }} style={styles.heroAvatar} />
              <View style={styles.heroInfo}>
                 <Text style={styles.heroName}>{mockJugador.nombre}</Text>
                 <Text style={styles.heroTeam}>{mockJugador.equipo} • {mockJugador.posicion} • #{mockJugador.dorsal}</Text>
              </View>
              <View style={styles.ratingBadge}>
                 <Text style={styles.ratingValue}>{mockJugador.valoracion}</Text>
                 <Text style={styles.ratingLabel}>VAL</Text>
              </View>
           </View>
        </Card>

        {/* 2. MIS ESTADÍSTICAS */}
        <Text style={styles.sectionTitle}>Mis Estadísticas</Text>
        <View style={styles.kpiGrid}>
           {STATS_KPI.map((stat, idx) => (
              <Card delay={150 + (idx * 20)} key={idx} style={styles.kpiBox}>
                 <FontAwesome name={stat.icon} size={20} color={stat.color || colors.sky} style={styles.kpiIcon} />
                 <Text style={styles.kpiValue}>{stat.value}</Text>
                 <Text style={styles.kpiLabel}>{stat.label}</Text>
              </Card>
           ))}
        </View>

        {/* 3. EVOLUCIÓN (GRÁFICO SIMULADO) */}
        <Text style={styles.sectionTitle}>Evolución de Goles</Text>
        <Card delay={300} style={styles.chartCard}>
           <View style={styles.chartArea}>
              {CHART_DATA.map((item, idx) => (
                 <View key={idx} style={styles.chartCol}>
                    <Text style={styles.chartVal}>{item.val}</Text>
                    <View style={styles.chartBarTrack}>
                       <View style={[styles.chartBarFill, { height: `${item.height}%` }]} />
                    </View>
                    <Text style={styles.chartLabel}>{CHART_MONTHS[idx]}</Text>
                 </View>
              ))}
           </View>
        </Card>

        {/* 4. MAPA DE RENDIMIENTO */}
        <Text style={styles.sectionTitle}>Mapa de Rendimiento</Text>
        <Card delay={350} style={styles.mapaCard}>
           {MAPA_RENDIMIENTO.map((item, idx) => (
              <View key={idx} style={styles.mapaRow}>
                 <View style={styles.mapaHeader}>
                    <Text style={styles.mapaLabel}>{item.label}</Text>
                    <Text style={styles.mapaValue}>{item.value}</Text>
                 </View>
                 <ProgressBar progress={item.value / 100} color={item.value > 80 ? colors.success : item.value > 65 ? colors.sky : '#EAB308'} height={6} />
              </View>
           ))}
        </Card>

        {/* 5. EVOLUCIÓN DEL ENTRENADOR */}
        <Text style={styles.sectionTitle}>Feedback del Entrenador</Text>
        <Card delay={400} style={styles.feedbackCard}>
           <FontAwesome name="quote-left" size={24} color="rgba(255,255,255,0.1)" style={styles.quoteIcon} />
           <Text style={styles.feedbackText}>"Has mejorado mucho en la presión tras pérdida. Debes seguir trabajando el juego aéreo y mantener esta intensidad."</Text>
           <View style={styles.feedbackFooter}>
              <View style={styles.feedbackAuthorBox}>
                 <Image source={{ uri: 'https://i.pravatar.cc/100?u=coach' }} style={styles.coachAvatar} />
                 <Text style={styles.coachName}>Carlos Ruiz (Entrenador)</Text>
              </View>
              <Text style={styles.feedbackDate}>12 Nov 2026</Text>
           </View>
        </Card>

        {/* 6. ASISTENCIA */}
        <Text style={styles.sectionTitle}>Asistencia</Text>
        <Card delay={450} style={styles.attendanceCard}>
           <View style={styles.attendanceGrid}>
              <View style={styles.attendanceLeft}>
                 <View style={styles.attendanceRow}>
                    <Text style={styles.attendanceLabel}>Entrenamientos previstos</Text>
                    <Text style={styles.attendanceVal}>32</Text>
                 </View>
                 <View style={styles.attendanceRow}>
                    <Text style={styles.attendanceLabel}>Entrenamientos realizados</Text>
                    <Text style={styles.attendanceVal}>32</Text>
                 </View>
                 <View style={styles.attendanceRow}>
                    <Text style={styles.attendanceLabel}>Partidos convocado</Text>
                    <Text style={styles.attendanceVal}>18</Text>
                 </View>
                 <View style={styles.attendanceRow}>
                    <Text style={styles.attendanceLabel}>Partidos jugados</Text>
                    <Text style={styles.attendanceVal}>18</Text>
                 </View>
              </View>
              <View style={styles.attendanceRight}>
                 {/* Fake SVG Circle implementation via border-radius */}
                 <View style={styles.circleOuter}>
                    <View style={styles.circleInner}>
                       <Text style={styles.circleText}>100%</Text>
                       <Text style={styles.circleSub}>Global</Text>
                    </View>
                 </View>
              </View>
           </View>
        </Card>

        {/* 7. PROGRESO TEMPORADA */}
        <Text style={styles.sectionTitle}>Progreso de Temporada</Text>
        <Card delay={500} style={styles.seasonCard}>
           <View style={styles.seasonHeader}>
              <Text style={styles.seasonTitle}>Temporada Completada</Text>
              <Text style={styles.seasonValue}>46%</Text>
           </View>
           <ProgressBar progress={0.46} color={colors.sky} height={10} />
           <View style={styles.seasonFooter}>
              <Text style={styles.seasonFootText}>Sep 2026</Text>
              <Text style={styles.seasonFootText}>May 2027</Text>
           </View>
        </Card>

        {/* 8. RESUMEN DEL MES */}
        <Text style={styles.sectionTitle}>Resumen del Mes (Noviembre)</Text>
        <Card delay={550} style={styles.monthCard}>
           <View style={styles.monthGrid}>
              <View style={styles.monthItem}>
                 <Text style={styles.monthLabel}>Mejor Partido</Text>
                 <Text style={styles.monthValue}>vs Patacona CF (2 Goles)</Text>
              </View>
              <View style={styles.monthItem}>
                 <Text style={styles.monthLabel}>Mejor Valoración</Text>
                 <Text style={styles.monthValue}>9.4</Text>
              </View>
              <View style={styles.monthItem}>
                 <Text style={styles.monthLabel}>Más Minutos</Text>
                 <Text style={styles.monthValue}>90' vs Villarreal</Text>
              </View>
              <View style={styles.monthItem}>
                 <Text style={styles.monthLabel}>Objetivo Conseguido</Text>
                 <Text style={styles.monthValueSuccess}>✅ Marcar 3 goles</Text>
              </View>
              <View style={styles.monthItem}>
                 <Text style={styles.monthLabel}>Próximo Objetivo</Text>
                 <Text style={styles.monthValuePending}>⏳ Aumentar acierto de pase</Text>
              </View>
           </View>
        </Card>

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.m, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: spacing.xl, marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  heroCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 24, marginBottom: spacing.m },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: colors.sky, marginRight: 16 },
  heroInfo: { flex: 1 },
  heroName: { color: colors.white, fontSize: 18, fontWeight: '900' },
  heroTeam: { color: colors.muted, fontSize: 13, fontWeight: '700', marginTop: 4 },
  ratingBadge: { backgroundColor: 'rgba(79, 195, 247, 0.1)', borderColor: colors.sky, borderWidth: 1, borderRadius: 12, padding: 8, alignItems: 'center', justifyContent: 'center', minWidth: 50 },
  ratingValue: { color: colors.sky, fontSize: 18, fontWeight: '900' },
  ratingLabel: { color: colors.white, fontSize: 9, fontWeight: '800' },

  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  kpiBox: { width: '23%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.m, alignItems: 'center', borderColor: 'rgba(255,255,255,0.05)' },
  kpiIcon: { marginBottom: 8 },
  kpiValue: { color: colors.white, fontSize: 16, fontWeight: '900' },
  kpiLabel: { color: colors.muted, fontSize: 9, fontWeight: '800', textTransform: 'uppercase', marginTop: 4, textAlign: 'center' },

  chartCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 20 },
  chartArea: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 160, paddingTop: 20 },
  chartCol: { alignItems: 'center', width: 35 },
  chartVal: { color: colors.sky, fontSize: 12, fontWeight: '900', marginBottom: 4 },
  chartBarTrack: { width: 12, height: 100, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 6, justifyContent: 'flex-end', overflow: 'hidden' },
  chartBarFill: { width: '100%', backgroundColor: colors.sky, borderRadius: 6 },
  chartLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', marginTop: 8 },

  mapaCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 20 },
  mapaRow: { marginBottom: 16 },
  mapaHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  mapaLabel: { color: colors.white, fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  mapaValue: { color: colors.white, fontSize: 13, fontWeight: '900' },

  feedbackCard: { backgroundColor: 'rgba(79, 195, 247, 0.05)', borderColor: 'rgba(79, 195, 247, 0.2)', padding: spacing.xl, borderRadius: 20 },
  quoteIcon: { position: 'absolute', top: 16, left: 16 },
  feedbackText: { color: colors.white, fontSize: 16, fontWeight: '600', fontStyle: 'italic', lineHeight: 24, marginTop: 12, marginBottom: 20 },
  feedbackFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 16 },
  feedbackAuthorBox: { flexDirection: 'row', alignItems: 'center' },
  coachAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  coachName: { color: colors.sky, fontSize: 12, fontWeight: '800' },
  feedbackDate: { color: colors.muted, fontSize: 11, fontWeight: '600' },

  attendanceCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 20 },
  attendanceGrid: { flexDirection: 'row', alignItems: 'center' },
  attendanceLeft: { flex: 1, paddingRight: 16 },
  attendanceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  attendanceLabel: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  attendanceVal: { color: colors.white, fontSize: 13, fontWeight: '900' },
  attendanceRight: { width: 90, height: 90, justifyContent: 'center', alignItems: 'center' },
  circleOuter: { width: 90, height: 90, borderRadius: 45, backgroundColor: colors.success, justifyContent: 'center', alignItems: 'center' },
  circleInner: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#0B1F4D', justifyContent: 'center', alignItems: 'center' },
  circleText: { color: colors.success, fontSize: 20, fontWeight: '900' },
  circleSub: { color: colors.muted, fontSize: 9, fontWeight: '800', textTransform: 'uppercase' },

  seasonCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 20 },
  seasonHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  seasonTitle: { color: colors.white, fontSize: 14, fontWeight: '800' },
  seasonValue: { color: colors.sky, fontSize: 14, fontWeight: '900' },
  seasonFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  seasonFootText: { color: colors.muted, fontSize: 11, fontWeight: '700' },

  monthCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 20 },
  monthGrid: { gap: 16 },
  monthItem: {},
  monthLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  monthValue: { color: colors.white, fontSize: 14, fontWeight: '800' },
  monthValueSuccess: { color: colors.success, fontSize: 14, fontWeight: '800' },
  monthValuePending: { color: '#EAB308', fontSize: 14, fontWeight: '800' }
});
