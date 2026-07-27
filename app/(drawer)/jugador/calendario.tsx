import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';
import { ProgressBar } from '../../../src/components/ui/ProgressBar';

const TABS = ['Día', 'Semana', 'Mes'];

const MOCK_EVENTS = [
  // Entrenamientos
  { id: 1, type: 'entrenamiento', title: 'Entrenamiento Táctico', date: '2026-07-03', time: '18:30', location: 'Campo 2 (Anexo)', objective: 'Mejorar la presión tras pérdida.', locker: 'Vestuario 4', materials: ['Botas', 'Espinilleras', 'Agua'] },
  { id: 2, type: 'entrenamiento', title: 'Entrenamiento Físico', date: '2026-07-05', time: '18:30', location: 'Campo 2 (Anexo)', objective: 'Resistencia aeróbica.', locker: 'Vestuario 4', materials: ['Zapatillas running', 'Agua'] },
  { id: 3, type: 'entrenamiento', title: 'Entrenamiento Estrategia', date: '2026-07-10', time: '18:30', location: 'Campo 1 (Principal)', objective: 'Jugadas a balón parado.', locker: 'Vestuario 1', materials: ['Botas', 'Espinilleras'] },
  // Partidos
  { id: 11, type: 'partido', opponent: 'Levante UD', competition: 'Liga Autonómica', matchday: 'Jornada 5', date: '2026-07-06', time: '10:00', location: 'Ciudad Deportiva Levante', status: '🟢 Convocado', meetingTime: '08:45', kit: '1ª Equipación (Azul)' },
  { id: 12, type: 'partido', opponent: 'Valencia CF', competition: 'Liga Autonómica', matchday: 'Jornada 6', date: '2026-07-13', time: '12:00', location: 'Polideportivo CD Jesuitas', status: '🟡 Pendiente', meetingTime: '10:30', kit: '1ª Equipación (Azul)' },
  // Torneos
  { id: 21, type: 'torneo', title: 'Torneo de Verano', date: '2026-07-20', location: 'Gandía', description: 'Fase de grupos. Primer partido a las 09:30.' },
  // Eventos
  { id: 31, type: 'evento', title: 'Charla Nutricional', date: '2026-07-08', time: '19:00', location: 'Salón de Actos', description: 'Asistencia obligatoria.' }
];

