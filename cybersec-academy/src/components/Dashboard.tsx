import React from 'react';
import { UserProgress } from '../types';
import { modules } from '../data/modules';
import { achievements } from '../data/achievements';

interface Props {
  progress: UserProgress;
  onReset: () => void;
}

export const Dashboard: React.FC<Props> = ({ progress, onReset }) => {
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);


  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Мой профиль</h1>
          <p className="text-gray-400 text-sm mb-6">Отслеживай свой прогресс в обучении</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Очков', value: progress.score, icon: '⭐', color: 'text-yellow-400' },
              { label: 'Уроков', value: completedLessons, icon: '📚', color: 'text-blue-400' },
              { label: 'Модулей', value: progress.completedModules.length, icon: '🏆', color: 'text-green-400' },
              { label: 'Серия', value: `${progress.streak}д`, icon: '🔥', color: 'text-orange-400' },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Общий прогресс</span>
              <span className="text-white font-bold">{overallProgress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">{completedLessons} из {totalLessons} уроков завершено</p>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-bold text-white mb-4">🏅 Достижения</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map(a => {
              const unlocked = progress.achievements.includes(a.id);
              return (
                <div
                  key={a.id}
                  className={`rounded-xl p-3 border transition-all ${
                    unlocked
                      ? 'bg-yellow-900/20 border-yellow-700'
                      : 'bg-gray-800 border-gray-700 opacity-40'
                  }`}
                >
                  <div className="text-2xl mb-1">{unlocked ? a.icon : '🔒'}</div>
                  <div className={`text-sm font-semibold ${unlocked ? 'text-yellow-300' : 'text-gray-500'}`}>
                    {a.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-lg font-bold text-white mb-4">📊 Прогресс по модулям</h2>
          <div className="space-y-3">
            {modules.map(mod => {
              const done = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
              const total = mod.lessons.length;
              const pct = Math.round((done / total) * 100);
              return (
                <div key={mod.id} className="flex items-center gap-3">
                  <span className="text-xl w-8 flex-shrink-0 text-center">{mod.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 truncate">{mod.title}</span>
                      <span className="text-gray-500 ml-2 flex-shrink-0">{done}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${mod.color} rounded-full transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 w-10 text-right flex-shrink-0">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              if (window.confirm('Сбросить весь прогресс? Это действие нельзя отменить.')) {
                onReset();
              }
            }}
            className="text-sm text-gray-600 hover:text-red-400 transition-colors"
          >
            Сбросить прогресс
          </button>
        </div>
      </div>
    </div>
  );
};
