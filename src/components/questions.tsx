"use client";

import { useState } from "react";
import type { Question } from "@/lib/types";
import { MD, SafeSvg } from "./markdown";

const LETTERS = ["A", "B", "C", "D", "E"];

function marksLabel(question: Question) {
  if (question.type === "mcq") {
    const penalty = question.marks === 1 ? "1/3" : "2/3";
    return `MCQ · ${question.marks} mark${question.marks === 1 ? "" : "s"} · wrong answer −${penalty}`;
  }
  if (question.type === "msq") {
    return `MSQ · ${question.marks} mark${question.marks === 1 ? "" : "s"} · select all that apply · no partial credit · no negative marking`;
  }
  return `NAT · ${question.marks} mark${question.marks === 1 ? "" : "s"} · numeric answer · no negative marking`;
}

function natEqual(input: string, expected: string, tolerance?: number) {
  const got = Number(input.trim());
  const want = Number(expected);
  if (!Number.isFinite(got) || !Number.isFinite(want)) return false;
  const tol = tolerance ?? (Number.isInteger(want) ? 1e-9 : 0.015);
  return Math.abs(got - want) <= tol;
}

export function Practice({ questions }: { questions: Question[] }) {
  return (
    <ol className="space-y-5">
      {questions.map((question, index) => (
        <li key={question.id}>
          <QuestionCard question={question} index={index} />
        </li>
      ))}
    </ol>
  );
}

function QuestionCard({ question, index }: { question: Question; index: number }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [nat, setNat] = useState("");
  const [verdict, setVerdict] = useState<null | "right" | "wrong">(null);
  const [open, setOpen] = useState(false);

  const choose = (letter: string) => {
    setVerdict(null);
    if (question.type === "mcq") {
      setPicked([letter]);
      return;
    }
    setPicked((current) =>
      current.includes(letter) ? current.filter((item) => item !== letter) : [...current, letter],
    );
  };

  const check = () => {
    if (question.type === "nat") {
      setVerdict(natEqual(nat, question.answer[0] ?? "", question.tolerance) ? "right" : "wrong");
      return;
    }
    const want = [...question.answer].sort().join("");
    const got = [...picked].sort().join("");
    setVerdict(want.length > 0 && want === got ? "right" : "wrong");
  };

  return (
    <article className="rounded-2xl border border-line bg-raised p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.14em] text-faint">
        <span className="text-accent">Question {index + 1}</span>
        <span>{marksLabel(question)}</span>
      </div>
      <div className="mt-3 text-[1.02rem]">
        <MD>{question.stem}</MD>
      </div>
      <SafeSvg svg={question.svg} />

      {question.type !== "nat" && question.options && (
        <ul className="mt-4 space-y-2">
          {question.options.map((option, optionIndex) => {
            const letter = LETTERS[optionIndex] ?? String(optionIndex + 1);
            const selected = picked.includes(letter);
            return (
              <li key={letter}>
                <button
                  type="button"
                  onClick={() => choose(letter)}
                  aria-pressed={selected}
                  className={`flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left transition ${
                    selected
                      ? "border-accent bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]"
                      : "border-line hover:border-[color-mix(in_srgb,var(--accent)_50%,var(--line))]"
                  }`}
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border border-line font-mono text-xs">
                    {letter}
                  </span>
                  <span className="min-w-0 flex-1">
                    <MD className="tight">{option}</MD>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {question.type === "nat" && (
        <label className="mt-4 block text-sm text-muted">
          Your answer
          <input
            inputMode="decimal"
            value={nat}
            onChange={(event) => {
              setNat(event.target.value);
              setVerdict(null);
            }}
            className="mt-1 w-full max-w-xs rounded-lg border border-line bg-sunken px-3 py-2 font-mono text-ink"
            placeholder="Number"
          />
        </label>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={check}
          className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-accent"
        >
          Check
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink"
        >
          {open ? "Hide solution" : "Reveal solution"}
        </button>
      </div>

      {verdict && (
        <p className={`mt-3 text-sm ${verdict === "right" ? "text-leaf" : "text-danger"}`} role="status">
          {verdict === "right"
            ? "Correct."
            : "Not quite. The worked solution stays hidden until you reveal it."}
        </p>
      )}

      {open && (
        <div className="mt-4 rounded-xl border border-line bg-sunken p-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Answer {question.answer.join(", ")}
          </p>
          <div className="mt-2">
            <MD>{question.solution}</MD>
          </div>
        </div>
      )}
    </article>
  );
}
