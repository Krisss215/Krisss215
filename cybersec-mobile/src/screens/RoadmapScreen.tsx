import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Dimensions,
} from 'react-native';
import { STAGES } from '../data/stages';
import { getRank, getNextRank } from '../data/ranks';
import { UserProgress, Stage } from '../types';
import { C } from '../theme';

const { width } = Dimensions.get('window');

const DIFF_LABEL: Record<string, string> = {
  zero: 'From Zero', beginner: 'Beginner',
  intermediate: 'Intermediate', advanced: 'Advanced', expert: 'Expert',
};
const DIFF_COLOR: Record<string, string> = {
  zero: '#6b7280', beginner: '#22c55e', intermediate: '#eab308',
  advanced: '#f97316', expert: '#ef4444',
};

interface Props {
  progress: UserProgress;
  onSelectStage: (stage: Stage) => void;
}

export function RoadmapScreen({ progress, onSelectStage }: Props) {
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const xpForCurrentRank = rank.minXp;
  const xpForNextRank = nextRank?.minXp ?? progress.xp;
  const xpPct = nextRank
    ? Math.min(((progress.xp - xpForCurrentRank) / (xpForNextRank - xpForCurrentRank)) * 100, 100)
    : 100;

  const totalLessons = STAGES.reduce((s, st) => s + st.lessons.length, 0);

  const isUnlocked = (stage: Stage) =>
    !stage.requiresStage || progress.completedStages.includes(stage.requiresStage);

  const getStatus = (stage: Stage) => {
    if (progress.completedStages.includes(stage.id)) return 'done';
    if (!isUnlocked(stage)) return 'locked';
    const done = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    return done > 0 ? 'active' : 'available';
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {/* Rank Hero */}
      <View style={styles.hero}>
        <View style={styles.rankRow}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankIcon}>{rank.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rankLabel}>Your rank</Text>
            <Text style={[styles.rankTitle, { color: rank.color }]}>{rank.title}</Text>
            <Text style={styles.rankXp}>{progress.xp} XP earned</Text>
          </View>
          <View style={styles.streakBox}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakNum}>{progress.streak}</Text>
            <Text style={styles.streakLabel}>days</Text>
          </View>
        </View>

        {nextRank && (
          <View style={{ marginTop: 12 }}>
            <View style={styles.xpBarRow}>
              <Text style={styles.xpBarLabel}>Until "{nextRank.title}"</Text>
              <Text style={styles.xpBarLabel}>{nextRank.minXp - progress.xp} XP</Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: `${xpPct}%` }]} />
            </View>
          </View>
        )}

        <View style={styles.statsRow}>
          {[
            { v: `${progress.completedLessons.length}/${totalLessons}`, l: 'Lessons' },
            { v: progress.completedStages.length, l: 'Stages' },
            { v: progress.achievements.length, l: 'Achievements' },
          ].map(s => (
            <View key={s.l} style={styles.statBox}>
              <Text style={styles.statVal}>{s.v}</Text>
              <Text style={styles.statLbl}>{s.l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>Path from Zero to Pro</Text>
      <Text style={styles.sectionSub}>{STAGES.length} stages · {totalLessons} lessons</Text>

      {/* Stages */}
      <View style={{ marginTop: 16 }}>
        {STAGES.map((stage, idx) => {
          const status = getStatus(stage);
          const doneLessons = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const pct = (doneLessons / stage.lessons.length) * 100;
          const locked = status === 'locked';

          return (
            <View key={stage.id} style={styles.stageRow}>
              {/* Connector */}
              {idx < STAGES.length - 1 && (
                <View style={[styles.connector, { backgroundColor: status === 'done' ? stage.color : C.border }]} />
              )}

              {/* Node */}
              <View style={[styles.node, {
                backgroundColor: status === 'done' ? '#15803d' :
                  status === 'active' ? stage.color + '33' : C.surface,
                borderColor: status === 'done' ? '#22c55e' :
                  status === 'active' ? stage.color :
                  status === 'available' ? C.border2 : C.border,
                opacity: locked ? 0.45 : 1,
              }]}>
                <Text style={styles.nodeIcon}>{status === 'done' ? '✓' : locked ? '🔒' : stage.icon}</Text>
              </View>

              {/* Card */}
              <TouchableOpacity
                disabled={locked}
                onPress={() => onSelectStage(stage)}
                style={[styles.card, {
                  borderColor: status === 'done' ? '#166534' :
                    status === 'active' ? stage.color + '66' : C.border,
                  opacity: locked ? 0.45 : 1,
                }]}
                activeOpacity={0.7}
              >
                <View style={styles.cardTop}>
                  <View style={{ flex: 1 }}>
                    <View style={[S_row, { gap: 6, flexWrap: 'wrap' }]}>
                      <Text style={styles.cardTitle}>{stage.title}</Text>
                      {status === 'done' && (
                        <View style={styles.doneBadge}><Text style={styles.doneBadgeText}>Completed</Text></View>
                      )}
                      {status === 'active' && (
                        <View style={[styles.doneBadge, { backgroundColor: '#312e81' }]}>
                          <Text style={[styles.doneBadgeText, { color: '#a5b4fc' }]}>In Progress</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardSub}>{stage.subtitle}</Text>
                  </View>
                  <View style={[styles.diffBadge, { backgroundColor: DIFF_COLOR[stage.difficulty] + '22' }]}>
                    <Text style={[styles.diffText, { color: DIFF_COLOR[stage.difficulty] }]}>
                      {DIFF_LABEL[stage.difficulty]}
                    </Text>
                  </View>
                </View>

                <Text style={styles.cardDesc}>{stage.description}</Text>

                <View style={[S_row, { gap: 8, flexWrap: 'wrap', marginTop: 8 }]}>
                  <Text style={styles.metaText}>{stage.lessons.length} lessons</Text>
                  <Text style={[styles.metaText, { color: '#ca8a04' }]}>+{stage.xpReward} XP</Text>
                  {stage.skills.slice(0, 2).map(sk => (
                    <View key={sk} style={styles.skillChip}>
                      <Text style={styles.skillChipText}>{sk}</Text>
                    </View>
                  ))}
                </View>

                {(status === 'active' || status === 'done') && (
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: stage.color }]} />
                  </View>
                )}

                {locked && (
                  <Text style={styles.lockedText}>
                    🔒 Complete first: "{STAGES.find(s => s.id === stage.requiresStage)?.title}"
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const S_row = { flexDirection: 'row' as const, alignItems: 'center' as const };

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 16, paddingBottom: 16 },
  hero: {
    backgroundColor: C.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#312e81',
    padding: 16,
    marginBottom: 20,
  },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rankBadge: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: '#312e81',
    alignItems: 'center', justifyContent: 'center',
  },
  rankIcon: { fontSize: 28 },
  rankLabel: { fontSize: 11, color: C.textMut, textTransform: 'uppercase', letterSpacing: 0.5 },
  rankTitle: { fontSize: 18, fontWeight: '700', marginTop: 2 },
  rankXp: { fontSize: 12, color: '#818cf8', marginTop: 1 },
  streakBox: { alignItems: 'center' },
  streakFire: { fontSize: 18 },
  streakNum: { fontSize: 18, fontWeight: '700', color: '#fb923c' },
  streakLabel: { fontSize: 10, color: C.textMut },
  xpBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  xpBarLabel: { fontSize: 11, color: '#818cf8' },
  xpTrack: { height: 6, backgroundColor: '#1e1b4b', borderRadius: 3, overflow: 'hidden' },
  xpFill: { height: '100%', backgroundColor: '#6366f1', borderRadius: 3 },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  statBox: {
    flex: 1, backgroundColor: C.card, borderRadius: 12,
    padding: 10, alignItems: 'center',
  },
  statVal: { fontSize: 16, fontWeight: '700', color: C.text },
  statLbl: { fontSize: 10, color: C.textMut, marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: C.text },
  sectionSub: { fontSize: 12, color: C.textMut, marginTop: 2 },
  stageRow: { flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'flex-start' },
  connector: {
    position: 'absolute',
    left: 27, top: 60, width: 2,
    height: '100%', zIndex: 0,
  },
  node: {
    width: 56, height: 56, borderRadius: 16, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center', zIndex: 1,
    flexShrink: 0,
  },
  nodeIcon: { fontSize: 24 },
  card: {
    flex: 1, backgroundColor: C.card,
    borderRadius: 16, borderWidth: 1.5, padding: 14,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 6 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.text, flexShrink: 1 },
  cardSub: { fontSize: 11, color: C.textMut, marginTop: 1 },
  cardDesc: { fontSize: 12, color: C.textSub, lineHeight: 17 },
  doneBadge: {
    backgroundColor: '#14532d', borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  doneBadgeText: { fontSize: 10, color: '#4ade80', fontWeight: '600' },
  diffBadge: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, flexShrink: 0 },
  diffText: { fontSize: 10, fontWeight: '600' },
  metaText: { fontSize: 11, color: C.textMut },
  skillChip: {
    backgroundColor: C.surface, borderRadius: 20,
    paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: C.border,
  },
  skillChipText: { fontSize: 10, color: C.textSub },
  progressBar: {
    height: 4, backgroundColor: C.surface, borderRadius: 2,
    overflow: 'hidden', marginTop: 10,
  },
  progressFill: { height: '100%', borderRadius: 2 },
  lockedText: { fontSize: 11, color: C.textMut, marginTop: 8 },
});
