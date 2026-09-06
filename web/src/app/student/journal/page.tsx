"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, NotebookPen } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { ALL_CHAPTERS } from "@/data/curriculum";
import { formatDate } from "@/lib/utils";

export default function JournalPage() {
  const router = useRouter();
  const { student, journal } = useAppStore();

  useEffect(() => {
    if (!student) router.replace("/");
  }, [student, router]);

  if (!student) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <Link href="/student" className="text-violet-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="flex items-center gap-2 font-bold text-slate-800">
            <NotebookPen className="h-5 w-5 text-violet-500" /> Thinking Journal
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <p className="text-sm text-slate-600">
          Your reflective journal — aligned with the handbook&apos;s formative assessment approach.
        </p>

        {journal.length === 0 ? (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-300 p-12 text-center">
            <p className="text-4xl">📝</p>
            <p className="mt-4 font-medium text-slate-600">No entries yet.</p>
            <p className="mt-1 text-sm text-slate-500">
              Complete a chapter&apos;s Reflect tab to add your first entry.
            </p>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {journal.map((entry) => {
              const ch = ALL_CHAPTERS.find((c) => c.id === entry.chapterId);
              return (
                <li
                  key={entry.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{ch?.title ?? entry.chapterId}</span>
                    <span>{formatDate(entry.createdAt)}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-violet-700">{entry.prompt}</p>
                  <p className="mt-2 text-slate-700 leading-relaxed">{entry.answer}</p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
