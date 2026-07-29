import { ManagedPerson } from '../types/people';

export const INITIAL_PEOPLE: ManagedPerson[] = [
  // 1. ADMINISTRACIÓN GENERAL
  {
    id: 'per-admin-israel',
    firstName: 'Israel',
    lastName: 'Jordá',
    fullName: 'Israel Jordá',
    docId: '48392014A',
    email: 'israel.jorda@cdjesuitas.es',
    phone: '+34 600 111 222',
    status: 'ACTIVE',
    roles: ['ADMIN_GENERAL'],
    responsibilities: ['Administración', 'Instalaciones'],
    teamAssignments: [],
    licenses: [
      { id: 'lic-1', licenseType: 'UEFA A', licenseNumber: 'ESP-98234', issuer: 'RFEF', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'israel.jorda@cdjesuitas.es',
      lastLogin: '2026-07-29T09:00:00Z'
    },
    history: [
      { id: 'h-1', season: '2025/2026', summaryRole: 'Administrador General del Club', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },

  // 2. DIRECCIÓN DEPORTIVA
  {
    id: 'per-dir-josep',
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
      { id: 'lic-2', licenseType: 'UEFA PRO', licenseNumber: 'ESP-11029', issuer: 'RFEF', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'josep.ferrer@cdjesuitas.es',
      lastLogin: '2026-07-28T18:30:00Z'
    },
    history: [
      { id: 'h-2', season: '2024/2025', summaryRole: 'Coordinador Metodológico', createdAt: '2024-09-01T00:00:00Z' },
      { id: 'h-3', season: '2025/2026', summaryRole: 'Director Deportivo', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },

  // 3. COORDINACIÓN GENERAL
  {
    id: 'per-coord-ruben',
    firstName: 'Rubén',
    lastName: 'Cazallas',
    fullName: 'Rubén Cazallas',
    docId: '53194012C',
    email: 'ruben.cazallas@cdjesuitas.es',
    phone: '+34 622 333 444',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    responsibilities: ['Coordinador F11'],
    teamAssignments: [
      { id: 'as-1', teamId: 'eq-cadete-a', teamName: 'Cadete A', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Coordinador de Categoría', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-3', licenseType: 'UEFA A', licenseNumber: 'ESP-44102', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'ruben.cazallas@cdjesuitas.es',
      lastLogin: '2026-07-27T16:00:00Z'
    },
    history: [
      { id: 'h-4', season: '2025/2026', summaryRole: 'Coordinador F11', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-coord-manu',
    firstName: 'Manu',
    lastName: 'Cáceres',
    fullName: 'Manu Cáceres',
    docId: '44810293D',
    email: 'manu.caceres@cdjesuitas.es',
    phone: '+34 633 444 555',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    responsibilities: ['Coordinador F8'],
    teamAssignments: [
      { id: 'as-2', teamId: 'eq-alevin-a', teamName: 'Alevín A', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Coordinador de Categoría', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-4', licenseType: 'UEFA B', licenseNumber: 'ESP-77281', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'manu.caceres@cdjesuitas.es',
      lastLogin: '2026-07-26T11:20:00Z'
    },
    history: [
      { id: 'h-5', season: '2025/2026', summaryRole: 'Coordinador F8', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-coord-raulg',
    firstName: 'Raúl',
    lastName: 'García',
    fullName: 'Raúl García',
    docId: '33910284E',
    email: 'raul.garcia@cdjesuitas.es',
    phone: '+34 644 555 666',
    status: 'ACTIVE',
    roles: ['COORDINADOR'],
    responsibilities: ['Coordinador F8', 'Material'],
    teamAssignments: [
      { id: 'as-3', teamId: 'eq-benjamin-a', teamName: 'Benjamín A', category: 'Benjamín', sport: 'Fútbol', positionTitle: 'Coordinador de Categoría', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-5', licenseType: 'UEFA B', licenseNumber: 'ESP-66102', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'raul.garcia@cdjesuitas.es',
      lastLogin: '2026-07-28T09:15:00Z'
    },
    history: [
      { id: 'h-6', season: '2025/2026', summaryRole: 'Coordinador F8', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },

  // 4. ENTRENADORES REALES (EJEMPLO MULTI-EQUIPO: RAÚL FUENTES)
  {
    id: 'per-coach-raulf',
    firstName: 'Raúl',
    lastName: 'Fuentes',
    fullName: 'Raúl Fuentes',
    docId: '19482019F',
    email: 'raul.fuentes@cdjesuitas.es',
    phone: '+34 655 666 777',
    status: 'ACTIVE',
    roles: ['ENTRENADOR', 'COORDINADOR'],
    responsibilities: ['Metodología'],
    teamAssignments: [
      { id: 'as-rf-1', teamId: 'eq-prebenjamin-a', teamName: 'Prebenjamín A', category: 'Prebenjamín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rf-2', teamId: 'eq-alevin-e', teamName: 'Alevín E', category: 'Alevín', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true },
      { id: 'as-rf-3', teamId: 'eq-infantil-a', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Segundo Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-rf', licenseType: 'UEFA B', licenseNumber: 'ESP-99201', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'raul.fuentes@cdjesuitas.es',
      lastLogin: '2026-07-28T20:10:00Z'
    },
    history: [
      { id: 'h-rf-1', season: '2024/2025', summaryRole: 'Entrenador Alevín E', createdAt: '2024-09-01T00:00:00Z' },
      { id: 'h-rf-2', season: '2025/2026', summaryRole: 'Primer Entrenador Prebenjamín A & Alevín E • 2º Entrenador Infantil A', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-coach-carlos',
    firstName: 'Carlos',
    lastName: 'Ruíz',
    fullName: 'Carlos Ruíz',
    docId: '47201938G',
    email: 'carlos.ruiz@cdjesuitas.es',
    phone: '+34 666 777 888',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-cr-1', teamId: 't-infantil-a', teamName: 'Infantil A', category: 'Infantil', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-cr', licenseType: 'UEFA A', licenseNumber: 'ESP-33829', issuer: 'RFEF', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'carlos.ruiz@cdjesuitas.es',
      lastLogin: '2026-07-28T14:22:00Z'
    },
    history: [
      { id: 'h-cr-1', season: '2025/2026', summaryRole: 'Primer Entrenador Infantil A', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-coach-adrian',
    firstName: 'Adrián',
    lastName: 'Gómez',
    fullName: 'Adrián Gómez',
    docId: '38102948H',
    email: 'adrian.gomez@cdjesuitas.es',
    phone: '+34 677 888 999',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-ag-1', teamId: 'eq-cadete-a', teamName: 'Cadete A', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-ag', licenseType: 'UEFA B', licenseNumber: 'ESP-18274', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: false
    },
    history: [
      { id: 'h-ag-1', season: '2025/2026', summaryRole: 'Primer Entrenador Cadete A', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-coach-david',
    firstName: 'David',
    lastName: 'Martínez',
    fullName: 'David Martínez',
    docId: '29481029I',
    email: 'david.martinez@cdjesuitas.es',
    phone: '+34 688 999 000',
    status: 'ACTIVE',
    roles: ['ENTRENADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-dm-1', teamId: 'eq-cadete-b', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-dm', licenseType: 'UEFA B', licenseNumber: 'ESP-88271', issuer: 'FFCV', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'david.martinez@cdjesuitas.es'
    },
    history: [
      { id: 'h-dm-1', season: '2025/2026', summaryRole: 'Primer Entrenador Cadete B', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },

  // 5. FAMILIAS Y JUGADORES
  {
    id: 'per-fam-martinez',
    firstName: 'Familia',
    lastName: 'Martínez',
    fullName: 'Familia Martínez',
    email: 'familia.martinez@cdjesuitas.es',
    phone: '+34 699 000 111',
    status: 'ACTIVE',
    roles: ['FAMILIA'],
    responsibilities: ['Delegado de Campo'],
    teamAssignments: [],
    licenses: [
      { id: 'lic-fam', licenseType: 'Sin licencia', isValid: true }
    ],
    account: {
      hasAccess: true,
      email: 'familia.martinez@cdjesuitas.es',
      lastLogin: '2026-07-29T08:30:00Z'
    },
    history: [
      { id: 'h-fam-1', season: '2025/2026', summaryRole: 'Familia / Tutores de Pablo y Hugo', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-jug-pablo',
    firstName: 'Pablo',
    lastName: 'Martínez',
    fullName: 'Pablo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-pablo-1', teamId: 'eq-cadete-b', teamName: 'Cadete B', category: 'Cadete', sport: 'Fútbol', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-pablo', licenseType: 'EPR', licenseNumber: 'FFCV-J1029', isValid: true }
    ],
    account: {
      hasAccess: false
    },
    history: [
      { id: 'h-pablo-1', season: '2025/2026', summaryRole: 'Jugador Cadete B', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  },
  {
    id: 'per-jug-hugo',
    firstName: 'Hugo',
    lastName: 'Martínez',
    fullName: 'Hugo Martínez',
    status: 'ACTIVE',
    roles: ['JUGADOR'],
    responsibilities: [],
    teamAssignments: [
      { id: 'as-hugo-1', teamId: 'eq-infantil-basket', teamName: 'Infantil Basket', category: 'Infantil', sport: 'Baloncesto', positionTitle: 'Primer Entrenador', season: '2025/2026', isActive: true }
    ],
    licenses: [
      { id: 'lic-hugo', licenseType: 'EPR', licenseNumber: 'FBCV-J8821', isValid: true }
    ],
    account: {
      hasAccess: false
    },
    history: [
      { id: 'h-hugo-1', season: '2025/2026', summaryRole: 'Jugador Infantil Basket', createdAt: '2025-09-01T00:00:00Z' }
    ],
    createdAt: '2025-09-01T00:00:00Z',
    updatedAt: '2026-07-29T00:00:00Z'
  }
];
