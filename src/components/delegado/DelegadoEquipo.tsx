import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { CromoJugador } from '../ui/CromoJugador';

const colors = {
  navyDark: '#020814',
  navyDeep: '#071A3D',
  navyCard: '#091B3E',
  emeraldGlow: '#34D399',
  skyPrimary: '#38BDF8',
  skyGlow: '#7DD3FC',
  white: '#FFFFFF',
  textMuted: '#94A3B8',
  border: 'rgba(255, 255, 255, 0.08)',
  disabled: '#334155',
  warning: '#F59E0B',
  danger: '#EF4444',
  goalkeeper: '#800020',
  navyArmband: '#071A3D',
};

const MOCK_STAFF = [
  { role: 'Primer Entrenador', name: 'Rubén Balaguer', license: 'UEFA B' },
  { role: 'Segundo Entrenador', name: 'Daniel Sobero', license: 'UEFA C' },
  { role: 'Delegado de Equipo', name: 'Carlos Ruiz', license: 'Oficial FFCV' },
];

export interface PlayerRosterItem {
  dorsal: string;
  name: string;
  position: string;
  dominantFoot?: string;
  birthDate?: string;
  licenseStatus: 'Activa' | 'Pendiente' | 'No apta';
  licenseCode?: string;
  isGoalkeeper?: boolean;
  isCaptain?: boolean;
  isInjured?: boolean;
  isSuspended?: boolean;
  photoUrl?: string;
  guardianName?: string;
  guardianPhone?: string;
}

const MOCK_PLAYERS: PlayerRosterItem[] = [
  { dorsal: '1', name: 'Álvaro Soler', position: 'Portero', dominantFoot: 'Diestro', birthDate: '12/01/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48192', isGoalkeeper: true, guardianName: 'Pedro Soler (Padre)', guardianPhone: '611 223 344' },
  { dorsal: '2', name: 'Dani Navarro', position: 'Lateral Derecho', dominantFoot: 'Diestro', birthDate: '03/04/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48195', guardianName: 'Marta Navarro (Madre)', guardianPhone: '611 334 455' },
  { dorsal: '3', name: 'Martín Roca', position: 'Lateral Izquierdo', dominantFoot: 'Zurdo', birthDate: '19/09/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48196', guardianName: 'Carlos Roca (Padre)', guardianPhone: '611 445 566' },
  { dorsal: '4', name: 'Hugo Martínez', position: 'Defensa Central', dominantFoot: 'Diestro', birthDate: '04/05/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48198', guardianName: 'Carmen Martínez (Madre)', guardianPhone: '622 334 455' },
  { dorsal: '5', name: 'Lucas Vidal', position: 'Defensa Central', dominantFoot: 'Diestro', birthDate: '28/02/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48199', guardianName: 'Antonio Vidal (Padre)', guardianPhone: '622 445 566' },
  { dorsal: '6', name: 'Javi Gómez', position: 'Mediocentro', dominantFoot: 'Diestro', birthDate: '11/08/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48201', guardianName: 'Laura Gómez (Madre)', guardianPhone: '622 556 677' },
  { dorsal: '7', name: 'Iván Torres', position: 'Extremo Derecho', dominantFoot: 'Diestro', birthDate: '07/06/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48203', guardianName: 'David Torres (Padre)', guardianPhone: '633 112 233' },
  { dorsal: '8', name: 'Pablo Martínez', position: 'Mediocentro', dominantFoot: 'Diestro', birthDate: '15/10/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48204', guardianName: 'Isabel Martínez (Madre)', guardianPhone: '633 223 344' },
  { dorsal: '9', name: 'Alejandro Ramos', position: 'Delantero Centro', dominantFoot: 'Diestro', birthDate: '02/01/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48205', guardianName: 'Jorge Ramos (Padre)', guardianPhone: '633 334 455' },
  { dorsal: '10', name: 'Marcos Soler', position: 'Mediapunta', dominantFoot: 'Zurdo', birthDate: '14/03/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48207', isCaptain: true, guardianName: 'Juan Soler (Padre)', guardianPhone: '633 445 566' },
  { dorsal: '11', name: 'David Cano', position: 'Extremo Izquierdo', dominantFoot: 'Zurdo', birthDate: '23/11/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48208', guardianName: 'Sonia Cano (Madre)', guardianPhone: '644 112 233' },
  { dorsal: '12', name: 'Diego Ferrer', position: 'Defensa Central', dominantFoot: 'Diestro', birthDate: '17/04/2011 (15 años)', licenseStatus: 'Pendiente', licenseCode: 'Lic. Pendiente', guardianName: 'Manuel Ferrer (Padre)', guardianPhone: '644 223 344' },
  { dorsal: '13', name: 'Álvaro González', position: 'Portero Suplente', dominantFoot: 'Diestro', birthDate: '09/12/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48210', isGoalkeeper: true, guardianName: 'Patricia González (Madre)', guardianPhone: '644 334 455' },
  { dorsal: '14', name: 'Sergio Pastor', position: 'Mediocentro', dominantFoot: 'Diestro', birthDate: '22/07/2011 (15 años)', licenseStatus: 'No apta', licenseCode: 'Lic. Revisión', isInjured: true, guardianName: 'Elena Pastor (Madre)', guardianPhone: '644 556 677' },
  { dorsal: '15', name: 'Adrián López', position: 'Mediocentro', dominantFoot: 'Diestro', birthDate: '05/05/2011 (15 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48212', guardianName: 'Francisco López (Padre)', guardianPhone: '655 112 233' },
  { dorsal: '16', name: 'Ian Miquel', position: 'Extremo Izquierdo', dominantFoot: 'Zurdo', birthDate: '30/08/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48214', guardianName: 'Alicia Miquel (Madre)', guardianPhone: '655 223 344' },
  { dorsal: '17', name: 'Álex Ruíz', position: 'Mediocentro', dominantFoot: 'Ambidextro', birthDate: '18/11/2011 (14 años)', licenseStatus: 'Activa', licenseCode: 'Lic. 48215', isSuspended: true, guardianName: 'Javier Ruíz (Padre)', guardianPhone: '655 667 788' },
];

