import React, { useState, useRef, useEffect } from 'react';
import { TerminalChallenge } from '../types';

interface Props {
  challenge: TerminalChallenge;
  onComplete: () => void;
}

interface HistoryEntry {
  type: 'input' | 'output' | 'error' | 'hint';
  text: string;
}

export const Terminal: React.FC<Props> = ({ challenge, onComplete }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', text: `┌──(kali㉿cybersec-academy)-[~]` },
    { type: 'output', text: `└─$ 🎯 Цель: ${challenge.goal}` },
    { type: 'output', text: '' },
    { type: 'output', text: `📖 ${challenge.description}` },
    { type: 'output', text: '' },
    { type: 'hint', text: `Доступные команды: ${challenge.commands.map(c => c.cmd.split(' ')[0]).join(', ')}` },
    { type: 'output', text: 'Введи команду и нажми Enter:' },
  ]);
  const [completedCmds, setCompletedCmds] = useState<string[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = () => {
    const cmd = input.trim();
    if (!cmd) return;

    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIdx(-1);

    const newHistory: HistoryEntry[] = [
      ...history,
      { type: 'input', text: `┌──(kali㉿cybersec-academy)-[~]\n└─$ ${cmd}` },
    ];

    const matched = challenge.commands.find(c => c.cmd === cmd);
    if (matched) {
      newHistory.push({ type: 'output', text: matched.output });
      if (matched.hint) {
        newHistory.push({ type: 'hint', text: `💡 ${matched.hint}` });
      }
      const newCompleted = [...completedCmds, cmd];
      setCompletedCmds(newCompleted);

      if (newCompleted.length === challenge.commands.length && !completed) {
        newHistory.push({ type: 'output', text: '' });
        newHistory.push({ type: 'hint', text: '🎉 Отлично! Ты выполнил все команды задания!' });
        setCompleted(true);
      }
    } else if (cmd === 'help') {
      newHistory.push({
        type: 'output',
        text: `Команды задания:\n${challenge.commands.map((c, i) => `  ${i + 1}. ${c.cmd}`).join('\n')}`
      });
    } else if (cmd === 'clear') {
      setHistory([{ type: 'output', text: 'Терминал очищен. Введи help для списка команд.' }]);
      setInput('');
      return;
    } else {
      newHistory.push({
        type: 'error',
        text: `bash: ${cmd.split(' ')[0]}: command not found\nВведи 'help' для списка доступных команд`
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : cmdHistory[newIdx]);
    }
  };

  const progress = (completedCmds.length / challenge.commands.length) * 100;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-400">Прогресс: {completedCmds.length}/{challenge.commands.length} команд</span>
          <span className="text-xs text-green-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className="flex-1 bg-gray-950 rounded-lg font-mono text-sm p-4 overflow-y-auto cursor-text min-h-64 max-h-80"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-1">
            {entry.type === 'input' && (
              <pre className="text-green-400 whitespace-pre-wrap">{entry.text}</pre>
            )}
            {entry.type === 'output' && (
              <pre className="text-gray-300 whitespace-pre-wrap">{entry.text}</pre>
            )}
            {entry.type === 'error' && (
              <pre className="text-red-400 whitespace-pre-wrap">{entry.text}</pre>
            )}
            {entry.type === 'hint' && (
              <pre className="text-yellow-400 whitespace-pre-wrap">{entry.text}</pre>
            )}
          </div>
        ))}
        <div className="flex items-center text-green-400">
          <span className="mr-2">└─$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-300 caret-green-400"
            placeholder="введи команду..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="mt-3 flex gap-2 flex-wrap">
        {challenge.commands.map((c, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
              completedCmds.includes(c.cmd)
                ? 'bg-green-900 text-green-300 line-through'
                : 'bg-gray-800 text-gray-400'
            }`}
          >
            {completedCmds.includes(c.cmd) ? '✓' : `${i + 1}.`} {c.cmd.split(' ')[0]}
          </span>
        ))}
      </div>

      {completed && (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors"
        >
          ✅ Завершить урок
        </button>
      )}
    </div>
  );
};
