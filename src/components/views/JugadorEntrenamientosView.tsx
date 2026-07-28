import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  useWindowDimensions,
  Alert
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

const SCHEDULE_DAYS = [
  { day: 'Martes', time: '18:30h - 20:00h', showerTime: '19:15h', pitch: 'Campo 2 Anexo (Jesuitas)', locker: 'Vestuario 4', shirt: '🎽 Camiseta de Entreno Azul', status: 'HOY' },
  { day: 'Jueves', time: '18:30h - 20:00h', showerTime: '19:15h', pitch: 'Campo 2 Anexo (Jesuitas)', locker: 'Vestuario 4', shirt: '🎽 Camiseta de Entreno Azul', status: 'PRÓXIMO' },
];

export function JugadorEntrenamientosView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // MODAL DE AVISO DE AUSENCIA
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState(false);
  const [absenceReason, setAbsenceReason] = useState('');

  // CHECKLIST DE MOCHILA DE ENTRENO
  const [backpack, setBackpack] = useState({
    boots: true,
    shinGuards: true,
    blueShirt: true,
    waterBottle: false,
    towel: true
  });

  const toggleItem = (key: keyof typeof backpack) => {
    setBackpack(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSendAbsence = () => {
    if (absenceReason.trim()) {
      setIsAbsenceModalOpen(false);
      setAbsenceReason('');
      Alert.alert("Aviso Enviado", "El entrenador ha sido notificado de tu ausencia en el entrenamiento.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. HERO PRÓXIMO ENTRENAMIENTO DE HOY */}
      <View style={styles.heroCard}>
        <LinearGradient colors={['rgba(79, 195, 247, 0.2)', 'rgba(11, 34, 79, 0.98)']} style={styles.heroGradient}>
          
          <View style={styles.heroHeaderRow}>
            <View style={styles.todayTag}>
              <Text style={styles.todayTagTxt}>🟢 SESIÓN DE HOY</Text>
            </View>
            <Text style={styles.showerBadge}>🚿 Ducha/Salida: 19:15h</Text>
          </View>

          <Text style={styles.heroTitle}>Entrenamiento Martes (Cadete B)</Text>
          <Text style={styles.heroTime}>⏰ 18:30h - 20:00h • Campo 2 Anexo</Text>
          <Text style={styles.heroLocker}>🔑 Vestuario 4 • Polideportivo San José</Text>

          <View style={styles.shirtCardBox}>
            <Text style={styles.shirtCardTxt}>🎽 EQUIPACIÓN DEL DÍA: Camiseta de Entrenamiento Azul</Text>
          </View>

        </LinearGradient>
      </View>

      {/* 2. HORARIO SEMANAL COMPLETO */}
      <Text style={styles.sectionTitle}>📅 HORARIO SEMANAL DE ENTRENAMIENTOS</Text>
      <View style={styles.scheduleList}>
        {SCHEDULE_DAYS.map((s, idx) => (
          <View key={idx} style={styles.scheduleCard}>
            <View style={styles.scheduleHeaderRow}>
              <Text style={styles.scheduleDay}>{s.day}</Text>
              <View style={[styles.statusPill, s.status === 'HOY' ? styles.statusPillToday : styles.statusPillNext]}>
                <Text style={[styles.statusPillTxt, s.status === 'HOY' ? styles.statusPillTxtToday : styles.statusPillTxtNext]}>{s.status}</Text>
              </View>
            </View>

            <Text style={styles.scheduleTime}>⏰ {s.time} (Salida ducha: {s.showerTime})</Text>
            <Text style={styles.schedulePitch}>📍 {s.pitch} • 🔑 {s.locker}</Text>
            <Text style={styles.scheduleShirt}>{s.shirt}</Text>
          </View>
        ))}
      </View>

      {/* 3. CHECKLIST RÁPIDO DE LA MOCHILA DE ENTRENO */}
      <Text style={styles.sectionTitle}>🎒 CHECKLIST MOCHILA PARA HOY</Text>
      <View style={styles.backpackCard}>
        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('boots')}>
          <Ionicons name={backpack.boots ? "checkbox" : "square-outline"} size={20} color={backpack.boots ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.boots && styles.checkItemDone]}>Botas de fútbol de tacos de goma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('shinGuards')}>
          <Ionicons name={backpack.shinGuards ? "checkbox" : "square-outline"} size={20} color={backpack.shinGuards ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.shinGuards && styles.checkItemDone]}>Espinilleras oficiales</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('blueShirt')}>
          <Ionicons name={backpack.blueShirt ? "checkbox" : "square-outline"} size={20} color={backpack.blueShirt ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.blueShirt && styles.checkItemDone]}>Camiseta de entreno azul</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('towel')}>
          <Ionicons name={backpack.towel ? "checkbox" : "square-outline"} size={20} color={backpack.towel ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.towel && styles.checkItemDone]}>Toalla y gel de ducha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('waterBottle')}>
          <Ionicons name={backpack.waterBottle ? "checkbox" : "square-outline"} size={20} color={backpack.waterBottle ? colors.accentGreen : colors.textMuted} />
          <Text style={[styles.checkItemTxt, backpack.waterBottle && styles.checkItemDone]}>Botella de agua (1.5L)</Text>
        </TouchableOpacity>
      </View>

      {/* 4. PROTOCOLO DE CLIMA Y LLUVIA */}
      <Text style={styles.sectionTitle}>🌧️ PROTOCOLO EN CASO DE LLUVIA</Text>
      <View style={styles.weatherProtocolCard}>
        <Ionicons name="rainy-outline" size={24} color={colors.skyPrimary} />
        <View style={{ flex: 1 }}>
          <Text style={styles.protocolTitle}>SE ENTRENA SIEMPRE SALVO AVISO OFICIAL</Text>
          <Text style={styles.protocolSub}>En los campos de césped artificial se entrena con lluvia moderada. Solo se suspende si hay tormenta eléctrica o riesgo de inundación comunicado por la dirección.</Text>
        </View>
      </View>

      {/* 5. AVISO DE AUSENCIA AL ENTRENADOR */}
      <TouchableOpacity 
        style={styles.absenceBtn}
        onPress={() => setIsAbsenceModalOpen(true)}
      >
        <Ionicons name="alert-circle-outline" size={20} color={colors.accentRed} />
        <Text style={styles.absenceBtnTxt}>AVISAR AL MÍSTER SI NO PUEDES ASISTIR HOY</Text>
      </TouchableOpacity>

      {/* MODAL PARA ENVIAR AVISO DE AUSENCIA */}
      <Modal visible={isAbsenceModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="chatbubble-ellipses" size={40} color={colors.accentRed} />
            <Text style={styles.modalTitleCenter}>AVISO DE AUSENCIA / RETRASO</Text>
            <Text style={styles.modalSubCenter}>Indica la causa al cuerpo técnico (enfermedad, examen o causa familiar):</Text>

            <TextInput 
              style={styles.reasonInput}
              value={absenceReason}
              onChangeText={setAbsenceReason}
              placeholder="Ej: Tengo examen mañana y no podré asistir..."
              placeholderTextColor={colors.textMuted}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSendAbsence}>
              <Text style={styles.modalSaveTxt}>ENVIAR AVISO AL MÍSTER</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsAbsenceModalOpen(false)}>
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

  heroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  heroGradient: { padding: 16, gap: 8 },
  heroHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  todayTag: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.accentGreen },
  todayTagTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },
  showerBadge: { color: colors.goldLight, fontSize: 10, fontWeight: '800' },

  heroTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginTop: 4 },
  heroTime: { color: colors.skyGlow, fontSize: 13, fontWeight: '800' },
  heroLocker: { color: colors.textMuted, fontSize: 11 },

  shirtCardBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 10, marginTop: 4 },
  shirtCardTxt: { color: colors.goldLight, fontSize: 11, fontWeight: '900' },

  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10, marginTop: 6 },

  scheduleList: { gap: 10, marginBottom: 20 },
  scheduleCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 4 },
  scheduleHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  scheduleDay: { color: colors.white, fontSize: 15, fontWeight: '900' },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusPillToday: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: colors.accentGreen },
  statusPillNext: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderWidth: 1, borderColor: colors.skyPrimary },
  statusPillTxtToday: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },
  statusPillTxtNext: { color: colors.skyGlow, fontSize: 9, fontWeight: '900' },

  scheduleTime: { color: colors.goldLight, fontSize: 12, fontWeight: '800' },
  schedulePitch: { color: colors.textMuted, fontSize: 11 },
  scheduleShirt: { color: colors.white, fontSize: 11, fontWeight: '700', marginTop: 2 },

  backpackCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkItemTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkItemDone: { textDecorationLine: 'line-through', color: colors.textMuted },

  weatherProtocolCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 20 },
  protocolTitle: { color: colors.white, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  protocolSub: { color: colors.textMuted, fontSize: 10, marginTop: 2, lineHeight: 15 },

  absenceBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(239, 68, 68, 0.12)', paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.accentRed, marginBottom: 20 },
  absenceBtnTxt: { color: colors.accentRed, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },

  // MODAL ABSENCE
  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.82)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.accentRed },
  modalTitleCenter: { color: colors.white, fontSize: 14, fontWeight: '900', marginTop: 10, marginBottom: 4, letterSpacing: 0.5 },
  modalSubCenter: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 16 },
  reasonInput: { width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: colors.skyPrimary, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, color: colors.white, fontSize: 12, marginBottom: 16 },
  modalSaveBtn: { backgroundColor: colors.accentRed, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 8 },
  modalSaveTxt: { color: colors.white, fontSize: 11, fontWeight: '900' },
  modalCancelBtn: { paddingVertical: 6 },
  modalCancelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
