import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions, TextInput, Alert, Platform, KeyboardAvoidingView, LayoutAnimation, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing } from '../../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window');

type PlayerStatus = 'Disponible' | 'Duda' | 'Lesionado' | 'Sancionado';

interface Player {
  id: number;
  dorsal: number;
  name: string;
  pos: string;
  status: PlayerStatus;
  index: number;
  lastAsist: string;
  mins: number;
}

const ALL_PLAYERS: Player[] = [
  { id: 1, dorsal: 1, name: 'Alejandro', pos: 'POR', status: 'Disponible', index: 95, lastAsist: 'Hace 2 días', mins: 450 },
  { id: 2, dorsal: 13, name: 'Martín', pos: 'POR', status: 'Disponible', index: 80, lastAsist: 'Hoy', mins: 90 },
  { id: 3, dorsal: 2, name: 'Mateo', pos: 'DEF', status: 'Disponible', index: 92, lastAsist: 'Ayer', mins: 420 },
  { id: 4, dorsal: 3, name: 'Lucas', pos: 'DEF', status: 'Disponible', index: 88, lastAsist: 'Ayer', mins: 380 },
  { id: 5, dorsal: 4, name: 'Leo', pos: 'DEF', status: 'Disponible', index: 96, lastAsist: 'Hoy', mins: 500 },
  { id: 6, dorsal: 5, name: 'Daniel', pos: 'DEF', status: 'Disponible', index: 90, lastAsist: 'Hace 2 días', mins: 410 },
  { id: 7, dorsal: 12, name: 'Pablo', pos: 'DEF', status: 'Duda', index: 60, lastAsist: 'Hace 4 días', mins: 120 },
  { id: 8, dorsal: 14, name: 'Álvaro', pos: 'DEF', status: 'Lesionado', index: 10, lastAsist: 'Hace 1 sem', mins: 250 },
  { id: 9, dorsal: 15, name: 'Enzo', pos: 'DEF', status: 'Disponible', index: 85, lastAsist: 'Ayer', mins: 280 },
  { id: 10, dorsal: 6, name: 'Adrián', pos: 'MED', status: 'Disponible', index: 98, lastAsist: 'Ayer', mins: 490 },
  { id: 11, dorsal: 8, name: 'David', pos: 'MED', status: 'Disponible', index: 94, lastAsist: 'Hace 2 días', mins: 460 },
  { id: 12, dorsal: 10, name: 'Álex', pos: 'MED', status: 'Disponible', index: 97, lastAsist: 'Hoy', mins: 480 },
  { id: 13, dorsal: 16, name: 'Diego', pos: 'MED', status: 'Disponible', index: 82, lastAsist: 'Hoy', mins: 210 },
  { id: 14, dorsal: 17, name: 'Thiago', pos: 'MED', status: 'Sancionado', index: 0, lastAsist: 'Ayer', mins: 350 },
  { id: 15, dorsal: 18, name: 'Izan', pos: 'MED', status: 'Disponible', index: 78, lastAsist: 'Hace 2 días', mins: 180 },
  { id: 16, dorsal: 20, name: 'Mario', pos: 'MED', status: 'Disponible', index: 75, lastAsist: 'Ayer', mins: 150 },
  { id: 17, dorsal: 7, name: 'Javier', pos: 'DEL', status: 'Disponible', index: 91, lastAsist: 'Hace 3 días', mins: 390 },
  { id: 18, dorsal: 11, name: 'Hugo', pos: 'DEL', status: 'Disponible', index: 93, lastAsist: 'Hoy', mins: 420 },
  { id: 19, dorsal: 9, name: 'Marco', pos: 'DEL', status: 'Disponible', index: 99, lastAsist: 'Hoy', mins: 510 },
  { id: 20, dorsal: 19, name: 'Darío', pos: 'DEL', status: 'Disponible', index: 84, lastAsist: 'Ayer', mins: 240 },
  { id: 21, dorsal: 21, name: 'Eric', pos: 'DEL', status: 'Disponible', index: 79, lastAsist: 'Hace 2 días', mins: 190 },
  { id: 22, dorsal: 22, name: 'Joel', pos: 'DEL', status: 'Disponible', index: 72, lastAsist: 'Hoy', mins: 110 }
];

const STATUS_COLORS: Record<PlayerStatus, string> = {
  'Disponible': '#22C55E',
  'Duda': '#EAB308',
  'Lesionado': '#EF4444',
  'Sancionado': '#1F2937'
};

const STEPS = ['Partido', 'Jugadores', 'Info', 'Revisión', 'Publicar', 'Compartir'];

const DEFAULT_MATCH = {
  equipo: 'Cadete B',
  categoria: 'Cadete',
  competicion: 'Liga Cadete',
  jornada: 'Jornada 3',
  rival: 'Levante UD',
  fecha: 'Sábado 12 septiembre',
  hora: '18:00',
  campo: 'Campo 2',
  vestuario: '4',
  citacion: '17:15',
  lugar: 'Entrada principal',
  equipacion: 'Azul',
  observaciones: ''
};

interface WizardProps {
  visible: boolean;
  onClose: () => void;
}

