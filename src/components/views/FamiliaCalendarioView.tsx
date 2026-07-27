import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions,
  Modal,
  Switch
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
  accentPurple: '#8B5CF6',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const MOCK_EVENTS = [
  {
    id: 'e1',
    childId: 'p1',
    childName: 'Pablo',
    sport: '⚽ Fútbol',
    team: 'Cadete B',
    title: 'Entrenamiento Pre-Partido',
    type: 'training',
    dayNum: 8,
    dayName: 'Viernes',
    time: '17:30 - 19:00',
    citationTime: '17:15h',
    location: 'Campo 2 Césped Artificial - CD Jesuitas',
    weather: '☀️ 20°C • Despejado',
    carDeparture: '16:55h (15 min viaje desde casa)',
    notes: 'Revisión táctica y jugadas ensayadas.'
  },
  {
    id: 'e2',
    childId: 'p1',
    childName: 'Pablo',
    sport: '⚽ Fútbol',
    team: 'Cadete B',
    title: 'Jornada 13 vs Levante UD B',
    type: 'match',
    dayNum: 10,
    dayName: 'Sábado',
    time: '11:00h',
    citationTime: '10:00h en Vestuarios',
    location: 'Campo 1 - CD Jesuitas (Valencia)',
    weather: '⛅ 18°C • Sol y nubes • 10% prob. lluvia',
    carDeparture: '09:40h (15 min viaje + parking)',
    kit: '1ª Equipación Azul Noche',
    notes: 'Partido oficial de Liga. Citación puntual.'
  },
  {
    id: 'e3',
    childId: 'p2',
    childName: 'Hugo',
    sport: '👟 Fútbol Sala',
    team: 'Infantil A Futsal',
    title: 'Jornada 13 vs El Pilar Futsal',
    type: 'match',
    dayNum: 10,
    dayName: 'Sábado',
    time: '11:30h',
    citationTime: '10:45h en Pista',
    location: 'Pabellón Colegio Jesuitas',
    weather: '☀️ 21°C • Pista Cubierta',
    carDeparture: '09:45h (Llegar con Pablo)',
    kit: '1ª Equipación Futsal',
    notes: 'Partido coincidente el mismo sábado por la mañana.'
  },
  {
    id: 'e4',
    childId: 'p3',
    childName: 'Elena',
    sport: '🏐 Voleibol',
    team: 'Alevín Femenino Vóley',
    title: 'Entrenamiento Semanal Vóley',
    type: 'training',
    dayNum: 13,
    dayName: 'Martes',
    time: '17:30 - 19:00',
    citationTime: '17:20h',
    location: 'Pistas Exteriores Vóley - CD Jesuitas',
    weather: '⛅ 19°C • Sol y nubes',
    carDeparture: '16:55h desde casa',
    notes: 'Entrenamiento coincidente a la misma hora que Pablo (Fútbol).'
  },
  {
    id: 'e5',
    childId: 'p1',
    childName: 'Pablo',
    sport: '⚽ Fútbol',
    team: 'Cadete B',
    title: 'Entrenamiento Rincón Técnico',
    type: 'training',
    dayNum: 13,
    dayName: 'Martes',
    time: '17:30 - 19:00',
    citationTime: '17:15h',
    location: 'Campo 2 Césped Artificial - CD Jesuitas',
    weather: '⛅ 19°C • Sol y nubes',
    carDeparture: '16:55h desde casa',
    notes: 'Trabajo de finalización y posesiones.'
  }
];

