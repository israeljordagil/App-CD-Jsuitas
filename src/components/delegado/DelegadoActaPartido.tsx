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
  accentBlue: '#2563EB',
};

// =============================================================================
// ESTRUCTURA DE DATOS ÚNICA Y TIPADA: MatchReportData (ARQUITECTURA DE ACTAS)
// =============================================================================

export interface MatchReportGoal {
  minute: number;
  player: string;
  dorsal: string;
  team: string;
  isPenalty: boolean;
  scoreAfter: string;
}

export interface MatchReportPenaltyMissed {
  minute: number;
  player: string;
  dorsal: string;
  team: string;
  reason: string;
}

export interface MatchReportCard {
  minute: number;
  player: string;
  dorsal: string;
  team: string;
  type: 'YELLOW' | 'RED' | 'SECOND_YELLOW';
}

export interface MatchReportInjury {
  minute: number;
  player: string;
  dorsal: string;
  team: string;
  desc: string;
}

export interface MatchReportSubstitution {
  minute: number;
  outPlayer: string;
  inPlayer: string;
  team: string;
}

export interface MatchReportData {
  matchId: string;
  teamId: string;
  seasonId: string;
  actaType: 'DELEGADO';
  version: number;
  competition: string;
  category: string;
  round: string;
  date: string;
  time: string;
  facility: string;
  field: string;
  referee: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  goals: MatchReportGoal[];
  penaltiesMissed: MatchReportPenaltyMissed[];
  yellowCards: MatchReportCard[];
  redCards: MatchReportCard[];
  secondYellows: MatchReportCard[];
  injuries: MatchReportInjury[];
  substitutions: MatchReportSubstitution[];
  incidences: string;
  summary: {
    goalsFor: number;
    goalsAgainst: number;
    yellowCards: number;
    redCards: number;
    injuries: number;
    substitutions: number;
  };
  confirmedBy: string;
  confirmedAt: string;
}

// FUENTE ÚNICA DE DATOS MOCK TIPADA
const MOCK_MATCH_REPORT_DATA: MatchReportData = {
  matchId: 'cadete-b-live-1',
  teamId: 'cadete-b',
  seasonId: '2025-2026',
  actaType: 'DELEGADO',
  version: 1,
  competition: 'Liga Preferente Cadete (Grupo 2)',
  category: 'Cadete',
  round: 'Jornada 14',
  date: '2026-08-08',
  time: '10:30 hs',
  facility: 'Campo Municipal San Gregorio',
  field: 'Campo 1 (Césped Artificial)',
  referee: 'Martínez Pastor, Alejandro (Colegio Valenciano)',
  homeTeam: 'CD JESUITAS "B"',
  awayTeam: 'TORRENT CF "A"',
  homeScore: 2,
  awayScore: 1,
  goals: [
    { minute: 14, player: 'Alejandro Gómez', dorsal: '9', team: 'CD Jesuitas', isPenalty: false, scoreAfter: '1 - 0' },
    { minute: 52, player: 'Carlos Ruíz', dorsal: '10', team: 'Torrent CF', isPenalty: true, scoreAfter: '1 - 1' },
    { minute: 78, player: 'Iván Martínez', dorsal: '7', team: 'CD Jesuitas', isPenalty: false, scoreAfter: '2 - 1' },
  ],
  penaltiesMissed: [
    { minute: 34, player: 'David Navarro', dorsal: '6', team: 'Torrent CF', reason: 'Detenido por Álvaro (#1 POR)' }
  ],
  yellowCards: [
    { minute: 28, player: 'Hugo Sánchez', dorsal: '4', team: 'CD Jesuitas', type: 'YELLOW' },
    { minute: 51, player: 'Lucas Ruiz', dorsal: '5', team: 'CD Jesuitas', type: 'YELLOW' },
    { minute: 64, player: 'David Navarro', dorsal: '6', team: 'Torrent CF', type: 'YELLOW' },
  ],
  redCards: [],
  secondYellows: [],
  injuries: [
    { minute: 62, player: 'Martín Pérez', dorsal: '3', team: 'CD Jesuitas', desc: 'Molestias Isquiotibiales (Atendido por Delegado)' },
  ],
  substitutions: [
    { minute: 41, outPlayer: 'Hugo Sánchez (#4 DFC)', inPlayer: 'Diego (#12 DFC)', team: 'CD Jesuitas' },
    { minute: 65, outPlayer: 'Martín Pérez (#3 LI)', inPlayer: 'Ian (#16 EI)', team: 'CD Jesuitas' },
    { minute: 72, outPlayer: 'Javi (#6 MC)', inPlayer: 'Álex (#17 MC)', team: 'CD Jesuitas' },
  ],
  incidences: 'Sin incidencias adicionales',
  summary: {
    goalsFor: 2,
    goalsAgainst: 1,
    yellowCards: 3,
    redCards: 0,
    injuries: 1,
    substitutions: 3,
  },
  confirmedBy: 'Carlos Ruiz (Delegado CD Jesuitas)',
  confirmedAt: '',
};

// SANITIZACIÓN DEL NOMBRE DE ARCHIVO GENERADO DE FORMA DINÁMICA
export const generatePdfFileName = (data: MatchReportData): string => {
  const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');
  const home = sanitize(data.homeTeam);
  const away = sanitize(data.awayTeam);
  const dateStr = data.date;
  return `Acta_Delegado_${data.category}B_${home}_${away}_${dateStr}_v${data.version}.pdf`;
};

