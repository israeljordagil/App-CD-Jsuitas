import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../../src/utils/theme';
import { AnimatedCard as Card } from '../../../src/components/ui/AnimatedCard';
import { ProgressBar } from '../../../src/components/ui/ProgressBar';

const { width } = Dimensions.get('window');

const mockJugador = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B',
  categoria: 'Cadete',
  dorsal: 9,
  posicion: 'Delantero',
  posicionSecundaria: 'Extremo derecho',
  estado: 'Convocado',
  fechaNacimiento: '12/04/2011',
  edad: 15,
  altura: '1,72 m',
  peso: '63 kg',
  pieDominante: 'Derecho',
  temporadasClub: 4,
  nivel: 7,
  progreso: 68
};

const mockStaff = [
  { rol: 'Entrenador', nombre: 'Carlos Ruiz', image: require('../../../assets/images/staff/entrenador.jpg') },
  { rol: 'Segundo entrenador', nombre: 'Mario Santos', image: require('../../../assets/images/staff/segundo.jpg') },
  { rol: 'Delegado', nombre: 'Roberto Navarro', image: require('../../../assets/images/staff/delegado.jpg') },
  { rol: 'Coordinador', nombre: 'Javier Domínguez', image: require('../../../assets/images/staff/coordinador.jpg') },
];

