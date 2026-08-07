import { AppRole } from './roles';

export interface CanonicalPersona {
  id: string;
  fullName: string;
  firstName: string | null;
  lastName: string | null;
  secondLastName: string | null;
  email: string | null;
  phone: string | null;
  preferredLanguage: string;
  status: string;
  avatarUrl?: string | null;
  birthDate?: string | null;
}

export interface RoleAssignmentDetail {
  id: string;
  role: AppRole;
  scopeType: 'CLUB' | 'SPORT' | 'CATEGORY' | 'TEAM' | 'FOOTBALL_11' | string;
  scopeId: string | null;
  deporteCodigo: string | null;
  categoriaId: string | null;
  equipoId: string | null;
  equipoName?: string | null;
  temporadaId: string | null;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'INACTIVE' | string;
}

export interface ResolvedIdentityScope {
  hasGlobalAccess: boolean;               // Para ADMIN_GENERAL
  hasF11TransversalAccess: boolean;       // Para PREPARADOR_FISICO y FISIOTERAPEUTA
  assignedCategoryIds: string[];
  assignedTeamIds: string[];
  assignedSports: string[];
}

export interface LinkedPlayerFamilyRef {
  id: string;
  name: string;
  parentesco: string;
  responsibilityLevel: string;
  isPrimaryReference: boolean;
  dorsal?: string;
  position?: string;
  team?: string;
}

export interface ResolvedIdentity {
  persona: CanonicalPersona;
  roles: AppRole[];
  availableProfiles: AppRole[];
  assignments: RoleAssignmentDetail[];
  teams: Array<{ id: string; name?: string }>;
  scopes: ResolvedIdentityScope;
  linkedPlayers: LinkedPlayerFamilyRef[];
  recommendedProfile: AppRole | null;
  requiresProfileSelector: boolean;
}
