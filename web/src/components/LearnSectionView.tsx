"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  Sparkles,
  Target,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  List,
  ArrowUp,
  PenLine,
} from "lucide-react";
import type { LearnAccent, LearnSection, LearnVisual } from "@/lib/types";

export function learnSectionDomId(sectionId: string) {
  return `learn-section-${sectionId}`;
}

function shortNavLabel(section: LearnSection, index: number) {
  const title = section.title
    .replace(/^Introduction — /, "")
    .replace(/^Type \d — /, "")
    .replace(/^Importance of data — /, "");
  if (title.length <= 28) return title;
  return `${index + 1}. ${title.slice(0, 26)}…`;
}

const ACCENT_STYLES: Record<
  LearnAccent,
  { header: string; badge: string; bullet: string; border: string; tip: string }
> = {
  violet: {
    header: "from-violet-500 to-purple-600",
    badge: "bg-violet-100 text-violet-800",
    bullet: "bg-violet-500",
    border: "border-violet-200",
    tip: "bg-violet-50 border-violet-200 text-violet-900",
  },
  blue: {
    header: "from-blue-500 to-cyan-600",
    badge: "bg-blue-100 text-blue-800",
    bullet: "bg-blue-500",
    border: "border-blue-200",
    tip: "bg-blue-50 border-blue-200 text-blue-900",
  },
  emerald: {
    header: "from-emerald-500 to-teal-600",
    badge: "bg-emerald-100 text-emerald-800",
    bullet: "bg-emerald-500",
    border: "border-emerald-200",
    tip: "bg-emerald-50 border-emerald-200 text-emerald-900",
  },
  amber: {
    header: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-900",
    bullet: "bg-amber-500",
    border: "border-amber-200",
    tip: "bg-amber-50 border-amber-200 text-amber-900",
  },
  rose: {
    header: "from-rose-500 to-pink-600",
    badge: "bg-rose-100 text-rose-800",
    bullet: "bg-rose-500",
    border: "border-rose-200",
    tip: "bg-rose-50 border-rose-200 text-rose-900",
  },
  cyan: {
    header: "from-cyan-500 to-sky-600",
    badge: "bg-cyan-100 text-cyan-800",
    bullet: "bg-cyan-500",
    border: "border-cyan-200",
    tip: "bg-cyan-50 border-cyan-200 text-cyan-900",
  },
  indigo: {
    header: "from-indigo-500 to-violet-600",
    badge: "bg-indigo-100 text-indigo-800",
    bullet: "bg-indigo-500",
    border: "border-indigo-200",
    tip: "bg-indigo-50 border-indigo-200 text-indigo-900",
  },
};

