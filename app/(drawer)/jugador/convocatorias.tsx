import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';

const INITIAL_CHECKLIST = [
  { id: '1', text: 'Botas', checked: false },
  { id: '2', text: 'Espinilleras', checked: false },
  { id: '3', text: 'Equipación completa', checked: false },
  { id: '4', text: 'Botella de agua', checked: false },
  { id: '5', text: 'Llegar 45 minutos antes', checked: false },
  { id: '6', text: 'Avisar si hay problema', checked: false },
];

const MOCK_TEAMMATES = [
  { id: 1, name: 'Lucas P.', dorsal: 1, pos: 'POR', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=lucas' },
  { id: 2, name: 'Marcos R.', dorsal: 4, pos: 'DEF', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=marcos' },
  { id: 3, name: 'David G.', dorsal: 5, pos: 'DEF', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=david' },
  { id: 4, name: 'Héctor M.', dorsal: 8, pos: 'MED', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=hector' },
  { id: 5, name: 'Pablo M.', dorsal: 9, pos: 'DEL', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=pablo' },
  { id: 6, name: 'Dani G.', dorsal: 10, pos: 'MED', status: 'Convocado', avatar: 'https://i.pravatar.cc/100?u=dani' },
];

const MOCK_HISTORY = [
  { id: 1, match: 'vs Villarreal', date: 'Hace 1 semana', status: 'Convocado Titular' },
  { id: 2, match: 'vs Elche CF', date: 'Hace 2 semanas', status: 'Convocado Suplente' },
  { id: 3, match: 'vs CD Castellón', date: 'Hace 3 semanas', status: 'No Convocado' },
  { id: 4, match: 'vs Hércules', date: 'Hace 4 semanas', status: 'Convocado Titular' },
  { id: 5, match: 'vs Alcoyano', date: 'Hace 5 semanas', status: 'Pendiente' },
];

export default function ConvocatoriasJugadorScreen() {
  const router = useRouter();
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  const toggleCheck = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA (Volver) */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>CONVOCATORIA</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM (PARTIDO) */}
        <Card delay={100} style={styles.matchHeaderCard}>
           <Text style={styles.matchCompetition}>Liga Cadete • Jornada 4</Text>
           <Text style={styles.matchDate}>Sábado 14 Nov • 10:00</Text>
           
           <View style={styles.matchTeamsRow}>
              <View style={styles.teamShieldBox}>
                 <FontAwesome name="shield" size={50} color={colors.white} />
                 <Text style={styles.teamName}>CD Jesuitas</Text>
              </View>
              <View style={styles.vsContainer}>
                 <Text style={styles.vsText}>VS</Text>
              </View>
              <View style={styles.teamShieldBox}>
                 <FontAwesome name="shield" size={50} color={'#E11D48'} />
                 <Text style={styles.teamName}>Levante UD</Text>
              </View>
           </View>

           <View style={styles.matchLocationRow}>
              <FontAwesome name="map-marker" size={14} color={colors.sky} />
              <Text style={styles.matchLocationText}>Ciudad Deportiva Levante, Campo 2</Text>
           </View>
        </Card>

        {/* 10. CUENTA ATRÁS */}
        <View style={styles.countdownBox}>
           <FontAwesome name="clock-o" size={18} color={colors.sky} />
           <Text style={styles.countdownText}>Faltan 2 días y 5 horas</Text>
        </View>

        {/* 2. TARJETA PRINCIPAL DE ESTADO */}
        <Card delay={150} style={styles.statusCard}>
           <View style={styles.statusCircle}>
              <FontAwesome name="check" size={32} color="#22C55E" />
           </View>
           <Text style={styles.statusTitle}>¡ESTÁS CONVOCADO!</Text>
           <Text style={styles.statusSub}>El míster cuenta contigo para este partido.</Text>
        </Card>

        {/* 4. MI ROL */}
        <Text style={styles.sectionTitle}>Tu Rol en el Partido</Text>
        <Card delay={200} style={styles.roleCard}>
           <View style={styles.roleHeader}>
              <View style={styles.roleBadge}>
                 <Text style={styles.roleBadgeNum}>9</Text>
              </View>
              <View>
                 <Text style={styles.rolePosition}>Delantero</Text>
                 <Text style={styles.roleType}>Titular</Text>
              </View>
           </View>
           <View style={styles.roleObjectiveBox}>
              <Text style={styles.roleObjectiveLabel}>OBJETIVO INDIVIDUAL:</Text>
              <Text style={styles.roleObjectiveText}>"Atacar espacios y finalizar rápido."</Text>
           </View>
        </Card>

        {/* 5. OBJETIVO DEL ENTRENADOR */}
        <Text style={styles.sectionTitle}>Mensaje del Míster</Text>
        <Card delay={250} style={styles.coachMsgCard}>
           <FontAwesome name="quote-left" size={24} color="rgba(79, 195, 247, 0.3)" style={{ position: 'absolute', top: 16, left: 16 }} />
           <Text style={styles.coachMsgText}>"Presionar arriba desde el inicio y salir rápido tras recuperación."</Text>
        </Card>

        {/* 3. MI INFORMACIÓN DEL PARTIDO */}
        <Text style={styles.sectionTitle}>Logística</Text>
        <Card delay={300} style={styles.logisticsCard}>
           <View style={styles.logisticsGrid}>
              <View style={styles.logisticsItem}>
                 <FontAwesome name="clock-o" size={16} color={colors.sky} style={styles.logisticsIcon} />
                 <View>
                    <Text style={styles.logisticsLabel}>Hora Citación</Text>
                    <Text style={styles.logisticsValue}>17:15</Text>
                 </View>
              </View>
              <View style={styles.logisticsItem}>
                 <FontAwesome name="map-marker" size={16} color={colors.sky} style={styles.logisticsIcon} />
                 <View>
                    <Text style={styles.logisticsLabel}>Punto Encuentro</Text>
                    <Text style={styles.logisticsValue}>Puerta principal CD Jesuitas</Text>
                 </View>
              </View>
              <View style={styles.logisticsItem}>
                 <FontAwesome name="lock" size={16} color={colors.sky} style={styles.logisticsIcon} />
                 <View>
                    <Text style={styles.logisticsLabel}>Vestuario</Text>
                    <Text style={styles.logisticsValue}>4</Text>
                 </View>
              </View>
              <View style={styles.logisticsItem}>
                 <FontAwesome name="shopping-bag" size={16} color={colors.sky} style={styles.logisticsIcon} />
                 <View>
                    <Text style={styles.logisticsLabel}>Equipación</Text>
                    <Text style={styles.logisticsValue}>Azul</Text>
                 </View>
              </View>
           </View>
        </Card>

        {/* 6. CHECKLIST DEL PARTIDO */}
        <Text style={styles.sectionTitle}>Checklist Preparación</Text>
        <Card delay={350} style={styles.checklistCard}>
           {checklist.map((item, idx) => (
             <TouchableOpacity key={item.id} style={styles.checklistItem} onPress={() => toggleCheck(item.id)}>
                <FontAwesome name={item.checked ? "check-circle" : "circle-thin"} size={22} color={item.checked ? colors.success : colors.muted} />
                <Text style={[styles.checklistText, item.checked && styles.checklistTextChecked]}>{item.text}</Text>
             </TouchableOpacity>
           ))}
        </Card>

        {/* 9. TIEMPO PREVISTO */}
        <Text style={styles.sectionTitle}>Tiempo Previsto</Text>
        <View style={styles.weatherBox}>
           <FontAwesome name="cloud" size={30} color={colors.sky} />
           <View style={styles.weatherInfo}>
              <Text style={styles.weatherTemp}>22º</Text>
              <Text style={styles.weatherDesc}>Parcialmente nublado • Viento suave</Text>
           </View>
        </View>

        {/* 8. INFORMACIÓN DEL RIVAL */}
        <Text style={styles.sectionTitle}>Análisis del Rival</Text>
        <Card delay={400} style={styles.rivalCard}>
           <View style={styles.rivalHeader}>
              <FontAwesome name="shield" size={32} color="#E11D48" />
              <View style={{ marginLeft: 12 }}>
                 <Text style={styles.rivalName}>Levante UD</Text>
                 <Text style={styles.rivalPosition}>3º Clasificado</Text>
              </View>
           </View>
           <View style={styles.rivalStatsGrid}>
              <View style={styles.rivalStat}>
                 <Text style={styles.rivalStatLabel}>Últimos 5</Text>
                 <View style={styles.rivalForm}>
                    <Text style={[styles.formBadge, { backgroundColor: colors.success }]}>V</Text>
                    <Text style={[styles.formBadge, { backgroundColor: colors.success }]}>V</Text>
                    <Text style={[styles.formBadge, { backgroundColor: '#E11D48' }]}>D</Text>
                    <Text style={[styles.formBadge, { backgroundColor: '#EAB308' }]}>E</Text>
                    <Text style={[styles.formBadge, { backgroundColor: colors.success }]}>V</Text>
                 </View>
              </View>
              <View style={styles.rivalStat}>
                 <Text style={styles.rivalStatLabel}>Goles</Text>
                 <Text style={styles.rivalStatValue}>18 F / 6 C</Text>
              </View>
              <View style={styles.rivalStat}>
                 <Text style={styles.rivalStatLabel}>A tener en cuenta</Text>
                 <Text style={styles.rivalStatValue}>Dorsal 10 (Media punta)</Text>
              </View>
           </View>
        </Card>

        {/* 11. ACCIONES */}
        <View style={styles.actionsGrid}>
           <TouchableOpacity style={styles.actionBtnMap}>
              <FontAwesome name="location-arrow" size={16} color={colors.navy} />
              <Text style={styles.actionBtnTextDark}>Cómo Llegar</Text>
           </TouchableOpacity>
           <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionBtnLight} onPress={() => router.push('/(drawer)/jugador/calendario' as any)}>
                 <FontAwesome name="calendar" size={14} color={colors.white} />
                 <Text style={styles.actionBtnTextLight}>Calendario</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtnLight}>
                 <FontAwesome name="commenting-o" size={14} color={colors.white} />
                 <Text style={styles.actionBtnTextLight}>Hablar al Míster</Text>
              </TouchableOpacity>
           </View>
        </View>

        {/* 7. LISTA DE CONVOCADOS */}
        <Text style={styles.sectionTitle}>Compañeros Convocados</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.teammatesScroll} contentContainerStyle={{ gap: 12 }}>
           {MOCK_TEAMMATES.map(player => (
              <View key={player.id} style={styles.teammateCard}>
                 <Image source={{ uri: player.avatar }} style={styles.teammateAvatar} />
                 <Text style={styles.teammateName}>{player.name}</Text>
                 <Text style={styles.teammatePos}>{player.pos} • #{player.dorsal}</Text>
              </View>
           ))}
        </ScrollView>

        {/* 12. HISTORIAL DE CONVOCATORIAS */}
        <Text style={styles.sectionTitle}>Tu Historial</Text>
        <Card delay={450} style={styles.historyCard}>
           {MOCK_HISTORY.map((hist, idx) => (
             <View key={hist.id}>
                <View style={styles.historyRow}>
                   <View>
                      <Text style={styles.historyMatch}>{hist.match}</Text>
                      <Text style={styles.historyDate}>{hist.date}</Text>
                   </View>
                   <Text style={[styles.historyStatus, 
                      hist.status.includes('Convocado') && !hist.status.includes('No') ? { color: colors.success } : 
                      hist.status.includes('No') ? { color: '#E11D48' } : { color: '#EAB308' }]}>
                      {hist.status}
                   </Text>
                </View>
                {idx < MOCK_HISTORY.length - 1 && <View style={styles.historyDivider} />}
             </View>
           ))}
        </Card>

      </ScrollView>
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

  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: spacing.l, marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Cabecera Partido
  matchHeaderCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.xl, borderRadius: 24, alignItems: 'center' },
  matchCompetition: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  matchDate: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 4, marginBottom: 20 },
  matchTeamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: 24 },
  teamShieldBox: { alignItems: 'center', flex: 1 },
  teamName: { color: colors.white, fontSize: 13, fontWeight: '900', marginTop: 12, textAlign: 'center' },
  vsContainer: { width: 40, alignItems: 'center' },
  vsText: { color: colors.muted, fontSize: 20, fontWeight: '900' },
  matchLocationRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  matchLocationText: { color: colors.sky, fontSize: 12, fontWeight: '700', marginLeft: 8 },

  countdownBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -15, backgroundColor: 'rgba(79, 195, 247, 0.15)', alignSelf: 'center', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)', marginBottom: spacing.xl },
  countdownText: { color: colors.sky, fontSize: 13, fontWeight: '800', marginLeft: 8 },

  // Tarjeta Estado
  statusCard: { backgroundColor: 'rgba(34,197,94,0.1)', borderColor: '#22C55E', padding: spacing.xl, borderRadius: 24, alignItems: 'center', borderWidth: 2 },
  statusCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(34,197,94,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statusTitle: { color: '#22C55E', fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  statusSub: { color: colors.white, fontSize: 14, fontWeight: '600', marginTop: 4, textAlign: 'center' },

  // Mi Rol
  roleCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  roleHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  roleBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  roleBadgeNum: { color: colors.white, fontSize: 20, fontWeight: '900' },
  rolePosition: { color: colors.white, fontSize: 16, fontWeight: '800' },
  roleType: { color: colors.sky, fontSize: 13, fontWeight: '700' },
  roleObjectiveBox: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12 },
  roleObjectiveLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', marginBottom: 4 },
  roleObjectiveText: { color: colors.white, fontSize: 14, fontWeight: '700', fontStyle: 'italic' },

  // Mensaje Míster
  coachMsgCard: { backgroundColor: 'rgba(79, 195, 247, 0.05)', borderColor: 'rgba(79, 195, 247, 0.2)', padding: 24, borderRadius: 20 },
  coachMsgText: { color: colors.white, fontSize: 16, fontWeight: '700', fontStyle: 'italic', textAlign: 'center', lineHeight: 24 },

  // Logística
  logisticsCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  logisticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  logisticsItem: { width: '47%', flexDirection: 'row', alignItems: 'center' },
  logisticsIcon: { width: 24 },
  logisticsLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  logisticsValue: { color: colors.white, fontSize: 13, fontWeight: '700' },

  // Checklist
  checklistCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  checklistItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  checklistText: { color: colors.white, fontSize: 15, fontWeight: '600', marginLeft: 12 },
  checklistTextChecked: { color: colors.muted, textDecorationLine: 'line-through' },

  // Tiempo
  weatherBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: spacing.l, borderRadius: 20, borderColor: 'rgba(255,255,255,0.05)', borderWidth: 1 },
  weatherInfo: { marginLeft: 16 },
  weatherTemp: { color: colors.white, fontSize: 24, fontWeight: '900' },
  weatherDesc: { color: colors.sky, fontSize: 13, fontWeight: '700' },

  // Rival
  rivalCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  rivalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 16 },
  rivalName: { color: colors.white, fontSize: 18, fontWeight: '900' },
  rivalPosition: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  rivalStatsGrid: { gap: 16 },
  rivalStat: {},
  rivalStatLabel: { color: colors.muted, fontSize: 11, fontWeight: '800', textTransform: 'uppercase', marginBottom: 4 },
  rivalStatValue: { color: colors.white, fontSize: 14, fontWeight: '800' },
  rivalForm: { flexDirection: 'row', gap: 6 },
  formBadge: { width: 24, height: 24, borderRadius: 4, color: colors.white, fontSize: 12, fontWeight: '900', textAlign: 'center', lineHeight: 24 },

  // Acciones
  actionsGrid: { marginTop: spacing.xl },
  actionBtnMap: { backgroundColor: colors.sky, padding: 16, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionBtnTextDark: { color: colors.navy, fontSize: 14, fontWeight: '900', marginLeft: 8 },
  actionsRow: { flexDirection: 'row', gap: 12 },
  actionBtnLight: { flex: 1, backgroundColor: 'rgba(255,255,255,0.1)', padding: 14, borderRadius: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  actionBtnTextLight: { color: colors.white, fontSize: 13, fontWeight: '800', marginLeft: 8 },

  // Compañeros
  teammatesScroll: { paddingRight: 40 },
  teammateCard: { alignItems: 'center', width: 70 },
  teammateAvatar: { width: 56, height: 56, borderRadius: 28, marginBottom: 8, borderWidth: 2, borderColor: colors.sky },
  teammateName: { color: colors.white, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  teammatePos: { color: colors.muted, fontSize: 9, fontWeight: '700', textAlign: 'center' },

  // Historial
  historyCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  historyMatch: { color: colors.white, fontSize: 14, fontWeight: '800' },
  historyDate: { color: colors.muted, fontSize: 11, fontWeight: '600', marginTop: 2 },
  historyStatus: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  historyDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)' }
});
