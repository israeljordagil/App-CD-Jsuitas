import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  yellowCard: '#F59E0B',
  redCard: '#EF4444',
  purpleAccent: '#A855F7',
};

// =============================================================================
// DATOS MOCK DE DOCUMENTACIÓN OFICIAL DEL EQUIPO
// =============================================================================

// 1. LICENCIAS DEL EQUIPO (PLANTILLA)
interface PlayerLicense {
  id: string;
  name: string;
  dorsal: string;
  position: string;
  status: 'Activa' | 'Pendiente' | 'No apta';
  licenseNumber: string;
}

const MOCK_PLAYER_LICENSES: PlayerLicense[] = [
  { id: 'l1', name: 'Álvaro Gómez', dorsal: '1', position: 'Portero', status: 'Activa', licenseNumber: 'FFCV-2026-8812' },
  { id: 'l2', name: 'Martín Pérez', dorsal: '3', position: 'Lateral Izquierdo', status: 'Activa', licenseNumber: 'FFCV-2026-8814' },
  { id: 'l3', name: 'Hugo Sánchez', dorsal: '4', position: 'Defensa Central', status: 'Activa', licenseNumber: 'FFCV-2026-8815' },
  { id: 'l4', name: 'Lucas Ruiz', dorsal: '5', position: 'Defensa Central', status: 'Pendiente', licenseNumber: 'FFCV-2026-8816' },
  { id: 'l5', name: 'Iván Martínez', dorsal: '7', position: 'Extremo Izquierdo', status: 'Activa', licenseNumber: 'FFCV-2026-8818' },
  { id: 'l6', name: 'Alejandro Gómez', dorsal: '9', position: 'Delantero Centro', status: 'Activa', licenseNumber: 'FFCV-2026-8820' },
  { id: 'l7', name: 'Mateo Fernández', dorsal: '11', position: 'Mediapunta', status: 'No apta', licenseNumber: 'FFCV-2026-8822' },
];

// 2. DOCUMENTACIÓN DEL CUERPO TÉCNICO
interface StaffDocument {
  id: string;
  name: string;
  role: 'Entrenador' | 'Segundo Entrenador' | 'Delegado' | 'Fisioterapeuta';
  docType: string;
  status: 'Vigente' | 'En revisión';
  licenseCode: string;
}

const MOCK_STAFF_DOCS: StaffDocument[] = [
  { id: 's1', name: 'Carlos Ruiz', role: 'Delegado', docType: 'Licencia Oficial Delegado FFCV', status: 'Vigente', licenseCode: 'DEL-2026-091' },
  { id: 's2', name: 'Pablo Fernández', role: 'Entrenador', docType: 'Título Entrenador Nivel 2 (UEFA A)', status: 'Vigente', licenseCode: 'ENT-2026-442' },
  { id: 's3', name: 'Javier Gómez', role: 'Segundo Entrenador', docType: 'Licencia Auxiliar Técnico', status: 'Vigente', licenseCode: 'AUX-2026-118' },
  { id: 's4', name: 'Laura Mateo', role: 'Fisioterapeuta', docType: 'Acreditación Sanitaria Colegiada', status: 'Vigente', licenseCode: 'SAN-2026-704' },
];

// 3. PARTES DE LESIONES (DATOS DE GESTIÓN NO SENSIBLES)
interface InjuryReport {
  id: string;
  player: string;
  dorsal: string;
  date: string;
  docType: string;
  status: 'Alta Definitiva' | 'En Tramitación' | 'Baja Deportiva';
}

const MOCK_INJURY_REPORTS: InjuryReport[] = [
  { id: 'inj1', player: 'Martín Pérez', dorsal: '3', date: '12/05/2026', docType: 'Parte Asistencial MUTUA FFCV', status: 'En Tramitación' },
  { id: 'inj2', player: 'Hugo Sánchez', dorsal: '4', date: '20/04/2026', docType: 'Informe de Alta Médica Preventiva', status: 'Alta Definitiva' },
  { id: 'inj3', player: 'Mateo Fernández', dorsal: '11', date: '02/03/2026', docType: 'Parte Lesión Esguince Tobillo', status: 'Alta Definitiva' },
];

