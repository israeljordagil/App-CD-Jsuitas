export type SportId = 'futbol' | 'futbol_sala' | 'baloncesto' | 'voleibol';

export interface SportFormation {
  id: string;
  name: string;
  positions: { id: string; role: string; x: number; y: number }[];
}

export interface SportConfig {
  id: SportId;
  name: string;
  color: string;
  pitchName: string;
  pitchColor: string;
  playerCount: number;
  roles: string[];
  formations: SportFormation[];
  terminology?: {
    venue: string;
    court: string;
    group: string;
    stats: string[];
    matchPeriods: string;
  };
}

export const SPORTS_CONFIG: Record<SportId, SportConfig> = {
  futbol: {
    id: 'futbol',
    name: 'Fútbol',
    color: '#2EAD57', // Verde Césped
    pitchName: 'Campo',
    pitchColor: '#1A6B32', // Verde Oscuro
    playerCount: 11,
    roles: ['Portero', 'Defensa', 'Centrocampista', 'Delantero'],
    terminology: {
      venue: 'Campo',
      court: 'Terreno de juego',
      group: 'Once inicial',
      stats: ['Goles', 'Tiros', 'Faltas'],
      matchPeriods: 'Tiempos'
    },
    formations: [
      {
        id: '4-3-3',
        name: '4-3-3',
        positions: [
          { id: 'pos_1', role: 'Portero', x: 50, y: 90 },
          { id: 'pos_2', role: 'Lat. Izq', x: 15, y: 70 },
          { id: 'pos_3', role: 'Central', x: 35, y: 75 },
          { id: 'pos_4', role: 'Central', x: 65, y: 75 },
          { id: 'pos_5', role: 'Lat. Der', x: 85, y: 70 },
          { id: 'pos_6', role: 'Pivote', x: 50, y: 55 },
          { id: 'pos_7', role: 'Interior Izq', x: 30, y: 40 },
          { id: 'pos_8', role: 'Interior Der', x: 70, y: 40 },
          { id: 'pos_9', role: 'Ext. Izq', x: 15, y: 20 },
          { id: 'pos_10', role: 'Delantero', x: 50, y: 15 },
          { id: 'pos_11', role: 'Ext. Der', x: 85, y: 20 },
        ]
      },
      {
        id: '4-4-2',
        name: '4-4-2',
        positions: [
          { id: 'pos_1', role: 'Portero', x: 50, y: 90 },
          { id: 'pos_2', role: 'Lat. Izq', x: 15, y: 75 },
          { id: 'pos_3', role: 'Central', x: 35, y: 75 },
          { id: 'pos_4', role: 'Central', x: 65, y: 75 },
          { id: 'pos_5', role: 'Lat. Der', x: 85, y: 75 },
          { id: 'pos_6', role: 'Med. Izq', x: 15, y: 45 },
          { id: 'pos_7', role: 'Medio', x: 35, y: 45 },
          { id: 'pos_8', role: 'Medio', x: 65, y: 45 },
          { id: 'pos_9', role: 'Med. Der', x: 85, y: 45 },
          { id: 'pos_10', role: 'Delantero', x: 35, y: 15 },
          { id: 'pos_11', role: 'Delantero', x: 65, y: 15 },
        ]
      }
    ]
  },
  futbol_sala: {
    id: 'futbol_sala',
    name: 'Fútbol Sala',
    color: '#F97316', // Naranja
    pitchName: 'Pabellón',
    pitchColor: '#1E3A8A', // Azul intenso
    playerCount: 5,
    roles: ['Portero', 'Cierre', 'Ala Izquierdo', 'Ala Derecho', 'Pívot', 'Universal'],
    terminology: {
      venue: 'Pabellón',
      court: 'Pista',
      group: 'Quinteto inicial',
      stats: ['Goles', 'Tiros', 'Faltas'],
      matchPeriods: 'Tiempos'
    },
    formations: [
      {
        id: '3-1',
        name: '3-1 Clásico',
        positions: [
          { id: 'pos_1', role: 'Portero', x: 50, y: 90 },
          { id: 'pos_2', role: 'Cierre', x: 50, y: 70 },
          { id: 'pos_3', role: 'Ala Izquierdo', x: 15, y: 50 },
          { id: 'pos_4', role: 'Ala Derecho', x: 85, y: 50 },
          { id: 'pos_5', role: 'Pívot', x: 50, y: 25 },
        ]
      },
      {
        id: '4-0',
        name: '4-0 En Línea',
        positions: [
          { id: 'pos_1', role: 'Portero', x: 50, y: 90 },
          { id: 'pos_2', role: 'Ala-Cierre Izq', x: 25, y: 65 },
          { id: 'pos_3', role: 'Ala-Cierre Der', x: 75, y: 65 },
          { id: 'pos_4', role: 'Ala-Pívot Izq', x: 25, y: 35 },
          { id: 'pos_5', role: 'Ala-Pívot Der', x: 75, y: 35 },
        ]
      }
    ]
  },
  baloncesto: {
    id: 'baloncesto',
    name: 'Baloncesto',
    color: '#EA580C', // Naranja oscuro / Balón
    pitchName: 'Pabellón',
    pitchColor: '#B45309', // Madera
    playerCount: 5,
    roles: ['Base (1)', 'Escolta (2)', 'Alero (3)', 'Ala-Pívot (4)', 'Pívot (5)'],
    terminology: {
      venue: 'Pabellón',
      court: 'Cancha',
      group: 'Quinteto',
      stats: ['Puntos', 'Rebotes', 'Asistencias'],
      matchPeriods: 'Cuartos'
    },
    formations: [
      {
        id: 'ataque_5_abiertos',
        name: 'Ataque 5 Abiertos',
        positions: [
          { id: 'pos_1', role: 'Base', x: 50, y: 80 },
          { id: 'pos_2', role: 'Escolta', x: 15, y: 60 },
          { id: 'pos_3', role: 'Alero', x: 85, y: 60 },
          { id: 'pos_4', role: 'Ala-Pívot', x: 20, y: 20 },
          { id: 'pos_5', role: 'Pívot', x: 80, y: 20 },
        ]
      },
      {
        id: 'defensa_individual',
        name: 'Defensa Individual',
        positions: [
          { id: 'pos_1', role: 'Base', x: 50, y: 65 },
          { id: 'pos_2', role: 'Escolta', x: 25, y: 50 },
          { id: 'pos_3', role: 'Alero', x: 75, y: 50 },
          { id: 'pos_4', role: 'Ala-Pívot', x: 35, y: 25 },
          { id: 'pos_5', role: 'Pívot', x: 65, y: 25 },
        ]
      }
    ]
  },
  voleibol: {
    id: 'voleibol',
    name: 'Voleibol',
    color: '#1D4ED8', // Azul brillante
    pitchName: 'Pabellón',
    pitchColor: '#EA580C', // Pista Voley (naranja/azul)
    playerCount: 6,
    roles: ['Colocador', 'Opuesto', 'Receptor', 'Central', 'Líbero'],
    terminology: {
      venue: 'Pabellón',
      court: 'Pista',
      group: 'Rotación',
      stats: ['Saques', 'Recepciones', 'Bloqueos'],
      matchPeriods: 'Sets'
    },
    formations: [
      {
        id: 'rotacion_1',
        name: 'Rotación 1',
        positions: [
          { id: 'pos_1', role: 'Zaguero Der', x: 80, y: 80 },
          { id: 'pos_2', role: 'Delantero Der', x: 80, y: 20 },
          { id: 'pos_3', role: 'Delantero Cen', x: 50, y: 20 },
          { id: 'pos_4', role: 'Delantero Izq', x: 20, y: 20 },
          { id: 'pos_5', role: 'Zaguero Izq', x: 20, y: 80 },
          { id: 'pos_6', role: 'Zaguero Cen', x: 50, y: 80 },
        ]
      }
    ]
  }
};

export const getSportConfig = (sport: string | null): SportConfig => {
  if (!sport || !(sport in SPORTS_CONFIG)) {
    return SPORTS_CONFIG.futbol; // Fallback default
  }
  return SPORTS_CONFIG[sport as SportId];
};
