export type Difficulty = 'zero' | 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type LessonType = 'theory' | 'quiz' | 'terminal';

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
  duration: number;
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
  difficulty: Difficulty;
  xpReward: number;
  requiresStage?: string;
  description: string;
  skills: string[];
  lessons: Lesson[];
}

export interface UserProgress {
  xp: number;
  completedLessons: string[];
  completedStages: string[];
  achievements: string[];
  streak: number;
  lastActiveDate: string;
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