export function DelegadoEquipo() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerRosterItem | null>(null);

  const totalPlayers = MOCK_PLAYERS.length;
  const unavailablePlayers = MOCK_PLAYERS.filter(p => p.isInjured || p.isSuspended);
  const availablePlayersCount = totalPlayers - unavailablePlayers.length;

  const renderLicensePill = (status: PlayerRosterItem['licenseStatus']) => {
    switch (status) {
      case 'Activa':
        return (
          <View style={styles.licensePillActive}>
            <Text style={styles.licenseTxtActive}>🟢 Activa</Text>
          </View>
        );
      case 'Pendiente':
        return (
          <View style={styles.licensePillPending}>
            <Text style={styles.licenseTxtPending}>🟡 Pendiente</Text>
          </View>
        );
      case 'No apta':
      default:
        return (
          <View style={styles.licensePillInactive}>
            <Text style={styles.licenseTxtInactive}>🔴 No apta</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      {/* CABECERA */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleTxt}>MI EQUIPO</Text>
          <Text style={styles.subtitleTxt}>Plantilla y Cuerpo Técnico · Modo Consulta</Text>
        </View>
        <View style={styles.teamPill}>
          <Ionicons name="shield-checkmark" size={14} color={colors.navyDark} />
          <Text style={styles.teamPillTxt}>CADETE B</Text>
        </View>
      </View>

      {/* 1. TARJETA RESUMEN SUPERIOR COMPACTA */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTeamTitle}>Cadete B</Text>

        <View style={styles.summaryKPIRow}>
          <View style={styles.kpiChip}>
            <Text style={styles.kpiChipTxt}>👥 {totalPlayers} jugadores</Text>
          </View>
          <View style={styles.kpiChipSuccess}>
            <Text style={styles.kpiChipSuccessTxt}>🟢 {availablePlayersCount} disponibles</Text>
          </View>
          <View style={styles.kpiChipDanger}>
            <Text style={styles.kpiChipDangerTxt}>🔴 {unavailablePlayers.length} no disponibles</Text>
          </View>
          <View style={styles.kpiChipStaff}>
            <Text style={styles.kpiChipStaffTxt}>👔 {MOCK_STAFF.length} miembros del cuerpo técnico</Text>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.nextMatchBox}>
          <Text style={styles.nextMatchTitle}>📅 Próximo partido</Text>
          <Text style={styles.nextMatchSub}>Sábado · 10:30 h</Text>
          <Text style={styles.nextMatchTeams}>CD Jesuitas vs Torrent CF "A"</Text>
        </View>
      </View>

      {/* SECCIÓN CUERPO TÉCNICO */}
      <Text style={styles.sectionTitleTxt}>CUERPO TÉCNICO ({MOCK_STAFF.length})</Text>
      <View style={styles.staffGrid}>
        {MOCK_STAFF.map((staff, idx) => (
          <View key={idx} style={styles.staffCard}>
            <View style={styles.staffAvatarCircle}>
              <Ionicons name="person" size={20} color={colors.navyDark} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.staffRoleTxt}>{staff.role}</Text>
              <Text style={styles.staffNameTxt}>{staff.name}</Text>
            </View>
            <View style={styles.licenseTag}>
              <Text style={styles.licenseTagTxt}>{staff.license}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* SECCIÓN PLANTILLA Y DORSALES CON CROMO COMPACTO */}
      <Text style={styles.sectionTitleTxt}>PLANTILLA Y CROMOS OFICIALES ({MOCK_PLAYERS.length})</Text>
      <View style={styles.playersGrid}>
        {MOCK_PLAYERS.map((player) => (
          <TouchableOpacity 
            key={player.dorsal} 
            style={styles.playerCardRow}
            onPress={() => setSelectedPlayer(player)}
            activeOpacity={0.82}
          >
            {/* 1. CROMO COMPACTO OFICIAL CD JESUITAS */}
            <CromoJugador 
              variant="compact"
              name={player.name}
              dorsal={player.dorsal}
              position={player.position}
              team="Cadete B"
            />

            {/* DATOS DEL JUGADOR */}
            <View style={{ flex: 1 }}>
              <View style={styles.playerNameRow}>
                <Text style={styles.playerNameTxt}>{player.name}</Text>
                
                {/* BRAZALETE AZUL MARINO NAVY DEL CAPITÁN */}
                {player.isCaptain && (
                  <View style={styles.captainArmbandBadge}>
                    <Text style={styles.captainArmbandBadgeTxt}>CAPITÁN</Text>
                  </View>
                )}

                {/* ESTADOS VISUALES (🤕 lesionado, 🟥 sancionado) */}
                {player.isInjured && (
                  <View style={styles.statusBadgeInjured}>
                    <Text style={styles.statusBadgeInjuredTxt}>🤕 lesionado</Text>
                  </View>
                )}
                {player.isSuspended && (
                  <View style={styles.statusBadgeSuspended}>
                    <Text style={styles.statusBadgeSuspendedTxt}>🟥 sancionado</Text>
                  </View>
                )}
              </View>

              <Text style={styles.playerPositionTxt}>
                #{player.dorsal} · {player.position} {player.licenseCode ? `(${player.licenseCode})` : ''}
              </Text>
            </View>

            {/* LICENCIAS */}
            {renderLicensePill(player.licenseStatus)}
          </TouchableOpacity>
        ))}
      </View>

      {/* 2. MODAL DE FICHA INDIVIDUAL DEL JUGADOR */}
      {selectedPlayer && (
        <Modal
          visible={Boolean(selectedPlayer)}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setSelectedPlayer(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalCard, isDesktop && styles.modalCardDesktop]}>
              
              {/* CABECERA MODAL */}
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalTitleTxt}>FICHA INDIVIDUAL DEL JUGADOR</Text>
                <TouchableOpacity style={styles.closeBtn} onPress={() => setSelectedPlayer(null)}>
                  <Ionicons name="close" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
                {/* 1. CROMO EN TAMAÑO GRANDE (DETAIL) */}
                <View style={styles.detailCromoWrapper}>
                  <CromoJugador 
                    variant="detail"
                    name={selectedPlayer.name}
                    dorsal={selectedPlayer.dorsal}
                    position={selectedPlayer.position}
                    team="Cadete B"
                    category="Liga Preferente"
                    hideGamification={true}
                  />
                </View>

                {/* 2. FICHA DE DATOS DE CONSULTA */}
                <View style={styles.detailDataCard}>
                  <Text style={styles.detailSectionTitle}>DATOS DEL JUGADOR (LECTURA)</Text>

                  <View style={styles.detailRow}>
                    <Ionicons name="football-outline" size={18} color={colors.skyPrimary} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>POSICIÓN</Text>
                      <Text style={styles.detailVal}>#{selectedPlayer.dorsal} · {selectedPlayer.position}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="footsteps-outline" size={18} color={colors.emeraldGlow} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>PIE DOMINANTE</Text>
                      <Text style={styles.detailVal}>{selectedPlayer.dominantFoot || 'Diestro'}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={18} color={colors.skyGlow} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>FECHA DE NACIMIENTO</Text>
                      <Text style={styles.detailVal}>{selectedPlayer.birthDate || '14/03/2011 (15 años)'}</Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="document-text-outline" size={18} color={colors.warning} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>ESTADO DE LICENCIA</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 }}>
                        {renderLicensePill(selectedPlayer.licenseStatus)}
                        <Text style={styles.detailValSub}>{selectedPlayer.licenseCode}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <Ionicons name="fitness-outline" size={18} color={colors.skyPrimary} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>CONDICIÓN ACTUAL</Text>
                      <Text style={[
                        styles.detailVal, 
                        selectedPlayer.isInjured && { color: colors.danger },
                        selectedPlayer.isSuspended && { color: colors.danger }
                      ]}>
                        {selectedPlayer.isInjured ? '🤕 Lesionado' : selectedPlayer.isSuspended ? '🟥 Sancionado' : 'Apto para competir'}
                      </Text>
                    </View>
                  </View>

                  {selectedPlayer.isCaptain && (
                    <View style={styles.detailRowHighlight}>
                      <Ionicons name="ribbon-outline" size={18} color={colors.white} />
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.detailLabel, { color: colors.skyGlow }]}>CAPITANÍA</Text>
                        <Text style={[styles.detailVal, { color: colors.white }]}>Capitán del equipo (Brazalete Navy)</Text>
                      </View>
                    </View>
                  )}

                  <View style={styles.detailRow}>
                    <Ionicons name="call-outline" size={18} color={colors.emeraldGlow} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>CONTACTO FAMILIAR AUTORIZADO</Text>
                      <Text style={styles.detailVal}>{selectedPlayer.guardianName || 'Padre / Madre'}</Text>
                      <Text style={styles.detailValSub}>{selectedPlayer.guardianPhone || '612 345 678'}</Text>
                    </View>
                  </View>

                </View>
              </ScrollView>

              <TouchableOpacity style={styles.modalCloseFullBtn} onPress={() => setSelectedPlayer(null)}>
                <Text style={styles.modalCloseFullBtnTxt}>CERRAR FICHA</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 16, paddingBottom: 40 },
  contentDesktop: { maxWidth: 1100, alignSelf: 'center', width: '100%', padding: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900', letterSpacing: 0.3 },
  subtitleTxt: { color: colors.skyGlow, fontSize: 12.5, fontWeight: '700', marginTop: 2 },
  teamPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.emeraldGlow, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  teamPillTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },
  
  // TARJETA RESUMEN SUPERIOR COMPACTA
  summaryCard: { backgroundColor: colors.navyCard, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 24 },
  summaryTeamTitle: { color: colors.white, fontSize: 20, fontWeight: '900', letterSpacing: 0.5, marginBottom: 12 },
  summaryKPIRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 14 },
  kpiChip: { backgroundColor: 'rgba(56, 189, 248, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.25)' },
  kpiChipTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '800' },
  kpiChipSuccess: { backgroundColor: 'rgba(52, 211, 153, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(52, 211, 153, 0.25)' },
  kpiChipSuccessTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '800' },
  kpiChipDanger: { backgroundColor: 'rgba(239, 68, 68, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.25)' },
  kpiChipDangerTxt: { color: colors.danger, fontSize: 12, fontWeight: '800' },
  kpiChipStaff: { backgroundColor: 'rgba(245, 158, 11, 0.12)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.25)' },
  kpiChipStaffTxt: { color: colors.warning, fontSize: 12, fontWeight: '800' },

  summaryDivider: { height: 1, backgroundColor: colors.border, marginBottom: 14 },
  nextMatchBox: { backgroundColor: 'rgba(2, 8, 20, 0.5)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.05)' },
  nextMatchTitle: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', letterSpacing: 0.5 },
  nextMatchSub: { color: colors.textMuted, fontSize: 12, fontWeight: '700', marginTop: 2 },
  nextMatchTeams: { color: colors.white, fontSize: 14, fontWeight: '900', marginTop: 2 },

  sectionTitleTxt: { color: colors.white, fontSize: 13.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 12, marginTop: 4 },
  staffGrid: { gap: 10, marginBottom: 24 },
  staffCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  staffAvatarCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.skyPrimary, justifyContent: 'center', alignItems: 'center' },
  staffRoleTxt: { color: colors.skyPrimary, fontSize: 11, fontWeight: '900' },
  staffNameTxt: { color: colors.white, fontSize: 14.5, fontWeight: '800' },
  licenseTag: { backgroundColor: 'rgba(56, 189, 248, 0.12)', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(56, 189, 248, 0.25)' },
  licenseTagTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '700' },

  playersGrid: { gap: 10 },
  playerCardRow: { flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.navyCard, padding: 12, borderRadius: 14, borderWidth: 1, borderColor: colors.border },
  playerNameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  playerNameTxt: { color: colors.white, fontSize: 14.5, fontWeight: '800' },
  playerPositionTxt: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginTop: 2 },
  
  // BRAZALETE CAPITÁN NAVY
  captainArmbandBadge: { backgroundColor: colors.navyArmband, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: colors.white },
  captainArmbandBadgeTxt: { color: colors.white, fontSize: 9.5, fontWeight: '900', letterSpacing: 0.3 },

  // BADGES ESTADO
  statusBadgeInjured: { backgroundColor: 'rgba(239, 68, 68, 0.18)', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.4)' },
  statusBadgeInjuredTxt: { color: '#FCA5A5', fontSize: 10, fontWeight: '800' },
  statusBadgeSuspended: { backgroundColor: 'rgba(239, 68, 68, 0.18)', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: colors.danger },
  statusBadgeSuspendedTxt: { color: colors.danger, fontSize: 10, fontWeight: '900' },

  // LICENCIAS
  licensePillActive: { backgroundColor: 'rgba(52, 211, 153, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(52, 211, 153, 0.3)' },
  licenseTxtActive: { color: colors.emeraldGlow, fontSize: 11, fontWeight: '800' },
  licensePillPending: { backgroundColor: 'rgba(245, 158, 11, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.3)' },
  licenseTxtPending: { color: colors.warning, fontSize: 11, fontWeight: '800' },
  licensePillInactive: { backgroundColor: 'rgba(239, 68, 68, 0.12)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.3)' },
  licenseTxtInactive: { color: colors.danger, fontSize: 11, fontWeight: '800' },

  // MODAL FICHA INDIVIDUAL
  modalOverlay: { flex: 1, backgroundColor: 'rgba(2, 8, 20, 0.85)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalCard: { width: '100%', maxHeight: '90%', backgroundColor: colors.navyCard, borderRadius: 20, borderWidth: 1.5, borderColor: colors.border, padding: 18, flex: 1 },
  modalCardDesktop: { maxWidth: 520, maxHeight: '85%' },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitleTxt: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 0.8 },
  closeBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.navyDark, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  modalScrollContent: { paddingBottom: 16 },
  detailCromoWrapper: { alignItems: 'center', marginVertical: 8 },
  detailDataCard: { backgroundColor: 'rgba(2, 8, 20, 0.5)', borderRadius: 14, padding: 14, gap: 12, marginTop: 12, borderWidth: 1, borderColor: colors.border },
  detailSectionTitle: { color: colors.skyGlow, fontSize: 11, fontWeight: '900', letterSpacing: 0.8, marginBottom: 4 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(9, 27, 62, 0.6)', padding: 10, borderRadius: 10 },
  detailRowHighlight: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyDeep, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.skyPrimary },
  detailLabel: { color: colors.textMuted, fontSize: 9.5, fontWeight: '900', letterSpacing: 0.5 },
  detailVal: { color: colors.white, fontSize: 13, fontWeight: '800', marginTop: 2 },
  detailValSub: { color: colors.skyGlow, fontSize: 11.5, fontWeight: '600', marginTop: 2 },
  modalCloseFullBtn: { backgroundColor: colors.skyPrimary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  modalCloseFullBtnTxt: { color: colors.navyDark, fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },
});
