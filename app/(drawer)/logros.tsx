import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../src/utils/theme';
import { AnimatedCard as Card } from '../../src/components/ui/AnimatedCard';
import { ProgressBar } from '../../src/components/ui/ProgressBar';

const { width } = Dimensions.get('window');

const MAIN_TABS = ['🏅 INSIGNIAS', '🎯 RETOS'];
const RETO_TABS = ['Ataque', 'Defensa', 'Entrenamiento', 'Compañerismo', 'Club', 'Temporada'];

const INSIGNIAS = [
  { id: 1, title: 'Goleador', desc: 'Concede al marcar 25 goles con el CD Jesuitas.', icon: 'soccer-ball-o', color: colors.sky, unlocked: true, date: '15 Sep 2026' },
  { id: 2, title: 'Asistente', desc: 'Concede al alcanzar 20 asistencias.', icon: 'handshake-o', color: '#22C55E', unlocked: true, date: '28 Sep 2026' },
  { id: 3, title: 'Incansable', desc: 'Completa el 100% de los entrenamientos durante un mes.', icon: 'heartbeat', color: '#E11D48', unlocked: true, date: '1 Nov 2026' },
  { id: 4, title: 'MVP', desc: 'Ser elegido MVP en 5 partidos.', icon: 'star', color: '#EAB308', unlocked: false },
  { id: 5, title: 'Leyenda Jesuitas', desc: 'Disputar 100 partidos oficiales con el club.', icon: 'shield', color: colors.sky, unlocked: false },
  { id: 6, title: 'Compañero del Año', desc: 'Ayuda constantemente a tus compañeros.', icon: 'users', color: '#F97316', unlocked: true, date: '5 Oct 2026' },
  { id: 7, title: 'Fair Play', desc: 'Destaca por tu juego limpio.', icon: 'hand-peace-o', color: '#A855F7', unlocked: false },
  { id: 8, title: 'Respeto al Rival', desc: 'Completa 20 partidos demostrando respeto al rival.', icon: 'handshake-o', color: colors.sky, unlocked: false },
  { id: 9, title: 'Respeto al Árbitro', desc: 'Mantén una actitud ejemplar hacia los árbitros.', icon: 'gavel', color: '#EAB308', unlocked: false },
  { id: 10, title: 'Confianza del Entrenador', desc: 'Demuestra compromiso y responsabilidad.', icon: 'check-circle', color: '#22C55E', unlocked: true, date: '12 Oct 2026' },
  { id: 11, title: 'Afición Ejemplar', desc: 'Respeta siempre al público.', icon: 'bullhorn', color: colors.sky, unlocked: false },
  { id: 12, title: 'Puntualidad', desc: 'Llega siempre puntual a entrenamientos y partidos.', icon: 'clock-o', color: '#3B82F6', unlocked: true, date: '10 Nov 2026' },
  { id: 13, title: 'Valiente', desc: 'Cumple con los valores del CD Jesuitas demostrando valentía, esfuerzo, compromiso y determinación.', icon: 'bolt', color: '#EAB308', unlocked: false },
  { id: 14, title: 'ADN Jesuitas', desc: 'Representa los valores del club dentro y fuera del terreno de juego.', icon: 'heart', color: '#E11D48', unlocked: false },
  { id: 15, title: 'Compañerismo', desc: 'Antepón siempre el equipo al éxito individual.', icon: 'link', color: '#A855F7', unlocked: true, date: '20 Sep 2026' },
];

const generateReto = (id: number, title: string, ctx: string, diff: string, total: number, curr: number, xp: number) => {
  return { id, title, ctx, diff, total, curr, xp };
};

