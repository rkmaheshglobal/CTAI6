import type { ChapterContent, ChapterMeta, QuizQuestion } from "@/lib/types";
import { CT_SKILLS, CT_CHAPTERS, AI_CHAPTERS } from "@/data/curriculum";
import { introStart } from "./chapters/intro-start";
import { aiIntro } from "./chapters/ai-intro";

function learnIntro(meta: ChapterMeta, skillNote: string, bullets: string[]): ChapterContent["learn"] {
  return [
    {
      id: "overview",
      title: meta.title,
      content: [meta.description, skillNote],
      bullets,
    },
  ];
}

function mcq(
  id: string,
  prompt: string,
  options: [string, string, string, string],
  correct?: "a" | "b" | "c" | "d"
): QuizQuestion {
  return {
    id,
    type: "mcq",
    prompt,
    options: [
      { id: "a", text: options[0], correct: correct === "a" },
      { id: "b", text: options[1], correct: correct === "b" },
      { id: "c", text: options[2], correct: correct === "c" },
      { id: "d", text: options[3], correct: correct === "d" },
    ],
  };
}

function think(id: string, prompt: string, hint?: string): QuizQuestion {
  return { id, type: "think", prompt, hint, discussionPrompt: "Share your approach with a classmate or teacher." };
}

function buildCt(meta: ChapterMeta, exercises: QuizQuestion[]): ChapterContent {
  const skill = meta.ctSkills?.[0];
  const skillLabel = skill ? CT_SKILLS[skill].label : "Computational Thinking";
  return {
    meta,
    learn: learnIntro(
      meta,
      `This chapter builds your ${skillLabel} skills. Work through each puzzle at your own pace — the handbook values thinking over speed.`,
      [
        "Read the puzzle carefully and note what is given",
        "Try at least two strategies before moving on",
        "Use hints if you are stuck — that still counts as learning!",
        "Mark each puzzle when you have attempted it",
      ]
    ),
    keyPoints: [`CT focus: ${skillLabel}`, "Discuss different approaches in class", "Source: CBSE CT & AI Handbook"],
    exercises,
  };
}

// --- CT Chapters (exercises from handbook text) ---

const ctLinesAngles = buildCt(CT_CHAPTERS[1], [
  think("ct-lines-angles-q1", "Eight friends sit at equal positions around a circular table facing the centre. A faces North-East. Use the clues to find positions. (See handbook diagram p. 14.)", "Draw a clock-face diagram and label directions."),
  mcq("ct-lines-angles-q2", "An equilateral triangle is given. At minimum, by how many degrees should it be rotated about its centre to coincide with itself?", ["60°", "90°", "120°", "180°"], "c"),
  think("ct-lines-angles-q3", "Sam draws three line segments AB, BC, and BD with a common point B. What can you conclude about the angles? (Handbook p. 15)", "List all angles around point B."),
  mcq("ct-lines-angles-q4", "How many times in a day (12-hour clock) do the minute and hour hands form a straight line?", ["11", "22", "24", "44"], "b"),
  think("ct-lines-angles-q5", "Avi and Sam attend dance sessions. Use the logic clues to find who attends when. (Handbook p. 14)"),
]);

const ctNumberPlay = buildCt(CT_CHAPTERS[2], [
  think("ct-number-play-q1", "Sachin rolls a die: scores points equal to the number, but if the product of last two rolls is odd, that roll scores 0. Plan how to track scores. (Handbook p. 17)"),
  think("ct-number-play-q2", "A grid has white squares with 1, 2, 3, or 4 hidden coins each. Use constraints to find values. (Handbook diagram p. 18)"),
  mcq("ct-number-play-q3", "Amat and Ankit each pick three numbers from {1,2,3,4,5,6}. What logical conditions apply? (Handbook p. 18)", ["Sum must be 10", "All different", "Product is even", "Depends on clues given"], "d"),
  think("ct-number-play-q4", "I am a 5-digit number made of even and odd digits. I read the same backwards and forwards. What number could I be? (Handbook p. 19)"),
  mcq("ct-number-play-q5", "A 3×3 grid: four students each pick a different digit. What strategy helps find the answer? (Handbook p. 19)", ["Guess randomly", "Eliminate using row/column rules", "Add all digits", "Multiply diagonals"], "b"),
]);

