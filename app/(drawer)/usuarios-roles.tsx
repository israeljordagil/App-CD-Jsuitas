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
import { useAuth } from '../../src/context/AuthContext';
import { AppRole, UserStatus, ManagedUser, UserRoleAssignment } from '../../src/types/roles';

const ALL_ROLES: { id: AppRole; label: string; icon: string; description: string }[] = [
  { id: 'ADMIN_GENERAL', label: 'Administración General', icon: '⚙️', description: 'Acceso total y control de la plataforma' },
  { id: 'DIR_DEPORTIVA', label: 'Dirección Deportiva', icon: '📋', description: 'Planificación técnica global' },
  { id: 'COORDINADOR', label: 'Coordinación', icon: '🧭', description: 'Gestión de deportes y categorías' },
  { id: 'ENTRENADOR', label: 'Entrenador', icon: '👨‍🏫', description: 'Gestión de equipos y plantillas' },
  { id: 'FAMILIA', label: 'Familia', icon: '👨‍👩‍👧', description: 'Acceso de tutores y seguimiento' },
  { id: 'JUGADOR', label: 'Jugador', icon: '👦', description: 'Área deportiva del deportista' },
];

const SPORTS = ['Fútbol', 'Fútbol Sala', 'Baloncesto', 'Voleibol'];
const CATEGORIES = ['Juvenil', 'Cadete', 'Infantil', 'Alevín', 'Benjamín', 'Prebenjamín'];
const TEAMS = ['Cadete A', 'Cadete B', 'Infantil A', 'Infantil B', 'Alevín A', 'Benjamín A'];

