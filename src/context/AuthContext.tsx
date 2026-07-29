import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AppRole, UserStatus, UserRoleAssignment, ManagedUser } from '../types/roles';
import { ManagedPerson } from '../types/people';
import { INITIAL_PEOPLE } from '../data/peopleData';

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

  // Gestión del Módulo Núcleo PERSONAS
  managedPeople: ManagedPerson[];
  updatePerson: (person: ManagedPerson) => { success: boolean; error?: string };
  createPerson: (personData: Partial<ManagedPerson>) => { success: boolean; person?: ManagedPerson; error?: string };

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

// Usuarios de prueba iniciales (SIN ADMIN_GENERAL DE PRUEBA)
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
  const [assignedTeams, setAssignedTeams] = useState<any[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  // Módulo Usuarios
  const [managedUsers, setManagedUsers] = useState<ManagedUser[]>(INITIAL_TEST_USERS);
  
  // Módulo NÚCLEO PERSONAS (Sin duplicidades por persona física)
  const [managedPeople, setManagedPeople] = useState<ManagedPerson[]>(INITIAL_PEOPLE);

  const isDemoEnabled = process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS === 'true';

  const mockPlayers = [
    { 
      id: 'p1', name: 'Pablo Martínez', sport: 'futbol', 
      category: 'Cadete', team: 'Cadete B', dorsal: '10', position: 'Medio' 
    },
    { 
      id: 'p2', name: 'Hugo Martínez', sport: 'baloncesto', 
      category: 'Infantil', team: 'Infantil Basket', dorsal: '7', position: 'Base', gender: 'masculino' 
    }
  ];
  
  const mockTeams = [
    { id: 't1', name: 'Cadete B', sport: 'futbol', category: 'Cadete' }
  ];

  // Consulta el perfil real del usuario y sus roles asignados en Supabase
  const loadUserProfileAndRoles = async (authUser: User) => {
    try {
      let fullName: string | null = authUser.user_metadata?.full_name || null;
      let userRoles: AppRole[] = [];

      if (supabase && isSupabaseConfigured) {
        // 1. Consultar public.profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', authUser.id)
          .maybeSingle();

        if (profileData && profileData.full_name) {
          fullName = profileData.full_name;
        }

        // 2. Consultar public.user_roles
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

      // Configurar vinculaciones según perfil
      if (profile.roles.includes('FAMILIA')) {
        setLinkedPlayers(mockPlayers);
        setActivePlayerId('p1');
      } else {
        setLinkedPlayers([]);
        setActivePlayerId(null);
      }

      if (profile.roles.includes('ENTRENADOR')) {
        setAssignedTeams(mockTeams);
        setActiveTeamId('t1');
      } else {
        setAssignedTeams([]);
        setActiveTeamId(null);
      }

      // Si el usuario tiene roles válidos, asignar el primero como contexto activo automáticamente
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

  // Inicialización de la Sesión y Listener de Supabase
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

  // Actualizar expedientes del Módulo NÚCLEO PERSONAS
  const updatePerson = (updatedPerson: ManagedPerson): { success: boolean; error?: string } => {
    // Protección del Administrador Único
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

    // Si la persona actualizada coincide con el usuario activo, actualizar perfil
    if (user && (user.email?.toLowerCase() === updatedPerson.email?.toLowerCase())) {
      setUser(prev => prev ? { ...prev, roles: updatedPerson.roles } : null);
    }

    return { success: true };
  };

  // Crear una nueva persona en el núcleo PERSONAS (Garantizando no duplicados)
  const createPerson = (personData: Partial<ManagedPerson>): { success: boolean; person?: ManagedPerson; error?: string } => {
    if (!personData.firstName || !personData.lastName) {
      return { success: false, error: 'Se requiere nombre y apellidos.' };
    }

    const fullName = `${personData.firstName.trim()} ${personData.lastName.trim()}`;
    const cleanEmail = personData.email?.trim().toLowerCase();

    if (cleanEmail && managedPeople.some(p => p.email?.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'Ya existe una persona registrada con este correo electrónico.' };
    }

    const newPerson: ManagedPerson = {
      id: `per-${Date.now()}`,
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
      history: [
        {
          id: `h-${Date.now()}`,
          season: '2025/2026',
          summaryRole: `Alta de ${fullName} en la plataforma`,
          createdAt: new Date().toISOString()
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setManagedPeople(prev => [newPerson, ...prev]);
    return { success: true, person: newPerson };
  };

  // Actualizar roles y estados de Usuarios (Módulo Usuarios)
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
        setLinkedPlayers(mockPlayers);
        setActivePlayerId('p1');
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
    setActiveTeamId('t1');
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
        assignedTeams,
        activeTeamId,
        managedUsers,
        updateUserRolesAndStatus,
        createManagedUser,
        loginAsTestUserByEmail,
        managedPeople,
        updatePerson,
        createPerson,
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
