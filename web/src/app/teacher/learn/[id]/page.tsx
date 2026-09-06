"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, KeyRound } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getChapterContent } from "@/data/chapter-registry";
import { ALL_CHAPTERS } from "@/data/curriculum";
import { TeacherAnswerBlock } from "@/components/TeacherAnswerBlock";

type Tab = "overview" | "answers";

export default function TeacherLearnChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.id as string;
  const { teacherName } = useAppStore();
  const [tab, setTab] = useState<Tab>("answers");

  const meta = ALL_CHAPTERS.find((c) => c.id === chapterId);
  const content = getChapterContent(chapterId);

  useEffect(() => {
    if (!teacherName) router.replace("/");
  }, [teacherName, router]);

  if (!teacherName || !meta) return null;

  const tabs: { id: Tab; label: string }[] = [
    { id: "overview", label: "📖 Overview" },
    { id: "answers", label: "🔑 Answer key" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
          <Link href="/teacher/chapters" className="text-teal-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="truncate font-bold text-slate-800">{meta.title}</h1>
            <p className="text-xs text-slate-500">{meta.sourcePages} · Teacher view</p>
          </div>
          <KeyRound className="h-5 w-5 shrink-0 text-teal-600" />
        </div>

        <div className="mx-auto flex max-w-4xl gap-1 px-4 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.id
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {tab === "overview" && (
          <div className="space-y-6">
            {content?.learn?.map((section) => (
              <article
                key={section.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-slate-800">{section.title}</h2>
                {section.content.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-3 text-slate-600 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-slate-600">
                        <span className="text-teal-500">•</span> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}

            {content?.keyPoints && (
              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-6">
                <h3 className="flex items-center gap-2 font-bold text-teal-900">
                  <BookOpen className="h-5 w-5" /> Key points
                </h3>
                <ul className="mt-3 space-y-2">
                  {content.keyPoints.map((p) => (
                    <li key={p} className="text-sm text-teal-800">✓ {p}</li>
                  ))}
                </ul>
              </div>
            )}

            {!content && (
              <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                Chapter content is not yet loaded in the app.
              </p>
            )}
          </div>
        )}

        {tab === "answers" && content?.exercises && (
          <TeacherAnswerBlock questions={content.exercises} />
        )}

        {tab === "answers" && !content?.exercises?.length && (
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
            No practice questions available for this chapter yet.
          </p>
        )}
      </main>
    </div>
  );
}
