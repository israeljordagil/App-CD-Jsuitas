import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal } from 'react-native';
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
  yellowCard: '#F59E0B',
};

export interface FinishedMatchRecord {
  matchId: string;
  category: string;
  teamName: string;
  rivalName: string;
  homeTeamLabel: string;
  awayTeamLabel: string;
  isHome: boolean;
  homeScore: number;
  awayScore: number;
  finishedAtFormatted: string;
  finishedTimestamp: number;
  matchPhase: string;
  actaGenerated: boolean;
  pendingActa: boolean;
  events: any[];
}

export function DelegadoTemporada() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [finishedMatches, setFinishedMatches] = useState<FinishedMatchRecord[]>([]);
  const [selectedSummaryMatch, setSelectedSummaryMatch] = useState<FinishedMatchRecord | null>(null);
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);

  const handleOpenSummaryModal = (match: FinishedMatchRecord) => {
    setSelectedSummaryMatch(match);
    setIsSummaryModalVisible(true);
  };

  const handleCloseSummaryModal = () => {
    setIsSummaryModalVisible(false);
  };

  const loadFinishedMatches = useCallback(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const raw = window.localStorage.getItem('@cd_jesuitas_finished_matches_history');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            setFinishedMatches(parsed);
            return;
          }
        }
      } catch (err) {
        console.warn('[DelegadoTemporada] Error loading history:', err);
      }
    }
    setFinishedMatches([]);
  }, []);

  useEffect(() => {
    loadFinishedMatches();

    if (typeof window !== 'undefined') {
      window.addEventListener('focus', loadFinishedMatches);
      return () => {
        window.removeEventListener('focus', loadFinishedMatches);
      };
    }
  }, [loadFinishedMatches]);

  const handleOpenActa = (match: FinishedMatchRecord) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('@cd_jesuitas_active_acta_match', JSON.stringify(match));
        if (match.pendingActa) {
          window.localStorage.setItem('@cd_jesuitas_pending_acta_match', JSON.stringify(match));
        }
      } catch (_) {}
    }
    router.push('/delegado/acta' as any);
  };

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
          <Text style={styles.summaryNumber}>{finishedMatches.length}</Text>
          <Text style={styles.summaryLabel}>Partidos Finalizados</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>
            {finishedMatches.length > 0 
              ? `${Math.round((finishedMatches.filter(m => m.actaGenerated).length / finishedMatches.length) * 100)}%` 
              : '100%'}
          </Text>
          <Text style={styles.summaryLabel}>Actas Presentadas</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryNumber, { color: colors.emeraldGlow }]}>30 JUN 2027</Text>
          <Text style={styles.summaryLabel}>Vigencia Asignación</Text>
        </View>
      </View>

      <Text style={styles.sectionHeaderTxt}>PARTIDOS FINALIZADOS ({finishedMatches.length})</Text>

      {finishedMatches.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="calendar-outline" size={36} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Sin partidos finalizados aún</Text>
          <Text style={styles.emptyDesc}>Los partidos que des por concluidos en Partido en Vivo quedarán archivados aquí con su resumen y su acta oficial.</Text>
        </View>
      ) : (
        finishedMatches.map((match) => (
          <View key={match.matchId} style={styles.matchCard}>
            <View style={styles.matchCardHeader}>
              <View style={styles.matchBadgePill}>
                <Text style={styles.matchBadgePillTxt}>{match.category} · {match.isHome ? 'LOCAL' : 'VISITANTE'}</Text>
              </View>
              {match.actaGenerated ? (
                <View style={styles.actaOkBadge}>
                  <Ionicons name="checkmark-circle" size={12} color={colors.emeraldGlow} />
                  <Text style={styles.actaOkBadgeTxt}>Acta generada</Text>
                </View>
              ) : (
                <View style={styles.actaPendingBadge}>
                  <Ionicons name="document-text" size={12} color={colors.yellowCard} />
                  <Text style={styles.actaPendingBadgeTxt}>Acta pendiente</Text>
                </View>
              )}
            </View>

            <View style={styles.matchTeamsRow}>
              <Text style={styles.teamTitleTxt}>{match.homeTeamLabel} vs {match.awayTeamLabel}</Text>
              <View style={styles.scorePill}>
                <Text style={styles.scorePillTxt}>{match.homeScore} - {match.awayScore}</Text>
              </View>
            </View>

            <Text style={styles.matchDateTxt}>Finalizado el {match.finishedAtFormatted}</Text>

            <View style={styles.actionButtonsRow}>
              <TouchableOpacity 
                style={styles.summaryActionBtn} 
                onPress={() => handleOpenSummaryModal(match)}
                activeOpacity={0.85}
              >
                <Ionicons name="document-text-outline" size={15} color={colors.skyGlow} />
                <Text style={styles.summaryActionBtnTxt}>Ver resumen</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.actaActionBtn, match.actaGenerated ? styles.actaActionBtnOk : styles.actaActionBtnPending]} 
                onPress={() => handleOpenActa(match)}
                activeOpacity={0.85}
              >
                <Text style={styles.actaActionBtnTxt}>
                  {match.actaGenerated ? '📝 Ver acta' : '📝 Generar acta'}
                </Text>
                <Ionicons name="chevron-forward" size={14} color={colors.navyDark} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* MODAL DE RESUMEN COMPLETO DEL PARTIDO DESDE MI TEMPORADA */}
      <Modal
        visible={isSummaryModalVisible && Boolean(selectedSummaryMatch)}
        transparent
        animationType="slide"
        onRequestClose={handleCloseSummaryModal}
      >
        {selectedSummaryMatch && (
          <View style={styles.modalOverlay}>
            <View style={[styles.modalActionBox, { maxHeight: '85%' }]}>
              <View style={styles.modalHeaderRow}>
                <View style={styles.modalPlayerHeaderLeft}>
                  <View style={styles.modalDorsalBadge}>
                    <Text style={{ fontSize: 18 }}>📄</Text>
                  </View>
                  <View>
                    <Text style={styles.modalPlayerName}>RESUMEN DEL ENCUENTRO</Text>
                    <Text style={styles.modalPlayerRole}>
                      {selectedSummaryMatch.homeTeamLabel} vs {selectedSummaryMatch.awayTeamLabel}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.modalCloseIconBtn} onPress={handleCloseSummaryModal}>
                  <Ionicons name="close" size={22} color={colors.white} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ marginTop: 12 }} showsVerticalScrollIndicator={false}>
                <View style={styles.completionScoreBox}>
                  <Text style={styles.completionScoreLabel}>RESULTADO FINAL</Text>
                  <Text style={{ color: colors.emeraldGlow, fontSize: 26, fontWeight: '900' }}>
                    {selectedSummaryMatch.homeTeamLabel} {selectedSummaryMatch.homeScore} - {selectedSummaryMatch.awayScore} {selectedSummaryMatch.awayTeamLabel}
                  </Text>
                  <Text style={{ color: colors.textMuted, fontSize: 11, marginTop: 2 }}>
                    {selectedSummaryMatch.finishedAtFormatted}
                  </Text>
                </View>

                <View style={[styles.sectionHeaderRow, { marginTop: 16 }]}>
                  <Ionicons name="time-outline" size={18} color={colors.skyGlow} />
                  <Text style={styles.sectionTitleTxt}>EVENTOS Y LÍNEA TEMPORAL ({(selectedSummaryMatch.events || []).length})</Text>
                </View>

                {(!selectedSummaryMatch.events || selectedSummaryMatch.events.length === 0) ? (
                  <Text style={styles.emptyTimelineTxt}>Sin eventos registrados en este partido.</Text>
                ) : (
                  <View style={{ gap: 8, marginTop: 6 }}>
                    {selectedSummaryMatch.events.map((ev: any) => (
                      <View key={ev.id} style={styles.timelineItem}>
                        <Text style={styles.timelineTime}>{ev.minute}</Text>
                        <View style={[styles.timelineIconDot, { backgroundColor: ev.color || colors.skyGlow }]}>
                          <Ionicons name={ev.icon as any || 'ellipse'} size={14} color={colors.navyDark} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.timelineTitle}>{ev.title}</Text>
                          <Text style={styles.timelineDesc}>{ev.desc}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}
              </ScrollView>

              <TouchableOpacity 
                style={[styles.confirmBtnCancel, { marginTop: 16, width: '100%', alignItems: 'center' }]} 
                onPress={handleCloseSummaryModal}
              >
                <Text style={styles.confirmBtnCancelTxt}>Cerrar Resumen</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
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

  emptyCard: { backgroundColor: colors.navyDeep, borderRadius: 16, padding: 24, borderWidth: 1, borderColor: colors.border, alignItems: 'center', gap: 8, marginVertical: 12 },
  emptyTitle: { color: colors.white, fontSize: 15, fontWeight: '800' },
  emptyDesc: { color: colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18 },

  matchCard: { backgroundColor: colors.navyDeep, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border, marginBottom: 14, gap: 10 },
  matchCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchBadgePill: { backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  matchBadgePillTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },

  actaOkBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(52, 211, 153, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.emeraldGlow },
  actaOkBadgeTxt: { color: colors.emeraldGlow, fontSize: 11, fontWeight: '800' },
  actaPendingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.yellowCard },
  actaPendingBadgeTxt: { color: colors.yellowCard, fontSize: 11, fontWeight: '800' },

  matchTeamsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  teamTitleTxt: { color: colors.white, fontSize: 15, fontWeight: '900', flex: 1 },
  scorePill: { backgroundColor: colors.navyDark, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  scorePillTxt: { color: colors.emeraldGlow, fontSize: 16, fontWeight: '900' },

  matchDateTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  actionButtonsRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  summaryActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(56, 189, 248, 0.12)', paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.skyPrimary },
  summaryActionBtnTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '800' },
  actaActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10 },
  actaActionBtnOk: { backgroundColor: colors.emeraldGlow },
  actaActionBtnPending: { backgroundColor: colors.yellowCard },
  actaActionBtnTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 8, 20, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalActionBox: { backgroundColor: colors.navyDeep, borderRadius: 20, padding: 20, width: '92%', maxWidth: 440, borderWidth: 1.5, borderColor: colors.skyPrimary, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 12 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalPlayerHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalDorsalBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(56, 189, 248, 0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalPlayerName: { color: colors.white, fontSize: 15, fontWeight: '900' },
  modalPlayerRole: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  modalCloseIconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },

  completionScoreBox: { backgroundColor: colors.navyCard, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: colors.border, alignItems: 'center', gap: 6 },
  completionScoreLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, marginTop: 4 },
  sectionTitleTxt: { color: colors.white, fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },

  emptyTimelineTxt: { color: colors.textMuted, fontSize: 12, fontStyle: 'italic', textAlign: 'center', marginTop: 20 },
  timelineItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.border },
  timelineTime: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', width: 44 },
  timelineIconDot: { width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  timelineTitle: { color: colors.white, fontSize: 12, fontWeight: '800' },
  timelineDesc: { color: colors.textMuted, fontSize: 11, marginTop: 1 },

  confirmBtnCancel: { paddingVertical: 10, borderRadius: 8, backgroundColor: colors.navyCard, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  confirmBtnCancelTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },
});
