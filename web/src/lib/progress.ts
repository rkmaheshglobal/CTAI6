import type { ChapterProgress } from "@/lib/types";
import { ALL_CHAPTERS } from "@/data/curriculum";
import { getExerciseCount } from "@/data/chapter-registry";

export function getChapterExerciseProgress(
  chapterId: string,
  progress: ChapterProgress | undefined
) {
  const total = getExerciseCount(chapterId);
  const done = progress?.exercisesDone.length ?? 0;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

export function isChapterFullyAttempted(
  chapterId: string,
  progress: ChapterProgress | undefined
): boolean {
  const { done, total } = getChapterExerciseProgress(chapterId, progress);
  return total > 0 && done >= total;
}

export function deriveChapterStatus(
  chapterId: string,
  progress: ChapterProgress | undefined
): ChapterProgress["status"] {
  if (progress?.status === "completed") return "completed";
  const { done, total } = getChapterExerciseProgress(chapterId, progress);
  if (done > 0 || progress?.sectionsRead.length || progress?.activityDone) return "in-progress";
  if (total === 0 && progress?.status === "in-progress") return "in-progress";
  return "available";
}

export function getOverallExerciseStats(progress: Record<string, ChapterProgress>) {
  let done = 0;
  let total = 0;
  for (const ch of ALL_CHAPTERS) {
    const ex = getChapterExerciseProgress(ch.id, progress[ch.id]);
    done += ex.done;
    total += ex.total;
  }
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}
