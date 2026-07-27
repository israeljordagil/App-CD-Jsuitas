import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const { width, height } = Dimensions.get('window');

const FILTERS = ['Todo', 'Entrenamientos', 'Partidos', 'Torneos', 'Reuniones', 'Eventos', 'Convocatorias'];
const VIEWS = ['Día', 'Semana', 'Mes', 'Agenda'];

// Definición de colores por tipo de evento
const EVENT_COLORS: Record<string, string> = {
  'Entrenamiento': colors.sky,
  'Partido': '#3B82F6',
  'Torneo': '#22C55E',
  'Reunión': '#A855F7',
  'Convocatoria': '#EAB308',
  'Evento': '#E11D48'
};

const MOCK_EVENTS = [
  { id: 1, type: 'Entrenamiento', title: 'Entrenamiento Táctico', date: '2026-09-10', time: '18:30 - 20:00', field: 'Campo 2', room: 'Vestuario 4', material: 'Petos, Conos', players: 19, obj: 'Salida de balón bajo presión', obs: 'Foco en precisión de pase en campo propio.', month: 'Septiembre' },
  { id: 2, type: 'Convocatoria', title: 'Publicar Convocatoria', date: '2026-09-11', time: '10:00', field: '-', room: '-', material: '-', players: 16, obj: 'Cerrar lista de 16', obs: 'Esperar prueba de molestias de Lucas.', month: 'Septiembre' },
  { id: 3, type: 'Partido', title: 'CD Jesuitas - Levante UD B', date: '2026-09-12', time: '10:00 - 12:00', field: 'Campo 1', room: 'Vestuario 1', material: 'Equipación 1', players: 16, obj: 'Presión alta e intensidad', obs: 'Rival directo en clasificación.', month: 'Septiembre' },
  { id: 4, type: 'Reunión', title: 'Reunión Cuerpo Técnico', date: '2026-09-14', time: '19:00 - 20:00', field: 'Sala Juntas', room: '-', material: 'Ordenador', players: 0, obj: 'Análisis partido anterior', obs: '-', month: 'Septiembre' },
  { id: 5, type: 'Entrenamiento', title: 'Sesión Física', date: '2026-09-15', time: '18:30 - 20:00', field: 'Gimnasio y Campo 3', room: 'Vestuario 4', material: 'Picas, Vallas', players: 20, obj: 'Fuerza explosiva', obs: 'Circuito por estaciones.', month: 'Septiembre' },
  { id: 6, type: 'Torneo', title: 'Torneo de Navidad F11', date: '2026-12-28', time: 'Todo el día', field: 'Ciudad Deportiva', room: '-', material: 'Equipación Completa', players: 22, obj: 'Convivencia y competición', obs: 'Fase de grupos y cruces.', month: 'Diciembre' },
  { id: 7, type: 'Evento', title: 'Cena de Navidad', date: '2026-12-22', time: '21:00', field: 'Restaurante Club', room: '-', material: '-', players: 22, obj: 'Team building', obs: 'Asistencia obligatoria.', month: 'Diciembre' },
  { id: 8, type: 'Entrenamiento', title: 'Preparación de Final de Liga', date: '2027-05-15', time: '18:30', field: 'Campo 1', room: 'Vestuario 1', material: 'Balones, Petos', players: 21, obj: 'Ataque estático', obs: 'Último entrenamiento previo a la final.', month: 'Mayo' },
];

const MOCK_REMINDERS = [
  'Publicar convocatoria para el partido del Sábado.',
  'Preparar material para circuito de fuerza de mañana.',
  'Confirmar equipación con el rival (Levante UD B).',
  'Cerrar acta del último amistoso.'
];