const ctDataHandling = buildCt(CT_CHAPTERS[3], [
  think("ct-data-handling-q1", "A pictograph shows milk store sales. If each symbol = a fixed amount, calculate total sales. (Handbook p. 20)"),
  think("ct-data-handling-q2", "A bar graph shows marbles collected by five friends. Who collected the most? (Handbook p. 21)"),
  think("ct-data-handling-q3", "Raj saved money each month from January to June. Find the pattern in his savings. (Handbook p. 23)"),
  mcq("ct-data-handling-q4", "When reading a pictograph with missing symbols, what is the first step?", ["Ignore missing data", "Use the key/scale for each symbol", "Add all labels", "Draw a new graph"], "b"),
  think("ct-data-handling-q5", "Connected circles grid: every pair of connected circles has consecutive numbers 1–6. Find A − B. (Handbook p. 24)"),
]);

const ctPrimeTime = buildCt(CT_CHAPTERS[4], [
  mcq("ct-prime-time-q1", "Starting from 2 on a 12-point circle, keep adding 2 until you return. How many steps?", ["3", "4", "5", "6"], "d"),
  mcq("ct-prime-time-q2", "Starting from 3 on a 12-point circle, keep adding 3. What shape forms?", ["Triangle", "Square", "Hexagon", "Star"], "b"),
  think("ct-prime-time-q3", "Why does adding 5 on a 12-point circle give a star? Relate 5 and 12.", "Explore GCD and polygon patterns."),
  mcq("ct-prime-time-q4", "If X is formed by adding different single-digit primes, which CANNOT be X?", ["8", "10", "11", "15"], "a"),
  mcq("ct-prime-time-q5", "The sum of three consecutive natural numbers is Y. Y is always divisible by:", ["3", "2", "4", "Cannot be determined"], "a"),
  think("ct-prime-time-q6", "Alex, Jim, and Sam were born on prime-numbered dates. Jim was born 10 days after Sam. Find Alex's day of week. (Handbook p. 28)"),
]);

const ctPerimeterArea = buildCt(CT_CHAPTERS[5], [
  think("ct-perimeter-area-q1", "Square X has perimeter 16 cm, cut along diagonal into two triangles. Compare areas. (Handbook p. 30)"),
  mcq("ct-perimeter-area-q2", "A larger block uses 4 small cubes (2 grey, 2 white). How many faces are visible?", ["Depends on arrangement", "Always 8", "Always 12", "Always 6"], "a"),
  think("ct-perimeter-area-q3", "How many times fold a paper sheet so the new shape's perimeter is half? (Handbook p. 31)"),
  think("ct-perimeter-area-q4", "Three rectangles of equal dimensions — which coloured block has the largest area? (Handbook p. 32)"),
  mcq("ct-perimeter-area-q5", "Grid shows land divided among three houses. What fraction does each get?", ["Compare coloured regions", "All equal", "Cannot tell without diagram", "Sum to 1"], "d"),
]);

const ctFractions = buildCt(CT_CHAPTERS[6], [
  think("ct-fractions-q1", "Aashay scored marks in 3 subjects. Use the data to find totals and averages. (Handbook p. 34)"),
  mcq("ct-fractions-q2", "Arrange fractions in ascending order. Which sits exactly in the middle of five ordered fractions?", ["The 3rd fraction", "The largest", "The smallest", "The average of first and last"], "a"),
  think("ct-fractions-q3", "In a class of 50 students, 20 are boys. One-fourth of girls play chess. How many girls play chess? (Handbook p. 34)"),
  mcq("ct-fractions-q4", "Raju's age is 2/3 of his brother's age. If one is 30, possible ages?", ["Raju 20, brother 30", "Raju 30, brother 20", "Both 30", "Cannot determine"], "a"),
  think("ct-fractions-q5", "Three square bricks of same weight divided into equal pieces — compare weights. (Handbook p. 35)"),
]);

const ctConstructions = buildCt(CT_CHAPTERS[7], [
  think("ct-constructions-q1", "Image of squares cut diagonally — which option completes the figure? (Handbook p. 36)"),
  mcq("ct-constructions-q2", "Minimum straight lines to divide an arrangement of squares into two equal parts?", ["1", "2", "3", "Depends on layout"], "d"),
  think("ct-constructions-q3", "Six pieces form two separate 3×3 square grids. Plan how to arrange them. (Handbook p. 37)"),
  think("ct-constructions-q4", "When Figure A is placed over Figure B, which digits overlap? (Handbook p. 38)"),
  mcq("ct-constructions-q5", "A 5×5 grid uses three pattern blocks. Some blocks are hidden. What strategy helps?", ["Count row by row", "Guess colours", "Ignore corners", "Only count centre"], "a"),
]);

