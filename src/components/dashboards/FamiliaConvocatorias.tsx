import React, { useState, Component, ErrorInfo, ReactNode } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput,
  useWindowDimensions,
  Linking,
  ActivityIndicator
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// TODO: guardar respuesta y motivo en Supabase cuando se conecte convocatorias reales.

// Colores corporativos institucionales de CD Jesuitas (Estilo Apple Premium)
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

const DEFAULT_SCHOOL_ADDRESS = 'Puerta del Colegio (Avda. Cortes Valencianas nº 1)';

// Tipo estricto de asistencia aprobado (CONFIRMACIÓN EXPLICITA: "Duda" ha sido eliminada por completo)
export type AttendanceStatus = 'PENDIENTE' | 'ASISTIRA' | 'NO_ASISTIRA';

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface CallupHistoryItem {
  id: string;
  date: string;
  rival: string;
  result: string;
  status: string;
}

interface CallupData {
  childName: string;
  team: string;
  rival: string;
  competition: string;
  date: string;
  matchTime: string;
  citationTime: string;
  location: string;
  dressingRoom: string;
  kit: string;
  weather: string;
  carDeparture: string;
  delegateName: string;
  delegatePhone: string;
  coachNote: string;
  checklist: ChecklistItem[];
  history: CallupHistoryItem[];
}

const INITIAL_CALLUPS: Record<string, CallupData> = {
  p1: {
    childName: 'Pablo Martínez',
    team: 'Cadete B (Fútbol 11)',
    rival: 'Levante UD B',
    competition: 'LIGA PREFERENTE CADETE • JORNADA 13',
    date: 'Sábado 10 de Mayo 2026',
    matchTime: '11:00h',
    citationTime: '10:00h en Vestuarios',
    location: 'Campo 1 - CD Jesuitas (Valencia)',
    dressingRoom: 'Vestuario Local Nº 2 (Duchas preparadas)',
    kit: '1ª Equipación Azul Noche (Camiseta, Pantalón y Medias)',
    weather: '⛅ 18°C • Sol y nubes • 10% prob. lluvia',
    carDeparture: '09:40h (15 min viaje desde casa)',
    delegateName: 'Javier Martínez (Delegado Cadete B)',
    delegatePhone: '612 345 678',
    coachNote: '📢 Indicación del Míster: Acudir vestidos con el chándal oficial sobre la 1ª equipación. Haber desayunado mínimo 2 horas antes.',
    checklist: [
      { id: 'c1', label: '👟 Botas de fútbol (Tacos césped artificial)', checked: true },
      { id: 'c2', label: '🦵 Espinilleras obligatorias', checked: true },
      { id: 'c3', label: '🪪 DNI / Ficha Federativa FFCV', checked: true },
      { id: 'c4', label: '🎽 2ª Equipación Blanca en la mochila (por si acaso)', checked: false },
      { id: 'c5', label: '🧴 Botella de agua / bebida isotónica', checked: true },
      { id: 'c6', label: '🩴 Chancletas y toalla de ducha', checked: false }
    ],
    history: [
      { id: 'h1', date: '3 Mayo', rival: 'Alboraya UD', result: 'Victoria 2-1', status: 'Asistió' },
      { id: 'h2', date: '26 Abril', rival: 'Torrent CF', result: 'Empate 0-0', status: 'Asistió' },
      { id: 'h3', date: '19 Abril', rival: 'Valencia CF B', result: 'Derrota 1-2', status: 'Asistió' },
    ]
  },
  p2: {
    childName: 'Hugo Martínez',
    team: 'Infantil A (Fútbol Sala)',
    rival: 'El Pilar Futsal',
    competition: 'LIGA AUTONÓMICA FUTSAL • JORNADA 13',
    date: 'Sábado 10 de Mayo 2026',
    matchTime: '11:30h',
    citationTime: '10:45h en Pista',
    location: 'Pabellón Colegio Jesuitas',
    dressingRoom: 'Vestuario Pistas Nº 1',
    kit: '1ª Equipación Futsal Blanca/Azul',
    weather: '☀️ 21°C • Pista Cubierta',
    carDeparture: '09:45h (Coincide con Pablo)',
    delegateName: 'Manolo Ruíz (Delegado Futsal)',
    delegatePhone: '655 444 333',
    coachNote: '📢 Indicación del Míster: Traer zapatillas de suela lisa para la pista del pabellón.',
    checklist: [
      { id: 'c1', label: '👟 Zapatillas de fútbol sala (suela lisa)', checked: true },
      { id: 'c2', label: '🦵 Espinilleras de fútbol sala', checked: true },
      { id: 'c3', label: '🧴 Botella de agua personal', checked: true },
      { id: 'c4', label: '🩴 Chancletas para ducha', checked: true }
    ],
    history: [
      { id: 'h1', date: '3 Mayo', rival: 'Dominicos', result: 'Victoria 4-2', status: 'Asistió' },
      { id: 'h2', date: '26 Abril', rival: 'Exposición', result: 'Victoria 3-1', status: 'Asistió' },
    ]
  }
};

