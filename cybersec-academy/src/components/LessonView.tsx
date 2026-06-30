import React, { useState } from 'react';
import { Lesson, Module } from '../types';
import { TheoryLesson } from './TheoryLesson';
import { Quiz } from './Quiz';
import { Terminal } from './Terminal';

interface Props {
  lesson: Lesson;
  module: Module;
  lessonIndex: number;
  totalLessons: number;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

const typeLabel: Record<string, string> = {
  theory: '📖 Теория',
  quiz: '🧠 Тест',
  terminal: '💻 Терминал',
  challenge: '⚔️ Задание',
};

export const LessonView: React.FC<Props> = ({
  lesson, module, lessonIndex, totalLessons, isCompleted, onComplete, onBack, onNext
}) => {
  const [done, setDone] = useState(isCompleted);

  const handleComplete = (pts?: number) => {
    setDone(true);
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
          >
            ← Назад
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${module.color} text-white`}>
                {module.icon} {module.title}
              </span>
              <span>·</span>
              <span>{typeLabel[lesson.type] || lesson.type}</span>
              <span>·</span>
              <span>{lessonIndex + 1}/{totalLessons}</span>
            </div>
            <h1 className="font-bold text-white text-lg leading-tight">{lesson.title}</h1>
          </div>
          {done && (
            <span className="text-green-400 text-sm flex items-center gap-1">
              <span className="w-5 h-5 rounded-full bg-green-900 flex items-center justify-center text-xs">✓</span>
              Готово
            </span>
          )}
        </div>
        <div className="max-w-3xl mx-auto mt-2">
          <div className="h-1 bg-gray-800 rounded-full">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${module.color} transition-all`}
              style={{ width: `${((lessonIndex + (done ? 1 : 0)) / totalLessons) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 min-h-96">
          {lesson.type === 'theory' && (
            <TheoryLesson
              content={lesson.content}
              onComplete={handleComplete}
            />
          )}
          {lesson.type === 'quiz' && lesson.quiz && (
            <Quiz
              questions={lesson.quiz}
              onComplete={handleComplete}
            />
          )}
          {lesson.type === 'terminal' && lesson.terminalChallenge && (
            <Terminal
              challenge={lesson.terminalChallenge}
              onComplete={handleComplete}
            />
          )}
        </div>

        {done && lessonIndex < totalLessons - 1 && (
          <button
            onClick={onNext}
            className="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors text-lg"
          >
            Следующий урок →
          </button>
        )}
        {done && lessonIndex === totalLessons - 1 && (
          <button
            onClick={onBack}
            className="mt-4 w-full py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-lg"
          >
            🎉 Модуль завершён! Вернуться к курсам
          </button>
        )}
      </div>
    </div>
  );
};
