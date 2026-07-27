import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch, 
  Modal,
  TextInput,
  useWindowDimensions
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

export function FamiliaAjustes() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // IBAN BANCARIO Y MODAL DE CAMBIO
  const [iban, setIban] = useState('ES48 2100 0412 8842 9912');
  const [isIbanModalOpen, setIsIbanModalOpen] = useState(false);
  const [newIbanInput, setNewIbanInput] = useState('');

  // ESTADOS DE PREFERENCIAS
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [autoSyncCalendar, setAutoSyncCalendar] = useState(true);
  const [eveReminder, setEveReminder] = useState(true);

  const handleSaveIban = () => {
    if (newIbanInput.trim().length >= 15) {
      setIban(newIbanInput.toUpperCase());
      setIsIbanModalOpen(false);
      setNewIbanInput('');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. FICHA DE DATOS DE LA FAMILIA */}
      <View style={styles.profileCard}>
        <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.profileGradient}>
          <View style={styles.profileHeaderRow}>
            <View style={styles.avatarCircle}>
              <FontAwesome name="user" size={32} color={colors.navyDark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileName}>Familia Martínez García</Text>
              <Text style={styles.profileEmail}>carlos.martinez@email.com</Text>
              <Text style={styles.profilePhone}>📞 +34 612 345 678</Text>
            </View>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="create-outline" size={18} color={colors.skyPrimary} />
            </TouchableOpacity>
          </View>

          {/* DATOS BANCARIOS REGISTRADOS PARA REMESAS BANCARIAS */}
          <View style={styles.bankCardInfo}>
            <Ionicons name="card-outline" size={22} color={colors.accentGold} />
            <View style={{ flex: 1 }}>
              <Text style={styles.bankLabel}>CUENTA DE DOMICILIACIÓN SEPA HABITUAL:</Text>
              <Text style={styles.bankIban}>{iban}</Text>
            </View>
            <TouchableOpacity 
              style={styles.changeIbanBtn}
              onPress={() => {
                setNewIbanInput(iban);
                setIsIbanModalOpen(true);
              }}
            >
              <Text style={styles.changeIbanTxt}>Cambiar IBAN</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      {/* 2. CALENDARIO DE REMESAS BANCARIAS / PAGOS TRIMESTRALES ESPECIFICADO POR JUGADOR */}
      <Text style={styles.sectionTitle}>💶 PLAN DE REMESAS BANCARIAS (CUOTAS POR JUGADOR)</Text>
      <View style={styles.remesasCard}>
        <Text style={styles.remesaNoticeTxt}>*Los cobros son domiciliados individualmente por cada jugador inscrito en el club (Pablo Martínez / Hugo Martínez):</Text>
        
        <View style={styles.remesaRow}>
          <View style={styles.remesaIconConfirmed}>
            <Ionicons name="checkmark-sharp" size={14} color={colors.navyDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.remesaTitle}>1er Pago: Inscripción / Matrícula</Text>
            <Text style={styles.remesaSub}>Al formalizar la plaza del alumno</Text>
          </View>
          <Text style={styles.remesaAmountConfirmed}>230 € / Jugador (COBRADO)</Text>
        </View>

        <View style={styles.remesaRow}>
          <View style={styles.remesaIconConfirmed}>
            <Ionicons name="checkmark-sharp" size={14} color={colors.navyDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.remesaTitle}>2º Pago: Remesa Septiembre</Text>
            <Text style={styles.remesaSub}>Cargado el 15 de Septiembre</Text>
          </View>
          <Text style={styles.remesaAmountConfirmed}>200 € / Jugador (COBRADO)</Text>
        </View>

        <View style={styles.remesaRow}>
          <View style={styles.remesaIconPending}>
            <Ionicons name="time-outline" size={14} color={colors.navyDark} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.remesaTitle}>3er Pago: Remesa Diciembre</Text>
            <Text style={styles.remesaSub}>Cargo programado el 15 de Diciembre</Text>
          </View>
          <Text style={styles.remesaAmountPending}>200 € / Jugador (PENDIENTE)</Text>
        </View>

        <View style={styles.remesaRow}>
          <View style={[styles.remesaIconPending, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
            <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.remesaTitle}>4º Pago: Remesa Marzo</Text>
            <Text style={styles.remesaSub}>Cargo programado el 15 de Marzo</Text>
          </View>
          <Text style={styles.remesaAmountFuture}>200 € / Jugador (PENDIENTE)</Text>
        </View>
      </View>

      {/* 3. HIJOS VINCULADOS A LA CUENTA */}
      <Text style={styles.sectionTitle}>👦 HIJOS VINCULADOS EN EL CLUB</Text>
      <View style={styles.childrenContainer}>
        <View style={styles.childCardRow}>
          <View style={styles.childAvatarMini}>
            <Text style={{ fontSize: 18 }}>👦</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.childNameTxt}>Pablo Martínez</Text>
            <Text style={styles.childSubTxt}>Cadete B • Fútbol 11 (#10)</Text>
          </View>
          <View style={styles.activeTag}>
            <Text style={styles.activeTagTxt}>ACTIVO</Text>
          </View>
        </View>

        <View style={styles.childCardRow}>
          <View style={styles.childAvatarMini}>
            <Text style={{ fontSize: 18 }}>👦</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.childNameTxt}>Hugo Martínez</Text>
            <Text style={styles.childSubTxt}>Infantil A • Fútbol Sala (#9)</Text>
          </View>
          <View style={styles.activeTag}>
            <Text style={styles.activeTagTxt}>ACTIVO</Text>
          </View>
        </View>
      </View>

      {/* 4. PREFERENCIAS DE SEGURIDAD Y LOGÍSTICA */}
      <Text style={styles.sectionTitle}>⚙️ PREFERENCIAS Y SEGURIDAD</Text>
      <View style={styles.settingsCard}>
        
        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Acceso por Face ID / Touch ID</Text>
            <Text style={styles.settingSub}>Entrada rápida y segura sin introducir contraseña</Text>
          </View>
          <Switch 
            value={faceIdEnabled} 
            onValueChange={setFaceIdEnabled}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.skyPrimary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Sincronización con Calendario iOS/Google</Text>
            <Text style={styles.settingSub}>Añadir automáticamente partidos y entrenos a tu agenda personal</Text>
          </View>
          <Switch 
            value={autoSyncCalendar} 
            onValueChange={setAutoSyncCalendar}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.skyPrimary }}
            thumbColor={colors.white}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingTitle}>Recordatorio de Víspera (Viernes 20:00h)</Text>
            <Text style={styles.settingSub}>Notificación semanal con la ropa y la citación del fin de semana</Text>
          </View>
          <Switch 
            value={eveReminder} 
            onValueChange={setEveReminder}
            trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.accentGold }}
            thumbColor={colors.white}
          />
        </View>

      </View>

      {/* 5. PRIVACIDAD Y SEGURIDAD DE LA CUENTA */}
      <Text style={styles.sectionTitle}>🔒 PRIVACIDAD Y SEGURIDAD</Text>
      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.actionLinkRow}>
          <Ionicons name="key-outline" size={18} color={colors.skyPrimary} />
          <Text style={styles.actionLinkTxt}>Cambiar Contraseña de Acceso</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionLinkRow}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.accentGreen} />
          <Text style={styles.actionLinkTxt}>Política de Protección de Datos (RGPD)</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* 6. BOTÓN DE CERRAR SESIÓN */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={18} color={colors.accentRed} />
        <Text style={styles.logoutTxt}>CERRAR SESIÓN EN ESTE DISPOSITIVO</Text>
      </TouchableOpacity>

      <Text style={styles.versionFooter}>CD JESUITAS VALENCIA • App Oficial v2.4.0</Text>

      {/* MODAL PARA CAMBIAR IBAN BANCARIO DE DOMICILIACIÓN */}
      <Modal visible={isIbanModalOpen} transparent animationType="fade">
        <View style={styles.modalBgCenter}>
          <View style={styles.modalCardCenter}>
            <Ionicons name="card" size={44} color={colors.accentGold} />
            <Text style={styles.modalTitleCenter}>ACTUALIZAR IBAN DE DOMICILIACIÓN</Text>
            <Text style={styles.modalSubCenter}>Introduce el nuevo número de cuenta bancaria para las próximas remesas trimestrales por jugador (Septiembre 200€, Diciembre 200€, Marzo 200€):</Text>

            <TextInput 
              style={styles.ibanInput}
              value={newIbanInput}
              onChangeText={setNewIbanInput}
              placeholder="ES00 0000 0000 0000 0000 0000"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
            />

            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveIban}>
              <Text style={styles.modalSaveTxt}>GUARDAR Y ENVIAR AL CLUB</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setIsIbanModalOpen(false)}>
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

  // PROFILE CARD
  profileCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  profileGradient: { padding: 16 },
  profileHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  avatarCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  profileName: { color: colors.white, fontSize: 16, fontWeight: '900' },
  profileEmail: { color: colors.skyGlow, fontSize: 11, fontWeight: '700', marginTop: 1 },
  profilePhone: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  editBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(79, 195, 247, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },

  bankCardInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  bankLabel: { color: colors.textMuted, fontSize: 9, fontWeight: '800' },
  bankIban: { color: colors.goldLight, fontSize: 12, fontWeight: '900', marginTop: 2 },
  changeIbanBtn: { backgroundColor: colors.skyPrimary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  changeIbanTxt: { color: colors.navyDark, fontSize: 10, fontWeight: '900' },

  // REMESAS
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10, marginTop: 6 },
  remesasCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  remesaNoticeTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '700', marginBottom: 4 },
  remesaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 8 },
  remesaIconConfirmed: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accentGreen, justifyContent: 'center', alignItems: 'center' },
  remesaIconPending: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accentGold, justifyContent: 'center', alignItems: 'center' },
  remesaTitle: { color: colors.white, fontSize: 12, fontWeight: '800' },
  remesaSub: { color: colors.textMuted, fontSize: 10 },
  remesaAmountConfirmed: { color: colors.accentGreen, fontSize: 11, fontWeight: '900' },
  remesaAmountPending: { color: colors.accentGold, fontSize: 11, fontWeight: '900' },
  remesaAmountFuture: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },

  // HIJOS
  childrenContainer: { gap: 8, marginBottom: 20 },
  childCardRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow },
  childAvatarMini: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center' },
  childNameTxt: { color: colors.white, fontSize: 13, fontWeight: '900' },
  childSubTxt: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  activeTag: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.accentGreen },
  activeTagTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },

  // SETTINGS
  settingsCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 14, marginBottom: 20 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 10 },
  settingTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  settingSub: { color: colors.textMuted, fontSize: 11, marginTop: 2, lineHeight: 15 },

  actionLinkRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  actionLinkTxt: { color: colors.white, fontSize: 12, fontWeight: '700', flex: 1 },

  // LOGOUT
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: 'rgba(239, 68, 68, 0.12)', paddingVertical: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.accentRed, marginBottom: 16 },
  logoutTxt: { color: colors.accentRed, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },

  versionFooter: { color: colors.textMuted, fontSize: 10, textAlign: 'center' },

  // MODAL IBAN
  modalBgCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.82)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalCardCenter: { width: '100%', maxWidth: 360, backgroundColor: colors.navyCard, borderRadius: 24, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  modalTitleCenter: { color: colors.white, fontSize: 14, fontWeight: '900', marginTop: 10, marginBottom: 4, letterSpacing: 0.5 },
  modalSubCenter: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 16, marginBottom: 16 },
  ibanInput: { width: '100%', backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 1, borderColor: colors.skyPrimary, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: colors.goldLight, fontSize: 13, fontWeight: '900', textAlign: 'center', marginBottom: 16 },
  modalSaveBtn: { backgroundColor: colors.skyPrimary, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, width: '100%', alignItems: 'center', marginBottom: 8 },
  modalSaveTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },
  modalCancelBtn: { paddingVertical: 6 },
  modalCancelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' }
});
