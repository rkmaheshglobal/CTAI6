"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const AUTOMATION_ITEMS = [
  { id: "microwave", label: "Microwave oven (fixed time)", type: "automation" as const },
  { id: "traffic", label: "Traditional traffic signal (fixed intervals)", type: "automation" as const },
  { id: "washer", label: "Washing machine with preset timer", type: "automation" as const },
  { id: "voice", label: "Voice assistant answering questions", type: "ai" as const },
  { id: "face", label: "Face recognition system", type: "ai" as const },
  { id: "chatbot", label: "Smart chatbot", type: "ai" as const },
];

const ML_SCENARIOS = [
  { id: "spam", text: "Sorting emails into spam and not spam", answer: "supervised" },
  { id: "customers", text: "Grouping customers by shopping habits (no labels)", answer: "unsupervised" },
  { id: "chess", text: "Game AI improving after winning or losing", answer: "reinforcement" },
  { id: "house", text: "Predicting house prices from labelled past data", answer: "supervised" },
];

export function AutomationSortGame({ onComplete }: { onComplete: () => void }) {
  const [placements, setPlacements] = useState<Record<string, "automation" | "ai" | null>>({});
  const [done, setDone] = useState(false);

  const remaining = AUTOMATION_ITEMS.filter((i) => !placements[i.id]);

  function place(itemId: string, bucket: "automation" | "ai") {
    setPlacements((p) => ({ ...p, [itemId]: bucket }));
  }

  function check() {
    const allCorrect = AUTOMATION_ITEMS.every((i) => placements[i.id] === i.type);
    if (allCorrect) {
      setDone(true);
      confetti({ particleCount: 80, spread: 60 });
      onComplete();
    }
  }

  const allPlaced = AUTOMATION_ITEMS.every((i) => placements[i.id]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Drag each example from the handbook into the correct bucket. (From the book&apos;s Automation vs AI table.)
      </p>

      {remaining.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {remaining.map((item) => (
            <div key={item.id} className="rounded-xl border-2 border-dashed border-violet-300 bg-white px-3 py-2 text-sm">
              {item.label}
              <div className="mt-2 flex gap-1">
                <button
                  type="button"
                  onClick={() => place(item.id, "automation")}
                  className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-medium"
                >
                  Automation
                </button>
                <button
                  type="button"
                  onClick={() => place(item.id, "ai")}
                  className="rounded-lg bg-violet-100 px-2 py-1 text-xs font-medium text-violet-700"
                >
                  AI
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {(["automation", "ai"] as const).map((bucket) => (
          <div
            key={bucket}
            className={cn(
              "min-h-[120px] rounded-2xl border-2 p-4",
              bucket === "automation" ? "border-slate-300 bg-slate-50" : "border-violet-300 bg-violet-50"
            )}
          >
            <h4 className="font-bold capitalize">{bucket === "automation" ? "⚙️ Automation" : "🤖 Artificial Intelligence"}</h4>
            <ul className="mt-2 space-y-1 text-sm">
              {AUTOMATION_ITEMS.filter((i) => placements[i.id] === bucket).map((i) => (
                <li key={i.id}>{i.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {allPlaced && !done && (
        <button
          type="button"
          onClick={check}
          className="rounded-full bg-violet-600 px-6 py-2 font-bold text-white"
        >
          Check my sorting
        </button>
      )}
      {done && (
        <motion.p initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center font-bold text-emerald-600">
          Perfect! You nailed Automation vs AI! 🎉
        </motion.p>
      )}
    </div>
  );
}

function cn(...c: (string | boolean | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export function MLTypeMatcher({ onComplete }: { onComplete: () => void }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const types = [
    { id: "supervised", label: "Supervised Learning", color: "bg-blue-100 border-blue-300" },
    { id: "unsupervised", label: "Unsupervised Learning", color: "bg-green-100 border-green-300" },
    { id: "reinforcement", label: "Reinforcement Learning", color: "bg-orange-100 border-orange-300" },
  ];

  function verify() {
    setChecked(true);
    const correct = ML_SCENARIOS.every((s) => answers[s.id] === s.answer);
    if (correct) {
      confetti({ particleCount: 60 });
      onComplete();
    }
  }

  const score = ML_SCENARIOS.filter((s) => answers[s.id] === s.answer).length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Match each real-world scenario from the book to a Machine Learning type.</p>
      {ML_SCENARIOS.map((s) => (
        <div key={s.id} className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-800">{s.text}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setAnswers((a) => ({ ...a, [s.id]: t.id }))}
                className={cn(
                  "rounded-full border-2 px-3 py-1 text-xs font-medium transition-all",
                  t.color,
                  answers[s.id] === t.id && "ring-2 ring-violet-400"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          {checked && answers[s.id] !== s.answer && (
            <p className="mt-2 text-xs text-amber-700">Hint: Think about labelled data, grouping, or rewards.</p>
          )}
        </div>
      ))}
      <button type="button" onClick={verify} className="rounded-full bg-teal-600 px-6 py-2 font-bold text-white">
        Check matches
      </button>
      {checked && score === ML_SCENARIOS.length && (
        <p className="font-bold text-emerald-600">All 4 correct! You understand the three ML types! 🏆</p>
      )}
    </div>
  );
}

export function CirclePolygonExplorer({ onComplete }: { onComplete: () => void }) {
  const [addNum, setAddNum] = useState(2);
  const points = 12;

  const steps: number[] = [];
  let current = addNum;
  const visited = new Set<number>();
  while (!visited.has(current) && steps.length < points) {
    visited.add(current);
    steps.push(current);
    current = ((current - 1 + addNum) % points) + 1;
  }
  const stepCount = steps.length;

  const shapes: Record<number, string> = {
    2: "Hexagon (6 steps)",
    3: "Square (4 steps)",
    4: "Triangle (3 steps)",
    5: "Star (12 steps)",
    6: "Line (2 steps)",
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        From Prime Time Activity: A circle with 12 equally spaced points. Start from a number, keep adding, and connect until you return to the start.
      </p>
      <div className="flex flex-wrap gap-2">
        {[2, 3, 4, 5, 6].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setAddNum(n)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold",
              addNum === n ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700"
            )}
          >
            Add {n}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 200 200" className="mx-auto h-64 w-64">
        <circle cx="100" cy="100" r="80" fill="none" stroke="#e2e8f0" strokeWidth="2" />
        {Array.from({ length: points }).map((_, i) => {
          const angle = (i / points) * 2 * Math.PI - Math.PI / 2;
          const x = 100 + 80 * Math.cos(angle);
          const y = 100 + 80 * Math.sin(angle);
          const num = i + 1;
          const inPath = steps.includes(num);
          const idx = steps.indexOf(num);
          const nextIdx = (idx + 1) % steps.length;
          const nextNum = steps[nextIdx];
          const nextI = nextNum - 1;
          const nextAngle = (nextI / points) * 2 * Math.PI - Math.PI / 2;
          const nx = 100 + 80 * Math.cos(nextAngle);
          const ny = 100 + 80 * Math.sin(nextAngle);
          return (
            <g key={i}>
              {inPath && idx < steps.length && (
                <line x1={x} y1={y} x2={nx} y2={ny} stroke="#7c3aed" strokeWidth="2" />
              )}
              <circle cx={x} cy={y} r={inPath ? 8 : 5} fill={inPath ? "#7c3aed" : "#94a3b8"} />
              <text x={x} y={y - 14} textAnchor="middle" fontSize="10" fill="#334155">{num}</text>
            </g>
          );
        })}
      </svg>

      <div className="rounded-xl bg-violet-50 p-4 text-center">
        <p className="text-lg font-bold text-violet-800">
          Steps to return: {stepCount} — Shape: {shapes[addNum] ?? "Explore!"}
        </p>
        <p className="mt-1 text-xs text-slate-500">Book table: adding 2→hexagon, 3→square, 4→triangle, 5→star on 12 points</p>
      </div>

      <button
        type="button"
        onClick={onComplete}
        className="w-full rounded-full bg-emerald-600 py-3 font-bold text-white"
      >
        I explored the circle activity! ✓
      </button>
    </div>
  );
}
