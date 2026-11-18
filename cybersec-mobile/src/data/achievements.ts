import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blood',   title: 'First Step',        description: 'Completed your first lesson',   icon: '🎯', xp: 50,   check: p => p.completedLessons.length >= 1 },
  { id: 'stage-one',     title: 'First Stage',        description: 'Completed your first stage',    icon: '🏁', xp: 150,  check: p => p.completedStages.length >= 1 },
  { id: 'quiz-ace',      title: 'Quiz Ace',           description: 'Passed 5 quizzes',              icon: '🧠', xp: 100,  check: p => p.completedLessons.filter(l => l.includes('quiz')).length >= 5 },
  { id: 'terminal-guru', title: 'Terminal Guru',      description: 'Completed 3 terminal lessons',  icon: '💻', xp: 200,  check: p => p.completedLessons.filter(l => l.includes('term')).length >= 3 },
  { id: 'on-fire',       title: 'On Fire',            description: '5 days in a row',               icon: '🔥', xp: 250,  check: p => p.streak >= 5 },
  { id: 'halfway',       title: 'Halfway There',      description: 'Completed 4 stages',            icon: '⚡', xp: 400,  check: p => p.completedStages.length >= 4 },
  { id: 'hacker-born',   title: 'Born Hacker',        description: 'Reached the Pentester rank',    icon: '⚔️', xp: 500,  check: p => p.xp >= 3200 },
  { id: 'legend',        title: 'Legend',             description: 'Completed all stages',          icon: '👑', xp: 1000, check: p => p.completedStages.length >= 8 },
];
