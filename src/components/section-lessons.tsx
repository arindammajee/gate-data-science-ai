"use client";

import Link from "next/link";
import type { CatalogItem } from "@/lib/types";
import { plainMath } from "@/lib/math-text";
import { useProgress } from "@/lib/progress";
import { RichText } from "./rich-text";

export function SectionLessons({ lessons }: { lessons: CatalogItem[] }) {
  const { completed, toggle, setMany } = useProgress();
  const done = lessons.filter((lesson) => completed.has(lesson.slug)).length;
  const all = lessons.length > 0 && done === lessons.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          {done} of {lessons.length} lessons marked
        </p>
        <button
          type="button"
          onClick={() => setMany(lessons.map((lesson) => lesson.slug), !all)}
          className="rounded-full border border-line px-3 py-1 text-sm"
        >
          {all ? "Clear section" : "Mark section complete"}
        </button>
      </div>
      <ul className="mt-4 divide-y divide-line rounded-2xl border border-line">
        {lessons.map((lesson, index) => {
          const checked = completed.has(lesson.slug);
          return (
            <li key={lesson.slug} className="flex items-start gap-3 px-3 py-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-[var(--accent)]"
                checked={checked}
                aria-label={`Mark ${plainMath(lesson.title)} complete`}
                onChange={() => toggle(lesson.slug)}
              />
              <div className="min-w-0 flex-1">
                <Link href={`/lesson/${lesson.slug}`} className="font-serif text-xl hover:text-accent">
                  <span className="mr-2 font-mono text-sm text-faint">{index + 1}.</span>
                  <RichText text={lesson.title} />
                </Link>
                <p className="text-sm text-muted">
                  <RichText text={lesson.summary} />
                </p>
                <p className="text-xs text-faint">
                  {lesson.minutes} min · <RichText text={lesson.syllabus} />
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
