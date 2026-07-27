import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, TextInput, FlatList, Modal, Platform } from 'react-native';
import { colors, spacing } from '../../src/utils/theme';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { AnimatedCard as Card } from '../../src/components/ui/AnimatedCard';
import { ActionBtn } from '../../src/components/ui/ActionBtn';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { CoachBadge } from '../../src/components/ui/CoachBadge';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { OFFICIAL_CATEGORIES, OFFICIAL_TEAMS_MAP } from '../../src/constants/teams';

// Imports añadidos para Coordinador
import { TEAMS, TEAM_ASSIGNMENTS } from '../../src/data/clubData';
import { TEAMS_FUTSAL, TEAM_ASSIGNMENTS_FUTSAL } from '../../src/data/clubDataFutbolSala';
import { TEAMS_BASKET, TEAM_ASSIGNMENTS_BASKET } from '../../src/data/clubDataBaloncesto';
import { useRole } from '../../src/context/RoleContext';
import { useSport } from '../../src/context/SportContext';

const { width } = Dimensions.get('window');

type ViewLevel = 'CATEGORIAS' | 'EQUIPOS' | 'PLANTILLA' | 'JUGADOR';

// Mocks
const categorias = OFFICIAL_CATEGORIES;


function LegacyEquiposView() {
  const [level, setLevel] = useState<ViewLevel>('CATEGORIAS');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);

  const goBack = () => {
    if (level === 'JUGADOR') setLevel('PLANTILLA');
    else if (level === 'PLANTILLA') setLevel('EQUIPOS');
    else if (level === 'EQUIPOS') setLevel('CATEGORIAS');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Disponible': return colors.success;
      case 'Lesionado': return '#1F2937';
      case 'Sancionado': return '#F3F4F6';
      case 'Baja': return colors.danger;
      default: return colors.muted;
    }
  };

  const renderHeaderRow = (title: string, subtitle: string) => (
    <View style={styles.navHeader}>
      <TouchableOpacity onPress={goBack} style={styles.backBtn}>
        <FontAwesome name="chevron-left" size={16} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.navTitleBox}>
        <Text style={styles.navTitle}>{title}</Text>
        <Text style={styles.navSub}>{subtitle}</Text>
      </View>
    </View>
  );

  // LEVEL 0: CATEGORIAS
  const renderCategorias = () => (
    <View>
      <PremiumHeader title="CLUB" subtitle="CATEGORÍAS" showSearchAndActions={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          {categorias.map((cat, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.gridCard}
              onPress={() => { setSelectedCat(cat); setLevel('EQUIPOS'); }}
            >
              <LinearGradient colors={['rgba(255,255,255,0.05)', 'rgba(85,199,243,0.1)']} style={StyleSheet.absoluteFillObject} />
              <FontAwesome name="shield" size={40} color={colors.sky} style={{marginBottom: 12}} />
              <Text style={styles.gridCardTitle}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  // LEVEL 1: EQUIPOS
  const renderEquipos = () => (
    <View>
      {renderHeaderRow('Categoría', selectedCat)}
      <ScrollView contentContainerStyle={styles.content}>
        {(OFFICIAL_TEAMS_MAP[selectedCat] || []).map((eq, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.listCard}
            onPress={() => { setSelectedTeam(eq); setLevel('PLANTILLA'); }}
          >
            <View style={styles.listCardIconBg}>
              <FontAwesome name="users" size={24} color={colors.sky} />
            </View>
            <View style={{flex: 1, marginLeft: spacing.m}}>
              <Text style={styles.listCardTitle}>{eq}</Text>
              <Text style={styles.listCardSub}>Liga Preferente G2</Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.muted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // LEVEL 2: PLANTILLA
  const renderPlantilla = () => (
    <View>
      {renderHeaderRow('Equipo', selectedTeam)}
      
      <View style={styles.teamHero}>
         <LinearGradient colors={['rgba(85,199,243,0.15)', 'transparent']} style={StyleSheet.absoluteFillObject} />
         <FontAwesome name="shield" size={100} color="rgba(255,255,255,0.05)" style={styles.teamHeroWatermark} />
         <View style={styles.teamHeroBadge}>
           <Text style={styles.teamHeroBadgeText}>LIGA PREFERENTE (3º)</Text>
         </View>
         <Text style={styles.teamHeroTitle}>{selectedTeam}</Text>
         <View style={{flexDirection: 'row', marginTop: 12, gap: 16}}>
           <View style={{alignItems: 'center'}}><Text style={styles.teamHeroNum}>18</Text><Text style={styles.teamHeroLbl}>JUGADORES</Text></View>
           <View style={{alignItems: 'center'}}><Text style={styles.teamHeroNum}>2</Text><Text style={styles.teamHeroLbl}>CUERPO TÉC.</Text></View>
         </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Jugadores</Text>
        {(sport === 'baloncesto' ? TEAM_ASSIGNMENTS_BASKET : TEAM_ASSIGNMENTS).getPlayersByTeam(selectedTeam).map((player: any) => (
          <TouchableOpacity 
            key={player.id} 
            style={styles.playerItemCard}
            onPress={() => { setSelectedPlayer(player); setLevel('JUGADOR'); }}
          >
            <View style={[styles.playerStatusStrip, {backgroundColor: getStatusColor('Disponible')}]} />
            
            <View style={styles.playerNumBox}>
              <Text style={styles.playerNumBoxText}>{(player.dorsal || '-')}</Text>
            </View>
            
            <View style={styles.playerAvatarSmall}>
              <FontAwesome name="user" size={16} color={colors.white} />
            </View>
            
            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={styles.playerItemName}>{player.nombreCompleto}</Text>
              <Text style={styles.playerItemPos}>{(player.posicion || 'JUG')}</Text>
            </View>

            <View style={[styles.playerBadge, {backgroundColor: getStatusColor('Disponible')}]}>
               <Text style={[styles.playerBadgeText, {color: false ? '#000' : colors.white}]}>
                 {'DISPONIBLE'}
               </Text>
            </View>

          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // LEVEL 3: JUGADOR (Ultimate Profile)
  const renderJugador = () => {
    if (!selectedPlayer) return null;
    const statColor = getStatusColor(selectedPlayer.status);
    const darkText = selectedPlayer.status === 'Sancionado';

    return (
      <View style={{flex: 1}}>
        {renderHeaderRow('Ficha de Jugador', selectedPlayer.name)}
        <ScrollView contentContainerStyle={[styles.content, {paddingTop: 0}]} showsVerticalScrollIndicator={false}>
          
          {/* HERO PROFILE */}
          <View style={styles.profileHero}>
            <LinearGradient colors={['rgba(85,199,243,0.2)', 'rgba(2,8,20,1)']} style={StyleSheet.absoluteFillObject} />
            <FontAwesome name="shield" size={160} color="rgba(255,255,255,0.03)" style={{position: 'absolute', top: 20, right: -20}} />
            
            <View style={styles.profileTopRow}>
              <View style={styles.profileAvatarBig}>
                <FontAwesome name="user" size={60} color={colors.white} />
              </View>
              <Text style={styles.profileBigNum}>{selectedPlayer.num}</Text>
            </View>

            <Text style={styles.profileName}>{selectedPlayer.name}</Text>
            
            <View style={styles.profileTagRow}>
               <View style={[styles.profileTag, {backgroundColor: statColor}]}>
                 <Text style={[styles.profileTagText, {color: darkText ? '#000' : colors.white}]}>{selectedPlayer.status.toUpperCase()}</Text>
               </View>
               <View style={styles.profileTag}>
                 <Text style={styles.profileTagText}>{selectedPlayer.pos} / {selectedTeam.toUpperCase()}</Text>
               </View>
            </View>
          </View>

          {/* BIO & FÍSICO */}
          <Text style={styles.sectionTitle}>Perfil Físico</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statSquare}><Text style={styles.statSquareVal}>15</Text><Text style={styles.statSquareLbl}>AÑOS</Text></View>
            <View style={styles.statSquare}><Text style={styles.statSquareVal}>1.78</Text><Text style={styles.statSquareLbl}>ALTURA</Text></View>
            <View style={styles.statSquare}><Text style={styles.statSquareVal}>68k</Text><Text style={styles.statSquareLbl}>PESO</Text></View>
            <View style={styles.statSquare}><Text style={styles.statSquareVal}>DIE</Text><Text style={styles.statSquareLbl}>PIERNA</Text></View>
          </View>

          {/* DEPORTIVO */}
          <Text style={styles.sectionTitle}>Datos Administrativos</Text>
          <Card style={styles.infoCard}>
             <View style={styles.infoRow}><Text style={styles.infoLbl}>F. Nacimiento:</Text><Text style={styles.infoVal}>12/05/2011</Text></View>
             <View style={styles.infoRow}><Text style={styles.infoLbl}>Licencia:</Text><Text style={styles.infoVal}>12345678-F</Text></View>
             <View style={styles.infoRow}><Text style={styles.infoLbl}>Entrenador:</Text><Text style={styles.infoVal}>Paco M.</Text></View>
             <View style={styles.infoRow}><Text style={styles.infoLbl}>Incorporación:</Text><Text style={styles.infoVal}>01/09/2023</Text></View>
          </Card>

          {/* ESTADÍSTICAS */}
          <Text style={styles.sectionTitle}>Estadísticas Temporada</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statSquare, {borderColor: 'rgba(85,199,243,0.3)'}]}>
              <Text style={styles.statSquareVal}>12</Text><Text style={styles.statSquareLbl}>PARTIDOS</Text>
            </View>
            <View style={[styles.statSquare, {borderColor: 'rgba(85,199,243,0.3)'}]}>
              <Text style={styles.statSquareVal}>10</Text><Text style={styles.statSquareLbl}>TITULAR</Text>
            </View>
            <View style={[styles.statSquare, {borderColor: 'rgba(34,197,94,0.3)'}]}>
              <Text style={[styles.statSquareVal, {color: colors.success}]}>4</Text><Text style={styles.statSquareLbl}>GOLES</Text>
            </View>
            <View style={[styles.statSquare, {borderColor: 'rgba(34,197,94,0.3)'}]}>
              <Text style={[styles.statSquareVal, {color: colors.success}]}>2</Text><Text style={styles.statSquareLbl}>ASIST.</Text>
            </View>
          </View>
          <View style={[styles.statsGrid, {marginTop: spacing.s}]}>
            <View style={[styles.statSquare, {borderColor: 'rgba(245,158,11,0.3)'}]}>
              <Text style={[styles.statSquareVal, {color: colors.warning}]}>1</Text><Text style={styles.statSquareLbl}>T. AMARILLAS</Text>
            </View>
            <View style={[styles.statSquare, {borderColor: 'rgba(239,68,68,0.3)'}]}>
              <Text style={[styles.statSquareVal, {color: colors.danger}]}>0</Text><Text style={styles.statSquareLbl}>T. ROJAS</Text>
            </View>
          </View>

          {/* ASISTENCIA Y RENDIMIENTO */}
          <Text style={styles.sectionTitle}>Rendimiento</Text>
          <Card style={styles.infoCard}>
             <View style={{marginBottom: spacing.m}}>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
                 <Text style={styles.infoLbl}>Asistencia a Entrenamientos</Text>
                 <Text style={styles.infoVal}>95%</Text>
               </View>
               <ProgressBar progress={0.95} color={colors.sky} height={8} />
             </View>
             
             <View>
               <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4}}>
                 <Text style={styles.infoLbl}>Minutos Jugados (Obj: 75%)</Text>
                 <Text style={styles.infoVal}>82%</Text>
               </View>
               <ProgressBar progress={0.82} color={colors.success} height={8} />
             </View>
          </Card>

          {/* GRÁFICA SIMULADA */}
          <Text style={styles.sectionTitle}>Evolución (Últimos 5 Partidos)</Text>
          <Card style={styles.graphCard}>
             <View style={styles.barGraphRow}>
               <View style={styles.barCol}><View style={[styles.bar, {height: '100%'}]} /><Text style={styles.barLbl}>J1</Text></View>
               <View style={styles.barCol}><View style={[styles.bar, {height: '80%'}]} /><Text style={styles.barLbl}>J2</Text></View>
               <View style={styles.barCol}><View style={[styles.bar, {height: '90%'}]} /><Text style={styles.barLbl}>J3</Text></View>
               <View style={styles.barCol}><View style={[styles.bar, {height: '100%'}]} /><Text style={styles.barLbl}>J4</Text></View>
               <View style={styles.barCol}><View style={[styles.bar, {height: '100%', backgroundColor: colors.sky}]} /><Text style={styles.barLbl}>J5</Text></View>
             </View>
          </Card>

          {/* HISTORIAL RECIENTE */}
          <Text style={styles.sectionTitle}>Últimos Partidos</Text>
          <Card style={styles.historyCard}>
             <View style={styles.historyRow}>
                <View style={styles.historyDot} />
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.historyMatch}>vs Villarreal CF (2-1)</Text>
                  <Text style={styles.historyDetails}>Titular • 90 mins • 1 Gol</Text>
                </View>
             </View>
             <View style={styles.historyLine} />
             <View style={styles.historyRow}>
                <View style={styles.historyDot} />
                <View style={{flex: 1, marginLeft: 12}}>
                  <Text style={styles.historyMatch}>vs Levante UD (0-0)</Text>
                  <Text style={styles.historyDetails}>Titular • 85 mins</Text>
                </View>
             </View>
          </Card>

          {/* ACCIONES */}
          <Text style={styles.sectionTitle}>Acciones</Text>
          <View style={styles.actionsGrid}>
             <ActionBtn label="EDITAR FICHA" icon="pencil" variant="outline" style={{marginBottom: spacing.s}} />
             <ActionBtn label="INFORME PDF" icon="file-pdf-o" variant="primary" style={{marginBottom: spacing.s}} />
             
             <View style={{flexDirection: 'row', gap: spacing.s}}>
               <TouchableOpacity style={styles.contactBtnWa}>
                  <FontAwesome name="whatsapp" size={24} color={colors.white} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.contactBtnMail}>
                  <FontAwesome name="envelope" size={24} color={colors.white} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.contactBtnPhone}>
                  <FontAwesome name="phone" size={24} color={colors.white} />
               </TouchableOpacity>
             </View>
          </View>

        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {level === 'CATEGORIAS' && renderCategorias()}
      {level === 'EQUIPOS' && renderEquipos()}
      {level === 'PLANTILLA' && renderPlantilla()}
      {level === 'JUGADOR' && renderJugador()}
    </View>
  );
}

function CoordinadorEquiposView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const filters = ['Todos', 'Fútbol 11', 'Fútbol 8', 'Femenino', 'Juvenil', 'Cadete', 'Infantil', 'Alevín', 'Benjamín', 'Prebenjamín', 'Querubín'];

  // Procesar lista desde clubData.ts
  const processedTeams = React.useMemo(() => {
    return currentTeams.map(team => {
      const isFem = team.name.toLowerCase().includes('femenino');
      const group = isFem ? 'Femenino' : (team.modality === 'F11' ? 'Fútbol 11' : 'Fútbol 8');
      
      const players = (sport === 'baloncesto' ? TEAM_ASSIGNMENTS_BASKET : TEAM_ASSIGNMENTS).getPlayersByTeam(team.name);
      const count = players.length;
      
      let status = 'Activo';
      if (count === 0) status = 'Pendiente jugadores';
      else if (!team.primerEntrenador) status = 'Pendiente entrenador';
      
      return {
        ...team,
        group,
        count,
        status
      };
    });
  }, []);

  const KPIs = {
    total: processedTeams.length,
    f11: processedTeams.filter(t => t.modality === 'F11' && !t.name.toLowerCase().includes('femenino')).length,
    f8: processedTeams.filter(t => t.modality === 'F8' && !t.name.toLowerCase().includes('femenino')).length,
    fem: processedTeams.filter(t => t.name.toLowerCase().includes('femenino')).length,
  };

  const filteredTeams = React.useMemo(() => {
    return processedTeams.filter(t => {
      const q = searchQuery.toLowerCase();
      const matchSearch = q === '' || 
        t.name.toLowerCase().includes(q) || 
        t.category.toLowerCase().includes(q) || 
        t.modality.toLowerCase().includes(q);

      let matchFilter = true;
      if (selectedFilter !== 'Todos') {
        if (selectedFilter === 'Fútbol 11') matchFilter = t.group === 'Fútbol 11';
        else if (selectedFilter === 'Fútbol 8') matchFilter = t.group === 'Fútbol 8';
        else if (selectedFilter === 'Femenino') matchFilter = t.group === 'Femenino';
        else matchFilter = t.category === selectedFilter;
      }

      return matchSearch && matchFilter;
    });
  }, [processedTeams, searchQuery, selectedFilter]);

  const renderTeamCard = ({ item }: { item: any }) => {
    let statusColor = colors.muted;
    if (item.status === 'Activo') statusColor = '#4ADE80';
    if (item.status === 'Pendiente entrenador') statusColor = '#F87171';
    if (item.status === 'Pendiente jugadores') statusColor = '#FBBF24';

    return (
      <TouchableOpacity style={styles.coordTeamCard} onPress={() => setSelectedTeam(item)}>
        <View style={styles.coordCardLeft}>
          <Text style={styles.coordTeamName}>{item.name}</Text>
          <Text style={styles.coordTeamSub}>{item.modality} • {item.category}</Text>
        </View>
        <View style={styles.coordCardMid}>
          <Text style={styles.coordTeamVal}>{item.count === 0 ? '---' : item.count}</Text>
          <Text style={styles.coordTeamLbl}>JUGADORES</Text>
        </View>
        <View style={styles.coordCardRight}>
          <View style={[styles.coordStatusDot, { backgroundColor: statusColor }]} />
          <FontAwesome name="chevron-right" size={12} color="rgba(255,255,255,0.2)" style={{marginLeft: 8}}/>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.coordContainer}>
      <PremiumHeader 
        title="EQUIPOS" 
        subtitle="ESTRUCTURA DEPORTIVA CD JESUITAS" 
        showAvatar={false}
      />
      
      {/* KPIs */}
      <View style={styles.coordKpiRow}>
        <View style={styles.coordKpiBox}>
          <Text style={styles.coordKpiVal}>{KPIs.total}</Text>
          <Text style={styles.coordKpiLbl}>TOTAL</Text>
        </View>
        <View style={styles.coordKpiBox}>
          <Text style={styles.coordKpiVal}>{KPIs.f11}</Text>
          <Text style={styles.coordKpiLbl}>FÚTBOL 11</Text>
        </View>
        <View style={styles.coordKpiBox}>
          <Text style={styles.coordKpiVal}>{KPIs.f8}</Text>
          <Text style={styles.coordKpiLbl}>FÚTBOL 8</Text>
        </View>
        <View style={styles.coordKpiBox}>
          <Text style={styles.coordKpiVal}>{KPIs.fem}</Text>
          <Text style={styles.coordKpiLbl}>FEMENINO</Text>
        </View>
      </View>

      <View style={styles.coordFiltersArea}>
        <View style={styles.coordSearchBox}>
          <FontAwesome name="search" size={14} color="rgba(255,255,255,0.4)" style={{marginRight: 8}} />
          <TextInput 
            style={styles.coordSearchInput}
            placeholder="Buscar equipo..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.coordPillScroll} contentContainerStyle={{paddingRight: spacing.m}}>
          {filters.map(f => (
            <TouchableOpacity 
              key={f} 
              style={[styles.coordPill, selectedFilter === f && styles.coordPillActive]}
              onPress={() => setSelectedFilter(f)}
            >
              <Text style={[styles.coordPillText, selectedFilter === f && styles.coordPillTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList 
        data={filteredTeams}
        keyExtractor={item => item.name}
        renderItem={renderTeamCard}
        contentContainerStyle={{padding: spacing.m, paddingBottom: 100}}
      />

      {/* Modal Detalles */}
      <Modal visible={!!selectedTeam} animationType="slide" transparent={true} onRequestClose={() => setSelectedTeam(null)}>
        {selectedTeam && (
          <View style={styles.coordModalOverlay}>
            <View style={styles.coordModalContent}>
              <TouchableOpacity style={styles.coordModalClose} onPress={() => setSelectedTeam(null)}>
                <FontAwesome name="times" size={24} color={colors.white} />
              </TouchableOpacity>
              
              <View style={styles.coordModalHero}>
                <FontAwesome name="shield" size={60} color="rgba(85,199,243,0.1)" style={{marginBottom: spacing.m}} />
                <Text style={styles.coordModalTitle}>{selectedTeam.name}</Text>
                <Text style={styles.coordModalSub}>{selectedTeam.modality} • {selectedTeam.category}</Text>
                <View style={[styles.coordModalBadge, { backgroundColor: selectedTeam.status === 'Activo' ? '#4ADE80' : (selectedTeam.status === 'Pendiente entrenador' ? '#F87171' : '#FBBF24') }]}>
                  <Text style={styles.coordModalBadgeText}>{selectedTeam.status === 'Pendiente jugadores' ? 'PENDIENTE DE IMPORTAR JUGADORES' : (selectedTeam.status === 'Pendiente entrenador' ? 'PENDIENTE DE ENTRENADOR' : `EQUIPO ACTIVO (${selectedTeam.count} jug.)`)}</Text>
                </View>
              </View>

              <ScrollView style={{flex:1, paddingHorizontal: spacing.l}} showsVerticalScrollIndicator={false}>
                <Text style={styles.coordSectionTitle}>Cuerpo Técnico</Text>
                <View style={styles.coordInfoCard}>
                  <View style={[styles.coordInfoRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 6, paddingVertical: 12 }]}>
                    <Text style={styles.coordInfoVal}>{selectedTeam.primerEntrenador?.nombre || 'Pendiente'}</Text>
                    <CoachBadge type={selectedTeam.primerEntrenador ? 'principal' : 'pendiente'} />
                  </View>
                  <View style={[styles.coordInfoRow, { flexDirection: 'column', alignItems: 'flex-start', gap: 6, paddingVertical: 12 }]}>
                    <Text style={styles.coordInfoVal}>{selectedTeam.segundoEntrenador?.nombre || 'Pendiente'}</Text>
                    <CoachBadge type={selectedTeam.segundoEntrenador ? 'segundo' : 'pendiente'} />
                  </View>
                  <View style={styles.coordInfoRow}><Text style={styles.coordInfoLbl}>Delegado</Text><Text style={styles.coordInfoVal}>-</Text></View>
                </View>

                <Text style={styles.coordSectionTitle}>Gestión Deportiva</Text>
                <View style={styles.coordInfoCard}>
                  <View style={styles.coordInfoRow}><Text style={styles.coordInfoLbl}>Plantilla</Text><Text style={styles.coordInfoVal}>{selectedTeam.count} jugadores</Text></View>
                  <View style={styles.coordInfoRow}><Text style={styles.coordInfoLbl}>Próximo Partido</Text><Text style={styles.coordInfoVal}>Sin programar</Text></View>
                  <View style={styles.coordInfoRow}><Text style={styles.coordInfoLbl}>Horario Entrenamientos</Text><Text style={styles.coordInfoVal}>Por definir</Text></View>
                </View>

                <Text style={styles.coordSectionTitle}>Accesos Directos</Text>
                <View style={styles.coordGridActions}>
                  <View style={styles.coordActionBox}><FontAwesome name="list-ul" size={20} color={colors.sky} style={{marginBottom: 8}}/><Text style={styles.coordActionText}>Convocatorias</Text></View>
                  <View style={styles.coordActionBox}><FontAwesome name="check-square-o" size={20} color={colors.sky} style={{marginBottom: 8}}/><Text style={styles.coordActionText}>Asistencia</Text></View>
                  <View style={styles.coordActionBox}><FontAwesome name="bar-chart" size={20} color={colors.sky} style={{marginBottom: 8}}/><Text style={styles.coordActionText}>Estadísticas</Text></View>
                  <View style={styles.coordActionBox}><FontAwesome name="file-pdf-o" size={20} color={colors.sky} style={{marginBottom: 8}}/><Text style={styles.coordActionText}>Informes</Text></View>
                </View>
                
                <View style={{height: 40}} />
              </ScrollView>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}

export default function EquiposScreen() {
  const { sport } = useSport();
  const { role } = useRole();
  if (role === 'coordinador') {
    return <CoordinadorEquiposView />;
  }
  return <LegacyEquiposView />;
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'transparent' },
  content: { padding: spacing.l, paddingBottom: spacing.xxl },
  
  navHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.l, paddingTop: 60, paddingBottom: spacing.m, backgroundColor: 'rgba(2,8,20,0.9)' },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  navTitleBox: { marginLeft: spacing.m },
  navTitle: { color: colors.white, fontSize: 18, fontWeight: '900' },
  navSub: { color: colors.sky, fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.m, justifyContent: 'space-between' },
  gridCard: { width: '47%', aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 24, padding: spacing.l, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  gridCardTitle: { color: colors.white, fontSize: 16, fontWeight: '900' },

  listCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: spacing.m, marginBottom: spacing.m },
  listCardIconBg: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(85,199,243,0.1)', justifyContent: 'center', alignItems: 'center' },
  listCardTitle: { color: colors.white, fontSize: 18, fontWeight: '900' },
  listCardSub: { color: colors.muted, fontSize: 12, fontWeight: '700', marginTop: 2 },

  teamHero: { padding: spacing.xl, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  teamHeroWatermark: { position: 'absolute', bottom: -30, right: -20 },
  teamHeroBadge: { backgroundColor: colors.sky, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start', marginBottom: 12 },
  teamHeroBadgeText: { color: '#041026', fontSize: 10, fontWeight: '900' },
  teamHeroTitle: { color: colors.white, fontSize: 36, fontWeight: '900', letterSpacing: -1 },
  teamHeroNum: { color: colors.white, fontSize: 24, fontWeight: '900' },
  teamHeroLbl: { color: colors.muted, fontSize: 10, fontWeight: '800' },

  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', textTransform: 'uppercase', marginBottom: spacing.m, marginTop: spacing.m },
  
  playerItemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: spacing.m, marginBottom: spacing.s, overflow: 'hidden' },
  playerStatusStrip: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  playerNumBox: { width: 32, alignItems: 'center' },
  playerNumBoxText: { color: colors.sky, fontSize: 18, fontWeight: '900', fontStyle: 'italic' },
  playerAvatarSmall: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  playerItemName: { color: colors.white, fontSize: 15, fontWeight: '800' },
  playerItemPos: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  playerBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  playerBadgeText: { fontSize: 10, fontWeight: '900' },

  profileHero: { paddingHorizontal: spacing.l, paddingTop: spacing.xl, paddingBottom: spacing.xxl, marginBottom: spacing.m, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)', overflow: 'hidden' },
  profileTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  profileAvatarBig: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.sky },
  profileBigNum: { color: 'rgba(255,255,255,0.2)', fontSize: 80, fontWeight: '900', fontStyle: 'italic', marginTop: -20, marginRight: -10 },
  profileName: { color: colors.white, fontSize: 32, fontWeight: '900', letterSpacing: -1, marginTop: spacing.l },
  profileTagRow: { flexDirection: 'row', gap: 8, marginTop: spacing.m },
  profileTag: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  profileTagText: { color: colors.white, fontSize: 11, fontWeight: '800', letterSpacing: 1 },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s },
  statSquare: { width: '23%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 16, paddingVertical: spacing.m, alignItems: 'center' },
  statSquareVal: { color: colors.white, fontSize: 22, fontWeight: '900' },
  statSquareLbl: { color: colors.muted, fontSize: 9, fontWeight: '800', marginTop: 4, textAlign: 'center' },

  infoCard: { padding: spacing.l, marginBottom: spacing.l },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  infoLbl: { color: colors.muted, fontSize: 14, fontWeight: '700' },
  infoVal: { color: colors.white, fontSize: 14, fontWeight: '800' },

  graphCard: { padding: spacing.xl, marginBottom: spacing.l, height: 160 },
  barGraphRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', flex: 1 },
  barCol: { alignItems: 'center', height: '100%', justifyContent: 'flex-end', width: 30 },
  bar: { width: 12, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 6, marginBottom: 8 },
  barLbl: { color: colors.muted, fontSize: 10, fontWeight: '800' },

  historyCard: { padding: spacing.l, marginBottom: spacing.l },
  historyRow: { flexDirection: 'row', alignItems: 'center' },
  historyDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.success },
  historyMatch: { color: colors.white, fontSize: 14, fontWeight: '800' },
  historyDetails: { color: colors.muted, fontSize: 12, fontWeight: '600', marginTop: 2 },
  historyLine: { height: 20, width: 2, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 5, marginVertical: 4 },

  actionsGrid: { marginBottom: spacing.xxl },
  contactBtnWa: { flex: 1, backgroundColor: '#25D366', height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  contactBtnMail: { flex: 1, backgroundColor: '#EA4335', height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  contactBtnPhone: { flex: 1, backgroundColor: colors.sky, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },

  // Coordinador Styles
  coordContainer: { flex: 1, backgroundColor: colors.background },
  coordKpiRow: { flexDirection: 'row', backgroundColor: 'rgba(4,16,38,0.9)', paddingHorizontal: spacing.m, paddingVertical: spacing.s, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  coordKpiBox: { flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: 'rgba(255,255,255,0.05)' },
  coordKpiVal: { color: colors.white, fontSize: 16, fontWeight: '900' },
  coordKpiLbl: { color: colors.sky, fontSize: 9, fontWeight: '800', marginTop: 2, textAlign: 'center' },
  
  coordFiltersArea: { paddingHorizontal: spacing.m, paddingTop: spacing.m, backgroundColor: 'rgba(4,16,38,0.95)' },
  coordSearchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 10, paddingHorizontal: spacing.m, height: 40, marginBottom: spacing.m, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  coordSearchInput: { flex: 1, color: colors.white, fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto' },
  
  coordPillScroll: { marginBottom: spacing.s },
  coordPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', marginRight: spacing.s, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  coordPillActive: { backgroundColor: colors.sky, borderColor: colors.sky },
  coordPillText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '700' },
  coordPillTextActive: { color: colors.navy, fontWeight: '900' },

  coordTeamCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: spacing.m, marginBottom: spacing.s, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  coordCardLeft: { flex: 2 },
  coordTeamName: { color: colors.white, fontSize: 15, fontWeight: '900' },
  coordTeamSub: { color: colors.muted, fontSize: 11, fontWeight: '700', marginTop: 2 },
  coordCardMid: { flex: 1, alignItems: 'flex-end', paddingRight: spacing.m },
  coordTeamVal: { color: colors.white, fontSize: 14, fontWeight: '800' },
  coordTeamLbl: { color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: '700', marginTop: 2 },
  coordCardRight: { flexDirection: 'row', alignItems: 'center' },
  coordStatusDot: { width: 10, height: 10, borderRadius: 5 },

  coordModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  coordModalContent: { backgroundColor: '#071A3D', borderTopLeftRadius: 32, borderTopRightRadius: 32, height: '90%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderBottomWidth: 0 },
  coordModalClose: { position: 'absolute', top: 20, right: 20, zIndex: 10, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  coordModalHero: { alignItems: 'center', paddingTop: 40, paddingBottom: spacing.l, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  coordModalTitle: { color: colors.white, fontSize: 24, fontWeight: '900' },
  coordModalSub: { color: colors.muted, fontSize: 14, fontWeight: '700', marginTop: 4 },
  coordModalBadge: { marginTop: 16, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  coordModalBadgeText: { color: '#000', fontSize: 10, fontWeight: '900' },

  coordSectionTitle: { color: colors.sky, fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1, marginTop: spacing.xl, marginBottom: spacing.m },
  coordInfoCard: { backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: spacing.m, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  coordInfoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  coordInfoLbl: { color: colors.muted, fontSize: 13, fontWeight: '700' },
  coordInfoVal: { color: colors.white, fontSize: 13, fontWeight: '600' },
  
  coordGridActions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s },
  coordActionBox: { width: '48%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: spacing.m, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  coordActionText: { color: colors.white, fontSize: 11, fontWeight: '700' }
});
