import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumHeader } from '../../../src/components/ui/PremiumHeader';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  accentGold: '#F59E0B',
  goldLight: '#FDE047',
  accentGreen: '#10B981',
  accentRed: '#EF4444',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  borderGlow: 'rgba(79, 195, 247, 0.25)',
};

const MOCK_TEAMMATES_CONVOCADOS = [
  { dorsal: 1, nombre: 'Marc Valls', pos: 'Portero' },
  { dorsal: 4, nombre: 'Adrián García', pos: 'Defensa Central' },
  { dorsal: 7, nombre: 'Santi Giménez', pos: 'Centrocampista' },
  { dorsal: 9, nombre: 'Lucas Martínez', pos: 'Delantero' },
  { dorsal: 10, nombre: 'Pablo Martínez', pos: 'Mediapunta (TÚ)' },
  { dorsal: 11, nombre: 'Mateo Roldán', pos: 'Extremo Izquierdo' },
  { dorsal: 14, nombre: 'Hugo López', pos: 'Lateral Izquierdo' },
  { dorsal: 18, nombre: 'Diego Sanz', pos: 'Centrocampista' },
];

export default function ConvocatoriasJugadorScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  // CHECKLIST MOCHILA JUGADOR
  const [backpack, setBackpack] = useState({
    boots: true,
    shinGuards: true,
    matchKit: true,
    waterBottle: false,
    tracksuit: true,
  });

  const toggleItem = (key: keyof typeof backpack) => {
    setBackpack(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.navyDark }}>
      <PremiumHeader 
        title="4. CONVOCATORIAS" 
        subtitle="ESTADO PERSONAL Y LISTA DEL EQUIPO"
        showSearchAndActions={false}
        showAvatar={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
        
        {/* 1. TARJETA PRINCIPAL DEL ESTADO DE LA CONVOCATORIA */}
        <View style={styles.statusHeroCard}>
          <LinearGradient colors={['rgba(16, 185, 129, 0.25)', 'rgba(11, 34, 79, 0.98)']} style={styles.statusGradient}>
            <View style={styles.statusHeaderRow}>
              <View style={styles.statusIconCircle}>
                <Ionicons name="checkmark-circle" size={36} color={colors.accentGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.statusTitle}>⭐ ¡ESTÁS CONVOCADO!</Text>
                <Text style={styles.statusSub}>El míster cuenta contigo para la Jornada 9 vs Levante UD B.</Text>
              </View>
            </View>

            <View style={styles.matchDetailBanner}>
              <Text style={styles.matchTitle}>CD Jesuitas Cadete B vs Levante UD B</Text>
              <Text style={styles.matchDate}>📅 Sábado 1 Noviembre • 10:00h</Text>
              <Text style={styles.matchLoc}>📍 Campo 1 - Polideportivo San José (Local)</Text>
              <Text style={styles.citationBadge}>🏷️ Citación equipo: 09:15h en Vestuario 2</Text>
            </View>
          </LinearGradient>
        </View>

        {/* 2. MOCHILA DEL PARTIDO (CHECKLIST INTERACTIVO) */}
        <Text style={styles.sectionTitle}>🎒 CHECKLIST PARA MI MOCHILA DEL PARTIDO</Text>
        <View style={styles.backpackCard}>
          <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('boots')}>
            <Ionicons name={backpack.boots ? "checkbox" : "square-outline"} size={20} color={backpack.boots ? colors.accentGreen : colors.textMuted} />
            <Text style={[styles.checkItemTxt, backpack.boots && styles.checkItemDone]}>Botas de Tacos de Goma</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('shinGuards')}>
            <Ionicons name={backpack.shinGuards ? "checkbox" : "square-outline"} size={20} color={backpack.shinGuards ? colors.accentGreen : colors.textMuted} />
            <Text style={[styles.checkItemTxt, backpack.shinGuards && styles.checkItemDone]}>Espinilleras Oficiales</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('matchKit')}>
            <Ionicons name={backpack.matchKit ? "checkbox" : "square-outline"} size={20} color={backpack.matchKit ? colors.accentGreen : colors.textMuted} />
            <Text style={[styles.checkItemTxt, backpack.matchKit && styles.checkItemDone]}>1ª Equipación Oficial Azul (Camiseta + Pantalón + Medias)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('tracksuit')}>
            <Ionicons name={backpack.tracksuit ? "checkbox" : "square-outline"} size={20} color={backpack.tracksuit ? colors.accentGreen : colors.textMuted} />
            <Text style={[styles.checkItemTxt, backpack.tracksuit && styles.checkItemDone]}>Chándal Oficial del Club (Para llegada y calentamiento)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkItemRow} onPress={() => toggleItem('waterBottle')}>
            <Ionicons name={backpack.waterBottle ? "checkbox" : "square-outline"} size={20} color={backpack.waterBottle ? colors.accentGreen : colors.textMuted} />
            <Text style={[styles.checkItemTxt, backpack.waterBottle && styles.checkItemDone]}>Botella de Agua Rellenable (1.5L)</Text>
          </TouchableOpacity>
        </View>

        {/* 3. LISTA DE COMPAÑEROS CONVOCADOS */}
        <Text style={styles.sectionTitle}>👥 COMPAÑEROS CONVOCADOS (CADETE B)</Text>
        <View style={styles.squadCard}>
          {MOCK_TEAMMATES_CONVOCADOS.map((mate, idx) => (
            <View key={idx} style={[styles.squadRow, mate.dorsal === 10 && styles.squadRowHighlight]}>
              <View style={[styles.dorsalBox, mate.dorsal === 10 ? { backgroundColor: colors.accentGold } : { backgroundColor: colors.skyPrimary }]}>
                <Text style={styles.dorsalBoxTxt}>#{mate.dorsal}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.squadName}>{mate.nombre} {mate.dorsal === 10 ? '(TÚ)' : ''}</Text>
                <Text style={styles.squadPos}>{mate.pos}</Text>
              </View>
              <View style={styles.statusGreenBadge}>
                <Text style={styles.statusGreenBadgeTxt}>CONVOCADO</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 4. AVISO TÁCTICO Y LOGÍSTICO DEL MÍSTER */}
        <Text style={styles.sectionTitle}>💬 INDICACIONES DEL CUERPO TÉCNICO</Text>
        <View style={styles.coachCard}>
          <View style={styles.coachHeader}>
            <FontAwesome name="user-circle" size={18} color={colors.skyPrimary} />
            <Text style={styles.coachName}>Carlos Ruiz (1er Entrenador)</Text>
          </View>
          <Text style={styles.coachTxt}>
            "Puntualidad absoluta a las 09:15h en el Vestuario 2. Salimos a calentar a las 09:30h con máxima concentración. Venid ya cambiados con el chándal del club."
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  statusHeroCard: { borderRadius: 24, overflow: 'hidden', borderWidth: 2, borderColor: colors.accentGreen, backgroundColor: colors.navyCard, marginBottom: 20 },
  statusGradient: { padding: 16, gap: 12 },
  statusHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  statusIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(16, 185, 129, 0.2)', justifyContent: 'center', alignItems: 'center' },
  statusTitle: { color: colors.accentGreen, fontSize: 18, fontWeight: '900' },
  statusSub: { color: colors.white, fontSize: 12, fontWeight: '700', marginTop: 2, lineHeight: 16 },

  matchDetailBanner: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 14, gap: 4 },
  matchTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  matchDate: { color: colors.skyGlow, fontSize: 11, fontWeight: '800' },
  matchLoc: { color: colors.textMuted, fontSize: 11 },
  citationBadge: { color: colors.goldLight, fontSize: 11, fontWeight: '900', marginTop: 2 },

  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10, marginTop: 4 },

  backpackCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  checkItemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkItemTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },
  checkItemDone: { textDecorationLine: 'line-through', color: colors.textMuted },

  squadCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 12, borderWidth: 1, borderColor: colors.borderGlow, gap: 8, marginBottom: 20 },
  squadRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  squadRowHighlight: { backgroundColor: 'rgba(79, 195, 247, 0.12)', borderRadius: 10, paddingHorizontal: 6 },
  dorsalBox: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  dorsalBoxTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },
  squadName: { color: colors.white, fontSize: 12, fontWeight: '800' },
  squadPos: { color: colors.textMuted, fontSize: 10 },
  statusGreenBadge: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusGreenBadgeTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },

  coachCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 6, marginBottom: 20 },
  coachHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  coachName: { color: colors.skyGlow, fontSize: 11, fontWeight: '900' },
  coachTxt: { color: colors.white, fontSize: 12, fontStyle: 'italic', lineHeight: 17 }
});
