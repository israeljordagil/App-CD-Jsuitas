import { TrainingSchedule } from '../types/schedules';

export interface AthleteMapping {
  athleteId: string;
  athleteName: string;
  teamId: string;
  teamName: string;
  sport: string;
}

export interface GeneratedOccurrence {
  id: string; // Formato determinista: training:{scheduleId}:{dateStr}:{athleteId}
  scheduleId: string;
  childId: string;
  childName: string;
  sport: string;
  team: string;
  title: string;
  type: 'training' | 'match' | 'tournament';
  date: string; // YYYY-MM-DD
  dayNum: number;
  dayName: string;
  time: string; // "15:45 - 17:15"
  startTimeRaw: string; // "15:45"
  endTimeRaw: string;   // "17:15"
  citationTime: string; // "15:30h"
  location: string;
  weather: string;
  carDeparture: string;
  notes?: string;
  googleCalendarUrl?: string;
  icsContent?: string;
}

export interface GenerateOccurrencesParams {
  schedules: TrainingSchedule[];
  year: number;
  monthZeroIndexed: number; // 0 = Enero .. 11 = Diciembre
  activeFilter: { mode: 'all' } | { mode: 'child'; childId: string };
  athletes: AthleteMapping[];
}

/**
 * Función pura para la generación determinista de ocurrencias de entrenamiento a partir
 * de las reglas recurrentes de public.training_schedules para el intervalo especificado.
 */
export function generateTrainingScheduleOccurrences({
  schedules,
  year,
  monthZeroIndexed,
  activeFilter,
  athletes
}: GenerateOccurrencesParams): GeneratedOccurrence[] {
  const monthStr = String(monthZeroIndexed + 1).padStart(2, '0');
  const daysInMonth = new Date(year, monthZeroIndexed + 1, 0).getDate();
  const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const targetAthletes = activeFilter.mode === 'all'
    ? athletes
    : athletes.filter(a => a.athleteId === activeFilter.childId);

  const occurrences: GeneratedOccurrence[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${year}-${monthStr}-${dayStr}`;
    const dateObj = new Date(year, monthZeroIndexed, day);
    const jsDay = dateObj.getDay();
    const isoWeekday = jsDay === 0 ? 7 : jsDay;
    const dayName = dayNames[jsDay];

    for (const athlete of targetAthletes) {
      const matchingRules = schedules.filter(rule => {
        if (!rule.isActive) return false;
        if (rule.status !== 'ACTIVE') return false;
        if (rule.teamId !== athlete.teamId) return false;
        if (rule.weekday !== isoWeekday) return false;
        if (dateStr < rule.validFrom || dateStr > rule.validUntil) return false;
        return true;
      });

      for (const rule of matchingRules) {
        const startFormatted = rule.startTime.substring(0, 5);
        const endFormatted = rule.endTime.substring(0, 5);

        // Hora de citación (15 minutos antes)
        const [h, m] = startFormatted.split(':').map(Number);
        const citationTotalMin = h * 60 + m - 15;
        const citH = Math.floor(citationTotalMin / 60);
        const citM = citationTotalMin % 60;
        const citationTime = `${String(citH).padStart(2, '0')}:${String(citM).padStart(2, '0')}h`;

        // ID determinista inmutable: training:{scheduleId}:{dateStr}:{athleteId}
        const occurrenceId = `training:${rule.id}:${dateStr}:${athlete.athleteId}`;

        const title = `Entrenamiento ${athlete.teamName}`;
        const location = rule.locationText || 'Campo CD Jesuitas (Valencia)';
        const description = rule.notes ? `${rule.notes} (${athlete.athleteName})` : `Entrenamiento oficial ${athlete.teamName} - ${athlete.athleteName}`;

        const googleCalendarUrl = createGoogleCalendarUrl({
          title,
          dateStr,
          startTime: startFormatted,
          endTime: endFormatted,
          description,
          location
        });

        const icsContent = createIcsCalendarContent({
          uid: occurrenceId,
          title,
          dateStr,
          startTime: startFormatted,
          endTime: endFormatted,
          description,
          location
        });

        occurrences.push({
          id: occurrenceId,
          scheduleId: rule.id,
          childId: athlete.athleteId,
          childName: athlete.athleteName,
          sport: athlete.sport,
          team: athlete.teamName,
          title,
          type: 'training',
          date: dateStr,
          dayNum: day,
          dayName,
          time: `${startFormatted} - ${endFormatted}`,
          startTimeRaw: startFormatted,
          endTimeRaw: endFormatted,
          citationTime,
          location,
          weather: '☀️ 20°C • Despejado',
          carDeparture: `${citationTime} desde casa`,
          notes: rule.notes || 'Entrenamiento oficial programado',
          googleCalendarUrl,
          icsContent
        });
      }
    }
  }

  return occurrences;
}

/**
 * Generador determinista de URL para Google Calendar
 */
export function createGoogleCalendarUrl(event: {
  title: string;
  dateStr: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  description?: string;
  location?: string;
}): string {
  const cleanDate = event.dateStr.replace(/-/g, '');
  const cleanStart = event.startTime.replace(':', '') + '00';
  const cleanEnd = event.endTime.replace(':', '') + '00';

  const startUtcStr = `${cleanDate}T${cleanStart}`;
  const endUtcStr = `${cleanDate}T${cleanEnd}`;

  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description || 'Entrenamiento oficial CD Jesuitas');
  const loc = encodeURIComponent(event.location || 'Campo CD Jesuitas Valencia');
  const ctz = encodeURIComponent('Europe/Madrid');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUtcStr}/${endUtcStr}&ctz=${ctz}&details=${details}&location=${loc}`;
}

/**
 * Generador determinista de archivo .ics para Apple Calendar / iCal
 */
export function createIcsCalendarContent(event: {
  uid: string;
  title: string;
  dateStr: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string;   // HH:MM
  description?: string;
  location?: string;
}): string {
  const cleanDate = event.dateStr.replace(/-/g, '');
  const cleanStart = event.startTime.replace(':', '') + '00';
  const cleanEnd = event.endTime.replace(':', '') + '00';

  const dtStart = `${cleanDate}T${cleanStart}`;
  const dtEnd = `${cleanDate}T${cleanEnd}`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const summary = event.title.replace(/[,;\\]/g, '\\$&');
  const desc = (event.description || 'Entrenamiento oficial CD Jesuitas').replace(/[,;\\]/g, '\\$&');
  const loc = (event.location || 'Campo CD Jesuitas Valencia').replace(/[,;\\]/g, '\\$&');

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CD Jesuitas//App Movil Oficial//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART;TZID=Europe/Madrid:${dtStart}`,
    `DTEND;TZID=Europe/Madrid:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${loc}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return icsLines.join('\r\n');
}
