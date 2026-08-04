// TODO:
// Eliminar este bypass cuando se implemente
// el login definitivo del Delegado.

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions, 
  Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useSport } from '../../context/SportContext';
import { supabase } from '../../lib/supabase';

// Reutilizar exactamente la misma URL pública oficial de la camiseta de Delegado
const getEquipacionPublicUrl = (fileName: string): string => {
  if (!supabase) return '';
  const { data } = supabase.storage
    .from('Equipaciones CD Jesuitas')
    .getPublicUrl(fileName);

  return `${data?.publicUrl}?v=png-final-20260802`;
};

const DELEGADO_PNG_URL = getEquipacionPublicUrl('Camiseta delegado 3D.png');

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: 'rgba(9, 27, 62, 0.85)',
  skyPrimary: '#38BDF8',
  skyGlow: '#81D4FA',
  emeraldPrimary: '#10B981',
  emeraldGlow: '#34D399',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(56, 189, 248, 0.18)',
  borderSoft: 'rgba(255, 255, 255, 0.08)',
  warning: '#F59E0B',
};

// Datos controlados de demostración centralizados
const MOCK_NEXT_MATCH = {
  teamName: 'Infantil A',
  rivalName: 'Torrent CF "A"',
  dateText: 'Sábado, 8 de Agosto de 2026',
  timeText: '10:30 hs',
  facility: 'Campo Municipal San Gregorio',
  field: 'Campo 1',
  isHome: true,
  lineupStatus: 'CONFIRMED',
  preActStatus: 'PENDING',
};

const MOCK_RECENT_MATCHES = [
  { id: '13', round: 'J13', rival: 'Paterna CF "B"', score: '3 - 1', isWin: true, date: '01 Ago' },
  { id: '12', round: 'J12', rival: 'Levante UD "C"', score: '2 - 2', isDraw: true, date: '25 Jul' },
];

