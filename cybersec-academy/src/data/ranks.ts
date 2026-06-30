import { Rank } from '../types';

export const RANKS: Rank[] = [
  { minXp: 0,    title: 'Новичок',                icon: '🐣', color: 'text-gray-400' },
  { minXp: 200,  title: 'Любопытный',             icon: '🔍', color: 'text-blue-400' },
  { minXp: 600,  title: 'IT-энтузиаст',           icon: '💡', color: 'text-cyan-400' },
  { minXp: 1200, title: 'Системный администратор', icon: '🖥️', color: 'text-green-400' },
  { minXp: 2000, title: 'Аналитик безопасности',  icon: '🛡️', color: 'text-yellow-400' },
  { minXp: 3200, title: 'Пентестер',              icon: '⚔️', color: 'text-orange-400' },
  { minXp: 5000, title: 'Эксперт по кибербезопасности', icon: '👑', color: 'text-purple-400' },
];

export function getRank(xp: number): Rank {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) rank = r;
  }
  return rank;
}

export function getNextRank(xp: number): Rank | null {
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}
