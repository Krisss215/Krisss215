import React from 'react';
import { Module } from '../types';

interface Props {
  module: Module;
  completedLessons: string[];
  onSelectLesson: (lessonIndex: number) => void;
  onBack: () => void;
}

const typeIcon: Record<string, string> = {
  theory: '📖',
  quiz: '🧠',
  terminal: '💻',
  challenge: '⚔️',
};

const typeLabel: Record<string, string> = {
  theory: 'Теория',
  quiz: 'Викторина',
  terminal: 'Терминал',
  challenge: 'Задание',
};

export const ModuleView: React.FC<Props> = ({ module, completedLessons, onSelectLesson, onBack }) => {
  const totalLessons = module.lessons.length;
  const doneLessons = module.lessons.filter(l => completedLessons.includes(l.id)).length;
  const progress = (doneLessons / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className={`bg-gradient-to-br ${module.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="text-white/70 hover:text-white mb-4 flex items-center gap-1 transition-colors"
          >
            ← Все курсы
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{module.icon}</div>
            <div>
              <h1 className="text-3xl font-bold text-white">{module.title}</h1>
              <p className="text-white/70 mt-1">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white font-bold whitespace-nowrap">
              {doneLessons}/{totalLessons} уроков
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-gray-300 mb-4">Программа курса</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = false;

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(idx)}
                className={`w-full text-left bg-gray-900 border rounded-xl p-4 transition-all hover:border-gray-600 ${
                  isCompleted ? 'border-green-800' : isLocked ? 'border-gray-800 opacity-60 cursor-not-allowed' : 'border-gray-800'
                }`}
                disabled={isLocked}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
                    isCompleted
                      ? 'bg-green-900 text-green-300'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {isCompleted ? '✓' : typeIcon[lesson.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{lesson.title}</span>
                      {isCompleted && (
                        <span className="text-xs text-green-400">Завершён</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 mt-0.5">
                      {typeIcon[lesson.type]} {typeLabel[lesson.type]}
                    </span>
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
