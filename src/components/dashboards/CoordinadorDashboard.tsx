import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing } from '../../utils/theme';
import { AnimatedCard as Card } from '../ui/AnimatedCard';
import { ActionBtn } from '../ui/ActionBtn';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export function CoordinadorDashboard() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* 1. SALUDO PERSONALIZADO */}
      <View style={styles.greetingHeader}>
        <Text style={styles.greetingTitle}>Coordinación</Text>
        <Text style={styles.greetingSub}>Sábado 24 Octubre • Turno Mañana</Text>
      </View>

      {/* 2. TARJETA PROTAGONISTA (HERO): ESTADO OPERATIVO */}
      <View style={styles.heroContainer}>
        <LinearGradient 
          colors={['rgba(239, 68, 68, 0.2)', 'rgba(4, 16, 38, 0.8)']} 
          style={styles.heroGradient} 
        />
        <FontAwesome name="warning" size={140} color="rgba(239,68,68,0.05)" style={styles.heroWatermark} />
        
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>ATENCIÓN REQUERIDA</Text>
        </View>

        <Text style={styles.heroMainTitle}>2 Incidencias Críticas</Text>
        
        <View style={styles.criticalList}>
          <View style={styles.criticalItem}>
             <FontAwesome name="times-circle" size={16} color={colors.danger} style={{marginRight: 8}} />
             <Text style={styles.criticalText}>Falta Árbitro: Infantil B (11:00h)</Text>
          </View>
          <View style={styles.criticalItem}>
             <FontAwesome name="times-circle" size={16} color={colors.danger} style={{marginRight: 8}} />
             <Text style={styles.criticalText}>Vestuario Local 1 Bloqueado</Text>
          </View>
        </View>

        <View style={styles.heroActions}>
          <ActionBtn label="RESOLVER AHORA" icon="bolt" variant="primary" style={{flex: 1, backgroundColor: colors.danger, borderColor: colors.danger}} />
        </View>
      </View>

      {/* 3. PANEL MACRO */}
      <Text style={styles.sectionTitle}>Panel Semanal</Text>
      <View style={styles.macroGrid}>
        <View style={styles.macroBox}>
           <Text style={styles.macroNum}>24</Text>
           <Text style={styles.macroLbl}>PARTIDOS</Text>
        </View>
        <View style={styles.macroBox}>
           <Text style={styles.macroNum}>18</Text>
           <Text style={styles.macroLbl}>ACTAS OK</Text>
        </View>
        <View style={styles.macroBox}>
           <Text style={[styles.macroNum, {color: colors.warning}]}>5</Text>
           <Text style={styles.macroLbl}>SIN CERRAR</Text>
        </View>
      </View>

      {/* 4. INSTALACIONES EN VIVO */}
      <Text style={styles.sectionTitle}>Instalaciones Live</Text>
      <Card delay={200} style={styles.liveCard}>
         <View style={styles.fieldRow}>
           <View style={styles.dotGreen} />
           <View style={styles.fieldInfo}>
             <Text style={styles.fieldName}>F11 Principal</Text>
             <Text style={styles.fieldSub}>Libre hasta las 12:00</Text>
           </View>
         </View>
         <View style={styles.divider} />
         <View style={styles.fieldRow}>
           <View style={styles.dotRed} />
           <View style={styles.fieldInfo}>
             <Text style={styles.fieldName}>F8 Anexo A</Text>
             <Text style={styles.fieldSub}>Ocupado: Alevín C vs Levante</Text>
           </View>
         </View>
      </Card>

      {/* 5. GESTIÓN ADMINISTRATIVA */}
      <Text style={styles.sectionTitle}>Gestión</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer} style={styles.pillsScroll}>
         <TouchableOpacity style={styles.pillBtn}>
           <FontAwesome name="users" size={14} color={colors.sky} style={styles.pillIcon} />
           <Text style={styles.pillText}>Plantillas</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.pillBtn}>
           <FontAwesome name="calendar" size={14} color={colors.sky} style={styles.pillIcon} />
           <Text style={styles.pillText}>Horarios</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.pillBtn}>
           <FontAwesome name="bullhorn" size={14} color={colors.sky} style={styles.pillIcon} />
           <Text style={styles.pillText}>Comunicados</Text>
         </TouchableOpacity>
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  greetingHeader: { marginTop: spacing.l, marginBottom: spacing.m },
  greetingTitle: { color: colors.white, fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
  greetingSub: { color: colors.muted, fontSize: 13, fontWeight: '800', marginTop: 4, textTransform: 'uppercase' },
  
  heroContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    padding: spacing.xl,
    marginBottom: spacing.l,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroWatermark: { position: 'absolute', bottom: -20, right: -10, transform: [{rotate: '15deg'}] },
  heroBadge: { backgroundColor: colors.danger, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start', marginBottom: spacing.m },
  heroBadgeText: { color: colors.white, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  heroMainTitle: { color: colors.white, fontSize: 32, fontWeight: '900', letterSpacing: -1, marginBottom: spacing.m },
  
  criticalList: { backgroundColor: 'rgba(0,0,0,0.3)', padding: spacing.m, borderRadius: 12, marginBottom: spacing.l },
  criticalItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  criticalText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  
  heroActions: { flexDirection: 'row' },
  
  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', textTransform: 'uppercase', marginBottom: spacing.m },
  
  macroGrid: { flexDirection: 'row', gap: spacing.s, marginBottom: spacing.l },
  macroBox: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: spacing.l, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  macroNum: { color: colors.white, fontSize: 32, fontWeight: '900' },
  macroLbl: { color: colors.muted, fontSize: 10, fontWeight: '800', marginTop: 4 },
  
  liveCard: { padding: spacing.l, marginBottom: spacing.l },
  fieldRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.s },
  dotGreen: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success },
  dotRed: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.danger },
  fieldInfo: { marginLeft: spacing.m, flex: 1 },
  fieldName: { color: colors.white, fontSize: 15, fontWeight: '800' },
  fieldSub: { color: colors.muted, fontSize: 12, fontWeight: '600', marginTop: 2 },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: 4 },
  
  pillsScroll: { marginHorizontal: -spacing.l },
  pillsContainer: { paddingHorizontal: spacing.l, gap: spacing.m },
  pillBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(85,199,243,0.1)', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(85,199,243,0.3)' },
  pillIcon: { marginRight: 8 },
  pillText: { color: colors.sky, fontSize: 13, fontWeight: '800' },
});
