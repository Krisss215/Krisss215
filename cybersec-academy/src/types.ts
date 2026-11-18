export type Difficulty = 'zero' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type LessonType = 'theory' | 'quiz' | 'terminal' | 'practice';
export type CareerTrack = 'blue' | 'red' | 'general';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TerminalStep {
  cmd: string;
  output: string;
  hint: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number; // minutes
  type: LessonType;
  content?: string;
  quiz?: QuizQuestion[];
  terminal?: {
    intro: string;
    goal: string;
    steps: TerminalStep[];
  };
}

export interface Stage {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgColor: string;
  difficulty: Difficulty;
  xpReward: number;
  requiresStage?: string;
  track: CareerTrack;
  description: string;
  skills: string[];
  lessons: Lesson[];
}

export interface UserProgress {
  xp: number;
  level: number;
  completedLessons: string[];
  completedStages: string[];
  achievements: string[];
  streak: number;
  lastActiveDate: string;
  selectedTrack?: CareerTrack;
  startedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  check: (p: UserProgress) => boolean;
}

export interface Rank {
  minXp: number;
  title: string;
  icon: string;
  color: string;
}
