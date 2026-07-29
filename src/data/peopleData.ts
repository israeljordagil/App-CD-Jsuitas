import { ManagedPerson } from '../types/people';

export const INITIAL_PEOPLE: ManagedPerson[] = [
  // 1. ADMINISTRACIÓN GENERAL
  {
    id: 'per-000001',
    code: 'PER-000001',
    firstName: 'Israel',
    lastName: 'Jordá',
    fullName: 'Israel Jordá',
    docId: '48392014A',
    email: 'israel.jorda@cdjesuitas.es',
    phone: '+34 600 111 222',
    status: 'ACTIVE',
    roles: ['ADMIN_GENERAL'],
    responsibilities: ['Administración', 'Instalaciones'],
    teamAssignments: [
      { id: 'as-ij-1', teamId: 'eq-alevin-e', teamName: 'Alevín E', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-ij-2', teamId: 'eq-benjamin-a', teamName: 'Benjamín A', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
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
      { id: 'ev-ij-1', date: '2025-09-01T08:00:00Z', user: 'Sistema', action: 'Persona creada', detail: 'Alta inicial del Administrador General (PER-000001).' },
      { id: 'ev-ij-2', date: '2025-09-01T08:30:00Z', user: 'Israel Jordá', action: 'Cuenta activada', detail: 'Vinculación de acceso con Supabase Auth.' },
      { id: 'ev-ij-3', date: '2026-07-29T09:00:00Z', user: 'Israel Jordá', action: 'Equipo asignado', detail: 'Asignación como 2º Entrenador en Alevín E y Benjamín A.' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T09:20:00Z',
    createdBy: 'Sistema',
    updatedBy: 'Israel Jordá',
    lastAccess: '2026-07-29T09:20:00Z',
    lastModified: '2026-07-29T09:20:00Z'
  },

  // 2. DIRECCIÓN DEPORTIVA
  {
    id: 'per-000002',
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
    account: {
      hasAccess: true,
      email: 'josep.ferrer@cdjesuitas.es',
      lastLogin: '2026-07-28T18:30:00Z'
    },
    eventHistory: [
      { id: 'ev-jf-1', date: '2024-09-01T08:00:00Z', user: 'Sistema', action: 'Persona creada', detail: 'Alta de Director Deportivo (PER-000002).' },
      { id: 'ev-jf-2', date: '2025-09-01T09:00:00Z', user: 'Israel Jordá', action: 'Responsabilidad añadida', detail: 'Asignación de responsabilidad Metodología.' }
    ],
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2026-07-28T18:30:00Z',
    createdBy: 'Israel Jordá',
    updatedBy: 'Josep Ferrer',
    lastAccess: '2026-07-28T18:30:00Z',
    lastModified: '2026-07-28T18:30:00Z'
  },

  // 3. COORDINACIÓN GENERAL
  {
    id: 'per-000003',
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
    licenses: [
      { id: 'lic-rc-1', licenseType: 'UEFA A', licenseNumber: 'ESP-44102', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'ruben.cazallas@cdjesuitas.es',
      lastLogin: '2026-07-27T16:00:00Z'
    },
    eventHistory: [
      { id: 'ev-rc-1', date: '2025-09-01T08:00:00Z', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Coordinador F11 (PER-000003).' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-27T16:00:00Z',
    createdBy: 'Israel Jordá',
    updatedBy: 'Rubén Cazallas'
  },
  {
    id: 'per-000004',
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
    licenses: [
      { id: 'lic-mc-1', licenseType: 'UEFA B', licenseNumber: 'ESP-77281', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'manu.caceres@cdjesuitas.es',
      lastLogin: '2026-07-26T11:20:00Z'
    },
    eventHistory: [
      { id: 'ev-mc-1', date: '2025-09-01T08:00:00Z', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Coordinador F8 (PER-000004).' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-26T11:20:00Z',
    createdBy: 'Israel Jordá',
    updatedBy: 'Manu Cáceres'
  },
  {
    id: 'per-000005',
    code: 'PER-000005',
    firstName: 'Raúl',
    lastName: 'García',
    fullName: 'Raúl García',
    docId: '33910284E',
    email: 'raul.garcia@cdjesuitas.es',
    phone: '+34 644 555 666',
    status: 'ACTIVE',
    roles: ['COORDINADOR', 'ENTRENADOR'],
    responsibilities: ['Coordinador F8', 'Material'],
    teamAssignments: [
      { id: 'as-rg-1', teamId: 'eq-infantil-a', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rg-2', teamId: 'eq-benjamin-a', teamName: 'Benjamín A', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-rg-1', licenseType: 'UEFA B', licenseNumber: 'ESP-66102', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'raul.garcia@cdjesuitas.es',
      lastLogin: '2026-07-28T09:15:00Z'
    },
    eventHistory: [
      { id: 'ev-rg-1', date: '2025-09-01T08:00:00Z', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta de Coordinador F8 y Entrenador (PER-000005).' },
      { id: 'ev-rg-2', date: '2025-09-01T10:00:00Z', user: 'Josep Ferrer', action: 'Equipos asignados', detail: 'Asignado como 1º Entrenador de Infantil A y Benjamín A.' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-28T09:15:00Z',
    createdBy: 'Israel Jordá',
    updatedBy: 'Raúl García'
  },

  // 4. ENTRENADORES REALES (DOCUMENTO ENTRENADORES 2026)
  {
    id: 'per-000006',
    code: 'PER-000006',
    firstName: 'Raúl',
    lastName: 'Fuentes',
    fullName: 'Raúl Fuentes',
    docId: '19482019F',
    email: 'raul.fuentes@cdjesuitas.es',
    phone: '+34 655 666 777',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-rf-1', teamId: 'eq-prebenjamin-a', teamName: 'Prebenjamín A', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rf-2', teamId: 'eq-alevin-e', teamName: 'Alevín E', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rf-3', teamId: 'eq-infantil-a', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-rf-1', licenseType: 'EPR', licenseNumber: 'EPR-FFCV-019', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'raul.fuentes@cdjesuitas.es',
      lastLogin: '2026-07-28T20:10:00Z'
    },
    eventHistory: [
      { id: 'ev-rf-1', date: '2024-09-01T08:00:00Z', user: 'Israel Jordá', action: 'Persona creada', detail: 'Alta inicial del entrenador Raúl Fuentes (PER-000006).' },
      { id: 'ev-rf-2', date: '2025-09-01T09:00:00Z', user: 'Josep Ferrer', action: 'Equipos asignados', detail: 'Asignado a Prebenjamín A (1º), Alevín E (1º) e Infantil A (2º).' }
    ],
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2026-07-28T20:10:00Z',
    createdBy: 'Israel Jordá',
    updatedBy: 'Josep Ferrer'
  },
  {
    id: 'per-000007',
    code: 'PER-000007',
    firstName: 'Rubén',
    lastName: 'Balaguer',
    fullName: 'Rubén Balaguer',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-rb-1', teamId: 'eq-cadete-b', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rb-2', teamId: 'eq-infantil-e', teamName: 'Infantil E', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rb-3', teamId: 'eq-alevin-g', teamName: 'Alevín G', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-rb-1', licenseType: 'Sin licencia', isValid: true }
    ],
    account: { hasAccess: false },
    eventHistory: [
      { id: 'ev-rb-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde documento Entrenadores 2026 (PER-000007).' }
    ],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000008',
    code: 'PER-000008',
    firstName: 'Nicolás',
    lastName: 'Guillem',
    fullName: 'Nicolás Guillem',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ng-1', teamId: 'eq-juvenil-b', teamName: 'Juvenil B', category: 'Juvenil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-ng-2', teamId: 'eq-cadete-c', teamName: 'Cadete C', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-ng-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ng-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde Entrenadores 2026.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000009',
    code: 'PER-000009',
    firstName: 'Pedro',
    lastName: 'Rado',
    fullName: 'Pedro Rado',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-pr-1', teamId: 'eq-infantil-b', teamName: 'Infantil B', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-pr-2', teamId: 'eq-cadete-a', teamName: 'Cadete A', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-pr-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-pr-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde Entrenadores 2026.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000010',
    code: 'PER-000010',
    firstName: 'Daniel',
    lastName: 'Sobero',
    fullName: 'Daniel Sobero',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ds-1', teamId: 'eq-cadete-b', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-ds-2', teamId: 'eq-alevin-b', teamName: 'Alevín B', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-ds-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-ds-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde Entrenadores 2026.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000011',
    code: 'PER-000011',
    firstName: 'Dani',
    lastName: 'Roig',
    fullName: 'Dani Roig',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-droig-1', teamId: 'eq-infantil-c', teamName: 'Infantil C', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-droig-2', teamId: 'eq-cadete-c', teamName: 'Cadete C', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-droig-1', licenseType: 'Sin licencia', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-droig-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde Entrenadores 2026.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000012',
    code: 'PER-000012',
    firstName: 'David',
    lastName: 'Cogollos',
    fullName: 'David Cogollos',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-dcog-1', teamId: 'eq-querubin', teamName: 'Querubín', category: 'Querubín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-dcog-2', teamId: 'eq-infantil-c', teamName: 'Infantil C', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-dcog-1', licenseType: 'UEFA C', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-dcog-1', date: '2025-09-01T08:00:00Z', user: 'Josep Ferrer', action: 'Persona creada', detail: 'Alta desde Entrenadores 2026.' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },

  // FAMILIA Y JUGADORES REALES
  {
    id: 'per-000045',
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
    account: {
      hasAccess: true,
      email: 'familia.martinez@cdjesuitas.es',
      lastLogin: '2026-07-29T08:30:00Z'
    },
    eventHistory: [{ id: 'ev-fam-1', date: '2025-09-01T08:00:00Z', user: 'Sistema', action: 'Persona creada', detail: 'Alta de familia tutora (PER-000045).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T08:30:00Z'
  },
  {
    id: 'per-000046',
    code: 'PER-000046',
    firstName: 'Pablo',
    lastName: 'Martínez',
    fullName: 'Pablo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-pablo-1', teamId: 'eq-cadete-b', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-pablo-1', licenseType: 'EPR', licenseNumber: 'FFCV-J1029', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-pablo-1', date: '2025-09-01T08:00:00Z', user: 'Familia Martínez', action: 'Persona creada', detail: 'Ficha de jugador (PER-000046).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-000047',
    code: 'PER-000047',
    firstName: 'Hugo',
    lastName: 'Martínez',
    fullName: 'Hugo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-hugo-1', teamId: 'eq-infantil-basket', teamName: 'Infantil Basket', category: 'Infantil', sport: 'Baloncesto', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [{ id: 'lic-hugo-1', licenseType: 'EPR', licenseNumber: 'FBCV-J8821', isValid: true }],
    account: { hasAccess: false },
    eventHistory: [{ id: 'ev-hugo-1', date: '2025-09-01T08:00:00Z', user: 'Familia Martínez', action: 'Persona creada', detail: 'Ficha de jugador (PER-000047).' }],
    createdAt: '2025-09-01T08:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  }
];
