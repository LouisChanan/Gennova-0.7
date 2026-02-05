export enum TraitLevel {
  GIFTED = 'GIFTED',
  EXCELLENT = 'EXCELLENT',
  STRONG = 'STRONG',
  POTENTIAL = 'POTENTIAL',
  NORMAL = 'NORMAL'
}

export interface Trait {
  id: string;
  category: 'Talent' | 'Nutrition' | 'Health';
  name: string;
  description: string;
  level: TraitLevel;
  score: number; // 0-100
  iconName: string;
}

export interface ChartDataPoint {
  subject: string;
  A: number; // User score
  fullMark: number;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
}