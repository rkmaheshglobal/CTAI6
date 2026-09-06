import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type {
  ChapterProgress,
  ClassRoom,
  JournalEntry,
  StudentProfile,
} from "@/lib/types";
import { ALL_CHAPTERS, AVATARS, BADGES } from "@/data/curriculum";
import { isChapterFullyAttempted } from "@/lib/progress";

const today = () => new Date().toISOString().slice(0, 10);

function calcLevel(xp: number) {
  let level = 1;
  let needed = 100;
  let remaining = xp;
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed = level * 100;
  }
  return level;
}

function defaultProgress(): Record<string, ChapterProgress> {
  const map: Record<string, ChapterProgress> = {};
  ALL_CHAPTERS.forEach((ch) => {
    map[ch.id] = {
      chapterId: ch.id,
      status: "available",
      sectionsRead: [],
      exercisesDone: [],
      activityDone: false,
    };
  });
  return map;
}

/** Merge saved progress with current chapter list; keep completed state, open access for all. */
export function mergeProgress(
  saved: Record<string, ChapterProgress> | undefined
): Record<string, ChapterProgress> {
  const base = defaultProgress();
  if (!saved) return base;
  for (const ch of ALL_CHAPTERS) {
    const existing = saved[ch.id];
    if (existing) {
      base[ch.id] = {
        ...base[ch.id],
        ...existing,
        chapterId: ch.id,
        status:
          existing.status === "completed"
            ? "completed"
            : existing.status === "in-progress"
              ? "in-progress"
              : "available",
      };
    }
  }
  return base;
}

function unlockNext(progress: Record<string, ChapterProgress>, chapterId: string) {
  const idx = ALL_CHAPTERS.findIndex((c) => c.id === chapterId);
  if (idx >= 0 && idx < ALL_CHAPTERS.length - 1) {
    const next = ALL_CHAPTERS[idx + 1];
    if (progress[next.id]?.status === "locked") {
      progress[next.id] = { ...progress[next.id], status: "available" };
    }
  }
}

function persistStudentSnapshot(
  student: StudentProfile,
  progress: Record<string, ChapterProgress>,
  badges: string[],
  journal: JournalEntry[]
) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `ctai-student-${student.id}`,
    JSON.stringify({ student, progress, badges, journal })
  );
}

interface AppState {
  role: "student" | "teacher" | null;
  student: StudentProfile | null;
  teacherName: string | null;
  classrooms: Record<string, ClassRoom>;
  studentRegistry: Record<string, StudentProfile>;
  progress: Record<string, ChapterProgress>;
  journal: JournalEntry[];
  badges: string[];

  setRole: (role: "student" | "teacher") => void;
  createStudent: (name: string, classCode: string, avatar?: string) => void;
  createClassroom: (name: string, teacherName: string) => string;
  visitChapter: (chapterId: string) => void;
  markSectionRead: (chapterId: string, sectionId: string) => void;
  markExerciseDone: (chapterId: string, exerciseId: string) => void;
  markActivityDone: (chapterId: string) => void;
  completeChapter: (chapterId: string) => void;
  addJournalEntry: (chapterId: string, prompt: string, answer: string) => void;
  awardBadge: (badgeId: string) => void;
  addXp: (amount: number) => void;
  updateStreak: () => void;
  getClassStudents: (code: string) => StudentProfile[];
  getStudentSnapshot: (studentId: string) => {
    student: StudentProfile;
    progress: Record<string, ChapterProgress>;
    badges: string[];
    journal: JournalEntry[];
  } | null;
  resetAll: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      role: null,
      student: null,
      teacherName: null,
      classrooms: {},
      studentRegistry: {},
      progress: defaultProgress(),
      journal: [],
      badges: [],

      setRole: (role) => set({ role }),

