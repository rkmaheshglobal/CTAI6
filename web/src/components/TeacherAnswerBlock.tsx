"use client";

import Image from "next/image";
import { CheckCircle2, Lightbulb, BookOpen, AlertCircle } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailedExplanationView } from "@/components/DetailedExplanation";

interface TeacherAnswerBlockProps {
  questions: QuizQuestion[];
}

export function TeacherAnswerBlock({ questions }: TeacherAnswerBlockProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-teal-50 border border-teal-200 px-4 py-3 text-sm text-teal-900">
        <p className="font-semibold">Teacher answer key</p>
        <p className="mt-1">
          Correct answers, logic, and facilitation notes. Use nudges in class rather than giving solutions directly — students get up to 3 tries with guided feedback in Practice mode.
        </p>
      </div>

      {questions.map((q, index) => {
        const correctOpt = q.options?.find((o) => o.correct);
        const guide = q.guide;
        const hasKey = !!correctOpt;

        return (
          <article
            key={q.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="text-sm font-semibold text-teal-700">
                Question {index + 1}
                {q.handbookPage ? ` · Handbook p. ${q.handbookPage}` : ""}
              </span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  hasKey ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                )}
              >
                {hasKey ? "Official answer" : "Discuss in class"}
              </span>
            </div>

            <p className="mt-3 text-base font-medium leading-relaxed text-slate-800">{q.prompt}</p>

            {q.diagramImage && (
              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                <p className="bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                  Diagram
                </p>
                <Image
                  src={q.diagramImage}
                  alt="Question diagram"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            )}

            {q.options && (
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={cn(
                      "rounded-xl border-2 px-4 py-3 text-sm",
                      opt.correct
                        ? "border-emerald-500 bg-emerald-50 font-medium text-emerald-900"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    )}
                  >
                    <span className="font-bold">{opt.id.toUpperCase()})</span> {opt.text}
                    {opt.correct && (
                      <CheckCircle2 className="ml-1 inline h-4 w-4 text-emerald-600" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {hasKey && correctOpt && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                <p className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                  <CheckCircle2 className="h-4 w-4" />
                  Correct answer: {correctOpt.id.toUpperCase()}) {correctOpt.text}
                </p>
              </div>
            )}

            {!hasKey && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  No official answer key in the handbook for this puzzle. Facilitate group discussion and ask students to justify their reasoning.
                </p>
              </div>
            )}

            {guide?.explanation && (
              <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800">
                <p className="flex items-center gap-2 font-bold text-slate-900">
                  <BookOpen className="h-4 w-4" /> Detailed solution
                </p>
                <DetailedExplanationView guide={guide} />
              </div>
            )}

            {guide?.thinkingSteps && guide.thinkingSteps.length > 0 && (
              <div className="mt-4 rounded-xl bg-violet-50 border border-violet-100 px-4 py-3 text-sm text-violet-900">
                <p className="font-bold">Thinking steps (share with students)</p>
                <ol className="mt-2 list-decimal space-y-1 pl-5">
                  {guide.thinkingSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {guide?.nudges && guide.nudges.length > 0 && (
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
                <p className="flex items-center gap-2 font-bold">
                  <Lightbulb className="h-4 w-4" /> Facilitation nudges (after wrong attempts)
                </p>
                <ul className="mt-2 space-y-1">
                  {guide.nudges.map((nudge, i) => (
                    <li key={nudge}>
                      <span className="font-semibold">Try {i + 1}:</span> {nudge}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {guide?.wrongFeedback && Object.keys(guide.wrongFeedback).length > 0 && (
              <details className="mt-4 rounded-xl border border-slate-200 bg-white">
                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700">
                  Why each wrong option fails
                </summary>
                <ul className="space-y-2 border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
                  {Object.entries(guide.wrongFeedback).map(([optId, reason]) => {
                    const optText = q.options?.find((o) => o.id === optId)?.text;
                    return (
                      <li key={optId}>
                        <span className="font-semibold text-red-700">{optId.toUpperCase()}) {optText}:</span>{" "}
                        {reason}
                      </li>
                    );
                  })}
                </ul>
              </details>
            )}

            {guide?.teacherNote && (
              <p className="mt-4 text-xs italic text-slate-500">{guide.teacherNote}</p>
            )}
          </article>
        );
      })}
    </div>
  );
}
