import type { ChapterMeta, CTSkill } from "@/lib/types";

export const CT_SKILLS: Record<CTSkill, { label: string; emoji: string; color: string }> = {
  "pattern-recognition": { label: "Pattern Recognition", emoji: "🔍", color: "from-violet-500 to-purple-600" },
  decomposition: { label: "Decomposition", emoji: "🧩", color: "from-blue-500 to-cyan-600" },
  abstraction: { label: "Abstraction", emoji: "🎯", color: "from-amber-500 to-orange-600" },
  "algorithmic-thinking": { label: "Algorithmic Thinking", emoji: "⚙️", color: "from-emerald-500 to-teal-600" },
  "data-analysis": { label: "Data Analysis", emoji: "📊", color: "from-rose-500 to-pink-600" },
};

export const INTRO_CHAPTERS: ChapterMeta[] = [
  {
    id: "intro-start",
    part: "intro",
    number: 0,
    title: "Start Here",
    subtitle: "Introduction & How to Use",
    description:
      "Learn what Computational Thinking and AI mean, why they matter for Class 6, and how to use this companion book.",
    sourcePages: "pp. 5–9",
  },
];

export const CT_CHAPTERS: ChapterMeta[] = [
  {
    id: "ct-patterns",
    part: "ct",
    number: 1,
    title: "Patterns in Mathematics",
    ctSkills: ["pattern-recognition"],
    description: "Spot, extend, and justify number and shape patterns with mixed rules.",
    sourcePages: "pp. 11–13",
    questionCount: 11,
  },
  {
    id: "ct-lines-angles",
    part: "ct",
    number: 2,
    title: "Lines and Angles",
    ctSkills: ["abstraction"],
    description: "Solve spatial puzzles with angles, seating arrangements, and geometric reasoning.",
    sourcePages: "pp. 14–16",
    questionCount: 9,
  },
  {
    id: "ct-number-play",
    part: "ct",
    number: 3,
    title: "Number Play",
    ctSkills: ["decomposition", "algorithmic-thinking"],
    description: "Work through dice games, grids, and number logic with constraints.",
    sourcePages: "pp. 17–19",
    questionCount: 8,
  },
  {
    id: "ct-data-handling",
    part: "ct",
    number: 4,
    title: "Data Handling and Presentation",
    ctSkills: ["data-analysis"],
    description: "Read pictographs, bar graphs, and tables to answer real data questions.",
    sourcePages: "pp. 20–24",
    questionCount: 10,
  },
  {
    id: "ct-prime-time",
    part: "ct",
    number: 5,
    title: "Prime Time",
    ctSkills: ["algorithmic-thinking"],
    description: "Explore factors and multiples with the circle polygon activity, then tackle prime puzzles.",
    sourcePages: "pp. 25–29",
    hasActivity: true,
    questionCount: 10,
  },
  {
    id: "ct-perimeter-area",
    part: "ct",
    number: 6,
    title: "Perimeter and Area",
    ctSkills: ["decomposition", "abstraction"],
    description: "Break apart shapes, compare areas, and reason about grids and diagonals.",
    sourcePages: "pp. 30–33",
    questionCount: 10,
  },
  {
    id: "ct-fractions",
    part: "ct",
    number: 7,
    title: "Fractions",
    ctSkills: ["decomposition"],
    description: "Apply fraction reasoning to multi-step word and visual problems.",
    sourcePages: "pp. 34–35",
    questionCount: 10,
  },
  {
    id: "ct-constructions",
    part: "ct",
    number: 8,
    title: "Playing with Constructions",
    ctSkills: ["abstraction"],
    description: "Build and rearrange shapes, matchsticks, and grids to form new figures.",
    sourcePages: "pp. 36–39",
    questionCount: 10,
  },
  {
    id: "ct-symmetry",
    part: "ct",
    number: 9,
    title: "Symmetry",
    ctSkills: ["abstraction"],
    description: "Fold, cut, and reflect shapes; count lines of symmetry and mirror images.",
    sourcePages: "pp. 40–43",
    questionCount: 9,
  },
  {
    id: "ct-negative-numbers",
    part: "ct",
    number: 10,
    title: "The Other Side of Zero",
    ctSkills: ["algorithmic-thinking"],
    description: "Reason with negative numbers, number lines, and magic-box rules.",
    sourcePages: "pp. 44–46",
    questionCount: 9,
  },
];

export const AI_CHAPTERS: ChapterMeta[] = [
  {
    id: "ai-intro",
    part: "ai",
    number: 1,
    title: "Introduction to AI and Everyday Examples",
    subtitle: "Meaning of AI, daily life, automation, human vs machine, types of learning",
    description:
      "Discover what intelligence and AI are, how machines learn, and how AI appears in phones, healthcare, and games.",
    sourcePages: "pp. 48–59",
  },
  {
    id: "ai-data",
    part: "ai",
    number: 2,
    title: "Basic Data Concepts",
    subtitle: "Understanding, collecting, organising, and representing data",
    description: "Learn data types, collection methods, tables, bar charts, and pictograms.",
    sourcePages: "pp. 60–69",
  },
  {
    id: "ai-patterns",
    part: "ai",
    number: 3,
    title: "Simple Pattern Recognition and Decision Making",
    subtitle: "Patterns, observations, conclusions, and decisions",
    description: "Find patterns in daily life and turn observations into smart decisions.",
    sourcePages: "pp. 70–75",
  },
  {
    id: "ai-ethics",
    part: "ai",
    number: 4,
    title: "Ethics and Digital Responsibility",
    subtitle: "Online safety, privacy, passwords, digital footprints",
    description: "Stay safe online with Arjun's story — plagiarism, phishing, privacy, and good digital behaviour.",
    sourcePages: "pp. 76–82",
  },
];

export const ALL_CHAPTERS = [...INTRO_CHAPTERS, ...CT_CHAPTERS, ...AI_CHAPTERS];

export const BADGES = [
  { id: "first-step", title: "First Step", emoji: "🌱", description: "Completed Start Here" },
  { id: "pattern-pro", title: "Pattern Pro", emoji: "🔍", description: "Finished a CT pattern chapter" },
  { id: "ai-explorer", title: "AI Explorer", emoji: "🤖", description: "Completed AI Chapter 1" },
  { id: "data-star", title: "Data Star", emoji: "📊", description: "Completed Basic Data Concepts" },
  { id: "ethics-guardian", title: "Ethics Guardian", emoji: "🛡️", description: "Completed Ethics chapter" },
  { id: "thinker", title: "Deep Thinker", emoji: "💡", description: "Wrote 5 journal reflections" },
  { id: "streak-3", title: "On Fire", emoji: "🔥", description: "3-day learning streak" },
  { id: "ct-master", title: "CT Champion", emoji: "🏆", description: "Completed all CT chapters" },
];

export const AVATARS = ["🦊", "🐼", "🦁", "🐸", "🦉", "🐙", "🦄", "🐢"];
