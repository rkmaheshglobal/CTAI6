"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Brain, Bot, BookOpen, ArrowLeft, LogOut, GraduationCap } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ChapterCard } from "@/components/ChapterCard";
import {
  INTRO_CHAPTERS,
  CT_CHAPTERS,
  AI_CHAPTERS,
} from "@/data/curriculum";
import { getExerciseCount } from "@/data/chapter-registry";

export default function TeacherChaptersPage() {
  const router = useRouter();
  const { teacherName, resetAll } = useAppStore();

  useEffect(() => {
    if (!teacherName) router.replace("/");
  }, [teacherName, router]);

  if (!teacherName) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/teacher" className="text-teal-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Chapter Library</h1>
              <p className="text-sm text-slate-500">Answer keys & teaching notes for every chapter</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              resetAll();
              router.push("/");
            }}
            className="flex items-center gap-1 text-sm text-slate-500"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-start gap-3 rounded-2xl bg-teal-50 border border-teal-200 p-5">
          <GraduationCap className="h-8 w-8 shrink-0 text-teal-600" />
          <div className="text-sm text-teal-900">
            <p className="font-bold">How to use this library</p>
            <p className="mt-1">
              Open any chapter to see every question with the correct answer, full justification, wrong-option explanations, and facilitation nudges. Students see the same questions in Practice mode with up to 3 guided attempts.
            </p>
          </div>
        </div>

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <BookOpen className="h-5 w-5 text-indigo-500" /> Start Here
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INTRO_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={{ ...ch, questionCount: getExerciseCount(ch.id) || undefined }}
                status="available"
                href={`/teacher/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Brain className="h-5 w-5 text-cyan-500" /> Part 1 — Computational Thinking
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CT_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={{ ...ch, questionCount: getExerciseCount(ch.id) || ch.questionCount }}
                status="available"
                href={`/teacher/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>

        <motion.section className="mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
            <Bot className="h-5 w-5 text-emerald-500" /> Part 2 — Artificial Intelligence
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {AI_CHAPTERS.map((ch, i) => (
              <ChapterCard
                key={ch.id}
                chapter={{ ...ch, questionCount: getExerciseCount(ch.id) || 5 }}
                status="available"
                href={`/teacher/learn/${ch.id}`}
                index={i}
              />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
