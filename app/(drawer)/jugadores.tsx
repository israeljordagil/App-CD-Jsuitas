import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, Modal, Platform } from 'react-native';
import { colors, spacing, typography } from '../../src/utils/theme';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { FontAwesome } from '@expo/vector-icons';
import { useRole } from '../../src/context/RoleContext';
import { useSport } from '../../src/context/SportContext';
import { FamiliaMiHijo } from '../../src/components/dashboards/FamiliaMiHijo';
import { LinearGradient } from 'expo-linear-gradient';

// Load Data
import { PLAYERS } from '../../src/data/clubData';

// Interfaces
interface Player {
  id: string;
  nombre: string;
  apellidos: string;
  nombreCompleto: string;
  fechaNacimiento: string;
  dni: string;
  equipo: string;
  categoria: string;
  temporada: string;
  activo: boolean;
  dorsal?: string | null;
  posicion?: string | null;
  licenciaFFCV?: string | null;
}

export default function JugadoresScreen() {
  const { sport } = useSport();
  const { role } = useRole();

  const currentPlayers = sport === 'futbol_sala' ? PLAYERS_FUTSAL : sport === 'baloncesto' ? PLAYERS_BASKET : PLAYERS;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedTeam, setSelectedTeam] = useState('Todos');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [viewMode, setViewMode] = useState<'compact' | 'card'>(role === 'coordinador' ? 'compact' : 'card');

  // Load players from clubData
  const allPlayers: Player[] = useMemo(() => {
    // Sort alphabetically by name
    return [...PLAYERS].sort((a, b) => (a.nombreCompleto || '').localeCompare(b.nombreCompleto || ''));
  }, []);

  const teams = useMemo(() => {
    const t = new Set<string>();
    allPlayers.forEach(p => p.equipo && t.add(p.equipo));
    return ['Todos', ...Array.from(t).sort()];
  }, [allPlayers]);

  const categories = ['Todos', 'Juvenil', 'Cadete', 'Infantil', 'Femenino'];

  // Filter players
  const filteredPlayers = useMemo(() => {
    return allPlayers.filter(p => {
      // 1. Search Query
      const q = searchQuery.toLowerCase();
      const matchSearch = q === '' || 
        (p.nombreCompleto && p.nombreCompleto.toLowerCase().includes(q)) ||
        (p.dni && p.dni.toLowerCase().includes(q));

      // 2. Category
      let matchCat = true;
      if (selectedCategory !== 'Todos') {
        if (selectedCategory === 'Femenino') {
          matchCat = p.equipo.toLowerCase().includes('femenino');
        } else {
          matchCat = p.categoria === selectedCategory && !p.equipo.toLowerCase().includes('femenino');
        }
      }

      // 3. Team
      const matchTeam = selectedTeam === 'Todos' || p.equipo === selectedTeam;

      return matchSearch && matchCat && matchTeam;
    });
  }, [allPlayers, searchQuery, selectedCategory, selectedTeam]);


  if (role === 'familias') {
    return (
      <View style={styles.familiasContainer}>
        <PremiumHeader 
          title="MI HIJO"
          subtitle="FICHA DE JUGADOR"
          showSearchAndActions={false}
          showAvatar={false}
        />
        <View style={styles.familiasContent}>
           <FamiliaMiHijo />
        </View>
      </View>
    );
  }

  // Render methods
  const renderPlayerCard = ({ item }: { item: Player }) => (
    <TouchableOpacity 
      style={styles.playerCard} 
      activeOpacity={0.8}
      onPress={() => setSelectedPlayer(item)}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.01)']}
        style={styles.playerCardGradient}
      >
        <View style={styles.playerAvatarContainer}>
          <FontAwesome name="user" size={24} color={colors.sky} />
        </View>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName} numberOfLines={1}>{item.nombreCompleto}</Text>
          <View style={styles.playerMetaRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>{item.equipo}</Text>
            </View>
            <Text style={styles.metaText}>{item.categoria}</Text>
          </View>
        </View>
        <View style={styles.playerStatus}>
          <View style={[styles.statusDot, item.activo !== false ? styles.statusActive : styles.statusInactive]} />
          <FontAwesome name="chevron-right" size={14} color="rgba(255,255,255,0.3)" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCompactPlayerCard = ({ item }: { item: Player }) => (
    <TouchableOpacity 
      style={styles.compactCard} 
      activeOpacity={0.8}
      onPress={() => setSelectedPlayer(item)}
    >
      <View style={styles.compactAvatarContainer}>
        <FontAwesome name="user" size={18} color={colors.sky} />
      </View>
      <View style={styles.compactInfo}>
        <Text style={styles.compactName} numberOfLines={1}>{item.nombreCompleto}</Text>
        <View style={styles.compactMetaRow}>
          <Text style={styles.compactMetaText}>{item.equipo} • {item.dni || 'Sin DNI'}</Text>
        </View>
      </View>
      <View style={styles.compactStatus}>
        <View style={[styles.statusDot, item.activo !== false ? styles.statusActive : styles.statusInactive]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PremiumHeader 
          title="JUGADORES"
          subtitle={`BASE DE DATOS CD JESUITAS • ${allPlayers.length} JUGADORES`}
          showAvatar={false}
        />

        {/* Search & Filters Section */}
        <View style={styles.filtersContainer}>
          {/* Search Box */}
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={16} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por nombre, apellidos o DNI..."
              placeholderTextColor="rgba(255,255,255,0.4)"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                <FontAwesome name="times-circle" size={16} color="rgba(255,255,255,0.5)" />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContent}>
            {categories.map(cat => (
              <TouchableOpacity 
                key={cat} 
                style={[styles.pill, selectedCategory === cat && styles.pillActive]}
                onPress={() => {
                  setSelectedCategory(cat);
                  setSelectedTeam('Todos'); // Reset team filter if category changes
                }}
              >
                <Text style={[styles.pillText, selectedCategory === cat && styles.pillTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Teams */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContent}>
            {teams.map(team => {
              // Hide teams that don't match the selected category to avoid empty lists
              if (selectedCategory !== 'Todos' && team !== 'Todos') {
                if (selectedCategory === 'Femenino' && !team.toLowerCase().includes('femenino')) return null;
                if (selectedCategory !== 'Femenino' && !team.toLowerCase().includes(selectedCategory.toLowerCase())) return null;
              }

              return (
                <TouchableOpacity 
                  key={team} 
                  style={[styles.teamPill, selectedTeam === team && styles.teamPillActive]}
                  onPress={() => setSelectedTeam(team)}
                >
                  <Text style={[styles.teamPillText, selectedTeam === team && styles.teamPillTextActive]}>{team}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* List */}
        <View style={styles.listContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>{filteredPlayers.length} resultados</Text>
            {role === 'coordinador' && (
              <View style={styles.viewSelector}>
                <TouchableOpacity 
                  style={[styles.viewBtn, viewMode === 'compact' && styles.viewBtnActive]}
                  onPress={() => setViewMode('compact')}
                >
                  <FontAwesome name="list" size={14} color={viewMode === 'compact' ? colors.navy : 'rgba(255,255,255,0.5)'} />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.viewBtn, viewMode === 'card' && styles.viewBtnActive]}
                  onPress={() => setViewMode('card')}
                >
                  <FontAwesome name="th-large" size={14} color={viewMode === 'card' ? colors.navy : 'rgba(255,255,255,0.5)'} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          
          {filteredPlayers.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome name="users" size={48} color="rgba(255,255,255,0.1)" />
              <Text style={styles.emptyStateText}>No hay jugadores cargados.</Text>
            </View>
          ) : (
            <FlatList
              data={filteredPlayers}
              keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
              renderItem={viewMode === 'compact' ? renderCompactPlayerCard : renderPlayerCard}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
              initialNumToRender={15}
            />
          )}
        </View>

        {/* Detail Modal */}
        <Modal
          visible={selectedPlayer !== null}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedPlayer(null)}
        >
          {selectedPlayer && (
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedPlayer(null)}>
                  <FontAwesome name="times" size={24} color={colors.white} />
                </TouchableOpacity>

                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                  {/* Header Modal */}
                  <View style={styles.modalHeader}>
                    <View style={styles.modalAvatarLg}>
                      <FontAwesome name="user" size={48} color={colors.sky} />
                    </View>
                    <Text style={styles.modalName}>{selectedPlayer.nombreCompleto}</Text>
                    <Text style={styles.modalTeam}>{selectedPlayer.equipo}</Text>
                    
                    <View style={styles.modalStatusRow}>
                      <View style={[styles.statusDot, selectedPlayer.activo !== false ? styles.statusActive : styles.statusInactive]} />
                      <Text style={styles.modalStatusText}>{selectedPlayer.activo !== false ? 'ACTIVO' : 'INACTIVO'}</Text>
                    </View>
                  </View>

                  {/* Info Blocks */}
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Datos Personales</Text>
                    <View style={styles.infoGrid}>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Nombre</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.nombre}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Apellidos</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.apellidos}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>F. Nacimiento</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.fechaNacimiento || '-'}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>DNI</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.dni || '-'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Datos Deportivos</Text>
                    <View style={styles.infoGrid}>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Categoría</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.categoria}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Temporada</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.temporada || '2026/2027'}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Dorsal</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.dorsal || 'Pendiente'}</Text>
                      </View>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Posición</Text>
                        <Text style={styles.infoValue}>{selectedPlayer.posicion || 'Pendiente'}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Gestión (Próximamente)</Text>
                    <View style={styles.infoList}>
                      <View style={styles.listItem}>
                        <FontAwesome name="id-card-o" size={16} color={colors.muted} />
                        <Text style={styles.listItemText}>Licencia FFCV</Text>
                        <Text style={styles.listItemValue}>Pendiente</Text>
                      </View>
                      <View style={styles.listItem}>
                        <FontAwesome name="medkit" size={16} color={colors.muted} />
                        <Text style={styles.listItemText}>Reconocimiento Médico</Text>
                        <Text style={styles.listItemValue}>Pendiente</Text>
                      </View>
                      <View style={styles.listItem}>
                        <FontAwesome name="line-chart" size={16} color={colors.muted} />
                        <Text style={styles.listItemText}>Estadísticas</Text>
                        <Text style={styles.listItemValue}>-</Text>
                      </View>
                      <View style={styles.listItem}>
                        <FontAwesome name="list-ul" size={16} color={colors.muted} />
                        <Text style={styles.listItemText}>Convocatorias</Text>
                        <Text style={styles.listItemValue}>-</Text>
                      </View>
                      <View style={styles.listItem}>
                        <FontAwesome name="futbol-o" size={16} color={colors.muted} />
                        <Text style={styles.listItemText}>Entrenamientos</Text>
                        <Text style={styles.listItemValue}>-</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={{height: 40}} />
                </ScrollView>
              </View>
            </View>
          )}
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  
  // Filters
  filtersContainer: {
    paddingHorizontal: spacing.m,
    paddingTop: spacing.s,
    paddingBottom: spacing.s,
    backgroundColor: 'rgba(4,16,38,0.95)',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingHorizontal: spacing.m,
    height: 44,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchIcon: { marginRight: spacing.s },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  clearBtn: { padding: spacing.xs },
  
  pillsScroll: {
    marginBottom: spacing.s,
  },
  pillsContent: {
    paddingRight: spacing.l,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillActive: {
    backgroundColor: colors.sky,
    borderColor: colors.sky,
  },
  pillText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '700',
  },
  pillTextActive: {
    color: colors.navy,
    fontWeight: '900',
  },

  teamPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'transparent',
    marginRight: spacing.s,
  },
  teamPillActive: {
    backgroundColor: 'rgba(85,199,243,0.15)',
  },
  teamPillText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    fontWeight: '600',
  },
  teamPillTextActive: {
    color: colors.sky,
    fontWeight: '800',
  },

  // List
  listContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  resultsText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  flatListContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.xl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    color: 'rgba(255,255,255,0.3)',
    marginTop: spacing.m,
    fontSize: 16,
    fontWeight: '600',
  },

  // Player Card
  playerCard: {
    marginBottom: spacing.m,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  playerCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.m,
  },
  playerAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(85,199,243,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(85,199,243,0.2)',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  playerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  metaBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  metaText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  playerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.s,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.m,
  },
  statusActive: { backgroundColor: '#4ADE80', shadowColor: '#4ADE80', shadowOpacity: 0.8, shadowRadius: 4, shadowOffset: { width:0, height:0 } },
  statusInactive: { backgroundColor: '#F87171' },

  // Compact Card
  compactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 12,
    paddingHorizontal: spacing.s,
    height: 72,
  },
  compactAvatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(85,199,243,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  compactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  compactName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  compactMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactMetaText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '600',
  },
  compactStatus: {
    paddingLeft: spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  viewSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: 2,
  },
  viewBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewBtnActive: {
    backgroundColor: colors.sky,
  },

  // Modal Detail
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#071A3D',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: '90%',
    padding: spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderBottomWidth: 0,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: spacing.xl,
  },
  modalAvatarLg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(85,199,243,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.m,
    borderWidth: 2,
    borderColor: colors.sky,
  },
  modalName: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 4,
  },
  modalTeam: {
    color: colors.sky,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  modalStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  modalStatusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  
  infoSection: {
    marginBottom: spacing.l,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderRadius: 16,
    padding: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionTitle: {
    color: colors.sky,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: spacing.m,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  infoBox: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: spacing.m,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },

  infoList: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  listItemText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  listItemValue: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },

  // Familias specific styles
  familiasContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
  familiasContent: {
    flex: 1,
  }
});
