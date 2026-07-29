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

export interface PersonHistoryItem {
  id: string;
  season: string;
  summaryRole: string;
  details?: string;
  createdAt: string;
}

export interface PersonAccountInfo {
  hasAccess: boolean;
  userId?: string;
  email?: string;
  lastLogin?: string;
}

export interface ManagedPerson {
  id: string;
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
  
  // Relaciones
  roles: AppRole[];
  responsibilities: ResponsibilityType[];
  teamAssignments: PersonTeamAssignment[];
  licenses: PersonLicense[];
  account: PersonAccountInfo;
  history: PersonHistoryItem[];
  
  createdAt: string;
  updatedAt: string;
}