export default function CalendarioEntrenadorScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Todo');
  const [activeView, setActiveView] = useState('Agenda');
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'Todo') return MOCK_EVENTS;
    // Manejar plurales
    let filterKey = activeFilter;
    if (filterKey === 'Entrenamientos') filterKey = 'Entrenamiento';
    if (filterKey === 'Partidos') filterKey = 'Partido';
    if (filterKey === 'Torneos') filterKey = 'Torneo';
    if (filterKey === 'Reuniones') filterKey = 'Reunión';
    if (filterKey === 'Convocatorias') filterKey = 'Convocatoria';
    if (filterKey === 'Eventos') filterKey = 'Evento';
    
    return MOCK_EVENTS.filter(e => e.type === filterKey);
  }, [activeFilter]);

  const renderEventModal = () => {
    if (!selectedEvent) return null;
    const e = selectedEvent;
    const color = EVENT_COLORS[e.type];

    return (
      <Modal visible animationType="slide" transparent={true} onRequestClose={() => setSelectedEvent(null)}>
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <View style={[styles.modalBadge, { backgroundColor: `${color}20` }]}>
                     <Text style={[styles.modalBadgeText, { color }]}>{e.type.toUpperCase()}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedEvent(null)} style={styles.modalClose}>
                     <FontAwesome name="times" size={20} color={colors.white} />
                  </TouchableOpacity>
               </View>

               <Text style={styles.modalTitle}>{e.title}</Text>
               
               <View style={styles.modalInfoGrid}>
                  <View style={styles.modalInfoRow}><FontAwesome name="calendar" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.date}</Text></View>
                  <View style={styles.modalInfoRow}><FontAwesome name="clock-o" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.time}</Text></View>
                  <View style={styles.modalInfoRow}><FontAwesome name="map-marker" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.field}</Text></View>
                  <View style={styles.modalInfoRow}><FontAwesome name="briefcase" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.room}</Text></View>
                  <View style={styles.modalInfoRow}><FontAwesome name="cubes" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.material}</Text></View>
                  <View style={styles.modalInfoRow}><FontAwesome name="users" size={16} color={colors.muted} style={{width: 24}} /><Text style={styles.modalInfoText}>{e.players} Convocados</Text></View>
               </View>

               <View style={styles.modalDescBox}>
                  <Text style={styles.modalDescLbl}>Objetivo</Text>
                  <Text style={styles.modalDescTxt}>{e.obj}</Text>
                  <Text style={[styles.modalDescLbl, {marginTop: 12}]}>Observaciones</Text>
                  <Text style={styles.modalDescTxt}>{e.obs}</Text>
               </View>

               <View style={styles.modalActions}>
                  <TouchableOpacity style={[styles.modalBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}><Text style={styles.modalBtnTxt}>Editar</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.modalBtn, { backgroundColor: 'rgba(255,255,255,0.1)' }]}><Text style={styles.modalBtnTxt}>Duplicar</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.modalBtn, { backgroundColor: 'rgba(225, 29, 72, 0.2)' }]}><Text style={[styles.modalBtnTxt, { color: colors.danger }]}>Eliminar</Text></TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* NAVEGACIÓN */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>AGENDA DEPORTIVA</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={50} style={styles.heroCard}>
           <View style={styles.heroHeader}>
              <View style={styles.calendarIconBox}><FontAwesome name="calendar-check-o" size={32} color={colors.navy} /></View>
              <View style={styles.heroInfo}>
                 <Text style={styles.heroTitle}>Calendario</Text>
                 <Text style={styles.heroSub}>Cadete B • Temp. 2026/2027</Text>
              </View>
           </View>
           
           <View style={styles.viewSelector}>
              {VIEWS.map(v => (
                 <TouchableOpacity key={v} style={[styles.viewBtn, activeView === v && styles.viewBtnActive]} onPress={() => setActiveView(v)}>
                    <Text style={[styles.viewBtnTxt, activeView === v && styles.viewBtnTxtActive]}>{v}</Text>
                 </TouchableOpacity>
              ))}
           </View>
        </Card>

        {/* 2. FILTROS PÍLDORA */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ gap: 8 }}>
           {FILTERS.map(f => (
              <TouchableOpacity key={f} style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]} onPress={() => setActiveFilter(f)}>
                 <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
           ))}
        </ScrollView>

        <View style={{flexDirection: 'row', gap: 12, marginBottom: spacing.l}}>
           {/* 6. PLANIFICACIÓN SEMANAL */}
           <Card delay={100} style={[styles.sideCard, {flex: 1}]}>
              <Text style={styles.sideCardTitle}>Planificación Semanal</Text>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>Entrenos</Text><Text style={styles.sideCardVal}>3</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>Partidos</Text><Text style={styles.sideCardVal}>1</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>Convocatorias</Text><Text style={styles.sideCardVal}>1</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>Carga</Text><Text style={[styles.sideCardVal, {color: colors.warning}]}>Alta</Text></View>
           </Card>
           
           {/* 7. DISPONIBILIDAD */}
           <Card delay={150} style={[styles.sideCard, {flex: 1}]}>
              <Text style={styles.sideCardTitle}>Disponibilidad Hoy</Text>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>🟢 Disp.</Text><Text style={styles.sideCardVal}>19</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>🟡 Pend.</Text><Text style={styles.sideCardVal}>0</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>🔴 Lesion.</Text><Text style={styles.sideCardVal}>2</Text></View>
              <View style={styles.sideCardRow}><Text style={styles.sideCardLbl}>⚫ Sancion.</Text><Text style={styles.sideCardVal}>1</Text></View>
           </Card>
        </View>

        {/* 8. RECORDATORIOS */}
        <Text style={styles.sectionTitle}>Recordatorios Automáticos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.remindersScroll} contentContainerStyle={{ gap: 12 }}>
           {MOCK_REMINDERS.map((r, i) => (
              <Card delay={200 + (i * 20)} key={i} style={styles.reminderCard}>
                 <FontAwesome name="bell" size={16} color={colors.warning} style={{ marginBottom: 8 }} />
                 <Text style={styles.reminderText} numberOfLines={3}>{r}</Text>
              </Card>
           ))}
        </ScrollView>

        {/* 3. CALENDARIO MOCK (VISTA AGENDA) */}
        <View style={styles.agendaHeader}>
           <Text style={styles.sectionTitle}>Eventos de la Temporada</Text>
           <View style={styles.syncRow}>
              <TouchableOpacity style={styles.syncBtn}><FontAwesome name="apple" size={14} color={colors.white} /></TouchableOpacity>
              <TouchableOpacity style={styles.syncBtn}><FontAwesome name="google" size={14} color={colors.white} /></TouchableOpacity>
              <TouchableOpacity style={styles.syncBtn}><FontAwesome name="file-pdf-o" size={14} color={colors.white} /></TouchableOpacity>
           </View>
        </View>

        <View style={styles.agendaList}>
           {filteredEvents.map((ev, idx) => (
              <TouchableOpacity key={ev.id} activeOpacity={0.8} onPress={() => setSelectedEvent(ev)}>
                 <Card delay={300 + (idx * 20)} style={[styles.eventCard, { borderLeftColor: EVENT_COLORS[ev.type] }]}>
                    <View style={styles.eventDateBox}>
                       <Text style={styles.eventDay}>{ev.date.split('-')[2]}</Text>
                       <Text style={styles.eventMonth}>{ev.month.substring(0,3).toUpperCase()}</Text>
                    </View>
                    <View style={styles.eventInfo}>
                       <Text style={styles.eventTime}>{ev.time} • {ev.field}</Text>
                       <Text style={styles.eventTitle}>{ev.title}</Text>
                       <Text style={[styles.eventType, { color: EVENT_COLORS[ev.type] }]}>{ev.type}</Text>
                    </View>
                 </Card>
              </TouchableOpacity>
           ))}
           {filteredEvents.length === 0 && (
              <Text style={styles.emptyText}>No hay eventos planificados para este filtro.</Text>
           )}
        </View>

        <View style={{ height: 100 }} />

      </ScrollView>

      {/* 5. CREAR EVENTO (FAB) */}
      <TouchableOpacity style={styles.fab}>
         <FontAwesome name="plus" size={24} color={colors.navy} />
      </TouchableOpacity>

      {renderEventModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.m, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  heroCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 20, borderRadius: 24, marginBottom: spacing.m },
  heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  calendarIconBox: { width: 60, height: 60, borderRadius: 16, backgroundColor: colors.sky, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  heroInfo: { flex: 1 },
  heroTitle: { color: colors.white, fontSize: 24, fontWeight: '900' },
  heroSub: { color: colors.sky, fontSize: 13, fontWeight: '700', marginTop: 4 },
  
  viewSelector: { flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 4 },
  viewBtn: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 8 },
  viewBtnActive: { backgroundColor: 'rgba(255,255,255,0.1)' },
  viewBtnTxt: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  viewBtnTxtActive: { color: colors.white, fontWeight: '900' },

  filterScroll: { paddingRight: 20, marginBottom: spacing.l },
  filterBtn: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', height: 36, justifyContent: 'center' },
  filterBtnActive: { backgroundColor: 'rgba(79, 195, 247, 0.2)', borderColor: colors.sky },
  filterText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  filterTextActive: { color: colors.sky, fontWeight: '900' },

  sideCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 20 },
  sideCardTitle: { color: colors.white, fontSize: 11, fontWeight: '900', textTransform: 'uppercase', marginBottom: 12, letterSpacing: 0.5 },
  sideCardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sideCardLbl: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  sideCardVal: { color: colors.white, fontSize: 12, fontWeight: '800' },

  sectionTitle: { color: colors.white, fontSize: 14, fontWeight: '900', textTransform: 'uppercase', marginBottom: 16, marginTop: 8 },
  
  remindersScroll: { paddingRight: 20, marginBottom: spacing.l },
  reminderCard: { width: 160, backgroundColor: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.3)', padding: 16, borderRadius: 16 },
  reminderText: { color: '#EAB308', fontSize: 12, fontWeight: '700', lineHeight: 18 },

  agendaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  syncRow: { flexDirection: 'row', gap: 8 },
  syncBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },

  agendaList: { gap: 12 },
  eventCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderLeftWidth: 4, borderRadius: 16, padding: 16, alignItems: 'center' },
  eventDateBox: { alignItems: 'center', marginRight: 16, minWidth: 40 },
  eventDay: { color: colors.white, fontSize: 24, fontWeight: '900' },
  eventMonth: { color: colors.muted, fontSize: 10, fontWeight: '800' },
  eventInfo: { flex: 1 },
  eventTime: { color: colors.muted, fontSize: 11, fontWeight: '700', marginBottom: 4 },
  eventTitle: { color: colors.white, fontSize: 15, fontWeight: '800', marginBottom: 4 },
  eventType: { fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },

  emptyText: { color: colors.muted, fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginTop: 40 },

  fab: { position: 'absolute', bottom: 30, right: 30, width: 60, height: 60, borderRadius: 30, backgroundColor: colors.sky, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#071A3D', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  modalBadgeText: { fontSize: 12, fontWeight: '900' },
  modalClose: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  
  modalTitle: { color: colors.white, fontSize: 22, fontWeight: '900', marginBottom: 20 },
  
  modalInfoGrid: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 16, gap: 12, marginBottom: 20 },
  modalInfoRow: { flexDirection: 'row', alignItems: 'center' },
  modalInfoText: { color: colors.white, fontSize: 14, fontWeight: '600' },
  
  modalDescBox: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 16, marginBottom: 24 },
  modalDescLbl: { color: colors.sky, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  modalDescTxt: { color: colors.white, fontSize: 14, fontWeight: '500', lineHeight: 22 },

  modalActions: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  modalBtnTxt: { color: colors.white, fontSize: 13, fontWeight: '800' }
});
