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
  warning: '#F59E0B',
};

const DOC_SECTIONS = [
  { id: 'actas', title: 'Actas de Partido', icon: 'document-text-outline', color: colors.skyPrimary, count: '14 documentos', desc: 'Actas previas, actas internas y actas oficiales FFCV' },
  { id: 'fichas', title: 'Fichas Federativas', icon: 'card-outline', color: colors.emeraldGlow, count: '16 fichas', desc: 'Licencias oficiales de la plantilla y cuerpo técnico' },
  { id: 'lesiones', title: 'Partes Médicos / Lesiones', icon: 'medkit-outline', color: colors.warning, count: '2 partes activos', desc: 'Seguimiento de autorizaciones de alta y parte de seguro' },
  { id: 'autorizaciones', title: 'Autorizaciones & Normativa', icon: 'shield-checkmark-outline', color: '#A855F7', count: '4 normativas', desc: 'Reglamento federativo, derechos de imagen y transporte' },
];

export function DelegadoDocumentacion() {
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
          <Text style={styles.titleTxt}>DOCUMENTACIÓN OFICIAL</Text>
          <Text style={styles.subtitleTxt}>Expediente del Equipo · Cadete B</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {DOC_SECTIONS.map((sec) => (
          <TouchableOpacity 
            key={sec.id} 
            style={styles.docCard} 
            activeOpacity={0.88}
            onPress={() => {
              if (sec.id === 'actas') {
                router.push('/delegado/acta' as any);
              }
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: `${sec.color}20` }]}>
              <Ionicons name={sec.icon as any} size={28} color={sec.color} />
            </View>
            <View style={styles.docInfo}>
              <Text style={styles.docTitleTxt}>{sec.title}</Text>
              <Text style={styles.docCountTxt}>{sec.count}</Text>
              <Text style={styles.docDescTxt}>{sec.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
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
  grid: { gap: 16 },
  docCard: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: colors.navyCard, padding: 18, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  iconBox: { width: 54, height: 54, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  docInfo: { flex: 1 },
  docTitleTxt: { color: colors.white, fontSize: 16, fontWeight: '900' },
  docCountTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700', marginTop: 2 },
  docDescTxt: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
});
