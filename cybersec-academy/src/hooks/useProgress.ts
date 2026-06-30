import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { achievements } from '../data/achievements';

const STORAGE_KEY = 'cybersec_progress';

const defaultProgress: UserProgress = {
  completedLessons: [],
  completedModules: [],
  score: 0,
  achievements: [],
  streak: 1,
  lastActiveDate: new Date().toDateString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const p = JSON.parse(stored) as UserProgress;
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (p.lastActiveDate === yesterday) {
        p.streak = (p.streak || 1) + 1;
        p.lastActiveDate = today;
      } else if (p.lastActiveDate !== today) {
        p.streak = 1;
        p.lastActiveDate = today;
      }
      return p;
    }
    return defaultProgress;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const checkAchievements = useCallback((p: UserProgress): string[] => {
    const newAchievements: string[] = [];
    for (const a of achievements) {
      if (!p.achievements.includes(a.id) && a.condition(p)) {
        newAchievements.push(a.id);
      }
    }
    return newAchievements;
  }, []);

  const completeLesson = useCallback((lessonId: string, moduleId: string, moduleLessonIds: string[], points = 100) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const newCompleted = [...prev.completedLessons, lessonId];
      const allDone = moduleLessonIds.every(id => newCompleted.includes(id));
      const newModules = allDone && !prev.completedModules.includes(moduleId)
        ? [...prev.completedModules, moduleId]
        : prev.completedModules;

      const updated: UserProgress = {
        ...prev,
        completedLessons: newCompleted,
        completedModules: newModules,
        score: prev.score + points + (allDone ? 200 : 0),
        lastActiveDate: new Date().toDateString(),
      };
      const newAch = checkAchievements(updated);
      updated.achievements = [...prev.achievements, ...newAch];
      return updated;
    });
  }, [checkAchievements]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  return { progress, completeLesson, resetProgress };
}
