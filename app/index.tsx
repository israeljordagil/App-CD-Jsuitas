import React from 'react';
import { LargeProfileSelectorScreen } from '../src/components/ui/LargeProfileSelectorScreen';
import { SportSelectionScreen } from '../src/components/ui/SportSelectionScreen';
import { useDemoNavigation } from '../src/context/DemoNavigationContext';
import { useAuth } from '../src/context/AuthContext';

export default function IndexScreen() {
  const { selectedDemoProfile, setSelectedDemoProfile } = useDemoNavigation();
  const { switchContext } = useAuth();

  // Paso 1: Si no hay perfil seleccionado en la demo, mostrar las 3 Tarjetas Grandes
  if (!selectedDemoProfile) {
    return (
      <LargeProfileSelectorScreen 
        onSelectProfile={(profileId) => {
          setSelectedDemoProfile(profileId as any);
          switchContext(profileId);
        }} 
      />
    );
  }

  // Paso 2: Con perfil seleccionado, mostrar la selección de los 4 Deportes
  return (
    <SportSelectionScreen 
      onChangeProfile={() => {
        setSelectedDemoProfile(null);
        switchContext(null as any);
      }} 
    />
  );
}
