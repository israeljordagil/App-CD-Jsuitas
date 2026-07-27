// Place all shared TypeScript types and interfaces here.

export interface Team {
  id: string;
  name: string;
  category: string;
}

export interface Match {
  id: string;
  teamId: string;
  opponent: string;
  date: Date;
}
