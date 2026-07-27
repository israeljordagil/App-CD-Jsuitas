import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, LayoutAnimation, UIManager, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width, height } = Dimensions.get('window');

// --- TIPOS Y DATOS MOCK ---
type PlayerStatus = 'Disponible' | 'Duda' | 'Lesionado' | 'Sancionado';

interface Player {
  id: number;
  dorsal: number;
  name: string;
  pos: string;
  status: PlayerStatus;
}

const ALL_PLAYERS: Player[] = [
  { id: 1, dorsal: 1, name: 'Alejandro', pos: 'POR', status: 'Disponible' },
  { id: 2, dorsal: 13, name: 'Martín', pos: 'POR', status: 'Disponible' },
  { id: 3, dorsal: 2, name: 'Mateo', pos: 'LD', status: 'Disponible' },
  { id: 4, dorsal: 3, name: 'Lucas', pos: 'LI', status: 'Disponible' },
  { id: 5, dorsal: 4, name: 'Leo', pos: 'DFC', status: 'Disponible' },
  { id: 6, dorsal: 5, name: 'Daniel', pos: 'DFC', status: 'Disponible' },
  { id: 7, dorsal: 12, name: 'Pablo', pos: 'LD', status: 'Duda' },
  { id: 8, dorsal: 14, name: 'Álvaro', pos: 'DFC', status: 'Lesionado' },
  { id: 9, dorsal: 15, name: 'Enzo', pos: 'LI', status: 'Disponible' },
  { id: 10, dorsal: 6, name: 'Adrián', pos: 'MCD', status: 'Disponible' },
  { id: 11, dorsal: 8, name: 'David', pos: 'MC', status: 'Disponible' },
  { id: 12, dorsal: 10, name: 'Álex', pos: 'MCO', status: 'Disponible' },
  { id: 13, dorsal: 16, name: 'Diego', pos: 'MC', status: 'Disponible' },
  { id: 14, dorsal: 17, name: 'Thiago', pos: 'MCD', status: 'Sancionado' },
  { id: 15, dorsal: 18, name: 'Izan', pos: 'MCO', status: 'Disponible' },
  { id: 16, dorsal: 20, name: 'Mario', pos: 'MC', status: 'Disponible' },
  { id: 17, dorsal: 7, name: 'Javier', pos: 'ED', status: 'Disponible' },
  { id: 18, dorsal: 11, name: 'Hugo', pos: 'EI', status: 'Disponible' },
  { id: 19, dorsal: 9, name: 'Marco', pos: 'DC', status: 'Disponible' },
  { id: 20, dorsal: 19, name: 'Darío', pos: 'DC', status: 'Disponible' },
  { id: 21, dorsal: 21, name: 'Eric', pos: 'ED', status: 'Disponible' },
  { id: 22, dorsal: 22, name: 'Joel', pos: 'EI', status: 'Disponible' }
];

const STATUS_COLORS: Record<PlayerStatus, string> = {
  'Disponible': '#22C55E',
  'Duda': '#EAB308',
  'Lesionado': '#EF4444',
  'Sancionado': '#1F2937'
};

const FORMATIONS = ['1-4-4-2', '1-4-3-3', '1-4-2-3-1', '1-4-1-4-1', '1-3-5-2', '1-3-4-3'];

