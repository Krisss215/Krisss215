export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  type: 'theory' | 'quiz' | 'terminal' | 'challenge';
  quiz?: QuizQuestion[];
  terminalChallenge?: TerminalChallenge;
  codeChallenge?: CodeChallenge;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TerminalChallenge {
  description: string;
  commands: { cmd: string; output: string; hint?: string }[];
  goal: string;
}

export interface CodeChallenge {
  description: string;
  starterCode: string;
  solution: string;
  hint: string;
}

export interface UserProgress {
  completedLessons: string[];
  completedModules: string[];
  score: number;
  achievements: string[];
  streak: number;
  lastActiveDate: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  condition: (progress: UserProgress) => boolean;
}
