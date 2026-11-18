import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { Stage, UserProgress } from '../types';
import { C } from '../theme';

const TYPE_ICON: Record<string, string> = { theory: '📖', quiz: '🧠', terminal: '💻', practice: '⚔️' };
const TYPE_LABEL: Record<string, string> = { theory: 'Theory', quiz: 'Quiz', terminal: 'Terminal', practice: 'Practice' };

interface Props {
  stage: Stage;
  progress: UserProgress;
  onSelectLesson: (idx: number) => void;
  onBack: () => void;
}

export function StageScreen({ stage, progress, onSelectLesson, onBack }: Props) {
  const doneLessons = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const pct = (doneLessons / stage.lessons.length) * 100;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: stage.color + '44' }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerIcon}>{stage.icon}</Text>
          <View>
            <Text style={styles.headerTitle}>{stage.title}</Text>
            <Text style={styles.headerSub}>{stage.subtitle}</Text>
          </View>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: stage.color }]} />
        </View>
        <Text style={styles.progressLabel}>{doneLessons}/{stage.lessons.length}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Description */}
        <Text style={styles.desc}>{stage.description}</Text>

        {/* Skills */}
        <View style={styles.skillsRow}>
          {stage.skills.map(sk => (
            <View key={sk} style={styles.skillChip}>
              <Text style={styles.skillText}>{sk}</Text>
            </View>
          ))}
        </View>

        {/* XP Reward */}
        <View style={styles.rewardBox}>
          <Text style={styles.rewardIcon}>🏆</Text>
          <View>
            <Text style={styles.rewardTitle}>Stage Reward</Text>
            <Text style={styles.rewardSub}>+{stage.xpReward} XP + unlocks the next stage</Text>
          </View>
        </View>

        {/* Lessons */}
        <Text style={styles.listTitle}>Stage Curriculum</Text>
        {stage.lessons.map((lesson, idx) => {
          const done = progress.completedLessons.includes(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => onSelectLesson(idx)}
              style={[styles.lessonCard, done && styles.lessonCardDone]}
              activeOpacity={0.7}
            >
              <View style={[styles.lessonIcon, { backgroundColor: done ? '#14532d' : C.surface }]}>
                <Text style={{ fontSize: 20 }}>{done ? '✓' : TYPE_ICON[lesson.type]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <View style={styles.lessonMeta}>
                  <Text style={styles.metaText}>{TYPE_LABEL[lesson.type]}</Text>
                  <Text style={styles.metaDot}>·</Text>
                  <Text style={styles.metaText}>~{lesson.duration} min</Text>
                  {done && <><Text style={styles.metaDot}>·</Text><Text style={styles.doneTxt}>Completed</Text></>}
                </View>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.surface,
    borderBottomWidth: 1,
  },
  backBtn: { padding: 4 },
  backText: { fontSize: 22, color: C.textSub },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  headerIcon: { fontSize: 28 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.text },
  headerSub: { fontSize: 11, color: C.textMut, marginTop: 1 },
  progressWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.surface,
  },
  progressTrack: {
    flex: 1, height: 6, backgroundColor: C.border, borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: 3 },
  progressLabel: { fontSize: 12, fontWeight: '700', color: C.textSub, width: 36, textAlign: 'right' },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  desc: { fontSize: 13, color: C.textSub, lineHeight: 19, marginBottom: 12 },
  skillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  skillChip: {
    backgroundColor: C.card, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: C.border,
  },
  skillText: { fontSize: 11, color: C.textSub },
  rewardBox: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#422006', borderRadius: 14, padding: 12, marginBottom: 20,
    borderWidth: 1, borderColor: '#92400e',
  },
  rewardIcon: { fontSize: 22 },
  rewardTitle: { fontSize: 13, fontWeight: '600', color: '#fde68a' },
  rewardSub: { fontSize: 11, color: '#b45309', marginTop: 1 },
  listTitle: { fontSize: 14, fontWeight: '700', color: C.textSub, marginBottom: 10 },
  lessonCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.card, borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: C.border, marginBottom: 8,
  },
  lessonCardDone: { borderColor: '#166534', backgroundColor: '#052e16' },
  lessonIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { fontSize: 14, fontWeight: '600', color: C.text },
  lessonMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  metaText: { fontSize: 11, color: C.textMut },
  metaDot: { fontSize: 11, color: C.textMut },
  doneTxt: { fontSize: 11, color: '#4ade80' },
  arrow: { fontSize: 20, color: C.textMut },
});