const FORMATION_COORDS: Record<string, {top: number, left: number, role: string}[]> = {
  '1-4-2-3-1': [
    { top: 88, left: 50, role: 'POR' },
    { top: 72, left: 15, role: 'LI' }, { top: 75, left: 38, role: 'DFC' }, { top: 75, left: 62, role: 'DFC' }, { top: 72, left: 85, role: 'LD' },
    { top: 55, left: 35, role: 'MCD' }, { top: 55, left: 65, role: 'MCD' },
    { top: 35, left: 20, role: 'EI' }, { top: 38, left: 50, role: 'MCO' }, { top: 35, left: 80, role: 'ED' },
    { top: 15, left: 50, role: 'DC' }
  ],
  '1-4-4-2': [
    { top: 88, left: 50, role: 'POR' },
    { top: 72, left: 15, role: 'LI' }, { top: 75, left: 38, role: 'DFC' }, { top: 75, left: 62, role: 'DFC' }, { top: 72, left: 85, role: 'LD' },
    { top: 48, left: 20, role: 'MI' }, { top: 50, left: 40, role: 'MC' }, { top: 50, left: 60, role: 'MC' }, { top: 48, left: 80, role: 'MD' },
    { top: 20, left: 40, role: 'DC' }, { top: 20, left: 60, role: 'DC' }
  ],
  '1-4-3-3': [
    { top: 88, left: 50, role: 'POR' },
    { top: 72, left: 15, role: 'LI' }, { top: 75, left: 38, role: 'DFC' }, { top: 75, left: 62, role: 'DFC' }, { top: 72, left: 85, role: 'LD' },
    { top: 55, left: 30, role: 'MC' }, { top: 45, left: 50, role: 'MCD' }, { top: 55, left: 70, role: 'MC' },
    { top: 25, left: 20, role: 'EI' }, { top: 15, left: 50, role: 'DC' }, { top: 25, left: 80, role: 'ED' }
  ],
  '1-4-1-4-1': [
    { top: 88, left: 50, role: 'POR' },
    { top: 72, left: 15, role: 'LI' }, { top: 75, left: 38, role: 'DFC' }, { top: 75, left: 62, role: 'DFC' }, { top: 72, left: 85, role: 'LD' },
    { top: 60, left: 50, role: 'MCD' },
    { top: 40, left: 20, role: 'MI' }, { top: 42, left: 40, role: 'MC' }, { top: 42, left: 60, role: 'MC' }, { top: 40, left: 80, role: 'MD' },
    { top: 15, left: 50, role: 'DC' }
  ],
  '1-3-5-2': [
    { top: 88, left: 50, role: 'POR' },
    { top: 75, left: 30, role: 'DFC' }, { top: 75, left: 50, role: 'DFC' }, { top: 75, left: 70, role: 'DFC' },
    { top: 50, left: 15, role: 'CRI' }, { top: 55, left: 35, role: 'MC' }, { top: 45, left: 50, role: 'MCO' }, { top: 55, left: 65, role: 'MC' }, { top: 50, left: 85, role: 'CRD' },
    { top: 20, left: 40, role: 'DC' }, { top: 20, left: 60, role: 'DC' }
  ],
  '1-3-4-3': [
    { top: 88, left: 50, role: 'POR' },
    { top: 75, left: 30, role: 'DFC' }, { top: 75, left: 50, role: 'DFC' }, { top: 75, left: 70, role: 'DFC' },
    { top: 50, left: 20, role: 'MI' }, { top: 52, left: 40, role: 'MC' }, { top: 52, left: 60, role: 'MC' }, { top: 50, left: 80, role: 'MD' },
    { top: 20, left: 25, role: 'EI' }, { top: 15, left: 50, role: 'DC' }, { top: 20, left: 75, role: 'ED' }
  ]
};

// INITIAL 11 for 4-2-3-1
const INITIAL_XI_IDS = [1, 4, 6, 5, 3, 10, 11, 18, 12, 17, 19];

type SelectedEntity = { source: 'pitch' | 'bench', index: number | null, player: Player } | null;

