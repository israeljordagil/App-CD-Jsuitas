import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../utils/theme';
import { FontAwesome } from '@expo/vector-icons';

interface MatchScoreProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'LIVE' | 'FINISHED' | 'UPCOMING';
  minute?: string;
  date?: string;
}

export function MatchScore({ homeTeam, awayTeam, homeScore, awayScore, status, minute, date }: MatchScoreProps) {
  return (
    <View style={styles.container}>
      <View style={styles.statusBadge}>
        {status === 'LIVE' && <View style={styles.liveIndicator} />}
        <Text style={[styles.statusText, status === 'LIVE' && styles.statusTextLive]}>
          {status === 'LIVE' ? `${minute}'` : status === 'FINISHED' ? 'FINAL' : date}
        </Text>
      </View>
      
      <View style={styles.scoreRow}>
        <View style={styles.teamBox}>
          <View style={styles.crestPlaceholder}>
             <FontAwesome name="shield" size={40} color={colors.sky} />
          </View>
          <Text style={styles.teamName} numberOfLines={2}>{homeTeam}</Text>
        </View>

        <View style={styles.scoreBox}>
          {status !== 'UPCOMING' ? (
            <Text style={styles.scoreText}>{homeScore} - {awayScore}</Text>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
        </View>

        <View style={styles.teamBox}>
          <View style={styles.crestPlaceholder}>
             <FontAwesome name="shield" size={40} color={colors.sky} />
          </View>
          <Text style={styles.teamName} numberOfLines={2}>{awayTeam}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.m,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginBottom: spacing.l,
    borderWidth: 1,
    borderColor: colors.border,
  },
  liveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
    marginRight: 6,
  },
  statusText: {
    color: colors.muted,
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.bold,
  },
  statusTextLive: {
    color: colors.navy,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  teamBox: {
    flex: 1,
    alignItems: 'center',
  },
  crestPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.s,
  },
  teamName: {
    color: colors.navy,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  scoreBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    color: colors.navy,
    fontSize: typography.sizes.score,
    fontWeight: typography.weights.black,
    letterSpacing: 2,
  },
  vsText: {
    color: colors.muted,
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.black,
  }
});
