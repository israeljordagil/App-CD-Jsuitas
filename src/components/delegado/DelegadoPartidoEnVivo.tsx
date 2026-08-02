import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  skyGlow: '#7DD3FC',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  goalkeeper: '#F59E0B',
};

interface PlayerBackJerseyProps {
  dorsal: string;
  name: string;
  isGoalkeeper?: boolean;
}

// COMPONENTE OBLIGATORIO: REPRESENTACIÓN CON LA PARTE TRASERA DE LA CAMISETA OFICIAL
function PlayerBackJersey({ dorsal, name, isGoalkeeper = false }: PlayerBackJerseyProps) {
  const kitBgColor = isGoalkeeper ? colors.goalkeeper : colors.skyPrimary;
  const kitTextColor = colors.navyDark;

  return (
    <View style={styles.jerseyCardContainer}>
      {/* SILUETA DE LA PARTE TRASERA DE LA CAMISETA */}
      <View style={[styles.jerseyBackBody, { backgroundColor: kitBgColor }]}>
        {/* CUELLO DE LA CAMISETA VISTO DESDE ATRÁS */}
        <View style={styles.jerseyBackCollar} />

        {/* RAYAS VERTICALES DE ESPALDA SI ES JUGADOR DE CAMPO */}
        {!isGoalkeeper && (
          <View style={styles.jerseyStripesOverlay}>
            <View style={styles.stripeLine} />
            <View style={styles.stripeLine} />
          </View>
        )}

        {/* DORSAL GRANDE TRASERO */}
        <Text style={[styles.jerseyDorsalTxt, { color: kitTextColor }]}>{dorsal}</Text>
      </View>

      {/* NOMBRE DEL JUGADOR DEBAJO DE LA CAMISETA */}
      <Text style={styles.jerseyNameTxt} numberOfLines={1}>{name}</Text>
    </View>
  );
}

const STARTERS = [
  { dorsal: '1', name: 'M. Soler', isGoalkeeper: true },
  { dorsal: '2', name: 'A. Ruiz' },
  { dorsal: '4', name: 'H. Martínez' },
  { dorsal: '5', name: 'J. Navarro' },
  { dorsal: '3', name: 'C. Pastor' },
  { dorsal: '6', name: 'D. Vidal' },
  { dorsal: '8', name: 'P. Martínez' },
  { dorsal: '10', name: 'M. Fernández' },
  { dorsal: '7', name: 'S. Beltrán' },
  { dorsal: '11', name: 'L. Sanchis' },
  { dorsal: '9', name: 'A. Gómez' },
];

const BENCH = [
  { dorsal: '13', name: 'R. Cano', isGoalkeeper: true },
  { dorsal: '12', name: 'I. Crespo' },
  { dorsal: '14', name: 'F. Gil' },
  { dorsal: '15', name: 'E. Soriano' },
  { dorsal: '16', name: 'V. Ribes' },
];