export default function MiPerfilScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA (Volver) */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>MI PERFIL</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* 1. CABECERA PREMIUM */}
        <Card delay={100} style={styles.headerProfileContainer}>
          <View style={styles.headerTopRow}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://i.pravatar.cc/200?u=pablo' }} 
                style={styles.avatar} 
              />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.playerName}>{mockJugador.nombre}</Text>
              <View style={styles.teamRow}>
                <Text style={styles.teamText}>{mockJugador.categoria}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.teamText}>{mockJugador.equipo}</Text>
              </View>
              <View style={styles.teamRow}>
                <Text style={styles.teamText}>{mockJugador.posicion}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.teamText}>#{mockJugador.dorsal}</Text>
              </View>
              <View style={[styles.statusBadge, { borderColor: colors.success, backgroundColor: 'rgba(34,197,94,0.1)' }]}>
                <Text style={styles.statusDot}>🟢</Text>
                <Text style={styles.statusText}>{mockJugador.estado}</Text>
              </View>
            </View>
          </View>
          <View style={styles.xpContainer}>
             <View style={styles.xpRow}>
                <Text style={styles.xpLabel}>Nivel {mockJugador.nivel}</Text>
                <Text style={styles.xpValue}>{mockJugador.progreso}%</Text>
             </View>
             <ProgressBar progress={mockJugador.progreso / 100} color={colors.sky} height={8} />
          </View>
        </Card>

        {/* 2. DATOS PERSONALES */}
        <Text style={styles.sectionTitle}>Datos Personales</Text>
        <Card delay={150} style={styles.gridCard}>
          <View style={styles.dataGrid}>
             <View style={styles.dataBox}>
               <FontAwesome name="calendar-o" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Nacimiento</Text>
               <Text style={styles.dataValue}>{mockJugador.fechaNacimiento}</Text>
             </View>
             <View style={styles.dataBox}>
               <FontAwesome name="birthday-cake" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Edad</Text>
               <Text style={styles.dataValue}>{mockJugador.edad} años</Text>
             </View>
             <View style={styles.dataBox}>
               <FontAwesome name="arrows-v" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Altura</Text>
               <Text style={styles.dataValue}>{mockJugador.altura}</Text>
             </View>
             <View style={styles.dataBox}>
               <FontAwesome name="balance-scale" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Peso</Text>
               <Text style={styles.dataValue}>{mockJugador.peso}</Text>
             </View>
             <View style={styles.dataBox}>
               <FontAwesome name="paw" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Pierna</Text>
               <Text style={styles.dataValue}>{mockJugador.pieDominante}</Text>
             </View>
             <View style={styles.dataBox}>
               <FontAwesome name="history" size={16} color={colors.sky} style={styles.dataIcon} />
               <Text style={styles.dataLabel}>Temporadas</Text>
               <Text style={styles.dataValue}>{mockJugador.temporadasClub} en el club</Text>
             </View>
          </View>
        </Card>

        {/* 3. PERFIL DEPORTIVO */}
        <Text style={styles.sectionTitle}>Perfil Deportivo</Text>
        <Card delay={200} style={styles.listCard}>
           <View style={styles.listItem}>
              <FontAwesome name="crosshairs" size={18} color={colors.sky} style={styles.listIcon} />
              <View style={styles.listContent}>
                 <Text style={styles.listLabel}>Posición Principal</Text>
                 <Text style={styles.listValue}>{mockJugador.posicion}</Text>
              </View>
           </View>
           <View style={styles.listDivider} />
           <View style={styles.listItem}>
              <FontAwesome name="exchange" size={18} color={colors.sky} style={styles.listIcon} />
              <View style={styles.listContent}>
                 <Text style={styles.listLabel}>Posición Secundaria</Text>
                 <Text style={styles.listValue}>{mockJugador.posicionSecundaria}</Text>
              </View>
           </View>
           <View style={styles.listDivider} />
           <View style={styles.listItem}>
              <FontAwesome name="bolt" size={18} color={colors.sky} style={styles.listIcon} />
              <View style={styles.listContent}>
                 <Text style={styles.listLabel}>Fortalezas</Text>
                 <Text style={styles.listValue}>Velocidad, desmarque, finalización.</Text>
              </View>
           </View>
           <View style={styles.listDivider} />
           <View style={styles.listItem}>
              <FontAwesome name="level-up" size={18} color={colors.sky} style={styles.listIcon} />
              <View style={styles.listContent}>
                 <Text style={styles.listLabel}>Aspectos a Mejorar</Text>
                 <Text style={styles.listValue}>Juego aéreo, presión tras pérdida.</Text>
              </View>
           </View>
           <View style={styles.listDivider} />
           <View style={styles.listItem}>
              <FontAwesome name="star" size={18} color={colors.sky} style={styles.listIcon} />
              <View style={styles.listContent}>
                 <Text style={styles.listLabel}>Objetivo Temporada</Text>
                 <Text style={styles.listValue}>Alcanzar los 15 goles y mejorar en asistencias.</Text>
              </View>
           </View>
        </Card>

        {/* 5. RESUMEN DE TEMPORADA */}
        <Text style={styles.sectionTitle}>Resumen Temporada</Text>
        <View style={styles.kpiGrid}>
           <Card delay={250} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>18</Text>
              <Text style={styles.kpiLbl}>Partidos</Text>
           </Card>
           <Card delay={260} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>14</Text>
              <Text style={styles.kpiLbl}>Titular</Text>
           </Card>
           <Card delay={270} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>1150'</Text>
              <Text style={styles.kpiLbl}>Minutos</Text>
           </Card>
           <Card delay={280} style={styles.kpiBox}>
              <Text style={[styles.kpiNum, { color: colors.sky }]}>8</Text>
              <Text style={styles.kpiLbl}>Goles</Text>
           </Card>
           <Card delay={290} style={styles.kpiBox}>
              <Text style={styles.kpiNum}>4</Text>
              <Text style={styles.kpiLbl}>Asistencias</Text>
           </Card>
           <Card delay={300} style={styles.kpiBox}>
              <Text style={[styles.kpiNum, { color: '#22C55E' }]}>98%</Text>
              <Text style={styles.kpiLbl}>Entrenos</Text>
           </Card>
        </View>

        {/* 4. STAFF */}
        <Text style={styles.sectionTitle}>Staff Técnico</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.staffScroll} contentContainerStyle={{ gap: 16 }}>
           {mockStaff.map((person, idx) => (
             <Card delay={300 + (idx * 50)} key={idx} style={styles.staffCard}>
                <Image source={person.image} style={styles.staffImage} />
                <View style={styles.staffInfo}>
                   <Text style={styles.staffName}>{person.nombre}</Text>
                   <Text style={styles.staffRole}>{person.rol}</Text>
                   <TouchableOpacity style={styles.contactBtn}>
                      <FontAwesome name="envelope" size={12} color={colors.navy} />
                      <Text style={styles.contactBtnText}>Contactar</Text>
                   </TouchableOpacity>
                </View>
             </Card>
           ))}
        </ScrollView>

        {/* 6. ACCESOS RÁPIDOS */}
        <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
        <View style={styles.quickAccessGrid}>
           <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/jugador/calendario' as any)}>
              <FontAwesome name="calendar" size={24} color={colors.white} />
              <Text style={styles.quickBtnText}>Calendario</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/jugador/convocatorias' as any)}>
              <FontAwesome name="bullhorn" size={24} color={colors.white} />
              <Text style={styles.quickBtnText}>Convocatorias</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/jugador/rendimiento' as any)}>
              <FontAwesome name="line-chart" size={24} color={colors.white} />
              <Text style={styles.quickBtnText}>Rendimiento</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/logros' as any)}>
              <FontAwesome name="trophy" size={24} color={colors.white} />
              <Text style={styles.quickBtnText}>Logros</Text>
           </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' }, // Azul marino institucional
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.xl, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  sectionTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  // Cabecera Premium
  headerProfileContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: spacing.xl,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { marginRight: 20 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: colors.sky },
  headerInfo: { flex: 1, justifyContent: 'center' },
  playerName: { color: colors.white, fontSize: 24, fontWeight: '900', letterSpacing: -0.5, marginBottom: 4 },
  teamRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' },
  teamText: { color: colors.white, fontSize: 13, fontWeight: '700' },
  dotSeparator: { color: colors.sky, marginHorizontal: 8, fontSize: 12 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', borderWidth: 1 },
  statusDot: { fontSize: 10, marginRight: 6 },
  statusText: { color: colors.white, fontSize: 11, fontWeight: '800', textTransform: 'uppercase' },
  
  xpContainer: { marginTop: spacing.l, paddingTop: spacing.l, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.05)' },
  xpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLabel: { color: colors.white, fontSize: 13, fontWeight: '800' },
  xpValue: { color: colors.sky, fontSize: 13, fontWeight: '900' },

  // Datos Personales
  gridCard: { padding: spacing.m, marginBottom: spacing.xl, backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' },
  dataGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  dataBox: { width: '48%', backgroundColor: 'rgba(0,0,0,0.15)', borderRadius: 12, padding: 12 },
  dataIcon: { marginBottom: 8 },
  dataLabel: { color: colors.muted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
  dataValue: { color: colors.white, fontSize: 14, fontWeight: '800' },

  // Perfil Deportivo
  listCard: { padding: spacing.l, marginBottom: spacing.xl, backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' },
  listItem: { flexDirection: 'row', alignItems: 'center' },
  listIcon: { width: 30, textAlign: 'center', marginRight: 12 },
  listContent: { flex: 1 },
  listLabel: { color: colors.muted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 2 },
  listValue: { color: colors.white, fontSize: 14, fontWeight: '700' },
  listDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 12 },

  // KPI Grid
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: spacing.xl },
  kpiBox: { width: '31%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.m, alignItems: 'center', borderColor: 'rgba(255,255,255,0.05)' },
  kpiNum: { color: colors.white, fontSize: 22, fontWeight: '900' },
  kpiLbl: { color: colors.muted, fontSize: 10, fontWeight: '800', textTransform: 'uppercase', marginTop: 4 },

  // Staff Scroll
  staffScroll: { marginBottom: spacing.xl, paddingRight: 40 },
  staffCard: { width: 140, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, borderColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  staffImage: { width: '100%', height: 140, resizeMode: 'cover' },
  staffInfo: { padding: 12, alignItems: 'center' },
  staffName: { color: colors.white, fontSize: 14, fontWeight: '800', textAlign: 'center', marginBottom: 2 },
  staffRole: { color: colors.sky, fontSize: 11, fontWeight: '700', textAlign: 'center', marginBottom: 12 },
  contactBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.sky, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  contactBtnText: { color: colors.navy, fontSize: 11, fontWeight: '900', marginLeft: 6 },

  // Accesos Rápidos
  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  quickBtn: { width: '47%', backgroundColor: 'rgba(79, 195, 247, 0.1)', borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)', padding: spacing.m, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickBtnText: { color: colors.white, fontSize: 12, fontWeight: '800', marginTop: 8, textTransform: 'uppercase', textAlign: 'center' }
});
