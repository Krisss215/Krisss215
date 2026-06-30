import React from 'react';
import { Module } from '../types';

interface Props {
  module: Module;
  completedLessons: string[];
  isCompleted: boolean;
  onClick: () => void;
}

const difficultyColor: Record<string, string> = {
  Beginner: 'text-green-400 bg-green-900/30 border-green-800',
  Intermediate: 'text-yellow-400 bg-yellow-900/30 border-yellow-800',
  Advanced: 'text-red-400 bg-red-900/30 border-red-800',
};

const difficultyLabel: Record<string, string> = {
  Beginner: 'Начальный',
  Intermediate: 'Средний',
  Advanced: 'Продвинутый',
};

export const ModuleCard: React.FC<Props> = ({ module, completedLessons, isCompleted, onClick }) => {
  const totalLessons = module.lessons.length;
  const doneLessons = module.lessons.filter(l => completedLessons.includes(l.id)).length;
  const progress = totalLessons > 0 ? (doneLessons / totalLessons) * 100 : 0;

  return (
    <button
      onClick={onClick}
      className="w-full text-left group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-5 transition-opacity`} />

      <div className={`h-1.5 bg-gradient-to-r ${module.color}`} style={{ width: `${progress}%`, transition: 'width 0.5s' }} />
      <div className="h-0.5 bg-gray-800 -mt-0.5" />

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
            {module.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="font-bold text-white text-base">{module.title}</h3>
              {isCompleted && (
                <span className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-xs text-white flex-shrink-0">✓</span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-snug mb-3">{module.description}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${difficultyColor[module.difficulty]}`}>
                {difficultyLabel[module.difficulty]}
              </span>
              <span className="text-xs text-gray-500">
                {totalLessons} {totalLessons === 1 ? 'урок' : totalLessons < 5 ? 'урока' : 'уроков'}
              </span>
              {doneLessons > 0 && (
                <span className="text-xs text-indigo-400">
                  {doneLessons}/{totalLessons} пройдено
                </span>
              )}
            </div>
          </div>
        </div>

        {doneLessons > 0 && (
          <div className="mt-4">
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${module.color} rounded-full transition-all duration-700`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </button>
  );
};
