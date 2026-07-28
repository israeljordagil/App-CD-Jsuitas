import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured, getSupabaseConfigError } from '../lib/supabase';
import { Platform } from 'react-native';

export type ActiveContextType = 'FAMILIA' | 'JUGADOR' | 'ENTRENADOR' | 'COORDINADOR' | 'DIR_DEPORTIVA' | 'ADMIN_GENERAL';

export interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  roles: ActiveContextType[];
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

const VALID_ROLES = new Set<ActiveContextType>([
  'FAMILIA', 
  'JUGADOR', 
  'ENTRENADOR', 
  'COORDINADOR', 
  'DIR_DEPORTIVA', 
  'ADMIN_GENERAL'
]);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeContext, setActiveContext] = useState<ActiveContextType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [linkedPlayers, setLinkedPlayers] = useState<any[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [assignedTeams, setAssignedTeams] = useState<any[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  // DATOS MOCK SOLO SI EXPO_PUBLIC_ENABLE_DEMO_ACCESS ES 'true'
  const isDemoEnabled = process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS === 'true';

  const mockPlayers = [
    { 
      id: 'p1', name: 'Pablo Martínez', sport: 'futbol', 
      category: 'Cadete', team: 'Cadete B', dorsal: '10', position: 'Medio' 
    },
    { 
      id: 'p2', name: 'Hugo Martínez', sport: 'baloncesto', 
      category: 'Infantil', team: 'Infantil Basket', dorsal: '7', position: 'Base', gender: 'masculino' 
    },
    { 
      id: 'p3', name: 'Laura Martínez', sport: 'voleibol', 
      category: 'Cadete', team: 'Cadete Vóley Femenino', dorsal: '10', position: 'Colocadora', gender: 'femenino' 
    }
  ];
  
  const mockTeams = [
    { id: 't1', name: 'Cadete B', sport: 'futbol', category: 'Cadete' }
  ];

  // Consulta el perfil real del usuario y sus roles asignados en Supabase
  const loadUserProfileAndRoles = async (authUser: User) => {
    try {
      let fullName: string | null = authUser.user_metadata?.full_name || null;
      let userRoles: ActiveContextType[] = [];

      if (supabase && isSupabaseConfigured) {
        // 1. Consultar la tabla public.profiles
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, email')
          .eq('id', authUser.id)
          .maybeSingle();

        if (profileData && profileData.full_name) {
          fullName = profileData.full_name;
        }

        // 2. Consultar la tabla public.user_roles (NO ASIGNAR FAMILIA AUTOMÁTICAMENTE SI ESTÁ VACÍO)
        const { data: rolesData } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', authUser.id);

        if (rolesData && rolesData.length > 0) {
          userRoles = rolesData
            .map((r: any) => r.role as ActiveContextType)
            .filter((role: ActiveContextType) => VALID_ROLES.has(role));
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

      // Separación estricta de datos Mock vs Reales
      if (isDemoEnabled) {
        setLinkedPlayers(mockPlayers);
        setActivePlayerId('p2');
        setAssignedTeams(mockTeams);
        setActiveTeamId('t1');
      } else {
        setLinkedPlayers([]);
        setActivePlayerId(null);
        setAssignedTeams([]);
        setActiveTeamId(null);
      }

      // Si el usuario tiene roles válidos, asignar el primero como contexto activo por defecto
      if (profile.roles.length > 0) {
        if (!activeContext || !profile.roles.includes(activeContext)) {
          setActiveContext(profile.roles[0]);
        }
      } else {
        // Usuario autenticado pero SIN ROL asignado en Supabase
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
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Inicio de Sesión con Supabase Auth (signInWithPassword)
  const loginWithEmail = async (email: string, password: string): Promise<{ error: string | null }> => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { error: 'El correo electrónico no es válido.' };
    }
    if (!password || password.trim() === '') {
      return { error: 'La contraseña es obligatoria.' };
    }

    if (!supabase || !isSupabaseConfigured) {
      const configErr = getSupabaseConfigError();
      return { error: configErr || 'Falta la configuración de Supabase' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: password,
      });

      if (error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('invalid login credentials') || errorMsg.includes('invalid_credentials')) {
          return { error: 'El correo o la contraseña no son correctos.' };
        }
        if (errorMsg.includes('email not confirmed')) {
          return { error: 'Debes confirmar tu correo electrónico antes de acceder.' };
        }
        if (errorMsg.includes('fetch') || errorMsg.includes('network')) {
          return { error: 'No se ha podido conectar. Inténtalo de nuevo.' };
        }
        return { error: 'El correo o la contraseña no son correctos.' };
      }

      if (data.session && data.user) {
        setSession(data.session);
        await loadUserProfileAndRoles(data.user);
        return { error: null };
      }

      return { error: 'Ha ocurrido un error inesperado.' };
    } catch (err: any) {
      console.error('Error en signInWithPassword:', err);
      return { error: 'No se ha podido conectar. Inténtalo de nuevo.' };
    }
  };

  // Recuperación de Contraseña (resetPasswordForEmail)
  const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return { success: false, message: 'El correo electrónico no es válido.' };
    }

    // Configuración exacta de la URL de redirección
    let redirectUrl = 'https://app-cd-jsuitas.vercel.app/reset-password';
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const origin = window.location.origin;
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        redirectUrl = `${origin}/reset-password`;
      } else {
        redirectUrl = 'https://app-cd-jsuitas.vercel.app/reset-password';
      }
    } else if (Platform.OS !== 'web') {
      redirectUrl = 'jesuitasmobileapp://reset-password';
    }

    if (supabase && isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
          redirectTo: redirectUrl,
        });

        if (error) {
          return { success: false, message: 'No se ha podido enviar el correo. Inténtalo de nuevo.' };
        }
      } catch (err) {
        console.error('Error enviando reset password:', err);
        return { success: false, message: 'No se ha podido enviar el correo. Inténtalo de nuevo.' };
      }
    }

    return {
      success: true,
      message: 'Te hemos enviado un correo para restablecer tu contraseña.',
    };
  };

  // Cierre de Sesión (signOut)
  const logout = async () => {
    setIsLoading(true);
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Error al cerrar sesión:', err);
      }
    }
    setSession(null);
    setUser(null);
    setActiveContext(null);
    setLinkedPlayers([]);
    setActivePlayerId(null);
    setAssignedTeams([]);
    setActiveTeamId(null);
    setIsLoading(false);
  };

  const clearProfile = () => {
    setActiveContext(null);
  };

  const switchContext = (context: ActiveContextType) => {
    if (user && user.roles.length > 0 && !user.roles.includes(context)) {
      return; // No permitir cambiar a un rol no autorizado
    }

    if (context === 'ENTRENADOR') {
      setUser(prev => prev ? { ...prev, full_name: 'Raúl García Trujillo' } : null);
      if (isDemoEnabled) {
        setAssignedTeams([{ id: 't-infantil-a', name: 'Infantil A', sport: 'futbol', category: 'Infantil' }]);
        setActiveTeamId('t-infantil-a');
      }
    } else if (context === 'COORDINADOR') {
      setUser(prev => prev ? { ...prev, full_name: 'Coordinador de Fútbol' } : null);
    } else if (context === 'JUGADOR') {
      setUser(prev => prev ? { ...prev, full_name: 'Pablo Martínez' } : null);
    }
    setActiveContext(context);
  };

  const switchActivePlayer = (playerId: string) => {
    setActivePlayerId(playerId);
  };

  const switchActiveTeam = (teamId: string) => {
    setActiveTeamId(teamId);
  };

  // Acceso de Prueba (Desactivado en producción si DEMO_ACCESS !== 'true')
  const loginAsCoachInfantilA = () => {
    if (process.env.EXPO_PUBLIC_ENABLE_DEMO_ACCESS !== 'true') {
      return;
    }

    setIsLoading(true);
    setUser({
      id: 'demo-entrenador-infantil-a',
      full_name: 'Raúl García Trujillo',
      email: 'raul@jesuitas.es',
      roles: ['ENTRENADOR']
    });
    setActiveContext('ENTRENADOR');
    setAssignedTeams([{ id: 't-infantil-a', name: 'Infantil A', sport: 'futbol', category: 'Infantil' }]);
    setActiveTeamId('t-infantil-a');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      session,
      user,
      activeContext,
      linkedPlayers,
      activePlayerId,
      assignedTeams,
      activeTeamId,
      isLoading,
      loginWithEmail,
      resetPassword,
      logout,
      switchContext,
      switchActivePlayer,
      switchActiveTeam,
      loginAsCoachInfantilA,
      clearProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
