import React from 'react';
import { Stage, UserProgress } from '../types';
import { getRank, getNextRank } from '../data/ranks';
import { STAGES } from '../data/stages';

interface Props {
  progress: UserProgress;
  onSelectStage: (stage: Stage) => void;
}

const difficultyLabel: Record<string, string> = {
  zero: 'Абсолютный старт',
  beginner: 'Начальный',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
  expert: 'Эксперт',
};

const difficultyColor: Record<string, string> = {
  zero: 'bg-gray-700 text-gray-300',
  beginner: 'bg-green-900/60 text-green-300',
  intermediate: 'bg-yellow-900/60 text-yellow-300',
  advanced: 'bg-orange-900/60 text-orange-300',
  expert: 'bg-red-900/60 text-red-300',
};

export const RoadmapView: React.FC<Props> = ({ progress, onSelectStage }) => {
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const xpToNext = nextRank ? nextRank.minXp - progress.xp : 0;
  const xpPct = nextRank
    ? ((progress.xp - getRank(progress.xp).minXp) / (nextRank.minXp - getRank(progress.xp).minXp)) * 100
    : 100;

  const isUnlocked = (stage: Stage) => {
    if (!stage.requiresStage) return true;
    return progress.completedStages.includes(stage.requiresStage);
  };

  const getStageStatus = (stage: Stage) => {
    if (progress.completedStages.includes(stage.id)) return 'completed';
    if (!isUnlocked(stage)) return 'locked';
    const doneLessons = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    if (doneLessons > 0) return 'in-progress';
    return 'available';
  };

  const totalLessons = STAGES.reduce((s, st) => s + st.lessons.length, 0);
  const doneLessons = progress.completedLessons.length;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-gray-800 px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
              {rank.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider">Твой ранг</p>
              <h2 className={`text-xl font-bold ${rank.color}`}>{rank.title}</h2>
              <p className="text-sm text-gray-400">{progress.xp} XP заработано</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-orange-400 font-bold">
                <span>🔥</span><span>{progress.streak}</span>
              </div>
              <p className="text-xs text-gray-600">дней</p>
            </div>
          </div>

          {nextRank && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>До ранга «{nextRank.title}»</span>
                <span>{xpToNext} XP</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(xpPct, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { v: `${doneLessons}/${totalLessons}`, l: 'Уроков' },
              { v: progress.completedStages.length, l: 'Разделов' },
              { v: progress.achievements.length, l: 'Достижений' },
            ].map(s => (
              <div key={s.l} className="bg-gray-800/50 rounded-xl p-3 text-center">
                <div className="font-bold text-white text-lg">{s.v}</div>
                <div className="text-xs text-gray-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className="text-lg font-bold text-white mb-1">Путь от нуля до профи</h2>
        <p className="text-gray-500 text-sm mb-6">8 этапов · {totalLessons} уроков · Пройди всё чтобы стать экспертом</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-600 via-purple-600 to-emerald-600 opacity-30" />

          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const status = getStageStatus(stage);
              const doneLsns = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
              const pct = Math.round((doneLsns / stage.lessons.length) * 100);

              return (
                <div key={stage.id} className="relative flex gap-4">
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${
                        status === 'completed'
                          ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-900/50'
                          : status === 'in-progress'
                          ? `bg-gradient-to-br ${stage.bgColor.replace('from-', 'from-').replace('/60', '')} border-2 border-white/20 shadow-lg`
                          : status === 'available'
                          ? 'bg-gray-800 border-2 border-gray-600 hover:border-gray-400'
                          : 'bg-gray-900 border-2 border-gray-800 opacity-50'
                      }`}
                    >
                      {status === 'completed' ? '✓' : status === 'locked' ? '🔒' : stage.icon}
                    </div>
                  </div>

                  {/* Card */}
                  <button
                    onClick={() => status !== 'locked' && onSelectStage(stage)}
                    disabled={status === 'locked'}
                    className={`flex-1 text-left rounded-2xl border p-4 transition-all ${
                      status === 'locked'
                        ? 'bg-gray-900/40 border-gray-800 opacity-50 cursor-not-allowed'
                        : status === 'completed'
                        ? 'bg-green-950/30 border-green-800/50 hover:border-green-700'
                        : status === 'in-progress'
                        ? 'bg-gray-900 border-indigo-700/50 hover:border-indigo-600'
                        : 'bg-gray-900 border-gray-800 hover:border-gray-600 hover:-translate-y-0.5'
                    } hover:shadow-lg`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="font-bold text-white text-base leading-tight">{stage.title}</span>
                          {status === 'completed' && (
                            <span className="text-xs text-green-400 bg-green-900/40 px-2 py-0.5 rounded-full">Завершён</span>
                          )}
                          {status === 'in-progress' && (
                            <span className="text-xs text-indigo-400 bg-indigo-900/40 px-2 py-0.5 rounded-full">В процессе</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{stage.subtitle}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${difficultyColor[stage.difficulty]}`}>
                        {difficultyLabel[stage.difficulty]}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm mb-3 leading-snug">{stage.description}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs text-gray-600">{stage.lessons.length} уроков</span>
                      <span className="text-xs text-yellow-600">+{stage.xpReward} XP</span>
                      {stage.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {(status === 'in-progress' || status === 'completed') && (
                      <div className="mt-3">
                        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: `linear-gradient(to right, ${stage.color}, ${stage.color}88)`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{doneLsns}/{stage.lessons.length} уроков</p>
                      </div>
                    )}

                    {status === 'locked' && (
                      <p className="text-xs text-gray-600 mt-2">
                        🔒 Сначала завершите: «{STAGES.find(s => s.id === stage.requiresStage)?.title}»
                      </p>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
