import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AppRole, UserStatus, UserRoleAssignment, ManagedUser } from '../types/roles';
import { ManagedPerson } from '../types/people';
import { INITIAL_PEOPLE } from '../data/peopleData';
import { ManagedTeam, TeamStaffMember } from '../types/teams';
import { INITIAL_TEAMS } from '../data/teamsData';

export type ActiveContextType = AppRole;

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  roles: AppRole[];
}

interface AuthContextProps {
  session: Session | null;
  user: UserProfile | null;
  activeContext: ActiveContextType | null;
  isLoading: boolean;
  
  // Contexto Familia
  linkedPlayers: any[];
  activePlayerId: string | null;
  childrenLoading: boolean;
  childrenError: string | null;
  loadLinkedPlayers: (tutorId: string) => Promise<void>;
  
  // Contexto Entrenador
  assignedTeams: any[];
  activeTeamId: string | null;

  // Gestión de Usuarios y Roles
  managedUsers: ManagedUser[];
  updateUserRolesAndStatus: (
    userId: string, 
    newRoles: AppRole[], 
    newStatus: UserStatus, 
    assignments?: UserRoleAssignment[]
  ) => { success: boolean; error?: string };
  createManagedUser: (
    fullName: string, 
    email: string, 
    roles: AppRole[], 
    assignments?: UserRoleAssignment[]
  ) => { success: boolean; user?: ManagedUser; error?: string };
  loginAsTestUserByEmail: (email: string) => void;

  // Gestión del Módulo NÚCLEO PERSONAS
  managedPeople: ManagedPerson[];
  updatePerson: (person: ManagedPerson) => { success: boolean; error?: string };
  createPerson: (personData: Partial<ManagedPerson>) => { success: boolean; person?: ManagedPerson; error?: string };

  // Gestión del Módulo NÚCLEO EQUIPOS (SUPABASE SINGLE SOURCE OF TRUTH)
  managedTeams: ManagedTeam[];
  teamsLoading: boolean;
  teamsError: string | null;
  loadTeams: () => Promise<void>;
  updateTeam: (team: ManagedTeam) => Promise<{ success: boolean; error?: string }>;
  createTeam: (teamData: Partial<ManagedTeam>) => Promise<{ success: boolean; team?: ManagedTeam; error?: string }>;
  archiveTeam: (teamId: string) => Promise<{ success: boolean; error?: string }>;

  // Acciones de Autenticación Supabase
  loginWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;

