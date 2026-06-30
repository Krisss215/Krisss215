import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, TextInput,
  TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Lesson } from '../types';
import { C } from '../theme';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
}

interface Line { type: 'cmd' | 'out' | 'hint' | 'err'; text: string }

export function TerminalLesson({ lesson, onComplete }: Props) {
  const terminal = lesson.terminal;
  const steps = terminal?.steps ?? [];
  const [stepIdx, setStepIdx] = useState(0);
  const [lines, setLines] = useState<Line[]>([
    { type: 'hint', text: `# ${terminal?.intro ?? lesson.title}` },
    { type: 'out', text: `Цель: ${terminal?.goal ?? ''}` },
    { type: 'out', text: '' },
    { type: 'hint', text: steps[0] ? `▶ Type:${steps[0].cmd}` : '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  function submit() {
    const cmd = input.trim();
    if (!cmd) return;

    setHistory(prev => [cmd, ...prev]);

    const newLines: Line[] = [...lines, { type: 'cmd', text: `$ ${cmd}` }];

    if (stepIdx < steps.length) {
      const step = steps[stepIdx];
      const expected = step.cmd.trim().toLowerCase();
      const actual = cmd.toLowerCase();

      if (actual === expected || actual === expected.split(' ')[0]) {
        newLines.push({ type: 'out', text: step.output });
        newLines.push({ type: 'hint', text: `💡 ${step.hint}` });

        const nextIdx = stepIdx + 1;
        if (nextIdx >= steps.length) {
          newLines.push({ type: 'out', text: '' });
          newLines.push({ type: 'out', text: '✅ All tasks completed! Great work.' });
          setDone(true);
        } else {
          newLines.push({ type: 'out', text: '' });
          newLines.push({ type: 'hint', text: `▶ Type:${steps[nextIdx].cmd}` });
          setStepIdx(nextIdx);
        }
      } else {
        newLines.push({ type: 'err', text: `bash: ${cmd}: command not found` });
        newLines.push({ type: 'hint', text: `💡 Try: ${step.cmd}` });
      }
    }

    setLines(newLines);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Step progress */}
      <View style={s.stepBar}>
        <Text style={s.stepGoal} numberOfLines={1}>{terminal?.goal}</Text>
        <View style={s.stepsRow}>
          {steps.map((_, i) => (
            <View
              key={i}
              style={[s.stepDot, {
                backgroundColor: i < stepIdx || done ? '#22c55e' :
                  i === stepIdx ? C.indigo : C.border,
              }]}
            />
          ))}
          <Text style={s.stepLabel}>{Math.min(stepIdx + (done ? 1 : 0), steps.length)}/{steps.length}</Text>
        </View>
      </View>

      {/* Terminal output */}
      <ScrollView
        ref={scrollRef}
        style={s.terminal}
        contentContainerStyle={s.terminalContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {lines.map((line, i) => (
          <Text key={i} style={[s.termLine, lineStyle(line.type)]}>
            {line.text}
          </Text>
        ))}
      </ScrollView>

      {/* Input row */}
      {!done ? (
        <View style={s.inputRow}>
          <Text style={s.prompt}>$</Text>
          <TextInput
            style={s.input}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={submit}
            returnKeyType="send"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            placeholderTextColor={C.textMut}
            placeholder="type a command..."
            selectionColor={C.indigo}
          />
          <TouchableOpacity onPress={submit} style={s.sendBtn}>
            <Text style={s.sendIcon}>↵</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={s.completeBtn} onPress={onComplete}>
          <Text style={s.completeBtnText}>Complete Lesson ✓</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

function lineStyle(type: 'cmd' | 'out' | 'hint' | 'err') {
  switch (type) {
    case 'cmd': return { color: '#a5f3fc' };
    case 'out': return { color: '#d1fae5' };
    case 'hint': return { color: '#fde68a' };
    case 'err': return { color: '#fca5a5' };
  }
}

const s = StyleSheet.create({
  stepBar: {
    paddingHorizontal: 14, paddingVertical: 8,
    backgroundColor: C.surface, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  stepGoal: { fontSize: 11, color: C.textSub, marginBottom: 6 },
  stepsRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  stepDot: { width: 8, height: 8, borderRadius: 4 },
  stepLabel: { marginLeft: 'auto', fontSize: 11, color: C.textSub, fontWeight: '700' },
  terminal: { flex: 1, backgroundColor: '#050a0f' },
  terminalContent: { padding: 14, gap: 3 },
  termLine: { fontFamily: 'monospace', fontSize: 13, lineHeight: 20 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0a0f1a', borderTopWidth: 1, borderTopColor: C.border,
    paddingHorizontal: 14, paddingVertical: 8, gap: 8,
  },
  prompt: { fontFamily: 'monospace', fontSize: 15, color: '#4ade80', fontWeight: '700' },
  input: {
    flex: 1, fontFamily: 'monospace', fontSize: 14,
    color: '#a5f3fc', paddingVertical: 6,
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: C.indigo, alignItems: 'center', justifyContent: 'center',
  },
  sendIcon: { fontSize: 18, color: '#fff', fontWeight: '700' },
  completeBtn: {
    backgroundColor: '#15803d', margin: 16, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center',
  },
  completeBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
