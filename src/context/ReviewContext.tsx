import React, { createContext, useContext, useState } from 'react';
import { ActiveContextType } from './AuthContext';

type ScreenStatus = '✅ Aprobada' | '🟡 Revisar' | '🔴 Rehacer' | '⚪ Pendiente';

interface ScreenNote {
  status: ScreenStatus;
  note: string;
}

interface ReviewContextProps {
  activeReviewRole: ActiveContextType;
  setActiveReviewRole: (role: ActiveContextType) => void;
  activeReviewTeam: string;
  setActiveReviewTeam: (team: string) => void;
  screenStatuses: Record<string, ScreenNote>;
  updateScreenStatus: (screenRoute: string, status: ScreenStatus, note: string) => void;
}

const ReviewContext = createContext<ReviewContextProps | undefined>(undefined);

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [activeReviewRole, setActiveReviewRole] = useState<ActiveContextType>('FAMILIA');
  // Por defecto el coordinador ve "Todos" y el entrenador ve "Infantil A"
  // Esto se gestionará dinámicamente desde el ReviewCenter, empezamos con Infantil A.
  const [activeReviewTeam, setActiveReviewTeam] = useState<string>('Infantil A');
  const [screenStatuses, setScreenStatuses] = useState<Record<string, ScreenNote>>({});

  const updateScreenStatus = (screenRoute: string, status: ScreenStatus, note: string) => {
    setScreenStatuses(prev => ({
      ...prev,
      [screenRoute]: { status, note }
    }));
  };

  return (
    <ReviewContext.Provider value={{
      activeReviewRole,
      setActiveReviewRole,
      activeReviewTeam,
      setActiveReviewTeam,
      screenStatuses,
      updateScreenStatus
    }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
}
