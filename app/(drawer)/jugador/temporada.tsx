import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const { width } = Dimensions.get('window');

const MOCK_TIMELINE = [
  { id: 1, jornada: 'Jornada 1', result: 'Victoria 3-1', opponent: 'vs Levante UD', type: 'victoria' },
  { id: 2, jornada: 'Jornada 2', result: 'Empate 2-2', opponent: 'vs Valencia CF', type: 'empate' },
  { id: 3, jornada: 'Jornada 3', result: 'Derrota 0-1', opponent: 'vs Patacona CF', type: 'derrota' },
  { id: 4, jornada: 'Jornada 4', result: 'Próximo partido', opponent: 'vs Torrent CF', type: 'proximo' },
];

const MOCK_STANDINGS = [
  { pos: 1, name: 'Valencia CF', p: 9, w: 3, d: 0, l: 0, gf: 12, gc: 2, gd: '+10' },
  { pos: 2, name: 'Levante UD', p: 6, w: 2, d: 0, l: 1, gf: 8, gc: 5, gd: '+3' },
  { pos: 3, name: 'CD Jesuitas', p: 4, w: 1, d: 1, l: 1, gf: 5, gc: 4, gd: '+1', isUs: true },
  { pos: 4, name: 'Patacona CF', p: 3, w: 1, d: 0, l: 2, gf: 3, gc: 7, gd: '-4' },
  { pos: 5, name: 'Torrent CF', p: 0, w: 0, d: 0, l: 3, gf: 1, gc: 11, gd: '-10' },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1518605368461-1ee7c532066d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1574629810360-7efbb472c419?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=400&q=80',
];

