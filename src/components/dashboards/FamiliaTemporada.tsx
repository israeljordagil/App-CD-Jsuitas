import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#81D4FA',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444'
};

const mockStandings = [
  { pos: 1, team: 'Levante UD', pts: 15, gf: 12, gc: 2, pj: 5 },
  { pos: 2, team: 'Villarreal CF', pts: 12, gf: 10, gc: 4, pj: 5 },
  { pos: 3, team: 'CD Jesuitas', pts: 10, gf: 8, gc: 5, pj: 5, isUs: true },
  { pos: 4, team: 'Alboraya UD', pts: 9, gf: 7, gc: 6, pj: 5 },
  { pos: 5, team: 'Torrent CF', pts: 7, gf: 5, gc: 8, pj: 5 },
];

const mockMatches = [
  { id: '1', jor: 'J1', date: '3 Oct', rival: 'Levante UD', result: '1-1', type: 'draw' },
  { id: '2', jor: 'J2', date: '10 Oct', rival: 'Torrent CF', result: '3-1', type: 'win' },
  { id: '3', jor: 'J3', date: '17 Oct', rival: 'Alboraya UD', result: '2-0', type: 'win' },
  { id: '4', jor: 'J4', date: '24 Oct', rival: 'Paterna CF', result: '0-2', type: 'loss' },
  { id: '5', jor: 'J5', date: '31 Oct', rival: 'Villarreal CF', result: '2-1', type: 'win' },
];

