import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSport } from '../../context/SportContext';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  skyGlow: '#81D4FA',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  disabled: '#475569',
  warning: '#F59E0B',
};

export function DelegadoPreparacionPartido() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const { sport } = useSport();

  const getSportLabel = (s: string | null) => {
    switch (s) {
      case 'futbol_sala': return 'Fútbol Sala';
      case 'baloncesto': return 'Baloncesto';
      case 'voleibol': return 'Voleibol';
      case 'futbol':
      default: return 'Fútbol';
    }
  };

  const sportName = getSportLabel(sport);

  const [checkLineup, setCheckLineup] = useState(true);
  const [checkPreAct, setCheckPreAct] = useState(true);
  const [checkRoster, setCheckRoster] = useState(true);
  const [checkOffline, setCheckOffline] = useState(true);

  const isReadyToStart = checkLineup && checkPreAct && checkRoster && checkOffline;

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
          <Text style={styles.titleTxt}>PREPARACIÓN DEL PARTIDO</Text>
          <Text style={styles.subtitleTxt}>Jornada 14 · {sportName} · Infantil A vs Torrent CF "A"</Text>
        </View>
      </View>

      <View style={styles.roleNoticeBanner}>
        <Ionicons name="information-circle-outline" size={22} color={colors.skyPrimary} />
        <Text style={styles.roleNoticeTxt}>
          El entrenador prepara la alineación. El delegado verifica, genera la documentación y registra el partido.
        </Text>
      </View>

      <View style={styles.lineupCard}>
        <View style={styles.lineupHeader}>
          <Ionicons name="shirt-outline" size={20} color={colors.emeraldGlow} />
          <Text style={styles.lineupTitleTxt}>Alineación y Convocatoria ({sportName})</Text>
        </View>
        <Text style={styles.lineupSubtxt}>Titulares (11) + Banquillo (5) · Esquema 4-3-3 · Cuerpo Técnico Registrado</Text>
      </View>

      <Text style={styles.sectionTitleTxt}>CHECKLIST PREVIA AL ENCUENTRO</Text>

      <View style={styles.checklistGroup}>
        <TouchableOpacity 
          style={styles.checkItem}
          onPress={() => setCheckLineup(!checkLineup)}
          activeOpacity={0.8}
        >
          <Ionicons name={checkLineup ? "checkbox" : "square-outline"} size={24} color={checkLineup ? colors.emeraldGlow : colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkTitleTxt}>Alineación y Dorsales Confirmados</Text>
            <Text style={styles.checkDescTxt}>16 convocados, titulares y dorsales cotejados por el Míster</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkItem}
          onPress={() => setCheckPreAct(!checkPreAct)}
          activeOpacity={0.8}
        >
          <Ionicons name={checkPreAct ? "checkbox" : "square-outline"} size={24} color={checkPreAct ? colors.emeraldGlow : colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkTitleTxt}>Acta Previa Oficial Generada</Text>
            <Text style={styles.checkDescTxt}>Fichas y licencias de equipo listas para revisión arbitral</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkItem}
          onPress={() => setCheckRoster(!checkRoster)}
          activeOpacity={0.8}
        >
          <Ionicons name={checkRoster ? "checkbox" : "square-outline"} size={24} color={checkRoster ? colors.emeraldGlow : colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkTitleTxt}>Plantilla e Identificaciones Descargadas</Text>
            <Text style={styles.checkDescTxt}>Fichas digitales y seguros disponibles en el dispositivo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkItem}
          onPress={() => setCheckOffline(!checkOffline)}
          activeOpacity={0.8}
        >
          <Ionicons name={checkOffline ? "checkbox" : "square-outline"} size={24} color={checkOffline ? colors.emeraldGlow : colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkTitleTxt}>Modo Offline Preparado</Text>
            <Text style={styles.checkDescTxt}>Memoria local lista para registro sin cobertura en campo</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.startBtn, !isReadyToStart && styles.startBtnDisabled]}
        disabled={!isReadyToStart}
        onPress={() => router.push('/delegado/partido-en-vivo' as any)}
        activeOpacity={0.88}
      >
        <Ionicons name="play-circle" size={24} color={isReadyToStart ? colors.navyDark : colors.white} />
        <Text style={[styles.startBtnTxt, !isReadyToStart && { color: colors.white }]}>
          {isReadyToStart ? 'Iniciar Partido (En Vivo)' : 'Completa las 4 Comprobaciones'}
        </Text>
      </TouchableOpacity>
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
  subtitleTxt: { color: colors.skyGlow, fontSize: 13, fontWeight: '700' },
  roleNoticeBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(56, 189, 248, 0.12)', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.3)', marginBottom: 20 },
  roleNoticeTxt: { color: colors.white, fontSize: 13, fontWeight: '600', flex: 1, lineHeight: 18 },
  lineupCard: { backgroundColor: colors.navyCard, borderRadius: 14, padding: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 24 },
  lineupHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  lineupTitleTxt: { color: colors.white, fontSize: 15, fontWeight: '800' },
  lineupSubtxt: { color: colors.textMuted, fontSize: 12.5 },
  sectionTitleTxt: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 14 },
  checklistGroup: { gap: 12, marginBottom: 28 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.navyCard, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  checkTitleTxt: { color: colors.white, fontSize: 15, fontWeight: '900' },
  checkDescTxt: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.emeraldGlow, paddingVertical: 16, borderRadius: 14 },
  startBtnDisabled: { backgroundColor: colors.disabled },
  startBtnTxt: { color: colors.navyDark, fontSize: 16, fontWeight: '900' },
});