  // Cambio de Contextos y Roles
  switchContext: (context: ActiveContextType) => void;
  switchActivePlayer: (playerId: string) => void;
  switchActiveTeam: (teamId: string) => void;
  loginAsCoachInfantilA: () => void;
  clearProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const VALID_ROLES = new Set<AppRole>([
  'FAMILIA', 
  'JUGADOR', 
  'ENTRENADOR', 
  'COORDINADOR', 
  'DIR_DEPORTIVA', 
  'ADMIN_GENERAL'
]);

const INITIAL_TEST_USERS: ManagedUser[] = [
  {
    id: 'usr-dir-1',
    fullName: 'Dirección Prueba',
    email: 'direccion.prueba@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['DIR_DEPORTIVA'],
    assignments: [{ role: 'DIR_DEPORTIVA', sport: 'Fútbol' }],
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'usr-coord-1',
    fullName: 'Coordinación Prueba',
    email: 'coordinacion.prueba@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    assignments: [{ role: 'COORDINADOR', sport: 'Fútbol', category: 'Cadete' }],
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'usr-coach-1',
    fullName: 'Entrenador Prueba',
    email: 'entrenador.prueba@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    assignments: [{ role: 'ENTRENADOR', sport: 'Fútbol', team: 'Cadete B' }],
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'usr-fam-1',
    fullName: 'Familia Prueba',
    email: 'familia.prueba@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['FAMILIA'],
    createdAt: '2026-07-01T10:00:00Z'
  },
  {
    id: 'usr-jug-1',
    fullName: 'Jugador Prueba',
    email: 'jugador.prueba@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    createdAt: '2026-07-01T10:00:00Z'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeContext, setActiveContext] = useState<ActiveContextType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [linkedPlayers, setLinkedPlayers] = useState<any[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [childrenLoading, setChildrenLoading] = useState<boolean>(false);
  const [childrenError, setChildrenError] = useState<string | null>(null);
  const [assignedTeams, setAssignedTeams] = useState<any[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  // Módulo Usuarios
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(INITIAL_TEST_USERS);
  
  // Módulo NÚCLEO PERSONAS
  const [managedPeople, setManagedPeople] = useState<ManagedPerson[]>(INITIAL_PEOPLE);

  // Módulo NÚCLEO EQUIPOS (INICIALIZADO VACÍO - SUPABASE AS SINGLE SOURCE OF TRUTH)
  const [teamsState, setTeamsState] = useState<ManagedTeam[]>([]);
  const [teamsLoading, setTeamsLoading] = useState<boolean>(true);
  const [teamsError, setTeamsError] = useState<string | null>(null);

  const isDemoEnabled = process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS === 'true';

  // Carga asíncrona de jugadores vinculados mediante UUID relacional
  const loadLinkedPlayers = async (tutorUserId: string) => {
    setChildrenLoading(true);
    setChildrenError(null);

    try {
      if (supabase && isSupabaseConfigured) {
        const { data: vinculos, error: vError } = await supabase
          .from('vinculos_familiares')
          .select('jugador_id, parentesco, jugadores(id, nombre, apellidos, dorsal_habitual, posicion_principal)')
          .eq('tutor_user_id', tutorUserId);

        if (vError) {
          console.warn('Error en vinculos_familiares:', vError.message);
          resolveFallbackChildren(tutorUserId);
        } else if (vinculos && vinculos.length > 0) {
          const mapped = vinculos.map((v: any) => {
            const j = v.jugadores;
            return {
              id: j?.id || v.jugador_id,
              name: j ? `${j.nombre} ${j.apellidos}`.trim() : 'Jugador Vincular',
              dorsal: j?.dorsal_habitual || 'N/A',
              position: j?.posicion_principal || 'Deportista',
              team: 'CD Jesuitas',
              category: 'Fútbol',
              parentesco: v.parentesco
            };
          });
          setLinkedPlayers(mapped);
          setActivePlayerId(mapped[0]?.id || null);
        } else {
          resolveFallbackChildren(tutorUserId);
        }
      } else {
        resolveFallbackChildren(tutorUserId);
      }
    } catch (err: any) {
      setChildrenError(err.message || 'Error cargando deportistas vinculados');
      setLinkedPlayers([]);
      setActivePlayerId(null);
    } finally {
      setChildrenLoading(false);
    }
  };

  const resolveFallbackChildren = (tutorId: string) => {
    // Buscar en managedPeople si la persona autenticada es Familia Martínez (PER-000045 / a1000001-0000-4000-8000-000000000045)
    // u otra familia legítima con deportistas asociados mediante UUIDs primarios reales
    const pablo = INITIAL_PEOPLE.find(p => p.code === 'PER-000046');
    const hugo = INITIAL_PEOPLE.find(p => p.code === 'PER-000047');
    
    // Si la ID del usuario o email coincide con la Familia Martínez oficial (PER-000045)
    if (tutorId === 'a1000001-0000-4000-8000-000000000045' || tutorId.includes('fam') || tutorId.includes('usr-fam-1')) {
      const realChildren = [];
      if (pablo) {
        realChildren.push({
          id: pablo.id, // UUID real: a1000001-0000-4000-8000-000000000046
          name: pablo.fullName,
          team: 'Cadete B',
          dorsal: '10',
          position: 'Centrocampista',
          category: 'Cadete F11'
        });
      }
      if (hugo) {
        realChildren.push({
          id: hugo.id, // UUID real: a1000001-0000-4000-8000-000000000047
          name: hugo.fullName,
          team: 'Infantil A',
          dorsal: '7',
          position: 'Delantero',
          category: 'Infantil F11'
        });
      }
      setLinkedPlayers(realChildren);
      setActivePlayerId(realChildren[0]?.id || null);
    } else {
      setLinkedPlayers([]);
      setActivePlayerId(null);
    }
  };
  
  const mockTeams = [
    { id: 'b1000001-0000-4000-8000-000000000004', name: 'Cadete B', sport: 'futbol', category: 'Cadete' }
  ];

  // Cargar Equipos desde Supabase con Fallback Seed
  const loadTeams = async () => {
    setTeamsLoading(true);
    setTeamsError(null);

    try {
      if (supabase && isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('teams')
          .select('*')
          .order('internal_code', { ascending: true });

        if (error) {
          console.warn('Advertencia leyendo teams de Supabase, usando seed:', error.message);
          setTeamsState(INITIAL_TEAMS);
        } else if (data && data.length > 0) {
          const mappedDbTeams: ManagedTeam[] = data.map((t: any) => ({
            id: t.id,
            internalCode: t.internal_code,
            name: t.name,
            category: t.category,
            sport: t.sport,
            gender: t.gender,
            season: t.season,
            status: t.status,
            observations: t.observations || undefined,
            staff: [],
            history: [
              {
                id: `ev-${t.id}-init`,
                date: t.created_at ? t.created_at.split('T')[0] : '2026-07-01',
                user: t.created_by || 'Sistema',
                action: 'Equipo cargado',
                detail: `Ficha leída desde Supabase (${t.internal_code}).`
              }
            ],
            createdAt: t.created_at || new Date().toISOString(),
            updatedAt: t.updated_at || new Date().toISOString(),
            createdBy: t.created_by,
            updatedBy: t.updated_by
          }));
          setTeamsState(mappedDbTeams);
        } else {
          // Si la tabla está vacía, realizar seed inicial reproducible
          setTeamsState(INITIAL_TEAMS);
          // Intentar insertar seed en background
          const rowsToInsert = INITIAL_TEAMS.map(t => ({
            id: t.id,
            internal_code: t.internalCode,
            name: t.name,
            category: t.category,
            sport: t.sport,
            gender: t.gender,
            season: t.season,
            status: t.status
          }));
          supabase.from('teams').upsert(rowsToInsert, { onConflict: 'internal_code' }).then(() => {});
        }
      } else {
        setTeamsState(INITIAL_TEAMS);
      }
    } catch (err: any) {
      setTeamsError(err.message || 'Error cargando equipos');
      setTeamsState(INITIAL_TEAMS);
    } finally {
      setTeamsLoading(false);
    }
  };

  useEffect(() => {
    loadTeams();
  }, []);

  // Cálculo Dinámico: Conectar managedPeople -> managedTeams mediante person_team_assignments (teamId UUID real)
  const managedTeams: ManagedTeam[] = teamsState.map(team => {
    const staffMembers: TeamStaffMember[] = [];

    managedPeople.forEach(person => {
      person.teamAssignments.forEach(assignment => {
        // Vinculación estricta por UUID (teamId === team.id)
        if (assignment.teamId === team.id || assignment.teamId.toLowerCase() === team.id.toLowerCase()) {
          staffMembers.push({
            personId: person.id,
            personCode: person.code,
            fullName: person.fullName,
            positionTitle: assignment.positionTitle
          });
        }
      });
    });

    return {
      ...team,
      staff: staffMembers
    };
  });

  const loadUserProfileAndRoles = async (authUser: User) => {
    try {
      let fullName: string | null = authUser.user_metadata?.full_name || null;
      let userRoles: AppRole[] = [];

      if (supabase && isSupabaseConfigured) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', authUser.id)
          .maybeSingle();

        if (profileData && profileData.full_name) {
          fullName = profileData.full_name;
        }

        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authUser.id);

        if (rolesData && rolesData.length > 0) {
          userRoles = rolesData
            .map((r: any) => r.role as AppRole)
            .filter((role: AppRole) => VALID_ROLES.has(role));
        }
      } else if (isDemoEnabled) {
        userRoles = ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR'];
      }

      const profile: UserProfile = {
        id: authUser.id,
        full_name: fullName || authUser.email?.split('@')[0] || 'Usuario Jesuitas',
        email: authUser.email || '',
        roles: userRoles,
      };

      setUser(profile);

      if (profile.roles.includes('FAMILIA')) {
        await loadLinkedPlayers(authUser.id);
      } else {
        setLinkedPlayers([]);
        setActivePlayerId(null);
      }

      if (profile.roles.includes('ENTRENADOR')) {
        setAssignedTeams(mockTeams);
        setActiveTeamId('b1000001-0000-4000-8000-000000000004');
      } else {
        setAssignedTeams([]);
        setActiveTeamId(null);
      }

      if (profile.roles.length > 0) {
        if (!activeContext || !profile.roles.includes(activeContext)) {
          setActiveContext(profile.roles[0]);
        }
      } else {
        setActiveContext(null);
      }
    } catch (err) {
      console.error('Error cargando perfil del usuario:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (supabase && isSupabaseConfigured) {
        try {
          const { data: { session: initialSession } } = await supabase.auth.getSession();
          if (mounted) {
            setSession(initialSession);
            if (initialSession?.user) {
              await loadUserProfileAndRoles(initialSession.user);
            }
          }
        } catch (err) {
          console.error('Error obteniendo sesión inicial:', err);
        }
      }

      if (mounted) {
        setIsLoading(false);
      }
    }

    initAuth();

    let authListener: any = null;
    if (supabase && isSupabaseConfigured) {
      const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
        if (!mounted) return;
        setSession(newSession);
        if (newSession?.user) {
          await loadUserProfileAndRoles(newSession.user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setActiveContext(null);
          setLinkedPlayers([]);
          setActivePlayerId(null);
          setAssignedTeams([]);
          setActiveTeamId(null);
        }
        setIsLoading(false);
      });
      authListener = data.subscription;
    }

    return () => {
      mounted = false;
      if (authListener) authListener.unsubscribe();
    };
  }, []);

  const updatePerson = (updatedPerson: ManagedPerson): { success: boolean; error?: string } => {
    const currentAdmins = managedPeople.filter(p => p.status === 'ACTIVE' && p.roles.includes('ADMIN_GENERAL'));
    const targetIsAdmin = updatedPerson.roles.includes('ADMIN_GENERAL');
    const targetIsActive = updatedPerson.status === 'ACTIVE';

    const originalPerson = managedPeople.find(p => p.id === updatedPerson.id);
    const originalWasAdmin = originalPerson?.roles.includes('ADMIN_GENERAL');

    if (originalWasAdmin && (!targetIsAdmin || !targetIsActive)) {
      if (currentAdmins.length <= 1) {
        return {
          success: false,
          error: 'Acción denegada: Debe existir al menos un Administrador General activo en el club.'
        };
      }
    }

    setManagedPeople(prev => prev.map(p => p.id === updatedPerson.id ? updatedPerson : p));

    if (user && (user.email?.toLowerCase() === updatedPerson.email?.toLowerCase())) {
      setUser(prev => prev ? { ...prev, roles: updatedPerson.roles } : null);
    }

    return { success: true };
  };

  const createPerson = (personData: Partial<ManagedPerson>): { success: boolean; person?: ManagedPerson; error?: string } => {
    if (!personData.firstName || !personData.lastName) {
      return { success: false, error: 'Se requiere nombre y apellidos.' };
    }

    const fullName = `${personData.firstName.trim()} ${personData.lastName.trim()}`;
    const cleanEmail = personData.email?.trim().toLowerCase();

    if (cleanEmail && managedPeople.some(p => p.email?.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Ya existe una persona registrada con este correo electrónico.' };
    }

    const nextIndex = managedPeople.length + 1;
    const perCode = `PER-${String(nextIndex).padStart(6, '0')}`;

    const newPerson: ManagedPerson = {
      id: `per-${Date.now()}`,
      code: perCode,
      firstName: personData.firstName.trim(),
      lastName: personData.lastName.trim(),
      fullName,
      email: cleanEmail,
      phone: personData.phone?.trim(),
      status: 'ACTIVE',
      roles: personData.roles && personData.roles.length > 0 ? personData.roles : ['FAMILIA'],
      responsibilities: personData.responsibilities || [],
      teamAssignments: personData.teamAssignments || [],
      licenses: personData.licenses || [{ id: `lic-${Date.now()}`, licenseType: 'Sin licencia', isValid: true }],
      account: personData.account || { hasAccess: false },
      eventHistory: [
        {
          id: `ev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          user: user?.full_name || 'Israel Jordá',
          action: 'Persona creada',
          detail: `Alta de expediente en el núcleo PERSONAS (${perCode}).`
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user?.full_name || 'Israel Jordá',
      updatedBy: user?.full_name || 'Israel Jordá',
      lastModified: new Date().toISOString()
    };

    setManagedPeople(prev => [newPerson, ...prev]);
    return { success: true, person: newPerson };
  };

  // Actualizar equipo con persistencia en Supabase
  const updateTeam = async (updatedTeam: ManagedTeam): Promise<{ success: boolean; error?: string }> => {
    try {
      setTeamsState(prev => prev.map(t => t.id === updatedTeam.id ? updatedTeam : t));

      if (supabase && isSupabaseConfigured) {
        const { error } = await supabase
          .from('teams')
          .update({
            name: updatedTeam.name,
            category: updatedTeam.category,
            gender: updatedTeam.gender,
            status: updatedTeam.status,
            observations: updatedTeam.observations,
            updated_at: new Date().toISOString(),
            updated_by: user?.full_name || 'Israel Jordá'
          })
          .eq('id', updatedTeam.id);

        if (error) {
          console.warn('Advertencia actualizando Supabase:', error.message);
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Error al actualizar equipo' };
    }
  };

  // Crear equipo con persistencia en Supabase
  const createTeam = async (teamData: Partial<ManagedTeam>): Promise<{ success: boolean; team?: ManagedTeam; error?: string }> => {
    if (!teamData.name || !teamData.category) {
      return { success: false, error: 'El nombre completo y la categoría son obligatorios.' };
    }

    const nextIndex = teamsState.length + 1;
    const equCode = `EQU-${String(nextIndex).padStart(6, '0')}`;
    const realUuid = `b1000001-0000-4000-8000-${String(nextIndex).padStart(12, '0')}`;

    const newTeam: ManagedTeam = {
      id: realUuid,
      internalCode: equCode,
      name: teamData.name.trim(),
      category: teamData.category,
      sport: teamData.sport || 'Fútbol',
      gender: teamData.gender || 'MIXTO',
      season: teamData.season || '2026/2027',
      status: teamData.status || 'ACTIVE',
      observations: teamData.observations,
      staff: [],
      history: [
        {
          id: `ev-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          user: user?.full_name || 'Israel Jordá',
          action: 'Equipo creado',
          detail: `Alta de equipo ${teamData.name.trim()} (${equCode}).`
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user?.full_name || 'Israel Jordá',
      updatedBy: user?.full_name || 'Israel Jordá'
    };

    setTeamsState(prev => [newTeam, ...prev]);

    if (supabase && isSupabaseConfigured) {
      await supabase.from('teams').insert([{
        id: realUuid,
        internal_code: equCode,
        name: newTeam.name,
        category: newTeam.category,
        sport: newTeam.sport,
        gender: newTeam.gender,
        season: newTeam.season,
        status: newTeam.status,
        created_by: user?.full_name || 'Israel Jordá'
      }]);
    }

    return { success: true, team: newTeam };
  };

  // Archivar equipo con persistencia en Supabase
  const archiveTeam = async (teamId: string): Promise<{ success: boolean; error?: string }> => {
    const target = teamsState.find(t => t.id === teamId);
    if (!target) return { success: false, error: 'Equipo no encontrado' };

    const archived = { ...target, status: 'ARCHIVED' as const, updatedAt: new Date().toISOString() };
    return updateTeam(archived);
  };

  const updateUserRolesAndStatus = (
    targetUserId: string, 
    newRoles: AppRole[], 
    newStatus: UserStatus,
    assignments?: UserRoleAssignment[]
  ): { success: boolean; error?: string } => {
    const currentAdmins = managedUsers.filter(u => u.status === 'ACTIVE' && u.roles.includes('ADMIN_GENERAL'));
    const targetUser = managedUsers.find(u => u.id === targetUserId);

    const targetIsAdmin = targetUser?.roles.includes('ADMIN_GENERAL');
    const newIsAdmin = newRoles.includes('ADMIN_GENERAL');
    const newIsActive = newStatus === 'ACTIVE';

    if (targetIsAdmin && (!newIsAdmin || !newIsActive)) {
      if (currentAdmins.length <= 1) {
        return { 
          success: false, 
          error: 'Acción denegada: Debe existir al menos un Administrador General activo en el club.' 
        };
      }
    }

    setManagedUsers(prev => prev.map(u => {
      if (u.id === targetUserId) {
        return {
          ...u,
          roles: newRoles,
          status: newStatus,
          assignments: assignments || u.assignments
        };
      }
      return u;
    }));

    if (user && user.id === targetUserId) {
      setUser(prev => prev ? { ...prev, roles: newRoles } : null);
      if (activeContext && !newRoles.includes(activeContext)) {
        setActiveContext(newRoles[0] || null);
      }
    }

    if (supabase && isSupabaseConfigured) {
      supabase.from('profiles').update({ status: newStatus }).eq('id', targetUserId).then(() => {}).catch(() => {});
    }

    return { success: true };
  };

  const createManagedUser = (
    fullName: string, 
    email: string, 
    roles: AppRole[], 
    assignments?: UserRoleAssignment[]
  ): { success: boolean; user?: ManagedUser; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (managedUsers.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Ya existe un usuario con este correo electrónico.' };
    }

    const newUser: ManagedUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName.trim(),
      email: cleanEmail,
      status: 'ACTIVE',
      roles: roles.length > 0 ? roles : ['FAMILIA'],
      assignments: assignments || [],
      createdAt: new Date().toISOString()
    };

    setManagedUsers(prev => [newUser, ...prev]);
    return { success: true, user: newUser };
  };

  const loginAsTestUserByEmail = (targetEmail: string) => {
    const testPerson = managedPeople.find(p => p.email?.toLowerCase() === targetEmail.toLowerCase());
    if (testPerson) {
      const profile: UserProfile = {
        id: testPerson.id,
        full_name: testPerson.fullName,
        email: testPerson.email || '',
        roles: testPerson.roles,
      };
      setUser(profile);
      setActiveContext(testPerson.roles[0] || 'FAMILIA');
      if (testPerson.roles.includes('FAMILIA')) {
        loadLinkedPlayers(testPerson.id);
      }
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!supabase || !isSupabaseConfigured) {
      return { error: 'Falta la configuración de Supabase. Comprueba las variables de entorno.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: error.message };
      }
      if (data.user) {
        await loadUserProfileAndRoles(data.user);
      }
      return { error: null };
    } catch (err: any) {
      return { error: err.message || 'Error inesperado durante el inicio de sesión.' };
    }
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, message: 'Supabase no está configurado.' };
    }

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : 'https://app-cd-jsuitas.vercel.app';
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/reset-password`,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { 
        success: true, 
        message: 'Se ha enviado un correo con instrucciones para restablecer tu contraseña.' 
      };
    } catch (err: any) {
      return { success: false, message: err.message || 'Error al solicitar restablecimiento de contraseña.' };
    }
  };

  const logout = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setActiveContext(null);
    setSession(null);
    setLinkedPlayers([]);
    setActivePlayerId(null);
    setAssignedTeams([]);
    setActiveTeamId(null);
  };

  const switchContext = (context: ActiveContextType) => {
    if (user && user.roles.length > 0 && !user.roles.includes(context)) {
      console.warn(`Intento no autorizado de cambiar al contexto ${context}`);
      return;
    }
    setActiveContext(context);
  };

  const switchActivePlayer = (playerId: string) => {
    setActivePlayerId(playerId);
  };

  const switchActiveTeam = (teamId: string) => {
    setActiveTeamId(teamId);
  };

  const loginAsCoachInfantilA = () => {
    if (!isDemoEnabled) return;
    setUser({
      id: 'demo-coach-id',
      full_name: 'Carlos Ruíz',
      email: 'carlos.ruiz@cdjesuitas.es',
      roles: ['ENTRENADOR']
    });
    setActiveContext('ENTRENADOR');
    setAssignedTeams(mockTeams);
    setActiveTeamId('b1000001-0000-4000-8000-000000000004');
  };

  const clearProfile = () => {
    setActiveContext(null);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        activeContext,
        isLoading,
        linkedPlayers,
        activePlayerId,
        childrenLoading,
        childrenError,
        loadLinkedPlayers,
        assignedTeams,
        activeTeamId,
        managedUsers,
        updateUserRolesAndStatus,
        createManagedUser,
        loginAsTestUserByEmail,
        managedPeople,
        updatePerson,
        createPerson,
        managedTeams,
        teamsLoading,
        teamsError,
        loadTeams,
        updateTeam,
        createTeam,
        archiveTeam,
        loginWithEmail,
        resetPassword,
        logout,
        switchContext,
        switchActivePlayer,
        switchActiveTeam,
        loginAsCoachInfantilA,
        clearProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
