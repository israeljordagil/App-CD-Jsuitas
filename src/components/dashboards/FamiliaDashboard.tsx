import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions, 
  Modal 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  accentGold: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const MOCK_CHILDREN = [
  {
    id: 'p1',
    name: 'Pablo Martínez',
    team: 'Cadete B Fútbol',
    dorsal: '10',
    position: 'Centrocampista',
    category: 'Cadete F11',
    photo: '👦',
    familyHomeAddress: 'Calle Gran Vía Marqués del Turia, 45, Valencia',
    coachNote: '📢 Nota del Entrenador (Raúl): "Recordad traer las dos equipaciones completas este sábado para la foto oficial previa al partido."',
    stats: {
      minutes: 820,
      minutesPct: '85%',
      goals: 8,
      assists: 5,
      yellowCards: 1,
      redCards: 0,
      attendancePct: '96%',
    },
    nextMatch: {
      opponent: 'Levante UD B',
      date: 'Sáb 10 de Mayo • 11:00',
      location: 'Campo 1 - CD Jesuitas',
      citationTime: '10:00 en Vestuarios',
      kit: '1ª Equipación Azul Noche',
      addressGps: 'Calle Padre Arrupe, 12, Valencia',
      weather: '⛅ 18°C • Sol y nubes • 10% prob. lluvia',
      travelAssistant: {
        carTravelTimeMin: 15,
        carRecommendedDeparture: '09:40h', // 15m viaje + 5m aparcar
        walkTravelTimeMin: 35,
        walkRecommendedDeparture: '09:25h',
      },
      status: 'Pendiente'
    },
    trainings: [
      { day: 'Martes', time: '17:30 - 19:00', pitch: 'Campo 2 Césped Artificial' },
      { day: 'Jueves', time: '17:30 - 19:00', pitch: 'Campo 2 Césped Artificial' },
    ],
    lastResult: {
      opponent: 'Valencia CF C',
      score: '3 - 1',
      isWin: true,
      leaguePos: '3º Clasificado (24 pts)'
    },
    medicalStatus: {
      status: 'APTO PARA COMPETICIÓN',
      validUntil: 'Junio 2027',
      allergies: 'Sin alergias registradas'
    }
  },
  {
    id: 'p2',
    name: 'Hugo Martínez',
    team: 'Infantil A Fútbol',
    dorsal: '7',
    position: 'Delantero',
    category: 'Infantil F11',
    photo: '👦',
    familyHomeAddress: 'Calle Gran Vía Marqués del Turia, 45, Valencia',
    coachNote: '📢 Nota del Entrenador (Carlos): "Puntualidad máxima en Ciudad Deportiva. Calentamiento específico a las 11:15h."',
    stats: {
      minutes: 740,
      minutesPct: '78%',
      goals: 12,
      assists: 4,
      yellowCards: 0,
      redCards: 0,
      attendancePct: '98%',
    },
    nextMatch: {
      opponent: 'Villarreal CF Infantil',
      date: 'Dom 11 de Mayo • 12:00',
      location: 'Ciudad Deportiva Pamesa (Vila-real)',
      citationTime: '10:45 en Vestuarios',
      kit: '2ª Equipación Blanca',
      addressGps: 'Camí Miralcamp, Vila-real',
      weather: '☀️ 22°C • Soleado • 0% prob. lluvia',
      travelAssistant: {
        carTravelTimeMin: 45,
        carRecommendedDeparture: '09:50h', // 45m viaje + 10m margen
        walkTravelTimeMin: 0, // No aplica
        walkRecommendedDeparture: 'No recomendable',
      },
      status: 'Confirmado'
    },
    trainings: [
      { day: 'Lunes', time: '18:30 - 20:00', pitch: 'Campo 1 Césped Natural' },
      { day: 'Miércoles', time: '18:30 - 20:00', pitch: 'Campo 1 Césped Natural' },
    ],
    lastResult: {
      opponent: 'Alboraya UD',
      score: '2 - 0',
      isWin: true,
      leaguePos: '1º Clasificado (30 pts)'
    },
    medicalStatus: {
      status: 'APTO PARA COMPETICIÓN',
      validUntil: 'Junio 2027',
      allergies: 'Alergia al polen'
    }
  }
];