export function DelegadoPartidoEnVivo() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const [matchTime, setMatchTime] = useState('24:12');

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleTxt}>PARTIDO EN VIVO</Text>
          <Text style={styles.subtitleTxt}>Partido en Vivo · En revisión</Text>
        </View>
      </View>

      {/* 1. MARCADOR Y CRONÓMETRO */}
      <View style={styles.scoreboardCard}>
        <View style={styles.liveBadgeRow}>
          <View style={styles.liveRedDot} />
          <Text style={styles.liveBadgeTxt}>1ª PARTE · EN VIVO</Text>
        </View>

        <View style={styles.scoreRow}>
          <View style={styles.teamScoreBox}>
            <Text style={styles.teamScoreName}>Cadete B</Text>
            <Text style={styles.scoreDigit}>1</Text>
          </View>

          <View style={styles.timerBox}>
            <Text style={styles.timerTxt}>{matchTime}</Text>
            <Text style={styles.timerSubTxt}>Minuto 24</Text>
          </View>

          <View style={styles.teamScoreBox}>
            <Text style={styles.teamScoreName}>Torrent CF</Text>
            <Text style={styles.scoreDigit}>0</Text>
          </View>
        </View>
      </View>

      {/* 2. TERRENO DE JUEGO (CAMPO) CON PARTE TRASERA DE CAMISETAS */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="shirt-outline" size={20} color={colors.emeraldGlow} />
        <Text style={styles.sectionTitleTxt}>ONCE TITULAR (CAMISETAS TRASERAS OFICIALES)</Text>
      </View>

      <View style={styles.pitchContainer}>
        <View style={styles.pitchGrid}>
          {STARTERS.map((player) => (
            <PlayerBackJersey 
              key={player.dorsal} 
              dorsal={player.dorsal} 
              name={player.name} 
              isGoalkeeper={player.isGoalkeeper} 
            />
          ))}
        </View>
      </View>

      {/* 3. BANQUILLO DE SUPLENTES */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="people-outline" size={20} color={colors.skyPrimary} />
        <Text style={styles.sectionTitleTxt}>SUPLENTES Y RELEVOS</Text>
      </View>

      <View style={styles.benchRow}>
        {BENCH.map((player) => (
          <PlayerBackJersey 
            key={player.dorsal} 
            dorsal={player.dorsal} 
            name={player.name} 
            isGoalkeeper={player.isGoalkeeper} 
          />
        ))}
      </View>

      {/* 4. LÍNEA TEMPORAL Y ACCIONES GENERALES */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="time-outline" size={20} color={colors.skyGlow} />
        <Text style={styles.sectionTitleTxt}>LÍNEA TEMPORAL DE ACCIONES</Text>
      </View>

      <View style={styles.timelineCard}>
        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>21'</Text>
          <Ionicons name="football" size={16} color={colors.emeraldGlow} />
          <Text style={styles.timelineText}>¡Gol de Cadete B! Dorsal #9 A. Gómez</Text>
        </View>

        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>14'</Text>
          <Ionicons name="square" size={14} color="#F59E0B" />
          <Text style={styles.timelineText}>Tarjeta Amarilla · Dorsal #4 H. Martínez</Text>
        </View>

        <View style={styles.timelineItem}>
          <Text style={styles.timelineTime}>00'</Text>
          <Ionicons name="play" size={14} color={colors.skyPrimary} />
          <Text style={styles.timelineText}>Inicio del Partido (1ª Parte)</Text>
        </View>
      </View>

      {/* BOTONES DE ACCIONES GENERALES */}
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="football-outline" size={20} color={colors.navyDark} />
          <Text style={styles.actionBtnTxt}>+ Gol</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#F59E0B' }]}>
          <Ionicons name="square-outline" size={20} color={colors.navyDark} />
          <Text style={styles.actionBtnTxt}>+ Tarjeta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.skyPrimary }]}>
          <Ionicons name="swap-horizontal-outline" size={20} color={colors.navyDark} />
          <Text style={styles.actionBtnTxt}>+ Cambio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 20, paddingBottom: 40 },
  contentDesktop: { maxWidth: 900, alignSelf: 'center', width: '100%' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '700' },

  // MARCADOR
  scoreboardCard: { backgroundColor: colors.navyDeep, borderRadius: 20, padding: 20, borderWidth: 1.5, borderColor: colors.emeraldGlow, marginBottom: 24, alignItems: 'center' },
  liveBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(239, 68, 68, 0.15)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 14 },
  liveRedDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  liveBadgeTxt: { color: '#EF4444', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' },
  teamScoreBox: { alignItems: 'center', flex: 1 },
  teamScoreName: { color: colors.white, fontSize: 15, fontWeight: '900', marginBottom: 4 },
  scoreDigit: { color: colors.white, fontSize: 36, fontWeight: '900' },
  timerBox: { alignItems: 'center', paddingHorizontal: 16 },
  timerTxt: { color: colors.emeraldGlow, fontSize: 28, fontWeight: '900' },
  timerSubTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12, marginTop: 10 },
  sectionTitleTxt: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 1 },

  // PARTE TRASERA DE LA CAMISETA (CUMPLIMIENTO DE REGLA OBLIGATORIA)
  jerseyCardContainer: { alignItems: 'center', margin: 6 },
  jerseyBackBody: {
    width: 48,
    height: 54,
    borderRadius: 8,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  jerseyBackCollar: {
    position: 'absolute',
    top: 0,
    width: 18,
    height: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: colors.navyDark,
  },
  jerseyStripesOverlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: 0.25,
  },
  stripeLine: {
    width: 6,
    height: '100%',
    backgroundColor: colors.navyDark,
  },
  jerseyDorsalTxt: {
    fontSize: 19,
    fontWeight: '900',
    marginTop: 4,
  },
  jerseyNameTxt: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
    maxWidth: 65,
    textAlign: 'center',
  },

  pitchContainer: { backgroundColor: '#052316', borderRadius: 18, padding: 16, borderWidth: 1.5, borderColor: 'rgba(16, 185, 129, 0.4)', marginBottom: 20 },
  pitchGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 10 },

  benchRow: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 24, gap: 12, justifyContent: 'center' },

  timelineCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border, gap: 12, marginBottom: 24 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  timelineTime: { color: colors.skyGlow, fontSize: 13, fontWeight: '900', width: 28 },
  timelineText: { color: colors.white, fontSize: 13, fontWeight: '600' },

  actionsGrid: { flexDirection: 'row', gap: 12 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.emeraldGlow, paddingVertical: 14, borderRadius: 14 },
  actionBtnTxt: { color: colors.navyDark, fontSize: 14, fontWeight: '900' },
});
