import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActiveContextType } from './AuthContext';
import { SportType } from './SportContext';

export type DemoProfileType = 'FAMILIA' | 'ENTRENADOR' | 'COORDINADOR' | null;

interface DemoNavigationContextProps {
  selectedDemoProfile: DemoProfileType;
  setSelectedDemoProfile: (profile: DemoProfileType) => void;
  selectedSport: SportType;
  setSelectedSport: (sport: SportType) => void;
  resetDemoFlow: () => void;
}

const DemoNavigationContext = createContext<DemoNavigationContextProps>({
  selectedDemoProfile: null,
  setSelectedDemoProfile: () => {},
  selectedSport: null,
  setSelectedSport: () => {},
  resetDemoFlow: () => {},
});

export const DemoNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedDemoProfile, setSelectedDemoProfile] = useState<DemoProfileType>(null);
  const [selectedSport, setSelectedSport] = useState<SportType>(null);

  const resetDemoFlow = () => {
    setSelectedDemoProfile(null);
    setSelectedSport(null);
  };

  return (
    <DemoNavigationContext.Provider 
      value={{ 
        selectedDemoProfile, 
        setSelectedDemoProfile, 
        selectedSport, 
        setSelectedSport, 
        resetDemoFlow 
      }}
    >
      {children}
    </DemoNavigationContext.Provider>
  );
};

export const useDemoNavigation = () => useContext(DemoNavigationContext);