function LearnVisualBlock({ visual }: { visual: LearnVisual }) {
  if (visual.type === "cards") {
    return (
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visual.items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border-2 border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden>{item.emoji}</span>
              <div>
                <p className="font-bold text-slate-800">{item.title}</p>
                {item.subtitle && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
                    {item.subtitle}
                  </p>
                )}
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visual.type === "compare") {
    return (
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[visual.left, visual.right].map((side) => (
          <div
            key={side.label}
            className="rounded-2xl border-2 border-white/80 bg-white/90 p-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden>{side.emoji}</span>
              <h4 className="font-bold text-slate-800">{side.label}</h4>
            </div>
            <ul className="mt-3 space-y-2">
              {side.points.map((p) => (
                <li key={p} className="flex gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  if (visual.type === "timeline") {
    return (
      <div className="mt-4 space-y-3">
        {visual.events.map((event, i) => (
          <div key={event.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                {event.emoji}
              </div>
              {i < visual.events.length - 1 && (
                <div className="my-1 w-0.5 flex-1 bg-white/50" />
              )}
            </div>
            <div className="flex-1 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-violet-600">
                {event.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{event.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visual.type === "grid") {
    return (
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {visual.items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center rounded-2xl border border-white/80 bg-white/90 px-2 py-3 text-center shadow-sm"
          >
            <span className="text-2xl" aria-hidden>{item.emoji}</span>
            <p className="mt-1 text-xs font-semibold leading-tight text-slate-700">{item.label}</p>
          </div>
        ))}
      </div>
    );
  }

  if (visual.type === "steps") {
    return (
      <div className="mt-4 space-y-2">
        {visual.items.map((step, i) => (
          <div
            key={step.title}
            className="flex gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                <span aria-hidden>{step.emoji}</span> {step.title}
              </p>
              <p className="mt-0.5 text-sm text-slate-600">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (visual.type === "table") {
    return (
      <div className="mt-4 overflow-x-auto rounded-2xl border border-white/80 bg-white/95 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-violet-100/80">
              {visual.headers.map((h) => (
                <th key={h} className="px-3 py-2 text-left font-bold text-violet-900">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visual.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-3 py-2 text-slate-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (visual.type === "diagram") {
    return (
      <div className="mt-4 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {visual.nodes.map((node, i) => (
            <div key={node.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center rounded-xl bg-violet-50 px-3 py-2">
                <span className="text-2xl" aria-hidden>{node.emoji}</span>
                <span className="mt-1 text-xs font-semibold text-slate-700">{node.label}</span>
              </div>
              {visual.flow && i < visual.flow.length && (
                <ChevronRight className="h-5 w-5 text-violet-400" />
              )}
            </div>
          ))}
        </div>
        {visual.flow && (
          <p className="mt-3 text-center text-xs font-medium text-slate-500">
            {visual.flow.join(" → ")}
          </p>
        )}
      </div>
    );
  }

  return null;
}

export function LearnProgressBar({
  total,
  readCount,
}: {
  total: number;
  readCount: number;
}) {
  const pct = total > 0 ? Math.round((readCount / total) * 100) : 0;
  return (
    <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-violet-600" />
          <span className="font-bold text-violet-900">Your learning journey</span>
        </div>
        <span className="text-sm font-semibold text-violet-700">
          {readCount}/{total} sections
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/80">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {pct === 100 ? (
        <p className="mt-2 text-sm font-medium text-emerald-700">
          🎉 Awesome! You read everything — try the Practice tab now!
        </p>
      ) : (
        <p className="mt-2 text-sm text-violet-700">
          Read each colourful card, then tap the button to mark it done (+10 XP each).
        </p>
      )}
    </div>
  );
}

export function LearnSectionCard({
  section,
  index,
  total,
  isRead,
  onMarkRead,
  onGoToPractice,
  showPracticeLink,
  onNavigatePrev,
  onNavigateNext,
  prevLabel,
  nextLabel,
}: {
  section: LearnSection;
  index: number;
  total: number;
  isRead: boolean;
  onMarkRead: () => void;
  onGoToPractice?: () => void;
  showPracticeLink?: boolean;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
}) {
  const accent = section.accent ?? "violet";
  const styles = ACCENT_STYLES[accent];
  const emoji = section.emoji ?? "📚";

  return (
    <motion.article
      id={learnSectionDomId(section.id)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`scroll-mt-36 overflow-hidden rounded-3xl border-2 ${styles.border} bg-white shadow-md lg:scroll-mt-24`}
    >
      <div className={`bg-gradient-to-r ${styles.header} px-5 py-4 text-white`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-2xl backdrop-blur">
              {emoji}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                Section {index + 1} of {total}
              </p>
              <h2 className="text-lg font-bold leading-tight">{section.title}</h2>
            </div>
          </div>
          {isRead && (
            <CheckCircle2 className="h-7 w-7 shrink-0 text-emerald-300" aria-label="Read" />
          )}
        </div>
      </div>

      <div className="p-5">
        {section.visual && (
          <div className={`rounded-2xl bg-gradient-to-br ${styles.header} p-1`}>
            <div className="rounded-xl bg-gradient-to-br from-white/10 to-transparent p-3">
              <LearnVisualBlock visual={section.visual} />
            </div>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {section.content.map((p) => (
            <p key={p.slice(0, 48)} className="text-[15px] leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </div>

        {section.bullets && (
          <ul className="mt-4 space-y-2.5">
            {section.bullets.map((b) => {
              const [head, ...rest] = b.includes(" — ") ? b.split(" — ") : [null, b];
              return (
                <li
                  key={b.slice(0, 48)}
                  className={`flex gap-3 rounded-xl ${styles.badge} px-3 py-2.5`}
                >
                  <span
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${styles.bullet}`}
                  />
                  <span className="text-sm leading-relaxed">
                    {head ? (
                      <>
                        <strong className="text-slate-800">{head}</strong>
                        {" — "}
                        {rest.join(" — ")}
                      </>
                    ) : (
                      b
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {section.funFact && (
          <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <Sparkles className="h-5 w-5 shrink-0 text-amber-500" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-amber-700">
                Did you know?
              </p>
              <p className="mt-1 text-sm leading-relaxed text-amber-900">{section.funFact}</p>
            </div>
          </div>
        )}

        {section.practiceTip && (
          <div className={`mt-4 flex gap-3 rounded-2xl border p-4 ${styles.tip}`}>
            <Target className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wide opacity-80">
                For practice questions
              </p>
              <p className="mt-1 text-sm leading-relaxed">{section.practiceTip}</p>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {!isRead && (
            <button
              type="button"
              onClick={onMarkRead}
              className={`rounded-full bg-gradient-to-r ${styles.header} px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90`}
            >
              I understood this! ✓
            </button>
          )}
          {isRead && (
            <p className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> Got it! +10 XP
            </p>
          )}
          {showPracticeLink && index === total - 1 && onGoToPractice && (
            <button
              type="button"
              onClick={onGoToPractice}
              className="rounded-full border-2 border-violet-300 bg-violet-50 px-5 py-2.5 text-sm font-bold text-violet-700"
            >
              Ready? Go to Practice →
            </button>
          )}
        </div>

        {(onNavigatePrev || onNavigateNext) && (
          <div className="mt-5 flex items-stretch justify-between gap-2 border-t border-slate-100 pt-4">
            {onNavigatePrev && prevLabel ? (
              <button
                type="button"
                onClick={onNavigatePrev}
                className="flex flex-1 items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <span className="truncate">{prevLabel}</span>
              </button>
            ) : (
              <div className="flex-1" />
            )}
            {onNavigateNext && nextLabel ? (
              <button
                type="button"
                onClick={onNavigateNext}
                className="flex flex-1 items-center justify-end gap-1 rounded-xl border border-violet-200 bg-violet-50 px-3 py-2.5 text-right text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                <span className="truncate">{nextLabel}</span>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            ) : null}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function LearnSectionNavLinks({
  sections,
  readIds,
  activeId,
  onJump,
  variant,
}: {
  sections: LearnSection[];
  readIds: Set<string>;
  activeId: string;
  onJump: (sectionId: string) => void;
  variant: "sidebar" | "mobile";
}) {
  const isSidebar = variant === "sidebar";

  return (
    <nav
      aria-label="Learn section navigation"
      className={
        isSidebar
          ? "space-y-1"
          : "flex gap-2 overflow-x-auto pb-1 scrollbar-thin"
      }
    >
      {sections.map((section, i) => {
        const isActive = activeId === section.id;
        const isRead = readIds.has(section.id);
        const label = shortNavLabel(section, i);

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onJump(section.id)}
            title={section.title}
            className={
              isSidebar
                ? `flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm transition ${
                    isActive
                      ? "bg-violet-600 font-semibold text-white shadow-sm"
                      : "text-slate-600 hover:bg-violet-50 hover:text-violet-800"
                  }`
                : `flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-300"
                  }`
            }
          >
            <span aria-hidden>{section.emoji ?? `${i + 1}`}</span>
            <span className={isSidebar ? "line-clamp-2 flex-1 leading-snug" : "max-w-[8rem] truncate"}>
              {isSidebar ? label : `${i + 1}. ${label.split(". ").pop() ?? label}`}
            </span>
            {isRead && (
              <CheckCircle2
                className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-emerald-300" : "text-emerald-500"}`}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

export function LearnSectionNav({
  sections,
  readIds,
  activeId,
  onJump,
  onGoToTop,
  onGoToSummary,
  onGoToPractice,
  hasPractice,
  variant,
}: {
  sections: LearnSection[];
  readIds: Set<string>;
  activeId: string;
  onJump: (sectionId: string) => void;
  onGoToTop: () => void;
  onGoToSummary?: () => void;
  onGoToPractice?: () => void;
  hasPractice?: boolean;
  variant: "sidebar" | "mobile" | "sticky-mobile";
}) {
  if (variant === "sticky-mobile") {
    return (
      <div className="sticky top-[7.5rem] z-[5] -mx-4 border-b border-violet-100 bg-white/95 px-4 py-2 backdrop-blur lg:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-violet-700">
            <List className="h-3.5 w-3.5" /> Jump to section
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={onGoToTop}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
            {hasPractice && onGoToPractice && (
              <button
                type="button"
                onClick={onGoToPractice}
                className="rounded-lg p-1.5 text-violet-600 hover:bg-violet-50"
                title="Go to Practice"
              >
                <PenLine className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <LearnSectionNavLinks
          sections={sections}
          readIds={readIds}
          activeId={activeId}
          onJump={onJump}
          variant="mobile"
        />
      </div>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-3 lg:hidden">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-violet-700">
          <List className="h-3.5 w-3.5" /> Jump to a section
        </p>
        <LearnSectionNavLinks
          sections={sections}
          readIds={readIds}
          activeId={activeId}
          onJump={onJump}
          variant="mobile"
        />
      </div>
    );
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-violet-200 bg-white p-4 shadow-sm">
        <p className="mb-3 flex items-center gap-2 text-sm font-bold text-violet-900">
          <List className="h-4 w-4" /> Contents
        </p>
        <LearnSectionNavLinks
          sections={sections}
          readIds={readIds}
          activeId={activeId}
          onJump={onJump}
          variant="sidebar"
        />
        <div className="mt-4 space-y-1 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onGoToTop}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
          >
            <ArrowUp className="h-4 w-4" /> Back to top
          </button>
          {onGoToSummary && (
            <button
              type="button"
              onClick={onGoToSummary}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              <Lightbulb className="h-4 w-4" /> Summary
            </button>
          )}
          {hasPractice && onGoToPractice && (
            <button
              type="button"
              onClick={onGoToPractice}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-violet-700 hover:bg-violet-50"
            >
              <PenLine className="h-4 w-4" /> Practice →
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

export function LearnSectionLayout({
  sections,
  readIds,
  keyPoints,
  showProgress,
  readCount,
  showPracticeLink,
  onMarkRead,
  onGoToPractice,
  isSectionRead,
}: {
  sections: LearnSection[];
  readIds: Set<string>;
  keyPoints?: string[];
  showProgress?: boolean;
  readCount: number;
  showPracticeLink?: boolean;
  onMarkRead: (sectionId: string) => void;
  onGoToPractice?: () => void;
  isSectionRead: (sectionId: string) => boolean;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const topRef = useRef<HTMLDivElement>(null);

  const jumpTo = useCallback((sectionId: string) => {
    const el = document.getElementById(learnSectionDomId(sectionId));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(sectionId);
    }
  }, []);

  const jumpToTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const jumpToSummary = useCallback(() => {
    document.getElementById("learn-key-points")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const ids = sections.map((s) => s.id);
    const elements = ids
      .map((id) => document.getElementById(learnSectionDomId(id)))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          const matched = ids.find(
            (id) => learnSectionDomId(id) === visible[0].target.id
          );
          if (matched) setActiveId(matched);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <div ref={topRef} className="space-y-6">
      {showProgress && (
        <LearnProgressBar total={sections.length} readCount={readCount} />
      )}

      <LearnSectionNav
        sections={sections}
        readIds={readIds}
        activeId={activeId}
        onJump={jumpTo}
        onGoToTop={jumpToTop}
        onGoToSummary={keyPoints ? jumpToSummary : undefined}
        onGoToPractice={onGoToPractice}
        hasPractice={showPracticeLink}
        variant="mobile"
      />

      <div className="lg:grid lg:grid-cols-[minmax(200px,240px)_1fr] lg:items-start lg:gap-8">
        <LearnSectionNav
          sections={sections}
          readIds={readIds}
          activeId={activeId}
          onJump={jumpTo}
          onGoToTop={jumpToTop}
          onGoToSummary={keyPoints ? jumpToSummary : undefined}
          onGoToPractice={onGoToPractice}
          hasPractice={showPracticeLink}
          variant="sidebar"
        />

        <div className="min-w-0 space-y-6">
          <LearnSectionNav
            sections={sections}
            readIds={readIds}
            activeId={activeId}
            onJump={jumpTo}
            onGoToTop={jumpToTop}
            onGoToPractice={onGoToPractice}
            hasPractice={showPracticeLink}
            variant="sticky-mobile"
          />

          {sections.map((section, i) => {
            const isRead = isSectionRead(section.id);
            const prev = i > 0 ? sections[i - 1] : null;
            const next = i < sections.length - 1 ? sections[i + 1] : null;

            return (
              <LearnSectionCard
                key={section.id}
                section={section}
                index={i}
                total={sections.length}
                isRead={isRead}
                onMarkRead={() => onMarkRead(section.id)}
                showPracticeLink={showPracticeLink}
                onGoToPractice={onGoToPractice}
                onNavigatePrev={prev ? () => jumpTo(prev.id) : undefined}
                onNavigateNext={next ? () => jumpTo(next.id) : undefined}
                prevLabel={prev ? `← ${shortNavLabel(prev, i - 1)}` : undefined}
                nextLabel={next ? `${shortNavLabel(next, i + 1)} →` : undefined}
              />
            );
          })}

          {keyPoints && (
            <div id="learn-key-points" className="scroll-mt-36 lg:scroll-mt-24">
              <LearnKeyPoints points={keyPoints} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function LearnKeyPoints({ points }: { points: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 via-indigo-50 to-purple-50 p-6 shadow-md"
    >
      <h3 className="flex items-center gap-2 text-lg font-bold text-violet-900">
        <Lightbulb className="h-6 w-6 text-amber-500" />
        Super summary — Points to remember
      </h3>
      <p className="mt-1 text-sm text-violet-700">
        Pin these in your mind before you start practice!
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {points.map((p) => (
          <li
            key={p}
            className="flex gap-2 rounded-xl bg-white/80 px-3 py-2.5 text-sm font-medium text-violet-900 shadow-sm"
          >
            <span className="text-lg">⭐</span>
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