export default function UsuariosRolesScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const { activeContext, managedUsers, updateUserRolesAndStatus, createManagedUser } = useAuth();

  // Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('TODOS');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('TODOS');

  // Usuario seleccionado para gestionar
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [editedRoles, setEditedRoles] = useState<AppRole[]>([]);
  const [editedStatus, setEditedStatus] = useState<UserStatus>('ACTIVE');
  const [editedSport, setEditedSport] = useState<string>('Fútbol');
  const [editedCategory, setEditedCategory] = useState<string>('Cadete');
  const [editedTeam, setEditedTeam] = useState<string>('Cadete B');

  // Modal Mensajes de Error/Éxito
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal Nuevo Usuario
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<AppRole>('FAMILIA');

  // Restricción de acceso: Exclusivo para ADMIN_GENERAL
  if (activeContext !== 'ADMIN_GENERAL') {
    return (
      <View style={styles.restrictedContainer}>
        <Ionicons name="shield-outline" size={54} color="#EF4444" style={{ marginBottom: 12 }} />
        <Text style={styles.restrictedTitle}>Acceso Restringido</Text>
        <Text style={styles.restrictedSub}>
          El módulo de Usuarios y Roles es accesible únicamente desde la Administración General.
        </Text>
      </View>
    );
  }

  // Filtrado dinámico de usuarios
  const filteredUsers = managedUsers.filter(u => {
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = 
      selectedRoleFilter === 'TODOS' || 
      u.roles.includes(selectedRoleFilter as AppRole);

    const matchesStatus = 
      selectedStatusFilter === 'TODOS' || 
      u.status === selectedStatusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Métricas
  const totalUsers = managedUsers.length;
  const activeUsersCount = managedUsers.filter(u => u.status === 'ACTIVE').length;
  const disabledUsersCount = managedUsers.filter(u => u.status === 'DISABLED').length;

  const handleOpenManageModal = (user: ManagedUser) => {
    setSelectedUser(user);
    setEditedRoles([...user.roles]);
    setEditedStatus(user.status);
    setEditedSport(user.assignments?.[0]?.sport || 'Fútbol');
    setEditedCategory(user.assignments?.[0]?.category || 'Cadete');
    setEditedTeam(user.assignments?.[0]?.team || 'Cadete B');
    setFeedbackMsg(null);
  };

  const handleToggleRole = (role: AppRole) => {
    if (editedRoles.includes(role)) {
      setEditedRoles(prev => prev.filter(r => r !== role));
    } else {
      setEditedRoles(prev => [...prev, role]);
    }
  };

  const handleSaveChanges = () => {
    if (!selectedUser) return;
    if (editedRoles.length === 0) {
      setFeedbackMsg({ type: 'error', text: 'El usuario debe tener al menos un rol asignado.' });
      return;
    }

    const assignments: UserRoleAssignment[] = [
      {
        role: editedRoles[0],
        sport: editedSport,
        category: editedCategory,
        team: editedTeam
      }
    ];

    const res = updateUserRolesAndStatus(selectedUser.id, editedRoles, editedStatus, assignments);
    if (!res.success) {
      setFeedbackMsg({ type: 'error', text: res.error || 'No se pudo guardar los cambios.' });
    } else {
      setFeedbackMsg({ type: 'success', text: 'Usuario y roles actualizados correctamente.' });
      setTimeout(() => {
        setSelectedUser(null);
        setFeedbackMsg(null);
      }, 1200);
    }
  };

  const handleCreateNewUser = () => {
    if (!newFullName.trim() || !newEmail.trim()) {
      Alert.alert('Campos incompletos', 'Por favor, introduce el nombre completo y el correo electrónico.');
      return;
    }

    const res = createManagedUser(newFullName, newEmail, [newRole]);
    if (!res.success) {
      Alert.alert('Error', res.error || 'No se pudo crear el usuario.');
    } else {
      setIsNewUserModalOpen(false);
      setNewFullName('');
      setNewEmail('');
      setNewRole('FAMILIA');
      Alert.alert('Éxito', 'El usuario ha sido registrado correctamente.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* CABECERA */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.badgeRow}>
            <View style={styles.moduleBadge}>
              <Ionicons name="people-circle" size={14} color="#4FC3F7" />
              <Text style={styles.moduleBadgeText}>ADMINISTRACIÓN</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>Usuarios y Roles</Text>
          <Text style={styles.headerSub}>Gestiona los accesos y responsabilidades del club.</Text>
        </View>

        <TouchableOpacity style={styles.newBtn} onPress={() => setIsNewUserModalOpen(true)}>
          <Ionicons name="person-add" size={16} color="#071A3D" />
          <Text style={styles.newBtnTxt}>+ Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* TARJETAS DE MÉTRICAS */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>TOTAL USUARIOS</Text>
          <Text style={styles.metricValue}>{totalUsers}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>ACTIVOS</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{activeUsersCount}</Text>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>DESACTIVADOS</Text>
          <Text style={[styles.metricValue, { color: '#EF4444' }]}>{disabledUsersCount}</Text>
        </View>
      </View>

      {/* BUSCADOR Y FILTROS */}
      <View style={styles.filterSection}>
        {/* Campo de búsqueda */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre o correo..."
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

        {/* Filtro por Rol */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPillsScroll}>
          <Text style={styles.filterGroupLabel}>Rol:</Text>
          {['TODOS', ...ALL_ROLES.map(r => r.id)].map(roleId => (
            <TouchableOpacity
              key={roleId}
              style={[styles.pill, selectedRoleFilter === roleId && styles.pillActive]}
              onPress={() => setSelectedRoleFilter(roleId)}
            >
              <Text style={[styles.pillTxt, selectedRoleFilter === roleId && styles.pillTxtActive]}>
                {roleId === 'TODOS' ? 'Todos' : roleId}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filtro por Estado */}
        <View style={styles.statusPillsRow}>
          <Text style={styles.filterGroupLabel}>Estado:</Text>
          {[
            { id: 'TODOS', label: 'Todos' },
            { id: 'ACTIVE', label: 'Activos' },
            { id: 'DISABLED', label: 'Desactivados' },
            { id: 'PENDING', label: 'Pendientes' },
          ].map(st => (
            <TouchableOpacity
              key={st.id}
              style={[styles.pill, selectedStatusFilter === st.id && styles.pillActive]}
              onPress={() => setSelectedStatusFilter(st.id)}
            >
              <Text style={[styles.pillTxt, selectedStatusFilter === st.id && styles.pillTxtActive]}>
                {st.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* LISTADO DE USUARIOS */}
      <View style={styles.listContainer}>
        {filteredUsers.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="people-outline" size={44} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No se encontraron usuarios</Text>
            <Text style={styles.emptySub}>Prueba ajustando el texto de búsqueda o los filtros.</Text>
          </View>
        ) : (
          filteredUsers.map(userItem => (
            <View key={userItem.id} style={styles.userCard}>
              <View style={styles.userAvatarBox}>
                <Text style={styles.avatarTxt}>{userItem.fullName.charAt(0).toUpperCase()}</Text>
              </View>

              <View style={styles.userInfoCol}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName}>{userItem.fullName}</Text>
                  
                  {/* Badge Estado */}
                  <View style={[
                    styles.statusBadge,
                    userItem.status === 'ACTIVE' ? styles.statusActive :
                    userItem.status === 'DISABLED' ? styles.statusDisabled : styles.statusPending
                  ]}>
                    <Text style={styles.statusBadgeTxt}>
                      {userItem.status === 'ACTIVE' ? 'ACTIVO' :
                       userItem.status === 'DISABLED' ? 'DESACTIVADO' : 'PENDIENTE'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.userEmail}>{userItem.email}</Text>

                {/* Roles Badges */}
                <View style={styles.rolesRow}>
                  {userItem.roles.map(r => (
                    <View key={r} style={styles.roleTag}>
                      <Text style={styles.roleTagTxt}>{r}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.manageBtn} onPress={() => handleOpenManageModal(userItem)}>
                <Text style={styles.manageBtnTxt}>Gestionar</Text>
                <Ionicons name="chevron-forward" size={14} color="#4FC3F7" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

      {/* MODAL DE GESTIÓN DE USUARIO */}
      <Modal visible={!!selectedUser} transparent animationType="fade" onRequestClose={() => setSelectedUser(null)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>GESTIONAR USUARIO</Text>
              <TouchableOpacity onPress={() => setSelectedUser(null)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
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

            <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false}>
              {/* 1. DATOS PERSONALES Y ESTADO */}
              <Text style={styles.sectionHeading}>1. DATOS PERSONALES</Text>
              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>Nombre Completo</Text>
                <Text style={styles.fieldValue}>{selectedUser?.fullName}</Text>

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Correo Electrónico</Text>
                <Text style={styles.fieldValue}>{selectedUser?.email}</Text>

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Estado de la cuenta</Text>
                <View style={styles.statusToggleRow}>
                  <TouchableOpacity 
                    style={[styles.statusToggleBtn, editedStatus === 'ACTIVE' && styles.statusActiveBtn]} 
                    onPress={() => setEditedStatus('ACTIVE')}
                  >
                    <Text style={styles.statusToggleTxt}>ACTIVO</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.statusToggleBtn, editedStatus === 'DISABLED' && styles.statusDisabledBtn]} 
                    onPress={() => setEditedStatus('DISABLED')}
                  >
                    <Text style={styles.statusToggleTxt}>DESACTIVADO</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.statusToggleBtn, editedStatus === 'PENDING' && styles.statusPendingBtn]} 
                    onPress={() => setEditedStatus('PENDING')}
                  >
                    <Text style={styles.statusToggleTxt}>PENDIENTE</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* 2. ROLES (MULTIRROL) */}
              <Text style={styles.sectionHeading}>2. ROLES Y PERMISOS</Text>
              <View style={styles.rolesGrid}>
                {ALL_ROLES.map(role => {
                  const isChecked = editedRoles.includes(role.id);
                  return (
                    <TouchableOpacity 
                      key={role.id}
                      style={[styles.roleSelectCard, isChecked && styles.roleSelectCardActive]}
                      onPress={() => handleToggleRole(role.id)}
                    >
                      <View style={styles.roleSelectHeader}>
                        <Text style={styles.roleIcon}>{role.icon}</Text>
                        <Text style={styles.roleLabel}>{role.label}</Text>
                        {isChecked && <Ionicons name="checkmark-circle" size={18} color="#4FC3F7" />}
                      </View>
                      <Text style={styles.roleDesc}>{role.description}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* 3. ASIGNACIONES TEMPORALES (FASE 1) */}
              <Text style={styles.sectionHeading}>3. ASIGNACIONES DEPORTIVAS (FASE 1)</Text>
              <Text style={styles.assignmentNotice}>// Asignaciones temporales en esta Fase 1 para coordinadores y entrenadores.</Text>
              
              <View style={styles.fieldBox}>
                <Text style={styles.fieldLabel}>Deporte Asignado</Text>
                <View style={styles.optionsRow}>
                  {SPORTS.map(sp => (
                    <TouchableOpacity 
                      key={sp} 
                      style={[styles.optionChip, editedSport === sp && styles.optionChipActive]}
                      onPress={() => setEditedSport(sp)}
                    >
                      <Text style={[styles.optionChipTxt, editedSport === sp && styles.optionChipTxtActive]}>{sp}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Categoría</Text>
                <View style={styles.optionsRow}>
                  {CATEGORIES.map(cat => (
                    <TouchableOpacity 
                      key={cat} 
                      style={[styles.optionChip, editedCategory === cat && styles.optionChipActive]}
                      onPress={() => setEditedCategory(cat)}
                    >
                      <Text style={[styles.optionChipTxt, editedCategory === cat && styles.optionChipTxtActive]}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Equipo Asignado</Text>
                <View style={styles.optionsRow}>
                  {TEAMS.map(tm => (
                    <TouchableOpacity 
                      key={tm} 
                      style={[styles.optionChip, editedTeam === tm && styles.optionChipActive]}
                      onPress={() => setEditedTeam(tm)}
                    >
                      <Text style={[styles.optionChipTxt, editedTeam === tm && styles.optionChipTxtActive]}>{tm}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* ACCIONES FINAL DE MODAL */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveChanges}>
                <Text style={styles.saveBtnTxt}>Guardar Cambios</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* MODAL CREAR NUEVO USUARIO */}
      <Modal visible={isNewUserModalOpen} transparent animationType="fade" onRequestClose={() => setIsNewUserModalOpen(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>REGISTRAR NUEVO USUARIO</Text>
              <TouchableOpacity onPress={() => setIsNewUserModalOpen(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12, marginVertical: 14 }}>
              <Text style={styles.fieldLabel}>Nombre Completo</Text>
              <TextInput
                style={styles.textInputModal}
                placeholder="Ej. María López"
                placeholderTextColor="rgba(148, 163, 184, 0.6)"
                value={newFullName}
                onChangeText={setNewFullName}
              />

              <Text style={styles.fieldLabel}>Correo Electrónico</Text>
              <TextInput
                style={styles.textInputModal}
                placeholder="correo@ejemplo.com"
                placeholderTextColor="rgba(148, 163, 184, 0.6)"
                keyboardType="email-address"
                autoCapitalize="none"
                value={newEmail}
                onChangeText={setNewEmail}
              />

              <Text style={styles.fieldLabel}>Rol Inicial</Text>
              <View style={styles.optionsRow}>
                {ALL_ROLES.filter(r => r.id !== 'ADMIN_GENERAL').map(r => (
                  <TouchableOpacity
                    key={r.id}
                    style={[styles.optionChip, newRole === r.id && styles.optionChipActive]}
                    onPress={() => setNewRole(r.id)}
                  >
                    <Text style={[styles.optionChipTxt, newRole === r.id && styles.optionChipTxtActive]}>{r.id}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleCreateNewUser}>
              <Text style={styles.saveBtnTxt}>Registrar Usuario</Text>
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

  restrictedContainer: { flex: 1, backgroundColor: '#071A3D', justifyContent: 'center', alignItems: 'center', padding: 24, minHeight: 450 },
  restrictedTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '900', marginBottom: 6 },
  restrictedSub: { color: '#94A3B8', fontSize: 13, textAlign: 'center', lineHeight: 18, maxWidth: 360 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  badgeRow: { flexDirection: 'row', marginBottom: 6 },
  moduleBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)' },
  moduleBadgeText: { color: '#4FC3F7', fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  headerSub: { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
  newBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4FC3F7', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  newBtnTxt: { color: '#071A3D', fontSize: 12, fontWeight: '900' },

  metricsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  metricCard: { flex: 1, backgroundColor: 'rgba(11, 34, 79, 0.7)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.25)' },
  metricLabel: { color: '#94A3B8', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  metricValue: { color: '#FFFFFF', fontSize: 22, fontWeight: '900', marginTop: 4 },

  filterSection: { backgroundColor: 'rgba(11, 34, 79, 0.7)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.2)', marginBottom: 20, gap: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 12, paddingHorizontal: 12, height: 42, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13 },
  filterGroupLabel: { color: '#4FC3F7', fontSize: 11, fontWeight: '800', marginRight: 6 },
  filterPillsScroll: { alignItems: 'center', gap: 6 },
  statusPillsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  pill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  pillActive: { backgroundColor: '#4FC3F7', borderColor: '#4FC3F7' },
  pillTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  pillTxtActive: { color: '#071A3D', fontWeight: '900' },

  listContainer: { gap: 10 },
  emptyBox: { backgroundColor: 'rgba(11, 34, 79, 0.4)', borderRadius: 16, padding: 30, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  emptyTitle: { color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginTop: 10 },
  emptySub: { color: '#94A3B8', fontSize: 12, textAlign: 'center', marginTop: 4 },

  userCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(15, 30, 70, 0.7)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  userAvatarBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4FC3F7', justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { color: '#071A3D', fontSize: 18, fontWeight: '900' },
  userInfoCol: { flex: 1 },
  userNameRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  userName: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  userEmail: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusActive: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1, borderColor: '#10B981' },
  statusDisabled: { backgroundColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1, borderColor: '#EF4444' },
  statusPending: { backgroundColor: 'rgba(245, 158, 11, 0.2)', borderWidth: 1, borderColor: '#F59E0B' },
  statusBadgeTxt: { fontSize: 9, fontWeight: '900', color: '#FFFFFF' },
  rolesRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 },
  roleTag: { backgroundColor: 'rgba(79, 195, 247, 0.12)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleTagTxt: { color: '#81D4FA', fontSize: 10, fontWeight: '700' },
  manageBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4FC3F7' },
  manageBtnTxt: { color: '#4FC3F7', fontSize: 11, fontWeight: '800' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCard: { width: '100%', maxWidth: 540, backgroundColor: '#0B224F', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#4FC3F7' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
  
  feedbackBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 10, marginBottom: 12 },
  feedbackSuccess: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: '#10B981' },
  feedbackError: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: '#EF4444' },
  feedbackTxt: { fontSize: 12, fontWeight: '700', flex: 1 },

  sectionHeading: { color: '#4FC3F7', fontSize: 11, fontWeight: '900', letterSpacing: 1, marginTop: 14, marginBottom: 8 },
  assignmentNotice: { color: '#F59E0B', fontSize: 10, fontWeight: '700', marginBottom: 8 },

  fieldBox: { backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  fieldLabel: { color: '#81D4FA', fontSize: 11, fontWeight: '800' },
  fieldValue: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginTop: 2 },

  statusToggleRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  statusToggleBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statusActiveBtn: { backgroundColor: '#10B981', borderColor: '#10B981' },
  statusDisabledBtn: { backgroundColor: '#EF4444', borderColor: '#EF4444' },
  statusPendingBtn: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  statusToggleTxt: { color: '#FFFFFF', fontSize: 10, fontWeight: '900' },

  rolesGrid: { gap: 8 },
  roleSelectCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  roleSelectCardActive: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderColor: '#4FC3F7' },
  roleSelectHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  roleIcon: { fontSize: 16 },
  roleLabel: { flex: 1, color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  roleDesc: { color: '#94A3B8', fontSize: 11, marginTop: 4 },

  optionsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 },
  optionChip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  optionChipActive: { backgroundColor: '#4FC3F7', borderColor: '#4FC3F7' },
  optionChipTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  optionChipTxtActive: { color: '#071A3D', fontWeight: '900' },

  textInputModal: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: '#4FC3F7', borderRadius: 10, padding: 12, color: '#FFFFFF', fontSize: 13 },

  modalActions: { marginTop: 16 },
  saveBtn: { backgroundColor: '#4FC3F7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveBtnTxt: { color: '#071A3D', fontSize: 13, fontWeight: '900' }
});
