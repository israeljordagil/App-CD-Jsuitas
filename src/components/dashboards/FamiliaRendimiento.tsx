import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressBar } from '../ui/ProgressBar';
import { CoachBadge } from '../ui/CoachBadge';

const { width } = Dimensions.get('window');

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#81D4FA',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
  purple: '#a855f7'
};

const mockGoalsData = [2, 4, 3, 5, 4, 6]; // Mock monthly evolution (Aug - Jan)
const maxGoal = Math.max(...mockGoalsData);

export function FamiliaRendimiento() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
       
       {/* 1. CABECERA PREMIUM */}
       <View style={styles.heroCard}>
          <LinearGradient colors={['rgba(79,195,247,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
          
          <View style={styles.heroTopRow}>
             <View style={styles.heroAvatar}>
                <FontAwesome name="user" size={48} color={clubColors.navy} />
             </View>
             <View style={styles.heroRatingBox}>
                <Text style={styles.heroRatingNum}>8.5</Text>
                <Text style={styles.heroRatingLbl}>VALORACIÓN</Text>
             </View>
          </View>
          
          <Text style={styles.heroName}>Pablo Martínez</Text>
          
          <View style={styles.heroTagsRow}>
             <View style={styles.heroTag}><Text style={styles.heroTagText}>Cadete B</Text></View>
             <View style={[styles.heroTag, {backgroundColor: clubColors.navy}]}><Text style={[styles.heroTagText, {color: clubColors.white}]}>Dorsal 8</Text></View>
             <View style={styles.heroTag}><Text style={styles.heroTagText}>Mediocentro</Text></View>
          </View>
       </View>

       {/* 2. KPIs GLOBALES */}
       <Text style={styles.sectionTitle}>Resumen de Temporada</Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kpiScroll} contentContainerStyle={{paddingRight: 20}}>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>18</Text><Text style={styles.kpiLbl}>PARTIDOS</Text></View>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>1,420'</Text><Text style={styles.kpiLbl}>MINUTOS</Text></View>
          <View style={[styles.kpiCard, {borderColor: clubColors.skyPrimary, borderWidth: 1}]}><Text style={[styles.kpiNum, {color: clubColors.skyPrimary}]}>6</Text><Text style={styles.kpiLbl}>GOLES</Text></View>
          <View style={[styles.kpiCard, {borderColor: clubColors.success, borderWidth: 1}]}><Text style={[styles.kpiNum, {color: clubColors.success}]}>8</Text><Text style={styles.kpiLbl}>ASISTENCIAS</Text></View>
          <View style={styles.kpiCard}><Text style={styles.kpiNum}>95%</Text><Text style={styles.kpiLbl}>ASISTENCIA</Text></View>
       </ScrollView>

       {/* 3. EVOLUCIÓN MENSUAL (Gráfico de Barras Mock) */}
       <Text style={styles.sectionTitle}>Evolución del Rendimiento</Text>
       <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
             <Text style={styles.chartTitle}>Minutos jugados por mes</Text>
             <Text style={styles.chartTrend}>+12% <FontAwesome name="arrow-up" size={10} /></Text>
          </View>
          
          <View style={styles.barChartContainer}>
             {mockGoalsData.map((val, idx) => {
                const heightPct = (val / maxGoal) * 100;
                const months = ['Ago', 'Sep', 'Oct', 'Nov', 'Dic', 'Ene'];
                return (
                   <View key={idx} style={styles.barWrapper}>
                      <View style={styles.barTrack}>
                         <LinearGradient 
                           colors={[clubColors.skyPrimary, clubColors.navy]} 
                           style={[styles.barFill, {height: `${heightPct}%`}]}
                           start={{x: 0, y: 0}} end={{x: 0, y: 1}}
                         />
                      </View>
                      <Text style={styles.barLabel}>{months[idx]}</Text>
                   </View>
                )
             })}
          </View>
       </View>

       {/* 4 & 5. ESTADÍSTICAS OFENSIVAS Y DEFENSIVAS */}
       <View style={styles.statsSplitRow}>
          {/* Ofensiva */}
          <View style={styles.statsHalfCard}>
             <View style={styles.statsHalfHeader}>
                <FontAwesome name="crosshairs" size={16} color={clubColors.skyPrimary} />
                <Text style={styles.statsHalfTitle}>Ofensiva</Text>
             </View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Tiros a puerta</Text><Text style={styles.statLineVal}>24</Text></View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Pases clave</Text><Text style={styles.statLineVal}>42</Text></View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Regates con éxito</Text><Text style={styles.statLineVal}>68%</Text></View>
          </View>
          
          {/* Defensiva */}
          <View style={styles.statsHalfCard}>
             <View style={styles.statsHalfHeader}>
                <FontAwesome name="shield" size={16} color={clubColors.success} />
                <Text style={styles.statsHalfTitle}>Defensiva</Text>
             </View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Recuperaciones</Text><Text style={styles.statLineVal}>85</Text></View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Duelos ganados</Text><Text style={styles.statLineVal}>71%</Text></View>
             <View style={styles.statLine}><Text style={styles.statLineLbl}>Despejes</Text><Text style={styles.statLineVal}>14</Text></View>
          </View>
       </View>

       {/* 6. DISCIPLINA & 7. ASISTENCIA */}
       <View style={styles.statsSplitRow}>
          {/* Disciplina */}
          <View style={styles.statsHalfCard}>
             <View style={styles.statsHalfHeader}>
                <FontAwesome name="gavel" size={16} color={clubColors.warning} />
                <Text style={styles.statsHalfTitle}>Disciplina</Text>
             </View>
             <View style={styles.statCardsRow}>
                <View style={styles.cardYellow}><Text style={styles.cardYellowNum}>3</Text></View>
                <View style={styles.cardRed}><Text style={styles.cardRedNum}>0</Text></View>
             </View>
             <Text style={styles.statLineLbl}>Faltas cometidas: 12</Text>
          </View>
          
          {/* Asistencia */}
          <View style={styles.statsHalfCard}>
             <View style={styles.statsHalfHeader}>
                <FontAwesome name="calendar-check-o" size={16} color={clubColors.purple} />
                <Text style={styles.statsHalfTitle}>Asistencia</Text>
             </View>
             <View style={styles.circleProgressContainer}>
                <Text style={styles.circleProgressVal}>95%</Text>
             </View>
             <Text style={styles.statLineLbl}>41/43 Entrenamientos</Text>
          </View>
       </View>

       {/* 8. EVOLUCIÓN FÍSICA */}
       <Text style={styles.sectionTitle}>Evolución Física</Text>
       <View style={styles.physicalCard}>
          <View style={styles.physRow}>
             <View style={styles.physInfo}>
                <Text style={styles.physVal}>172 cm</Text>
                <Text style={styles.physLbl}>ALTURA ACTUAL</Text>
             </View>
             <View style={styles.physGrowth}><Text style={styles.physGrowthText}>+2 cm este año</Text></View>
          </View>
          <View style={styles.physDivider} />
          <View style={styles.physRow}>
             <View style={styles.physInfo}>
                <Text style={styles.physVal}>64.5 kg</Text>
                <Text style={styles.physLbl}>PESO ACTUAL</Text>
             </View>
             <View style={styles.physGrowth}><Text style={styles.physGrowthText}>+1.5 kg este año</Text></View>
          </View>
       </View>

       {/* 9. LOGROS */}
       <Text style={styles.sectionTitle}>Palmarés y Logros</Text>
       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.achievementsScroll} contentContainerStyle={{paddingRight: 20}}>
          <View style={styles.achievementBadge}>
             <View style={[styles.achIconBg, {backgroundColor: 'rgba(234, 179, 8, 0.2)'}]}><FontAwesome name="trophy" size={24} color={clubColors.warning} /></View>
             <Text style={styles.achTitle}>MVP Torneo</Text>
             <Text style={styles.achSub}>Costa Blanca Cup</Text>
          </View>
          <View style={styles.achievementBadge}>
             <View style={[styles.achIconBg, {backgroundColor: 'rgba(79, 195, 247, 0.2)'}]}><FontAwesome name="star" size={24} color={clubColors.skyPrimary} /></View>
             <Text style={styles.achTitle}>Equipo del mes</Text>
             <Text style={styles.achSub}>Octubre 2026</Text>
          </View>
          <View style={styles.achievementBadge}>
             <View style={[styles.achIconBg, {backgroundColor: 'rgba(34, 197, 94, 0.2)'}]}><FontAwesome name="bullseye" size={24} color={clubColors.success} /></View>
             <Text style={styles.achTitle}>Francotirador</Text>
             <Text style={styles.achSub}>Goles de falta: 3</Text>
          </View>
       </ScrollView>

       {/* 10. OBJETIVOS */}
       <Text style={styles.sectionTitle}>Objetivos del Cuerpo Técnico</Text>
       <View style={styles.objectivesCard}>
          <View style={styles.objRow}>
             <FontAwesome name="check-circle" size={20} color={clubColors.success} style={styles.objIcon} />
             <Text style={[styles.objText, styles.objDone]}>Mejorar posicionamiento defensivo</Text>
          </View>
          <View style={styles.objRow}>
             <FontAwesome name="circle-thin" size={20} color={clubColors.textMuted} style={styles.objIcon} />
             <Text style={styles.objText}>Aumentar la intensidad en los últimos 15 min</Text>
          </View>
          <View style={styles.objRow}>
             <FontAwesome name="circle-thin" size={20} color={clubColors.textMuted} style={styles.objIcon} />
             <Text style={styles.objText}>Uso de la pierna no dominante en pases largos</Text>
          </View>
       </View>

       {/* 11. COMENTARIO ENTRENADOR */}
       <Text style={styles.sectionTitle}>Feedback del Entrenador</Text>
       <View style={styles.feedbackCard}>
          <FontAwesome name="quote-left" size={24} color={'rgba(79, 195, 247, 0.2)'} style={styles.quoteIcon} />
          <Text style={styles.feedbackText}>
             "Pablo está teniendo una evolución fantástica esta temporada. Ha asimilado muy bien su rol como mediocentro organizador y está liderando al equipo desde el centro del campo. Si sigue trabajando su físico, tiene un potencial enorme."
          </Text>
          <View style={styles.feedbackAuthorRow}>
             <View style={styles.feedbackAvatar}><FontAwesome name="user" size={16} color={clubColors.navy} /></View>
             <View style={styles.feedbackAuthorInfo}>
                <Text style={styles.feedbackAuthorName}>Miguel Pérez</Text>
                <CoachBadge type="principal" />
             </View>
          </View>
       </View>

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
  
  heroCard: {
    backgroundColor: clubColors.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  heroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(7,26,61,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroRatingBox: {
    backgroundColor: clubColors.skyPrimary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  heroRatingNum: {
    color: clubColors.navy,
    fontSize: 24,
    fontWeight: '900',
  },
  heroRatingLbl: {
    color: clubColors.navy,
    fontSize: 9,
    fontWeight: '900',
    marginTop: 2,
  },
  heroName: {
    color: clubColors.navy,
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  heroTagsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  heroTag: {
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  heroTagText: {
    color: clubColors.navy,
    fontSize: 11,
    fontWeight: '800',
  },

  sectionTitle: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 16,
    marginLeft: 4,
  },

  kpiScroll: {
    marginBottom: 24,
  },
  kpiCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    minWidth: 100,
    alignItems: 'center',
    marginRight: 12,
  },
  kpiNum: {
    color: clubColors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  kpiLbl: {
    color: clubColors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
  },

  chartCard: {
    backgroundColor: clubColors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  chartTitle: {
    color: clubColors.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  chartTrend: {
    color: clubColors.success,
    fontSize: 12,
    fontWeight: '900',
  },
  barChartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
  },
  barWrapper: {
    alignItems: 'center',
    width: 30,
  },
  barTrack: {
    width: 12,
    height: 100,
    backgroundColor: 'rgba(7,26,61,0.05)',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barLabel: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 8,
  },

  statsSplitRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statsHalfCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  statsHalfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsHalfTitle: {
    color: clubColors.white,
    fontSize: 14,
    fontWeight: '800',
    marginLeft: 8,
  },
  statLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingBottom: 4,
  },
  statLineLbl: {
    color: clubColors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  statLineVal: {
    color: clubColors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  
  statCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  cardYellow: {
    width: 40,
    height: 48,
    backgroundColor: clubColors.warning,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardYellowNum: {
    color: clubColors.navy,
    fontSize: 18,
    fontWeight: '900',
  },
  cardRed: {
    width: 40,
    height: 48,
    backgroundColor: clubColors.danger,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRedNum: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
  },

  circleProgressContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: clubColors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  circleProgressVal: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '900',
  },

  physicalCard: {
    backgroundColor: clubColors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  physRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  physInfo: {},
  physVal: {
    color: clubColors.navy,
    fontSize: 22,
    fontWeight: '900',
  },
  physLbl: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 2,
  },
  physGrowth: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  physGrowthText: {
    color: clubColors.success,
    fontSize: 12,
    fontWeight: '800',
  },
  physDivider: {
    height: 1,
    backgroundColor: 'rgba(7,26,61,0.05)',
    marginVertical: 16,
  },

  achievementsScroll: {
    marginBottom: 24,
  },
  achievementBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: 140,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  achIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  achTitle: {
    color: clubColors.white,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  achSub: {
    color: clubColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },

  objectivesCard: {
    backgroundColor: clubColors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  objRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  objIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  objText: {
    flex: 1,
    color: clubColors.navy,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  objDone: {
    textDecorationLine: 'line-through',
    color: clubColors.textMuted,
  },

  feedbackCard: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(79, 195, 247, 0.2)',
  },
  quoteIcon: {
    marginBottom: 12,
  },
  feedbackText: {
    color: clubColors.white,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 20,
  },
  feedbackAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: clubColors.skyPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  feedbackAuthorName: {
    color: clubColors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  feedbackAuthorRole: {
    color: clubColors.skyPrimary,
    fontSize: 12,
    fontWeight: '600',
  }
});
