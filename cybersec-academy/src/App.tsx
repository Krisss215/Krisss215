import React, { useState } from 'react';
import { modules } from './data/modules';
import { useProgress } from './hooks/useProgress';
import { ModuleCard } from './components/ModuleCard';
import { ModuleView } from './components/ModuleView';
import { LessonView } from './components/LessonView';
import { Dashboard } from './components/Dashboard';
import { Module } from './types';

type Screen =
  | { type: 'home' }
  | { type: 'module'; module: Module }
  | { type: 'lesson'; module: Module; lessonIndex: number }
  | { type: 'dashboard' };

function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 border border-gray-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm font-medium">
      {message}
    </div>
  );
}

export default function App() {
  const { progress, completeLesson, resetProgress } = useProgress();
  const [screen, setScreen] = useState<Screen>({ type: 'home' });
  const [activeTab, setActiveTab] = useState<'courses' | 'progress'>('courses');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCompleteLesson = (module: Module, lessonIndex: number) => {
    const lesson = module.lessons[lessonIndex];
    const allIds = module.lessons.map(l => l.id);
    const alreadyCompleted = progress.completedLessons.includes(lesson.id);
    const updatedCompleted = alreadyCompleted
      ? progress.completedLessons
      : [...progress.completedLessons, lesson.id];
    const nowModuleDone = allIds.every(id => updatedCompleted.includes(id));
    const wasModuleDone = progress.completedModules.includes(module.id);

    completeLesson(lesson.id, module.id, allIds);

    if (nowModuleDone && !wasModuleDone) {
      showToast(`🎉 Модуль "${module.title}" завершён! +200 очков`);
    } else if (!alreadyCompleted) {
      showToast(`✅ Урок завершён! +100 очков`);
    }
  };

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;

  if (screen.type === 'lesson') {
    const { module, lessonIndex } = screen;
    const lesson = module.lessons[lessonIndex];
    return (
      <>
        <LessonView
          lesson={lesson}
          module={module}
          lessonIndex={lessonIndex}
          totalLessons={module.lessons.length}
          isCompleted={progress.completedLessons.includes(lesson.id)}
          onComplete={() => handleCompleteLesson(module, lessonIndex)}
          onBack={() => setScreen({ type: 'module', module })}
          onNext={() => {
            if (lessonIndex + 1 < module.lessons.length) {
              setScreen({ type: 'lesson', module, lessonIndex: lessonIndex + 1 });
            } else {
              setScreen({ type: 'module', module });
            }
          }}
        />
        {toastMsg && <Toast message={toastMsg} />}
      </>
    );
  }

  if (screen.type === 'module') {
    const { module } = screen;
    return (
      <>
        <ModuleView
          module={module}
          completedLessons={progress.completedLessons}
          onSelectLesson={(idx) => setScreen({ type: 'lesson', module, lessonIndex: idx })}
          onBack={() => setScreen({ type: 'home' })}
        />
        {toastMsg && <Toast message={toastMsg} />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-20 bg-gray-900/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg">
              🛡️
            </div>
            <div>
              <h1 className="font-bold text-white text-sm leading-none">CyberSec Academy</h1>
              <p className="text-xs text-gray-500">Кибербезопасность для всех</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm">
              <span>🔥</span>
              <span className="text-gray-300 font-semibold">{progress.streak}</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span>⭐</span>
              <span className="text-gray-300 font-semibold">{progress.score}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-[57px] z-10 bg-gray-900 border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-4 flex">
          {(['courses', 'progress'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'courses' ? '📚 Курсы' : '📊 Прогресс'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'courses' ? (
        <main className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-br from-indigo-900/60 to-purple-900/60 rounded-2xl border border-indigo-800/50 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🔐</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-1">Изучи кибербезопасность</h2>
                <p className="text-gray-400 text-sm mb-4">
                  От основ до продвинутых техник. Интерактивные уроки, терминальные задания и тесты.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-800 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${Math.round((completedCount / totalLessons) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-300 font-semibold whitespace-nowrap">
                    {completedCount}/{totalLessons} уроков
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Модулей', value: modules.length, icon: '📦' },
              { label: 'Уроков', value: totalLessons, icon: '📖' },
              { label: 'Очков', value: progress.score, icon: '🏆' },
            ].map(s => (
              <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="font-bold text-white text-lg">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Все курсы</h2>
            <span className="text-sm text-gray-500">{modules.length} модулей</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map(mod => (
              <ModuleCard
                key={mod.id}
                module={mod}
                completedLessons={progress.completedLessons}
                isCompleted={progress.completedModules.includes(mod.id)}
                onClick={() => setScreen({ type: 'module', module: mod })}
              />
            ))}
          </div>

          <div className="mt-8 text-center text-gray-600 text-xs">
            <p>CyberSec Academy — учись, практикуйся, защищай</p>
            <p className="mt-1">⚠️ Используй знания только в законных целях!</p>
          </div>
        </main>
      ) : (
        <Dashboard progress={progress} onReset={resetProgress} />
      )}

      {toastMsg && <Toast message={toastMsg} />}
    </div>
  );
}
