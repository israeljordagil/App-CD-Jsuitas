export type TeamStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type TeamGender = 'MASCULINO' | 'FEMENINO' | 'MIXTO';

export type TeamCategory = 
  | 'Querubín' 
  | 'Prebenjamín' 
  | 'Benjamín' 
  | 'Alevín' 
  | 'Infantil' 
  | 'Cadete' 
  | 'Juvenil';

export interface TeamStaffMember {
  personId: string;
  personCode: string;
  fullName: string;
  positionTitle: string; // 'Primer Entrenador', 'Segundo Entrenador', 'Coordinador', etc.
}

export interface TeamHistoryEvent {
  id: string;
  date: string;
  user: string;
  action: string;
  detail: string;
}

export interface ManagedTeam {
  id: string;             // UUID interno
  internalCode: string;   // Código visible, único e inmutable: EQU-000001, EQU-000002...
  name: string;           // Nombre completo del equipo (ej. "Alevín A", "Cadete Femenino"). ¡SIN CAMPO letter!
  category: TeamCategory; // Categoría escrita como texto (ej. "Alevín", "Cadete")
  sport: string;          // Deporte escrito como texto (ej. "Fútbol")
  gender: TeamGender;     // 'MASCULINO' | 'FEMENINO' | 'MIXTO'
  season: string;         // '2026/2027'
  status: TeamStatus;     // 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  observations?: string;
  
  // Cuerpo técnico vinculado mediante person_team_assignments
  staff: TeamStaffMember[];
  
  // Historial auditado de eventos del equipo
  history: TeamHistoryEvent[];
  
  // Auditoría
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}
