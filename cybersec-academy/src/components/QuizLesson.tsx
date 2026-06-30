import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface Props {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const QuizLesson: React.FC<Props> = ({ questions, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const score = results.filter(Boolean).length;
  const pct = done ? Math.round((score / questions.length) * 100) : 0;

  const pick = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    setResults(r => [...r, i === q.correctIndex]);
  };

  const next = () => {
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-6xl mb-4">
          {pct >= 80 ? '🏆' : pct >= 60 ? '✅' : '📚'}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {pct >= 80 ? 'Отлично!' : pct >= 60 ? 'Хорошо!' : 'Нужно повторить'}
        </h3>
        <p className="text-gray-400 mb-6">{score} из {questions.length} правильных</p>

        <div className="relative w-28 h-28 mx-auto mb-6">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3.8" />
            <circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke={pct >= 80 ? '#10b981' : pct >= 60 ? '#3b82f6' : '#f59e0b'}
              strokeWidth="3.8"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">{pct}%</span>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mb-8">
          {results.map((r, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              r ? 'bg-green-800 text-green-200' : 'bg-red-900 text-red-300'
            }`}>
              {r ? '✓' : '✗'}
            </div>
          ))}
        </div>

        <button
          onClick={onComplete}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
        >
          Продолжить →
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <span className="text-sm text-gray-500">Вопрос {idx + 1} / {questions.length}</span>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full transition-colors ${
              i < idx ? (results[i] ? 'bg-green-500' : 'bg-red-500') :
              i === idx ? 'bg-indigo-400 scale-125' : 'bg-gray-700'
            }`} />
          ))}
        </div>
      </div>

      <h3 className="text-base font-semibold text-white mb-5 leading-relaxed">{q.question}</h3>

      <div className="space-y-2.5 mb-5">
        {q.options.map((opt, i) => {
          let cls = 'border-gray-700 bg-gray-800/50 hover:border-indigo-500 hover:bg-gray-800 cursor-pointer';
          if (answered) {
            if (i === q.correctIndex) cls = 'border-green-500 bg-green-900/30 cursor-default';
            else if (i === selected) cls = 'border-red-500 bg-red-900/30 cursor-default';
            else cls = 'border-gray-800 bg-gray-900/50 opacity-40 cursor-default';
          }
          return (
            <button key={i} onClick={() => pick(i)} className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${cls}`}>
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  answered && i === q.correctIndex ? 'bg-green-500 text-white' :
                  answered && i === selected && i !== q.correctIndex ? 'bg-red-500 text-white' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {answered && i === q.correctIndex ? '✓' :
                   answered && i === selected && i !== q.correctIndex ? '✗' :
                   String.fromCharCode(65 + i)}
                </span>
                <span className="text-gray-200 text-sm leading-snug">{opt}</span>
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <>
          <div className={`p-4 rounded-xl mb-5 border ${
            selected === q.correctIndex
              ? 'bg-green-950/40 border-green-700/50'
              : 'bg-red-950/40 border-red-700/50'
          }`}>
            <p className={`text-sm font-bold mb-1 ${selected === q.correctIndex ? 'text-green-400' : 'text-red-400'}`}>
              {selected === q.correctIndex ? '✅ Правильно!' : '❌ Неверно'}
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">{q.explanation}</p>
          </div>
          <button
            onClick={next}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
          >
            {idx + 1 < questions.length ? 'Следующий →' : 'Посмотреть результат'}
          </button>
        </>
      )}
    </div>
  );
};
