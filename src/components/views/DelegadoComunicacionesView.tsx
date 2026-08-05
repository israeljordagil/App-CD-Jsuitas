import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Linking,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

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

const DELEGADO_EMAIL = 'israeljordagil@gmail.com';
const COACH_NAME = 'Míster Cadete B';
const COACH_PHONE_DISPLAY = '613 394 551';
const COACH_PHONE_RAW = '613394551';
const COACH_WHATSAPP_NUM = '34613394551';

const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.clipboard) {
      await window.navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    console.warn('Clipboard write failed:', e);
  }
  return false;
};

export function DelegadoComunicacionesView() {
  const [chatText, setChatText] = useState('');

  // Fallback modal states for Email
  const [showMailFallbackModal, setShowMailFallbackModal] = useState(false);
  const [mailFallbackSubject, setMailFallbackSubject] = useState('');
  const [copiedMailStatus, setCopiedMailStatus] = useState('');

  // Fallback modal states for WhatsApp
  const [showWaFallbackModal, setShowWaFallbackModal] = useState(false);
  const [waFallbackText, setWaFallbackText] = useState('');
  const [copiedWaStatus, setCopiedWaStatus] = useState('');

  const generateMailBody = () => {
    return `Equipo: Cadete B\nCategoría: Cadete\nDelegado:\n\nMensaje:\n`;
  };

  const handleOpenGmailWeb = () => {
    const body = generateMailBody();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(DELEGADO_EMAIL)}&su=${encodeURIComponent(mailFallbackSubject)}&body=${encodeURIComponent(body)}`;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(gmailUrl, '_blank');
    } else {
      Linking.openURL(gmailUrl).catch(() => {});
    }
  };

  const handleOpenEmail = async (subject: string) => {
    const body = generateMailBody();
    const mailtoUrl = `mailto:${DELEGADO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailFallbackSubject(subject);
    setCopiedMailStatus('');

    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          try {
            window.location.href = mailtoUrl;
          } catch {}
        }
        setShowMailFallbackModal(true);
        return;
      }

      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
      } else {
        setShowMailFallbackModal(true);
      }
    } catch (e) {
      setShowMailFallbackModal(true);
    }
  };

  const handleCallCoach = async () => {
    const telUrl = `tel:${COACH_PHONE_RAW}`;
    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.location.href = telUrl;
          return;
        }
      }
      const canOpen = await Linking.canOpenURL(telUrl);
      if (canOpen) {
        await Linking.openURL(telUrl);
      } else {
        alert(`Llamar a ${COACH_NAME}: ${COACH_PHONE_DISPLAY}`);
      }
    } catch {
      alert(`Llamar a ${COACH_NAME}: ${COACH_PHONE_DISPLAY}`);
    }
  };

  const buildWhatsAppUrl = (customMessage?: string) => {
    const prefix = 'Hola, contacto desde la APP CD Jesuitas sobre el equipo Cadete B.';
    const finalMsg = customMessage && customMessage.trim()
      ? `${prefix}\n\nMensaje del Delegado:\n${customMessage.trim()}`
      : prefix;
    return `https://wa.me/${COACH_WHATSAPP_NUM}?text=${encodeURIComponent(finalMsg)}`;
  };

  const handleSendWhatsApp = async (customMessage?: string) => {
    const textToSend = customMessage !== undefined ? customMessage : chatText;
    if (customMessage === undefined && !textToSend.trim()) return;

    const waUrl = buildWhatsAppUrl(textToSend);

    try {
      if (Platform.OS === 'web') {
        if (typeof window !== 'undefined') {
          window.open(waUrl, '_blank');
          if (customMessage === undefined) {
            setChatText('');
          }
          return;
        }
      }

      const canOpen = await Linking.canOpenURL(waUrl);
      if (canOpen) {
        await Linking.openURL(waUrl);
        if (customMessage === undefined) {
          setChatText('');
        }
      } else {
        setWaFallbackText(textToSend);
        setCopiedWaStatus('');
        setShowWaFallbackModal(true);
      }
    } catch (e) {
      setWaFallbackText(textToSend);
      setCopiedWaStatus('');
      setShowWaFallbackModal(true);
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (Platform.OS === 'web') {
      const webEvent = e as any;
      if (webEvent.nativeEvent?.key === 'Enter' && !webEvent.nativeEvent?.shiftKey) {
        webEvent.preventDefault?.();
        handleSendWhatsApp();
      }
    }
  };

  const handleCopyEmail = async () => {
    const ok = await copyToClipboard(DELEGADO_EMAIL);
    setCopiedMailStatus(ok ? '¡Correo copiado al portapapeles!' : `Correo: ${DELEGADO_EMAIL}`);
  };

  const handleCopySubject = async () => {
    const ok = await copyToClipboard(mailFallbackSubject);
    setCopiedMailStatus(ok ? '¡Asunto copiado al portapapeles!' : `Asunto: ${mailFallbackSubject}`);
  };

  const handleCopyWaMessage = async () => {
    const prefix = 'Hola, contacto desde la APP CD Jesuitas sobre el equipo Cadete B.';
    const finalMsg = waFallbackText.trim()
      ? `${prefix}\n\nMensaje del Delegado:\n${waFallbackText.trim()}`
      : prefix;
    const ok = await copyToClipboard(finalMsg);
    setCopiedWaStatus(ok ? '¡Mensaje copiado al portapapeles!' : 'Mensaje preparado copiado.');
  };

  const handleCopyWaPhone = async () => {
    const ok = await copyToClipboard(`+34 ${COACH_PHONE_DISPLAY}`);
    setCopiedWaStatus(ok ? '¡Teléfono copiado al portapapeles!' : `Teléfono: +34 ${COACH_PHONE_DISPLAY}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        
        {/* HEADER HERO */}
        <LinearGradient
          colors={['#0B224F', '#071A3D']}
          style={styles.heroCard}
        >
          <View style={styles.heroBadge}>
            <Ionicons name="chatbubbles-outline" size={16} color={colors.skyGlow} />
            <Text style={styles.heroBadgeTxt}>CANALES OFICIALES DE COMUNICACIÓN</Text>
          </View>
          <Text style={styles.heroTitle}>Comunicaciones del Delegado</Text>
          <Text style={styles.heroSub}>
            Contacto institucional con Coordinación, Administración y Cuerpo Técnico (Cadete B).
          </Text>
        </LinearGradient>

        {/* BLOQUE 1: ENTRENADOR (MÍSTER CADETE B) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(79, 195, 247, 0.15)' }]}>
              <Ionicons name="person-outline" size={20} color={colors.skyGlow} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>{COACH_NAME}</Text>
              <Text style={styles.sectionSub}>Entrenador Principal · Cadete B</Text>
            </View>
            <View style={styles.phoneBadge}>
              <Ionicons name="call-outline" size={14} color={colors.goldLight} />
              <Text style={styles.phoneBadgeTxt}>{COACH_PHONE_DISPLAY}</Text>
            </View>
          </View>

          {/* BOTONES DE ACCIÓN DIRECTA CON EL ENTRENADOR */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.callBtn]}
              onPress={handleCallCoach}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={18} color={colors.navyDark} />
              <Text style={styles.callBtnTxt}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, styles.waBtn]}
              onPress={() => handleSendWhatsApp('')}
              activeOpacity={0.85}
            >
              <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
              <Text style={styles.waBtnTxt}>Abrir WhatsApp</Text>
            </TouchableOpacity>
          </View>

          {/* CHAT DIRECTO CON WHATSAPP */}
          <View style={styles.chatBox}>
            <Text style={styles.chatBoxTitle}>Enviar mensaje al Míster por WhatsApp:</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Escribe tu mensaje aquí..."
                placeholderTextColor={colors.textMuted}
                value={chatText}
                onChangeText={setChatText}
                multiline
                onSubmitEditing={() => handleSendWhatsApp()}
                onKeyPress={handleKeyPress}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[styles.sendBtn, !chatText.trim() && styles.sendBtnDisabled]}
                onPress={() => handleSendWhatsApp()}
                activeOpacity={0.85}
                disabled={!chatText.trim()}
              >
                <Ionicons name="paper-plane" size={18} color={colors.navyDark} />
              </TouchableOpacity>
            </View>
            <Text style={styles.chatHint}>
              💡 Pulsa <Text style={{ fontWeight: '800', color: colors.skyGlow }}>Intro</Text> o el botón enviar para redactar directamente en WhatsApp.
            </Text>
          </View>
        </View>

        {/* BLOQUE 2: COORDINACIÓN DEPORTIVA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(245, 158, 11, 0.15)' }]}>
              <Ionicons name="school-outline" size={20} color={colors.accentGold} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Coordinación Deportiva</Text>
              <Text style={styles.sectionSub}>Consultas técnicas, licencias y reglamentos</Text>
            </View>
          </View>

          <View style={styles.emailDetailBox}>
            <Text style={styles.emailLabel}>Correo oficial asignado:</Text>
            <Text style={styles.emailValue}>{DELEGADO_EMAIL}</Text>
          </View>

          <TouchableOpacity
            style={styles.emailBtn}
            onPress={() => handleOpenEmail('APP CD Jesuitas | Delegado | Coordinación Deportiva')}
            activeOpacity={0.85}
          >
            <Ionicons name="mail" size={18} color={colors.navyDark} />
            <Text style={styles.emailBtnTxt}>Redactar Email a Coordinación</Text>
          </TouchableOpacity>
        </View>

        {/* BLOQUE 3: ADMINISTRACIÓN Y SECRETARÍA */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
              <Ionicons name="card-outline" size={20} color={colors.accentGreen} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Administración y Secretaría</Text>
              <Text style={styles.sectionSub}>Gestión de cuotas, justificantes y documentación</Text>
            </View>
          </View>

          <View style={styles.emailDetailBox}>
            <Text style={styles.emailLabel}>Correo oficial asignado:</Text>
            <Text style={styles.emailValue}>{DELEGADO_EMAIL}</Text>
          </View>

          <TouchableOpacity
            style={[styles.emailBtn, { backgroundColor: colors.accentGreen }]}
            onPress={() => handleOpenEmail('APP CD Jesuitas | Delegado | Administración y Secretaría')}
            activeOpacity={0.85}
          >
            <Ionicons name="mail" size={18} color={colors.white} />
            <Text style={[styles.emailBtnTxt, { color: colors.white }]}>Redactar Email a Administración</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* FALLBACK MODAL: EMAIL */}
      <Modal
        visible={showMailFallbackModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMailFallbackModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="mail-outline" size={42} color={colors.skyGlow} />
            <Text style={styles.modalTitle}>Opciones para enviar correo</Text>
            <Text style={styles.modalSub}>
              Selecciona tu vía preferida para redactar el correo:
            </Text>

            <View style={styles.fallbackInfoBox}>
              <Text style={styles.fallbackLabel}>Destinatario:</Text>
              <Text style={styles.fallbackVal}>{DELEGADO_EMAIL}</Text>
              <Text style={[styles.fallbackLabel, { marginTop: 8 }]}>Asunto:</Text>
              <Text style={styles.fallbackVal}>{mailFallbackSubject}</Text>
            </View>

            {copiedMailStatus !== '' && (
              <Text style={styles.copiedAlert}>{copiedMailStatus}</Text>
            )}

            <View style={styles.modalBtnCol}>
              <TouchableOpacity style={[styles.modalActionBtn, { backgroundColor: '#EA4335' }]} onPress={handleOpenGmailWeb} activeOpacity={0.85}>
                <Ionicons name="logo-google" size={16} color={colors.white} />
                <Text style={[styles.modalActionBtnTxt, { color: colors.white }]}>Abrir Gmail web</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalActionBtn} onPress={handleCopyEmail} activeOpacity={0.85}>
                <Ionicons name="copy-outline" size={16} color={colors.navyDark} />
                <Text style={styles.modalActionBtnTxt}>Copiar correo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalActionBtn, { backgroundColor: colors.navyCard, borderWidth: 1, borderColor: colors.borderGlow }]} onPress={handleCopySubject} activeOpacity={0.85}>
                <Ionicons name="copy-outline" size={16} color={colors.skyGlow} />
                <Text style={[styles.modalActionBtnTxt, { color: colors.skyGlow }]}>Copiar asunto</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowMailFallbackModal(false)} activeOpacity={0.85}>
                <Text style={styles.modalCloseBtnTxt}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* FALLBACK MODAL: WHATSAPP */}
      <Modal
        visible={showWaFallbackModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWaFallbackModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="logo-whatsapp" size={42} color={colors.accentGreen} />
            <Text style={styles.modalTitle}>No se ha podido abrir WhatsApp</Text>
            <Text style={styles.modalSub}>
              Puedes copiar el teléfono del entrenador o el mensaje formateado para pegarlo en WhatsApp:
            </Text>

            <View style={styles.fallbackInfoBox}>
              <Text style={styles.fallbackLabel}>Teléfono WhatsApp:</Text>
              <Text style={styles.fallbackVal}>+34 {COACH_PHONE_DISPLAY}</Text>
              <Text style={[styles.fallbackLabel, { marginTop: 8 }]}>Mensaje preparado:</Text>
              <Text style={styles.fallbackVal}>
                Hola, contacto desde la APP CD Jesuitas sobre el equipo Cadete B.{'\n\n'}
                {waFallbackText ? `Mensaje del Delegado:\n${waFallbackText}` : ''}
              </Text>
            </View>

            {copiedWaStatus !== '' && (
              <Text style={styles.copiedAlert}>{copiedWaStatus}</Text>
            )}

            <View style={styles.modalBtnCol}>
              <TouchableOpacity style={styles.modalActionBtn} onPress={handleCopyWaMessage} activeOpacity={0.85}>
                <Ionicons name="copy-outline" size={16} color={colors.navyDark} />
                <Text style={styles.modalActionBtnTxt}>Copiar mensaje</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalActionBtn, { backgroundColor: colors.navyCard, borderWidth: 1, borderColor: colors.borderGlow }]} onPress={handleCopyWaPhone} activeOpacity={0.85}>
                <Ionicons name="copy-outline" size={16} color={colors.skyGlow} />
                <Text style={[styles.modalActionBtnTxt, { color: colors.skyGlow }]}>Copiar número</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowWaFallbackModal(false)} activeOpacity={0.85}>
                <Text style={styles.modalCloseBtnTxt}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  heroCard: { padding: 20, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.borderGlow },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(129, 212, 250, 0.15)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 10 },
  heroBadgeTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  heroTitle: { color: colors.white, fontSize: 22, fontWeight: '900', marginBottom: 4 },
  heroSub: { color: colors.textMuted, fontSize: 13, lineHeight: 18 },

  sectionCard: { backgroundColor: colors.navyCard, padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: colors.borderGlow },
  sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '800' },
  sectionSub: { color: colors.textMuted, fontSize: 12 },

  phoneBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  phoneBadgeTxt: { color: colors.goldLight, fontSize: 12, fontWeight: '900' },

  actionRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12, borderRadius: 10 },
  callBtn: { backgroundColor: colors.goldLight },
  callBtnTxt: { color: colors.navyDark, fontWeight: '900', fontSize: 14 },
  waBtn: { backgroundColor: '#25D366' },
  waBtnTxt: { color: colors.white, fontWeight: '900', fontSize: 14 },

  chatBox: { backgroundColor: 'rgba(7, 26, 61, 0.6)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  chatBoxTitle: { color: colors.white, fontSize: 12, fontWeight: '800', marginBottom: 8 },
  inputRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: colors.navyDark, color: colors.white, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, fontSize: 13, maxHeight: 80, borderWidth: 1, borderColor: colors.borderGlow },
  sendBtn: { backgroundColor: colors.skyGlow, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sendBtnDisabled: { opacity: 0.4 },
  chatHint: { color: colors.textMuted, fontSize: 11, marginTop: 8 },

  emailDetailBox: { backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, marginBottom: 12 },
  emailLabel: { color: colors.textMuted, fontSize: 11 },
  emailValue: { color: colors.skyGlow, fontSize: 14, fontWeight: '800', marginTop: 2 },

  emailBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.skyGlow, paddingVertical: 12, borderRadius: 10 },
  emailBtnTxt: { color: colors.navyDark, fontWeight: '900', fontSize: 14 },

  // MODAL STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.75)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: colors.navyCard, width: '100%', maxWidth: 440, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: colors.skyGlow, alignItems: 'center' },
  modalTitle: { color: colors.white, fontSize: 17, fontWeight: '900', textAlign: 'center', marginTop: 10, marginBottom: 6 },
  modalSub: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 14, lineHeight: 18 },

  fallbackInfoBox: { backgroundColor: colors.navyDark, width: '100%', padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  fallbackLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  fallbackVal: { color: colors.skyGlow, fontSize: 13, fontWeight: '800', marginTop: 2 },

  copiedAlert: { color: colors.accentGreen, fontSize: 12, fontWeight: '800', marginBottom: 12 },

  modalBtnCol: { width: '100%', gap: 8 },
  modalActionBtn: { backgroundColor: colors.skyGlow, width: '100%', paddingVertical: 12, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  modalActionBtnTxt: { color: colors.navyDark, fontWeight: '900', fontSize: 13 },
  modalCloseBtn: { paddingVertical: 10, alignItems: 'center', marginTop: 4 },
  modalCloseBtnTxt: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
});
