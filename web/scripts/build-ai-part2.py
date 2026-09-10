#!/usr/bin/env python3
"""Add AI Part 2 exercises and Sachin-style detailed guides for all AI questions."""

import hashlib
import json
import random
import re
from copy import deepcopy
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data"
HANDBOOK_PATH = DATA / "handbook-extracted.json"
GUIDES_PATH = DATA / "question-guides.json"

AI_CHAPTERS = ("ai-intro", "ai-data", "ai-patterns", "ai-ethics")

TEACHER_NOTE = (
    "Confirm the official answer and ask students to explain the logic in their own words."
)


def opts(*pairs: tuple[str, str]) -> list[dict[str, str]]:
    return [{"id": oid, "text": text} for oid, text in pairs]


def mcq(
    qid: str,
    num: int,
    prompt: str,
    options: list[dict[str, str]],
    correct: str,
    page: int,
) -> dict[str, Any]:
    return {
        "id": qid,
        "num": num,
        "prompt": prompt,
        "options": options,
        "correct": correct,
        "handbookPage": page,
    }


OPTION_IDS = ("a", "b", "c", "d")


def shuffle_question_options(q: dict[str, Any]) -> dict[str, Any]:
    """Deterministically shuffle MCQ options so the correct answer is not always (a)."""
    options = list(q["options"])
    correct_id = q["correct"]
    correct_text = next(o["text"] for o in options if o["id"] == correct_id)

    rng = random.Random(int(hashlib.md5(q["id"].encode()).hexdigest(), 16))
    rng.shuffle(options)

    shuffled: list[dict[str, str]] = []
    new_correct = "a"
    for idx, opt in enumerate(options):
        oid = OPTION_IDS[idx]
        shuffled.append({"id": oid, "text": opt["text"]})
        if opt["text"] == correct_text:
            new_correct = oid

    return {**q, "options": shuffled, "correct": new_correct}


def _option_id_map(before: dict[str, Any], after: dict[str, Any]) -> dict[str, str]:
    after_by_text = {o["text"]: o["id"] for o in after["options"]}
    return {o["id"]: after_by_text[o["text"]] for o in before["options"]}


def _remap_option_refs(text: str, id_map: dict[str, str]) -> str:
    def repl(match: re.Match[str]) -> str:
        old = match.group(1)
        return f"({id_map.get(old, old)})"

    return re.sub(r"\(([abcd])\)", repl, text)


def remap_existing_guide(
    guide: dict[str, Any], before: dict[str, Any], after: dict[str, Any]
) -> dict[str, Any]:
    """Keep rich guide content but update option letters after a shuffle."""
    id_map = _option_id_map(before, after)
    g = deepcopy(guide)

    wf = g.get("wrongFeedback", {})
    g["wrongFeedback"] = {
        id_map[oid]: msg for oid, msg in wf.items() if oid in id_map
    }

    for key in ("explanation", "conclusion", "example"):
        if key in g and isinstance(g[key], str):
            g[key] = _remap_option_refs(g[key], id_map)

    for step in g.get("detailedSteps", []):
        if isinstance(step.get("content"), str):
            step["content"] = _remap_option_refs(step["content"], id_map)

    return g


def make_guide(
    explanation: str,
    steps: list[tuple[str, str]],
    conclusion: str,
    example: str,
    thinking: list[str],
    nudges: list[str],
    wrong_feedback: dict[str, str],
) -> dict[str, Any]:
    return {
        "explanation": explanation,
        "thinkingSteps": thinking,
        "nudges": nudges,
        "wrongFeedback": wrong_feedback,
        "hasOfficialAnswer": True,
        "detailedSteps": [{"heading": h, "content": c} for h, c in steps],
        "conclusion": conclusion,
        "example": example,
        "teacherNote": TEACHER_NOTE,
    }


def guide_for_mcq(
    q: dict[str, Any],
    topic: str,
    reasoning: list[tuple[str, str]],
    wrong_hints: dict[str, str],
    example: str,
) -> dict[str, Any]:
    correct_id = q["correct"]
    correct_text = next(o["text"] for o in q["options"] if o["id"] == correct_id)
    steps = list(reasoning)
    steps.append(
        (
            "Select the correct option",
            f"After eliminating wrong choices, option ({correct_id}) '{correct_text}' "
            f"best matches the handbook definition for {topic}.",
        )
    )
    while len(steps) < 4:
        steps.insert(
            1,
            (
                "Check each option against the handbook",
                "Re-read the question and compare every option to what the CBSE AI "
                "handbook (Part 2) states about this topic.",
            ),
        )
    conclusion = f"The answer is ({correct_id}) {correct_text}."
    thinking = [s[0] for s in steps[:3]]
    nudges = [
        "What key definition from the chapter applies here?",
        "Can you rule out at least two options using the handbook?",
        "Explain why your chosen answer fits the scenario.",
    ]
    wf = dict(wrong_hints)
    for opt in q["options"]:
        oid = opt["id"]
        if oid != correct_id and oid not in wf:
            wf[oid] = (
                f"Option ({oid}) does not match the handbook — "
                f"re-read the section on {topic}."
            )
    return make_guide(
        explanation=conclusion.replace("The answer is ", "").rstrip(".") + ".",
        steps=steps[:5],
        conclusion=conclusion,
        example=example,
        thinking=thinking,
        nudges=nudges,
        wrong_feedback=wf,
    )


# ---------------------------------------------------------------------------
# New question definitions (from CTAI/CTAI.txt Part 2)
# ---------------------------------------------------------------------------

def new_questions_for_chapter(chapter: str, start_num: int) -> list[dict[str, Any]]:
    if chapter == "ai-intro":
        return _ai_intro_new(start_num)
    if chapter == "ai-data":
        return _ai_data_new(start_num)
    if chapter == "ai-patterns":
        return _ai_patterns_new(start_num)
    if chapter == "ai-ethics":
        return _ai_ethics_new(start_num)
    return []


