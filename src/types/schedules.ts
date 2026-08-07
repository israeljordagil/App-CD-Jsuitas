export type TrainingScheduleStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type IsoWeekday = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1 = Lunes, 7 = Domingo

export interface TrainingSchedule {
  id: string;
  teamId: string;
  season: string;
  weekday: IsoWeekday;
  startTime: string; // Formato TIME 'HH:MM:SS' o 'HH:MM'
  endTime: string;   // Formato TIME 'HH:MM:SS' o 'HH:MM'
  validFrom: string; // Formato DATE 'YYYY-MM-DD'
  validUntil: string;// Formato DATE 'YYYY-MM-DD'
  timezone: 'Europe/Madrid' | string;
  facilityId: string | null;
  pitchId: string | null;
  locationText: string | null;
  status: TrainingScheduleStatus;
  isActive: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
}
