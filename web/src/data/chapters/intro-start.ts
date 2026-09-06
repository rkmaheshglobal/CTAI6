import type { ChapterContent } from "@/lib/types";
import { INTRO_CHAPTERS } from "../curriculum";

export const introStart: ChapterContent = {
  meta: INTRO_CHAPTERS[0],
  learn: [
    {
      id: "what-is-ct",
      title: "What is Computational Thinking?",
      content: [
        "Computational Thinking (CT) is a problem-solving approach made of six powerful ideas:",
      ],
      bullets: [
        "Decomposition — break big problems into smaller parts",
        "Pattern Recognition — spot repeating rules and trends",
        "Abstraction — focus on what matters, ignore extra details",
        "Algorithm Design — create step-by-step plans",
        "Data Analysis — use information to decide",
        "Troubleshooting — fix mistakes and improve your plan",
      ],
    },
    {
      id: "what-is-ai",
      title: "What is Artificial Intelligence?",
      content: [
        "Artificial Intelligence (AI) helps machines do tasks that usually need human thinking — like recognising patterns, predicting trends, and making decisions using data.",
        "This CBSE handbook builds CT skills first, then introduces AI so you become an AI-ready learner.",
      ],
    },
    {
      id: "your-journey",
      title: "Your Class 6 Journey (100 hours)",
      content: ["The curriculum gives you about 100 hours of learning each year:"],
      bullets: [
        "40 hours — Advanced Computational Thinking (Part 1 of this book)",
        "20 hours — Introductory AI Concepts (Part 2)",
        "40 hours — Two interdisciplinary projects",
      ],
    },
    {
      id: "how-to-learn",
      title: "How to Use This App (from the book)",
      content: [
        "The process of thinking is more important than getting the right answer on the first try.",
        "Try puzzles on your own first, then discuss different approaches.",
        "Some chapters have activities — do those before the harder questions.",
        "Write reflections in your Thinking Journal to show how your brain is growing!",
      ],
    },
  ],
  keyPoints: [
    "CT skills help you solve problems in math, science, and daily life.",
    "AI learns from data and is used in phones, healthcare, transport, and more.",
    "Mistakes are part of learning — explore multiple strategies.",
    "Part 1 follows your Class 6 Math textbook chapter order.",
  ],
  exercises: [
    {
      id: "intro-q1",
      type: "think",
      prompt: "Name two CT skills you already use in daily life (e.g. planning your homework).",
      discussionPrompt: "How is decomposition different from pattern recognition?",
    },
    {
      id: "intro-q2",
      type: "think",
      prompt: "Give one example of AI you use without realising it (from the handbook).",
    },
    {
      id: "intro-q3",
      type: "think",
      prompt: "Why does the handbook say the process of thinking matters more than the correct answer?",
    },
  ],
};
