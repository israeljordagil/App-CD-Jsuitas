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
  ActivityIndicator 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { DEMO_FAMILY } from '../../data/demoFamilyData';
import { useSport } from '../../context/SportContext';

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

// Constante demo localizada para avisos o tareas pendientes de la familia
const DEMO_PENDIENTES = [
  { id: 'p1', icon: 'notifications-outline', label: '1 comunicado nuevo del club', route: '/(drawer)/mensajes', badge: 'NUEVO', badgeColor: colors.skyPrimary },
  { id: 'p2', icon: 'card-outline', label: 'Cuota de Abril pendiente de abono', route: '/(drawer)/avisos', badge: 'PENDIENTE', badgeColor: colors.accentGold },
  { id: 'p3', icon: 'document-text-outline', label: 'Falta autorización de derechos de imagen', route: '/(drawer)/avisos', badge: 'REQUERIDO', badgeColor: colors.accentRed },
  { id: 'p4', icon: 'medical-outline', label: 'Revisión médica próxima a caducar (Junio 2027)', route: '/(drawer)/avisos', badge: 'AVISO SALUD', badgeColor: colors.skyGlow },
];

export function FamiliaDashboard() {
  const router = useRouter();
  const { setSport } = useSport();
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const { 
    linkedPlayers, 
    activePlayerId, 
    switchActivePlayer, 
    childrenLoading, 
    childrenError 
  } = useAuth();

  // Estados locales para la confirmación binaria de asistencia y motivo de ausencia
  const [matchStatusMap, setMatchStatusMap] = useState<Record<string, { status: 'Confirmado' | 'Ausente'; reason?: string; detail?: string }>>({});
  
  // Modal de motivo obligatorio para "No asistirá" en partidos
  const [absenceMatchModalVisible, setAbsenceMatchModalVisible] = useState(false);
  const [selectedReasonOption, setSelectedReasonOption] = useState<string>('');
  const [customOtherReason, setCustomOtherReason] = useState<string>('');
  const [optionalObservations, setOptionalObservations] = useState<string>('');

  // Modal para avisar de ausencia a entrenamiento
  const [trainingAbsenceModalVisible, setTrainingAbsenceModalVisible] = useState(false);
  const [trainingAbsenceReason, setTrainingAbsenceReason] = useState<string>('');

  // Estado replegable para el Asistente de Salida en Coche
  const [isTravelAssistantOpen, setIsTravelAssistantOpen] = useState(false);

  // Lista de pendientes activa
  const [pendingItems, setPendingItems] = useState(DEMO_PENDIENTES);

  // Hijos a mostrar (Linked players reales de Supabase o lista Demo multidisciplinar)
  const displayChildren = linkedPlayers.length > 0 ? linkedPlayers : DEMO_FAMILY.children.map(c => ({
    id: c.id,
    name: c.fullName,
    team: c.team,
    dorsal: c.dorsal,
    sport: c.sport,
    avatar: c.avatarIcon,
  }));

  // Identificador del jugador seleccionado
  const selectedPlayerId = activePlayerId || displayChildren[0]?.id || null;
  const activeChild = displayChildren.find(c => c.id === selectedPlayerId) || displayChildren[0] || null;
  const activeChildFirstName = activeChild?.name?.split(' ')[0] || 'tu hijo/a';

  const handleSelectChild = (child: any) => {
    switchActivePlayer(child.id);
    if (child.sport) {
      setSport(child.sport);
    }
  };

  const currentMatchRecord = selectedPlayerId ? matchStatusMap[selectedPlayerId] : undefined;
  const currentMatchStatus = currentMatchRecord?.status;

  // Manejo de la respuesta binaria "Asistirá" (Confirmación directa)
  const handleConfirmAttendance = () => {
    if (!selectedPlayerId) return;
    setMatchStatusMap(prev => ({
      ...prev,
      [selectedPlayerId]: { status: 'Confirmado' }
    }));
  };

  // Manejo del botón "No asistirá" (Abre modal de motivo obligatorio)
  const handlePressNoAttendance = () => {
    setSelectedReasonOption('');
    setCustomOtherReason('');
    setOptionalObservations('');
    setAbsenceMatchModalVisible(true);
  };

  // Confirmar motivo de ausencia a partido desde el modal
  const handleSaveAbsenceReason = () => {
    if (!selectedPlayerId) return;
    if (!selectedReasonOption) return;
    if (selectedReasonOption === 'Otro motivo' && !customOtherReason.trim()) return;

    const finalReason = selectedReasonOption === 'Otro motivo' ? customOtherReason.trim() : selectedReasonOption;

    setMatchStatusMap(prev => ({
      ...prev,
      [selectedPlayerId]: { 
        status: 'Ausente', 
        reason: finalReason, 
        detail: optionalObservations.trim() 
      }
    }));
    setAbsenceMatchModalVisible(false);
  };

  // Datos de logística de partido
  const defaultNextMatch = {
    opponent: 'Levante UD B',
    date: 'Sáb 10 de Mayo • 11:00h',
    location: 'Campo 1 - CD Jesuitas (Valencia)',
    citationTime: '10:00h en Vestuarios',
    kit: '1ª Equipación Azul Noche',
    addressGps: 'Calle Padre Arrupe, 12, Valencia',
    weather: '⛅ 18°C • Sol y nubes • 10% prob. lluvia',
    travelAssistant: {
      carTravelTimeMin: 15,
      carRecommendedDeparture: '09:40h',
      walkTravelTimeMin: 35,
      walkRecommendedDeparture: '09:25h',
    }
  };

  const defaultTrainings = [
    { day: 'Martes', time: '17:30 – 19:00', pitch: 'Campo 2 Césped Artificial' },
    { day: 'Jueves', time: '17:30 – 19:00', pitch: 'Campo 2 Césped Artificial' },
  ];

  const defaultLastResult = {
    opponent: 'Valencia CF C',
    score: '3 - 1',
    isWin: true,
    leaguePos: '3º Clasificado (24 pts)'
  };

  // Lógica inteligente de alerta contextual de entrenamiento
  const getDynamicTrainingAlert = () => {
    const day = new Date().getDay();
    if (day === 1) return { badge: 'Próximo: Mañana a las 17:30', color: colors.skyPrimary, text: 'Mañana Martes 17:30 – 19:00', pitch: 'Campo 2 Césped Artificial' };
    if (day === 2) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Martes 17:30 – 19:00', pitch: 'Campo 2 Césped Artificial (Llegar 15m antes)' };
    if (day === 3) return { badge: 'Próximo: Mañana a las 17:30', color: colors.skyPrimary, text: 'Mañana Jueves 17:30 – 19:00', pitch: 'Campo 2 Césped Artificial' };
    if (day === 4) return { badge: '¡HOY HAY ENTRENAMIENTO!', color: colors.accentGreen, text: 'Hoy Jueves 17:30 – 19:00', pitch: 'Campo 2 Césped Artificial (Sesión Pre-Partido)' };
    return { badge: 'Próximo: Martes a las 17:30', color: colors.skyPrimary, text: 'Martes 17:30 – 19:00', pitch: 'Campo 2 Césped Artificial' };
  };

  const trainingAlert = getDynamicTrainingAlert();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} 
      showsVerticalScrollIndicator={false}
    >
      {/* BADGE VISIBLE DE COMPILACIÓN */}
      <View style={styles.compilationBadgeContainer}>
        <Text style={styles.compilationBadgeTxt}>COMPILACIÓN: FAMILIA-INICIO-01</Text>
      </View>
      
      {/* 1. SELECTOR COMPACTO DE DEPORTISTAS (MIS DEPORTISTAS) */}
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>MIS DEPORTISTAS</Text>
      </View>

      {/* ESTADO DE CARGA */}
      {childrenLoading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.skyPrimary} />
          <Text style={styles.loadingText}>Cargando deportistas vinculados...</Text>
        </View>
      )}

      {/* ESTADO DE ERROR */}
      {!childrenLoading && childrenError && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={24} color={colors.accentRed} />
          <Text style={styles.errorText}>{childrenError}</Text>
        </View>
      )}

      {/* LISTA COMPACTA DE JUGADORES */}
      {!childrenLoading && displayChildren.length > 0 && (
        <View style={styles.childrenSelectorGroup}>
          {displayChildren.map((child) => {
            const isSelected = child.id === selectedPlayerId;
            return (
              <TouchableOpacity
                key={child.id}
                activeOpacity={0.8}
                style={[styles.childCard, isSelected && styles.childCardActive]}
                onPress={() => handleSelectChild(child)}
              >
                <View style={styles.childCardLeft}>
                  <View style={styles.childAvatar}>
                    <Text style={{ fontSize: 20 }}>{child.avatar || '👦'}</Text>
                  </View>
                  <View>
                    <Text style={[styles.childName, isSelected && styles.childNameActive]}>{child.name}</Text>
                    <Text style={styles.childTeamSub}>{child.team || 'CD Jesuitas'} • #{child.dorsal || 'N/A'}</Text>
                  </View>
                </View>
                {isSelected && (
                  <View style={styles.activeCheckBadge}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.skyPrimary} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {/* 2. PRÓXIMO PARTIDO COMO BLOQUE PRINCIPAL & CONFIRMACIÓN BINARIA (ASISTIRÁ / NO ASISTIRÁ) */}
      <Text style={styles.sectionTitle}>1. PRÓXIMO PARTIDO & ASISTENCIA</Text>

      <View style={styles.cardBox}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.cardGradient}>
          
          <View style={styles.callupBadgeHeader}>
            <View style={styles.callupTag}>
              <Ionicons name="football-outline" size={14} color={colors.skyPrimary} />
              <Text style={styles.callupTagText}>JORNADA OFICIAL</Text>
            </View>

            {/* ETIQUETA DE ESTADO (SOLO 3 ESTADOS POSIBLES: PENDIENTE, CONFIRMADO, AUSENTE) */}
            <View style={[
              styles.statusPill, 
              currentMatchStatus === 'Confirmado' ? styles.statusPillGreen : 
              currentMatchStatus === 'Ausente' ? styles.statusPillRed : styles.statusPillYellow
            ]}>
              <Text style={styles.statusPillText}>
                {currentMatchStatus === 'Confirmado' ? '✅ ASISTENCIA CONFIRMADA' : 
                 currentMatchStatus === 'Ausente' ? '❌ NO ASISTIRÁ' : '⏳ PENDIENTE DE RESPUESTA'}
              </Text>
            </View>
          </View>

          <Text style={styles.matchVsText}>vs {defaultNextMatch.opponent}</Text>
          <Text style={styles.matchDateText}>{defaultNextMatch.date}</Text>

          {/* DETALLE DEL MOTIVO DE AUSENCIA (SI EXISTE) */}
          {currentMatchStatus === 'Ausente' && currentMatchRecord?.reason && (
            <View style={styles.absenceReasonSummaryBox}>
              <Ionicons name="information-circle-outline" size={15} color={colors.accentRed} />
              <Text style={styles.absenceReasonSummaryTxt}>
                Motivo indicado: <Text style={{ fontWeight: '900', color: colors.white }}>{currentMatchRecord.reason}</Text>
              </Text>
            </View>
          )}

          {/* CLIMA METEOROLÓGICO */}
          <View style={styles.weatherBox}>
            <Ionicons name="cloudy-night-outline" size={15} color={colors.skyGlow} />
            <Text style={styles.weatherText}>{defaultNextMatch.weather}</Text>
          </View>

          {/* GRILLA DE DETALLES DEL ENCUENTRO */}
          <View style={styles.matchDetailsGrid}>
            <View style={styles.matchDetailItem}>
              <Ionicons name="time-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>Citación: <Text style={{fontWeight: '900', color: '#fff'}}>{defaultNextMatch.citationTime}</Text></Text>
            </View>

            <View style={styles.matchDetailItem}>
              <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>{defaultNextMatch.kit}</Text>
            </View>

            <View style={styles.matchDetailItem}>
              <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.matchDetailText}>{defaultNextMatch.location}</Text>
            </View>
          </View>

          {/* ASISTENTE INTELIGENTE DE SALIDA (REPLEGABLE COMPACTO) */}
          <View style={styles.travelAssistantCard}>
            <TouchableOpacity 
              style={styles.travelAssistantToggleBtn}
              activeOpacity={0.8}
              onPress={() => setIsTravelAssistantOpen(!isTravelAssistantOpen)}
            >
              <View style={styles.travelHeaderRow}>
                <Ionicons name="car-sport-outline" size={16} color={colors.skyPrimary} />
                <Text style={styles.travelTitle}>ASISTENTE DE SALIDA DESDE CASA</Text>
              </View>
              <View style={styles.toggleChevronBox}>
                <Text style={styles.toggleChevronTxt}>
                  {isTravelAssistantOpen ? '▲ Ocultar' : '🚗 Ver desplazamiento ∨'}
                </Text>
              </View>
            </TouchableOpacity>

            {isTravelAssistantOpen && (
              <View style={styles.travelExpandedContent}>
                <View style={styles.travelTimesRow}>
                  <View style={styles.travelTimeBox}>
                    <Text style={styles.travelTimeLbl}>🚗 En Coche</Text>
                    <Text style={styles.travelTimeVal}>{defaultNextMatch.travelAssistant.carTravelTimeMin} min viaje</Text>
                    <Text style={styles.travelDepartureHighlight}>Salir de casa: <Text style={{fontWeight: '900', color: colors.skyGlow}}>{defaultNextMatch.travelAssistant.carRecommendedDeparture}</Text></Text>
                  </View>

                  <View style={styles.travelTimeBox}>
                    <Text style={styles.travelTimeLbl}>🚶 Andando</Text>
                    <Text style={styles.travelTimeVal}>{defaultNextMatch.travelAssistant.walkTravelTimeMin} min paseo</Text>
                    <Text style={styles.travelDepartureHighlight}>Salir de casa: <Text style={{fontWeight: '900', color: colors.skyGlow}}>{defaultNextMatch.travelAssistant.walkRecommendedDeparture}</Text></Text>
                  </View>
                </View>

                <TouchableOpacity style={styles.gpsLinkRow} activeOpacity={0.8}>
                  <Ionicons name="navigate-circle" size={16} color={colors.skyPrimary} />
                  <Text style={styles.gpsLinkText}>Navegar con Google Maps en tiempo real</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* CONFIRMACIÓN BINARIA DE ASISTENCIA (ÚNICAMENTE DOS OPCIONES: ASISTIRÁ / NO ASISTIRÁ) */}
          <Text style={styles.actionPromptText}>Confirma la asistencia de {activeChildFirstName}</Text>
          
          <View style={styles.callupBtnGroup}>
            <TouchableOpacity 
              style={[styles.btnConfirm, currentMatchStatus === 'Confirmado' && styles.btnConfirmSelected]}
              onPress={handleConfirmAttendance}
              activeOpacity={0.85}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
              <Text style={styles.btnConfirmText}>✓ ASISTIRÁ</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnRefuse, currentMatchStatus === 'Ausente' && styles.btnRefuseSelected]}
              onPress={handlePressNoAttendance}
              activeOpacity={0.85}
            >
              <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.btnConfirmText}>✕ NO ASISTIRÁ</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </View>

      {/* 3. ENTRENAMIENTOS DE LA SEMANA */}
      <Text style={styles.sectionTitle}>2. ENTRENAMIENTOS DE ESTA SEMANA</Text>
      
      <View style={styles.cardBox}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.cardGradient}>
          
          <View style={styles.dynamicTrainingHeader}>
            <View style={[styles.dynamicBadge, { backgroundColor: trainingAlert.color }]}>
              <Ionicons name="calendar-outline" size={14} color={colors.navyDark} />
              <Text style={styles.dynamicBadgeText}>{trainingAlert.badge}</Text>
            </View>
            <Text style={styles.pitchTagText}>{trainingAlert.pitch}</Text>
          </View>

          <View style={styles.trainingList}>
            {defaultTrainings.map((t, idx) => (
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

          <TouchableOpacity style={styles.absenceNoticeBtn} onPress={() => setTrainingAbsenceModalVisible(true)}>
            <Ionicons name="alert-circle-outline" size={15} color={colors.accentGold} />
            <Text style={styles.absenceNoticeText}>AVISAR DE UNA AUSENCIA</Text>
          </TouchableOpacity>

        </LinearGradient>
      </View>

      {/* 4. NUEVO BLOQUE: PENDIENTES DE LA FAMILIA */}
      <Text style={styles.sectionTitle}>3. PENDIENTES</Text>

      <View style={styles.cardBox}>
        <View style={styles.cardInnerPadding}>
          {pendingItems.length === 0 ? (
            <View style={styles.allClearedBox}>
              <Ionicons name="checkmark-done-circle-outline" size={32} color={colors.accentGreen} />
              <Text style={styles.allClearedText}>Todo al día ✅</Text>
            </View>
          ) : (
            <View style={styles.pendingListContainer}>
              {pendingItems.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  style={styles.pendingItemRow}
                  activeOpacity={0.8}
                  onPress={() => router.push(item.route as any)}
                >
                  <View style={styles.pendingIconBox}>
                    <Ionicons name={item.icon as any} size={18} color={colors.skyPrimary} />
                  </View>

                  <Text style={styles.pendingItemLabel}>{item.label}</Text>

                  <View style={[styles.pendingBadgePill, { backgroundColor: `${item.badgeColor}25`, borderColor: item.badgeColor }]}>
                    <Text style={[styles.pendingBadgeTxt, { color: item.badgeColor }]}>{item.badge}</Text>
                  </View>

                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* 5. ÚLTIMO RESULTADO Y CLASIFICACIÓN DEL EQUIPO */}
      <Text style={styles.sectionTitle}>4. ÚLTIMO RESULTADO & CLASIFICACIÓN</Text>
      
      <View style={styles.cardBox}>
        <View style={styles.cardInnerPadding}>
          <View style={styles.resultHeaderRow}>
            <View>
              <Text style={styles.lastMatchSub}>JORNADA ANTERIOR</Text>
              <Text style={styles.lastMatchScore}>CD Jesuitas {defaultLastResult.score} {defaultLastResult.opponent}</Text>
            </View>
            <View style={styles.winBadge}>
              <Text style={styles.winBadgeText}>VICTORIA (+3 PTS)</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.leaguePosRow}>
            <Ionicons name="trophy-outline" size={18} color={colors.accentGold} />
            <Text style={styles.leaguePosText}>Clasificación: <Text style={{color: colors.white, fontWeight: '900'}}>{defaultLastResult.leaguePos}</Text></Text>
          </View>
        </View>
      </View>

      {/* 6. ACCESO SECUNDARIO A MI ZONA (POSICIONADO AL FINAL DE LA PANTALLA) */}
      <Text style={styles.sectionTitle}>5. MI ZONA</Text>

      <TouchableOpacity 
        style={styles.miZonaCardBanner} 
        activeOpacity={0.9}
        onPress={() => router.push('/(drawer)/mi-zona')}
      >
        <LinearGradient
          colors={['#0E2E6B', '#071A3D']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.miZonaCardGradient}
        >
          <View style={styles.miZonaCardLeft}>
            <View style={styles.miZonaIconCircle}>
              <Text style={{ fontSize: 20 }}>🌟</Text>
            </View>
            <View>
              <Text style={styles.miZonaTitle}>MI ZONA</Text>
              <Text style={styles.miZonaSub}>Cromo, retos e insignias de {activeChildFirstName}</Text>
            </View>
          </View>
          <View style={styles.miZonaArrowBtn}>
            <Ionicons name="arrow-forward" size={16} color={colors.navyDark} />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* MODAL OBLIGATORIO: MOTIVO DE AUSENCIA A PARTIDO ("NO ASISTIRÁ") */}
      <Modal visible={absenceMatchModalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Indica el motivo de la ausencia</Text>
            <Text style={styles.modalSub}>Es obligatorio indicar una razón para notificar la baja de {activeChildFirstName}</Text>

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

            {/* CAMPO DE TEXTO OBLIGATORIO PARA "OTRO MOTIVO" */}
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

            {/* CAMPO DE OBSERVACIONES OPCIONAL PARA EL RESTO */}
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
            <Text style={styles.modalSub}>Informa al cuerpo técnico sobre la falta de {activeChildFirstName}</Text>

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
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  compilationBadgeContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  compilationBadgeTxt: {
    color: colors.skyPrimary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },

  loadingBox: { padding: 30, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: colors.skyGlow, marginTop: 12, fontSize: 13, fontWeight: '700' },

  errorBox: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: colors.accentRed, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 12 },
  errorText: { color: colors.accentRed, fontSize: 13, fontWeight: '700', flex: 1 },

  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginTop: 16, marginBottom: 8 },

  // SELECTOR DE HIJOS COMPACTO
  childrenSelectorGroup: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  childCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.navyCard, padding: 10, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  childCardActive: { borderColor: colors.skyPrimary, backgroundColor: '#0E2E6B' },
  childCardLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  childAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  childName: { color: colors.white, fontSize: 13, fontWeight: '800' },
  childNameActive: { color: colors.skyGlow },
  childTeamSub: { color: colors.textMuted, fontSize: 10, fontWeight: '600' },
  activeCheckBadge: {},

  // CARD BOX CONTENEDOR
  cardBox: { borderRadius: 18, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard },
  cardGradient: { padding: 14 },
  cardInnerPadding: { padding: 14 },

  // CONVOCATORIA Y PARTIDO
  callupBadgeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  callupTag: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  callupTagText: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusPillGreen: { backgroundColor: 'rgba(16, 185, 129, 0.25)', borderWidth: 1, borderColor: colors.accentGreen },
  statusPillRed: { backgroundColor: 'rgba(239, 68, 68, 0.25)', borderWidth: 1, borderColor: colors.accentRed },
  statusPillYellow: { backgroundColor: 'rgba(245, 158, 11, 0.25)', borderWidth: 1, borderColor: colors.accentGold },
  statusPillText: { color: '#fff', fontSize: 10, fontWeight: '900' },

  matchVsText: { color: colors.white, fontSize: 20, fontWeight: '900', marginBottom: 2 },
  matchDateText: { color: colors.skyGlow, fontSize: 12, fontWeight: '700', marginBottom: 8 },

  absenceReasonSummaryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 10,
  },
  absenceReasonSummaryTxt: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '600',
  },

  weatherBox: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79, 195, 247, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 10, alignSelf: 'flex-start' },
  weatherText: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  matchDetailsGrid: { gap: 6, marginBottom: 12, backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10 },
  matchDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  matchDetailText: { color: colors.white, fontSize: 11, fontWeight: '600' },

  // ASISTENTE DE SALIDA Y VIAJE REPLEGABLE
  travelAssistantCard: {
    backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)', marginBottom: 14
  },
  travelAssistantToggleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  travelHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  travelTitle: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  toggleChevronBox: {},
  toggleChevronTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },

  travelExpandedContent: { marginTop: 10, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 10 },
  travelTimesRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  travelTimeBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', padding: 8, borderRadius: 8 },
  travelTimeLbl: { color: colors.white, fontSize: 11, fontWeight: '800' },
  travelTimeVal: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  travelDepartureHighlight: { color: colors.white, fontSize: 10, marginTop: 4 },

  gpsLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center' },
  gpsLinkText: { color: colors.skyPrimary, fontSize: 11, fontWeight: '700', textDecorationLine: 'underline' },

  actionPromptText: { color: colors.white, fontSize: 12, fontWeight: '800', marginBottom: 8 },
  
  // BOTONES BINARIOS DE CONFIRMACIÓN (ASISTIRÁ / NO ASISTIRÁ)
  callupBtnGroup: { flexDirection: 'row', gap: 10 },
  btnConfirm: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#059669', paddingVertical: 12, borderRadius: 12 },
  btnConfirmSelected: { borderWidth: 2, borderColor: '#fff' },
  btnRefuse: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#DC2626', paddingVertical: 12, borderRadius: 12 },
  btnRefuseSelected: { borderWidth: 2, borderColor: '#fff' },
  btnConfirmText: { color: '#fff', fontSize: 12, fontWeight: '900' },

  // ENTRENAMIENTOS
  dynamicTrainingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  dynamicBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  dynamicBadgeText: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },
  pitchTagText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },

  trainingList: { gap: 6, marginBottom: 12, backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 10 },
  trainingRowItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayPill: { backgroundColor: colors.skyPrimary, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 6 },
  dayPillText: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },
  trainingRowTime: { color: colors.white, fontSize: 11, fontWeight: '800' },
  trainingRowPitch: { color: colors.textMuted, fontSize: 10 },

  absenceNoticeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)', borderWidth: 1, borderColor: colors.accentGold,
    paddingVertical: 9, borderRadius: 10
  },
  absenceNoticeText: { color: colors.accentGold, fontSize: 11, fontWeight: '900' },

  // PENDIENTES DE LA FAMILIA
  pendingListContainer: { gap: 8 },
  pendingItemRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(0,0,0,0.25)', padding: 10, borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)'
  },
  pendingIconBox: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(79, 195, 247, 0.15)', justifyContent: 'center', alignItems: 'center' },
  pendingItemLabel: { flex: 1, color: colors.white, fontSize: 12, fontWeight: '700' },
  pendingBadgePill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1 },
  pendingBadgeTxt: { fontSize: 9, fontWeight: '900' },
  allClearedBox: { alignItems: 'center', paddingVertical: 10 },
  allClearedText: { color: colors.accentGreen, fontSize: 14, fontWeight: '900', marginTop: 4 },

  // RESULTADO
  resultHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lastMatchSub: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  lastMatchScore: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 2 },
  winBadge: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  winBadgeText: { color: colors.accentGreen, fontSize: 10, fontWeight: '900' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 10 },
  leaguePosRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  leaguePosText: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },

  // TARJETA ACCESO MI ZONA
  miZonaCardBanner: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.skyPrimary,
  },
  miZonaCardGradient: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miZonaCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  miZonaIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(79, 195, 247, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.skyPrimary,
  },
  miZonaTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  miZonaSub: {
    color: colors.skyGlow,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  miZonaArrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.skyPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // MODAL DE MOTIVO DE AUSENCIA
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: colors.navyCard, borderRadius: 20, padding: 20, borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 17, fontWeight: '900', marginBottom: 4 },
  modalSub: { color: colors.textMuted, fontSize: 11, marginBottom: 14, lineHeight: 16 },

  reasonOptionGroup: { gap: 6, marginBottom: 14 },
  reasonOption: { 
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 10, 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' 
  },
  reasonOptionActive: { backgroundColor: colors.navyDark, borderColor: colors.skyPrimary },
  reasonText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  reasonTextActive: { color: colors.skyPrimary, fontWeight: '900' },

  inputBoxContainer: { marginBottom: 14 },
  inputLabel: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  textInputStyle: {
    backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10, padding: 10, color: colors.white, fontSize: 12
  },

  modalBtnRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  modalBtnCancel: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  modalBtnCancelText: { color: colors.white, fontWeight: '800', fontSize: 11 },
  modalBtnSend: { flex: 1, paddingVertical: 11, borderRadius: 10, backgroundColor: colors.accentRed, alignItems: 'center' },
  modalBtnDisabled: { opacity: 0.4 },
  modalBtnSendText: { color: colors.white, fontWeight: '900', fontSize: 11 }
});
