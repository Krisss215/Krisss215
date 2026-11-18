import React, { useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  SafeAreaView, StatusBar, Modal, Animated,
} from 'react-native';
import { Stage } from './src/types';
import { STAGES } from './src/data/stages';
import { useProgress } from './src/hooks/useProgress';
import { RoadmapScreen } from './src/screens/RoadmapScreen';
import { StageScreen } from './src/screens/StageScreen';
import { LessonScreen } from './src/screens/LessonScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { C } from './src/theme';

type Tab = 'roadmap' | 'profile';
type ModalScreen = 'stage' | 'lesson' | null;

export default function App() {
  const { progress, completeLesson, reset, loaded } = useProgress();
  const [tab, setTab] = useState<Tab>('roadmap');
  const [modal, setModal] = useState<ModalScreen>(null);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }

  function openStage(stage: Stage) {
    setSelectedStage(stage);
    setModal('stage');
  }

  function openLesson(idx: number) {
    setSelectedLessonIdx(idx);
    setModal('lesson');
  }

  function handleLessonComplete() {
    if (!selectedStage) return;
    const lesson = selectedStage.lessons[selectedLessonIdx];
    const stageLessonIds = selectedStage.lessons.map(l => l.id);
    const { newAchievements, stageCompleted } = completeLesson(
      lesson.id,
      selectedStage.id,
      stageLessonIds,
      Math.round(selectedStage.xpReward / selectedStage.lessons.length),
    );

    if (stageCompleted) showToast(`🏆 Stage completed! +${selectedStage.xpReward} XP`);
    else if (newAchievements.length > 0) showToast(`🎖 New achievement unlocked!`);
    else showToast('✓ Lesson complete!');

    // Go back to stage screen
    setModal('stage');
  }

  if (!loaded) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={styles.loadingText}>⚡ CyberPath</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />

      {/* Main content area */}
      <View style={{ flex: 1 }}>
        {tab === 'roadmap' && (
          <RoadmapScreen progress={progress} onSelectStage={openStage} />
        )}
        {tab === 'profile' && (
          <ProfileScreen progress={progress} onReset={reset} />
        )}
      </View>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setTab('roadmap')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, tab === 'roadmap' && styles.tabIconActive]}>🗺</Text>
          <Text style={[styles.tabLabel, tab === 'roadmap' && styles.tabLabelActive]}>Roadmap</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => setTab('profile')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabIcon, tab === 'profile' && styles.tabIconActive]}>👤</Text>
          <Text style={[styles.tabLabel, tab === 'profile' && styles.tabLabelActive]}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stage modal */}
      <Modal
        visible={modal === 'stage' || modal === 'lesson'}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          if (modal === 'lesson') setModal('stage');
          else setModal(null);
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
          {modal === 'stage' && selectedStage && (
            <StageScreen
              stage={selectedStage}
              progress={progress}
              onSelectLesson={openLesson}
              onBack={() => setModal(null)}
            />
          )}
          {modal === 'lesson' && selectedStage && (
            <LessonScreen
              lesson={selectedStage.lessons[selectedLessonIdx]}
              stage={selectedStage}
              lessonIndex={selectedLessonIdx}
              totalLessons={selectedStage.lessons.length}
              onComplete={handleLessonComplete}
              onBack={() => setModal('stage')}
            />
          )}
        </SafeAreaView>
      </Modal>

      {/* Toast */}
      {toast && (
        <View style={styles.toast} pointerEvents="none">
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1, backgroundColor: C.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  loadingText: { fontSize: 28, fontWeight: '800', color: C.indigo },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderTopWidth: 1,
    borderTopColor: C.border,
    paddingBottom: 4,
  },
  tabItem: {
    flex: 1, alignItems: 'center', paddingVertical: 10, gap: 3,
  },
  tabIcon: { fontSize: 22 },
  tabIconActive: {},
  tabLabel: { fontSize: 11, color: C.textMut, fontWeight: '600' },
  tabLabelActive: { color: C.indigo },
  toast: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: C.border2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: { fontSize: 14, fontWeight: '600', color: C.text },
});
