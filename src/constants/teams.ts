export const OFFICIAL_CATEGORIES = [
  'Juvenil',
  'Cadete',
  'Infantil',
  'Alevín',
  'Benjamín',
  'Prebenjamín',
  'Querubín'
];

export const OFFICIAL_TEAMS_MAP: Record<string, string[]> = {
  'Juvenil': ['Juvenil A', 'Juvenil B'],
  'Cadete': ['Cadete A', 'Cadete B', 'Cadete C', 'Cadete D', 'Cadete E', 'Cadete Femenino'],
  'Infantil': ['Infantil A', 'Infantil B', 'Infantil C', 'Infantil D', 'Infantil E', 'Infantil Femenino'],
  'Alevín': ['Alevín A', 'Alevín B', 'Alevín C', 'Alevín D', 'Alevín E', 'Alevín F', 'Alevín G', 'Alevín H'],
  'Benjamín': ['Benjamín A', 'Benjamín B', 'Benjamín C', 'Benjamín D', 'Benjamín E'],
  'Prebenjamín': ['Prebenjamín A', 'Prebenjamín B', 'Prebenjamín C'],
  'Querubín': ['Querubín']
};

export const ALL_OFFICIAL_TEAMS = Object.values(OFFICIAL_TEAMS_MAP).flat();
