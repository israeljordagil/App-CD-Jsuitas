import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayerCard } from '../ui/CromoJugador';
import { useAuth } from '../../context/AuthContext';
import { getUnifiedFamilyPlayers } from '../familia/MiZona';

const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

export function FamiliaMiHijo() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const { linkedPlayers, activePlayerId, switchActivePlayer } = useAuth();

  // Obtener lista unificada de deportistas (Supabase / Demo)
  const playersList = getUnifiedFamilyPlayers(linkedPlayers);

  const selectedPlayerId = activePlayerId || playersList[0]?.id || null;
  const activeChild = playersList.find(c => c.id === selectedPlayerId) || playersList[0] || null;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} 
      showsVerticalScrollIndicator={false}
    >
      {/* BANNER DE ENCABEZADO: MIS HIJOS */}
      <View style={styles.headerBanner}>
        <LinearGradient
          colors={['rgba(79, 195, 247, 0.15)', 'transparent']}
          style={styles.gradientBg}
        />
        <View style={styles.headerTopRow}>
          <View style={styles.badgeSparkle}>
            <Ionicons name="id-card" size={16} color={colors.skyPrimary} />
            <Text style={styles.badgeSparkleTxt}>IDENTIDAD OFICIAL • CD JESUITAS</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>👦 MIS HIJOS</Text>
        <Text style={styles.headerSubtitle}>
          Ficha de acreditación e identidad deportiva oficial de {activeChild?.fullName || 'deportista'}
        </Text>
      </View>

      {/* ESTADO VACÍO DEFENSIVO */}
      {playersList.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="shield-outline" size={44} color={colors.skyGlow} />
          <Text style={styles.emptyTitle}>No hay hijos vinculados todavía</Text>
          <Text style={styles.emptySubtext}>
            Para consultar la ficha de identidad debes contar con al menos un jugador a tu cargo validado por el club.
          </Text>
        </View>
      ) : (
        <>
          {/* SELECTOR DE HIJOS (SI HAY MÁS DE UNO) */}
          {playersList.length > 1 && (
            <View style={styles.childSelectorGroup}>
              <Text style={styles.selectorLabel}>SELECCIONAR DEPORTISTA:</Text>
              <View style={styles.selectorRow}>
                {playersList.map((child) => {
                  const isSelected = child.id === selectedPlayerId;
                  return (
                    <TouchableOpacity
                      key={child.id}
                      activeOpacity={0.8}
                      style={[styles.childChip, isSelected && styles.childChipActive]}
                      onPress={() => switchActivePlayer(child.id)}
                    >
                      <Text style={{ fontSize: 16 }}>{child.avatarIcon || '👦'}</Text>
                      <Text style={[styles.childChipText, isSelected && styles.childChipTextActive]}>
                        {child.name}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={16} color={colors.skyPrimary} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* CROMO OFICIAL UNIFICADO DE IDENTIDAD */}
          {activeChild && (
            <View style={styles.cromoContainer}>
              <PlayerCard
                name={activeChild.fullName}
                dorsal={activeChild.dorsal}
                position={activeChild.position}
                team={activeChild.team}
                category={activeChild.category}
                photo={activeChild.avatarIcon || '👦'}
                hideGamification={true}
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyDark,
  },
  content: {
    padding: 16,
    paddingBottom: 60,
  },
  contentTablet: {
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  headerBanner: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    overflow: 'hidden',
  },
  gradientBg: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeSparkle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeSparkleTxt: {
    color: colors.skyPrimary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 6,
  },
  headerSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
    lineHeight: 18,
  },
  emptyBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGlow,
    marginVertical: 16,
  },
  emptyTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  childSelectorGroup: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  selectorLabel: {
    color: colors.skyPrimary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 8,
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  childChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  childChipActive: {
    backgroundColor: '#0E2E6B',
    borderColor: colors.skyPrimary,
  },
  childChipText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '700',
  },
  childChipTextActive: {
    color: colors.white,
    fontWeight: '900',
  },
  cromoContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
