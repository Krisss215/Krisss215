import React from 'react';
import { UserProgress } from '../types';
import { STAGES } from '../data/stages';
import { ACHIEVEMENTS } from '../data/achievements';
import { getRank, getNextRank, RANKS } from '../data/ranks';

interface Props {
  progress: UserProgress;
  onReset: () => void;
}

export const ProfileView: React.FC<Props> = ({ progress, onReset }) => {
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const totalLessons = STAGES.reduce((s, st) => s + st.lessons.length, 0);

  const daysSince = Math.floor(
    (Date.now() - new Date(progress.startedAt || Date.now()).getTime()) / 86400000
  );

  const xpPct = nextRank
    ? ((progress.xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100
    : 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Rank card */}
      <div className="bg-gradient-to-br from-indigo-950 to-purple-950 border border-indigo-800/50 rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
            {rank.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs text-indigo-400 uppercase tracking-wider">Текущий ранг</p>
            <h2 className={`text-2xl font-bold ${rank.color}`}>{rank.title}</h2>
            <p className="text-indigo-300 text-sm">{progress.xp} XP</p>
          </div>
        </div>

        {nextRank && (
          <>
            <div className="flex justify-between text-xs text-indigo-400 mb-1">
              <span>До ранга «{nextRank.title} {nextRank.icon}»</span>
              <span>{nextRank.minXp - progress.xp} XP</span>
            </div>
            <div className="h-2 bg-indigo-900/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                style={{ width: `${Math.min(xpPct, 100)}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {[
          { icon: '⭐', v: progress.xp, l: 'Опыта (XP)' },
          { icon: '🔥', v: `${progress.streak} дн`, l: 'Текущая серия' },
          { icon: '📖', v: `${progress.completedLessons.length}/${totalLessons}`, l: 'Уроков' },
          { icon: '🏅', v: progress.achievements.length, l: 'Достижений' },
          { icon: '📦', v: progress.completedStages.length, l: 'Разделов' },
          { icon: '📅', v: `${daysSince} дн`, l: 'На платформе' },
        ].map(s => (
          <div key={s.l} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold text-white">{s.v}</div>
            <div className="text-xs text-gray-500">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Ranks */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
        <h3 className="font-bold text-white mb-4">Лестница рангов</h3>
        <div className="space-y-3">
          {RANKS.map((r, i) => {
            const unlocked = progress.xp >= r.minXp;
            const current = rank.title === r.title;
            return (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                current ? 'bg-indigo-900/40 border border-indigo-700/50' :
                unlocked ? 'opacity-70' : 'opacity-30'
              }`}>
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-sm ${r.color}`}>{r.title}</p>
                  <p className="text-xs text-gray-600">{r.minXp} XP</p>
                </div>
                {current && <span className="text-xs text-indigo-400 bg-indigo-900/50 px-2 py-0.5 rounded-full">Текущий</span>}
                {unlocked && !current && <span className="text-green-500 text-sm">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
        <h3 className="font-bold text-white mb-4">🏅 Достижения</h3>
        <div className="grid grid-cols-2 gap-3">
          {ACHIEVEMENTS.map(a => {
            const unlocked = progress.achievements.includes(a.id);
            return (
              <div key={a.id} className={`rounded-xl p-3 border transition-all ${
                unlocked ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-gray-800 border-gray-700 opacity-30'
              }`}>
                <div className="text-2xl mb-1">{unlocked ? a.icon : '🔒'}</div>
                <p className={`text-sm font-semibold ${unlocked ? 'text-yellow-300' : 'text-gray-500'}`}>{a.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.description}</p>
                {unlocked && <p className="text-xs text-yellow-600 mt-1">+{a.xp} XP</p>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Module progress */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
        <h3 className="font-bold text-white mb-4">📊 Прогресс по разделам</h3>
        <div className="space-y-3">
          {STAGES.map(s => {
            const done = s.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const pct = Math.round((done / s.lessons.length) * 100);
            return (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-xl w-8 text-center flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300 truncate">{s.title}</span>
                    <span className="text-gray-600 ml-2 flex-shrink-0">{done}/{s.lessons.length}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.confirm('Сбросить весь прогресс? Это нельзя отменить.') && onReset()}
          className="text-sm text-gray-700 hover:text-red-400 transition-colors"
        >
          Сбросить прогресс
        </button>
      </div>
    </div>
  );
};
