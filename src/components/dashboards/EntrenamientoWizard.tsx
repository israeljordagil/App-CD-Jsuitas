import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Platform, LayoutAnimation, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing } from '../../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type WizardMode = 'create' | 'attendance' | 'workload' | 'incidents' | 'report' | null;

interface WizardProps {
  mode: WizardMode;
  onClose: () => void;
}

// Mock Data Players
const ALL_PLAYERS = [
  { id: 1, dorsal: 1, name: 'Alejandro', pos: 'POR' }, { id: 2, dorsal: 13, name: 'Martín', pos: 'POR' },
  { id: 3, dorsal: 2, name: 'Mateo', pos: 'DEF' }, { id: 4, dorsal: 3, name: 'Lucas', pos: 'DEF' },
  { id: 5, dorsal: 4, name: 'Leo', pos: 'DEF' }, { id: 6, dorsal: 5, name: 'Daniel', pos: 'DEF' },
  { id: 7, dorsal: 12, name: 'Pablo', pos: 'DEF' }, { id: 8, dorsal: 14, name: 'Álvaro', pos: 'DEF' },
  { id: 10, dorsal: 6, name: 'Adrián', pos: 'MED' }, { id: 11, dorsal: 8, name: 'David', pos: 'MED' },
  { id: 12, dorsal: 10, name: 'Álex', pos: 'MED' }, { id: 14, dorsal: 17, name: 'Thiago', pos: 'MED' },
  { id: 15, dorsal: 18, name: 'Izan', pos: 'MED' }, { id: 17, dorsal: 7, name: 'Javier', pos: 'DEL' },
  { id: 18, dorsal: 11, name: 'Hugo', pos: 'DEL' }, { id: 19, dorsal: 9, name: 'Marco', pos: 'DEL' }
];

type AttStatus = 'Presente' | 'Ausente' | 'Tarde' | 'Lesionado' | 'Justificado';
const ATT_COLORS: Record<AttStatus, string> = {
  'Presente': '#22C55E', 'Ausente': '#EF4444', 'Tarde': '#EAB308', 'Lesionado': '#1F2937', 'Justificado': '#3B82F6'
};

const NEXT_STATUS: Record<AttStatus, AttStatus> = {
  'Presente': 'Ausente', 'Ausente': 'Tarde', 'Tarde': 'Lesionado', 'Lesionado': 'Justificado', 'Justificado': 'Presente'
};

