import { describe, it, expect } from "vitest";
import { generateClassCsv } from "../export";
import type { StudentProfile } from "../types";

describe("generateClassCsv", () => {
  it("generates valid CSV with header and metadata for empty class", () => {
    const csv = generateClassCsv("Class 6-A", "ABC123", [], () => undefined);
    expect(csv).toContain("# Class: Class 6-A (ABC123)");
    expect(csv).toContain("Student Name,Avatar,Class Code,Level,Total XP,Daily Streak");
  });

  it("exports student rows with progress, badge titles, and chapter statuses", () => {
    const students: StudentProfile[] = [
      {
        id: "student-1",
        name: "Aarav Sharma",
        avatar: "🦊",
        classCode: "ABC123",
        level: 2,
        xp: 150,
        streak: 3,
        lastActiveDate: "2026-09-06",
        joinedAt: "2026-09-01",
      },
    ];

    const snapshot = {
      progress: {
        "intro-start": {
          chapterId: "intro-start",
          status: "completed" as const,
          sectionsRead: ["overview"],
          exercisesDone: ["q1", "q2", "q3"],
          activityDone: false,
        },
        "ct-patterns": {
          chapterId: "ct-patterns",
          status: "completed" as const,
          sectionsRead: ["overview"],
          exercisesDone: ["q1"],
          activityDone: false,
        },
      },
      badges: ["first-step", "pattern-pro"],
    };

    const csv = generateClassCsv("Class 6-A", "ABC123", students, () => snapshot);

    // Check student data row
    expect(csv).toContain("Aarav Sharma");
    expect(csv).toContain("🦊");
    expect(csv).toContain("ABC123");
    expect(csv).toContain("First Step; Pattern Pro");
    expect(csv).toContain("Completed");
  });

  it("escapes names or strings containing commas and quotes properly", () => {
    const students: StudentProfile[] = [
      {
        id: "student-2",
        name: 'Patel, Diya "Star"',
        avatar: "🐼",
        classCode: "ABC123",
        level: 1,
        xp: 0,
        streak: 0,
        lastActiveDate: "2026-09-06",
        joinedAt: "2026-09-01",
      },
    ];

    const csv = generateClassCsv("Room, Special", "ABC123", students, () => null);

    // Name with comma and quote should be escaped with double quotes
    expect(csv).toContain('"Patel, Diya ""Star"""');
    expect(csv).toContain("Not Started");
  });
});
