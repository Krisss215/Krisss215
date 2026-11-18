import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProgress } from '../types';
import { ACHIEVEMENTS } from '../data/achievements';

const KEY = '@cyberpath_progress_v1';

const INIT: UserProgress = {
  xp: 0,
  completedLessons: [],
  completedStages: [],
  achievements: [],
  streak: 1,
  lastActiveDate: new Date().toDateString(),
  startedAt: new Date().toISOString(),
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(INIT);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) {
        try {
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
          setProgress(p);
        } catch { setProgress(INIT); }
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(progress));
  }, [progress, loaded]);

  const checkAchievements = useCallback((p: UserProgress): string[] =>
    ACHIEVEMENTS.filter(a => !p.achievements.includes(a.id) && a.check(p)).map(a => a.id),
  []);

  const completeLesson = useCallback((
    lessonId: string,
    stageId: string,
    stageLessonIds: string[],
    xpGain: number,
  ): { newAchievements: string[]; stageCompleted: boolean } => {
    let result = { newAchievements: [] as string[], stageCompleted: false };

    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const newLessons = [...prev.completedLessons, lessonId];
      const allDone = stageLessonIds.every(id => newLessons.includes(id));
      const newStages = allDone && !prev.completedStages.includes(stageId)
        ? [...prev.completedStages, stageId]
        : prev.completedStages;

      result.stageCompleted = allDone && !prev.completedStages.includes(stageId);

      const newXp = prev.xp + xpGain + (result.stageCompleted ? 100 : 0);

      const updated: UserProgress = {
        ...prev,
        xp: newXp,
        completedLessons: newLessons,
        completedStages: newStages,
        lastActiveDate: new Date().toDateString(),
      };

      result.newAchievements = checkAchievements(updated);
      updated.achievements = [...prev.achievements, ...result.newAchievements];
      return updated;
    });

    return result;
  }, [checkAchievements]);

  const reset = useCallback(() => {
    const fresh = { ...INIT, startedAt: new Date().toISOString() };
    setProgress(fresh);
    AsyncStorage.setItem(KEY, JSON.stringify(fresh));
  }, []);

  return { progress, completeLesson, reset, loaded };
}
