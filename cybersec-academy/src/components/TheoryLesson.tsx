import React, { useState } from 'react';

interface Props {
  content: string;
  onComplete: () => void;
}

function parseMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n');
  const nodes: React.ReactNode[] = [];
  let inCode = false;
  let codeLines: string[] = [];
  let codeLang = '';
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeader: string[] = [];
  let key = 0;

  const flushCode = () => {
    if (codeLines.length > 0) {
      nodes.push(
        <div key={key++} className="my-4 rounded-lg overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-700">
            <span className="text-xs text-gray-400 font-mono">{codeLang || 'code'}</span>
            <span className="text-xs text-gray-600">copy</span>
          </div>
          <pre className="bg-gray-950 p-4 overflow-x-auto text-sm text-green-300 font-mono leading-relaxed">
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      );
    }
    codeLines = [];
    codeLang = '';
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      nodes.push(
        <div key={key++} className="my-4 overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                {tableHeader.map((h, i) => (
                  <th key={i} className="px-4 py-2 text-left text-gray-300 font-semibold">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-850'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-gray-300">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableRows = [];
    tableHeader = [];
    inTable = false;
  };

  const renderInline = (text: string): React.ReactNode => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((p, i) => {
      if (p.startsWith('`') && p.endsWith('`')) {
        return <code key={i} className="bg-gray-800 text-yellow-300 px-1.5 py-0.5 rounded text-sm font-mono">{p.slice(1, -1)}</code>;
      }
      if (p.startsWith('**') && p.endsWith('**')) {
        return <strong key={i} className="text-white font-bold">{p.slice(2, -2)}</strong>;
      }
      return p;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('```')) {
      if (!inCode) {
        inCode = true;
        codeLang = line.slice(3).trim();
      } else {
        inCode = false;
        flushCode();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.startsWith('|')) {
      const cells = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      if (line.includes('---')) {
        continue;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith('# ')) {
      nodes.push(<h1 key={key++} className="text-3xl font-bold text-white mt-2 mb-4">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      nodes.push(<h2 key={key++} className="text-xl font-bold text-indigo-400 mt-6 mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-500 rounded-full" />
        {line.slice(3)}
      </h2>);
    } else if (line.startsWith('### ')) {
      nodes.push(<h3 key={key++} className="text-lg font-semibold text-cyan-400 mt-4 mb-2">{line.slice(4)}</h3>);
    } else if (line.startsWith('> ')) {
      nodes.push(
        <blockquote key={key++} className="border-l-4 border-yellow-500 pl-4 py-2 my-3 bg-yellow-900/20 rounded-r-lg">
          <p className="text-yellow-200 text-sm">{renderInline(line.slice(2))}</p>
        </blockquote>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      nodes.push(
        <li key={key++} className="text-gray-300 ml-4 mb-1 flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </li>
      );
    } else if (line.match(/^\d+\. /)) {
      const num = line.match(/^(\d+)\. /)?.[1];
      nodes.push(
        <li key={key++} className="text-gray-300 ml-4 mb-1 flex items-start gap-2">
          <span className="text-indigo-400 font-bold flex-shrink-0 w-5 text-right">{num}.</span>
          <span>{renderInline(line.replace(/^\d+\. /, ''))}</span>
        </li>
      );
    } else if (line.trim() === '') {
      nodes.push(<div key={key++} className="h-2" />);
    } else {
      nodes.push(<p key={key++} className="text-gray-300 leading-relaxed mb-2">{renderInline(line)}</p>);
    }
  }

  if (inCode) flushCode();
  if (inTable) flushTable();

  return nodes;
}

export const TheoryLesson: React.FC<Props> = ({ content, onComplete }) => {
  const [read, setRead] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const near = el.scrollTop + el.clientHeight >= el.scrollHeight - 60;
    if (near) setRead(true);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex-1 overflow-y-auto pr-2 min-h-0 max-h-[500px]"
        onScroll={handleScroll}
      >
        <div className="prose prose-invert max-w-none">
          {parseMarkdown(content)}
        </div>
        <div className="h-8" />
      </div>

      {!read && (
        <p className="text-xs text-gray-500 text-center mt-3">
          Прокрути вниз, чтобы продолжить ↓
        </p>
      )}

      {read && (
        <button
          onClick={onComplete}
          className="mt-4 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors"
        >
          Урок прочитан — далее →
        </button>
      )}

      {!read && (
        <button
          onClick={() => { setRead(true); onComplete(); }}
          className="mt-4 w-full py-2 text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          Пропустить
        </button>
      )}
    </div>
  );
};