export default function TacticaEntrenadorScreen() {
  const router = useRouter();
  const [formation, setFormation] = useState('1-4-2-3-1');
  const [pitchPlayers, setPitchPlayers] = useState<(Player | null)[]>(
    Array.from({length: 11}).map((_, i) => ALL_PLAYERS.find(p => p.id === INITIAL_XI_IDS[i]) || null)
  );

  const [selectedEntity, setSelectedEntity] = useState<SelectedEntity>(null);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // --- BANQUILLO Y VALIDACIONES ---
  const benchPlayers = useMemo(() => {
    const pitchIds = pitchPlayers.filter(p => p !== null).map(p => p!.id);
    return ALL_PLAYERS.filter(p => !pitchIds.includes(p.id));
  }, [pitchPlayers]);

  const validations = useMemo(() => {
    const alerts = [];
    const active = pitchPlayers.filter(p => p !== null) as Player[];
    if (active.length < 11) alerts.push(`⚠️ Faltan ${11 - active.length} titulares.`);
    if (active.length > 11) alerts.push('⚠️ Tienes más de 11 titulares.');
    if (!active.some(p => p.pos === 'POR' || p.dorsal === 1 || p.dorsal === 13)) alerts.push('⚠️ Falta portero en el once.');
    if (active.some(p => p.status === 'Lesionado' || p.status === 'Sancionado')) alerts.push('🔴 Jugador lesionado o sancionado en el campo.');
    return alerts;
  }, [pitchPlayers]);

  // --- LÓGICA DE SELECCIÓN POR TOQUE ---
  const handlePitchSlotTap = (index: number) => {
    const playerInSlot = pitchPlayers[index];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (playerInSlot === null) {
      // Slot vacío
      if (selectedEntity) {
        // Mover jugador seleccionado aquí
        setPitchPlayers(prev => {
          const newPitch = [...prev];
          if (selectedEntity.source === 'pitch' && selectedEntity.index !== null) {
            newPitch[selectedEntity.index] = null;
          }
          newPitch[index] = selectedEntity.player;
          return newPitch;
        });
        setSelectedEntity(null);
      } else {
        // Abrir selector
        setSelectedSlotIndex(index);
        setModalVisible(true);
      }
    } else {
      // Slot ocupado
      if (selectedEntity === null) {
        // Seleccionar este jugador
        setSelectedEntity({ source: 'pitch', index, player: playerInSlot });
      } else {
        if (selectedEntity.player.id === playerInSlot.id) {
          // Doble toque en el mismo jugador -> Banquillo (Sale del campo)
          setPitchPlayers(prev => {
            const newPitch = [...prev];
            newPitch[index] = null;
            return newPitch;
          });
          setSelectedEntity(null);
        } else {
          // Intercambiar jugador seleccionado con el de este slot
          setPitchPlayers(prev => {
            const newPitch = [...prev];
            if (selectedEntity.source === 'pitch' && selectedEntity.index !== null) {
              newPitch[selectedEntity.index] = playerInSlot;
            }
            newPitch[index] = selectedEntity.player;
            return newPitch;
          });
          setSelectedEntity(null);
        }
      }
    }
  };

  const handleBenchPlayerTap = (player: Player) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    if (selectedEntity?.player.id === player.id) {
       setSelectedEntity(null); // Deseleccionar
    } else {
       setSelectedEntity({ source: 'bench', index: null, player });
    }
  };

  // --- ACTIONS ---
  const autoAlign = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const newPitch = Array(11).fill(null);
    let usedIds = new Set();
    
    const gk = ALL_PLAYERS.find(p => p.pos === 'POR' && p.status === 'Disponible');
    if (gk) { newPitch[0] = gk; usedIds.add(gk.id); }

    let i = 1;
    for (const p of ALL_PLAYERS) {
       if (i > 10) break;
       if (!usedIds.has(p.id) && p.status === 'Disponible' && p.pos !== 'POR') {
          newPitch[i] = p;
          usedIds.add(p.id);
          i++;
       }
    }
    setPitchPlayers(newPitch);
    setSelectedEntity(null);
  };

  const clearPitch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPitchPlayers(Array(11).fill(null));
    setSelectedEntity(null);
  };

  const selectPlayerFromModal = (player: Player) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedSlotIndex !== null) {
      setPitchPlayers(prev => {
        const newPitch = [...prev];
        const existingIdx = newPitch.findIndex(p => p?.id === player.id);
        if (existingIdx !== -1) newPitch[existingIdx] = null;
        newPitch[selectedSlotIndex] = player;
        return newPitch;
      });
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* NAVEGACIÓN */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>PIZARRA TÁCTICA</Text>
          <View style={{ width: 40 }} />
        </View>

        {validations.map((v, i) => (
           <View key={i} style={[styles.alertBanner, v.includes('🔴') && styles.alertDanger]}>
              <Text style={[styles.alertTxt, v.includes('🔴') && styles.alertTxtDanger]}>{v}</Text>
           </View>
        ))}

        {/* INSTRUCCIONES DE TOQUE Y SELECCIÓN ACTIVA */}
        <View style={styles.selectionPanel}>
           {selectedEntity ? (
              <View style={styles.selectedActiveBox}>
                 <Text style={styles.selectedTxt}>Jugador seleccionado: <Text style={{color: colors.sky}}>{selectedEntity.player.name} #{selectedEntity.player.dorsal}</Text></Text>
                 <TouchableOpacity onPress={() => setSelectedEntity(null)} style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnTxt}>Cancelar</Text>
                 </TouchableOpacity>
              </View>
           ) : (
              <Text style={styles.instructionTxt}>👆 Toca un jugador para seleccionarlo (o sacarlo del campo si tocas dos veces). Toca una posición vacía para añadir.</Text>
           )}
        </View>

        {/* CARRUSEL DE SISTEMAS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.systemsScroll} contentContainerStyle={{ gap: 8 }}>
           {FORMATIONS.map((f) => (
              <TouchableOpacity key={f} style={[styles.systemPill, formation === f && styles.systemPillActive]} onPress={() => { LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); setFormation(f); }}>
                 <Text style={[styles.systemPillTxt, formation === f && styles.systemPillTxtActive]}>{f}</Text>
              </TouchableOpacity>
           ))}
        </ScrollView>

        {/* CAMPO DE FÚTBOL INTERACTIVO */}
        <View style={styles.pitchContainer}>
           <LinearGradient colors={['#1a532b', '#113b1d']} style={styles.pitchGrass}>
              <View style={styles.pitchBorder} />
              <View style={styles.pitchMidline} />
              <View style={styles.pitchCenterCircle} />
              <View style={styles.pitchCenterDot} />
              <View style={styles.pitchTopPenalty} />
              <View style={styles.pitchBottomPenalty} />

              {FORMATION_COORDS[formation].map((c, idx) => {
                 const player = pitchPlayers[idx];
                 const isSelected = selectedEntity?.player?.id === player?.id;
                 
                 return (
                   <TouchableOpacity 
                     key={idx} 
                     activeOpacity={0.8}
                     onPress={() => handlePitchSlotTap(idx)}
                     style={[styles.spotContainer, { top: `${c.top}%`, left: `${c.left}%` }]}
                   >
                      {player ? (
                         <View style={[styles.playerMarker, isSelected && styles.playerMarkerSelected]}>
                            <View style={[styles.playerJersey, { borderColor: STATUS_COLORS[player.status] }, isSelected && { borderColor: '#00F0FF', shadowColor: '#00F0FF', shadowOpacity: 1, shadowRadius: 10 }]}>
                               <Text style={styles.playerNumber}>{player.dorsal}</Text>
                            </View>
                            <View style={[styles.playerNameTag, isSelected && { backgroundColor: '#00F0FF' }]}>
                               <Text style={[styles.playerNameTxt, isSelected && { color: colors.navy }]} numberOfLines={1}>{player.name}</Text>
                            </View>
                         </View>
                      ) : (
                         <View style={[styles.emptySpot, selectedEntity && styles.emptySpotHighlight]}>
                            <FontAwesome name="plus" size={14} color={selectedEntity ? colors.sky : "rgba(255,255,255,0.8)"} />
                            <Text style={[styles.emptySpotTxt, selectedEntity && { color: colors.sky }]}>{c.role}</Text>
                         </View>
                      )}
                   </TouchableOpacity>
                 );
              })}
           </LinearGradient>
        </View>

        {/* ACCIONES */}
        <View style={styles.actionsGrid}>
           <TouchableOpacity style={styles.actionBtn} onPress={autoAlign}><Text style={styles.actionTxt}>Autoalinear</Text></TouchableOpacity>
           <TouchableOpacity style={styles.actionBtn} onPress={clearPitch}><Text style={styles.actionTxt}>Limpiar</Text></TouchableOpacity>
           <TouchableOpacity style={[styles.actionBtn, {backgroundColor: colors.sky}]}><Text style={[styles.actionTxt, {color: colors.navy}]}>Guardar</Text></TouchableOpacity>
        </View>

        {/* BANQUILLO */}
        <Text style={styles.sectionTitle}>Plantilla Disponible</Text>
        <View style={styles.benchGrid}>
           {benchPlayers.map(p => {
              const isSelected = selectedEntity?.player?.id === p.id;
              return (
                 <TouchableOpacity 
                    key={p.id} 
                    activeOpacity={0.7}
                    onPress={() => handleBenchPlayerTap(p)}
                    style={[styles.benchWrapper, isSelected && styles.benchWrapperSelected]}
                 >
                    <View style={[styles.benchJersey, { borderColor: STATUS_COLORS[p.status] }, isSelected && { borderColor: '#00F0FF', backgroundColor: 'rgba(0,240,255,0.2)' }]}>
                       <Text style={styles.benchNumber}>{p.dorsal}</Text>
                    </View>
                    <Text style={[styles.benchName, isSelected && { color: colors.white, fontWeight: '900' }]} numberOfLines={1}>{p.name}</Text>
                 </TouchableOpacity>
              );
           })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* MODAL PARA SELECCIONAR DESDE UN HUECO VACÍO */}
      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Añadir Jugador</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
                     <FontAwesome name="times" size={20} color={colors.white} />
                  </TouchableOpacity>
               </View>
               <ScrollView style={{maxHeight: height * 0.6}} showsVerticalScrollIndicator={false}>
                  {benchPlayers.map(p => (
                     <TouchableOpacity key={p.id} style={styles.modalRow} onPress={() => selectPlayerFromModal(p)}>
                        <View style={[styles.statusDot, {backgroundColor: STATUS_COLORS[p.status]}]} />
                        <Text style={styles.modalRowDorsal}>{p.dorsal}</Text>
                        <Text style={styles.modalRowName}>{p.name}</Text>
                        <Text style={styles.modalRowPos}>{p.pos}</Text>
                     </TouchableOpacity>
                  ))}
               </ScrollView>
            </View>
         </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.m, paddingBottom: spacing.xxl, paddingTop: spacing.m },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  alertBanner: { backgroundColor: 'rgba(234, 179, 8, 0.15)', padding: 12, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(234, 179, 8, 0.3)' },
  alertTxt: { color: '#EAB308', fontSize: 13, fontWeight: '800' },
  alertDanger: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)' },
  alertTxtDanger: { color: '#EF4444' },

  selectionPanel: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  instructionTxt: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '600', textAlign: 'center', lineHeight: 20 },
  selectedActiveBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectedTxt: { color: colors.white, fontSize: 14, fontWeight: '900', flex: 1 },
  cancelBtn: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  cancelBtnTxt: { color: colors.white, fontSize: 12, fontWeight: '800' },

  systemsScroll: { marginBottom: 16 },
  systemPill: { backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: colors.sky, marginRight: 8 },
  systemPillActive: { backgroundColor: colors.sky, borderColor: colors.navy },
  systemPillTxt: { color: colors.navy, fontSize: 14, fontWeight: '800' },
  systemPillTxtActive: { color: colors.white, fontWeight: '900' },

  pitchContainer: { width: '100%', height: 500, borderRadius: 24, overflow: 'hidden', marginBottom: spacing.m, borderWidth: 2, borderColor: '#333' },
  pitchGrass: { flex: 1, position: 'relative', padding: 10 },
  
  pitchBorder: { position: 'absolute', top: 10, bottom: 10, left: 10, right: 10, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)' },
  pitchMidline: { position: 'absolute', top: '50%', left: 10, right: 10, height: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginTop: -1 },
  pitchCenterCircle: { position: 'absolute', top: '50%', left: '50%', width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', marginLeft: -40, marginTop: -40 },
  pitchCenterDot: { position: 'absolute', top: '50%', left: '50%', width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.6)', marginLeft: -3, marginTop: -3 },
  pitchTopPenalty: { position: 'absolute', top: 10, left: '25%', right: '25%', height: 70, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', borderTopWidth: 0 },
  pitchBottomPenalty: { position: 'absolute', bottom: 10, left: '25%', right: '25%', height: 70, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', borderBottomWidth: 0 },

  spotContainer: { position: 'absolute', width: 50, height: 70, marginLeft: -25, marginTop: -35, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  emptySpot: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.4)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  emptySpotHighlight: { borderColor: '#00F0FF', backgroundColor: 'rgba(0, 240, 255, 0.1)' },
  emptySpotTxt: { color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: '900', marginTop: 2 },

  playerMarker: { width: 50, height: 70, alignItems: 'center' },
  playerMarkerSelected: { transform: [{scale: 1.15}], zIndex: 99 },
  playerJersey: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.sky, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5, borderWidth: 2 },
  playerNumber: { color: colors.navy, fontSize: 16, fontWeight: '900' },
  playerNameTag: { backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4, marginTop: 4, minWidth: 48, alignItems: 'center' },
  playerNameTxt: { color: colors.white, fontSize: 10, fontWeight: '800' },

  actionsGrid: { flexDirection: 'row', gap: 8, marginBottom: spacing.l },
  actionBtn: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center' },
  actionTxt: { color: colors.white, fontSize: 13, fontWeight: '900' },

  sectionTitle: { color: colors.white, fontSize: 14, fontWeight: '900', textTransform: 'uppercase', marginBottom: 16 },
  
  benchGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' },
  benchWrapper: { width: 50, height: 75, alignItems: 'center', marginBottom: 8 },
  benchWrapperSelected: { transform: [{scale: 1.1}] },
  benchJersey: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginBottom: 6, borderWidth: 2 },
  benchNumber: { color: colors.white, fontSize: 14, fontWeight: '900' },
  benchName: { color: colors.muted, fontSize: 11, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#071A3D', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: 24, paddingBottom: 40 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { color: colors.white, fontSize: 20, fontWeight: '900' },
  modalClose: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  
  modalRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  modalRowDorsal: { color: colors.sky, fontSize: 16, fontWeight: '900', width: 28 },
  modalRowName: { flex: 1, color: colors.white, fontSize: 16, fontWeight: '700' },
  modalRowPos: { color: colors.muted, fontSize: 14, fontWeight: '900' }
});
