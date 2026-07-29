export interface Insignia {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string;
  unlocked: boolean;
  date?: string;
}

export interface Reto {
  id: number;
  title: string;
  ctx: string;
  diff: string;
  total: number;
  curr: number;
  xp: number;
}

export const RETO_TABS = ['Ataque', 'Defensa', 'Entrenamiento', 'Compañerismo', 'Club', 'Temporada'];

export const INSIGNIAS: Insignia[] = [
  { id: 1, title: 'Goleador', desc: 'Concede al marcar 25 goles con el CD Jesuitas.', icon: 'soccer-ball-o', color: '#4FC3F7', unlocked: true, date: '15 Sep 2026' },
  { id: 2, title: 'Asistente', desc: 'Concede al alcanzar 20 asistencias.', icon: 'handshake-o', color: '#22C55E', unlocked: true, date: '28 Sep 2026' },
  { id: 3, title: 'Incansable', desc: 'Completa el 100% de los entrenamientos durante un mes.', icon: 'heartbeat', color: '#E11D48', unlocked: true, date: '1 Nov 2026' },
  { id: 4, title: 'MVP', desc: 'Ser elegido MVP en 5 partidos.', icon: 'star', color: '#EAB308', unlocked: false },
  { id: 5, title: 'Leyenda Jesuitas', desc: 'Disputar 100 partidos oficiales con el club.', icon: 'shield', color: '#4FC3F7', unlocked: false },
  { id: 6, title: 'Compañero del Año', desc: 'Ayuda constantemente a tus compañeros.', icon: 'users', color: '#F97316', unlocked: true, date: '5 Oct 2026' },
  { id: 7, title: 'Fair Play', desc: 'Destaca por tu juego limpio.', icon: 'hand-peace-o', color: '#A855F7', unlocked: false },
  { id: 8, title: 'Respeto al Rival', desc: 'Completa 20 partidos demostrando respeto al rival.', icon: 'handshake-o', color: '#4FC3F7', unlocked: false },
  { id: 9, title: 'Respeto al Árbitro', desc: 'Mantén una actitud ejemplar hacia los árbitros.', icon: 'gavel', color: '#EAB308', unlocked: false },
  { id: 10, title: 'Confianza del Entrenador', desc: 'Demuestra compromiso y responsabilidad.', icon: 'check-circle', color: '#22C55E', unlocked: true, date: '12 Oct 2026' },
  { id: 11, title: 'Afición Ejemplar', desc: 'Respeta siempre al público.', icon: 'bullhorn', color: '#4FC3F7', unlocked: false },
  { id: 12, title: 'Puntualidad', desc: 'Llega siempre puntual a entrenamientos y partidos.', icon: 'clock-o', color: '#3B82F6', unlocked: true, date: '10 Nov 2026' },
  { id: 13, title: 'Valiente', desc: 'Cumple con los valores del CD Jesuitas demostrando valentía, esfuerzo, compromiso y determinación.', icon: 'bolt', color: '#EAB308', unlocked: false },
  { id: 14, title: 'ADN Jesuitas', desc: 'Representa los valores del club dentro y fuera del terreno de juego.', icon: 'heart', color: '#E11D48', unlocked: false },
  { id: 15, title: 'Compañerismo', desc: 'Antepón siempre el equipo al éxito individual.', icon: 'link', color: '#A855F7', unlocked: true, date: '20 Sep 2026' },
];

const generateReto = (id: number, title: string, ctx: string, diff: string, total: number, curr: number, xp: number): Reto => {
  return { id, title, ctx, diff, total, curr, xp };
};

