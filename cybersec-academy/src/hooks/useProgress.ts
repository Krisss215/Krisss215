import { useState, useEffect, useCallback } from 'react';
import { UserProgress } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';

const KEY = 'cybersec_pro_v2';

const init: UserProgress = {
  xp: 0,
  level: 1,
  completedLessons: [],
  completedStages: [],
  achievements: [],
  streak: 1,
  lastActiveDate: new Date().toDateString(),
  startedAt: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return init;
      const p = JSON.parse(raw) as UserProgress;
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
    } catch {
      return init;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress]);

  const checkAchievements = useCallback((p: UserProgress): string[] => {
    return ACHIEVEMENTS
      .filter(a => !p.achievements.includes(a.id) && a.check(p))
      .map(a => a.id);
  }, []);

  const completeLesson = useCallback((
    lessonId: string,
    stageId: string,
    stageLessonIds: string[],
    xpGain: number,
  ): { newAchievements: string[]; stageCompleted: boolean } => {
    let newAchievements: string[] = [];
    let stageCompleted = false;

    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const newLessons = [...prev.completedLessons, lessonId];
      const allStageDone = stageLessonIds.every(id => newLessons.includes(id));
      const newStages = allStageDone && !prev.completedStages.includes(stageId)
        ? [...prev.completedStages, stageId]
        : prev.completedStages;

      stageCompleted = allStageDone && !prev.completedStages.includes(stageId);

      const newXp = prev.xp + xpGain + (stageCompleted ? 100 : 0);
      const newLevel = Math.floor(newXp / 300) + 1;

      const updated: UserProgress = {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedLessons: newLessons,
        completedStages: newStages,
        lastActiveDate: new Date().toDateString(),
      };

      newAchievements = checkAchievements(updated);
      updated.achievements = [...prev.achievements, ...newAchievements];
      return updated;
    });

    return { newAchievements, stageCompleted };
  }, [checkAchievements]);

  const reset = useCallback(() => setProgress({ ...init, startedAt: new Date().toISOString() }), []);

  return { progress, completeLesson, reset };
}
