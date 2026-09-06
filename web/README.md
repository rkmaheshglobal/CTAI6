# CT & AI Learn — CBSE Class 6

Interactive web companion for the **CBSE Computational Thinking and Artificial Intelligence** Student Handbook (Class 6, March 2026).

## Tech stack (engagement-focused)

- **Next.js 16** — fast, modern React app
- **Tailwind CSS** — colourful, responsive UI
- **Framer Motion** — smooth animations and delight
- **canvas-confetti** — celebration on achievements
- **Recharts** — teacher analytics charts
- **Zustand** — progress, XP, badges, class data

## Features

### Student dashboard
- XP, levels, daily streaks, badges
- 15 chapters: Start Here + 10 CT + 4 AI
- Learn → Explore → Practice → Reflect flow
- Interactive activities: Automation vs AI sort, ML type matcher, Prime Time circle explorer
- Thinking Journal

### Teacher dashboard
- Create class + share join code
- Student roster with progress bars
- Chapter completion bar chart
- **Chapter library** with full answer keys, logic, and facilitation notes (`/teacher/chapters`)
- Pedagogy reminders from the handbook

## Getting started

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo flow
1. **Teacher**: Create a class → note the class code (e.g. `MATH-42`)
2. **Student** (new tab or incognito): Join with name + class code
3. Student completes **Start Here** and **AI Chapter 1**
4. Teacher dashboard shows progress

> **Note:** Progress syncs via browser localStorage. For multi-device classrooms, a cloud backend (e.g. Supabase) can be added in a future phase.

## Content & diagrams

Practice questions are parsed from `CTAI/CTAI.txt` into `src/data/handbook-extracted.json`.

**Per-question diagrams** are cropped from `CTAI/CTAI.pdf` (not full handbook pages), so each question shows only its own figure:

```bash
npm run extract-diagrams   # requires PyMuPDF: pip install pymupdf
npm run build-guides       # rebuild CT step-by-step answer explanations
npm run build-ai-part2     # rebuild AI Part 2 exercises and detailed solutions
```

Output:
- `public/handbook/diagrams/{chapter-id}-q{n}.png` — one image per question that has a diagram
- `src/data/diagram-manifest.json` — maps question id → image path
- `src/data/question-guides.json` — detailed step-by-step solutions for all 91 questions

| Module | Questions | Diagrams |
|--------|-----------|----------|
| CT Chapters 1–10 | From handbook (varies) | 69 auto-cropped |
| AI Chapters 1–4 | 96 exercises (MCQ + FIB + SAQ + apply + classify) | Text-only |
| Start Here | 3 MCQs | Text-only |

> CT chapters still need full 10-question coverage from the handbook where not yet extracted. Diagrams are matched automatically for any question present in `handbook-extracted.json`.

## Source

Content derived from `CTAI/CTAI.pdf` — CBSE Class 6 Student Handbook, First Edition March 2026.