// 4. PROTOCOLOS DEL CLUB (NOMBRES EXACTOS)
interface ClubProtocol {
  id: string;
  title: string;
  category: string;
  code: string;
}

const MOCK_CLUB_PROTOCOLS: ClubProtocol[] = [
  { id: 'p1', title: 'Protocolo de lluvia y suspensión de partidos', category: 'Meteorología & Competición', code: 'PROT-LLUVIA-2026' },
  { id: 'p2', title: 'Protocolo de atención de lesiones y MUTUA', category: 'Sanidad & Cobertura', code: 'PROT-MUTUA-2026' },
  { id: 'p3', title: 'Normativa de uso de instalaciones y vestuarios', category: 'Instalaciones & Convivencia', code: 'NORM-VEST-2026' },
  { id: 'p4', title: 'Guía de torneos y desplazamientos', category: 'Logística & Transporte', code: 'GUIA-TORNEOS-2026' },
  { id: 'p5', title: 'Plan de emergencias y evacuación', category: 'Seguridad & Protección', code: 'PLAN-EMERG-2026' },
];

// 5. ACTAS INTERNAS DEL EQUIPO
interface InternalMatchReport {
  id: string;
  rival: string;
  round: string;
  date: string;
  score: string;
  fileName: string;
}

const MOCK_INTERNAL_REPORTS: InternalMatchReport[] = [
  { id: 'act1', rival: 'Torrent CF "A"', round: 'Jornada 14', date: '08/08/2026', score: '2 - 1', fileName: 'Acta_Delegado_CadeteB_CDJesuitas_TorrentCF_2026-08-08_v1.pdf' },
  { id: 'act2', rival: 'Levante UD "B"', round: 'Jornada 13', date: '01/08/2026', score: '1 - 1', fileName: 'Acta_Delegado_CadeteB_CDJesuitas_LevanteUD_2026-08-01_v1.pdf' },
  { id: 'act3', rival: 'Valencia CF "C"', round: 'Jornada 12', date: '25/07/2026', score: '3 - 0', fileName: 'Acta_Delegado_CadeteB_CDJesuitas_ValenciaCF_2026-07-25_v1.pdf' },
];

