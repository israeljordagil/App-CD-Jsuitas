import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { colors, spacing } from '../../utils/theme';
import { AnimatedCard as Card } from '../ui/AnimatedCard';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mockJugador = {
  nombre: 'Pablo Martínez',
  equipo: 'Cadete B',
  categoria: 'Cadete',
  dorsal: 9,
  posicion: 'Delantero',
  estado: 'Convocado'
};

export function JugadorDashboard() {
  const router = useRouter();
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      
      {/* 1. CABECERA / TARJETA PRINCIPAL */}
      <View style={styles.headerProfileContainer}>
        <View style={styles.headerTopRow}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=pablo' }} 
              style={styles.avatar} 
            />
          </View>
          
          <View style={styles.headerInfo}>
            <Text style={styles.playerName}>{mockJugador.nombre}</Text>
            <View style={styles.teamRow}>
              <Text style={styles.teamText}>{mockJugador.equipo}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.teamText}>{mockJugador.posicion}</Text>
              <Text style={styles.dotSeparator}>•</Text>
              <Text style={styles.teamText}>#{mockJugador.dorsal}</Text>
            </View>
            <View style={styles.streakBox}>
              <Text style={styles.streakIcon}>🟢</Text>
              <Text style={styles.streakText}>Estado: {mockJugador.estado}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. PRÓXIMO ENTRENAMIENTO */}
      <Text style={styles.sectionTitle}>Próximo Entrenamiento</Text>
      <Card delay={100} style={styles.simpleCard}>
        <View style={styles.cardRow}>
          <FontAwesome name="soccer-ball-o" size={24} color={colors.sky} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.cardTitle}>Hoy, 18:30 - 20:00</Text>
            <Text style={styles.cardSub}>Campo 2 (Anexo)</Text>
          </View>
        </View>
      </Card>

      {/* 3. PRÓXIMO PARTIDO */}
      <Text style={styles.sectionTitle}>Próximo Partido</Text>
      <Card delay={150} style={styles.simpleCard}>
         <View style={styles.cardRow}>
            <FontAwesome name="shield" size={24} color={colors.sky} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.cardTitle}>CD Jesuitas vs Levante UD</Text>
              <Text style={styles.cardSub}>Sábado 14 Nov • 10:00h</Text>
            </View>
         </View>
      </Card>

      {/* 4. MIS ESTADÍSTICAS */}
      <Text style={styles.sectionTitle}>Mis Estadísticas</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>12</Text>
          <Text style={styles.statLbl}>Partidos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>845'</Text>
          <Text style={styles.statLbl}>Minutos</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.sky }]}>5</Text>
          <Text style={styles.statLbl}>Goles</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>8</Text>
          <Text style={styles.statLbl}>Asist.</Text>
        </View>
      </View>

      {/* 5. OBJETIVOS DE LA SEMANA */}
      <Text style={styles.sectionTitle}>Objetivos de la Semana</Text>
      <Card delay={200} style={styles.simpleCard}>
         <View style={styles.cardRow}>
            <FontAwesome name="crosshairs" size={24} color={colors.sky} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.cardTitle}>Intensidad Defensiva</Text>
              <Text style={styles.cardSub}>Completar 3 entrenamientos</Text>
            </View>
         </View>
      </Card>

      {/* 6. LOGROS RECIENTES */}
      <Text style={styles.sectionTitle}>Logros Recientes</Text>
      <Card delay={250} style={styles.simpleCard}>
         <View style={styles.cardRow}>
            <FontAwesome name="trophy" size={24} color={colors.sky} />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.cardTitle}>MVP Jornada 4</Text>
              <Text style={styles.cardSub}>Asistencia 100%</Text>
            </View>
         </View>
      </Card>

      {/* 7. ACCESOS RÁPIDOS */}
      <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
      <View style={styles.quickAccessGrid}>
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/jugador/perfil' as any)}>
            <FontAwesome name="user" size={24} color={colors.white} />
            <Text style={styles.quickBtnText}>Mi Perfil</Text>
         </TouchableOpacity>
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
         <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/(drawer)/jugador/mensajes' as any)}>
            <FontAwesome name="comments" size={24} color={colors.white} />
            <Text style={styles.quickBtnText}>Mensajes</Text>
         </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#071A3D' },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl, paddingTop: spacing.m },
  
  headerProfileContainer: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 24,
    padding: spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: spacing.xl,
  },
  headerTopRow: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { marginRight: 16 },
  avatar: { width: 70, height: 70, borderRadius: 35, borderWidth: 3, borderColor: colors.sky },
  headerInfo: { flex: 1 },
  playerName: { color: colors.white, fontSize: 22, fontWeight: '900', letterSpacing: -0.5 },
  teamRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4, flexWrap: 'wrap' },
  teamText: { color: colors.muted, fontSize: 12, fontWeight: '700' },
  dotSeparator: { color: colors.muted, marginHorizontal: 6, fontSize: 10 },
  streakBox: { flexDirection: 'row', alignItems: 'center', marginTop: 8, backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', borderWidth: 1, borderColor: colors.success },
  streakIcon: { fontSize: 12, marginRight: 4 },
  streakText: { color: colors.success, fontSize: 11, fontWeight: '800' },

  sectionTitle: { color: colors.white, fontSize: 18, fontWeight: '900', marginBottom: spacing.m, textTransform: 'uppercase', letterSpacing: 0.5 },

  simpleCard: { padding: spacing.m, marginBottom: spacing.xl, backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: colors.white, fontSize: 16, fontWeight: '800' },
  cardSub: { color: colors.muted, fontSize: 13, fontWeight: '600', marginTop: 2 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.xl },
  statBox: { width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: spacing.m, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  statNum: { color: colors.white, fontSize: 28, fontWeight: '900' },
  statLbl: { color: colors.muted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginTop: 4 },

  quickAccessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  quickBtn: { width: '31%', backgroundColor: 'rgba(79, 195, 247, 0.1)', borderWidth: 1, borderColor: 'rgba(79, 195, 247, 0.3)', padding: spacing.m, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickBtnText: { color: colors.white, fontSize: 10, fontWeight: '800', marginTop: 8, textTransform: 'uppercase', textAlign: 'center' }
});
