import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, FlatList, Platform } from 'react-native';
import { colors, spacing, typography } from '../../src/utils/theme';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { CoachBadge } from '../../src/components/ui/CoachBadge';
import { FontAwesome } from '@expo/vector-icons';
import { useRole } from '../../src/context/RoleContext';
import { COACHES, TEAMS } from '../../src/data/clubData';

export default function EntrenadoresScreen() {
  const { role } = useRole();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos');

  const roles = ['Todos', 'Primer Entrenador', 'Segundo Entrenador'];

  // Filtrado de entrenadores
  const filteredCoaches = useMemo(() => {
    return COACHES.filter(c => {
      // Búsqueda por texto
      const q = searchQuery.toLowerCase();
      const matchSearch = q === '' || (c.nombre && c.nombre.toLowerCase().includes(q));

      // Filtro por Rol
      const matchRole = selectedRole === 'Todos' || c.rolBase === selectedRole;

      return matchSearch && matchRole;
    }).sort((a, b) => a.nombre.localeCompare(b.nombre));
  }, [searchQuery, selectedRole]);

  if (role !== 'coordinador') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <PremiumHeader title="ACCESO RESTRINGIDO" subtitle="ÁREA DE COORDINACIÓN" showAvatar={false} />
      </SafeAreaView>
    );
  }

  const renderCoachCard = ({ item }: { item: any }) => (
    <View style={styles.coachCard}>
      <View style={styles.coachAvatarContainer}>
        <FontAwesome name="user-circle-o" size={24} color={colors.sky} />
      </View>
      
      <View style={styles.coachInfo}>
        <Text style={styles.coachName} numberOfLines={1}>{item.nombre}</Text>
        <CoachBadge 
          type={item.rolBase === 'Primer Entrenador' ? 'principal' : (item.rolBase === 'Segundo Entrenador' ? 'segundo' : 'pendiente')} 
          style={{ marginBottom: 8 }} 
        />
        
        {item.equipos && item.equipos.length > 0 && (
          <View style={styles.teamsContainer}>
            {item.equipos.map((eqName: string, idx: number) => {
              const teamData = TEAMS.find(t => t.name === eqName);
              const badgeColor = teamData?.modality === 'F11' ? 'rgba(85,199,243,0.15)' : 'rgba(255,255,255,0.1)';
              const textColor = teamData?.modality === 'F11' ? colors.sky : colors.muted;
              
              return (
                <View key={idx} style={[styles.teamBadge, { backgroundColor: badgeColor }]}>
                  <Text style={[styles.teamBadgeText, { color: textColor }]}>{eqName}</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
      
      <TouchableOpacity style={styles.actionBtn}>
        <FontAwesome name="envelope" size={16} color={colors.muted} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <PremiumHeader 
          title="ENTRENADORES"
          subtitle={`CUERPO TÉCNICO CD JESUITAS • ${COACHES.length} STAFF`}
          showAvatar={false}
        />

        <View style={styles.filtersContainer}>
          <View style={styles.searchBox}>
            <FontAwesome name="search" size={16} color="rgba(255,255,255,0.5)" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar entrenador..."
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

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillsScroll} contentContainerStyle={styles.pillsContent}>
            {roles.map(r => (
              <TouchableOpacity 
                key={r} 
                style={[styles.pill, selectedRole === r && styles.pillActive]}
                onPress={() => setSelectedRole(r)}
              >
                <Text style={[styles.pillText, selectedRole === r && styles.pillTextActive]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsText}>{filteredCoaches.length} entrenadores</Text>
          </View>
          
          {filteredCoaches.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome name="id-badge" size={48} color="rgba(255,255,255,0.1)" />
              <Text style={styles.emptyStateText}>No hay entrenadores con esos criterios.</Text>
            </View>
          ) : (
            <FlatList
              data={filteredCoaches}
              keyExtractor={(item) => item.id}
              renderItem={renderCoachCard}
              contentContainerStyle={styles.flatListContent}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  
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
  
  pillsScroll: { marginBottom: spacing.s },
  pillsContent: { paddingRight: spacing.l, alignItems: 'center' },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginRight: spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillActive: { backgroundColor: colors.sky, borderColor: colors.sky },
  pillText: { color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: '700' },
  pillTextActive: { color: colors.navy, fontWeight: '900' },

  listContainer: { flex: 1 },
  resultsHeader: { paddingHorizontal: spacing.m, paddingVertical: spacing.s },
  resultsText: { color: colors.muted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  flatListContent: { paddingHorizontal: spacing.m, paddingBottom: spacing.xl },
  
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 60 },
  emptyStateText: { color: 'rgba(255,255,255,0.3)', marginTop: spacing.m, fontSize: 16, fontWeight: '600' },

  coachCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: spacing.m,
    marginBottom: spacing.m,
  },
  coachAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(85,199,243,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  coachInfo: { flex: 1 },
  coachName: { color: colors.white, fontSize: 16, fontWeight: '800', marginBottom: 2 },
  coachRoleText: { color: colors.muted, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 },
  
  teamsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  teamBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  teamBadgeText: { fontSize: 10, fontWeight: '800' },
  
  actionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginLeft: spacing.m }
});