export function FamiliaTemporada() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
       
       {/* 1. CABECERA EQUIPO */}
       <View style={styles.headerHero}>
          <LinearGradient colors={['rgba(79, 195, 247, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          <View style={styles.headerHeroContent}>
             <View style={styles.crestLarge}><FontAwesome name="shield" size={48} color={clubColors.navy} /></View>
             <View style={styles.headerHeroInfo}>
                <Text style={styles.hhTeam}>CADETE B</Text>
                <Text style={styles.hhComp}>Liga Preferente Cadete - Grupo 2</Text>
                <View style={styles.hhBadgesRow}>
                   <View style={styles.hhBadge}><Text style={styles.hhBadgeText}>JORNADA 6</Text></View>
                   <View style={[styles.hhBadge, {backgroundColor: clubColors.navy}]}><Text style={[styles.hhBadgeText, {color: clubColors.white}]}>3º CLASIFICADO</Text></View>
                </View>
             </View>
          </View>
          <View style={styles.formRow}>
             <Text style={styles.formLabel}>BALANCE:</Text>
             <Text style={[styles.formNum, {color: clubColors.success}]}>3V</Text>
             <Text style={[styles.formNum, {color: clubColors.warning}]}>1E</Text>
             <Text style={[styles.formNum, {color: clubColors.danger}]}>1D</Text>
          </View>
       </View>

       {/* 2. RESUMEN DE TEMPORADA (KPIs) */}
       <Text style={styles.sectionTitle}>Números</Text>
       <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}><Text style={styles.kpiVal}>5</Text><Text style={styles.kpiLbl}>PARTIDOS</Text></View>
          <View style={styles.kpiCard}><Text style={styles.kpiVal}>10</Text><Text style={styles.kpiLbl}>PUNTOS</Text></View>
          <View style={styles.kpiCard}><Text style={[styles.kpiVal, {color: clubColors.success}]}>8</Text><Text style={styles.kpiLbl}>GOLES A FAVOR</Text></View>
          <View style={styles.kpiCard}><Text style={[styles.kpiVal, {color: clubColors.danger}]}>5</Text><Text style={styles.kpiLbl}>GOLES CONTRA</Text></View>
       </View>

       {/* 7. PRÓXIMO RIVAL */}
       <Text style={styles.sectionTitle}>Próximo Partido</Text>
       <View style={styles.nextMatchCard}>
          <View style={styles.nextMatchTop}>
             <Text style={styles.nextMatchJor}>JORNADA 6</Text>
             <Text style={styles.nextMatchDate}>Sáb 7 Nov • 10:00</Text>
          </View>
          <View style={styles.matchupRow}>
             <View style={styles.teamCol}>
                <View style={styles.crestBoxSmall}><FontAwesome name="shield" size={24} color={clubColors.navy} /></View>
                <Text style={styles.teamNameSmall}>CD Jesuitas</Text>
             </View>
             <Text style={styles.vsText}>VS</Text>
             <View style={styles.teamCol}>
                <View style={[styles.crestBoxSmall, {backgroundColor: 'rgba(7,26,61,0.05)'}]}><FontAwesome name="shield" size={24} color={clubColors.textMuted} /></View>
                <Text style={styles.teamNameSmall}>Torre Levante</Text>
             </View>
          </View>
          <View style={styles.nextMatchFooter}>
             <Text style={styles.nextMatchLoc}>Campo Principal F11</Text>
          </View>
       </View>

       {/* 3. CALENDARIO DE PARTIDOS RECIENTES */}
       <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitleNoMargin}>Últimos Resultados</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>Ver todos</Text></TouchableOpacity>
       </View>
       
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.matchesScroll} contentContainerStyle={{paddingRight: 20}}>
          {mockMatches.slice().reverse().map(m => (
             <View key={m.id} style={styles.recentMatchCard}>
                <View style={[styles.rmStripe, {
                  backgroundColor: m.type === 'win' ? clubColors.success : m.type === 'draw' ? clubColors.warning : clubColors.danger
                }]} />
                <View style={styles.rmContent}>
                   <Text style={styles.rmJor}>{m.jor} • {m.date}</Text>
                   <Text style={styles.rmRival} numberOfLines={1}>vs {m.rival}</Text>
                   <Text style={[styles.rmResult, {
                     color: m.type === 'win' ? clubColors.success : m.type === 'draw' ? clubColors.warning : clubColors.danger
                   }]}>{m.result}</Text>
                </View>
             </View>
          ))}
       </ScrollView>

       {/* 5. CLASIFICACIÓN */}
       <Text style={styles.sectionTitle}>Clasificación</Text>
       <View style={styles.standingsCard}>
          <View style={styles.standingsHeader}>
             <Text style={[styles.stCellPos, styles.stHeaderText]}>POS</Text>
             <Text style={[styles.stCellTeam, styles.stHeaderText]}>EQUIPO</Text>
             <Text style={[styles.stCellNum, styles.stHeaderText]}>PJ</Text>
             <Text style={[styles.stCellNum, styles.stHeaderText]}>DIF</Text>
             <Text style={[styles.stCellPts, styles.stHeaderText]}>PTS</Text>
          </View>
          {mockStandings.map((s, idx) => (
             <View key={idx} style={[styles.standingsRow, s.isUs && styles.standingsRowUs]}>
                <Text style={[styles.stCellPos, s.isUs && styles.stCellUs]}>{s.pos}</Text>
                <Text style={[styles.stCellTeam, s.isUs && styles.stCellUs]}>{s.team}</Text>
                <Text style={[styles.stCellNum, s.isUs && styles.stCellUs]}>{s.pj}</Text>
                <Text style={[styles.stCellNum, s.isUs && styles.stCellUs]}>{s.gf - s.gc > 0 ? `+${s.gf - s.gc}` : s.gf - s.gc}</Text>
                <Text style={[styles.stCellPts, s.isUs && styles.stCellUs]}>{s.pts}</Text>
             </View>
          ))}
          <TouchableOpacity style={styles.fullStandingsBtn}>
             <Text style={styles.fullStandingsBtnText}>Ver clasificación completa</Text>
          </TouchableOpacity>
       </View>

       {/* 4 & 6. ESTADÍSTICAS COLECTIVAS Y EVOLUCIÓN */}
       <Text style={styles.sectionTitle}>Estadísticas Destacadas</Text>
       <View style={styles.statsGrid}>
          <View style={styles.statBox}>
             <FontAwesome name="soccer-ball-o" size={24} color={clubColors.skyPrimary} style={styles.statIcon} />
             <Text style={styles.statVal}>{TEAM_ASSIGNMENTS.getPlayersByTeam('Infantil A')[0]?.nombre || 'Compañero'} (5)</Text>
             <Text style={styles.statLbl}>MÁXIMO GOLEADOR</Text>
          </View>
          <View style={styles.statBox}>
             <FontAwesome name="handshake-o" size={24} color={clubColors.skyPrimary} style={styles.statIcon} />
             <Text style={styles.statVal}>Pablo M. (4)</Text>
             <Text style={styles.statLbl}>MÁXIMO ASISTENTE</Text>
          </View>
          <View style={styles.statBox}>
             <FontAwesome name="shield" size={24} color={clubColors.success} style={styles.statIcon} />
             <Text style={styles.statVal}>2 Partidos</Text>
             <Text style={styles.statLbl}>PORTERÍA A CERO</Text>
          </View>
          <View style={styles.statBox}>
             <FontAwesome name="line-chart" size={24} color={clubColors.warning} style={styles.statIcon} />
             <View style={styles.formDotsRow}>
                {['D', 'V', 'V', 'E', 'V'].map((f, i) => (
                  <View key={i} style={[styles.formDot, {
                    backgroundColor: f === 'V' ? clubColors.success : f === 'E' ? clubColors.warning : clubColors.danger
                  }]}><Text style={styles.formDotText}>{f}</Text></View>
                ))}
             </View>
             <Text style={styles.statLbl}>RACHA ACTUAL</Text>
          </View>
       </View>

       {/* 9. MVP DEL ÚLTIMO PARTIDO */}
       <Text style={styles.sectionTitle}>MVP Último Partido</Text>
       <View style={styles.mvpCard}>
          <LinearGradient colors={['#0B1F4D', '#15357A']} style={StyleSheet.absoluteFillObject} />
          <View style={styles.mvpIconBox}><FontAwesome name="star" size={24} color={clubColors.warning} /></View>
          <View style={styles.mvpContent}>
             <View style={styles.mvpAvatar}><FontAwesome name="user" size={32} color={clubColors.navy} /></View>
             <View style={styles.mvpTextCol}>
                <Text style={styles.mvpName}>Lucas Pérez</Text>
                <Text style={styles.mvpDesc}>Espectacular actuación bajo palos para asegurar los 3 puntos contra el Villarreal.</Text>
             </View>
          </View>
       </View>

       {/* 8. MULTIMEDIA */}
       <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitleNoMargin}>Galería Multimedia</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>Ver todas (42)</Text></TouchableOpacity>
       </View>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll} contentContainerStyle={{paddingRight: 20}}>
          {[1,2,3].map(item => (
             <View key={item} style={styles.galleryItem}>
                <View style={styles.galleryImgPlaceholder}>
                   <FontAwesome name="image" size={32} color='rgba(255,255,255,0.2)' />
                </View>
                <Text style={styles.galleryCaption}>Resumen J{item+2}</Text>
             </View>
          ))}
       </ScrollView>
       
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: clubColors.navy,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 60,
  },
  
  headerHero: {
    backgroundColor: clubColors.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  headerHeroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  crestLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerHeroInfo: {
    flex: 1,
  },
  hhTeam: {
    color: clubColors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  hhComp: {
    color: clubColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  hhBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  hhBadge: {
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  hhBadgeText: {
    color: clubColors.navy,
    fontSize: 10,
    fontWeight: '900',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(7,26,61,0.05)',
    paddingTop: 16,
  },
  formLabel: {
    color: clubColors.textMuted,
    fontSize: 11,
    fontWeight: '800',
    marginRight: 12,
  },
  formNum: {
    fontSize: 16,
    fontWeight: '900',
    marginRight: 12,
  },

  sectionTitle: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
    marginLeft: 4,
  },
  sectionTitleNoMargin: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 4,
  },
  seeAllText: {
    color: clubColors.skyPrimary,
    fontSize: 13,
    fontWeight: '700',
  },

  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  kpiVal: {
    color: clubColors.white,
    fontSize: 28,
    fontWeight: '900',
  },
  kpiLbl: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
    textAlign: 'center',
  },

  nextMatchCard: {
    backgroundColor: clubColors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  nextMatchTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  nextMatchJor: {
    color: clubColors.skyPrimary,
    fontSize: 12,
    fontWeight: '900',
  },
  nextMatchDate: {
    color: clubColors.textMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  matchupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  teamCol: {
    alignItems: 'center',
    flex: 1,
  },
  crestBoxSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(7,26,61,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamNameSmall: {
    color: clubColors.navy,
    fontSize: 13,
    fontWeight: '900',
    textAlign: 'center',
  },
  vsText: {
    color: clubColors.textMuted,
    fontSize: 16,
    fontWeight: '900',
    marginHorizontal: 12,
  },
  nextMatchFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(7,26,61,0.05)',
    paddingTop: 12,
    alignItems: 'center',
  },
  nextMatchLoc: {
    color: clubColors.navy,
    fontSize: 13,
    fontWeight: '700',
  },

  matchesScroll: {
    marginBottom: 24,
  },
  recentMatchCard: {
    width: 140,
    backgroundColor: clubColors.white,
    borderRadius: 16,
    marginRight: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  rmStripe: {
    width: 6,
  },
  rmContent: {
    padding: 12,
    flex: 1,
  },
  rmJor: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  rmRival: {
    color: clubColors.navy,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 8,
  },
  rmResult: {
    fontSize: 16,
    fontWeight: '900',
  },

  standingsCard: {
    backgroundColor: clubColors.white,
    borderRadius: 20,
    paddingVertical: 16,
    marginBottom: 24,
  },
  standingsHeader: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(7,26,61,0.05)',
  },
  stHeaderText: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  standingsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(7,26,61,0.03)',
  },
  standingsRowUs: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
  },
  stCellPos: { width: 30, color: clubColors.navy, fontSize: 13, fontWeight: '800' },
  stCellTeam: { flex: 1, color: clubColors.navy, fontSize: 13, fontWeight: '700' },
  stCellNum: { width: 40, color: clubColors.navy, fontSize: 13, fontWeight: '600', textAlign: 'center' },
  stCellPts: { width: 40, color: clubColors.navy, fontSize: 13, fontWeight: '900', textAlign: 'right' },
  stCellUs: { fontWeight: '900', color: clubColors.navy },
  fullStandingsBtn: {
    marginTop: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  fullStandingsBtnText: {
    color: clubColors.skyPrimary,
    fontSize: 13,
    fontWeight: '800',
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statBox: {
    width: '48%',
    backgroundColor: clubColors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 12,
  },
  statVal: {
    color: clubColors.navy,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 4,
    textAlign: 'center',
  },
  statLbl: {
    color: clubColors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
  },
  formDotsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
    marginTop: 4,
  },
  formDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formDotText: {
    color: clubColors.white,
    fontSize: 9,
    fontWeight: '900',
  },

  mvpCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  mvpIconBox: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  mvpContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mvpAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: clubColors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  mvpTextCol: {
    flex: 1,
    paddingRight: 20,
  },
  mvpName: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 6,
  },
  mvpDesc: {
    color: clubColors.skyLight,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },

  galleryScroll: {
    marginBottom: 20,
  },
  galleryItem: {
    marginRight: 16,
    width: 200,
  },
  galleryImgPlaceholder: {
    height: 120,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  galleryCaption: {
    color: clubColors.white,
    fontSize: 13,
    fontWeight: '700',
    marginLeft: 4,
  }
});