export function EntrenamientoWizard({ mode, onClose }: WizardProps) {
  // CREATE MODE STATE
  const [createStep, setCreateStep] = useState(1);
  const [sessionData, setSessionData] = useState({ fecha: 'Hoy', hora: '18:30', campo: 'Campo 1', vestuario: 'V2', objetivo: '', material: '' });
  
  // ATTENDANCE STATE
  const [attendance, setAttendance] = useState<Record<number, AttStatus>>(
     ALL_PLAYERS.reduce((acc, p) => ({ ...acc, [p.id]: 'Presente' }), {})
  );

  // INCIDENTS STATE
  const [incidents, setIncidents] = useState<any[]>([]);

  // WORKLOAD STATE
  const [workload, setWorkload] = useState({ prev: 7, real: 8, duration: 90 });

  if (!mode) return null;

  const toggleAttendance = (id: number) => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
     setAttendance(prev => ({ ...prev, [id]: NEXT_STATUS[prev[id]] }));
  };

  const renderHeader = (title: string) => (
     <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
           <FontAwesome name="times" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{width: 40}} />
     </View>
  );

  const renderCreateMode = () => (
     <>
        {renderHeader('NUEVO ENTRENAMIENTO')}
        <View style={styles.timeline}>
           {['Datos', 'Objetivo', 'Ejercicios', 'Material'].map((s, i) => (
              <Text key={s} style={[styles.tlTxt, createStep === i + 1 && styles.tlTxtActive]}>{s}</Text>
           ))}
        </View>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
           {createStep === 1 && (
              <View style={styles.card}>
                 <Text style={styles.cardTitle}>Datos Básicos</Text>
                 <View style={styles.inputRow}><Text style={styles.inputLbl}>Fecha</Text><TextInput style={styles.input} value={sessionData.fecha} onChangeText={t => setSessionData({...sessionData, fecha: t})} /></View>
                 <View style={styles.inputRow}><Text style={styles.inputLbl}>Hora Inicio</Text><TextInput style={styles.input} value={sessionData.hora} onChangeText={t => setSessionData({...sessionData, hora: t})} /></View>
                 <View style={styles.inputRow}><Text style={styles.inputLbl}>Campo</Text><TextInput style={styles.input} value={sessionData.campo} onChangeText={t => setSessionData({...sessionData, campo: t})} /></View>
                 <View style={styles.inputRow}><Text style={styles.inputLbl}>Vestuario</Text><TextInput style={styles.input} value={sessionData.vestuario} onChangeText={t => setSessionData({...sessionData, vestuario: t})} /></View>
              </View>
           )}
           {createStep === 2 && (
              <View style={styles.card}>
                 <Text style={styles.cardTitle}>Objetivo de la sesión</Text>
                 <TextInput style={styles.areaInput} multiline placeholder="Ej: Salida de balón bajo presión" placeholderTextColor={colors.muted} value={sessionData.objetivo} onChangeText={t => setSessionData({...sessionData, objetivo: t})} />
              </View>
           )}
           {createStep === 3 && (
              <View style={styles.card}>
                 <Text style={styles.cardTitle}>Planificación de Bloques</Text>
                 {['Calentamiento', 'Parte Principal', 'Táctica', 'Vuelta a la calma'].map((b, i) => (
                    <View key={i} style={styles.blockRow}>
                       <FontAwesome name="bars" size={16} color={colors.muted} style={{marginRight: 12}} />
                       <View style={{flex: 1}}><Text style={styles.blockTitle}>{b}</Text><Text style={styles.blockSub}>15 mins</Text></View>
                       <TouchableOpacity><FontAwesome name="pencil" size={16} color={colors.sky} /></TouchableOpacity>
                    </View>
                 ))}
                 <TouchableOpacity style={styles.addBlockBtn}><Text style={styles.addBlockTxt}>+ Añadir bloque</Text></TouchableOpacity>
              </View>
           )}
           {createStep === 4 && (
              <View style={styles.card}>
                 <Text style={styles.cardTitle}>Material Necesario</Text>
                 <TextInput style={styles.areaInput} multiline placeholder="Petos, conos, picas..." placeholderTextColor={colors.muted} value={sessionData.material} onChangeText={t => setSessionData({...sessionData, material: t})} />
              </View>
           )}
        </ScrollView>
        <View style={styles.footer}>
           {createStep > 1 ? <TouchableOpacity onPress={() => setCreateStep(createStep - 1)}><Text style={styles.footerTxt}>ATRÁS</Text></TouchableOpacity> : <View />}
           <TouchableOpacity style={styles.primaryBtn} onPress={() => createStep < 4 ? setCreateStep(createStep + 1) : onClose()}>
              <Text style={styles.primaryBtnTxt}>{createStep < 4 ? 'SIGUIENTE' : 'GUARDAR ENTRENAMIENTO'}</Text>
           </TouchableOpacity>
        </View>
     </>
  );

  const renderAttendanceMode = () => {
     const counts = Object.values(attendance).reduce((acc: any, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
     return (
        <>
           {renderHeader('ASISTENCIA')}
           <View style={styles.statsRow}>
              <View style={styles.statBox}><Text style={[styles.statNum, {color: ATT_COLORS.Presente}]}>{counts['Presente'] || 0}</Text><Text style={styles.statLbl}>Presentes</Text></View>
              <View style={styles.statBox}><Text style={[styles.statNum, {color: ATT_COLORS.Ausente}]}>{counts['Ausente'] || 0}</Text><Text style={styles.statLbl}>Ausentes</Text></View>
              <View style={styles.statBox}><Text style={[styles.statNum, {color: ATT_COLORS.Tarde}]}>{counts['Tarde'] || 0}</Text><Text style={styles.statLbl}>Tarde</Text></View>
           </View>
           <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {ALL_PLAYERS.map(p => (
                 <TouchableOpacity key={p.id} style={styles.attCard} onPress={() => toggleAttendance(p.id)}>
                    <View style={styles.attAvatar}><Text style={styles.attNum}>{p.dorsal}</Text></View>
                    <Text style={styles.attName}>{p.name}</Text>
                    <View style={[styles.attBadge, {backgroundColor: ATT_COLORS[attendance[p.id]]}]}>
                       <Text style={styles.attBadgeTxt}>{attendance[p.id]}</Text>
                    </View>
                 </TouchableOpacity>
              ))}
              <View style={{height: 40}} />
           </ScrollView>
           <View style={styles.footerCenter}>
              <TouchableOpacity style={styles.primaryBtnFull} onPress={onClose}><Text style={styles.primaryBtnTxt}>GUARDAR ASISTENCIA</Text></TouchableOpacity>
           </View>
        </>
     );
  };

  const renderWorkloadMode = () => (
     <>
        {renderHeader('CARGA DE TRABAJO')}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
           <View style={styles.card}>
              <Text style={styles.cardTitle}>Intensidad Prevista (1-10)</Text>
              <View style={styles.sliderRow}>
                 <Text style={styles.sliderVal}>{workload.prev}</Text>
                 <View style={styles.sliderTrack}><View style={[styles.sliderFill, {width: `${workload.prev * 10}%`, backgroundColor: colors.sky}]} /></View>
              </View>
              
              <Text style={styles.cardTitle}>Intensidad Real (1-10)</Text>
              <View style={styles.sliderRow}>
                 <Text style={styles.sliderVal}>{workload.real}</Text>
                 <View style={styles.sliderTrack}><View style={[styles.sliderFill, {width: `${workload.real * 10}%`, backgroundColor: '#EAB308'}]} /></View>
              </View>

              <Text style={styles.cardTitle}>Duración (minutos)</Text>
              <TextInput style={styles.inputAreaNum} keyboardType="numeric" value={workload.duration.toString()} onChangeText={t => setWorkload({...workload, duration: parseInt(t) || 0})} />
           </View>

           <View style={[styles.card, {backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#EF4444'}]}>
              <Text style={[styles.cardTitle, {color: '#EF4444'}]}>⚠️ Riesgo de Sobrecarga</Text>
              <Text style={styles.cardTxt}>La intensidad real (8) combinada con la sesión de ayer genera un riesgo moderado-alto de fatiga muscular.</Text>
           </View>
        </ScrollView>
        <View style={styles.footerCenter}>
           <TouchableOpacity style={styles.primaryBtnFull} onPress={onClose}><Text style={styles.primaryBtnTxt}>GUARDAR CARGAS</Text></TouchableOpacity>
        </View>
     </>
  );

  const renderIncidentsMode = () => (
     <>
        {renderHeader('REGISTRO DE INCIDENCIAS')}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
           <TouchableOpacity style={styles.addIncBtn}>
              <FontAwesome name="plus-circle" size={24} color={colors.navy} style={{marginRight: 12}} />
              <Text style={styles.addIncTxt}>Registrar Nueva Incidencia</Text>
           </TouchableOpacity>

           {incidents.length === 0 ? (
              <Text style={styles.emptyTxt}>No hay incidencias registradas en esta sesión.</Text>
           ) : null}

           {/* Mock Incident Example */}
           <View style={styles.card}>
              <View style={styles.incHeader}>
                 <View style={styles.incBadge}><Text style={styles.incBadgeTxt}>LESIÓN</Text></View>
                 <Text style={styles.incDate}>Hace 10 mins</Text>
              </View>
              <Text style={styles.incPlayer}>Álvaro (Dorsal 14)</Text>
              <Text style={styles.incDesc}>Molestias en el isquiotibial derecho durante un sprint. Retirado por precaución.</Text>
           </View>
        </ScrollView>
     </>
  );

  const renderReportMode = () => (
     <>
        {renderHeader('INFORME DE SESIÓN')}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
           <View style={styles.reportPdf}>
              <View style={styles.repHeader}>
                 <FontAwesome name="file-text-o" size={32} color={colors.navy} style={{marginBottom: 12}} />
                 <Text style={styles.repTitle}>INFORME POST-SESIÓN</Text>
                 <Text style={styles.repSub}>Cadete B • 15 Septiembre 2026</Text>
              </View>
              <View style={styles.repRow}><Text style={styles.repLbl}>Asistencia</Text><Text style={styles.repVal}>14/16 (87%)</Text></View>
              <View style={styles.repRow}><Text style={styles.repLbl}>Intensidad</Text><Text style={styles.repVal}>8/10 (Carga Alta)</Text></View>
              <View style={styles.repRow}><Text style={styles.repLbl}>Incidencias</Text><Text style={styles.repVal}>1 Lesión (Álvaro)</Text></View>
              <Text style={styles.repLbl}>Objetivos Trabajados</Text>
              <Text style={styles.repValBlock}>Salida de balón desde atrás, transiciones defensivas rápidas. Buen entendimiento general de los conceptos.</Text>
           </View>

           <TouchableOpacity style={styles.shareBtn}><FontAwesome name="file-pdf-o" size={16} color={colors.white} style={{marginRight: 8}}/><Text style={styles.shareBtnTxt}>Exportar PDF</Text></TouchableOpacity>
           <TouchableOpacity style={[styles.shareBtn, {backgroundColor: '#25D366', borderColor: '#25D366'}]}><FontAwesome name="whatsapp" size={16} color={colors.white} style={{marginRight: 8}}/><Text style={styles.shareBtnTxt}>Compartir Resumen</Text></TouchableOpacity>
        </ScrollView>
     </>
  );

  return (
    <Modal visible={true} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
         {mode === 'create' && renderCreateMode()}
         {mode === 'attendance' && renderAttendanceMode()}
         {mode === 'workload' && renderWorkloadMode()}
         {mode === 'incidents' && renderIncidentsMode()}
         {mode === 'report' && renderReportMode()}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.m, paddingVertical: spacing.s, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  timeline: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, backgroundColor: 'rgba(0,0,0,0.2)' },
  tlTxt: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  tlTxtActive: { color: colors.sky, fontWeight: '900' },
  content: { flex: 1, padding: spacing.l },
  card: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 20, padding: 20, marginBottom: 20 },
  cardTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginBottom: 16 },
  cardTxt: { color: colors.white, fontSize: 13, lineHeight: 20 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingVertical: 12 },
  inputLbl: { color: colors.sky, fontSize: 13, fontWeight: '800' },
  input: { color: colors.white, fontSize: 15, fontWeight: '800', textAlign: 'right', flex: 1 },
  areaInput: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 16, color: colors.white, minHeight: 100, textAlignVertical: 'top' },
  inputAreaNum: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 16, color: colors.white, fontSize: 24, fontWeight: '900', textAlign: 'center' },
  blockRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, marginBottom: 8 },
  blockTitle: { color: colors.white, fontSize: 14, fontWeight: '800' },
  blockSub: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  addBlockBtn: { borderStyle: 'dashed', borderWidth: 1, borderColor: colors.sky, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  addBlockTxt: { color: colors.sky, fontSize: 13, fontWeight: '800' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.l, backgroundColor: '#071A3D', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  footerTxt: { color: colors.muted, fontSize: 13, fontWeight: '900' },
  primaryBtn: { backgroundColor: colors.sky, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 12 },
  primaryBtnTxt: { color: colors.navy, fontSize: 13, fontWeight: '900' },
  footerCenter: { padding: spacing.l, backgroundColor: '#071A3D', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  primaryBtnFull: { backgroundColor: colors.sky, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },

  // Attendance
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 16, backgroundColor: 'rgba(0,0,0,0.2)' },
  statBox: { alignItems: 'center' },
  statNum: { fontSize: 24, fontWeight: '900' },
  statLbl: { color: colors.muted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  attCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 16, marginBottom: 8 },
  attAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  attNum: { color: colors.white, fontSize: 14, fontWeight: '900' },
  attName: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '800' },
  attBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  attBadgeTxt: { color: colors.white, fontSize: 10, fontWeight: '900', textTransform: 'uppercase' },

  // Workload
  sliderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  sliderVal: { color: colors.white, fontSize: 24, fontWeight: '900', width: 40 },
  sliderTrack: { flex: 1, height: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 6, overflow: 'hidden' },
  sliderFill: { height: '100%', borderRadius: 6 },

  // Incidents
  addIncBtn: { backgroundColor: colors.sky, flexDirection: 'row', padding: 20, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  addIncTxt: { color: colors.navy, fontSize: 15, fontWeight: '900' },
  emptyTxt: { color: colors.muted, textAlign: 'center', fontSize: 14, fontStyle: 'italic', marginTop: 40 },
  incHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  incBadge: { backgroundColor: 'rgba(239, 68, 68, 0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  incBadgeTxt: { color: '#EF4444', fontSize: 10, fontWeight: '900' },
  incDate: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  incPlayer: { color: colors.white, fontSize: 16, fontWeight: '900', marginBottom: 4 },
  incDesc: { color: colors.muted, fontSize: 13, lineHeight: 20 },

  // Report
  reportPdf: { backgroundColor: '#FFF', borderRadius: 12, padding: 24, marginBottom: 24 },
  repHeader: { alignItems: 'center', borderBottomWidth: 2, borderBottomColor: colors.navy, paddingBottom: 16, marginBottom: 16 },
  repTitle: { color: colors.navy, fontSize: 18, fontWeight: '900' },
  repSub: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  repRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  repLbl: { color: '#6B7280', fontSize: 12, fontWeight: '800', textTransform: 'uppercase' },
  repVal: { color: colors.navy, fontSize: 13, fontWeight: '900' },
  repValBlock: { color: '#1F2937', fontSize: 13, lineHeight: 20, marginTop: 8 },
  shareBtn: { flexDirection: 'row', backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingVertical: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  shareBtnTxt: { color: colors.white, fontSize: 14, fontWeight: '900' }
});
