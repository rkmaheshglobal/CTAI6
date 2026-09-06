#!/usr/bin/env python3
"""Generate question-guides.json from handbook-extracted.json."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
data = json.loads((ROOT / "src/data/handbook-extracted.json").read_text())

KEYED: dict[str, dict] = {
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
        "explanation": "Swapping 22 (from P) with 21 (from Q) lets both sets follow a clear step pattern.",
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
        "explanation": "Using all seating clues on the circular table, the angle between the directions faced by A and C is 135 degrees.",
        "thinkingSteps": [
            "Draw the circle and mark compass directions.",
            "Place A facing North-East.",
            "Add each clue, then measure the angle between A and C.",
        ],
        "nudges": [
            "Each person faces the centre.",
            "B is immediately left of A around the table.",
            "Read off compass directions for A and C when done.",
        ],
        "wrongFeedback": {
            "a": "Recheck C's facing direction.",
            "b": "Measure the angle between the two outward rays.",
            "d": "Verify with your labelled diagram.",
        },
    },
    "ct-lines-angles-q7": {
        "explanation": "Using parallel-line angle facts (corresponding and alternate angles), the required angle is 65 degrees.",
        "thinkingSteps": [
            "Mark equal angles from parallel lines.",
            "Use supplementary angles on a straight line.",
            "Chain angle facts to the unknown.",
        ],
        "nudges": [
            "Which angles are equal because lines are parallel?",
            "A straight line totals 180 degrees.",
            "Work from a known angle toward the one asked.",
        ],
        "wrongFeedback": {
            "a": "Too small for this configuration.",
            "b": "Check corresponding angles again.",
            "d": "You may have added instead of used parallels.",
        },
    },
    "ct-number-play-q1": {
        "explanation": "Opposite faces on a standard die sum to 7. From the net, the face opposite 6 is 1 — apply the question's constraint to get 6.",
        "thinkingSteps": [
            "Recall opposite faces sum to 7.",
            "Use the net to find opposite pairs.",
            "Apply the constraint from the question.",
        ],
        "nudges": [
            "Label the net and fold it mentally.",
            "Pairs: 1-6, 2-5, 3-4.",
            "Which number is opposite the asked face?",
        ],
        "wrongFeedback": {
            "a": "Check which face is truly opposite.",
            "b": "Opposite pairs must sum to 7.",
            "d": "A die face shows at most 6.",
        },
    },
    "ct-number-play-q6": {
        "explanation": "Arrows point from larger to smaller digits. The largest valid 5-digit number under the rules gives a difference of 44332 from 10000.",
        "thinkingSteps": [
            "Arrows point from larger to smaller.",
            "Maximize the 5-digit number under arrow rules.",
            "Subtract 10000.",
        ],
        "nudges": [
            "Put the largest digit in the leftmost position if allowed.",
            "Every arrow must point to a strictly smaller neighbour.",
            "Subtract 10000 from your maximum number.",
        ],
        "wrongFeedback": {
            "a": "Verify every arrow direction.",
            "b": "May violate A not equal B or arrow rules.",
            "d": "Recheck the largest valid arrangement.",
        },
    },
    "ct-number-play-q8": {
        "explanation": "From the grid constraints, the required count is 5.",
        "thinkingSteps": [
            "List all row and column conditions.",
            "Eliminate impossible placements.",
            "Count valid configurations.",
        ],
        "nudges": [
            "Mark fixed cells from the strongest clues.",
            "Does each row have the same total?",
            "Test your count against every constraint.",
        ],
        "wrongFeedback": {
            "a": "One more arrangement may be valid.",
            "c": "Recheck you have not double-counted.",
            "d": "Too many — use the row-total condition.",
        },
    },
    "ai-intro-mcq1": {
        "explanation": "Labelled data has predefined tags (e.g. spam/not spam) so a model learns input-to-label relationships.",
        "thinkingSteps": ["Recall the email sorting example.", "Labelled means each example has a known category.", "Match the definition."],
        "nudges": ["Does the data already have correct answers attached?", "Supervised learning needs labels.", "Eliminate random and incorrect."],
        "wrongFeedback": {"a": "Without tags, data is unlabelled.", "c": "Random data has no structure.", "d": "Incorrect is not the definition of labelled."},
    },
    "ai-intro-mcq2": {
        "explanation": "Alan Turing introduced the Turing Test in 1950.",
        "thinkingSteps": ["Connect Turing Test to its inventor.", "McCarthy coined AI; Babbage built early engines.", "Pick the linked scientist."],
        "nudges": ["The test shares his surname.", "Not the person who invented the word AI.", "Look for Alan ___."],
        "wrongFeedback": {"a": "McCarthy named AI but did not create this test.", "c": "Babbage worked on mechanical computers.", "d": "Newton worked in physics."},
    },
    "ai-intro-mcq3": {
        "explanation": "Supervised learning uses labelled data — each example has a known correct output.",
        "thinkingSteps": ["Supervised implies a teacher/correct answers.", "Contrast with unsupervised.", "Choose labelled."],
        "nudges": ["If you know the right answer for each example, is it labelled?", "Unsupervised means no tags.", "Reinforcement uses rewards."],
        "wrongFeedback": {"a": "Unlabelled is unsupervised.", "b": "Random does not describe supervised data.", "d": "Deleted is not a data type here."},
    },
    "ai-intro-mcq4": {
        "explanation": "Predicting marks from past marked papers is supervised learning — past papers are labelled with actual marks.",
        "thinkingSteps": ["Is there a known output for each example?", "Prediction from labelled history is supervised.", "Match scenario to type."],
        "nudges": ["Do we have old papers with marks?", "Unsupervised finds groups without targets.", "Reinforcement uses trial-and-error rewards."],
        "wrongFeedback": {"b": "Unsupervised does not predict a labelled target.", "c": "Reinforcement uses environment rewards.", "d": "Only one type best fits."},
    },
    "ai-intro-mcq5": {
        "explanation": "A traditional traffic signal follows fixed timers — no learning — so it is automation, not AI.",
        "thinkingSteps": ["AI adapts or learns.", "Fixed timers do not learn.", "Find the non-learning device."],
        "nudges": ["Does a normal traffic light learn?", "Voice assistants use ML.", "Which device always does the same thing?"],
        "wrongFeedback": {"a": "Voice assistants use AI.", "b": "Face recognition learns from data.", "d": "Smart chatbots use language models."},
    },
    "ai-data-mcq1": {
        "explanation": "Analysing exam results to improve teaching is using data for decision-making.",
        "thinkingSteps": ["Is real information collected?", "Goal is a better teaching decision.", "Match to data-driven choice."],
        "nudges": ["Are exam results data?", "Is the teacher guessing?", "Which option is evidence-based?"],
        "wrongFeedback": {"a": "Guesswork ignores data.", "c": "Random selection does not analyse.", "d": "This is purposeful analysis."},
    },
    "ai-data-mcq2": {
        "explanation": "Primary data is collected first-hand (your own survey), not from someone else's study.",
        "thinkingSteps": ["Who collected the data?", "Primary = you gather it.", "Secondary = someone else did."],
        "nudges": ["Did your class create the responses?", "A newspaper uses secondary data.", "Your own survey is primary."],
        "wrongFeedback": {"a": "Newspaper is secondary.", "d": "Internet search often finds secondary sources."},
    },
    "ai-data-mcq3": {
        "explanation": "A bar chart compares categories side by side (e.g. marks per subject).",
        "thinkingSteps": ["What are you comparing?", "Bar charts suit discrete categories.", "Pick the best visual."],
        "nudges": ["Compare different subjects?", "Which chart has separate bars?", "Pictographs suit simple icon counts."],
        "wrongFeedback": {"a": "Tables list values but compare less visually.", "c": "Line graphs suit trends over time.", "d": "Pictographs are less precise for many categories."},
    },
    "ai-data-mcq4": {
        "explanation": "Qualitative data describes qualities in words (favourite colour), not measured numbers.",
        "thinkingSteps": ["Number or category?", "Qualitative = descriptive.", "Quantitative = measurable."],
        "nudges": ["Can you average favourite colour?", "Height and marks are quantitative.", "Which is a preference in words?"],
        "wrongFeedback": {"a": "Height is numerical.", "c": "Marks are numbers.", "d": "Age is numerical."},
    },
    "ai-data-mcq5": {
        "explanation": "A pictograph uses symbols/icons to represent data counts.",
        "thinkingSteps": ["Recall chart types.", "Pictograph = pictures for quantities.", "Match definition."],
        "nudges": ["Which word sounds like picture?", "Bar charts use rectangles.", "Pie charts use circle slices."],
        "wrongFeedback": {"a": "Bar graph uses bars.", "b": "Line graph uses connected points.", "c": "Pie chart shows parts of a whole."},
    },
    "intro-q1": {
        "explanation": "The six CT skills include Pattern Recognition, Decomposition, Abstraction, Algorithm Design, Evaluation, and Generalisation. Memorisation is NOT one of them.",
        "thinkingSteps": ["Recall the six skills.", "Which is NOT on the list?", "CT is about thinking, not rote memory."],
        "nudges": ["Check the handbook list.", "Decomposition is a CT skill.", "Which sounds like learning by heart only?"],
        "wrongFeedback": {"a": "Decomposition is core CT.", "b": "Pattern Recognition is listed.", "d": "Algorithm Design is one of the six."},
    },
    "intro-q2": {
        "explanation": "100 hours/year total: 40h CT, 20h AI, 40h projects. AI gets 20 hours.",
        "thinkingSteps": ["Remember 40-20-40 split.", "AI = middle 20 hours.", "Do not confuse with total."],
        "nudges": ["Total is 100 — how split?", "CT gets 40.", "Projects also get 40."],
        "wrongFeedback": {"a": "40 is CT allocation.", "c": "100 is total for all.", "d": "10 is too small."},
    },
    "intro-q3": {
        "explanation": "The handbook says the process of thinking matters more than getting the right answer on the first try.",
        "thinkingSteps": ["Recall pedagogy in intro.", "CT values reasoning.", "Pick process over speed."],
        "nudges": ["Does your teacher want speed or reasoning?", "Is copying real thinking?", "Mistakes help you learn."],
        "wrongFeedback": {"a": "First-try success is not the main goal.", "c": "Fastest is not the focus.", "d": "Copying avoids your own thinking."},
    },
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
}

guides: dict[str, dict] = {}

for ch, qs in data.items():
    for q in qs:
        qid = q["id"]
        correct = q.get("correct")
        if qid in KEYED:
            g = dict(KEYED[qid])
            g["hasOfficialAnswer"] = bool(correct)
            wf = g.get("wrongFeedback", {})
            for opt in q["options"]:
                if opt["id"] != correct and opt["id"] not in wf:
                    wf[opt["id"]] = "This choice does not fit all conditions — try another approach."
            g["wrongFeedback"] = wf
            guides[qid] = g
            continue

        hint = SKILL_HINTS.get(ch, "Break the problem into smaller steps.")
        wf = {
            opt["id"]: f"Option {opt['id'].upper()} may not satisfy every condition — check the diagram again."
            for opt in q["options"]
        }
        guides[qid] = {
            "hasOfficialAnswer": bool(correct),
            "explanation": (
                "Work through the puzzle step by step. Discuss your reasoning in class and verify with your teacher."
                if not correct
                else "Apply the chapter reasoning skills to justify this answer. Verify each condition in the question."
            ),
            "thinkingSteps": [
                "Restate the question in your own words.",
                hint,
                "Check each option against every condition.",
            ],
            "nudges": [
                "What information in the diagram have you not used yet?",
                "Can you eliminate any option with a quick test?",
                "Explain your reasoning to a partner before your final try.",
            ],
            "wrongFeedback": wf,
            "teacherNote": (
                "No official handbook answer key for this puzzle — facilitate discussion and ask students to justify their choice."
                if not correct
                else "Confirm the official answer and ask students to explain the logic in their own words."
            ),
        }

(ROOT / "src/data/question-guides.json").write_text(json.dumps(guides, indent=2))
print(f"Wrote {len(guides)} guides")
