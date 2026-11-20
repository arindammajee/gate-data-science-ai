"use client";

import Link from "next/link";
import type { CatalogItem } from "@/lib/types";
import { plainMath } from "@/lib/math-text";
import { RichText } from "./rich-text";
import type { WeekPlan } from "@/lib/order";
import { getSection } from "@/lib/sections";
import { useProgress } from "@/lib/progress";

export function TrackView({
  weeks,
  bySlug,
}: {
  weeks: WeekPlan[];
  bySlug: Record<string, CatalogItem | undefined>;
}) {
  const { ready, completed, toggle, setMany } = useProgress();
  const lessons = weeks.flatMap((week) => week.slugs.map((slug) => bySlug[slug]).filter((item): item is CatalogItem => Boolean(item)));
  const done = lessons.filter((lesson) => completed.has(lesson.slug)).length;
  const percent = lessons.length ? Math.round((100 * done) / lessons.length) : 0;
  const next = lessons.find((lesson) => !completed.has(lesson.slug));

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Guided track</p>
      <h1 className="mt-2 font-serif text-4xl sm:text-5xl">Eighteen weeks, in syllabus order.</h1>
      <p className="mt-4 text-muted">
        Tick a lesson when you can do its practice without looking. Tick a week&apos;s box to mark every
        lesson in it. The percentage is lessons finished, not marks scored.
      </p>
      <div className="mt-6 rounded-2xl border border-line bg-raised p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <p className="font-serif text-3xl">{ready ? `${percent}%` : "—"}</p>
          {next && (
            <Link href={`/lesson/${next.slug}`} className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink">
              {done === 0 ? "Start" : "Continue"}: <RichText text={next.title} />
            </Link>
          )}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sunken">
          <div className="h-full bg-accent" style={{ width: ready ? `${percent}%` : "0%" }} />
        </div>
        <p className="mt-2 text-sm text-faint">{ready ? `${done} of ${lessons.length} lessons` : "Loading the ticks saved in this browser."}</p>
      </div>

      <ol className="mt-8 space-y-8">
        {weeks.map((week) => {
          const section = getSection(week.section);
          const items = week.slugs.map((slug) => bySlug[slug]);
          const present = items.filter((item): item is CatalogItem => Boolean(item));
          const weekDone = present.filter((item) => completed.has(item.slug)).length;
          const all = present.length > 0 && weekDone === present.length;
          return (
            <li key={week.id} className="rounded-3xl border border-line p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1.5 h-4 w-4 accent-[var(--accent)]"
                  checked={all}
                  ref={(element) => {
                    if (element) element.indeterminate = weekDone > 0 && !all;
                  }}
                  aria-label={`Mark week ${week.id} complete`}
                  onChange={() => setMany(present.map((item) => item.slug), !all)}
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-accent">
                    Week {week.id}
                    {section ? ` · ${section.short}` : ""}
                  </p>
                  <h2 className="font-serif text-2xl">{week.title}</h2>
                  <p className="text-sm text-muted">{week.blurb}</p>
                  <p className="mt-1 text-xs text-faint">
                    {weekDone}/{present.length || week.slugs.length} lessons
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-1">
                {week.slugs.map((slug) => {
                  const item = bySlug[slug];
                  if (!item) {
                    return (
                      <li key={slug} className="px-2 py-1 text-sm text-danger">
                        Missing lesson file: {slug}
                      </li>
                    );
                  }
                  const checked = completed.has(slug);
                  return (
                    <li key={slug} className="flex items-start gap-2 rounded-lg px-1 py-1">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 accent-[var(--accent)]"
                        checked={checked}
                        aria-label={`Mark ${plainMath(item.title)} complete`}
                        onChange={() => toggle(slug)}
                      />
                      <Link href={`/lesson/${slug}`} className="min-w-0 flex-1 hover:text-accent">
                        <span className={checked ? "text-muted line-through decoration-line" : ""}>
                          <RichText text={item.title} />
                        </span>
                        <span className="mt-0.5 block text-xs text-faint">
                          {item.minutes} min · <RichText text={item.syllabus} />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
