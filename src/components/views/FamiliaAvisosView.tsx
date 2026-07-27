import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
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

const MOCK_NOTIFICATIONS = [
  {
    id: 'n1',
    childKey: 'p1',
    priority: 'urgent', // urgent, high, normal, medical
    title: '⚠️ CAMBIO DE HORARIO DE CITACIÓN',
    category: 'Pablo • Cadete B',
    message: 'El míster ha adelantado la citación del partido vs Levante UD B a las 09:45h en vestuarios.',
    time: 'Hace 30 min',
    unread: true
  },
  {
    id: 'n2',
    childKey: 'p1',
    priority: 'medical',
    title: '🏥 AVISO DEL SERVICIO DE FISIOTERAPIA',
    category: 'Pablo • Cadete B',
    message: 'Pablo ha sido atendido en el vestuario por el fisio tras el entreno (sobrecarga leve en abductor). Se recomienda hielo.',
    time: 'Ayer 19:15h',
    unread: true
  },
  {
    id: 'n3',
    childKey: 'p2',
    priority: 'high',
    title: '🚗 ALERTA DE LOGÍSTICA FAMILIAR (SOLAPAMIENTO)',
    category: 'Pablo y Hugo',
    message: 'Atención: Coinciden el partido de Pablo (11:00h en Jesuitas) y el de Hugo (11:30h en Pabellón).',
    time: 'Ayer 20:15h',
    unread: true
  },
  {
    id: 'n4',
    childKey: 'p1',
    priority: 'normal',
    title: '🎽 RECORDATORIO DE EQUIPACIÓN OFICIAL',
    category: 'Pablo • Cadete B',
    message: 'Recordatorio para el sábado: Jugaréis con la 2ª equipación blanca completa.',
    time: '2 Mayo',
    unread: false
  },
  {
    id: 'n5',
    childKey: 'p2',
    priority: 'normal',
    title: '📋 CONVOCATORIA PUBLICADA',
    category: 'Hugo • Infantil A Futsal',
    message: 'Ya está publicada la convocatoria para el partido del Sábado en Pabellón.',
    time: '1 Mayo',
    unread: false
  }
];

