import React, { useState, useRef } from 'react';

interface Props {
  content: string;
  onComplete: () => void;
}

function md(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let codeLines: string[] = [];
  let codeLang = '';
  let inCode = false;
  let inTable = false;
  let tableHead: string[] = [];
  let tableRows: string[][] = [];
  let k = 0;

  const flushCode = () => {
    nodes.push(
      <div key={k++} className="my-4 rounded-xl overflow-hidden border border-gray-700">
        {codeLang && (
          <div className="bg-gray-900 px-4 py-1.5 flex items-center gap-2 border-b border-gray-700">
            <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"/><div className="w-2.5 h-2.5 rounded-full bg-green-500"/></div>
            <span className="text-xs text-gray-500 font-mono">{codeLang}</span>
          </div>
        )}
        <pre className="bg-gray-950 p-4 overflow-x-auto text-xs text-green-300 font-mono leading-relaxed">
          <code>{codeLines.join('\n')}</code>
        </pre>
      </div>
    );
    codeLines = []; codeLang = '';
  };

  const flushTable = () => {
    nodes.push(
      <div key={k++} className="my-4 overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-800/80">
            {tableHead.map((h, i) => <th key={i} className="px-4 py-2 text-left text-gray-300 font-semibold text-xs">{h.trim()}</th>)}
          </tr></thead>
          <tbody>
            {tableRows.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/50'}>
                {row.map((c, j) => <td key={j} className="px-4 py-2 text-gray-300 text-xs">{c.trim()}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableHead = []; tableRows = []; inTable = false;
  };

  const inline = (t: string): React.ReactNode => {
    const parts = t.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return <>{parts.map((p, i) => {
      if (p.startsWith('`') && p.endsWith('`') && p.length > 2)
        return <code key={i} className="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded text-xs font-mono">{p.slice(1,-1)}</code>;
      if (p.startsWith('**') && p.endsWith('**') && p.length > 4)
        return <strong key={i} className="text-white font-bold">{p.slice(2,-2)}</strong>;
      return p;
    })}</>;
  };

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (!inCode) { inCode = true; codeLang = line.slice(3).trim(); }
      else { inCode = false; flushCode(); }
      continue;
    }
    if (inCode) { codeLines.push(line); continue; }

    if (line.startsWith('|')) {
      const cells = line.split('|').filter((_, i, a) => i > 0 && i < a.length - 1);
      if (line.includes('---')) continue;
      if (!inTable) { inTable = true; tableHead = cells; }
      else tableRows.push(cells);
      continue;
    } else if (inTable) { flushTable(); }

    if (!line.trim()) { nodes.push(<div key={k++} className="h-2" />); continue; }
    if (line.startsWith('# '))    { nodes.push(<h1 key={k++} className="text-2xl font-bold text-white mt-2 mb-3">{line.slice(2)}</h1>); continue; }
    if (line.startsWith('## '))   { nodes.push(<h2 key={k++} className="text-lg font-bold text-indigo-400 mt-5 mb-2 flex items-center gap-2"><span className="w-1 h-4 bg-indigo-500 rounded-full flex-shrink-0"/>{line.slice(3)}</h2>); continue; }
    if (line.startsWith('### '))  { nodes.push(<h3 key={k++} className="text-base font-semibold text-cyan-400 mt-4 mb-2">{line.slice(4)}</h3>); continue; }
    if (line.startsWith('> '))    { nodes.push(<blockquote key={k++} className="border-l-4 border-yellow-500 pl-4 py-2 my-3 bg-yellow-900/20 rounded-r-lg"><p className="text-yellow-200 text-sm">{inline(line.slice(2))}</p></blockquote>); continue; }
    if (line.match(/^[-*] /))     { nodes.push(<div key={k++} className="flex items-start gap-2 mb-1 ml-2"><span className="text-indigo-400 mt-1 flex-shrink-0 text-xs">●</span><p className="text-gray-300 text-sm">{inline(line.slice(2))}</p></div>); continue; }
    if (line.match(/^\d+\. /))    { const m = line.match(/^(\d+)\. (.*)/); if(m) nodes.push(<div key={k++} className="flex items-start gap-2 mb-1 ml-2"><span className="text-indigo-400 font-bold text-sm flex-shrink-0 w-5 text-right">{m[1]}.</span><p className="text-gray-300 text-sm">{inline(m[2])}</p></div>); continue; }
    nodes.push(<p key={k++} className="text-gray-300 text-sm leading-relaxed mb-1.5">{inline(line)}</p>);
  }

  if (inCode) flushCode();
  if (inTable) flushTable();
  return nodes;
}

export const TheoryLesson: React.FC<Props> = ({ content, onComplete }) => {
  const [read, setRead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 80) setRead(true);
  };

  return (
    <div className="flex flex-col h-full gap-3">
      <div
        ref={scrollRef}
        className="overflow-y-auto flex-1 pr-1"
        style={{ maxHeight: 460 }}
        onScroll={onScroll}
      >
        {md(content)}
        <div className="h-10" />
      </div>

      {!read && (
        <p className="text-center text-xs text-gray-600 animate-bounce">прокрути вниз ↓</p>
      )}

      <button
        onClick={() => { setRead(true); onComplete(); }}
        className={`w-full py-3 font-bold rounded-xl transition-all ${
          read
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
            : 'bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-300'
        }`}
      >
        {read ? 'Урок прочитан — далее →' : 'Пропустить и продолжить'}
      </button>
    </div>
  );
};