export default function TemporadaJugadorScreen() {
  const router = useRouter();
  const [expandedJornada, setExpandedJornada] = useState<number | null>(4); // Expand the latest

  const toggleJornada = (id: number) => {
    setExpandedJornada(prev => prev === id ? null : id);
  };

  const getTimelineColor = (type: string) => {
    switch(type) {
       case 'victoria': return colors.success;
       case 'empate': return '#EAB308';
       case 'derrota': return '#E11D48';
       case 'proximo': return colors.sky;
       default: return colors.muted;
    }
  };

  const getTimelineIcon = (type: string) => {
    switch(type) {
       case 'victoria': return 'check';
       case 'empate': return 'minus';
       case 'derrota': return 'times';
       case 'proximo': return 'calendar';
       default: return 'circle';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA (Volver) */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>TEMPORADA</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.headerCard}>
           <View style={styles.headerTop}>
              <View style={styles.shieldBox}>
                 <FontAwesome name="shield" size={50} color={colors.sky} />
              </View>
              <View style={styles.headerInfo}>
                 <Text style={styles.teamTitle}>Cadete B</Text>
                 <Text style={styles.compTitle}>Liga Cadete • Jornada 4</Text>
              </View>
           </View>

           <View style={styles.headerStats}>
              <View style={styles.headerStatBox}>
                 <Text style={styles.headerStatLabel}>POSICIÓN</Text>
                 <Text style={styles.headerStatValue}>3º</Text>
              </View>
              <View style={styles.headerDivider} />
              <View style={styles.headerStatBox}>
                 <Text style={styles.headerStatLabel}>BALANCE (V-E-D)</Text>
                 <Text style={styles.headerStatValue}>1 - 1 - 1</Text>
              </View>
           </View>
        </Card>

        {/* 2. RESUMEN DE TEMPORADA */}
        <Text style={styles.sectionTitle}>Resumen Temporada</Text>
        <View style={styles.kpiGrid}>
           <Card delay={150} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>3</Text>
              <Text style={styles.kpiLbl}>PJ</Text>
           </Card>
           <Card delay={160} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>1</Text>
              <Text style={styles.kpiLbl}>V</Text>
           </Card>
           <Card delay={170} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>1</Text>
              <Text style={styles.kpiLbl}>E</Text>
           </Card>
           <Card delay={180} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>1</Text>
              <Text style={styles.kpiLbl}>D</Text>
           </Card>
           <Card delay={190} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>5</Text>
              <Text style={styles.kpiLbl}>GF</Text>
           </Card>
           <Card delay={200} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>4</Text>
              <Text style={styles.kpiLbl}>GC</Text>
           </Card>
           <Card delay={210} style={styles.kpiBox}>
              <Text style={[styles.kpiNum, { color: colors.sky }]}>+1</Text>
              <Text style={styles.kpiLbl}>DG</Text>
           </Card>
           <Card delay={220} style={styles.kpiBox}>
              <Text style={[styles.kpiNum, { color: colors.success }]}>4</Text>
              <Text style={styles.kpiLbl}>Pts</Text>
           </Card>
        </View>

        {/* 5. ÚLTIMOS CINCO PARTIDOS */}
        <Text style={styles.sectionTitle}>Forma</Text>
        <View style={styles.formContainer}>
           <View style={[styles.formBadge, { backgroundColor: colors.success }]}><Text style={styles.formText}>V</Text></View>
           <View style={[styles.formBadge, { backgroundColor: colors.success }]}><Text style={styles.formText}>V</Text></View>
           <View style={[styles.formBadge, { backgroundColor: '#EAB308' }]}><Text style={styles.formText}>E</Text></View>
           <View style={[styles.formBadge, { backgroundColor: '#E11D48' }]}><Text style={styles.formText}>D</Text></View>
           <View style={[styles.formBadge, { backgroundColor: colors.success }]}><Text style={styles.formText}>V</Text></View>
        </View>

        {/* 3. CAMINO DE LA TEMPORADA (TIMELINE VERTICAL) */}
        <Text style={styles.sectionTitle}>Camino de la Temporada</Text>
        <Card delay={250} style={styles.timelineCard}>
           {MOCK_TIMELINE.map((item, index) => {
              const isLast = index === MOCK_TIMELINE.length - 1;
              const color = getTimelineColor(item.type);
              const icon = getTimelineIcon(item.type);
              const isExpanded = expandedJornada === item.id;

              return (
                 <View key={item.id} style={styles.timelineItem}>
                    <View style={styles.timelineLineColumn}>
                       <View style={[styles.timelineDot, { backgroundColor: color }]}>
                          <FontAwesome name={icon} size={10} color={colors.white} />
                       </View>
                       {!isLast && <View style={[styles.timelineLine, { backgroundColor: color }]} />}
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => toggleJornada(item.id)} style={styles.timelineContentBox}>
                       <View style={styles.timelineHeader}>
                          <Text style={[styles.timelineJornada, { color: color }]}>{item.jornada}</Text>
                          <Text style={styles.timelineResult}>{item.result}</Text>
                       </View>
                       <Text style={styles.timelineOpponent}>{item.opponent}</Text>
                       
                       {isExpanded && (
                          <View style={styles.timelineExpanded}>
                             <Text style={styles.timelineExpandedText}>Detalles del partido...</Text>
                             <TouchableOpacity style={styles.timelineBtn}>
                                <Text style={styles.timelineBtnText}>Ver ficha</Text>
                             </TouchableOpacity>
                          </View>
                       )}
                    </TouchableOpacity>
                 </View>
              );
           })}
        </Card>

        {/* 4. CLASIFICACIÓN (DISEÑO MODERNO CON TARJETAS) */}
        <Text style={styles.sectionTitle}>Clasificación</Text>
        <View style={styles.standingsContainer}>
           <View style={styles.standingsHeader}>
              <Text style={styles.standingsColPos}>#</Text>
              <Text style={styles.standingsColTeam}>Equipo</Text>
              <Text style={styles.standingsColNum}>PJ</Text>
              <Text style={styles.standingsColNum}>DG</Text>
              <Text style={styles.standingsColNum}>PTS</Text>
           </View>
           {MOCK_STANDINGS.map((team, index) => (
              <Card delay={300 + (index * 20)} key={index} style={[styles.standingsRow, team.isUs && styles.standingsRowActive]}>
                 <View style={styles.standingsPosBadge}>
                    <Text style={styles.standingsPosText}>{team.pos}</Text>
                 </View>
                 <View style={styles.standingsTeamInfo}>
                    <FontAwesome name="shield" size={16} color={team.isUs ? colors.sky : colors.muted} style={{marginRight: 8}} />
                    <Text style={[styles.standingsTeamText, team.isUs && {color: colors.white, fontWeight: '900'}]}>{team.name}</Text>
                 </View>
                 <Text style={styles.standingsNumText}>{team.p}</Text>
                 <Text style={styles.standingsNumText}>{team.gd}</Text>
                 <Text style={[styles.standingsNumText, {color: team.isUs ? colors.sky : colors.white, fontWeight: '900'}]}>{team.p}</Text>
              </Card>
           ))}
           <TouchableOpacity style={styles.fullTableBtn}>
              <Text style={styles.fullTableBtnText}>Ver Clasificación Completa</Text>
           </TouchableOpacity>
        </View>

        {/* 6. PRÓXIMO RIVAL */}
        <Text style={styles.sectionTitle}>Próximo Rival</Text>
        <Card delay={350} style={styles.rivalCard}>
           <View style={styles.rivalHeader}>
              <FontAwesome name="shield" size={32} color="#EAB308" />
              <View style={{ marginLeft: 16 }}>
                 <Text style={styles.rivalName}>Torrent CF</Text>
                 <Text style={styles.rivalPosition}>5º Clasificado</Text>
              </View>
           </View>
           <View style={styles.rivalGrid}>
              <View style={styles.rivalGridItem}>
                 <Text style={styles.rivalGridLabel}>Últimos 5</Text>
                 <Text style={styles.rivalGridValue}>D-D-D</Text>
              </View>
              <View style={styles.rivalGridItem}>
                 <Text style={styles.rivalGridLabel}>Goles</Text>
                 <Text style={styles.rivalGridValue}>1 GF / 11 GC</Text>
              </View>
           </View>
        </Card>

        {/* 7. ESTADÍSTICAS DEL EQUIPO */}
        <Text style={styles.sectionTitle}>Estadísticas del Equipo</Text>
        <View style={styles.teamStatsGrid}>
           <Card delay={400} style={styles.teamStatBox}>
              <FontAwesome name="star" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>Pablo M.</Text>
              <Text style={styles.teamStatLabel}>Máx. Goleador</Text>
           </Card>
           <Card delay={420} style={styles.teamStatBox}>
              <FontAwesome name="handshake-o" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>Lucas G.</Text>
              <Text style={styles.teamStatLabel}>Máx. Asistente</Text>
           </Card>
           <Card delay={440} style={styles.teamStatBox}>
              <FontAwesome name="shield" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>1</Text>
              <Text style={styles.teamStatLabel}>Porterías a cero</Text>
           </Card>
           <Card delay={460} style={styles.teamStatBox}>
              <FontAwesome name="fire" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>2</Text>
              <Text style={styles.teamStatLabel}>Partidos Imbatidos</Text>
           </Card>
           <Card delay={480} style={styles.teamStatBox}>
              <FontAwesome name="soccer-ball-o" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>1.6</Text>
              <Text style={styles.teamStatLabel}>Goles / Partido</Text>
           </Card>
           <Card delay={500} style={styles.teamStatBox}>
              <FontAwesome name="pie-chart" size={16} color={colors.sky} style={styles.teamStatIcon} />
              <Text style={styles.teamStatValue}>58%</Text>
              <Text style={styles.teamStatLabel}>Posesión (Media)</Text>
           </Card>
        </View>

        {/* 8. MVP DEL ÚLTIMO PARTIDO */}
        <Text style={styles.sectionTitle}>MVP Último Partido</Text>
        <Card delay={520} style={styles.mvpCard}>
           <View style={styles.mvpHeader}>
              <Image source={{ uri: 'https://i.pravatar.cc/100?u=lucas' }} style={styles.mvpAvatar} />
              <View style={styles.mvpInfo}>
                 <Text style={styles.mvpName}>Lucas Pérez</Text>
                 <Text style={styles.mvpScore}>Valoración: 9.2</Text>
              </View>
              <FontAwesome name="trophy" size={32} color="#EAB308" />
           </View>
           <View style={styles.mvpDescBox}>
              <Text style={styles.mvpDescText}>"Espectacular partido bajo palos, salvando 3 manos a manos clave para mantener el empate."</Text>
           </View>
        </Card>

        {/* 10. RESUMEN PERSONAL */}
        <Text style={styles.sectionTitle}>Tus Números de Temporada</Text>
        <View style={styles.kpiGrid}>
           <Card delay={550} style={styles.kpiBoxAlt}>
              <Text style={styles.kpiNum}>3</Text>
              <Text style={styles.kpiLbl}>Partidos</Text>
           </Card>
           <Card delay={560} style={styles.kpiBoxAlt}>
              <Text style={styles.kpiNum}>185'</Text>
              <Text style={styles.kpiLbl}>Minutos</Text>
           </Card>
           <Card delay={570} style={styles.kpiBoxAlt}>
              <Text style={styles.kpiNum}>1</Text>
              <Text style={styles.kpiLbl}>Goles</Text>
           </Card>
           <Card delay={580} style={styles.kpiBoxAlt}>
              <Text style={styles.kpiNum}>2</Text>
              <Text style={styles.kpiLbl}>Asistencias</Text>
           </Card>
           <Card delay={590} style={styles.kpiBoxAlt}>
              <Text style={styles.kpiNum}>100%</Text>
              <Text style={styles.kpiLbl}>Asistencia</Text>
           </Card>
           <Card delay={600} style={styles.kpiBoxAlt}>
              <Text style={[styles.kpiNum, { color: '#EAB308' }]}>8.4</Text>
              <Text style={styles.kpiLbl}>Val. Media</Text>
           </Card>
        </View>

        {/* 9. GALERÍA */}
        <Text style={styles.sectionTitle}>Galería de Temporada</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll} contentContainerStyle={{ gap: 12 }}>
           {GALLERY_IMAGES.map((img, i) => (
              <Image key={i} source={{ uri: img }} style={styles.galleryImage} />
           ))}
        </ScrollView>
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

  // Cabecera
  headerCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 24, marginBottom: spacing.m },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  shieldBox: { width: 70, height: 70, borderRadius: 20, backgroundColor: 'rgba(79, 195, 247, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  headerInfo: { flex: 1 },
  teamTitle: { color: colors.white, fontSize: 24, fontWeight: '900' },
  compTitle: { color: colors.sky, fontSize: 13, fontWeight: '700', marginTop: 4 },
  headerStats: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 16, padding: 16 },
  headerStatBox: { flex: 1, alignItems: 'center' },
  headerDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  headerStatLabel: { color: colors.muted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  headerStatValue: { color: colors.white, fontSize: 18, fontWeight: '900' },

  // KPIs
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  kpiBox: { width: '23.5%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: spacing.m, alignItems: 'center', borderColor: 'rgba(255,255,255,0.05)' },
  kpiBoxAlt: { width: '31%', backgroundColor: 'rgba(79, 195, 247, 0.05)', borderRadius: 12, padding: spacing.m, alignItems: 'center', borderColor: 'rgba(79, 195, 247, 0.2)' },
  kpiNum: { color: colors.white, fontSize: 18, fontWeight: '900' },
  kpiLbl: { color: colors.muted, fontSize: 9, fontWeight: '800', textTransform: 'uppercase', marginTop: 4 },

  // Forma
  formContainer: { flexDirection: 'row', gap: 8 },
  formBadge: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  formText: { color: colors.white, fontSize: 14, fontWeight: '900' },

  // Timeline
  timelineCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  timelineItem: { flexDirection: 'row', minHeight: 70 },
  timelineLineColumn: { width: 30, alignItems: 'center' },
  timelineDot: { width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  timelineLine: { width: 2, flex: 1, marginTop: -4, marginBottom: -4, opacity: 0.5, zIndex: 1 },
  timelineContentBox: { flex: 1, marginLeft: 12, paddingBottom: 24 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  timelineJornada: { fontSize: 14, fontWeight: '900' },
  timelineResult: { color: colors.white, fontSize: 14, fontWeight: '800' },
  timelineOpponent: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  timelineExpanded: { marginTop: 12, backgroundColor: 'rgba(0,0,0,0.15)', padding: 12, borderRadius: 12 },
  timelineExpandedText: { color: colors.muted, fontSize: 12, fontStyle: 'italic', marginBottom: 8 },
  timelineBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
  timelineBtnText: { color: colors.white, fontSize: 11, fontWeight: '700' },

  // Standings
  standingsContainer: { backgroundColor: 'transparent' },
  standingsHeader: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8 },
  standingsColPos: { width: 30, color: colors.muted, fontSize: 11, fontWeight: '800' },
  standingsColTeam: { flex: 1, color: colors.muted, fontSize: 11, fontWeight: '800' },
  standingsColNum: { width: 40, color: colors.muted, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  standingsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, marginBottom: 8, borderColor: 'rgba(255,255,255,0.05)' },
  standingsRowActive: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderColor: colors.sky },
  standingsPosBadge: { width: 30 },
  standingsPosText: { color: colors.muted, fontSize: 14, fontWeight: '900' },
  standingsTeamInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  standingsTeamText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  standingsNumText: { width: 40, color: colors.white, fontSize: 13, fontWeight: '600', textAlign: 'center' },
  fullTableBtn: { marginTop: 8, alignSelf: 'center' },
  fullTableBtnText: { color: colors.sky, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },

  // Rival
  rivalCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  rivalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 16 },
  rivalName: { color: colors.white, fontSize: 18, fontWeight: '900' },
  rivalPosition: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  rivalGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  rivalGridItem: {},
  rivalGridLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  rivalGridValue: { color: colors.white, fontSize: 14, fontWeight: '800' },

  // Team Stats
  teamStatsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  teamStatBox: { width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.m, borderColor: 'rgba(255,255,255,0.05)' },
  teamStatIcon: { marginBottom: 12 },
  teamStatValue: { color: colors.white, fontSize: 18, fontWeight: '900' },
  teamStatLabel: { color: colors.muted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },

  // MVP
  mvpCard: { backgroundColor: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.3)', padding: spacing.l, borderRadius: 20 },
  mvpHeader: { flexDirection: 'row', alignItems: 'center' },
  mvpAvatar: { width: 50, height: 50, borderRadius: 25, borderWidth: 2, borderColor: '#EAB308' },
  mvpInfo: { flex: 1, marginLeft: 12 },
  mvpName: { color: colors.white, fontSize: 16, fontWeight: '900' },
  mvpScore: { color: '#EAB308', fontSize: 12, fontWeight: '800', marginTop: 2 },
  mvpDescBox: { marginTop: 16, backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 12 },
  mvpDescText: { color: colors.white, fontSize: 13, fontWeight: '600', fontStyle: 'italic' },

  // Galeria
  galleryScroll: { paddingRight: 40 },
  galleryImage: { width: 220, height: 140, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)' }
});
