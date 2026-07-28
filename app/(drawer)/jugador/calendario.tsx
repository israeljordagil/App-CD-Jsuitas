import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumHeader } from '../../../src/components/ui/PremiumHeader';

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

const MOCK_EVENTS = [
  { 
    id: 1, 
    type: 'entrenamiento', 
    title: 'Entrenamiento Táctico y Balón Parado', 
    date: 'Hoy Martes • 18:30h - 20:00h', 
    pitch: 'Campo 2 Anexo (Jesuitas)', 
    locker: 'Vestuario 4',
    kit: 'Camiseta de Entrenamiento Azul',
    badge: 'OBLIGATORIO'
  },
  { 
    id: 2, 
    type: 'entrenamiento', 
    title: 'Entrenamiento Físico & Posicionamiento', 
    date: 'Jueves 30 Oct • 18:30h - 20:00h', 
    pitch: 'Campo 2 Anexo (Jesuitas)', 
    locker: 'Vestuario 4',
    kit: 'Camiseta de Entrenamiento Azul',
    badge: 'PROGRAMADO'
  },
  { 
    id: 3, 
    type: 'partido', 
    title: 'CD Jesuitas Cadete B vs Levante UD B', 
    competition: 'Liga Preferente Cadete (Jornada 9)',
    date: 'Sábado 1 Nov • 10:00h', 
    citation: '09:15h en Vestuario 2',
    pitch: 'Campo 1 - Polideportivo San José (Local)', 
    kit: '1ª Equipación Oficial (Azul)',
    status: '⭐ CONVOCADO (Titular)'
  },
  { 
    id: 4, 
    type: 'torneo', 
    title: 'Torneo de Otoño FFCV (Expedición)', 
    date: '15-16 Noviembre 2026', 
    pitch: 'Complejo Deportivo Gandía', 
    status: '📅 CONFIRMADO'
  }
];

export default function CalendarioJugadorScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [activeFilter, setActiveFilter] = useState<'TODOS' | 'ENTRENOS' | 'PARTIDOS'>('TODOS');

  const filteredEvents = MOCK_EVENTS.filter(e => {
    if (activeFilter === 'ENTRENOS') return e.type === 'entrenamiento';
    if (activeFilter === 'PARTIDOS') return e.type === 'partido';
    return true;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.navyDark }}>
      <PremiumHeader 
        title="3. CALENDARIO" 
        subtitle="AGENDA DE ENTRENOS Y PARTIDOS"
        showSearchAndActions={false}
        showAvatar={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
        
        {/* 1. FILTROS RÁPIDOS (TODOS / ENTRENOS / PARTIDOS) */}
        <View style={styles.filterRow}>
          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'TODOS' && styles.filterPillActive]} 
            onPress={() => setActiveFilter('TODOS')}
          >
            <Text style={[styles.filterPillTxt, activeFilter === 'TODOS' && styles.filterPillTxtActive]}>TODOS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'ENTRENOS' && styles.filterPillActive]} 
            onPress={() => setActiveFilter('ENTRENOS')}
          >
            <Text style={[styles.filterPillTxt, activeFilter === 'ENTRENOS' && styles.filterPillTxtActive]}>🏃 ENTRENAMIENTOS</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.filterPill, activeFilter === 'PARTIDOS' && styles.filterPillActive]} 
            onPress={() => setActiveFilter('PARTIDOS')}
          >
            <Text style={[styles.filterPillTxt, activeFilter === 'PARTIDOS' && styles.filterPillTxtActive]}>🏟️ PARTIDOS</Text>
          </TouchableOpacity>
        </View>

        {/* 2. LISTA DE EVENTOS */}
        <Text style={styles.sectionTitle}>📅 EVENTOS DE ESTA SEMANA</Text>

        {filteredEvents.map(item => (
          <View key={item.id} style={styles.eventCard}>
            <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.eventGradient}>
              
              <View style={styles.eventHeaderRow}>
                <View style={styles.eventTypeTag}>
                  <Text style={styles.eventTypeTxt}>
                    {item.type === 'entrenamiento' ? '🏃 ENTRENAMIENTO' : item.type === 'partido' ? '🏟️ PARTIDO DE LIGA' : '🏆 TORNEO'}
                  </Text>
                </View>
                {!!item.status && (
                  <View style={styles.statusTag}>
                    <Text style={styles.statusTagTxt}>{item.status}</Text>
                  </View>
                )}
              </View>

              <Text style={styles.eventTitle}>{item.title}</Text>

              {item.competition && (
                <Text style={styles.eventComp}>{item.competition}</Text>
              )}

              <View style={styles.eventDetailsBox}>
                <Text style={styles.eventDateTxt}>⏰ {item.date}</Text>
                <Text style={styles.eventLocTxt}>📍 {item.pitch}</Text>
                
                {item.citation && (
                  <Text style={styles.citationTxt}>🏷️ Citación equipo: {item.citation}</Text>
                )}

                {item.locker && (
                  <Text style={styles.lockerTxt}>🔑 Vestuario: {item.locker}</Text>
                )}

                {item.kit && (
                  <Text style={styles.kitTxt}>🎽 Indumentaria: {item.kit}</Text>
                )}
              </View>

            </LinearGradient>
          </View>
        ))}

        {/* 3. SINCRONIZACIÓN CON CALENDARIO PERSONAL */}
        <View style={styles.syncCard}>
          <Ionicons name="calendar-outline" size={24} color={colors.skyPrimary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.syncTitle}>SINCRONIZAR CON TU CALENDARIO</Text>
            <Text style={styles.syncSub}>Añade automáticamente los horarios del Cadete B a tu iCal o Google Calendar.</Text>
          </View>
          <TouchableOpacity style={styles.syncBtn}>
            <Text style={styles.syncBtnTxt}>Sincronizar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  filterPill: { flex: 1, backgroundColor: colors.navyCard, paddingVertical: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.borderGlow },
  filterPillActive: { backgroundColor: colors.skyPrimary, borderColor: colors.skyPrimary },
  filterPillTxt: { color: colors.textMuted, fontSize: 10, fontWeight: '900' },
  filterPillTxtActive: { color: colors.navyDark, fontWeight: '900' },

  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 12 },

  eventCard: { borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 14 },
  eventGradient: { padding: 16, gap: 8 },

  eventHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTypeTag: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  eventTypeTxt: { color: colors.skyGlow, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },

  statusTag: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.accentGreen },
  statusTagTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },

  eventTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 2 },
  eventComp: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  eventDetailsBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 12, gap: 4, marginTop: 4 },
  eventDateTxt: { color: colors.goldLight, fontSize: 12, fontWeight: '800' },
  eventLocTxt: { color: colors.white, fontSize: 11, fontWeight: '700' },
  citationTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '800' },
  lockerTxt: { color: colors.textMuted, fontSize: 11 },
  kitTxt: { color: colors.textMuted, fontSize: 11 },

  syncCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: colors.borderGlow, marginTop: 10 },
  syncTitle: { color: colors.white, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  syncSub: { color: colors.textMuted, fontSize: 10, marginTop: 2 },
  syncBtn: { backgroundColor: colors.skyPrimary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  syncBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' }
});
