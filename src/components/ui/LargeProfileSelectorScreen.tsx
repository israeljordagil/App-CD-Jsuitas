// PANTALLA DE INICIO APROBADA
// No modificar estructura, diseño, imágenes, orden ni navegación
// sin autorización expresa del responsable del proyecto.

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  useWindowDimensions,
  Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, ActiveContextType } from '../../context/AuthContext';
import { AppRole } from '../../types/roles';
import { supabase } from '../../lib/supabase';

// Assets oficiales del repositorio
const ESCUDO_JESUITAS_EXACT = require('../../../assets/images/escudo_jesuitas_exact.png');

// Obtener la URL pública oficial desde Supabase Storage con parametro fijo de version ?v=png-final-20260802
const getEquipacionPublicUrl = (fileName: string): string => {
  if (!supabase) return '';
  const { data } = supabase.storage
    .from('Equipaciones CD Jesuitas')
    .getPublicUrl(fileName);

  return `${data?.publicUrl}?v=png-final-20260802`;
};

// Nombres exactos confirmados con HTTP 200 y Content-Type image/png en Supabase Storage
const FAMILIA_PNG_URL = getEquipacionPublicUrl('Camiseta primera equipacion 3D.png');
const PASEO_PNG_URL = getEquipacionPublicUrl('Camiseta de paseo 3D.png');
const DELEGADO_PNG_URL = getEquipacionPublicUrl('Camiseta delegado 3D.png');

// Fotografías cinematográficas tipo portada deportiva para la escena superior
const FAMILIA_SCENE_PHOTO = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
const ENTRENADOR_SCENE_PHOTO = 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80';
const DELEGADO_SCENE_PHOTO = 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80';
const COORDINACION_SCENE_PHOTO = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  skyPrimary: '#38BDF8',
  skyGlow: '#7DD3FC',
  blueCoach: '#0284C7',
  emeraldDelegate: '#10B981',
  goldCoord: '#F59E0B',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
};

interface ProfileCardData {
  id: ActiveContextType;
  title: string;
  items: string[];
  footerNote?: string;
  scenePhoto: string;
  productImageUrl: string;
  fallbackImageUrl: string;
  accentColor: string;
  borderColor: string;
  glowColor: string;
}

interface LargeProfileSelectorScreenProps {
  onSelectProfile: (profileId: ActiveContextType) => void;
}

