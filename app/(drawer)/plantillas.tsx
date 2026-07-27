import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../../src/context/AuthContext';
import { TEAMS, PLAYERS } from '../../src/data/clubData';

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  border: '#e5e7eb'
};

type FilterType = 'Todos' | 'Porteros' | 'Centrales' | 'Laterales' | 'Medios' | 'Delanteros';

export default function PlantillasScreen() {
  const { activeTeamId, user } = useAuth();
  
  // Default to Infantil A or first team
  const defaultTeam = TEAMS.find(t => t.id === activeTeamId)?.name || TEAMS[0]?.name || 'Infantil A';
  const [selectedTeamName, setSelectedTeamName] = useState<string>(defaultTeam);
  const [activeFilter, setActiveFilter] = useState<FilterType>('Todos');

  // Filtrar jugadores por el equipo seleccionado
  const teamPlayers = useMemo(() => {
    return PLAYERS.filter(p => p.equipo === selectedTeamName).sort((a, b) => {
      const d1 = parseInt(a.dorsal || '999');
      const d2 = parseInt(b.dorsal || '999');
      return d1 - d2;
    });
  }, [selectedTeamName]);

  // Aplicar filtro de posición
  const filteredPlayers = useMemo(() => {
    if (activeFilter === 'Todos') return teamPlayers;
    return teamPlayers.filter(p => {
      const pos = p.posicion?.toLowerCase() || '';
      switch (activeFilter) {
        case 'Porteros': return pos.includes('portero');
        case 'Centrales': return pos.includes('central');
        case 'Laterales': return pos.includes('lateral');
        case 'Medios': return pos.includes('medio');
        case 'Delanteros': return pos.includes('delantero');
        default: return true;
      }
    });
  }, [teamPlayers, activeFilter]);

  return (
    <View style={styles.container}>
      {/* CABECERA */}
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Plantilla • {selectedTeamName}</Text>
         <Text style={styles.headerSub}>{teamPlayers.length} jugadores inscritos</Text>
      </View>

      {/* SELECTOR DE EQUIPO */}
      <View style={styles.teamSelectorWrapper}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
            {TEAMS.map(t => (
               <TouchableOpacity 
                  key={t.id} 
                  style={[styles.teamPill, selectedTeamName === t.name && styles.teamPillActive]}
                  onPress={() => setSelectedTeamName(t.name)}
               >
                  <Text style={[styles.teamPillText, selectedTeamName === t.name && styles.teamPillTextActive]}>{t.name}</Text>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>

      {/* FILTROS DE POSICIÓN */}
      <View style={styles.filtersWrapper}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 20}}>
            {(['Todos', 'Porteros', 'Centrales', 'Laterales', 'Medios', 'Delanteros'] as FilterType[]).map(f => (
               <TouchableOpacity 
                  key={f} 
                  style={[styles.filterPill, activeFilter === f && styles.filterPillActive]}
                  onPress={() => setActiveFilter(f)}
               >
                  <Text style={[styles.filterPillText, activeFilter === f && styles.filterPillTextActive]}>{f}</Text>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>

      {/* LISTADO DE JUGADORES */}
      <ScrollView style={styles.list} contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 40}} showsVerticalScrollIndicator={false}>
         {filteredPlayers.map(p => (
            <View key={p.id} style={styles.playerCard}>
               <View style={styles.dorsalBox}>
                  <Text style={styles.dorsalText}>{p.dorsal || '-'}</Text>
               </View>
               <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{p.nombreCompleto}</Text>
                  <Text style={styles.playerPosition}>{p.posicion?.toUpperCase() || 'JUGADOR'}</Text>
               </View>
               <View style={styles.statusBadge}>
                  <Text style={styles.statusBadgeText}>{p.activo ? 'ALTA' : 'BAJA'}</Text>
               </View>
            </View>
         ))}
         {filteredPlayers.length === 0 && (
            <Text style={{textAlign: 'center', marginTop: 40, color: clubColors.textMuted}}>No hay jugadores para este filtro.</Text>
         )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 20, paddingTop: 40, backgroundColor: clubColors.white, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  headerTitle: { fontSize: 24, fontWeight: '900', color: clubColors.navy },
  headerSub: { fontSize: 14, color: clubColors.textMuted, marginTop: 4 },
  
  teamSelectorWrapper: { paddingVertical: 10, backgroundColor: clubColors.navy },
  teamPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 8 },
  teamPillActive: { backgroundColor: clubColors.skyPrimary },
  teamPillText: { fontSize: 13, fontWeight: '700', color: clubColors.white },
  teamPillTextActive: { color: clubColors.navy, fontWeight: '900' },

  filtersWrapper: { paddingVertical: 12, backgroundColor: clubColors.white, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  filterPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, backgroundColor: '#f3f4f6', marginRight: 8, borderWidth: 1, borderColor: clubColors.border },
  filterPillActive: { backgroundColor: clubColors.navy, borderColor: clubColors.navy },
  filterPillText: { fontSize: 12, fontWeight: '700', color: clubColors.textMuted },
  filterPillTextActive: { color: clubColors.white },

  list: { paddingTop: 20 },
  playerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: clubColors.white, padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: clubColors.border, elevation: 1, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 8 },
  dorsalBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: clubColors.skyLight, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  dorsalText: { fontSize: 22, fontWeight: '900', color: clubColors.skyPrimary },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 16, fontWeight: '800', color: clubColors.navy, marginBottom: 4 },
  playerPosition: { fontSize: 12, fontWeight: '900', color: clubColors.textMuted, letterSpacing: 0.5 },
  statusBadge: { backgroundColor: '#dcfce7', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { color: '#166534', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
});
