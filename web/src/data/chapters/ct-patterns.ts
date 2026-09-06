import type { ChapterContent } from "@/lib/types";
import { CT_CHAPTERS } from "../curriculum";

export const ctPatterns: ChapterContent = {
  meta: CT_CHAPTERS[0],
  learn: [
    {
      id: "ct-skill",
      title: "CT Skill: Pattern Recognition",
      content: [
        "This chapter is a companion to Patterns in Mathematics in your Class 6 Math textbook.",
        "Pattern Recognition means spotting repeating rules — in numbers, shapes, letters, or symbols — and using them to predict what comes next.",
      ],
      bullets: [
        "Look for how many times a number repeats before it changes",
        "Check if the rule uses +, ×, squares, or alternating symbols",
        "Draw or write out the next few terms to test your idea",
        "Discuss different strategies — the book values thinking over speed!",
      ],
    },
    {
      id: "how-to-approach",
      title: "How to Approach These Puzzles",
      content: [
        "Each question below is from the CBSE handbook (pp. 11–13). Some puzzles use diagrams in the printed book — here we include all questions that work with text.",
        "Try each puzzle for at least 2 minutes before checking a hint. Write down the pattern you notice.",
      ],
    },
  ],
  keyPoints: [
    "Patterns can involve numbers, shapes, symbols, or mixed rules.",
    "One wrong term in a series means the pattern broke — find which term doesn't fit.",
    "Decomposition helps: break a big series into smaller chunks.",
  ],
  exercises: [
    {
      id: "pat-q1",
      type: "mcq",
      prompt:
        'The series follows: 2, 3, 3, 4, 4, 4, 5, 5, 5, 5, 6, … (each number n appears n times). How many times does 9 appear in the NEXT 20 terms?',
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "7", correct: true },
        { id: "d", text: "8" },
      ],
      hint: "Count: how many 6s, 7s, 8s, then 9s fit in 20 terms after 6?",
      discussionPrompt: "Can you write a rule: 'number k appears k times'?",
    },
    {
      id: "pat-q2",
      type: "mcq",
      prompt:
        "One term is incorrect in: 2, 3, 6, 11, 18, 25, 38, 51, 66, 83. Which term is wrong?",
      options: [
        { id: "a", text: "11" },
        { id: "b", text: "25" },
        { id: "c", text: "51" },
        { id: "d", text: "66" },
      ],
      hint: "Try differences between consecutive terms: 3, 3, 5, 7, 7, 13…",
      discussionPrompt: "What pattern do the differences follow?",
    },
    {
      id: "pat-q3",
      type: "mcq",
      prompt: 'What comes in place of "?" in: 1@3, #5#, 7@9, #11#, 13@15, ?, 19@21',
      options: [
        { id: "a", text: "@17@" },
        { id: "b", text: "#15#" },
        { id: "c", text: "16#18" },
        { id: "d", text: "#17#", correct: true },
      ],
      hint: "Odd-number pairs alternate between @ and # symbols around them.",
    },
    {
      id: "pat-q8",
      type: "mcq",
      prompt:
        "Set P: (18, 22, 24, 27, 30) and Set Q: (21, 24, 27, 31, 36). Which number from Set P can be swapped with one from Set Q so both sets follow a pattern?",
      options: [
        { id: "a", text: "18" },
        { id: "b", text: "27" },
        { id: "c", text: "22" },
        { id: "d", text: "30", correct: true },
      ],
      hint: "Look for arithmetic or divisibility patterns in each set.",
    },
    {
      id: "pat-q10",
      type: "mcq",
      prompt:
        "A pyramid of cubes: each level has 2 fewer cubes than the level below. Using at most 30 cubes total, what is the maximum number of levels?",
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "5", correct: true },
        { id: "d", text: "6" },
      ],
      hint: "Level 1 might have n cubes, level 2 has n−2, etc. Sum ≤ 30.",
      discussionPrompt: "Try starting with 10 cubes on the bottom — how many levels?",
    },
    {
      id: "pat-q7",
      type: "think",
      prompt:
        "Hexagons and diamonds grow in a visual series (handbook p. 12). If a term has 144 hexagons, how would you find the number of diamonds?",
      answer: "Find the ratio or rule between hexagons and diamonds in earlier terms.",
      discussionPrompt: "Without the diagram, what information would you need to solve this?",
    },
  ],
};