const ctSymmetry = buildCt(CT_CHAPTERS[8], [
  think("ct-symmetry-q1", "Square paper folded in half, triangular piece cut — what shape unfolds? (Handbook p. 40)"),
  think("ct-symmetry-q2", "Paper folded vertically, then horizontally, then cut. Predict the result. (Handbook p. 41)"),
  mcq("ct-symmetry-q3", "How many of these letters have at least one line of symmetry? (H, S, A, O, R, T)", ["2", "3", "4", "5"], "c"),
  think("ct-symmetry-q4", "Along which line cut a paper sheet to get two identical pentagons? (Handbook p. 42)"),
  mcq("ct-symmetry-q5", "Eight shapes each have a dotted line. Count shapes where the line IS a line of symmetry.", ["Count carefully", "Always 4", "Always 8", "None"], "a"),
]);

const ctNegativeNumbers = buildCt(CT_CHAPTERS[9], [
  think("ct-negative-numbers-q1", "In a series, which English alphabet appears first alongside a negative number? (Handbook p. 44)"),
  mcq("ct-negative-numbers-q2", "Grid Column 2 must be filled with > or <. What logic applies?", ["Compare row values", "Random fill", "All >", "All <"], "a"),
  think("ct-negative-numbers-q3", "Alex has a magic box that changes numbers by rules. Track the pattern. (Handbook p. 45)"),
  mcq("ct-negative-numbers-q4", "Each square = +10, each triangle = −15. How many more squares than triangles for a total of 0?", ["Equal count", "3 more squares", "3 more triangles", "Depends on total"], "d"),
  think("ct-negative-numbers-q5", "Number line with equally spaced points — find the missing value. (Handbook p. 45)"),
]);

// --- AI Chapters ---

const aiData: ChapterContent = {
  meta: AI_CHAPTERS[1],
  learn: [
    {
      id: "what-is-data",
      title: "What is Data?",
      content: [
        "Data means raw information that can be processed to get useful insights for decision-making — numbers of friends, weather reports, exam marks, library lists.",
      ],
    },
    {
      id: "types",
      title: "Types of Data",
      content: ["The handbook identifies these main types:"],
      bullets: ["Numerical data (counts and measurements)", "Text data (words and sentences)", "Image data (pictures and visuals)", "Video data (moving visuals)", "Sound data (audio and voice)"],
    },
    {
      id: "organise",
      title: "Collecting, Organising, and Representing Data",
      content: [
        "Collect from people, books, internet, or instruments. Organise by classification, structuring, labelling, and storage. Represent using tables, bar charts, and pictograms.",
      ],
    },
  ],
  keyPoints: [
    "Data is information we collect to understand things and make decisions.",
    "Tables use rows and columns; charts make comparisons visual.",
    "Classification groups similar data; labelling gives clear names.",
  ],
  exercises: [
    mcq("ai-data-mcq1", "A teacher analyses last year's exam results to improve teaching. This is:", ["Guesswork", "Using data for decision-making", "Random selection", "Entertainment"], "b"),
    mcq("ai-data-mcq2", "A fitness app counts daily steps. What type of data?", ["Image", "Text", "Numerical", "Sound"], "c"),
    mcq("ai-data-mcq3", "A weather app predicts rain using satellite data. Data helps in:", ["Playing games", "Making future predictions", "Writing stories", "Sending messages"], "b"),
    mcq("ai-data-mcq4", "A security camera at the school gate collects mainly:", ["Text", "Video", "Image only", "Numerical"], "b"),
    mcq("ai-data-mcq5", "Which is an example of Image data?", ["Your name", "Your address", "Your age", "Your photograph"], "d"),
    think("ai-data-think1", "A student measures plant height every week. What type of data is collected?"),
    think("ai-data-think2", "Should a teacher use a table or bar chart to compare student marks? Give one reason."),
  ],
};

