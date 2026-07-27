import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  useWindowDimensions,
  Linking
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

const MOCK_CHATS = {
  p1: {
    childName: 'Pablo Martínez',
    team: 'Cadete B (Fútbol 11)',
    coach: {
      name: 'Carlos Ruiz (Míster Cadete B)',
      phone: '612345678',
      avatar: '👨‍💼',
      lastMessage: 'Hola familia, recordad que el jueves entrenamos con la 1ª equipación azul.',
      time: '18:45h'
    },
    messagesHistory: [
      { id: 'm1', sender: 'coach', text: 'Hola a todos, convocados confirmados para el sábado vs Levante UD B.', time: 'Ayer 19:30h' },
      { id: 'm2', sender: 'me', text: 'Perfecto Míster, Pablo estará allí a las 10:00h en vestuarios.', time: 'Ayer 19:40h' },
      { id: 'm3', sender: 'coach', text: 'Genial, recordad que el jueves entrenamos con la 1ª equipación azul.', time: '18:45h' }
    ]
  },
  p2: {
    childName: 'Hugo Martínez',
    team: 'Infantil A (Fútbol Sala)',
    coach: {
      name: 'Manolo Pérez (Míster Futsal)',
      phone: '655444333',
      avatar: '👨‍🏫',
      lastMessage: 'Traed zapatillas de suela lisa para el entreno del pabellón.',
      time: '17:15h'
    },
    messagesHistory: [
      { id: 'm1', sender: 'coach', text: 'Traed zapatillas de suela lisa para el entreno del pabellón.', time: '17:15h' }
    ]
  }
};

