export type CTSkill =
  | "pattern-recognition"
  | "decomposition"
  | "abstraction"
  | "algorithmic-thinking"
  | "data-analysis";

export type ChapterPart = "intro" | "ct" | "ai";

export interface ChapterMeta {
  id: string;
  part: ChapterPart;
  number: number;
  title: string;
  subtitle?: string;
  ctSkills?: CTSkill[];
  description: string;
  sourcePages: string;
  hasActivity?: boolean;
  questionCount?: number;
}

export interface QuizOption {
  id: string;
  text: string;
  correct?: boolean;
}

export interface QuestionGuide {
  hasOfficialAnswer: boolean;
  explanation: string;
  thinkingSteps: string[];
  nudges: string[];
  wrongFeedback: Record<string, string>;
  teacherNote?: string;
  detailedSteps?: { heading: string; content: string }[];
  conclusion?: string;
  example?: string;
}

export interface QuizQuestion {
  id: string;
  type: "mcq" | "fill" | "short" | "think" | "classify";
  prompt: string;
  options?: QuizOption[];
  answer?: string;
  hint?: string;
  discussionPrompt?: string;
  handbookPage?: number;
  requiresDiagram?: boolean;
  diagramImage?: string;
  imageOnlyOptions?: boolean;
  guide?: QuestionGuide;
}

export type LearnAccent = "violet" | "blue" | "emerald" | "amber" | "rose" | "cyan" | "indigo";

export type LearnVisual =
  | {
      type: "cards";
      items: { emoji: string; title: string; subtitle?: string; description: string }[];
    }
  | {
      type: "compare";
      left: { label: string; emoji: string; points: string[] };
      right: { label: string; emoji: string; points: string[] };
    }
  | {
      type: "timeline";
      events: { emoji: string; label: string; text: string }[];
    }
  | {
      type: "grid";
      items: { emoji: string; label: string }[];
    }
  | {
      type: "steps";
      items: { emoji: string; title: string; text: string }[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "diagram";
      nodes: { emoji: string; label: string }[];
      flow?: string[];
    };

export interface LearnSection {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
  emoji?: string;
  accent?: LearnAccent;
  visual?: LearnVisual;
  funFact?: string;
  practiceTip?: string;
}

export interface ChapterContent {
  meta: ChapterMeta;
  learn: LearnSection[];
  keyPoints?: string[];
  exercises?: QuizQuestion[];
}

export interface StudentProfile {
  id: string;
  name: string;
  classCode: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  joinedAt: string;
}

export interface ChapterProgress {
  chapterId: string;
  status: "locked" | "available" | "in-progress" | "completed";
  sectionsRead: string[];
  exercisesDone: string[];
  activityDone: boolean;
  reflection?: string;
  completedAt?: string;
}

export interface ClassRoom {
  code: string;
  name: string;
  teacherName: string;
  createdAt: string;
  studentIds: string[];
}

export interface JournalEntry {
  id: string;
  chapterId: string;
  prompt: string;
  answer: string;
  createdAt: string;
}