const aiPatterns: ChapterContent = {
  meta: AI_CHAPTERS[2],
  learn: [
    {
      id: "patterns",
      title: "What is a Pattern?",
      content: ["A pattern is a regular, repeated, or predictable sequence in numbers, shapes, text, colours, or actions."],
      bullets: ["Series — items connected by the same rule", "Predictability — guess what comes next", "Behaviour — habits and routines are patterns too"],
    },
    {
      id: "decisions",
      title: "Observations, Conclusions, and Decisions",
      content: [
        "Observe data for patterns and key findings. Draw conclusions to answer your question. Make decisions based on what the data shows — like practising daily because it improves your basketball game.",
      ],
    },
  ],
  keyPoints: [
    "Identifying patterns helps predict and organise information.",
    "Observations describe what you saw; conclusions explain what it means.",
    "Good decisions use careful thinking about available information.",
  ],
  exercises: [
    mcq("ai-pat-mcq1", "A student wakes up, brushes teeth, eats breakfast in the same order daily. This is:", ["Random", "A pattern", "A mistake", "A single event"], "b"),
    mcq("ai-pat-mcq2", "Making observations from data means:", ["Changing data", "Looking for patterns and key findings", "Guessing", "Hiding results"], "b"),
    mcq("ai-pat-mcq3", "Arranging data by attributes to find similar groups is:", ["Machine learning only", "Sorting and filtering", "Entertainment", "Deletion"], "b"),
    mcq("ai-pat-mcq4", "Drawing a conclusion means:", ["Copying data", "Understanding and applying observations", "Creating confusion", "Repeating data"], "b"),
    mcq("ai-pat-mcq5", "Decision-making means:", ["Acting without thinking", "Choosing an action after thinking", "Ignoring facts", "Random guessing"], "b"),
    think("ai-pat-think1", "Temperature is higher in the afternoon for several days. What is the student doing? What can they conclude?"),
    think("ai-pat-think2", "A class survey shows more students like cricket than football. What can the teacher conclude?"),
  ],
};

const aiEthics: ChapterContent = {
  meta: AI_CHAPTERS[3],
  learn: [
    {
      id: "digital",
      title: "Digital Responsibility",
      content: [
        "Technology helps us learn and communicate, but we must behave responsibly online — think before you click, be respectful, protect privacy.",
      ],
    },
    {
      id: "arjun",
      title: "Arjun's Story — Learn from Mistakes",
      content: [
        "Arjun copied an essay, clicked a fake 'free game' link, then lost his files. Mistakes: plagiarism, clicking suspicious links, not telling an adult.",
      ],
      bullets: ["Plagiarism — copying without credit", "Phishing — fake emails asking for passwords", "Hacking — unauthorised access to systems", "Spamming — unwanted junk messages"],
    },
    {
      id: "footprint",
      title: "Digital Footprints",
      content: [
        "Active footprints: posts and forms you fill intentionally. Passive footprints: cookies, location data, ads based on your activity.",
      ],
    },
  ],
  keyPoints: [
    "Think before you click and share online.",
    "Never share passwords or personal details with strangers.",
    "Use strong passwords and read privacy policies.",
    "Build a positive digital footprint with kind, helpful content.",
  ],
  exercises: [
    mcq("ai-eth-mcq1", "Copying text from a website without credit is:", ["Hacking", "Plagiarism", "Spamming", "Phishing"], "b"),
    mcq("ai-eth-mcq2", "Message says 'Win a free phone! Share your password.' You should:", ["Send it", "Inform your parents", "Post online", "Give fake info"], "b"),
    mcq("ai-eth-mcq3", "Pop-up: 'Scan viruses, win $1000!' Safest action:", ["Click it", "Ignore it", "Ask a stranger", "Download scanner"], "b"),
    mcq("ai-eth-mcq4", "Checking bank on public Wi-Fi — best action:", ["Check now", "Use a secure network", "Ask someone else", "Install random app"], "b"),
    mcq("ai-eth-mcq5", "Posting helpful tips while thinking about who sees them creates:", ["Active digital footprint", "Passive footprint", "Hacker footprint", "Phishing"], "a"),
    think("ai-eth-think1", "Your friend gets an email asking for bank details. What should they do?"),
    think("ai-eth-think2", "Someone copies your school assignment without permission. Which ethical rule is broken?"),
  ],
};

// Import ct-patterns from existing file
import { ctPatterns } from "./chapters/ct-patterns";

export const ALL_CHAPTER_CONTENT: Record<string, ChapterContent> = {
  "intro-start": introStart,
  "ct-patterns": ctPatterns,
  "ct-lines-angles": ctLinesAngles,
  "ct-number-play": ctNumberPlay,
  "ct-data-handling": ctDataHandling,
  "ct-prime-time": ctPrimeTime,
  "ct-perimeter-area": ctPerimeterArea,
  "ct-fractions": ctFractions,
  "ct-constructions": ctConstructions,
  "ct-symmetry": ctSymmetry,
  "ct-negative-numbers": ctNegativeNumbers,
  "ai-intro": aiIntro,
  "ai-data": aiData,
  "ai-patterns": aiPatterns,
  "ai-ethics": aiEthics,
};

export function getExerciseCount(chapterId: string): number {
  return ALL_CHAPTER_CONTENT[chapterId]?.exercises?.length ?? 0;
}

export function getChapterContentById(id: string): ChapterContent | null {
  return ALL_CHAPTER_CONTENT[id] ?? null;
}