export function FamiliaAvisosView() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [activeTab, setActiveTab] = useState<'avisos' | 'configuracion'>('avisos');
  const [selectedChildFilter, setSelectedChildFilter] = useState<'all' | 'p1' | 'p2'>('all');
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // CONFIGURACIÓN DE NOTIFICACIONES PUSH PARA LOS PADRES
  const [notifyConvocatoria, setNotifyConvocatoria] = useState(true);
  const [notifyLogistica, setNotifyLogistica] = useState(true);
  const [notifyMedical, setNotifyMedical] = useState(true);
  const [notifyClima, setNotifyClima] = useState(true);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (selectedChildFilter === 'all') return true;
    return n.childKey === selectedChildFilter;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR RÁPIDO DE FILTRO POR HIJO */}
      <View style={styles.childFilterRow}>
        <TouchableOpacity 
          style={[styles.childFilterBtn, selectedChildFilter === 'all' && styles.childFilterBtnActive]}
          onPress={() => setSelectedChildFilter('all')}
        >
          <Text style={[styles.childFilterTxt, selectedChildFilter === 'all' && styles.childFilterTxtActive]}>👨‍👩‍👧‍👦 Todos los Avisos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childFilterBtn, selectedChildFilter === 'p1' && styles.childFilterBtnActive]}
          onPress={() => setSelectedChildFilter('p1')}
        >
          <Text style={[styles.childFilterTxt, selectedChildFilter === 'p1' && styles.childFilterTxtActive]}>👦 Pablo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.childFilterBtn, selectedChildFilter === 'p2' && styles.childFilterBtnActive]}
          onPress={() => setSelectedChildFilter('p2')}
        >
          <Text style={[styles.childFilterTxt, selectedChildFilter === 'p2' && styles.childFilterTxtActive]}>👦 Hugo</Text>
        </TouchableOpacity>
      </View>

      {/* 2. PESTAÑAS: CENTRO DE AVISOS vs CONFIGURACIÓN PREFERENCIAS */}
      <View style={styles.tabsHeaderRow}>
        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'avisos' && styles.tabBtnActive]}
          onPress={() => setActiveTab('avisos')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'avisos' && styles.tabBtnTextActive]}>🔔 Centro de Avisos</Text>
          {activeTab === 'avisos' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabBtn, activeTab === 'configuracion' && styles.tabBtnActive]}
          onPress={() => setActiveTab('configuracion')}
        >
          <Text style={[styles.tabBtnText, activeTab === 'configuracion' && styles.tabBtnTextActive]}>⚙️ Ajustes Notificaciones</Text>
          {activeTab === 'configuracion' && <View style={styles.tabUnderline} />}
        </TouchableOpacity>
      </View>

      {activeTab === 'avisos' ? (
        /* CENTRO DE AVISOS Y ALERTAS FAMILIARES */
        <View style={styles.avisosListContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitleNoMargin}>ALERTAS URGENTES Y NOTIFICACIONES</Text>
            <TouchableOpacity onPress={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}>
              <Text style={styles.markAllTxt}>Marcar todas como leídas</Text>
            </TouchableOpacity>
          </View>

          {filteredNotifications.map(item => (
            <TouchableOpacity 
              key={item.id} 
              style={[
                styles.noticeCard, 
                item.priority === 'urgent' && styles.noticeUrgentCard,
                item.priority === 'medical' && styles.noticeMedicalCard,
                item.unread && styles.noticeUnreadCard
              ]}
              onPress={() => handleMarkAsRead(item.id)}
            >
              <View style={styles.noticeHeader}>
                <View style={styles.noticeIconTitleRow}>
                  <Ionicons 
                    name={
                      item.priority === 'urgent' ? 'alert-circle' :
                      item.priority === 'medical' ? 'medkit' :
                      item.priority === 'high' ? 'car-sport' : 'notifications'
                    } 
                    size={20} 
                    color={
                      item.priority === 'urgent' ? colors.accentRed :
                      item.priority === 'medical' ? colors.accentGreen :
                      item.priority === 'high' ? colors.accentGold : colors.skyPrimary
                    } 
                  />
                  <Text style={[
                    styles.noticeTitle, 
                    item.priority === 'urgent' && styles.noticeUrgentTitle,
                    item.priority === 'medical' && styles.noticeMedicalTitle
                  ]}>{item.title}</Text>
                </View>

                {item.unread && <View style={styles.unreadDot} />}
              </View>

              <Text style={styles.noticeCategory}>{item.category} • {item.time}</Text>
              <Text style={styles.noticeMessage}>{item.message}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        /* CONFIGURACIÓN DE NOTIFICACIONES PARA LOS PADRES */
        <View style={styles.configContainer}>
          <Text style={styles.sectionTitle}>PREFERENCIAS DE NOTIFICACIONES PUSH</Text>
          <Text style={styles.configSubTxt}>Elige qué avisos quieres recibir en tu teléfono móvil para estar al día de las actividades de tus hijos.</Text>

          <View style={styles.configCard}>
            
            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleTitle}>📋 Avisos de Convocatoria</Text>
                <Text style={styles.toggleSub}>Notificar cuando se publica la convocatoria o hay cambios de horario.</Text>
              </View>
              <Switch 
                value={notifyConvocatoria} 
                onValueChange={setNotifyConvocatoria}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.skyPrimary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleTitle}>🏥 Avisos Médicos y Fisioterapia</Text>
                <Text style={styles.toggleSub}>Notificar en tiempo real cuando el servicio médico atiende a tu hijo.</Text>
              </View>
              <Switch 
                value={notifyMedical} 
                onValueChange={setNotifyMedical}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.accentGreen }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleTitle}>🚗 Alerta de Logística Familiar</Text>
                <Text style={styles.toggleSub}>Avisar si hay solapamiento de partidos o entrenamientos entre hermanos.</Text>
              </View>
              <Switch 
                value={notifyLogistica} 
                onValueChange={setNotifyLogistica}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.skyPrimary }}
                thumbColor={colors.white}
              />
            </View>

            <View style={styles.toggleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.toggleTitle}>🌧️ Alertas de Clima y Suspensión de Entrenos</Text>
                <Text style={styles.toggleSub}>Aviso urgente en caso de cancelación por lluvia o mal tiempo.</Text>
              </View>
              <Switch 
                value={notifyClima} 
                onValueChange={setNotifyClima}
                trackColor={{ false: 'rgba(255,255,255,0.1)', true: colors.skyPrimary }}
                thumbColor={colors.white}
              />
            </View>

          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // FILTRO RÁPIDO POR HIJO
  childFilterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  childFilterBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, backgroundColor: colors.navyCard, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  childFilterBtnActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childFilterTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  childFilterTxtActive: { color: colors.white, fontWeight: '900' },

  // TABS
  tabsHeaderRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', position: 'relative' },
  tabBtnActive: {},
  tabBtnText: { color: colors.textMuted, fontSize: 11, fontWeight: '700' },
  tabBtnTextActive: { color: colors.skyPrimary, fontWeight: '900' },
  tabUnderline: { position: 'absolute', bottom: -1, left: '20%', right: '20%', height: 3, backgroundColor: colors.skyPrimary, borderRadius: 1.5 },

  // AVISOS LIST
  avisosListContainer: { gap: 12 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitleNoMargin: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5 },
  markAllTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  noticeCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 6 },
  noticeUrgentCard: { backgroundColor: 'rgba(239, 68, 68, 0.12)', borderColor: colors.accentRed },
  noticeMedicalCard: { backgroundColor: 'rgba(16, 185, 129, 0.12)', borderColor: colors.accentGreen },
  noticeUnreadCard: { borderWidth: 1.5, borderColor: colors.skyPrimary },

  noticeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  noticeIconTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  noticeTitle: { color: colors.white, fontSize: 13, fontWeight: '900' },
  noticeUrgentTitle: { color: colors.accentRed },
  noticeMedicalTitle: { color: colors.accentGreen },

  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.skyPrimary },

  noticeCategory: { color: colors.textMuted, fontSize: 10, fontWeight: '700' },
  noticeMessage: { color: colors.white, fontSize: 12, lineHeight: 17, marginTop: 2 },

  // CONFIGURACIÓN
  configContainer: { gap: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 4 },
  configSubTxt: { color: colors.textMuted, fontSize: 11, lineHeight: 16, marginBottom: 16 },

  configCard: { backgroundColor: colors.navyCard, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, padding: 16, gap: 16 },
  toggleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 12 },
  toggleTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  toggleSub: { color: colors.textMuted, fontSize: 11, marginTop: 2, lineHeight: 15 }
});
