import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Lesson, Stage } from '../types';
import { C } from '../theme';
import { TheoryLesson } from '../components/TheoryLesson';
import { QuizLesson } from '../components/QuizLesson';
import { TerminalLesson } from '../components/TerminalLesson';

const TYPE_ICON: Record<string, string> = { theory: '📖', quiz: '🧠', terminal: '💻' };
const TYPE_LABEL: Record<string, string> = { theory: 'Теория', quiz: 'Тест', terminal: 'Терминал' };

interface Props {
  lesson: Lesson;
  stage: Stage;
  lessonIndex: number;
  totalLessons: number;
  onComplete: () => void;
  onBack: () => void;
}

export function LessonScreen({ lesson, stage, lessonIndex, totalLessons, onComplete, onBack }: Props) {
  const xpPerLesson = Math.round(stage.xpReward / stage.lessons.length);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <View style={[s.header, { borderBottomColor: stage.color + '44' }]}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={s.lessonTitle} numberOfLines={1}>{lesson.title}</Text>
          <View style={s.metaRow}>
            <Text style={s.typeIcon}>{TYPE_ICON[lesson.type]}</Text>
            <Text style={s.metaText}>{TYPE_LABEL[lesson.type]}</Text>
            <Text style={s.metaDot}>·</Text>
            <Text style={s.metaText}>~{lesson.duration} мин</Text>
            <Text style={s.metaDot}>·</Text>
            <Text style={s.metaText}>{lessonIndex + 1}/{totalLessons}</Text>
          </View>
        </View>
        <View style={[s.xpBadge, { backgroundColor: stage.color + '22' }]}>
          <Text style={[s.xpText, { color: stage.color }]}>+{xpPerLesson} XP</Text>
        </View>
      </View>

      {/* Lesson progress bar */}
      <View style={s.progressBar}>
        <View style={[s.progressFill, {
          width: `${(lessonIndex / totalLessons) * 100}%`,
          backgroundColor: stage.color,
        }]} />
      </View>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {lesson.type === 'theory' && (
          <TheoryLesson lesson={lesson} onComplete={onComplete} />
        )}
        {lesson.type === 'quiz' && (
          <QuizLesson lesson={lesson} onComplete={onComplete} />
        )}
        {lesson.type === 'terminal' && (
          <TerminalLesson lesson={lesson} onComplete={onComplete} />
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 14, paddingVertical: 10,
    backgroundColor: C.surface, borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 22, color: C.textSub },
  lessonTitle: { fontSize: 14, fontWeight: '700', color: C.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  typeIcon: { fontSize: 11 },
  metaText: { fontSize: 11, color: C.textMut },
  metaDot: { fontSize: 11, color: C.textMut },
  xpBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  xpText: { fontSize: 12, fontWeight: '700' },
  progressBar: { height: 3, backgroundColor: C.border, overflow: 'hidden' },
  progressFill: { height: '100%' },
});
