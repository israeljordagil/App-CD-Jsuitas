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
import { AppRole } from '../../src/types/roles';
import { 
  ManagedPerson, 
  ResponsibilityType, 
  TechnicalLicenseType, 
  PersonTeamAssignment,
  StaffPositionTitle
} from '../../src/types/people';

const ALL_ROLES: AppRole[] = [
  'ADMIN_GENERAL', 
  'DIR_DEPORTIVA', 
  'COORDINADOR', 
  'ENTRENADOR', 
  'FAMILIA', 
  'JUGADOR'
];

const ALL_RESPONSIBILITIES: ResponsibilityType[] = [
  'Administración',
  'Material',
  'Instalaciones',
  'Delegado de Campo',
  'Metodología',
  'Coordinador F8',
  'Coordinador F11',
  'Responsable Médico'
];

const LICENSES_LIST: TechnicalLicenseType[] = [
  'UEFA PRO',
  'UEFA A',
  'UEFA B',
  'UEFA C',
  'EPR',
  'Sin licencia'
];

const POSITIONS_LIST: StaffPositionTitle[] = [
  'Primer Entrenador',
  'Segundo Entrenador',
  'Coordinador de Categoría',
  'Delegado de Equipo',
  'Preparador Físico',
  'Entrenador de Porteros'
];