def _ai_intro_new(start: int) -> list[dict[str, Any]]:
    p = 58
    n = start
    qs: list[dict[str, Any]] = []

    fibs = [
        (
            "Intelligence includes the ability to learn and _____________ problems.",
            "solve",
            ["copy", "ignore", "memorise"],
        ),
        (
            "AI is a technique to make intelligent _________________.",
            "machines",
            ["rules", "timers", "engines only"],
        ),
        (
            "Automation works on fixed _______________ and preset instructions.",
            "rules",
            ["emotions", "labels", "rewards"],
        ),
        (
            "Unsupervised learning is mainly used for ________________.",
            "clustering",
            ["labelling emails", "fixed timers", "copying homework"],
        ),
        (
            "Machine Learning allows machines to learn from _______________.",
            "data",
            ["luck", "fixed timers", "human memory only"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(fibs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        correct_id = "a"
        qs.append(mcq(f"ai-intro-fib{i}", n, prompt, options, correct_id, p))
        n += 1

    saqs = [
        (
            "Define intelligence in your own words. Which is the best definition?",
            "The ability to learn, think, and solve problems",
            [
                "The ability to copy answers quickly",
                "Following fixed instructions without change",
                "Memorising facts without understanding",
            ],
        ),
        (
            "State two differences between automation and AI. Which pair is correct?",
            "Automation follows fixed rules; AI learns from data",
            [
                "Both always learn from experience",
                "Automation thinks; AI never changes",
                "Neither uses any instructions",
            ],
        ),
        (
            "What is reinforcement learning?",
            "Learning through trial and error using rewards and penalties",
            [
                "Learning only from labelled examples with correct answers",
                "Grouping data without any labels",
                "Copying data without understanding patterns",
            ],
        ),
        (
            "Name the three types of Machine Learning.",
            "Supervised, Unsupervised, and Reinforcement learning",
            [
                "Numerical, Text, and Image learning",
                "Fast, Slow, and Medium learning",
                "Human, Animal, and Machine learning",
            ],
        ),
        (
            "Give two examples of AI used in daily life.",
            "Voice assistants and face recognition",
            [
                "Microwave timers and standard traffic lights",
                "Fixed washing-machine cycles only",
                "Manual chalkboards and paper notebooks",
            ],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(saqs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-intro-saq{i}", n, prompt, options, "a", p))
        n += 1

    applies = [
        (
            "Grouping customers based on shopping habits without labels uses which type of learning?",
            "Unsupervised learning",
            ["Supervised learning", "Reinforcement learning", "No machine learning"],
        ),
        (
            "Predicting house prices based on past labelled data uses which type of learning?",
            "Supervised learning",
            ["Unsupervised learning", "Reinforcement learning", "Random guessing"],
        ),
        (
            "A game AI improving after winning or losing uses which type of learning?",
            "Reinforcement learning",
            ["Supervised learning", "Unsupervised learning", "Fixed-rule automation"],
        ),
        (
            "Sorting emails into spam and not spam uses which type of learning?",
            "Supervised learning",
            ["Unsupervised learning", "Reinforcement learning", "Automation only"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(applies, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-intro-apply{i}", n, prompt, options, "a", p))
        n += 1

    classifies = [
        ("Traffic light changing at fixed intervals", "Automation", ["AI", "Machine Learning", "Reinforcement learning"]),
        ("Face Recognition System", "AI", ["Automation", "Fixed rules only", "Manual counting"]),
        ("Washing machine with preset timer", "Automation", ["AI", "Supervised learning", "Unsupervised learning"]),
        ("Voice assistant answering questions", "AI", ["Automation", "Fixed timer device", "Non-learning machine"]),
    ]
    for i, (item, correct, wrongs) in enumerate(classifies, 1):
        prompt = f"Classify: '{item}' — is this AI or Automation?"
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-intro-class{i}", n, prompt, options, "a", 59))
        n += 1

    return qs


def _ai_data_new(start: int) -> list[dict[str, Any]]:
    p = 68
    n = start
    qs: list[dict[str, Any]] = []

    fibs = [
        ("Data means raw _____________ and figures.", "information", ["stories", "guesses", "emotions"]),
        ("Tables arrange data in rows and _____________.", "columns", ["circles", "random piles", "passwords"]),
        ("Text data is made up of letters, words, and _____________.", "sentences", ["numbers only", "videos only", "temperatures"]),
        ("Grouping similar kinds of data is called _____________.", "classification", ["spamming", "hacking", "phishing"]),
        ("Saving data in secure systems is known as _____________.", "storage", ["deletion", "guessing", "spamming"]),
    ]
    for i, (prompt, correct, wrongs) in enumerate(fibs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-data-fib{i}", n, prompt, options, "a", p))
        n += 1

    saqs = [
        (
            "What is Data? Choose the best definition.",
            "Raw information that can be processed and analysed for insights",
            ["Only numbers written on paper", "Random guesses without facts", "Entertainment content only"],
        ),
        (
            "State any two important aspects of Data in daily life.",
            "Decision making and personalised user experience",
            ["Only playing games", "Ignoring past results", "Avoiding all measurements"],
        ),
        (
            "Name the four main types of Data mentioned in the handbook.",
            "Numerical, Text, Image, and Sound data",
            ["Only video and automation", "AI, CT, and robotics only", "Rows, columns, and charts only"],
        ),
        (
            "What is the difference between a table and a chart?",
            "Tables show exact values in rows and columns; charts show visual comparisons",
            ["They are exactly the same", "Charts never use numbers", "Tables cannot organise information"],
        ),
        (
            "Define classification and labelling in Organising Data.",
            "Classification groups similar data; labelling gives clear descriptive names",
            ["Classification deletes files; labelling hides data", "Both mean copying data illegally", "Neither helps organisation"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(saqs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-data-saq{i}", n, prompt, options, "a", p))
        n += 1

    applies = [
        (
            "A student measures the height of a plant every week. What type of data is being collected?",
            "Numerical data",
            ["Image data", "Text data", "Sound data"],
        ),
        (
            "A teacher wants to compare the marks of students clearly. Should she use a table or a bar chart?",
            "Bar chart — it makes visual comparison of categories easy",
            ["Table only — charts never help", "Neither — ignore the data", "Random list with no structure"],
        ),
        (
            "A shopping app suggests products based on your previous searches. How is data being used?",
            "To personalise recommendations using your past activity",
            ["To delete your account automatically", "Only for entertainment with no pattern", "To ignore your preferences"],
        ),
        (
            "Your desktop has many mixed files with random names. What is the best organising step?",
            "Classify files into folders and use clear labels",
            ["Delete everything immediately", "Leave files random forever", "Share all files publicly online"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(applies, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-data-apply{i}", n, prompt, options, "a", p))
        n += 1

    classifies = [
        ("Exam Marks", "Numerical Data", ["Text Data", "Sound Data", "Video Data"]),
        ("A voice message", "Sound Data", ["Image Data", "Numerical Data only", "Video Data only"]),
        ("School ID photo", "Image Data", ["Text Data", "Numerical Data", "Sound Data"]),
        ("Your home address", "Text Data", ["Image Data", "Numerical Data", "Video Data"]),
        ("Number of students in the class", "Numerical Data", ["Text Data", "Image Data", "Sound Data"]),
    ]
    for i, (item, correct, wrongs) in enumerate(classifies, 1):
        prompt = f"Classify the data type for: '{item}'"
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-data-class{i}", n, prompt, options, "a", 69))
        n += 1

    return qs


def _ai_patterns_new(start: int) -> list[dict[str, Any]]:
    p = 74
    n = start
    qs: list[dict[str, Any]] = []

    fibs = [
        ("A pattern is a repeated and predictable _____________ of elements.", "sequence", ["accident", "password", "virus"]),
        ("Identifying patterns means looking for repeated _____________ or similarities in data.", "sequences", ["errors only", "spam emails", "deleted files"]),
        ("Making observations from data means looking for patterns, trends, and ____________ findings.", "key", ["hidden", "illegal", "random"]),
        ("Drawing a conclusion means understanding observations to answer a _____________.", "question", ["virus", "password", "advertisement"]),
        ("Decision making means choosing an action after thinking carefully about the _____________ available.", "information", ["weather only", "colours only", "noise"]),
    ]
    for i, (prompt, correct, wrongs) in enumerate(fibs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-patterns-fib{i}", n, prompt, options, "a", p))
        n += 1

    saqs = [
        (
            "Define a pattern and give one example from daily life. Best answer:",
            "A regular repeated sequence — e.g. morning routine of wake, brush, breakfast",
            ["A one-time accident", "A computer virus", "Copying without thinking"],
        ),
        (
            "Name two methods to recognise repeated actions or events.",
            "Sorting and filtering; time series analysis",
            ["Hacking and phishing", "Spamming and piracy", "Deleting all data"],
        ),
        (
            "Why is predictability important when identifying patterns?",
            "It helps forecast what may happen next based on the pattern",
            ["It makes data impossible to read", "It removes all observations", "It prevents any conclusions"],
        ),
        (
            "What is statistical analysis used for when studying large datasets?",
            "To group similar data, find connections, and understand relationships",
            ["To delete all observations", "To avoid drawing conclusions", "Only to hide irregularities"],
        ),
        (
            "Explain the difference between making an observation and drawing a conclusion.",
            "Observation notes what you see; conclusion explains what it means",
            ["They are exactly the same step", "Conclusion comes before observation", "Neither uses data"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(saqs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-patterns-saq{i}", n, prompt, options, "a", p))
        n += 1

    applies = [
        (
            "A student measures plant height every week. What is the student mainly doing with the data?",
            "Collecting numerical measurements to observe growth over time",
            ["Posting private information online", "Deleting all records", "Ignoring any pattern"],
        ),
        (
            "A student notices afternoon temperatures are higher than mornings for several days. What is this?",
            "Making an observation from data",
            ["Drawing a final legal verdict", "Hacking a weather server", "Random guessing"],
        ),
        (
            "A student notices daily practice improves basketball performance. What decision follows?",
            "Continue practising regularly to keep improving",
            ["Stop practising entirely", "Ignore all past performance", "Act without thinking"],
        ),
        (
            "A class survey shows more students like cricket than football. What can the teacher conclude?",
            "Cricket is more popular in this class based on the survey",
            ["No student likes any sport", "The survey data should be hidden", "Football is equally popular"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(applies, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-patterns-apply{i}", n, prompt, options, "a", p))
        n += 1

    classifies = [
        ("Watching daily rainfall for a month", "Time series analysis", ["Sorting and filtering", "Phishing", "Plagiarism"]),
        ("Arranging students by height", "Sorting and filtering", ["Reinforcement learning", "Spamming", "Hacking"]),
        ("Using graphs to compare sales", "Data visualisation", ["Software piracy", "Password theft", "Plagiarism"]),
        ("Studying trends over five years", "Time series analysis", ["Copying homework", "Ignoring data", "Random clicking"]),
        ("Using an algorithm to recognise faces", "Machine learning", ["Fixed timer automation", "Manual guesswork only", "Deleting datasets"]),
    ]
    for i, (item, correct, wrongs) in enumerate(classifies, 1):
        prompt = f"Identify the method used: '{item}'"
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-patterns-class{i}", n, prompt, options, "a", 75))
        n += 1

    return qs


def _ai_ethics_new(start: int) -> list[dict[str, Any]]:
    p = 81
    n = start
    qs: list[dict[str, Any]] = []

    fibs = [
        ("Responsible use of technology means thinking before you _____________ online.", "click", ["share passwords", "download illegally", "ignore parents"]),
        ("Never give out your _____________ information to strangers online.", "personal", ["favourite colour", "homework topic", "class timetable only"]),
        ("Ethics in technology help prevent _____________, plagiarism, and hacking.", "cybercrimes", ["learning", "kindness", "teamwork"]),
        ("A phishing attempt is an illegal attempt to obtain _____________ information.", "confidential", ["public weather", "classroom seating", "sports scores"]),
        ("Active digital footprints are created when you _____________ online intentionally.", "post", ["sleep", "eat lunch", "walk in the park offline"]),
    ]
    for i, (prompt, correct, wrongs) in enumerate(fibs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-ethics-fib{i}", n, prompt, options, "a", p))
        n += 1

    saqs = [
        (
            "Define responsible Digital Citizenship and give one example.",
            "Using technology wisely and respectfully — e.g. thinking before posting online",
            ["Sharing passwords with strangers", "Clicking every pop-up ad", "Copying essays without credit"],
        ),
        (
            "Name two ways to protect your privacy online.",
            "Limit personal sharing and read privacy policies before signing up",
            ["Post your full address publicly", "Share bank details in chat", "Use weak passwords forever"],
        ),
        (
            "What is the difference between active and passive digital footprints?",
            "Active footprints come from intentional posts; passive from background tracking",
            ["They are identical", "Passive means you never use the internet", "Active footprints cannot be created"],
        ),
        (
            "Why use strong passwords and change them periodically?",
            "To prevent unauthorized access and protect accounts from hacking",
            ["To make login impossible for yourself", "Because weak passwords are encouraged", "Passwords do not matter online"],
        ),
        (
            "Explain software piracy and one step to prevent it.",
            "Unauthorized copying of software — prevent by buying licensed copies",
            ["Sharing licensed copies freely is legal", "Piracy means helping authors", "Download only from unknown sites"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(saqs, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-ethics-saq{i}", n, prompt, options, "a", p))
        n += 1

    applies = [
        (
            "A student posts a picture of a school project online. Which type of digital footprint is this?",
            "Active digital footprint",
            ["Passive digital footprint", "Hacker footprint", "Phishing footprint"],
        ),
        (
            "Your friend receives an email asking for bank details. What should they do?",
            "Do not share details and inform a parent or guardian",
            ["Reply with full bank information", "Post the email publicly", "Click every link in the email"],
        ),
        (
            "A social media app recommends content based on your likes. How is your data used?",
            "To personalise content using your interests and activity",
            ["To delete your account without notice", "Only to print homework", "Data is never collected"],
        ),
        (
            "You want to download a new game safely. What steps should you follow?",
            "Use official stores, check permissions, and ask a parent if unsure",
            ["Download from random pop-up links", "Disable antivirus first", "Share your password to unlock"],
        ),
        (
            "Someone copies your school assignment without permission. Which ethical rule is broken?",
            "Plagiarism / intellectual property violation",
            ["Responsible digital citizenship", "Good password hygiene", "Active digital footprint creation"],
        ),
    ]
    for i, (prompt, correct, wrongs) in enumerate(applies, 1):
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-ethics-apply{i}", n, prompt, options, "a", p))
        n += 1

    classifies = [
        (
            "Sending fake emails or messages to steal personal information",
            "Phishing",
            ["Plagiarism", "Digital footprint", "Ethics"],
        ),
        (
            "Copying someone else's work without giving due credit",
            "Plagiarism",
            ["Phishing", "Privacy policy", "Firewall"],
        ),
        (
            "The record of all your online activities including posts and visits",
            "Digital footprint",
            ["Spam filter", "Antivirus scan", "Bar chart"],
        ),
        (
            "Rules and morals for using computers and the internet responsibly",
            "Computer ethics",
            ["Machine learning", "Time series analysis", "Numerical data"],
        ),
        (
            "A document explaining how a website collects and protects user data",
            "Privacy policy",
            ["Phishing email", "Pictogram", "Reinforcement learning"],
        ),
    ]
    for i, (desc, correct, wrongs) in enumerate(classifies, 1):
        prompt = f"Identify the term: {desc}"
        options = opts(("a", correct), ("b", wrongs[0]), ("c", wrongs[1]), ("d", wrongs[2]))
        qs.append(mcq(f"ai-ethics-class{i}", n, prompt, options, "a", 82))
        n += 1

    return qs


# ---------------------------------------------------------------------------
# Enhanced guides for existing 20 AI MCQs (4–5 Sachin-style steps)
# ---------------------------------------------------------------------------

EXISTING_AI_GUIDES: dict[str, dict[str, Any]] = {
    "ai-intro-mcq1": make_guide(
        explanation="Labelled data has predefined tags so models learn input-to-label relationships.",
        steps=[
            ("Read the definition in the handbook", "The CBSE handbook defines labelled data as information that already has a correct tag or category attached — like student names written on test notebooks."),
            ("Contrast with unlabelled data", "Unlabelled data has no tags; the system must discover structure on its own. Random or 'incorrect' are not definitions of labelled data."),
            ("Connect to supervised learning", "Supervised learning needs labelled examples (e.g. spam vs not spam) so the model learns which inputs map to which outputs."),
            ("Eliminate wrong options", "Option (a) describes unlabelled data. Options (c) and (d) are not technical definitions used in the chapter."),
            ("Select the correct answer", "Option (b) 'Data with predefined labels or tags' matches the handbook exactly."),
        ],
        conclusion="The answer is (b) Data with predefined labels or tags.",
        example="Emails marked 'spam' or 'not spam' before training are labelled data.",
        thinking=["Define labelled data", "Contrast with unlabelled", "Pick the matching option"],
        nudges=["Does each example already have a correct answer?", "Which option mentions tags or labels?", "Eliminate random and incorrect."],
        wrong_feedback={"a": "Without tags, data is unlabelled.", "c": "Random data has no structure.", "d": "Incorrect is not the definition of labelled."},
    ),
    "ai-intro-mcq2": make_guide(
        explanation="Alan Turing introduced the Turing Test in 1950.",
        steps=[
            ("Recall what the Turing Test measures", "The Turing Test checks whether a machine's responses are indistinguishable from a human's — a benchmark for machine intelligence."),
            ("Match scientists to their contributions", "John McCarthy coined the term 'AI'; Charles Babbage designed early mechanical computers; Isaac Newton worked in physics."),
            ("Use the name clue", "The test is named after the scientist who proposed it — Turing."),
            ("Eliminate distractors", "McCarthy named AI but did not create this test. Babbage and Newton worked in other fields."),
            ("Confirm the answer", "Alan Turing introduced the Turing Test — option (b)."),
        ],
        conclusion="The answer is (b) Alan Turing.",
        example="In 1950, Turing asked: 'Can machines think?' and proposed the imitation game we now call the Turing Test.",
        thinking=["Connect test to inventor", "Recall other scientists", "Pick Alan Turing"],
        nudges=["The test shares his surname.", "Not the person who invented the word AI.", "Look for Alan ___"],
        wrong_feedback={"a": "McCarthy named AI but did not create this test.", "c": "Babbage worked on mechanical computers.", "d": "Newton worked in physics."},
    ),
    "ai-intro-mcq3": make_guide(
        explanation="Supervised learning uses labelled data — each example has a known correct output.",
        steps=[
            ("Understand 'supervised'", "Supervised means a teacher provides correct answers. The model learns from input-output pairs."),
            ("Identify required data type", "Because correct outputs are given during training, the data must be labelled."),
            ("Compare learning types", "Unsupervised uses unlabelled data; reinforcement uses rewards, not pre-tagged answers."),
            ("Rule out wrong choices", "Unlabelled, random, and deleted do not describe supervised training data."),
            ("Select labelled", "Option (c) Labelled is correct."),
        ],
        conclusion="The answer is (c) Labelled.",
        example="Training a model on past exam papers with marks written on each paper uses labelled data.",
        thinking=["Supervised implies correct answers", "Contrast with unsupervised", "Choose labelled"],
        nudges=["If you know the right answer for each example, is it labelled?", "Unsupervised means no tags.", "Reinforcement uses rewards."],
        wrong_feedback={"a": "Unlabelled is unsupervised.", "b": "Random does not describe supervised data.", "d": "Deleted is not a data type here."},
    ),
    "ai-intro-mcq4": make_guide(
        explanation="Predicting marks from past marked papers is supervised learning.",
        steps=[
            ("Identify the task", "The goal is to predict exam marks — a specific numerical output for each input (student paper)."),
            ("Check for known outputs in training data", "Past papers already have marks attached. Each training example has a label (the mark)."),
            ("Match to learning type", "Learning from labelled examples to predict outputs is supervised learning."),
            ("Eliminate other types", "Unsupervised finds groups without targets. Reinforcement learns from rewards in trial-and-error."),
            ("Confirm supervised learning", "Option (a) Supervised Learning is correct."),
        ],
        conclusion="The answer is (a) Supervised Learning.",
        example="House price prediction from labelled past sales is another supervised learning example from the handbook.",
        thinking=["Is there a known output?", "Prediction from labelled history", "Match scenario to type"],
        nudges=["Do we have old papers with marks?", "Unsupervised finds groups without targets.", "Reinforcement uses trial-and-error rewards."],
        wrong_feedback={"b": "Unsupervised does not predict a labelled target.", "c": "Reinforcement uses environment rewards.", "d": "Only one type best fits."},
    ),
    "ai-intro-mcq5": make_guide(
        explanation="A traditional traffic signal follows fixed timers — automation, not AI.",
        steps=[
            ("Define AI vs automation", "AI learns from data and can adapt. Automation follows fixed rules with the same output every time."),
            ("Evaluate voice assistant", "Uses natural language understanding — an AI application."),
            ("Evaluate face recognition", "Learns patterns from data to identify faces — AI."),
            ("Evaluate traditional traffic signal", "Changes at preset intervals without learning or adapting — pure automation."),
            ("Select the non-AI device", "Option (c) Traditional traffic signal is not AI."),
        ],
        conclusion="The answer is (c) Traditional traffic signal.",
        example="A microwave heating for a set time is automation; a smart traffic system that adapts to real-time traffic is closer to AI.",
        thinking=["AI adapts or learns", "Fixed timers do not learn", "Find the non-learning device"],
        nudges=["Does a normal traffic light learn?", "Voice assistants use ML.", "Which device always does the same thing?"],
        wrong_feedback={"a": "Voice assistants use AI.", "b": "Face recognition learns from data.", "d": "Smart chatbots use language models."},
    ),
    "ai-data-mcq1": make_guide(
        explanation="Analysing exam results to improve teaching is using data for decision-making.",
        steps=[
            ("Identify the data source", "Last year's exam results are real collected data — marks, subjects, performance patterns."),
            ("Identify the goal", "The teacher wants to improve teaching methods — a decision based on evidence."),
            ("Distinguish from guesswork", "The teacher is not guessing randomly; they study past results to see what worked."),
            ("Match to handbook concept", "The Data chapter states data helps make better decisions by studying past patterns."),
            ("Select data-driven decision", "Option (b) Using data for decision-making is correct."),
        ],
        conclusion="The answer is (b) Using data for decision-making.",
        example="A store owner using sales records to decide which items to stock is the same kind of data-driven decision.",
        thinking=["Is real information collected?", "Goal is a better teaching decision", "Match to data-driven choice"],
        nudges=["Are exam results data?", "Is the teacher guessing?", "Which option is evidence-based?"],
        wrong_feedback={"a": "Guesswork ignores data.", "c": "Random selection does not analyse.", "d": "This is purposeful analysis, not entertainment."},
    ),
    "ai-data-mcq2": make_guide(
        explanation="Step counts are numerical data collected by the fitness app.",
        steps=[
            ("Identify what is measured", "Daily steps are counted numbers — quantities you can add, average, and compare."),
            ("Classify the data type", "Numbers and measured values are numerical data in the handbook."),
            ("Rule out other types", "Steps are not images, text sentences, or audio recordings."),
            ("Connect to the app feature", "Weekly progress charts plot numerical step counts over time."),
            ("Answer numerical data", "Option (c) Numerical Data is correct."),
        ],
        conclusion="The answer is (c) Numerical Data.",
        example="Your exam marks and the number of trees planted are also numerical data.",
        thinking=["What format is step-count data?", "Numerical = measured numbers", "Match to the data type"],
        nudges=["Can you add and average step counts?", "Is it a picture or a number?", "Daily steps are quantities."],
        wrong_feedback={"a": "Image data is visual, not step counts.", "b": "Text data is words, not numbers.", "d": "Sound data is audio."},
    ),
    "ai-data-mcq3": make_guide(
        explanation="A weather app forecasting rain from satellite data shows data helps make future predictions.",
        steps=[
            ("State what the app does", "It predicts future rain — a forward-looking forecast, not just recording the past."),
            ("Identify the data used", "Satellite and weather station data feed the prediction model."),
            ("Link data to purpose", "The handbook explains that data enables predictions about future conditions."),
            ("Eliminate irrelevant options", "Games, story writing, and messaging are not the primary purpose here."),
            ("Select future predictions", "Option (b) Making future predictions is correct."),
        ],
        conclusion="The answer is (b) Making future predictions.",
        example="Map apps using traffic data to predict faster routes is another prediction use of data.",
        thinking=["What is the app doing with data?", "Forecasting looks ahead", "Match purpose to option"],
        nudges=["Is the app predicting the future?", "Satellite data feeds forecasts.", "Which option describes prediction?"],
        wrong_feedback={"a": "Games are unrelated here.", "c": "Writing stories is not the main use.", "d": "Messaging is not what the app does."},
    ),
    "ai-data-mcq4": make_guide(
        explanation="A security camera recording continuously collects video data.",
        steps=[
            ("Describe the camera output", "A security camera records moving pictures of activities over time."),
            ("Distinguish video from image", "A single photo is image data; continuous recording with motion is video data."),
            ("Rule out text and numbers", "The primary output is not words or counts."),
            ("Apply handbook definitions", "Video data = moving visuals, sometimes with sound."),
            ("Select video data", "Option (b) Video Data is correct."),
        ],
        conclusion="The answer is (b) Video Data.",
        example="CCTV footage at a school gate and online meeting recordings are video data examples from the handbook.",
        thinking=["What does a camera record?", "Video = moving visual data", "Distinguish from static image"],
        nudges=["Does the camera capture still photos only?", "Continuous recording is video.", "Which data type is moving pictures?"],
        wrong_feedback={"a": "Text is words, not video.", "c": "A single photo is image data; continuous recording is video.", "d": "Numerical data is numbers."},
    ),
    "ai-data-mcq5": make_guide(
        explanation="A photograph is visual image data; name, address, and age are text or numbers.",
        steps=[
            ("Define image data", "Image data consists of pictures, drawings, or photos — visual information."),
            ("Test your name", "Your name is written text — text data."),
            ("Test your address", "An address uses letters and words — text data."),
            ("Test your age", "Age is a number — numerical data."),
            ("Pick the photograph", "A photograph is image data — option (d)."),
        ],
        conclusion="The answer is (d) Your photograph.",
        example="A picture of your pet or emojis in chat are image data examples from the chapter.",
        thinking=["Define image data", "Test each personal detail", "Pick the visual example"],
        nudges=["Which option is a picture?", "Names and addresses are text.", "Age is a number."],
        wrong_feedback={"a": "Your name is text data.", "b": "Your address is text data.", "c": "Your age is numerical data."},
    ),
    "ai-patterns-mcq1": make_guide(
        explanation="A fixed morning routine (wake, brush, breakfast) is a pattern.",
        steps=[
            ("List the actions", "Wake up → brush teeth → eat breakfast — same order every morning."),
            ("Check for repetition", "The sequence repeats daily in the same order."),
            ("Apply the pattern definition", "A pattern is a regular, repeated, predictable sequence of actions."),
            ("Eliminate alternatives", "It is not random, a one-time event, or a mistake."),
            ("Select pattern", "Option (b) A pattern is correct."),
        ],
        conclusion="The answer is (b) A pattern.",
        example="Number sequences like 2, 4, 6, 8 and daily school schedules are other patterns from the chapter.",
        thinking=["List the repeated actions", "Check for regularity", "Match to pattern definition"],
        nudges=["Does the same order repeat every day?", "Is it predictable?", "Which option means a repeated sequence?"],
        wrong_feedback={"a": "Random actions do not repeat predictably.", "c": "This happens daily, not once.", "d": "A routine is intentional, not a mistake."},
    ),
    "ai-patterns-mcq2": make_guide(
        explanation="Making observations means looking for patterns and key findings in data.",
        steps=[
            ("Understand 'observation'", "Observation is carefully examining data to see what it shows — without changing it."),
            ("Identify the goal", "You look for patterns, trends, and important findings (key numbers or relationships)."),
            ("Contrast with wrong actions", "You should not change data, guess without evidence, or hide results."),
            ("Use handbook examples", "Noticing higher afternoon temperatures or more cricket fans are observations."),
            ("Select looking for patterns", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Looking for patterns and key findings.",
        example="'Temperature is higher in the afternoon than morning' is an observation from weather data.",
        thinking=["What does observing mean?", "Look for patterns", "Avoid changing data"],
        nudges=["Do you alter the data when observing?", "What are you trying to spot?", "Key findings matter."],
        wrong_feedback={"a": "Changing data is not observation.", "c": "Guessing skips careful analysis.", "d": "Hiding results is unethical."},
    ),
    "ai-patterns-mcq3": make_guide(
        explanation="Arranging data by attributes to find similar groups is sorting and filtering.",
        steps=[
            ("Read the question carefully", "We arrange data by attributes (like size, colour, score) to find groups."),
            ("Recall handbook methods", "Sorting and filtering organises data so similar items appear together."),
            ("Distinguish from ML", "Machine learning is broader model training — not the basic organising step described."),
            ("Rule out entertainment and vague prediction", "Neither fits the definition of arranging by attributes."),
            ("Answer sorting and filtering", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Sorting and Filtering.",
        example="Arranging students by height or sorting products by category uses sorting and filtering.",
        thinking=["What does arranging by attributes mean?", "Recall organising methods", "Pick sorting and filtering"],
        nudges=["Are you grouping similar items?", "Does the handbook mention sorting?", "ML is a bigger technique."],
        wrong_feedback={"a": "Machine learning is training models, not basic sorting.", "c": "Entertainment is unrelated.", "d": "Prediction comes after understanding patterns."},
    ),
    "ai-patterns-mcq4": make_guide(
        explanation="Drawing a conclusion means understanding and applying observations to answer a question.",
        steps=[
            ("Separate observation from conclusion", "Observation: what you see. Conclusion: what it means for your question."),
            ("Apply the handbook definition", "A conclusion uses observations to answer the question you were investigating."),
            ("Reject copying or confusion", "Conclusions require thinking, not copying raw data or creating confusion."),
            ("Use a class example", "Survey shows more cricket fans → conclusion: cricket is most popular in class."),
            ("Select understanding and applying", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Understanding and applying observations.",
        example="After observing low test marks, concluding 'I should revise this subject more' applies the observation.",
        thinking=["Observation vs conclusion", "Answer the question", "Apply what you learned"],
        nudges=["Does a conclusion explain meaning?", "Can you copy data and stop?", "What question were you answering?"],
        wrong_feedback={"a": "Copying data is not concluding.", "c": "Conclusions reduce confusion.", "d": "Repeating data is not the same as concluding."},
    ),
    "ai-patterns-mcq5": make_guide(
        explanation="Decision-making means choosing an action after thinking carefully about available information.",
        steps=[
            ("Define decision-making", "You weigh options and pick an action based on facts and observations."),
            ("Contrast with poor choices", "Acting without thinking, ignoring facts, or random guessing are not good decision-making."),
            ("Connect to daily examples", "Carrying an umbrella after seeing clouds is a decision based on observation."),
            ("Apply to the question", "The handbook stresses thinking carefully before choosing."),
            ("Select choosing after thinking", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Choosing an action after thinking.",
        example="Practising daily after noticing improvement in basketball is a decision based on observation.",
        thinking=["What is a decision?", "Think before acting", "Use available information"],
        nudges=["Do you ignore facts when deciding?", "Is random guessing a decision strategy?", "Which option mentions thinking?"],
        wrong_feedback={"a": "Good decisions require thinking.", "c": "Ignoring facts leads to poor choices.", "d": "Random guessing is not decision-making."},
    ),
    "ai-ethics-mcq1": make_guide(
        explanation="Copying website text without credit is plagiarism.",
        steps=[
            ("Identify the action", "Taking someone else's writing and using it without attribution."),
            ("Match to unethical practices", "The handbook lists plagiarism as copying without referring to the original author."),
            ("Distinguish from other crimes", "Hacking is unauthorized access; spamming is junk mail; phishing steals credentials."),
            ("Recall prevention steps", "Give credit, use quotation marks, express ideas in your own words."),
            ("Select plagiarism", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Plagiarism.",
        example="Arjun copying an online essay for his Save Water project without credit is plagiarism.",
        thinking=["What is copying without credit?", "Name the unethical practice", "Eliminate hacking and phishing"],
        nudges=["Did the author get credit?", "Which term means copying work?", "Hacking is breaking into systems."],
        wrong_feedback={"a": "Hacking is unauthorized system access.", "c": "Spamming is unwanted mass messages.", "d": "Phishing steals information via fake messages."},
    ),
    "ai-ethics-mcq2": make_guide(
        explanation="Tell a parent or guardian — never share your password for a 'free phone' offer.",
        steps=[
            ("Recognise the red flag", "Legitimate companies never ask for your password to give a free prize."),
            ("Identify the threat type", "This is a phishing/scam message trying to steal credentials."),
            ("Evaluate each response", "Sending, posting, or giving fake info still engages with the scam."),
            ("Apply safe behaviour", "Inform parents or guardians so they can help you stay safe."),
            ("Choose inform parents", "Option (b) is correct."),
        ],
        conclusion="The answer is (b) Inform your parents.",
        example="Arjun should have told an adult before clicking suspicious gaming emails.",
        thinking=["Spot the scam", "Never share passwords", "Get adult help"],
        nudges=["Would a real company ask for your password?", "Who can help you stay safe?", "Is posting online wise?"],
        wrong_feedback={"a": "Never send passwords to strangers.", "c": "Posting spreads the scam.", "d": "Fake info still engages with the scammer."},
    ),
    "ai-ethics-mcq3": make_guide(
        explanation="Ignore suspicious pop-ups promising prizes — they are often scams or malware.",
        steps=[
            ("Analyse the pop-up", "Combining 'scan viruses' with 'win $1000' is a classic scareware/scam tactic."),
            ("Recall handbook advice", "Do not click ads that claim to scan viruses on your computer."),
            ("Compare actions", "Clicking or downloading can install malware. Asking others still risks spread."),
            ("Choose the safest path", "Ignore the pop-up and close it safely; tell an adult if needed."),
            ("Select ignore", "Option (b) Ignore is correct."),
        ],
        conclusion="The answer is (b) Ignore.",
        example="Arjun's problems started after clicking similar pop-up ads on his computer.",
        thinking=["Recognise scareware", "Do not click suspicious ads", "Ignore and stay safe"],
        nudges=["Do prizes and virus scans together sound trustworthy?", "What did Arjun click?", "Which action avoids malware?"],
        wrong_feedback={"a": "Clicking may install malware.", "c": "Still risky — ignore first.", "d": "Downloading unknown scanners is dangerous."},
    ),
    "ai-ethics-mcq4": make_guide(
        explanation="Use a secure private network for banking — not public Wi-Fi.",
        steps=[
            ("Understand public Wi-Fi risk", "Airport or café networks may be insecure; others could intercept data."),
            ("Identify sensitive activity", "Checking bank accounts requires maximum security."),
            ("Apply handbook guidance", "Avoid public Wi-Fi for email or banking; use a secure network."),
            ("Eliminate unsafe options", "Checking now, asking strangers, or installing random apps increase risk."),
            ("Select secure network", "Option (b) Use secure network is correct."),
        ],
        conclusion="The answer is (b) Use secure network.",
        example="Wait until you are on home Wi-Fi or use mobile data with a trusted connection for banking.",
        thinking=["Public Wi-Fi risks", "Banking needs security", "Choose secure network"],
        nudges=["Can strangers on the same Wi-Fi see your traffic?", "Is checking now worth the risk?", "What does the handbook recommend?"],
        wrong_feedback={"a": "Public Wi-Fi may expose bank details.", "c": "Others may not know security either.", "d": "Random apps can be malware."},
    ),
    "ai-ethics-mcq5": make_guide(
        explanation="Posting intentionally online creates an active digital footprint.",
        steps=[
            ("Define digital footprint", "Records left by your online activity — posts, likes, visits."),
            ("Distinguish active vs passive", "Active = choices you make (posting). Passive = background tracking without your intent."),
            ("Apply to the scenario", "Posting helpful tips while thinking about the audience is a deliberate online action."),
            ("Eliminate nonsense options", "Hacker footprint and phishing footprint are not standard terms."),
            ("Select active footprint", "Option (a) Active footprint is correct."),
        ],
        conclusion="The answer is (a) Active footprint.",
        example="Filling a form or posting a project photo online are active footprints.",
        thinking=["Active vs passive footprints", "Posting is intentional", "Pick active footprint"],
        nudges=["Did you choose to post?", "Passive is often background tracking.", "Which footprint type is intentional?"],
        wrong_feedback={"b": "Passive footprints are often unintentional tracking.", "c": "Hacker footprint is not a standard term.", "d": "Phishing footprint is not a standard term."},
    ),
}


def build_guide_for_new_question(q: dict[str, Any], chapter: str) -> dict[str, Any]:
    qid = q["id"]
    correct_id = q["correct"]
    correct_text = next(o["text"] for o in q["options"] if o["id"] == correct_id)

    kind = "concept"
    if "-fib" in qid:
        kind = "fill in the blank"
    elif "-saq" in qid:
        kind = "short answer"
    elif "-apply" in qid:
        kind = "think and apply"
    elif "-class" in qid:
        kind = "classify"

    steps = [
        (
            "Read the question and recall the handbook",
            f"This is a {kind} question from CBSE AI Part 2 ({chapter}). "
            f"Open the matching section in CTAI/CTAI.txt and recall the definition or example.",
        ),
        (
            "State what the question is asking",
            f"Restate the prompt in your own words: '{q['prompt'][:120]}...' "
            f"Identify the key term or scenario being tested.",
        ),
        (
            "Apply chapter reasoning",
            "Use the handbook's definitions, tables, and examples to decide which option "
            "satisfies every part of the question.",
        ),
        (
            "Eliminate wrong options with logic",
            "For each remaining option, ask: does this contradict the handbook? "
            "Cross out choices that describe a different concept, data type, or unsafe action.",
        ),
        (
            "Confirm the best answer",
            f"Option ({correct_id}) '{correct_text}' is the only choice fully supported by the handbook.",
        ),
    ]

    wf: dict[str, str] = {}
    for opt in q["options"]:
        oid = opt["id"]
        if oid != correct_id:
            wf[oid] = (
                f"'{opt['text']}' does not match the handbook answer for this {kind} — "
                "re-check the chapter text."
            )

    return make_guide(
        explanation=f"{correct_text} — based on the CBSE AI handbook Part 2.",
        steps=steps,
        conclusion=f"The answer is ({correct_id}) {correct_text}.",
        example=f"When studying {kind} questions in {chapter}, always tie your reasoning to a specific handbook example.",
        thinking=[s[0] for s in steps[:3]],
        nudges=[
            "Which handbook page covers this topic?",
            "Can you eliminate two options quickly?",
            "Explain your choice using a chapter vocabulary word.",
        ],
        wrong_feedback=wf,
    )


def merge_questions(handbook: dict[str, list], chapter: str) -> int:
    existing = handbook.get(chapter, [])
    existing_ids = {q["id"] for q in existing}
    start_num = max((q.get("num", 0) for q in existing), default=0) + 1
    added = 0
    for q in new_questions_for_chapter(chapter, start_num):
        if q["id"] not in existing_ids:
            existing.append(q)
            existing_ids.add(q["id"])
            added += 1
    handbook[chapter] = existing
    return added


def main() -> None:
    handbook: dict[str, list] = json.loads(HANDBOOK_PATH.read_text())
    guides: dict[str, dict] = json.loads(GUIDES_PATH.read_text())

    total_added = 0
    for chapter in AI_CHAPTERS:
        total_added += merge_questions(handbook, chapter)

    ai_guide_count = 0
    detailed_count = 0
    per_chapter: dict[str, int] = {}

    for chapter in AI_CHAPTERS:
        per_chapter[chapter] = 0
        shuffled_questions: list[dict[str, Any]] = []
        for q in handbook.get(chapter, []):
            before = q
            after = shuffle_question_options(q)
            shuffled_questions.append(after)

            qid = after["id"]
            per_chapter[chapter] += 1
            if qid in EXISTING_AI_GUIDES:
                guides[qid] = remap_existing_guide(EXISTING_AI_GUIDES[qid], before, after)
            else:
                guides[qid] = build_guide_for_new_question(after, chapter)

            if qid.startswith("ai-") or qid in EXISTING_AI_GUIDES:
                ai_guide_count += 1
                if guides[qid].get("detailedSteps"):
                    detailed_count += 1

        handbook[chapter] = shuffled_questions

    HANDBOOK_PATH.write_text(json.dumps(handbook, indent=2) + "\n")
    GUIDES_PATH.write_text(json.dumps(guides, indent=2) + "\n")

    print(f"Added {total_added} new AI questions")
    print("AI questions per chapter:")
    for ch in AI_CHAPTERS:
        print(f"  {ch}: {per_chapter[ch]}")
    print(f"Total AI questions: {sum(per_chapter.values())}")
    print(f"Total AI guides: {ai_guide_count}")
    print(f"Guides with detailedSteps (AI): {detailed_count}")


if __name__ == "__main__":
    main()