export function LargeProfileSelectorScreen({ onSelectProfile }: LargeProfileSelectorScreenProps) {
  const { user, switchContext } = useAuth();
  const { width: screenWidth } = useWindowDimensions();
  const isDesktop = screenWidth >= 900;
  const isTablet = screenWidth >= 600 && screenWidth < 900;

  // Estados de interacción visual para hover y press por tarjeta
  const [hoveredCardId, setHoveredCardId] = useState<ActiveContextType | null>(null);
  const [pressedCardId, setPressedCardId] = useState<ActiveContextType | null>(null);

  // Control de errores de carga de imágenes con fallback
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  const handleSelect = (profileId: ActiveContextType) => {
    switchContext(profileId);
    onSelectProfile(profileId);
  };

  const PROFILES: ProfileCardData[] = [
    {
      id: 'FAMILIA',
      title: 'FAMILIA',
      items: ['Entrenamientos', 'Partidos', 'Calendario', 'Convocatorias', 'Avisos'],
      footerNote: 'Todo lo relacionado con tus hijos.',
      scenePhoto: FAMILIA_SCENE_PHOTO,
      productImageUrl: FAMILIA_PNG_URL,
      fallbackImageUrl: PASEO_PNG_URL,
      accentColor: '#38BDF8',
      borderColor: 'rgba(56, 189, 248, 0.85)',
      glowColor: 'rgba(56, 189, 248, 0.45)',
    },
    {
      id: 'ENTRENADOR',
      title: 'ENTRENADOR',
      items: ['Convocatorias', 'Entrenamientos', 'Asistencia', 'Plantilla', 'Estadísticas'],
      scenePhoto: ENTRENADOR_SCENE_PHOTO,
      productImageUrl: PASEO_PNG_URL,
      fallbackImageUrl: PASEO_PNG_URL,
      accentColor: '#0284C7',
      borderColor: 'rgba(2, 132, 199, 0.85)',
      glowColor: 'rgba(2, 132, 199, 0.45)',
    },
    {
      id: 'DELEGADO',
      title: 'DELEGADO',
      items: ['Partidos', 'Acta Previa', 'Documentación', 'Mi Equipo', 'Partido en Vivo'],
      footerNote: 'Gestión y documentación de partidos.',
      scenePhoto: DELEGADO_SCENE_PHOTO,
      productImageUrl: DELEGADO_PNG_URL,
      fallbackImageUrl: PASEO_PNG_URL,
      accentColor: '#10B981',
      borderColor: 'rgba(16, 185, 129, 0.85)',
      glowColor: 'rgba(16, 185, 129, 0.45)',
    },
    {
      id: 'COORDINADOR' as ActiveContextType,
      title: 'COORDINACIÓN',
      items: ['Equipos', 'Planificación', 'Organización', 'Incidencias', 'Supervisión'],
      scenePhoto: COORDINACION_SCENE_PHOTO,
      productImageUrl: PASEO_PNG_URL,
      fallbackImageUrl: PASEO_PNG_URL,
      accentColor: '#F59E0B',
      borderColor: 'rgba(245, 158, 11, 0.85)',
      glowColor: 'rgba(245, 158, 11, 0.45)',
    },
  ];

  // Filtrar para que cada usuario solo vea los perfiles autorizados en su cuenta (o todos si es admin/demo)
  const userRoles = user?.roles || [];
  const visibleProfiles = PROFILES.filter(profile => {
    if (!userRoles || userRoles.length === 0) return true;
    if (userRoles.includes('ADMIN_GENERAL') || userRoles.includes('DIR_DEPORTIVA')) return true;
    return userRoles.includes(profile.id as AppRole);
  });

  return (
    <View style={styles.container}>
      {/* FONDO VIVO DE ESTADIO ILUMINADO CON DEGRADADO PROFUNDO */}
      <Image source={{ uri: COORDINACION_SCENE_PHOTO }} style={styles.stadiumBgPhoto} />
      
      {/* WATERMARK MUY GRANDE DEL ESCUDO EN EL FONDO */}
      <View style={styles.watermarkContainer} pointerEvents="none">
        <Image source={ESCUDO_JESUITAS_EXACT} style={styles.watermarkImage} resizeMode="contain" />
      </View>

      <LinearGradient 
        colors={['rgba(2, 8, 20, 0.94)', 'rgba(7, 26, 61, 0.96)', 'rgba(2, 8, 20, 0.99)']} 
        style={StyleSheet.absoluteFill} 
      />

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, isDesktop && styles.scrollContentDesktop]}
        showsVerticalScrollIndicator={false}
      >
        {/* CABECERA INSTITUCIONAL */}
        <View style={styles.headerSection}>
          <Image 
            source={ESCUDO_JESUITAS_EXACT} 
            style={styles.officialShieldImage} 
            resizeMode="contain" 
          />
          <Text style={styles.brandTitleTxt}>CD JESUITAS</Text>
          <View style={styles.badgeLineRow}>
            <View style={styles.badgeLine} />
            <Text style={styles.brandSubtitleTxt}>Selección de perfil</Text>
            <View style={styles.badgeLine} />
          </View>
        </View>

        {/* TARJETAS HERO EQUILIBRADAS (2x2 EN ESCRITORIO, ADAPTATIVAS EN MÓVIL) */}
        <View style={[
          styles.cardsGrid, 
          isDesktop && styles.cardsGridDesktop,
          isTablet && styles.cardsGridTablet
        ]}>
          {visibleProfiles.map((card) => {
            const isHovered = hoveredCardId === card.id;
            const isPressed = pressedCardId === card.id;
            const hasFailed = failedImageIds[card.id];
            const activeImageUri = hasFailed ? card.fallbackImageUrl : card.productImageUrl;

            return (
              <TouchableOpacity
                key={card.id}
                activeOpacity={0.94}
                onPressIn={() => setPressedCardId(card.id)}
                onPressOut={() => setPressedCardId(null)}
                {...(Platform.OS === 'web' ? {
                  onMouseEnter: () => setHoveredCardId(card.id),
                  onMouseLeave: () => setHoveredCardId(null),
                } as any : {})}
                style={[
                  styles.exactCardContainer, 
                  { borderColor: isHovered ? card.accentColor : card.borderColor },
                  isDesktop && styles.exactCardDesktop,
                  isTablet && styles.exactCardTablet,
                  isHovered && styles.exactCardHovered,
                  isPressed && styles.exactCardPressed,
                ]}
                onPress={() => handleSelect(card.id)}
              >
                {/* 1. PARTE SUPERIOR: FOTOGRAFÍA CINEMATOGRÁFICA DE LA ESCENA */}
                <View style={styles.topSceneBox}>
                  <Image source={{ uri: card.scenePhoto }} style={styles.topSceneImage} />
                  <LinearGradient 
                    colors={['transparent', 'rgba(9, 27, 62, 0.98)']} 
                    style={StyleSheet.absoluteFill}
                  />
                </View>

                {/* 2. PARTE INFERIOR CON PRENDAS 3D PNG TRANSPARENTES DIRECTAS DESDE SUPABASE */}
                <View style={styles.bottomContentBox}>
                  <View style={styles.heroProductOverlapCol}>
                    <View style={styles.productGlowSpotlight}>
                      
                      {/* PRENDA 3D PNG DEFINITIVA CARGADA DESDE SUPABASE STORAGE */}
                      <Image 
                        source={{ uri: activeImageUri }} 
                        style={[
                          styles.heroProductImage,
                          isHovered ? styles.heroProductImageHovered : styles.heroProductImageNormal,
                          isPressed && styles.heroProductImagePressed,
                        ]} 
                        resizeMode="contain"
                        onError={() => {
                          setFailedImageIds(prev => ({ ...prev, [card.id]: true }));
                        }}
                      />

                      {/* SOMBRA DE SUELO 3D DISCRETA */}
                      <View 
                        style={[
                          styles.floorShadow3D,
                          isHovered ? styles.floorShadowHovered : styles.floorShadowNormal,
                        ]} 
                        pointerEvents="none" 
                      />

                    </View>
                  </View>

                  {/* DERECHA: INFORMACIÓN Y LISTA DE PUNTOS */}
                  <View style={styles.infoRightCol}>
                    <Text 
                      style={[styles.cardTitleTxt, { color: card.accentColor }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {card.title}
                    </Text>

                    <View style={styles.itemListGroup}>
                      {card.items.map((item, idx) => (
                        <View key={idx} style={styles.itemRow}>
                          <View style={[styles.accentDot, { backgroundColor: card.accentColor }]} />
                          <Text style={styles.itemTxt}>{item}</Text>
                        </View>
                      ))}
                    </View>

                    {card.footerNote && (
                      <Text style={[styles.footerNoteTxt, { color: card.accentColor }]}>
                        {card.footerNote}
                      </Text>
                    )}

                    {/* BOTÓN CIRCULAR DE NAVEGACIÓN DERECHA */}
                    <View style={[
                      styles.arrowCircleBtn, 
                      { borderColor: card.accentColor, backgroundColor: `${card.accentColor}25` },
                      isHovered && { backgroundColor: card.accentColor, borderColor: colors.white }
                    ]}>
                      <Ionicons name="arrow-forward" size={18} color={isHovered ? colors.navyDark : card.accentColor} />
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PIE DE PÁGINA INSTITUCIONAL */}
        <View style={styles.footerRow}>
          <Ionicons name="shield-checkmark-outline" size={14} color={colors.skyPrimary} />
          <Text style={styles.footerCopyTxt}>PASIÓN · VALORES · EXCELENCIA</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.navyDark,
    minHeight: Platform.OS === 'web' ? ('100vh' as any) : '100%',
    position: 'relative',
  },
  stadiumBgPhoto: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.18,
  },
  watermarkContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  watermarkImage: {
    width: 520,
    height: 620,
    opacity: 0.07,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 36,
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  scrollContentDesktop: {
    paddingTop: 45,
    maxWidth: 960,
    alignSelf: 'center',
  },

  // HEADER
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  officialShieldImage: {
    width: 86,
    height: 100,
    marginBottom: 10,
  },
  brandTitleTxt: {
    color: colors.white,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeLine: {
    width: 30,
    height: 1,
    backgroundColor: 'rgba(56, 189, 248, 0.4)',
  },
  brandSubtitleTxt: {
    color: colors.skyGlow,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  // GRID Y TARJETAS (DISTRIBUCIÓN 2x2 EN ESCRITORIO)
  cardsGrid: {
    width: '100%',
    gap: 22,
  },
  cardsGridDesktop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 22,
    maxWidth: 880,
  },
  cardsGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  exactCardContainer: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    backgroundColor: colors.navyCard,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 14,
    ...(Platform.OS === 'web' ? {
      transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
    } as any : {}),
  },
  exactCardDesktop: {
    width: '48%',
    maxWidth: 420,
  },
  exactCardTablet: {
    width: '47%',
    minWidth: 280,
  },
  exactCardHovered: {
    transform: [{ translateY: -4 }],
    shadowOpacity: 0.75,
    shadowRadius: 26,
  },
  exactCardPressed: {
    transform: [{ scale: 0.97 }, { translateY: 2 }],
  },

  topSceneBox: {
    height: 160,
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  topSceneImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  bottomContentBox: {
    flexDirection: 'row',
    padding: 16,
    minHeight: 220,
    backgroundColor: '#051433',
    position: 'relative',
  },

  heroProductOverlapCol: {
    width: 140,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
    zIndex: 20,
  },
  productGlowSpotlight: {
    marginTop: -40,
    borderRadius: 0,
    overflow: 'visible',
    backgroundColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },

  // EQUIPACIÓN 3D CON TRANSPARENCIA REAL DESDE SUPABASE STORAGE
  heroProductImage: {
    width: 170,
    height: 200,
    opacity: 1,
    backgroundColor: 'transparent',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    ...(Platform.OS === 'web' ? {
      transition: 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1), filter 0.32s ease',
    } as any : {}),
  },
  heroProductImageNormal: {
    transform: [
      { perspective: 900 } as any,
      { rotateY: '-7deg' },
      { rotateX: '3deg' },
      { translateY: 0 },
      { scale: 1 }
    ],
    ...(Platform.OS === 'web' ? {
      filter: 'drop-shadow(0px 10px 14px rgba(0, 0, 0, 0.6))',
    } as any : {}),
  },
  heroProductImageHovered: {
    transform: [
      { perspective: 900 } as any,
      { rotateY: '7deg' },
      { rotateX: '-2deg' },
      { translateY: -10 },
      { scale: 1.10 }
    ],
    ...(Platform.OS === 'web' ? {
      filter: 'drop-shadow(0px 20px 24px rgba(0, 0, 0, 0.75)) drop-shadow(0px 0px 14px rgba(255, 255, 255, 0.25))',
    } as any : {}),
  },
  heroProductImagePressed: {
    transform: [
      { scale: 0.97 },
      { translateY: 2 }
    ],
  },

  // SOMBRA DE SUELO 3D DISCRETA NO RECTANGULAR
  floorShadow3D: {
    position: 'absolute',
    bottom: -6,
    width: 100,
    height: 12,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    transform: [{ scaleX: 1.1 }],
    zIndex: 1,
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      filter: 'blur(3px)',
    } as any : {}),
  },
  floorShadowNormal: {
    opacity: 0.5,
    transform: [{ scaleX: 1.1 }, { translateY: 0 }],
  },
  floorShadowHovered: {
    opacity: 0.2,
    transform: [{ scaleX: 0.75 }, { translateY: 8 }],
  },

  infoRightCol: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardTitleTxt: {
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 8,
    ...(Platform.OS === 'web' ? {
      whiteSpace: 'nowrap',
    } as any : {}),
  },
  itemListGroup: {
    gap: 4,
    marginBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accentDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  itemTxt: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  footerNoteTxt: {
    fontSize: 10.5,
    fontWeight: '700',
    fontStyle: 'italic',
    marginTop: 4,
  },
  arrowCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 6,
  },

  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 36,
    paddingBottom: 24,
  },
  footerCopyTxt: {
    color: colors.skyGlow,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
