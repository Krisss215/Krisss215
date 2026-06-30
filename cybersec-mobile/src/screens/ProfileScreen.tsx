import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { UserProgress } from '../types';
import { STAGES } from '../data/stages';
import { RANKS, getRank, getNextRank } from '../data/ranks';
import { ACHIEVEMENTS } from '../data/achievements';
import { C } from '../theme';

interface Props {
  progress: UserProgress;
  onReset: () => void;
}

export function ProfileScreen({ progress, onReset }: Props) {
  const rank = getRank(progress.xp);
  const nextRank = getNextRank(progress.xp);
  const xpPct = nextRank
    ? Math.min(((progress.xp - rank.minXp) / (nextRank.minXp - rank.minXp)) * 100, 100)
    : 100;

  const totalLessons = STAGES.reduce((s, st) => s + st.lessons.length, 0);
  const daysSince = Math.floor(
    (Date.now() - new Date(progress.startedAt).getTime()) / 86400000
  );

  function handleReset() {
    Alert.alert(
      'Reset Progress?',
      'All progress, XP and achievements will be deleted. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: onReset },
      ]
    );
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>

      {/* Rank card */}
      <View style={[s.rankCard, { borderColor: rank.color + '55' }]}>
        <View style={[s.rankIcon, { backgroundColor: rank.color + '22' }]}>
          <Text style={s.rankIconText}>{rank.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.rankLabel}>Current rank</Text>
          <Text style={[s.rankTitle, { color: rank.color }]}>{rank.title}</Text>
          <Text style={s.rankXp}>{progress.xp} XP earned</Text>
        </View>
        <View style={s.streakBox}>
          <Text style={s.streakFire}>🔥</Text>
          <Text style={s.streakNum}>{progress.streak}</Text>
          <Text style={s.streakSub}>days</Text>
        </View>
      </View>

      {/* XP bar */}
      {nextRank && (
        <View style={s.xpWrap}>
          <View style={s.xpBarRow}>
            <Text style={s.xpBarLabel}>Until "{nextRank.title}"</Text>
            <Text style={s.xpBarLabel}>{nextRank.minXp - progress.xp} XP</Text>
          </View>
          <View style={s.xpTrack}>
            <View style={[s.xpFill, { width: `${xpPct}%`, backgroundColor: rank.color }]} />
          </View>
        </View>
      )}

      {/* Stats */}
      <View style={s.statsRow}>
        {[
          { v: `${progress.completedLessons.length}/${totalLessons}`, l: 'Lessons' },
          { v: progress.completedStages.length, l: 'Stages' },
          { v: progress.achievements.length, l: 'Achievements' },
          { v: daysSince, l: 'Days Learning' },
        ].map(stat => (
          <View key={stat.l} style={s.statBox}>
            <Text style={s.statVal}>{stat.v}</Text>
            <Text style={s.statLbl}>{stat.l}</Text>
          </View>
        ))}
      </View>

      {/* Rank ladder */}
      <Text style={s.sectionTitle}>Rank Ladder</Text>
      <View style={s.rankLadder}>
        {RANKS.map((r, i) => {
          const earned = progress.xp >= r.minXp;
          const isCurrent = r.title === rank.title;
          return (
            <View key={r.minXp} style={[s.rankRow, isCurrent && s.rankRowActive]}>
              <View style={[s.rankDot, {
                backgroundColor: earned ? r.color + '33' : C.card,
                borderColor: earned ? r.color : C.border,
              }]}>
                <Text style={s.rankDotIcon}>{earned ? r.icon : '🔒'}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[s.rankRowTitle, { color: earned ? r.color : C.textMut }]}>{r.title}</Text>
                <Text style={s.rankRowXp}>{r.minXp} XP</Text>
              </View>
              {isCurrent && <View style={[s.currentBadge, { backgroundColor: r.color + '22' }]}>
                <Text style={[s.currentBadgeText, { color: r.color }]}>Current</Text>
              </View>}
              {earned && !isCurrent && <Text style={s.checkMark}>✓</Text>}
            </View>
          );
        })}
      </View>

      {/* Achievements */}
      <Text style={s.sectionTitle}>Achievements</Text>
      <View style={s.achievGrid}>
        {ACHIEVEMENTS.map(a => {
          const earned = progress.achievements.includes(a.id);
          return (
            <View key={a.id} style={[s.achievCard, !earned && s.achievLocked]}>
              <Text style={s.achievIcon}>{earned ? a.icon : '🔒'}</Text>
              <Text style={[s.achievName, !earned && { color: C.textMut }]}>{a.title}</Text>
              <Text style={s.achievDesc}>{a.description}</Text>
            </View>
          );
        })}
      </View>

      {/* Stage progress */}
      <Text style={s.sectionTitle}>Stage Progress</Text>
      {STAGES.map(stage => {
        const done = stage.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
        const pct = (done / stage.lessons.length) * 100;
        const completed = progress.completedStages.includes(stage.id);
        return (
          <View key={stage.id} style={s.stageProgress}>
            <View style={s.stageProgressTop}>
              <Text style={s.stageIcon}>{completed ? '✓' : stage.icon}</Text>
              <Text style={s.stageTitle} numberOfLines={1}>{stage.title}</Text>
              <Text style={s.stageCount}>{done}/{stage.lessons.length}</Text>
            </View>
            <View style={s.stageBar}>
              <View style={[s.stageFill, { width: `${pct}%`, backgroundColor: stage.color }]} />
            </View>
          </View>
        );
      })}

      {/* Reset */}
      <TouchableOpacity style={s.resetBtn} onPress={handleReset}>
        <Text style={s.resetText}>Reset Progress</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bg },
  content: { paddingHorizontal: 16, paddingTop: 16 },
  rankCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: C.surface, borderRadius: 20, borderWidth: 1.5,
    padding: 16, marginBottom: 12,
  },
  rankIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  rankIconText: { fontSize: 28 },
  rankLabel: { fontSize: 10, color: C.textMut, textTransform: 'uppercase', letterSpacing: 0.5 },
  rankTitle: { fontSize: 18, fontWeight: '800', marginTop: 2 },
  rankXp: { fontSize: 12, color: C.textSub, marginTop: 1 },
  streakBox: { alignItems: 'center' },
  streakFire: { fontSize: 18 },
  streakNum: { fontSize: 22, fontWeight: '800', color: '#fb923c' },
  streakSub: { fontSize: 10, color: C.textMut },
  xpWrap: { marginBottom: 16 },
  xpBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  xpBarLabel: { fontSize: 12, color: C.textSub },
  xpTrack: { height: 8, backgroundColor: C.border, borderRadius: 4, overflow: 'hidden' },
  xpFill: { height: '100%', borderRadius: 4 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statBox: {
    flex: 1, backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
    borderColor: C.border, padding: 10, alignItems: 'center',
  },
  statVal: { fontSize: 16, fontWeight: '800', color: C.text },
  statLbl: { fontSize: 10, color: C.textMut, marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: C.text, marginBottom: 10 },
  rankLadder: {
    backgroundColor: C.surface, borderRadius: 16, borderWidth: 1,
    borderColor: C.border, overflow: 'hidden', marginBottom: 24,
  },
  rankRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderBottomWidth: 1, borderBottomColor: C.border,
  },
  rankRowActive: { backgroundColor: '#0f0f2a' },
  rankDot: {
    width: 40, height: 40, borderRadius: 12, borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center',
  },
  rankDotIcon: { fontSize: 20 },
  rankRowTitle: { fontSize: 14, fontWeight: '700' },
  rankRowXp: { fontSize: 11, color: C.textMut, marginTop: 1 },
  currentBadge: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  currentBadgeText: { fontSize: 10, fontWeight: '700' },
  checkMark: { fontSize: 16, color: '#4ade80' },
  achievGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  achievCard: {
    width: '47%', backgroundColor: C.card, borderRadius: 16,
    borderWidth: 1, borderColor: C.border, padding: 14, alignItems: 'center',
  },
  achievLocked: { opacity: 0.45 },
  achievIcon: { fontSize: 28, marginBottom: 6 },
  achievName: { fontSize: 12, fontWeight: '700', color: C.text, textAlign: 'center', marginBottom: 4 },
  achievDesc: { fontSize: 10, color: C.textMut, textAlign: 'center', lineHeight: 14 },
  stageProgress: {
    backgroundColor: C.card, borderRadius: 14, borderWidth: 1,
    borderColor: C.border, padding: 12, marginBottom: 8,
  },
  stageProgressTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stageIcon: { fontSize: 18 },
  stageTitle: { flex: 1, fontSize: 13, fontWeight: '600', color: C.text },
  stageCount: { fontSize: 12, fontWeight: '700', color: C.textSub },
  stageBar: { height: 4, backgroundColor: C.border, borderRadius: 2, overflow: 'hidden' },
  stageFill: { height: '100%', borderRadius: 2 },
  resetBtn: {
    marginTop: 16, borderRadius: 14, borderWidth: 1,
    borderColor: '#7f1d1d', paddingVertical: 13, alignItems: 'center',
  },
  resetText: { fontSize: 14, color: '#f87171', fontWeight: '600' },
});
