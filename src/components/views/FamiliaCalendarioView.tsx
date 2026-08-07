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
import { useAuth } from '../../context/AuthContext';
import { getUnifiedFamilyPlayers, UnifiedPlayer } from '../familia/MiZona';

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

export interface CalendarEvent {
  id: string;
  childId: string;
  childName: string;
  sport: string;
  team: string;
  title: string;
  type: 'training' | 'match' | 'tournament';
  date: string; // Formato ISO YYYY-MM-DD
  dayNum: number;
  dayName: string;
  time: string;
  citationTime: string;
  location: string;
  weather: string;
  carDeparture: string;
  kit?: string;
  notes?: string;
}

import { 
  generateTrainingScheduleOccurrences, 
  AthleteMapping, 
  GeneratedOccurrence 
} from '../../utils/trainingScheduleOccurrences';
import { INITIAL_TRAINING_SCHEDULES } from '../../data/trainingSchedulesData';
import { FamilyCalendarFilter } from '../dashboards/FamiliaDashboard';

export interface FamiliaCalendarioViewProps {
  familyFilter?: FamilyCalendarFilter;
  onSelectFamilyFilter?: (filter: FamilyCalendarFilter) => void;
}

// Mapeo defensivo de deportistas de la demo con sus teamId canónicos
const DEMO_ATHLETES_MAP: AthleteMapping[] = [
  { athleteId: 'pablo-10', athleteName: 'Pablo', teamId: 'b1000001-0000-4000-8000-000000000001', teamName: 'Juvenil A', sport: '⚽ Fútbol 11' },
  { athleteId: 'lucia-7', athleteName: 'Lucía', teamId: 'b1000001-0000-4000-8000-000000000009', teamName: 'Infantil A', sport: '⚽ Fútbol 11' },
  { athleteId: 'lucas-22', athleteName: 'Lucas', teamId: 'b1000001-0000-4000-8000-000000000014', teamName: 'Alevín A', sport: '⚽ Fútbol 8' }
];

