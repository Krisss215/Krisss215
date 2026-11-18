import React, { useState, useCallback } from 'react';
import { Stage } from './types';
import { STAGES } from './data/stages';
import { useProgress } from './hooks/useProgress';
import { RoadmapView } from './components/RoadmapView';
import { StageView } from './components/StageView';
import { LessonView } from './components/LessonView';
import { ProfileView } from './components/ProfileView';

type Screen =
  | { type: 'roadmap' }
  | { type: 'stage'; stage: Stage }
  | { type: 'lesson'; stage: Stage; lessonIdx: number }
  | { type: 'profile' };

interface Toast { id: number; msg: string; type: 'success' | 'xp' | 'achievement' }

let toastId = 0;

export default function App() {
  const { progress, completeLesson, reset } = useProgress();
  const [screen, setScreen] = useState<Screen>({ type: 'roadmap' });
  const [tab, setTab] = useState<'roadmap' | 'profile'>('roadmap');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((msg: string, type: Toast['type'] = 'success') => {
    const id = ++toastId;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  }, []);

  const handleCompleteLesson = useCallback((stage: Stage, lessonIdx: number) => {
    const lesson = stage.lessons[lessonIdx];
    const allIds = stage.lessons.map(l => l.id);
    const xpGain = Math.round(stage.xpReward / stage.lessons.length);

    if (progress.completedLessons.includes(lesson.id)) return;

    const { stageCompleted, newAchievements } = completeLesson(lesson.id, stage.id, allIds, xpGain);

    addToast(`+${xpGain} XP`, 'xp');

    if (stageCompleted) {
      setTimeout(() => addToast(`🏆 Раздел «${stage.title}» завершён! +100 бонус XP`, 'success'), 500);
      const nextStage = STAGES.find(s => s.requiresStage === stage.id);
      if (nextStage) {
        setTimeout(() => addToast(`🔓 Разблокирован: ${nextStage.icon} ${nextStage.title}`, 'achievement'), 1200);
      }
    }

    newAchievements.forEach((achId, i) => {
      const ach = (require('./data/achievements').ACHIEVEMENTS as any[]).find((a: any) => a.id === achId);
      if (ach) setTimeout(() => addToast(`🏅 Достижение: ${ach.title}`, 'achievement'), 800 + i * 700);
    });
  }, [progress, completeLesson, addToast]);

  const goTo = useCallback((s: Screen) => {
    setScreen(s);
    if (s.type === 'roadmap' || s.type === 'profile') {
      setTab(s.type === 'profile' ? 'profile' : 'roadmap');
    }
  }, []);

  if (screen.type === 'lesson') {
    const { stage, lessonIdx } = screen;
    const lesson = stage.lessons[lessonIdx];
    return (
      <>
        <LessonView
          lesson={lesson}
          stage={stage}
          lessonIdx={lessonIdx}
          totalLessons={stage.lessons.length}
          isCompleted={progress.completedLessons.includes(lesson.id)}
          onComplete={() => handleCompleteLesson(stage, lessonIdx)}
          onBack={() => goTo({ type: 'stage', stage })}
          onNext={() => {
            if (lessonIdx + 1 < stage.lessons.length) {
              goTo({ type: 'lesson', stage, lessonIdx: lessonIdx + 1 });
            } else {
              goTo({ type: 'stage', stage });
            }
          }}
        />
        <ToastStack toasts={toasts} />
      </>
    );
  }

  if (screen.type === 'stage') {
    return (
      <>
        <StageView
          stage={screen.stage}
          progress={progress}
          onSelectLesson={idx => goTo({ type: 'lesson', stage: screen.stage, lessonIdx: idx })}
          onBack={() => goTo({ type: 'roadmap' })}
        />
        <ToastStack toasts={toasts} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg">
              🛡️
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-none">CyberPath</p>
              <p className="text-xs text-gray-500">От нуля до профи</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-orange-400 font-semibold">🔥 {progress.streak}</span>
            <span className="flex items-center gap-1 text-yellow-400 font-semibold">⭐ {progress.xp}</span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 flex border-t border-gray-800">
          {([['roadmap', '🗺️ Роадмап'], ['profile', '👤 Профиль']] as const).map(([t, label]) => (
            <button
              key={t}
              onClick={() => { setTab(t); goTo({ type: t }); }}
              className={`flex-1 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1">
        {tab === 'roadmap' ? (
          <RoadmapView
            progress={progress}
            onSelectStage={stage => goTo({ type: 'stage', stage })}
          />
        ) : (
          <ProfileView progress={progress} onReset={reset} />
        )}
      </main>

      <ToastStack toasts={toasts} />
    </div>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-xl text-sm font-semibold shadow-2xl border transition-all ${
            t.type === 'xp'
              ? 'bg-yellow-900 border-yellow-700 text-yellow-300'
              : t.type === 'achievement'
              ? 'bg-purple-900 border-purple-700 text-purple-200'
              : 'bg-gray-800 border-gray-700 text-white'
          }`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
