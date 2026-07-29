import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { PLAYERS } from '../../src/data/clubData';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FamiliaConvocatorias } from '../../src/components/dashboards/FamiliaConvocatorias';

const clubColors = {
  navy: '#071A3D',
  navyCard: '#0B224F',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  success: '#10B981',
  border: 'rgba(79, 195, 247, 0.25)'
};

export default function ConvocatoriasScreen() {
  const { activeContext, activeTeamId, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={clubColors.skyPrimary} />
        <Text style={styles.loadingText}>Cargando convocatorias...</Text>
      </View>
    );
  }

  // Perfil Familia o por defecto si es Familia
  if (activeContext === 'FAMILIA' || !activeContext) {
    return <FamiliaConvocatorias />;
  }

  const isEntrenador = activeContext === 'ENTRENADOR';
  const targetTeamName = activeTeamId === 't-infantil-a' ? 'Infantil A' : 'Sin Equipo';

  const teamPlayers = PLAYERS.filter(p => p.equipo === targetTeamName).sort((a,b) => parseInt(a.dorsal || '999') - parseInt(b.dorsal || '999'));

  if (!isEntrenador) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Convocatoria del Equipo</Text>
          <Text style={styles.headerSub}>Información general</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="clipboard-outline" size={48} color={clubColors.skyPrimary} style={{ marginBottom: 12 }} />
          <Text style={{ color: clubColors.white, fontSize: 16, fontWeight: '700', textAlign: 'center' }}>
            No hay convocatorias activas para este perfil.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       <View style={styles.header}>
         <Text style={styles.headerTitle}>Convocatoria</Text>
         <Text style={styles.headerSub}>Próximo partido • {targetTeamName}</Text>
       </View>

       <ScrollView contentContainerStyle={{padding: 20}}>
          <View style={styles.cardInfo}>
             <Ionicons name="calendar-outline" size={24} color={clubColors.skyPrimary} style={{marginRight: 12}} />
             <View>
                <Text style={styles.cardTitle}>Sábado, 16 Septiembre</Text>
                <Text style={styles.cardSub}>10:00 vs Levante UD • Citación: 08:30</Text>
             </View>
          </View>

          <Text style={styles.sectionTitle}>Selección de Jugadores ({teamPlayers.length})</Text>
          
          <View style={styles.listContainer}>
             {teamPlayers.map(p => (
               <View key={p.id} style={styles.playerRow}>
                  <View style={styles.dorsalBox}>
                     <Text style={styles.dorsalText}>{p.dorsal}</Text>
                  </View>
                  <View style={{flex: 1}}>
                     <Text style={styles.playerName}>{p.nombreCompleto}</Text>
                     <Text style={styles.playerPos}>{p.posicion}</Text>
                  </View>
                  <TouchableOpacity style={styles.checkBtn}>
                     <Ionicons name="checkmark-circle" size={28} color={clubColors.success} />
                  </TouchableOpacity>
               </View>
             ))}
          </View>
       </ScrollView>
       
       <View style={styles.footer}>
          <TouchableOpacity style={styles.publishBtn}>
             <Text style={styles.publishBtnText}>Publicar Convocatoria</Text>
          </TouchableOpacity>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: clubColors.navy },
  loadingContainer: { flex: 1, backgroundColor: clubColors.navy, justifyContent: 'center', alignItems: 'center', padding: 20 },
  loadingText: { color: clubColors.skyLight, fontSize: 14, fontWeight: '700', marginTop: 12 },
  
  header: { padding: 20, paddingTop: 40, backgroundColor: clubColors.navyCard, borderBottomWidth: 1, borderBottomColor: clubColors.border },
  headerTitle: { fontSize: 24, fontWeight: '900', color: clubColors.white },
  headerSub: { fontSize: 14, color: clubColors.textMuted, marginTop: 4, fontWeight: '600' },
  
  cardInfo: { flexDirection: 'row', backgroundColor: clubColors.navyCard, padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: clubColors.border },
  cardTitle: { fontSize: 16, fontWeight: '900', color: clubColors.white },
  cardSub: { fontSize: 13, color: clubColors.textMuted, fontWeight: '600', marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: clubColors.skyPrimary, marginBottom: 16 },

  listContainer: { backgroundColor: clubColors.navyCard, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: clubColors.border },
  playerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  dorsalBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(79, 195, 247, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  dorsalText: { fontSize: 16, fontWeight: '900', color: clubColors.skyPrimary },
  playerName: { fontSize: 15, fontWeight: '800', color: clubColors.white },
  playerPos: { fontSize: 12, color: clubColors.textMuted, fontWeight: '700' },
  checkBtn: { padding: 4 },

  footer: { backgroundColor: clubColors.navyCard, padding: 16, borderTopWidth: 1, borderTopColor: clubColors.border },
  publishBtn: { backgroundColor: clubColors.skyPrimary, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  publishBtnText: { color: clubColors.navy, fontSize: 16, fontWeight: '900' }
});