      createStudent: (name, classCode, avatar) => {
        const student: StudentProfile = {
          id: uuidv4(),
          name,
          classCode: classCode.toUpperCase(),
          avatar: avatar ?? AVATARS[Math.floor(Math.random() * AVATARS.length)],
          xp: 0,
          level: 1,
          streak: 1,
          lastActiveDate: today(),
          joinedAt: new Date().toISOString(),
        };
        const code = student.classCode;
        set((s) => {
          const room = s.classrooms[code];
          const classrooms = room
            ? {
                ...s.classrooms,
                [code]: {
                  ...room,
                  studentIds: room.studentIds.includes(student.id)
                    ? room.studentIds
                    : [...room.studentIds, student.id],
                },
              }
            : s.classrooms;
          return {
            student,
            role: "student",
            studentRegistry: { ...s.studentRegistry, [student.id]: student },
            classrooms,
          };
        });
        get().updateStreak();
        persistStudentSnapshot(student, get().progress, get().badges, get().journal);
      },

      createClassroom: (name, teacherName) => {
        const code = `${name.slice(0, 4).toUpperCase().replace(/[^A-Z]/g, "X")}-${Math.floor(10 + Math.random() * 90)}`;
        const room: ClassRoom = {
          code,
          name,
          teacherName,
          createdAt: new Date().toISOString(),
          studentIds: [],
        };
        set((s) => ({
          teacherName,
          role: "teacher",
          classrooms: { ...s.classrooms, [code]: room },
        }));
        return code;
      },

      visitChapter: (chapterId) => {
        set((s) => {
          const ch = s.progress[chapterId];
          if (!ch || ch.status === "completed" || ch.status === "in-progress") return s;
          const progress = {
            ...s.progress,
            [chapterId]: { ...ch, status: "in-progress" as const },
          };
          if (s.student) persistStudentSnapshot(s.student, progress, s.badges, s.journal);
          return { progress };
        });
      },

      markSectionRead: (chapterId, sectionId) => {
        set((s) => {
          const ch = s.progress[chapterId];
          if (!ch || ch.sectionsRead.includes(sectionId)) return s;
          const updated = {
            ...ch,
            status: "in-progress" as const,
            sectionsRead: [...ch.sectionsRead, sectionId],
          };
          const student = s.student
            ? { ...s.student, xp: s.student.xp + 10, level: calcLevel(s.student.xp + 10) }
            : null;
          const progress = { ...s.progress, [chapterId]: updated };
          if (student) persistStudentSnapshot(student, progress, s.badges, s.journal);
          return { progress, student, studentRegistry: student ? { ...s.studentRegistry, [student.id]: student } : s.studentRegistry };
        });
      },

      markExerciseDone: (chapterId, exerciseId) => {
        set((s) => {
          const ch = s.progress[chapterId];
          if (!ch || ch.exercisesDone.includes(exerciseId)) return s;
          const updated: ChapterProgress = {
            ...ch,
            status:
              ch.status === "completed"
                ? "completed"
                : "in-progress",
            exercisesDone: [...ch.exercisesDone, exerciseId],
          };
          const student = s.student
            ? { ...s.student, xp: s.student.xp + 15, level: calcLevel(s.student.xp + 15) }
            : null;
          const progress = { ...s.progress, [chapterId]: updated };
          if (student) persistStudentSnapshot(student, progress, s.badges, s.journal);
          return { progress, student, studentRegistry: student ? { ...s.studentRegistry, [student.id]: student } : s.studentRegistry };
        });
        const { progress } = get();
        if (isChapterFullyAttempted(chapterId, progress[chapterId])) {
          get().completeChapter(chapterId);
        }
      },

      markActivityDone: (chapterId) => {
        set((s) => {
          const ch = s.progress[chapterId];
          if (!ch) return s;
          const student = s.student
            ? { ...s.student, xp: s.student.xp + 25, level: calcLevel(s.student.xp + 25) }
            : null;
          const progress = { ...s.progress, [chapterId]: { ...ch, activityDone: true } };
          if (student) persistStudentSnapshot(student, progress, s.badges, s.journal);
          return { progress, student, studentRegistry: student ? { ...s.studentRegistry, [student.id]: student } : s.studentRegistry };
        });
      },

