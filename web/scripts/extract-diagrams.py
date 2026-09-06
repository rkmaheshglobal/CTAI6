#!/usr/bin/env python3
"""Extract per-question diagram crops from CTAI.pdf and write diagram-manifest.json."""

import json
import re
from pathlib import Path

import fitz

PDF = Path(__file__).resolve().parents[2] / "CTAI" / "CTAI.pdf"
OUT_DIR = Path(__file__).resolve().parents[1] / "public" / "handbook" / "diagrams"
MANIFEST = Path(__file__).resolve().parents[1] / "src" / "data" / "diagram-manifest.json"

# Handbook Part 1 CT chapters: handbook page ranges (inclusive)
CHAPTER_PAGES = {
    "ct-patterns": (11, 13),
    "ct-lines-angles": (14, 16),
    "ct-number-play": (17, 19),
    "ct-data-handling": (20, 24),
    "ct-prime-time": (25, 29),
    "ct-perimeter-area": (30, 33),
    "ct-fractions": (34, 35),
    "ct-constructions": (36, 39),
    "ct-symmetry": (40, 43),
    "ct-negative-numbers": (44, 46),
}

# Unnumbered bonus puzzles (no "N." prefix in PDF)
BONUS_PUZZLES = [
    # Patterns bonus after Q10 on handbook p.13
    ("ct-patterns", 13, "ct-patterns-q11", 220, 470),
]

MARGIN = 8
ZOOM = 2.0


def question_starts(page: fitz.Page):
    items = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            text = "".join(s["text"] for s in line["spans"]).strip()
            m = re.match(r"^(\d+)\.\s", text)
            if m:
                items.append((int(m.group(1)), line["bbox"][1]))
    # dedupe by number keeping first y
    seen = {}
    for num, y in sorted(items, key=lambda x: (x[0], x[1])):
        if num not in seen:
            seen[num] = y
    return sorted(seen.items())


def image_blocks(page: fitz.Page):
    imgs = []
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") == 1:
            imgs.append(block["bbox"])
    return imgs


def union_bbox(boxes):
    if not boxes:
        return None
    x0 = min(b[0] for b in boxes)
    y0 = min(b[1] for b in boxes)
    x1 = max(b[2] for b in boxes)
    y1 = max(b[3] for b in boxes)
    return [x0 - MARGIN, y0 - MARGIN, x1 + MARGIN, y1 + MARGIN]


def render_clip(page: fitz.Page, clip, out_path: Path):
    mat = fitz.Matrix(ZOOM, ZOOM)
    pix = page.get_pixmap(matrix=mat, clip=fitz.Rect(*clip), alpha=False)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    pix.save(str(out_path))


def main():
    doc = fitz.open(PDF)
    manifest: dict[str, str] = {}

    for chapter_id_key, (start_hb, end_hb) in CHAPTER_PAGES.items():
        for hb in range(start_hb, end_hb + 1):
            if hb >= doc.page_count:
                continue
            page = doc[hb]
            questions = question_starts(page)
            imgs = image_blocks(page)
            page_h = page.rect.height

            for i, (num, q_y) in enumerate(questions):
                next_y = questions[i + 1][1] if i + 1 < len(questions) else page_h - 40
                # Images that fall between this question and the next
                region_imgs = [
                    b for b in imgs if q_y - 5 < b[1] < next_y - 10
                ]
                if not region_imgs:
                    continue

                clip = union_bbox(region_imgs)
                if not clip:
                    continue

                qid = f"{chapter_id_key}-q{num}"
                rel = f"/handbook/diagrams/{qid}.png"
                out = OUT_DIR / f"{qid}.png"
                render_clip(page, clip, out)
                manifest[qid] = rel
                print(f"  {qid} <- handbook p.{hb}")

        for chapter_id, hb, qid, y_start, y_end in BONUS_PUZZLES:
            if chapter_id != chapter_id_key:
                continue
            if hb < start_hb or hb > end_hb:
                continue
            if hb >= doc.page_count:
                continue
            page = doc[hb]
            imgs = image_blocks(page)
            region_imgs = [b for b in imgs if y_start < b[1] < y_end]
            if not region_imgs:
                continue
            clip = union_bbox(region_imgs)
            if not clip:
                continue
            rel = f"/handbook/diagrams/{qid}.png"
            out = OUT_DIR / f"{qid}.png"
            render_clip(page, clip, out)
            manifest[qid] = rel
            print(f"  {qid} (bonus) <- handbook p.{hb}")

    doc.close()

    MANIFEST.write_text(json.dumps(manifest, indent=2))
    print(f"\nWrote {len(manifest)} diagrams -> {MANIFEST}")


if __name__ == "__main__":
    main()
