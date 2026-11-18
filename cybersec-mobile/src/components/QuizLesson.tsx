import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Lesson } from '../types';
import { C } from '../theme';

interface Props {
  lesson: Lesson;
  onComplete: () => void;
}

export function QuizLesson({ lesson, onComplete }: Props) {
  const questions = lesson.quiz ?? [];
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const score = answers.filter(Boolean).length;

  function pick(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
  }

  function next() {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);

    if (current + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }

  if (questions.length === 0) {
    return (
      <View style={s.center}>
        <Text style={s.emptyText}>No questions in this quiz</Text>
      </View>
    );
  }

  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const pass = pct >= 70;
    return (
      <ScrollView contentContainerStyle={s.resultContainer}>
        <View style={[s.resultBox, { borderColor: pass ? '#22c55e' : '#ef4444' }]}>
          <Text style={s.resultIcon}>{pass ? '🏆' : '📚'}</Text>
          <Text style={[s.resultScore, { color: pass ? '#4ade80' : '#f87171' }]}>{pct}%</Text>
          <Text style={s.resultLabel}>{score} of {questions.length} correct</Text>
          <Text style={s.resultMsg}>
            {pass ? 'Great job! Quiz passed.' : "Don't worry, you can try again."}
          </Text>
        </View>

        <View style={s.reviewList}>
          {questions.map((qItem, i) => (
            <View key={i} style={[s.reviewRow, { borderColor: answers[i] ? '#166534' : '#7f1d1d' }]}>
              <Text style={s.reviewIcon}>{answers[i] ? '✓' : '✗'}</Text>
              <Text style={s.reviewQ}>{qItem.question}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={s.btn} onPress={onComplete}>
          <Text style={s.btnText}>{pass ? 'Complete Lesson' : 'Try Again'}</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>
      {/* Progress */}
      <View style={s.progressRow}>
        <View style={s.progressTrack}>
          <View style={[s.progressFill, { width: `${((current) / questions.length) * 100}%` }]} />
        </View>
        <Text style={s.progressLabel}>{current + 1}/{questions.length}</Text>
      </View>

      {/* Question */}
      <View style={s.questionBox}>
        <Text style={s.questionNum}>Question {current + 1}</Text>
        <Text style={s.questionText}>{q.question}</Text>
      </View>

      {/* Options */}
      <View style={s.options}>
        {q.options.map((opt, idx) => {
          let bg: string = C.card;
          let border: string = C.border;
          let textColor: string = C.text;

          if (selected !== null) {
            if (idx === q.correctIndex) {
              bg = '#052e16'; border = '#22c55e'; textColor = '#4ade80';
            } else if (idx === selected && idx !== q.correctIndex) {
              bg = '#450a0a'; border = '#ef4444'; textColor = '#f87171';
            }
          } else if (selected === idx) {
            bg = C.surface; border = C.indigo;
          }

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => pick(idx)}
              style={[s.option, { backgroundColor: bg, borderColor: border }]}
              activeOpacity={0.7}
            >
              <View style={[s.optionLetter, { borderColor: border }]}>
                <Text style={[s.optionLetterText, { color: textColor }]}>
                  {String.fromCharCode(65 + idx)}
                </Text>
              </View>
              <Text style={[s.optionText, { color: textColor, flex: 1 }]}>{opt}</Text>
              {selected !== null && idx === q.correctIndex && (
                <Text style={s.checkIcon}>✓</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Explanation */}
      {selected !== null && q.explanation ? (
        <View style={s.explanation}>
          <Text style={s.explanationIcon}>💡</Text>
          <Text style={s.explanationText}>{q.explanation}</Text>
        </View>
      ) : null}

      {/* Next */}
      {selected !== null && (
        <TouchableOpacity style={s.btn} onPress={next}>
          <Text style={s.btnText}>
            {current + 1 < questions.length ? 'Next Question →' : 'See Results'}
          </Text>
        </TouchableOpacity>
      )}

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: C.textMut },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  progressTrack: { flex: 1, height: 4, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: C.indigo, borderRadius: 2 },
  progressLabel: { fontSize: 12, fontWeight: '700', color: C.textSub, width: 36, textAlign: 'right' },
  questionBox: {
    backgroundColor: C.surface, borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#312e81', marginBottom: 16,
  },
  questionNum: { fontSize: 11, color: C.indigo, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' },
  questionText: { fontSize: 16, fontWeight: '600', color: C.text, lineHeight: 23 },
  options: { gap: 8, marginBottom: 16 },
  option: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderRadius: 14, borderWidth: 1.5, padding: 14,
  },
  optionLetter: {
    width: 30, height: 30, borderRadius: 8, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  optionLetterText: { fontSize: 13, fontWeight: '700' },
  optionText: { fontSize: 14, lineHeight: 20 },
  checkIcon: { fontSize: 16, color: '#4ade80' },
  explanation: {
    flexDirection: 'row', gap: 10,
    backgroundColor: '#0c1a0c', borderRadius: 12,
    borderWidth: 1, borderColor: '#14532d',
    padding: 12, marginBottom: 16,
  },
  explanationIcon: { fontSize: 16 },
  explanationText: { flex: 1, fontSize: 13, color: '#86efac', lineHeight: 19 },
  btn: {
    backgroundColor: C.indigo, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginBottom: 12,
  },
  btnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  resultContainer: { paddingHorizontal: 16, paddingTop: 32 },
  resultBox: {
    backgroundColor: C.surface, borderRadius: 20, borderWidth: 1.5,
    padding: 24, alignItems: 'center', marginBottom: 24,
  },
  resultIcon: { fontSize: 48, marginBottom: 12 },
  resultScore: { fontSize: 48, fontWeight: '800' },
  resultLabel: { fontSize: 15, color: C.textSub, marginTop: 4 },
  resultMsg: { fontSize: 13, color: C.textMut, marginTop: 8, textAlign: 'center' },
  reviewList: { gap: 8, marginBottom: 20 },
  reviewRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: C.card, borderRadius: 12, borderWidth: 1, padding: 12,
  },
  reviewIcon: { fontSize: 14, fontWeight: '700', marginTop: 1 },
  reviewQ: { flex: 1, fontSize: 13, color: C.textSub, lineHeight: 18 },
});
