import React, { createContext, useContext, useState, useEffect } from 'react';
// import { Session, User } from '@supabase/supabase-js';
type Session = any;
type User = any;

export type ActiveContextType = 'FAMILIA' | 'JUGADOR' | 'ENTRENADOR' | 'COORDINADOR' | 'DIR_DEPORTIVA' | 'ADMIN_GENERAL';

interface UserProfile {
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
  
  // Contexto Familia (Empty arrays by default, to be filled by Real API later)
  linkedPlayers: any[];
  activePlayerId: string | null;
  
  // Contexto Entrenador (Empty arrays by default)
  assignedTeams: any[];
  activeTeamId: string | null;

  // Actions
  logout: () => Promise<void>;
  switchContext: (context: ActiveContextType) => void;
  switchActivePlayer: (playerId: string) => void;
  switchActiveTeam: (teamId: string) => void;
  loginAsCoachInfantilA: () => void;
  clearProfile: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeContext, setActiveContext] = useState<ActiveContextType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [linkedPlayers, setLinkedPlayers] = useState<any[]>([]);
  const [activePlayerId, setActivePlayerId] = useState<string | null>(null);
  const [assignedTeams, setAssignedTeams] = useState<any[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);

  const clearState = () => {
    setUser(null);
    setActiveContext(null);
    setLinkedPlayers([]);
    setActivePlayerId(null);
    setAssignedTeams([]);
    setActiveTeamId(null);
  };

  useEffect(() => {
    // MOCK LOGIN INICIAL
    const mockUser: UserProfile = {
      id: 'mock-123',
      full_name: 'Familia Martínez',
      email: 'demo@jesuitas.es',
      roles: ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR']
    };
    
    // MOCK DATA PARA LOS CONTEXTOS
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

    setUser(mockUser);
    setActiveContext(null); // Empieza sin perfil para obligar a seleccionar
    setLinkedPlayers(mockPlayers);
    setActivePlayerId('p2'); // Empieza con Hugo (Familia)
    setAssignedTeams(mockTeams);
    setActiveTeamId('t1');
    setIsLoading(false);
  }, []);

  // Mock fetch function (not used but kept for signature if needed, though removed logic)
  const fetchUserProfile = async (authUser: User) => {
    // Disabled Supabase
  };

  const logout = async () => {
    setIsLoading(true);
    clearState();
    setIsLoading(false);
  };

  const clearProfile = () => {
    setActiveContext(null);
  };

  const switchContext = (context: ActiveContextType) => {
    if (context === 'ENTRENADOR') {
      setUser({ id: 'mock-entrenador', full_name: 'Raúl García Trujillo', email: '', roles: ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR'] });
      setAssignedTeams([{ id: 't-infantil-a', name: 'Infantil A', sport: 'futbol', category: 'Infantil' }]);
      setActiveTeamId('t-infantil-a');
    } else if (context === 'COORDINADOR') {
      setUser({ id: 'mock-coord', full_name: 'Coordinador de Fútbol', email: '', roles: ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR'] });
    } else if (context === 'JUGADOR') {
      setUser({ id: 'mock-jugador', full_name: 'Pablo Martínez', email: '', roles: ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR'] });
    } else {
      setUser({ id: 'mock-123', full_name: 'Familia Martínez', email: 'demo@jesuitas.es', roles: ['FAMILIA', 'JUGADOR', 'ENTRENADOR', 'COORDINADOR'] });
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
    setIsLoading(true);
    setUser({
      id: 'mock-entrenador-infantil-a',
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
