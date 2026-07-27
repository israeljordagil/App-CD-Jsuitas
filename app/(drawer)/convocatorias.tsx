import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { PLAYERS } from '../../src/data/clubData';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { FamiliaConvocatorias } from '../../src/components/dashboards/FamiliaConvocatorias';

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  border: '#e5e7eb'
};

export default function ConvocatoriasScreen() {
  const { activeContext, activeTeamId } = useAuth();

  if (activeContext === 'FAMILIA') {
    return <FamiliaConvocatorias />;
  }

  const isEntrenador = activeContext === 'ENTRENADOR';
  const targetTeamName = activeTeamId === 't-infantil-a' ? 'Infantil A' : 'Sin Equipo';

  const teamPlayers = PLAYERS.filter(p => p.equipo === targetTeamName).sort((a,b) => parseInt(a.dorsal || '999') - parseInt(b.dorsal || '999'));

  if (!isEntrenador) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 40}}>Sección de convocatorias</Text>
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
             <Ionicons name="calendar-outline" size={24} color={clubColors.navy} style={{marginRight: 12}} />
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
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 20, paddingTop: 40, backgroundColor: clubColors.white, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, elevation: 2 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: clubColors.navy },
  headerSub: { fontSize: 14, color: clubColors.textMuted, marginTop: 4, fontWeight: '600' },
  
  cardInfo: { flexDirection: 'row', backgroundColor: clubColors.skyLight, padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 24 },
  cardTitle: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  cardSub: { fontSize: 13, color: clubColors.textMuted, fontWeight: '600', marginTop: 2 },

  sectionTitle: { fontSize: 16, fontWeight: '900', color: clubColors.navy, marginBottom: 16 },

  listContainer: { backgroundColor: clubColors.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: clubColors.border },
  playerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  dorsalBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  dorsalText: { fontSize: 16, fontWeight: '900', color: clubColors.navy },
  playerName: { fontSize: 15, fontWeight: '800', color: clubColors.navy },
  playerPos: { fontSize: 12, color: clubColors.textMuted, fontWeight: '700' },
  checkBtn: { padding: 4 },

  footer: { backgroundColor: clubColors.white, padding: 16, borderTopWidth: 1, borderTopColor: clubColors.border },
  publishBtn: { backgroundColor: clubColors.navy, paddingVertical: 16, borderRadius: 16, alignItems: 'center' },
  publishBtnText: { color: clubColors.white, fontSize: 16, fontWeight: '900' }
});
