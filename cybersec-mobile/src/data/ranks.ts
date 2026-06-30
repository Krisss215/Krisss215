import { Rank } from '../types';

export const RANKS: Rank[] = [
  { minXp: 0,    title: 'Новичок',             icon: '🐣', color: '#9ca3af' },
  { minXp: 200,  title: 'Любопытный',          icon: '🔍', color: '#60a5fa' },
  { minXp: 600,  title: 'IT-энтузиаст',        icon: '💡', color: '#22d3ee' },
  { minXp: 1200, title: 'Сисадмин',            icon: '🖥️', color: '#4ade80' },
  { minXp: 2000, title: 'Аналитик ИБ',         icon: '🛡️', color: '#facc15' },
  { minXp: 3200, title: 'Пентестер',           icon: '⚔️', color: '#fb923c' },
  { minXp: 5000, title: 'Эксперт по кибербезопасности', icon: '👑', color: '#c084fc' },
];

export function getRank(xp: number): Rank {
  let r = RANKS[0];
  for (const rank of RANKS) { if (xp >= rank.minXp) r = rank; }
  return r;
}

export function getNextRank(xp: number): Rank | null {
  for (const r of RANKS) { if (xp < r.minXp) return r; }
  return null;
}