export function DelegadoDashboard() {
  const { user } = useAuth();
  const { sport } = useSport();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

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
  const delegateName = user?.full_name || 'Carlos Ruiz';

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. HERO DEPORTIVO PREMIUM */}
      <View style={styles.heroCard}>
        <LinearGradient 
          colors={['#0B1F4D', '#041026'] as const} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.heroGradient}
        >
          {/* Marca de agua escudo CD Jesuitas */}
          <View style={styles.heroWatermarkBox}>
            <FontAwesome name="shield" size={isDesktop ? 180 : 130} color="rgba(255, 255, 255, 0.03)" />
          </View>

          <View style={styles.heroContentRow}>
            {/* Camiseta oficial 3D pequeña */}
            <View style={styles.heroJerseyBox}>
              <Image 
                source={{ uri: DELEGADO_PNG_URL }} 
                style={[styles.heroJerseyImage, isDesktop && styles.heroJerseyImageDesktop]} 
                resizeMode="contain"
              />
            </View>

            <View style={styles.heroTextCol}>
              <Text style={styles.heroGreetingTxt}>Buenas tardes, {delegateName}</Text>
              <Text style={styles.heroRoleTitle}>Delegado</Text>
              <Text style={styles.heroSubtitle}>Infantil A · {sportName} · Temporada 2026/2027</Text>
              
              <View style={styles.heroStatusRow}>
                <View style={styles.syncDot} />
                <Text style={styles.syncTxt}>Sincronizado con FFCV ({sportName})</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.messagesQuickBtn}
              onPress={() => router.push('/(drawer)/mensajes')}
              activeOpacity={0.85}
            >
              <Ionicons name="chatbubbles-outline" size={18} color={colors.white} />
              <Text style={styles.messagesBtnTxt}>Mensajes</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* 2. INDICADOR "PRÓXIMA ACCIÓN" (REQUERIDO SECTION 4) */}
      <View style={styles.nextActionBanner}>
        <View style={styles.nextIconBox}>
          <Ionicons name="flash-outline" size={18} color={colors.warning} />
        </View>
        <View style={styles.nextActionTextCol}>
          <Text style={styles.nextActionHeader}>PRÓXIMA ACCIÓN RECOMENDADA</Text>
          <Text style={styles.nextActionBody}>
            Generar acta previa oficial de {sportName} antes del sábado a las 10:00 hs.
          </Text>
        </View>
      </View>

      {/* 3. TARJETA PROTAGONISTA: PRÓXIMO PARTIDO (FORMATO CARTEL) */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="trophy-outline" size={20} color={colors.skyPrimary} />
        <Text style={styles.sectionTitleTxt}>PRÓXIMO PARTIDO DE LIGA ({sportName.toUpperCase()})</Text>
      </View>

      <View style={styles.matchPosterCard}>
        <LinearGradient 
          colors={['rgba(7, 26, 61, 0.95)', 'rgba(3, 14, 38, 0.98)'] as const} 
          style={styles.matchPosterGradient}
        >
          {/* Cabecera competición */}
          <View style={styles.matchCompHeader}>
            <View style={styles.compBadge}>
              <Text style={styles.compBadgeTxt}>LIGA PREFERENTE {sportName.toUpperCase()} · JORNADA 14</Text>
            </View>
            <Text style={styles.homeTagTxt}>{MOCK_NEXT_MATCH.isHome ? 'LOCAL' : 'VISITANTE'}</Text>
          </View>

          {/* Enfrentamiento principal VS */}
          <View style={styles.posterTeamsRow}>
            <View style={styles.posterTeamCol}>
              <View style={styles.teamBadgeCircle}>
                <FontAwesome name="shield" size={32} color={colors.skyPrimary} />
              </View>
              <Text style={styles.posterTeamName}>CD JESUITAS</Text>
              <Text style={styles.posterTeamCategory}>Infantil A</Text>
            </View>

            <View style={styles.versusBadgeCol}>
              <Text style={styles.versusTxt}>VS</Text>
              <Text style={styles.matchDateBadge}>{MOCK_NEXT_MATCH.timeText}</Text>
            </View>

            <View style={styles.posterTeamCol}>
              <View style={[styles.teamBadgeCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                <FontAwesome name="shield" size={32} color={colors.warning} />
              </View>
              <Text style={styles.posterTeamName}>{MOCK_NEXT_MATCH.rivalName}</Text>
              <Text style={styles.posterTeamCategory}>Rival FFCV</Text>
            </View>
          </View>

          {/* Detalles de fecha e instalación */}
          <View style={styles.matchInfoFooter}>
            <View style={styles.infoMetaItem}>
              <Ionicons name="calendar-sharp" size={15} color={colors.skyGlow} />
              <Text style={styles.infoMetaTxt}>{MOCK_NEXT_MATCH.dateText}</Text>
            </View>
            <View style={styles.infoMetaItem}>
              <Ionicons name="location-sharp" size={15} color={colors.skyGlow} />
              <Text style={styles.infoMetaTxt}>{MOCK_NEXT_MATCH.facility} ({MOCK_NEXT_MATCH.field})</Text>
            </View>
          </View>

          {/* Estados de preparación */}
          <View style={styles.matchChecklistGroup}>
            <View style={styles.checkItemRow}>
              <Ionicons name="checkmark-circle" size={18} color={colors.emeraldGlow} />
              <Text style={styles.checkItemTxt}>Alineación confirmada por Míster (16/16 convocados)</Text>
            </View>
            <View style={styles.checkItemRow}>
              <Ionicons name="time" size={18} color={colors.warning} />
              <Text style={styles.checkItemTxt}>Acta previa pendiente de generación oficial</Text>
            </View>
          </View>

          {/* Botón de acción principal accesible */}
          <TouchableOpacity 
            style={styles.posterPrimaryBtn}
            onPress={() => router.push('/delegado/preparacion' as any)}
            activeOpacity={0.88}
          >
            <Ionicons name="clipboard-outline" size={20} color={colors.navyDark} />
            <Text style={styles.posterPrimaryBtnTxt}>PREPARAR PARTIDO</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.navyDark} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* 4. ACCESOS RÁPIDOS EN GRID 2x2 (REQUERIDO SECTION 5) */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="apps-outline" size={20} color={colors.skyGlow} />
        <Text style={styles.sectionTitleTxt}>ACCESOS RÁPIDOS DE GESTIÓN</Text>
      </View>

      <View style={styles.quickGrid2x2}>
        <TouchableOpacity 
          style={styles.quickGridCard}
          onPress={() => router.push('/delegado/equipo' as any)}
          activeOpacity={0.85}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: 'rgba(56, 189, 248, 0.15)' }]}>
            <Ionicons name="people-outline" size={26} color={colors.skyPrimary} />
          </View>
          <Text style={styles.quickCardTitle}>Mi Equipo</Text>
          <Text style={styles.quickCardDesc}>Plantilla, cuerpo técnico y dorsales</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickGridCard}
          onPress={() => router.push('/delegado/documentacion' as any)}
          activeOpacity={0.85}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
            <Ionicons name="document-text-outline" size={26} color={colors.warning} />
          </View>
          <Text style={styles.quickCardTitle}>Documentación</Text>
          <Text style={styles.quickCardDesc}>Actas previas, licencias y partes</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickGridCard}
          onPress={() => router.push('/delegado/temporada' as any)}
          activeOpacity={0.85}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
            <Ionicons name="calendar-outline" size={26} color={colors.emeraldGlow} />
          </View>
          <Text style={styles.quickCardTitle}>Mi Temporada</Text>
          <Text style={styles.quickCardDesc}>Calendario de liga y jornadas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickGridCard}
          onPress={() => router.push('/(drawer)/mensajes' as any)}
          activeOpacity={0.85}
        >
          <View style={[styles.quickIconCircle, { backgroundColor: 'rgba(129, 212, 250, 0.15)' }]}>
            <Ionicons name="chatbubbles-outline" size={26} color={colors.skyGlow} />
          </View>
          <Text style={styles.quickCardTitle}>Comunicaciones</Text>
          <Text style={styles.quickCardDesc}>Canal de equipo y avisos</Text>
        </TouchableOpacity>
      </View>

      {/* 5. LÍNEA COMPACTA Y ELEGANTE DE ÚLTIMOS PARTIDOS (REQUERIDO SECTION 6) */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons name="time-outline" size={20} color={colors.textMuted} />
        <Text style={styles.sectionTitleTxt}>ÚLTIMOS PARTIDOS</Text>
      </View>

      <View style={styles.recentMatchesBox}>
        {MOCK_RECENT_MATCHES.map((match) => (
          <TouchableOpacity key={match.id} style={styles.recentMatchRow} onPress={() => router.push('/delegado/acta' as any)} activeOpacity={0.85}>
            <View style={styles.recentRoundBadge}>
              <Text style={styles.recentRoundTxt}>{match.round}</Text>
            </View>
            <View style={styles.recentRivalCol}>
              <Text style={styles.recentRivalTxt}>vs {match.rival}</Text>
              <Text style={styles.recentDateTxt}>{match.date} · Ver Acta</Text>
            </View>
            <View style={[styles.recentScoreBadge, match.isWin ? styles.scoreWin : styles.scoreDraw]}>
              <Text style={styles.recentScoreTxt}>{match.score}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
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
    padding: 16,
    paddingBottom: 40,
  },
  scrollContentDesktop: {
    maxWidth: 1040,
    alignSelf: 'center',
    width: '100%',
    padding: 24,
  },

  // 1. HERO CARD
  heroCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroGradient: {
    padding: 20,
    position: 'relative',
  },
  heroWatermarkBox: {
    position: 'absolute',
    right: -10,
    bottom: -20,
  },
  heroContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  heroJerseyBox: {
    width: 52,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  heroJerseyImage: {
    width: 44,
    height: 50,
    backgroundColor: 'transparent',
  },
  heroJerseyImageDesktop: {
    width: 52,
    height: 58,
  },
  heroTextCol: {
    flex: 1,
    minWidth: 200,
  },
  heroGreetingTxt: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  heroRoleTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginVertical: 2,
  },
  heroSubtitle: {
    color: colors.skyGlow,
    fontSize: 14,
    fontWeight: '700',
  },
  heroStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  syncDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: colors.emeraldGlow,
  },
  syncTxt: {
    color: colors.emeraldGlow,
    fontSize: 11.5,
    fontWeight: '600',
  },
  messagesQuickBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  messagesBtnTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  // 2. PRÓXIMA ACCIÓN BANNER
  nextActionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.25)',
    marginBottom: 24,
  },
  nextIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextActionTextCol: {
    flex: 1,
  },
  nextActionHeader: {
    color: colors.warning,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  nextActionBody: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },

  // 3. TARJETA POSTER PRÓXIMO PARTIDO
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitleTxt: {
    color: colors.white,
    fontSize: 13.5,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  matchPosterCard: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.skyPrimary,
    marginBottom: 28,
  },
  matchPosterGradient: {
    padding: 20,
  },
  matchCompHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  compBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  compBadgeTxt: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '900',
  },
  homeTagTxt: {
    color: colors.emeraldGlow,
    fontSize: 12,
    fontWeight: '800',
  },
  posterTeamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  posterTeamCol: {
    alignItems: 'center',
    flex: 1,
  },
  teamBadgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  posterTeamName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  posterTeamCategory: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  versusBadgeCol: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  versusTxt: {
    color: colors.skyPrimary,
    fontSize: 22,
    fontWeight: '900',
  },
  matchDateBadge: {
    color: colors.skyGlow,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  matchInfoFooter: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    marginVertical: 16,
  },
  infoMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoMetaTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  matchChecklistGroup: {
    gap: 8,
    marginBottom: 20,
  },
  checkItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 10,
    borderRadius: 10,
  },
  checkItemTxt: {
    color: colors.white,
    fontSize: 12.5,
    fontWeight: '600',
  },
  posterPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.skyPrimary,
    paddingVertical: 14,
    borderRadius: 14,
  },
  posterPrimaryBtnTxt: {
    color: colors.navyDark,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0.5,
  },

  // 4. ACCESOS RÁPIDOS GRID 2x2
  quickGrid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  quickGridCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickCardTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  quickCardDesc: {
    color: colors.textMuted,
    fontSize: 11.5,
    fontWeight: '500',
    lineHeight: 16,
  },

  // 5. ÚLTIMOS PARTIDOS
  recentMatchesBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
  },
  recentMatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  recentRoundBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recentRoundTxt: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  recentRivalCol: {
    flex: 1,
    marginHorizontal: 12,
  },
  recentRivalTxt: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  recentDateTxt: {
    color: colors.textMuted,
    fontSize: 11,
  },
  recentScoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  scoreWin: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
  },
  scoreDraw: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  recentScoreTxt: {
    color: colors.white,
    fontSize: 12.5,
    fontWeight: '900',
  },
});

