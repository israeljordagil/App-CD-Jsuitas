import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EntrenamientoWizard, WizardMode } from '../../../src/components/dashboards/EntrenamientoWizard';

export default function EntrenamientosScreen() {
  const [wizardMode, setWizardMode] = useState<WizardMode>(null);

  const openWizard = (mode: WizardMode) => setWizardMode(mode);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.headerCard}>
           <LinearGradient colors={['rgba(79, 195, 247, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
           <View style={styles.headerTop}>
              <View>
                 <Text style={styles.headerTitle}>🏃 Entrenamientos</Text>
                 <Text style={styles.headerSub}>Cadete B • Temp 26/27</Text>
              </View>
           </View>
           
           <View style={styles.kpiGrid}>
              <View style={styles.kpiBox}>
                 <Text style={styles.kpiVal}>12</Text>
                 <Text style={styles.kpiLbl}>Sesiones Mes</Text>
              </View>
              <View style={styles.kpiBox}>
                 <Text style={[styles.kpiVal, {color: colors.success}]}>92%</Text>
                 <Text style={styles.kpiLbl}>Asistencia Media</Text>
              </View>
              <View style={styles.kpiBox}>
                 <Text style={styles.kpiVal}>18</Text>
                 <Text style={styles.kpiLbl}>Disponibles</Text>
              </View>
              <View style={styles.kpiBox}>
                 <Text style={[styles.kpiVal, {color: colors.warning}]}>2</Text>
                 <Text style={styles.kpiLbl}>Incidencias</Text>
              </View>
           </View>
        </Card>

        {/* 3. CREAR ENTRENAMIENTO */}
        <TouchableOpacity onPress={() => openWizard('create')}>
           <Card delay={150} style={styles.createCard}>
              <LinearGradient colors={['#38BDF8', '#0284C7']} style={StyleSheet.absoluteFillObject} />
              <FontAwesome name="plus" size={24} color={colors.navy} />
              <View style={{marginLeft: 16, flex: 1}}>
                 <Text style={styles.createTitle}>Crear Entrenamiento</Text>
                 <Text style={styles.createSub}>Planificar nueva sesión</Text>
              </View>
           </Card>
        </TouchableOpacity>

        {/* 2. ENTRENAMIENTO DE HOY */}
        <Text style={styles.sectionTitle}>Sesión de Hoy</Text>
        <Card delay={200} style={styles.todayCard}>
           <View style={styles.todayHeader}>
              <View style={styles.todayBadge}><Text style={styles.todayBadgeTxt}>HOY • 18:30</Text></View>
              <Text style={styles.todayTitle}>Táctica y Salida de Balón</Text>
           </View>
           
           <View style={styles.todayGrid}>
              <View style={styles.tItem}><FontAwesome name="map-marker" size={14} color={colors.sky} style={styles.tIcon}/><Text style={styles.tTxt}>Campo 2</Text></View>
              <View style={styles.tItem}><FontAwesome name="clock-o" size={14} color={colors.sky} style={styles.tIcon}/><Text style={styles.tTxt}>90 mins</Text></View>
              <View style={styles.tItem}><FontAwesome name="bolt" size={14} color={colors.sky} style={styles.tIcon}/><Text style={styles.tTxt}>Alta intensidad</Text></View>
              <View style={styles.tItem}><FontAwesome name="cubes" size={14} color={colors.sky} style={styles.tIcon}/><Text style={styles.tTxt}>Petos, conos</Text></View>
           </View>

           <View style={styles.actionGrid}>
              <TouchableOpacity style={styles.actionBtn} onPress={() => openWizard('attendance')}>
                 <FontAwesome name="users" size={16} color={colors.white} style={{marginBottom: 8}} />
                 <Text style={styles.actionBtnTxt}>Asistencia</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => openWizard('workload')}>
                 <FontAwesome name="heartbeat" size={16} color={colors.white} style={{marginBottom: 8}} />
                 <Text style={styles.actionBtnTxt}>Carga</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => openWizard('incidents')}>
                 <FontAwesome name="warning" size={16} color={colors.white} style={{marginBottom: 8}} />
                 <Text style={styles.actionBtnTxt}>Incidencias</Text>
              </TouchableOpacity>
           </View>

           <TouchableOpacity style={styles.primaryBtnFull} onPress={() => openWizard('report')}>
              <Text style={styles.primaryBtnFullTxt}>CERRAR SESIÓN E INFORME</Text>
           </TouchableOpacity>
        </Card>

        {/* 8. HISTORIAL */}
        <Text style={styles.sectionTitle}>Historial de Entrenamientos</Text>
        {[
           { date: 'Jue 10 Sep', obj: 'Finalización y tiros libres', att: '20/22', int: 'Media' },
           { date: 'Mar 8 Sep', obj: 'Resistencia aeróbica', att: '21/22', int: 'Alta' },
           { date: 'Jue 3 Sep', obj: 'Transiciones rápidas', att: '19/22', int: 'Muy Alta' },
        ].map((h, i) => (
           <Card delay={250 + (i*50)} key={i} style={styles.histCard}>
              <View style={styles.histLeft}>
                 <Text style={styles.histDate}>{h.date}</Text>
                 <Text style={styles.histObj}>{h.obj}</Text>
              </View>
              <View style={styles.histRight}>
                 <Text style={styles.histStat}><FontAwesome name="users" color={colors.muted} /> {h.att}</Text>
                 <Text style={styles.histStat}><FontAwesome name="bolt" color={colors.muted} /> {h.int}</Text>
              </View>
           </Card>
        ))}

        <View style={{height: 60}} />
      </ScrollView>

      {/* WIZARD MODAL */}
      <EntrenamientoWizard mode={wizardMode} onClose={() => setWizardMode(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B1F4D' },
  content: { padding: spacing.l },
  
  // Header
  headerCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  headerTop: { marginBottom: 20 },
  headerTitle: { color: colors.white, fontSize: 24, fontWeight: '900' },
  headerSub: { color: colors.sky, fontSize: 13, fontWeight: '800', marginTop: 4 },
  kpiGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  kpiBox: { alignItems: 'center' },
  kpiVal: { color: colors.white, fontSize: 20, fontWeight: '900' },
  kpiLbl: { color: colors.muted, fontSize: 10, fontWeight: '700', marginTop: 4, textTransform: 'uppercase' },

  // Create Card
  createCard: { borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 24, overflow: 'hidden', shadowColor: '#0284C7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },
  createTitle: { color: colors.navy, fontSize: 18, fontWeight: '900' },
  createSub: { color: 'rgba(11,31,77,0.7)', fontSize: 12, fontWeight: '700' },

  sectionTitle: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },

  // Today Card
  todayCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 20, marginBottom: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  todayHeader: { marginBottom: 16 },
  todayBadge: { backgroundColor: 'rgba(0, 240, 255, 0.1)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 8 },
  todayBadgeTxt: { color: colors.sky, fontSize: 11, fontWeight: '900' },
  todayTitle: { color: colors.white, fontSize: 20, fontWeight: '900' },
  todayGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24, backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 16 },
  tItem: { flexDirection: 'row', alignItems: 'center', width: '45%' },
  tIcon: { width: 20, textAlign: 'center' },
  tTxt: { color: colors.white, fontSize: 13, fontWeight: '600' },
  
  actionGrid: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  actionBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  actionBtnTxt: { color: colors.white, fontSize: 11, fontWeight: '800' },

  primaryBtnFull: { backgroundColor: colors.sky, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  primaryBtnFullTxt: { color: colors.navy, fontSize: 13, fontWeight: '900', letterSpacing: 1 },

  // Historial
  histCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16, marginBottom: 12 },
  histLeft: { flex: 1 },
  histDate: { color: colors.sky, fontSize: 12, fontWeight: '900', marginBottom: 4 },
  histObj: { color: colors.white, fontSize: 14, fontWeight: '700' },
  histRight: { alignItems: 'flex-end' },
  histStat: { color: colors.muted, fontSize: 12, fontWeight: '600', marginBottom: 2 }
});
