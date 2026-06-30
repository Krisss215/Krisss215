import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Первый шаг',
    description: 'Завершил первый урок',
    icon: '🎯',
    condition: (p) => p.completedLessons.length >= 1,
  },
  {
    id: 'quiz-master',
    title: 'Мастер тестов',
    description: 'Прошёл 3 викторины',
    icon: '🧠',
    condition: (p) => p.completedLessons.filter(l => l.includes('q')).length >= 3,
  },
  {
    id: 'module-complete',
    title: 'Завершил модуль',
    description: 'Полностью завершил первый модуль',
    icon: '🏆',
    condition: (p) => p.completedModules.length >= 1,
  },
  {
    id: 'hacker-score',
    title: 'Начинающий хакер',
    description: 'Набрал 500 очков',
    icon: '💻',
    condition: (p) => p.score >= 500,
  },
  {
    id: 'three-modules',
    title: 'Разносторонний',
    description: 'Завершил 3 модуля',
    icon: '🌟',
    condition: (p) => p.completedModules.length >= 3,
  },
  {
    id: 'streak-3',
    title: 'На волне',
    description: '3 дня подряд',
    icon: '🔥',
    condition: (p) => p.streak >= 3,
  },
  {
    id: 'all-modules',
    title: 'Кибер-эксперт',
    description: 'Завершил все модули',
    icon: '👑',
    condition: (p) => p.completedModules.length >= 6,
  },
];
