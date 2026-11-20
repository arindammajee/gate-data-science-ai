#!/usr/bin/env python3
"""Fail the build if any official syllabus lesson is missing or thin."""

from __future__ import annotations

import json
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LESSONS = ROOT / "src" / "content" / "lessons"
OUTLINE = ROOT / "src" / "content" / "outline.json"

SECTIONS = {
    "probability",
    "linear-algebra",
    "calculus",
    "programming",
    "databases",
    "machine-learning",
    "artificial-intelligence",
    "aptitude",
}
PYTHON_REQUIRED = {"programming", "machine-learning"}
BANNED = ("lorem ipsum", "todo", "tbd", "placeholder", "as an ai")


def braces_balanced(latex: str) -> bool:
    depth = 0
    escaped = False
    for char in latex:
        if escaped:
            escaped = False
            continue
        if char == "\\":
            escaped = True
            continue
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth < 0:
                return False
    return depth == 0


def main() -> int:
    only = set(sys.argv[1:])
    errors: list[str] = []
    outline = json.loads(OUTLINE.read_text())
    expected: list[tuple[str, str]] = []
    for week in outline["weeks"]:
        for slug in week["slugs"]:
            if only and slug not in only:
                continue
            expected.append((slug, week["section"]))
    if only:
        all_slugs = {slug for week in outline["weeks"] for slug in week["slugs"]}
        for slug in sorted(only - all_slugs):
            errors.append(f"unknown slug argument {slug}")
    if len(expected) != len({slug for slug, _ in expected}):
        errors.append("outline.json has duplicate slugs")

    found: dict[str, dict] = {}
    if not LESSONS.exists():
        errors.append(f"missing directory {LESSONS}")
    else:
        for path in sorted(LESSONS.glob("*.json")):
            try:
                data = json.loads(path.read_text())
            except json.JSONDecodeError as exc:
                errors.append(f"{path.name}: invalid JSON ({exc})")
                continue
            if not isinstance(data, dict):
                errors.append(f"{path.name}: root must be an object")
                continue
            found[path.stem] = data
            if data.get("slug") != path.stem:
                errors.append(f"{path.name}: slug {data.get('slug')!r} does not match filename")

    expected_slugs = [slug for slug, _ in expected]
    for slug, section in expected:
        lesson = found.get(slug)
        if lesson is None:
            errors.append(f"missing lesson {slug}")
            continue
        check_lesson(slug, section, lesson, errors)

    if not only:
        extras = sorted(set(found) - set(expected_slugs))
        for slug in extras:
            errors.append(f"unexpected lesson file {slug}.json")

    if errors:
        print(f"{len(errors)} content error(s):", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        return 1

    questions = sum(len(found[slug]["questions"]) for slug in expected_slugs)
    print(f"OK: {len(expected_slugs)} lessons, {questions} practice questions")
    return 0


def check_lesson(slug: str, section: str, lesson: dict, errors: list[str]) -> None:
    prefix = slug
    if lesson.get("section") != section:
        errors.append(f"{prefix}: section is {lesson.get('section')!r}, expected {section}")

    for field in ("title", "syllabus", "summary", "intuition"):
        value = lesson.get(field)
        if not isinstance(value, str) or not value.strip():
            errors.append(f"{prefix}: {field} is empty")
    if isinstance(lesson.get("intuition"), str) and len(lesson["intuition"]) < 500:
        errors.append(f"{prefix}: intuition is under 500 characters")
    if isinstance(lesson.get("summary"), str) and len(lesson["summary"]) < 60:
        errors.append(f"{prefix}: summary is under 60 characters")
    if not isinstance(lesson.get("minutes"), int) or not (10 <= lesson["minutes"] <= 60):
        errors.append(f"{prefix}: minutes must be an integer from 10 to 60")
    if not isinstance(lesson.get("keywords"), list) or len(lesson["keywords"]) < 3:
        errors.append(f"{prefix}: need at least 3 keywords")

    definitions = lesson.get("definitions")
    if not isinstance(definitions, list) or len(definitions) < 3:
        errors.append(f"{prefix}: need at least 3 definitions")
    else:
        for index, item in enumerate(definitions):
            if not item.get("term") or not item.get("body"):
                errors.append(f"{prefix}: definition {index} is incomplete")

    formulas = lesson.get("formulas")
    if not isinstance(formulas, list) or len(formulas) < 2:
        errors.append(f"{prefix}: need at least 2 formulas")
    else:
        for index, item in enumerate(formulas):
            latex = item.get("latex") or ""
            if not item.get("name") or not latex.strip():
                errors.append(f"{prefix}: formula {index} is incomplete")
            elif not braces_balanced(latex):
                errors.append(f"{prefix}: formula {item.get('name')} has unbalanced braces")

    properties = lesson.get("properties")
    if not isinstance(properties, list) or len(properties) < 4:
        errors.append(f"{prefix}: need at least 4 properties")

    examples = lesson.get("examples")
    if not isinstance(examples, list) or len(examples) < 2:
        errors.append(f"{prefix}: need at least 2 worked examples")
    else:
        for index, item in enumerate(examples):
            steps = item.get("steps")
            if not item.get("title") or not item.get("prompt") or not item.get("answer"):
                errors.append(f"{prefix}: example {index} is missing a field")
            if not isinstance(steps, list) or len(steps) < 3:
                errors.append(f"{prefix}: example {index} needs at least 3 steps")

    traps = lesson.get("traps")
    if not isinstance(traps, list) or len(traps) < 3:
        errors.append(f"{prefix}: need at least 3 traps")

    python = lesson.get("python")
    if section in PYTHON_REQUIRED and (not isinstance(python, str) or len(python.strip()) < 40):
        errors.append(f"{prefix}: this section needs a Python snippet")
    if isinstance(python, str) and python.strip():
        run_python(prefix, python, errors)

    questions = lesson.get("questions")
    if not isinstance(questions, list) or len(questions) < 5:
        errors.append(f"{prefix}: need at least 5 questions")
        questions = []
    counts = {"mcq": 0, "msq": 0, "nat": 0}
    for index, question in enumerate(questions):
        check_question(prefix, index, question, counts, errors)

    if counts["mcq"] < 2 or counts["msq"] < 1 or counts["nat"] < 1:
        errors.append(
            f"{prefix}: question mix is MCQ {counts['mcq']}, MSQ {counts['msq']}, NAT {counts['nat']}"
        )

    blob = json.dumps(lesson).lower()
    for word in BANNED:
        if word in blob:
            errors.append(f"{prefix}: contains banned text {word!r}")


def check_question(slug: str, index: int, question: dict, counts: dict, errors: list[str]) -> None:
    label = f"{slug} q{index + 1}"
    qtype = question.get("type")
    if qtype not in {"mcq", "msq", "nat"}:
        errors.append(f"{label}: type {qtype!r} is not mcq, msq, or nat")
        return
    counts[qtype] += 1
    if question.get("marks") not in (1, 2):
        errors.append(f"{label}: marks must be 1 or 2")
    if not isinstance(question.get("stem"), str) or len(question["stem"].strip()) < 20:
        errors.append(f"{label}: stem is too short")
    if not isinstance(question.get("solution"), str) or len(question["solution"].strip()) < 80:
        errors.append(f"{label}: solution is under 80 characters")
    answer = question.get("answer")
    if not isinstance(answer, list) or not answer:
        errors.append(f"{label}: answer must be a non-empty list")
        return
    if qtype in {"mcq", "msq"}:
        options = question.get("options")
        if not isinstance(options, list) or len(options) != 4:
            errors.append(f"{label}: need exactly 4 options")
        letters = {"A", "B", "C", "D"}
        if any(item not in letters for item in answer):
            errors.append(f"{label}: answer letters must be A–D")
        if qtype == "mcq" and len(answer) != 1:
            errors.append(f"{label}: MCQ needs exactly one answer letter")
        if qtype == "msq" and len(set(answer)) < 2:
            errors.append(f"{label}: MSQ needs at least two correct options")
    else:
        try:
            float(answer[0])
        except (TypeError, ValueError):
            errors.append(f"{label}: NAT answer {answer[0]!r} is not numeric")


def run_python(slug: str, source: str, errors: list[str]) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".py", delete=False) as handle:
        handle.write(source)
        path = handle.name
    try:
        result = subprocess.run(
            [sys.executable, path],
            capture_output=True,
            text=True,
            timeout=15,
            check=False,
        )
    except subprocess.TimeoutExpired:
        errors.append(f"{slug}: Python snippet timed out")
        return
    if result.returncode != 0:
        tail = (result.stderr or result.stdout or "").strip().splitlines()[-3:]
        errors.append(f"{slug}: Python snippet failed: {' '.join(tail)}")


if __name__ == "__main__":
    sys.exit(main())
