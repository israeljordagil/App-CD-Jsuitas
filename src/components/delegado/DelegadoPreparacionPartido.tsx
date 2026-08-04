import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TacticalPitch, PitchPlayer } from './liveMatch/TacticalPitch';
import { TacticalJersey } from './liveMatch/TacticalJersey';

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
  disabled: '#334155',
  warning: '#F59E0B',
  goalkeeper: '#800020',
  rivalPrimary: '#FF6600',
  rivalGK: '#65A30D',
};

const STARTERS_PREPARATION: PitchPlayer[] = [
  { id: '1', dorsal: '1', name: 'ÁLVARO', role: 'POR', isGoalkeeper: true, xPercent: 50, yPercent: 87 },
  { id: '3', dorsal: '3', name: 'MARTÍN', role: 'LI', xPercent: 14, yPercent: 70 },
  { id: '4', dorsal: '4', name: 'HUGO', role: 'DFC', xPercent: 38, yPercent: 73 },
  { id: '5', dorsal: '5', name: 'LUCAS', role: 'DFC', xPercent: 62, yPercent: 73 },
  { id: '2', dorsal: '2', name: 'DANI', role: 'LD', xPercent: 86, yPercent: 70 },
  { id: '8', dorsal: '8', name: 'PABLO', role: 'MC', xPercent: 35, yPercent: 52 },
  { id: '6', dorsal: '6', name: 'JAVI', role: 'MC', xPercent: 65, yPercent: 52 },
  { id: '11', dorsal: '11', name: 'DAVID', role: 'EI', xPercent: 18, yPercent: 34 },
  { id: '10', dorsal: '10', name: 'MARCOS', role: 'MP', isCaptain: true, xPercent: 50, yPercent: 33 },
  { id: '7', dorsal: '7', name: 'IVÁN', role: 'ED', xPercent: 82, yPercent: 34 },
  { id: '9', dorsal: '9', name: 'ALEJANDRO', role: 'DC', xPercent: 50, yPercent: 14 },
];


const BENCH_PREPARATION = [
  { dorsal: '13', name: 'ÁLVARO G.', role: 'POR', isGoalkeeper: true },
  { dorsal: '12', name: 'DIEGO', role: 'DFC', isGoalkeeper: false },
  { dorsal: '14', name: 'SERGIO', role: 'MC', isGoalkeeper: false },
  { dorsal: '15', name: 'ADRIÁN', role: 'MC', isGoalkeeper: false },
  { dorsal: '16', name: 'IAN', role: 'EI', isGoalkeeper: false },
  { dorsal: '17', name: 'ÁLEX', role: 'MC', isGoalkeeper: false },
];



