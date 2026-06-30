import React, { useState, useRef, useEffect } from 'react';

interface Step {
  cmd: string;
  output: string;
  hint: string;
}

interface Props {
  intro: string;
  goal: string;
  steps: Step[];
  onComplete: () => void;
}

interface Line {
  type: 'sys' | 'in' | 'out' | 'hint' | 'err';
  text: string;
}

export const TerminalLesson: React.FC<Props> = ({ intro, goal, steps, onComplete }) => {
  const [lines, setLines] = useState<Line[]>([
    { type: 'sys', text: '┌──(student㉿cybersec-lab)-[~]' },
    { type: 'sys', text: `└─$ 🎯 ${goal}` },
    { type: 'sys', text: '' },
    { type: 'hint', text: `📋 ${intro}` },
    { type: 'sys', text: '' },
    { type: 'hint', text: `Команды задания (${steps.length} штук):` },
    ...steps.map((s, i) => ({ type: 'hint' as const, text: `  ${i + 1}. ${s.cmd}` })),
    { type: 'sys', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [done, setDone] = useState<Set<number>>(new Set());
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [finished, setFinished] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const run = () => {
    const cmd = input.trim();
    if (!cmd) return;

    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const newLines: Line[] = [
      ...lines,
      { type: 'in', text: `┌──(student㉿cybersec-lab)-[~]\n└─$ ${cmd}` },
    ];

    const stepIdx = steps.findIndex(s => s.cmd === cmd);
    if (stepIdx !== -1) {
      newLines.push({ type: 'out', text: steps[stepIdx].output });
      newLines.push({ type: 'hint', text: `💡 ${steps[stepIdx].hint}` });
      const newDone = new Set(done);
      newDone.add(stepIdx);
      setDone(newDone);

      if (newDone.size === steps.length && !finished) {
        newLines.push({ type: 'sys', text: '' });
        newLines.push({ type: 'hint', text: '🎉 Все команды выполнены! Отличная работа!' });
        setFinished(true);
      }
    } else if (cmd === 'help') {
      newLines.push({
        type: 'hint',
        text: `Команды задания:\n${steps.map((s, i) => `  ${i + 1}. ${s.cmd}`).join('\n')}`,
      });
    } else if (cmd === 'clear') {
      setLines([{ type: 'hint', text: 'Введи help для списка команд.' }]);
      setInput('');
      return;
    } else {
      newLines.push({ type: 'err', text: `bash: ${cmd.split(' ')[0]}: command not found\nВведи 'help' для списка команд задания` });
    }

    setLines(newLines);
    setInput('');
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { run(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const ni = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(ni);
      setInput(history[ni] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const ni = Math.max(histIdx - 1, -1);
      setHistIdx(ni);
      setInput(ni === -1 ? '' : history[ni]);
    }
  };

  const pct = Math.round((done.size / steps.length) * 100);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Прогресс: {done.size}/{steps.length} команд</span>
          <span className="text-green-400">{pct}%</span>
        </div>
        <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div
        className="bg-gray-950 rounded-xl border border-gray-800 font-mono text-sm p-4 overflow-y-auto cursor-text"
        style={{ minHeight: 280, maxHeight: 380 }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((l, i) => (
          <div key={i} className="mb-0.5">
            {l.type === 'in'  && <pre className="text-green-400 whitespace-pre-wrap">{l.text}</pre>}
            {l.type === 'out' && <pre className="text-gray-300 whitespace-pre-wrap text-xs leading-relaxed">{l.text}</pre>}
            {l.type === 'sys' && <pre className="text-green-500 whitespace-pre-wrap">{l.text}</pre>}
            {l.type === 'hint'&& <pre className="text-yellow-400 whitespace-pre-wrap">{l.text}</pre>}
            {l.type === 'err' && <pre className="text-red-400 whitespace-pre-wrap">{l.text}</pre>}
          </div>
        ))}
        <div className="flex items-center text-green-400">
          <span className="mr-2 whitespace-nowrap">└─$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            className="flex-1 bg-transparent outline-none text-green-300 caret-green-400 min-w-0"
            placeholder="введи команду..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div ref={bottomRef} />
      </div>

      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setInput(s.cmd)}
            className={`px-2 py-1 rounded text-xs font-mono transition-all ${
              done.has(i)
                ? 'bg-green-900/50 text-green-400 line-through'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
            }`}
          >
            {done.has(i) ? '✓' : `${i + 1}.`} {s.cmd.split(' ')[0]}
          </button>
        ))}
      </div>

      {finished && (
        <button
          onClick={onComplete}
          className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-bold rounded-xl transition-colors"
        >
          ✅ Завершить урок
        </button>
      )}
    </div>
  );
};
