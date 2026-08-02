import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions, 
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldPrimary: '#10B981',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  warning: '#F59E0B',
};

// Datos controlados de demostración centralizados (Mock temporal para FASE 1)
const MOCK_NEXT_MATCH = {
  teamName: 'Cadete B',
  rivalName: 'Torrent CF "A"',
  dateText: 'Sábado, 8 de Agosto de 2026',
  timeText: '10:30 hs',
  facility: 'Campo Municipal San Gregorio',
  field: 'Campo 1 (F11)',
  competition: 'Liga Cadete Preferente F11 · Jornada 14',
  isHome: true,
  lineupStatus: 'CONFIRMED', // CONFIRMED | PENDING
  preActStatus: 'PENDING',  // GENERATED | PENDING
};

export function DelegadoDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const delegateName = user?.full_name || 'Carlos Ruiz';

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. CABECERA INSTITUCIONAL DELEGADO */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <View style={styles.avatarCircle}>
            <Ionicons name="clipboard-outline" size={26} color={colors.navyDark} />
          </View>

          <View style={styles.headerInfoCol}>
            <Text style={styles.welcomeTxt}>¡Hola, {delegateName}!</Text>
            <View style={styles.badgeRow}>
              <View style={styles.roleBadge}>
                <Ionicons name="shield-checkmark" size={12} color={colors.emeraldGlow} />
                <Text style={styles.roleBadgeTxt}>Delegado · {MOCK_NEXT_MATCH.teamName}</Text>
              </View>

              <View style={styles.syncBadge}>
                <View style={styles.syncDot} />
                <Text style={styles.syncTxt}>En línea · Sincronizado</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.messagesQuickBtn}
            onPress={() => router.push('/(drawer)/mensajes')}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubbles-outline" size={20} color={colors.white} />
            <Text style={styles.messagesBtnTxt}>Mensajes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. BLOQUE PRINCIPAL: PRÓXIMO PARTIDO */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="football-outline" size={20} color={colors.emeraldGlow} />
        <Text style={styles.sectionTitleTxt}>PRÓXIMO PARTIDO</Text>
      </View>

      <View style={styles.matchHeroCard}>
        <View style={styles.matchHeroHeader}>
          <View style={styles.homeAwayTag}>
            <Text style={styles.homeAwayTagTxt}>{MOCK_NEXT_MATCH.isHome ? 'LOCAL' : 'VISITANTE'}</Text>
          </View>
          <Text style={styles.competitionTxt}>{MOCK_NEXT_MATCH.competition}</Text>
        </View>

        <View style={styles.teamsVersusRow}>
          <View style={styles.teamCol}>
            <View style={styles.teamIconBox}>
              <Ionicons name="shield" size={28} color={colors.skyPrimary} />
            </View>
            <Text style={styles.teamNameTxt}>{MOCK_NEXT_MATCH.teamName}</Text>
            <Text style={styles.teamSubTxt}>CD Jesuitas</Text>
          </View>

          <View style={styles.versusCol}>
            <Text style={styles.versusTxt}>VS</Text>
            <Text style={styles.matchTimeTxt}>{MOCK_NEXT_MATCH.timeText}</Text>
          </View>

          <View style={styles.teamCol}>
            <View style={[styles.teamIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <Ionicons name="shield-outline" size={28} color={colors.warning} />
            </View>
            <Text style={styles.teamNameTxt}>{MOCK_NEXT_MATCH.rivalName}</Text>
            <Text style={styles.teamSubTxt}>Rival</Text>
          </View>
        </View>

        <View style={styles.matchDetailsGroup}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color={colors.skyGlow} />
            <Text style={styles.detailTxt}>{MOCK_NEXT_MATCH.dateText}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color={colors.skyGlow} />
            <Text style={styles.detailTxt}>{MOCK_NEXT_MATCH.facility} ({MOCK_NEXT_MATCH.field})</Text>
          </View>
        </View>

        {/* ESTADOS DE ALINEACIÓN Y ACTA PREVIA */}
        <View style={styles.statusBoxContainer}>
          <View style={styles.statusRowItem}>
            <Ionicons name="checkmark-circle" size={18} color={colors.emeraldGlow} />
            <Text style={styles.statusRowTxt}>Alineación confirmada por Míster (16/16 jugadores)</Text>
          </View>

          <View style={styles.statusRowItem}>
            <Ionicons name="alert-circle" size={18} color={colors.warning} />
            <Text style={styles.statusRowTxt}>Pendiente de generar acta previa oficial</Text>
          </View>
        </View>

        {/* ACCIÓN PRINCIPAL DINÁMICA */}
        <TouchableOpacity 
          style={styles.primaryActionBtn}
          onPress={() => router.push('/delegado/preparacion' as any)}
          activeOpacity={0.88}
        >
          <Ionicons name="checkmark-done-circle-outline" size={22} color={colors.navyDark} />
          <Text style={styles.primaryActionBtnTxt}>Preparar Partido</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.navyDark} />
        </TouchableOpacity>
      </View>

      {/* 3. ACCESOS SECUNDARIOS (TARJETAS SECUNDARIAS) */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="grid-outline" size={20} color={colors.skyGlow} />
        <Text style={styles.sectionTitleTxt}>GESTIÓN Y EQUIPO</Text>
      </View>

      <View style={styles.secondaryGrid}>
        <TouchableOpacity 
          style={styles.secondaryCard}
          onPress={() => router.push('/delegado/temporada' as any)}
          activeOpacity={0.88}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
            <Ionicons name="calendar-number-outline" size={24} color={colors.skyPrimary} />
          </View>
          <Text style={styles.cardTitleTxt}>Mi Temporada</Text>
          <Text style={styles.cardDescTxt}>Temporada 2026/2027 y archivo de partidos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryCard}
          onPress={() => router.push('/delegado/documentacion' as any)}
          activeOpacity={0.88}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
            <Ionicons name="document-text-outline" size={24} color={colors.warning} />
          </View>
          <Text style={styles.cardTitleTxt}>Documentación</Text>
          <Text style={styles.cardDescTxt}>Actas previas, fichas y partes médicos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryCard}
          onPress={() => router.push('/delegado/equipo' as any)}
          activeOpacity={0.88}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
            <Ionicons name="people-outline" size={24} color={colors.emeraldGlow} />
          </View>
          <Text style={styles.cardTitleTxt}>Mi Equipo</Text>
          <Text style={styles.cardDescTxt}>Cuerpo técnico, plantilla y dorsales</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyDark,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  scrollContentDesktop: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },

  // HEADER CARD
  headerCard: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 24,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.emeraldGlow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfoCol: {
    flex: 1,
    minWidth: 200,
  },
  welcomeTxt: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  roleBadgeTxt: {
    color: colors.emeraldGlow,
    fontSize: 12,
    fontWeight: '700',
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.emeraldGlow,
  },
  syncTxt: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  messagesQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messagesBtnTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  // SECCIONES
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitleTxt: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.2,
  },

  // MATCH HERO CARD
  matchHeroCard: {
    backgroundColor: colors.navyDeep,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    marginBottom: 28,
  },
  matchHeroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  homeAwayTag: {
    backgroundColor: colors.emeraldGlow,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  homeAwayTagTxt: {
    color: colors.navyDark,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  competitionTxt: {
    color: colors.skyGlow,
    fontSize: 12,
    fontWeight: '700',
  },
  teamsVersusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  teamCol: {
    alignItems: 'center',
    flex: 1,
  },
  teamIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamNameTxt: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  teamSubTxt: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  versusCol: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  versusTxt: {
    color: colors.emeraldGlow,
    fontSize: 20,
    fontWeight: '900',
  },
  matchTimeTxt: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  matchDetailsGroup: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 14,
    padding: 14,
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },

  statusBoxContainer: {
    gap: 8,
    marginBottom: 20,
  },
  statusRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 10,
    borderRadius: 10,
  },
  statusRowTxt: {
    color: colors.white,
    fontSize: 12.5,
    fontWeight: '600',
  },

  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.emeraldGlow,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryActionBtnTxt: {
    color: colors.navyDark,
    fontSize: 16,
    fontWeight: '900',
  },

  // SECONDARY CARDS
  secondaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  secondaryCard: {
    flex: 1,
    minWidth: 260,
    backgroundColor: colors.navyCard,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitleTxt: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 4,
  },
  cardDescTxt: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
});
