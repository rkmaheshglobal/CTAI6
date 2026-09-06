#!/usr/bin/env python3
"""Build question-guides.json and update handbook-extracted.json with all 91 answers."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "src/data"
HANDBOOK_PATH = DATA / "handbook-extracted.json"
MISSING_PATH = DATA / "missing-answers-worked.json"
KEYED_DETAILED_PATH = DATA / "keyed-detailed-guides.json"
GUIDES_PATH = DATA / "question-guides.json"

# Short guides for the 22 originally keyed questions (from generate-guides.py, with fixes).
KEYED_GUIDES: dict[str, dict] = {
    "ct-patterns-q1": {
        "explanation": "The pattern is: the number n appears exactly n times. Continue the series after the 6 and count how many 9s appear in the next 20 terms — the answer is 7.",
        "thinkingSteps": [
            "Count how many times each number has already appeared.",
            "Continue the rule: n is repeated n times.",
            "List the next 20 terms and count every 9.",
        ],
        "nudges": [
            "How many times should 7 appear? And 8?",
            "After all the 8s, how many slots are left in your list of 20?",
            "Count only the 9s inside your list of 20 terms.",
        ],
        "wrongFeedback": {
            "a": "3 is too few — list more terms using the rule.",
            "b": "4 is still too low once you continue through the 7s and 8s.",
            "d": "8 is too many — recount the 9s in exactly 20 terms.",
        },
    },
    "ct-patterns-q2": {
        "explanation": "Gaps between terms grow as odd numbers (+1, +3, +5, …). Following this pattern, 51 is the incorrect term (it should be 49).",
        "thinkingSteps": [
            "Find gaps between consecutive terms.",
            "Notice if gaps follow their own pattern.",
            "Check which term breaks that gap pattern.",
        ],
        "nudges": [
            "Subtract each pair of neighbours — what pattern do the gaps show?",
            "The gaps increase by 2 each time.",
            "Which term would you expect after 38?",
        ],
        "wrongFeedback": {
            "a": "11 fits the gap pattern — check later terms.",
            "b": "25 fits — the break happens later.",
            "d": "66 fits — look earlier in the list.",
        },
    },
    "ct-patterns-q3": {
        "explanation": "Terms alternate between number@number and #odd#. After 13@15 the next term is #17#.",
        "thinkingSteps": [
            "Split each term into symbols and numbers.",
            "Track odd numbers inside ## pairs.",
            "See what comes after 13@15.",
        ],
        "nudges": [
            "Which terms use @ and which use #?",
            "Odd numbers 5 and 11 appear inside ## — what odd number is next?",
            "The missing term should wrap an odd number in # symbols.",
        ],
        "wrongFeedback": {
            "a": "This breaks the hash pattern for odd terms.",
            "b": "This repeats an earlier term.",
            "c": "This mixes formats — stick to one style per position.",
        },
    },
    "ct-patterns-q8": {
        "explanation": "Swapping 22 from Set P with 21 from Set Q lets both sets follow a clear step pattern.",
        "thinkingSteps": [
            "Try swapping one number from each set.",
            "Check if both new sets have a regular step.",
            "Test swaps systematically.",
        ],
        "nudges": [
            "What step size might each set follow?",
            "Try swapping 22 and 21.",
            "Verify both new lists after the swap.",
        ],
        "wrongFeedback": {
            "a": "Swapping 18 does not fix both patterns.",
            "b": "27 is already in both sets.",
            "d": "30 is an endpoint — try a middle value.",
        },
    },
    "ct-lines-angles-q3": {
        "explanation": "An equilateral triangle has 3-fold rotational symmetry. The minimum rotation to look identical is 360° ÷ 3 = 120°.",
        "thinkingSteps": [
            "Recall rotational symmetry of an equilateral triangle.",
            "Divide 360° by the order of symmetry (3).",
            "Verify smaller angles do not work.",
        ],
        "nudges": [
            "How many times does the triangle match itself in one full turn?",
            "Try 120° anticlockwise.",
            "30° and 60° will not produce an identical triangle.",
        ],
        "wrongFeedback": {
            "a": "30° is too small for this triangle.",
            "b": "60° is not enough — try one-third of 360°.",
            "d": "90° does not align the vertices.",
        },
    },
    "ct-lines-angles-q7": {
        "explanation": "On a 12-hour clock, hour and minute hands form a straight line (180°) 11 times per 12 hours — 22 times in a full day.",
        "thinkingSteps": [
            "Identify when hands are 180° apart.",
            "Count occurrences in one 12-hour cycle.",
            "Double for a full 24-hour day.",
        ],
        "nudges": [
            "Hands are opposite roughly every 65 minutes.",
            "How many times in 12 hours?",
            "A day has two 12-hour cycles.",
        ],
        "wrongFeedback": {
            "a": "11 is only half a day.",
            "b": "12 counts overlaps, not straight lines only.",
            "d": "24 is too many — recount the 180° cases.",
        },
    },
    "ct-number-play-q1": {
        "explanation": "Sachin needs exactly three 6s (18 points) and 11 more points in the fewest rolls without extra 6s — minimum 6 rolls total.",
        "thinkingSteps": [
            "Account for exactly three 6s scoring 18 points.",
            "Find remaining points: 29 − 18 = 11.",
            "Minimise rolls for 11 points without using 6.",
        ],
        "nudges": [
            "How many 6s must appear before the game ends?",
            "What is the fewest rolls to score 11 without rolling a 6?",
            "Add the 6-rolls to the non-6 rolls.",
        ],
        "wrongFeedback": {
            "a": "4 rolls is too few — you need three 6s alone.",
            "b": "5 rolls still cannot account for all points.",
            "d": "7 is more than the minimum possible.",
        },
    },
    "ct-number-play-q6": {
        "explanation": "Amat picks {4,5,6} (sum 15) and Ankit picks {3,5,6} (sum 14). Both picked 5 and 6.",
        "thinkingSteps": [
            "Find the highest sum of three different numbers.",
            "Find the second-highest sum.",
            "Identify numbers common to both sets.",
        ],
        "nudges": [
            "Which three numbers from 1–6 give the biggest total?",
            "What is the next-best trio?",
            "Which numbers appear in both lists?",
        ],
        "wrongFeedback": {
            "a": "3 and 4 are not in both sets.",
            "b": "4 and 5 — check Ankit's set.",
            "d": "2 and 5 — 2 is not in either final set.",
        },
    },
    "ct-number-play-q8": {
        "explanation": "The smallest digit sum for a 5-digit palindrome with even and odd digits and max difference 9 is 10.",
        "thinkingSteps": [
            "List all constraints: palindrome, even+odd digits, difference 9.",
            "Include digits 0 and 9.",
            "Minimise the digit sum ABCBA.",
        ],
        "nudges": [
            "A palindrome reads the same forwards and backwards.",
            "Max difference 9 means 0 and 9 both appear.",
            "Try the smallest outer digits with 9 in the centre.",
        ],
        "wrongFeedback": {
            "a": "9 may be too low — check all constraints.",
            "c": "11 is higher than the minimum.",
            "d": "13 is not the smallest possible sum.",
        },
    },
    "ai-intro-mcq1": {
        "explanation": "Labelled data has predefined tags (e.g. spam/not spam) so a model learns input-to-label relationships.",
        "thinkingSteps": [
            "Recall the email sorting example.",
            "Labelled means each example has a known category.",
            "Match the definition.",
        ],
        "nudges": [
            "Does the data already have correct answers attached?",
            "Supervised learning needs labels.",
            "Eliminate random and incorrect.",
        ],
        "wrongFeedback": {
            "a": "Without tags, data is unlabelled.",
            "c": "Random data has no structure.",
            "d": "Incorrect is not the definition of labelled.",
        },
    },
    "ai-intro-mcq2": {
        "explanation": "Alan Turing introduced the Turing Test in 1950.",
        "thinkingSteps": [
            "Connect Turing Test to its inventor.",
            "McCarthy coined AI; Babbage built early engines.",
            "Pick the linked scientist.",
        ],
        "nudges": [
            "The test shares his surname.",
            "Not the person who invented the word AI.",
            "Look for Alan ___",
        ],
        "wrongFeedback": {
            "a": "McCarthy named AI but did not create this test.",
            "c": "Babbage worked on mechanical computers.",
            "d": "Newton worked in physics.",
        },
    },
    "ai-intro-mcq3": {
        "explanation": "Supervised learning uses labelled data — each example has a known correct output.",
        "thinkingSteps": [
            "Supervised implies a teacher/correct answers.",
            "Contrast with unsupervised.",
            "Choose labelled.",
        ],
        "nudges": [
            "If you know the right answer for each example, is it labelled?",
            "Unsupervised means no tags.",
            "Reinforcement uses rewards.",
        ],
        "wrongFeedback": {
            "a": "Unlabelled is unsupervised.",
            "b": "Random does not describe supervised data.",
            "d": "Deleted is not a data type here.",
        },
    },
    "ai-intro-mcq4": {
        "explanation": "Predicting marks from past marked papers is supervised learning — past papers are labelled with actual marks.",
        "thinkingSteps": [
            "Is there a known output for each example?",
            "Prediction from labelled history is supervised.",
            "Match scenario to type.",
        ],
        "nudges": [
            "Do we have old papers with marks?",
            "Unsupervised finds groups without targets.",
            "Reinforcement uses trial-and-error rewards.",
        ],
        "wrongFeedback": {
            "b": "Unsupervised does not predict a labelled target.",
            "c": "Reinforcement uses environment rewards.",
            "d": "Only one type best fits.",
        },
    },
    "ai-intro-mcq5": {
        "explanation": "A traditional traffic signal follows fixed timers — no learning — so it is automation, not AI.",
        "thinkingSteps": [
            "AI adapts or learns.",
            "Fixed timers do not learn.",
            "Find the non-learning device.",
        ],
        "nudges": [
            "Does a normal traffic light learn?",
            "Voice assistants use ML.",
            "Which device always does the same thing?",
        ],
        "wrongFeedback": {
            "a": "Voice assistants use AI.",
            "b": "Face recognition learns from data.",
            "d": "Smart chatbots use language models.",
        },
    },
    "ai-data-mcq1": {
        "explanation": "Analysing exam results to improve teaching is using data for decision-making.",
        "thinkingSteps": [
            "Is real information collected?",
            "Goal is a better teaching decision.",
            "Match to data-driven choice.",
        ],
        "nudges": [
            "Are exam results data?",
            "Is the teacher guessing?",
            "Which option is evidence-based?",
        ],
        "wrongFeedback": {
            "a": "Guesswork ignores data.",
            "c": "Random selection does not analyse.",
            "d": "This is purposeful analysis.",
        },
    },
    "ai-data-mcq2": {
        "explanation": "Step counts are numbers — numerical data collected first-hand by the app.",
        "thinkingSteps": [
            "What format is step-count data?",
            "Numerical = measured numbers.",
            "Match to the data type.",
        ],
        "nudges": [
            "Can you add and average step counts?",
            "Is it a picture or a number?",
            "Daily steps are quantities.",
        ],
        "wrongFeedback": {
            "a": "Image data is visual, not step counts.",
            "b": "Text data is words, not numbers.",
            "d": "Sound data is audio.",
        },
    },
    "ai-data-mcq3": {
        "explanation": "A weather app using satellite data to forecast rain shows data helps make future predictions.",
        "thinkingSteps": [
            "What is the app doing with data?",
            "Forecasting looks ahead.",
            "Match purpose to option.",
        ],
        "nudges": [
            "Is the app predicting the future?",
            "Satellite data feeds forecasts.",
            "Which option describes prediction?",
        ],
        "wrongFeedback": {
            "a": "Games are unrelated here.",
            "c": "Writing stories is not the main use.",
            "d": "Messaging is not what the app does.",
        },
    },
    "ai-data-mcq4": {
        "explanation": "A security camera records moving images — video data.",
        "thinkingSteps": [
            "What does a camera record?",
            "Video = moving visual data.",
            "Distinguish from static image or text.",
        ],
        "nudges": [
            "Does the camera capture still photos only?",
            "Continuous recording is video.",
            "Which data type is moving pictures?",
        ],
        "wrongFeedback": {
            "a": "Text is words, not video.",
            "c": "A single photo is image data; continuous recording is video.",
            "d": "Numerical data is numbers.",
        },
    },
    "ai-data-mcq5": {
        "explanation": "A photograph is visual image data; name, address, and age are text or numbers.",
        "thinkingSteps": [
            "Define image data.",
            "Test each personal detail.",
            "Pick the visual example.",
        ],
        "nudges": [
            "Which option is a picture?",
            "Names and addresses are text.",
            "Age is a number.",
        ],
        "wrongFeedback": {
            "a": "Your name is text data.",
            "b": "Your address is text data.",
            "c": "Your age is numerical data.",
        },
    },
    "intro-q1": {
        "explanation": "The six CT skills include Pattern Recognition, Decomposition, Abstraction, Algorithm Design, Evaluation, and Generalisation. Memorisation is NOT one of them.",
        "thinkingSteps": [
            "Recall the six skills.",
            "Which is NOT on the list?",
            "CT is about thinking, not rote memory.",
        ],
        "nudges": [
            "Check the handbook list.",
            "Decomposition is a CT skill.",
            "Which sounds like learning by heart only?",
        ],
        "wrongFeedback": {
            "a": "Decomposition is core CT.",
            "b": "Pattern Recognition is listed.",
            "d": "Algorithm Design is one of the six.",
        },
    },
    "intro-q2": {
        "explanation": "100 hours/year total: 40h CT, 20h AI, 40h projects. AI gets 20 hours.",
        "thinkingSteps": [
            "Remember 40-20-40 split.",
            "AI = middle 20 hours.",
            "Do not confuse with total.",
        ],
        "nudges": [
            "Total is 100 — how split?",
            "CT gets 40.",
            "Projects also get 40.",
        ],
        "wrongFeedback": {
            "a": "40 is CT allocation.",
            "c": "100 is total for all.",
            "d": "10 is too small.",
        },
    },
    "intro-q3": {
        "explanation": "The handbook says the process of thinking matters more than getting the right answer on the first try.",
        "thinkingSteps": [
            "Recall pedagogy in intro.",
            "CT values reasoning.",
            "Pick process over speed.",
        ],
        "nudges": [
            "Does your teacher want speed or reasoning?",
            "Is copying real thinking?",
            "Mistakes help you learn.",
        ],
        "wrongFeedback": {
            "a": "First-try success is not the main goal.",
            "c": "Fastest is not the focus.",
            "d": "Copying avoids your own thinking.",
        },
    },
}

# Exact detailed steps for ct-number-play-q1 (Sachin die game).
CT_NUMBER_PLAY_Q1_DETAILED = {
    "detailedSteps": [
        {
            "heading": "Account for the required 6s",
            "content": "Since the game ends exactly when the third 6 is rolled, we know Sachin rolled exactly three 6s (with the final roll being the third 6). Points from the three 6s: 3 × 6 = 18 points. Number of rolls so far: 3 rolls.",
        },
        {
            "heading": "Calculate the remaining points needed",
            "content": "Total score required: 29 points. Remaining points to account for: 29 - 18 = 11 points.",
        },
        {
            "heading": "Minimize the remaining rolls",
            "content": "To make the fewest rolls possible, Sachin needs to score these remaining 11 points using the highest possible numbers other than 6. The highest valid roll is 5. Two rolls of 5 would only equal 10 points (5 + 5 = 10), which falls short. Therefore, it requires a minimum of 3 rolls to reach 11 without using a 6 (for example: 5, 5, and 1).",
        },
        {
            "heading": "Find the total minimum rolls",
            "content": "Required 6s: 3 rolls. Additional rolls to reach 11 points: 3 rolls. Total: 3 + 3 = 6 rolls.",
        },
    ],
    "conclusion": "The minimum number of rolls Sachin could have made is 6.",
    "example": "An example sequence would be: 5, 6, 5, 6, 1, 6.",
}

SKILL_HINTS = {
    "ct-patterns": "Look for a repeating rule in numbers or shapes.",
    "ct-lines-angles": "Sketch the diagram and label known angles or positions.",
    "ct-number-play": "List constraints first, then test one case.",
    "ct-data-handling": "Read every value from the graph or table carefully.",
    "ct-prime-time": "Use factors, multiples, and prime definitions.",
    "ct-perimeter-area": "Break shapes into parts or count grid squares.",
    "ct-fractions": "Draw a bar model or number line for fractions.",
    "ct-constructions": "Try building the shape with matchsticks or paper.",
    "ct-symmetry": "Imagine folding the shape along a mirror line.",
    "ct-negative-numbers": "Plot values on a number line and watch signs.",
    "ai-intro": "Connect each scenario to a definition from the AI chapter.",
    "ai-data": "Classify the data type and how it is used.",
    "ai-patterns": "Think about patterns, observations, and conclusions.",
    "ai-ethics": "Choose the safest and most responsible action.",
    "intro": "Recall the handbook introduction and CT pedagogy.",
}


def chapter_for(qid: str) -> str:
    if qid.startswith("intro-"):
        return "intro"
    if qid.startswith("ai-"):
        return "-".join(qid.split("-")[:2])
    return "-".join(qid.split("-")[:2])


def guide_from_worked(worked: dict) -> dict:
    steps = worked.get("detailedSteps", [])
    return {
        "explanation": worked.get("conclusion", ""),
        "thinkingSteps": [s["heading"] for s in steps] or ["Work through each step carefully."],
        "nudges": [
            "What is the first fact you can establish?",
            "Have you used every clue in the question?",
            "Check your reasoning against each answer option.",
        ],
        "wrongFeedback": {},
        "detailedSteps": steps,
        "conclusion": worked.get("conclusion"),
        "example": worked.get("example"),
        "hasOfficialAnswer": True,
        "teacherNote": "Confirm the official answer and ask students to explain the logic in their own words.",
    }


def fill_wrong_feedback(guide: dict, options: list[dict], correct: str) -> None:
    wf = dict(guide.get("wrongFeedback", {}))
    for opt in options:
        oid = opt["id"]
        if oid != correct and oid not in wf:
            wf[oid] = (
                f"Option {oid.upper()} may not satisfy every condition — "
                "re-read the question and try another approach."
            )
    guide["wrongFeedback"] = wf


def main() -> None:
    handbook: dict = json.loads(HANDBOOK_PATH.read_text())
    missing: dict = json.loads(MISSING_PATH.read_text())
    keyed_detailed: dict = json.loads(KEYED_DETAILED_PATH.read_text())

    keyed_detailed["ct-number-play-q1"] = CT_NUMBER_PLAY_Q1_DETAILED

    guides: dict[str, dict] = {}
    handbook_updates = 0

    for chapter, questions in handbook.items():
        for q in questions:
            qid = q["id"]
            correct = q.get("correct")

            if qid in missing:
                worked = missing[qid]
                q["correct"] = worked["correct"]
                correct = worked["correct"]
                handbook_updates += 1
                guide = guide_from_worked(worked)
            elif qid in KEYED_GUIDES:
                guide = dict(KEYED_GUIDES[qid])
                guide["hasOfficialAnswer"] = bool(correct)
                if qid in keyed_detailed:
                    detail = keyed_detailed[qid]
                    guide["detailedSteps"] = detail.get("detailedSteps", [])
                    guide["conclusion"] = detail.get("conclusion")
                    guide["example"] = detail.get("example")
                guide["teacherNote"] = (
                    "Confirm the official answer and ask students to explain the logic in their own words."
                )
            elif qid in keyed_detailed:
                detail = keyed_detailed[qid]
                guide = guide_from_worked(detail)
                guide["hasOfficialAnswer"] = bool(correct)
            else:
                hint = SKILL_HINTS.get(chapter_for(qid), "Break the problem into smaller steps.")
                guide = {
                    "hasOfficialAnswer": bool(correct),
                    "explanation": (
                        "Apply the chapter reasoning skills to justify this answer. "
                        "Verify each condition in the question."
                        if correct
                        else "Work through the puzzle step by step and verify with your teacher."
                    ),
                    "thinkingSteps": [
                        "Restate the question in your own words.",
                        hint,
                        "Check each option against every condition.",
                    ],
                    "nudges": [
                        "What information have you not used yet?",
                        "Can you eliminate any option with a quick test?",
                        "Explain your reasoning to a partner before your final try.",
                    ],
                    "wrongFeedback": {},
                    "teacherNote": (
                        "Confirm the official answer and ask students to explain the logic in their own words."
                        if correct
                        else "Facilitate discussion and ask students to justify their choice."
                    ),
                }

            if q.get("options") and correct:
                fill_wrong_feedback(guide, q["options"], correct)

            guides[qid] = guide

    HANDBOOK_PATH.write_text(json.dumps(handbook, indent=2) + "\n")
    GUIDES_PATH.write_text(json.dumps(guides, indent=2) + "\n")

    with_detailed = sum(1 for g in guides.values() if g.get("detailedSteps"))
    with_conclusion = sum(1 for g in guides.values() if g.get("conclusion"))

    print(f"Wrote {len(guides)} guides to {GUIDES_PATH.relative_to(ROOT)}")
    print(f"Updated {handbook_updates} handbook questions with correct answers")
    print(f"Guides with detailedSteps: {with_detailed}/91")
    print(f"Guides with conclusion: {with_conclusion}/91")
    print(f"All questions covered: {len(guides) == 91}")


if __name__ == "__main__":
    main()