export default function PersonasScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  const { activeContext, managedPeople, updatePerson, createPerson } = useAuth();

  // Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [filterChip, setFilterChip] = useState<string>('TODOS');

  // Ficha de Persona seleccionada (Modal de 7 Pestañas)
  const [selectedPerson, setSelectedPerson] = useState<ManagedPerson | null>(null);
  const [activeTab, setActiveTab] = useState<number>(1); // 1: Datos, 2: Roles, 3: Resp, 4: Equipos, 5: Licencias, 6: Cuenta, 7: Historial

  // Campos temporales en edición
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [editedDocId, setEditedDocId] = useState('');
  const [editedPhone, setEditedPhone] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedStatus, setEditedStatus] = useState<'ACTIVE' | 'INACTIVE' | 'ARCHIVED'>('ACTIVE');
  const [editedRoles, setEditedRoles] = useState<AppRole[]>([]);
  const [editedResponsibilities, setEditedResponsibilities] = useState<ResponsibilityType[]>([]);
  const [editedLicense, setEditedLicense] = useState<TechnicalLicenseType>('Sin licencia');
  const [editedLicenseNum, setEditedLicenseNum] = useState('');
  const [editedHasAccess, setEditedHasAccess] = useState(false);

  // Nuevo Asignación de Equipo
  const [newTeamName, setNewTeamName] = useState('Infantil A');
  const [newPosition, setNewPosition] = useState<StaffPositionTitle>('Primer Entrenador');

  // Mensaje Feedback
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal Nueva Persona
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmailInput, setNewEmailInput] = useState('');
  const [newPhoneInput, setNewPhoneInput] = useState('');
  const [newInitialRole, setNewInitialRole] = useState<AppRole>('ENTRENADOR');

  // Restricción de acceso
  if (activeContext !== 'ADMIN_GENERAL' && activeContext !== 'DIR_DEPORTIVA' && activeContext !== 'COORDINADOR') {
    return (
      <View style={styles.restrictedContainer}>
        <Ionicons name="people-circle-outline" size={54} color="#4FC3F7" style={{ marginBottom: 12 }} />
        <Text style={styles.restrictedTitle}>Centro de Personas</Text>
        <Text style={styles.restrictedSub}>
          El acceso al núcleo de Personas requiere rol de Administración, Dirección Deportiva o Coordinación.
        </Text>
      </View>
    );
  }

  // Filtrado de Personas
  const filteredPeople = managedPeople.filter(p => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.fullName.toLowerCase().includes(query) ||
      (p.email && p.email.toLowerCase().includes(query)) ||
      p.teamAssignments.some(t => t.teamName.toLowerCase().includes(query)) ||
      p.roles.some(r => r.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (filterChip === 'TODOS') return true;
    if (filterChip === 'ENTRENADORES') return p.roles.includes('ENTRENADOR');
    if (filterChip === 'COORDINADORES') return p.roles.includes('COORDINADOR');
    if (filterChip === 'ADMINISTRACION') return p.roles.includes('ADMIN_GENERAL');
    if (filterChip === 'DIRECCION') return p.roles.includes('DIR_DEPORTIVA');
    if (filterChip === 'FAMILIAS') return p.roles.includes('FAMILIA');
    if (filterChip === 'JUGADORES') return p.roles.includes('JUGADOR');
    if (filterChip === 'ACTIVOS') return p.status === 'ACTIVE';
    if (filterChip === 'INACTIVOS') return p.status === 'INACTIVE';
    if (filterChip === 'CON_ACCESO') return p.account.hasAccess;
    if (filterChip === 'SIN_ACCESO') return !p.account.hasAccess;

    return true;
  });

  // Métricas de tarjetas superiores
  const totalCount = managedPeople.length;
  const coachCount = managedPeople.filter(p => p.roles.includes('ENTRENADOR')).length;
  const playerCount = managedPeople.filter(p => p.roles.includes('JUGADOR')).length;
  const familyCount = managedPeople.filter(p => p.roles.includes('FAMILIA')).length;
  const withAccessCount = managedPeople.filter(p => p.account.hasAccess).length;
  const withoutAccessCount = managedPeople.filter(p => !p.account.hasAccess).length;

  const handleOpenFicha = (person: ManagedPerson) => {
    setSelectedPerson(person);
    setActiveTab(1);
    setEditedFirstName(person.firstName);
    setEditedLastName(person.lastName);
    setEditedDocId(person.docId || '');
    setEditedPhone(person.phone || '');
    setEditedEmail(person.email || '');
    setEditedStatus(person.status);
    setEditedRoles([...person.roles]);
    setEditedResponsibilities([...person.responsibilities]);
    setEditedLicense(person.licenses[0]?.licenseType || 'Sin licencia');
    setEditedLicenseNum(person.licenses[0]?.licenseNumber || '');
    setEditedHasAccess(person.account.hasAccess);
    setFeedbackMsg(null);
  };

  const handleToggleRole = (role: AppRole) => {
    if (editedRoles.includes(role)) {
      setEditedRoles(prev => prev.filter(r => r !== role));
    } else {
      setEditedRoles(prev => [...prev, role]);
    }
  };

  const handleToggleResp = (resp: ResponsibilityType) => {
    if (editedResponsibilities.includes(resp)) {
      setEditedResponsibilities(prev => prev.filter(r => r !== resp));
    } else {
      setEditedResponsibilities(prev => [...prev, resp]);
    }
  };

  const handleAddTeamAssignment = () => {
    if (!selectedPerson) return;
    const newAss: PersonTeamAssignment = {
      id: `as-${Date.now()}`,
      teamId: `eq-${newTeamName.toLowerCase().replace(/\s+/g, '-')}`,
      teamName: newTeamName,
      category: newTeamName.split(' ')[0] || 'General',
      sport: 'Fútbol',
      positionTitle: newPosition,
      season: '2025/2026',
      isActive: true
    };

    const updatedAssignments = [...selectedPerson.teamAssignments, newAss];
    const updated = { ...selectedPerson, teamAssignments: updatedAssignments };
    setSelectedPerson(updated);
    updatePerson(updated);
    setFeedbackMsg({ type: 'success', text: `Asignación ${newTeamName} (${newPosition}) añadida.` });
  };

  const handleRemoveTeamAssignment = (assId: string) => {
    if (!selectedPerson) return;
    const updatedAssignments = selectedPerson.teamAssignments.filter(a => a.id !== assId);
    const updated = { ...selectedPerson, teamAssignments: updatedAssignments };
    setSelectedPerson(updated);
    updatePerson(updated);
  };

  const handleSavePerson = () => {
    if (!selectedPerson) return;
    if (!editedFirstName.trim() || !editedLastName.trim()) {
      setFeedbackMsg({ type: 'error', text: 'Nombre y apellidos son obligatorios.' });
      return;
    }

    const updatedPerson: ManagedPerson = {
      ...selectedPerson,
      firstName: editedFirstName.trim(),
      lastName: editedLastName.trim(),
      fullName: `${editedFirstName.trim()} ${editedLastName.trim()}`,
      docId: editedDocId.trim() || undefined,
      phone: editedPhone.trim() || undefined,
      email: editedEmail.trim().toLowerCase() || undefined,
      status: editedStatus,
      roles: editedRoles.length > 0 ? editedRoles : ['FAMILIA'],
      responsibilities: editedResponsibilities,
      licenses: [
        {
          id: selectedPerson.licenses[0]?.id || `lic-${Date.now()}`,
          licenseType: editedLicense,
          licenseNumber: editedLicenseNum.trim() || undefined,
          isValid: true
        }
      ],
      account: {
        ...selectedPerson.account,
        hasAccess: editedHasAccess,
        email: editedEmail.trim().toLowerCase() || selectedPerson.account.email
      },
      updatedAt: new Date().toISOString()
    };

    const res = updatePerson(updatedPerson);
    if (!res.success) {
      setFeedbackMsg({ type: 'error', text: res.error || 'Error al guardar persona.' });
    } else {
      setSelectedPerson(updatedPerson);
      setFeedbackMsg({ type: 'success', text: 'Expediente de persona guardado correctamente.' });
      setTimeout(() => setFeedbackMsg(null), 1500);
    }
  };

  const handleCreatePerson = () => {
    if (!newFirstName.trim() || !newLastName.trim()) {
      Alert.alert('Datos Incompletos', 'Introduce nombre y apellidos de la persona.');
      return;
    }

    const res = createPerson({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmailInput,
      phone: newPhoneInput,
      roles: [newInitialRole]
    });

    if (!res.success) {
      Alert.alert('Error', res.error || 'No se pudo crear la persona.');
    } else {
      setIsNewModalOpen(false);
      setNewFirstName('');
      setNewLastName('');
      setNewEmailInput('');
      setNewPhoneInput('');
      Alert.alert('Éxito', 'Persona registrada en el sistema.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      
      {/* CABECERA */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={styles.badgeRow}>
            <View style={styles.moduleBadge}>
              <Ionicons name="sparkles" size={14} color="#4FC3F7" />
              <Text style={styles.moduleBadgeText}>NÚCLEO DEL CLUB</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>👥 PERSONAS</Text>
          <Text style={styles.headerSub}>Centro de gestión de todas las personas del club.</Text>
        </View>

        <TouchableOpacity style={styles.newBtn} onPress={() => setIsNewModalOpen(true)}>
          <Ionicons name="person-add" size={16} color="#071A3D" />
          <Text style={styles.newBtnTxt}>+ Nueva Persona</Text>
        </TouchableOpacity>
      </View>

      {/* METRICAS SUPERIORES */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>PERSONAS</Text>
          <Text style={styles.metricValue}>{totalCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>ENTRENADORES</Text>
          <Text style={[styles.metricValue, { color: '#4FC3F7' }]}>{coachCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>JUGADORES</Text>
          <Text style={[styles.metricValue, { color: '#F59E0B' }]}>{playerCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>FAMILIAS</Text>
          <Text style={[styles.metricValue, { color: '#A7F3D0' }]}>{familyCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>CON ACCESO</Text>
          <Text style={[styles.metricValue, { color: '#10B981' }]}>{withAccessCount}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>SIN ACCESO</Text>
          <Text style={[styles.metricValue, { color: '#94A3B8' }]}>{withoutAccessCount}</Text>
        </View>
      </View>

      {/* BUSCADOR Y FILTROS */}
      <View style={styles.filterBox}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar persona por nombre, apellidos, equipo o rol..."
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, marginTop: 10 }}>
          {[
            { id: 'TODOS', label: 'Todos' },
            { id: 'ENTRENADORES', label: 'Entrenadores' },
            { id: 'COORDINADORES', label: 'Coordinadores' },
            { id: 'ADMINISTRACION', label: 'Administración' },
            { id: 'DIRECCION', label: 'Dirección' },
            { id: 'FAMILIAS', label: 'Familias' },
            { id: 'JUGADORES', label: 'Jugadores' },
            { id: 'ACTIVOS', label: 'Activos' },
            { id: 'INACTIVOS', label: 'Inactivos' },
            { id: 'CON_ACCESO', label: 'Con acceso' },
            { id: 'SIN_ACCESO', label: 'Sin acceso' },
          ].map(chip => (
            <TouchableOpacity
              key={chip.id}
              style={[styles.chip, filterChip === chip.id && styles.chipActive]}
              onPress={() => setFilterChip(chip.id)}
            >
              <Text style={[styles.chipTxt, filterChip === chip.id && styles.chipTxtActive]}>{chip.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* LISTADO DE PERSONAS */}
      <View style={styles.listSection}>
        {filteredPeople.map(person => (
          <View key={person.id} style={styles.personCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarTxt}>{person.firstName.charAt(0)}{person.lastName.charAt(0)}</Text>
            </View>

            <View style={{ flex: 1 }}>
              <View style={styles.personHeaderRow}>
                <Text style={styles.personName}>{person.fullName}</Text>
                <View style={[styles.accessBadge, person.account.hasAccess ? styles.accessGreen : styles.accessGrey]}>
                  <Text style={styles.accessBadgeTxt}>{person.account.hasAccess ? 'CON ACCESO' : 'SIN ACCESO'}</Text>
                </View>
              </View>

              {person.email && <Text style={styles.personSub}>{person.email} • {person.phone || 'Sin tel.'}</Text>}

              {/* Roles */}
              <View style={styles.tagsRow}>
                {person.roles.map(r => (
                  <View key={r} style={styles.roleBadge}>
                    <Text style={styles.roleBadgeTxt}>{r}</Text>
                  </View>
                ))}

                {person.responsibilities.map(resp => (
                  <View key={resp} style={styles.respBadge}>
                    <Text style={styles.respBadgeTxt}>📌 {resp}</Text>
                  </View>
                ))}
              </View>

              {/* Equipos Asignados */}
              {person.teamAssignments.length > 0 && (
                <View style={styles.teamsRow}>
                  <Ionicons name="shirt-outline" size={12} color="#4FC3F7" />
                  <Text style={styles.teamsTxt}>
                    {person.teamAssignments.map(a => `${a.teamName} (${a.positionTitle})`).join(' • ')}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.viewFichaBtn} onPress={() => handleOpenFicha(person)}>
              <Text style={styles.viewFichaBtnTxt}>Ver Ficha</Text>
              <Ionicons name="chevron-forward" size={14} color="#4FC3F7" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* MODAL FICHA INTEGRAL DE PERSONA (7 PESTAÑAS) */}
      <Modal visible={!!selectedPerson} transparent animationType="fade" onRequestClose={() => setSelectedPerson(null)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCardLarge}>
            
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>EXPEDIENTE DE PERSONA</Text>
                <Text style={styles.modalSub}>{selectedPerson?.fullName} ({selectedPerson?.id})</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedPerson(null)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* PESTAÑAS (1 a 7) */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsRow}>
              {[
                { id: 1, label: '1. Datos' },
                { id: 2, label: '2. Roles' },
                { id: 3, label: '3. Responsabilidades' },
                { id: 4, label: '4. Equipos' },
                { id: 5, label: '5. Licencias' },
                { id: 6, label: '6. Cuenta App' },
                { id: 7, label: '7. Historial' },
              ].map(tb => (
                <TouchableOpacity
                  key={tb.id}
                  style={[styles.tabBtn, activeTab === tb.id && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tb.id)}
                >
                  <Text style={[styles.tabBtnTxt, activeTab === tb.id && styles.tabBtnTxtActive]}>{tb.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

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

            <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
              
              {/* TAB 1: DATOS PERSONALES */}
              {activeTab === 1 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.fieldLabel}>Nombre</Text>
                  <TextInput style={styles.inputModal} value={editedFirstName} onChangeText={setEditedFirstName} />

                  <Text style={styles.fieldLabel}>Apellidos</Text>
                  <TextInput style={styles.inputModal} value={editedLastName} onChangeText={setEditedLastName} />

                  <Text style={styles.fieldLabel}>DNI / Pasaporte</Text>
                  <TextInput style={styles.inputModal} value={editedDocId} onChangeText={setEditedDocId} />

                  <Text style={styles.fieldLabel}>Teléfono de Contacto</Text>
                  <TextInput style={styles.inputModal} value={editedPhone} onChangeText={setEditedPhone} />

                  <Text style={styles.fieldLabel}>Correo Electrónico</Text>
                  <TextInput style={styles.inputModal} value={editedEmail} onChangeText={setEditedEmail} autoCapitalize="none" />

                  <Text style={styles.fieldLabel}>Estado en el Club</Text>
                  <View style={styles.optionsRow}>
                    {['ACTIVE', 'INACTIVE', 'ARCHIVED'].map(st => (
                      <TouchableOpacity
                        key={st}
                        style={[styles.chip, editedStatus === st && styles.chipActive]}
                        onPress={() => setEditedStatus(st as any)}
                      >
                        <Text style={[styles.chipTxt, editedStatus === st && styles.chipTxtActive]}>{st}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* TAB 2: ROLES */}
              {activeTab === 2 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Roles Asignados a la Persona</Text>
                  <View style={styles.grid2}>
                    {ALL_ROLES.map(role => {
                      const isChecked = editedRoles.includes(role);
                      return (
                        <TouchableOpacity 
                          key={role} 
                          style={[styles.checkCard, isChecked && styles.checkCardActive]}
                          onPress={() => handleToggleRole(role)}
                        >
                          <Text style={styles.checkCardTxt}>{role}</Text>
                          {isChecked && <Ionicons name="checkmark-circle" size={18} color="#4FC3F7" />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* TAB 3: RESPONSABILIDADES */}
              {activeTab === 3 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Responsabilidades Institucionales (Separadas de Roles)</Text>
                  <View style={styles.grid2}>
                    {ALL_RESPONSIBILITIES.map(resp => {
                      const isChecked = editedResponsibilities.includes(resp);
                      return (
                        <TouchableOpacity 
                          key={resp} 
                          style={[styles.checkCard, isChecked && styles.checkCardActive]}
                          onPress={() => handleToggleResp(resp)}
                        >
                          <Text style={styles.checkCardTxt}>{resp}</Text>
                          {isChecked && <Ionicons name="checkmark-circle" size={18} color="#4FC3F7" />}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {/* TAB 4: EQUIPOS Y ASIGNACIONES */}
              {activeTab === 4 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Equipos Asignados (Múltiples equipos permitidos)</Text>
                  
                  {selectedPerson?.teamAssignments.map(ass => (
                    <View key={ass.id} style={styles.assignmentItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.assignmentTitle}>{ass.teamName}</Text>
                        <Text style={styles.assignmentSub}>{ass.positionTitle} • Temporada {ass.season}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleRemoveTeamAssignment(ass.id)}>
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  ))}

                  <Text style={[styles.fieldLabel, { marginTop: 14 }]}>+ Asignar Nuevo Equipo</Text>
                  <View style={{ gap: 8, marginTop: 4 }}>
                    <TextInput 
                      style={styles.inputModal} 
                      placeholder="Nombre del equipo (ej. Prebenjamín A)" 
                      placeholderTextColor="#94A3B8"
                      value={newTeamName}
                      onChangeText={setNewTeamName}
                    />

                    <View style={styles.optionsRow}>
                      {POSITIONS_LIST.map(pos => (
                        <TouchableOpacity 
                          key={pos}
                          style={[styles.chip, newPosition === pos && styles.chipActive]}
                          onPress={() => setNewPosition(pos)}
                        >
                          <Text style={[styles.chipTxt, newPosition === pos && styles.chipTxtActive]}>{pos}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TouchableOpacity style={styles.addAssBtn} onPress={handleAddTeamAssignment}>
                      <Text style={styles.addAssBtnTxt}>Añadir Asignación de Equipo</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* TAB 5: LICENCIAS */}
              {activeTab === 5 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Licencia Técnica de Federación</Text>

                  <Text style={styles.fieldLabel}>Tipo de Licencia</Text>
                  <View style={styles.optionsRow}>
                    {LICENSES_LIST.map(lic => (
                      <TouchableOpacity
                        key={lic}
                        style={[styles.chip, editedLicense === lic && styles.chipActive]}
                        onPress={() => setEditedLicense(lic)}
                      >
                        <Text style={[styles.chipTxt, editedLicense === lic && styles.chipTxtActive]}>{lic}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <Text style={[styles.fieldLabel, { marginTop: 10 }]}>Número de Licencia / NIF Colegiado</Text>
                  <TextInput style={styles.inputModal} value={editedLicenseNum} onChangeText={setEditedLicenseNum} placeholder="Ej. FFCV-998201" placeholderTextColor="#94A3B8" />
                </View>
              )}

              {/* TAB 6: CUENTA APP */}
              {activeTab === 6 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Acceso a la App (Supabase Auth)</Text>
                  <Text style={styles.infoTxt}>
                    Una persona puede existir en el club sin necesidad de tener acceso a la aplicación.
                  </Text>

                  <TouchableOpacity 
                    style={[styles.accessToggleCard, editedHasAccess ? styles.accessToggleGreen : styles.accessToggleGrey]}
                    onPress={() => setEditedHasAccess(!editedHasAccess)}
                  >
                    <Ionicons name={editedHasAccess ? "checkmark-circle" : "ellipse-outline"} size={22} color="#FFFFFF" />
                    <Text style={styles.accessToggleTxt}>
                      {editedHasAccess ? 'Cuenta de acceso ACTIVADA' : 'Persona SIN ACCESO a la App'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* TAB 7: HISTORIAL */}
              {activeTab === 7 && (
                <View style={styles.tabContentBox}>
                  <Text style={styles.tabHeading}>Historial Inmutable de Cargos y Temporadas</Text>

                  {selectedPerson?.history.map(item => (
                    <View key={item.id} style={styles.historyCard}>
                      <View style={styles.historyBadge}>
                        <Text style={styles.historyBadgeTxt}>{item.season}</Text>
                      </View>
                      <Text style={styles.historySummary}>{item.summaryRole}</Text>
                    </View>
                  ))}
                </View>
              )}

            </ScrollView>

            {/* BOTÓN DE GUARDAR GLOBAL DE LA FICHA */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSavePerson}>
                <Text style={styles.saveBtnTxt}>Guardar Expediente de Persona</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

      {/* MODAL REGISTRAR NUEVA PERSONA */}
      <Modal visible={isNewModalOpen} transparent animationType="fade" onRequestClose={() => setIsNewModalOpen(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>REGISTRAR NUEVA PERSONA</Text>
              <TouchableOpacity onPress={() => setIsNewModalOpen(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 10, marginVertical: 10 }}>
              <Text style={styles.fieldLabel}>Nombre</Text>
              <TextInput style={styles.inputModal} placeholder="Ej. Raúl" placeholderTextColor="#94A3B8" value={newFirstName} onChangeText={setNewFirstName} />

              <Text style={styles.fieldLabel}>Apellidos</Text>
              <TextInput style={styles.inputModal} placeholder="Ej. Fuentes" placeholderTextColor="#94A3B8" value={newLastName} onChangeText={setNewLastName} />

              <Text style={styles.fieldLabel}>Correo Electrónico (Opcional)</Text>
              <TextInput style={styles.inputModal} placeholder="correo@ejemplo.com" placeholderTextColor="#94A3B8" value={newEmailInput} onChangeText={setNewEmailInput} autoCapitalize="none" />

              <Text style={styles.fieldLabel}>Rol Inicial</Text>
              <View style={styles.optionsRow}>
                {ALL_ROLES.map(r => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.chip, newInitialRole === r && styles.chipActive]}
                    onPress={() => setNewInitialRole(r)}
                  >
                    <Text style={[styles.chipTxt, newInitialRole === r && styles.chipTxtActive]}>{r}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleCreatePerson}>
              <Text style={styles.saveBtnTxt}>Crear Registro en PERSONAS</Text>
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

  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  chipActive: { backgroundColor: '#4FC3F7', borderColor: '#4FC3F7' },
  chipTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  chipTxtActive: { color: '#071A3D', fontWeight: '900' },

  listSection: { gap: 10 },
  personCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(15, 30, 70, 0.7)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4FC3F7', justifyContent: 'center', alignItems: 'center' },
  avatarTxt: { color: '#071A3D', fontSize: 16, fontWeight: '900' },
  personHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  personName: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  personSub: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  accessBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  accessGreen: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderWidth: 1, borderColor: '#10B981' },
  accessGrey: { backgroundColor: 'rgba(148, 163, 184, 0.2)', borderWidth: 1, borderColor: '#94A3B8' },
  accessBadgeTxt: { fontSize: 9, fontWeight: '900', color: '#FFFFFF' },

  tagsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 },
  roleBadge: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  roleBadgeTxt: { color: '#81D4FA', fontSize: 10, fontWeight: '800' },
  respBadge: { backgroundColor: 'rgba(245, 158, 11, 0.15)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  respBadgeTxt: { color: '#F59E0B', fontSize: 10, fontWeight: '800' },

  teamsRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  teamsTxt: { color: '#4FC3F7', fontSize: 11, fontWeight: '700' },

  viewFichaBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#4FC3F7' },
  viewFichaBtnTxt: { color: '#4FC3F7', fontSize: 11, fontWeight: '800' },

  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCardLarge: { width: '100%', maxWidth: 640, backgroundColor: '#0B224F', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#4FC3F7' },
  modalCard: { width: '100%', maxWidth: 500, backgroundColor: '#0B224F', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#4FC3F7' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  modalTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '900' },
  modalSub: { color: '#94A3B8', fontSize: 12, marginTop: 2 },

  tabsRow: { flexDirection: 'row', gap: 6, marginBottom: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)', paddingBottom: 8 },
  tabBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)' },
  tabBtnActive: { backgroundColor: '#4FC3F7' },
  tabBtnTxt: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  tabBtnTxtActive: { color: '#071A3D', fontWeight: '900' },

  tabContentBox: { gap: 10, paddingVertical: 4 },
  tabHeading: { color: '#4FC3F7', fontSize: 12, fontWeight: '900', marginBottom: 4 },
  fieldLabel: { color: '#81D4FA', fontSize: 11, fontWeight: '800' },
  inputModal: { backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1, borderColor: '#4FC3F7', borderRadius: 10, padding: 10, color: '#FFFFFF', fontSize: 13 },
  optionsRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  checkCard: { flex: 1, minWidth: 140, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  checkCardActive: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderColor: '#4FC3F7' },
  checkCardTxt: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },

  assignmentItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  assignmentTitle: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  assignmentSub: { color: '#94A3B8', fontSize: 11, marginTop: 2 },
  addAssBtn: { backgroundColor: 'rgba(79, 195, 247, 0.2)', paddingVertical: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#4FC3F7', marginTop: 6 },
  addAssBtnTxt: { color: '#4FC3F7', fontSize: 12, fontWeight: '900' },

  infoTxt: { color: '#94A3B8', fontSize: 12, lineHeight: 16 },
  accessToggleCard: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1, marginTop: 8 },
  accessToggleGreen: { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981' },
  accessToggleGrey: { backgroundColor: 'rgba(148, 163, 184, 0.2)', borderColor: '#94A3B8' },
  accessToggleTxt: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },

  historyCard: { backgroundColor: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  historyBadge: { backgroundColor: 'rgba(245, 158, 11, 0.2)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
  historyBadgeTxt: { color: '#F59E0B', fontSize: 10, fontWeight: '900' },
  historySummary: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', marginTop: 6 },

  feedbackBox: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, borderRadius: 10, marginBottom: 12 },
  feedbackSuccess: { backgroundColor: 'rgba(16, 185, 129, 0.15)', borderWidth: 1, borderColor: '#10B981' },
  feedbackError: { backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: '#EF4444' },
  feedbackTxt: { fontSize: 12, fontWeight: '700', flex: 1 },

  modalActions: { marginTop: 14 },
  saveBtn: { backgroundColor: '#4FC3F7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  saveBtnTxt: { color: '#071A3D', fontSize: 13, fontWeight: '900' }
});
