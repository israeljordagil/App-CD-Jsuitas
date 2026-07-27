import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  useWindowDimensions,
  TextInput
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

const MOCK_TRAININGS = {
  p1: {
    childName: 'Pablo Martínez',
    team: 'Cadete B (Fútbol 11)',
    schedule: 'Martes y Jueves (17:30h - 19:00h)',
    nextSession: {
      date: 'Martes 13 de Mayo 2026',
      time: '17:30h - 19:00h',
      pickupTime: '19:15h (Salida vestuarios puerta colegio)',
      location: 'Campo 2 Césped Artificial - CD Jesuitas',
      dressingRoom: 'Vestuario Nº 3 (Apertura 17:15h)',
      kitColor: '👕 Camiseta Azul de Entrenamiento',
      weather: '⛅ 19°C • Sol y nubes',
      status: 'confirmed', // confirmed, cancelled
      carDeparture: '16:55h (15 min viaje desde casa)',
      coachMessage: '📢 Trabajo táctico de posesión y finalización. Traer espinilleras obligatorias.'
    },
    checklist: [
      { id: 'tc1', label: '👕 Camiseta Azul de entreno + Pantalón azul', checked: true },
      { id: 'tc2', label: '👟 Botas de césped artificial', checked: true },
      { id: 'tc3', label: '🦵 Espinilleras obligatorias', checked: true },
      { id: 'tc4', label: '🧴 Botella de agua personal', checked: true },
      { id: 'tc5', label: '🩴 Chancletas y toalla para ducha posterior', checked: false }
    ]
  },
  p2: {
    childName: 'Hugo Martínez',
    team: 'Infantil A (Fútbol Sala)',
    schedule: 'Lunes y Miércoles (18:00h - 19:15h)',
    nextSession: {
      date: 'Miércoles 14 de Mayo 2026',
      time: '18:00h - 19:15h',
      pickupTime: '19:30h (Puerta del colegio)',
      location: 'Pabellón Colegio Jesuitas',
      dressingRoom: 'Vestuario Pistas Nº 1',
      kitColor: '👕 Camiseta Blanca Futsal',
      weather: '☀️ 21°C • Pista Cubierta',
      status: 'confirmed',
      carDeparture: '17:30h desde casa',
      coachMessage: '📢 Trabajo de saques de esquina y estrategia.'
    },
    checklist: [
      { id: 'tc1', label: '👕 Camiseta Blanca de entreno Futsal', checked: true },
      { id: 'tc2', label: '👟 Zapatillas de suela lisa', checked: true },
      { id: 'tc3', label: '🧴 Botella de agua personal', checked: true }
    ]
  }
};

