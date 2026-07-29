import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  useWindowDimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { ManagedTeam, TeamCategory, TeamGender } from '../../src/types/teams';

const CATEGORIES_LIST: TeamCategory[] = [
  'Querubín',
  'Prebenjamín',
  'Benjamín',
  'Alevín',
  'Infantil',
  'Cadete',
  'Juvenil'
];

export default function EquiposScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const { activeContext, managedTeams, updateTeam, createTeam, managedPeople } = useAuth();

  // Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('TODOS');
  const [genderFilter, setGenderFilter] = useState<string>('TODOS');
  const [statusFilter, setStatusFilter] = useState<string>('TODOS');

  // Ficha de Equipo seleccionada
  const [selectedTeam, setSelectedTeam] = useState<ManagedTeam | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1); // 1: Resumen, 2: Cuerpo técnico, 3: Datos generales, 4: Historial

  // Campos en edición
  const [editedName, setEditedName] = useState('');
  const [editedCategory, setEditedCategory] = useState<TeamCategory>('Cadete');
  const [editedGender, setEditedGender] = useState<TeamGender>('MIXTO');
  const [editedStatus, setEditedStatus] = useState<'ACTIVE' | 'INACTIVE' | 'ARCHIVED'>('ACTIVE');
  const [editedObservations, setEditedObservations] = useState('');

  // Modal Nuevo Equipo
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newNameInput, setNewNameInput] = useState('');
  const [newCategoryInput, setNewCategoryInput] = useState<TeamCategory>('Alevín');
  const [newGenderInput, setNewGenderInput] = useState<TeamGender>('MIXTO');

  // Mensaje Feedback
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filtrado dinámico
  const filteredTeams = managedTeams.filter(team => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      team.name.toLowerCase().includes(query) ||
      team.internalCode.toLowerCase().includes(query) ||
      team.category.toLowerCase().includes(query) ||
      team.staff.some(s => s.fullName.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (categoryFilter !== 'TODOS' && team.category !== categoryFilter) return false;
    if (genderFilter !== 'TODOS' && team.gender !== genderFilter) return false;
    if (statusFilter !== 'TODOS' && team.status !== statusFilter) return false;

    return true;
  });

  // Métricas
  const totalCount = managedTeams.length;
  const f11Count = managedTeams.filter(t => t.category === 'Juvenil' || t.category === 'Cadete' || t.category === 'Infantil').length;
  const f8Count = managedTeams.filter(t => t.category === 'Alevín' || t.category === 'Benjamín' || t.category === 'Prebenjamín' || t.category === 'Querubín').length;
  const femaleCount = managedTeams.filter(t => t.gender === 'FEMENINO').length;
  const activeCount = managedTeams.filter(t => t.status === 'ACTIVE').length;

  const handleOpenFicha = (team: ManagedTeam) => {
    setSelectedTeam(team);
    setActiveTab(1);
    setEditedName(team.name);
    setEditedCategory(team.category);
    setEditedGender(team.gender);
    setEditedStatus(team.status);
    setEditedObservations(team.observations || '');
    setFeedbackMsg(null);
  };

  const handleSaveTeam = () => {
    if (!selectedTeam) return;
    if (!editedName.trim()) {
      setFeedbackMsg({ type: 'error', text: 'El nombre completo del equipo es obligatorio.' });
      return;
    }

    const updatedTeam: ManagedTeam = {
      ...selectedTeam,
      name: editedName.trim(), // Nombre completo sin el campo letter
      category: editedCategory,
      gender: editedGender,
      status: editedStatus,
      observations: editedObservations.trim() || undefined,
      history: [
        {
          id: `ev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          user: 'Israel Jordá',
          action: 'Datos modificados',
          detail: `Actualización de ficha del equipo ${editedName.trim()} (${editedCategory}).`
        },
        ...selectedTeam.history
      ],
      updatedAt: new Date().toISOString()
    };

    const res = updateTeam(updatedTeam);
    if (!res.success) {
      setFeedbackMsg({ type: 'error', text: res.error || 'No se pudo guardar el equipo.' });
    } else {
      setSelectedTeam(updatedTeam);
      setFeedbackMsg({ type: 'success', text: 'Ficha de equipo guardada correctamente.' });
      setTimeout(() => setFeedbackMsg(null), 1500);
    }
  };

  const handleCreateTeam = () => {
    if (!newNameInput.trim()) {
      Alert.alert('Incompleto', 'Introduce el nombre completo del equipo (ej. Cadete F).');
      return;
    }

    const res = createTeam({
      name: newNameInput.trim(),
      category: newCategoryInput,
      gender: newGenderInput,
      sport: 'Fútbol',
      season: '2026/2027'
    });

    if (!res.success) {
      Alert.alert('Error', res.error || 'No se pudo registrar el equipo.');
    } else {
      setIsNewModalOpen(false);
      setNewNameInput('');
      Alert.alert('Éxito', 'Equipo registrado con código EQU autogenerado.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* CABECERA */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.badgeRow}>
            <View style={styles.moduleBadge}>
              <Ionicons name="shirt-outline" size={14} color="#4FC3F7" />
              <Text style={styles.moduleBadgeText}>ESTRUCTURA DEPORTIVA</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>⚽ EQUIPOS</Text>
          <Text style={styles.headerSub}>Gestión de los equipos del CD Jesuitas.</Text>
        </View>

        <TouchableOpacity style={styles.newBtn} onPress={() => setIsNewModalOpen(true)}>
          <Ionicons name="add-circle" size={16} color="#071A3D" />
          <Text style={styles.newBtnTxt}>+ Nuevo Equipo</Text>
        </TouchableOpacity>
      </View>

      {/* METRICAS SUPERIORES */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>TOTAL EQUIPOS</Text>
          <Text style={styles.metricValue}>{totalCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>FÚTBOL 11</Text>
          <Text style={[styles.metricValue, { color: '#4FC3F7' }]}>{f11Count}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>FÚTBOL 8</Text>
          <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{f8Count}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>FEMENINOS</Text>
          <Text style={[styles.metricValue, { color: '#F472B6' }]}>{femaleCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>ACTIVOS</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{activeCount}</Text>
        </View>
      </View>

      {/* BUSCADOR Y FILTROS */}
      <View style={styles.filterBox}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por código EQU, nombre completo, categoría o entrenador..."
            placeholderTextColor="rgba(148, 163, 184, 0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filtro por Categoría */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, marginTop: 10 }}>
          <Text style={styles.filterLabel}>Categoría:</Text>
          {['TODOS', ...CATEGORIES_LIST].map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, categoryFilter === cat && styles.chipActive]}
              onPress={() => setCategoryFilter(cat)}
            >
              <Text style={[styles.chipTxt, categoryFilter === cat && styles.chipTxtActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTADO DE EQUIPOS REALES */}
      <View style={styles.listSection}>
        {filteredTeams.map(team => {
          const primerEntrenador = team.staff.find(s => s.positionTitle === 'Primer Entrenador');
          const segundoEntrenador = team.staff.find(s => s.positionTitle === 'Segundo Entrenador');

          return (
            <View key={team.id} style={styles.teamCard}>
              <View style={styles.teamBadgeBox}>
                <Ionicons name="shield-outline" size={24} color="#4FC3F7" />
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.teamHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={styles.teamName}>{team.name}</Text>
                    <View style={styles.codeBadge}>
                      <Text style={styles.codeBadgeTxt}>{team.internalCode}</Text>
                    </View>
                  </View>

                  <View style={[styles.genderBadge, team.gender === 'FEMENINO' && styles.genderFemale]}>
                    <Text style={styles.genderBadgeTxt}>{team.gender}</Text>
                  </View>
                </View>

                <Text style={styles.teamSub}>
                  Categoría: <Text style={{ color: '#FFFFFF', fontWeight: '800' }}>{team.category}</Text> • {team.sport} • {team.season}
                </Text>

                {/* Staff Técnico */}
                <View style={styles.staffBox}>
                  <Text style={styles.staffTxt}>
                    <Text style={{ color: '#81D4FA' }}>1º Entrenador:</Text> {primerEntrenador ? primerEntrenador.fullName : 'SIN ASIGNAR'}
                  </Text>
                  <Text style={styles.staffTxt}>
                    <Text style={{ color: '#81D4FA' }}>2º Entrenador:</Text> {segundoEntrenador ? segundoEntrenador.fullName : 'SIN ASIGNAR'}
                  </Text>
                </View>

                <Text style={styles.staffCountTxt}>👥 {team.staff.length} personas asignadas</Text>
              </View>

              <TouchableOpacity style={styles.viewFichaBtn} onPress={() => handleOpenFicha(team)}>
                <Text style={styles.viewFichaBtnTxt}>Ver Ficha</Text>
                <Ionicons name="chevron-forward" size={14} color="#4FC3F7" />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      {/* MODAL FICHA INTEGRAL DEL EQUIPO (4 SECCIONES) */}
      <Modal visible={!!selectedTeam} transparent animationType="fade" onRequestClose={() => setSelectedTeam(null)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCardLarge}>
            
            <View style={styles.modalHeader}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.modalTitle}>{selectedTeam?.name}</Text>
                  <View style={styles.codeBadge}>
                    <Text style={styles.codeBadgeTxt}>{selectedTeam?.internalCode}</Text>
                  </View>
                </View>
                <Text style={styles.modalSub}>Categoría {selectedTeam?.category} • {selectedTeam?.season}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedTeam(null)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* PESTAÑAS (1 a 4) */}
            <View style={styles.tabsRow}>
              {[
                { id: 1, label: '1. Resumen' },
                { id: 2, label: '2. Cuerpo Técnico' },
                { id: 3, label: '3. Datos Generales' },
                { id: 4, label: '4. Historial' },
              ].map(tb => (
                <TouchableOpacity
                  key={tb.id}
                  style={[styles.tabBtn, activeTab === tb.id && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tb.id)}
                >
                  <Text style={[styles.tabBtnTxt, activeTab === tb.id && styles.tabBtnTxtActive]}>{tb.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {feedbackMsg && (
              <View style={[styles.feedbackBox, feedbackMsg.type === 'success' ? styles.feedbackSuccess : styles.feedbackError]}>
                <Ionicons 
                  name={feedbackMsg.type === 'success' ? "checkmark-circle" : "alert-circle"} 
                  size={16} 
                  color={feedbackMsg.type === 'success' ? "#10B981" : "#EF4444"} 
                />
                <Text style={[styles.feedbackTxt, { color: feedbackMsg.type === 'success' ? "#10B981" : "#EF4444" }]}>
                  {feedbackMsg.text}
                </Text>
              </View>
            )}

            <ScrollView style={{ maxHeight: 440 }} showsVerticalScrollIndicator={false}>
              
              {/* SECCIÓN 1: RESUMEN DEL EQUIPO */}
              {activeTab === 1 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.fieldLabel}>Nombre Completo del Equipo (Sin campo letter)</Text>
                  <TextInput style={styles.inputModal} value={editedName} onChangeText={setEditedName} />

                  <Text style={styles.fieldLabel}>Categoría Obligatoria (Texto)</Text>
                  <View style={styles.optionsRow}>
                    {CATEGORIES_LIST.map(cat => (
                      <TouchableOpacity
                        key={cat}
                        style={[styles.chip, editedCategory === cat && styles.chipActive]}
                        onPress={() => setEditedCategory(cat)}
                      >
                        <Text style={[styles.chipTxt, editedCategory === cat && styles.chipTxtActive]}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Deporte</Text>
                  <Text style={styles.valueTxt}>Fútbol</Text>

                  <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Sexo del Equipo</Text>
                  <View style={styles.optionsRow}>
                    {['MIXTO', 'FEMENINO', 'MASCULINO'].map(g => (
                      <TouchableOpacity
                        key={g}
                        style={[styles.chip, editedGender === g && styles.chipActive]}
                        onPress={() => setEditedGender(g as any)}
                      >
                        <Text style={[styles.chipTxt, editedGender === g && styles.chipTxtActive]}>{g}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* SECCIÓN 2: CUERPO TÉCNICO VINCULADO VIA TEAM_ID */}
              {activeTab === 2 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Personas Asignadas (Vínculo relacional por team_id)</Text>

                  {selectedTeam?.staff.length === 0 ? (
                    <View style={styles.emptyBox}>
                      <Text style={styles.emptyTxt}>No hay personas asignadas actualmente a este equipo.</Text>
                    </View>
                  ) : (
                    selectedTeam?.staff.map(member => (
                      <View key={member.personId} style={styles.staffMemberItem}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <Text style={styles.staffMemberName}>{member.fullName}</Text>
                            <Text style={styles.staffCodeTxt}>({member.personCode})</Text>
                          </View>
                          <Text style={styles.staffPositionTitle}>{member.positionTitle}</Text>
                        </View>

                        <TouchableOpacity 
                          style={styles.openPersonBtn}
                          onPress={() => {
                            setSelectedTeam(null);
                            router.push('/(drawer)/personas');
                          }}
                        >
                          <Text style={styles.openPersonBtnTxt}>Abrir Persona</Text>
                          <Ionicons name="arrow-forward" size={12} color="#071A3D" />
                        </TouchableOpacity>
                      </View>
                    ))
                  )}
                </View>
              )}

              {/* SECCIÓN 3: DATOS GENERALES */}
              {activeTab === 3 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.fieldLabel}>Observaciones</Text>
                  <TextInput 
                    style={[styles.inputModal, { height: 80 }]} 
                    multiline 
                    placeholder="Escribe observaciones adicionales sobre el equipo..."
                    placeholderTextColor="#94A3B8"
                    value={editedObservations} 
                    onChangeText={setEditedObservations} 
                  />

                  <Text style={[styles.fieldLabel, { marginTop: 14 }]}>Auditoría de Registro</Text>
                  <Text style={styles.auditInfoTxt}>Creado por: {selectedTeam?.createdBy || 'Israel Jordá'} • {selectedTeam?.createdAt ? new Date(selectedTeam.createdAt).toLocaleDateString() : ''}</Text>
                  <Text style={styles.auditInfoTxt}>Última modificación: {selectedTeam?.updatedBy || 'Israel Jordá'} • {selectedTeam?.updatedAt ? new Date(selectedTeam.updatedAt).toLocaleDateString() : ''}</Text>
                </View>
              )}

              {/* SECCIÓN 4: HISTORIAL DEL EQUIPO */}
              {activeTab === 4 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Historial Auditado del Equipo</Text>
                  {selectedTeam?.history.map(ev => (
                    <View key={ev.id} style={styles.historyCard}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.historyActionTxt}>{ev.action}</Text>
                        <Text style={styles.historyDateTxt}>{ev.date}</Text>
                      </View>
                      <Text style={styles.historyDetailTxt}>{ev.detail}</Text>
                      <Text style={styles.historyUserTxt}>Por: {ev.user}</Text>
                    </View>
                  ))}
                </View>
              )}

            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTeam}>
                <Text style={styles.saveBtnTxt}>Guardar Ficha del Equipo</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* MODAL REGISTRAR NUEVO EQUIPO */}
      <Modal visible={isNewModalOpen} transparent animationType="fade" onRequestClose={() => setIsNewModalOpen(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>REGISTRAR NUEVO EQUIPO</Text>
              <TouchableOpacity onPress={() => setIsNewModalOpen(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
              <Text style={styles.fieldLabel}>Nombre Completo del Equipo (Ej. Cadete F)</Text>
              <TextInput style={styles.inputModal} placeholder="Cadete F" placeholderTextColor="#94A3B8" value={newNameInput} onChangeText={setNewNameInput} />

              <Text style={styles.fieldLabel}>Categoría Obligatoria</Text>
              <View style={styles.optionsRow}>
                {CATEGORIES_LIST.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.chip, newCategoryInput === cat && styles.chipActive]}
                    onPress={() => setNewCategoryInput(cat)}
                  >
                    <Text style={[styles.chipTxt, newCategoryInput === cat && styles.chipTxtActive]}>{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.fieldLabel}>Sexo del Equipo</Text>
              <View style={styles.optionsRow}>
                {['MIXTO', 'FEMENINO', 'MASCULINO'].map(g => (
                  <TouchableOpacity
                    key={g}
                    style={[styles.chip, newGenderInput === g && styles.chipActive]}
                    onPress={() => setNewGenderInput(g as any)}
                  >
                    <Text style={[styles.chipTxt, newGenderInput === g && styles.chipTxtActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleCreateTeam}>
              <Text style={styles.saveBtnTxt}>Crear Equipo con Código EQU Automático</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071A3D' },
  content: { padding: 16, paddingBottom: 60 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  badgeRow: { flexDirection: 'row', marginBottom: 6 },
  moduleBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)' },
  moduleBadgeText: { color: '#4FC3F7', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
  newBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4FC3F7', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  newBtnTxt: { color: '#071A3D', fontSize: 12, fontWeight: '900' },

  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  metricCard: { flex: 1, minWidth: 100, backgroundColor: 'rgba(11, 34, 79, 0.7)', borderRadius: 14, padding: 12, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.25)' },
  metricLabel: { color: '#94A3B8', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  metricValue: { color: '#FFFFFF', fontSize: 20, fontWeight: '900', marginTop: 2 },

  filterBox: { backgroundColor: 'rgba(11, 34, 79, 0.7)', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)', marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, paddingHorizontal: 12, height: 42, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13 },
  filterLabel: { color: '#4FC3F7', fontSize: 11, fontWeight: '800', alignSelf: 'center', marginRight: 4 },

  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  chipActive: { backgroundColor: '#4FC3F7', borderColor: '#4FC3F7' },
  chipTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  chipTxtActive: { color: '#071A3D', fontWeight: '900' },

  listSection: { gap: 10 },
  teamCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(15, 30, 70, 0.7)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  teamBadgeBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(79, 195, 247, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)' },
  teamHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  teamName: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  codeBadge: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)' },
  codeBadgeTxt: { color: '#4FC3F7', fontSize: 10, fontWeight: '900' },
  genderBadge: { backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  genderFemale: { backgroundColor: 'rgba(244, 114, 182, 0.2)', borderWidth: 1, borderColor: '#F472B6' },
  genderBadgeTxt: { fontSize: 9, fontWeight: '900', color: '#FFFFFF' },

  teamSub: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  staffBox: { gap: 2, marginTop: 6 },
  staffTxt: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  staffCountTxt: { color: '#F59E0B', fontSize: 10, fontWeight: '800', marginTop: 4 },

  viewFichaBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4FC3F7' },
  viewFichaBtnTxt: { color: '#4FC3F7', fontSize: 11, fontWeight: '800' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCardLarge: { width: '100%', maxWidth: 600, backgroundColor: '#0B224F', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#4FC3F7' },
  modalCard: { width: '100%', maxWidth: 480, backgroundColor: '#0B224F', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#4FC3F7' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  modalTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900' },
  modalSub: { color: '#94A3B8', fontSize: 12, marginTop: 2 },

  tabsRow: { flexDirection: 'row', gap: 6, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 8 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#4FC3F7' },
  tabBtnTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  tabBtnTxtActive: { color: '#071A3D', fontWeight: '900' },

  tabContentBox: { gap: 10, paddingVertical: 4 },
  tabHeading: { color: '#4FC3F7', fontSize: 12, fontWeight: '900', marginBottom: 4 },
  fieldLabel: { color: '#81D4FA', fontSize: 11, fontWeight: '800' },
  valueTxt: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  inputModal: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: '#4FC3F7', borderRadius: 10, padding: 10, color: '#FFFFFF', fontSize: 13 },
  optionsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },

  staffMemberItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  staffMemberName: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  staffCodeTxt: { color: '#4FC3F7', fontSize: 10, fontWeight: '800' },
  staffPositionTitle: { color: '#94A3B8', fontSize: 11, marginTop: 2 },
  openPersonBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#4FC3F7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  openPersonBtnTxt: { color: '#071A3D', fontSize: 11, fontWeight: '900' },

  emptyBox: { padding: 20, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 12 },
  emptyTxt: { color: '#94A3B8', fontSize: 12, fontWeight: '600' },

  auditInfoTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '600', marginTop: 2 },

  historyCard: { backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  historyActionTxt: { color: '#F59E0B', fontSize: 11, fontWeight: '900' },
  historyDateTxt: { color: '#94A3B8', fontSize: 10 },
  historyDetailTxt: { color: '#FFFFFF', fontSize: 12, fontWeight: '700', marginTop: 4 },
  historyUserTxt: { color: '#94A3B8', fontSize: 10, marginTop: 2 },

  feedbackBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 10, marginBottom: 12 },
  feedbackSuccess: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: '#10B981' },
  feedbackError: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: '#EF4444' },
  feedbackTxt: { fontSize: 12, fontWeight: '700', flex: 1 },

  modalActions: { marginTop: 14 },
  saveBtn: { backgroundColor: '#4FC3F7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveBtnTxt: { color: '#071A3D', fontSize: 13, fontWeight: '900' }
});
