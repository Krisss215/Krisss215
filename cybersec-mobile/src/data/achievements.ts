import { Achievement } from '../types';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-blood',   title: 'Первый шаг',        description: 'Завершил первый урок',       icon: '🎯', xp: 50,   check: p => p.completedLessons.length >= 1 },
  { id: 'stage-one',     title: 'Первый раздел',      description: 'Завершил первый раздел',     icon: '🏁', xp: 150,  check: p => p.completedStages.length >= 1 },
  { id: 'quiz-ace',      title: 'Знаток',             description: 'Прошёл 5 тестов',            icon: '🧠', xp: 100,  check: p => p.completedLessons.filter(l => l.includes('quiz')).length >= 5 },
  { id: 'terminal-guru', title: 'Терминальщик',       description: 'Завершил 3 терминала',       icon: '💻', xp: 200,  check: p => p.completedLessons.filter(l => l.includes('term')).length >= 3 },
  { id: 'on-fire',       title: 'В огне',             description: '5 дней подряд',              icon: '🔥', xp: 250,  check: p => p.streak >= 5 },
  { id: 'halfway',       title: 'На полпути',         description: 'Завершил 4 раздела',         icon: '⚡', xp: 400,  check: p => p.completedStages.length >= 4 },
  { id: 'hacker-born',   title: 'Рождённый хакером',  description: 'Достиг ранга Пентестер',     icon: '⚔️', xp: 500,  check: p => p.xp >= 3200 },
  { id: 'legend',        title: 'Легенда',            description: 'Завершил все разделы',        icon: '👑', xp: 1000, check: p => p.completedStages.length >= 8 },
];