export function FamiliaEntrenamientosView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [selectedChildKey, setSelectedChildKey] = useState<'p1' | 'p2'>('p1');
  const [attendanceStatus, setAttendanceStatus] = useState<'asistira' | 'ausente'>('asistira');
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);

  // RECOGIDA AUTORIZADA DE TERCEROS & MOLESTIA FÍSICA
  const [pickupPerson, setPickupPerson] = useState('Padres (Predeterminado)');
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [physicalNote, setPhysicalNote] = useState('');
  const [isPhysicalModalOpen, setIsPhysicalModalOpen] = useState(false);

  const training = MOCK_TRAININGS[selectedChildKey];
  const [checklistItems, setChecklistItems] = useState(training.checklist);

  const toggleChecklistItem = (id: string) => {
    setChecklistItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.childSelectorRow}>
        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p1' && styles.childBtnActive]}
          onPress={() => {
            setSelectedChildKey('p1');
            setChecklistItems(MOCK_TRAININGS.p1.checklist);
          }}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p1' && styles.childBtnTextActive]}>👦 Pablo (Cadete B Fútbol)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childBtn, selectedChildKey === 'p2' && styles.childBtnActive]}
          onPress={() => {
            setSelectedChildKey('p2');
            setChecklistItems(MOCK_TRAININGS.p2.checklist);
          }}
        >
          <Text style={[styles.childBtnText, selectedChildKey === 'p2' && styles.childBtnTextActive]}>👦 Hugo (Infantil A Futsal)</Text>
        </TouchableOpacity>
      </View>

      {/* 2. ESTADO EN TIEMPO REAL DEL ENTRENO & PROTOCOLO CLIMA */}
      <View style={styles.realtimeStatusBanner}>
        <Ionicons name="checkmark-circle-sharp" size={20} color={colors.accentGreen} />
        <View style={{ flex: 1 }}>
          <Text style={styles.realtimeStatusTitle}>ENTRENAMIENTO CONFIRMADO • SIN LLUVIAS</Text>
          <Text style={styles.realtimeStatusSub}>Horario oficial: {training.schedule}</Text>
        </View>
      </View>

      {/* 3. HERO CARD PRÓXIMA SESIÓN DE ENTRENAMIENTO */}
      <View style={styles.sessionCard}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.95)', 'rgba(7, 26, 61, 0.95)']} style={styles.sessionGradient}>
          
          <View style={styles.sessionHeaderRow}>
            <View style={styles.sessionBadge}>
              <Text style={styles.sessionBadgeTxt}>PRÓXIMO ENTRENAMIENTO</Text>
            </View>
            <Text style={styles.childTeamTag}>{training.childName} ({training.team})</Text>
          </View>

          <Text style={styles.sessionDateTxt}>{training.nextSession.date}</Text>
          <Text style={styles.sessionTimeTxt}>⏰ Horario: {training.nextSession.time}</Text>

          {/* Notificación del Míster */}
          <View style={styles.coachNoteBox}>
            <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.accentGold} />
            <Text style={styles.coachNoteTxt}>{training.nextSession.coachMessage}</Text>
          </View>

          {/* Grilla Informativa para los Padres */}
          <View style={styles.infoGrid}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.infoTxt}>{training.nextSession.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="key-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.infoTxt}>{training.nextSession.dressingRoom}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="shirt-outline" size={16} color={colors.skyPrimary} />
              <Text style={styles.infoTxtBold}>{training.nextSession.kitColor}</Text>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color={colors.goldLight} />
              <Text style={styles.infoTxtBold}>Recogida Padres: <Text style={{color: colors.goldLight}}>{training.nextSession.pickupTime}</Text></Text>
            </View>
          </View>

          {/* ASISTENTE DE SALIDA EN COCHE */}
          <View style={styles.carAssistantBox}>
            <View style={styles.carHeaderRow}>
              <Ionicons name="car-sport" size={16} color={colors.accentGold} />
              <Text style={styles.carTitle}>ASISTENTE DE SALIDA DESDE CASA</Text>
            </View>
            <Text style={styles.carDepartureTxt}>Hora recomendada de salida: <Text style={{fontWeight: '900', color: colors.goldLight}}>{training.nextSession.carDeparture}</Text></Text>
          </View>

        </LinearGradient>
      </View>

      {/* 4. AVISO RÁPIDO DE AUSENCIA EN ENTRENO (1-CLIC) */}
      <Text style={styles.sectionTitle}>ASISTENCIA AL ENTRENAMIENTO</Text>
      <View style={styles.attendanceActionBox}>
        {attendanceStatus === 'asistira' ? (
          <View style={styles.confirmedAttendanceCard}>
            <Ionicons name="checkmark-circle" size={22} color={colors.accentGreen} />
            <Text style={styles.confirmedAttendanceTxt}>El niño asistirá con normalidad al entreno</Text>
            
            <TouchableOpacity style={styles.btnReportAbsence} onPress={() => setIsAbsenceModalOpen(true)}>
              <Ionicons name="alert-circle-outline" size={16} color={colors.accentRed} />
              <Text style={styles.btnReportAbsenceTxt}>Avisar de Ausencia / Falta</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.absentAttendanceCard}>
            <Ionicons name="close-circle" size={22} color={colors.accentRed} />
            <Text style={styles.absentAttendanceTxt}>Ausencia notificada al entrenador</Text>
            
            <TouchableOpacity style={styles.btnUndoAbsence} onPress={() => setAttendanceStatus('asistira')}>
              <Text style={styles.btnUndoAbsenceTxt}>Cambiar a "Sí Asistirá"</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 5. HERRAMIENTAS CLAVE DE TRANQUILIDAD FAMILIAR */}
      <Text style={styles.sectionTitle}>TRANQUILIDAD FAMILIAR (RECOGIDA & SALUD)</Text>
      <View style={styles.parentToolsRow}>
        
        {/* AUTORIZACIÓN DE RECOGIDA POR TERCEROS */}
        <TouchableOpacity style={styles.parentToolCard} onPress={() => setIsPickupModalOpen(true)}>
          <Ionicons name="person-add-outline" size={24} color={colors.skyPrimary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.parentToolTitle}>Persona Autorizada para Recoger</Text>
            <Text style={styles.parentToolSub}>Recoge hoy: <Text style={{color: colors.goldLight, fontWeight: '900'}}>{pickupPerson}</Text></Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.skyPrimary} />
        </TouchableOpacity>

        {/* NOTA DE ESTADO FÍSICO / FISIOTERAPIA */}
        <TouchableOpacity style={styles.parentToolCard} onPress={() => setIsPhysicalModalOpen(true)}>
          <Ionicons name="fitness-outline" size={24} color={colors.accentGold} />
          <View style={{ flex: 1 }}>
            <Text style={styles.parentToolTitle}>Estado Físico / Molestia al Míster</Text>
            <Text style={styles.parentToolSub}>
              {physicalNote ? `Aviso: "${physicalNote}"` : 'Sin molestias destacadas'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={colors.skyPrimary} />
        </TouchableOpacity>

      </View>

      {/* 6. CHECKLIST DE LA MOCHILA DE ENTRENAMIENTO */}
      <Text style={styles.sectionTitle}>🎒 CHECKLIST PARA EL ENTRENO DE HOY</Text>
      <View style={styles.checklistCard}>
        {checklistItems.map(item => (
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

      {/* MODAL AUTORIZACIÓN DE RECOGIDA */}
      <Modal visible={isPickupModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="shield-checkmark" size={44} color={colors.skyPrimary} />
            <Text style={styles.modalTitleCenter}>AUTORIZAR RECOGIDA DEL MENOR</Text>
            <Text style={styles.modalSubCenter}>Indica qué persona recogerá a {training.childName} a la salida de vestuarios a las {training.nextSession.pickupTime}.</Text>

            {['Padres (Predeterminado)', 'Abuelo / Abuela', 'Familia de Dani García (Coche compartido)', 'Tío / Familiar Directo', 'Otro'].map((person, idx) => (
              <TouchableOpacity 
                key={idx}
                style={styles.pickupOptionBtn}
                onPress={() => {
                  setPickupPerson(person);
                  setIsPickupModalOpen(false);
                }}
              >
                <Text style={styles.pickupOptionTxt}>{person}</Text>
                {pickupPerson === person && <Ionicons name="checkmark-circle" size={18} color={colors.accentGreen} />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsPickupModalOpen(false)}>
              <Text style={styles.modalCancelTxt}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL NOTA DE ESTADO FÍSICO AL MÍSTER */}
      <Modal visible={isPhysicalModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="fitness" size={44} color={colors.accentGold} />
            <Text style={styles.modalTitleCenter}>NOTIFICAR MOLESTIA AL MÍSTER</Text>
            <Text style={styles.modalSubCenter}>Informa al entrenador si el niño sale de una molestia para que entrene al 50% o con el fisio.</Text>

            <TextInput
              style={styles.textInputStyle}
              value={physicalNote}
              onChangeText={setPhysicalNote}
              placeholder="Ej: Molestia leve en gemelo. Entrenar suave."
              placeholderTextColor={colors.textMuted}
            />

            <TouchableOpacity style={styles.modalPublishBtn} onPress={() => setIsPhysicalModalOpen(false)}>
              <Text style={styles.modalPublishTxt}>GUARDAR AVISO PARA EL MÍSTER</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsPhysicalModalOpen(false)}>
              <Text style={styles.modalCancelTxt}>CANCELAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE MOTIVO DE AUSENCIA EN ENTRENO */}
      <Modal visible={isAbsenceModalOpen} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>MOTIVO DE LA AUSENCIA AL ENTRENO</Text>
            <Text style={styles.modalSub}>Indica el motivo para avisar al cuerpo técnico antes de la sesión.</Text>

            {['Exámenes Escolares / Estudio', 'Enfermedad / Fiebre', 'Lesión / Molestias Musculares', 'Cita Médica', 'Motivo Familiar', 'Problema de Transporte'].map((reason, idx) => (
              <TouchableOpacity 
                key={idx}
                style={styles.reasonBtn}
                onPress={() => {
                  setAttendanceStatus('ausente');
                  setIsAbsenceModalOpen(false);
                }}
              >
                <Text style={styles.reasonTxt}>{reason}</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.skyPrimary} />
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setIsAbsenceModalOpen(false)}>
              <Text style={styles.modalCloseTxt}>CANCELAR</Text>
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

  // REALTIME STATUS BANNER
  realtimeStatusBanner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: colors.accentGreen, padding: 12, borderRadius: 14, marginBottom: 16 },
  realtimeStatusTitle: { color: colors.accentGreen, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  realtimeStatusSub: { color: colors.white, fontSize: 11, marginTop: 2, fontWeight: '600' },

  // SESSION CARD
  sessionCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  sessionGradient: { padding: 16 },
  sessionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sessionBadge: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: colors.skyPrimary },
  sessionBadgeTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '900' },
  childTeamTag: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },

  sessionDateTxt: { color: colors.white, fontSize: 20, fontWeight: '900', marginBottom: 2 },
  sessionTimeTxt: { color: colors.skyGlow, fontSize: 13, fontWeight: '800', marginBottom: 12 },

  coachNoteBox: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(245, 158, 11, 0.12)', borderWidth: 1, borderColor: colors.accentGold, padding: 10, borderRadius: 10, marginBottom: 14 },
  coachNoteTxt: { flex: 1, color: colors.white, fontSize: 11, lineHeight: 16, fontWeight: '600' },

  infoGrid: { gap: 8, backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 12, marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoTxt: { color: colors.white, fontSize: 12, fontWeight: '600' },
  infoTxtBold: { color: colors.white, fontSize: 12, fontWeight: '900' },

  carAssistantBox: { backgroundColor: 'rgba(245, 158, 11, 0.12)', borderWidth: 1, borderColor: colors.accentGold, padding: 10, borderRadius: 10 },
  carHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  carTitle: { color: colors.accentGold, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  carDepartureTxt: { color: colors.white, fontSize: 11, marginTop: 2 },

  // ATTENDANCE ACTION
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10 },
  attendanceActionBox: { marginBottom: 20 },
  confirmedAttendanceCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow },
  confirmedAttendanceTxt: { flex: 1, color: colors.white, fontSize: 12, fontWeight: '700' },
  btnReportAbsence: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: colors.accentRed, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  btnReportAbsenceTxt: { color: colors.accentRed, fontSize: 11, fontWeight: '900' },

  absentAttendanceCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(239, 68, 68, 0.12)', padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.accentRed },
  absentAttendanceTxt: { flex: 1, color: colors.accentRed, fontSize: 12, fontWeight: '900' },
  btnUndoAbsence: { backgroundColor: colors.skyPrimary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  btnUndoAbsenceTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // PARENT TOOLS
  parentToolsRow: { gap: 10, marginBottom: 20 },
  parentToolCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow },
  parentToolTitle: { color: colors.white, fontSize: 12, fontWeight: '900' },
  parentToolSub: { color: colors.textMuted, fontSize: 11, marginTop: 1 },

  // CHECKLIST
  checklistCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkBox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  checkBoxChecked: { backgroundColor: colors.skyPrimary },
  checkLabel: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkLabelChecked: { textDecorationLine: 'line-through', color: colors.textMuted },

  // MODALES
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.75)', justifyContent: 'flex-end' },
  modalCard: { backgroundColor: colors.navyCard, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitle: { color: colors.white, fontSize: 18, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  modalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 16 },
  reasonBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  reasonTxt: { color: colors.white, fontSize: 13, fontWeight: '700' },
  modalCloseBtn: { marginTop: 16, paddingVertical: 12, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12 },
  modalCloseTxt: { color: colors.textMuted, fontSize: 12, fontWeight: '900' },

  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitleCenter: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 10, marginBottom: 4, letterSpacing: 0.5 },
  modalSubCenter: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 16 },

  pickupOptionBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  pickupOptionTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },

  textInputStyle: { width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 12, color: colors.white, fontSize: 12, marginBottom: 16 },

  modalPublishBtn: { width: '100%', backgroundColor: colors.skyPrimary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 8 },
  modalPublishTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },
  modalCancelBtn: { paddingVertical: 8 },
  modalCancelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
