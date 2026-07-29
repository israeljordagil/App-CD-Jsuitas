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

  // Identificador del jugador seleccionado (UUID real)
  const selectedPlayerId = activePlayerId || linkedPlayers[0]?.id || null;
  const activeChild = linkedPlayers.find(c => c.id === selectedPlayerId) || linkedPlayers[0] || null;

  // Hook de gamificación persistida en Supabase por jugador_id
  const { 
    gamification, 
    loading: gamiLoading, 
    error: gamiError 
  } = usePlayerGamification(selectedPlayerId);

  const isLoading = authLoading || gamiLoading;
  const errorMessage = authError || gamiError;

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
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.headerTopRow}>
          <View style={styles.badgeSparkle}>
            <Ionicons name="star" size={16} color={colors.accentGold} />
            <Text style={styles.badgeSparkleTxt}>GAMIFICACIÓN PERSISTIDA • PROGRESO REAL</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>🌟 MI ZONA</Text>
        <Text style={styles.headerSubtitle}>
          Retos, insignias, racha y nivel deportivo de {activeChild?.name || 'deportista'} vinculados a Supabase
        </Text>
      </View>

      {/* ESTADO DE CARGA */}
      {isLoading && (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.skyPrimary} />
          <Text style={styles.loadingText}>Cargando progreso persistido del jugador...</Text>
        </View>
      )}

      {/* ESTADO DE ERROR */}
      {!isLoading && errorMessage && (
        <View style={styles.errorBox}>
          <Ionicons name="warning-outline" size={24} color={colors.accentRed} />
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      {/* ESTADO DE LISTA VACÍA / ACCESO NO AUTORIZADO */}
      {!isLoading && !errorMessage && linkedPlayers.length === 0 && (
        <View style={styles.emptyBox}>
          <Ionicons name="shield-outline" size={44} color={colors.skyGlow} />
          <Text style={styles.emptyTitle}>No hay un jugador vinculado a esta cuenta</Text>
          <Text style={styles.emptySubtext}>
            Para acceder a Mi Zona debes contar con al menos un jugador a tu cargo validado por el club.
          </Text>
        </View>
      )}

      {/* CONTENIDO PRINCIPAL DE MI ZONA */}
      {!isLoading && linkedPlayers.length > 0 && activeChild && gamification && (
        <>
          {/* SELECTOR RÁPIDO DE HIJO EN MI ZONA */}
          {linkedPlayers.length > 1 && (
            <View style={styles.childSelectorGroup}>
              <Text style={styles.selectorLabel}>CAMBIAR DEPORTISTA:</Text>
              <View style={styles.selectorRow}>
                {linkedPlayers.map((child) => {
                  const isSelected = child.id === selectedPlayerId;
                  return (
                    <TouchableOpacity
                      key={child.id} // UUID real
                      activeOpacity={0.8}
                      style={[styles.childChip, isSelected && styles.childChipActive]}
                      onPress={() => switchActivePlayer(child.id)}
                    >
                      <Text style={{ fontSize: 16 }}>👦</Text>
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

          {/* 2. CROMO COMPARTIDO DEL JUGADOR CON DATOS PERSISTIDOS REALES */}
          <Text style={styles.sectionTitle}>1. CROMO OFICIAL DEL DEPORTISTA</Text>
          <CromoJugador
            name={activeChild.name}
            dorsal={activeChild.dorsal}
            position={activeChild.position}
            team={activeChild.team}
            category={activeChild.category}
            level={gamification.level}
            currentXp={gamification.xpTotal}
            nextLevelXp={gamification.nextLevelXp}
            streakWeeks={gamification.rachaActual}
            photo="👦"
          />

          {/* 3. RESUMEN DE RACHA & EXPERIENCIA GAMIFICADA (SUPABASE REAL) */}
          <Text style={styles.sectionTitle}>2. RESUMEN DE GAMIFICACIÓN EN SUPABASE</Text>
          <View style={styles.statsSummaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🔥</Text>
              <Text style={styles.summaryValue}>{gamification.rachaActual} Semanas</Text>
              <Text style={styles.summaryLabel}>Racha Actual</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>🏅</Text>
              <Text style={styles.summaryValue}>
                {gamification.insigniasConseguidasCount} / {INSIGNIAS.length}
              </Text>
              <Text style={styles.summaryLabel}>Insignias Conseguidas</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryIcon}>⭐</Text>
              <Text style={styles.summaryValue}>{gamification.xpTotal} XP</Text>
              <Text style={styles.summaryLabel}>Experiencia Total</Text>
            </View>
          </View>

          {/* 4. RETOS FORMATIVOS Y CRUCE DE ESTADOS REALES */}
          <Text style={styles.sectionTitle}>3. RETOS FORMATIVOS Y OBJETIVOS</Text>

          {/* CATEGORÍAS DE RETOS */}
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

          {/* LISTA DE RETOS CRUZADA CON JUGADOR_RETOS */}
          <View style={styles.retosContainer}>
            {retosCurrentCategory.map((reto: Reto) => {
              const dbReto = gamification.challengesMap[reto.slug];
              const currentProgress = dbReto ? dbReto.progreso_actual : 0;
              const isCompleted = dbReto ? dbReto.estado === 'completado' : currentProgress >= reto.total;
              const pct = Math.min(100, Math.round((currentProgress / reto.total) * 100));

              return (
                <View key={reto.id} style={[styles.retoCard, isCompleted && styles.retoCardCompleted]}>
                  <View style={styles.retoHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.retoCtxRow}>
                        <Text style={styles.retoCtxTag}>{reto.ctx}</Text>
                        <Text style={styles.retoDiffTag}>{reto.diff}</Text>
                      </View>
                      <Text style={[styles.retoTitle, isCompleted && styles.retoTitleCompleted]}>
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
                        isCompleted && { backgroundColor: colors.accentGreen }
                      ]} 
                    />
                  </View>

                  <View style={styles.retoFooterRow}>
                    <Text style={styles.retoProgressTxt}>Progreso: {currentProgress} / {reto.total}</Text>
                    {isCompleted ? (
                      <Text style={styles.completedTxt}>✅ ¡COMPLETADO!</Text>
                    ) : (
                      <Text style={styles.pendingTxt}>{pct}% completado</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* 5. INSIGNIAS Y CRUCE CON JUGADOR_INSIGNIAS */}
          <Text style={styles.sectionTitle}>4. INSIGNIAS DEL CD JESUITAS</Text>
          <View style={styles.insigniasGrid}>
            {INSIGNIAS.map((ins: Insignia) => {
              const dbBadge = gamification.badgesMap[ins.slug];
              const isUnlocked = dbBadge ? dbBadge.conseguida : false;
              const unlockDate = dbBadge?.conseguida_at 
                ? new Date(dbBadge.conseguida_at).toLocaleDateString('es-ES') 
                : ins.date;

              return (
                <View 
                  key={ins.id} 
                  style={[styles.insigniaCard, !isUnlocked && styles.insigniaCardLocked]}
                >
                  <View style={[
                    styles.insigniaIconCircle, 
                    { backgroundColor: isUnlocked ? `${ins.color}25` : 'rgba(255,255,255,0.05)' },
                    { borderColor: isUnlocked ? ins.color : 'rgba(255,255,255,0.1)' }
                  ]}>
                    <FontAwesome 
                      name={isUnlocked ? (ins.icon as any) : 'lock'} 
                      size={26} 
                      color={isUnlocked ? ins.color : colors.textMuted} 
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <View style={styles.insTitleRow}>
                      <Text style={[styles.insTitle, !isUnlocked && styles.insTitleLocked]}>
                        {ins.title}
                      </Text>
                      {isUnlocked && (
                        <View style={styles.unlockedTag}>
                          <Text style={styles.unlockedTagTxt}>DESBLOQUEADO</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.insDesc} numberOfLines={2}>{ins.desc}</Text>
                    {isUnlocked && unlockDate && (
                      <Text style={styles.insDate}>Conseguido el {unlockDate}</Text>
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
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  headerBanner: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderGlow,
    overflow: 'hidden',
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  badgeSparkle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeSparkleTxt: { color: colors.accentGold, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  headerTitle: { color: colors.white, fontSize: 24, fontWeight: '900', marginTop: 6 },
  headerSubtitle: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginTop: 4, lineHeight: 18 },

  loadingBox: { padding: 40, alignItems: 'center' },
  loadingText: { color: colors.skyGlow, marginTop: 12, fontSize: 13, fontWeight: '700' },

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
  errorText: { color: colors.accentRed, fontSize: 13, fontWeight: '700', flex: 1 },

  emptyBox: {
    backgroundColor: colors.navyCard,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGlow,
    marginVertical: 16,
  },
  emptyTitle: { color: colors.white, fontSize: 16, fontWeight: '900', marginTop: 12, textAlign: 'center' },
  emptySubtext: { color: colors.textMuted, fontSize: 12, textAlign: 'center', marginTop: 6, lineHeight: 18 },

  childSelectorGroup: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  selectorLabel: { color: colors.skyPrimary, fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  selectorRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
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
  childChipText: { color: colors.textMuted, fontSize: 13, fontWeight: '700' },
  childChipTextActive: { color: colors.white, fontWeight: '900' },

  sectionTitle: {
    color: colors.skyPrimary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginTop: 20,
    marginBottom: 10,
  },

  statsSummaryGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  summaryIcon: { fontSize: 22, marginBottom: 4 },
  summaryValue: { color: colors.white, fontSize: 13, fontWeight: '900' },
  summaryLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700', marginTop: 2, textAlign: 'center' },

  tabsScroll: { marginBottom: 12 },
  retoTabPill: {
    backgroundColor: colors.navyCard,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  retoTabPillActive: { backgroundColor: colors.skyPrimary, borderColor: colors.skyPrimary },
  retoTabText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  retoTabTextActive: { color: colors.navyDark, fontWeight: '900' },

  retosContainer: { gap: 10, marginBottom: 16 },
  retoCard: {
    backgroundColor: colors.navyCard,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  retoCardCompleted: { borderColor: 'rgba(16, 185, 129, 0.4)', backgroundColor: 'rgba(16, 185, 129, 0.08)' },
  retoHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  retoCtxRow: { flexDirection: 'row', gap: 6, marginBottom: 4 },
  retoCtxTag: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },
  retoDiffTag: { fontSize: 10 },
  retoTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  retoTitleCompleted: { color: colors.white },
  xpBadge: { backgroundColor: 'rgba(245, 158, 11, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  xpBadgeTxt: { color: colors.accentGold, fontSize: 11, fontWeight: '900' },

  retoProgressTrack: { height: 6, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 3, overflow: 'hidden', marginVertical: 6 },
  retoProgressFill: { height: '100%', backgroundColor: colors.skyPrimary, borderRadius: 3 },
  retoFooterRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  retoProgressTxt: { color: colors.textMuted, fontSize: 10, fontWeight: '600' },
  completedTxt: { color: colors.accentGreen, fontSize: 10, fontWeight: '900' },
  pendingTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '700' },

  insigniasGrid: { gap: 10, marginBottom: 20 },
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
  insigniaCardLocked: { opacity: 0.55 },
  insigniaIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  insTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  insTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  insTitleLocked: { color: colors.textMuted },
  unlockedTag: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  unlockedTagTxt: { color: colors.accentGreen, fontSize: 8, fontWeight: '900' },
  insDesc: { color: colors.textMuted, fontSize: 11, marginTop: 2, lineHeight: 15 },
  insDate: { color: colors.skyGlow, fontSize: 9, fontWeight: '700', marginTop: 4 },
});
