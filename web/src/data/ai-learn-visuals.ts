import type { LearnSection } from "@/lib/types";

type SectionMeta = Pick<
  LearnSection,
  "emoji" | "accent" | "visual" | "funFact" | "practiceTip"
>;

/** Kid-friendly visuals & tips keyed by chapter → section id */
const AI_SECTION_META: Record<string, Record<string, SectionMeta>> = {
  "ai-intro": {
    overview: {
      emoji: "🚀",
      accent: "violet",
      visual: {
        type: "steps",
        items: [
          { emoji: "🧠", title: "Intelligence", text: "What smart thinking means" },
          { emoji: "🤖", title: "AI basics", text: "Machines that learn & decide" },
          { emoji: "📱", title: "Daily life", text: "AI you already use" },
          { emoji: "📊", title: "Machine Learning", text: "3 ways AI learns from data" },
        ],
      },
      practiceTip: "After reading all sections, try the Classify and Think & Apply questions in Practice.",
    },
    intelligence: {
      emoji: "🧠",
      accent: "violet",
      visual: {
        type: "cards",
        items: [
          {
            emoji: "👥",
            title: "The Class Leader",
            subtitle: "Interpersonal",
            description: "Brings the team together and helps classmates work smoothly.",
          },
          {
            emoji: "🌿",
            title: "The Nature Lover",
            subtitle: "Naturalistic",
            description: "Notices plants, animals, and patterns in nature.",
          },
          {
            emoji: "💭",
            title: "The Daydreamer",
            subtitle: "Intrapersonal",
            description: "Knows how they learn best and manages feelings before tests.",
          },
        ],
      },
      funFact: "Intelligence isn't just about marks — it's about learning, adapting, and solving problems!",
      practiceTip: "Fill-in-the-blank questions often ask what intelligence includes — remember: learn, think, solve!",
    },
    "what-is-ai": {
      emoji: "🤖",
      accent: "indigo",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "💻", label: "Computing" },
          { emoji: "🧠", label: "Intelligence" },
          { emoji: "✨", label: "AI" },
        ],
        flow: ["Math & logic", "Learn & reason", "Smart machines"],
      },
      funFact: "AI can analyse data, spot patterns, predict trends, and even get better over time!",
      practiceTip: "MCQs may ask what AI is — it's computer science that makes machines intelligent.",
    },
    "ai-history-ancient": {
      emoji: "⏳",
      accent: "amber",
      visual: {
        type: "timeline",
        events: [
          {
            emoji: "⚙️",
            label: "Ancient times",
            text: "Automatons used water & gears — fixed tasks, no learning.",
          },
          {
            emoji: "🧮",
            label: "1940s — Alan Turing",
            text: "Asked 'Can machines think?' and created the Turing Test.",
          },
        ],
      },
      practiceTip: "Who introduced the Turing Test? Remember: Alan Turing!",
    },
    "ai-history-modern": {
      emoji: "📅",
      accent: "amber",
      visual: {
        type: "timeline",
        events: [
          {
            emoji: "🎓",
            label: "1956 — Birth of AI",
            text: "John McCarthy coined 'Artificial Intelligence' at Dartmouth.",
          },
          {
            emoji: "❄️",
            label: "1980s–90s — AI Winter",
            text: "Progress slowed — slow computers, limited memory.",
          },
          {
            emoji: "🚀",
            label: "2000s — Modern AI",
            text: "Fast computers + big data = image, speech & smart apps!",
          },
        ],
      },
      funFact: "John McCarthy is called the 'Father of Artificial Intelligence'.",
      practiceTip: "MCQs love asking about John McCarthy and the year 1956.",
    },
    "ai-daily-life": {
      emoji: "📱",
      accent: "cyan",
      visual: {
        type: "grid",
        items: [
          { emoji: "🏠", label: "Smart home" },
          { emoji: "📱", label: "Smartphones" },
          { emoji: "🏦", label: "Banking" },
          { emoji: "🏥", label: "Healthcare" },
          { emoji: "🛒", label: "Shopping" },
          { emoji: "🔒", label: "Security" },
          { emoji: "🎮", label: "Games" },
          { emoji: "🚗", label: "Smart cars" },
          { emoji: "📷", label: "Scan apps" },
          { emoji: "🔍", label: "Search" },
        ],
      },
      practiceTip: "Short-answer: name two AI examples from daily life — pick any two from the grid!",
    },
    "automation-vs-ai": {
      emoji: "⚙️",
      accent: "blue",
      visual: {
        type: "compare",
        left: {
          label: "Automation",
          emoji: "⚙️",
          points: [
            "Fixed rules — same result every time",
            "Does NOT think or learn",
            "Example: microwave timer, traffic lights",
          ],
        },
        right: {
          label: "Artificial Intelligence",
          emoji: "🤖",
          points: [
            "Learns from data",
            "Can handle new situations",
            "Example: voice assistant, face recognition",
          ],
        },
      },
      practiceTip: "Classify questions: traffic lights = Automation. Voice assistant = AI!",
    },
    "human-vs-machine": {
      emoji: "👤",
      accent: "rose",
      visual: {
        type: "compare",
        left: {
          label: "Human 🧑",
          emoji: "🧑",
          points: [
            "Learns from experience & emotions",
            "Creative & adaptable",
            "Has feelings & self-awareness",
          ],
        },
        right: {
          label: "Machine 🤖",
          emoji: "🤖",
          points: [
            "Learns from data & algorithms",
            "Very fast & accurate on trained tasks",
            "No true emotions or consciousness",
          ],
        },
      },
    },
    "how-ai-learns": {
      emoji: "📓",
      accent: "emerald",
      visual: {
        type: "compare",
        left: {
          label: "Labelled data 📛",
          emoji: "📛",
          points: [
            "Notebooks WITH student names",
            "Teacher knows whose book it is",
            "Used in supervised learning",
          ],
        },
        right: {
          label: "Unlabelled data 📄",
          emoji: "📄",
          points: [
            "Notebooks WITHOUT names",
            "Teacher guesses from handwriting",
            "Used in unsupervised learning",
          ],
        },
      },
      funFact: "Machine Learning (ML) lets AI learn without being programmed for every single task!",
      practiceTip: "MCQ: 'What is labelled data?' — data with predefined labels or tags!",
    },
    "supervised-learning": {
      emoji: "👨‍🏫",
      accent: "violet",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "📛", label: "Labelled data" },
          { emoji: "🎓", label: "Train model" },
          { emoji: "✅", label: "Predict" },
        ],
        flow: ["Examples with answers", "Learn patterns", "Classify new data"],
      },
      practiceTip: "Spam detection, house prices, exam marks — all supervised learning!",
    },
    "unsupervised-learning": {
      emoji: "🔍",
      accent: "blue",
      visual: {
        type: "grid",
        items: [
          { emoji: "👥", label: "Customer groups" },
          { emoji: "🛒", label: "Basket analysis" },
          { emoji: "📰", label: "Doc clustering" },
          { emoji: "🚨", label: "Fraud detection" },
        ],
      },
      practiceTip: "Grouping customers without labels = unsupervised learning (clustering).",
    },
    "reinforcement-learning": {
      emoji: "🎮",
      accent: "amber",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "🤖", label: "Agent" },
          { emoji: "🌍", label: "Environment" },
          { emoji: "🏆", label: "Reward" },
        ],
        flow: ["Tries action", "Gets feedback", "Learns to improve"],
      },
      funFact: "Chess AI learns by playing thousands of games — wins = reward, losses = penalty!",
      practiceTip: "Game AI improving after winning/losing = reinforcement learning.",
    },
  },

  "ai-data": {
    overview: {
      emoji: "📊",
      accent: "cyan",
      visual: {
        type: "steps",
        items: [
          { emoji: "📦", title: "What is data?", text: "Raw facts all around us" },
          { emoji: "🔢", title: "5 types", text: "Numbers, text, images, video, sound" },
          { emoji: "📁", title: "Organise", text: "Sort, label, store safely" },
          { emoji: "📈", title: "Show it", text: "Tables, bar charts, pictograms" },
        ],
      },
    },
    "data-everywhere": {
      emoji: "🌍",
      accent: "cyan",
      visual: {
        type: "grid",
        items: [
          { emoji: "✅", label: "Attendance" },
          { emoji: "💬", label: "Messages" },
          { emoji: "🌤️", label: "Weather" },
          { emoji: "📺", label: "Videos" },
          { emoji: "🏃", label: "Fitness app" },
          { emoji: "📋", label: "Report card" },
        ],
      },
      practiceTip: "Fitness app counting steps = numerical data!",
    },
    "what-is-data": {
      emoji: "📦",
      accent: "blue",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "📦", label: "Raw data" },
          { emoji: "⚙️", label: "Process" },
          { emoji: "💡", label: "Information" },
        ],
        flow: ["Facts & figures", "Organise & analyse", "Smart decisions"],
      },
      practiceTip: "Define data: raw information processed to get useful insights.",
    },
    "importance-decisions": {
      emoji: "🎯",
      accent: "emerald",
      visual: {
        type: "cards",
        items: [
          {
            emoji: "📝",
            title: "Exam results",
            description: "Teachers see which subjects need more practice.",
          },
          {
            emoji: "🏪",
            title: "Shop sales",
            description: "Owners decide what to stock or remove.",
          },
        ],
      },
      practiceTip: "Teacher analysing exam results = using data for decision-making!",
    },
    "importance-research": {
      emoji: "🔬",
      accent: "indigo",
      visual: {
        type: "grid",
        items: [
          { emoji: "🔬", label: "Science" },
          { emoji: "🛡️", label: "Cybersecurity" },
          { emoji: "🎵", label: "Music apps" },
          { emoji: "🛍️", label: "Shopping tips" },
        ],
      },
    },
    "data-types": {
      emoji: "🎨",
      accent: "violet",
      visual: {
        type: "grid",
        items: [
          { emoji: "🔢", label: "Numerical" },
          { emoji: "📝", label: "Text" },
          { emoji: "🖼️", label: "Image" },
          { emoji: "🎬", label: "Video" },
          { emoji: "🔊", label: "Sound" },
        ],
      },
      practiceTip: "Classify questions: photo = image, voice message = sound, marks = numerical!",
    },
    collecting: {
      emoji: "📝",
      accent: "amber",
      visual: {
        type: "grid",
        items: [
          { emoji: "👥", label: "Surveys" },
          { emoji: "📚", label: "Books" },
          { emoji: "🌐", label: "Internet" },
          { emoji: "🌡️", label: "Instruments" },
        ],
      },
    },
    organising: {
      emoji: "📁",
      accent: "emerald",
      visual: {
        type: "steps",
        items: [
          { emoji: "📂", title: "Classification", text: "Group similar data together" },
          { emoji: "📋", title: "Structuring", text: "Folders or tables" },
          { emoji: "🏷️", title: "Labelling", text: "Clear, descriptive names" },
          { emoji: "🔒", title: "Storage", text: "Save securely" },
        ],
      },
      practiceTip: "Grouping similar data = classification. Clear names = labelling.",
    },
    tables: {
      emoji: "📋",
      accent: "blue",
      visual: {
        type: "table",
        headers: ["Family Member", "Food", "Drink"],
        rows: [
          ["Grandfather", "Chapati & Dal", "Warm Milk"],
          ["Grandmother", "Khichdi", "Tea"],
          ["Father", "Rice & Curds", "Buttermilk"],
          ["Mother", "Salad & Soup", "Fresh Juice"],
        ],
      },
      funFact: "Tables use rows and columns — perfect when you need exact numbers!",
    },
    charts: {
      emoji: "📈",
      accent: "cyan",
      visual: {
        type: "grid",
        items: [
          { emoji: "📊", label: "Bar chart" },
          { emoji: "📉", label: "Line graph" },
          { emoji: "🥧", label: "Pie chart" },
          { emoji: "🖼️", label: "Pictogram" },
        ],
      },
      practiceTip: "Charts turn numbers into pictures — great for quick comparisons!",
    },
    "bar-charts": {
      emoji: "🍋",
      accent: "amber",
      visual: {
        type: "table",
        headers: ["Product", "Total Sold"],
        rows: [
          ["Regular Lemonade", "65"],
          ["Strawberry Lemonade", "52"],
          ["Lemon Cookies ⭐", "78"],
        ],
      },
      funFact: "Lemon Cookies sold the most! Bar charts make winners easy to spot.",
      practiceTip: "Compare marks clearly? A bar chart shows differences at a glance!",
    },
    pictograms: {
      emoji: "🌳",
      accent: "emerald",
      visual: {
        type: "table",
        headers: ["Class", "Trees", "Rank"],
        rows: [
          ["Class 8 ⭐", "25", "Winner!"],
          ["Class 6", "20", "2nd"],
          ["Class 7", "15", "3rd"],
          ["Class 9", "10", "4th"],
        ],
      },
      funFact: "Key: 🌳 = 5 trees. One symbol can stand for many items!",
    },
  },

  "ai-patterns": {
    overview: {
      emoji: "🔁",
      accent: "violet",
      visual: {
        type: "steps",
        items: [
          { emoji: "🔍", title: "Spot patterns", text: "Find repeating sequences" },
          { emoji: "👀", title: "Observe", text: "Note what you see in data" },
          { emoji: "💡", title: "Conclude", text: "Answer your question" },
          { emoji: "✅", title: "Decide", text: "Choose the best action" },
        ],
      },
    },
    "what-is-pattern": {
      emoji: "🔢",
      accent: "violet",
      visual: {
        type: "grid",
        items: [
          { emoji: "2️⃣", label: "2, 4, 6, 8" },
          { emoji: "🍂", label: "Seasons" },
          { emoji: "🎨", label: "Art designs" },
          { emoji: "☀️", label: "Day & night" },
        ],
      },
      funFact: "If you see 2, 4, 6, 8 — you can predict the next number is 10!",
    },
    importance: {
      emoji: "✨",
      accent: "indigo",
      visual: {
        type: "cards",
        items: [
          { emoji: "🪞", title: "Symmetry", description: "Looks the same when repeated" },
          { emoji: "🔗", title: "Series", description: "Items connected by the same rule" },
          { emoji: "🔮", title: "Predictability", description: "Guess what comes next" },
          { emoji: "🔄", title: "Behaviour", description: "Habits and routines" },
        ],
      },
    },
    "daily-patterns": {
      emoji: "☀️",
      accent: "amber",
      visual: {
        type: "grid",
        items: [
          { emoji: "⏰", label: "Morning routine" },
          { emoji: "📅", label: "Schedules" },
          { emoji: "🌿", label: "Nature" },
          { emoji: "🎵", label: "Rhymes" },
          { emoji: "🏀", label: "Sports practice" },
        ],
      },
    },
    identifying: {
      emoji: "🏀",
      accent: "emerald",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "🏀", label: "Practice daily" },
          { emoji: "📈", label: "Score more" },
          { emoji: "💪", label: "Improve!" },
        ],
        flow: ["1 hour after school", "Better on game day", "Pattern found!"],
      },
      practiceTip: "Basketball example: practice daily → better scores. That's a pattern!",
    },
    "repeated-actions": {
      emoji: "🔁",
      accent: "blue",
      visual: {
        type: "steps",
        items: [
          { emoji: "👀", title: "Observation", text: "Watch over time" },
          { emoji: "📅", title: "Time series", text: "Study data across days/weeks" },
          { emoji: "📊", title: "Charts", text: "See repeats visually" },
        ],
      },
    },
    similarities: {
      emoji: "🧩",
      accent: "cyan",
      visual: {
        type: "grid",
        items: [
          { emoji: "↕️", label: "Sorting" },
          { emoji: "📊", label: "Charts" },
          { emoji: "📐", label: "Statistics" },
          { emoji: "🤖", label: "ML models" },
        ],
      },
      practiceTip: "Arranging data by attributes = sorting and filtering.",
    },
    observations: {
      emoji: "👀",
      accent: "rose",
      visual: {
        type: "cards",
        items: [
          {
            emoji: "🏏",
            title: "Observation",
            description: "More students like cricket than football.",
          },
          {
            emoji: "🌡️",
            title: "Observation",
            description: "Afternoon is warmer than morning.",
          },
        ],
      },
    },
    conclusions: {
      emoji: "💡",
      accent: "amber",
      visual: {
        type: "diagram",
        nodes: [
          { emoji: "👀", label: "Observe" },
          { emoji: "🤔", label: "Think" },
          { emoji: "✅", label: "Conclude" },
        ],
        flow: ["What did you see?", "Why did it happen?", "Answer the question"],
      },
      practiceTip: "Drawing a conclusion = understanding observations to answer a question.",
    },
    "decision-making": {
      emoji: "✅",
      accent: "emerald",
      visual: {
        type: "grid",
        items: [
          { emoji: "📚", label: "Revise more" },
          { emoji: "☂️", label: "Carry umbrella" },
          { emoji: "🛣️", label: "Quieter road" },
          { emoji: "💰", label: "Save money" },
        ],
      },
      practiceTip: "Decision-making = choosing an action after thinking about available info.",
    },
  },

  "ai-ethics": {
    overview: {
      emoji: "🛡️",
      accent: "rose",
      visual: {
        type: "steps",
        items: [
          { emoji: "🌐", title: "Digital responsibility", text: "Be safe online" },
          { emoji: "⚖️", title: "Ethics", text: "Right vs wrong" },
          { emoji: "👣", title: "Digital footprint", text: "Your online trail" },
          { emoji: "✨", title: "Good behaviour", text: "Rules to follow" },
        ],
      },
    },
    "digital-responsibility": {
      emoji: "🌐",
      accent: "cyan",
      visual: {
        type: "grid",
        items: [
          { emoji: "🎥", label: "Learn online" },
          { emoji: "📞", label: "Video calls" },
          { emoji: "🚨", label: "Emergency help" },
          { emoji: "🤝", label: "Be respectful" },
        ],
      },
      practiceTip: "Think before you click. Be careful what you share!",
    },
    ethics: {
      emoji: "⚖️",
      accent: "indigo",
      visual: {
        type: "cards",
        items: [
          {
            emoji: "✏️",
            title: "Lost pencil box?",
            description: "Return it to the owner — that's ethical!",
          },
          {
            emoji: "💻",
            title: "Computer ethics",
            description: "Rules for using computers safely & honestly.",
          },
        ],
      },
    },
    "arjun-story": {
      emoji: "⚠️",
      accent: "rose",
      visual: {
        type: "steps",
        items: [
          { emoji: "📋", title: "Copied essay", text: "Plagiarism — not his own work" },
          { emoji: "📧", title: "Clicked fake email", text: "Phishing trap!" },
          { emoji: "🦠", title: "Clicked virus pop-up", text: "Made things worse" },
          { emoji: "💔", title: "Files gone", text: "Slow computer, strange messages" },
        ],
      },
      funFact: "Always tell a parent or teacher if something online feels wrong!",
      practiceTip: "Arjun's mistakes: plagiarism + clicking suspicious links. Don't do that!",
    },
    "plagiarism-hacking": {
      emoji: "🚫",
      accent: "amber",
      visual: {
        type: "compare",
        left: {
          label: "Plagiarism",
          emoji: "📋",
          points: [
            "Copying without credit",
            "Always acknowledge the author",
            "Use your own words",
          ],
        },
        right: {
          label: "Hacking",
          emoji: "🔓",
          points: [
            "Unauthorised access to systems",
            "Use antivirus & strong passwords",
            "Don't click fake virus ads",
          ],
        },
      },
      practiceTip: "Copying from a website without credit = plagiarism!",
    },
    "phishing-spamming": {
      emoji: "📧",
      accent: "blue",
      visual: {
        type: "compare",
        left: {
          label: "Phishing 🎣",
          emoji: "🎣",
          points: [
            "Fake emails asking for passwords",
            "Never click suspicious links",
            "Check sender's email carefully",
          ],
        },
        right: {
          label: "Spamming 📨",
          emoji: "📨",
          points: [
            "Unwanted junk messages",
            "Use spam filters",
            "Don't reply to strangers",
          ],
        },
      },
      practiceTip: "'Win a free phone! Share your password' → tell your parents!",
    },
    "privacy-piracy": {
      emoji: "🔐",
      accent: "violet",
      visual: {
        type: "grid",
        items: [
          { emoji: "🔒", label: "Privacy" },
          { emoji: "💿", label: "Software piracy" },
          { emoji: "©️", label: "Copyright" },
          { emoji: "™️", label: "Trademark" },
        ],
      },
    },
    "digital-footprint": {
      emoji: "👣",
      accent: "cyan",
      visual: {
        type: "compare",
        left: {
          label: "Active footprint",
          emoji: "✍️",
          points: [
            "You choose to post online",
            "Fill forms, accept cookies",
            "Posting a project photo",
          ],
        },
        right: {
          label: "Passive footprint",
          emoji: "👁️",
          points: [
            "Collected without you noticing",
            "Location tracking, interest ads",
            "Apps using your likes",
          ],
        },
      },
      practiceTip: "Posting online on purpose = active digital footprint.",
    },
    "good-behaviour": {
      emoji: "⭐",
      accent: "emerald",
      visual: {
        type: "steps",
        items: [
          { emoji: "🤐", title: "Keep secrets safe", text: "Don't share personal info with strangers" },
          { emoji: "🔑", title: "Protect passwords", text: "Only share with parents" },
          { emoji: "📸", title: "Ask before posting", text: "Get parents' consent for photos" },
          { emoji: "🛡️", title: "Stay secure", text: "Antivirus + avoid public Wi-Fi for banking" },
        ],
      },
      practiceTip: "Install antivirus, scan weekly, and be kind online!",
    },
  },
};

const DEFAULT_META: SectionMeta = {
  emoji: "📖",
  accent: "violet",
};

export function enrichLearnSections(
  chapterId: string,
  sections: LearnSection[]
): LearnSection[] {
  const chapterMeta = AI_SECTION_META[chapterId];
  if (!chapterMeta) return sections;

  return sections.map((section) => ({
    ...section,
    ...DEFAULT_META,
    ...chapterMeta[section.id],
  }));
}

export function isAiLearnChapter(chapterId: string): boolean {
  return chapterId in AI_SECTION_META;
}
