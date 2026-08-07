export type AppRole =
  | 'ADMIN_GENERAL'
  | 'DIR_DEPORTIVA'
  | 'COORDINADOR'
  | 'ENTRENADOR'
  | 'SEGUNDO_ENTRENADOR'
  | 'PREPARADOR_FISICO'
  | 'FISIOTERAPEUTA'
  | 'DELEGADO'
  | 'FAMILIA';

export type UserStatus = 'ACTIVE' | 'DISABLED' | 'PENDING';

export interface UserRoleAssignment {
  role: AppRole;
  sport?: string | null;      // Fútbol, Fútbol Sala, Baloncesto, Voleibol
  category?: string | null;   // Cadete, Infantil, Alevín, etc.
  team?: string | null;       // Cadete B, Infantil A, etc.
}

export interface ManagedUser {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  status: UserStatus;
  roles: AppRole[];
  assignments?: UserRoleAssignment[]; // Asignaciones temporales en Fase 1
  createdAt: string;
}
