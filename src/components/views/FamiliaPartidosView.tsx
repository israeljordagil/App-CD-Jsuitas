import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  useWindowDimensions,
  Linking
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const FAN_ZONE_OPTIONS = [
  '📣 Grada Lateral Derecha',
  '📣 Grada Lateral Izquierda',
  '📣 Grada Central',
  '📣 Fondo Detrás de la Portería',
  '📣 Zona de Banquillos / Valla Lateral',
  '📣 Entrada Principal del Campo'
];

const MOCK_MATCH_DATA = {
  p1: {
    childName: 'Pablo Martínez',
    team: 'Cadete B (Fútbol 11)',
    liveMatch: {
      isLive: true,
      minute: "42'",
      half: '2ª Parte',
      timeRemaining: '18 min restantes',
      homeTeam: 'CD Jesuitas',
      awayTeam: 'Levante UD B',
      homeScore: 2,
      awayScore: 1,
      competition: 'LIGA PREFERENTE CADETE • JORNADA 13 (FFCV)',
      location: 'Campo 1 - CD Jesuitas (Valencia)',
      events: [
        { id: 'e1', min: "14'", type: 'goal', text: '⚽ ¡GOL DE PABLO MARTÍNEZ! (Asistencia de Dani)', isGoal: true },
        { id: 'e2', min: "28'", type: 'yellow', text: '🟨 Tarjeta Amarilla a Lucas Pérez' },
        { id: 'e3', min: "35'", type: 'goal', text: '⚽ Gol de Levante UD B (1-1)' },
        { id: 'e4', min: "40'", type: 'goal', text: '⚽ ¡GOL DE DANI GARCÍA! (2-1)' },
        { id: 'e5', min: "41'", type: 'sub', text: '🔄 Cambio: Entra Rodrigo por Marcos' },
      ]
    },
    upcomingMatches: [
      { id: 'm2', date: '17 Mayo 11:30h', rival: 'Alboraya UD', location: 'Campo Municipal Alboraya (Fuera)', kit: '2ª Equipación Blanca' },
      { id: 'm3', date: '24 Mayo 10:00h', rival: 'Torrent CF', location: 'CD Jesuitas (Local)', kit: '1ª Equipación Azul' },
    ],
    standings: [
      { pos: 1, team: 'Valencia CF B', pts: 32, me: false },
      { pos: 2, team: 'Villarreal CF B', pts: 30, me: false },
      { pos: 3, team: 'CD Jesuitas (Cadete B)', pts: 28, me: true },
      { pos: 4, team: 'Levante UD B', pts: 25, me: false },
      { pos: 5, team: 'Alboraya UD', pts: 22, me: false },
    ],
    seasonStats: {
      played: 12,
      goals: 7,
      assists: 5,
      minutes: '840 min'
    }
  },
  p2: {
    childName: 'Hugo Martínez',
    team: 'Infantil A (Fútbol Sala)',
    liveMatch: {
      isLive: false,
      nextMatchDate: 'Sábado 10 Mayo 11:30h',
      homeTeam: 'CD Jesuitas Futsal',
      awayTeam: 'El Pilar Futsal',
      competition: 'LIGA AUTONÓMICA FUTSAL • JORNADA 13 (FFCV)',
      location: 'Pabellón Colegio Jesuitas',
      events: []
    },
    upcomingMatches: [
      { id: 'm1', date: '10 Mayo 11:30h', rival: 'El Pilar Futsal', location: 'Pabellón Jesuitas (Local)', kit: '1ª Equipación Blanca/Azul' },
      { id: 'm2', date: '17 Mayo 12:00h', rival: 'Dominicos Futsal', location: 'Pabellón Dominicos (Fuera)', kit: '2ª Equipación Azul' },
    ],
    standings: [
      { pos: 1, team: 'CD Jesuitas Futsal', pts: 33, me: true },
      { pos: 2, team: 'El Pilar Futsal', pts: 30, me: false },
      { pos: 3, team: 'Dominicos Futsal', pts: 27, me: false },
    ],
    seasonStats: {
      played: 12,
      goals: 11,
      assists: 8,
      minutes: '480 min'
    }
  }
};

