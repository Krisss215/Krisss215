import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface Props {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<Props> = ({ questions, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === q.correctIndex;
    if (isCorrect) setCorrect(prev => prev + 1);
    setAnswers(prev => [...prev, isCorrect]);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const scorePercent = Math.round((correct / questions.length) * 100);

  if (showResults) {
    return (
      <div className="text-center py-8">
        <div className={`text-6xl mb-4 ${scorePercent >= 70 ? 'text-green-400' : 'text-yellow-400'}`}>
          {scorePercent >= 90 ? '🏆' : scorePercent >= 70 ? '🎉' : '📚'}
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          {scorePercent >= 90 ? 'Превосходно!' : scorePercent >= 70 ? 'Хорошая работа!' : 'Нужно повторить!'}
        </h2>
        <p className="text-gray-400 mb-6">
          {correct} из {questions.length} правильных ответов
        </p>

        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#374151" strokeWidth="3" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={scorePercent >= 70 ? '#10b981' : '#f59e0b'}
              strokeWidth="3"
              strokeDasharray={`${scorePercent} ${100 - scorePercent}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{scorePercent}%</span>
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {answers.map((a, i) => (
            <span key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${a ? 'bg-green-700 text-green-200' : 'bg-red-800 text-red-200'}`}>
              {a ? '✓' : '✗'}
            </span>
          ))}
        </div>

        <button
          onClick={() => onComplete(correct * 50)}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
        >
          Завершить урок →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-400">Вопрос {current + 1} из {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < current ? (answers[i] ? 'bg-green-400' : 'bg-red-400') :
                i === current ? 'bg-indigo-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-6 leading-relaxed">{q.question}</h3>

      <div className="space-y-3 mb-6">
        {q.options.map((opt, idx) => {
          let cls = 'border-gray-700 bg-gray-800 hover:border-indigo-500 hover:bg-gray-750 cursor-pointer';
          if (answered) {
            if (idx === q.correctIndex) cls = 'border-green-500 bg-green-900/40';
            else if (idx === selected) cls = 'border-red-500 bg-red-900/40';
            else cls = 'border-gray-700 bg-gray-800 opacity-50';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${cls}`}
            >
              <div className="flex items-start gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  answered && idx === q.correctIndex ? 'bg-green-500 text-white' :
                  answered && idx === selected && idx !== q.correctIndex ? 'bg-red-500 text-white' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {answered && idx === q.correctIndex ? '✓' :
                   answered && idx === selected && idx !== q.correctIndex ? '✗' :
                   String.fromCharCode(65 + idx)}
                </span>
                <span className="text-gray-200 pt-0.5">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`p-4 rounded-lg mb-6 border ${
          selected === q.correctIndex
            ? 'bg-green-900/30 border-green-700'
            : 'bg-red-900/30 border-red-700'
        }`}>
          <p className={`text-sm font-semibold mb-1 ${selected === q.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
            {selected === q.correctIndex ? '✅ Правильно!' : '❌ Неправильно'}
          </p>
          <p className="text-gray-300 text-sm">{q.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
        >
          {current + 1 < questions.length ? 'Следующий вопрос →' : 'Посмотреть результаты'}
        </button>
      )}
    </div>
  );
};