const RETOS_ATAQUE = [
  generateReto(1, 'Marcar 1 gol.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(2, 'Marcar un doblete.', '⚽ Partido', '🟡 Media', 1, 0, 150),
  generateReto(3, 'Conseguir un hat-trick.', '⚽ Partido', '🔴 Difícil', 1, 0, 300),
  generateReto(4, 'Dar una asistencia.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(5, 'Generar 5 ocasiones de gol.', '⚽ Partido', '🟡 Media', 5, 2, 100),
  generateReto(6, 'Realizar 10 tiros a puerta.', '⚽ Partido', '🟡 Media', 10, 6, 120),
  generateReto(7, 'Completar un entrenamiento de finalización.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(8, 'Mejorar el porcentaje de tiro a puerta al 70%.', '📅 Ambos', '🔴 Difícil', 70, 55, 250),
  generateReto(9, 'Marcar con la pierna menos hábil.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(10, 'Marcar de cabeza.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(11, 'Completar correctamente todos los ejercicios de definición.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 100),
  generateReto(12, 'Finalizar 20 jugadas durante los entrenamientos.', '🏃 Entrenamiento', '🟢 Fácil', 20, 14, 150),
  generateReto(13, 'Participar en 5 goles consecutivos del equipo.', '⚽ Partido', '🔴 Difícil', 5, 2, 500),
  generateReto(14, 'No perder balones en zona de ataque durante un partido.', '⚽ Partido', '🔴 Difícil', 1, 0, 400),
  generateReto(15, 'Ser el máximo goleador del mes.', '📅 Temporada', '🔴 Difícil', 1, 0, 1000),
];

const RETOS_DEFENSA = [
  generateReto(16, 'Recuperar 10 balones.', '⚽ Partido', '🟢 Fácil', 10, 8, 100),
  generateReto(17, 'Ganar 15 duelos individuales.', '⚽ Partido', '🟡 Media', 15, 7, 150),
  generateReto(18, 'Completar un entrenamiento defensivo perfecto.', '🏃 Entrenamiento', '🟡 Media', 1, 1, 150),
  generateReto(19, 'No cometer faltas innecesarias.', '⚽ Partido', '🟢 Fácil', 1, 0, 50),
  generateReto(20, 'Interceptar 5 pases.', '⚽ Partido', '🟢 Fácil', 5, 3, 100),
  generateReto(21, 'Ganar todos los duelos aéreos de un partido.', '⚽ Partido', '🔴 Difícil', 1, 0, 300),
  generateReto(22, 'Mejorar el marcaje individual.', '🏃 Entrenamiento', '🟡 Media', 100, 40, 200),
  generateReto(23, 'Completar todos los ejercicios defensivos.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(24, 'Ayudar en las coberturas correctamente.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(25, 'Mantener la portería a cero (defensas/porteros).', '⚽ Partido', '🔴 Difícil', 1, 1, 250),
  generateReto(26, 'No recibir tarjetas durante 5 partidos.', '📅 Temporada', '🟡 Media', 5, 2, 300),
  generateReto(27, 'Recuperar 100 balones en la temporada.', '📅 Temporada', '🔴 Difícil', 100, 34, 1000),
  generateReto(28, 'Liderar la línea defensiva.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(29, 'Comunicar constantemente con la defensa.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(30, 'Ser elegido mejor defensor del mes.', '📅 Temporada', '🔴 Difícil', 1, 0, 800),
];

const RETOS_ENTRENAMIENTO = [
  generateReto(31, 'Asistir a todos los entrenamientos del mes.', '🏃 Entrenamiento', '🟡 Media', 12, 10, 300),
  generateReto(32, 'Llegar puntual durante un mes.', '🏃 Entrenamiento', '🟡 Media', 12, 12, 200),
  generateReto(33, 'Completar todos los ejercicios.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(34, 'No faltar sin justificar.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(35, 'Mantener actitud positiva.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(36, 'Recoger el material al finalizar.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(37, 'Ayudar a montar el entrenamiento.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(38, 'Animar a los compañeros.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(39, 'Cumplir todos los objetivos semanales.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 200),
  generateReto(40, 'Superar todas las pruebas físicas.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 500),
  generateReto(41, 'Completar un entrenamiento sin errores técnicos.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 300),
  generateReto(42, 'Mejorar la intensidad en todos los ejercicios.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 150),
  generateReto(43, 'Completar un circuito técnico perfecto.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 150),
  generateReto(44, 'Ser elegido mejor entrenador de la semana por actitud.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 500),
  generateReto(45, 'Alcanzar el 100% de asistencia trimestral.', '🏃 Entrenamiento', '🔴 Difícil', 3, 1, 800),
];

const RETOS_COMPA = [
  generateReto(46, 'Ayudar a un compañero durante un entrenamiento.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(47, 'Animar al equipo durante todo el partido.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(48, 'Felicitar al rival al finalizar.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(49, 'Respetar todas las decisiones arbitrales.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(50, 'No protestar durante un partido.', '⚽ Partido', '🟡 Media', 1, 1, 100),
  generateReto(51, 'Motivar a un compañero después de un error.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(52, 'Compartir material con un compañero.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(53, 'Colaborar en recoger el material.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(54, 'Resolver un conflicto de forma respetuosa.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(55, 'Mantener una actitud positiva toda la semana.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(56, 'Ser ejemplo de respeto hacia el entrenador.', '📅 Ambos', '🟡 Media', 1, 1, 150),
  generateReto(57, 'Ser ejemplo de respeto hacia el delegado.', '📅 Ambos', '🟡 Media', 1, 1, 150),
  generateReto(58, 'Ser ejemplo de respeto hacia el público.', '⚽ Partido', '🟡 Media', 1, 1, 150),
  generateReto(59, 'Recibir una valoración positiva del entrenador por actitud.', '📅 Ambos', '🔴 Difícil', 1, 0, 300),
  generateReto(60, 'Completar un mes demostrando los valores del CD Jesuitas.', '📅 Ambos', '🔴 Difícil', 1, 0, 500),
];

const RETOS_CLUB = [
  generateReto(61, 'Participar en un evento del club.', '📅 Ambos', '🟢 Fácil', 1, 0, 100),
  generateReto(62, 'Asistir a la presentación de equipos.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(63, 'Participar en un campus.', '📅 Ambos', '🟡 Media', 1, 0, 250),
  generateReto(64, 'Representar al club en un torneo.', '⚽ Partido', '🔴 Difícil', 1, 0, 500),
  generateReto(65, 'Colaborar en una actividad solidaria.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(66, 'Asistir a una charla formativa.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(67, 'Participar en una sesión de tecnificación.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 200),
  generateReto(68, 'Llevar correctamente la equipación oficial durante un mes.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(69, 'Conocer la historia del CD Jesuitas.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(70, 'Respetar las instalaciones del club.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(71, 'Participar en una jornada de convivencia.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(72, 'Ayudar en actividades del club.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(73, 'Ser ejemplo de comportamiento fuera del campo.', '📅 Ambos', '🔴 Difícil', 1, 0, 300),
  generateReto(74, 'Representar los valores del club en redes sociales.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(75, 'Obtener la insignia "ADN Jesuitas".', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
];

const RETOS_TEMPORADA = [
  generateReto(76, 'Marcar 10 goles.', '⚽ Partido', '🔴 Difícil', 10, 7, 1000),
  generateReto(77, 'Dar 10 asistencias.', '⚽ Partido', '🔴 Difícil', 10, 4, 1000),
  generateReto(78, 'Disputar 25 partidos.', '⚽ Partido', '🔴 Difícil', 25, 18, 1500),
  generateReto(79, 'Alcanzar el 95% de asistencia.', '📅 Ambos', '🔴 Difícil', 100, 96, 2000),
  generateReto(80, 'No ser expulsado.', '⚽ Partido', '🟡 Media', 1, 1, 500),
  generateReto(81, 'Completar tres meses de juego limpio.', '⚽ Partido', '🔴 Difícil', 3, 2, 800),
  generateReto(82, 'Ser elegido MVP tres veces.', '⚽ Partido', '🔴 Difícil', 3, 1, 1200),
  generateReto(83, 'Ayudar al equipo a clasificarse para la fase final.', '⚽ Partido', '🔴 Difícil', 1, 0, 3000),
  generateReto(84, 'Mejorar la valoración media respecto al año anterior.', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
  generateReto(85, 'Completar todos los objetivos individuales.', '📅 Ambos', '🔴 Difícil', 10, 5, 1500),
  generateReto(86, 'Desbloquear 10 insignias.', '📅 Ambos', '🔴 Difícil', 10, 6, 2000),
  generateReto(87, 'Completar 30 retos.', '📅 Ambos', '🔴 Difícil', 30, 15, 2500),
  generateReto(88, 'Mantener una actitud ejemplar toda la temporada.', '📅 Ambos', '🔴 Difícil', 1, 0, 1500),
  generateReto(89, 'Ser un referente para los compañeros.', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
  generateReto(90, 'Completar una temporada representando los valores del CD Jesuitas.', '📅 Ambos', '🔴 Difícil', 1, 0, 5000),
];

export default function LogrosJugadorScreen() {
  const router = useRouter();
  const [activeMainTab, setActiveMainTab] = useState(MAIN_TABS[0]);
  const [activeRetoTab, setActiveRetoTab] = useState(RETO_TABS[0]);

  const renderInsignias = () => (
    <View style={styles.gridContainer}>
      {INSIGNIAS.map((ins, idx) => (
         <Card delay={50 + (idx * 20)} key={ins.id} style={[styles.insigniaCard, !ins.unlocked && styles.insigniaCardLocked]}>
            <View style={[styles.insigniaMedal, { backgroundColor: ins.unlocked ? `${ins.color}20` : 'rgba(255,255,255,0.05)', borderColor: ins.unlocked ? ins.color : 'rgba(255,255,255,0.1)' }]}>
               <FontAwesome name={ins.unlocked ? ins.icon : 'lock'} size={32} color={ins.unlocked ? ins.color : colors.muted} />
            </View>
            <View style={styles.insigniaInfo}>
               <Text style={[styles.insigniaTitle, !ins.unlocked && styles.textLocked]}>{ins.title}</Text>
               <Text style={styles.insigniaDesc} numberOfLines={3}>{ins.desc}</Text>
               
               {ins.unlocked ? (
                  <View style={styles.insigniaStatus}>
                     <FontAwesome name="check-circle" size={12} color={colors.success} />
                     <Text style={styles.insigniaDate}>{ins.date}</Text>
                  </View>
               ) : (
                  <View style={styles.insigniaStatus}>
                     <Text style={styles.insigniaLockedText}>Bloqueada</Text>
                  </View>
               )}
            </View>
         </Card>
      ))}
    </View>
  );

  const getDiffColor = (diff: string) => {
    if (diff.includes('Fácil')) return colors.success;
    if (diff.includes('Media')) return '#EAB308';
    return '#E11D48';
  };

  const renderRetosList = (list: any[]) => (
    <View style={styles.retosList}>
      {list.map((reto, idx) => {
         const perc = Math.min((reto.curr / reto.total) * 100, 100);
         const isDone = perc === 100;
         const diffColor = getDiffColor(reto.diff);

         return (
            <Card delay={50 + (idx * 20)} key={reto.id} style={styles.retoCard}>
               <View style={styles.retoHeader}>
                  <Text style={[styles.retoTitle, isDone && styles.retoTitleDone]}>{reto.title}</Text>
                  <View style={styles.retoXpBadge}>
                     <Text style={styles.retoXpText}>+{reto.xp} XP</Text>
                  </View>
               </View>

               <View style={styles.retoMetaRow}>
                  <Text style={styles.retoCtxText}>{reto.ctx}</Text>
                  <Text style={[styles.retoDiffText, { color: diffColor }]}>{reto.diff}</Text>
               </View>

               <View style={styles.retoProgressRow}>
                  <Text style={[styles.retoProgressText, isDone && {color: colors.success}]}>{reto.curr} / {reto.total}</Text>
                  <Text style={[styles.retoProgressText, { fontWeight: '900', color: isDone ? colors.success : colors.sky }]}>{Math.round(perc)}%</Text>
               </View>
               <ProgressBar progress={perc / 100} color={isDone ? colors.success : colors.sky} height={8} />
            </Card>
         )
      })}
    </View>
  );

  const renderRetos = () => {
    let currentList = RETOS_ATAQUE;
    if (activeRetoTab === 'Defensa') currentList = RETOS_DEFENSA;
    if (activeRetoTab === 'Entrenamiento') currentList = RETOS_ENTRENAMIENTO;
    if (activeRetoTab === 'Compañerismo') currentList = RETOS_COMPA;
    if (activeRetoTab === 'Club') currentList = RETOS_CLUB;
    if (activeRetoTab === 'Temporada') currentList = RETOS_TEMPORADA;

    return (
      <View>
         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.retoTabsScroll} contentContainerStyle={{ gap: 8 }}>
            {RETO_TABS.map(tab => (
               <TouchableOpacity 
                  key={tab} 
                  style={[styles.retoTabBtn, activeRetoTab === tab && styles.retoTabBtnActive]}
                  onPress={() => setActiveRetoTab(tab)}
               >
                  <Text style={[styles.retoTabText, activeRetoTab === tab && styles.retoTabTextActive]}>{tab}</Text>
               </TouchableOpacity>
            ))}
         </ScrollView>
         {renderRetosList(currentList)}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* CABECERA (Volver) */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <FontAwesome name="arrow-left" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.topNavTitle}>PROGRESIÓN</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* CABECERA XP / NIVEL PREMIUM */}
        <Card delay={50} style={styles.heroCard}>
           <View style={styles.heroHeader}>
              <View style={styles.trophyBox}>
                 <FontAwesome name="trophy" size={40} color="#EAB308" />
              </View>
              <View style={styles.heroInfo}>
                 <Text style={styles.heroLevelText}>Nivel 8</Text>
                 <Text style={styles.heroXpText}>2.450 XP Total</Text>
              </View>
           </View>
           <View style={styles.heroProgressArea}>
              <View style={styles.heroProgressRow}>
                 <Text style={styles.heroProgressLabel}>Progreso a Nivel 9</Text>
                 <Text style={styles.heroProgressValue}>65%</Text>
              </View>
              <ProgressBar progress={0.65} color="#EAB308" height={10} />
           </View>
        </Card>

        {/* TABS PRINCIPALES (INSIGNIAS / RETOS) */}
        <View style={styles.mainTabs}>
           {MAIN_TABS.map(tab => (
              <TouchableOpacity 
                 key={tab} 
                 style={[styles.mainTabBtn, activeMainTab === tab && styles.mainTabBtnActive]}
                 onPress={() => setActiveMainTab(tab)}
              >
                 <Text style={[styles.mainTabText, activeMainTab === tab && styles.mainTabTextActive]}>{tab}</Text>
              </TouchableOpacity>
           ))}
        </View>

        {/* CONTENIDO DINÁMICO */}
        {activeMainTab === MAIN_TABS[0] ? renderInsignias() : renderRetos()}

        <View style={{ height: 40 }} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0B1F4D' },
  container: { flex: 1 },
  content: { paddingHorizontal: spacing.l, paddingBottom: spacing.xxl },
  
  topNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.m, paddingTop: spacing.m },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  topNavTitle: { color: colors.white, fontSize: 16, fontWeight: '900', letterSpacing: 1 },

  heroCard: { backgroundColor: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.3)', padding: spacing.xl, borderRadius: 24, marginBottom: spacing.xl },
  heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  trophyBox: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(234, 179, 8, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  heroInfo: { flex: 1 },
  heroLevelText: { color: colors.white, fontSize: 24, fontWeight: '900' },
  heroXpText: { color: '#EAB308', fontSize: 14, fontWeight: '800', marginTop: 4 },
  heroProgressArea: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 16, borderRadius: 16 },
  heroProgressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  heroProgressLabel: { color: colors.white, fontSize: 12, fontWeight: '700' },
  heroProgressValue: { color: '#EAB308', fontSize: 12, fontWeight: '900' },

  mainTabs: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 6, marginBottom: spacing.xl },
  mainTabBtn: { flex: 1, paddingVertical: 14, alignItems: 'center', borderRadius: 12 },
  mainTabBtnActive: { backgroundColor: colors.sky },
  mainTabText: { color: colors.muted, fontSize: 14, fontWeight: '800' },
  mainTabTextActive: { color: colors.navy, fontWeight: '900' },

  // Insignias
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  insigniaCard: { width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.m, borderRadius: 20, alignItems: 'center' },
  insigniaCardLocked: { opacity: 0.7, backgroundColor: 'rgba(0,0,0,0.2)' },
  insigniaMedal: { width: 70, height: 70, borderRadius: 35, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 12, elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  insigniaInfo: { alignItems: 'center', flex: 1, justifyContent: 'space-between' },
  insigniaTitle: { color: colors.white, fontSize: 13, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  textLocked: { color: colors.muted },
  insigniaDesc: { color: colors.muted, fontSize: 10, fontWeight: '600', textAlign: 'center', marginBottom: 12, lineHeight: 14 },
  insigniaStatus: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  insigniaDate: { color: colors.success, fontSize: 10, fontWeight: '800', marginLeft: 6 },
  insigniaLockedText: { color: colors.muted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },

  // Retos
  retoTabsScroll: { marginBottom: 20 },
  retoTabBtn: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  retoTabBtnActive: { backgroundColor: 'rgba(79, 195, 247, 0.15)', borderColor: colors.sky },
  retoTabText: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  retoTabTextActive: { color: colors.sky, fontWeight: '900' },
  
  retosList: { gap: 12 },
  retoCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.05)', padding: spacing.l, borderRadius: 20 },
  retoHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  retoTitle: { color: colors.white, fontSize: 14, fontWeight: '800', flex: 1, marginRight: 12, lineHeight: 20 },
  retoTitleDone: { color: colors.muted, textDecorationLine: 'line-through' },
  retoXpBadge: { backgroundColor: 'rgba(234, 179, 8, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  retoXpText: { color: '#EAB308', fontSize: 11, fontWeight: '900' },
  
  retoMetaRow: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  retoCtxText: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  retoDiffText: { fontSize: 11, fontWeight: '800' },

  retoProgressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  retoProgressText: { color: colors.white, fontSize: 12, fontWeight: '700' },
});
