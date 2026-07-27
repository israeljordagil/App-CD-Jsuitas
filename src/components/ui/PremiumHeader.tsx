import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, Modal, Pressable, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { colors, spacing, typography } from '../../utils/theme';
import { useNavigation } from 'expo-router';
import { useRole, UserRole } from '../../context/RoleContext';

const { width } = Dimensions.get('window');

interface PremiumHeaderProps {
  title: string;
  subtitle?: string;
  showAvatar?: boolean;
  showSearchAndActions?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

export function PremiumHeader({ title, subtitle, showAvatar = false, showSearchAndActions = false, showBackButton = false, onBackPress }: PremiumHeaderProps) {
  const navigation = useNavigation<any>();
  const { role, setRole } = useRole();
  const [menuVisible, setMenuVisible] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const getRoleLabel = (r: UserRole) => {
    switch(r) {
      case 'familia': return 'Familias';
      case 'jugador': return 'Jugador';
      case 'entrenador': return 'Entrenador';
      case 'coordinador': return 'Coordinador';
      default: return r;
    }
  };

  const getRoleIcon = (r: UserRole) => {
    switch(r) {
      case 'familia': return 'group';
      case 'jugador': return 'user';
      case 'entrenador': return 'graduation-cap';
      case 'coordinador': return 'futbol-o';
      default: return 'user';
    }
  };

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setMenuVisible(false);
  };

  return (
    <Animated.View style={[styles.headerContainer, { transform: [{ translateY: slideAnim }], opacity: fadeAnim }]}>
      <LinearGradient 
        colors={['rgba(4, 16, 38, 0.8)', 'rgba(4, 16, 38, 0.0)']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.heroOverlay}>
           <FontAwesome name="shield" size={width * 0.5} color="rgba(255,255,255,0.04)" style={styles.bgShield} />
        </View>

        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuBtn}>
            <FontAwesome name="bars" size={24} color={colors.white} />
          </TouchableOpacity>

          {showBackButton && (
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <FontAwesome name="angle-left" size={18} color={colors.white} style={{ marginRight: 6 }} />
              <Text style={styles.backButtonText}>Volver a deportes</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.titleContainer}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    shadowColor: colors.navy,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 100,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  gradient: {
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 44 : 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: -width * 0.1,
  },
  bgShield: {
    transform: [{ rotate: '15deg' }, { scale: 0.8 }],
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    zIndex: 10,
  },
  menuBtn: {
    padding: 6,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  backButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileInfo: {
    marginRight: 8,
    alignItems: 'flex-end',
    marginLeft: 4,
  },
  profileName: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '800',
  },
  profileRoleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  profileRole: {
    color: colors.sky,
    fontSize: 11,
    fontWeight: '700',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    zIndex: 10,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: spacing.m,
  },
  dropdownMenu: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.m,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  dropdownHeader: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: spacing.s,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.s,
    borderRadius: 8,
    marginBottom: 4,
    paddingHorizontal: spacing.s,
  },
  dropdownItemActive: {
    backgroundColor: 'rgba(85,199,243,0.1)',
  },
  dropdownIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(7,26,61,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.s,
  },
  dropdownIconBoxActive: {
    backgroundColor: colors.sky,
  },
  dropdownItemText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '700',
  },
  dropdownItemTextActive: {
    color: colors.sky,
    fontWeight: '900',
  }
});
