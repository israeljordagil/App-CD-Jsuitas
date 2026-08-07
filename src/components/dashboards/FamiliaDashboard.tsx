import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions, 
  Modal,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useSport } from '../../context/SportContext';
import { useDemoNavigation } from '../../context/DemoNavigationContext';
import { supabase } from '../../lib/supabase';

const getEquipacionPublicUrl = (fileName: string): string => {
  if (!supabase) return '';
  const { data } = supabase.storage
    .from('Equipaciones CD Jesuitas')
    .getPublicUrl(fileName);

  return `${data?.publicUrl}?v=png-final-20260802`;
};

const CAMISETA_TRASERA_3D_LIMPIA = require('../../../assets/images/camiseta_trasera_3d_limpia.png');

const DORSAL_3D_IMAGES: Record<number, any> = {
  1: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-01.png'),
  2: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-02.png'),
  3: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-03.png'),
  4: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-04.png'),
  5: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-05.png'),
  6: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-06.png'),
  7: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-07.png'),
  8: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-08.png'),
  9: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-09.png'),
  10: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-10.png'),
  11: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-11.png'),
  12: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-12.png'),
  13: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-13.png'),
  14: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-14.png'),
  15: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-15.png'),
  16: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-16.png'),
  17: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-17.png'),
  18: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-18.png'),
  19: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-19.png'),
  20: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-20.png'),
  21: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-21.png'),
  22: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-22.png'),
  23: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-23.png'),
  24: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-24.png'),
  25: require('../../../assets/equipaciones/primera-equipacion-3d-dorsales/dorsal-0125.png'),
};

// Paleta corporativa de lujo CD Jesuitas
const colors = {
  navyDark: '#030E26',
  navyCard: '#091B3E',
  navyCardHighlight: '#0E295A',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.3)',
};

// Escudo SVG/Data URI vectorizado oficial del CD Jesuitas
const JESUITAS_SHIELD_URI = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50 5 L90 20 L90 70 C90 95 50 115 50 115 C50 115 10 95 10 70 L10 20 Z" fill="%23071A3D" stroke="%234FC3F7" stroke-width="4"/><path d="M25 35 L75 35 M25 50 L75 50 M50 20 L50 100" stroke="%23FFFFFF" stroke-width="5"/><circle cx="50" cy="42" r="10" fill="%23F59E0B"/><text x="50" y="85" font-family="sans-serif" font-weight="900" font-size="16" fill="%234FC3F7" text-anchor="middle">CDJ</text></svg>';

// Escudo de Levante UD B demo
const LEVANTE_SHIELD_URI = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50 5 L90 20 L90 70 C90 95 50 115 50 115 C50 115 10 95 10 70 L10 20 Z" fill="%23A51C30" stroke="%23F59E0B" stroke-width="4"/><path d="M10 20 L50 115 L90 20 Z" fill="%23004B87"/><circle cx="50" cy="50" r="16" fill="%23F59E0B"/><text x="50" y="55" font-family="sans-serif" font-weight="900" font-size="14" fill="%23A51C30" text-anchor="middle">LUD</text></svg>';

// Escudo de Valencia CF C demo
const VALENCIA_SHIELD_URI = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><path d="M50 5 L90 20 L90 70 C90 95 50 115 50 115 C50 115 10 95 10 70 L10 20 Z" fill="%23FFFFFF" stroke="%23000000" stroke-width="4"/><path d="M10 40 L90 40 L90 70 C90 95 50 115 50 115 C50 115 10 95 10 70 Z" fill="%23FF6600"/><text x="50" y="75" font-family="sans-serif" font-weight="900" font-size="14" fill="%23000000" text-anchor="middle">VCF</text></svg>';

// Imagen de estadio iluminado en alta definición (con fallback visual estilizado)
const STADIUM_BG_URI = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80';

// Lista de deportistas fija de demostración idéntica a la captura de referencia
const DEMO_ATHLETES = [
  { 
    id: 'pablo-10', 
    name: 'Pablo', 
    fullName: 'Pablo Martínez', 
    teamId: 'b1000001-0000-4000-8000-000000000001',
    team: 'Juvenil A', 
    sport: 'Fútbol 11', 
    dorsal: 10, 
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80', 
    active: true 
  },
  { 
    id: 'lucia-7', 
    name: 'Lucía', 
    fullName: 'Lucía Martínez', 
    teamId: 'b1000001-0000-4000-8000-000000000009',
    team: 'Infantil A', 
    sport: 'Fútbol 11', 
    dorsal: 7, 
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80', 
    active: false 
  },
  { 
    id: 'lucas-22', 
    name: 'Lucas', 
    fullName: 'Lucas Martínez', 
    teamId: 'b1000001-0000-4000-8000-000000000014',
    team: 'Alevín A', 
    sport: 'Fútbol 8', 
    dorsal: 22, 
    avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=200&q=80', 
    active: false 
  },
];

interface DemoDashboardEvent {
  id: string;
  athleteId: string;
  athleteName: string;
  team: string;
  sport: string;
  title: string;
  type: 'Entrenamiento' | 'Partido' | 'Convocatoria' | 'Torneo';
  date: string;
  time: string;
  location: string;
  badgeTag: string;
}