export function FamiliaPartidosView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [selectedChildKey, setSelectedChildKey] = useState<'p1' | 'p2'>('p1');
  const [activeTab, setActiveTab] = useState<'directo' | 'calendario' | 'clasificacion'>('directo');

  // PUNTO DE ENCUENTRO MAREA AZUL (DESPLEGABLE MODIFICABLE POR EL DELEGADO)
  const [selectedFanZone, setSelectedFanZone] = useState('📣 Grada Lateral Derecha');
  const [isFanZoneModalOpen, setIsFanZoneModalOpen] = useState(false);

  const matchData = MOCK_MATCH_DATA[selectedChildKey];
  const live = matchData.liveMatch;

  const handleOpenMaps = (location: string) => {
    const url = `https://maps.apple.com/?q=${encodeURIComponent(location)}`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.childSelectorRow}>
        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p1' && styles.childBtnActive]}
          onPress={() => setSelectedChildKey('p1')}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p1' && styles.childBtnTextActive]}>👦 Pablo (Cadete B Fútbol)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p2' && styles.childBtnActive]}
          onPress={() => setSelectedChildKey('p2')}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p2' && styles.childBtnTextActive]}>👦 Hugo (Infantil A Futsal)</Text>
        </TouchableOpacity>
      </View>

      {/* 2. PESTAÑAS: DIRECTO EN VIVO vs PRÓXIMOS PARTIDOS vs CLASIFICACIÓN */}
      <View style={styles.tabsHeaderRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'directo' && styles.tabBtnActive]}
          onPress={() => setActiveTab('directo')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'directo' && styles.tabBtnTextActive]}>🔴 En Directo</Text>
          {activeTab === 'directo' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'calendario' && styles.tabBtnActive]}
          onPress={() => setActiveTab('calendario')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'calendario' && styles.tabBtnTextActive]}>📅 Próximos Partidos</Text>
          {activeTab === 'calendario' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'clasificacion' && styles.tabBtnActive]}
          onPress={() => setActiveTab('clasificacion')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'clasificacion' && styles.tabBtnTextActive]}>🏆 Clasificación</Text>
          {activeTab === 'clasificacion' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'directo' ? (
        <>
          {live.isLive ? (
            <>
              {/* 3. HERO CARD DEL PARTIDO EN DIRECTO (ACTUALIZADO POR EL SEGUNDO ENTRENADOR) */}
              <View style={styles.liveMatchHeroCard}>
                <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.liveGradient}>
                  
                  {/* Banner indicador de Directo con Tiempo Restante */}
                  <View style={styles.liveBadgeRow}>
                    <View style={styles.livePulseDot} />
                    <Text style={styles.liveBadgeTxt}>EN DIRECTO • MINUTO {live.minute} ({live.half}) • {live.timeRemaining}</Text>
                  </View>

                  <Text style={styles.compTitle}>{live.competition}</Text>

                  {/* Escudos y Marcador Gigante */}
                  <View style={styles.scoreRow}>
                    <View style={styles.teamCol}>
                      <View style={styles.shieldCircle}>
                        <FontAwesome name="shield" size={32} color={colors.skyPrimary} />
                      </View>
                      <Text style={styles.teamNameTxt}>{live.homeTeam}</Text>
                    </View>

                    <View style={styles.scoreBox}>
                      <Text style={styles.scoreTxt}>{live.homeScore} - {live.awayScore}</Text>
                    </View>

                    <View style={styles.teamCol}>
                      <View style={[styles.shieldCircle, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                        <FontAwesome name="shield" size={32} color={colors.textMuted} />
                      </View>
                      <Text style={styles.teamNameTxt}>{live.awayTeam}</Text>
                    </View>
                  </View>

                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={colors.skyPrimary} />
                    <Text style={styles.locationTxt}>{live.location}</Text>
                  </View>

                </LinearGradient>
              </View>

              {/* 4. PUNTO DE ENCUENTRO DE LA AFICIÓN (MAREA AZUL DESPLEGABLE) */}
              <Text style={styles.sectionTitle}>📣 PUNTO DE ENCUENTRO DE LA AFICIÓN (MAREA AZUL)</Text>
              <View style={styles.fanZoneCard}>
                <View style={styles.fanZoneHeader}>
                  <Ionicons name="megaphone" size={22} color={colors.accentGold} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.fanZoneTitle}>Zona de Encuentro para Familias</Text>
                    <Text style={styles.fanZoneSelected}>{selectedFanZone}</Text>
                  </View>

                  <TouchableOpacity style={styles.changeZoneBtn} onPress={() => setIsFanZoneModalOpen(true)}>
                    <Text style={styles.changeZoneTxt}>Cambiar Zona</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 5. EVENTOS EN TIEMPO REAL (ACTUALIZACIONES DEL ENTRENADOR: GOLES, TARJETAS, CAMBIOS) */}
              <Text style={styles.sectionTitle}>🔴 MINUTO A MINUTO (SEGUNDO ENTRENADOR)</Text>
              <View style={styles.eventsCard}>
                {live.events.map(ev => (
                  <View key={ev.id} style={[styles.eventRow, ev.isGoal && styles.eventGoalBg]}>
                    <Text style={styles.eventMin}>{ev.min}</Text>
                    <Text style={[styles.eventText, ev.isGoal && styles.eventGoalTxt]}>{ev.text}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            /* SI NO HAY PARTIDO EN DIRECTO AHORA MISMO */
            <View style={styles.noLiveCard}>
              <Ionicons name="football-outline" size={48} color={colors.skyPrimary} />
              <Text style={styles.noLiveTitle}>Próximo Partido en Directo</Text>
              <Text style={styles.noLiveSub}>El marcador en tiempo real comenzará el {live.nextMatchDate}. El segundo entrenador actualizará cada gol y tarjeta.</Text>
            </View>
          )}

          {/* 6. ESTADÍSTICAS TEMPORADA DEL HIJO */}
          <Text style={styles.sectionTitle}>📊 RENDIMIENTO DE {matchData.childName.toUpperCase()}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{matchData.seasonStats.played}</Text>
              <Text style={styles.statLabel}>Partidos</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.accentGold }]}>{matchData.seasonStats.goals}</Text>
              <Text style={styles.statLabel}>Goles</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={[styles.statNum, { color: colors.skyGlow }]}>{matchData.seasonStats.assists}</Text>
              <Text style={styles.statLabel}>Asistencias</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNum}>{matchData.seasonStats.minutes}</Text>
              <Text style={styles.statLabel}>Minutos</Text>
            </View>
          </View>
        </>
      ) : activeTab === 'calendario' ? (
        /* PESTAÑA PRÓXIMOS PARTIDOS */
        <View style={styles.upcomingContainer}>
          <Text style={styles.sectionTitle}>PRÓXIMAS JORNADAS DE LA LIGA (API FFCV)</Text>
          
          {matchData.upcomingMatches.map(m => (
            <View key={m.id} style={styles.upcomingCard}>
              <View style={styles.upHeader}>
                <Text style={styles.upDate}>{m.date}</Text>
                <Text style={styles.upKit}>{m.kit}</Text>
              </View>
              
              <Text style={styles.upRival}>vs {m.rival}</Text>
              <Text style={styles.upLoc}>📍 {m.location}</Text>

              <TouchableOpacity style={styles.gpsBtn} onPress={() => handleOpenMaps(m.location)}>
                <Ionicons name="navigate-circle-outline" size={16} color={colors.navyDark} />
                <Text style={styles.gpsBtnTxt}>Ruta GPS al Campo Visitante</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        /* PESTAÑA CLASIFICACIÓN EN LA LIGA */
        <View style={styles.standingsContainer}>
          <Text style={styles.sectionTitle}>TABLA DE CLASIFICACIÓN (API FFCV OFICIAL)</Text>
          
          <View style={styles.standingsCard}>
            {matchData.standings.map(item => (
              <View key={item.pos} style={[styles.standingRow, item.me && styles.standingRowMe]}>
                <Text style={[styles.standingPos, item.me && styles.standingPosMe]}>{item.pos}º</Text>
                <Text style={[styles.standingTeam, item.me && styles.standingTeamMe]}>{item.team}</Text>
                <Text style={[styles.standingPts, item.me && styles.standingPtsMe]}>{item.pts} pts</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* MODAL SELECCIONADOR DE ZONA MAREA AZUL DE LA AFICIÓN */}
      <Modal visible={isFanZoneModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="megaphone" size={44} color={colors.accentGold} />
            <Text style={styles.modalTitleCenter}>UBICACIÓN DE LA AFICIÓN (MAREA AZUL)</Text>
            <Text style={styles.modalSubCenter}>Selecciona dónde se concentran las familias del CD Jesuitas en este partido:</Text>

            {FAN_ZONE_OPTIONS.map((opt, idx) => (
              <TouchableOpacity 
                key={idx}
                style={styles.zoneOptionBtn}
                onPress={() => {
                  setSelectedFanZone(opt);
                  setIsFanZoneModalOpen(false);
                }}
              >
                <Text style={styles.zoneOptionTxt}>{opt}</Text>
                {selectedFanZone === opt && <Ionicons name="checkmark-circle" size={18} color={colors.accentGreen} />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsFanZoneModalOpen(false)}>
              <Text style={styles.modalCancelTxt}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // SELECTOR HIJOS
  childSelectorRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  childBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  childBtnActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  childBtnTextActive: { color: colors.white, fontWeight: '900' },

  // TABS
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '15%', right: '15%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // LIVE MATCH HERO CARD
  liveMatchHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  liveGradient: { padding: 16, alignItems: 'center' },
  liveBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(239, 68, 68, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: colors.accentRed, marginBottom: 10 },
  livePulseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accentRed },
  liveBadgeTxt: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  
  compTitle: { color: colors.skyGlow, fontSize: 10, fontWeight: '800', marginBottom: 16 },

  scoreRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', marginBottom: 14 },
  teamCol: { alignItems: 'center', flex: 1 },
  shieldCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(79, 195, 247, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  teamNameTxt: { color: colors.white, fontSize: 13, fontWeight: '900', textAlign: 'center' },
  scoreBox: { backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14, borderWidth: 1, borderColor: colors.skyPrimary },
  scoreTxt: { color: colors.goldLight, fontSize: 26, fontWeight: '900' },

  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  locationTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  // FAN ZONE CARD
  fanZoneCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  fanZoneHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  fanZoneTitle: { color: colors.textMuted, fontSize: 10, fontWeight: '800' },
  fanZoneSelected: { color: colors.goldLight, fontSize: 12, fontWeight: '900', marginTop: 2 },
  changeZoneBtn: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.skyPrimary },
  changeZoneTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '900' },

  // EVENTS MINUTO A MINUTO
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  eventsCard: { backgroundColor: colors.navyCard, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, padding: 12, gap: 8, marginBottom: 20 },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  eventGoalBg: { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderRadius: 8, paddingHorizontal: 8 },
  eventMin: { color: colors.accentGold, fontSize: 11, fontWeight: '900', width: 30 },
  eventText: { color: colors.white, fontSize: 12, fontWeight: '600', flex: 1 },
  eventGoalTxt: { color: colors.accentGreen, fontWeight: '900' },

  noLiveCard: { backgroundColor: colors.navyCard, borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  noLiveTitle: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 10, marginBottom: 4 },
  noLiveSub: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16 },

  // STATS
  statsGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: colors.navyCard, padding: 12, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  statNum: { color: colors.white, fontSize: 18, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', marginTop: 2 },

  // UPCOMING
  upcomingContainer: { gap: 10 },
  upcomingCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.borderGlow },
  upHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  upDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  upKit: { color: colors.textMuted, fontSize: 10, fontWeight: '700' },
  upRival: { color: colors.white, fontSize: 16, fontWeight: '900', marginBottom: 2 },
  upLoc: { color: colors.textMuted, fontSize: 11, marginBottom: 8 },

  gpsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.skyPrimary, paddingVertical: 8, borderRadius: 10 },
  gpsBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // STANDINGS
  standingsContainer: { gap: 10 },
  standingsCard: { backgroundColor: colors.navyCard, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, overflow: 'hidden' },
  standingRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  standingRowMe: { backgroundColor: 'rgba(79, 195, 247, 0.15)' },
  standingPos: { width: 30, color: colors.textMuted, fontSize: 12, fontWeight: '900' },
  standingPosMe: { color: colors.skyGlow },
  standingTeam: { flex: 1, color: colors.white, fontSize: 12, fontWeight: '700' },
  standingTeamMe: { color: colors.white, fontWeight: '900' },
  standingPts: { color: colors.accentGold, fontSize: 12, fontWeight: '900' },
  standingPtsMe: { color: colors.goldLight },

  // MODALES
  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitleCenter: { color: colors.white, fontSize: 14, fontWeight: '900', marginTop: 10, marginBottom: 4, letterSpacing: 0.5 },
  modalSubCenter: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 16 },

  zoneOptionBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  zoneOptionTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },

  modalCancelBtn: { paddingVertical: 8, marginTop: 4 },
  modalCancelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
