import type { ChapterContent } from "@/lib/types";
import { AI_CHAPTERS } from "../curriculum";

export const aiIntro: ChapterContent = {
  meta: AI_CHAPTERS[0],
  learn: [
    {
      id: "intelligence",
      title: "What is Intelligence?",
      content: [
        "Intelligence is the ability to learn, think, understand, solve problems, and use knowledge effectively. People show intelligence in different ways — like leading a team (interpersonal), understanding nature (naturalistic), or knowing how you learn best (intrapersonal).",
      ],
    },
    {
      id: "what-is-ai",
      title: "What is Artificial Intelligence?",
      content: [
        "Artificial Intelligence (AI) is the field of computer science that makes machines intelligent. AI systems can analyse data, recognise patterns, predict trends, solve problems, and make decisions — and they can improve over time.",
        "Computing + Intelligence = machines that simulate human-like thinking to help us decide.",
      ],
    },
    {
      id: "ai-history",
      title: "A Short History of AI",
      content: [
        "Ancient automatons used gears and water — fixed tasks, no learning.",
        "Alan Turing asked 'Can machines think?' and introduced the Turing Test.",
        "In 1956, John McCarthy coined 'Artificial Intelligence' at the Dartmouth conference.",
        "Modern AI (2000s onward) learns from large amounts of data — image recognition, speech, recommendations.",
      ],
    },
    {
      id: "ai-daily-life",
      title: "AI in Daily Life",
      content: ["The handbook gives real examples you already use:"],
      bullets: [
        "Smart home devices and smartphone features (voice assistants, portrait mode)",
        "Banking fraud alerts and healthcare diagnosis support",
        "E-commerce recommendations and search engines",
        "Security cameras, video games, self-driving cars, and scanning apps (OCR)",
      ],
    },
    {
      id: "automation-vs-ai",
      title: "Automation vs Artificial Intelligence",
      content: [
        "Not every smart machine uses AI! Automation follows fixed rules — same input, same output every time (microwave, traditional traffic lights).",
        "AI learns from data, can handle new situations, and improves over time (voice assistants, face recognition).",
      ],
    },
    {
      id: "human-vs-machine",
      title: "Human Intelligence vs Machine Intelligence",
      content: [
        "Humans learn from experience, emotions, and creativity; machines learn from data and algorithms.",
        "Humans adapt to unpredictable situations; machines are fast and accurate on trained tasks but lack true consciousness.",
      ],
    },
    {
      id: "how-ai-learns",
      title: "How Does AI Learn?",
      content: [
        "AI learns from data — pictures, text, numbers, or sounds. Data can be labelled (like notebooks with student names) or unlabelled (no tags — the system must find patterns).",
        "Machine Learning (ML) is how AI learns from data without being programmed for every single task.",
      ],
    },
    {
      id: "ml-types",
      title: "Three Types of Machine Learning",
      content: [
        "Supervised Learning — learns from labelled data with correct answers (spam detection, image recognition, house price prediction).",
        "Unsupervised Learning — finds hidden groups in unlabelled data (customer segmentation, anomaly detection).",
        "Reinforcement Learning — learns by trial and error with rewards and penalties (game-playing AI, robot navigation).",
      ],
    },
  ],
  keyPoints: [
    "Intelligence is the ability to learn, think, and solve problems.",
    "Not all automated machines use Artificial Intelligence.",
    "AI learns from data using Machine Learning.",
    "AI improves its performance over time through experience and feedback.",
    "Three ML types: Supervised, Unsupervised, and Reinforcement.",
  ],
  exercises: [
    {
      id: "ai1-mcq-1",
      type: "mcq",
      prompt: "What is labelled data?",
      options: [
        { id: "a", text: "Data without any tags" },
        { id: "b", text: "Data with predefined labels or tags", correct: true },
        { id: "c", text: "Random data" },
        { id: "d", text: "Incorrect data" },
      ],
      hint: "Think about the notebook example — books with student names written on them.",
    },
    {
      id: "ai1-mcq-2",
      type: "mcq",
      prompt: "Who introduced the Turing Test?",
      options: [
        { id: "a", text: "John McCarthy" },
        { id: "b", text: "Alan Turing", correct: true },
        { id: "c", text: "Charles Babbage" },
        { id: "d", text: "Isaac Newton" },
      ],
    },
    {
      id: "ai1-mcq-3",
      type: "mcq",
      prompt: "In supervised learning, data is:",
      options: [
        { id: "a", text: "Unlabelled" },
        { id: "b", text: "Random" },
        { id: "c", text: "Labelled", correct: true },
        { id: "d", text: "Deleted" },
      ],
    },
    {
      id: "ai1-mcq-4",
      type: "mcq",
      prompt: "Predicting exam marks based on trained data uses:",
      options: [
        { id: "a", text: "Supervised Learning", correct: true },
        { id: "b", text: "Unsupervised Learning" },
        { id: "c", text: "Reinforcement Learning" },
        { id: "d", text: "All of the above" },
      ],
    },
    {
      id: "ai1-mcq-5",
      type: "mcq",
      prompt: "Which of the following is NOT AI?",
      options: [
        { id: "a", text: "Voice assistant" },
        { id: "b", text: "Face recognition" },
        { id: "c", text: "Traditional traffic signal", correct: true },
        { id: "d", text: "Smart chatbot" },
      ],
      hint: "Does it learn from data or just follow fixed timing rules?",
    },
    {
      id: "ai1-think-1",
      type: "think",
      prompt:
        "Grouping customers based on shopping habits without labels — which type of Machine Learning is this?",
      answer: "Unsupervised Learning",
      discussionPrompt: "Why doesn't the system have 'correct answers' to learn from?",
    },
    {
      id: "ai1-think-2",
      type: "think",
      prompt: "A game AI improving after winning or losing — which type of learning?",
      answer: "Reinforcement Learning",
      discussionPrompt: "What are the 'rewards' and 'penalties' in a chess game?",
    },
  ],
};
