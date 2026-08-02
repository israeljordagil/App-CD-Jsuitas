import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
};

const MOCK_STAFF = [
  { role: 'Primer Entrenador', name: 'Rubén Balaguer', license: 'UEFA B' },
  { role: 'Segundo Entrenador', name: 'Daniel Sobero', license: 'UEFA C' },
  { role: 'Delegado de Equipo', name: 'Carlos Ruiz', license: 'Oficial FFCV' },
];

const MOCK_PLAYERS = [
  { dorsal: '1', name: 'Marcos Soler', position: 'Portero', status: 'Apto (Licencia Activa)', isGoalkeeper: true },
  { dorsal: '4', name: 'Hugo Martínez', position: 'Defensa Central', status: 'Apto (Licencia Activa)' },
  { dorsal: '8', name: 'Pablo Martínez', position: 'Centrocampista', status: 'Apto (Licencia Activa)' },
  { dorsal: '9', name: 'Adrián Gómez', position: 'Delantero Centro', status: 'Apto (Licencia Activa)' },
  { dorsal: '10', name: 'Mateo Fernández', position: 'Media Punta', status: 'Alta Médica (Pendiente)' },
];

export function DelegadoEquipo() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View>
          <Text style={styles.titleTxt}>MI EQUIPO (MODO CONSULTA)</Text>
          <Text style={styles.subtitleTxt}>Plantilla y Cuerpo Técnico · Cadete B</Text>
        </View>
      </View>

      <Text style={styles.sectionTitleTxt}>CUERPO TÉCNICO</Text>
      <View style={styles.staffContainer}>
        {MOCK_STAFF.map((staff, idx) => (
          <View key={idx} style={styles.staffCard}>
            <Ionicons name="person-circle-outline" size={32} color={colors.skyPrimary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.staffRoleTxt}>{staff.role}</Text>
              <Text style={styles.staffNameTxt}>{staff.name}</Text>
            </View>
            <View style={styles.licenseBadge}>
              <Text style={styles.licenseBadgeTxt}>{staff.license}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitleTxt}>PLANTILLA Y DORSALES</Text>
      <View style={styles.playersContainer}>
        {MOCK_PLAYERS.map((player) => (
          <View key={player.dorsal} style={styles.playerRow}>
            <View style={[styles.dorsalCircle, player.isGoalkeeper && { backgroundColor: '#F59E0B' }]}>
              <Text style={styles.dorsalTxt}>{player.dorsal}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.playerNameTxt}>{player.name}</Text>
              <Text style={styles.playerPositionTxt}>{player.position}</Text>
            </View>
            <View style={styles.statusPill}>
              <Text style={styles.statusPillTxt}>{player.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 20, paddingBottom: 40 },
  contentDesktop: { maxWidth: 900, alignSelf: 'center', width: '100%' },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '700' },
  sectionTitleTxt: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 1, marginBottom: 12, marginTop: 8 },
  staffContainer: { gap: 10, marginBottom: 24 },
  staffCard: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.navyCard, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  staffRoleTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '800' },
  staffNameTxt: { color: colors.white, fontSize: 15, fontWeight: '900' },
  licenseBadge: { backgroundColor: 'rgba(56, 189, 248, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  licenseBadgeTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '700' },
  playersContainer: { gap: 10 },
  playerRow: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.navyDeep, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  dorsalCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  dorsalTxt: { color: colors.navyDark, fontSize: 15, fontWeight: '900' },
  playerNameTxt: { color: colors.white, fontSize: 15, fontWeight: '900' },
  playerPositionTxt: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  statusPill: { backgroundColor: 'rgba(16, 185, 129, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusPillTxt: { color: colors.emeraldGlow, fontSize: 11, fontWeight: '700' },
});