export default function CalendarioJugadorScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Semana');
  const [search, setSearch] = useState('');

  const nextEvent = MOCK_EVENTS[0]; // Forzamos el primero como próximo

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>MI CALENDARIO</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* CONTROLES DE CALENDARIO */}
        <View style={styles.calendarControls}>
           <Text style={styles.monthTitle}>Julio 2026</Text>
           
           <View style={styles.tabsContainer}>
              {TABS.map(tab => (
                 <TouchableOpacity 
                    key={tab} 
                    style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
                    onPress={() => setActiveTab(tab)}
                 >
                    <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
                 </TouchableOpacity>
              ))}
           </View>

           <View style={styles.searchBox}>
              <FontAwesome name="search" size={16} color={colors.muted} />
              <TextInput 
                 style={styles.searchInput}
                 placeholder="Buscar partidos, entrenamientos..."
                 placeholderTextColor={colors.muted}
                 value={search}
                 onChangeText={setSearch}
              />
           </View>
        </View>

        {/* LEYENDA (VISTA CALENDARIO MOCK) */}
        <View style={styles.legendContainer}>
           <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: colors.sky}]} /><Text style={styles.legendText}>Entrenamientos</Text></View>
           <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#3B82F6'}]} /><Text style={styles.legendText}>Partidos</Text></View>
           <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#22C55E'}]} /><Text style={styles.legendText}>Eventos</Text></View>
           <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#A855F7'}]} /><Text style={styles.legendText}>Torneos</Text></View>
           <View style={styles.legendItem}><View style={[styles.legendDot, {backgroundColor: '#EAB308'}]} /><Text style={styles.legendText}>Actividades</Text></View>
        </View>

        {/* PRÓXIMO EVENTO HERO CARD */}
        <Text style={styles.sectionTitle}>Próximo Evento</Text>
        <Card delay={100} style={styles.heroCard}>
           <View style={styles.heroHeader}>
              <View style={styles.heroIconBox}>
                 <FontAwesome name="soccer-ball-o" size={24} color={colors.sky} />
              </View>
              <View style={styles.heroHeaderText}>
                 <Text style={styles.heroTitle}>Entrenamiento</Text>
                 <Text style={styles.heroDate}>Lunes • 18:30</Text>
              </View>
           </View>

           <View style={styles.heroGrid}>
              <View style={styles.heroGridItem}>
                 <FontAwesome name="map-marker" size={14} color={colors.muted} style={styles.heroGridIcon} />
                 <Text style={styles.heroGridText}>Campo 2</Text>
              </View>
              <View style={styles.heroGridItem}>
                 <FontAwesome name="lock" size={14} color={colors.muted} style={styles.heroGridIcon} />
                 <Text style={styles.heroGridText}>Vestuario 4</Text>
              </View>
           </View>

           <View style={styles.heroBoxDark}>
              <Text style={styles.heroBoxTitle}>Material Necesario:</Text>
              <Text style={styles.heroBoxText}>• Botas  • Espinilleras  • Agua</Text>
           </View>
           
           <View style={[styles.heroBoxDark, { marginTop: 8 }]}>
              <Text style={styles.heroBoxTitle}>Objetivo:</Text>
              <Text style={styles.heroBoxText}>"Mejorar la presión tras pérdida."</Text>
           </View>
        </Card>

        {/* PARTIDO DESTACADO */}
        <Text style={styles.sectionTitle}>Próximo Partido</Text>
        <Card delay={150} style={styles.matchCard}>
           <View style={styles.matchHeader}>
              <Text style={styles.matchCompetition}>Liga Autonómica • Jornada 5</Text>
              <Text style={styles.matchDate}>Sábado 6 Jul • 10:00</Text>
           </View>
           
           <View style={styles.matchTeamsRow}>
              <View style={styles.teamShieldBox}>
                 <FontAwesome name="shield" size={40} color={colors.white} />
                 <Text style={styles.teamName}>CD Jesuitas</Text>
              </View>
              <Text style={styles.vsText}>VS</Text>
              <View style={styles.teamShieldBox}>
                 <FontAwesome name="shield" size={40} color={'#E11D48'} />
                 <Text style={styles.teamName}>Levante UD</Text>
              </View>
           </View>

           <View style={styles.matchDetailsRow}>
              <View style={styles.matchDetailItem}>
                 <FontAwesome name="map-marker" size={12} color={colors.sky} />
                 <Text style={styles.matchDetailText}>Ciudad Deportiva Levante</Text>
              </View>
              <View style={styles.matchDetailItem}>
                 <FontAwesome name="clock-o" size={12} color={colors.sky} />
                 <Text style={styles.matchDetailText}>Citación: 08:45</Text>
              </View>
           </View>

           <View style={styles.matchFooter}>
              <View style={styles.statusBadgeGreen}>
                 <Text style={styles.statusBadgeText}>🟢 CONVOCADO</Text>
              </View>
              <Text style={styles.kitText}>👕 1ª Equipación</Text>
           </View>

           <TouchableOpacity style={styles.mapsBtn}>
              <FontAwesome name="location-arrow" size={14} color={colors.navy} />
              <Text style={styles.mapsBtnText}>Abrir en Apple Maps</Text>
           </TouchableOpacity>
        </Card>

        {/* OBJETIVOS DE LA SEMANA */}
        <Text style={styles.sectionTitle}>Objetivos de la Semana</Text>
        <Card delay={200} style={styles.objectivesCard}>
           <View style={styles.objectiveRow}>
              <FontAwesome name="check-square" size={20} color={colors.success} />
              <Text style={styles.objectiveTextDone}>Llegar 15 minutos antes.</Text>
           </View>
           <View style={styles.objectiveRow}>
              <FontAwesome name="check-square" size={20} color={colors.success} />
              <Text style={styles.objectiveTextDone}>Completar los 3 entrenamientos.</Text>
           </View>
           <View style={styles.objectiveRow}>
              <FontAwesome name="square-o" size={20} color={colors.muted} />
              <Text style={styles.objectiveText}>Mejorar el pase con la pierna izquierda.</Text>
           </View>
           
           <View style={styles.objProgressContainer}>
              <Text style={styles.objProgressText}>Progreso: 66%</Text>
              <ProgressBar progress={0.66} color={colors.success} height={6} />
           </View>
        </Card>

        {/* RECORDATORIOS */}
        <Text style={styles.sectionTitle}>Recordatorios</Text>
        <View style={styles.remindersGrid}>
           {['15 min antes', '30 min antes', '1 hora antes', '24 horas antes'].map((rem, i) => (
             <TouchableOpacity key={i} style={[styles.reminderBtn, i === 1 && styles.reminderBtnActive]}>
                <FontAwesome name="bell" size={12} color={i === 1 ? colors.white : colors.sky} />
                <Text style={[styles.reminderText, i === 1 && styles.reminderTextActive]}>{rem}</Text>
             </TouchableOpacity>
           ))}
        </View>

        {/* RESUMEN SEMANAL */}
        <Text style={styles.sectionTitle}>Resumen Semanal</Text>
        <View style={styles.summaryGrid}>
           <Card delay={250} style={styles.summaryBox}>
              <Text style={styles.summaryNum}>3</Text>
              <Text style={styles.summaryLbl}>Entrenos</Text>
           </Card>
           <Card delay={260} style={styles.summaryBox}>
              <Text style={styles.summaryNum}>1</Text>
              <Text style={styles.summaryLbl}>Partido</Text>
           </Card>
           <Card delay={270} style={styles.summaryBox}>
              <Text style={styles.summaryNum}>0</Text>
              <Text style={styles.summaryLbl}>Torneos</Text>
           </Card>
           <Card delay={280} style={styles.summaryBox}>
              <Text style={[styles.summaryNum, { color: colors.success }]}>2/3</Text>
              <Text style={styles.summaryLbl}>Objetivos</Text>
           </Card>
           <Card delay={290} style={[styles.summaryBox, { width: '100%' }]}>
              <Text style={[styles.summaryNum, { color: colors.sky }]}>100%</Text>
              <Text style={styles.summaryLbl}>Porcentaje de Asistencia</Text>
           </Card>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.l, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  calendarControls: { marginBottom: spacing.xl },
  monthTitle: { color: colors.white, fontSize: 24, fontWeight: '900', marginBottom: spacing.m },
  tabsContainer: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 4, marginBottom: spacing.m },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabBtnActive: { backgroundColor: colors.sky },
  tabText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  tabTextActive: { color: colors.navy, fontWeight: '900' },
  
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, paddingHorizontal: 16, height: 48, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  searchInput: { flex: 1, marginLeft: 12, color: colors.white, fontSize: 14 },

  legendContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xl },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { color: colors.muted, fontSize: 11, fontWeight: '600' },

  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  heroCard: { backgroundColor: 'rgba(79, 195, 247, 0.08)', borderColor: 'rgba(79, 195, 247, 0.2)', padding: spacing.l, borderRadius: 20, marginBottom: spacing.xl },
  heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  heroIconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: 'rgba(79, 195, 247, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  heroTitle: { color: colors.sky, fontSize: 18, fontWeight: '900' },
  heroDate: { color: colors.white, fontSize: 14, fontWeight: '700', marginTop: 2 },
  heroGrid: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  heroGridItem: { flexDirection: 'row', alignItems: 'center' },
  heroGridIcon: { marginRight: 6 },
  heroGridText: { color: colors.white, fontSize: 13, fontWeight: '600' },
  heroBoxDark: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 12, borderRadius: 12 },
  heroBoxTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  heroBoxText: { color: colors.white, fontSize: 13, fontWeight: '700', fontStyle: 'italic' },

  matchCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', padding: spacing.l, borderRadius: 20, marginBottom: spacing.xl },
  matchHeader: { alignItems: 'center', marginBottom: 16 },
  matchCompetition: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  matchDate: { color: colors.white, fontSize: 15, fontWeight: '900', marginTop: 4 },
  matchTeamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  teamShieldBox: { alignItems: 'center', width: 100 },
  teamName: { color: colors.white, fontSize: 12, fontWeight: '800', marginTop: 8, textAlign: 'center' },
  vsText: { color: colors.muted, fontSize: 16, fontWeight: '900', marginHorizontal: 20 },
  matchDetailsRow: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginBottom: 20 },
  matchDetailItem: { flexDirection: 'row', alignItems: 'center' },
  matchDetailText: { color: colors.white, fontSize: 12, fontWeight: '600', marginLeft: 6 },
  matchFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 16, marginBottom: 16 },
  statusBadgeGreen: { backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1, borderColor: '#22C55E', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  statusBadgeText: { color: '#22C55E', fontSize: 11, fontWeight: '800' },
  kitText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  mapsBtn: { backgroundColor: colors.sky, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14, borderRadius: 12 },
  mapsBtnText: { color: colors.navy, fontSize: 14, fontWeight: '900', marginLeft: 8 },

  objectivesCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', padding: spacing.l, borderRadius: 20, marginBottom: spacing.xl },
  objectiveRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  objectiveTextDone: { color: colors.white, fontSize: 14, fontWeight: '600', marginLeft: 12, textDecorationLine: 'line-through', opacity: 0.7 },
  objectiveText: { color: colors.white, fontSize: 14, fontWeight: '700', marginLeft: 12 },
  objProgressContainer: { marginTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)', paddingTop: 16 },
  objProgressText: { color: colors.white, fontSize: 12, fontWeight: '800', marginBottom: 8 },

  remindersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: spacing.xl },
  reminderBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  reminderBtnActive: { backgroundColor: 'rgba(79, 195, 247, 0.2)', borderColor: colors.sky },
  reminderText: { color: colors.white, fontSize: 12, fontWeight: '700', marginLeft: 8 },
  reminderTextActive: { color: colors.sky, fontWeight: '900' },

  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  summaryBox: { width: '47%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.m, alignItems: 'center', borderColor: 'rgba(255,255,255,0.05)' },
  summaryNum: { color: colors.white, fontSize: 24, fontWeight: '900' },
  summaryLbl: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginTop: 4, textAlign: 'center' },
});