export function FamiliaCalendarioView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [selectedChild, setSelectedChild] = useState<'all' | 'p1' | 'p2' | 'p3'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'match' | 'training' | 'tournament'>('all');
  const [selectedDayNum, setSelectedDayNum] = useState<number>(10);
  const [syncedModalVisible, setSyncedModalVisible] = useState(false);

  // Interruptor de Recordatorios
  const [eveReminderEnabled, setEveReminderEnabled] = useState(true);

  // Filtrar eventos
  const filteredEvents = MOCK_EVENTS.filter(e => {
    const matchChild = selectedChild === 'all' || e.childId === selectedChild;
    const matchType = selectedType === 'all' || e.type === selectedType;
    return matchChild && matchType;
  });

  const activeDayEvents = filteredEvents.filter(e => e.dayNum === selectedDayNum);
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const getEventDotsForDay = (day: number) => {
    const eventsOnDay = filteredEvents.filter(e => e.dayNum === day);
    return eventsOnDay.map(e => e.type);
  };

  const handleSyncCalendar = () => {
    setSyncedModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR MULTIDEPORTE DE HIJOS */}
      <View style={styles.filterRow}>
        <TouchableOpacity 
          style={[styles.filterPill, selectedChild === 'all' && styles.filterPillActive]}
          onPress={() => setSelectedChild('all')}
        >
          <Text style={[styles.filterPillText, selectedChild === 'all' && styles.filterPillTextActive]}>👨‍👩‍👧‍👦 Toda la Familia</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterPill, selectedChild === 'p1' && styles.filterPillActive]}
          onPress={() => setSelectedChild('p1')}
        >
          <Text style={[styles.filterPillText, selectedChild === 'p1' && styles.filterPillTextActive]}>⚽ Pablo (Fútbol)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterPill, selectedChild === 'p2' && styles.filterPillActive]}
          onPress={() => setSelectedChild('p2')}
        >
          <Text style={[styles.filterPillText, selectedChild === 'p2' && styles.filterPillTextActive]}>👟 Hugo (Futsal)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.filterPill, selectedChild === 'p3' && styles.filterPillActive]}
          onPress={() => setSelectedChild('p3')}
        >
          <Text style={[styles.filterPillText, selectedChild === 'p3' && styles.filterPillTextActive]}>🏐 Elena (Vóley)</Text>
        </TouchableOpacity>
      </View>

      {/* 2. FILTRO DE TIPO DE EVENTO */}
      <View style={styles.typeFilterRow}>
        {[
          { id: 'all', label: 'Todos los Eventos' },
          { id: 'match', label: '⚽ Partidos' },
          { id: 'training', label: '🏃 Entrenos' },
          { id: 'tournament', label: '🏆 Torneos' },
        ].map(t => (
          <TouchableOpacity 
            key={t.id}
            style={[styles.typeBtn, selectedType === t.id && styles.typeBtnActive]}
            onPress={() => setSelectedType(t.id as any)}
          >
            <Text style={[styles.typeBtnText, selectedType === t.id && styles.typeBtnTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. CALENDARIO MENSUAL DE MAYO 2026 (PRIMERO EL CALENDARIO) */}
      <View style={styles.calendarCard}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.calendarGradient}>
          
          {/* Header Mes */}
          <View style={styles.monthHeaderRow}>
            <View>
              <Text style={styles.monthTitleText}>MAYO 2026</Text>
              <Text style={styles.monthSubText}>Agenda Multideporte CD Jesuitas</Text>
            </View>

            <TouchableOpacity style={styles.syncBtn} onPress={handleSyncCalendar}>
              <Ionicons name="sync-outline" size={16} color={colors.navyDark} />
              <Text style={styles.syncBtnText}>Sincronizar Móvil</Text>
            </TouchableOpacity>
          </View>

          {/* Días de la Semana */}
          <View style={styles.weekDaysRow}>
            {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((d, i) => (
              <Text key={i} style={styles.weekDayText}>{d}</Text>
            ))}
          </View>

          {/* Grilla de Días */}
          <View style={styles.daysGrid}>
            {daysInMonth.map((day) => {
              const dots = getEventDotsForDay(day);
              const isSelected = selectedDayNum === day;

              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                  onPress={() => setSelectedDayNum(day)}
                >
                  <Text style={[styles.dayCellNumber, isSelected && styles.dayCellNumberSelected]}>{day}</Text>
                  
                  <View style={styles.dotsRow}>
                    {dots.map((type, idx) => (
                      <View 
                        key={idx} 
                        style={[
                          styles.dot, 
                          type === 'match' ? styles.dotMatch : 
                          type === 'training' ? styles.dotTraining : styles.dotTournament
                        ]} 
                      />
                    ))}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

        </LinearGradient>
      </View>

      {/* 4. MÓDULO VISUAL PREMIUM DE LOGÍSTICA FAMILIAR (PARTIDOS Y ENTRENAMIENTOS COINCIDENTES DESPUÉS DEL CALENDARIO) */}
      <View style={styles.logisticsVisualContainer}>
        
        {/* Cabecera del módulo */}
        <View style={styles.logisticsHeaderRow}>
          <View style={styles.warningIconBg}>
            <Ionicons name="warning" size={18} color={colors.navyDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.logisticsMainTitle}>LOGÍSTICA FAMILIAR • COINCIDENCIA DE HORARIOS</Text>
            <Text style={styles.logisticsSubTitle}>Alertas de solapamiento en entrenamientos y partidos de la semana</Text>
          </View>
        </View>

        {/* TARJETA VISUAL DE CONFLICTO 1: ENTRENAMIENTOS COINCIDENTES */}
        <View style={styles.conflictCard}>
          <LinearGradient colors={['rgba(245, 158, 11, 0.18)', 'rgba(11, 34, 79, 0.9)']} style={styles.conflictGradient}>
            
            {/* Tag Día */}
            <View style={styles.conflictDayTagRow}>
              <Text style={styles.conflictDayTag}>MARTES 13 DE MAYO • ENTRENAMIENTOS COINCIDENTES</Text>
              <View style={styles.marginBadge}>
                <Text style={styles.marginBadgeText}>⚡ Mismo Horario</Text>
              </View>
            </View>

            {/* Comparativa Visual de los dos hermanos */}
            <View style={styles.vsRow}>
              {/* Hermano 1 */}
              <View style={styles.siblingBox}>
                <Text style={styles.siblingName}>👦 Pablo</Text>
                <Text style={styles.siblingSport}>⚽ Fútbol (Cadete B)</Text>
                <Text style={styles.siblingTime}>⏰ 17:30h - 19:00h</Text>
                <Text style={styles.siblingLoc}>📍 Campo 2 Césped</Text>
              </View>

              {/* Conector vs */}
              <View style={styles.versusConnector}>
                <Ionicons name="car-sport" size={20} color={colors.accentGold} />
                <Text style={styles.vsTxt}>COINCIDEN</Text>
              </View>

              {/* Hermana 2 */}
              <View style={styles.siblingBox}>
                <Text style={styles.siblingName}>👧 Elena</Text>
                <Text style={styles.siblingSport}>🏐 Voleibol (Alevín)</Text>
                <Text style={styles.siblingTime}>⏰ 17:30h - 19:00h</Text>
                <Text style={styles.siblingLoc}>📍 Pistas Exteriores</Text>
              </View>
            </View>

            {/* Tip logístico de ayuda al padre */}
            <View style={styles.logisticsTipBox}>
              <Ionicons name="bulb-outline" size={14} color={colors.goldLight} />
              <Text style={styles.logisticsTipTxt}>
                <Text style={{fontWeight: '900', color: colors.goldLight}}>Consejo de Viaje</Text>: Mismo viaje en coche hasta el colegio. Dejar a Pablo en Campo 2 y a Elena en Pistas.
              </Text>
            </View>

          </LinearGradient>
        </View>

        {/* TARJETA VISUAL DE CONFLICTO 2: PARTIDOS COINCIDENTES */}
        <View style={[styles.conflictCard, { marginTop: 10 }]}>
          <LinearGradient colors={['rgba(79, 195, 247, 0.18)', 'rgba(11, 34, 79, 0.9)']} style={styles.conflictGradient}>
            
            {/* Tag Día */}
            <View style={styles.conflictDayTagRow}>
              <Text style={[styles.conflictDayTag, { color: colors.skyGlow }]}>SÁBADO 10 DE MAYO • PARTIDOS COINCIDENTES</Text>
              <View style={[styles.marginBadge, { backgroundColor: 'rgba(79, 195, 247, 0.25)', borderColor: colors.skyPrimary }]}>
                <Text style={[styles.marginBadgeText, { color: colors.skyPrimary }]}>⏳ 30 min de margen</Text>
              </View>
            </View>

            {/* Comparativa Visual de los dos hermanos */}
            <View style={styles.vsRow}>
              {/* Hermano 1 */}
              <View style={styles.siblingBox}>
                <Text style={styles.siblingName}>👦 Pablo</Text>
                <Text style={styles.siblingSport}>⚽ Fútbol vs Levante UD</Text>
                <Text style={styles.siblingTime}>⏰ Citación 10:00h • Partido 11:00h</Text>
                <Text style={styles.siblingLoc}>📍 Campo 1 (Valencia)</Text>
              </View>

              {/* Conector vs */}
              <View style={styles.versusConnector}>
                <Ionicons name="swap-horizontal" size={20} color={colors.skyPrimary} />
                <Text style={[styles.vsTxt, { color: colors.skyPrimary }]}>SOLAPADO</Text>
              </View>

              {/* Hermano 2 */}
              <View style={styles.siblingBox}>
                <Text style={styles.siblingName}>👦 Hugo</Text>
                <Text style={styles.siblingSport}>👟 Futsal vs El Pilar</Text>
                <Text style={styles.siblingTime}>⏰ Citación 10:45h • Partido 11:30h</Text>
                <Text style={styles.siblingLoc}>📍 Pabellón Colegio</Text>
              </View>
            </View>

            {/* Tip logístico de ayuda al padre */}
            <View style={[styles.logisticsTipBox, { borderColor: 'rgba(79, 195, 247, 0.4)' }]}>
              <Ionicons name="information-circle-outline" size={14} color={colors.skyGlow} />
              <Text style={[styles.logisticsTipTxt, { color: colors.white }]}>
                Ambos partidos se juegan en las instalaciones de Jesuitas. Podéis ver la 1ª parte de Pablo y la 2ª parte de Hugo.
              </Text>
            </View>

          </LinearGradient>
        </View>

      </View>

      {/* 5. RECORDATORIO AUTOMÁTICO DE VÍSPERA */}
      <View style={styles.eveReminderCard}>
        <View style={styles.eveReminderLeft}>
          <Ionicons name="notifications-circle-outline" size={26} color={colors.skyPrimary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.eveReminderTitle}>RECORDATORIOS DE VÍSPERA (TODOS LOS DEPORTES)</Text>
            <Text style={styles.eveReminderSub}>Aviso Push / WhatsApp la tarde previa a cualquier partido o entreno especial de Fútbol, Vóley, Futsal o Basket.</Text>
          </View>
        </View>
        <Switch
          value={eveReminderEnabled}
          onValueChange={setEveReminderEnabled}
          trackColor={{ false: '#374151', true: colors.skyPrimary }}
          thumbColor={eveReminderEnabled ? colors.navyDark : '#9CA3AF'}
        />
      </View>

      {/* 6. EVENTOS DEL DÍA SELECCIONADO */}
      <Text style={styles.sectionTitle}>EVENTOS DEL DÍA {selectedDayNum} DE MAYO</Text>

      {activeDayEvents.length === 0 ? (
        <View style={styles.emptyDayBox}>
          <Ionicons name="cafe-outline" size={32} color={colors.textMuted} />
          <Text style={styles.emptyDayText}>Sin convocatorias ni entrenamientos este día.</Text>
        </View>
      ) : (
        activeDayEvents.map((evt) => (
          <View key={evt.id} style={styles.eventCardBox}>
            <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.eventCardGradient}>
              
              {/* Badge y Titular */}
              <View style={styles.eventHeaderRow}>
                <View style={[
                  styles.eventTypeBadge, 
                  evt.type === 'match' ? styles.badgeMatch : 
                  evt.type === 'training' ? styles.badgeTraining : styles.badgeTournament
                ]}>
                  <Text style={styles.eventTypeBadgeText}>
                    {evt.type === 'match' ? `⚽ PARTIDO (${evt.sport})` : 
                     evt.type === 'training' ? `🏃 ENTRENAMIENTO (${evt.sport})` : `🏆 TORNEO (${evt.sport})`}
                  </Text>
                </View>

                <Text style={styles.childTag}>{evt.childName} ({evt.team})</Text>
              </View>

              <Text style={styles.eventTitle}>{evt.title}</Text>
              <Text style={styles.eventTimeSub}>{evt.dayName} {evt.dayNum} de Mayo • {evt.time}</Text>

              {/* Clima */}
              <View style={styles.weatherRow}>
                <Ionicons name="cloudy-night-outline" size={15} color={colors.skyGlow} />
                <Text style={styles.weatherTxt}>{evt.weather}</Text>
              </View>

              {/* Detalles */}
              <View style={styles.detailsBox}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.detailTxt}>Citación: <Text style={{fontWeight: '900', color: '#fff'}}>{evt.citationTime}</Text></Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.detailTxt}>{evt.location}</Text>
                </View>

                {evt.kit && (
                  <View style={styles.detailRow}>
                    <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
                    <Text style={styles.detailTxt}>{evt.kit}</Text>
                  </View>
                )}
              </View>

              {/* ASISTENTE INTELIGENTE DE SALIDA EN COCHE */}
              <View style={styles.carAssistantBox}>
                <View style={styles.carHeaderRow}>
                  <Ionicons name="car-sport-outline" size={16} color={colors.accentGold} />
                  <Text style={styles.carTitle}>ASISTENTE DE SALIDA DESDE CASA</Text>
                </View>
                <Text style={styles.carDepartureTxt}>Hora recomendada de salida: <Text style={{fontWeight: '900', color: colors.accentGold}}>{evt.carDeparture}</Text></Text>
              </View>

            </LinearGradient>
          </View>
        ))
      )}

      {/* MODAL DE CONFIRMACIÓN DE SINCRONIZACIÓN CON EL MÓVIL */}
      <Modal visible={syncedModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle-outline" size={54} color={colors.accentGreen} />
            <Text style={styles.modalTitle}>¡Agenda Sincronizada!</Text>
            <Text style={styles.modalSub}>Los partidos y entrenamientos de Mayo de todos los deportes de tus hijos se han añadido a tu calendario de iOS / Google Calendar.</Text>

            <TouchableOpacity style={styles.modalBtnClose} onPress={() => setSyncedModalVisible(false)}>
              <Text style={styles.modalBtnCloseText}>ENTENDIDO</Text>
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

  // FILTROS MULTIDEPORTE
  filterRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 10 },
  filterPill: {
    paddingHorizontal: 10, paddingVertical: 8, borderRadius: 12,
    backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  filterPillActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  filterPillText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  filterPillTextActive: { color: colors.white, fontWeight: '900' },

  typeFilterRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginBottom: 16 },
  typeBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)' },
  typeBtnActive: { backgroundColor: colors.skyPrimary },
  typeBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  typeBtnTextActive: { color: colors.navyDark, fontWeight: '900' },

  // CALENDARIO MENSUAL (PRIMERO)
  calendarCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  calendarGradient: { padding: 16 },
  monthHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  monthTitleText: { color: colors.white, fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  monthSubText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  syncBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.skyPrimary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  syncBtnText: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', paddingBottom: 6 },
  weekDayText: { color: colors.skyGlow, fontSize: 10, fontWeight: '800', width: 36, textAlign: 'center' },

  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 4 },
  dayCell: {
    width: '13.5%', height: 46, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'transparent'
  },
  dayCellSelected: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  dayCellNumber: { color: colors.white, fontSize: 13, fontWeight: '700' },
  dayCellNumberSelected: { color: colors.skyGlow, fontWeight: '900' },

  dotsRow: { flexDirection: 'row', gap: 3, marginTop: 4 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  dotMatch: { backgroundColor: colors.skyPrimary },
  dotTraining: { backgroundColor: colors.accentGreen },
  dotTournament: { backgroundColor: colors.accentGold },

  // MÓDULO VISUAL DE LOGÍSTICA FAMILIAR (DESPUÉS DEL CALENDARIO)
  logisticsVisualContainer: { marginBottom: 18 },
  logisticsHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  warningIconBg: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.accentGold, justifyContent: 'center', alignItems: 'center' },
  logisticsMainTitle: { color: colors.accentGold, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  logisticsSubTitle: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  conflictCard: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.accentGold, backgroundColor: colors.navyCard },
  conflictGradient: { padding: 14 },
  conflictDayTagRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  conflictDayTag: { color: colors.goldLight, fontSize: 10, fontWeight: '900', letterSpacing: 0.8 },
  marginBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(245, 158, 11, 0.25)', borderWidth: 1, borderColor: colors.accentGold },
  marginBadgeText: { color: colors.goldLight, fontSize: 10, fontWeight: '900' },

  vsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 12 },
  siblingBox: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  siblingName: { color: colors.white, fontSize: 13, fontWeight: '900', marginBottom: 2 },
  siblingSport: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  siblingTime: { color: colors.white, fontSize: 11, fontWeight: '700' },
  siblingLoc: { color: colors.textMuted, fontSize: 10, marginTop: 2 },

  versusConnector: { alignItems: 'center', width: 64 },
  vsTxt: { color: colors.accentGold, fontSize: 9, fontWeight: '900', marginTop: 2, letterSpacing: 0.5 },

  logisticsTipBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)' },
  logisticsTipTxt: { flex: 1, color: colors.white, fontSize: 11, lineHeight: 16 },

  // RECORDATORIO DE VÍSPERA DE PARTIDOS Y ENTRENOS
  eveReminderCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    backgroundColor: colors.navyCard, padding: 14, borderRadius: 16,
    borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 16
  },
  eveReminderLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  eveReminderTitle: { color: colors.skyPrimary, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  eveReminderSub: { color: colors.textMuted, fontSize: 11, lineHeight: 15, marginTop: 2 },

  // EVENTOS
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },

  emptyDayBox: { alignItems: 'center', padding: 24, backgroundColor: colors.navyCard, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  emptyDayText: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginTop: 8 },

  eventCardBox: { borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 12 },
  eventCardGradient: { padding: 16 },

  eventHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  eventTypeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeMatch: { backgroundColor: 'rgba(79, 195, 247, 0.2)', borderWidth: 1, borderColor: colors.skyPrimary },
  badgeTraining: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1, borderColor: colors.accentGreen },
  badgeTournament: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 1, borderColor: colors.accentGold },
  eventTypeBadgeText: { color: colors.white, fontSize: 10, fontWeight: '900' },

  childTag: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  eventTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 2 },
  eventTimeSub: { color: colors.skyGlow, fontSize: 12, fontWeight: '700', marginBottom: 8 },

  weatherRow: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79, 195, 247, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginBottom: 10, alignSelf: 'flex-start' },
  weatherTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  detailsBox: { gap: 6, backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10, marginBottom: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailTxt: { color: colors.white, fontSize: 12, fontWeight: '600' },

  carAssistantBox: { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderWidth: 1, borderColor: colors.accentGold, padding: 10, borderRadius: 10 },
  carHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  carTitle: { color: colors.accentGold, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  carDepartureTxt: { color: colors.white, fontSize: 11, marginTop: 2 },

  // MODAL
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 20, fontWeight: '900', marginTop: 12, marginBottom: 6 },
  modalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  modalBtnClose: { backgroundColor: colors.skyPrimary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  modalBtnCloseText: { color: colors.navyDark, fontSize: 12, fontWeight: '900' }
});