export function DelegadoPreparacionPartido() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // 12. COMPROBACIONES MANUALES (ÚNICOS 2 CONTROLES INTERACTIVOS)
  const [checkBotiquin, setCheckBotiquin] = useState(false);
  const [checkBalones, setCheckBalones] = useState(false);

  const isReadyToStart = checkBotiquin && checkBalones;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. CABECERA PRINCIPAL DEL PARTIDO */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleTxt}>PREPARACIÓN DEL PARTIDO</Text>
          <Text style={styles.subtitleTxt}>CD Jesuitas vs Torrent CF "A" · Liga Preferente Cadete (Fútbol 11)</Text>
        </View>
        <View style={styles.localBadgePill}>
          <Ionicons name="home" size={14} color={colors.navyDark} />
          <Text style={styles.localBadgeTxt}>LOCAL</Text>
        </View>
      </View>

      {/* AVISO INFORMATIVO RÁPIDO */}
      <View style={styles.infoBanner}>
        <Ionicons name="flash-outline" size={20} color={colors.skyPrimary} />
        <Text style={styles.infoBannerTxt}>
          Información compilada en modo lectura. Solo requiere confirmar botiquín y balones para comenzar.
        </Text>
      </View>

      {/* GRID DE CONTENIDO PRINCIPAL */}
      <View style={isDesktop ? styles.desktopGrid : styles.mobileStack}>
        
        {/* COLUMNA IZQUIERDA: DATOS GENERALES Y CONVOCATORIA */}
        <View style={isDesktop ? styles.colLeft : { width: '100%' }}>
          
          {/* SECCIÓN 1, 5, 6, 7: DATOS LOGÍSTICOS DE PARTIDO */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="calendar-outline" size={18} color={colors.skyPrimary} />
              <Text style={styles.cardTitleTxt}>DATOS DEL ENCUENTRO</Text>
            </View>

            <View style={styles.matchMetaGrid}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>FECHA Y HORA</Text>
                <Text style={styles.metaVal}>Sáb 8 Ago · 10:30 h</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>HORA DE CITACIÓN</Text>
                <Text style={styles.metaValHighlight}>09:30 h (1h antes)</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>INSTALACIÓN Y CAMPO</Text>
                <Text style={styles.metaVal}>Polideportivo Jesuitas · Campo 1</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>VESTUARIOS</Text>
                <Text style={styles.metaVal}>Local: V-3 · Visitante: V-4</Text>
              </View>
            </View>
          </View>

          {/* SECCIÓN 8 Y 11: ÁRBITRO Y CAPITANES */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.emeraldGlow} />
              <Text style={styles.cardTitleTxt}>OFICIALES Y CAPITANES</Text>
            </View>

            <View style={styles.matchMetaGrid}>
              <View style={styles.metaItemFull}>
                <Text style={styles.metaLabel}>ÁRBITRO DESIGNADO</Text>
                <View style={styles.refereeRow}>
                  <Ionicons name="person-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.refereeNameTxt}>Carlos Martínez Gómez</Text>
                  <Text style={styles.refereeCatTxt}>(Comité Valenciano)</Text>
                </View>
              </View>
              
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>CAPITÁN</Text>
                <Text style={styles.metaVal}>#10 MARCOS (MP)</Text>
              </View>

              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>2º CAPITÁN</Text>
                <Text style={styles.metaVal}>#4 HUGO (DFC)</Text>
              </View>
            </View>
          </View>

          {/* SECCIÓN 3 Y 4: EQUIPACIONES Y COLORES RIVAL */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="shirt-outline" size={18} color={colors.skyGlow} />
              <Text style={styles.cardTitleTxt}>EQUIPACIONES Y COLORES</Text>
            </View>

            <View style={styles.kitsGrid}>
              {/* EQUIPACIÓN LOCAL CD JESUITAS */}
              <View style={styles.kitCardBox}>
                <Text style={styles.kitTitle}>CD JESUITAS (LOCAL)</Text>
                <View style={styles.kitSampleRow}>
                  <View style={styles.jerseyPreviewWrapper}>
                    <TacticalJersey dorsal="10" name="JUGADOR" scale={0.75} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.kitRoleTxt}>Jugadores: <Text style={{ color: colors.skyGlow }}>Celeste</Text></Text>
                    <Text style={styles.kitRoleTxt}>Portero: <Text style={{ color: '#FF8888' }}>Granate</Text></Text>
                  </View>
                </View>
              </View>

              {/* COLORES RIVAL TORRENT CF */}
              <View style={styles.kitCardBox}>
                <Text style={styles.kitTitle}>TORRENT CF (RIVAL)</Text>
                <View style={styles.kitSampleRow}>
                  <View style={styles.rivalColorSwatches}>
                    <View style={[styles.swatchCircle, { backgroundColor: colors.rivalPrimary }]} />
                    <View style={[styles.swatchCircle, { backgroundColor: colors.rivalGK }]} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.kitRoleTxt}>Jugadores: <Text style={{ color: colors.rivalPrimary }}>Naranja</Text></Text>
                    <Text style={styles.kitRoleTxt}>Portero: <Text style={{ color: colors.rivalGK }}>Verde Oliva</Text></Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* SECCIÓN 2: CONVOCATORIA DEFINITIVA (COMPACTA) */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="people-outline" size={18} color={colors.skyPrimary} />
              <Text style={styles.cardTitleTxt}>CONVOCATORIA DEFINITIVA (17)</Text>
            </View>

            <View style={styles.rosterCompactGrid}>
              {STARTERS_PREPARATION.concat(
                BENCH_PREPARATION.map((b, i) => ({
                  id: `b-${i}`,
                  dorsal: b.dorsal,
                  name: b.name,
                  role: b.role,
                  isGoalkeeper: b.isGoalkeeper,
                  xPercent: 0,
                  yPercent: 0,
                }))
              ).map((p) => (
                <View key={`roster-${p.dorsal}`} style={styles.rosterChip}>
                  <Text style={styles.rosterChipDorsal}>#{p.dorsal}</Text>
                  <Text style={styles.rosterChipName} numberOfLines={1}>{p.name}</Text>
                  <Text style={styles.rosterChipRole}>{p.role}</Text>
                </View>
              ))}
            </View>
          </View>

        </View>

        {/* COLUMNA DERECHA: ALINEACIÓN TÁCTICA, BANQUILLO Y CHECKLIST */}
        <View style={isDesktop ? styles.colRight : { width: '100%' }}>
          
          {/* SECCIÓN 9: ALINEACIÓN INICIAL (PIZARRA TÁCTICA LECTURA RÁPIDA) */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="easel-outline" size={18} color={colors.emeraldGlow} />
              <Text style={styles.cardTitleTxt}>ONCE INICIAL (1-4-2-3-1)</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <TacticalPitch systemName="1-4-2-3-1" starters={STARTERS_PREPARATION} />
            </View>
          </View>

          {/* SECCIÓN 10: BANQUILLO Y SUPLENTES */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="swap-horizontal-outline" size={18} color={colors.skyGlow} />
              <Text style={styles.cardTitleTxt}>SUPLENTES Y BANQUILLO ({BENCH_PREPARATION.length})</Text>
            </View>

            <View style={styles.benchListGroup}>
              {BENCH_PREPARATION.map((b) => (
                <View key={`bench-${b.dorsal}`} style={styles.benchItemRow}>
                  <View style={styles.benchItemDorsalBadge}>
                    <Text style={styles.benchItemDorsalTxt}>#{b.dorsal}</Text>
                  </View>
                  <Text style={styles.benchItemNameTxt}>{b.name}</Text>
                  <Text style={styles.benchItemRoleTxt}>{b.role}</Text>
                  {b.isGoalkeeper && (
                    <View style={styles.gkSubBadge}>
                      <Text style={styles.gkSubBadgeTxt}>🧤 PORTERO SUPLENTE</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* SECCIÓN 12: COMPROBACIONES MANUALES (ÚNICOS 2 CONTROLES INTERACTIVOS) */}
          <View style={styles.cardSectionHighlight}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="checkbox-outline" size={20} color={colors.emeraldGlow} />
              <Text style={[styles.cardTitleTxt, { color: colors.emeraldGlow }]}>COMPROBACIONES FINALES</Text>
            </View>
            <Text style={styles.checklistNoticeTxt}>
              Marca únicamente los dos elementos materiales preparados para habilitar el partido:
            </Text>

            <View style={styles.checklistContainer}>
              {/* COMPROBACIÓN 1: BOTIQUÍN PREPARADO */}
              <TouchableOpacity 
                style={[styles.checkTileBtn, checkBotiquin && styles.checkTileBtnActive]}
                onPress={() => setCheckBotiquin(!checkBotiquin)}
                activeOpacity={0.85}
              >
                <Ionicons 
                  name={checkBotiquin ? "checkbox" : "square-outline"} 
                  size={26} 
                  color={checkBotiquin ? colors.emeraldGlow : colors.textMuted} 
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTileTitle}>Botiquín preparado</Text>
                  <Text style={styles.checkTileDesc}>Material médico básico y hielo verificado</Text>
                </View>
              </TouchableOpacity>

              {/* COMPROBACIÓN 2: BALONES PREPARADOS */}
              <TouchableOpacity 
                style={[styles.checkTileBtn, checkBalones && styles.checkTileBtnActive]}
                onPress={() => setCheckBalones(!checkBalones)}
                activeOpacity={0.85}
              >
                <Ionicons 
                  name={checkBalones ? "checkbox" : "square-outline"} 
                  size={26} 
                  color={checkBalones ? colors.emeraldGlow : colors.textMuted} 
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.checkTileTitle}>Balones preparados</Text>
                  <Text style={styles.checkTileDesc}>Balones de calentamiento y juego hinchados</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* SECCIÓN 13: BOTÓN FINAL Y NAVEGACIÓN A PARTIDO EN VIVO */}
            <TouchableOpacity 
              style={[styles.startMatchBtn, !isReadyToStart && styles.startMatchBtnDisabled]}
              disabled={!isReadyToStart}
              onPress={() => router.push('/delegado/partido-en-vivo' as any)}
              activeOpacity={0.88}
            >
              <Ionicons name="play-circle" size={26} color={isReadyToStart ? colors.navyDark : colors.white} />
              <Text style={[styles.startMatchBtnTxt, !isReadyToStart && { color: colors.white }]}>
                {isReadyToStart ? 'COMENZAR PARTIDO' : 'Completa las 2 comprobaciones'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyDark,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  contentDesktop: {
    maxWidth: 1150,
    alignSelf: 'center',
    width: '100%',
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.navyCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  titleTxt: {
    color: colors.white,
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  subtitleTxt: {
    color: colors.skyGlow,
    fontSize: 12.5,
    fontWeight: '700',
    marginTop: 2,
  },
  localBadgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.emeraldGlow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  localBadgeTxt: {
    color: colors.navyDark,
    fontSize: 12,
    fontWeight: '900',
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
    marginBottom: 20,
  },
  infoBannerTxt: {
    color: colors.white,
    fontSize: 12.5,
    fontWeight: '600',
    flex: 1,
  },
  desktopGrid: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  mobileStack: {
    flexDirection: 'column',
    gap: 16,
  },
  colLeft: {
    flex: 1,
    gap: 16,
  },
  colRight: {
    flex: 1.1,
    gap: 16,
  },
  cardSection: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardSectionHighlight: {
    backgroundColor: colors.navyDeep,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1.5,
    borderColor: 'rgba(52, 211, 153, 0.4)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  cardTitleTxt: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  matchMetaGrid: {
    gap: 10,
  },
  metaItem: {
    backgroundColor: 'rgba(2, 8, 20, 0.5)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  metaItemFull: {
    backgroundColor: 'rgba(2, 8, 20, 0.5)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  metaLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  metaVal: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  metaValHighlight: {
    color: colors.emeraldGlow,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 2,
  },
  refereeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  refereeNameTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  refereeCatTxt: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '600',
  },
  kitsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  kitCardBox: {
    flex: 1,
    backgroundColor: 'rgba(2, 8, 20, 0.5)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  kitTitle: {
    color: colors.textMuted,
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  kitSampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  jerseyPreviewWrapper: {
    width: 45,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rivalColorSwatches: {
    flexDirection: 'row',
    gap: 6,
  },
  swatchCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  kitRoleTxt: {
    color: colors.white,
    fontSize: 11.5,
    fontWeight: '700',
    marginTop: 2,
  },
  rosterCompactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  rosterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(2, 8, 20, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  rosterChipDorsal: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '900',
  },
  rosterChipName: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '700',
    maxWidth: 75,
  },
  rosterChipRole: {
    color: colors.textMuted,
    fontSize: 9.5,
    fontWeight: '800',
  },
  benchListGroup: {
    gap: 8,
  },
  benchItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(2, 8, 20, 0.5)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  benchItemDorsalBadge: {
    backgroundColor: colors.navyDeep,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  benchItemDorsalTxt: {
    color: colors.skyGlow,
    fontSize: 12,
    fontWeight: '900',
  },
  benchItemNameTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
    flex: 1,
  },
  benchItemRoleTxt: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '700',
  },
  gkSubBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.warning,
  },
  gkSubBadgeTxt: {
    color: colors.warning,
    fontSize: 10,
    fontWeight: '900',
  },
  checklistNoticeTxt: {
    color: colors.textMuted,
    fontSize: 12,
    marginBottom: 14,
  },
  checklistContainer: {
    gap: 10,
    marginBottom: 18,
  },
  checkTileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(2, 8, 20, 0.7)',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  checkTileBtnActive: {
    backgroundColor: 'rgba(52, 211, 153, 0.12)',
    borderColor: colors.emeraldGlow,
  },
  checkTileTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  checkTileDesc: {
    color: colors.textMuted,
    fontSize: 11.5,
    marginTop: 1,
  },
  startMatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.emeraldGlow,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: colors.emeraldGlow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startMatchBtnDisabled: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
    elevation: 0,
  },
  startMatchBtnTxt: {
    color: colors.navyDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
});
