import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { useDemoNavigation } from '../../src/context/DemoNavigationContext';
import { MiZona } from '../../src/components/familia/MiZona';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { DEMO_FAMILY } from '../../src/data/demoFamilyData';

export default function MiZonaScreen() {
  const { selectedDemoProfile } = useDemoNavigation();
  const { activeContext, linkedPlayers, activePlayerId, switchActivePlayer } = useAuth();

  // El perfil de la demo o contexto activo debe ser exclusivamente FAMILIA para acceder a Mi Zona
  const effectiveProfile = selectedDemoProfile || activeContext || 'FAMILIA';
  const isFamilia = effectiveProfile === 'FAMILIA';

  // Si se intenta acceder a Mi Zona desde otro perfil (Entrenador / Coordinador)
  if (!isFamilia) {
    return (
      <View style={styles.restrictedContainer}>
        <Text style={styles.restrictedIcon}>🔒</Text>
        <Text style={styles.restrictedTitle}>SECCIÓN RESERVADA A FAMILIAS</Text>
        <Text style={styles.restrictedSub}>
          Mi Zona es el portal de gamificación de los deportistas, accesible únicamente desde la cuenta FAMILIA.
        </Text>
      </View>
    );
  }

  // Obención defensiva de deportistas para evitar TypeErrors
  const demoChildren = (DEMO_FAMILY && Array.isArray(DEMO_FAMILY.children)) ? DEMO_FAMILY.children : [];
  const availableChildren = (Array.isArray(linkedPlayers) && linkedPlayers.length > 0)
    ? linkedPlayers 
    : demoChildren;

  const selectedPlayerId = activePlayerId || availableChildren[0]?.id || null;
  const isChildLinked = availableChildren.some((child: any) => child.id === selectedPlayerId);

  // Estado: No hay ningún hijo seleccionado aún
  if (!selectedPlayerId) {
    return (
      <View style={styles.screenContainer}>
        <PremiumHeader title="MI ZONA" subtitle="GAMIFICACIÓN Y RETOS" showSearchAndActions={false} showAvatar={false} />
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorIcon}>👦</Text>
          <Text style={styles.selectorTitle}>Selecciona uno de tus hijos para entrar en Mi Zona</Text>
          <Text style={styles.selectorSub}>Elige un deportista vinculado a tu cuenta familiar para consultar su progreso:</Text>
          <View style={styles.childrenGrid}>
            {availableChildren.map((child: any) => (
              <TouchableOpacity
                key={child.id}
                style={styles.childBtn}
                activeOpacity={0.8}
                onPress={() => switchActivePlayer(child.id)}
              >
                <Text style={styles.childBtnName}>{child.name || child.fullName}</Text>
                <Text style={styles.childBtnCategory}>{child.category || child.team || child.teamName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Estado: El jugador solicitado NO está vinculado a la cuenta de esta familia
  if (!isChildLinked) {
    return (
      <View style={styles.restrictedContainer}>
        <Text style={styles.restrictedIcon}>⛔</Text>
        <Text style={styles.restrictedTitle}>NO TIENES ACCESO A ESTE JUGADOR</Text>
        <Text style={styles.restrictedSub}>
          El deportista consultado no pertenece ni está vinculado a tu cuenta familiar.
        </Text>
      </View>
    );
  }

  // Estado: Acceso concedido a la familia y jugador vinculado
  return (
    <View style={styles.screenContainer}>
      <PremiumHeader 
        title="MI ZONA" 
        subtitle="GAMIFICACIÓN Y RETOS"
        showSearchAndActions={false}
        showAvatar={false}
      />
      <MiZona />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
  },
  restrictedContainer: {
    flex: 1,
    backgroundColor: '#071A3D',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  restrictedIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  restrictedTitle: {
    color: '#4FC3F7',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  restrictedSub: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 400,
  },
  selectorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  selectorIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  selectorTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 8,
  },
  selectorSub: {
    color: '#94A3B8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 420,
  },
  childrenGrid: {
    width: '100%',
    maxWidth: 450,
    gap: 12,
  },
  childBtn: {
    backgroundColor: '#0B224F',
    borderWidth: 1.5,
    borderColor: '#4FC3F7',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  childBtnName: {
    color: '#4FC3F7',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  childBtnCategory: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
});
