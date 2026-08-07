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

export type FootballFormat = 'FOOTBALL_11' | 'FOOTBALL_8' | 'FOOTBALL_5';

export type TeamLevel = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'FEMENINO' | 'UNICO';

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
  clubId?: string;        // Identificador de club opcional (arquitectura multiclub)
  internalCode: string;   // Código visible, único e inmutable: EQU-000001, EQU-000002...
  name: string;           // Nombre completo del equipo (ej. "Alevín A", "Cadete Femenino")
  shortName: string;      // Abreviatura inmutable (ej. "JUV-A", "CAD-FEM", "QUE-U")
  category: TeamCategory; // Categoría escrita como texto (ej. "Alevín", "Cadete")
  sport: string;          // Deporte escrito como texto (ej. "Fútbol")
  footballFormat: FootballFormat; // 'FOOTBALL_11' | 'FOOTBALL_8' | 'FOOTBALL_5'
  gender?: TeamGender | null;     // 'MASCULINO' | 'FEMENINO' | 'MIXTO' | null (null = pendiente de validación)
  level: TeamLevel;       // 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'FEMENINO' | 'UNICO'
  season: string;         // '2026/2027'
  status: TeamStatus;     // 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  isActive: boolean;      // Estado operativo activo
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
