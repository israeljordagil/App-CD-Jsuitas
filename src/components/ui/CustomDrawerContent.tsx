import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useSport } from '../../context/SportContext';
import { useAuth } from '../../context/AuthContext';
import { useReview } from '../../context/ReviewContext';

// Paleta corporativa exigida
const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#81D4FA',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  danger: '#ef4444' // Para los badges
};

export function CustomDrawerContent(props: any) {
  const { sport } = useSport();
type MenuItem = {
  label: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  route: string;
  roles: string[];
  subItems?: { label: string; route: string }[];
}

const menuItems: MenuItem[] = [
  { label: 'Inicio', icon: 'home', route: 'index', roles: ['jugador', 'entrenador', 'coordinador'] },
  { 
    label: 'Partidos', 
    icon: 'trophy', 
    route: 'partidos',
    roles: ['jugador', 'entrenador', 'coordinador'],
    subItems: [
      { label: 'Hoy', route: 'partidos' },
      { label: 'Convocatorias', route: 'convocatorias' },
      { label: 'En directo', route: 'live_match' },
      { label: 'Resultados', route: 'partidos' },
      { label: 'Actas', route: 'partidos' },
      { label: 'Árbitros', route: 'partidos' },
    ]
  },
  { 
    label: 'Equipos', 
    icon: 'shield', 
    route: 'equipos',
    roles: ['entrenador', 'coordinador'],
    subItems: [
      { label: 'Juvenil', route: 'equipos' },
      { label: 'Cadete', route: 'equipos' },
      { label: 'Infantil', route: 'equipos' },
      { label: 'Alevín', route: 'equipos' },
      { label: 'Benjamín', route: 'equipos' },
      { label: 'Prebenjamín', route: 'equipos' },
      { label: 'Querubín', route: 'equipos' },
    ]
  },
  { label: 'Jugadores', icon: 'user', route: 'jugadores', roles: ['jugador', 'entrenador', 'coordinador'] },
  { label: 'Entrenadores', icon: 'id-badge', route: 'entrenadores', roles: ['coordinador'] },
  { label: 'Plantillas', icon: 'list', route: 'plantillas', roles: ['entrenador', 'coordinador'] },
  { label: 'Entrenamientos', icon: sport === 'baloncesto' ? 'dribbble' : 'soccer-ball-o', route: 'entrenamientos', roles: ['jugador', 'entrenador', 'coordinador'] },
  { label: 'Informes', icon: 'file-text-o', route: 'informes', roles: ['entrenador', 'coordinador'] },
  { label: 'Estadísticas', icon: 'bar-chart', route: 'estadisticas', roles: ['jugador', 'entrenador', 'coordinador'] },
  { label: 'Clasificaciones', icon: 'list-ol', route: 'clasificaciones', roles: ['jugador', 'coordinador'] },
  { label: 'Familias', icon: 'group', route: 'familias', roles: ['coordinador'] },
  { label: 'Comunicación', icon: 'comments', route: 'comunicacion', roles: ['jugador', 'entrenador', 'coordinador'] },
  { label: 'Árbitros', icon: 'legal', route: 'arbitros', roles: ['entrenador', 'coordinador'] },
  { label: 'Vestuarios', icon: 'tags', route: 'vestuarios', roles: ['entrenador', 'coordinador'] },
  { label: 'Instalaciones', icon: 'building', route: 'instalaciones', roles: ['entrenador', 'coordinador'] },
  { label: 'Material', icon: 'shopping-bag', route: 'material', roles: ['entrenador', 'coordinador'] },
  { label: 'Configuración', icon: 'cog', route: 'configuracion', roles: ['jugador', 'entrenador', 'coordinador'] },
];

const FAMILIAS_MENU_ITEMS = [
  { label: 'Inicio', route: 'index', icon: '🏠' },
  { label: 'Mis hijos', route: 'jugadores', icon: '👦' },
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

const PLAYER_MENU_ITEMS = [
  { label: 'Inicio', route: 'index', icon: '🏠' },
  { label: 'Mi perfil', route: 'mi-perfil', icon: '👤' },
  { label: 'Calendario', route: 'calendario', icon: '📅' },
  { label: 'Convocatorias', route: 'convocatorias', icon: '📋' },
  { label: 'Temporada', route: 'temporada', icon: '🏟️' },
  { label: 'Mi rendimiento', route: 'rendimiento', icon: '📊' },
  { label: 'Retos e insignias', route: 'retos', icon: '🏅' },
  { label: 'Mensajes', route: 'mensajes', icon: '💬' },
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
  { label: 'Equipos', route: 'equipos', icon: '👥' },
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



  const router = useRouter();
  const { activeContext, user, activePlayerId, linkedPlayers, assignedTeams, clearProfile } = useAuth();
  const { setSport } = useSport();
  
  const isFamilias = activeContext === 'FAMILIA';
  const isJugador = activeContext === 'JUGADOR';
  const isEntrenador = activeContext === 'ENTRENADOR';
  const isCoordinador = activeContext === 'COORDINADOR';

  const activePlayer = linkedPlayers?.find(p => p.id === activePlayerId);
  const activeTeam = assignedTeams?.[0]?.name || 'Equipo';

  const BottomActions = () => (
    <View style={styles.bottomActionsContainer}>
      <TouchableOpacity style={styles.bottomActionBtn} onPress={() => { clearProfile(); setSport(null); router.replace('/'); }} activeOpacity={0.7}>
        <Text style={styles.bottomActionIcon}>🏅</Text>
        <Text style={styles.bottomActionText}>Cambiar de deporte</Text>
      </TouchableOpacity>
    </View>
  );

  if (isJugador) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER JUGADOR (GAMIFICADO) */}
        <View style={styles.headerFamilias}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16}}>
             <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={56} color={clubColors.white} />
             <View style={styles.streakBadge}>
                <Text style={styles.streakText}>🔥 5 Rachas</Text>
             </View>
          </View>

          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name === 'Familia Martínez' ? 'Pablo Martínez' : user?.full_name}</Text>
                <Text style={styles.tutorRole}>{activePlayer ? `#10 • ${activePlayer.team}` : '#10'}</Text>
             </View>
          </View>
          
          <View style={styles.levelCardJugador}>
             <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                <Text style={styles.levelLabel}>Nivel 14</Text>
                <Text style={styles.levelPoints}>1,250 / 2,000 XP</Text>
             </View>
             <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, {width: '62%'}]} />
             </View>
          </View>
        </View>

        {/* MENU JUGADOR */}
        <View style={styles.menuContainerFamilias}>
           {PLAYER_MENU_ITEMS.map((item, idx) => {
             const isActive = item.route === 'index' && idx === 0;

             return (
               <TouchableOpacity 
                 key={idx}
                 style={[styles.menuItemFamilias, isActive && styles.menuItemFamiliasActive]}
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
                    <Text style={[styles.menuLabelFamilias, isActive && styles.menuLabelFamiliasActive]}>
                      {item.label}
                    </Text>
                 </View>
               </TouchableOpacity>
             );
           })}
        </View>
        <BottomActions />
      </ScrollView>
    );
  }

  if (isEntrenador) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER ENTRENADOR */}
        <View style={styles.headerFamilias}>
          <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={56} color={clubColors.white} style={{marginBottom: 16}} />
          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name || 'Entrenador'}</Text>
                <Text style={styles.tutorRole}>Míster • {activeTeam}</Text>
             </View>
          </View>
        </View>

        {/* MENU ENTRENADOR */}
        <View style={styles.menuContainerFamilias}>
           {COACH_MENU_ITEMS.map((item, idx) => {
             const isActive = item.route === 'index' && idx === 0;

             return (
               <TouchableOpacity 
                 key={idx}
                 style={[styles.menuItemFamilias, isActive && styles.menuItemFamiliasActive]}
                 onPress={() => router.push(`/(drawer)/${item.route}` as any)}
                 activeOpacity={0.7}
               >
                 <View style={styles.menuItemFamiliasLeft}>
                    <Text style={{ fontSize: 20, marginRight: 16, width: 28, textAlign: 'center' }}>
                      {item.icon}
                    </Text>
                    <Text style={[styles.menuLabelFamilias, isActive && styles.menuLabelFamiliasActive]}>
                      {item.label}
                    </Text>
                 </View>
               </TouchableOpacity>
             );
           })}
        </View>
        <BottomActions />
      </ScrollView>
    );
  }

  if (isFamilias) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* HEADER FAMILIAS */}
        <View style={styles.headerFamilias}>
          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name || 'Familia'}</Text>
                <Text style={styles.tutorRole}>Familia / Tutor</Text>
             </View>
          </View>
          
          <View style={styles.sonCardFamilias}>
             <Text style={styles.sonLabel}>Siguiendo a:</Text>
             <Text style={styles.sonName}>{activePlayer ? activePlayer.name : 'Sin vinculaciones'}</Text>
             {activePlayer && <Text style={styles.sonTeam}>{activePlayer.team} • {activePlayer.category}</Text>}
          </View>
        </View>

        {/* MENU FAMILIAS */}
        <View style={styles.menuContainerFamilias}>
           {FAMILIAS_MENU_ITEMS.map((item, idx) => {
             // Mock de activo (solo visual para index)
             const isActive = item.route === 'index' && idx === 0;

             return (
               <TouchableOpacity 
                 key={idx}
                 style={[styles.menuItemFamilias, isActive && styles.menuItemFamiliasActive]}
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
                    <Text style={[styles.menuLabelFamilias, isActive && styles.menuLabelFamiliasActive]}>
                      {item.label}
                    </Text>
                 </View>
               </TouchableOpacity>
             );
           })}
         </View>

         <BottomActions />
      </ScrollView>
    );
  }

  const sportName = sport === 'futbol' ? 'Fútbol' : sport === 'futbol_sala' ? 'Fútbol Sala' : sport === 'baloncesto' ? 'Baloncesto' : sport === 'voleibol' ? 'Voleibol' : 'Deporte';

  if (isCoordinador) {
    return (
      <ScrollView style={styles.containerFamilias} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER COORDINADOR */}
        <View style={styles.headerFamilias}>
          <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={56} color={clubColors.white} style={{marginBottom: 16}} />
          <View style={styles.headerFamiliasInfoRow}>
             <View style={styles.avatarFamilias}>
                <FontAwesome name="user" size={24} color={clubColors.navy} />
             </View>
             <View style={styles.textFamiliasBox}>
                <Text style={styles.tutorName}>{user?.full_name || `Coordinador`}</Text>
                <Text style={styles.tutorRole}>Gestión de {sportName}</Text>
             </View>
          </View>
        </View>

        {/* MENU COORDINADOR */}
        <View style={styles.menuContainerFamilias}>
           {COORDINATOR_MENU_ITEMS.map((item, idx) => {
             const isActive = item.route === 'index' && idx === 0;

             return (
               <TouchableOpacity 
                 key={idx}
                 style={[styles.menuItemFamilias, isActive && styles.menuItemFamiliasActive]}
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
                    <Text style={[styles.menuLabelFamilias, isActive && styles.menuLabelFamiliasActive]}>
                      {item.label}
                    </Text>
                 </View>
               </TouchableOpacity>
             );
           })}
        </View>
        <BottomActions />
      </ScrollView>
    );
  }

  // LOGICA PARA EL RESTO DE ROLES
  const roleString = activeContext?.toLowerCase() || '';
  const filteredItems = menuItems.filter(item => item.roles.includes(roleString) || roleString === 'admin' || roleString === 'dir_deportiva');
  
  return (
    <ScrollView style={styles.containerGeneric} contentContainerStyle={{ paddingTop: 0 }}>
        
        {/* Header Drawer Genérico */}
        <View style={styles.headerGeneric}>
          <FontAwesome name={sport === 'baloncesto' ? 'dribbble' : 'shield'} size={40} color={clubColors.white} style={styles.logoGeneric} />
          <Text style={styles.clubNameGeneric}>CD JESUITAS</Text>
          <Text style={{color:'#81D4FA', fontSize: 12, marginTop:4, fontWeight: '800', letterSpacing:2}}>{sport === 'baloncesto' ? 'BALONCESTO' : 'FÚTBOL'}</Text>
        </View>

        <View style={styles.dividerGeneric} />

        {/* Módulos Genéricos */}
        <View style={styles.menuContainerGeneric}>
          {filteredItems.map((item, index) => (
            <View key={index}>
              <TouchableOpacity 
                style={[
                  styles.menuItemGeneric,
                  item.route === 'index' && !isCoordinador && index === 0 ? styles.menuItemGenericActive : {}
                ]}
                onPress={() => {
                  if (item.route === 'index') {
                    router.replace('/(drawer)/inicio' as any);
                  } else {
                    router.push(`/(drawer)/${item.route}` as any);
                  }
                }}
              >
                <View style={styles.menuItemGenericContent}>
                  <FontAwesome 
                    name={item.icon} 
                    size={20} 
                    color={item.route === 'index' && !isCoordinador && index === 0 ? clubColors.skyPrimary : clubColors.white} 
                    style={styles.menuIconGeneric} 
                  />
                  <Text style={[
                    styles.menuLabelGeneric,
                    item.route === 'index' && roleString !== 'coordinador' && index === 0 ? styles.menuLabelGenericActive : {}
                  ]}>
                    {item.label}
                  </Text>
                </View>
                {item.subItems && (
                  <FontAwesome name="angle-down" size={20} color={clubColors.textMuted} />
                )}
              </TouchableOpacity>
              
              {/* SubItems Genéricos */}
              {item.subItems && (
                <View style={styles.subItemsGenericContainer}>
                  {item.subItems.map((sub, subIdx) => (
                    <TouchableOpacity 
                      key={subIdx} 
                      style={styles.subItemGeneric}
                      onPress={() => router.push(`/(drawer)/${sub.route}` as any)}
                    >
                      <Text style={styles.subItemGenericLabel}>{sub.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ESTILOS EXCLUSIVOS FAMILIAS
  // ============================
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
    color: '#ef4444', // Un color más de acción o simplemente blanco
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
  childAvatarDrawer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)'
  },
  childDetailText: {
    color: '#81D4FA',
    fontSize: 12,
    fontWeight: '700'
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
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  menuItemFamiliasActive: {
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    borderLeftColor: clubColors.skyPrimary,
  },
  menuItemFamiliasLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconFamilias: {
    width: 28,
    textAlign: 'center',
    marginRight: 16,
  },
  menuLabelFamilias: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  menuLabelFamiliasActive: {
    color: clubColors.skyPrimary,
    fontWeight: '900',
  },
  badgeFamilias: {
    backgroundColor: clubColors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeFamiliasText: {
    color: clubColors.white,
    fontSize: 12,
    fontWeight: '900',
  },

  // ============================
  // ESTILOS GENÉRICOS (OTROS ROLES)
  // ============================
  containerGeneric: {
    flex: 1,
    backgroundColor: '#020814',
  },
  headerGeneric: {
    backgroundColor: '#020814',
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGeneric: {
    marginBottom: 8,
  },
  clubNameGeneric: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  dividerGeneric: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  menuContainerGeneric: {
    paddingTop: 0,
  },
  menuItemGeneric: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  menuItemGenericActive: {
    backgroundColor: 'rgba(85, 199, 243, 0.1)',
    borderRightWidth: 4,
    borderRightColor: clubColors.skyPrimary,
  },
  menuItemGenericContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconGeneric: {
    width: 28,
    textAlign: 'center',
    marginRight: 16,
  },
  menuLabelGeneric: {
    color: clubColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  menuLabelGenericActive: {
    color: clubColors.skyPrimary,
    fontWeight: '900',
  },
  subItemsGenericContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    paddingVertical: 8,
  },
  subItemGeneric: {
    paddingVertical: 16,
    paddingLeft: 68,
  },
  subItemGenericLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 15,
    fontWeight: '500',
  },
});
