import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  useWindowDimensions, 
  Share 
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Colores corporativos de lujo
const colors = {
  navyDark: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyGlow: '#81D4FA',
  goldMain: '#EAB308',
  goldLight: '#FEF08A',
  goldDark: '#854D0E',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
};

const MOCK_PLAYERS_DATA = [
  {
    id: 'p1',
    fullName: 'Pablo Martínez García',
    shortName: 'PABLO',
    fullLastName: 'MARTÍNEZ',
    team: 'Cadete B Fútbol',
    category: 'Cadete F11',
    dorsal: '10',
    position: 'CENTROCAMPISTA',
    cardImage: require('../../../assets/images/cromo_pablo_gold.jpg'),
    stats: {
      matches: 12,
      starter: 10,
      minutes: 820,
      minutesPct: '85%',
      goals: 8,
      assists: 5,
      yellowCards: 1,
      redCards: 0,
      trainingAttendance: '96%',
    },
    medical: {
      ffcvLicense: '24.891-V (Validada FFCV)',
      medicalStatus: 'APTO PARA COMPETICIÓN',
      validUntil: 'Junio 2027',
      allergies: 'Sin alergias registradas',
      observations: 'Ninguna indicación médica especial'
    },
    history: [
      { round: 'Jornada 12', opponent: 'Valencia CF C', score: '3 - 1', minPlayed: '70 min', goals: 1, assists: 1, rating: '9.2' },
      { round: 'Jornada 11', opponent: 'Torrent CF B', score: '2 - 2', minPlayed: '80 min', goals: 1, assists: 0, rating: '8.5' },
      { round: 'Jornada 10', opponent: 'Levante UD C', score: '4 - 0', minPlayed: '75 min', goals: 2, assists: 1, rating: '9.8' },
    ]
  },
  {
    id: 'p2',
    fullName: 'Hugo Martínez García',
    shortName: 'HUGO',
    fullLastName: 'MARTÍNEZ',
    team: 'Infantil A Fútbol',
    category: 'Infantil F11',
    dorsal: '9',
    position: 'DELANTERO',
    cardImage: require('../../../assets/images/cromo_hugo_gold.jpg'),
    stats: {
      matches: 12,
      starter: 11,
      minutes: 740,
      minutesPct: '78%',
      goals: 12,
      assists: 4,
      yellowCards: 0,
      redCards: 0,
      trainingAttendance: '98%',
    },
    medical: {
      ffcvLicense: '29.104-V (Validada FFCV)',
      medicalStatus: 'APTO PARA COMPETICIÓN',
      validUntil: 'Junio 2027',
      allergies: 'Alergia al polen',
      observations: 'Uso eventual de antihistamínico en primavera'
    },
    history: [
      { round: 'Jornada 12', opponent: 'Alboraya UD', score: '2 - 0', minPlayed: '65 min', goals: 2, assists: 0, rating: '9.5' },
      { round: 'Jornada 11', opponent: 'Patacona CF', score: '3 - 1', minPlayed: '70 min', goals: 1, assists: 1, rating: '8.8' },
    ]
  }
];

