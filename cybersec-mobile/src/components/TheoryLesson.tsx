import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Lesson } from '../types';
import { C } from '../theme';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
}

function parseLine(line: string, key: string) {
  if (line.startsWith('### ')) return <Text key={key} style={s.h3}>{line.slice(4)}</Text>;
  if (line.startsWith('## ')) return <Text key={key} style={s.h2}>{line.slice(3)}</Text>;
  if (line.startsWith('# ')) return <Text key={key} style={s.h1}>{line.slice(2)}</Text>;
  if (line.startsWith('> ')) {
    return (
      <View key={key} style={s.blockquote}>
        <Text style={s.blockquoteText}>{line.slice(2)}</Text>
      </View>
    );
  }
  if (line.startsWith('- ') || line.startsWith('* ')) {
    return (
      <View key={key} style={s.listItem}>
        <Text style={s.bullet}>•</Text>
        <Text style={s.listText}>{formatInline(line.slice(2))}</Text>
      </View>
    );
  }
  const numberedMatch = line.match(/^(\d+)\. (.+)/);
  if (numberedMatch) {
    return (
      <View key={key} style={s.listItem}>
        <Text style={s.bullet}>{numberedMatch[1]}.</Text>
        <Text style={s.listText}>{formatInline(numberedMatch[2])}</Text>
      </View>
    );
  }
  if (line.trim() === '') return <View key={key} style={{ height: 8 }} />;
  return <Text key={key} style={s.para}>{formatInline(line)}</Text>;
}

function formatInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(<Text key={idx++}>{text.slice(last, match.index)}</Text>);
    const raw = match[0];
    if (raw.startsWith('`')) {
      parts.push(<Text key={idx++} style={s.code}>{raw.slice(1, -1)}</Text>);
    } else {
      parts.push(<Text key={idx++} style={s.bold}>{raw.slice(2, -2)}</Text>);
    }
    last = match.index + raw.length;
  }
  if (last < text.length) parts.push(<Text key={idx++}>{text.slice(last)}</Text>);
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
}

export function TheoryLesson({ lesson, onComplete }: Props) {
  const content = lesson.content ?? '';
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push(
        <View key={`cb${i}`} style={s.codeBlock}>
          {lang ? <Text style={s.codeLang}>{lang}</Text> : null}
          <Text style={s.codeText}>{codeLines.join('\n')}</Text>
        </View>
      );
    } else {
      blocks.push(parseLine(line, `l${i}`));
    }
    i++;
  }

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
      {blocks}
      <View style={s.completeBtn}>
        <Text style={s.completeBtnText} onPress={onComplete}>Завершить урок ✓</Text>
      </View>
      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 16 },
  h1: { fontSize: 22, fontWeight: '800', color: C.text, marginBottom: 10, marginTop: 6 },
  h2: { fontSize: 18, fontWeight: '700', color: C.text, marginBottom: 8, marginTop: 14 },
  h3: { fontSize: 15, fontWeight: '700', color: C.indigo, marginBottom: 6, marginTop: 10 },
  para: { fontSize: 14, color: C.textSub, lineHeight: 22, marginBottom: 6 },
  bold: { fontWeight: '700', color: C.text },
  code: {
    fontFamily: 'monospace', fontSize: 13,
    backgroundColor: C.surface, color: C.cyan,
    paddingHorizontal: 5, borderRadius: 4,
  },
  blockquote: {
    borderLeftWidth: 3, borderLeftColor: C.indigo,
    backgroundColor: C.surface, borderRadius: 6,
    paddingHorizontal: 12, paddingVertical: 8, marginVertical: 6,
  },
  blockquoteText: { fontSize: 13, color: C.textSub, fontStyle: 'italic', lineHeight: 20 },
  listItem: { flexDirection: 'row', gap: 8, marginBottom: 5, paddingRight: 8 },
  bullet: { fontSize: 14, color: C.indigo, width: 18, textAlign: 'center' },
  listText: { fontSize: 14, color: C.textSub, lineHeight: 20, flex: 1 },
  codeBlock: {
    backgroundColor: '#0a0f1a', borderRadius: 10,
    borderWidth: 1, borderColor: C.border,
    padding: 12, marginVertical: 8,
  },
  codeLang: { fontSize: 10, color: C.indigo, marginBottom: 6, textTransform: 'uppercase', fontWeight: '700' },
  codeText: { fontFamily: 'monospace', fontSize: 12, color: '#a5f3fc', lineHeight: 19 },
  completeBtn: {
    backgroundColor: C.indigo, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginTop: 24,
  },
  completeBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
