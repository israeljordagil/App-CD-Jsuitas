import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { PLAYERS } from '../../src/data/clubData';

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  danger: '#ef4444',
  field: '#2E7D32',
  fieldLines: 'rgba(255,255,255,0.4)'
};

// Slots para 1-4-3-3 (X, Y in percentages)
const SYSTEM_433 = [
  { id: 'gk', label: 'POR', x: 50, y: 85 },
  { id: 'ld', label: 'LD', x: 85, y: 65 },
  { id: 'cd1', label: 'DFC', x: 65, y: 70 },
  { id: 'cd2', label: 'DFC', x: 35, y: 70 },
  { id: 'li', label: 'LI', x: 15, y: 65 },
  { id: 'mcd', label: 'MCD', x: 50, y: 55 },
  { id: 'mc1', label: 'MC', x: 70, y: 45 },
  { id: 'mc2', label: 'MC', x: 30, y: 45 },
  { id: 'ed', label: 'ED', x: 80, y: 25 },
  { id: 'ei', label: 'EI', x: 20, y: 25 },
  { id: 'dc', label: 'DC', x: 50, y: 15 },
];

export default function TacticaScreen() {
  const { activeTeamId, user } = useAuth();
  
  const targetTeamName = activeTeamId === 't-infantil-a' ? 'Infantil A' : '';
  
  const teamPlayers = useMemo(() => {
    if (!targetTeamName) return [];
    return PLAYERS.filter(p => p.equipo === targetTeamName).sort((a,b) => parseInt(a.dorsal || '999') - parseInt(b.dorsal || '999'));
  }, [targetTeamName]);

  // Initial lineup setup. Default GK is Lucas Martínez #25
  const defaultLineup: Record<string, any> = {};
  if (targetTeamName === 'Infantil A') {
    const lucas = teamPlayers.find(p => p.dorsal === '25');
    if (lucas) defaultLineup['gk'] = lucas;
  }

  const [lineup, setLineup] = useState<Record<string, any>>(defaultLineup);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const openSelector = (slotId: string) => {
    setActiveSlot(slotId);
    setModalVisible(true);
  };

  const selectPlayer = (player: any) => {
    if (activeSlot) {
      setLineup(prev => {
        // Remove player if they were in another slot
        const newL = { ...prev };
        Object.keys(newL).forEach(k => {
          if (newL[k]?.id === player.id) delete newL[k];
        });
        newL[activeSlot] = player;
        return newL;
      });
    }
    setModalVisible(false);
    setActiveSlot(null);
  };

  const removeFromSlot = (slotId: string) => {
    setLineup(prev => {
      const newL = { ...prev };
      delete newL[slotId];
      return newL;
    });
  };

  const selectedPlayerIds = Object.values(lineup).map(p => p.id);
  const benchPlayers = teamPlayers.filter(p => !selectedPlayerIds.includes(p.id));

  if (!targetTeamName) {
    return (
      <View style={styles.container}>
         <Text style={{textAlign: 'center', marginTop: 40}}>Selecciona un equipo primero.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Táctica • {targetTeamName}</Text>
         <Text style={styles.headerSub}>Sistema Activo: 1-4-3-3</Text>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
         {/* PIZARRA */}
         <View style={styles.fieldContainer}>
            <View style={styles.field}>
               <View style={styles.fieldLineCenter} />
               <View style={styles.fieldCenterCircle} />
               <View style={styles.fieldAreaBottom} />
               <View style={styles.fieldAreaTop} />

               {SYSTEM_433.map(slot => {
                 const player = lineup[slot.id];
                 return (
                   <View key={slot.id} style={[styles.playerSlot, { left: `${slot.x}%`, top: `${slot.y}%` }]}>
                      {player ? (
                         <TouchableOpacity style={styles.playerAssigned} onPress={() => openSelector(slot.id)}>
                            <View style={styles.dorsalCircle}><Text style={styles.dorsalText}>{player.dorsal}</Text></View>
                            <Text style={styles.playerName} numberOfLines={1}>{player.nombreCompleto.split(' ')[0]}</Text>
                            <TouchableOpacity style={styles.removeBtn} onPress={() => removeFromSlot(slot.id)}>
                               <Ionicons name="close-circle" size={16} color={clubColors.danger} />
                            </TouchableOpacity>
                         </TouchableOpacity>
                      ) : (
                         <TouchableOpacity style={styles.playerEmpty} onPress={() => openSelector(slot.id)}>
                            <FontAwesome name="plus" size={12} color={clubColors.white} />
                            <Text style={styles.emptyText}>{slot.label}</Text>
                         </TouchableOpacity>
                      )}
                   </View>
                 )
               })}
            </View>
         </View>

         {/* BANQUILLO */}
         <View style={styles.benchSection}>
            <Text style={styles.benchTitle}>Banquillo ({benchPlayers.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap: 12}}>
               {benchPlayers.map(p => (
                 <View key={p.id} style={styles.benchCard}>
                    <Text style={styles.benchDorsal}>{p.dorsal}</Text>
                    <View>
                       <Text style={styles.benchName} numberOfLines={1}>{p.nombreCompleto}</Text>
                       <Text style={styles.benchPos}>{p.posicion}</Text>
                    </View>
                 </View>
               ))}
            </ScrollView>
         </View>
      </ScrollView>

      {/* MODAL SELECTOR JUGADOR */}
      <Modal visible={modalVisible} transparent animationType="slide">
         <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
               <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Seleccionar Jugador</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                     <Ionicons name="close" size={24} color={clubColors.navy} />
                  </TouchableOpacity>
               </View>
               
               <FlatList 
                  data={teamPlayers}
                  keyExtractor={p => p.id}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item: p}) => {
                     const isSelected = selectedPlayerIds.includes(p.id);
                     return (
                        <TouchableOpacity 
                           style={[styles.modalPlayerRow, isSelected && styles.modalPlayerRowDisabled]} 
                           onPress={() => !isSelected && selectPlayer(p)}
                           disabled={isSelected}
                        >
                           <View style={styles.dorsalModalBox}>
                              <Text style={styles.dorsalModalText}>{p.dorsal}</Text>
                           </View>
                           <View style={{flex: 1}}>
                              <Text style={styles.modalPlayerName}>{p.nombreCompleto}</Text>
                              <Text style={styles.modalPlayerPos}>{p.posicion}</Text>
                           </View>
                           {isSelected && <Text style={styles.modalSelectedText}>En once</Text>}
                        </TouchableOpacity>
                     )
                  }}
               />
            </View>
         </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: clubColors.navy },
  header: { padding: 20, paddingTop: 40, backgroundColor: clubColors.white, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: clubColors.navy },
  headerSub: { fontSize: 14, color: clubColors.textMuted, marginTop: 4, fontWeight: '600' },
  
  fieldContainer: { padding: 16, alignItems: 'center', marginTop: 12 },
  field: { 
     width: '100%', aspectRatio: 0.65, backgroundColor: clubColors.field, 
     borderRadius: 8, borderWidth: 2, borderColor: clubColors.fieldLines,
     position: 'relative', overflow: 'hidden'
  },
  fieldLineCenter: { position: 'absolute', top: '50%', left: 0, right: 0, height: 2, backgroundColor: clubColors.fieldLines },
  fieldCenterCircle: { position: 'absolute', top: '50%', left: '50%', width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: clubColors.fieldLines, transform: [{translateX: -40}, {translateY: -40}] },
  fieldAreaBottom: { position: 'absolute', bottom: 0, left: '25%', right: '25%', height: '15%', borderWidth: 2, borderBottomWidth: 0, borderColor: clubColors.fieldLines },
  fieldAreaTop: { position: 'absolute', top: 0, left: '25%', right: '25%', height: '15%', borderWidth: 2, borderTopWidth: 0, borderColor: clubColors.fieldLines },
  
  playerSlot: { position: 'absolute', width: 60, height: 60, marginLeft: -30, marginTop: -30, justifyContent: 'center', alignItems: 'center' },
  playerEmpty: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.2)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.5)', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: clubColors.white, fontSize: 9, fontWeight: '800', marginTop: 2 },
  
  playerAssigned: { alignItems: 'center', justifyContent: 'center' },
  dorsalCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: clubColors.white, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 },
  dorsalText: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  playerName: { color: clubColors.white, fontSize: 10, fontWeight: '800', marginTop: 4, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 4, borderRadius: 4, overflow: 'hidden' },
  removeBtn: { position: 'absolute', top: -4, right: -4, backgroundColor: clubColors.white, borderRadius: 10 },

  benchSection: { padding: 20 },
  benchTitle: { color: clubColors.white, fontSize: 16, fontWeight: '800', marginBottom: 12 },
  benchCard: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 12, flexDirection: 'row', alignItems: 'center', minWidth: 150 },
  benchDorsal: { color: clubColors.skyPrimary, fontSize: 20, fontWeight: '900', marginRight: 12 },
  benchName: { color: clubColors.white, fontSize: 12, fontWeight: '700', width: 100 },
  benchPos: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '800' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: clubColors.white, height: '70%', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '900', color: clubColors.navy },
  
  modalPlayerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  modalPlayerRowDisabled: { opacity: 0.4 },
  dorsalModalBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: clubColors.bg, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  dorsalModalText: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  modalPlayerName: { fontSize: 15, fontWeight: '800', color: clubColors.navy },
  modalPlayerPos: { fontSize: 12, color: clubColors.textMuted, fontWeight: '700' },
  modalSelectedText: { fontSize: 12, fontWeight: '800', color: clubColors.danger }
});
