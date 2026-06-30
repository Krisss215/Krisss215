import React, { useState } from 'react';
import { Lesson, Stage } from '../types';
import { TheoryLesson } from './TheoryLesson';
import { QuizLesson } from './QuizLesson';
import { TerminalLesson } from './TerminalLesson';

const typeLabel: Record<string, string> = {
  theory: '📖 Теория',
  quiz: '🧠 Тест',
  terminal: '💻 Терминал',
  practice: '⚔️ Практика',
};

interface Props {
  lesson: Lesson;
  stage: Stage;
  lessonIdx: number;
  totalLessons: number;
  isCompleted: boolean;
  onComplete: () => void;
  onBack: () => void;
  onNext: () => void;
}

export const LessonView: React.FC<Props> = ({
  lesson, stage, lessonIdx, totalLessons, isCompleted, onComplete, onBack, onNext
}) => {
  const [done, setDone] = useState(isCompleted);

  const handleDone = () => {
    setDone(true);
    onComplete();
  };

  const pct = ((lessonIdx + (done ? 1 : 0)) / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-gray-900 border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={onBack} className="text-gray-500 hover:text-white transition-colors text-sm">←</button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-xs text-gray-600 mb-0.5">
                <span className="text-gray-400">{stage.icon} {stage.title}</span>
                <span>·</span>
                <span>{typeLabel[lesson.type]}</span>
                <span>·</span>
                <span>{lessonIdx + 1}/{totalLessons}</span>
              </div>
              <h1 className="text-white font-bold text-sm leading-tight truncate">{lesson.title}</h1>
            </div>
            {done && <span className="text-green-400 text-xs flex-shrink-0 flex items-center gap-1">✓ Готово</span>}
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${pct}%`, background: stage.color }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-5">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 mb-4">
          {lesson.type === 'theory' && lesson.content && (
            <TheoryLesson content={lesson.content} onComplete={handleDone} />
          )}
          {lesson.type === 'quiz' && lesson.quiz && (
            <QuizLesson questions={lesson.quiz} onComplete={handleDone} />
          )}
          {lesson.type === 'terminal' && lesson.terminal && (
            <TerminalLesson
              intro={lesson.terminal.intro}
              goal={lesson.terminal.goal}
              steps={lesson.terminal.steps}
              onComplete={handleDone}
            />
          )}
        </div>

        {done && lessonIdx < totalLessons - 1 && (
          <button
            onClick={onNext}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors text-base"
          >
            Следующий урок →
          </button>
        )}
        {done && lessonIdx === totalLessons - 1 && (
          <button
            onClick={onBack}
            className="w-full py-4 bg-green-700 hover:bg-green-600 text-white font-bold rounded-2xl transition-colors text-base"
          >
            🎉 Раздел завершён!
          </button>
        )}
      </div>
    </div>
  );
};
