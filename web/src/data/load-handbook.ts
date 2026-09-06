import type { ChapterContent, QuizQuestion, QuestionGuide } from "@/lib/types";
import { ALL_CHAPTERS, CT_SKILLS } from "@/data/curriculum";
import extracted from "./handbook-extracted.json";
import diagramManifest from "./diagram-manifest.json";
import questionGuides from "./question-guides.json";

type RawExercise = {
  id: string;
  num: number;
  prompt: string;
  options: { id: string; text: string }[];
  correct?: string;
  handbookPage?: number;
  requiresDiagram?: boolean;
  imageOnlyOptions?: boolean;
};

const DIAGRAMS = diagramManifest as Record<string, string>;
const GUIDES = questionGuides as Record<string, QuestionGuide>;

function toQuizQuestion(raw: RawExercise): QuizQuestion {
  const hasAnswer = !!raw.correct;
  const diagramImage = DIAGRAMS[raw.id];
  const requiresDiagram = raw.requiresDiagram || !!diagramImage;
  const guide = GUIDES[raw.id];
  return {
    id: raw.id,
    type: "mcq",
    prompt: `${raw.num}. ${raw.prompt}`,
    options: raw.options.map((o) => ({
      id: o.id,
      text: o.text,
      correct: hasAnswer ? o.id === raw.correct : undefined,
    })),
    handbookPage: raw.handbookPage,
    requiresDiagram,
    diagramImage,
    imageOnlyOptions: raw.imageOnlyOptions,
    guide,
    hint: guide?.thinkingSteps?.[0] ?? (requiresDiagram
      ? "Study the diagram carefully before choosing."
      : undefined),
  };
}

function buildLearn(meta: ChapterContent["meta"]) {
  const skill = meta.ctSkills?.[0];
  const skillLabel = skill ? CT_SKILLS[skill].label : null;
  const isAi = meta.part === "ai";
  return [
    {
      id: "overview",
      title: meta.title,
      content: [
        meta.description,
        skillLabel
          ? `CT focus for this chapter: ${skillLabel}. Questions below are taken word-for-word from the CBSE handbook (pp. ${meta.sourcePages.replace("pp. ", "")}).`
          : isAi
            ? `All handbook exercises for this AI chapter are included — MCQs, fill-in-the-blanks, short-answer, think-and-apply, and classify questions (${meta.sourcePages}).`
            : `Questions below are taken word-for-word from the CBSE handbook (${meta.sourcePages}).`,
      ],
      bullets: isAi
        ? [
            "Work through MCQs, fill-in-the-blank, and application questions from the book",
            "Use the step-by-step solutions after each attempt to understand the reasoning",
            "Discuss ethics and real-life scenarios with your teacher where relevant",
          ]
        : [
            "Read each question exactly as printed in your handbook",
            "Use the diagram from the book when a question shows one",
            "Select your answer and submit to check (where answer key is available)",
          ],
    },
  ];
}

const registry: Record<string, ChapterContent> = {};

for (const meta of ALL_CHAPTERS) {
  const rawList = (extracted as Record<string, RawExercise[]>)[meta.id];
  if (!rawList?.length) continue;

  registry[meta.id] = {
    meta,
    learn: buildLearn(meta),
    keyPoints: [
      `${rawList.length} practice questions from the handbook`,
      "Diagrams shown from the official PDF when needed",
      meta.sourcePages,
    ],
    exercises: rawList.map(toQuizQuestion),
  };
}

export function getChapterContentById(id: string): ChapterContent | null {
  return registry[id] ?? null;
}

export function getExerciseCount(chapterId: string): number {
  return registry[chapterId]?.exercises?.length ?? 0;
}

export function hasFullContent(id: string): boolean {
  return id in registry;
}

export function getQuestionDiagram(questionId: string) {
  return DIAGRAMS[questionId];
}

export { registry as ALL_CHAPTER_CONTENT };
