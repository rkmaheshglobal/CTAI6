import type { ChapterMeta } from "@/lib/types";
import { CT_SKILLS } from "@/data/curriculum";
import { cn } from "@/lib/utils";
import { CheckCircle2, PlayCircle, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getChapterExerciseProgress } from "@/lib/progress";
import type { ChapterProgress } from "@/lib/types";

interface ChapterCardProps {
  chapter: ChapterMeta;
  status: "locked" | "available" | "in-progress" | "completed";
  chapterProgress?: ChapterProgress;
  href: string;
  index?: number;
}

export function ChapterCard({ chapter, status, chapterProgress, href, index = 0 }: ChapterCardProps) {
  const done = status === "completed";
  const active = status === "in-progress";
  const { done: exDone, total: exTotal, pct: exPct } = getChapterExerciseProgress(
    chapter.id,
    chapterProgress
  );

  const partColors = {
    intro: "from-indigo-500 via-purple-500 to-pink-500",
    ct: "from-cyan-500 via-blue-500 to-indigo-600",
    ai: "from-emerald-500 via-teal-500 to-cyan-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={href}
        className={cn(
          "group block rounded-2xl border-2 bg-white p-5 shadow-sm transition-all",
          "border-slate-100 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-bold text-white shadow-md",
              partColors[chapter.part]
            )}
          >
            {chapter.part === "ai" ? "🤖" : chapter.part === "intro" ? "🚀" : chapter.number}
          </div>
          <div className="flex shrink-0 items-center gap-1 text-slate-400">
            {done && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
            {active && !done && <PlayCircle className="h-5 w-5 text-violet-500" />}
            {!done && !active && <Sparkles className="h-5 w-5 text-amber-400" />}
          </div>
        </div>

        <h3 className="mt-3 font-bold text-slate-800 group-hover:text-violet-700">
          {chapter.title}
        </h3>
        {chapter.subtitle && (
          <p className="mt-1 text-xs font-medium text-violet-600">{chapter.subtitle}</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{chapter.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {chapter.ctSkills?.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
            >
              {CT_SKILLS[skill].emoji} {CT_SKILLS[skill].label}
            </span>
          ))}
          {chapter.hasActivity && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              🎮 Activity
            </span>
          )}
          {(exTotal > 0 ? exTotal : chapter.questionCount) ? (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              {exTotal > 0 ? exTotal : chapter.questionCount} puzzles
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-xs text-slate-400">Source: {chapter.sourcePages}</p>
        {exTotal > 0 && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Exercises</span>
              <span>{exDone}/{exTotal}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={cn("h-full rounded-full transition-all", done ? "bg-emerald-500" : "bg-violet-500")}
                style={{ width: `${exPct}%` }}
              />
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