export function FamiliaCalendarioView({ familyFilter, onSelectFamilyFilter }: FamiliaCalendarioViewProps) {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // Consumir la fuente unificada de deportistas de la familia
  const { linkedPlayers } = useAuth();
  const familyPlayers = getUnifiedFamilyPlayers(linkedPlayers);

  // Estado dinámico de fecha visible (inicializado en la fecha real del dispositivo)
  const [visibleDate, setVisibleDate] = useState(() => new Date());
  const [selectedDayNum, setSelectedDayNum] = useState(() => new Date().getDate());

  // Estado unificado de filtro de hijo (reutiliza prop familyFilter si está disponible para 1 única fuente de verdad)
  const [localFamilyFilter, setLocalFamilyFilter] = useState<FamilyCalendarFilter>({ mode: 'child', childId: 'pablo-10' });
  const activeFilter = familyFilter || localFamilyFilter;

  const handleSetFilter = (newFilter: FamilyCalendarFilter) => {
    if (onSelectFamilyFilter) {
      onSelectFamilyFilter(newFilter);
    } else {
      setLocalFamilyFilter(newFilter);
    }
  };

  const selectedChild = activeFilter.mode === 'all' ? 'all' : activeFilter.childId;

  // Filtros de tipo y modal
  const [selectedType, setSelectedType] = useState<'all' | 'match' | 'training' | 'tournament'>('all');
  const [syncedModalVisible, setSyncedModalVisible] = useState(false);
  const [eveReminderEnabled, setEveReminderEnabled] = useState(true);

  // Funciones de navegación de fecha
  const goToPreviousMonth = () => {
    setVisibleDate(current => new Date(current.getFullYear(), current.getMonth() - 1, 1));
    setSelectedDayNum(1);
  };

  const goToNextMonth = () => {
    setVisibleDate(current => new Date(current.getFullYear(), current.getMonth() + 1, 1));
    setSelectedDayNum(1);
  };

  const goToToday = () => {
    const now = new Date();
    setVisibleDate(now);
    setSelectedDayNum(now.getDate());
  };

  // Cálculo dinámico de cuadrícula mensual (orden español: LUNES = 0)
  const year = visibleDate.getFullYear();
  const month = visibleDate.getMonth();
  const daysInMonthCount = new Date(year, month + 1, 0).getDate();
  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7; // 0=Lun, 6=Dom
  const daysInMonthArray = Array.from({ length: daysInMonthCount }, (_, i) => i + 1);
  const blankCellsArray = Array.from({ length: firstDayOffset }, (_, i) => i);

  // Titular dinámico del mes en español
  const rawMonthName = visibleDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const monthTitleText = rawMonthName.toUpperCase();
  const monthShortName = visibleDate.toLocaleDateString('es-ES', { month: 'long' });

  // Generación pura de ocurrencias a partir de las 86 reglas recurrentes de public.training_schedules
  const trainingOccurrences = generateTrainingScheduleOccurrences({
    schedules: INITIAL_TRAINING_SCHEDULES,
    year,
    monthZeroIndexed: month,
    activeFilter,
    athletes: DEMO_ATHLETES_MAP
  });

  // Eventos adicionales de partidos/torneos para fin de semana
  const monthStr = String(month + 1).padStart(2, '0');
  const matchEvents: GeneratedOccurrence[] = [];

  if (activeFilter.mode === 'all' || activeFilter.childId === 'pablo-10') {
    matchEvents.push({
      id: `match:pablo:${year}-${monthStr}-10`,
      scheduleId: 'match-pablo',
      childId: 'pablo-10',
      childName: 'Pablo',
      sport: '⚽ Fútbol 11',
      team: 'Juvenil A',
      title: 'Jornada Oficial vs Levante UD B',
      type: 'match',
      date: `${year}-${monthStr}-10`,
      dayNum: 10,
      dayName: 'Sábado',
      time: '11:00 - 12:45',
      startTimeRaw: '11:00',
      endTimeRaw: '12:45',
      citationTime: '10:00h en Vestuarios',
      location: 'Campo 1 - CD Jesuitas (Valencia)',
      weather: '⛅ 18°C • Sol y nubes',
      carDeparture: '09:40h (15 min viaje)',
      notes: 'Partido oficial de Liga Juvenil A'
    });
  }

  if (activeFilter.mode === 'all' || activeFilter.childId === 'lucia-7') {
    matchEvents.push({
      id: `match:lucia:${year}-${monthStr}-10`,
      scheduleId: 'match-lucia',
      childId: 'lucia-7',
      childName: 'Lucía',
      sport: '⚽ Fútbol 11',
      team: 'Infantil A',
      title: 'Jornada Oficial vs Valencia CF C',
      type: 'match',
      date: `${year}-${monthStr}-10`,
      dayNum: 10,
      dayName: 'Sábado',
      time: '12:30 - 14:15',
      startTimeRaw: '12:30',
      endTimeRaw: '14:15',
      citationTime: '11:30h en Vestuarios',
      location: 'Campo 2 - CD Jesuitas (Valencia)',
      weather: '⛅ 18°C • Sol y nubes',
      carDeparture: '11:10h (15 min viaje)',
      notes: 'Partido oficial de Liga Infantil A'
    });
  }

  if (activeFilter.mode === 'all' || activeFilter.childId === 'lucas-22') {
    matchEvents.push({
      id: `tournament:lucas:${year}-${monthStr}-11`,
      scheduleId: 'tourn-lucas',
      childId: 'lucas-22',
      childName: 'Lucas',
      sport: '⚽ Fútbol 8',
      team: 'Alevín A',
      title: 'Torneo Alevín de Primavera',
      type: 'tournament',
      date: `${year}-${monthStr}-11`,
      dayNum: 11,
      dayName: 'Domingo',
      time: '10:00 - 14:00',
      startTimeRaw: '10:00',
      endTimeRaw: '14:00',
      citationTime: '09:30h',
      location: 'Instalaciones Centrales CD Jesuitas',
      weather: '☀️ 22°C • Soleado',
      carDeparture: '09:15h',
      notes: 'Torneo oficial Alevín A'
    });
  }

  const allEvents = [...trainingOccurrences, ...matchEvents];

  // Filtrado final por tipo
  const filteredEvents = allEvents.filter(e => {
    return selectedType === 'all' || e.type === selectedType;
  });

  const activeDayEvents = filteredEvents.filter(e => e.dayNum === selectedDayNum);

  const getEventDotsForDay = (day: number) => {
    const eventsOnDay = filteredEvents.filter(e => e.dayNum === day);
    return eventsOnDay.map(e => e.type);
  };

  const handleSyncCalendar = () => {
    setSyncedModalVisible(true);
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} 
      showsVerticalScrollIndicator={false}
    >
      {/* BADGE VISIBLE DE COMPILACIÓN */}
      <View style={styles.compilationBadgeContainer}>
        <Text style={styles.compilationBadgeTxt}>COMPILACIÓN: FAMILIA-CALENDARIO-01</Text>
      </View>

      {/* ESTADO DEFENSIVO 1: FAMILIA SIN HIJOS VINCULADOS */}
      {familyPlayers.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="shield-outline" size={44} color={colors.skyGlow} />
          <Text style={styles.emptyTitle}>No hay deportistas vinculados a esta cuenta</Text>
          <Text style={styles.emptySubtext}>
            Para consultar la agenda y calendario deportivo debes contar con al menos un jugador a tu cargo validado por el club.
          </Text>
        </View>
      ) : (
        <>
          {/* 1. SELECTOR MULTIDEPORTE DE HIJOS REALES (FUENTE ÚNICA DE VERDAD) */}
          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={[styles.filterPill, selectedChild === 'all' && styles.filterPillActive]}
              onPress={() => handleSetFilter({ mode: 'all' })}
            >
              <Text style={[styles.filterPillText, selectedChild === 'all' && styles.filterPillTextActive]}>
                👨‍👩‍👧‍👦 Todos los hijos
              </Text>
            </TouchableOpacity>

            {familyPlayers.map((player) => {
              const isSelected = selectedChild === player.id;
              const shortTeam = player.team ? player.team.split(' ')[0] : 'Deporte';
              return (
                <TouchableOpacity 
                  key={player.id}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => handleSetFilter({ mode: 'child', childId: player.id })}
                >
                  <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                    {player.avatarIcon || '👦'} {player.name} ({shortTeam})
                  </Text>
                </TouchableOpacity>
              );
            })}
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
                <Text style={[styles.typeBtnText, selectedType === t.id && styles.typeBtnTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 3. CALENDARIO MENSUAL CON NAVEGACIÓN DINÁMICA DE MES Y AÑO */}
          <View style={styles.calendarCard}>
            <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.calendarGradient}>
              
              {/* Header Mes con Flechas de Navegación y Botón Hoy */}
              <View style={styles.monthHeaderRow}>
                <View style={styles.navControlsRow}>
                  <TouchableOpacity style={styles.navArrowBtn} onPress={goToPreviousMonth} activeOpacity={0.7}>
                    <Ionicons name="chevron-back" size={20} color={colors.skyPrimary} />
                  </TouchableOpacity>

                  <Text style={styles.monthTitleText}>{monthTitleText}</Text>

                  <TouchableOpacity style={styles.navArrowBtn} onPress={goToNextMonth} activeOpacity={0.7}>
                    <Ionicons name="chevron-forward" size={20} color={colors.skyPrimary} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.todayBtn} onPress={goToToday} activeOpacity={0.8}>
                    <Text style={styles.todayBtnTxt}>HOY</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.syncBtn} onPress={handleSyncCalendar} activeOpacity={0.85}>
                  <Ionicons name="sync-outline" size={15} color={colors.navyDark} />
                  <Text style={styles.syncBtnText}>Sincronizar Móvil</Text>
                </TouchableOpacity>
              </View>

              {/* Días de la Semana (Orden Español: LUN - DOM) */}
              <View style={styles.weekDaysRow}>
                {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map((d, i) => (
                  <Text key={i} style={styles.weekDayText}>{d}</Text>
                ))}
              </View>

              {/* Grilla Dinámica de Días */}
              <View style={styles.daysGrid}>
                {/* Celdas en blanco iniciales de alineación del primer día */}
                {blankCellsArray.map((_, idx) => (
                  <View key={`blank-${idx}`} style={styles.dayCellBlank} />
                ))}

                {/* Celdas de días del mes */}
                {daysInMonthArray.map((day) => {
                  const dots = getEventDotsForDay(day);
                  const isSelected = selectedDayNum === day;

                  return (
                    <TouchableOpacity
                      key={day}
                      style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                      onPress={() => setSelectedDayNum(day)}
                    >
                      <Text style={[styles.dayCellNumber, isSelected && styles.dayCellNumberSelected]}>
                        {day}
                      </Text>
                      
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

          {/* ESTADO DEFENSIVO 2: MES SIN EVENTOS */}
          {filteredEvents.length === 0 ? (
            <View style={styles.emptyMonthBox}>
              <Ionicons name="calendar-outline" size={38} color={colors.skyGlow} />
              <Text style={styles.emptyMonthTitle}>
                {selectedChild !== 'all' 
                  ? 'No hay actividades programadas para este deportista en el mes seleccionado.'
                  : 'No hay actividades deportivas programadas para este mes.'}
              </Text>
            </View>
          ) : (
            <>
              {/* 4. MÓDULO VISUAL PREMIUM DE LOGÍSTICA FAMILIAR */}
              <View style={styles.logisticsVisualContainer}>
                <View style={styles.logisticsHeaderRow}>
                  <View style={styles.warningIconBg}>
                    <Ionicons name="warning" size={18} color={colors.navyDark} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.logisticsMainTitle}>LOGÍSTICA FAMILIAR • COINCIDENCIA DE HORARIOS</Text>
                    <Text style={styles.logisticsSubTitle}>Alertas de solapamiento en entrenamientos y partidos de la semana</Text>
                  </View>
                </View>

                {/* TARJETA DE CONFLICTO 1 */}
                <View style={styles.conflictCard}>
                  <LinearGradient colors={['rgba(245, 158, 11, 0.18)', 'rgba(11, 34, 79, 0.9)']} style={styles.conflictGradient}>
                    <View style={styles.conflictDayTagRow}>
                      <Text style={styles.conflictDayTag}>MARTES 13 DE {monthTitleText} • ENTRENAMIENTOS COINCIDENTES</Text>
                      <View style={styles.marginBadge}>
                        <Text style={styles.marginBadgeText}>⚡ Mismo Horario</Text>
                      </View>
                    </View>

                    <View style={styles.vsRow}>
                      <View style={styles.siblingBox}>
                        <Text style={styles.siblingName}>👦 {familyPlayers[0]?.name || 'Pablo'}</Text>
                        <Text style={styles.siblingSport}>⚽ Fútbol ({familyPlayers[0]?.team || 'Cadete B'})</Text>
                        <Text style={styles.siblingTime}>⏰ 17:30h - 19:00h</Text>
                        <Text style={styles.siblingLoc}>📍 Campo 2 Césped</Text>
                      </View>

                      <View style={styles.versusConnector}>
                        <Ionicons name="car-sport" size={20} color={colors.accentGold} />
                        <Text style={styles.vsTxt}>COINCIDEN</Text>
                      </View>

                      <View style={styles.siblingBox}>
                        <Text style={styles.siblingName}>👧 {familyPlayers[2]?.name || 'Elena'}</Text>
                        <Text style={styles.siblingSport}>🏐 Voleibol ({familyPlayers[2]?.team || 'Alevín'})</Text>
                        <Text style={styles.siblingTime}>⏰ 17:30h - 19:00h</Text>
                        <Text style={styles.siblingLoc}>📍 Pistas Exteriores</Text>
                      </View>
                    </View>

                    <View style={styles.logisticsTipBox}>
                      <Ionicons name="bulb-outline" size={14} color={colors.goldLight} />
                      <Text style={styles.logisticsTipTxt}>
                        <Text style={{fontWeight: '900', color: colors.goldLight}}>Consejo de Viaje</Text>: Mismo viaje en coche hasta el colegio. Dejar en Campo 2 y Pistas Exteriores.
                      </Text>
                    </View>
                  </LinearGradient>
                </View>

                {/* TARJETA DE CONFLICTO 2 */}
                <View style={[styles.conflictCard, { marginTop: 10 }]}>
                  <LinearGradient colors={['rgba(79, 195, 247, 0.18)', 'rgba(11, 34, 79, 0.9)']} style={styles.conflictGradient}>
                    <View style={styles.conflictDayTagRow}>
                      <Text style={[styles.conflictDayTag, { color: colors.skyGlow }]}>SÁBADO 10 DE {monthTitleText} • PARTIDOS COINCIDENTES</Text>
                      <View style={[styles.marginBadge, { backgroundColor: 'rgba(79, 195, 247, 0.25)', borderColor: colors.skyPrimary }]}>
                        <Text style={[styles.marginBadgeText, { color: colors.skyPrimary }]}>⏳ 30 min de margen</Text>
                      </View>
                    </View>

                    <View style={styles.vsRow}>
                      <View style={styles.siblingBox}>
                        <Text style={styles.siblingName}>👦 {familyPlayers[0]?.name || 'Pablo'}</Text>
                        <Text style={styles.siblingSport}>⚽ Fútbol vs Levante UD</Text>
                        <Text style={styles.siblingTime}>⏰ Citación 10:00h • Partido 11:00h</Text>
                        <Text style={styles.siblingLoc}>📍 Campo 1 (Valencia)</Text>
                      </View>

                      <View style={styles.versusConnector}>
                        <Ionicons name="swap-horizontal" size={20} color={colors.skyPrimary} />
                        <Text style={[styles.vsTxt, { color: colors.skyPrimary }]}>SOLAPADO</Text>
                      </View>

                      <View style={styles.siblingBox}>
                        <Text style={styles.siblingName}>👦 {familyPlayers[1]?.name || 'Hugo'}</Text>
                        <Text style={styles.siblingSport}>👟 Futsal vs El Pilar</Text>
                        <Text style={styles.siblingTime}>⏰ Citación 10:45h • Partido 11:30h</Text>
                        <Text style={styles.siblingLoc}>📍 Pabellón Colegio</Text>
                      </View>
                    </View>

                    <View style={[styles.logisticsTipBox, { borderColor: 'rgba(79, 195, 247, 0.4)' }]}>
                      <Ionicons name="information-circle-outline" size={14} color={colors.skyGlow} />
                      <Text style={[styles.logisticsTipTxt, { color: colors.white }]}>
                        Ambos partidos se juegan en las instalaciones del club. Podéis organizar el relevo entre tiempos.
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
                    <Text style={styles.eveReminderSub}>Aviso Push / WhatsApp la tarde previa a cualquier partido o entreno especial.</Text>
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
              <Text style={styles.sectionTitle}>
                EVENTOS DEL DÍA {selectedDayNum} DE {monthTitleText}
              </Text>

              {/* ESTADO DEFENSIVO 3: DÍA SIN EVENTOS */}
              {activeDayEvents.length === 0 ? (
                <View style={styles.emptyDayBox}>
                  <Ionicons name="cafe-outline" size={32} color={colors.textMuted} />
                  <Text style={styles.emptyDayText}>No hay actividades programadas para este día.</Text>
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
                      <Text style={styles.eventTimeSub}>{evt.dayName} {evt.dayNum} de {monthShortName} • {evt.time}</Text>

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
                        <Text style={styles.carDepartureTxt}>
                          Hora recomendada de salida: <Text style={{fontWeight: '900', color: colors.accentGold}}>{evt.carDeparture}</Text>
                        </Text>
                      </View>

                      {/* BOTONES DE EXPORTACIÓN A GOOGLE CALENDAR Y APPLE CALENDAR */}
                      <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                        {evt.googleCalendarUrl && (
                          <TouchableOpacity 
                            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E293B', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.skyPrimary }}
                            onPress={() => {
                              if (evt.googleCalendarUrl) {
                                require('react-native').Linking.openURL(evt.googleCalendarUrl);
                              }
                            }}
                            activeOpacity={0.8}
                          >
                            <Ionicons name="logo-google" size={14} color={colors.skyPrimary} style={{ marginRight: 6 }} />
                            <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '700' }}>Google Calendar</Text>
                          </TouchableOpacity>
                        )}

                        {evt.icsContent && (
                          <TouchableOpacity 
                            style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E293B', paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, borderWidth: 1, borderColor: colors.accentGold }}
                            onPress={() => {
                              const Platform = require('react-native').Platform;
                              const Linking = require('react-native').Linking;
                              if (Platform.OS === 'web' && typeof document !== 'undefined') {
                                const blob = new Blob([evt.icsContent!], { type: 'text/calendar;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `entrenamiento_${evt.childName.toLowerCase()}_${evt.date}.ics`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                              } else {
                                const dataUri = `data:text/calendar;charset=utf-8,${encodeURIComponent(evt.icsContent!)}`;
                                Linking.openURL(dataUri).catch(() => {});
                              }
                            }}
                            activeOpacity={0.8}
                          >
                            <Ionicons name="logo-apple" size={14} color={colors.accentGold} style={{ marginRight: 6 }} />
                            <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '700' }}>Apple Calendar</Text>
                          </TouchableOpacity>
                        )}
                      </View>

                    </LinearGradient>
                  </View>
                ))
              )}
            </>
          )}
        </>
      )}

      {/* MODAL DE CONFIRMACIÓN DE SINCRONIZACIÓN CON EL MÓVIL */}
      <Modal visible={syncedModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Ionicons name="checkmark-circle-outline" size={54} color={colors.accentGreen} />
            <Text style={styles.modalTitle}>¡Agenda Sincronizada!</Text>
            <Text style={styles.modalSub}>
              Los partidos y entrenamientos de {monthShortName} de todos los deportes de tus hijos se han añadido a tu calendario de iOS / Google Calendar.
            </Text>

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

  compilationBadgeContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  compilationBadgeTxt: {
    color: colors.skyPrimary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },

  emptyBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGlow,
    marginVertical: 16,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  emptyMonthBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  emptyMonthTitle: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },

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

  calendarCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  calendarGradient: { padding: 16 },
  monthHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 },
  
  navControlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navArrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  monthTitleText: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 0.8 },
  
  todayBtn: {
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.skyPrimary,
    marginLeft: 4,
  },
  todayBtnTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900' },

  syncBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.skyPrimary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  syncBtnText: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  weekDaysRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', paddingBottom: 6 },
  weekDayText: { color: colors.skyGlow, fontSize: 10, fontWeight: '800', width: 36, textAlign: 'center' },

  daysGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 4 },
  dayCellBlank: {
    width: '13.5%', height: 46, borderRadius: 12, backgroundColor: 'transparent'
  },
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

  eveReminderCard: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12,
    backgroundColor: colors.navyCard, padding: 14, borderRadius: 16,
    borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 16
  },
  eveReminderLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  eveReminderTitle: { color: colors.skyPrimary, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  eveReminderSub: { color: colors.textMuted, fontSize: 11, lineHeight: 15, marginTop: 2 },

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

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCard: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 20, fontWeight: '900', marginTop: 12, marginBottom: 6 },
  modalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', lineHeight: 18, marginBottom: 20 },
  modalBtnClose: { backgroundColor: colors.skyPrimary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 },
  modalBtnCloseText: { color: colors.navyDark, fontSize: 12, fontWeight: '900' }
});