const DEMO_CALENDAR_EVENTS: DemoDashboardEvent[] = [
  // Pablo · Juvenil A (15:45 - 17:15)
  {
    id: 'ev-p1',
    athleteId: 'pablo-10',
    athleteName: 'Pablo',
    team: 'Juvenil A',
    sport: 'Fútbol 11',
    title: 'Entrenamiento Juvenil A',
    type: 'Entrenamiento',
    date: 'Lunes, Miércoles, Viernes',
    time: '15:45 - 17:15',
    location: 'Campo CD Jesuitas',
    badgeTag: 'Pablo · Juvenil A'
  },
  {
    id: 'ev-p2',
    athleteId: 'pablo-10',
    athleteName: 'Pablo',
    team: 'Juvenil A',
    sport: 'Fútbol 11',
    title: 'Jornada Oficial vs Levante UD B',
    type: 'Partido',
    date: 'Sábado 10 de Mayo',
    time: '11:00h (Citación 10:00h)',
    location: 'Campo 1 · CD Jesuitas',
    badgeTag: 'Pablo · Juvenil A'
  },
  {
    id: 'ev-p3',
    athleteId: 'pablo-10',
    athleteName: 'Pablo',
    team: 'Juvenil A',
    sport: 'Fútbol 11',
    title: 'Convocatoria Oficial Publicada',
    type: 'Convocatoria',
    date: 'Jueves 8 de Mayo',
    time: '19:15h',
    location: 'Vestuarios / App CDJ',
    badgeTag: 'Pablo · Juvenil A'
  },

  // Lucía · Infantil A (18:45 - 20:15)
  {
    id: 'ev-l1',
    athleteId: 'lucia-7',
    athleteName: 'Lucía',
    team: 'Infantil A',
    sport: 'Fútbol 11',
    title: 'Entrenamiento Infantil A',
    type: 'Entrenamiento',
    date: 'Lunes, Miércoles, Viernes',
    time: '18:45 - 20:15',
    location: 'Campo CD Jesuitas',
    badgeTag: 'Lucía · Infantil A'
  },
  {
    id: 'ev-l2',
    athleteId: 'lucia-7',
    athleteName: 'Lucía',
    team: 'Infantil A',
    sport: 'Fútbol 11',
    title: 'Jornada Oficial vs Valencia CF C',
    type: 'Partido',
    date: 'Sábado 10 de Mayo',
    time: '12:30h (Citación 11:30h)',
    location: 'Campo 2 · CD Jesuitas',
    badgeTag: 'Lucía · Infantil A'
  },

  // Lucas · Alevín A (17:30 - 19:00 Lun/Mié | 18:00 - 19:00 Vie)
  {
    id: 'ev-k1',
    athleteId: 'lucas-22',
    athleteName: 'Lucas',
    team: 'Alevín A',
    sport: 'Fútbol 8',
    title: 'Entrenamiento Alevín A',
    type: 'Entrenamiento',
    date: 'Lunes, Miércoles, Viernes',
    time: '17:30 - 19:00 (Vie 18:00)',
    location: 'Campo CD Jesuitas',
    badgeTag: 'Lucas · Alevín A'
  },
  {
    id: 'ev-k2',
    athleteId: 'lucas-22',
    athleteName: 'Lucas',
    team: 'Alevín A',
    sport: 'Fútbol 8',
    title: 'Torneo Alevín de Primavera',
    type: 'Torneo',
    date: 'Domingo 11 de Mayo',
    time: '10:00h - 14:00h',
    location: 'Instalaciones Centrales CDJ',
    badgeTag: 'Lucas · Alevín A'
  }
];

export type FamilyCalendarFilter =
  | { mode: 'all' }
  | { mode: 'child'; childId: string };

