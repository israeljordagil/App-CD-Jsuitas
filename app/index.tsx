import React from 'react';
import { LargeProfileSelectorScreen } from '../src/components/ui/LargeProfileSelectorScreen';
import { SportSelectionScreen } from '../src/components/ui/SportSelectionScreen';
import { useAuth, ActiveContextType } from '../src/context/AuthContext';

export default function IndexScreen() {
  const { activeContext, switchContext } = useAuth();

  // Paso 1: Si no se ha seleccionado perfil en la demo, mostrar las 3 Tarjetas Grandes
  if (!activeContext) {
    return (
      <LargeProfileSelectorScreen 
        onSelectProfile={(profileId: ActiveContextType) => {
          switchContext(profileId);
        }} 
      />
    );
  }

  // Paso 2: Con perfil seleccionado, mostrar la selección de los 4 Deportes
  return (
    <SportSelectionScreen 
      onChangeProfile={() => {
        // Al pulsar "Cambiar perfil", volver a la selección inicial de perfiles
        switchContext(null as any);
      }} 
    />
  );
}
