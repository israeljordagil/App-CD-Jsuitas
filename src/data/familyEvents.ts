export const clubColors = {
  navy: '#0B1F4D',
  skyPrimary: '#4FC3F7',
  skyLight: '#E1F5FE',
  white: '#FFFFFF',
  textMuted: '#6B7280',
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
  border: '#e5e7eb',
  futbol: '#22c55e',       // Verde
  baloncesto: '#f97316',   // Naranja
  voleibol: '#a855f7',     // Morado
};

export const CHILDS_META: Record<string, any> = {
  'p1': { name: 'Pablo', fullName: 'Pablo Martínez', sport: 'futbol', team: 'Cadete B', icon: '⚽', color: clubColors.futbol },
  'p2': { name: 'Hugo', fullName: 'Hugo Martínez', sport: 'baloncesto', team: 'Infantil Basket', icon: '🏀', color: clubColors.baloncesto },
  'p3': { name: 'Laura', fullName: 'Laura Martínez', sport: 'voleibol', team: 'Cadete Vóley Femenino', icon: '🏐', color: clubColors.voleibol }
};

export const INITIAL_EVENTS = [
  // HOY (12 Sept)
  { id: 'ev1', playerId: 'p1', day: 12, time: '09:00', shortTime: '09:00', type: 'Partido', title: 'CD Jesuitas vs Levante UD', location: 'Campo 2', citation: '08:15', status: 'Confirmado', requireConfirm: false },
  { id: 'ev2', playerId: 'p2', day: 12, time: '10:30', shortTime: '10:30', type: 'Entrenamiento', title: 'Entrenamiento Físico', location: 'Pabellón Norte', duration: '90 min', status: 'Pendiente', requireConfirm: true },
  { id: 'ev3', playerId: 'p3', day: 12, time: '12:00', shortTime: '12:00', type: 'Partido', title: 'CD Jesuitas vs Colegio Alemán', location: 'Pabellón Central', citation: '11:15', status: 'Confirmado', requireConfirm: false },
  
  // SEMANA
  { id: 'ev4', playerId: 'p2', day: 14, time: '18:00', shortTime: '18:00', type: 'Entrenamiento', title: 'Entrenamiento Cancha', location: 'Cancha 2', status: 'Confirmado' },
  { id: 'ev5', playerId: 'p3', day: 14, time: '19:15', shortTime: '19:15', type: 'Entrenamiento', title: 'Táctica', location: 'Pista Principal', status: 'Confirmado' },
  { id: 'ev6', playerId: 'p1', day: 15, time: '17:30', shortTime: '17:30', type: 'Entrenamiento', title: 'Entrenamiento Físico', location: 'Campo 2', status: 'Confirmado' },
  { id: 'ev7', playerId: 'p2', day: 16, time: '19:30', shortTime: '19:30', type: 'Partido', title: 'Amistoso vs Maristas', location: 'Pabellón Sur', status: 'Confirmado' },
  { id: 'ev8', playerId: 'p3', day: 16, time: '18:00', shortTime: '18:00', type: 'Entrenamiento', title: 'Entrenamiento Recepción', location: 'Pista Principal', status: 'Confirmado' },
  
  // OTROS (Mes)
  { id: 'ev9', playerId: 'p1', day: 19, time: '11:00', shortTime: '11:00', type: 'Partido', title: 'Villarreal vs CD Jesuitas', location: 'Ciudad Dep. Villarreal', status: 'Confirmado' },
  { id: 'ev10', playerId: 'p2', day: 19, time: '10:00', shortTime: '10:00', type: 'Partido', title: 'Valencia Basket vs CD Jesuitas', location: 'L\'Alqueria', status: 'Confirmado' },
  { id: 'ev11', playerId: 'p3', day: 20, time: '12:00', shortTime: '12:00', type: 'Partido', title: 'Xátiva Vóley vs CD Jesuitas', location: 'Pabellón Xátiva', status: 'Confirmado' },
];
