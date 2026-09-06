"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Check, X, Brain, RotateCcw } from "lucide-react";
import type { QuizQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DetailedExplanationView } from "@/components/DetailedExplanation";

const MAX_ATTEMPTS = 3;

interface QuizBlockProps {
  questions: QuizQuestion[];
  doneIds: string[];
  onComplete: (id: string) => void;
  onAllComplete?: () => void;
}

export function QuizBlock({ questions, doneIds, onComplete, onAllComplete }: QuizBlockProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [resolved, setResolved] = useState(false);
  const [showThinking, setShowThinking] = useState(true);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | "exhausted" | "saved" | null>(null);
  const [lastWrongReason, setLastWrongReason] = useState<string | null>(null);
  const [currentNudge, setCurrentNudge] = useState<string | null>(null);

  const q = questions[current];
  if (!q) return null;

  const isDone = doneIds.includes(q.id);
  const allDone = questions.every((question) => doneIds.includes(question.id));
  const hasAnswerKey = q.options?.some((o) => o.correct === true) ?? false;
  const diagramSrc = q.diagramImage;
  const guide = q.guide;
  const attemptsLeft = MAX_ATTEMPTS - attempts;
  const correctOpt = q.options?.find((o) => o.correct);

  function markQuestionComplete() {
    if (!isDone) {
      onComplete(q.id);
      if (doneIds.length + 1 >= questions.length) {
        onAllComplete?.();
      }
    }
  }

  function handleCheck() {
    if (!q.options || !selected) return;

    const selectedOpt = q.options.find((o) => o.id === selected);
    const nextAttempt = attempts + 1;
    setAttempts(nextAttempt);

    if (hasAnswerKey && correctOpt) {
      if (selectedOpt?.correct) {
        setFeedback("correct");
        setResolved(true);
        setLastWrongReason(null);
        setCurrentNudge(null);
        markQuestionComplete();
        return;
      }

      const reason =
        guide?.wrongFeedback?.[selected] ??
        "That choice does not match the logic of this puzzle. Read the question again and try a different strategy.";
      setLastWrongReason(reason);

      if (nextAttempt < MAX_ATTEMPTS) {
        setFeedback("wrong");
        setCurrentNudge(guide?.nudges?.[nextAttempt - 1] ?? "What clue in the question have you not used yet?");
        setSelected(null);
        return;
      }

      setFeedback("exhausted");
      setResolved(true);
      setCurrentNudge(null);
      markQuestionComplete();
      return;
    }

    // No official answer key — encourage thinking across attempts
    const nudge = guide?.nudges?.[nextAttempt - 1];
    setCurrentNudge(nudge ?? null);
    if (nextAttempt < MAX_ATTEMPTS) {
      setFeedback("saved");
      setLastWrongReason(
        "Your reasoning is recorded. There is no app answer key for this handbook puzzle — use the nudge below and try another approach."
      );
      setSelected(null);
      return;
    }

    setFeedback("saved");
    setResolved(true);
    markQuestionComplete();
  }

  function goTo(index: number) {
    setCurrent(index);
    setSelected(null);
    setAttempts(0);
    setResolved(false);
    setFeedback(null);
    setLastWrongReason(null);
    setCurrentNudge(null);
    setShowThinking(true);
  }

  function next() {
    goTo(Math.min(current + 1, questions.length - 1));
  }

  function tryAgain() {
    setSelected(null);
    setFeedback(null);
    setLastWrongReason(null);
    setCurrentNudge(null);
  }

  const showCorrectAnswer = resolved && feedback !== "correct" && hasAnswerKey && correctOpt;
  const canSubmit = !!selected && !resolved && (feedback !== "wrong" || attempts < MAX_ATTEMPTS);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {questions.map((question, i) => {
          const done = doneIds.includes(question.id);
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "h-9 min-w-9 rounded-full px-2 text-sm font-bold transition",
                current === i && "ring-2 ring-violet-400 ring-offset-2",
                done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-600 hover:bg-violet-100"
              )}
            >
              {done ? "✓" : i + 1}
            </button>
          );
        })}
      </div>

      {allDone && (
        <div className="rounded-xl bg-emerald-100 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
          All handbook exercises completed for this chapter!
        </div>
      )}

      <div className="rounded-2xl border-2 border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-violet-600">
            Question {current + 1} of {questions.length}
            {q.handbookPage ? ` · Handbook p. ${q.handbookPage}` : ""}
          </span>
          <div className="flex items-center gap-2">
            {hasAnswerKey && !resolved && (
              <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">
                {attemptsLeft} {attemptsLeft === 1 ? "try" : "tries"} left
              </span>
            )}
            {isDone && (
              <span className="flex items-center gap-1 text-sm text-emerald-600">
                <Check className="h-4 w-4" /> Done
              </span>
            )}
          </div>
        </div>

        {guide?.thinkingSteps && showThinking && !resolved && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <button
              type="button"
              onClick={() => setShowThinking(false)}
              className="flex w-full items-center gap-2 text-left text-sm font-semibold text-amber-900"
            >
              <Brain className="h-4 w-4 shrink-0" /> Think first — steps to guide you
            </button>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-amber-900">
              {guide.thinkingSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        <p className="text-base font-medium leading-relaxed text-slate-800">{q.prompt}</p>

        {diagramSrc && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <p className="bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
              Diagram for this question
              {q.handbookPage ? ` (handbook p. ${q.handbookPage})` : ""}
            </p>
            <Image
              src={diagramSrc}
              alt="Diagram for this question from the handbook"
              width={800}
              height={600}
              className="w-full h-auto"
              unoptimized
            />
          </div>
        )}

        {q.options && (
          <div className="mt-4 space-y-2">
            {q.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                disabled={resolved}
                onClick={() => {
                  if (resolved) return;
                  setSelected(opt.id);
                  if (feedback === "wrong") setFeedback(null);
                }}
                className={cn(
                  "w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all disabled:cursor-default",
                  selected === opt.id
                    ? "border-violet-400 bg-violet-100"
                    : "border-slate-200 bg-white hover:border-violet-200",
                  resolved && opt.correct && "border-emerald-500 bg-emerald-50",
                  feedback === "wrong" && selected === opt.id && "border-red-400 bg-red-50"
                )}
              >
                <span className="font-bold text-violet-500">{opt.id.toUpperCase()})</span> {opt.text}
              </button>
            ))}
          </div>
        )}

        <AnimatePresence>
          {feedback === "correct" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="flex items-start gap-2 rounded-xl bg-emerald-100 px-4 py-3 text-sm text-emerald-800">
                <Check className="mt-0.5 h-4 w-4 shrink-0" /> Correct! Well done.
              </div>
              {guide?.explanation && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-900">
                  <p className="font-semibold">Why this is right</p>
                  <DetailedExplanationView guide={guide} />
                </div>
              )}
            </motion.div>
          )}

          {feedback === "wrong" && lastWrongReason && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="flex items-start gap-2 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-800">
                <X className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Not quite — try again</p>
                  <p className="mt-1">{lastWrongReason}</p>
                  <p className="mt-2 text-red-700">
                    You have {attemptsLeft} more {attemptsLeft === 1 ? "try" : "tries"}. Use the nudge below!
                  </p>
                </div>
              </div>
              {currentNudge && (
                <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="font-semibold">Nudge</p>
                    <p className="mt-1">{currentNudge}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {feedback === "exhausted" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="flex items-start gap-2 rounded-xl bg-orange-100 px-4 py-3 text-sm text-orange-900">
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">Good effort — here is the full explanation</p>
                  <p className="mt-1">You used all {MAX_ATTEMPTS} tries. Study the logic below so you can solve similar puzzles next time.</p>
                </div>
              </div>
              {showCorrectAnswer && correctOpt && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-900">
                  <p className="font-semibold">Correct answer: {correctOpt.id.toUpperCase()}) {correctOpt.text}</p>
                </div>
              )}
              {guide?.explanation && (
                <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm text-slate-800">
                  <p className="font-semibold">Logic & justification</p>
                  <DetailedExplanationView guide={guide} />
                </div>
              )}
            </motion.div>
          )}

          {feedback === "saved" && !resolved && lastWrongReason && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              <div className="rounded-xl bg-blue-100 px-4 py-3 text-sm text-blue-800">
                <p className="font-semibold">Keep thinking!</p>
                <p className="mt-1">{lastWrongReason}</p>
              </div>
              {currentNudge && (
                <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{currentNudge}</p>
                </div>
              )}
            </motion.div>
          )}

          {feedback === "saved" && resolved && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl bg-blue-100 px-4 py-3 text-sm text-blue-800"
            >
              <p className="font-semibold">Answer recorded</p>
              <p className="mt-1">
                {guide?.explanation ?? "Discuss your reasoning with your teacher to verify this handbook puzzle."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap gap-2">
          {!resolved && feedback === "wrong" && (
            <button
              type="button"
              onClick={tryAgain}
              className="flex items-center gap-1 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800"
            >
              <RotateCcw className="h-4 w-4" /> Pick another answer
            </button>
          )}
          {!resolved && (
            <button
              type="button"
              onClick={handleCheck}
              disabled={!canSubmit}
              className="rounded-full bg-violet-600 px-6 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {hasAnswerKey ? "Check answer" : "Submit reasoning"}
            </button>
          )}
          {resolved && current < questions.length - 1 && (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-slate-800 px-6 py-2 text-sm font-bold text-white"
            >
              Next question →
            </button>
          )}
        </div>

        {!hasAnswerKey && !resolved && (
          <p className="mt-3 text-xs text-slate-500">
            This handbook puzzle has no published answer key — use the thinking steps and nudges, then verify with your teacher.
          </p>
        )}
      </div>
    </div>
  );
}
