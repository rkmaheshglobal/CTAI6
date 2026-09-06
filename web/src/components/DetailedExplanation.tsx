import type { QuestionGuide } from "@/lib/types";

interface DetailedStep {
  heading: string;
  content: string;
}

export function DetailedExplanationView({ guide }: { guide: QuestionGuide }) {
  if (!guide.detailedSteps?.length) {
    return guide.explanation ? (
      <p className="mt-2 leading-relaxed whitespace-pre-wrap">{guide.explanation}</p>
    ) : null;
  }

  return (
    <div className="mt-2 space-y-4">
      {guide.detailedSteps.map((step, i) => (
        <div key={i}>
          <p className="font-semibold text-slate-900">
            {i + 1}. {step.heading}
          </p>
          <p className="mt-1 leading-relaxed text-slate-700">{step.content}</p>
        </div>
      ))}
      {guide.conclusion && (
        <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 font-medium text-emerald-900">
          {guide.conclusion}
        </p>
      )}
      {guide.example && (
        <p className="text-sm italic text-slate-600">Example: {guide.example}</p>
      )}
    </div>
  );
}

export type { DetailedStep };
