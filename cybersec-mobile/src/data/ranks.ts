import { Rank } from '../types';

export const RANKS: Rank[] = [
  { minXp: 0,    title: 'Newbie',                  icon: '🐣', color: '#9ca3af' },
  { minXp: 200,  title: 'Curious',                 icon: '🔍', color: '#60a5fa' },
  { minXp: 600,  title: 'IT Enthusiast',           icon: '💡', color: '#22d3ee' },
  { minXp: 1200, title: 'Sysadmin',                icon: '🖥️', color: '#4ade80' },
  { minXp: 2000, title: 'Security Analyst',        icon: '🛡️', color: '#facc15' },
  { minXp: 3200, title: 'Pentester',               icon: '⚔️', color: '#fb923c' },
  { minXp: 5000, title: 'Cybersecurity Expert',    icon: '👑', color: '#c084fc' },
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