export function FamiliaDashboard() {
  const router = useRouter();
  const { setSport } = useSport();
  const { setSelectedDemoProfile } = useDemoNavigation();
  const { width: screenWidth } = useWindowDimensions();
  const isDesktop = screenWidth >= 900;
  const isTablet = screenWidth >= 600;

  const { linkedPlayers, activePlayerId, switchActivePlayer } = useAuth();

  // Fuente de verdad única para el filtro del calendario familiar
  const [familyFilter, setFamilyFilter] = useState<FamilyCalendarFilter>({
    mode: 'child',
    childId: 'pablo-10'
  });

  // Confirmación binaria de asistencia a partido ('Confirmado' | 'Ausente')
  const [matchStatusMap, setMatchStatusMap] = useState<Record<string, { status: 'Confirmado' | 'Ausente'; reason?: string; detail?: string }>>({});

  // Modal obligatorio de motivo de ausencia para "No asistirá"
  const [absenceMatchModalVisible, setAbsenceMatchModalVisible] = useState(false);
  const [selectedReasonOption, setSelectedReasonOption] = useState<string>('');
  const [customOtherReason, setCustomOtherReason] = useState<string>('');
  const [optionalObservations, setOptionalObservations] = useState<string>('');

  // Modal para avisar de ausencia a entrenamiento
  const [trainingAbsenceModalVisible, setTrainingAbsenceModalVisible] = useState(false);
  const [trainingAbsenceReason, setTrainingAbsenceReason] = useState<string>('');

  // Estado replegable para el Asistente de Salida (contraído por defecto)
  const [isTravelAssistantOpen, setIsTravelAssistantOpen] = useState(false);

  // Obtener deportista activo y eventos filtrados dinámicos
  const activeAthleteId = familyFilter.mode === 'child' ? familyFilter.childId : 'pablo-10';
  const activeAthlete = DEMO_ATHLETES.find(a => a.id === activeAthleteId) || DEMO_ATHLETES[0];

  const activeEvents = familyFilter.mode === 'all'
    ? DEMO_CALENDAR_EVENTS
    : DEMO_CALENDAR_EVENTS.filter(e => e.athleteId === familyFilter.childId);

  const nextTraining = activeEvents.find(e => e.type === 'Entrenamiento') || DEMO_CALENDAR_EVENTS[0];
  const nextMatch = activeEvents.find(e => e.type === 'Partido' || e.type === 'Torneo') || DEMO_CALENDAR_EVENTS[1];

  const handleSelectAthlete = (athlete: typeof DEMO_ATHLETES[0]) => {
    setFamilyFilter({ mode: 'child', childId: athlete.id });
    if (athlete.sport === 'Fútbol' || athlete.sport === 'Fútbol 11' || athlete.sport === 'Fútbol 8') setSport('futbol');
    if (athlete.sport === 'Baloncesto') setSport('baloncesto');
    if (athlete.sport === 'Futsal') setSport('futbol_sala');
  };

  const currentMatchRecord = matchStatusMap[activeAthleteId];
  const currentMatchStatus = currentMatchRecord?.status;

  // Confirmación binaria: ASISTIRÁ
  const handleConfirmAttendance = () => {
    setMatchStatusMap(prev => ({
      ...prev,
      [activeAthleteId]: { status: 'Confirmado' }
    }));
  };

  // Confirmación binaria: NO ASISTIRÁ
  const handlePressNoAttendance = () => {
    setSelectedReasonOption('');
    setCustomOtherReason('');
    setOptionalObservations('');
    setAbsenceMatchModalVisible(true);
  };

  // Guardar motivo obligatorio de ausencia
  const handleSaveAbsenceReason = () => {
    if (!selectedReasonOption) return;
    if (selectedReasonOption === 'Otro motivo' && !customOtherReason.trim()) return;

    const finalReason = selectedReasonOption === 'Otro motivo' ? customOtherReason.trim() : selectedReasonOption;

    setMatchStatusMap(prev => ({
      ...prev,
      [activeAthleteId]: { 
        status: 'Ausente', 
        reason: finalReason, 
        detail: optionalObservations.trim() 
      }
    }));
    setAbsenceMatchModalVisible(false);
  };

  const handleChangeSport = () => {
    setSport(null);
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* 1. TOP BAR COMPACTA EXCLUSIVA CON ESCUDO REAL DE CD JESUITAS */}
      <View style={styles.topBarContainer}>
        <View style={styles.topBarLeft}>
          <Ionicons name="menu" size={24} color={colors.white} style={{ marginRight: 10 }} />
          <Image source={{ uri: JESUITAS_SHIELD_URI }} style={styles.topBarShield} />
          <Text style={styles.topBarBrand}>CD JESUITAS <Text style={styles.topBarSubBrand}>• FÚTBOL · FAMILIA</Text></Text>
        </View>
        <TouchableOpacity style={styles.changeSportHeaderBtn} onPress={handleChangeSport} activeOpacity={0.8}>
          <Ionicons name="swap-horizontal" size={14} color={colors.skyPrimary} />
          <Text style={styles.changeSportHeaderBtnTxt}>Cambiar deporte</Text>
        </TouchableOpacity>
      </View>

      {/* 2. HERO HEADER SALUDO CÁLIDO CON FOTO DE EQUIPO/ESTADIO DE FONDO */}
      <View style={styles.heroBannerCard}>
        <Image source={{ uri: STADIUM_BG_URI }} style={styles.heroBannerBgImage} />
        <LinearGradient 
          colors={['rgba(7, 26, 61, 0.95)', 'rgba(3, 14, 38, 0.85)', 'rgba(7, 26, 61, 0.98)']} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={styles.heroBannerGradient}
        >
          <View style={styles.heroHeaderContent}>
            <Text style={styles.heroGreetingText}>¡Buenas tardes!</Text>
            <Text style={[styles.heroGreetingText, { fontSize: 24, marginTop: 2 }]}>Familia Martínez 👋</Text>
            <Text style={styles.heroSubText}>Vamos a por un gran día.</Text>
            <View style={styles.heroTeamTagRow}>
              <Image source={{ uri: JESUITAS_SHIELD_URI }} style={{ width: 14, height: 16, marginRight: 6 }} />
              <Text style={styles.heroTeamTagTxt}>{activeAthlete.team} · CD Jesuitas</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* 3. SELECTOR DE DEPORTISTAS CON CAMISETA 3D VISTA TRASERA (RÉPLICA EXACTA DEL DISEÑO DE REFERENCIA) */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitleTxt}>MIS DEPORTISTAS</Text>
        <TouchableOpacity style={styles.manageKidsHeaderBtn} onPress={() => router.push('/familias' as any)}>
          <Text style={styles.manageKidsHeaderBtnTxt}>Gestionar hijos</Text>
          <Ionicons name="settings-outline" size={13} color={colors.skyPrimary} />
        </TouchableOpacity>
      </View>

      {/* Selector de Modo Familiar vs Hijo Individual */}
      <View style={{ marginBottom: 12, flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        <TouchableOpacity
          style={[
            styles.familyModePillBtn,
            familyFilter.mode === 'all' && styles.familyModePillBtnActive
          ]}
          onPress={() => setFamilyFilter({ mode: 'all' })}
          activeOpacity={0.85}
        >
          <Ionicons name="people" size={14} color={familyFilter.mode === 'all' ? colors.navyDark : colors.skyPrimary} />
          <Text style={[
            styles.familyModePillBtnTxt,
            familyFilter.mode === 'all' && styles.familyModePillBtnTxtActive
          ]}>
            👨‍👩‍👧‍👦 Todos los hijos (Vista combinada)
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.athletesGridRow, !isDesktop && styles.athletesGridRowMobile]}>
        {DEMO_ATHLETES.map((athlete) => {
          const isSelected = familyFilter.mode === 'child' && familyFilter.childId === athlete.id;
          const rawDorsal = athlete.dorsal;
          const dorsalVal = typeof rawDorsal === 'number' ? rawDorsal : (rawDorsal ? Number(rawDorsal) : 0);
          const jerseySource = DORSAL_3D_IMAGES[dorsalVal] || CAMISETA_TRASERA_3D_LIMPIA;
          return (
            <TouchableOpacity
              key={athlete.id}
              activeOpacity={0.88}
              style={[styles.athleteCardRef, isSelected && styles.athleteCardRefActive]}
              onPress={() => handleSelectAthlete(athlete)}
            >
              {/* Lado Izquierdo: Camiseta 3D Oficial con dorsal 3D correspondiente */}
              <View style={styles.jersey3DContainer}>
                <Image 
                  source={jerseySource}
                  style={styles.jersey3DImg}
                  resizeMode="contain"
                />
                {!DORSAL_3D_IMAGES[dorsalVal] && dorsalVal > 0 && (
                  <Text style={[
                    styles.jerseyIntegratedDorsalTxt,
                    String(dorsalVal).length >= 2 && styles.jerseyIntegratedDorsalTxtTwoDigits
                  ]}>
                    {dorsalVal}
                  </Text>
                )}
              </View>

              {/* Lado Derecho: Avatar, Nombre, Equipo, Deporte y Botón de Estado */}
              <View style={styles.athleteRightCol}>
                <Image source={{ uri: athlete.avatar }} style={styles.athleteAvatarImg} />
                <Text style={[styles.athleteNameTxt, isSelected && styles.athleteNameTxtActive]}>{athlete.name}</Text>
                <Text style={styles.athleteTeamTxt}>{athlete.team}</Text>
                <View style={styles.athleteSportRow}>
                  <Ionicons name="football-outline" size={12} color={colors.skyPrimary} />
                  <Text style={styles.athleteSportTxt}>{athlete.sport}</Text>
                </View>

                {/* Botón Pill de Estado (Activo / Seleccionar) */}
                <TouchableOpacity 
                  style={[styles.selectActionPill, isSelected ? styles.selectActionPillActive : styles.selectActionPillOutline]}
                  onPress={() => handleSelectAthlete(athlete)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.selectActionPillTxt, isSelected ? styles.selectActionPillTxtActive : styles.selectActionPillTxtOutline]}>
                    {isSelected ? 'Activo' : 'Seleccionar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 4. ENTRENAMIENTOS DE ESTA SEMANA (DINÁMICO CON FILTRO FAMILIAR) */}
      <View style={styles.trainingHeroCard}>
        <View style={[styles.trainingHeroFlexRow, isDesktop && { flexDirection: 'row' }]}>
          
          {/* Lado Izquierdo: Información */}
          <View style={[styles.trainingHeroLeft, isDesktop && { flex: 1 }]}>
            <View style={styles.trainingHeaderBadgeRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.trainingHeaderTitle}>1. ENTRENAMIENTO · {familyFilter.mode === 'all' ? 'TODOS LOS HIJOS' : activeAthlete.name.toUpperCase()}</Text>
              <View style={styles.tomorrowBadge}>
                <Text style={styles.tomorrowBadgeTxt}>{nextTraining.badgeTag}</Text>
              </View>
            </View>

            <Text style={styles.trainingMainTimeTxt}>{nextTraining.date} · {nextTraining.time}</Text>

            <View style={styles.trainingDetailsList}>
              <View style={styles.trainingDetailRow}>
                <Ionicons name="location-outline" size={15} color={colors.skyPrimary} />
                <Text style={styles.trainingDetailTxt}>{nextTraining.location}</Text>
              </View>
              <View style={styles.trainingDetailRow}>
                <Ionicons name="people-outline" size={15} color={colors.skyPrimary} />
                <Text style={styles.trainingDetailTxt}>{nextTraining.title}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.absenceBtnNotice} 
              onPress={() => setTrainingAbsenceModalVisible(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="notifications-outline" size={14} color={colors.skyPrimary} />
              <Text style={styles.absenceBtnNoticeTxt}>Avisar de una ausencia</Text>
            </TouchableOpacity>
          </View>

          {/* Lado Derecho: Imagen de Campo Deportivo Iluminado (Escritorio / Tablet) */}
          <View style={[styles.trainingHeroRight, !isDesktop && { height: 120, marginTop: 12 }]}>
            <Image source={{ uri: STADIUM_BG_URI }} style={styles.trainingFieldImage} />
            <LinearGradient colors={['rgba(9, 27, 62, 0.9)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFillObject} />
          </View>

        </View>
      </View>

      {/* 5. PRÓXIMO PARTIDO / EVENTO (DINÁMICO CON FILTRO FAMILIAR) */}
      <View style={styles.matchHeroCard}>
        <LinearGradient colors={['#091B3E', '#06132D']} style={styles.matchCardGradient}>
          
          <View style={styles.matchTopBadgeRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="trophy-outline" size={16} color={colors.accentGold} />
              <Text style={styles.matchSectionTitleTxt}>2. PRÓXIMO PARTIDO · {familyFilter.mode === 'all' ? 'TODOS LOS HIJOS' : activeAthlete.name.toUpperCase()}</Text>
            </View>
            <View style={[
              styles.statusPill, 
              currentMatchStatus === 'Confirmado' ? styles.statusPillGreen : 
              currentMatchStatus === 'Ausente' ? styles.statusPillRed : styles.statusPillYellow
            ]}>
              <Text style={styles.statusPillText}>
                {currentMatchStatus === 'Confirmado' ? '✅ ASISTENCIA CONFIRMADA' : 
                 currentMatchStatus === 'Ausente' ? '❌ NO ASISTIRÁ' : 'PENDIENTE DE RESPUESTA'}
              </Text>
            </View>
          </View>

          {/* COMPOSICIÓN DE ESCUDOS Y TITULAR DEL ENCUENTRO */}
          <View style={[styles.matchFacingRow, isDesktop && styles.matchFacingRowDesktop]}>
            <View style={styles.teamColLeft}>
              <Image source={{ uri: JESUITAS_SHIELD_URI }} style={styles.teamMatchShield} />
              <Text style={styles.teamMatchNameTxt}>CD Jesuitas</Text>
            </View>

            <View style={styles.versusCenterCol}>
              <Text style={styles.versusGoldenTxt}>VS</Text>
              <Text style={styles.matchDateGoldenTxt}>📅 {nextMatch.date} · {nextMatch.time}</Text>
            </View>

            <View style={styles.teamColRight}>
              <Image source={{ uri: LEVANTE_SHIELD_URI }} style={styles.teamMatchShield} />
              <Text style={styles.teamMatchNameTxt}>{nextMatch.title.includes('vs') ? nextMatch.title.split('vs')[1].trim() : nextMatch.team}</Text>
            </View>
          </View>

          {/* GRILLA DE DETALLES DEL ENCUENTRO Y DESPLAZAMIENTO */}
          <View style={[styles.matchDetailsAndTravelRow, isDesktop && { flexDirection: 'row' }]}>
            
            {/* Detalles del Encuentro */}
            <View style={{ flex: 1.2 }}>
              <View style={styles.matchDetailsBoxGrid}>
                <View style={styles.matchDetailItemRow}>
                  <Ionicons name="time-outline" size={16} color={colors.skyPrimary} />
                  <View>
                    <Text style={styles.matchDetailLbl}>Citación</Text>
                    <Text style={styles.matchDetailVal}>10:00 <Text style={{fontSize: 10, color: colors.textMuted}}>Vestuarios</Text></Text>
                  </View>
                </View>

                <View style={styles.matchDetailItemRow}>
                  <Ionicons name="football-outline" size={16} color={colors.skyPrimary} />
                  <View>
                    <Text style={styles.matchDetailLbl}>Campo</Text>
                    <Text style={styles.matchDetailVal}>Campo 1 <Text style={{fontSize: 10, color: colors.textMuted}}>CD Jesuitas</Text></Text>
                  </View>
                </View>

                <View style={styles.matchDetailItemRow}>
                  <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
                  <View>
                    <Text style={styles.matchDetailLbl}>Equipación</Text>
                    <Text style={styles.matchDetailVal}>1ª Equipación <Text style={{fontSize: 10, color: colors.textMuted}}>Azul Noche</Text></Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Columna Integrada de Desplazamiento "¿CÓMO LLEGAR?" */}
            <View style={[styles.travelColumnBox, isDesktop && { flex: 1 }]}>
              <TouchableOpacity 
                style={styles.travelToggleHeader}
                activeOpacity={0.8}
                onPress={() => setIsTravelAssistantOpen(!isTravelAssistantOpen)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="car-sport-outline" size={15} color={colors.skyPrimary} />
                  <Text style={styles.travelToggleHeaderTxt}>¿CÓMO LLEGAR?</Text>
                </View>
                <Ionicons name={isTravelAssistantOpen ? "chevron-up" : "chevron-down"} size={16} color={colors.skyGlow} />
              </TouchableOpacity>

              <View style={styles.travelSummaryList}>
                <View style={styles.travelRowSummary}>
                  <Ionicons name="car-outline" size={14} color={colors.white} />
                  <Text style={styles.travelRowSummaryTxt}>
                    <Text style={{fontWeight: '900', color: colors.white}}>En coche</Text> 15 min (12 km) · Salir a las <Text style={{color: colors.goldLight, fontWeight: '900'}}>09:40h</Text>
                  </Text>
                </View>

                <View style={styles.travelRowSummary}>
                  <Ionicons name="walk-outline" size={14} color={colors.white} />
                  <Text style={styles.travelRowSummaryTxt}>
                    <Text style={{fontWeight: '900', color: colors.white}}>Andando</Text> 35 min (2.3 km) · Salir a las <Text style={{color: colors.skyGlow, fontWeight: '900'}}>09:25h</Text>
                  </Text>
                </View>

                <TouchableOpacity style={styles.mapsGpsLinkRow} activeOpacity={0.8}>
                  <Ionicons name="navigate-circle" size={15} color={colors.skyPrimary} />
                  <Text style={styles.mapsGpsLinkTxt}>Abrir en Google Maps</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>

          {/* CONFIRMACIÓN BINARIA DE ASISTENCIA (EXACTO AL MOCKUP: SIN OPICÓN DUDA DE NINGÚN TIPO) */}
          <Text style={styles.confirmPromptTxt}>Confirma la asistencia de {activeAthlete.name.split(' ')[0]}</Text>

          <View style={styles.binaryBtnRow}>
            <TouchableOpacity 
              style={[styles.binaryBtnConfirm, currentMatchStatus === 'Confirmado' && styles.binaryBtnConfirmActive]}
              onPress={handleConfirmAttendance}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle" size={18} color={colors.white} />
              <Text style={styles.binaryBtnTxt}>✓ ASISTIRÁ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.binaryBtnRefuse, currentMatchStatus === 'Ausente' && styles.binaryBtnRefuseActive]}
              onPress={handlePressNoAttendance}
              activeOpacity={0.85}
            >
              <Ionicons name="close-circle" size={18} color={colors.white} />
              <Text style={styles.binaryBtnTxt}>✕ NO ASISTIRÁ</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </View>

      {/* 6. GRID DE 3 COLUMNAS INFERIORES EN ESCRITORIO (ENTRENAMIENTOS, PENDIENTES, ÚLTIMO PARTIDO) */}
      <View style={[styles.bottomGrid3Cols, isDesktop && { flexDirection: 'row' }]}>
        
        {/* Columna 1: CALENDARIO DEPORTIVO FAMILIAR */}
        <View style={[styles.bottomColCard, isDesktop && { flex: 1.2 }]}>
          <Text style={styles.bottomColTitleTxt}>3. CALENDARIO</Text>

          {/* Selector de Modo: Todos los Hijos vs Hijo Seleccionado */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10, marginTop: 4 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <TouchableOpacity
                style={[
                  styles.calendarFilterPill,
                  familyFilter.mode === 'all' && styles.calendarFilterPillActive
                ]}
                onPress={() => setFamilyFilter({ mode: 'all' })}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.calendarFilterPillTxt,
                  familyFilter.mode === 'all' && styles.calendarFilterPillTxtActive
                ]}>
                  👨‍👩‍👧‍👦 Todos los hijos
                </Text>
              </TouchableOpacity>

              {DEMO_ATHLETES.map((ath) => {
                const isSel = familyFilter.mode === 'child' && familyFilter.childId === ath.id;
                return (
                  <TouchableOpacity
                    key={ath.id}
                    style={[
                      styles.calendarFilterPill,
                      isSel && styles.calendarFilterPillActive
                    ]}
                    onPress={() => setFamilyFilter({ mode: 'child', childId: ath.id })}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.calendarFilterPillTxt,
                      isSel && styles.calendarFilterPillTxtActive
                    ]}>
                      {ath.name} ({ath.team})
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          
          <View style={styles.bottomColContentList}>
            {activeEvents.map((evt) => (
              <View key={evt.id} style={styles.bottomTrainingItemRow}>
                <Ionicons 
                  name={evt.type === 'Partido' ? 'football-outline' : evt.type === 'Torneo' ? 'trophy-outline' : evt.type === 'Convocatoria' ? 'clipboard-outline' : 'calendar-outline'} 
                  size={15} 
                  color={evt.type === 'Partido' ? colors.accentGold : evt.type === 'Torneo' ? colors.skyGlow : colors.skyPrimary} 
                />
                <View style={{ flex: 1, paddingRight: 4 }}>
                  <Text style={styles.bottomTrainingDateTxt} numberOfLines={1}>{evt.title}</Text>
                  <Text style={styles.bottomTrainingSubTxt}>{evt.date} · {evt.time}</Text>
                </View>
                <View style={styles.childEventBadgeBox}>
                  <Text style={styles.childEventBadgeTxt}>{evt.badgeTag}</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.bottomColLinkRow} activeOpacity={0.8} onPress={() => router.push('/(drawer)/calendario')}>
            <Ionicons name="calendar" size={13} color={colors.skyPrimary} />
            <Text style={styles.bottomColLinkTxt}>Ver calendario completo</Text>
            <Ionicons name="chevron-forward" size={13} color={colors.skyPrimary} />
          </TouchableOpacity>
        </View>

        {/* Columna 2: Pendientes */}
        <View style={[styles.bottomColCard, isDesktop && { flex: 1 }]}>
          <Text style={styles.bottomColTitleTxt}>4. PENDIENTES</Text>

          <View style={styles.bottomColContentList}>
            <View style={styles.pendingItemMiniRow}>
              <Ionicons name="notifications" size={14} color={colors.accentGold} />
              <Text style={styles.pendingItemMiniTxt}>1 comunicado nuevo</Text>
              <View style={styles.dotGoldAlert} />
            </View>

            <View style={styles.pendingItemMiniRow}>
              <Ionicons name="card-outline" size={14} color={colors.skyPrimary} />
              <Text style={styles.pendingItemMiniTxt}>Cuota pendiente: Septiembre</Text>
              <View style={styles.dotGoldAlert} />
            </View>

            <View style={styles.pendingItemMiniRow}>
              <Ionicons name="document-text-outline" size={14} color={colors.accentRed} />
              <Text style={styles.pendingItemMiniTxt}>Autorización de imagen pendiente</Text>
              <View style={styles.dotGoldAlert} />
            </View>
          </View>

          <TouchableOpacity style={styles.bottomColLinkRow} activeOpacity={0.8} onPress={() => router.push('/(drawer)/avisos')}>
            <Text style={styles.bottomColLinkTxt}>Ver todos los pendientes</Text>
            <Ionicons name="chevron-forward" size={13} color={colors.skyPrimary} />
          </TouchableOpacity>
        </View>

        {/* Columna 3: Último partido */}
        <View style={[styles.bottomColCard, isDesktop && { flex: 1 }]}>
          <Text style={styles.bottomColTitleTxt}>5. ÚLTIMO PARTIDO</Text>

          <View style={styles.lastResultMatchBox}>
            <View style={styles.lastResultTeamsFacingRow}>
              <Image source={{ uri: JESUITAS_SHIELD_URI }} style={{ width: 24, height: 28 }} />
              <Text style={styles.lastResultTeamNameTxt}>CD Jesuitas</Text>
              <Text style={styles.lastResultScoreTxt}>3 - 1</Text>
              <Text style={styles.lastResultTeamNameTxt}>Valencia CF C</Text>
              <Image source={{ uri: VALENCIA_SHIELD_URI }} style={{ width: 24, height: 28 }} />
            </View>

            <View style={styles.lastResultWinBadgeRow}>
              <View style={styles.winBadgeGreen}>
                <Text style={styles.winBadgeGreenTxt}>VICTORIA  +3 puntos</Text>
              </View>
            </View>

            <View style={styles.leaguePositionFooterRow}>
              <Ionicons name="ribbon-outline" size={14} color={colors.accentGold} />
              <Text style={styles.leaguePositionFooterTxt}>3.º Clasificado · 24 puntos 📈</Text>
            </View>
          </View>
        </View>

      </View>

      {/* 7. BLOQUE MI ZONA COMO BANNER PREMIUM DE CIERRE CON EL CROMO Y LAS INSIGNIAS DEL JUGADOR */}
      <TouchableOpacity 
        style={styles.miZonaClosingBannerCard} 
        activeOpacity={0.9}
        onPress={() => router.push('/(drawer)/mi-zona')}
      >
        <LinearGradient colors={['#0B224F', '#071A3D']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.miZonaBannerGradient}>
          
          <View style={styles.miZonaBannerLeftContent}>
            <View style={styles.miZonaStarHeaderRow}>
              <Text style={{ fontSize: 22 }}>🌟</Text>
              <Text style={styles.miZonaBannerMainTitle}>MI ZONA</Text>
            </View>
            <Text style={styles.miZonaBannerSubTitle}>El cromo, retos e insignias de {activeAthlete.name.split(' ')[0]}</Text>
          </View>

          {/* Cromo Miniatura FIFA Gold e Insignias Doradas */}
          <View style={styles.miZonaBannerRightVisuals}>
            <View style={styles.miniCromoCardBox}>
              <Text style={{ fontSize: 9, fontWeight: '900', color: colors.goldLight }}>88</Text>
              <Text style={{ fontSize: 8, fontWeight: '900', color: colors.white }}>{activeAthlete.name.split(' ')[0]}</Text>
            </View>

            <View style={styles.badgesRowMini}>
              <Ionicons name="trophy" size={16} color={colors.accentGold} />
              <Ionicons name="star" size={16} color={colors.skyGlow} />
              <Ionicons name="shield-checkmark" size={16} color={colors.accentGreen} />
            </View>

            <View style={styles.miZonaCircleArrowBtn}>
              <Ionicons name="arrow-forward" size={16} color={colors.navyDark} />
            </View>
          </View>

        </LinearGradient>
      </TouchableOpacity>

      {/* 8. FOOTER CORPORATIVO DISCRETO OBLIGATORIO */}
      <View style={styles.footerContainerRow}>
        <Text style={styles.footerCompilationTxt}>COMPILACIÓN: FAMILIA-INICIO-03</Text>
        <Text style={styles.footerMottoTxt}>CD JESUITAS · FORJANDO FUTURO</Text>
        <Image source={{ uri: JESUITAS_SHIELD_URI }} style={{ width: 16, height: 18 }} />
      </View>

      {/* MODAL OBLIGATORIO: MOTIVO DE AUSENCIA A PARTIDO ("NO ASISTIRÁ") */}
      <Modal visible={absenceMatchModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Indica el motivo de la ausencia</Text>
            <Text style={styles.modalSub}>Es obligatorio indicar la razón para notificar la baja de {activeAthlete.name.split(' ')[0]} al partido.</Text>

            <View style={styles.reasonOptionGroup}>
              {[
                'Enfermedad o lesión',
                'Estudios',
                'Compromiso familiar',
                'Viaje',
                'Otro motivo'
              ].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.reasonOption, selectedReasonOption === option && styles.reasonOptionActive]}
                  onPress={() => setSelectedReasonOption(option)}
                  activeOpacity={0.8}
                >
                  <Ionicons 
                    name={selectedReasonOption === option ? "radio-button-on" : "radio-button-off"} 
                    size={18} 
                    color={selectedReasonOption === option ? colors.skyPrimary : colors.textMuted} 
                  />
                  <Text style={[styles.reasonText, selectedReasonOption === option && styles.reasonTextActive]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedReasonOption === 'Otro motivo' && (
              <View style={styles.inputBoxContainer}>
                <Text style={styles.inputLabel}>Describe el motivo (obligatorio):</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Escribe el motivo..."
                  placeholderTextColor={colors.textMuted}
                  value={customOtherReason}
                  onChangeText={setCustomOtherReason}
                />
              </View>
            )}

            {selectedReasonOption !== '' && selectedReasonOption !== 'Otro motivo' && (
              <View style={styles.inputBoxContainer}>
                <Text style={styles.inputLabel}>Observaciones adicionales (opcional):</Text>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder="Detalles adicionales para el entrenador..."
                  placeholderTextColor={colors.textMuted}
                  value={optionalObservations}
                  onChangeText={setOptionalObservations}
                />
              </View>
            )}

            <View style={styles.modalBtnRow}>
              <TouchableOpacity 
                style={styles.modalBtnCancel} 
                onPress={() => setAbsenceMatchModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBtnCancelText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.modalBtnSend, 
                  (!selectedReasonOption || (selectedReasonOption === 'Otro motivo' && !customOtherReason.trim())) && styles.modalBtnDisabled
                ]} 
                onPress={handleSaveAbsenceReason}
                disabled={!selectedReasonOption || (selectedReasonOption === 'Otro motivo' && !customOtherReason.trim())}
                activeOpacity={0.85}
              >
                <Text style={styles.modalBtnSendText}>CONFIRMAR AUSENCIA</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* MODAL: AVISAR DE UNA AUSENCIA A ENTRENAMIENTO */}
      <Modal visible={trainingAbsenceModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Aviso de Ausencia a Entrenamiento</Text>
            <Text style={styles.modalSub}>Informa al cuerpo técnico sobre la falta de {activeAthlete.name.split(' ')[0]}</Text>

            <View style={styles.reasonOptionGroup}>
              {['Motivo Médico / Enfermedad', 'Examen / Estudios', 'Viaje Familiar'].map((r, i) => (
                <TouchableOpacity 
                  key={i} 
                  style={[styles.reasonOption, trainingAbsenceReason === r && styles.reasonOptionActive]}
                  onPress={() => setTrainingAbsenceReason(r)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.reasonText, trainingAbsenceReason === r && styles.reasonTextActive]}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity 
                style={styles.modalBtnCancel} 
                onPress={() => setTrainingAbsenceModalVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalBtnCancelText}>CANCELAR</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalBtnSend} 
                onPress={() => { setTrainingAbsenceModalVisible(false); }}
                activeOpacity={0.85}
              >
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
  content: { padding: 14, paddingBottom: 60 },
  contentTablet: { maxWidth: 1100, alignSelf: 'center', width: '100%' },

  compilationBadgeContainer: { alignItems: 'center', marginBottom: 6 },
  compilationBadgeTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  // TOP BAR COMPACTA EXCLUSIVA
  topBarContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#05122E', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: 14, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)', marginBottom: 10
  },
  topBarLeft: { flexDirection: 'row', alignItems: 'center' },
  topBarShield: { width: 22, height: 26, marginRight: 8 },
  topBarBrand: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },
  topBarSubBrand: { color: colors.skyPrimary, fontSize: 11, fontWeight: '700' },
  changeSportHeaderBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(79, 195, 247, 0.12)', paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 10, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)'
  },
  changeSportHeaderBtnTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '800' },

  // HERO HEADER BANNER CON FOTO Y SALUDO
  heroBannerCard: { borderRadius: 18, overflow: 'hidden', marginBottom: 12, borderWidth: 1, borderColor: colors.borderGlow },
  heroBannerBgImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%', resizeMode: 'cover' },
  heroBannerGradient: { padding: 16 },
  heroHeaderContent: {},
  heroGreetingText: { color: colors.white, fontSize: 20, fontWeight: '900' },
  heroSubText: { color: colors.skyGlow, fontSize: 12, fontWeight: '600', marginTop: 2 },
  heroTeamTagRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, alignSelf: 'flex-start' },
  heroTeamTagTxt: { color: colors.goldLight, fontSize: 11, fontWeight: '800' },

  sectionHeaderRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  sectionTitleTxt: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5 },
  sectionSubTitleTxt: { fontSize: 11, color: colors.textMuted, marginTop: 1 },
  manageKidsHeaderBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  manageKidsHeaderBtnTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '700' },

  // SELECTOR DE DEPORTISTAS RÉPLICA DE CAPTURA DE REFERENCIA
  athletesGridRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  athletesGridRowMobile: { flexDirection: 'column' },
  athleteCardRef: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 27, 62, 0.85)',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  athleteCardRefActive: {
    borderColor: colors.skyPrimary,
    backgroundColor: 'rgba(14, 41, 90, 0.95)',
    shadowColor: colors.skyPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  jersey3DContainer: {
    width: 90,
    height: 120,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  jersey3DImg: {
    width: '100%',
    height: '100%',
  },
  jerseyIntegratedDorsalTxt: {
    position: 'absolute',
    top: '25%',
    color: '#071A3D',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  jerseyIntegratedDorsalTxtTwoDigits: {
    fontSize: 23,
    letterSpacing: -1,
  },
  athleteRightCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  athleteAvatarImg: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginBottom: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  athleteNameTxt: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 1,
  },
  athleteNameTxtActive: {
    color: colors.skyGlow,
  },
  athleteTeamTxt: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  athleteSportRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  athleteSportTxt: {
    color: colors.textMuted,
    fontSize: 10.5,
    fontWeight: '600',
  },
  selectActionPill: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 84,
  },
  selectActionPillActive: {
    backgroundColor: colors.skyPrimary,
  },
  selectActionPillOutline: {
    borderWidth: 1,
    borderColor: colors.skyPrimary,
    backgroundColor: 'transparent',
  },
  selectActionPillTxt: {
    fontSize: 11,
    fontWeight: '800',
  },
  selectActionPillTxtActive: {
    color: colors.navyDark,
  },
  selectActionPillTxtOutline: {
    color: colors.skyPrimary,
  },

  // 1. ENTRENAMIENTOS DE ESTA SEMANA (BLOQUE HERO CON IMAGEN DE CAMPO ILUMINADO EN MITAD DERECHA)
  trainingHeroCard: { borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 14 },
  trainingHeroFlexRow: { padding: 14 },
  trainingHeroLeft: {},
  trainingHeaderBadgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  trainingHeaderTitle: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  tomorrowBadge: { backgroundColor: colors.accentGreen, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tomorrowBadgeTxt: { color: colors.navyDark, fontSize: 9, fontWeight: '900' },
  trainingMainTimeTxt: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 10 },
  trainingDetailsList: { gap: 6, marginBottom: 12 },
  trainingDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  trainingDetailTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  absenceBtnNotice: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(79, 195, 247, 0.12)', borderWidth: 1, borderColor: colors.skyPrimary,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, alignSelf: 'flex-start'
  },
  absenceBtnNoticeTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '800' },

  trainingHeroRight: { width: '100%', minWidth: 260, borderRadius: 14, overflow: 'hidden', position: 'relative' },
  trainingFieldImage: { width: '100%', height: '100%', resizeMode: 'cover' },

  // 2. PRÓXIMO PARTIDO COMO COMPOSICIÓN DEPORTIVA
  matchHeroCard: { borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 14 },
  matchCardGradient: { padding: 16 },
  matchTopBadgeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  matchSectionTitleTxt: { color: colors.accentGold, fontSize: 10, fontWeight: '900', letterSpacing: 1 },

  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusPillGreen: { backgroundColor: 'rgba(16, 185, 129, 0.25)', borderWidth: 1, borderColor: colors.accentGreen },
  statusPillRed: { backgroundColor: 'rgba(239, 68, 68, 0.25)', borderWidth: 1, borderColor: colors.accentRed },
  statusPillYellow: { backgroundColor: 'rgba(245, 158, 11, 0.25)', borderWidth: 1, borderColor: colors.accentGold },
  statusPillText: { color: '#fff', fontSize: 10, fontWeight: '900' },

  // ENFRENTAMIENTO DE ESCUDOS
  matchFacingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10 },
  matchFacingRowDesktop: { paddingHorizontal: 20 },
  teamColLeft: { alignItems: 'center', flex: 1 },
  teamColRight: { alignItems: 'center', flex: 1 },
  teamMatchShield: { width: 50, height: 60, marginBottom: 6 },
  teamMatchNameTxt: { color: colors.white, fontSize: 15, fontWeight: '900', textAlign: 'center' },

  versusCenterCol: { alignItems: 'center', paddingHorizontal: 12 },
  versusGoldenTxt: { color: colors.goldLight, fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  matchDateGoldenTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginTop: 2, textAlign: 'center' },

  absenceReasonSummaryBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.4)', padding: 8, borderRadius: 8, marginVertical: 8 },
  absenceReasonSummaryTxt: { color: colors.white, fontSize: 11 },

  matchDetailsAndTravelRow: { gap: 12, marginTop: 14, marginBottom: 14 },
  matchDetailsBoxGrid: { backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12, gap: 8 },
  matchDetailItemRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  matchDetailLbl: { color: colors.textMuted, fontSize: 10, fontWeight: '700' },
  matchDetailVal: { color: colors.white, fontSize: 12, fontWeight: '800' },

  travelColumnBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)' },
  travelToggleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  travelToggleHeaderTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  travelSummaryList: { marginTop: 10, gap: 6 },
  travelRowSummary: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  travelRowSummaryTxt: { color: colors.textMuted, fontSize: 10 },
  mapsGpsLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  mapsGpsLinkTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '800', textDecorationLine: 'underline' },

  confirmPromptTxt: { color: colors.white, fontSize: 12, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  binaryBtnRow: { flexDirection: 'row', gap: 10 },
  binaryBtnConfirm: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#059669', paddingVertical: 12, borderRadius: 12 },
  binaryBtnConfirmActive: { borderWidth: 2, borderColor: '#fff' },
  binaryBtnRefuse: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#DC2626', paddingVertical: 12, borderRadius: 12 },
  binaryBtnRefuseActive: { borderWidth: 2, borderColor: '#fff' },
  binaryBtnTxt: { color: colors.white, fontSize: 12, fontWeight: '900' },

  // GRID 3 COLUMNAS INFERIORES
  bottomGrid3Cols: { gap: 10, marginBottom: 14 },
  bottomColCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  bottomColTitleTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 0.5, marginBottom: 10 },
  bottomColContentList: { gap: 8, marginBottom: 10 },

  bottomTrainingItemRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.2)', padding: 8, borderRadius: 10 },
  bottomTrainingDateTxt: { color: colors.white, fontSize: 11, fontWeight: '800' },
  bottomTrainingSubTxt: { color: colors.textMuted, fontSize: 9 },
  nextTagSmall: { backgroundColor: colors.skyPrimary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  nextTagSmallTxt: { color: colors.navyDark, fontSize: 8, fontWeight: '900' },

  bottomColLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  bottomColLinkTxt: { color: colors.skyPrimary, fontSize: 10, fontWeight: '800' },

  pendingItemMiniRow: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(0,0,0,0.2)', padding: 8, borderRadius: 10 },
  pendingItemMiniTxt: { color: colors.white, fontSize: 11, flex: 1 },
  dotGoldAlert: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accentGold },

  lastResultMatchBox: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 10, gap: 8 },
  lastResultTeamsFacingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  lastResultTeamNameTxt: { color: colors.white, fontSize: 11, fontWeight: '800' },
  lastResultScoreTxt: { color: colors.goldLight, fontSize: 16, fontWeight: '900' },
  lastResultWinBadgeRow: { alignItems: 'center' },
  winBadgeGreen: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  winBadgeGreenTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },
  leaguePositionFooterRow: { flexDirection: 'row', alignItems: 'center', gap: 6, justifyContent: 'center' },
  leaguePositionFooterTxt: { color: colors.textMuted, fontSize: 10, fontWeight: '700' },

  // BANNER DE CIERRE MI ZONA
  miZonaClosingBannerCard: { borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: colors.skyPrimary, marginBottom: 16 },
  miZonaBannerGradient: { padding: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  miZonaBannerLeftContent: { flex: 1 },
  miZonaStarHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miZonaBannerMainTitle: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 0.8 },
  miZonaBannerSubTitle: { color: colors.skyGlow, fontSize: 10, marginTop: 2 },
  miZonaBannerRightVisuals: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  miniCromoCardBox: { width: 32, height: 42, borderRadius: 6, backgroundColor: colors.accentGold, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.goldLight },
  badgesRowMini: { flexDirection: 'row', gap: 4 },
  miZonaCircleArrowBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },

  // FOOTER CORPORATIVO DISCRETO
  footerContainerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  footerCompilationTxt: { color: colors.skyPrimary, fontSize: 9, fontWeight: '900' },
  footerMottoTxt: { color: colors.textMuted, fontSize: 9, fontWeight: '800' },

  loadingBox: { padding: 30, alignItems: 'center' },
  loadingText: { color: colors.skyGlow, marginTop: 10, fontSize: 12 },
  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', gap: 8 },
  errorText: { color: colors.accentRed, fontSize: 12 },

  // MODAL
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: colors.navyCard, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginBottom: 4 },
  modalSub: { color: colors.textMuted, fontSize: 11, marginBottom: 14 },
  reasonOptionGroup: { gap: 6, marginBottom: 14 },
  reasonOption: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  reasonOptionActive: { backgroundColor: colors.navyDark, borderColor: colors.skyPrimary },
  reasonText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  reasonTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  inputBoxContainer: { marginBottom: 14 },
  inputLabel: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  textInputStyle: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', borderRadius: 10, padding: 10, color: colors.white, fontSize: 12 },
  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalBtnCancel: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  modalBtnCancelText: { color: colors.white, fontWeight: '800', fontSize: 11 },
  modalBtnSend: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: colors.accentRed, alignItems: 'center' },
  modalBtnDisabled: { opacity: 0.4 },
  modalBtnSendText: { color: colors.white, fontWeight: '900', fontSize: 11 },

  // CALENDARIO FAMILIAR STYLES
  calendarFilterPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  calendarFilterPillActive: {
    backgroundColor: colors.skyPrimary,
    borderColor: colors.skyPrimary,
  },
  calendarFilterPillTxt: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
  },
  calendarFilterPillTxtActive: {
    color: colors.navyDark,
    fontWeight: '900',
  },
  childEventBadgeBox: {
    backgroundColor: 'rgba(79, 195, 247, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGlow,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'center',
  },
  childEventBadgeTxt: {
    color: colors.skyGlow,
    fontSize: 9,
    fontWeight: '800',
  },

  familyModePillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(79, 195, 247, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGlow,
  },
  familyModePillBtnActive: {
    backgroundColor: colors.skyPrimary,
    borderColor: colors.skyPrimary,
  },
  familyModePillBtnTxt: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.skyPrimary,
  },
  familyModePillBtnTxtActive: {
    color: colors.navyDark,
  },
});
