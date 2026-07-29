import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  useWindowDimensions,
  Share
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { usePlayerGamification } from '../../hooks/usePlayerGamification';
import { PlayerCard } from '../ui/CromoJugador';
import { 
  INSIGNIAS, 
  RETO_TABS, 
  getRetosByCategory 
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

export interface UnifiedPlayer {
  id: string;
  name: string;
  fullName: string;
  team: string;
  category: string;
  dorsal: string;
  position: string;
  avatarIcon: string;
  cardImage?: any;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  streakWeeks: number;
}

// Función unificadora para la fuente de datos de deportistas familiares (Supabase / Demo)
export function getUnifiedFamilyPlayers(linkedPlayers: any[]): UnifiedPlayer[] {
  if (Array.isArray(linkedPlayers) && linkedPlayers.length > 0) {
    return linkedPlayers.map((p, idx) => ({
      id: p.id || `linked-${idx}`,
      name: p.name || p.shortName || p.fullName || 'Deportista',
      fullName: p.fullName || p.name || 'Deportista',
      team: p.team || p.teamName || 'Equipo CD Jesuitas',
      category: p.category || 'Formativo',
      dorsal: p.dorsal ? String(p.dorsal) : '10',
      position: p.position || 'DEPORTISTA',
      avatarIcon: p.avatarIcon || '👦',
      cardImage: p.cardImage || null,
      level: p.level || 14,
      currentXp: p.currentXp || p.xpTotal || 1250,
      nextLevelXp: p.nextLevelXp || 2000,
      streakWeeks: p.streakWeeks || p.rachaActual || 4,
    }));
  }

  // En demo sin datos de Supabase, retornar la lista de cromo aprobada de Pablo, Hugo y Sergio
  return [
    {
      id: 'a1000001-0000-4000-8000-000000000046',
      name: 'Pablo Martínez',
      fullName: 'Pablo Martínez García',
      team: 'Cadete B Fútbol',
      category: 'Cadete F11',
      dorsal: '10',
      position: 'CENTROCAMPISTA',
      avatarIcon: '👦',
      cardImage: require('../../../assets/images/cromo_pablo_gold.jpg'),
      level: 14,
      currentXp: 1250,
      nextLevelXp: 2000,
      streakWeeks: 4,
    },
    {
      id: 'a1000001-0000-4000-8000-000000000047',
      name: 'Hugo Martínez',
      fullName: 'Hugo Martínez García',
      team: 'Infantil A Fútbol',
      category: 'Infantil F11',
      dorsal: '9',
      position: 'DELANTERO',
      avatarIcon: '👦',
      cardImage: require('../../../assets/images/cromo_hugo_gold.jpg'),
      level: 12,
      currentXp: 980,
      nextLevelXp: 1500,
      streakWeeks: 3,
    },
    {
      id: 'a1000001-0000-4000-8000-000000000048',
      name: 'Sergio García',
      fullName: 'Sergio García Martínez',
      team: 'Benjamín A Futsal',
      category: 'Benjamín 5v5',
      dorsal: '5',
      position: 'CIERRE',
      avatarIcon: '👦',
      level: 8,
      currentXp: 450,
      nextLevelXp: 1000,
      streakWeeks: 2,
    }
  ];
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

  // Fuente única y unificada de deportistas
  const playersList = getUnifiedFamilyPlayers(linkedPlayers);

  const selectedPlayerId = activePlayerId || playersList[0]?.id || null;
  const activeChild = playersList.find(c => c.id === selectedPlayerId) || playersList[0] || null;

  // Hook de gamificación persistida en Supabase por jugador_id
  const { 
    gamification, 
    loading: gamiLoading, 
    error: gamiError 
  } = usePlayerGamification(selectedPlayerId);

  const isLoading = authLoading || gamiLoading;
  const errorMessage = authError || gamiError;

  // Valores de gamificación con fallbacks seguros basados en la ficha del jugador
  const safeGamification = {
    level: gamification?.level ?? activeChild?.level ?? 14,
    xpTotal: gamification?.xpTotal ?? activeChild?.currentXp ?? 1250,
    nextLevelXp: gamification?.nextLevelXp ?? activeChild?.nextLevelXp ?? 2000,
    rachaActual: gamification?.rachaActual ?? activeChild?.streakWeeks ?? 4,
    insigniasConseguidasCount: gamification?.insigniasConseguidasCount ?? 6,
    badgesMap: gamification?.badgesMap ?? {},
    challengesMap: gamification?.challengesMap ?? {},
  };

  const xpPct = Math.min(100, Math.max(0, (safeGamification.xpTotal / safeGamification.nextLevelXp) * 100));
  const retosCurrentCategory = getRetosByCategory(activeRetoTab);

  const handleShareCard = async () => {
    if (!activeChild) return;
    try {
      await Share.share({
        message: `🔥 ¡MIRA EL CROMO OFICIAL FFCV 2026 DE ${activeChild.fullName.toUpperCase()}! Dorsal #${activeChild.dorsal} - ${activeChild.team}.`,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} 
      showsVerticalScrollIndicator={false}
    >
      {/* ENCABEZADO DE SECCIÓN */}
      <View style={styles.headerBanner}>
        <LinearGradient
          colors={['rgba(79, 195, 247, 0.15)', 'transparent']}
          style={styles.gradientBg}
        />
        <View style={styles.headerTopRow}>
          <View style={styles.badgeSparkle}>
            <Ionicons name="star" size={16} color={colors.accentGold} />
            <Text style={styles.badgeSparkleTxt}>IDENTIDAD + GAMIFICACIÓN • CD JESUITAS</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>🌟 MI ZONA</Text>
        <Text style={styles.headerSubtitle}>
          Cromo oficial, nivel, racha, retos e insignias de {activeChild?.fullName || 'deportista'}
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
      {playersList.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="shield-outline" size={44} color={colors.skyGlow} />
          <Text style={styles.emptyTitle}>No hay un jugador vinculado a esta cuenta</Text>
          <Text style={styles.emptySubtext}>
            Para acceder a Mi Zona debes contar con al menos un jugador a tu cargo validado por el club.
          </Text>
        </View>
      ) : (
        <>
          {/* SELECTOR DE HIJOS (SI HAY MÁS DE UNO) */}
          {playersList.length > 1 && (
            <View style={styles.childSelectorGroup}>
              <Text style={styles.selectorLabel}>DEPORTISTA SELECCIONADO:</Text>
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

          {/* SECCIÓN SUPERIOR RESPONSIVE: CROMO (IZQUIERDA) + GAMIFICACIÓN (DERECHA EN ESCRITORIO / ABAJO EN MÓVIL) */}
          <View style={[styles.topHeroLayout, isTablet && styles.topHeroLayoutTablet]}>
            {/* CROMO OFICIAL UNIFICADO (PlayerCard) */}
            <View style={[styles.cromoCol, isTablet && styles.cromoColTablet]}>
              <Text style={styles.sectionTitle}>CROMO OFICIAL</Text>
              <PlayerCard
                name={activeChild?.fullName || 'Deportista'}
                dorsal={activeChild?.dorsal}
                position={activeChild?.position}
                team={activeChild?.team}
                category={activeChild?.category}
                level={safeGamification.level}
                currentXp={safeGamification.xpTotal}
                nextLevelXp={safeGamification.nextLevelXp}
                streakWeeks={safeGamification.rachaActual}
                photo={activeChild?.avatarIcon || '👦'}
                hideGamification={false}
              />

              <TouchableOpacity 
                style={styles.btnShareFifaGold} 
                onPress={handleShareCard}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#EAB308', '#CA8A04']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.btnShareFifaGradient}
                >
                  <Ionicons name="share-social" size={18} color="#030200" />
                  <Text style={styles.btnShareFifaText}>COMPARTIR CROMO EN WHATSAPP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* PANEL DE PROGRESO Y GAMIFICACIÓN LATERAL */}
            <View style={[styles.gamiCol, isTablet && styles.gamiColTablet]}>
              <Text style={styles.sectionTitle}>RESUMEN DE GAMIFICACIÓN</Text>

              {/* CARD NIVEL Y EXPERIENCIA */}
              <View style={styles.gamiBox}>
                <View style={styles.gamiBoxHeader}>
                  <Ionicons name="sparkles" size={20} color={colors.accentGold} />
                  <Text style={styles.gamiBoxTitle}>NIVEL Y EXPERIENCIA</Text>
                </View>
                <Text style={styles.levelBigVal}>NIVEL {safeGamification.level}</Text>
                
                <View style={styles.xpBarBlock}>
                  <View style={styles.xpBarHeaderRow}>
                    <Text style={styles.xpBarLabel}>PROGRESO XP</Text>
                    <Text style={styles.xpBarVal}>{safeGamification.xpTotal} / {safeGamification.nextLevelXp} XP</Text>
                  </View>
                  <View style={styles.xpBarTrack}>
                    <LinearGradient
                      colors={['#4FC3F7', '#F59E0B']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.xpBarFill, { width: `${xpPct}%` }]}
                    />
                  </View>
                  <Text style={styles.nextLevelSub}>Faltan {safeGamification.nextLevelXp - safeGamification.xpTotal} XP para Nivel {safeGamification.level + 1}</Text>
                </View>
              </View>

              {/* CARD RACHA ACTUAL */}
              <View style={styles.gamiBox}>
                <View style={styles.gamiBoxHeader}>
                  <Text style={{ fontSize: 20 }}>🔥</Text>
                  <Text style={styles.gamiBoxTitle}>RACHA CONSECUTIVA</Text>
                </View>
                <Text style={styles.streakBigVal}>{safeGamification.rachaActual} Semanas Seguidas</Text>
                <Text style={styles.streakSub}>¡Asistencia y compromiso perfecto en los entrenamientos!</Text>
              </View>

              {/* STATS RÁPIDAS DE COLECCIÓN */}
              <View style={styles.quickCollectionRow}>
                <View style={styles.quickStatCard}>
                  <Text style={styles.quickStatIcon}>🏅</Text>
                  <Text style={styles.quickStatVal}>{safeGamification.insigniasConseguidasCount} / {INSIGNIAS.length}</Text>
                  <Text style={styles.quickStatLabel}>Insignias</Text>
                </View>
                <View style={styles.quickStatCard}>
                  <Text style={styles.quickStatIcon}>⭐</Text>
                  <Text style={styles.quickStatVal}>{safeGamification.xpTotal} XP</Text>
                  <Text style={styles.quickStatLabel}>XP Total</Text>
                </View>
              </View>
            </View>
          </View>

          {/* RETOS FORMATIVOS Y OBJETIVOS */}
          <Text style={styles.sectionTitle}>RETOS FORMATIVOS Y HÁBITOS</Text>
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
              const currentVal = userReto ? userReto.progreso_actual : reto.curr;
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

          {/* INSIGNIAS Y COLECCIÓN */}
          <Text style={styles.sectionTitle}>COLECCIÓN DE INSIGNIAS OFICIALES</Text>
          <View style={styles.insigniasGrid}>
            {INSIGNIAS.map((insignia) => {
              const userBadge = safeGamification.badgesMap[insignia.slug];
              const isUnlocked = !!userBadge ? userBadge.conseguida : insignia.unlocked;
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
    maxWidth: 950,
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
  topHeroLayout: {
    gap: 16,
    marginBottom: 10,
  },
  topHeroLayoutTablet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cromoCol: {
    width: '100%',
  },
  cromoColTablet: {
    width: 380,
  },
  gamiCol: {
    width: '100%',
  },
  gamiColTablet: {
    flex: 1,
  },
  btnShareFifaGold: {
    borderRadius: 14,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  btnShareFifaGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  btnShareFifaText: {
    color: '#030200',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 16,
    marginBottom: 10,
  },
  gamiBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  gamiBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  gamiBoxTitle: {
    color: colors.skyGlow,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  levelBigVal: {
    color: colors.accentGold,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 12,
  },
  streakBigVal: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
  },
  streakSub: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  xpBarBlock: {
    marginTop: 4,
  },
  xpBarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  xpBarLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  xpBarVal: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  xpBarTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  nextLevelSub: {
    color: colors.skyGlow,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
  },
  quickCollectionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  quickStatIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  quickStatVal: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '900',
  },
  quickStatLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
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
