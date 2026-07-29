import { AppRole } from './roles';

export type PersonStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export type TechnicalLicenseType = 
  | 'UEFA PRO' 
  | 'UEFA A' 
  | 'UEFA B' 
  | 'UEFA C' 
  | 'EPR' 
  | 'Sin licencia';

export type ResponsibilityType = 
  | 'Administración' 
  | 'Material' 
  | 'Instalaciones' 
  | 'Delegado de Campo' 
  | 'Metodología' 
  | 'Coordinador F8' 
  | 'Coordinador F11' 
  | 'Responsable Médico';

export type StaffPositionTitle = 
  | 'Primer Entrenador' 
  | 'Segundo Entrenador' 
  | 'Coordinador de Categoría' 
  | 'Delegado de Equipo' 
  | 'Preparador Físico' 
  | 'Entrenador de Porteros';

export interface PersonTeamAssignment {
  id: string;
  teamId: string;
  teamName: string;
  category: string;
  sport: string;
  positionTitle: StaffPositionTitle;
  season: string;
  isActive: boolean;
}

export interface PersonLicense {
  id: string;
  licenseType: TechnicalLicenseType;
  licenseNumber?: string;
  issuer?: string;
  expiryDate?: string;
  isValid: boolean;
}

export interface PersonEventHistoryItem {
  id: string;
  date: string;     // ISO String o Fecha legible
  user: string;     // Usuario que realizó la acción
  action: string;   // Acción realizada (ej. 'Creación de expediente', 'Rol añadido')
  detail: string;   // Detalle técnico del cambio
}

export interface PersonAccountInfo {
  hasAccess: boolean;
  userId?: string;
  email?: string;
  lastLogin?: string;
}

export interface ManagedPerson {
  id: string;             // UUID interno
  code: string;           // Código visible e inmutable: PER-000001, PER-000002...
  firstName: string;
  lastName: string;
  fullName: string;
  docId?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: 'M' | 'F' | 'OTHER';
  photoUrl?: string;
  status: PersonStatus;
  
  // Relaciones Núcleo
  roles: AppRole[];
  responsibilities: ResponsibilityType[];
  teamAssignments: PersonTeamAssignment[];
  licenses: PersonLicense[];
  account: PersonAccountInfo;
  
  // Historial Auditado de Eventos
  eventHistory: PersonEventHistoryItem[];
  
  // Auditoría
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
  lastAccess?: string;
  lastModified?: string;
}
