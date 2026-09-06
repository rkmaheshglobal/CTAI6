import { describe, it, expect } from "vitest";
import {
  calcLevel,
  mergeProgress,
  getCompletionPercent,
} from "@/lib/store";
import {
  getChapterExerciseProgress,
  isChapterFullyAttempted,
  deriveChapterStatus,
  getOverallExerciseStats,
} from "@/lib/progress";
import type { ChapterProgress } from "@/lib/types";

describe("XP and Level Calculation", () => {
  it("calculates level 1 for 0 to 99 XP", () => {
    expect(calcLevel(0)).toBe(1);
    expect(calcLevel(50)).toBe(1);
    expect(calcLevel(99)).toBe(1);
  });

  it("calculates level 2 for 100 to 299 XP", () => {
    expect(calcLevel(100)).toBe(2);
    expect(calcLevel(200)).toBe(2);
    expect(calcLevel(299)).toBe(2);
  });

  it("calculates level 3 for 300 to 599 XP", () => {
    expect(calcLevel(300)).toBe(3);
    expect(calcLevel(599)).toBe(3);
  });

  it("calculates level 4 for 600+ XP", () => {
    expect(calcLevel(600)).toBe(4);
  });
});

describe("Chapter Exercise Progress", () => {
  it("computes progress for ct-patterns", () => {
    const mockProgress: ChapterProgress = {
      chapterId: "ct-patterns",
      status: "in-progress",
      sectionsRead: ["overview"],
      exercisesDone: ["ct-patterns-q1", "ct-patterns-q2"],
      activityDone: false,
    };

    const stats = getChapterExerciseProgress("ct-patterns", mockProgress);
    expect(stats.total).toBe(10);
    expect(stats.done).toBe(2);
    expect(stats.pct).toBe(20);
  });

  it("handles undefined progress gracefully", () => {
    const stats = getChapterExerciseProgress("ct-patterns", undefined);
    expect(stats.total).toBe(10);
    expect(stats.done).toBe(0);
    expect(stats.pct).toBe(0);
  });

  it("identifies fully attempted chapter", () => {
    const completedProgress: ChapterProgress = {
      chapterId: "intro-start",
      status: "completed",
      sectionsRead: ["overview"],
      exercisesDone: ["intro-start-q1", "intro-start-q2", "intro-start-q3"],
      activityDone: false,
    };

    expect(isChapterFullyAttempted("intro-start", completedProgress)).toBe(true);
  });

  it("derives chapter status correctly", () => {
    const unstartedProgress: ChapterProgress = {
      chapterId: "ct-patterns",
      status: "available",
      sectionsRead: [],
      exercisesDone: [],
      activityDone: false,
    };
    expect(deriveChapterStatus("ct-patterns", unstartedProgress)).toBe("available");

    const activeProgress: ChapterProgress = {
      ...unstartedProgress,
      sectionsRead: ["overview"],
    };
    expect(deriveChapterStatus("ct-patterns", activeProgress)).toBe("in-progress");

    const doneProgress: ChapterProgress = {
      ...unstartedProgress,
      status: "completed",
    };
    expect(deriveChapterStatus("ct-patterns", doneProgress)).toBe("completed");
  });

  it("calculates overall exercise statistics across all chapters", () => {
    const progressMap: Record<string, ChapterProgress> = {
      "intro-start": {
        chapterId: "intro-start",
        status: "completed",
        sectionsRead: [],
        exercisesDone: ["intro-start-q1", "intro-start-q2", "intro-start-q3"],
        activityDone: false,
      },
    };

    const overall = getOverallExerciseStats(progressMap);
    expect(overall.done).toBe(3);
    expect(overall.total).toBeGreaterThan(100);
    expect(overall.pct).toBeGreaterThan(0);
  });
});

describe("Merge Progress and Completion", () => {
  it("merges undefined progress with all defaults", () => {
    const merged = mergeProgress(undefined);
    expect(Object.keys(merged).length).toBe(15);
    expect(merged["intro-start"]?.status).toBe("available");
  });

  it("preserves completed status when merging saved progress", () => {
    const saved: Record<string, ChapterProgress> = {
      "ai-intro": {
        chapterId: "ai-intro",
        status: "completed",
        sectionsRead: ["what-is-ai"],
        exercisesDone: ["ai-intro-q1"],
        activityDone: true,
      },
    };

    const merged = mergeProgress(saved);
    expect(merged["ai-intro"]?.status).toBe("completed");
    expect(merged["ai-intro"]?.activityDone).toBe(true);
    expect(merged["ct-patterns"]?.status).toBe("available");
  });

  it("computes completion percent correctly", () => {
    const progressMap = mergeProgress(undefined);
    expect(getCompletionPercent(progressMap)).toBe(0);

    progressMap["intro-start"].status = "completed";
    progressMap["ai-intro"].status = "completed";
    progressMap["ai-data"].status = "completed";
    // 3 out of 15 chapters = 20%
    expect(getCompletionPercent(progressMap)).toBe(20);
  });
});
