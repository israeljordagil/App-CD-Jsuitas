import { ManagedPerson } from '../types/people';

export const INITIAL_PEOPLE: ManagedPerson[] = [
  // 1. ADMINISTRACIÓN GENERAL
  {
    id: 'a1000001-0000-4000-8000-000000000001',
    code: 'PER-000001',
    firstName: 'Israel',
    lastName: 'Jordá',
    fullName: 'Israel Jordá',
    docId: '48392014A',
    email: 'israel.jorda@cdjesuitas.es',
    phone: '+34 600 111 222',
    status: 'ACTIVE',
    roles: ['ADMIN_GENERAL'],
    responsibilities: ['Administración', 'Instalaciones', 'Material'],
    teamAssignments: [
      { id: 'as-ij-1', teamId: 'b1000001-0000-4000-8000-000000000019', teamName: 'Alevín E', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-ij-2', teamId: 'b1000001-0000-4000-8000-000000000023', teamName: 'Benjamín A', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [
      { id: 'lic-ij-1', licenseType: 'UEFA A', licenseNumber: 'ESP-98234', issuer: 'RFEF', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'israel.jorda@cdjesuitas.es',
      lastLogin: '2026-07-29T09:20:00Z'
    },
    eventHistory: [
      { id: 'ev-ij-1', date: '2025-09-01', user: 'Sistema', action: 'Persona creada', detail: 'Alta inicial del Administrador General (PER-000001).' },
      { id: 'ev-ij-3', date: '2026-07-29', user: 'Israel Jordá', action: 'Equipo asignado', detail: 'Asignación a Alevín E (2º) y Benjamín A (2º).' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T09:20:00Z',
    createdBy: 'Sistema',
    updatedBy: 'Israel Jordá'
  },

  // 2. DIRECCIÓN DEPORTIVA
  {
    id: 'a1000001-0000-4000-8000-000000000002',
    code: 'PER-000002',
    firstName: 'Josep',
    lastName: 'Ferrer',
    fullName: 'Josep Ferrer',
    docId: '20491823B',
    email: 'josep.ferrer@cdjesuitas.es',
    phone: '+34 611 222 333',
    status: 'ACTIVE',
    roles: ['DIR_DEPORTIVA'],
    responsibilities: ['Metodología'],
    teamAssignments: [],
    licenses: [
      { id: 'lic-jf-1', licenseType: 'UEFA PRO', licenseNumber: 'ESP-11029', issuer: 'RFEF', isValid: true }
    ],
    account: { hasAccess: true, email: 'josep.ferrer@cdjesuitas.es', lastLogin: '2026-07-28T18:30:00Z' },
    eventHistory: [{ id: 'ev-jf-1', date: '2024-09-01', user: 'Sistema', action: 'Persona creada', detail: 'Alta de Director Deportivo (PER-000002).' }],
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2026-07-28T18:30:00Z'
  },

  // 3. COORDINACIÓN GENERAL
  {
    id: 'a1000001-0000-4000-8000-000000000003',
    code: 'PER-000003',
    firstName: 'Rubén',
    lastName: 'Cazallas',
    fullName: 'Rubén Cazallas',
    docId: '53194012C',
    email: 'ruben.cazallas@cdjesuitas.es',
    phone: '+34 622 333 444',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    responsibilities: ['Coordinador F11'],
    teamAssignments: [],
    licenses: [{ id: 'lic-rc-1', licenseType: 'UEFA A', isValid: true }],
    account: { hasAccess: true, email: 'ruben.cazallas@cdjesuitas.es', lastLogin: '2026-07-27T16:00:00Z' },
    eventHistory: [{ id: 'ev-rc-1', date: '2025-09-01', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Coordinador F11 (PER-000003).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-27T16:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000004',
    code: 'PER-000004',
    firstName: 'Manu',
    lastName: 'Cáceres',
    fullName: 'Manu Cáceres',
    docId: '44810293D',
    email: 'manu.caceres@cdjesuitas.es',
    phone: '+34 633 444 555',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    responsibilities: ['Coordinador F8'],
    teamAssignments: [],
    licenses: [{ id: 'lic-mc-1', licenseType: 'UEFA B', isValid: true }],
    account: { hasAccess: true, email: 'manu.caceres@cdjesuitas.es', lastLogin: '2026-07-26T11:20:00Z' },
    eventHistory: [{ id: 'ev-mc-1', date: '2025-09-01', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Coordinador F8 (PER-000004).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-26T11:20:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000005',
    code: 'PER-000005',
    firstName: 'Raúl',
    lastName: 'García',
    fullName: 'Raúl García',
    docId: '33910284E',
    email: 'raul.garcia@cdjesuitas.es',
    phone: '+34 644 555 666',
    status: 'ACTIVE',
    roles: ['COORDINADOR', 'ENTRENADOR'],
    responsibilities: ['Coordinador F8'],
    teamAssignments: [
      { id: 'as-rg-1', teamId: 'b1000001-0000-4000-8000-000000000009', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rg-2', teamId: 'b1000001-0000-4000-8000-000000000023', teamName: 'Benjamín A', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-rg-1', licenseType: 'UEFA B', isValid: true }],
    account: { hasAccess: true, email: 'raul.garcia@cdjesuitas.es', lastLogin: '2026-07-28T09:15:00Z' },
    eventHistory: [{ id: 'ev-rg-1', date: '2025-09-01', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Raúl García.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-28T09:15:00Z'
  },

  // 4. ENTRENADORES DEL DOCUMENTO ENTRENADORES 2026 (INCLUYENDO MAX SOLER)
  {
    id: 'a1000001-0000-4000-8000-000000000006',
    code: 'PER-000006',
    firstName: 'Raúl',
    lastName: 'Fuentes',
    fullName: 'Raúl Fuentes',
    email: 'raul.fuentes@cdjesuitas.es',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-rf-1', teamId: 'b1000001-0000-4000-8000-000000000028', teamName: 'Prebenjamín A', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rf-2', teamId: 'b1000001-0000-4000-8000-000000000019', teamName: 'Alevín E', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rf-3', teamId: 'b1000001-0000-4000-8000-000000000009', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-rf-1', licenseType: 'EPR', isValid: true }],
    account: { hasAccess: true, email: 'raul.fuentes@cdjesuitas.es' },
    eventHistory: [{ id: 'ev-rf-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Raúl Fuentes (EPR).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000007',
    code: 'PER-000007',
    firstName: 'Rubén',
    lastName: 'Balaguer',
    fullName: 'Rubén Balaguer',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-rb-1', teamId: 'b1000001-0000-4000-8000-000000000004', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rb-2', teamId: 'b1000001-0000-4000-8000-000000000013', teamName: 'Infantil E', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rb-3', teamId: 'b1000001-0000-4000-8000-000000000021', teamName: 'Alevín G', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-rb-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-rb-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Rubén Balaguer.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000008',
    code: 'PER-000008',
    firstName: 'Nicolás',
    lastName: 'Guillem',
    fullName: 'Nicolás Guillem',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ng-1', teamId: 'b1000001-0000-4000-8000-000000000002', teamName: 'Juvenil B', category: 'Juvenil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-ng-2', teamId: 'b1000001-0000-4000-8000-000000000005', teamName: 'Cadete C', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-ng-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ng-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Nicolás Guillem.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000009',
    code: 'PER-000009',
    firstName: 'Pedro',
    lastName: 'Rado',
    fullName: 'Pedro Rado',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-pr-1', teamId: 'b1000001-0000-4000-8000-000000000010', teamName: 'Infantil B', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-pr-2', teamId: 'b1000001-0000-4000-8000-000000000003', teamName: 'Cadete A', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-pr-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-pr-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Pedro Rado.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000010',
    code: 'PER-000010',
    firstName: 'Daniel',
    lastName: 'Sobero',
    fullName: 'Daniel Sobero',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ds-1', teamId: 'b1000001-0000-4000-8000-000000000004', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-ds-2', teamId: 'b1000001-0000-4000-8000-000000000016', teamName: 'Alevín B', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-ds-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ds-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Daniel Sobero.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000011',
    code: 'PER-000011',
    firstName: 'Dani',
    lastName: 'Roig',
    fullName: 'Dani Roig',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-droig-1', teamId: 'b1000001-0000-4000-8000-000000000011', teamName: 'Infantil C', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-droig-2', teamId: 'b1000001-0000-4000-8000-000000000005', teamName: 'Cadete C', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-droig-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-droig-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Dani Roig.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000012',
    code: 'PER-000012',
    firstName: 'David',
    lastName: 'Cogollos',
    fullName: 'David Cogollos',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-dcog-1', teamId: 'b1000001-0000-4000-8000-000000000031', teamName: 'Querubines', category: 'Querubín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-dcog-2', teamId: 'b1000001-0000-4000-8000-000000000011', teamName: 'Infantil C', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-dcog-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-dcog-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de David Cogollos (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000013',
    code: 'PER-000013',
    firstName: 'Antonio',
    lastName: 'Cogollos',
    fullName: 'Antonio Cogollos',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-acog-1', teamId: 'b1000001-0000-4000-8000-000000000029', teamName: 'Prebenjamín B', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-acog-2', teamId: 'b1000001-0000-4000-8000-000000000006', teamName: 'Cadete D', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-acog-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-acog-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Antonio Cogollos (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000014',
    code: 'PER-000014',
    firstName: 'Sancho',
    lastName: 'Rochina',
    fullName: 'Sancho Rochina',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-sr-1', teamId: 'b1000001-0000-4000-8000-000000000007', teamName: 'Cadete E', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-sr-2', teamId: 'b1000001-0000-4000-8000-000000000025', teamName: 'Benjamín C', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-sr-1', licenseType: 'EPR', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-sr-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Sancho Rochina (EPR).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000015',
    code: 'PER-000015',
    firstName: 'Lucas',
    lastName: 'Longo',
    fullName: 'Lucas Longo',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ll-1', teamId: 'b1000001-0000-4000-8000-000000000007', teamName: 'Cadete E', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-ll-2', teamId: 'b1000001-0000-4000-8000-000000000013', teamName: 'Infantil E', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-ll-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ll-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Lucas Longo.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000016',
    code: 'PER-000016',
    firstName: 'José',
    lastName: 'Montero',
    fullName: 'José Montero',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-jm-1', teamId: 'b1000001-0000-4000-8000-000000000009', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-jm-2', teamId: 'b1000001-0000-4000-8000-000000000017', teamName: 'Alevín C', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-jm-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-jm-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de José Montero.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000017',
    code: 'PER-000017',
    firstName: 'Rubén',
    lastName: 'Boluda',
    fullName: 'Rubén Boluda',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-rbo-1', teamId: 'b1000001-0000-4000-8000-000000000020', teamName: 'Alevín F', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-rbo-2', teamId: 'b1000001-0000-4000-8000-000000000010', teamName: 'Infantil B', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-rbo-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-rbo-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Rubén Boluda (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000018',
    code: 'PER-000018',
    firstName: 'Iván',
    lastName: 'Esteva',
    fullName: 'Iván Esteva',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ie-1', teamId: 'b1000001-0000-4000-8000-000000000016', teamName: 'Alevín B', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-ie-2', teamId: 'b1000001-0000-4000-8000-000000000024', teamName: 'Benjamín B', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-ie-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ie-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Iván Esteva (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000019',
    code: 'PER-000019',
    firstName: 'Daniel',
    lastName: 'Salinas',
    fullName: 'Daniel Salinas',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-dsa-1', teamId: 'b1000001-0000-4000-8000-000000000027', teamName: 'Benjamín E', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-dsa-2', teamId: 'b1000001-0000-4000-8000-000000000012', teamName: 'Infantil D', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-dsa-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-dsa-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Daniel Salinas (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000020',
    code: 'PER-000020',
    firstName: 'Carlos',
    lastName: 'Díaz',
    fullName: 'Carlos Díaz',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-cd-1', teamId: 'b1000001-0000-4000-8000-000000000001', teamName: 'Juvenil A', category: 'Juvenil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-cd-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-cd-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Carlos Díaz.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000021',
    code: 'PER-000021',
    firstName: 'Daniel',
    lastName: 'Escobar',
    fullName: 'Daniel Escobar',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-de-1', teamId: 'b1000001-0000-4000-8000-000000000001', teamName: 'Juvenil A', category: 'Juvenil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-de-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-de-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Daniel Escobar.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000022',
    code: 'PER-000022',
    firstName: 'Miguel',
    lastName: 'Civera',
    fullName: 'Miguel Civera',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mciv-1', teamId: 'b1000001-0000-4000-8000-000000000003', teamName: 'Cadete A', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mciv-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mciv-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Miguel Civera.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000023',
    code: 'PER-000023',
    firstName: 'David',
    lastName: 'Soler',
    fullName: 'David Soler',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-dsoler-1', teamId: 'b1000001-0000-4000-8000-000000000006', teamName: 'Cadete D', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-dsoler-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-dsoler-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de David Soler.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000024',
    code: 'PER-000024',
    firstName: 'Sergio',
    lastName: 'Aceituno',
    fullName: 'Sergio Aceituno',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-sacei-1', teamId: 'b1000001-0000-4000-8000-000000000012', teamName: 'Infantil D', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-sacei-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-sacei-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Sergio Aceituno.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000025',
    code: 'PER-000025',
    firstName: 'Víctor',
    lastName: 'Palacín',
    fullName: 'Víctor Palacín',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-vpal-1', teamId: 'b1000001-0000-4000-8000-000000000015', teamName: 'Alevín A', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-vpal-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-vpal-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Víctor Palacín.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000026',
    code: 'PER-000026',
    firstName: 'Pablo',
    lastName: 'Alhambra',
    fullName: 'Pablo Alhambra',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-palh-1', teamId: 'b1000001-0000-4000-8000-000000000015', teamName: 'Alevín A', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-palh-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-palh-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Pablo Alhambra.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000027',
    code: 'PER-000027',
    firstName: 'Guillem',
    lastName: 'Cardona',
    fullName: 'Guillem Cardona',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-gcard-1', teamId: 'b1000001-0000-4000-8000-000000000017', teamName: 'Alevín C', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-gcard-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-gcard-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Guillem Cardona.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000028',
    code: 'PER-000028',
    firstName: 'Marcos',
    lastName: 'García',
    fullName: 'Marcos García',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mgarc-1', teamId: 'b1000001-0000-4000-8000-000000000018', teamName: 'Alevín D', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mgarc-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mgarc-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Marcos García (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000029',
    code: 'PER-000029',
    firstName: 'Miguel',
    lastName: 'Nieto',
    fullName: 'Miguel Nieto',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mnieto-1', teamId: 'b1000001-0000-4000-8000-000000000018', teamName: 'Alevín D', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mnieto-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mnieto-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Miguel Nieto.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000030',
    code: 'PER-000030',
    firstName: 'Álvaro',
    lastName: 'Sancho',
    fullName: 'Álvaro Sancho',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-asan-1', teamId: 'b1000001-0000-4000-8000-000000000020', teamName: 'Alevín F', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-asan-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-asan-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Álvaro Sancho.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000031',
    code: 'PER-000031',
    firstName: 'Ismael',
    lastName: 'Fontelles',
    fullName: 'Ismael Fontelles',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ifont-1', teamId: 'b1000001-0000-4000-8000-000000000021', teamName: 'Alevín G', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-ifont-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ifont-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Ismael Fontelles.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000032',
    code: 'PER-000032',
    firstName: 'José',
    lastName: 'Miguel',
    fullName: 'José Miguel',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-jmig-1', teamId: 'b1000001-0000-4000-8000-000000000022', teamName: 'Alevín H', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-jmig-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-jmig-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de José Miguel (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000033',
    code: 'PER-000033',
    firstName: 'Lucas',
    lastName: 'Martínez',
    fullName: 'Lucas Martínez',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-lmart-1', teamId: 'b1000001-0000-4000-8000-000000000022', teamName: 'Alevín H', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-lmart-1', licenseType: 'EPR', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-lmart-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Lucas Martínez (EPR).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000034',
    code: 'PER-000034',
    firstName: 'Lucas',
    lastName: 'Sánchez',
    fullName: 'Lucas Sánchez',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-lsan-1', teamId: 'b1000001-0000-4000-8000-000000000024', teamName: 'Benjamín B', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true },
      { id: 'as-lsan-2', teamId: 'b1000001-0000-4000-8000-000000000028', teamName: 'Prebenjamín A', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-lsan-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-lsan-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Lucas Sánchez.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000035',
    code: 'PER-000035',
    firstName: 'Alejandro',
    lastName: 'Sanchis',
    fullName: 'Alejandro Sanchis',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-asanchis-1', teamId: 'b1000001-0000-4000-8000-000000000025', teamName: 'Benjamín C', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-asanchis-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-asanchis-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Alejandro Sanchis.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000036',
    code: 'PER-000036',
    firstName: 'Carlos',
    lastName: 'Navarro',
    fullName: 'Carlos Navarro',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-cnav-1', teamId: 'b1000001-0000-4000-8000-000000000026', teamName: 'Benjamín D', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-cnav-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-cnav-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Carlos Navarro.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000037',
    code: 'PER-000037',
    firstName: 'Lucas',
    lastName: 'Mora Beneyto',
    fullName: 'Lucas Mora Beneyto',
    phone: '+34 722 574 497',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-lmora-1', teamId: 'b1000001-0000-4000-8000-000000000026', teamName: 'Benjamín D', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-lmora-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-lmora-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Lucas Mora Beneyto.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000038',
    code: 'PER-000038',
    firstName: 'Marcos',
    lastName: 'Monleón',
    fullName: 'Marcos Monleón',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mmon-1', teamId: 'b1000001-0000-4000-8000-000000000027', teamName: 'Benjamín E', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mmon-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mmon-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Marcos Monleón (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000039',
    code: 'PER-000039',
    firstName: 'Marcos',
    lastName: 'Olmo',
    fullName: 'Marcos Olmo',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-molm-1', teamId: 'b1000001-0000-4000-8000-000000000029', teamName: 'Prebenjamín B', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-molm-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-molm-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Marcos Olmo (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000040',
    code: 'PER-000040',
    firstName: 'Álvaro',
    lastName: 'Cervera',
    fullName: 'Álvaro Cervera',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-acer-1', teamId: 'b1000001-0000-4000-8000-000000000030', teamName: 'Prebenjamín C', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-acer-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-acer-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Álvaro Cervera (UEFA C).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000041',
    code: 'PER-000041',
    firstName: 'Luis',
    lastName: 'Núñez',
    fullName: 'Luis Núñez',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-lnun-1', teamId: 'b1000001-0000-4000-8000-000000000030', teamName: 'Prebenjamín C', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-lnun-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-lnun-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Luis Núñez.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000042',
    code: 'PER-000042',
    firstName: 'Martina',
    lastName: '',
    fullName: 'Martina',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mart-1', teamId: 'b1000001-0000-4000-8000-000000000008', teamName: 'Cadete Femenino', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mart-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mart-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Martina.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000043',
    code: 'PER-000043',
    firstName: 'Miguel',
    lastName: 'Mocholí',
    fullName: 'Miguel Mocholí',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-mmoch-1', teamId: 'b1000001-0000-4000-8000-000000000009', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-mmoch-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-mmoch-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Miguel Mocholí.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000044',
    code: 'PER-000044',
    firstName: 'Vicente',
    lastName: '',
    fullName: 'Vicente',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-vic-1', teamId: 'b1000001-0000-4000-8000-000000000002', teamName: 'Juvenil B', category: 'Juvenil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-vic-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-vic-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Vicente.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000048',
    code: 'PER-000048',
    firstName: 'Max',
    lastName: 'Soler',
    fullName: 'Max Soler',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-msoler-1', teamId: 'b1000001-0000-4000-8000-000000000008', teamName: 'Cadete Femenino', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-msoler-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-msoler-1', date: '2025-09-01', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta de Max Soler (2º Entrenador Cadete Femenino).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T16:15:00Z'
  },

  // FAMILIA Y JUGADORES REALES
  {
    id: 'a1000001-0000-4000-8000-000000000045',
    code: 'PER-000045',
    firstName: 'Familia',
    lastName: 'Martínez',
    fullName: 'Familia Martínez',
    email: 'familia.martinez@cdjesuitas.es',
    phone: '+34 699 000 111',
    status: 'ACTIVE',
    roles: ['FAMILIA'],
    responsibilities: ['Delegado de Campo'],
    teamAssignments: [],
    licenses: [{ id: 'lic-fam-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: true, email: 'familia.martinez@cdjesuitas.es', lastLogin: '2026-07-29T08:30:00Z' },
    eventHistory: [{ id: 'ev-fam-1', date: '2025-09-01', user: 'Sistema', action: 'Persona creada', detail: 'Alta de familia tutora (PER-000045).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T08:30:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000046',
    code: 'PER-000046',
    firstName: 'Pablo',
    lastName: 'Martínez',
    fullName: 'Pablo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-pablo-1', teamId: 'b1000001-0000-4000-8000-000000000004', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2026/2027', isActive: true }
    ],
    licenses: [{ id: 'lic-pablo-1', licenseType: 'EPR', licenseNumber: 'FFCV-J1029', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-pablo-1', date: '2025-09-01', user: 'Familia Martínez', action: 'Persona creada', detail: 'Ficha de jugador (PER-000046).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'a1000001-0000-4000-8000-000000000047',
    code: 'PER-000047',
    firstName: 'Hugo',
    lastName: 'Martínez',
    fullName: 'Hugo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [],
    licenses: [{ id: 'lic-hugo-1', licenseType: 'EPR', licenseNumber: 'FBCV-J8821', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-hugo-1', date: '2025-09-01', user: 'Familia Martínez', action: 'Persona creada', detail: 'Ficha de jugador (PER-000047).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  }
];
