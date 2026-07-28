import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  useWindowDimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const MOCK_JUGADOR = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B',
  categoria: 'Cadete (Fútbol 11)',
  dorsal: 10,
  posicion: 'Mediapunta / Delantero',
  estado: 'CONVOCADO',
  fechaNacimiento: '12/04/2011',
  edad: '15 años',
  pieDominante: 'Diestro 👟',
  nivel: 14,
  progresoXp: 62.5, // 1250/2000
};

const MOCK_TEAMMATES = [
  { dorsal: 1, nombre: 'Marc V.', pos: 'Portero' },
  { dorsal: 4, nombre: 'Adrián G.', pos: 'Defensa' },
  { dorsal: 7, nombre: 'Santi G.', pos: 'Centrocampista' },
  { dorsal: 9, nombre: 'Lucas M.', pos: 'Delantero' },
  { dorsal: 11, nombre: 'Mateo R.', pos: 'Extremo' },
];

const MOCK_STAFF = [
  { rol: 'Entrenador', nombre: 'Carlos Ruiz', image: require('../../../assets/images/staff/entrenador.jpg') },
  { rol: '2º Entrenador', nombre: 'Mario Santos', image: require('../../../assets/images/staff/segundo.jpg') },
  { rol: 'Delegado', nombre: 'Roberto Navarro', image: require('../../../assets/images/staff/delegado.jpg') },
  { rol: 'Coordinador F11', nombre: 'Javier Domínguez', image: require('../../../assets/images/staff/coordinador.jpg') },
];

const VALORES_JESUITAS = [
  '🤝 Respeto total al rival, compañeros y equipo arbitral.',
  '💪 Esfuerzo máximo y superación en cada entrenamiento.',
  '⚽ El equipo siempre está por encima de las individualidades.',
  '⏱️ Puntualidad y compromiso con los horarios del grupo.'
];

