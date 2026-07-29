import { SportType } from '../context/SportContext';

export interface DemoChild {
  id: string;
  fullName: string;
  birthDate: string;
  sport: SportType;
  sportLabel: string;
  team: string;
  category: string;
  dorsal: number;
  avatarIcon: string;
}

export interface DemoFamily {
  id: string;
  familyName: string;
  email: string;
  children: DemoChild[];
}

export const DEMO_FAMILY: DemoFamily = {
  id: 'fam-demo-garcia',
  familyName: 'Familia García',
  email: 'familia.garcia@cdjesuitas.es',
  children: [
    {
      id: 'a1000001-0000-4000-8000-000000000046', // Pablo García (Fútbol)
      fullName: 'Pablo García',
      birthDate: '2014-04-12',
      sport: 'futbol',
      sportLabel: 'Fútbol',
      team: 'Alevín C Fútbol',
      category: 'Alevín',
      dorsal: 10,
      avatarIcon: '👦',
    },
    {
      id: 'a1000001-0000-4000-8000-000000000047', // Laura García (Baloncesto)
      fullName: 'Laura García',
      birthDate: '2012-08-25',
      sport: 'baloncesto',
      sportLabel: 'Baloncesto',
      team: 'Infantil A Baloncesto',
      category: 'Infantil',
      dorsal: 7,
      avatarIcon: '👧',
    },
    {
      id: 'a1000001-0000-4000-8000-000000000048', // Sergio García (Fútbol Sala)
      fullName: 'Sergio García',
      birthDate: '2016-01-18',
      sport: 'futbol_sala',
      sportLabel: 'Fútbol Sala',
      team: 'Benjamín A Futsal',
      category: 'Benjamín',
      dorsal: 5,
      avatarIcon: '👦',
    },
  ],
};

/**
 * Arquitectura de Vinculación Familiar Futura:
 * La futura vinculación de familias utilizará:
 * - Correo electrónico de la familia (familyEmail)
 * - Nombre completo del jugador (playerFullName)
 * - Fecha de nacimiento (playerBirthDate)
 * NOTA DE SEGURIDAD: NUNCA se utilizará DNI para vincular menores de edad.
 */
export interface FamilyLinkRequest {
  familyEmail: string;
  playerFullName: string;
  playerBirthDate: string; // Formato YYYY-MM-DD
}
