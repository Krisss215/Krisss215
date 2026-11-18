import React from 'react';
import { Stage, UserProgress } from '../types';

interface Props {
  stage: Stage;
  progress: UserProgress;
  onSelectLesson: (lessonIdx: number) => void;
  onBack: () => void;
}

const typeIcon: Record<string, string> = {
  theory: '📖',
  quiz: '🧠',
  terminal: '💻',
  practice: '⚔️',
};
const typeLabel: Record<string, string> = {
  theory: 'Теория',
  quiz: 'Тест',
  terminal: 'Терминал',
  practice: 'Практика',
};

export const StageView: React.FC<Props> = ({ stage, progress, onSelectLesson, onBack }) => {
  const doneLessons = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const pct = Math.round((doneLessons / stage.lessons.length) * 100);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className={`bg-gradient-to-br ${stage.bgColor} border-b border-gray-800`}>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <button onClick={onBack} className="text-white/60 hover:text-white text-sm mb-4 flex items-center gap-1">
            ← Роадмап
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl"
              style={{ background: `${stage.color}33`, border: `2px solid ${stage.color}66` }}
            >
              {stage.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{stage.title}</h1>
              <p className="text-white/60 text-sm">{stage.subtitle}</p>
            </div>
          </div>
          <p className="text-white/70 text-sm mb-4">{stage.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/80 rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-white font-bold text-sm">{doneLessons}/{stage.lessons.length}</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Skills */}
        <div className="mb-5">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Навыки этого раздела</p>
          <div className="flex flex-wrap gap-2">
            {stage.skills.map(skill => (
              <span key={skill} className="text-xs bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Reward */}
        <div className="bg-yellow-900/20 border border-yellow-800/40 rounded-xl p-3 mb-5 flex items-center gap-3">
          <span className="text-xl">🏆</span>
          <div>
            <p className="text-yellow-300 font-semibold text-sm">Награда за завершение</p>
            <p className="text-yellow-600 text-xs">+{stage.xpReward} XP + разблокировка следующего уровня</p>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {stage.lessons.map((lesson, idx) => {
            const done = progress.completedLessons.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(idx)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  done
                    ? 'bg-green-950/30 border-green-800/50 hover:border-green-700'
                    : 'bg-gray-900 border-gray-800 hover:border-gray-600 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                    done ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'
                  }`}>
                    {done ? '✓' : typeIcon[lesson.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm">{lesson.title}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-gray-500">{typeLabel[lesson.type]}</span>
                      <span className="text-xs text-gray-600">~{lesson.duration} мин</span>
                      {done && <span className="text-xs text-green-400">Завершён</span>}
                    </div>
                  </div>
                  <span className="text-gray-600 flex-shrink-0">→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
