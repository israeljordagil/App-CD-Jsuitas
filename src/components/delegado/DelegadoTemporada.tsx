import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
};

const MOCK_SEASON_MATCHES = [
  { id: 'm-14', round: 'Jornada 14', rival: 'Torrent CF "A"', date: '08/08/2026', result: 'Próximo', isHome: true },
  { id: 'm-13', round: 'Jornada 13', rival: 'Paterna CF "B"', date: '01/08/2026', result: '3 - 1 (Victoria)', isHome: false },
  { id: 'm-12', round: 'Jornada 12', rival: 'Levante UD "C"', date: '25/07/2026', result: '2 - 2 (Empate)', isHome: true },
];

export function DelegadoTemporada() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

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
        <View>
          <Text style={styles.titleTxt}>MI TEMPORADA 2026/2027</Text>
          <Text style={styles.subtitleTxt}>Equipo asignado: Cadete B F11</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>14</Text>
          <Text style={styles.summaryLabel}>Partidos Gestionados</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>100%</Text>
          <Text style={styles.summaryLabel}>Actas Presentadas</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: colors.emeraldGlow }]}>30 JUN 2027</Text>
          <Text style={styles.summaryLabel}>Vigencia Asignación</Text>
        </View>
      </View>

      <Text style={styles.sectionHeaderTxt}>ARCHIVO DE ENCUENTROS</Text>

      {MOCK_SEASON_MATCHES.map((match) => (
        <View key={match.id} style={styles.matchCard}>
          <View style={styles.matchInfoCol}>
            <Text style={styles.matchRoundTxt}>{match.round} · {match.isHome ? 'Local' : 'Visitante'}</Text>
            <Text style={styles.matchRivalTxt}>Cadete B vs {match.rival}</Text>
            <Text style={styles.matchDateTxt}>{match.date}</Text>
          </View>
          <View style={styles.matchStatusCol}>
            <Text style={[styles.resultTxt, match.result === 'Próximo' && { color: colors.skyPrimary }]}>
              {match.result}
            </Text>
            <TouchableOpacity style={styles.expedienteBtn} activeOpacity={0.8}>
              <Text style={styles.expedienteBtnTxt}>Expediente</Text>
              <Ionicons name="chevron-forward" size={14} color={colors.emeraldGlow} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
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
  summaryCard: { flexDirection: 'row', backgroundColor: colors.navyCard, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 24, justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryNumber: { color: colors.white, fontSize: 20, fontWeight: '900' },
  summaryLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '600', marginTop: 4 },
  summaryDivider: { width: 1, height: '100%', backgroundColor: colors.border },
  sectionHeaderTxt: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 14 },
  matchCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.navyDeep, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.border, marginBottom: 12 },
  matchInfoCol: { gap: 2 },
  matchRoundTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '800' },
  matchRivalTxt: { color: colors.white, fontSize: 15, fontWeight: '900' },
  matchDateTxt: { color: colors.textMuted, fontSize: 12 },
  matchStatusCol: { alignItems: 'flex-end', gap: 6 },
  resultTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '800' },
  expedienteBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  expedienteBtnTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700' },
});