export function FamiliaMiHijo() {
  const { width: screenWidth } = useWindowDimensions();
  const isTablet = screenWidth >= 768;

  const [activeChildId, setActiveChildId] = useState<string>('p1');
  const [activeSubTab, setActiveSubTab] = useState<'cromo' | 'stats' | 'medical'>('cromo');

  const player = MOCK_PLAYERS_DATA.find(p => p.id === activeChildId) || MOCK_PLAYERS_DATA[0];

  const handleShareCard = async () => {
    try {
      await Share.share({
        message: `🔥 ¡MIRA EL CROMO OFICIAL FFCV 2026 DE ${player.fullName}! Dorsal #${player.dorsal} - ${player.team}.`
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, isTablet && styles.contentTablet]} showsVerticalScrollIndicator={false}>
      
      {/* 1. SELECTOR DE HIJO */}
      <View style={styles.childSelectorRow}>
        {MOCK_PLAYERS_DATA.map((p) => {
          const isActive = p.id === activeChildId;
          return (
            <TouchableOpacity
              key={p.id}
              style={[styles.childSelectorTab, isActive && styles.childSelectorTabActive]}
              onPress={() => setActiveChildId(p.id)}
            >
              <Text style={{ fontSize: 18 }}>👦</Text>
              <Text style={[styles.childSelectorText, isActive && styles.childSelectorTextActive]}>{p.shortName} {p.fullLastName}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 2. SUB-MENÚ DE PESTAÑAS */}
      <View style={styles.subTabsRow}>
        {[
          { id: 'cromo', label: '⭐ Cromo Oficial FFCV' },
          { id: 'stats', label: '📊 Estadísticas' },
          { id: 'medical', label: '🏥 Ficha Médica' },
        ].map((tab) => {
          const isSel = activeSubTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.subTabPill, isSel && styles.subTabPillActive]}
              onPress={() => setActiveSubTab(tab.id as any)}
            >
              <Text style={[styles.subTabText, isSel && styles.subTabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. VISTA 1: CROMO OFICIAL IDÉNTICO A LA FOTO DE REFERENCIA DEL USUARIO */}
      {activeSubTab === 'cromo' && (
        <View style={styles.cromoContainer}>
          <View style={styles.cardFrameWrapper}>
            <Image 
              source={player.cardImage} 
              style={styles.cardImageRender}
              resizeMode="contain"
            />
          </View>

          {/* BOTÓN COMPARTIR CROMO EN ORO METÁLICO */}
          <TouchableOpacity style={styles.btnShareFifaGold} onPress={handleShareCard}>
            <LinearGradient colors={['#EAB308', '#CA8A04']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.btnShareFifaGradient}>
              <Ionicons name="share-social" size={18} color="#030200" />
              <Text style={styles.btnShareFifaText}>COMPARTIR CROMO OFICIAL EN WHATSAPP</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      )}

      {/* 4. VISTA 2: SECCIÓN RESERVADA A CUERPO TÉCNICO */}
      {activeSubTab === 'stats' && (
        <View style={styles.tabContentBlock}>
          <View style={{ backgroundColor: '#0B224F', padding: 20, borderRadius: 16, alignItems: 'center', marginVertical: 12 }}>
            <Ionicons name="shield-checkmark-outline" size={36} color="#4FC3F7" />
            <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '800', marginTop: 12, textAlign: 'center' }}>EXPEDIENTE TÉCNICO RESERVADO</Text>
            <Text style={{ color: '#94A3B8', fontSize: 13, textAlign: 'center', marginTop: 6, lineHeight: 18 }}>
              Las estadísticas deportivas individuales (minutos jugados, valoraciones y datos de rendimiento) se conservan exclusivamente para la dirección deportiva y el cuerpo técnico.
            </Text>
          </View>
        </View>
      )}

      {/* 5. VISTA 3: FICHA MÉDICA Y LICENCIA FFCV */}
      {activeSubTab === 'medical' && (
        <View style={styles.tabContentBlock}>
          <Text style={styles.sectionTitle}>LICENCIA Y CERTIFICADO MÉDICO</Text>

          <View style={styles.cardBox}>
            <View style={styles.cardPadding}>
              <View style={styles.medicalItemRow}>
                <Ionicons name="id-card-outline" size={24} color={colors.skyPrimary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.medicalItemTitle}>Licencia FFCV Federación</Text>
                  <Text style={styles.medicalItemValue}>{player.medical.ffcvLicense}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color={colors.goldMain} />
              </View>

              <View style={styles.divider} />

              <View style={styles.medicalItemRow}>
                <Ionicons name="medical-outline" size={24} color={colors.goldMain} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.medicalItemTitle}>Reconocimiento Médico Oficial</Text>
                  <Text style={styles.medicalItemValue}>{player.medical.medicalStatus}</Text>
                  <Text style={styles.medicalSubText}>Válido hasta: {player.medical.validUntil}</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color={colors.goldMain} />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>SALUD Y ALERGIAS REGISTRADAS</Text>
          <View style={styles.cardBox}>
            <View style={styles.cardPadding}>
              <Text style={styles.healthLabel}>Alergias o Intolerancias:</Text>
              <Text style={styles.healthValue}>{player.medical.allergies}</Text>

              <Text style={[styles.healthLabel, { marginTop: 12 }]}>Observaciones de Salud:</Text>
              <Text style={styles.healthValue}>{player.medical.observations}</Text>
            </View>
          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 60 },
  contentTablet: { maxWidth: 900, alignSelf: 'center', width: '100%' },

  // SELECTOR HIJOS
  childSelectorRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  childSelectorTab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.navyCard, paddingVertical: 10, borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  childSelectorTabActive: { backgroundColor: '#0E2E6B', borderColor: colors.skyPrimary },
  childSelectorText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  childSelectorTextActive: { color: colors.white, fontWeight: '900' },

  // SUB TABS
  subTabsRow: { flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 20 },
  subTabPill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)'
  },
  subTabPillActive: { backgroundColor: colors.goldMain, borderColor: colors.goldMain },
  subTabText: { color: colors.textMuted, fontSize: 12, fontWeight: '700' },
  subTabTextActive: { color: colors.navyDark, fontWeight: '900' },

  // CROMO IMAGE RENDER
  cromoContainer: { alignItems: 'center', marginVertical: 10 },
  cardFrameWrapper: {
    width: '100%', maxWidth: 440, height: 560,
    shadowColor: colors.goldMain, shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.6, shadowRadius: 30, elevation: 20,
    alignItems: 'center', justifyContent: 'center'
  },
  cardImageRender: {
    width: '100%', height: '100%', borderRadius: 28
  },

  btnShareFifaGold: { borderRadius: 14, overflow: 'hidden', marginTop: 20, width: '100%', maxWidth: 440 },
  btnShareFifaGradient: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 14 },
  btnShareFifaText: { color: '#030200', fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },

  // TAB CONTENT COMMON
  tabContentBlock: { gap: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '900', color: colors.skyPrimary, letterSpacing: 1.5, marginTop: 12, marginBottom: 8 },

  cardBox: { borderRadius: 18, borderWidth: 1, borderColor: colors.skyPrimary, backgroundColor: colors.navyCard, overflow: 'hidden' },
  cardPadding: { padding: 16 },

  // STATS
  statsGridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statBoxCard: {
    flex: 1, minWidth: '45%', backgroundColor: colors.navyCard, padding: 14, borderRadius: 14,
    borderWidth: 1, borderColor: colors.skyPrimary, alignItems: 'center'
  },
  statBoxNum: { color: colors.white, fontSize: 22, fontWeight: '900' },
  statBoxLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginTop: 2 },

  historyRowCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.navyCard, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)'
  },
  historyRoundText: { color: colors.white, fontSize: 13, fontWeight: '800' },
  historyDetailsText: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  ratingBadge: { backgroundColor: 'rgba(234, 179, 8, 0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  ratingText: { color: colors.goldMain, fontSize: 12, fontWeight: '900' },

  // MEDICAL
  medicalItemRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  medicalItemTitle: { color: colors.white, fontSize: 13, fontWeight: '800' },
  medicalItemValue: { color: colors.skyGlow, fontSize: 12, fontWeight: '700', marginTop: 2 },
  medicalSubText: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 12 },

  healthLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '800' },
  healthValue: { color: colors.white, fontSize: 13, fontWeight: '700', marginTop: 2 }
});