const ABSENCE_QUICK_REASONS = [
  'Enfermedad',
  'Lesión',
  'Viaje o compromiso familiar',
  'Motivo académico',
  'Otro motivo'
];

// Error Boundary local anti-pantalla-blanca
export class FamiliaConvocatoriasErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CRITICAL ERROR en FamiliaConvocatorias:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorBoundaryBox}>
          <Ionicons name="alert-circle-outline" size={54} color={colors.accentRed} style={{ marginBottom: 12 }} />
          <Text style={styles.errorBoundaryTitle}>No se han podido cargar las convocatorias.</Text>
          <TouchableOpacity 
            style={styles.retryBtn} 
            onPress={() => this.setState({ hasError: false, error: null })}
          >
            <Text style={styles.retryBtnTxt}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

export function FamiliaConvocatoriasContent() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // Estados de control de datos y carga
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Selección del hijo activo (Pablo 'p1' o Hugo 'p2')
  const [selectedChildKey, setSelectedChildKey] = useState<'p1' | 'p2'>('p1');
  const [activeTab, setActiveTab] = useState<'proxima' | 'historial'>('proxima');

  // Estados independientes de asistencia por hijo
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({
    p1: 'ASISTIRA',
    p2: 'PENDIENTE'
  });
  const [absenceReasonMap, setAbsenceReasonMap] = useState<Record<string, string>>({
    p1: '',
    p2: ''
  });

  // Checklist independiente por hijo
  const [checklistsMap, setChecklistsMap] = useState<Record<string, ChecklistItem[]>>({
    p1: INITIAL_CALLUPS.p1.checklist,
    p2: INITIAL_CALLUPS.p2.checklist
  });

  // Modales
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [selectedReasonOption, setSelectedReasonOption] = useState<string>('');
  const [customReasonText, setCustomReasonText] = useState<string>('');
  const [absenceError, setAbsenceError] = useState<string | null>(null);

  // Modal Coche Compartido
  const [isOfferCarModalOpen, setIsOfferCarModalOpen] = useState(false);
  const [offeredSeats, setOfferedSeats] = useState(2);
  const [selectedContactFamily, setSelectedContactFamily] = useState<any>(null);

  // Lista Coche Compartido
  const [carpoolList, setCarpoolList] = useState([
    { id: 'cp1', family: 'Familia de Dani García', type: 'offer', seats: 2, pickup: DEFAULT_SCHOOL_ADDRESS, phone: '677888999' },
    { id: 'cp2', family: 'Familia de Lucas Pérez', type: 'need', seats: 1, pickup: DEFAULT_SCHOOL_ADDRESS, phone: '611222333' }
  ]);

  // Selección segura de la convocatoria del hijo activo
  const callup: CallupData = INITIAL_CALLUPS[selectedChildKey] || INITIAL_CALLUPS.p1;
  const currentStatus: AttendanceStatus = attendanceMap[selectedChildKey] || 'PENDIENTE';
  const currentReason: string = absenceReasonMap[selectedChildKey] || '';
  const currentChecklist: ChecklistItem[] = checklistsMap[selectedChildKey] || callup.checklist || [];

  const childFirstName = callup?.childName ? callup.childName.split(' ')[0] : 'Pablo';

  // Cambiar checklist individual
  const toggleChecklistItem = (itemId: string) => {
    setChecklistsMap(prev => ({
      ...prev,
      [selectedChildKey]: (prev[selectedChildKey] || []).map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    }));
  };

  // Confirmar Asistencia Directa ("Asistirá")
  const handleConfirmAttendance = () => {
    setAttendanceMap(prev => ({ ...prev, [selectedChildKey]: 'ASISTIRA' }));
  };

  // Abrir Modal de Ausencia ("No asistirá")
  const handleOpenAbsenceModal = () => {
    setSelectedReasonOption(currentReason.startsWith('Otro motivo:') ? 'Otro motivo' : currentReason || '');
    setCustomReasonText(currentReason.startsWith('Otro motivo:') ? currentReason.replace('Otro motivo: ', '') : '');
    setAbsenceError(null);
    setIsAbsenceModalOpen(true);
  };

  // Confirmar la Ausencia en el Modal
  const handleConfirmAbsence = () => {
    if (!selectedReasonOption) {
      setAbsenceError('Por favor, selecciona un motivo para la ausencia.');
      return;
    }

    let finalReason = selectedReasonOption;
    if (selectedReasonOption === 'Otro motivo') {
      if (!customReasonText.trim()) {
        setAbsenceError('Por favor, escribe el motivo de la ausencia.');
        return;
      }
      finalReason = `Otro motivo: ${customReasonText.trim()}`;
    }

    setAttendanceMap(prev => ({ ...prev, [selectedChildKey]: 'NO_ASISTIRA' }));
    setAbsenceReasonMap(prev => ({ ...prev, [selectedChildKey]: finalReason }));
    setIsAbsenceModalOpen(false);
    setAbsenceError(null);
  };

  // Publicar Coche Compartido
  const handlePublishMyCar = () => {
    const newOffer = {
      id: Date.now().toString(),
      family: `Familia de ${callup.childName}`,
      type: 'offer',
      seats: offeredSeats,
      pickup: DEFAULT_SCHOOL_ADDRESS,
      phone: '612345678'
    };
    setCarpoolList(prev => [newOffer, ...prev]);
    setIsOfferCarModalOpen(false);
  };

  const handleCallParentDirect = (phone: string) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`).catch(() => {});
  };

  const handleWhatsAppParentDirect = (phone: string, familyName: string) => {
    if (!phone) return;
    const text = `Hola, soy la familia de ${callup.childName}. Te contacto por la plaza libre en coche para el partido vs ${callup.rival}.`;
    Linking.openURL(`https://wa.me/34${phone}?text=${encodeURIComponent(text)}`).catch(() => {});
  };

  const handleOpenMaps = () => {
    if (!callup?.location) return;
    const url = `https://maps.apple.com/?q=${encodeURIComponent(callup.location)}`;
    Linking.openURL(url).catch(() => {});
  };

  const handleCallDelegate = () => {
    if (!callup?.delegatePhone) return;
    Linking.openURL(`tel:${callup.delegatePhone}`).catch(() => {});
  };

  const handleWhatsAppCoach = () => {
    const text = `Hola Míster, soy la familia de ${callup.childName}. Te confirmo la asistencia para el partido vs ${callup.rival}.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    Linking.openURL(url).catch(() => {});
  };

  // 1. ESTADO DE CARGA INSTITUCIONAL
  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="large" color={colors.skyPrimary} />
        <Text style={styles.stateText}>Cargando convocatorias...</Text>
      </View>
    );
  }

  // 2. ESTADO DE ERROR
  if (hasError) {
    return (
      <View style={styles.stateContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.accentRed} style={{ marginBottom: 12 }} />
        <Text style={styles.stateTitle}>No se han podido cargar las convocatorias</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => { setHasError(false); setIsLoading(false); }}>
          <Text style={styles.retryBtnTxt}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 3. ESTADO VACÍO (SIN CONVOCATORIAS)
  if (!callup) {
    return (
      <View style={styles.stateContainer}>
        <Ionicons name="calendar-outline" size={48} color={colors.skyPrimary} style={{ marginBottom: 12 }} />
        <Text style={styles.stateTitle}>No hay convocatorias disponibles</Text>
        <Text style={styles.stateSub}>Cuando el entrenador publique una convocatoria aparecerá aquí.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.childSelectorRow}>
        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p1' && styles.childBtnActive]}
          onPress={() => setSelectedChildKey('p1')}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p1' && styles.childBtnTextActive]}>👦 Pablo (Cadete B)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p2' && styles.childBtnActive]}
          onPress={() => setSelectedChildKey('p2')}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p2' && styles.childBtnTextActive]}>👦 Hugo (Infantil A Futsal)</Text>
        </TouchableOpacity>
      </View>

      {/* 2. PESTAÑAS: PRÓXIMA CONVOCATORIA vs HISTORIAL */}
      <View style={styles.tabsHeaderRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'proxima' && styles.tabBtnActive]}
          onPress={() => setActiveTab('proxima')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'proxima' && styles.tabBtnTextActive]}>📋 Convocatoria del Hijo</Text>
          {activeTab === 'proxima' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'historial' && styles.tabBtnActive]}
          onPress={() => setActiveTab('historial')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'historial' && styles.tabBtnTextActive]}>📊 Historial Temporada</Text>
          {activeTab === 'historial' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'proxima' ? (
        <>
          {/* 3. HERO BANNER CONFIRMACIÓN DEL HIJO */}
          <View style={styles.statusHeroBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.statusHeroTitle}>CONVOCATORIA PARA {callup.childName.toUpperCase()}:</Text>
              <Text style={styles.statusHeroSub}>¡CONVOCADO PARA EL PARTIDO DEL SÁBADO!</Text>
            </View>
            
            <View style={[
              styles.statusBadge,
              currentStatus === 'ASISTIRA' ? styles.statusConfirmed :
              currentStatus === 'NO_ASISTIRA' ? styles.statusAbsent : styles.statusPending
            ]}>
              <Ionicons 
                name={
                  currentStatus === 'ASISTIRA' ? 'checkmark-circle' :
                  currentStatus === 'NO_ASISTIRA' ? 'close-circle' : 'time-outline'
                } 
                size={16} 
                color={colors.white} 
              />
              <Text style={styles.statusBadgeText}>
                {currentStatus === 'ASISTIRA' ? 'ASISTIRÁ' :
                 currentStatus === 'NO_ASISTIRA' ? 'NO ASISTIRÁ' : 'PENDIENTE'}
              </Text>
            </View>
          </View>

          {/* 4. NOTA DEL ENTRENADOR */}
          {Boolean(callup.coachNote) && (
            <View style={styles.coachNoteBanner}>
              <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.accentGold} />
              <Text style={styles.coachNoteText}>{callup.coachNote}</Text>
            </View>
          )}

          {/* 5. TARJETA PRINCIPAL DE LA CONVOCATORIA DEL PARTIDO */}
          <View style={styles.matchHeroCard}>
            <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.matchGradient}>
              
              <View style={styles.compBadgeRow}>
                <View style={styles.compBadge}>
                  <Text style={styles.compBadgeText}>{callup.competition}</Text>
                </View>
              </View>

              {/* Duelo Visual */}
              <View style={styles.versusRow}>
                <View style={styles.teamCol}>
                  <View style={styles.shieldBg}>
                    <FontAwesome name="shield" size={32} color={colors.skyPrimary} />
                  </View>
                  <Text style={styles.teamTitle}>CD Jesuitas</Text>
                </View>

                <View style={styles.vsCircle}>
                  <Text style={styles.vsTxt}>VS</Text>
                </View>

                <View style={styles.teamCol}>
                  <View style={[styles.shieldBg, { backgroundColor: 'rgba(255,255,255,0.05)' }]}>
                    <FontAwesome name="shield" size={32} color={colors.textMuted} />
                  </View>
                  <Text style={styles.teamTitle}>{callup.rival}</Text>
                </View>
              </View>

              {/* Información Clave en Grilla */}
              <View style={styles.infoGrid}>
                <View style={styles.infoRow}>
                  <Ionicons name="calendar-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxt}>{callup.date}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color={colors.accentGold} />
                  <Text style={styles.infoTxtBold}>Partido: {callup.matchTime} • <Text style={{color: colors.goldLight}}>Citación: {callup.citationTime}</Text></Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxt}>{callup.location}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="key-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxt}>{callup.dressingRoom}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
                  <Text style={styles.infoTxt}>{callup.kit}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons name="cloudy-night-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.infoTxt}>{callup.weather}</Text>
                </View>
              </View>

              {/* ASISTENTE DE SALIDA EN COCHE */}
              <View style={styles.carAssistantBox}>
                <View style={styles.carHeaderRow}>
                  <Ionicons name="car-sport" size={18} color={colors.accentGold} />
                  <Text style={styles.carTitle}>ASISTENTE DE SALIDA DESDE TU CASA</Text>
                </View>
                <Text style={styles.carDepartureTxt}>Hora sugerida de salida: <Text style={{fontWeight: '900', color: colors.goldLight}}>{callup.carDeparture}</Text></Text>
              </View>

            </LinearGradient>
          </View>

          {/* 6. CONFIRMACIÓN DE ASISTENCIA: SÓLO DOS OPCIONES (ASISTIRÁ / NO ASISTIRÁ) */}
          <Text style={styles.sectionTitle}>CONFIRMACIÓN DE ASISTENCIA</Text>
          <View style={styles.attendanceCard}>
            <Text style={styles.attendanceQuestion}>¿Asistirá {childFirstName} al partido?</Text>
            
            <View style={styles.attendanceButtonsRow}>
              {/* BOTÓN 1: ASISTIRÁ */}
              <TouchableOpacity 
                style={[styles.btnAttendance, styles.btnGreen, currentStatus === 'ASISTIRA' && styles.btnActiveGlow]}
                onPress={handleConfirmAttendance}
                activeOpacity={0.8}
              >
                <Ionicons name="checkmark-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.btnAttendanceTxt}>Asistirá</Text>
              </TouchableOpacity>

              {/* BOTÓN 2: NO ASISTIRÁ */}
              <TouchableOpacity 
                style={[styles.btnAttendance, styles.btnRed, currentStatus === 'NO_ASISTIRA' && styles.btnActiveGlow]}
                onPress={handleOpenAbsenceModal}
                activeOpacity={0.8}
              >
                <Ionicons name="close-circle" size={20} color={colors.white} style={{ marginRight: 6 }} />
                <Text style={styles.btnAttendanceTxt}>No asistirá</Text>
              </TouchableOpacity>
            </View>

            {/* ESTADO VISUAL TRAS RESPONDER */}
            {currentStatus === 'ASISTIRA' && (
              <View style={styles.statusConfirmedBox}>
                <Ionicons name="checkmark-circle" size={18} color={colors.accentGreen} />
                <Text style={styles.statusConfirmedTxt}>Asistencia confirmada</Text>
              </View>
            )}

            {currentStatus === 'NO_ASISTIRA' && (
              <View style={styles.statusAbsentBox}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Ionicons name="close-circle" size={18} color={colors.accentRed} />
                  <Text style={styles.statusAbsentTxt}>No asistirá</Text>
                </View>
                {Boolean(currentReason) && (
                  <Text style={styles.statusReasonSub}>
                    Motivo comunicado al cuerpo técnico: <Text style={{ color: colors.white }}>{currentReason}</Text>
                  </Text>
                )}
              </View>
            )}

            {currentStatus === 'PENDIENTE' && (
              <View style={styles.statusPendingBox}>
                <Ionicons name="time-outline" size={16} color={colors.accentGold} />
                <Text style={styles.statusPendingTxt}>Respuesta pendiente de confirmación</Text>
              </View>
            )}

          </View>

          {/* 7. CHECKLIST DE LA MOCHILA DE CONVOCATORIA (PARA LOS PADRES) */}
          <Text style={styles.sectionTitle}>🎒 CHECKLIST DE LA MOCHILA DEL PARTIDO</Text>
          <View style={styles.checklistCard}>
            {currentChecklist.map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.checkItemRow}
                onPress={() => toggleChecklistItem(item.id)}
              >
                <View style={[styles.checkBox, item.checked && styles.checkBoxChecked]}>
                  {item.checked && <Ionicons name="checkmark" size={14} color={colors.navyDark} />}
                </View>
                <Text style={[styles.checkLabel, item.checked && styles.checkLabelChecked]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 8. RED DE COCHE COMPARTIDO ENTRE FAMILIAS */}
          <View style={styles.carpoolHeaderRow}>
            <Text style={styles.sectionTitleNoMargin}>🚗 COCHE COMPARTIDO & PLAZAS LIBRES</Text>
            <TouchableOpacity style={styles.carpoolActionBtn} onPress={() => setIsOfferCarModalOpen(true)}>
              <Ionicons name="add-circle" size={16} color={colors.navyDark} />
              <Text style={styles.carpoolActionBtnTxt}>+ Ofrecer Mi Coche</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.carpoolCard}>
            {carpoolList.map(item => (
              <View key={item.id} style={styles.carpoolItemRow}>
                <View style={[styles.carpoolTypeIcon, item.type === 'offer' ? styles.iconOffer : styles.iconNeed]}>
                  <Ionicons name={item.type === 'offer' ? 'car-sport' : 'hand-left'} size={18} color={colors.white} />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.carpoolName}>{item.family}</Text>
                  <Text style={styles.carpoolDesc}>
                    {item.type === 'offer' ? `Ofrece ${item.seats} plazas libres en su coche` : `Solicita plaza en coche (${item.seats} niño)`}
                  </Text>
                  <Text style={styles.carpoolPickup}>📍 Recogida: <Text style={{color: colors.white, fontWeight: '700'}}>{item.pickup}</Text></Text>
                  <Text style={styles.phoneDirectTxt}>📞 Teléfono: {item.phone}</Text>
                </View>

                <TouchableOpacity 
                  style={styles.contactBtn} 
                  onPress={() => setSelectedContactFamily(item)}
                >
                  <Ionicons name="call" size={14} color={colors.navyDark} />
                  <Text style={styles.contactBtnTxt}>Contactar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* 9. ACCIONES RÁPIDAS & DELEGADO DE EQUIPO */}
          <View style={styles.quickToolsRow}>
            <TouchableOpacity style={styles.toolBtnCard} onPress={handleOpenMaps}>
              <Ionicons name="navigate-circle-outline" size={22} color={colors.skyPrimary} />
              <Text style={styles.toolBtnText}>Ruta GPS en Maps</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolBtnCard} onPress={handleCallDelegate}>
              <Ionicons name="call-outline" size={22} color={colors.accentGold} />
              <Text style={styles.toolBtnText}>Llamar al Delegado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.toolBtnCard} onPress={handleWhatsAppCoach}>
              <Ionicons name="logo-whatsapp" size={22} color={colors.accentGreen} />
              <Text style={styles.toolBtnText}>Avisar al Míster</Text>
            </TouchableOpacity>
          </View>

        </>
      ) : (
        /* HISTORIAL DE CONVOCATORIAS */
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>ASISTENCIA DE LA TEMPORADA (100%)</Text>
          
          {(callup.history || []).map(item => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.hHeader}>
                <Text style={styles.hDate}>{item.date}</Text>
                <Text style={styles.hStatus}>{item.status}</Text>
              </View>
              <Text style={styles.hTitle}>vs {item.rival}</Text>
              <Text style={styles.hResult}>{item.result}</Text>
            </View>
          ))}
        </View>
      )}

      {/* MODAL DE MOTIVO DE AUSENCIA (EXIGIDO PARA "NO ASISTIRÁ") */}
      <Modal 
        visible={isAbsenceModalOpen} 
        transparent 
        animationType="slide" 
        onRequestClose={() => setIsAbsenceModalOpen(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Motivo de la ausencia</Text>
            <Text style={styles.modalSub}>Indica por qué {childFirstName} no asistirá al partido.</Text>

            {absenceError && (
              <View style={styles.modalErrorBox}>
                <Ionicons name="alert-circle" size={16} color={colors.accentRed} />
                <Text style={styles.modalErrorText}>{absenceError}</Text>
              </View>
            )}

            {ABSENCE_QUICK_REASONS.map((reason, idx) => {
              const isSelected = selectedReasonOption === reason;
              return (
                <TouchableOpacity 
                  key={idx}
                  style={[styles.reasonBtn, isSelected && styles.reasonBtnSelected]}
                  onPress={() => {
                    setSelectedReasonOption(reason);
                    setAbsenceError(null);
                  }}
                >
                  <Text style={[styles.reasonTxt, isSelected && styles.reasonTxtSelected]}>{reason}</Text>
                  {isSelected && <Ionicons name="checkmark-circle" size={18} color={colors.skyPrimary} />}
                </TouchableOpacity>
              );
            })}

            {/* CAMPO DE TEXTO SI SELECCIONA "OTRO MOTIVO" */}
            {selectedReasonOption === 'Otro motivo' && (
              <View style={styles.customReasonContainer}>
                <TextInput
                  style={styles.customReasonInput}
                  placeholder="Escribe brevemente el motivo"
                  placeholderTextColor="rgba(148, 163, 184, 0.6)"
                  maxLength={300}
                  multiline
                  numberOfLines={3}
                  value={customReasonText}
                  onChangeText={(txt) => {
                    setCustomReasonText(txt);
                    setAbsenceError(null);
                  }}
                />
                <Text style={styles.charCountText}>{customReasonText.length}/300 caracteres</Text>
              </View>
            )}

            {/* BOTONES DE ACCIÓN EN EL MODAL */}
            <View style={styles.modalActionsRow}>
              <TouchableOpacity 
                style={styles.modalCancelActionBtn} 
                onPress={() => setIsAbsenceModalOpen(false)}
              >
                <Text style={styles.modalCancelActionTxt}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.modalConfirmActionBtn} 
                onPress={handleConfirmAbsence}
              >
                <Text style={styles.modalConfirmActionTxt}>Confirmar ausencia</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* MODAL DE SELECCIÓN DE CONTACTO DIRECTO */}
      <Modal visible={!!selectedContactFamily} transparent animationType="fade" onRequestClose={() => setSelectedContactFamily(null)}>
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="person-circle" size={54} color={colors.skyPrimary} />
            <Text style={styles.modalTitleCenter}>CONTACTAR CON {selectedContactFamily?.family?.toUpperCase() || 'FAMILIA'}</Text>
            <Text style={styles.modalSubCenter}>Teléfono directo de la familia: <Text style={{fontWeight: '900', color: colors.white}}>{selectedContactFamily?.phone}</Text></Text>

            <TouchableOpacity 
              style={styles.modalCallOptionBtn}
              onPress={() => {
                handleCallParentDirect(selectedContactFamily?.phone);
                setSelectedContactFamily(null);
              }}
            >
              <Ionicons name="call" size={18} color={colors.navyDark} />
              <Text style={styles.modalCallOptionTxt}>Llamar por Teléfono Directo</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.modalWhatsAppOptionBtn}
              onPress={() => {
                handleWhatsAppParentDirect(selectedContactFamily?.phone, selectedContactFamily?.family);
                setSelectedContactFamily(null);
              }}
            >
              <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
              <Text style={styles.modalWhatsAppOptionTxt}>Enviar Mensaje de WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setSelectedContactFamily(null)}>
              <Text style={styles.modalCancelTxt}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE COCHE COMPARTIDO */}
      <Modal visible={isOfferCarModalOpen} transparent animationType="fade" onRequestClose={() => setIsOfferCarModalOpen(false)}>
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="car-sport" size={44} color={colors.accentGreen} />
            <Text style={styles.modalTitleCenter}>OFRECER PLAZAS EN MI COCHE</Text>
            <Text style={styles.modalSubCenter}>Ayuda a otras familias del equipo ofreciendo plazas en tu vehículo para el partido.</Text>

            <Text style={styles.inputLabel}>¿Cuántas plazas libres tienes en tu coche?</Text>
            <View style={styles.seatsRow}>
              {[1, 2, 3, 4].map(num => (
                <TouchableOpacity 
                  key={num}
                  style={[styles.seatNumBtn, offeredSeats === num && styles.seatNumBtnActive]}
                  onPress={() => setOfferedSeats(num)}
                >
                  <Text style={[styles.seatNumTxt, offeredSeats === num && styles.seatNumTxtActive]}>{num} {num === 1 ? 'Plaza' : 'Plazas'}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Punto de Recogida Oficial:</Text>
            <View style={styles.fixedAddressBox}>
              <Ionicons name="location" size={16} color={colors.skyPrimary} />
              <Text style={styles.fixedAddressTxt}>{DEFAULT_SCHOOL_ADDRESS}</Text>
            </View>

            <TouchableOpacity style={styles.modalPublishBtn} onPress={handlePublishMyCar}>
              <Text style={styles.modalPublishTxt}>PUBLICAR MI COCHE PARA EL EQUIPO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsOfferCarModalOpen(false)}>
              <Text style={styles.modalCancelTxt}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

// Componente exportado con ErrorBoundary envolvente
export function FamiliaConvocatorias() {
  return (
    <FamiliaConvocatoriasErrorBoundary>
      <FamiliaConvocatoriasContent />
    </FamiliaConvocatoriasErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // ERROR BOUNDARY
  errorBoundaryBox: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navyDark, padding: 24, minHeight: 400 },
  errorBoundaryTitle: { color: colors.white, fontSize: 18, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  errorBoundarySub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 20, lineHeight: 18 },

  // ESTADOS DE CARGA, ERROR Y VACÍO
  stateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navyDark, padding: 24, minHeight: 400 },
  stateText: { color: colors.skyGlow, fontSize: 14, fontWeight: '700', marginTop: 12 },
  stateTitle: { color: colors.white, fontSize: 18, fontWeight: '900', textAlign: 'center', marginTop: 8 },
  stateSub: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: 4, lineHeight: 18 },
  retryBtn: { marginTop: 16, backgroundColor: colors.skyPrimary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  retryBtnTxt: { color: colors.navyDark, fontSize: 13, fontWeight: '900' },

  // SELECTOR HIJOS
  childSelectorRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  childBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  childBtnActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  childBtnTextActive: { color: colors.white, fontWeight: '900' },

  // TABS PRÓXIMA vs HISTORIAL
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '20%', right: '20%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // STATUS HERO BANNER
  statusHeroBanner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.navyCard, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 12 },
  statusHeroTitle: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  statusHeroSub: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  statusConfirmed: { backgroundColor: colors.accentGreen },
  statusPending: { backgroundColor: colors.accentGold },
  statusAbsent: { backgroundColor: colors.accentRed },
  statusBadgeText: { color: colors.white, fontSize: 10, fontWeight: '900' },

  // NOTA DEL ENTRENADOR
  coachNoteBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(245, 158, 11, 0.15)', borderWidth: 1, borderColor: colors.accentGold, padding: 12, borderRadius: 14, marginBottom: 16 },
  coachNoteText: { flex: 1, color: colors.white, fontSize: 11, lineHeight: 16, fontWeight: '600' },

  // MATCH HERO CARD
  matchHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  matchGradient: { padding: 16 },
  compBadgeRow: { alignItems: 'center', marginBottom: 16 },
  compBadge: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.skyPrimary },
  compBadgeText: { color: colors.skyGlow, fontSize: 10, fontWeight: '900' },

  versusRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 },
  teamCol: { alignItems: 'center', flex: 1 },
  shieldBg: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(79, 195, 247, 0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  teamTitle: { color: colors.white, fontSize: 14, fontWeight: '900', textAlign: 'center' },
  vsCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  vsTxt: { color: colors.skyPrimary, fontSize: 12, fontWeight: '900' },

  infoGrid: { gap: 8, backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoTxt: { color: colors.white, fontSize: 12, fontWeight: '600' },
  infoTxtBold: { color: colors.white, fontSize: 12, fontWeight: '900' },

  carAssistantBox: { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderWidth: 1, borderColor: colors.accentGold, padding: 10, borderRadius: 10 },
  carHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  carTitle: { color: colors.accentGold, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  carDepartureTxt: { color: colors.white, fontSize: 11, marginTop: 2 },

  // CONFIRMACIÓN DE ASISTENCIA (EXACTAMENTE DOS OPCIONES: ASISTIRÁ / NO ASISTIRÁ)
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  sectionTitleNoMargin: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5 },
  
  attendanceCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  attendanceQuestion: { color: colors.white, fontSize: 15, fontWeight: '900', textAlign: 'center', marginBottom: 14 },
  attendanceButtonsRow: { flexDirection: 'row', gap: 12 },
  btnAttendance: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 14 },
  btnGreen: { backgroundColor: colors.accentGreen },
  btnRed: { backgroundColor: colors.accentRed },
  btnActiveGlow: { borderWidth: 2, borderColor: colors.white },
  btnAttendanceTxt: { color: colors.white, fontSize: 13, fontWeight: '900', letterSpacing: 0.5 },

  statusConfirmedBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: colors.accentGreen, padding: 12, borderRadius: 12, marginTop: 14 },
  statusConfirmedTxt: { color: colors.accentGreen, fontSize: 13, fontWeight: '900' },

  statusAbsentBox: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: colors.accentRed, padding: 12, borderRadius: 12, marginTop: 14 },
  statusAbsentTxt: { color: colors.accentRed, fontSize: 13, fontWeight: '900' },
  statusReasonSub: { color: colors.textMuted, fontSize: 11, marginTop: 4, fontWeight: '600' },

  statusPendingBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(245, 158, 11, 0.15)', borderWidth: 1, borderColor: colors.accentGold, padding: 12, borderRadius: 12, marginTop: 14 },
  statusPendingTxt: { color: colors.accentGold, fontSize: 12, fontWeight: '700' },

  // CHECKLIST MOCHILA
  checklistCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkBox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  checkBoxChecked: { backgroundColor: colors.skyPrimary },
  checkLabel: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkLabelChecked: { textDecorationLine: 'line-through', color: colors.textMuted },

  // CARPOOLING
  carpoolHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  carpoolActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.skyPrimary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  carpoolActionBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },
  carpoolCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 12, marginBottom: 20 },
  carpoolItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  carpoolTypeIcon: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  iconOffer: { backgroundColor: colors.accentGreen },
  iconNeed: { backgroundColor: colors.accentGold },
  carpoolName: { color: colors.white, fontSize: 12, fontWeight: '900' },
  carpoolDesc: { color: colors.skyGlow, fontSize: 11, fontWeight: '600' },
  carpoolPickup: { color: colors.textMuted, fontSize: 10, marginTop: 1 },
  phoneDirectTxt: { color: colors.goldLight, fontSize: 10, fontWeight: '700', marginTop: 1 },
  contactBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.skyPrimary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  contactBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // QUICK TOOLS
  quickToolsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  toolBtnCard: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.navyCard, padding: 10, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  toolBtnText: { color: colors.white, fontSize: 10, fontWeight: '800' },

  // HISTORIAL
  historyContainer: { gap: 10 },
  historyCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  hHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  hDate: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  hStatus: { color: colors.accentGreen, fontSize: 11, fontWeight: '900' },
  hTitle: { color: colors.white, fontSize: 15, fontWeight: '900' },
  hResult: { color: colors.skyGlow, fontSize: 12, fontWeight: '700', marginTop: 2 },

  // MODAL DE AUSENCIA
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.navyCard, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 18, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  modalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 16 },
  
  modalErrorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(239, 68, 68, 0.2)', padding: 10, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: colors.accentRed },
  modalErrorText: { color: colors.accentRed, fontSize: 12, fontWeight: '700' },

  reasonBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  reasonBtnSelected: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderColor: colors.skyPrimary },
  reasonTxt: { color: colors.white, fontSize: 13, fontWeight: '700' },
  reasonTxtSelected: { color: colors.skyPrimary, fontWeight: '900' },

  customReasonContainer: { marginTop: 4, marginBottom: 12 },
  customReasonInput: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: colors.skyPrimary, borderRadius: 10, padding: 12, color: colors.white, fontSize: 13, minHeight: 70, textAlignVertical: 'top' },
  charCountText: { color: colors.textMuted, fontSize: 10, textAlign: 'right', marginTop: 4 },

  modalActionsRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  modalCancelActionBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.08)' },
  modalCancelActionTxt: { color: colors.textMuted, fontSize: 13, fontWeight: '800' },
  modalConfirmActionBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12, backgroundColor: colors.accentRed },
  modalConfirmActionTxt: { color: colors.white, fontSize: 13, fontWeight: '900' },

  // MODALES SECUNDARIOS
  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitleCenter: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 10, marginBottom: 4, letterSpacing: 0.5 },
  modalSubCenter: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 16 },
  
  modalCallOptionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', backgroundColor: colors.skyPrimary, paddingVertical: 14, borderRadius: 12, marginBottom: 10 },
  modalCallOptionTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  modalWhatsAppOptionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', backgroundColor: colors.accentGreen, paddingVertical: 14, borderRadius: 12, marginBottom: 14 },
  modalWhatsAppOptionTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  inputLabel: { color: colors.skyGlow, fontSize: 11, fontWeight: '800', alignSelf: 'flex-start', marginBottom: 6 },
  seatsRow: { flexDirection: 'row', gap: 8, width: '100%', marginBottom: 14 },
  seatNumBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  seatNumBtnActive: { backgroundColor: colors.skyPrimary, borderColor: colors.skyPrimary },
  seatNumTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  seatNumTxtActive: { color: colors.navyDark, fontWeight: '900' },

  fixedAddressBox: { flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%', backgroundColor: 'rgba(79, 195, 247, 0.1)', borderWidth: 1, borderColor: colors.skyPrimary, borderRadius: 10, padding: 12, marginBottom: 16 },
  fixedAddressTxt: { color: colors.white, fontSize: 11, fontWeight: '800', flex: 1 },

  modalPublishBtn: { width: '100%', backgroundColor: colors.skyPrimary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 8 },
  modalPublishTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },
  modalCancelBtn: { paddingVertical: 8 },
  modalCancelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
