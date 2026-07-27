import React, { createContext, useState, useContext, ReactNode } from 'react';

export type SportType = 'futbol' | 'futbol_sala' | 'baloncesto' | 'voleibol' | null;

interface SportContextProps {
  sport: SportType;
  setSport: (sport: SportType) => void;
}

const SportContext = createContext<SportContextProps>({
  sport: null,
  setSport: () => {},
});

export const SportProvider = ({ children }: { children: ReactNode }) => {
  const [sport, setSport] = useState<SportType>(null);

  return (
    <SportContext.Provider value={{ sport, setSport }}>
      {children}
    </SportContext.Provider>
  );
};

export const useSport = () => useContext(SportContext);