      completeChapter: (chapterId) => {
        if (get().progress[chapterId]?.status === "completed") return;
        set((s) => {
          const progress = { ...s.progress };
          progress[chapterId] = {
            ...progress[chapterId],
            status: "completed",
            completedAt: new Date().toISOString(),
          };
          unlockNext(progress, chapterId);
          const student = s.student
            ? { ...s.student, xp: s.student.xp + 50, level: calcLevel(s.student.xp + 50) }
            : null;
          if (student) persistStudentSnapshot(student, progress, s.badges, s.journal);
          return { progress, student, studentRegistry: student ? { ...s.studentRegistry, [student.id]: student } : s.studentRegistry };
        });
        if (chapterId === "intro-start") get().awardBadge("first-step");
        if (chapterId === "ai-intro") get().awardBadge("ai-explorer");
        if (chapterId === "ai-data") get().awardBadge("data-star");
        if (chapterId === "ai-ethics") get().awardBadge("ethics-guardian");
        if (chapterId.startsWith("ct-")) get().awardBadge("pattern-pro");
      },

      addJournalEntry: (chapterId, prompt, answer) => {
        const entry: JournalEntry = {
          id: uuidv4(),
          chapterId,
          prompt,
          answer,
          createdAt: new Date().toISOString(),
        };
        set((s) => {
          const journal = [entry, ...s.journal];
          const student = s.student
            ? { ...s.student, xp: s.student.xp + 20, level: calcLevel(s.student.xp + 20) }
            : null;
          if (student) persistStudentSnapshot(student, s.progress, s.badges, journal);
          return { journal, student, studentRegistry: student ? { ...s.studentRegistry, [student.id]: student } : s.studentRegistry };
        });
        if (get().journal.length >= 4) get().awardBadge("thinker");
      },

      awardBadge: (badgeId) => {
        if (!BADGES.find((b) => b.id === badgeId)) return;
        set((s) => {
          if (s.badges.includes(badgeId)) return s;
          const badges = [...s.badges, badgeId];
          if (s.student) persistStudentSnapshot(s.student, s.progress, badges, s.journal);
          return { badges };
        });
      },

      addXp: (amount) => {
        set((s) => {
          if (!s.student) return s;
          const xp = s.student.xp + amount;
          const student = { ...s.student, xp, level: calcLevel(xp) };
          persistStudentSnapshot(student, s.progress, s.badges, s.journal);
          return { student, studentRegistry: { ...s.studentRegistry, [student.id]: student } };
        });
      },

      updateStreak: () => {
        set((s) => {
          if (!s.student) return s;
          const last = s.student.lastActiveDate;
          const t = today();
          if (last === t) return s;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yStr = yesterday.toISOString().slice(0, 10);
          const streak = last === yStr ? s.student.streak + 1 : 1;
          const student = { ...s.student, streak, lastActiveDate: t };
          persistStudentSnapshot(student, s.progress, s.badges, s.journal);
          return { student, studentRegistry: { ...s.studentRegistry, [student.id]: student } };
        });
        if ((get().student?.streak ?? 0) >= 3) get().awardBadge("streak-3");
      },

      getClassStudents: (code) => {
        const room = get().classrooms[code];
        if (!room) return [];
        return room.studentIds
          .map((id) => get().studentRegistry[id])
          .filter(Boolean) as StudentProfile[];
      },

      getStudentSnapshot: (studentId) => {
        const fromRegistry = get().studentRegistry[studentId];
        if (typeof window !== "undefined") {
          const raw = localStorage.getItem(`ctai-student-${studentId}`);
          if (raw) {
            try {
              return JSON.parse(raw);
            } catch {
              /* ignore */
            }
          }
        }
        if (fromRegistry && get().student?.id === studentId) {
          return {
            student: get().student!,
            progress: get().progress,
            badges: get().badges,
            journal: get().journal,
          };
        }
        return null;
      },

      resetAll: () =>
        set({
          role: null,
          student: null,
          teacherName: null,
          studentRegistry: {},
          progress: defaultProgress(),
          journal: [],
          badges: [],
        }),
    }),
    {
      name: "ctai-learn-storage",
      merge: (persisted, current) => {
        const p = persisted as Partial<AppState> | undefined;
        return {
          ...current,
          ...p,
          progress: mergeProgress(p?.progress),
        };
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.progress = mergeProgress(state.progress);
        }
      },
    }
  )
);

export function getCompletionPercent(progress: Record<string, ChapterProgress>) {
  const total = ALL_CHAPTERS.length;
  const done = Object.values(progress).filter((p) => p.status === "completed").length;
  return Math.round((done / total) * 100);
}