export function ConvocatoriaWizard({ visible, onClose }: WizardProps) {
  const [step, setStep] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [matchData, setMatchData] = useState({ ...DEFAULT_MATCH });
  const [waSentStatus, setWaSentStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const [info, setInfo] = useState({
     objetivo: '',
     jugadores: '',
     familias: '',
     material: ''
  });

  const selectedPlayers = useMemo(() => ALL_PLAYERS.filter(p => selectedIds.includes(p.id)), [selectedIds]);

  const togglePlayer = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const generateAI = () => {
     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
     const valids = ALL_PLAYERS.filter(p => p.status === 'Disponible');
     
     const gk = valids.filter(p => p.pos === 'POR').slice(0, 1);
     const def = valids.filter(p => p.pos === 'DEF').slice(0, 5);
     const med = valids.filter(p => p.pos === 'MED').slice(0, 6);
     const del = valids.filter(p => p.pos === 'DEL').slice(0, 4);

     const suggested = [...gk, ...def, ...med, ...del].map(p => p.id);
     setSelectedIds(suggested);
  };

  const clearMatchFields = () => setMatchData({ equipo: '', categoria: '', competicion: '', jornada: '', rival: '', fecha: '', hora: '', campo: '', vestuario: '', citacion: '', lugar: '', equipacion: '', observaciones: '' });
  const loadMockMatch = () => setMatchData({ ...DEFAULT_MATCH });
  const saveChanges = () => Alert.alert('Guardado', 'Los datos se han guardado temporalmente.');

  const nextStep = () => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); if (step < 6) setStep(step + 1); };
  const prevStep = () => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); if (step > 1) setStep(step - 1); };

  // --- RENDERS ---

  const renderGlobalHeader = () => (
     <View style={styles.matchCenterHeader}>
        <LinearGradient colors={['rgba(79, 195, 247, 0.1)', 'transparent']} style={StyleSheet.absoluteFillObject} />
        <View style={styles.mcTopBar}>
           <TouchableOpacity onPress={onClose} style={styles.mcCloseBtn}>
              <FontAwesome name="times" size={16} color={colors.white} />
           </TouchableOpacity>
           <View style={styles.mcStatusBadge}>
              <View style={[styles.mcStatusDot, {backgroundColor: published ? colors.success : colors.warning}]} />
              <Text style={styles.mcStatusTxt}>{published ? 'PUBLICADA' : 'BORRADOR'}</Text>
           </View>
        </View>
        
        <Text style={styles.mcComp}>{matchData.competicion || 'COMPETICIÓN'} • {matchData.jornada || 'JORNADA'}</Text>
        
        <View style={styles.mcVersusBox}>
           <View style={styles.mcTeamCol}>
              <View style={styles.mcShieldLocal}><FontAwesome name="shield" size={32} color={colors.white} /></View>
              <Text style={styles.mcTeamName}>CD Jesuitas</Text>
           </View>
           <View style={styles.mcVsCol}>
              <Text style={styles.mcVsTxt}>VS</Text>
              <Text style={styles.mcVsDate}>{matchData.fecha || 'Fecha'} - {matchData.hora || 'Hora'}</Text>
           </View>
           <View style={styles.mcTeamCol}>
              <View style={styles.mcShieldRival}><FontAwesome name="shield" size={32} color={colors.navy} /></View>
              <Text style={styles.mcTeamName}>{matchData.rival || 'Rival'}</Text>
           </View>
        </View>
     </View>
  );

  const renderTimeline = () => (
     <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timelineScroll} contentContainerStyle={styles.timelineContainer}>
        {STEPS.map((s, i) => {
           const isActive = i + 1 === step;
           const isDone = i + 1 < step;
           return (
              <View key={s} style={styles.tlItem}>
                 <View style={[styles.tlDot, isActive && styles.tlDotActive, isDone && styles.tlDotDone]}>
                    {isDone ? <FontAwesome name="check" size={12} color={colors.white} /> : <View style={[styles.tlDotInner, isActive && styles.tlDotInnerActive]} />}
                 </View>
                 <Text style={[styles.tlTxt, (isActive || isDone) && styles.tlTxtActive]}>{s}</Text>
                 {i < STEPS.length - 1 && <View style={[styles.tlLine, isDone && styles.tlLineDone]} />}
              </View>
           );
        })}
     </ScrollView>
  );

  const renderStep1 = () => (
     <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        <View style={styles.actionsTopGrid}>
           <TouchableOpacity style={styles.actionTopBtn} onPress={saveChanges}><FontAwesome name="save" size={14} color={colors.white} style={{marginBottom:4}} /><Text style={styles.actionTopTxt}>Guardar</Text></TouchableOpacity>
           <TouchableOpacity style={styles.actionTopBtn} onPress={clearMatchFields}><FontAwesome name="eraser" size={14} color={colors.white} style={{marginBottom:4}} /><Text style={styles.actionTopTxt}>Limpiar</Text></TouchableOpacity>
           <TouchableOpacity style={[styles.actionTopBtn, {backgroundColor: colors.sky, borderColor: colors.sky}]} onPress={loadMockMatch}><FontAwesome name="magic" size={14} color={colors.navy} style={{marginBottom:4}} /><Text style={[styles.actionTopTxt, {color: colors.navy}]}>Ejemplo</Text></TouchableOpacity>
        </View>

        <View style={styles.glassCard}>
           {Object.keys(matchData).map((key) => {
             const val = (matchData as any)[key];
             const label = key.charAt(0).toUpperCase() + key.slice(1);
             const isTextArea = key === 'observaciones';
             return (
               <View key={key} style={[styles.fieldInputRow, isTextArea && {flexDirection: 'column', alignItems: 'flex-start'}]}>
                  <Text style={[styles.fieldInputLbl, isTextArea && {marginBottom: 8}]}>{label}</Text>
                  <TextInput 
                     style={[styles.fieldInput, isTextArea && styles.fieldInputArea]} 
                     value={val} 
                     onChangeText={(text) => setMatchData({...matchData, [key]: text})} 
                     placeholder={`Introduce ${key}`}
                     placeholderTextColor="rgba(255,255,255,0.2)"
                     multiline={isTextArea}
                  />
               </View>
             );
           })}
        </View>
        <View style={{height: 100}} />
     </ScrollView>
  );

  const renderStep2 = () => {
     const pGK = selectedPlayers.filter(p => p.pos === 'POR').length;
     const pDEF = selectedPlayers.filter(p => p.pos === 'DEF').length;
     const pMED = selectedPlayers.filter(p => p.pos === 'MED').length;
     const pDEL = selectedPlayers.filter(p => p.pos === 'DEL').length;
     const total = selectedPlayers.length;
     
     const hasInjured = selectedPlayers.some(p => p.status === 'Lesionado');
     const hasBanned = selectedPlayers.some(p => p.status === 'Sancionado');
     const isBalanced = pGK >= 1 && pDEF >= 3 && pMED >= 3 && pDEL >= 1 && total >= 14 && total <= 18 && !hasInjured && !hasBanned;
     
     return (
        <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
           
           <TouchableOpacity style={styles.aiMasterCard} onPress={generateAI}>
              <LinearGradient colors={['rgba(79, 195, 247, 0.2)', 'rgba(79, 195, 247, 0.05)']} style={StyleSheet.absoluteFillObject} />
              <View style={styles.aiMasterIcon}><FontAwesome name="magic" size={24} color={colors.sky} /></View>
              <View style={{flex: 1}}>
                 <Text style={styles.aiMasterTitle}>Sugerir convocatoria con IA</Text>
                 <Text style={styles.aiMasterSub}>Auto-selecciona 16 jugadores equilibrados descartando lesionados y sancionados.</Text>
              </View>
           </TouchableOpacity>

           <View style={styles.smartPanel}>
              <Text style={styles.smartPanelTitle}>🧠 Revisión inteligente</Text>
              {isBalanced ? (
                 <View style={styles.smartAlertRow}><FontAwesome name="check-circle" size={16} color={colors.success} /><Text style={styles.smartAlertTxtSuccess}>Convocatoria lista para publicar</Text></View>
              ) : (
                 <>
                    {total < 14 && <View style={styles.smartAlertRow}><FontAwesome name="warning" size={14} color={colors.warning} /><Text style={styles.smartAlertTxt}>Menos de 14 convocados ({total})</Text></View>}
                    {total > 18 && <View style={styles.smartAlertRow}><FontAwesome name="warning" size={14} color={colors.warning} /><Text style={styles.smartAlertTxt}>Más de 18 convocados ({total})</Text></View>}
                    {pGK === 0 && <View style={styles.smartAlertRow}><FontAwesome name="warning" size={14} color={colors.warning} /><Text style={styles.smartAlertTxt}>Falta incluir portero</Text></View>}
                    {hasInjured && <View style={styles.smartAlertRow}><FontAwesome name="times-circle" size={14} color={colors.danger} /><Text style={styles.smartAlertTxtErr}>Hay lesionados seleccionados</Text></View>}
                    {hasBanned && <View style={styles.smartAlertRow}><FontAwesome name="times-circle" size={14} color={colors.danger} /><Text style={styles.smartAlertTxtErr}>Hay sancionados seleccionados</Text></View>}
                 </>
              )}
           </View>

           <View style={styles.balanceBarBox}>
              <View style={styles.balanceHeader}>
                 <Text style={styles.balanceTitle}>{total} / 22 CONVOCADOS</Text>
              </View>
              <View style={styles.balanceBar}>
                 <View style={[styles.balanceSeg, {flex: pGK || 1, backgroundColor: '#EAB308'}]} />
                 <View style={[styles.balanceSeg, {flex: pDEF || 1, backgroundColor: '#3B82F6'}]} />
                 <View style={[styles.balanceSeg, {flex: pMED || 1, backgroundColor: '#22C55E'}]} />
                 <View style={[styles.balanceSeg, {flex: pDEL || 1, backgroundColor: '#EF4444'}]} />
              </View>
              <View style={styles.balanceLegend}>
                 <Text style={styles.bLegTxt}><Text style={{color: '#EAB308'}}>●</Text> {pGK} POR</Text>
                 <Text style={styles.bLegTxt}><Text style={{color: '#3B82F6'}}>●</Text> {pDEF} DEF</Text>
                 <Text style={styles.bLegTxt}><Text style={{color: '#22C55E'}}>●</Text> {pMED} MED</Text>
                 <Text style={styles.bLegTxt}><Text style={{color: '#EF4444'}}>●</Text> {pDEL} DEL</Text>
              </View>
           </View>

           {['POR', 'DEF', 'MED', 'DEL'].map(pos => {
              const posPlayers = ALL_PLAYERS.filter(p => p.pos === pos);
              return (
                 <View key={pos} style={styles.posGroup}>
                    <Text style={styles.posTitleGroup}>{pos}</Text>
                    {posPlayers.map(p => {
                       const isSelected = selectedIds.includes(p.id);
                       return (
                          <TouchableOpacity key={p.id} style={[styles.playerCardPremium, isSelected && styles.playerCardPremiumSel]} onPress={() => togglePlayer(p.id)}>
                             <View style={styles.pcLeft}>
                                <View style={[styles.pcAvatar, isSelected && {borderColor: colors.sky, borderWidth: 2}]}>
                                   <Text style={styles.pcNum}>{p.dorsal}</Text>
                                </View>
                                <View>
                                   <Text style={[styles.pcName, isSelected && {color: colors.sky}]}>{p.name}</Text>
                                   <View style={styles.pcStatusRow}>
                                      <View style={[styles.pcStatusDot, {backgroundColor: STATUS_COLORS[p.status]}]} />
                                      <Text style={styles.pcStatusTxt}>{p.status}</Text>
                                   </View>
                                </View>
                             </View>
                             <View style={styles.pcRight}>
                                <View style={styles.pcStatBox}>
                                   <Text style={styles.pcStatVal}>{p.index}</Text>
                                   <Text style={styles.pcStatLbl}>Índice</Text>
                                </View>
                                <View style={styles.pcStatBox}>
                                   <Text style={styles.pcStatVal}>{p.mins}'</Text>
                                   <Text style={styles.pcStatLbl}>Mins</Text>
                                </View>
                                <View style={[styles.pcCheck, isSelected && styles.pcCheckSel]}>
                                   {isSelected && <FontAwesome name="check" size={14} color={colors.navy} />}
                                </View>
                             </View>
                          </TouchableOpacity>
                       );
                    })}
                 </View>
              );
           })}
           <View style={{height: 100}} />
        </ScrollView>
     );
  };

  const addSuggestion = (field: keyof typeof info, val: string) => {
     setInfo(prev => ({...prev, [field]: prev[field] ? prev[field] + '\n• ' + val : '• ' + val}));
  };

  const renderStep3 = () => (
     <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.infoBlock}>
           <Text style={styles.infoTitle}>🎯 Objetivo del partido</Text>
           <View style={styles.chipScroll}>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('objetivo', 'Presión alta desde el inicio')}><Text style={styles.chipTxt}>Presión alta</Text></TouchableOpacity>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('objetivo', 'Intensidad defensiva')}><Text style={styles.chipTxt}>Intensidad</Text></TouchableOpacity>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('objetivo', 'Salida rápida al contraataque')}><Text style={styles.chipTxt}>Salida rápida</Text></TouchableOpacity>
           </View>
           <TextInput style={styles.infoArea} multiline value={info.objetivo} onChangeText={t => setInfo({...info, objetivo: t})} placeholder="Escribe aquí..." placeholderTextColor={colors.muted} />
        </View>

        <View style={styles.infoBlock}>
           <Text style={styles.infoTitle}>🎒 Material necesario</Text>
           <View style={styles.chipScroll}>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('material', 'Botas de taco')}><Text style={styles.chipTxt}>Botas taco</Text></TouchableOpacity>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('material', 'Espinilleras')}><Text style={styles.chipTxt}>Espinilleras</Text></TouchableOpacity>
              <TouchableOpacity style={styles.chipBtn} onPress={() => addSuggestion('material', 'Botella de agua personal')}><Text style={styles.chipTxt}>Agua</Text></TouchableOpacity>
           </View>
           <TextInput style={styles.infoArea} multiline value={info.material} onChangeText={t => setInfo({...info, material: t})} placeholder="Escribe aquí..." placeholderTextColor={colors.muted} />
        </View>

        <View style={styles.infoBlock}>
           <Text style={styles.infoTitle}>👦 Mensaje para jugadores</Text>
           <TextInput style={styles.infoArea} multiline value={info.jugadores} onChangeText={t => setInfo({...info, jugadores: t})} placeholder="Escribe aquí..." placeholderTextColor={colors.muted} />
        </View>

        <View style={styles.infoBlock}>
           <Text style={styles.infoTitle}>👨‍👩‍👧 Mensaje para familias</Text>
           <TextInput style={styles.infoArea} multiline value={info.familias} onChangeText={t => setInfo({...info, familias: t})} placeholder="Escribe aquí..." placeholderTextColor={colors.muted} />
        </View>
        <View style={{height: 100}} />
     </ScrollView>
  );

  const renderStep4 = () => (
     <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        <View style={styles.reviewTabs}>
           <View style={styles.reviewTabActive}><Text style={styles.reviewTabTxtActive}>👨‍👩‍👧 Vista Familias</Text></View>
           <View style={styles.reviewTab}><Text style={styles.reviewTabTxt}>👦 Vista Jugador</Text></View>
        </View>
        
        <View style={styles.mockPhone}>
           <View style={styles.mockPhoneHeader}>
              <Text style={styles.mockAppName}>CD Jesuitas App</Text>
              <FontAwesome name="bars" size={16} color={colors.navy} />
           </View>
           <View style={styles.mockCard}>
              <View style={styles.mockCardHeader}>
                 <Text style={styles.mockTitle}>CONVOCATORIA OFICIAL</Text>
                 <View style={styles.mockBadge}><Text style={styles.mockBadgeTxt}>NUEVO</Text></View>
              </View>
              <Text style={styles.mockSubtitle}>🆚 {matchData.rival || 'Rival'}</Text>
              <View style={styles.mockGrid}>
                 <View style={styles.mockItem}><Text style={styles.mockLbl}>Fecha</Text><Text style={styles.mockVal}>{matchData.fecha}</Text></View>
                 <View style={styles.mockItem}><Text style={styles.mockLbl}>Partido</Text><Text style={styles.mockVal}>{matchData.hora}</Text></View>
                 <View style={styles.mockItem}><Text style={styles.mockLbl}>Citación</Text><Text style={styles.mockVal}>{matchData.citacion}</Text></View>
                 <View style={styles.mockItem}><Text style={styles.mockLbl}>Campo</Text><Text style={styles.mockVal}>{matchData.campo}</Text></View>
              </View>
              <Text style={styles.mockLbl}>Equipación</Text>
              <Text style={styles.mockVal}>{matchData.equipacion}</Text>
              <View style={styles.mockBtns}>
                 <View style={styles.mockBtnPrimary}><Text style={styles.mockBtnTxtPrimary}>Confirmar Asistencia</Text></View>
                 <View style={styles.mockBtnSecondary}><Text style={styles.mockBtnTxtSecondary}>No podré</Text></View>
              </View>
           </View>
        </View>
        <View style={{height: 100}} />
     </ScrollView>
  );

  const publishAction = () => {
     setPublishing(true);
     setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setPublishing(false);
        setPublished(true);
        nextStep();
     }, 1500);
  };

  const renderStep5 = () => (
     <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.massiveChecklist}>
           <Text style={styles.massiveCheckTitle}>Lista de Verificación</Text>
           <View style={styles.mCheckRow}><FontAwesome name="check-circle" size={24} color={colors.success} /><Text style={styles.mCheckTxt}>Partido revisado ({matchData.rival})</Text></View>
           <View style={styles.mCheckRow}><FontAwesome name="check-circle" size={24} color={colors.success} /><Text style={styles.mCheckTxt}>{selectedIds.length} Jugadores seleccionados</Text></View>
           <View style={styles.mCheckRow}><FontAwesome name="check-circle" size={24} color={colors.success} /><Text style={styles.mCheckTxt}>Portero incluido en la lista</Text></View>
           <View style={styles.mCheckRow}><FontAwesome name="check-circle" size={24} color={colors.success} /><Text style={styles.mCheckTxt}>Horarios y campo confirmados</Text></View>
           <View style={styles.mCheckRow}><FontAwesome name="check-circle" size={24} color={colors.success} /><Text style={styles.mCheckTxt}>Documentos PDF y mensajes listos</Text></View>
        </View>

        {!published ? (
           <TouchableOpacity style={[styles.massiveBtn, publishing && {opacity: 0.8}]} onPress={publishAction} disabled={publishing}>
              <LinearGradient colors={['#38BDF8', '#0284C7']} style={StyleSheet.absoluteFillObject} />
              {publishing ? (
                 <Text style={styles.massiveBtnTxt}>PUBLICANDO...</Text>
              ) : (
                 <>
                    <FontAwesome name="rocket" size={24} color={colors.navy} style={{marginRight: 12}} />
                    <Text style={styles.massiveBtnTxt}>PUBLICAR CONVOCATORIA</Text>
                 </>
              )}
           </TouchableOpacity>
        ) : (
           <View style={styles.massiveSuccess}>
              <FontAwesome name="check-circle" size={64} color={colors.success} />
              <Text style={styles.massiveSuccessTxt}>¡Convocatoria publicada correctamente!</Text>
           </View>
        )}
        <View style={{height: 100}} />
     </ScrollView>
  );

  const mockWhatsAppMessage = `🔵⚪ CD JESUITAS

📋 CONVOCATORIA OFICIAL
⚽ ${matchData.equipo}
🆚 ${matchData.rival}
🏆 ${matchData.competicion}
📅 ${matchData.fecha}
🕕 Partido: ${matchData.hora}
📍 ${matchData.campo}
🕔 Citación: ${matchData.citacion}
🚪 Vestuario: ${matchData.vestuario}
👕 Equipación: ${matchData.equipacion}

🎒 Material:
${info.material || '• Botas\n• Espinilleras\n• Agua'}

📝 Confirmad asistencia desde la app.

💙🤍 CD Jesuitas`;

  const sendWhatsAppMock = () => {
     setWaSentStatus('sending');
     setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setWaSentStatus('sent');
     }, 1200);
  };

  const renderStep6 = () => (
     <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        
        {/* PDF PREVIEW CARD */}
        <View style={styles.previewCardPremium}>
           <View style={styles.previewCardHeader}><FontAwesome name="file-pdf-o" size={18} color="#DC2626" /><Text style={styles.previewCardTitle}>Vista previa PDF</Text></View>
           <View style={styles.pdfPaperPremium}>
              <View style={styles.pdfHeader}>
                 <FontAwesome name="shield" size={40} color={colors.navy} style={styles.pdfLogo} />
                 <View>
                    <Text style={styles.pdfClub}>CD JESUITAS</Text>
                    <Text style={styles.pdfTitleDoc}>CONVOCATORIA OFICIAL</Text>
                 </View>
              </View>
              <View style={styles.pdfGrid}>
                 <View style={styles.pdfItem}><Text style={styles.pdfLbl}>Partido</Text><Text style={styles.pdfVal}>{matchData.equipo} vs {matchData.rival}</Text></View>
                 <View style={styles.pdfItem}><Text style={styles.pdfLbl}>Competición</Text><Text style={styles.pdfVal}>{matchData.competicion}</Text></View>
                 <View style={styles.pdfItem}><Text style={styles.pdfLbl}>Horario</Text><Text style={styles.pdfVal}>{matchData.fecha} - {matchData.hora}</Text></View>
                 <View style={styles.pdfItem}><Text style={styles.pdfLbl}>Lugar</Text><Text style={styles.pdfVal}>{matchData.campo}</Text></View>
              </View>
              <View style={styles.pdfList}>
                 <Text style={styles.pdfLbl}>Convocados ({selectedPlayers.length})</Text>
                 <Text style={styles.pdfPlayersTxt}>{selectedPlayers.map(p => `${p.dorsal}. ${p.name}`).join(', ')}</Text>
              </View>
           </View>
           <View style={styles.previewBtnGrid}>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Ver PDF</Text></TouchableOpacity>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Generar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Compartir</Text></TouchableOpacity>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Descargar</Text></TouchableOpacity>
           </View>
        </View>

        {/* WHATSAPP PREVIEW CARD */}
        <View style={styles.previewCardPremium}>
           <View style={styles.previewCardHeader}><FontAwesome name="whatsapp" size={20} color="#22C55E" /><Text style={styles.previewCardTitle}>Vista previa WhatsApp</Text></View>
           <View style={styles.waChatBg}>
              <View style={styles.waBubblePremium}>
                 <Text style={styles.waTxtPremium}>{mockWhatsAppMessage}</Text>
                 <Text style={styles.waTime}>12:45</Text>
              </View>
           </View>
           
           {waSentStatus === 'idle' ? (
              <TouchableOpacity style={styles.sendWaMasterBtn} onPress={sendWhatsAppMock}>
                 <FontAwesome name="send" size={16} color={colors.white} style={{marginRight: 8}} />
                 <Text style={styles.sendWaMasterTxt}>Enviar al Grupo de Familias</Text>
              </TouchableOpacity>
           ) : waSentStatus === 'sending' ? (
              <View style={[styles.sendWaMasterBtn, {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
                 <Text style={styles.sendWaMasterTxt}>Enviando...</Text>
              </View>
           ) : (
              <View style={styles.sendWaSuccess}>
                 <FontAwesome name="check-circle" size={24} color={colors.success} />
                 <Text style={styles.sendWaSuccessTxt}>Mensaje enviado al grupo Familias {matchData.equipo}</Text>
              </View>
           )}

           <View style={styles.previewBtnGrid}>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Copiar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.previewBtn}><Text style={styles.previewBtnTxt}>Editar</Text></TouchableOpacity>
           </View>
        </View>

        <View style={{height: 100}} />
     </ScrollView>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.safeArea}>
         {renderGlobalHeader()}
         {renderTimeline()}

         <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
            {step === 6 && renderStep6()}
         </KeyboardAvoidingView>

         {/* FIXED BOTTOM BAR */}
         <View style={styles.fixedBottomBar}>
            <TouchableOpacity style={styles.fbBtnBack} onPress={step > 1 ? prevStep : onClose}>
               <Text style={styles.fbBtnBackTxt}>{step === 1 ? 'CANCELAR' : 'ATRÁS'}</Text>
            </TouchableOpacity>
            
            {step < 5 && (
               <TouchableOpacity style={styles.fbBtnGhost}>
                  <Text style={styles.fbBtnGhostTxt}>GUARDAR BORRADOR</Text>
               </TouchableOpacity>
            )}

            {step < 5 ? (
               <TouchableOpacity style={styles.fbBtnNext} onPress={nextStep}>
                  <Text style={styles.fbBtnNextTxt}>CONTINUAR</Text>
                  <FontAwesome name="angle-right" size={16} color={colors.navy} style={{marginLeft: 8}} />
               </TouchableOpacity>
            ) : step === 5 ? (
               <TouchableOpacity style={[styles.fbBtnNext, {opacity: published ? 1 : 0.5}]} onPress={nextStep} disabled={!published}>
                  <Text style={styles.fbBtnNextTxt}>CONTINUAR</Text>
                  <FontAwesome name="angle-right" size={16} color={colors.navy} style={{marginLeft: 8}} />
               </TouchableOpacity>
            ) : (
               <TouchableOpacity style={styles.fbBtnNext} onPress={onClose}>
                  <Text style={styles.fbBtnNextTxt}>FINALIZAR</Text>
                  <FontAwesome name="check" size={16} color={colors.navy} style={{marginLeft: 8}} />
               </TouchableOpacity>
            )}
         </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#071A3D' },
  
  // MATCH CENTER HEADER
  matchCenterHeader: { paddingHorizontal: spacing.l, paddingBottom: spacing.m, paddingTop: spacing.s, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  mcTopBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  mcCloseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  mcStatusBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  mcStatusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  mcStatusTxt: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  mcComp: { color: colors.sky, fontSize: 12, fontWeight: '900', textAlign: 'center', letterSpacing: 1, marginBottom: 12 },
  mcVersusBox: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  mcTeamCol: { alignItems: 'center', width: '30%' },
  mcShieldLocal: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  mcShieldRival: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  mcTeamName: { color: colors.white, fontSize: 12, fontWeight: '800', textAlign: 'center' },
  mcVsCol: { alignItems: 'center', width: '30%' },
  mcVsTxt: { color: 'rgba(255,255,255,0.3)', fontSize: 24, fontWeight: '900', fontStyle: 'italic', marginBottom: 4 },
  mcVsDate: { color: colors.muted, fontSize: 10, fontWeight: '700' },

  // TIMELINE
  timelineScroll: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', backgroundColor: 'rgba(0,0,0,0.2)', maxHeight: 60 },
  timelineContainer: { paddingHorizontal: spacing.l, paddingVertical: 12, flexDirection: 'row', alignItems: 'center' },
  tlItem: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  tlDot: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  tlDotActive: { borderColor: colors.sky },
  tlDotDone: { backgroundColor: colors.success, borderColor: colors.success },
  tlDotInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'transparent' },
  tlDotInnerActive: { backgroundColor: colors.sky },
  tlTxt: { color: colors.muted, fontSize: 12, fontWeight: '700', marginRight: 12 },
  tlTxtActive: { color: colors.white, fontWeight: '900' },
  tlLine: { width: 24, height: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 12 },
  tlLineDone: { backgroundColor: colors.success },

  stepContent: { flex: 1, padding: spacing.l },

  // STEP 1
  actionsTopGrid: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  actionTopBtn: { flex: 1, paddingVertical: 12, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  actionTopTxt: { color: colors.white, fontSize: 11, fontWeight: '800' },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  fieldInputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  fieldInputLbl: { color: colors.sky, fontSize: 13, fontWeight: '800', width: 110 },
  fieldInput: { flex: 1, color: colors.white, fontSize: 15, fontWeight: '900', textAlign: 'right', paddingVertical: 4 },
  fieldInputArea: { textAlign: 'left', minHeight: 80, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 12, marginTop: 8, width: '100%' },

  // STEP 2
  aiMasterCard: { borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.sky },
  aiMasterIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  aiMasterTitle: { color: colors.sky, fontSize: 16, fontWeight: '900', marginBottom: 4 },
  aiMasterSub: { color: colors.white, fontSize: 12, fontWeight: '600', opacity: 0.8 },
  smartPanel: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  smartPanelTitle: { color: colors.white, fontSize: 14, fontWeight: '900', marginBottom: 12 },
  smartAlertRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  smartAlertTxt: { color: colors.warning, fontSize: 12, fontWeight: '700', marginLeft: 8 },
  smartAlertTxtErr: { color: colors.danger, fontSize: 12, fontWeight: '700', marginLeft: 8 },
  smartAlertTxtSuccess: { color: colors.success, fontSize: 13, fontWeight: '900', marginLeft: 8 },
  balanceBarBox: { marginBottom: 24 },
  balanceHeader: { marginBottom: 8 },
  balanceTitle: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1 },
  balanceBar: { height: 12, borderRadius: 6, flexDirection: 'row', overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 8 },
  balanceSeg: { height: '100%' },
  balanceLegend: { flexDirection: 'row', justifyContent: 'space-between' },
  bLegTxt: { color: colors.white, fontSize: 10, fontWeight: '800' },
  posTitleGroup: { color: colors.sky, fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 12, marginTop: 12 },
  playerCardPremium: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  playerCardPremiumSel: { backgroundColor: 'rgba(79, 195, 247, 0.1)', borderColor: colors.sky },
  pcLeft: { flexDirection: 'row', alignItems: 'center' },
  pcAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  pcNum: { color: colors.white, fontSize: 14, fontWeight: '900' },
  pcName: { color: colors.white, fontSize: 14, fontWeight: '900', marginBottom: 4 },
  pcStatusRow: { flexDirection: 'row', alignItems: 'center' },
  pcStatusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  pcStatusTxt: { color: colors.muted, fontSize: 10, fontWeight: '700' },
  pcRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pcStatBox: { alignItems: 'center' },
  pcStatVal: { color: colors.white, fontSize: 14, fontWeight: '900' },
  pcStatLbl: { color: colors.muted, fontSize: 9, fontWeight: '700', textTransform: 'uppercase' },
  pcCheck: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  pcCheckSel: { backgroundColor: colors.sky, borderColor: colors.sky },

  // STEP 3
  infoBlock: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  infoTitle: { color: colors.white, fontSize: 15, fontWeight: '900', marginBottom: 12 },
  chipScroll: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chipBtn: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  chipTxt: { color: colors.sky, fontSize: 11, fontWeight: '800' },
  infoArea: { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12, color: colors.white, fontSize: 14, padding: 12, minHeight: 80, textAlignVertical: 'top' },

  // STEP 4
  reviewTabs: { flexDirection: 'row', marginBottom: 24, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 6 },
  reviewTabActive: { flex: 1, backgroundColor: colors.sky, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  reviewTab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  reviewTabTxtActive: { color: colors.navy, fontSize: 13, fontWeight: '900' },
  reviewTabTxt: { color: colors.white, fontSize: 13, fontWeight: '700' },
  mockPhone: { backgroundColor: '#F3F4F6', borderRadius: 40, padding: 20, minHeight: 500, borderWidth: 8, borderColor: '#1F2937' },
  mockPhoneHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 12 },
  mockAppName: { color: colors.navy, fontSize: 16, fontWeight: '900' },
  mockCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.1, shadowRadius: 16, elevation: 8 },
  mockCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  mockTitle: { color: colors.navy, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  mockBadge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  mockBadgeTxt: { color: colors.white, fontSize: 9, fontWeight: '900' },
  mockSubtitle: { color: colors.navy, fontSize: 24, fontWeight: '900', marginBottom: 24 },
  mockGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 20 },
  mockItem: { width: '45%' },
  mockLbl: { color: '#6B7280', fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  mockVal: { color: '#111827', fontSize: 15, fontWeight: '900' },
  mockBtns: { flexDirection: 'row', gap: 12, marginTop: 24 },
  mockBtnPrimary: { flex: 1, backgroundColor: colors.navy, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  mockBtnTxtPrimary: { color: colors.white, fontSize: 11, fontWeight: '900' },
  mockBtnSecondary: { flex: 1, backgroundColor: '#F3F4F6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  mockBtnTxtSecondary: { color: '#4B5563', fontSize: 11, fontWeight: '900' },

  // STEP 5
  massiveChecklist: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 24, marginBottom: 32 },
  massiveCheckTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: 24 },
  mCheckRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mCheckTxt: { color: colors.white, fontSize: 15, fontWeight: '800', marginLeft: 16 },
  massiveBtn: { borderRadius: 24, paddingVertical: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  massiveBtnTxt: { color: colors.navy, fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  massiveSuccess: { alignItems: 'center', marginVertical: 40 },
  massiveSuccessTxt: { color: colors.success, fontSize: 20, fontWeight: '900', marginTop: 16, textAlign: 'center' },

  // STEP 6
  previewCardPremium: { backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: 20, marginBottom: 24 },
  previewCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  previewCardTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginLeft: 12 },
  pdfPaperPremium: { backgroundColor: '#FFF', borderRadius: 8, padding: 24, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 },
  pdfHeader: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: colors.navy, paddingBottom: 16, marginBottom: 20 },
  pdfLogo: { marginRight: 16 },
  pdfClub: { color: colors.navy, fontSize: 12, fontWeight: '800' },
  pdfTitleDoc: { color: colors.navy, fontSize: 18, fontWeight: '900' },
  pdfGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 20 },
  pdfItem: { width: '45%' },
  pdfLbl: { color: '#6B7280', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  pdfVal: { color: colors.navy, fontSize: 13, fontWeight: '900' },
  pdfList: { marginTop: 8 },
  pdfPlayersTxt: { color: '#1F2937', fontSize: 11, lineHeight: 20, marginTop: 8 },
  
  waChatBg: { backgroundColor: '#E5DDD5', borderRadius: 16, padding: 16, marginBottom: 20 },
  waBubblePremium: { backgroundColor: '#DCF8C6', padding: 16, borderRadius: 16, borderTopLeftRadius: 0, alignSelf: 'flex-start' },
  waTxtPremium: { color: '#111827', fontSize: 13, lineHeight: 20, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace' },
  waTime: { alignSelf: 'flex-end', color: '#6B7280', fontSize: 10, marginTop: 4 },
  
  sendWaMasterBtn: { backgroundColor: '#25D366', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, marginBottom: 20 },
  sendWaMasterTxt: { color: colors.white, fontSize: 14, fontWeight: '900' },
  sendWaSuccess: { backgroundColor: 'rgba(34,197,94,0.1)', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  sendWaSuccessTxt: { color: colors.success, fontSize: 13, fontWeight: '900', marginLeft: 12, flex: 1 },

  previewBtnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  previewBtn: { flex: 1, minWidth: '48%', backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  previewBtnTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },

  // FIXED BOTTOM BAR
  fixedBottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(7, 26, 61, 0.95)', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.l, paddingVertical: spacing.m },
  fbBtnBack: { paddingVertical: 12, paddingHorizontal: 16 },
  fbBtnBackTxt: { color: colors.muted, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  fbBtnGhost: { paddingVertical: 12, paddingHorizontal: 16 },
  fbBtnGhostTxt: { color: colors.sky, fontSize: 12, fontWeight: '900', letterSpacing: 1 },
  fbBtnNext: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.sky, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16 },
  fbBtnNextTxt: { color: colors.navy, fontSize: 13, fontWeight: '900', letterSpacing: 1 }
});
