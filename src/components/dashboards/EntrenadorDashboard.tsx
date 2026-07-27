import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  border: '#e5e7eb'
};

export function EntrenadorDashboard() {
  const router = useRouter();
  const { user, activeTeamId } = useAuth();
  
  const isInfantilA = activeTeamId === 't-infantil-a';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* 1. CABECERA ENTRENADOR */}
      <View style={styles.headerBlock}>
        <LinearGradient 
          colors={['rgba(34, 197, 94, 0.1)', 'transparent']} 
          style={StyleSheet.absoluteFillObject} 
        />
        <View style={styles.headerTopRow}>
          <FontAwesome name="shield" size={48} color={clubColors.navy} />
          <View style={styles.badgePrincipal}>
            <Text style={styles.badgePrincipalText}>ENTRENADOR PRINCIPAL</Text>
          </View>
        </View>
        <Text style={styles.headerTitleBold}>{user?.full_name || 'Raúl García Trujillo'}</Text>
        <Text style={styles.headerSub}>Infantil A • Fútbol</Text>
      </View>

      {/* 2. KPIs PLANTILLA (Simulados para Infantil A) */}
      <Text style={styles.sectionTitle}>Resumen de Plantilla</Text>
      <View style={styles.kpiGrid}>
        <View style={[styles.kpiBox, {backgroundColor: clubColors.navy}]}>
           <Text style={[styles.kpiNum, {color: clubColors.white}]}>18</Text>
           <Text style={[styles.kpiLbl, {color: 'rgba(255,255,255,0.7)'}]}>JUGADORES</Text>
        </View>
        <View style={styles.kpiBox}>
           <Text style={styles.kpiNum}>1</Text>
           <Text style={styles.kpiLbl}>PORTERO</Text>
        </View>
        <View style={styles.kpiBox}>
           <Text style={styles.kpiNum}>5</Text>
           <Text style={styles.kpiLbl}>DEFENSAS</Text>
        </View>
        <View style={styles.kpiBox}>
           <Text style={styles.kpiNum}>8</Text>
           <Text style={styles.kpiLbl}>MEDIOS</Text>
        </View>
        <View style={styles.kpiBox}>
           <Text style={styles.kpiNum}>4</Text>
           <Text style={styles.kpiLbl}>DELANTEROS</Text>
        </View>
      </View>

      {/* 3. ACCESOS RÁPIDOS */}
      <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
      <View style={styles.quickGrid}>
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/convocatorias')}>
            <View style={[styles.quickIconBg, {backgroundColor: 'rgba(79, 195, 247, 0.2)'}]}>
               <FontAwesome name="list-alt" size={20} color={clubColors.skyPrimary} />
            </View>
            <Text style={styles.quickBtnText}>Crear convocatoria</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/entrenamientos')}>
            <View style={[styles.quickIconBg, {backgroundColor: 'rgba(34, 197, 94, 0.2)'}]}>
               <FontAwesome name="check-square-o" size={20} color={clubColors.success} />
            </View>
            <Text style={styles.quickBtnText}>Pasar asistencia</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/entrenamientos')}>
            <View style={[styles.quickIconBg, {backgroundColor: 'rgba(234, 179, 8, 0.2)'}]}>
               <FontAwesome name="calendar-plus-o" size={20} color="#eab308" />
            </View>
            <Text style={styles.quickBtnText}>Crear entrenamiento</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/tactica')}>
            <View style={[styles.quickIconBg, {backgroundColor: 'rgba(168, 85, 247, 0.2)'}]}>
               <FontAwesome name="object-group" size={20} color="#a855f7" />
            </View>
            <Text style={styles.quickBtnText}>Abrir táctica</Text>
         </TouchableOpacity>
         
         <TouchableOpacity style={[styles.quickBtn, {width: '100%'}]} onPress={() => router.push('/(drawer)/live_match')}>
            <View style={[styles.quickIconBg, {backgroundColor: 'rgba(239, 68, 68, 0.2)'}]}>
               <MaterialCommunityIcons name="whistle" size={20} color="#ef4444" />
            </View>
            <Text style={styles.quickBtnText}>Partido en directo</Text>
         </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  
  headerBlock: {
    padding: 24, borderRadius: 24, backgroundColor: clubColors.white,
    borderWidth: 1, borderColor: clubColors.border, overflow: 'hidden',
    marginBottom: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10,
  },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  badgePrincipal: { backgroundColor: clubColors.success, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgePrincipalText: { color: clubColors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  headerTitleBold: { color: clubColors.navy, fontSize: 24, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
  headerSub: { color: clubColors.textMuted, fontSize: 16, fontWeight: '600' },

  sectionTitle: { color: clubColors.navy, fontSize: 16, fontWeight: '900', letterSpacing: 0.5, marginBottom: 12, marginLeft: 4 },
  
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  kpiBox: { width: '30%', backgroundColor: clubColors.white, borderRadius: 16, padding: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: clubColors.border, flexGrow: 1 },
  kpiNum: { fontSize: 24, fontWeight: '900', color: clubColors.navy, marginBottom: 4 },
  kpiLbl: { fontSize: 10, fontWeight: '800', color: clubColors.textMuted },
  
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  quickBtn: { width: '48%', backgroundColor: clubColors.white, borderRadius: 16, padding: 16, alignItems: 'flex-start', borderWidth: 1, borderColor: clubColors.border },
  quickIconBg: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  quickBtnText: { color: clubColors.navy, fontSize: 14, fontWeight: '800' },
});
