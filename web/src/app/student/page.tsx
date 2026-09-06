"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Brain,
  Bot,
  BookOpen,
  Flame,
  Star,
  NotebookPen,
  LogOut,
} from "lucide-react";
import { useAppStore, getCompletionPercent } from "@/lib/store";
import { getOverallExerciseStats } from "@/lib/progress";
import { ChapterCard } from "@/components/ChapterCard";
import { ProgressRing } from "@/components/ProgressRing";
import {
  INTRO_CHAPTERS,
  CT_CHAPTERS,
  AI_CHAPTERS,
  BADGES,
} from "@/data/curriculum";

export default function StudentDashboard() {
  const router = useRouter();
  const { student, progress, badges, journal, updateStreak, resetAll } = useAppStore();

  useEffect(() => {
    if (!student) router.replace("/");
    else updateStreak();
  }, [student, router, updateStreak]);

  if (!student) return null;

  const completion = getCompletionPercent(progress);
  const exerciseStats = getOverallExerciseStats(progress);
  const xpToNext = student.level * 100 - (student.xp % (student.level * 100 || 100));

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="gradient-hero text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{student.avatar}</span>
            <div>
              <p className="text-sm text-white/80">Welcome back,</p>
              <h1 className="text-xl font-bold">{student.name}</h1>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              resetAll();
              router.push("/");
            }}
            className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 text-sm"
          >
            <LogOut className="h-4 w-4" /> Exit
          </button>
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-8 md:grid-cols-4">
          <div className="flex items-center gap-4 rounded-2xl bg-white/15 p-4 backdrop-blur md:col-span-2">
            <ProgressRing percent={completion} size={72} />
            <div>
              <p className="text-sm text-white/80">Overall progress</p>
              <p className="text-2xl font-bold">{completion}% complete</p>
              <p className="text-xs text-white/70">{exerciseStats.done}/{exerciseStats.total} exercises · Class {student.classCode}</p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="flex items-center gap-1 text-sm text-white/80">
              <Star className="h-4 w-4" /> Level {student.level}
            </p>
            <p className="text-2xl font-bold">{student.xp} XP</p>
            <p className="text-xs text-white/70">{xpToNext} XP to next level</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
            <p className="flex items-center gap-1 text-sm text-white/80">
              <Flame className="h-4 w-4" /> Streak
            </p>
            <p className="text-2xl font-bold">{student.streak} days</p>
            <p className="text-xs text-white/70">Keep learning daily!</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            href="/student/journal"
            className="flex items-center gap-2 rounded-full bg-violet-100 px-5 py-2.5 font-semibold text-violet-700"
          >
            <NotebookPen className="h-4 w-4" /> Thinking Journal ({journal.length})
          </Link>
          {badges.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 rounded-full bg-amber-50 px-4 py-2">
              {badges.map((id) => {
                const b = BADGES.find((x) => x.id === id);
                return b ? (
                  <span key={id} title={b.description} className="text-xl">
                    {b.emoji}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <BookOpen className="h-5 w-5 text-indigo-500" /> Start Here
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTRO_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                status={progress[ch.id]?.status ?? "available"}
                chapterProgress={progress[ch.id]}
                href={`/student/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Brain className="h-5 w-5 text-cyan-500" /> Part 1 — Computational Thinking
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            10 chapters aligned with your Class 6 Math textbook — thinking puzzles, not rote answers.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CT_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                status={progress[ch.id]?.status ?? "available"}
                chapterProgress={progress[ch.id]}
                href={`/student/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Bot className="h-5 w-5 text-emerald-500" /> Part 2 — Artificial Intelligence
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            4 chapters — learn, explore interactively, and practice with book exercises.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {AI_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={ch}
                status={progress[ch.id]?.status ?? "available"}
                chapterProgress={progress[ch.id]}
                href={`/student/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