// GENERADOR DEL PLANTILLADO HTML5 A4 CON MEMBRETE INSTITUCIONAL OFICIAL DEL CLUB
export const generateMatchReportHtml = (data: MatchReportData): string => {
  const fileName = generatePdfFileName(data);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>${fileName}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; color: #020814; background: #ffffff; }
    
    /* MEMBRETE OFICIAL INSTITUCIONAL */
    .club-membrete-row { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
    .club-title { font-size: 16px; font-weight: 900; color: #071A3D; letter-spacing: 0.5px; text-transform: uppercase; margin: 0; }
    .acta-title { font-size: 22px; font-weight: 900; color: #38BDF8; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
    .header-divider { height: 2px; background-color: #071A3D; margin-bottom: 8px; }
    .sub-notice { font-size: 11px; color: #64748B; font-weight: 600; margin-bottom: 22px; }

    .table-meta { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table-meta td { padding: 8px 12px; border: 1px solid #E2E8F0; font-size: 12px; }
    .lbl { font-weight: 800; color: #475569; background: #F8FAFC; width: 25%; }
    .val { color: #0F172A; font-weight: 600; }
    .score-banner { text-align: center; background: #091B3E; color: #ffffff; padding: 16px; border-radius: 12px; margin-bottom: 24px; border: 2px solid #34D399; }
    .score-txt { font-size: 34px; font-weight: 900; color: #34D399; margin: 4px 0; }
    .sec-title { font-size: 14px; font-weight: 900; color: #071A3D; text-transform: uppercase; border-bottom: 2px solid #071A3D; padding-bottom: 6px; margin-top: 20px; margin-bottom: 12px; }
    .table-data { width: 100%; border-collapse: collapse; margin-bottom: 16px; page-break-inside: avoid; }
    .table-data th { background: #071A3D; color: #ffffff; font-size: 11px; text-align: left; padding: 8px 10px; text-transform: uppercase; }
    .table-data td { padding: 8px 10px; border-bottom: 1px solid #E2E8F0; font-size: 12px; color: #1E293B; }
    .summary-box { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px; page-break-inside: avoid; }
    .sum-tile { flex: 1; min-width: 100px; background: #F8FAFC; border: 1px solid #CBD5E1; padding: 10px; border-radius: 8px; text-align: center; }
    .sum-num { font-size: 20px; font-weight: 900; color: #071A3D; }
    .sum-lbl { font-size: 10px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-top: 2px; }
    .footer { margin-top: 30px; padding: 14px; background: #F1F5F9; border-radius: 10px; font-size: 11px; color: #475569; border: 1px dashed #94A3B8; page-break-inside: avoid; }
  </style>
</head>
<body>
  <!-- MEMBRETE OFICIAL INSTITUCIONAL CON ESCUDO CLUB -->
  <div class="club-membrete-row">
    <svg width="44" height="52" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 5 L90 20 L90 70 C90 95 50 115 50 115 C50 115 10 95 10 70 L10 20 Z" fill="#071A3D" stroke="#38BDF8" stroke-width="4"/>
      <path d="M25 35 L75 35 M25 50 L75 50 M50 20 L50 100" stroke="#FFFFFF" stroke-width="5"/>
      <circle cx="50" cy="42" r="10" fill="#F59E0B"/>
      <text x="50" y="85" font-family="sans-serif" font-weight="900" font-size="16" fill="#38BDF8" text-anchor="middle">CDJ</text>
    </svg>
    <div>
      <div class="club-title">CLUB DEPORTIVO JESUITAS</div>
      <div class="acta-title">ACTA DEL PARTIDO</div>
    </div>
  </div>
  <div class="header-divider"></div>
  <div class="sub-notice">Documento interno de comprobación. No sustituye al acta oficial federativa.</div>

  <table class="table-meta">
    <tr>
      <td class="lbl">Competición:</td>
      <td class="val">${data.competition}</td>
      <td class="lbl">Jornada / Cat:</td>
      <td class="val">${data.round} (${data.category})</td>
    </tr>
    <tr>
      <td class="lbl">Fecha y Hora:</td>
      <td class="val">${data.date} · ${data.time}</td>
      <td class="lbl">Instalación:</td>
      <td class="val">${data.facility} (${data.field})</td>
    </tr>
    <tr>
      <td class="lbl">Árbitro:</td>
      <td class="val" colspan="3">${data.referee}</td>
    </tr>
  </table>

  <div class="score-banner">
    <div style="font-size: 13px; font-weight: 800; letter-spacing: 1px; color: #94A3B8;">${data.homeTeam} vs ${data.awayTeam}</div>
    <div class="score-txt">${data.homeScore} - ${data.awayScore}</div>
    <div style="font-size: 11px; font-weight: 700; color: #34D399;">RESULTADO FINAL VALIDADO</div>
  </div>

  <div class="sec-title">Goles y Penaltis Marcados</div>
  <table class="table-data">
    <thead>
      <tr>
        <th style="width: 12%;">Min.</th>
        <th>Jugador / Dorsal</th>
        <th>Equipo</th>
        <th style="width: 25%;">Detalle</th>
      </tr>
    </thead>
    <tbody>
      ${data.goals.map(g => `
        <tr>
          <td><strong>${g.minute}'</strong></td>
          <td>#${g.dorsal} ${g.player}</td>
          <td>${g.team}</td>
          <td>${g.isPenalty ? 'Gol de Penalti' : 'Gol de Campo'} (${g.scoreAfter})</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  ${data.penaltiesMissed.length > 0 ? `
    <div class="sec-title" style="color: #DC2626;">Penaltis Fallados (No contabilizados como gol)</div>
    <table class="table-data">
      <thead>
        <tr>
          <th style="width: 12%;">Min.</th>
          <th>Jugador / Dorsal</th>
          <th>Equipo</th>
          <th>Observación</th>
        </tr>
      </thead>
      <tbody>
        ${data.penaltiesMissed.map(pm => `
          <tr>
            <td><strong>${pm.minute}'</strong></td>
            <td>#${pm.dorsal} ${pm.player}</td>
            <td>${pm.team}</td>
            <td>${pm.reason}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  ` : ''}

  <div class="sec-title">Tarjetas y Amonestaciones</div>
  <table class="table-data">
    <thead>
      <tr>
        <th style="width: 12%;">Min.</th>
        <th>Jugador / Dorsal</th>
        <th>Equipo</th>
        <th>Sanción</th>
      </tr>
    </thead>
    <tbody>
      ${data.yellowCards.map(c => `
        <tr>
          <td><strong>${c.minute}'</strong></td>
          <td>#${c.dorsal} ${c.player}</td>
          <td>${c.team}</td>
          <td><span style="color: #D97706; font-weight: 800;">Tarjeta Amarilla</span></td>
        </tr>
      `).join('')}
      ${data.secondYellows.map(c => `
        <tr>
          <td><strong>${c.minute}'</strong></td>
          <td>#${c.dorsal} ${c.player}</td>
          <td>${c.team}</td>
          <td><span style="color: #DC2626; font-weight: 800;">2ª Amarilla / Expulsión</span></td>
        </tr>
      `).join('')}
      ${data.redCards.map(c => `
        <tr>
          <td><strong>${c.minute}'</strong></td>
          <td>#${c.dorsal} ${c.player}</td>
          <td>${c.team}</td>
          <td><span style="color: #DC2626; font-weight: 800;">Tarjeta Roja Directa</span></td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="sec-title">Lesiones Registradas</div>
  <table class="table-data">
    <thead>
      <tr>
        <th style="width: 12%;">Min.</th>
        <th>Jugador / Dorsal</th>
        <th>Descripción / Observación</th>
      </tr>
    </thead>
    <tbody>
      ${data.injuries.map(inj => `
        <tr>
          <td><strong>${inj.minute}'</strong></td>
          <td>#${inj.dorsal} ${inj.player}</td>
          <td>${inj.desc}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="sec-title">Sustituciones</div>
  <table class="table-data">
    <thead>
      <tr>
        <th style="width: 12%;">Min.</th>
        <th>Jugador Saliente (Sale)</th>
        <th>Jugador Entrante (Entra)</th>
      </tr>
    </thead>
    <tbody>
      ${data.substitutions.map(s => `
        <tr>
          <td><strong>${s.minute}'</strong></td>
          <td style="color: #DC2626;">${s.outPlayer}</td>
          <td style="color: #059669;">${s.inPlayer}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

  <div class="sec-title">Incidencias Registradas</div>
  <p style="font-size: 12px; color: #475569; font-weight: 600;">${data.incidences}</p>

  <div class="sec-title">Resumen Cómputo Total</div>
  <div class="summary-box">
    <div class="sum-tile"><div class="sum-num">${data.summary.goalsFor}</div><div class="sum-lbl">Goles Favor</div></div>
    <div class="sum-tile"><div class="sum-num">${data.summary.goalsAgainst}</div><div class="sum-lbl">Goles Contra</div></div>
    <div class="sum-tile"><div class="sum-num" style="color: #D97706;">${data.summary.yellowCards}</div><div class="sum-lbl">Amarillas</div></div>
    <div class="sum-tile"><div class="sum-num" style="color: #DC2626;">${data.summary.redCards}</div><div class="sum-lbl">Rojas</div></div>
    <div class="sum-tile"><div class="sum-num">${data.summary.injuries}</div><div class="sum-lbl">Lesiones</div></div>
    <div class="sum-tile"><div class="sum-num">${data.summary.substitutions}</div><div class="sum-lbl">Sustituciones</div></div>
  </div>

  <div class="footer">
    <div><strong>Confirmado por:</strong> ${data.confirmedBy}</div>
    <div><strong>Fecha y hora exactas:</strong> ${data.confirmedAt || '04/08/2026 11:55:00'}</div>
    <div><strong>ID único del partido:</strong> ${data.matchId} · <strong>Versión:</strong> v${data.version}</div>
    <div style="margin-top: 6px; font-size: 10px; color: #94A3B8;">Aviso: Documento interno de control deportivo del CD Jesuitas.</div>
  </div>
</body>
</html>`;
};

export function DelegadoActaPartido() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // ESTADO DE DATOS Y CONFIRMACIÓN DE ACTA DELEGA (MATCH REPORT DATA)
  const [reportData, setReportData] = useState<MatchReportData>(MOCK_MATCH_REPORT_DATA);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // VISTA PREVIA DEL PDF EN PANTALLA COMPLETA
  const [showPdfModal, setShowPdfModal] = useState(false);

function parseEventsForMatchReport(parsed: any, defaultReport: MatchReportData): MatchReportData {
  if (!parsed || !parsed.matchId) return defaultReport;

  const events: any[] = Array.isArray(parsed.events) ? parsed.events : [];
  const homeTeam = parsed.homeTeamLabel || defaultReport.homeTeam;
  const awayTeam = parsed.awayTeamLabel || defaultReport.awayTeam;

  const yellowCards: MatchReportCard[] = [];
  const redCards: MatchReportCard[] = [];
  const secondYellows: MatchReportCard[] = [];
  const goals: MatchReportGoal[] = [];
  const penaltiesMissed: MatchReportPenaltyMissed[] = [];
  const injuries: MatchReportInjury[] = [];
  const substitutions: MatchReportSubstitution[] = [];

  events.forEach((ev: any) => {
    if (!ev || !ev.type) return;

    const minVal = parseInt(String(ev.minute || '0').replace("'", ''), 10) || 0;

    let dorsal = 'S/D';
    let player = 'Jugador';

    if (ev.desc && typeof ev.desc === 'string') {
      const match = ev.desc.match(/^#(\d+)\s+([^(]+)/);
      if (match) {
        dorsal = match[1];
        player = match[2].trim();
      } else {
        player = ev.desc.trim();
      }
    }

    const isRivalEvent = ev.title?.includes('Rival') || ev.desc?.includes(awayTeam) || ev.type === 'GOL_RIVAL';
    const teamName = isRivalEvent ? awayTeam : homeTeam;

    if (ev.type === 'AMARILLA') {
      yellowCards.push({
        minute: minVal,
        player,
        dorsal,
        team: teamName,
        type: 'YELLOW',
      });
    } else if (ev.type === 'ROJA') {
      if (ev.title?.includes('2ª Amarilla')) {
        secondYellows.push({
          minute: minVal,
          player,
          dorsal,
          team: teamName,
          type: 'SECOND_YELLOW',
        });
      } else {
        redCards.push({
          minute: minVal,
          player,
          dorsal,
          team: teamName,
          type: 'RED',
        });
      }
    } else if (ev.type === 'GOL' || ev.type === 'PENALTI' || ev.type === 'PENALTI_GOL' || ev.type === 'GOL_RIVAL') {
      goals.push({
        minute: minVal,
        player,
        dorsal,
        team: teamName,
        isPenalty: ev.type === 'PENALTI' || ev.type === 'PENALTI_GOL',
        scoreAfter: '0 - 0',
      });
    } else if (ev.type === 'PENALTI_FALLADO') {
      penaltiesMissed.push({
        minute: minVal,
        player,
        dorsal,
        team: teamName,
        reason: 'Penalti fallado (Detenido / Fuera)',
      });
    } else if (ev.type === 'LESIÓN') {
      injuries.push({
        minute: minVal,
        player,
        dorsal,
        team: teamName,
        desc: ev.desc || 'Molestias atendidas por el cuerpo técnico',
      });
    } else if (ev.type === 'SUSTITUCIÓN') {
      substitutions.push({
        minute: minVal,
        outPlayer: player,
        inPlayer: 'Sustituto',
        team: teamName,
      });
    }
  });

  yellowCards.sort((a, b) => a.minute - b.minute);
  redCards.sort((a, b) => a.minute - b.minute);
  secondYellows.sort((a, b) => a.minute - b.minute);
  goals.sort((a, b) => a.minute - b.minute);
  substitutions.sort((a, b) => a.minute - b.minute);
  injuries.sort((a, b) => a.minute - b.minute);

  let runningHome = 0;
  let runningAway = 0;
  const goalsWithProgressiveScore = goals.map(g => {
    if (g.team === homeTeam) {
      runningHome++;
    } else {
      runningAway++;
    }
    return {
      ...g,
      scoreAfter: `${runningHome} - ${runningAway}`,
    };
  });

  const hasParsedEvents = Array.isArray(parsed.events);
  const homeGoalsCount = goalsWithProgressiveScore.filter(g => g.team === homeTeam).length;
  const awayGoalsCount = goalsWithProgressiveScore.filter(g => g.team === awayTeam).length;

  const finalGoalsFor = hasParsedEvents && goalsWithProgressiveScore.length > 0 ? homeGoalsCount : (typeof parsed.homeScore === 'number' ? parsed.homeScore : defaultReport.summary.goalsFor);
  const finalGoalsAgainst = hasParsedEvents && goalsWithProgressiveScore.length > 0 ? awayGoalsCount : (typeof parsed.awayScore === 'number' ? parsed.awayScore : defaultReport.summary.goalsAgainst);

  return {
    ...defaultReport,
    matchId: parsed.matchId,
    category: parsed.category || defaultReport.category,
    homeTeam,
    awayTeam,
    homeScore: finalGoalsFor,
    awayScore: finalGoalsAgainst,
    date: parsed.finishedAtFormatted || defaultReport.date,
    goals: hasParsedEvents ? goalsWithProgressiveScore : defaultReport.goals,
    penaltiesMissed: hasParsedEvents ? penaltiesMissed : defaultReport.penaltiesMissed,
    yellowCards: hasParsedEvents ? yellowCards : defaultReport.yellowCards,
    redCards: hasParsedEvents ? redCards : defaultReport.redCards,
    secondYellows: hasParsedEvents ? secondYellows : defaultReport.secondYellows,
    injuries: hasParsedEvents ? injuries : defaultReport.injuries,
    substitutions: hasParsedEvents ? substitutions : defaultReport.substitutions,
    summary: {
      goalsFor: finalGoalsFor,
      goalsAgainst: finalGoalsAgainst,
      yellowCards: hasParsedEvents ? yellowCards.length : defaultReport.summary.yellowCards,
      redCards: hasParsedEvents ? (redCards.length + secondYellows.length) : defaultReport.summary.redCards,
      injuries: hasParsedEvents ? injuries.length : defaultReport.summary.injuries,
      substitutions: hasParsedEvents ? substitutions.length : defaultReport.summary.substitutions,
    }
  };
}

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const stored = window.localStorage.getItem('@cd_jesuitas_active_acta_match') || window.localStorage.getItem('@cd_jesuitas_pending_acta_match');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.matchId) {
            setReportData(prev => parseEventsForMatchReport(parsed, prev));
          }
        }
      } catch (_) {}
    }
  }, []);

  const handleConfirmActa = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.removeItem('@cd_jesuitas_pending_acta_match');
      } catch (_) {}

      try {
        const activeMatchId = reportData.matchId || 'cadete-b-live-1';
        const rawHistory = window.localStorage.getItem('@cd_jesuitas_finished_matches_history');
        if (rawHistory) {
          const historyArray = JSON.parse(rawHistory);
          if (Array.isArray(historyArray)) {
            const idx = historyArray.findIndex((m: any) => m && m.matchId === activeMatchId);
            if (idx >= 0) {
              historyArray[idx] = {
                ...historyArray[idx],
                actaGenerated: true,
                pendingActa: false,
              };
              window.localStorage.setItem('@cd_jesuitas_finished_matches_history', JSON.stringify(historyArray));
            }
          }
        }
      } catch (err) {
        console.warn('[DelegadoActaPartido] History update failed gracefully:', err);
      }
    }
    if (!isConfirmed) {
      const nowStr = new Date().toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setReportData(prev => ({
        ...prev,
        confirmedAt: nowStr,
      }));
      setIsConfirmed(true);
    }
    setShowPdfModal(true);
  };

  const handleDownloadPdf = () => {
    const fileName = generatePdfFileName(reportData);
    const htmlContent = generateMatchReportHtml(reportData);

    if (typeof window !== 'undefined' && window.document) {
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleSharePdf = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: `Acta Interna CD Jesuitas - ${reportData.homeTeam} vs ${reportData.awayTeam}`,
        text: `Acta interna de comprobación del partido ${reportData.homeTeam} vs ${reportData.awayTeam}. Resultado: ${reportData.homeScore}-${reportData.awayScore}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleDownloadPdf();
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
          <Text style={styles.titleTxt}>ACTA DEL PARTIDO</Text>
          <Text style={styles.subtitleTxt}>Documento Oficial Pre-Revisión · Perfil Delegado</Text>
        </View>
        {isConfirmed && (
          <View style={styles.confirmedHeaderBadge}>
            <Ionicons name="checkmark-circle" size={14} color={colors.emeraldGlow} />
            <Text style={styles.confirmedHeaderBadgeTxt}>CONFIRMADA v1</Text>
          </View>
        )}
      </View>

      {/* BANNER INFORMATIVO CLARO DE CONFIRMACIÓN */}
      {isConfirmed && (
        <View style={styles.confirmationBanner}>
          <Ionicons name="checkmark-done-circle" size={24} color={colors.emeraldGlow} />
          <View style={{ flex: 1 }}>
            <Text style={styles.confirmationBannerTitle}>Acta interna generada correctamente</Text>
            <Text style={styles.confirmationBannerDesc}>
              Has verificado los datos del encuentro. La vista previa oficial está disponible a pantalla completa.
            </Text>
          </View>
          <TouchableOpacity style={styles.reopenPdfBtn} onPress={() => setShowPdfModal(true)} activeOpacity={0.85}>
            <Ionicons name="document-text-outline" size={16} color={colors.navyDark} />
            <Text style={styles.reopenPdfBtnTxt}>Ver PDF</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BLOQUE 1: CABECERA Y DATOS DEL PARTIDO (LECTURA DERIVADA DE MatchReportData) */}
      <View style={styles.sectionCard}>
        <View style={styles.cardHeaderRow}>
          <Ionicons name="information-circle-outline" size={20} color={colors.skyGlow} />
          <Text style={styles.cardHeaderTitle}>1. DATOS OFICIALES DEL ENCUENTRO</Text>
        </View>

        <View style={styles.matchMetaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Competición</Text>
            <Text style={styles.metaValue}>{reportData.competition}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Jornada / Categoría</Text>
            <Text style={styles.metaValue}>{reportData.round} · {reportData.category}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Fecha y Hora</Text>
            <Text style={styles.metaValue}>{reportData.date} · {reportData.time}</Text>
          </View>

          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Instalación</Text>
            <Text style={styles.metaValue}>{reportData.facility}</Text>
          </View>

          <View style={[styles.metaItem, { width: '100%' }]}>
            <Text style={styles.metaLabel}>Árbitro Principal</Text>
            <Text style={styles.metaValue}>{reportData.referee}</Text>
          </View>
        </View>

        {/* BLOQUE 2: RESULTADO FINAL DESTACADO */}
        <View style={styles.scoreResultBanner}>
          <View style={styles.scoreTeamBox}>
            <Text style={styles.scoreTeamName}>{reportData.homeTeam}</Text>
            <Text style={styles.scoreTeamBadge}>LOCAL</Text>
          </View>

          <View style={styles.scoreDigitBox}>
            <Text style={styles.scoreDigitTxt}>
              {reportData.homeScore} - {reportData.awayScore}
            </Text>
            <Text style={styles.scoreLabelTxt}>RESULTADO FINAL</Text>
          </View>

          <View style={styles.scoreTeamBox}>
            <Text style={styles.scoreTeamName}>{reportData.awayTeam}</Text>
            <Text style={styles.scoreTeamBadge}>VISITANTE</Text>
          </View>
        </View>
      </View>

      {/* LAYOUT EN COLUMNAS PARA MÓVIL Y DESKTOP */}
      <View style={[styles.twoColGrid, isDesktop && styles.twoColGridDesktop]}>
        
        {/* COLUMNA IZQUIERDA: GOLES, PENALTIS, TARJETAS Y LESIONES */}
        <View style={styles.colStack}>
          
          {/* BLOQUE 3: GOLES Y PENALTIS */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="football-outline" size={20} color={colors.emeraldGlow} />
              <Text style={styles.cardHeaderTitle}>3. GOLES ({reportData.goals.length})</Text>
            </View>

            <View style={styles.listContainer}>
              {reportData.goals.map((g, idx) => (
                <View key={`goal-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{g.minute}'</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventPrimaryTxt}>
                      #{g.dorsal} {g.player} {g.isPenalty ? '⚽ (Penalti)' : '⚽'}
                    </Text>
                    <Text style={styles.eventSubTxt}>{g.team}</Text>
                  </View>
                  <View style={styles.scoreAfterBadge}>
                    <Text style={styles.scoreAfterTxt}>{g.scoreAfter}</Text>
                  </View>
                </View>
              ))}

              {/* SECCIÓN SEPARADA PARA PENALTIS FALLADOS (NO SUMAN A GOL) */}
              {reportData.penaltiesMissed.length > 0 && (
                <View style={styles.missedPenaltyBox}>
                  <Text style={styles.missedPenaltyTitle}>❌ PENALTIS FALLADOS (NO SUMAN A GOL):</Text>
                  {reportData.penaltiesMissed.map((pm, idx) => (
                    <Text key={`pm-${idx}`} style={styles.missedPenaltyTxt}>
                      Min {pm.minute}' · #{pm.dorsal} {pm.player} ({pm.team}) — {pm.reason}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* BLOQUE 4: TARJETAS (AMARILLAS / ROJAS) */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="square-outline" size={20} color={colors.yellowCard} />
              <Text style={styles.cardHeaderTitle}>4. TARJETAS ({reportData.yellowCards.length + reportData.secondYellows.length + reportData.redCards.length})</Text>
            </View>

            <View style={styles.listContainer}>
              {reportData.yellowCards.map((c, idx) => (
                <View key={`y-card-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{c.minute}'</Text>
                  </View>
                  <View style={[styles.cardSquare, styles.yellowCardBg]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventPrimaryTxt}>#{c.dorsal} {c.player}</Text>
                    <Text style={styles.eventSubTxt}>{c.team} · Tarjeta Amarilla</Text>
                  </View>
                </View>
              ))}

              {reportData.secondYellows.map((c, idx) => (
                <View key={`sy-card-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{c.minute}'</Text>
                  </View>
                  <View style={[styles.cardSquare, styles.redCardBg]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventPrimaryTxt}>#{c.dorsal} {c.player}</Text>
                    <Text style={styles.eventSubTxt}>{c.team} · Segunda Amarilla / Expulsión</Text>
                  </View>
                </View>
              ))}

              {reportData.redCards.map((c, idx) => (
                <View key={`r-card-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{c.minute}'</Text>
                  </View>
                  <View style={[styles.cardSquare, styles.redCardBg]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventPrimaryTxt}>#{c.dorsal} {c.player}</Text>
                    <Text style={styles.eventSubTxt}>{c.team} · Tarjeta Roja Directa</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* BLOQUE 5: LESIONES */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="medkit-outline" size={20} color={colors.redCard} />
              <Text style={styles.cardHeaderTitle}>5. LESIONES REGISTRADAS ({reportData.injuries.length})</Text>
            </View>

            <View style={styles.listContainer}>
              {reportData.injuries.map((inj, idx) => (
                <View key={`inj-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{inj.minute}'</Text>
                  </View>
                  <Ionicons name="medical-sharp" size={18} color={colors.redCard} style={{ marginHorizontal: 4 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventPrimaryTxt}>#{inj.dorsal} {inj.player}</Text>
                    <Text style={styles.eventSubTxt}>{inj.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

        </View>

        {/* COLUMNA DERECHA: SUSTITUCIONES, INCIDENCIAS Y RESUMEN AUTOMÁTICO */}
        <View style={styles.colStack}>
          
          {/* BLOQUE 6: SUSTITUCIONES */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="swap-horizontal-outline" size={20} color={colors.skyPrimary} />
              <Text style={styles.cardHeaderTitle}>6. SUSTITUCIONES ({reportData.substitutions.length})</Text>
            </View>

            <View style={styles.listContainer}>
              {reportData.substitutions.map((s, idx) => (
                <View key={`sub-${idx}`} style={styles.eventRow}>
                  <View style={styles.minuteBadge}>
                    <Text style={styles.minuteTxt}>{s.minute}'</Text>
                  </View>
                  <View style={{ flex: 1, gap: 2 }}>
                    <View style={styles.subLineRow}>
                      <Ionicons name="arrow-down-circle" size={14} color={colors.redCard} />
                      <Text style={styles.subOutTxt}>Sale: {s.outPlayer}</Text>
                    </View>
                    <View style={styles.subLineRow}>
                      <Ionicons name="arrow-up-circle" size={14} color={colors.emeraldGlow} />
                      <Text style={styles.subInTxt}>Entra: {s.inPlayer}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* BLOQUE 7: INCIDENCIAS (LECTURA ESTRICTA) */}
          <View style={styles.sectionCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="chatbox-ellipses-outline" size={20} color={colors.textMuted} />
              <Text style={styles.cardHeaderTitle}>7. INCIDENCIAS</Text>
            </View>
            <View style={styles.incidencesBox}>
              <Ionicons name="checkmark-circle-outline" size={18} color={colors.emeraldGlow} />
              <Text style={styles.incidencesTxt}>{reportData.incidences}</Text>
            </View>
          </View>

          {/* BLOQUE 8: RESUMEN AUTOMÁTICO (CÓMPUTO TOTAL COHERENTE DERIVADO DE MatchReportData) */}
          <View style={[styles.sectionCard, styles.summaryCardBorder]}>
            <View style={styles.cardHeaderRow}>
              <Ionicons name="stats-chart-outline" size={20} color={colors.emeraldGlow} />
              <Text style={styles.cardHeaderTitle}>8. RESUMEN AUTOMÁTICO DEL PARTIDO</Text>
            </View>

            <View style={styles.summaryGrid}>
              <View style={styles.summaryTile}>
                <Text style={styles.summaryNumberTxt}>{reportData.summary.goalsFor}</Text>
                <Text style={styles.summaryLabelTxt}>Goles Favor</Text>
              </View>

              <View style={styles.summaryTile}>
                <Text style={styles.summaryNumberTxt}>{reportData.summary.goalsAgainst}</Text>
                <Text style={styles.summaryLabelTxt}>Goles Contra</Text>
              </View>

              <View style={styles.summaryTile}>
                <Text style={[styles.summaryNumberTxt, { color: colors.yellowCard }]}>
                  {reportData.summary.yellowCards}
                </Text>
                <Text style={styles.summaryLabelTxt}>Amarillas</Text>
              </View>

              <View style={styles.summaryTile}>
                <Text style={[styles.summaryNumberTxt, { color: colors.redCard }]}>
                  {reportData.summary.redCards}
                </Text>
                <Text style={styles.summaryLabelTxt}>Rojas</Text>
              </View>

              <View style={styles.summaryTile}>
                <Text style={styles.summaryNumberTxt}>{reportData.summary.injuries}</Text>
                <Text style={styles.summaryLabelTxt}>Lesiones</Text>
              </View>

              <View style={styles.summaryTile}>
                <Text style={styles.summaryNumberTxt}>{reportData.summary.substitutions}</Text>
                <Text style={styles.summaryLabelTxt}>Sustituciones</Text>
              </View>
            </View>
          </View>

        </View>
      </View>

      {/* BLOQUE 9: BOTÓN PRINCIPAL DE CONFIRMACIÓN */}
      <View style={styles.actionFooter}>
        <TouchableOpacity 
          style={styles.confirmBtn} 
          onPress={handleConfirmActa}
          activeOpacity={0.88}
        >
          <Ionicons name={isConfirmed ? "document-text" : "checkmark-circle-outline"} size={22} color={colors.navyDark} />
          <Text style={styles.confirmBtnTxt}>
            {isConfirmed ? "Ver PDF del Acta" : "Confirmar Acta"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================================================= */}
      {/* VISTA PREVIA DEL PDF A PANTALLA COMPLETA (APARICIÓN DIRECTA TRAS CONFIRMAR) */}
      {/* ========================================================================= */}
      <Modal visible={showPdfModal} animationType="slide" transparent={false} onRequestClose={() => setShowPdfModal(false)}>
        <View style={styles.modalFullContainer}>
          {/* BARRA SUPERIOR DE ACCIONES POSTERIORES */}
          <View style={styles.modalTopBar}>
            <View style={{ flex: 1 }}>
              <Text style={styles.modalTopBarTitle}>✅ Acta interna generada correctamente</Text>
              <Text style={styles.modalTopBarSub}>{generatePdfFileName(reportData)}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TouchableOpacity style={styles.modalBtnIcon} onPress={handleDownloadPdf} activeOpacity={0.85}>
                <Ionicons name="download-outline" size={18} color={colors.skyGlow} />
                <Text style={styles.modalBtnIconTxt}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalBtnIcon} onPress={handleSharePdf} activeOpacity={0.85}>
                <Ionicons name="share-social-outline" size={18} color={colors.skyGlow} />
                <Text style={styles.modalBtnIconTxt}>Compartir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setShowPdfModal(false)} activeOpacity={0.85}>
                <Ionicons name="close" size={20} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          {/* VISTA A4 LECTURA COMPLETA SIN CAMPOS EDITABLES */}
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
            <View style={styles.a4PagePaper}>
              
              {/* MEMBRETE INSTITUCIONAL OFICIAL DEL CLUB */}
              <View style={styles.pdfPaperHeaderRow}>
                <Image 
                  source={require('../../../assets/images/escudo_jesuitas_exact.png')} 
                  style={styles.pdfPaperEscudoImg} 
                  resizeMode="contain" 
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.pdfPaperClubName}>CLUB DEPORTIVO JESUITAS</Text>
                  <Text style={styles.pdfPaperActaTitle}>ACTA DEL PARTIDO</Text>
                </View>
              </View>
              <View style={styles.pdfPaperDividerLine} />
              <Text style={styles.pdfPaperSubNotice}>
                Documento interno de comprobación. No sustituye al acta oficial federativa.
              </Text>

              {/* DETALLES DEL ENCUENTRO */}
              <View style={styles.pdfPaperMetaGrid}>
                <Text style={styles.pdfPaperMetaTxt}><strong>Competición:</strong> {reportData.competition}</Text>
                <Text style={styles.pdfPaperMetaTxt}><strong>Jornada:</strong> {reportData.round} ({reportData.category})</Text>
                <Text style={styles.pdfPaperMetaTxt}><strong>Fecha/Hora:</strong> {reportData.date} · {reportData.time}</Text>
                <Text style={styles.pdfPaperMetaTxt}><strong>Instalación:</strong> {reportData.facility} ({reportData.field})</Text>
                <Text style={styles.pdfPaperMetaTxt}><strong>Árbitro:</strong> {reportData.referee}</Text>
              </View>

              {/* MARCADOR FINAL */}
              <View style={styles.pdfPaperScoreBox}>
                <Text style={styles.pdfPaperScoreTeams}>{reportData.homeTeam} vs {reportData.awayTeam}</Text>
                <Text style={styles.pdfPaperScoreDigit}>{reportData.homeScore} - {reportData.awayScore}</Text>
                <Text style={styles.pdfPaperScoreSub}>RESULTADO FINAL CONFIRMADO</Text>
              </View>

              {/* GOLES */}
              <Text style={styles.pdfPaperSecTitle}>Goles y Penaltis Marcados</Text>
              {reportData.goals.map((g, i) => (
                <View key={`pdf-g-${i}`} style={styles.pdfPaperRow}>
                  <Text style={styles.pdfPaperRowTxt}>Min {g.minute}' · #{g.dorsal} {g.player} ({g.team}) — {g.isPenalty ? 'Gol de Penalti' : 'Gol de Campo'} [{g.scoreAfter}]</Text>
                </View>
              ))}

              {reportData.penaltiesMissed.length > 0 && (
                <>
                  <Text style={[styles.pdfPaperSecTitle, { color: colors.redCard }]}>Penaltis Fallados (No contabilizados como gol)</Text>
                  {reportData.penaltiesMissed.map((pm, i) => (
                    <View key={`pdf-pm-${i}`} style={styles.pdfPaperRow}>
                      <Text style={[styles.pdfPaperRowTxt, { color: colors.redCard }]}>Min {pm.minute}' · #{pm.dorsal} {pm.player} ({pm.team}) — {pm.reason}</Text>
                    </View>
                  ))}
                </>
              )}

              {/* TARJETAS */}
              <Text style={styles.pdfPaperSecTitle}>Tarjetas y Amonestaciones</Text>
              {reportData.yellowCards.map((c, i) => (
                <View key={`pdf-yc-${i}`} style={styles.pdfPaperRow}>
                  <Text style={styles.pdfPaperRowTxt}>Min {c.minute}' · #{c.dorsal} {c.player} ({c.team}) — Tarjeta Amarilla</Text>
                </View>
              ))}
              {reportData.secondYellows.map((c, i) => (
                <View key={`pdf-syc-${i}`} style={styles.pdfPaperRow}>
                  <Text style={[styles.pdfPaperRowTxt, { color: colors.redCard }]}>Min {c.minute}' · #{c.dorsal} {c.player} ({c.team}) — Segunda Amarilla / Expulsión</Text>
                </View>
              ))}
              {reportData.redCards.map((c, i) => (
                <View key={`pdf-rc-${i}`} style={styles.pdfPaperRow}>
                  <Text style={[styles.pdfPaperRowTxt, { color: colors.redCard }]}>Min {c.minute}' · #{c.dorsal} {c.player} ({c.team}) — Tarjeta Roja Directa</Text>
                </View>
              ))}

              {/* LESIONES */}
              <Text style={styles.pdfPaperSecTitle}>Lesiones Registradas</Text>
              {reportData.injuries.map((inj, i) => (
                <View key={`pdf-inj-${i}`} style={styles.pdfPaperRow}>
                  <Text style={styles.pdfPaperRowTxt}>Min {inj.minute}' · #{inj.dorsal} {inj.player} — {inj.desc}</Text>
                </View>
              ))}

              {/* SUSTITUCIONES */}
              <Text style={styles.pdfPaperSecTitle}>Sustituciones</Text>
              {reportData.substitutions.map((s, i) => (
                <View key={`pdf-s-${i}`} style={styles.pdfPaperRow}>
                  <Text style={styles.pdfPaperRowTxt}>Min {s.minute}' · Sale: {s.outPlayer} ➔ Entra: {s.inPlayer}</Text>
                </View>
              ))}

              {/* INCIDENCIAS */}
              <Text style={styles.pdfPaperSecTitle}>Incidencias Registradas</Text>
              <Text style={{ fontSize: 12, color: '#334155', marginVertical: 4 }}>{reportData.incidences}</Text>

              {/* RESUMEN */}
              <Text style={styles.pdfPaperSecTitle}>Resumen Cómputo Total</Text>
              <View style={styles.pdfPaperSummaryGrid}>
                <Text style={styles.pdfPaperSummaryItem}>Goles Favor: {reportData.summary.goalsFor}</Text>
                <Text style={styles.pdfPaperSummaryItem}>Goles Contra: {reportData.summary.goalsAgainst}</Text>
                <Text style={styles.pdfPaperSummaryItem}>Amarillas: {reportData.summary.yellowCards}</Text>
                <Text style={styles.pdfPaperSummaryItem}>Rojas: {reportData.summary.redCards}</Text>
                <Text style={styles.pdfPaperSummaryItem}>Lesiones: {reportData.summary.injuries}</Text>
                <Text style={styles.pdfPaperSummaryItem}>Sustituciones: {reportData.summary.substitutions}</Text>
              </View>

              {/* PIE DE PÁGINA */}
              <View style={styles.pdfPaperFooter}>
                <Text style={styles.pdfPaperFooterTxt}>Confirmado por: {reportData.confirmedBy}</Text>
                <Text style={styles.pdfPaperFooterTxt}>Fecha/Hora: {reportData.confirmedAt || '04/08/2026 11:55:00'}</Text>
                <Text style={styles.pdfPaperFooterTxt}>ID Partido: {reportData.matchId} · Versión v{reportData.version}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navyDark },
  content: { padding: 18, paddingBottom: 40 },
  contentDesktop: { maxWidth: 1080, alignSelf: 'center', width: '100%' },

  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  titleTxt: { color: colors.white, fontSize: 20, fontWeight: '900' },
  subtitleTxt: { color: colors.emeraldGlow, fontSize: 13, fontWeight: '700' },
  confirmedHeaderBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(52, 211, 153, 0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: colors.emeraldGlow },
  confirmedHeaderBadgeTxt: { color: colors.emeraldGlow, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 },

  // BANNER TRAS CONFIRMAR
  confirmationBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: 'rgba(52, 211, 153, 0.15)', padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: colors.emeraldGlow, marginBottom: 20 },
  confirmationBannerTitle: { color: colors.emeraldGlow, fontSize: 14, fontWeight: '900' },
  confirmationBannerDesc: { color: colors.white, fontSize: 12, marginTop: 2, lineHeight: 16 },
  reopenPdfBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.emeraldGlow, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  reopenPdfBtnTxt: { color: colors.navyDark, fontSize: 12, fontWeight: '900' },

  // TARJETAS DE SECCIÓN
  sectionCard: { backgroundColor: colors.navyDeep, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: colors.border, marginBottom: 16 },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  cardHeaderTitle: { color: colors.white, fontSize: 14, fontWeight: '900', letterSpacing: 0.5 },

  // CABECERA Y METADATOS
  matchMetaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 16 },
  metaItem: { width: '48%', backgroundColor: colors.navyCard, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  metaLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginBottom: 2 },
  metaValue: { color: colors.white, fontSize: 13, fontWeight: '800' },

  // BANNER DE RESULTADO FINAL
  scoreResultBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: colors.navyCard, padding: 16, borderRadius: 16, borderWidth: 1.5, borderColor: colors.emeraldGlow },
  scoreTeamBox: { alignItems: 'center', flex: 1 },
  scoreTeamName: { color: colors.white, fontSize: 13, fontWeight: '900', textAlign: 'center', marginBottom: 4 },
  scoreTeamBadge: { color: colors.skyGlow, fontSize: 10, fontWeight: '800' },
  scoreDigitBox: { alignItems: 'center', paddingHorizontal: 16 },
  scoreDigitTxt: { color: colors.emeraldGlow, fontSize: 32, fontWeight: '900' },
  scoreLabelTxt: { color: colors.textMuted, fontSize: 10, fontWeight: '800', letterSpacing: 1 },

  // DISPOSICIÓN EN COLUMNAS
  twoColGrid: { gap: 16 },
  twoColGridDesktop: { flexDirection: 'row', alignItems: 'flex-start' },
  colStack: { flex: 1, width: '100%' },

  // LISTAS DE EVENTOS
  listContainer: { gap: 10 },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.navyCard, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  minuteBadge: { backgroundColor: 'rgba(255, 255, 255, 0.08)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  minuteTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '900' },
  eventPrimaryTxt: { color: colors.white, fontSize: 13, fontWeight: '800' },
  eventSubTxt: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
  scoreAfterBadge: { backgroundColor: 'rgba(52, 211, 153, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  scoreAfterTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '900' },

  missedPenaltyBox: { backgroundColor: 'rgba(239, 68, 68, 0.12)', padding: 12, borderRadius: 10, borderWidth: 1, borderColor: colors.redCard, marginTop: 4 },
  missedPenaltyTitle: { color: colors.redCard, fontSize: 11, fontWeight: '900', marginBottom: 4 },
  missedPenaltyTxt: { color: colors.white, fontSize: 12, fontWeight: '700' },

  cardSquare: { width: 14, height: 18, borderRadius: 3 },
  yellowCardBg: { backgroundColor: colors.yellowCard },
  redCardBg: { backgroundColor: colors.redCard },

  subLineRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  subOutTxt: { color: '#FCA5A5', fontSize: 12, fontWeight: '700' },
  subInTxt: { color: colors.emeraldGlow, fontSize: 12, fontWeight: '700' },

  // INCIDENCIAS
  incidencesBox: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.navyCard, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: colors.border },
  incidencesTxt: { color: colors.white, fontSize: 13, fontWeight: '700' },

  // RESUMEN AUTOMÁTICO
  summaryCardBorder: { borderColor: colors.emeraldGlow },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  summaryTile: { width: '31%', backgroundColor: colors.navyCard, padding: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  summaryNumberTxt: { color: colors.emeraldGlow, fontSize: 24, fontWeight: '900' },
  summaryLabelTxt: { color: colors.textMuted, fontSize: 11, fontWeight: '700', marginTop: 2, textAlign: 'center' },

  // PIE DE PÁGINA Y BOTÓN PRINCIPAL
  actionFooter: { marginTop: 8, marginBottom: 20 },
  confirmBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: colors.emeraldGlow, paddingVertical: 16, borderRadius: 16 },
  confirmBtnTxt: { color: colors.navyDark, fontSize: 15, fontWeight: '900', letterSpacing: 0.5 },

  // MODAL VISTA PREVIA FULLSCREEN
  modalFullContainer: { flex: 1, backgroundColor: colors.navyDark },
  modalTopBar: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: colors.navyDeep, borderBottomWidth: 1, borderBottomColor: colors.border },
  modalTopBarTitle: { color: colors.white, fontSize: 15, fontWeight: '900' },
  modalTopBarSub: { color: colors.emeraldGlow, fontSize: 11, marginTop: 2 },
  modalCloseBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.navyCard, justifyContent: 'center', alignItems: 'center' },
  modalBtnIcon: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: colors.navyCard, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.border },
  modalBtnIconTxt: { color: colors.skyGlow, fontSize: 12, fontWeight: '800' },

  // HOJA PAPEL DIGITAL A4 DE LECTURA COMPLETA CON MEMBRETE
  a4PagePaper: { width: '100%', maxWidth: 700, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, marginVertical: 10 },
  
  pdfPaperHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10 },
  pdfPaperEscudoImg: { width: 44, height: 52 },
  pdfPaperClubName: { color: '#071A3D', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 },
  pdfPaperActaTitle: { color: '#38BDF8', fontSize: 22, fontWeight: '900', letterSpacing: 1, marginTop: 1 },
  pdfPaperDividerLine: { height: 2, backgroundColor: '#071A3D', marginBottom: 8 },
  pdfPaperSubNotice: { color: '#64748B', fontSize: 11, fontWeight: '600', marginBottom: 18 },

  pdfPaperMetaGrid: { backgroundColor: '#F8FAFC', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 16, gap: 4 },
  pdfPaperMetaTxt: { fontSize: 11, color: '#1E293B' },

  pdfPaperScoreBox: { backgroundColor: '#091B3E', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 16 },
  pdfPaperScoreTeams: { color: '#94A3B8', fontSize: 11, fontWeight: '800' },
  pdfPaperScoreDigit: { color: '#34D399', fontSize: 28, fontWeight: '900' },
  pdfPaperScoreSub: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },

  pdfPaperSecTitle: { fontSize: 13, fontWeight: '900', color: '#071A3D', borderBottomWidth: 2, borderBottomColor: '#071A3D', paddingBottom: 4, marginTop: 14, marginBottom: 8 },
  pdfPaperRow: { paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  pdfPaperRowTxt: { fontSize: 11, color: '#334155', fontWeight: '600' },

  pdfPaperSummaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginVertical: 10 },
  pdfPaperSummaryItem: { width: '48%', backgroundColor: '#F1F5F9', padding: 8, borderRadius: 6, fontSize: 11, fontWeight: '800', color: '#0F172A' },

  pdfPaperFooter: { marginTop: 20, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#CBD5E1', gap: 2 },
  pdfPaperFooterTxt: { fontSize: 10, color: '#64748B' },
});