export default function MiPerfilScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  return (
    <View style={{ flex: 1, backgroundColor: colors.navyDark }}>
      <PremiumHeader 
        title="2. MI PERFIL" 
        subtitle="FICHA OFICIAL DEL JUGADOR"
        showSearchAndActions={false}
        showAvatar={false}
      />

      <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
        
        {/* 1. CROMO GOLD OFICIAL Y BARRA XP */}
        <View style={styles.cardHeaderGlow}>
          <LinearGradient colors={['rgba(11, 34, 79, 0.98)', 'rgba(7, 26, 61, 0.98)']} style={styles.cromoGradient}>
            
            <View style={styles.cromoTopRow}>
              <View style={styles.cromoFrame}>
                <Image 
                  source={require('../../../assets/images/cromo_pablo_gold.jpg')} 
                  style={styles.cromoImage} 
                  resizeMode="cover"
                />
                <View style={styles.dorsalBadge}>
                  <Text style={styles.dorsalTxt}>#{MOCK_JUGADOR.dorsal}</Text>
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryTxt}>{MOCK_JUGADOR.categoria}</Text>
                </View>
                <Text style={styles.cromoName}>{MOCK_JUGADOR.nombre}</Text>
                <Text style={styles.cromoPos}>{MOCK_JUGADOR.posicion}</Text>
                
                <View style={styles.activeTag}>
                  <Text style={styles.activeTagTxt}>🟢 {MOCK_JUGADOR.estado}</Text>
                </View>
              </View>
            </View>

            {/* NIVEL XP DEL JUGADOR */}
            <View style={styles.xpCardBox}>
              <View style={styles.xpHeaderRow}>
                <Text style={styles.xpLevelTxt}>NIVEL {MOCK_JUGADOR.nivel} • FORMATIVO</Text>
                <Text style={styles.xpPercentTxt}>1.250 / 2.000 XP (62%)</Text>
              </View>
              <View style={styles.xpBgBar}>
                <View style={[styles.xpFillBar, { width: `${MOCK_JUGADOR.progresoXp}%` }]} />
              </View>
            </View>

          </LinearGradient>
        </View>

        {/* 2. DATOS PERSONALES */}
        <Text style={styles.sectionTitle}>📋 DATOS PERSONALES</Text>
        <View style={styles.gridDataCard}>
          <View style={styles.dataItemBox}>
            <Ionicons name="calendar-outline" size={18} color={colors.skyPrimary} />
            <Text style={styles.dataLabel}>F. Nacimiento / Edad</Text>
            <Text style={styles.dataVal}>{MOCK_JUGADOR.fechaNacimiento} ({MOCK_JUGADOR.edad})</Text>
          </View>

          <View style={styles.dataItemBox}>
            <Ionicons name="footsteps-outline" size={18} color={colors.accentGold} />
            <Text style={styles.dataLabel}>Pie Dominante</Text>
            <Text style={styles.dataVal}>{MOCK_JUGADOR.pieDominante}</Text>
          </View>
        </View>

        {/* 3. DECÁLOGO DE VALORES CD JESUITAS */}
        <Text style={styles.sectionTitle}>📜 MI COMPROMISO Y VALORES JESUITAS</Text>
        <View style={styles.valuesCard}>
          {VALORES_JESUITAS.map((val, idx) => (
            <View key={idx} style={styles.valueRow}>
              <Text style={styles.valueTxt}>{val}</Text>
            </View>
          ))}
        </View>

        {/* 4. COMPAÑEROS DE EQUIPO EN SU VESTUARIO */}
        <Text style={styles.sectionTitle}>👥 MIS COMPAÑEROS DE EQUIPO (CADETE B)</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll} contentContainerStyle={{ gap: 10 }}>
          {MOCK_TEAMMATES.map((mate, idx) => (
            <View key={idx} style={styles.mateBox}>
              <View style={styles.mateBadge}>
                <Text style={styles.mateBadgeTxt}>#{mate.dorsal}</Text>
              </View>
              <Text style={styles.mateName}>{mate.nombre}</Text>
              <Text style={styles.matePos}>{mate.pos}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 5. CUERPO TÉCNICO / STAFF A CARGO */}
        <Text style={styles.sectionTitle}>👔 STAFF TÉCNICO DE SU EQUIPO</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll} contentContainerStyle={{ gap: 12 }}>
          {MOCK_STAFF.map((person, idx) => (
            <View key={idx} style={styles.staffBox}>
              <Image source={person.image} style={styles.staffImg} />
              <Text style={styles.staffName}>{person.nombre}</Text>
              <Text style={styles.staffRole}>{person.rol}</Text>
            </View>
          ))}
        </ScrollView>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  cardHeaderGlow: { borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: colors.borderGlow, backgroundColor: colors.navyCard, marginBottom: 20 },
  cromoGradient: { padding: 16 },
  cromoTopRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  cromoFrame: { position: 'relative' },
  cromoImage: { width: 84, height: 84, borderRadius: 42, borderWidth: 2, borderColor: colors.accentGold },
  dorsalBadge: { position: 'absolute', bottom: -4, right: -4, backgroundColor: colors.navyDark, borderWidth: 1, borderColor: colors.accentGold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
  dorsalTxt: { color: colors.goldLight, fontSize: 12, fontWeight: '900' },

  categoryBadge: { backgroundColor: 'rgba(79, 195, 247, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginBottom: 4 },
  categoryTxt: { color: colors.skyGlow, fontSize: 9, fontWeight: '900', letterSpacing: 0.5 },
  cromoName: { color: colors.white, fontSize: 20, fontWeight: '900' },
  cromoPos: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginTop: 1 },
  activeTag: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, alignSelf: 'flex-start', marginTop: 6, borderWidth: 1, borderColor: colors.accentGreen },
  activeTagTxt: { color: colors.accentGreen, fontSize: 9, fontWeight: '900' },

  xpCardBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 14, gap: 6 },
  xpHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  xpLevelTxt: { color: colors.goldLight, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },
  xpPercentTxt: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },
  xpBgBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' },
  xpFillBar: { height: '100%', backgroundColor: colors.skyPrimary, borderRadius: 4 },

  // SECCIONES
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginBottom: 10, marginTop: 4 },
  
  gridDataCard: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  dataItemBox: { flex: 1, backgroundColor: colors.navyCard, padding: 12, borderRadius: 16, borderWidth: 1, borderColor: colors.borderGlow, gap: 4 },
  dataLabel: { color: colors.textMuted, fontSize: 10, fontWeight: '700' },
  dataVal: { color: colors.white, fontSize: 12, fontWeight: '900' },

  valuesCard: { backgroundColor: colors.navyCard, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: colors.borderGlow, gap: 10, marginBottom: 20 },
  valueRow: { borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', paddingBottom: 6 },
  valueTxt: { color: colors.white, fontSize: 12, fontWeight: '700', lineHeight: 17 },

  mateBox: { width: 95, backgroundColor: colors.navyCard, borderRadius: 14, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.borderGlow },
  mateBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  mateBadgeTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },
  mateName: { color: colors.white, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  matePos: { color: colors.textMuted, fontSize: 9, fontWeight: '700', textAlign: 'center', marginTop: 2 },

  staffScroll: { marginBottom: 20 },
  staffBox: { width: 110, backgroundColor: colors.navyCard, borderRadius: 14, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.borderGlow },
  staffImg: { width: 44, height: 44, borderRadius: 22, marginBottom: 6 },
  staffName: { color: colors.white, fontSize: 11, fontWeight: '800', textAlign: 'center' },
  staffRole: { color: colors.skyGlow, fontSize: 9, fontWeight: '700', textAlign: 'center', marginTop: 2 }
});
