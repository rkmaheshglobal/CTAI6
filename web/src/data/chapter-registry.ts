import type { ChapterContent } from "@/lib/types";
import {
  getChapterContentById,
  getExerciseCount,
  hasFullContent,
} from "./load-handbook";

export function getChapterContent(id: string): ChapterContent | null {
  return getChapterContentById(id);
}

export { getExerciseCount, hasFullContent };
