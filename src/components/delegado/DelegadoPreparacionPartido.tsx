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
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  disabled: '#475569',
};

export function DelegadoPreparacionPartido() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

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
        <View>
          <Text style={styles.titleTxt}>PREPARACIÓN DEL PARTIDO</Text>
          <Text style={styles.subtitleTxt}>Jornada 14 · Cadete B vs Torrent CF "A"</Text>
        </View>
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
            <Text style={styles.checkTitleTxt}>Alineación confirmada por Míster</Text>
            <Text style={styles.checkDescTxt}>16 convocados y sistema 4-3-3 registrado</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkItem}
          onPress={() => setCheckPreAct(!checkPreAct)}
          activeOpacity={0.8}
        >
          <Ionicons name={checkPreAct ? "checkbox" : "square-outline"} size={24} color={checkPreAct ? colors.emeraldGlow : colors.textMuted} />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkTitleTxt}>Acta Previa Generada</Text>
            <Text style={styles.checkDescTxt}>Fichas y dorsales cotejados con el árbitro</Text>
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
            <Text style={styles.checkDescTxt}>Fichas digitales y seguros disponibles en dispositivo</Text>
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
            <Text style={styles.checkDescTxt}>Memoria local lista para registro sin cobertura de campo</Text>
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
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '700' },
  sectionTitleTxt: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 14 },
  checklistGroup: { gap: 12, marginBottom: 28 },
  checkItem: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.navyCard, padding: 16, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  checkTitleTxt: { color: colors.white, fontSize: 15, fontWeight: '900' },
  checkDescTxt: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.emeraldGlow, paddingVertical: 16, borderRadius: 16 },
  startBtnDisabled: { backgroundColor: colors.disabled, opacity: 0.6 },
  startBtnTxt: { color: colors.navyDark, fontSize: 17, fontWeight: '900' },
});
