import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useSport } from '../../context/SportContext';
import { useAuth } from '../../context/AuthContext';
import { useRole } from '../../context/RoleContext';

const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#81D4FA',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  danger: '#ef4444'
};

const FAMILIAS_MENU_ITEMS = [
  { label: 'Inicio', route: 'index', icon: '🏠' },
  { label: 'Mi Zona', route: 'mi-zona', icon: '🌟' },
  { label: 'Calendario', route: 'calendario', icon: '📅' },
  { label: 'Convocatorias', route: 'convocatorias', icon: '📋' },
  { label: 'Entrenamientos', route: 'entrenamientos', icon: '🏃' },
  { label: 'Partidos', route: 'partidos', icon: '🏟️' },
  { label: 'Torneos', route: 'torneos', icon: '🏆' },
  { label: 'Mensajes', route: 'mensajes', icon: '💬' },
  { label: 'Avisos', route: 'avisos', icon: '📢' },
  { label: 'Club', route: 'instalaciones', icon: '🏛️' },
  { label: 'Ajustes', route: 'configuracion', icon: '⚙️' },
];

const COACH_MENU_ITEMS = [
  { label: 'Inicio', route: 'index', icon: '🏠' },
  { label: 'Plantilla', route: 'plantillas', icon: '👥' },
  { label: 'Calendario', route: 'calendario', icon: '📅' },
  { label: 'Convocatorias', route: 'convocatorias', icon: '📋' },
  { label: 'Entrenamientos', route: 'entrenamientos', icon: '🏃' },
  { label: 'Táctica', route: 'tactica', icon: '🧠' },
  { label: 'Partidos', route: 'partidos', icon: '🏟️' },
  { label: 'Estadísticas', route: 'estadisticas', icon: '📊' },
  { label: 'Informes', route: 'informes', icon: '📄' },
  { label: 'Mensajes', route: 'mensajes', icon: '💬' },
  { label: 'Club', route: 'instalaciones', icon: '🏛️' },
  { label: 'Ajustes', route: 'configuracion', icon: '⚙️' },
];

const COORDINATOR_MENU_ITEMS = [
  { label: 'Inicio', route: 'index', icon: '🏠' },
  { label: 'Personas', route: 'personas', icon: '👥' },
  { label: 'Equipos', route: 'equipos', icon: '⚽' },
  { label: 'Jugadores', route: 'jugadores', icon: '👤' },
  { label: 'Entrenadores', route: 'entrenadores', icon: '👨‍🏫' },
  { label: 'Calendario', route: 'calendario', icon: '📅' },
  { label: 'Convocatorias', route: 'convocatorias', icon: '📋' },
  { label: 'Entrenamientos', route: 'entrenamientos', icon: '🏃' },
  { label: 'Partidos', route: 'partidos', icon: '🏟️' },
  { label: 'Estadísticas', route: 'estadisticas', icon: '📊' },
  { label: 'Informes', route: 'informes', icon: '📄' },
  { label: 'Mensajes', route: 'mensajes', icon: '💬' },
  { label: 'Club', route: 'instalaciones', icon: '🏛️' },
  { label: 'Ajustes', route: 'configuracion', icon: '⚙️' },
];

import { useDemoNavigation } from '../../context/DemoNavigationContext';

