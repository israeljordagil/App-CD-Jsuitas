import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export interface CromoJugadorProps {
  name: string;
  dorsal?: string;
  position?: string;
  team?: string;
  category?: string;
  level?: number;
  currentXp?: number;
  nextLevelXp?: number;
  streakWeeks?: number;
  photo?: string;
  avatarUrl?: string;
}

export const CromoJugador: React.FC<CromoJugadorProps> = ({
  name,
  dorsal,
  position,
  team,
  category,
  level = 14,
  currentXp = 1250,
  nextLevelXp = 2000,
  streakWeeks = 4,
  photo = '👦',
}) => {
  const xpPct = Math.min(100, Math.max(0, (currentXp / nextLevelXp) * 100));

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#1E293B', '#0B224F', '#071A3D']}
        style={styles.cardGradient}
      >
        <View style={styles.borderHighlight} />

        {/* CABECERA: ESCUDO CLUB + NIVEL */}
        <View style={styles.cardHeader}>
          <View style={styles.shieldBox}>
            <Text style={{ fontSize: 24 }}>🛡️</Text>
            <Text style={styles.clubTag}>CD JESUITAS</Text>
          </View>

          <View style={styles.levelBadge}>
            <Ionicons name="sparkles" size={14} color="#F59E0B" />
            <Text style={styles.levelBadgeText}>NIVEL {level}</Text>
          </View>
        </View>

        {/* AVATAR / FOTO Y DORSAL */}
        <View style={styles.heroSection}>
          <View style={styles.avatarGlowContainer}>
            <View style={styles.avatarCircle}>
              <Text style={{ fontSize: 48 }}>{photo}</Text>
            </View>
          </View>

          {dorsal && (
            <View style={styles.dorsalCircle}>
              <Text style={styles.dorsalText}>#{dorsal}</Text>
            </View>
          )}
        </View>

        {/* NOMBRE DEL DEPORTISTA */}
        <Text style={styles.playerName}>{name}</Text>

        {/* ETIQUETAS DE POSICIÓN Y EQUIPO (SI EXISTEN) */}
        <View style={styles.tagsRow}>
          {team && (
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{team}</Text>
            </View>
          )}
          {position && (
            <View style={[styles.tagPill, { backgroundColor: 'rgba(79, 195, 247, 0.2)' }]}>
              <Text style={[styles.tagText, { color: '#4FC3F7' }]}>{position}</Text>
            </View>
          )}
          {category && !team && (
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>{category}</Text>
            </View>
          )}
        </View>

        {/* RESUMEN BARRA XP & RACHA (GAMIFICACIÓN PURA) */}
        <View style={styles.xpSection}>
          <View style={styles.xpHeaderRow}>
            <Text style={styles.xpLabel}>EXPERIENCIA XP</Text>
            <Text style={styles.xpVal}>{currentXp} / {nextLevelXp} XP</Text>
          </View>
          <View style={styles.xpBarTrack}>
            <LinearGradient
              colors={['#4FC3F7', '#F59E0B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.xpBarFill, { width: `${xpPct}%` }]}
            />
          </View>
        </View>

        {/* INSIGNIA DE RACHA DEPORTIVA */}
        <View style={styles.streakFooter}>
          <View style={styles.streakPill}>
            <Text style={{ fontSize: 16 }}>🔥</Text>
            <Text style={styles.streakText}>RACHA: <Text style={{ color: '#F59E0B', fontWeight: '900' }}>{streakWeeks} Semanas Seguidas</Text></Text>
          </View>
        </View>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(79, 195, 247, 0.4)',
    marginVertical: 8,
    shadowColor: '#4FC3F7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  cardGradient: {
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  borderHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#4FC3F7',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shieldBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  clubTag: {
    color: '#81D4FA',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  levelBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelBadgeText: {
    color: '#F59E0B',
    fontSize: 11,
    fontWeight: '900',
  },
  heroSection: {
    position: 'relative',
    alignItems: 'center',
    justify: 'center',
    marginVertical: 8,
  },
  avatarGlowContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(79, 195, 247, 0.15)',
    borderWidth: 2,
    borderColor: '#4FC3F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#0B224F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dorsalCircle: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#071A3D',
  },
  dorsalText: {
    color: '#071A3D',
    fontSize: 12,
    fontWeight: '900',
  },
  playerName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  tagText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '800',
  },
  xpSection: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
  },
  xpHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  xpLabel: {
    color: '#81D4FA',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  xpVal: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
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
  streakFooter: {
    width: '100%',
    alignItems: 'center',
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  streakText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
