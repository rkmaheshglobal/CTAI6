"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { LearnSectionLayout } from "@/components/LearnSectionView";
import { isAiLearnChapter } from "@/data/ai-learn-visuals";
import { useAppStore } from "@/lib/store";
import { getChapterContent } from "@/data/chapter-registry";
import { ALL_CHAPTERS } from "@/data/curriculum";
import { getChapterExerciseProgress } from "@/lib/progress";
import { QuizBlock } from "@/components/QuizBlock";
import {
  AutomationSortGame,
  MLTypeMatcher,
  CirclePolygonExplorer,
} from "@/components/activities/InteractiveActivities";

type Tab = "learn" | "explore" | "practice" | "reflect";

function getDefaultTab(chapterId: string, content: ReturnType<typeof getChapterContent>): Tab {
  if (content?.learn?.length) return "learn";
  if (content?.exercises?.length) return "practice";
  if (chapterId === "ct-prime-time" || chapterId === "ai-intro") return "explore";
  return "reflect";
}

export default function LearnChapterPage() {
  const params = useParams();
  const router = useRouter();
  const chapterId = params.id as string;

  const {
    student,
    progress,
    visitChapter,
    markSectionRead,
    markExerciseDone,
    markActivityDone,
    completeChapter,
    addJournalEntry,
  } = useAppStore();

  const meta = ALL_CHAPTERS.find((c) => c.id === chapterId);
  const content = getChapterContent(chapterId);
  const chProgress = progress[chapterId];
  const exerciseProgress = getChapterExerciseProgress(chapterId, chProgress);

  const defaultTab = getDefaultTab(chapterId, content);
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);
  const tab = selectedTab ?? defaultTab;

  const [readSections, setReadSections] = useState<Set<string>>(new Set());
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    if (!student) router.replace("/");
    else visitChapter(chapterId);
  }, [student, router, chapterId, visitChapter]);

  if (!student || !meta) return null;

  function handleSectionRead(sectionId: string) {
    if (!readSections.has(sectionId)) {
      setReadSections((s) => new Set(s).add(sectionId));
      markSectionRead(chapterId, sectionId);
    }
  }

  function handleComplete() {
    completeChapter(chapterId);
    confetti({ particleCount: 100, spread: 70 });
    if (reflection.trim()) {
      addJournalEntry(
        chapterId,
        "What strategy or idea will you remember from this chapter?",
        reflection
      );
    }
  }

  function handleAllExercisesDone() {
    if (chProgress?.status !== "completed") {
      completeChapter(chapterId);
      confetti({ particleCount: 80, spread: 60 });
    }
  }

  const tabs: { id: Tab; label: string; show: boolean }[] = [
    { id: "learn", label: "📖 Learn", show: !!(content?.learn?.length) },
    {
      id: "explore",
      label: "🎮 Explore",
      show: chapterId === "ai-intro" || chapterId === "ct-prime-time",
    },
    { id: "practice", label: "✏️ Practice", show: !!(content?.exercises?.length) },
    { id: "reflect", label: "💭 Reflect", show: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-4 px-4 py-3">
          <Link href="/student" className="text-violet-600">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1 min-w-0">
            <h1 className="truncate font-bold text-slate-800">{meta.title}</h1>
            <p className="text-xs text-slate-500">
              {exerciseProgress.total > 0
                ? `${exerciseProgress.done}/${exerciseProgress.total} exercises · ${meta.sourcePages}`
                : meta.sourcePages}
            </p>
          </div>
          {chProgress?.status === "completed" && (
            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
          )}
        </div>

        {exerciseProgress.total > 0 && (
          <div className="mx-auto max-w-3xl px-4 pb-2">
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${exerciseProgress.pct}%` }}
              />
            </div>
          </div>
        )}

        <div className="mx-auto flex max-w-3xl gap-1 overflow-x-auto px-4 pb-2">
          {tabs
            .filter((t) => t.show)
            .map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTab(t.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === t.id
                    ? "bg-violet-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
        </div>
      </header>

      <main
        className={`mx-auto px-4 py-6 ${
          tab === "learn" && content?.learn ? "max-w-5xl" : "max-w-3xl"
        }`}
      >
        {tab === "learn" && content?.learn && (
          <LearnSectionLayout
            sections={content.learn}
            readIds={
              new Set([
                ...readSections,
                ...(chProgress?.sectionsRead ?? []),
              ])
            }
            readCount={content.learn.filter(
              (s) =>
                readSections.has(s.id) || chProgress?.sectionsRead.includes(s.id)
            ).length}
            showProgress={isAiLearnChapter(chapterId)}
            keyPoints={content.keyPoints}
            showPracticeLink={!!content.exercises?.length}
            onMarkRead={handleSectionRead}
            onGoToPractice={() => setTab("practice")}
            isSectionRead={(id) =>
              readSections.has(id) || chProgress?.sectionsRead.includes(id)
            }
          />
        )}

        {tab === "explore" && chapterId === "ai-intro" && (
          <div className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-800">Automation vs AI Sort</h2>
              <AutomationSortGame onComplete={() => markActivityDone(chapterId)} />
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-800">Machine Learning Type Matcher</h2>
              <MLTypeMatcher onComplete={() => markActivityDone(chapterId)} />
            </section>
          </div>
        )}

        {tab === "explore" && chapterId === "ct-prime-time" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-800">Prime Time — Circle Polygon Activity</h2>
            <CirclePolygonExplorer onComplete={() => markActivityDone(chapterId)} />
          </section>
        )}

        {tab === "practice" && content?.exercises && (
          <QuizBlock
            questions={content.exercises}
            doneIds={chProgress?.exercisesDone ?? []}
            onComplete={(id) => markExerciseDone(chapterId, id)}
            onAllComplete={handleAllExercisesDone}
          />
        )}

        {tab === "reflect" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-800">Thinking Journal (optional)</h2>
            <p className="mt-2 text-sm text-slate-600">
              Write a reflection if you want extra journal XP. Completing all exercises already marks this chapter done.
            </p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="mt-4 w-full rounded-xl border-2 border-slate-200 p-4 text-sm focus:border-violet-400 focus:outline-none"
              rows={5}
              placeholder="What did you learn? What strategy worked best?"
            />
            {reflection.trim() && chProgress?.status !== "completed" && (
              <button
                type="button"
                onClick={handleComplete}
                className="mt-4 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 font-bold text-white"
              >
                Save reflection & complete chapter
              </button>
            )}
            {chProgress?.status === "completed" && (
              <p className="mt-4 text-center font-semibold text-emerald-600">Chapter completed! 🎉</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