export const RETOS_ATAQUE: Reto[] = [
  generateReto(1, 'Marcar 1 gol.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(2, 'Marcar un doblete.', '⚽ Partido', '🟡 Media', 1, 0, 150),
  generateReto(3, 'Conseguir un hat-trick.', '⚽ Partido', '🔴 Difícil', 1, 0, 300),
  generateReto(4, 'Dar una asistencia.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(5, 'Generar 5 ocasiones de gol.', '⚽ Partido', '🟡 Media', 5, 2, 100),
  generateReto(6, 'Realizar 10 tiros a puerta.', '⚽ Partido', '🟡 Media', 10, 6, 120),
  generateReto(7, 'Completar un entrenamiento de finalización.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(8, 'Mejorar el porcentaje de tiro a puerta al 70%.', '📅 Ambos', '🔴 Difícil', 70, 55, 250),
  generateReto(9, 'Marcar con la pierna menos hábil.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(10, 'Marcar de cabeza.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(11, 'Completar correctamente todos los ejercicios de definición.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 100),
  generateReto(12, 'Finalizar 20 jugadas durante los entrenamientos.', '🏃 Entrenamiento', '🟢 Fácil', 20, 14, 150),
  generateReto(13, 'Participar en 5 goles consecutivos del equipo.', '⚽ Partido', '🔴 Difícil', 5, 2, 500),
  generateReto(14, 'No perder balones en zona de ataque durante un partido.', '⚽ Partido', '🔴 Difícil', 1, 0, 400),
  generateReto(15, 'Ser el máximo goleador del mes.', '📅 Temporada', '🔴 Difícil', 1, 0, 1000),
];

export const RETOS_DEFENSA: Reto[] = [
  generateReto(16, 'Recuperar 10 balones.', '⚽ Partido', '🟢 Fácil', 10, 8, 100),
  generateReto(17, 'Ganar 15 duelos individuales.', '⚽ Partido', '🟡 Media', 15, 7, 150),
  generateReto(18, 'Completar un entrenamiento defensivo perfecto.', '🏃 Entrenamiento', '🟡 Media', 1, 1, 150),
  generateReto(19, 'No cometer faltas innecesarias.', '⚽ Partido', '🟢 Fácil', 1, 0, 50),
  generateReto(20, 'Interceptar 5 pases.', '⚽ Partido', '🟢 Fácil', 5, 3, 100),
  generateReto(21, 'Ganar todos los duelos aéreos de un partido.', '⚽ Partido', '🔴 Difícil', 1, 0, 300),
  generateReto(22, 'Mejorar el marcaje individual.', '🏃 Entrenamiento', '🟡 Media', 100, 40, 200),
  generateReto(23, 'Completar todos los ejercicios defensivos.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(24, 'Ayudar en las coberturas correctamente.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(25, 'Mantener la portería a cero (defensas/porteros).', '⚽ Partido', '🔴 Difícil', 1, 1, 250),
  generateReto(26, 'No recibir tarjetas durante 5 partidos.', '📅 Temporada', '🟡 Media', 5, 2, 300),
  generateReto(27, 'Recuperar 100 balones en la temporada.', '📅 Temporada', '🔴 Difícil', 100, 34, 1000),
  generateReto(28, 'Liderar la línea defensiva.', '⚽ Partido', '🟡 Media', 1, 0, 200),
  generateReto(29, 'Comunicar constantemente con la defensa.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(30, 'Ser elegido mejor defensor del mes.', '📅 Temporada', '🔴 Difícil', 1, 0, 800),
];

export const RETOS_ENTRENAMIENTO: Reto[] = [
  generateReto(31, 'Asistir a todos los entrenamientos del mes.', '🏃 Entrenamiento', '🟡 Media', 12, 10, 300),
  generateReto(32, 'Llegar puntual durante un mes.', '🏃 Entrenamiento', '🟡 Media', 12, 12, 200),
  generateReto(33, 'Completar todos los ejercicios.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(34, 'No faltar sin justificar.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(35, 'Mantener actitud positiva.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(36, 'Recoger el material al finalizar.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(37, 'Ayudar a montar el entrenamiento.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(38, 'Animar a los compañeros.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(39, 'Cumplir todos los objetivos semanales.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 200),
  generateReto(40, 'Superar todas las pruebas físicas.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 500),
  generateReto(41, 'Completar un entrenamiento sin errores técnicos.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 300),
  generateReto(42, 'Mejorar la intensidad en todos los ejercicios.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 150),
  generateReto(43, 'Completar un circuito técnico perfecto.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 150),
  generateReto(44, 'Ser elegido mejor entrenador de la semana por actitud.', '🏃 Entrenamiento', '🔴 Difícil', 1, 0, 500),
  generateReto(45, 'Alcanzar el 100% de asistencia trimestral.', '🏃 Entrenamiento', '🔴 Difícil', 3, 1, 800),
];

export const RETOS_COMPA: Reto[] = [
  generateReto(46, 'Ayudar a un compañero durante un entrenamiento.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(47, 'Animar al equipo durante todo el partido.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(48, 'Felicitar al rival al finalizar.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(49, 'Respetar todas las decisiones arbitrales.', '⚽ Partido', '🟢 Fácil', 1, 1, 50),
  generateReto(50, 'No protestar durante un partido.', '⚽ Partido', '🟡 Media', 1, 1, 100),
  generateReto(51, 'Motivar a un compañero después de un error.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(52, 'Compartir material con un compañero.', '🏃 Entrenamiento', '🟢 Fácil', 1, 1, 50),
  generateReto(53, 'Colaborar en recoger el material.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(54, 'Resolver un conflicto de forma respetuosa.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(55, 'Mantener una actitud positiva toda la semana.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(56, 'Ser ejemplo de respeto hacia el entrenador.', '📅 Ambos', '🟡 Media', 1, 1, 150),
  generateReto(57, 'Ser ejemplo de respeto hacia el delegado.', '📅 Ambos', '🟡 Media', 1, 1, 150),
  generateReto(58, 'Ser ejemplo de respeto hacia el público.', '⚽ Partido', '🟡 Media', 1, 1, 150),
  generateReto(59, 'Recibir una valoración positiva del entrenador por actitud.', '📅 Ambos', '🔴 Difícil', 1, 0, 300),
  generateReto(60, 'Completar un mes demostrando los valores del CD Jesuitas.', '📅 Ambos', '🔴 Difícil', 1, 0, 500),
];

export const RETOS_CLUB: Reto[] = [
  generateReto(61, 'Participar en un evento del club.', '📅 Ambos', '🟢 Fácil', 1, 0, 100),
  generateReto(62, 'Asistir a la presentación de equipos.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(63, 'Participar en un campus.', '📅 Ambos', '🟡 Media', 1, 0, 250),
  generateReto(64, 'Representar al club en un torneo.', '⚽ Partido', '🔴 Difícil', 1, 0, 500),
  generateReto(65, 'Colaborar en una actividad solidaria.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(66, 'Asistir a una charla formativa.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(67, 'Participar en una sesión de tecnificación.', '🏃 Entrenamiento', '🟡 Media', 1, 0, 200),
  generateReto(68, 'Llevar correctamente la equipación oficial durante un mes.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(69, 'Conocer la historia del CD Jesuitas.', '📅 Ambos', '🟢 Fácil', 1, 1, 100),
  generateReto(70, 'Respetar las instalaciones del club.', '📅 Ambos', '🟢 Fácil', 1, 1, 50),
  generateReto(71, 'Participar en una jornada de convivencia.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(72, 'Ayudar en actividades del club.', '📅 Ambos', '🟡 Media', 1, 0, 200),
  generateReto(73, 'Ser ejemplo de comportamiento fuera del campo.', '📅 Ambos', '🔴 Difícil', 1, 0, 300),
  generateReto(74, 'Representar los valores del club en redes sociales.', '📅 Ambos', '🟡 Media', 1, 0, 150),
  generateReto(75, 'Obtener la insignia "ADN Jesuitas".', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
];

export const RETOS_TEMPORADA: Reto[] = [
  generateReto(76, 'Marcar 10 goles.', '⚽ Partido', '🔴 Difícil', 10, 7, 1000),
  generateReto(77, 'Dar 10 asistencias.', '⚽ Partido', '🔴 Difícil', 10, 4, 1000),
  generateReto(78, 'Disputar 25 partidos.', '⚽ Partido', '🔴 Difícil', 25, 18, 1500),
  generateReto(79, 'Alcanzar el 95% de asistencia.', '📅 Ambos', '🔴 Difícil', 100, 96, 2000),
  generateReto(80, 'No ser expulsado.', '⚽ Partido', '🟡 Media', 1, 1, 500),
  generateReto(81, 'Completar tres meses de juego limpio.', '⚽ Partido', '🔴 Difícil', 3, 2, 800),
  generateReto(82, 'Ser elegido MVP tres veces.', '⚽ Partido', '🔴 Difícil', 3, 1, 1200),
  generateReto(83, 'Ayudar al equipo a clasificarse para la fase final.', '⚽ Partido', '🔴 Difícil', 1, 0, 3000),
  generateReto(84, 'Mejorar la valoración media respecto al año anterior.', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
  generateReto(85, 'Completar todos los objetivos individuales.', '📅 Ambos', '🔴 Difícil', 10, 5, 1500),
  generateReto(86, 'Desbloquear 10 insignias.', '📅 Ambos', '🔴 Difícil', 10, 6, 2000),
  generateReto(87, 'Completar 30 retos.', '📅 Ambos', '🔴 Difícil', 30, 15, 2500),
  generateReto(88, 'Mantener una actitud ejemplar toda la temporada.', '📅 Ambos', '🔴 Difícil', 1, 0, 1500),
  generateReto(89, 'Ser un referente para los compañeros.', '📅 Ambos', '🔴 Difícil', 1, 0, 1000),
  generateReto(90, 'Completar una temporada representando los valores del CD Jesuitas.', '📅 Ambos', '🔴 Difícil', 1, 0, 5000),
];

export const getRetosByCategory = (category: string): Reto[] => {
  switch (category) {
    case 'Ataque': return RETOS_ATAQUE;
    case 'Defensa': return RETOS_DEFENSA;
    case 'Entrenamiento': return RETOS_ENTRENAMIENTO;
    case 'Compañerismo': return RETOS_COMPA;
    case 'Club': return RETOS_CLUB;
    case 'Temporada': return RETOS_TEMPORADA;
    default: return RETOS_ATAQUE;
  }
};