export function DelegadoDocumentacion() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // VISOR PDF Y MENSAJES HONESTOS
  const [selectedDoc, setSelectedDoc] = useState<{ title: string; subtitle: string; isRealActa: boolean; fileName: string; contentLines: string[] } | null>(null);
  const [demoNoticeMessage, setDemoNoticeMessage] = useState<string | null>(null);

  // MANEJADORES DE ACCIÓN DE DOCUMENTOS
  const handleOpenPdf = (title: string, subtitle: string, isRealActa: boolean = false, fileName: string = '', contentLines: string[] = []) => {
    setSelectedDoc({ title, subtitle, isRealActa, fileName, contentLines });
    setDemoNoticeMessage(null);
  };

  const handleDownloadDoc = (isRealActa: boolean, fileName: string, title: string) => {
    if (isRealActa && typeof window !== 'undefined') {
      const dummyContent = `CD JESUITAS - DOCUMENTO OFICIAL\n${title}\nArchivo: ${fileName}`;
      const blob = new Blob([dummyContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'Documento_CD_Jesuitas.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      setDemoNoticeMessage(`ℹ️ Vista previa de demostración local. En producción se descargará el archivo original desde la FFCV / CD Jesuitas.`);
    }
  };

  const handleShareDoc = (isRealActa: boolean, title: string) => {
    if (isRealActa && typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: title,
        text: `Documentación oficial CD Jesuitas: ${title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      setDemoNoticeMessage(`ℹ️ Enlace de demostración. La función de compartir enviará la URL directa del documento guardado en la nube.`);
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.content, isDesktop && styles.contentDesktop]}
      showsVerticalScrollIndicator={false}
    >
      {/* NAVEGACIÓN Y ENCABEZADO */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color={colors.white} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleTxt}>DOCUMENTACIÓN OFICIAL</Text>
          <Text style={styles.subtitleTxt}>Expediente del Equipo · Cadete B · Perfil Delegado</Text>
        </View>
      </View>

      {/* NOTIFICACIÓN HONESTA PARA ACCIONES MOCK */}
      {demoNoticeMessage && (
        <View style={styles.honestNoticeBox}>
          <Ionicons name="information-circle" size={20} color={colors.skyGlow} />
          <Text style={styles.honestNoticeTxt}>{demoNoticeMessage}</Text>
          <TouchableOpacity onPress={() => setDemoNoticeMessage(null)}>
            <Ionicons name="close" size={18} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.stackGap}>

        {/* ========================================================================= */}
        {/* BLOQUE 1: LICENCIAS DEL EQUIPO */}
        {/* ========================================================================= */}
        <View style={styles.blockCard}>
          <View style={styles.blockHeaderRow}>
            <Ionicons name="id-card-outline" size={22} color={colors.skyPrimary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.blockTitleTxt}>1. LICENCIAS DEL EQUIPO</Text>
              <Text style={styles.blockSubTxt}>Fichas federativas de la plantilla Cadete B ({MOCK_PLAYER_LICENSES.length})</Text>
            </View>
          </View>

          <View style={styles.listStack}>
            {MOCK_PLAYER_LICENSES.map((player) => {
              const statusColor = player.status === 'Activa' ? colors.emeraldGlow : player.status === 'Pendiente' ? colors.yellowCard : colors.redCard;
              return (
                <View key={player.id} style={styles.itemRow}>
                  <View style={styles.dorsalCircle}>
                    <Text style={styles.dorsalTxt}>#{player.dorsal}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemNameTxt}>{player.name}</Text>
                    <Text style={styles.itemSubTxt}>{player.position} · {player.licenseNumber}</Text>
                  </View>
                  <View style={[styles.statusBadge, { borderColor: statusColor, backgroundColor: `${statusColor}15` }]}>
                    <Text style={[styles.statusTxt, { color: statusColor }]}>{player.status}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.viewPdfBtn} 
                    onPress={() => handleOpenPdf(
                      `Ficha Federativa FFCV · #${player.dorsal} ${player.name}`,
                      `Licencia: ${player.licenseNumber} · Estado: ${player.status} · CD Jesuitas Cadete B`,
                      false,
                      `Licencia_${player.dorsal}_${player.name.replace(/\s+/g, '')}.pdf`,
                      [
                        `Jugador: ${player.name}`,
                        `Dorsal Oficial: #${player.dorsal}`,
                        `Posición: ${player.position}`,
                        `Código Licencia: ${player.licenseNumber}`,
                        `Estado FFCV: ${player.status}`,
                        `Equipo: CD Jesuitas Cadete "B"`,
                      ]
                    )}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="document-text-outline" size={14} color={colors.navyDark} />
                    <Text style={styles.viewPdfBtnTxt}>Ver PDF</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* ========================================================================= */}
        {/* BLOQUE 2: DOCUMENTACIÓN DEL CUERPO TÉCNICO */}
        {/* ========================================================================= */}
        <View style={styles.blockCard}>
          <View style={styles.blockHeaderRow}>
            <Ionicons name="people-outline" size={22} color={colors.emeraldGlow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.blockTitleTxt}>2. DOCUMENTACIÓN DEL CUERPO TÉCNICO</Text>
              <Text style={styles.blockSubTxt}>Acreditaciones oficiales del staff del Cadete B</Text>
            </View>
          </View>

          <View style={styles.listStack}>
            {MOCK_STAFF_DOCS.map((staff) => (
              <View key={staff.id} style={styles.itemRow}>
                <View style={styles.roleIconBox}>
                  <Ionicons name="briefcase-outline" size={18} color={colors.skyGlow} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNameTxt}>{staff.name}</Text>
                  <Text style={styles.itemSubTxt}>{staff.role} · {staff.docType}</Text>
                </View>
                <View style={[styles.statusBadge, { borderColor: colors.emeraldGlow, backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                  <Text style={[styles.statusTxt, { color: colors.emeraldGlow }]}>{staff.status}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewPdfBtn}
                  onPress={() => handleOpenPdf(
                    `Acreditación Oficial · ${staff.name} (${staff.role})`,
                    `Documento: ${staff.docType} · Código: ${staff.licenseCode}`,
                    false,
                    `Acreditacion_${staff.role}_${staff.name.replace(/\s+/g, '')}.pdf`,
                    [
                      `Titulado/Acreditado: ${staff.name}`,
                      `Función en Equipo: ${staff.role}`,
                      `Tipo Acreditación: ${staff.docType}`,
                      `Código Licencia: ${staff.licenseCode}`,
                      `Estado Registro: ${staff.status}`,
                      `Entidad Validadora: FFCV / CD Jesuitas`,
                    ]
                  )}
                  activeOpacity={0.85}
                >
                  <Ionicons name="document-text-outline" size={14} color={colors.navyDark} />
                  <Text style={styles.viewPdfBtnTxt}>Ver PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* ========================================================================= */}
        {/* BLOQUE 3: PARTES DE LESIONES */}
        {/* ========================================================================= */}
        <View style={styles.blockCard}>
          <View style={styles.blockHeaderRow}>
            <Ionicons name="medkit-outline" size={22} color={colors.yellowCard} />
            <View style={{ flex: 1 }}>
              <Text style={styles.blockTitleTxt}>3. PARTES DE LESIONES</Text>
              <Text style={styles.blockSubTxt}>Registro de partes asistenciales y tramitaciones de seguro</Text>
            </View>
          </View>

          <View style={styles.listStack}>
            {MOCK_INJURY_REPORTS.map((inj) => {
              const injColor = inj.status === 'Alta Definitiva' ? colors.emeraldGlow : colors.yellowCard;
              return (
                <View key={inj.id} style={styles.itemRow}>
                  <View style={styles.dorsalCircle}>
                    <Text style={styles.dorsalTxt}>#{inj.dorsal}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemNameTxt}>{inj.player}</Text>
                    <Text style={styles.itemSubTxt}>{inj.docType} · Fecha: {inj.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { borderColor: injColor, backgroundColor: `${injColor}15` }]}>
                    <Text style={[styles.statusTxt, { color: injColor }]}>{inj.status}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.viewPdfBtn}
                    onPress={() => handleOpenPdf(
                      `Parte de Lesión y Asistencia · #${inj.dorsal} ${inj.player}`,
                      `Fecha: ${inj.date} · ${inj.docType} · Estado: ${inj.status}`,
                      false,
                      `Parte_Lesion_${inj.dorsal}_${inj.player.replace(/\s+/g, '')}.pdf`,
                      [
                        `Jugador Afectado: #${inj.dorsal} ${inj.player}`,
                        `Fecha Incidencia: ${inj.date}`,
                        `Tipo Documento: ${inj.docType}`,
                        `Estado Tramitación: ${inj.status}`,
                        `Cobertura: Seguro Deportivo Colectivo FFCV`,
                      ]
                    )}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="document-text-outline" size={14} color={colors.navyDark} />
                    <Text style={styles.viewPdfBtnTxt}>Ver PDF</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        {/* ========================================================================= */}
        {/* BLOQUE 4: PROTOCOLOS DEL CLUB (CON ORTOGRAFÍA CORREGIDA) */}
        {/* ========================================================================= */}
        <View style={styles.blockCard}>
          <View style={styles.blockHeaderRow}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.purpleAccent} />
            <View style={{ flex: 1 }}>
              <Text style={styles.blockTitleTxt}>4. PROTOCOLOS DEL CLUB</Text>
              <Text style={styles.blockSubTxt}>Normativa y guías operativas del CD Jesuitas</Text>
            </View>
          </View>

          <View style={styles.listStack}>
            {MOCK_CLUB_PROTOCOLS.map((prot) => (
              <View key={prot.id} style={styles.itemRow}>
                <View style={styles.protocolIconBox}>
                  <Ionicons name="book-outline" size={18} color={colors.purpleAccent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemNameTxt}>{prot.title}</Text>
                  <Text style={styles.itemSubTxt}>{prot.category} · Código: {prot.code}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewPdfBtn}
                  onPress={() => handleOpenPdf(
                    `Protocolo Oficial · ${prot.title}`,
                    `CD Jesuitas · ${prot.category} · Código: ${prot.code}`,
                    false,
                    `${prot.code}.pdf`,
                    [
                      `Documento: ${prot.title}`,
                      `Categoría: ${prot.category}`,
                      `Código Interno: ${prot.code}`,
                      `Versión: 2025-2026 Vigente`,
                      `Ámbito: Aplicación obligatoria para Delegados y Staff`,
                    ]
                  )}
                  activeOpacity={0.85}
                >
                  <Ionicons name="document-text-outline" size={14} color={colors.navyDark} />
                  <Text style={styles.viewPdfBtnTxt}>Ver PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* ========================================================================= */}
        {/* BLOQUE 5: ACTAS INTERNAS (REUTILIZACIÓN DEL ESTILO DE ACTA EN PDF) */}
        {/* ========================================================================= */}
        <View style={styles.blockCard}>
          <View style={styles.blockHeaderRow}>
            <Ionicons name="document-text-outline" size={22} color={colors.emeraldGlow} />
            <View style={{ flex: 1 }}>
              <Text style={styles.blockTitleTxt}>5. ACTAS INTERNAS</Text>
              <Text style={styles.blockSubTxt}>Histórico de actas generadas en partidos oficiales</Text>
            </View>
          </View>

          <View style={styles.listStack}>
            {MOCK_INTERNAL_REPORTS.map((acta) => (
              <View key={acta.id} style={styles.actaRowCard}>
                <View style={styles.actaMetaInfo}>
                  <Text style={styles.actaRivalTxt}>vs {acta.rival}</Text>
                  <Text style={styles.actaDateTxt}>{acta.round} · {acta.date} · Resultado: {acta.score}</Text>
                </View>

                {/* ACCIONES COMPLETAS DEL ACTA INTERNA */}
                <View style={styles.actaBtnGroup}>
                  <TouchableOpacity 
                    style={styles.actaBtnPrimary}
                    onPress={() => handleOpenPdf(
                      `CD JESUITAS · ACTA INTERNA DEL PARTIDO`,
                      `Partido: CD Jesuitas Cadete B vs ${acta.rival} · ${acta.round} (${acta.date})`,
                      true,
                      acta.fileName,
                      [
                        `Competición: Liga Preferente Cadete (Grupo 2)`,
                        `Encuentro: CD Jesuitas "B" vs ${acta.rival}`,
                        `Jornada: ${acta.round} · Fecha: ${acta.date}`,
                        `Resultado Final: ${acta.score}`,
                        `Delegado Confirmador: Carlos Ruiz`,
                        `Estado: Documento interno de comprobación`,
                      ]
                    )}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="eye" size={14} color={colors.navyDark} />
                    <Text style={styles.actaBtnPrimaryTxt}>Ver PDF</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actaBtnSecondary}
                    onPress={() => handleDownloadDoc(true, acta.fileName, `Acta vs ${acta.rival}`)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="download-outline" size={14} color={colors.skyGlow} />
                    <Text style={styles.actaBtnSecondaryTxt}>Descargar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.actaBtnSecondary}
                    onPress={() => handleShareDoc(true, `Acta vs ${acta.rival}`)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="share-social-outline" size={14} color={colors.skyGlow} />
                    <Text style={styles.actaBtnSecondaryTxt}>Compartir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

      </View>

      {/* ========================================================================= */}
      {/* MODAL DE VISUALIZACIÓN DE DOCUMENTO PDF FORMATO A4 */}
      {/* ========================================================================= */}
      {selectedDoc && (
        <Modal visible={true} animationType="slide" transparent={false} onRequestClose={() => setSelectedDoc(null)}>
          <View style={styles.modalContainer}>
            
            {/* BARRA SUPERIOR DE CONTROL */}
            <View style={styles.modalTopBar}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalTopTitle}>📄 VISTA PREVIA DEL DOCUMENTO (A4)</Text>
                <Text style={styles.modalTopSub}>{selectedDoc.fileName}</Text>
              </View>
              
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <TouchableOpacity 
                  style={styles.modalActionBtn} 
                  onPress={() => handleDownloadDoc(selectedDoc.isRealActa, selectedDoc.fileName, selectedDoc.title)}
                >
                  <Ionicons name="download-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.modalActionBtnTxt}>Guardar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.modalActionBtn}
                  onPress={() => handleShareDoc(selectedDoc.isRealActa, selectedDoc.title)}
                >
                  <Ionicons name="share-social-outline" size={16} color={colors.skyGlow} />
                  <Text style={styles.modalActionBtnTxt}>Compartir</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setSelectedDoc(null)}>
                  <Ionicons name="close" size={20} color={colors.white} />
                </TouchableOpacity>
              </View>
            </View>

            {/* HOJA DE PAPEL VIRTUAL A4 */}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
              <View style={styles.a4Paper}>
                
                {/* MEMBRETE INSTITUCIONAL */}
                <View style={styles.pdfPaperHeaderRow}>
                  <Image 
                    source={require('../../../assets/images/escudo_jesuitas_exact.png')} 
                    style={styles.pdfPaperEscudoImg} 
                    resizeMode="contain" 
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.pdfPaperClubName}>CLUB DEPORTIVO JESUITAS</Text>
                    <Text style={styles.pdfPaperActaTitle}>EXPEDIENTE DOCUMENTAL</Text>
                  </View>
                </View>
                <View style={styles.pdfPaperDividerLine} />
                <Text style={styles.pdfPaperSubNotice}>
                  Documento interno de consulta oficial · Perfil Delegado
                </Text>

                <View style={styles.pdfPaperTitleBox}>
                  <Text style={styles.pdfPaperDocTitle}>{selectedDoc.title}</Text>
                  <Text style={styles.pdfPaperDocSub}>{selectedDoc.subtitle}</Text>
                </View>

                {/* CONTENIDO DEL DOCUMENTO */}
                <View style={styles.pdfPaperContentGrid}>
                  {selectedDoc.contentLines.map((line, idx) => (
                    <View key={idx} style={styles.pdfPaperContentRow}>
                      <Ionicons name="checkmark-circle" size={16} color="#071A3D" />
                      <Text style={styles.pdfPaperContentTxt}>{line}</Text>
                    </View>
                  ))}
                </View>

                {/* PIE DE PÁGINA A4 */}
                <View style={styles.pdfPaperFooter}>
                  <Text style={styles.pdfPaperFooterTxt}>CD Jesuitas · Sistema de Gestión Deportiva Local</Text>
                  <Text style={styles.pdfPaperFooterTxt}>Archivo: {selectedDoc.fileName} · Verificado por Perfil Delegado</Text>
                </View>

              </View>
            </ScrollView>

          </View>
        </Modal>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 18, paddingBottom: 40 },
  contentDesktop: { maxWidth: 960, alignSelf: 'center', width: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '700' },

  honestNoticeBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.skyPrimary, marginBottom: 16 },
  honestNoticeTxt: { color: colors.white, fontSize: 12, fontWeight: '700', flex: 1 },

  stackGap: { gap: 18 },

  // TARJETAS DE CADA BLOQUE INDEPENDIENTE
  blockCard: { backgroundColor: colors.navyDeep, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border },
  blockHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  blockTitleTxt: { color: colors.white, fontSize: 15, fontWeight: '900', letterSpacing: 0.5 },
  blockSubTxt: { color: colors.textMuted, fontSize: 11, marginTop: 1 },

  listStack: { gap: 10 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  
  dorsalCircle: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(56, 189, 248, 0.15)', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.skyPrimary },
  dorsalTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '900' },

  roleIconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(52, 211, 153, 0.15)', justifyContent: 'center', alignItems: 'center' },
  protocolIconBox: { width: 34, height: 34, borderRadius: 10, backgroundColor: 'rgba(168, 85, 247, 0.15)', justifyContent: 'center', alignItems: 'center' },

  itemNameTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },
  itemSubTxt: { color: colors.textMuted, fontSize: 11, marginTop: 2 },

  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  statusTxt: { fontSize: 10, fontWeight: '800' },

  viewPdfBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.emeraldGlow, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  viewPdfBtnTxt: { color: colors.navyDark, fontSize: 11, fontWeight: '900' },

  // BLOQUE 5: ACTAS INTERNAS
  actaRowCard: { backgroundColor: colors.navyCard, padding: 14, borderRadius: 14, borderWidth: 1, borderColor: colors.border, gap: 12 },
  actaMetaInfo: { gap: 2 },
  actaRivalTxt: { color: colors.white, fontSize: 14, fontWeight: '900' },
  actaDateTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700' },
  
  actaBtnGroup: { flexDirection: 'row', gap: 8 },
  actaBtnPrimary: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.emeraldGlow, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 8 },
  actaBtnPrimaryTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },
  actaBtnSecondary: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255, 255, 255, 0.06)', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  actaBtnSecondaryTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '800' },

  // MODAL VISOR PDF FORMATO A4
  modalContainer: { flex: 1, backgroundColor: colors.navyDark },
  modalTopBar: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: colors.navyDeep, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTopTitle: { color: colors.white, fontSize: 14, fontWeight: '900' },
  modalTopSub: { color: colors.emeraldGlow, fontSize: 11, marginTop: 2 },
  modalCloseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center' },
  modalActionBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.navyCard, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  modalActionBtnTxt: { color: colors.skyGlow, fontSize: 11, fontWeight: '800' },

  a4Paper: { width: '100%', maxWidth: 680, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, marginVertical: 10 },
  pdfPaperHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10 },
  pdfPaperEscudoImg: { width: 44, height: 52 },
  pdfPaperClubName: { color: '#071A3D', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
  pdfPaperActaTitle: { color: '#38BDF8', fontSize: 22, fontWeight: '900', letterSpacing: 1, marginTop: 1 },
  pdfPaperDividerLine: { height: 2, backgroundColor: '#071A3D', marginBottom: 8 },
  pdfPaperSubNotice: { color: '#64748B', fontSize: 11, fontWeight: '600', marginBottom: 18 },

  pdfPaperTitleBox: { backgroundColor: '#F8FAFC', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16 },
  pdfPaperDocTitle: { fontSize: 14, fontWeight: '900', color: '#071A3D' },
  pdfPaperDocSub: { fontSize: 11, color: '#64748B', marginTop: 4, fontWeight: '600' },

  pdfPaperContentGrid: { gap: 10, marginBottom: 20 },
  pdfPaperContentRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  pdfPaperContentTxt: { fontSize: 12, color: '#1E293B', fontWeight: '600' },

  pdfPaperFooter: { marginTop: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#CBD5E1', gap: 2 },
  pdfPaperFooterTxt: { fontSize: 10, color: '#64748B' },
});
