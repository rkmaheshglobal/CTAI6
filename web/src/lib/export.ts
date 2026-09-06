import type { StudentProfile, ChapterProgress } from "@/lib/types";
import { getCompletionPercent } from "@/lib/store";
import { ALL_CHAPTERS, BADGES, CT_CHAPTERS, AI_CHAPTERS } from "@/data/curriculum";

function escapeCsvCell(val: string | number | undefined | null): string {
  if (val === undefined || val === null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export interface StudentProgressSnapshot {
  progress: Record<string, ChapterProgress>;
  badges?: string[];
}

export function generateClassCsv(
  className: string,
  classCode: string,
  students: StudentProfile[],
  getSnapshot: (id: string) => StudentProgressSnapshot | null | undefined
): string {
  const dateStr = new Date().toISOString().slice(0, 10);
  const badgeMap = new Map(BADGES.map((b) => [b.id, b.title]));

  // Header row
  const headers = [
    "Student Name",
    "Avatar",
    "Class Code",
    "Level",
    "Total XP",
    "Daily Streak",
    "Overall Completion %",
    `CT Done (of ${CT_CHAPTERS.length})`,
    `AI Done (of ${AI_CHAPTERS.length})`,
    "Badges Earned",
    "Badges List",
    ...ALL_CHAPTERS.map((ch) => `Ch ${ch.number}: ${ch.title}`),
  ];

  const rows: string[] = [];

  // Metadata comments in CSV
  rows.push(`# CTAI6 Class Gradebook Export`);
  rows.push(`# Class: ${className} (${classCode})`);
  rows.push(`# Exported: ${dateStr}`);
  rows.push(`# Total Students: ${students.length}`);
  rows.push("");
  rows.push(headers.map(escapeCsvCell).join(","));

  for (const s of students) {
    const snap = getSnapshot(s.id);
    const progress = snap?.progress ?? {};
    const overallPct = snap ? getCompletionPercent(progress) : 0;

    const ctDone = CT_CHAPTERS.filter((c) => progress[c.id]?.status === "completed").length;
    const aiDone = AI_CHAPTERS.filter((c) => progress[c.id]?.status === "completed").length;

    const studentBadges: string[] = snap?.badges ?? [];
    const badgeNames = studentBadges.map((bid: string) => badgeMap.get(bid) || bid).join("; ");

    const chapterStatuses = ALL_CHAPTERS.map((ch) => {
      const p = progress[ch.id];
      if (p?.status === "completed") return "Completed";
      if (p?.status === "in-progress") return "In Progress";
      return "Not Started";
    });

    const row = [
      s.name,
      s.avatar,
      classCode,
      s.level,
      s.xp,
      s.streak ?? 0,
      `${overallPct}%`,
      ctDone,
      aiDone,
      studentBadges.length,
      badgeNames,
      ...chapterStatuses,
    ];

    rows.push(row.map(escapeCsvCell).join(","));
  }

  return rows.join("\r\n");
}

export function downloadCsv(filename: string, csvContent: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
