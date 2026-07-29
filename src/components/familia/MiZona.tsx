import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { usePlayerGamification } from '../../hooks/usePlayerGamification';
import { CromoJugador } from '../ui/CromoJugador';
import { DEMO_FAMILY } from '../../data/demoFamilyData';
import { 
  INSIGNIAS, 
  RETO_TABS, 
  getRetosByCategory,
  Insignia,
  Reto
} from '../../data/gamificationData';

const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  purple: '#A855F7',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

interface NormalizedPlayer {
  id: string;
  name: string;
  fullName: string;
  team: string;
  category: string;
  dorsal?: number | string;
  position?: string;
  avatarIcon?: string;
}

export function MiZona() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const { 
    linkedPlayers, 
    activePlayerId, 
    switchActivePlayer, 
    childrenLoading: authLoading, 
    childrenError: authError 
  } = useAuth();

  const [activeRetoTab, setActiveRetoTab] = useState<string>('Ataque');

  // Normalización defensiva de datos demo y Supabase para evitar TypeErrors
  const demoChildren = (DEMO_FAMILY && Array.isArray(DEMO_FAMILY.children)) ? DEMO_FAMILY.children : [];
  const rawChildrenList = (Array.isArray(linkedPlayers) && linkedPlayers.length > 0)
    ? linkedPlayers
    : demoChildren;

  const normalizedChildren: NormalizedPlayer[] = rawChildrenList.map((c: any) => ({
    id: c.id || c.playerId || 'demo-child-id',
    name: c.name || c.fullName || 'Deportista',
    fullName: c.fullName || c.name || 'Deportista',
    team: c.team || c.teamName || c.sportLabel || 'Equipo CD Jesuitas',
    category: c.category || 'Formativo',
    dorsal: c.dorsal || 10,
    position: c.position || 'DEPORTISTA',
    avatarIcon: c.avatarIcon || '👦',
  }));

  const selectedPlayerId = activePlayerId || normalizedChildren[0]?.id || null;
  const activeChild = normalizedChildren.find(c => c.id === selectedPlayerId) || normalizedChildren[0] || null;

  // Hook de gamificación persistida en Supabase por jugador_id
  const { 
    gamification, 
    loading: gamiLoading, 
    error: gamiError 
  } = usePlayerGamification(selectedPlayerId);

  const isLoading = authLoading || gamiLoading;
  const errorMessage = authError || gamiError;

  // Valores de gamificación con fallbacks seguros para evitar ocultar el Cromo
  const safeGamification = {
    level: gamification?.level ?? 1,
    xpTotal: gamification?.xpTotal ?? 0,
    nextLevelXp: gamification?.nextLevelXp ?? 1000,
    rachaActual: gamification?.rachaActual ?? 0,
    insigniasConseguidasCount: gamification?.insigniasConseguidasCount ?? 0,
    badgesMap: gamification?.badgesMap ?? {},
    challengesMap: gamification?.challengesMap ?? {},
  };

  // Retos por categoría seleccionada
  const retosCurrentCategory = getRetosByCategory(activeRetoTab);

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} 
      showsVerticalScrollIndicator={false}
    >
      {/* 1. ENCABEZADO DE SECCIÓN */}
      <View style={styles.headerBanner}>
        <LinearGradient
          colors={['rgba(79, 195, 247, 0.15)', 'transparent']}
          style={styles.gradientBg}
        />
        <View style={styles.headerTopRow}>
          <View style={styles.badgeSparkle}>
            <Ionicons name="star" size={16} color={colors.accentGold} />
            <Text style={styles.badgeSparkleTxt}>GAMIFICACIÓN OFICIAL • CD JESUITAS</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>🌟 MI ZONA</Text>
        <Text style={styles.headerSubtitle}>
          Cromo oficial, nivel, racha y retos de {activeChild?.name || 'deportista'}
        </Text>
      </View>

      {/* ESTADO DE ERROR O ADVERTENCIA */}
      {!isLoading && errorMessage && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={24} color={colors.accentRed} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* ESTADO VACÍO DEFENSIVO */}
      {normalizedChildren.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="shield-outline" size={44} color={colors.skyGlow} />
          <Text style={styles.emptyTitle}>No hay un jugador vinculado a esta cuenta</Text>
          <Text style={styles.emptySubtext}>
            Para acceder a Mi Zona debes contar con al menos un jugador a tu cargo validado por el club.
          </Text>
        </View>
      ) : (
        <>
          {/* ORDEN VISUAL MANDATORIO 1: SELECTOR DE HIJO (SI HAY MÁS DE UNO) */}
          {normalizedChildren.length > 1 && (
            <View style={styles.childSelectorGroup}>
              <Text style={styles.selectorLabel}>DEPORTISTA SELECCIONADO:</Text>
              <View style={styles.selectorRow}>
                {normalizedChildren.map((child) => {
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

          {/* ORDEN VISUAL MANDATORIO 2: CROMO COMPLETO DEL JUGADOR (ELEMENTO PRINCIPAL) */}
          {activeChild && (
            <View style={styles.cromoSectionContainer}>
              <Text style={styles.sectionTitle}>1. CROMO OFICIAL DEL DEPORTISTA</Text>
              <CromoJugador
                name={activeChild.name}
                dorsal={activeChild.dorsal ? String(activeChild.dorsal) : '10'}
                position={activeChild.position || 'DEPORTISTA'}
                team={activeChild.team}
                category={activeChild.category}
                level={safeGamification.level}
                currentXp={safeGamification.xpTotal}
                nextLevelXp={safeGamification.nextLevelXp}
                streakWeeks={safeGamification.rachaActual}
                photo={activeChild.avatarIcon || '👦'}
              />
            </View>
          )}

          {/* ORDEN VISUAL MANDATORIO 3 & 4: BARRA DE XP, NIVEL Y RACHA */}
          <Text style={styles.sectionTitle}>2. RESUMEN DE GAMIFICACIÓN</Text>
          <View style={styles.statsSummaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🔥</Text>
              <Text style={styles.summaryValue}>{safeGamification.rachaActual} Semanas</Text>
              <Text style={styles.summaryLabel}>Racha Actual</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🏅</Text>
              <Text style={styles.summaryValue}>{safeGamification.insigniasConseguidasCount} / {INSIGNIAS.length}</Text>
              <Text style={styles.summaryLabel}>Insignias Conseguidas</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⭐</Text>
              <Text style={styles.summaryValue}>{safeGamification.xpTotal} XP</Text>
              <Text style={styles.summaryLabel}>Experiencia Total</Text>
            </View>
          </View>

          {/* ORDEN VISUAL MANDATORIO 5: RETOS */}
          <Text style={styles.sectionTitle}>3. RETOS FORMATIVOS Y OBJETIVOS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsScroll}>
            {RETO_TABS.map((tab) => {
              const isActive = tab === activeRetoTab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.retoTabPill, isActive && styles.retoTabPillActive]}
                  onPress={() => setActiveRetoTab(tab)}
                >
                  <Text style={[styles.retoTabText, isActive && styles.retoTabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.retosContainer}>
            {retosCurrentCategory.map((reto) => {
              const userReto = safeGamification.challengesMap[reto.slug];
              const currentVal = userReto ? userReto.progreso_actual : 0;
              const isDone = userReto ? userReto.estado === 'completado' : currentVal >= reto.total;
              const pct = Math.min(100, Math.round((currentVal / reto.total) * 100));

              return (
                <View 
                  key={reto.id} 
                  style={[styles.retoCard, isDone && styles.retoCardCompleted]}
                >
                  <View style={styles.retoHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.retoCtxRow}>
                        <Text style={styles.retoCtxTag}>{reto.ctx}</Text>
                        <Text style={styles.retoDiffTag}>{reto.diff}</Text>
                      </View>
                      <Text style={[styles.retoTitle, isDone && styles.retoTitleCompleted]}>
                        {reto.title}
                      </Text>
                    </View>
                    <View style={styles.xpBadge}>
                      <Text style={styles.xpBadgeTxt}>+{reto.xp} XP</Text>
                    </View>
                  </View>

                  {/* Barra de progreso visual */}
                  <View style={styles.retoProgressTrack}>
                    <View 
                      style={[
                        styles.retoProgressFill, 
                        { width: `${pct}%` },
                        isDone && { backgroundColor: colors.accentGreen }
                      ]} 
                    />
                  </View>

                  <View style={styles.retoFooterRow}>
                    <Text style={styles.retoProgressTxt}>Progreso: {currentVal} / {reto.total}</Text>
                    {isDone ? (
                      <Text style={styles.completedTxt}>✅ ¡COMPLETADO!</Text>
                    ) : (
                      <Text style={styles.pendingTxt}>{pct}% completado</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* ORDEN VISUAL MANDATORIO 6: INSIGNIAS */}
          <Text style={styles.sectionTitle}>4. INSIGNIAS DEL CD JESUITAS</Text>
          <View style={styles.insigniasGrid}>
            {INSIGNIAS.map((insignia) => {
              const userBadge = safeGamification.badgesMap[insignia.slug];
              const isUnlocked = !!userBadge && userBadge.conseguida;
              const unlockedDate = userBadge?.conseguida_at 
                ? new Date(userBadge.conseguida_at).toLocaleDateString('es-ES')
                : insignia.date;

              return (
                <View 
                  key={insignia.id} 
                  style={[styles.insigniaCard, !isUnlocked && styles.insigniaCardLocked]}
                >
                  <View 
                    style={[
                      styles.insigniaIconCircle, 
                      { backgroundColor: isUnlocked ? `${insignia.color}25` : 'rgba(255,255,255,0.05)' },
                      { borderColor: isUnlocked ? insignia.color : 'rgba(255,255,255,0.1)' }
                    ]}
                  >
                    <FontAwesome 
                      name={isUnlocked ? (insignia.icon as any) : 'lock'} 
                      size={26} 
                      color={isUnlocked ? insignia.color : colors.textMuted} 
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.insTitleRow}>
                      <Text style={[styles.insTitle, !isUnlocked && styles.insTitleLocked]}>
                        {insignia.title}
                      </Text>
                      {isUnlocked && (
                        <View style={styles.unlockedTag}>
                          <Text style={styles.unlockedTagTxt}>DESBLOQUEADO</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.insDesc} numberOfLines={2}>{insignia.desc}</Text>
                    {isUnlocked && unlockedDate && (
                      <Text style={styles.insDate}>Conseguido el {unlockedDate}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
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
    maxWidth: 900,
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
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeSparkleTxt: {
    color: colors.accentGold,
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
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: colors.accentRed,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 12,
  },
  errorText: {
    color: colors.accentRed,
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
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
  cromoSectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 20,
    marginBottom: 10,
  },
  statsSummaryGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  summaryIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
    textAlign: 'center',
  },
  tabsScroll: {
    marginBottom: 12,
  },
  retoTabPill: {
    backgroundColor: colors.navyCard,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  retoTabPillActive: {
    backgroundColor: colors.skyPrimary,
    borderColor: colors.skyPrimary,
  },
  retoTabText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  retoTabTextActive: {
    color: colors.navyDark,
    fontWeight: '900',
  },
  retosContainer: {
    gap: 10,
    marginBottom: 16,
  },
  retoCard: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  retoCardCompleted: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  retoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  retoCtxRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  retoCtxTag: {
    color: colors.skyGlow,
    fontSize: 10,
    fontWeight: '800',
  },
  retoDiffTag: {
    fontSize: 10,
  },
  retoTitle: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  retoTitleCompleted: {
    color: colors.white,
  },
  xpBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  xpBadgeTxt: {
    color: colors.accentGold,
    fontSize: 11,
    fontWeight: '900',
  },
  retoProgressTrack: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 6,
  },
  retoProgressFill: {
    height: '100%',
    backgroundColor: colors.skyPrimary,
    borderRadius: 3,
  },
  retoFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  retoProgressTxt: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  completedTxt: {
    color: colors.accentGreen,
    fontSize: 10,
    fontWeight: '900',
  },
  pendingTxt: {
    color: colors.skyGlow,
    fontSize: 10,
    fontWeight: '700',
  },
  insigniasGrid: {
    gap: 10,
    marginBottom: 20,
  },
  insigniaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  insigniaCardLocked: {
    opacity: 0.55,
  },
  insigniaIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  insTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  insTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  insTitleLocked: {
    color: colors.textMuted,
  },
  unlockedTag: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  unlockedTagTxt: {
    color: colors.accentGreen,
    fontSize: 8,
    fontWeight: '900',
  },
  insDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  insDate: {
    color: colors.skyGlow,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 4,
  },
});