export function FamiliaMensajesView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [selectedChildKey, setSelectedChildKey] = useState<'p1' | 'p2'>('p1');
  const [activeTab, setActiveTab] = useState<'coach' | 'email' | 'circulares'>('coach');
  const [inputMessage, setInputMessage] = useState('');

  const chatData = MOCK_CHATS[selectedChildKey];
  const [chatHistory, setChatHistory] = useState(chatData.messagesHistory);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputMessage,
      time: 'Ahora'
    };
    setChatHistory(prev => [...prev, newMsg]);
    setInputMessage('');
  };

  const handleSendEmailCoordinacion = () => {
    const subject = `Consulta Deportiva - ${chatData.childName} (${chatData.team})`;
    const body = `Hola Coordinación Deportiva del CD Jesuitas,\n\nQuería consultaros sobre: `;
    Linking.openURL(`mailto:coordinacion@cdjesuitas.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`).catch(() => {});
  };

  const handleSendEmailAdministracion = () => {
    const subject = `Consulta de Administración - ${chatData.childName} (${chatData.team})`;
    const body = `Hola Administración del CD Jesuitas,\n\nQuería consultaros sobre (recibos / licencias / cuotas): `;
    Linking.openURL(`mailto:administracion@cdjesuitas.es?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`).catch(() => {});
  };

  return (
    <View style={styles.container}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.topSelectorContainer}>
        <View style={styles.childSelectorRow}>
          <TouchableOpacity 
            style={[styles.childBtn, selectedChildKey === 'p1' && styles.childBtnActive]}
            onPress={() => {
              setSelectedChildKey('p1');
              setChatHistory(MOCK_CHATS.p1.messagesHistory);
            }}
          >
            <Text style={[styles.childBtnText, selectedChildKey === 'p1' && styles.childBtnTextActive]}>👦 Pablo (Cadete B)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.childBtn, selectedChildKey === 'p2' && styles.childBtnActive]}
            onPress={() => {
              setSelectedChildKey('p2');
              setChatHistory(MOCK_CHATS.p2.messagesHistory);
            }}
          >
            <Text style={[styles.childBtnText, selectedChildKey === 'p2' && styles.childBtnTextActive]}>👦 Hugo (Infantil A Futsal)</Text>
          </TouchableOpacity>
        </View>

        {/* 2. PESTAÑAS: CHAT MÍSTER vs EMAIL INSTITUCIONAL vs CIRCULARES */}
        <View style={styles.tabsHeaderRow}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'coach' && styles.tabBtnActive]}
            onPress={() => setActiveTab('coach')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'coach' && styles.tabBtnTextActive]}>💬 Chat con el Míster</Text>
            {activeTab === 'coach' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'email' && styles.tabBtnActive]}
            onPress={() => setActiveTab('email')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'email' && styles.tabBtnTextActive]}>✉️ Email Club</Text>
            {activeTab === 'email' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'circulares' && styles.tabBtnActive]}
            onPress={() => setActiveTab('circulares')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'circulares' && styles.tabBtnTextActive]}>📢 Circulares</Text>
            {activeTab === 'circulares' && <View style={styles.tabUnderline} />}
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL SEGÚN PESTAÑA */}
      {activeTab === 'coach' ? (
        /* CHAT EN TIEMPO REAL CON EL ENTRENADOR */
        <View style={styles.chatSectionContainer}>
          
          {/* BANNER HEADER DEL ENTRENADOR */}
          <View style={styles.coachHeaderCard}>
            <Text style={styles.coachAvatar}>{chatData.coach.avatar}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>{chatData.coach.name}</Text>
              <Text style={styles.coachStatus}>🟢 En línea • Respuesta habitual en pocas horas</Text>
            </View>
            <TouchableOpacity 
              style={styles.coachCallBtn}
              onPress={() => Linking.openURL(`tel:${chatData.coach.phone}`)}
            >
              <Ionicons name="call" size={16} color={colors.navyDark} />
            </TouchableOpacity>
          </View>

          {/* HISTORIAL DE MENSAJES DEL CHAT */}
          <ScrollView style={styles.messagesScroll} contentContainerStyle={styles.messagesContent} showsVerticalScrollIndicator={false}>
            {chatHistory.map(msg => (
              <View 
                key={msg.id} 
                style={[
                  styles.msgBubble, 
                  msg.sender === 'me' ? styles.msgMe : styles.msgCoach
                ]}
              >
                <Text style={[styles.msgText, msg.sender === 'me' ? styles.msgTextMe : styles.msgTextCoach]}>{msg.text}</Text>
                <Text style={styles.msgTime}>{msg.time}</Text>
              </View>
            ))}
          </ScrollView>

          {/* BARRA DE ESCRITURA PARA EL PADRE/MADRE */}
          <View style={styles.inputBarRow}>
            <TextInput
              style={styles.chatInput}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder="Escribe un mensaje privado al entrenador..."
              placeholderTextColor={colors.textMuted}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <Ionicons name="send" size={18} color={colors.navyDark} />
            </TouchableOpacity>
          </View>

        </View>
      ) : activeTab === 'email' ? (
        /* CORREO ELECTRÓNICO OFICIAL CON COORDINACIÓN Y ADMINISTRACIÓN (1-CLIC) */
        <ScrollView style={styles.emailContainer} contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>CONTACTO OFICIAL POR CORREO ELECTRÓNICO</Text>
          <Text style={styles.emailSubTxt}>Para consultas formales de administración, cuotas o coordinación deportiva, te recomendamos contactar por email oficial para dejar registro por escrito.</Text>

          {/* TARJETA 1: COORDINACIÓN DEPORTIVA */}
          <View style={styles.emailContactCard}>
            <View style={styles.emailHeaderRow}>
              <View style={styles.emailIconBox}>
                <Ionicons name="trophy-outline" size={24} color={colors.skyPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.emailCardTitle}>COORDINACIÓN DEPORTIVA</Text>
                <Text style={styles.emailAddressTxt}>coordinacion@cdjesuitas.es</Text>
                <Text style={styles.emailCardSub}>Consultas de grupos, horarios, fichas federativas y torneos.</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.btnSendEmailPrimary} onPress={handleSendEmailCoordinacion}>
              <Ionicons name="mail" size={16} color={colors.navyDark} />
              <Text style={styles.btnSendEmailTxt}>Redactar Email a Coordinación</Text>
            </TouchableOpacity>
          </View>

          {/* TARJETA 2: ADMINISTRACIÓN Y SECRETARÍA */}
          <View style={styles.emailContactCard}>
            <View style={styles.emailHeaderRow}>
              <View style={[styles.emailIconBox, { backgroundColor: 'rgba(245, 158, 11, 0.15)', borderColor: colors.accentGold }]}>
                <Ionicons name="card-outline" size={24} color={colors.accentGold} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.emailCardTitle}>ADMINISTRACIÓN Y SECRETARÍA</Text>
                <Text style={styles.emailAddressTxt}>administracion@cdjesuitas.es</Text>
                <Text style={styles.emailCardSub}>Consultas de recibos, cuotas anuales, bajas o certificados.</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.btnSendEmailPrimary, { backgroundColor: colors.accentGold }]} onPress={handleSendEmailAdministracion}>
              <Ionicons name="mail" size={16} color={colors.navyDark} />
              <Text style={styles.btnSendEmailTxt}>Redactar Email a Administración</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        /* PESTAÑA CIRCULARES E INFORMACIÓN OFICIAL */
        <ScrollView style={styles.circularesContainer} contentContainerStyle={{ padding: 16 }}>
          <Text style={styles.sectionTitle}>CIRCULARES Y NOTICIAS INSTITUCIONALES</Text>

          <View style={styles.circularCard}>
            <View style={styles.circularHeader}>
              <Text style={styles.circularTag}>CIRCULAR OFICIAL Nº 4</Text>
              <Text style={styles.circularDate}>15 Mayo 2026</Text>
            </View>
            <Text style={styles.circularTitle}>Inicio de Renovación de Plazas Temporada 2026/27</Text>
            <Text style={styles.circularBody}>Estimadas familias, se abre el plazo de reserva prioritaria de plaza para los alumnos de la escuela deportiva...</Text>
          </View>

          <View style={styles.circularCard}>
            <View style={styles.circularHeader}>
              <Text style={styles.circularTag}>AVISO IMPORTANTE</Text>
              <Text style={styles.circularDate}>2 Mayo 2026</Text>
            </View>
            <Text style={styles.circularTitle}>Calendario de Fotos Oficiales del Club</Text>
            <Text style={styles.circularBody}>El próximo viernes se realizarán las fotos oficiales de equipo en el campo principal...</Text>
          </View>
        </ScrollView>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  topSelectorContainer: { padding: 16, paddingBottom: 0 },

  // SELECTOR HIJOS
  childSelectorRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  childBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  childBtnActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  childBtnTextActive: { color: colors.white, fontWeight: '900' },

  // TABS
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '15%', right: '15%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // CHAT SECTION
  chatSectionContainer: { flex: 1, padding: 16, paddingBottom: 10 },
  coachHeaderCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, marginBottom: 12 },
  coachAvatar: { fontSize: 24 },
  coachName: { color: colors.white, fontSize: 13, fontWeight: '900' },
  coachStatus: { color: colors.accentGreen, fontSize: 10, marginTop: 1 },
  coachCallBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },

  messagesScroll: { flex: 1 },
  messagesContent: { gap: 10, paddingVertical: 10 },
  msgBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginVertical: 2 },
  msgMe: { alignSelf: 'flex-end', backgroundColor: colors.skyPrimary, borderBottomRightRadius: 2 },
  msgCoach: { alignSelf: 'flex-start', backgroundColor: colors.navyCard, borderWidth: 1, borderColor: colors.borderGlow, borderBottomLeftRadius: 2 },
  msgText: { fontSize: 12, lineHeight: 17 },
  msgTextMe: { color: colors.navyDark, fontWeight: '700' },
  msgTextCoach: { color: colors.white, fontWeight: '600' },
  msgTime: { fontSize: 9, color: colors.textMuted, marginTop: 4, alignSelf: 'flex-end' },

  inputBarRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  chatInput: { flex: 1, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: colors.borderGlow, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, color: colors.white, fontSize: 12 },
  sendBtn: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },

  // EMAIL SECTION
  emailContainer: { flex: 1 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 6 },
  emailSubTxt: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginBottom: 16 },

  emailContactCard: { backgroundColor: colors.navyCard, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, padding: 16, gap: 12, marginBottom: 16 },
  emailHeaderRow: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  emailIconBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(79, 195, 247, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  emailCardTitle: { color: colors.white, fontSize: 13, fontWeight: '900' },
  emailAddressTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '800', marginTop: 1 },
  emailCardSub: { color: colors.textMuted, fontSize: 11, marginTop: 4, lineHeight: 15 },
  btnSendEmailPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.skyPrimary, paddingVertical: 12, borderRadius: 12 },
  btnSendEmailTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // CIRCULARES
  circularesContainer: { flex: 1 },
  circularCard: { backgroundColor: colors.navyCard, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 6, marginBottom: 12 },
  circularHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  circularTag: { color: colors.skyGlow, fontSize: 10, fontWeight: '900' },
  circularDate: { color: colors.textMuted, fontSize: 10 },
  circularTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  circularBody: { color: colors.textMuted, fontSize: 11, lineHeight: 16 }
});
