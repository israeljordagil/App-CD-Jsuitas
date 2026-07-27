import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { colors, spacing } from '../../src/utils/theme';
import { PremiumHeader } from '../../src/components/ui/PremiumHeader';
import { AnimatedCard as Card } from '../../src/components/ui/AnimatedCard';
import { ActionBtn } from '../../src/components/ui/ActionBtn';
import { TEAM_ASSIGNMENTS } from '../../src/data/clubData';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSport } from '../../src/context/SportContext';
import { getSportConfig } from '../../src/utils/sportConfig';

type MatchState = 'No iniciado' | 'En juego' | 'Descanso' | 'Finalizado';

export default function LiveMatchScreen() {
  const { sport } = useSport();
  const config = getSportConfig(sport);

    
  
  const PLAYERS = TEAM_ASSIGNMENTS.getPlayersByTeam('Cadete A').slice(0, 5).map((p: any, i: number) => ({
    id: p.id,
    name: p.nombreCompleto || p.nombre,
    num: p.dorsal || i+1,
    pos: p.posicion || 'JUG'
  }));
  const [matchState, setMatchState] = useState<MatchState>('En juego');
  const [minute, setMinute] = useState('34');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');

  const openEventModal = (event: string) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleStateChange = (newState: MatchState) => {
    setMatchState(newState);
  };

  const renderHeader = () => (
    <View style={styles.scoreboard}>
      <LinearGradient colors={['rgba(255,255,255,0.0)', 'rgba(85,199,243,0.05)']} style={StyleSheet.absoluteFillObject} />
      
      <View style={styles.scoreTopRow}>
        <View style={styles.matchBadge}>
          <Text style={styles.matchBadgeText}>LIGA PREFERENTE</Text>
        </View>
        <Text style={styles.matchCategory}>`Cadete A • Jesuitas ${config.name}`</Text>
      </View>

      <View style={styles.scoreCenterRow}>
        <View style={styles.teamCol}>
          <View style={styles.teamLogoBg}>
             <FontAwesome name="shield" size={40} color={colors.sky} />
          </View>
          <Text style={styles.teamName}>CD Jesuitas</Text>
        </View>

        <View style={styles.scoreCenterInfo}>
          <View style={styles.scoreNumbersRow}>
            <Text style={styles.scoreNum}>2</Text>
            <Text style={styles.scoreDash}>-</Text>
            <Text style={styles.scoreNum}>1</Text>
          </View>
          
          <View style={styles.minuteBox}>
            <Text style={styles.minuteText}>
               {matchState === 'No iniciado' ? '00:00' : matchState === 'Finalizado' ? 'FT' : `${minute}'`}
            </Text>
            {matchState === 'En juego' && <View style={styles.liveDot} />}
          </View>
          <Text style={[styles.stateText, matchState === 'Finalizado' && {color: colors.muted}]}>
            {matchState.toUpperCase()}
          </Text>
        </View>

        <View style={styles.teamCol}>
          <View style={styles.teamLogoBg}>
             <FontAwesome name="shield" size={40} color={colors.white} />
          </View>
          <Text style={styles.teamName}>Villarreal CF</Text>
        </View>
      </View>
    </View>
  );

  const renderControls = () => {
    if (matchState === 'Finalizado') return null;

    return (
      <View style={styles.controlsRow}>
        {matchState === 'No iniciado' && (
           <ActionBtn label="INICIAR PARTIDO" icon="play" variant="primary" style={{flex: 1}} onPress={() => handleStateChange('En juego')} />
        )}
        {matchState === 'En juego' && (
           <>
             <TouchableOpacity style={styles.ctrlBtnRed} onPress={() => handleStateChange('Descanso')}>
                <FontAwesome name="pause" size={14} color={colors.white} style={{marginRight: 6}} />
                <Text style={styles.ctrlBtnText}>DESCANSO</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.ctrlBtnRed} onPress={() => handleStateChange('Finalizado')}>
                <FontAwesome name="stop" size={14} color={colors.white} style={{marginRight: 6}} />
                <Text style={styles.ctrlBtnText}>FINALIZAR</Text>
             </TouchableOpacity>
           </>
        )}
        {matchState === 'Descanso' && (
           <ActionBtn label="REANUDAR 2ª P." icon="play" variant="primary" style={{flex: 1}} onPress={() => handleStateChange('En juego')} />
        )}
      </View>
    );
  };

  const renderEventButtons = () => {
    if (matchState === 'Finalizado' || matchState === 'No iniciado') return null;

    return (
      <View style={styles.eventGrid}>
        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('Anotación')}>
           <View style={[styles.eventIconBg, {backgroundColor: 'rgba(34,197,94,0.15)'}]}>
             <FontAwesome name="soccer-ball-o" size={24} color={colors.success} />
           </View>
           <Text style={styles.eventBtnText}>Anotación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('Cambio')}>
           <View style={[styles.eventIconBg, {backgroundColor: `${config.color}30`}]}>
             <FontAwesome name="exchange" size={24} color={colors.sky} />
           </View>
           <Text style={styles.eventBtnText}>Cambio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('T. Amarilla')}>
           <View style={[styles.eventIconBg, {backgroundColor: 'rgba(245, 158, 11, 0.15)'}]}>
             <View style={[styles.cardIcon, {backgroundColor: colors.warning}]} />
           </View>
           <Text style={styles.eventBtnText}>T. Amarilla</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('T. Roja')}>
           <View style={[styles.eventIconBg, {backgroundColor: 'rgba(239, 68, 68, 0.15)'}]}>
             <View style={[styles.cardIcon, {backgroundColor: colors.danger}]} />
           </View>
           <Text style={styles.eventBtnText}>T. Roja</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('Lesión')}>
           <View style={[styles.eventIconBg, {backgroundColor: 'rgba(239, 68, 68, 0.15)'}]}>
             <FontAwesome name="medkit" size={24} color={colors.danger} />
           </View>
           <Text style={styles.eventBtnText}>Lesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eventBtn} onPress={() => openEventModal('Incidencia')}>
           <View style={[styles.eventIconBg, {backgroundColor: 'rgba(255,255,255,0.1)'}]}>
             <FontAwesome name="warning" size={24} color={colors.white} />
           </View>
           <Text style={styles.eventBtnText}>Incidencia</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTimeline = () => {
    if (matchState === 'No iniciado') return null;

    return (
      <View style={{marginTop: spacing.l}}>
        <Text style={styles.sectionTitle}>Timeline del Partido</Text>
        <Card delay={300} style={styles.timelineCard}>
           
           <View style={styles.timelineItem}>
             <Text style={styles.tlMin}>34'</Text>
             <View style={[styles.tlIcon, {backgroundColor: 'rgba(34,197,94,0.1)'}]}>
               <FontAwesome name="soccer-ball-o" size={14} color={colors.success} />
             </View>
             <View style={styles.tlContent}>
               <Text style={styles.tlTitle}>Anotación (CD Jesuitas)</Text>
               <Text style={styles.tlSub}>{PLAYERS[1]?.name || 'Jugador 2'}. Asistencia: Marcos.</Text>
             </View>
           </View>
           
           <View style={styles.timelineLine} />

           <View style={styles.timelineItem}>
             <Text style={styles.tlMin}>22'</Text>
             <View style={[styles.tlIcon, {backgroundColor: 'rgba(245,158,11,0.1)'}]}>
               <View style={[styles.cardIconSmall, {backgroundColor: colors.warning}]} />
             </View>
             <View style={styles.tlContent}>
               <Text style={styles.tlTitle}>T. Amarilla (CD Jesuitas)</Text>
               <Text style={styles.tlSub}>Lucas Pérez (Falta táctica)</Text>
             </View>
           </View>

           <View style={styles.timelineLine} />

           <View style={styles.timelineItem}>
             <Text style={styles.tlMin}>12'</Text>
             <View style={[styles.tlIcon, {backgroundColor: 'rgba(34,197,94,0.1)'}]}>
               <FontAwesome name="soccer-ball-o" size={14} color={colors.muted} />
             </View>
             <View style={styles.tlContent}>
               <Text style={styles.tlTitle}>Anotación (Villarreal CF)</Text>
               <Text style={styles.tlSub}>Jugador Nº 9</Text>
             </View>
           </View>

           <View style={styles.timelineLine} />

           <View style={styles.timelineItem}>
             <Text style={styles.tlMin}>03'</Text>
             <View style={[styles.tlIcon, {backgroundColor: `${config.color}20`}]}>
               <FontAwesome name="soccer-ball-o" size={14} color={colors.sky} />
             </View>
             <View style={styles.tlContent}>
               <Text style={styles.tlTitle}>Anotación (CD Jesuitas)</Text>
               <Text style={styles.tlSub}>{PLAYERS[0]?.name || 'Jugador 1'} (Penalti)</Text>
             </View>
           </View>

        </Card>
      </View>
    );
  };

  const renderFinalSummary = () => {
    if (matchState !== 'Finalizado') return null;

    return (
      <View style={{marginTop: spacing.l}}>
        <Text style={styles.sectionTitle}>Resumen Final</Text>
        <Card delay={200} style={styles.summaryCard}>
           <Text style={styles.summarySubtitle}>Anotacióneadores Jesuitas</Text>
           <Text style={styles.summaryText}>• 03' {PLAYERS[0]?.name || 'Jugador 1'}</Text>
           <Text style={styles.summaryText}>• 34' {PLAYERS[1]?.name || 'Jugador 2'}</Text>
           
           <View style={{height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: spacing.m}} />
           
           <Text style={styles.summarySubtitle}>Disciplina</Text>
           <Text style={styles.summaryText}>• 22' Amarilla a Lucas Pérez</Text>

           <View style={{height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginVertical: spacing.m}} />
           
           <Text style={styles.summarySubtitle}>Control de Minutos</Text>
           <Text style={styles.summaryText}>Registro 100% completado (11 titulares, 5 suplentes).</Text>
        </Card>
        
        <ActionBtn label="GENERAR ACTA PDF" icon="file-pdf-o" variant="primary" style={{marginTop: spacing.m}} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <PremiumHeader 
        title="MATCH CENTER"
        subtitle="EN DIRECTO"
        showSearchAndActions={false}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: spacing.xxl}}>
        
        {renderHeader()}
        {renderControls()}
        {renderEventButtons()}
        {renderTimeline()}
        {renderFinalSummary()}

      </ScrollView>

      {/* QUICK EVENT MODAL MOCKUP */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar {selectedEvent}</Text>
            <Text style={styles.modalSub}>Selecciona al jugador implicado (Paso 2/3)</Text>
            
            <View style={styles.playerListGrid}>
               <TouchableOpacity style={styles.playerPickBtn}>
                 <FontAwesome name="user" color={colors.white} style={{marginRight: 8}} />
                 <Text style={styles.playerPickText}>{PLAYERS[1]?.name || 'Jugador 2'}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.playerPickBtn}>
                 <FontAwesome name="user" color={colors.white} style={{marginRight: 8}} />
                 <Text style={styles.playerPickText}>{PLAYERS[0]?.name || 'Jugador 1'}</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.playerPickBtn}>
                 <FontAwesome name="user" color={colors.white} style={{marginRight: 8}} />
                 <Text style={styles.playerPickText}>Lucas Pérez</Text>
               </TouchableOpacity>
            </View>

            <View style={styles.modalActions}>
              <ActionBtn label="CANCELAR" icon="close" variant="outline" style={{flex: 1, marginRight: spacing.s}} onPress={() => setModalVisible(false)} />
              <ActionBtn label="SIGUIENTE" icon="arrow-right" variant="primary" style={{flex: 1}} onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: 'transparent' },
  content: { paddingHorizontal: spacing.l },
  
  scoreboard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 28, borderWidth: 1, borderColor: `${colors.sky}50`, padding: spacing.xl, marginBottom: spacing.m, overflow: 'hidden' },
  scoreTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.l },
  matchBadge: { backgroundColor: colors.sky, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  matchBadgeText: { color: '#041026', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  matchCategory: { color: colors.muted, fontSize: 11, fontWeight: '700' },
  
  scoreCenterRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  teamCol: { flex: 1, alignItems: 'center' },
  teamLogoBg: { width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: spacing.s, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  teamName: { color: colors.white, fontSize: 14, fontWeight: '900', textAlign: 'center' },
  
  scoreCenterInfo: { flex: 1.5, alignItems: 'center' },
  scoreNumbersRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  scoreNum: { color: colors.white, fontSize: 48, fontWeight: '900' },
  scoreDash: { color: colors.sky, fontSize: 32, fontWeight: '900', marginHorizontal: 12 },
  minuteBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20 },
  minuteText: { color: colors.white, fontSize: 16, fontWeight: '900' },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger, marginLeft: 8 },
  stateText: { color: colors.success, fontSize: 11, fontWeight: '900', marginTop: 8, textTransform: 'uppercase' },

  controlsRow: { flexDirection: 'row', gap: spacing.s, marginBottom: spacing.l },
  ctrlBtnRed: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(239, 68, 68, 0.15)', borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)', alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.m, borderRadius: 16 },
  ctrlBtnText: { color: colors.white, fontSize: 13, fontWeight: '900' },

  eventGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.m, justifyContent: 'space-between' },
  eventBtn: { width: '31%', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 16, paddingVertical: spacing.l, alignItems: 'center' },
  eventIconBg: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: spacing.s },
  eventBtnText: { color: colors.white, fontSize: 11, fontWeight: '800' },
  cardIcon: { width: 14, height: 20, borderRadius: 3, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  cardIconSmall: { width: 10, height: 14, borderRadius: 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },

  sectionTitle: { color: colors.white, fontSize: 16, fontWeight: '900', textTransform: 'uppercase', marginBottom: spacing.m },
  timelineCard: { padding: spacing.m },
  timelineItem: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing.s },
  tlMin: { color: colors.sky, fontSize: 14, fontWeight: '900', width: 32, marginTop: 2 },
  tlIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginHorizontal: spacing.s },
  tlContent: { flex: 1 },
  tlTitle: { color: colors.white, fontSize: 14, fontWeight: '800' },
  tlSub: { color: colors.muted, fontSize: 12, fontWeight: '600', marginTop: 2 },
  timelineLine: { width: 2, height: 20, backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: 62 },

  summaryCard: { padding: spacing.l, borderColor: colors.sky },
  summarySubtitle: { color: colors.sky, fontSize: 13, fontWeight: '900', textTransform: 'uppercase', marginBottom: 8 },
  summaryText: { color: colors.white, fontSize: 14, fontWeight: '600', marginBottom: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#020814', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: spacing.xl, borderWidth: 1, borderColor: `${colors.sky}50` },
  modalTitle: { color: colors.white, fontSize: 24, fontWeight: '900', marginBottom: 4 },
  modalSub: { color: colors.muted, fontSize: 13, fontWeight: '600', marginBottom: spacing.l },
  playerListGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s, marginBottom: spacing.xl },
  playerPickBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  playerPickText: { color: colors.white, fontSize: 14, fontWeight: '700' },
  modalActions: { flexDirection: 'row' }
});
