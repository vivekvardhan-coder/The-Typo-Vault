export interface TypoEntry {
  id: string;
  wrongWord: string;
  correctWord: string;
  person: string;
  context?: string;
  timestamp: Date;
  addedBy: string;
}

export interface User {
  id: string;
  name: string;
  title: string;
  isAdmin: boolean;
}

export interface LeaderboardEntry {
  person: string;
  count: number;
  title: string;
  percentage: number;
}