export function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { selectedDemoProfile, resetDemoFlow } = useDemoNavigation();
  const { activeContext, user, activePlayerId, linkedPlayers, assignedTeams, clearProfile } = useAuth();
  const { role } = useRole();
  const { sport, setSport } = useSport();

  const activePlayer = linkedPlayers.find(p => p.id === activePlayerId) || linkedPlayers[0] || null;
  const activeTeam = (assignedTeams && assignedTeams[0] && assignedTeams[0].name) ? assignedTeams[0].name : 'Infantil A';

  const targetContext = selectedDemoProfile || activeContext || 'FAMILIA';

  const isFamilias = targetContext === 'FAMILIA';
  const isEntrenador = targetContext === 'ENTRENADOR';
  const isCoordinador = targetContext === 'COORDINADOR' || targetContext === 'DIR_DEPORTIVA' || targetContext === 'ADMIN_GENERAL';

  const BottomActions = () => (
    <View style={styles.bottomActionsContainer}>
      <TouchableOpacity 
        style={styles.bottomActionBtn} 
        onPress={() => {
          setSport(null);
          router.replace('/');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.bottomActionIcon}>⚽</Text>
        <Text style={[styles.bottomActionText, { color: clubColors.skyPrimary }]}>Cambiar deporte</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.bottomActionBtn} 
        onPress={() => {
          resetDemoFlow();
          clearProfile();
          router.replace('/');
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.bottomActionIcon}>👥</Text>
        <Text style={styles.bottomActionText}>Cambiar Perfil</Text>
      </TouchableOpacity>
    </View>
  );

  if (isEntrenador) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerFamilias}>
          <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={56} color={clubColors.white} style={{marginBottom: 16}} />
          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name || 'Carlos Ruiz'}</Text>
                <Text style={styles.tutorRole}>Míster • {activeTeam}</Text>
             </View>
          </View>
        </View>

        <View style={styles.menuContainerFamilias}>
           {COACH_MENU_ITEMS.map((item, idx) => (
             <TouchableOpacity 
               key={idx}
               style={styles.menuItemFamilias}
               onPress={() => router.push(`/(drawer)/${item.route}` as any)}
               activeOpacity={0.7}
             >
               <View style={styles.menuItemFamiliasLeft}>
                  <Text style={{ fontSize: 20, marginRight: 16, width: 28, textAlign: 'center' }}>
                    {item.icon}
                  </Text>
                  <Text style={styles.menuLabelFamilias}>
                    {item.label}
                  </Text>
               </View>
             </TouchableOpacity>
           ))}
        </View>
        <BottomActions />
      </ScrollView>
    );
  }

  if (isCoordinador) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerFamilias}>
          <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={56} color={clubColors.white} style={{marginBottom: 16}} />
          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name || `Javier Domínguez`}</Text>
                <Text style={styles.tutorRole}>Coordinación Deportiva</Text>
             </View>
          </View>
        </View>

        <View style={styles.menuContainerFamilias}>
           {COORDINATOR_MENU_ITEMS.map((item, idx) => (
             <TouchableOpacity 
               key={idx}
               style={styles.menuItemFamilias}
               onPress={() => {
                 if (item.route === 'index') {
                   router.replace('/(drawer)/inicio' as any);
                 } else {
                   router.push(`/(drawer)/${item.route}` as any);
                 }
               }}
               activeOpacity={0.7}
             >
               <View style={styles.menuItemFamiliasLeft}>
                  <Text style={{ fontSize: 20, marginRight: 16, width: 28, textAlign: 'center' }}>
                    {item.icon}
                  </Text>
                  <Text style={styles.menuLabelFamilias}>
                    {item.label}
                  </Text>
               </View>
             </TouchableOpacity>
           ))}
        </View>
        <BottomActions />
      </ScrollView>
    );
  }

  // DEFAULT / FAMILIAS
  return (
    <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.headerFamilias}>
        <View style={styles.headerFamiliasInfoRow}>
           <View style={styles.avatarFamilias}>
              <FontAwesome name="user" size={24} color={clubColors.navy} />
           </View>
           <View style={styles.textFamiliasBox}>
              <Text style={styles.tutorName}>{user?.full_name || 'Familia Martínez'}</Text>
              <Text style={styles.tutorRole}>Familia / Tutor</Text>
           </View>
        </View>
        
        <View style={styles.sonCardFamilias}>
           <Text style={styles.sonLabel}>Siguiendo a:</Text>
           <Text style={styles.sonName}>{activePlayer ? activePlayer.name : 'Pablo Martínez & Hugo Martínez'}</Text>
           <Text style={styles.sonTeam}>Cadete B Fútbol • Infantil A Futsal</Text>
        </View>
      </View>

      <View style={styles.menuContainerFamilias}>
         {FAMILIAS_MENU_ITEMS.map((item, idx) => (
           <TouchableOpacity 
             key={idx}
             style={styles.menuItemFamilias}
             onPress={() => {
               if (item.route === 'index') {
                 router.replace('/(drawer)/inicio' as any);
               } else {
                 router.push(`/(drawer)/${item.route}` as any);
               }
             }}
             activeOpacity={0.7}
           >
             <View style={styles.menuItemFamiliasLeft}>
                <Text style={{ fontSize: 20, marginRight: 16, width: 28, textAlign: 'center' }}>
                  {item.icon}
                </Text>
                <Text style={styles.menuLabelFamilias}>
                  {item.label}
                </Text>
             </View>
           </TouchableOpacity>
         ))}
       </View>

       <BottomActions />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomActionsContainer: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  bottomActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  bottomActionIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 28,
    textAlign: 'center',
  },
  bottomActionText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
  },
  containerFamilias: {
    flex: 1,
    backgroundColor: clubColors.navy,
  },
  headerFamilias: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerFamiliasInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarFamilias: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: clubColors.skyPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFamiliasBox: {
    marginLeft: 16,
  },
  tutorName: {
    color: clubColors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  tutorRole: {
    color: clubColors.skyPrimary,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: clubColors.danger,
  },
  streakText: {
    color: clubColors.white,
    fontSize: 12,
    fontWeight: '900',
  },
  levelCardJugador: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: clubColors.skyPrimary,
  },
  levelLabel: {
    color: clubColors.white,
    fontSize: 14,
    fontWeight: '900',
  },
  levelPoints: {
    color: clubColors.skyPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: clubColors.skyPrimary,
    borderRadius: 4,
  },

  sonCardFamilias: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sonLabel: {
    color: clubColors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sonName: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '900',
  },
  sonTeam: {
    color: clubColors.skyPrimary,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  menuContainerFamilias: {
    paddingVertical: 16,
  },
  menuItemFamilias: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemFamiliasLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabelFamilias: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '700',
  }
});