export function FamiliaDashboard() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [activeChildId, setActiveChildId] = useState<string>('p1');
  const [matchStatusMap, setMatchStatusMap] = useState<Record<string, string>>({
    p1: 'Pendiente',
    p2: 'Confirmado'
  });

  const [absenceModalVisible, setAbsenceModalVisible] = useState(false);
  const [absenceReason, setAbsenceReason] = useState('');

  const activeChild = MOCK_CHILDREN.find(c => c.id === activeChildId) || MOCK_CHILDREN[0];
  const currentMatchStatus = matchStatusMap[activeChild.id] || 'Pendiente';

  const handleConfirmMatch = (status: 'Confirmado' | 'Ausente' | 'Duda') => {
    setMatchStatusMap(prev => ({
      ...prev,
      [activeChild.id]: status
    }));
  };

  // Lógica inteligente de entrenamiento al día
  const getDynamicTrainingAlert = () => {
    const day = new Date().getDay(); // 1 = Lun, 2 = Mar, 3 = Mié, 4 = Jue, 5 = Vie...
    if (activeChild.id === 'p1') {
      if (day === 1) return { badge: 'ENTRENAMIENTO MAÑANA', color: colors.skyPrimary, text: 'Mañana Martes 17:30 - 19:00', pitch: 'Campo 2 Césped Artificial' };
      if (day === 2) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Martes 17:30 - 19:00', pitch: 'Campo 2 Césped Artificial (Llegar 15m antes)' };
      if (day === 3) return { badge: 'ENTRENAMIENTO MAÑANA', color: colors.skyPrimary, text: 'Mañana Jueves 17:30 - 19:00', pitch: 'Campo 2 Césped Artificial' };
      if (day === 4) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Jueves 17:30 - 19:00', pitch: 'Campo 2 Césped Artificial (Sesión Pre-Partido)' };
      return { badge: 'PRÓXIMO ENTRENAMIENTO', color: colors.skyPrimary, text: 'Martes 17:30 - 19:00', pitch: 'Campo 2 Césped Artificial' };
    } else {
      if (day === 0 || day === 1) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Lunes 18:30 - 20:00', pitch: 'Campo 1 Césped Natural' };
      if (day === 2) return { badge: 'ENTRENAMIENTO MAÑANA', color: colors.skyPrimary, text: 'Mañana Miércoles 18:30 - 20:00', pitch: 'Campo 1 Césped Natural' };
      if (day === 3) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Miércoles 18:30 - 20:00', pitch: 'Campo 1 Césped Natural' };
      return { badge: 'PRÓXIMO ENTRENAMIENTO', color: colors.skyPrimary, text: 'Lunes 18:30 - 20:00', pitch: 'Campo 1 Césped Natural' };
    }
  };

  const trainingAlert = getDynamicTrainingAlert();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* SELECTOR DE HIJO/A */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>MIS DEPORTISTAS</Text>
        <Text style={styles.familyTag}>Familia Martínez</Text>
      </View>

      <View style={styles.childrenSelectorGroup}>
        {MOCK_CHILDREN.map((child) => {
          const isSelected = child.id === activeChildId;
          return (
            <TouchableOpacity
              key={child.id}
              activeOpacity={0.8}
              style={[styles.childCard, isSelected && styles.childCardActive]}
              onPress={() => setActiveChildId(child.id)}
            >
              <View style={styles.childCardLeft}>
                <View style={styles.childAvatar}>
                  <Text style={{ fontSize: 22 }}>{child.photo}</Text>
                </View>
                <View>
                  <Text style={[styles.childName, isSelected && styles.childNameActive]}>{child.name}</Text>
                  <Text style={styles.childTeamSub}>{child.team} • #{child.dorsal}</Text>
                </View>
              </View>
              {isSelected && (
                <View style={styles.activeCheckBadge}>
                  <Ionicons name="checkmark-circle" size={20} color={colors.skyPrimary} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* NOTA DE ÚLTIMA HORA DEL ENTRENADOR */}
      {activeChild.coachNote && (
        <View style={styles.coachNoteBanner}>
          <Text style={styles.coachNoteText}>{activeChild.coachNote}</Text>
        </View>
      )}

      {/* BLOQUE 1: ENTRENAMIENTOS AL DÍA (ARRIBA DEL TODO) */}
      <Text style={styles.sectionTitle}>1. ENTRENAMIENTOS DE LA SEMANA (AL DÍA)</Text>
      
      <View style={styles.cardBox}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.cardGradient}>
          
          <View style={styles.dynamicTrainingHeader}>
            <View style={[styles.dynamicBadge, { backgroundColor: trainingAlert.color }]}>
              <Ionicons name="calendar-outline" size={14} color={colors.navyDark} />
              <Text style={styles.dynamicBadgeText}>{trainingAlert.badge}</Text>
            </View>
            <Text style={styles.pitchTagText}>{trainingAlert.pitch}</Text>
          </View>

          <Text style={styles.trainingMainTitle}>{trainingAlert.text}</Text>

          <View style={styles.trainingList}>
            {activeChild.trainings.map((t, idx) => (
              <View key={idx} style={styles.trainingRowItem}>
                <View style={styles.dayPill}>
                  <Text style={styles.dayPillText}>{t.day}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.trainingRowTime}>{t.time}</Text>
                  <Text style={styles.trainingRowPitch}>{t.pitch}</Text>
                </View>
                <Ionicons name="checkmark-circle-outline" size={18} color={colors.accentGreen} />
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.absenceNoticeBtn} onPress={() => setAbsenceModalVisible(true)}>
            <Ionicons name="alert-circle-outline" size={16} color={colors.accentGold} />
            <Text style={styles.absenceNoticeText}>Notificar ausencia puntual a un entrenamiento</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>

      {/* BLOQUE 2: PRÓXIMO PARTIDO, TIEMPO METEOROLÓGICO Y ASISTENTE DE SALIDA GPS */}
      <Text style={styles.sectionTitle}>2. PRÓXIMO PARTIDO & ASISTENTE DE SALIDA</Text>

      <View style={styles.cardBox}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.cardGradient}>
          
          <View style={styles.callupBadgeHeader}>
            <View style={styles.callupTag}>
              <Ionicons name="football-outline" size={14} color={colors.skyPrimary} />
              <Text style={styles.callupTagText}>JORNADA OFICIAL</Text>
            </View>

            <View style={[
              styles.statusPill, 
              currentMatchStatus === 'Confirmado' ? styles.statusPillGreen : 
              currentMatchStatus === 'Ausente' ? styles.statusPillRed : styles.statusPillYellow
            ]}>
              <Text style={styles.statusPillText}>
                {currentMatchStatus === 'Confirmado' ? '✅ ASISTENCIA CONFIRMADA' : 
                 currentMatchStatus === 'Ausente' ? '❌ FALTARÁ AL PARTIDO' : '⏳ PENDIENTE DE RESPUESTA'}
              </Text>
            </View>
          </View>

          <Text style={styles.matchVsText}>vs {activeChild.nextMatch.opponent}</Text>
          <Text style={styles.matchDateText}>{activeChild.nextMatch.date}</Text>

          {/* CLIMA METEOROLÓGICO */}
          <View style={styles.weatherBox}>
            <Ionicons name="cloudy-night-outline" size={16} color={colors.skyGlow} />
            <Text style={styles.weatherText}>{activeChild.nextMatch.weather}</Text>
          </View>

          <View style={styles.matchDetailsGrid}>
            <View style={styles.matchDetailItem}>
              <Ionicons name="time-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>Citación: <Text style={{fontWeight: '900', color: '#fff'}}>{activeChild.nextMatch.citationTime}</Text></Text>
            </View>

            <View style={styles.matchDetailItem}>
              <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>{activeChild.nextMatch.kit}</Text>
            </View>

            <View style={styles.matchDetailItem}>
              <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>{activeChild.nextMatch.location}</Text>
            </View>
          </View>

          {/* ASISTENTE INTELIGENTE DE SALIDA EN COCHE DESDE CASA */}
          <View style={styles.travelAssistantCard}>
            <View style={styles.travelHeaderRow}>
              <Ionicons name="car-sport-outline" size={18} color={colors.skyPrimary} />
              <Text style={styles.travelTitle}>ASISTENTE INTELIGENTE DE SALIDA (DESDE TU CASA)</Text>
            </View>
            <Text style={styles.travelAddressSub}>Desde: {activeChild.familyHomeAddress}</Text>

            <View style={styles.travelTimesRow}>
              <View style={styles.travelTimeBox}>
                <Text style={styles.travelTimeLbl}>🚗 En Coche</Text>
                <Text style={styles.travelTimeVal}>{activeChild.nextMatch.travelAssistant.carTravelTimeMin} min viaje</Text>
                <Text style={styles.travelDepartureHighlight}>Salir de casa: <Text style={{fontWeight: '900', color: colors.skyGlow}}>{activeChild.nextMatch.travelAssistant.carRecommendedDeparture}</Text></Text>
              </View>

              {activeChild.nextMatch.travelAssistant.walkTravelTimeMin > 0 && (
                <View style={styles.travelTimeBox}>
                  <Text style={styles.travelTimeLbl}>🚶 Andando</Text>
                  <Text style={styles.travelTimeVal}>{activeChild.nextMatch.travelAssistant.walkTravelTimeMin} min paseo</Text>
                  <Text style={styles.travelDepartureHighlight}>Salir de casa: <Text style={{fontWeight: '900', color: colors.skyGlow}}>{activeChild.nextMatch.travelAssistant.walkRecommendedDeparture}</Text></Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.gpsLinkRow}>
              <Ionicons name="navigate-circle" size={18} color={colors.skyPrimary} />
              <Text style={styles.gpsLinkText}>Navegar con Google Maps en tiempo real</Text>
            </TouchableOpacity>
          </View>

          {/* Botones de Respuesta Rápida 1-Clic */}
          <Text style={styles.actionPromptText}>¿Asistirá {activeChild.name.split(' ')[0]} al partido?</Text>
          
          <View style={styles.callupBtnGroup}>
            <TouchableOpacity 
              style={[styles.btnConfirm, currentMatchStatus === 'Confirmado' && styles.btnConfirmSelected]}
              onPress={() => handleConfirmMatch('Confirmado')}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
              <Text style={styles.btnConfirmText}>Asistirá</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnRefuse, currentMatchStatus === 'Ausente' && styles.btnRefuseSelected]}
              onPress={() => handleConfirmMatch('Ausente')}
            >
              <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.btnConfirmText}>No asistirá</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnDoubt, currentMatchStatus === 'Duda' && styles.btnDoubtSelected]}
              onPress={() => handleConfirmMatch('Duda')}
            >
              <Ionicons name="help-circle-outline" size={18} color="#fff" />
              <Text style={styles.btnConfirmText}>Duda</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </View>

      {/* BLOQUE 3: ESTADÍSTICAS DE LA TEMPORADA (ABAJO) */}
      <Text style={styles.sectionTitle}>3. ESTADÍSTICAS DE TEMPORADA</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⏱️</Text>
          <Text style={styles.statValue}>{activeChild.stats.minutes} min</Text>
          <Text style={styles.statLabel}>Minutos ({activeChild.stats.minutesPct})</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>⚽</Text>
          <Text style={styles.statValue}>{activeChild.stats.goals}</Text>
          <Text style={styles.statLabel}>Goles Marcados</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>🅰️</Text>
          <Text style={styles.statValue}>{activeChild.stats.assists}</Text>
          <Text style={styles.statLabel}>Asistencias</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statIcon}>📈</Text>
          <Text style={styles.statValue}>{activeChild.stats.attendancePct}</Text>
          <Text style={styles.statLabel}>Asistencia Entrenos</Text>
        </View>
      </View>

      {/* BLOQUE 4: ÚLTIMO RESULTADO & CLASIFICACIÓN */}
      <Text style={styles.sectionTitle}>4. ÚLTIMO RESULTADO & LIGA</Text>
      
      <View style={styles.cardBox}>
        <View style={styles.cardInnerPadding}>
          <View style={styles.resultHeaderRow}>
            <View>
              <Text style={styles.lastMatchSub}>JORNADA ANTERIOR</Text>
              <Text style={styles.lastMatchScore}>CD Jesuitas {activeChild.lastResult.score} {activeChild.lastResult.opponent}</Text>
            </View>
            <View style={styles.winBadge}>
              <Text style={styles.winBadgeText}>VICTORIA (+3 PTS)</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.leaguePosRow}>
            <Ionicons name="trophy-outline" size={18} color={colors.accentGold} />
            <Text style={styles.leaguePosText}>Clasificación: <Text style={{color: colors.white, fontWeight: '900'}}>{activeChild.lastResult.leaguePos}</Text></Text>
          </View>
        </View>
      </View>

      {/* BLOQUE 5: REVISIÓN MÉDICA & SALUD */}
      <Text style={styles.sectionTitle}>5. REVISIÓN MÉDICA & FICHA SALUD</Text>
      
      <View style={styles.cardBox}>
        <View style={styles.cardInnerPadding}>
          <View style={styles.medicalRow}>
            <View style={styles.medicalIconCircle}>
              <Ionicons name="medical" size={22} color={colors.accentGreen} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.medicalTitle}>{activeChild.medicalStatus.status}</Text>
              <Text style={styles.medicalSub}>Válido y homologado hasta: <Text style={{color: colors.white, fontWeight: '800'}}>{activeChild.medicalStatus.validUntil}</Text></Text>
              <Text style={styles.medicalAllergies}>{activeChild.medicalStatus.allergies}</Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color={colors.accentGreen} />
          </View>
        </View>
      </View>

      {/* MODAL NOTIFICAR AUSENCIA PUNTUAL */}
      <Modal visible={absenceModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notificar Ausencia a Entrenamiento</Text>
            <Text style={styles.modalSub}>Informa al cuerpo técnico sobre la falta de {activeChild.name}</Text>
            
            <View style={styles.reasonOptionGroup}>
              {['Motivo Médico / Enfermedad', 'Examen / Estudios', 'Viaje Familiar'].map((r, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={[styles.reasonOption, absenceReason === r && styles.reasonOptionActive]}
                  onPress={() => setAbsenceReason(r)}
                >
                  <Text style={[styles.reasonText, absenceReason === r && styles.reasonTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity style={styles.modalBtnCancel} onPress={() => setAbsenceModalVisible(false)}>
                <Text style={styles.modalBtnCancelText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSend} onPress={() => { setAbsenceModalVisible(false); alert('Notificación enviada al entrenador'); }}>
                <Text style={styles.modalBtnSendText}>ENVIAR AVISO</Text>
              </TouchableOpacity>
            </View>
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

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginTop: 22, marginBottom: 10 },
  familyTag: { fontSize: 12, color: colors.textMuted, fontWeight: '700' },

  // BANNER NOTA ENTRENADOR
  coachNoteBanner: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)', borderWidth: 1, borderColor: colors.accentGold,
    padding: 12, borderRadius: 14, marginBottom: 12
  },
  coachNoteText: { color: colors.accentGold, fontSize: 12, fontWeight: '700', lineHeight: 16 },

  // SELECTOR DE HIJOS
  childrenSelectorGroup: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  childCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.navyCard, padding: 12, borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  childCardActive: { borderColor: colors.skyPrimary, backgroundColor: '#0E2E6B' },
  childCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  childAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  childName: { color: colors.white, fontSize: 14, fontWeight: '800' },
  childNameActive: { color: colors.skyGlow },
  childTeamSub: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  activeCheckBadge: {},

  // CARD BOX CONTENEDOR
  cardBox: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard },
  cardGradient: { padding: 16 },
  cardInnerPadding: { padding: 16 },

  // ENTRENAMIENTO DINÁMICO
  dynamicTrainingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dynamicBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  dynamicBadgeText: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },
  pitchTagText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  
  trainingMainTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 12 },
  trainingList: { gap: 8, marginBottom: 14, backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12 },
  trainingRowItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dayPill: { backgroundColor: colors.skyPrimary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dayPillText: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },
  trainingRowTime: { color: colors.white, fontSize: 12, fontWeight: '800' },
  trainingRowPitch: { color: colors.textMuted, fontSize: 11 },

  absenceNoticeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)', borderWidth: 1, borderColor: colors.accentGold,
    paddingVertical: 10, borderRadius: 12, marginTop: 4
  },
  absenceNoticeText: { color: colors.accentGold, fontSize: 11, fontWeight: '800' },

  // CALLUP CONVOCATORIA
  callupBadgeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  callupTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  callupTagText: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusPillGreen: { backgroundColor: 'rgba(16, 185, 129, 0.25)', borderWidth: 1, borderColor: colors.accentGreen },
  statusPillRed: { backgroundColor: 'rgba(239, 68, 68, 0.25)', borderWidth: 1, borderColor: colors.accentRed },
  statusPillYellow: { backgroundColor: 'rgba(245, 158, 11, 0.25)', borderWidth: 1, borderColor: colors.accentGold },
  statusPillText: { color: '#fff', fontSize: 10, fontWeight: '900' },

  matchVsText: { color: colors.white, fontSize: 22, fontWeight: '900', marginBottom: 2 },
  matchDateText: { color: colors.skyGlow, fontSize: 13, fontWeight: '700', marginBottom: 8 },

  weatherBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79, 195, 247, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, marginBottom: 12 },
  weatherText: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  matchDetailsGrid: { gap: 8, marginBottom: 14, backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12 },
  matchDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  matchDetailText: { color: colors.white, fontSize: 12, fontWeight: '600' },

  // ASISTENTE DE SALIDA Y VIAJE
  travelAssistantCard: {
    backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)', marginBottom: 16
  },
  travelHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  travelTitle: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  travelAddressSub: { color: colors.textMuted, fontSize: 10, marginBottom: 10 },
  travelTimesRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  travelTimeBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: 10 },
  travelTimeLbl: { color: colors.white, fontSize: 11, fontWeight: '800' },
  travelTimeVal: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  travelDepartureHighlight: { color: colors.white, fontSize: 11, marginTop: 4 },

  actionPromptText: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginBottom: 10 },
  
  callupBtnGroup: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  btnConfirm: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#059669', paddingVertical: 12, borderRadius: 12 },
  btnConfirmSelected: { borderWidth: 2, borderColor: '#fff' },
  btnRefuse: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#DC2626', paddingVertical: 12, borderRadius: 12 },
  btnRefuseSelected: { borderWidth: 2, borderColor: '#fff' },
  btnDoubt: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#D97706', paddingVertical: 12, borderRadius: 12 },
  btnDoubtSelected: { borderWidth: 2, borderColor: '#fff' },
  btnConfirmText: { color: '#fff', fontSize: 11, fontWeight: '900' },

  gpsLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', marginTop: 8 },
  gpsLinkText: { color: colors.skyPrimary, fontSize: 11, fontWeight: '700', textDecorationLine: 'underline' },

  // RENDIMIENTO PARRILLA
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statCard: {
    flex: 1, minWidth: '45%', backgroundColor: colors.navyCard, padding: 14, borderRadius: 16,
    borderWidth: 1, borderColor: colors.borderGlow, alignItems: 'center'
  },
  statIcon: { fontSize: 20, marginBottom: 4 },
  statValue: { color: colors.white, fontSize: 20, fontWeight: '900' },
  statLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginTop: 2 },

  // RESULTADO
  resultHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastMatchSub: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  lastMatchScore: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 2 },
  winBadge: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  winBadgeText: { color: colors.accentGreen, fontSize: 10, fontWeight: '900' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 12 },
  leaguePosRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  leaguePosText: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },

  // MÉDICO
  medicalRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  medicalIconCircle: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(16, 185, 129, 0.15)', justifyContent: 'center', alignItems: 'center' },
  medicalTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  medicalSub: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  medicalAllergies: { color: colors.skyGlow, fontSize: 11, fontWeight: '600', marginTop: 2 },

  // MODAL
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: colors.navyCard, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 4 },
  modalSub: { color: colors.textMuted, fontSize: 12, marginBottom: 16 },
  reasonOptionGroup: { gap: 8, marginBottom: 20 },
  reasonOption: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  reasonOptionActive: { backgroundColor: colors.navyDark, borderColor: colors.skyPrimary },
  reasonText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  reasonTextActive: { color: colors.skyPrimary },
  modalBtnRow: { flexDirection: 'row', gap: 10 },
  modalBtnCancel: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  modalBtnCancelText: { color: colors.white, fontWeight: '800', fontSize: 12 },
  modalBtnSend: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: colors.skyPrimary, alignItems: 'center' },
  modalBtnSendText: { color: colors.navyDark, fontWeight: '900', fontSize: 12 }
});
