"use client";

import Link from "next/link";
import { useState } from "react";
import type { CatalogItem, Lesson } from "@/lib/types";
import type { SectionMeta } from "@/lib/sections";
import { useProgress } from "@/lib/progress";
import { MD, SafeSvg } from "./markdown";
import { RichText } from "./rich-text";
import { Tex } from "./tex";
import { Practice } from "./questions";

const anchors = [
  ["intuition", "Intuition"],
  ["definitions", "Definitions"],
  ["formulas", "Formulas"],
  ["properties", "Properties"],
  ["examples", "Worked examples"],
  ["traps", "Traps"],
  ["practice", "Practice"],
] as const;

export function LessonView({
  lesson,
  section,
  prev,
  next,
}: {
  lesson: Lesson;
  section: SectionMeta;
  prev: CatalogItem | null;
  next: CatalogItem | null;
}) {
  const { ready, isDone, toggle } = useProgress();
  const done = ready && isDone(lesson.slug);
  const [copied, setCopied] = useState(false);
  const nav = lesson.python ? [...anchors.slice(0, 5), ["python", "Python"] as const, ...anchors.slice(5)] : anchors;

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_12.5rem]">
      <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-xs uppercase tracking-[0.16em] text-faint">
          <Link href={`/section/${section.slug}`} className="hover:text-accent">
            {section.num < 8 ? `Section ${section.num}` : "General aptitude"} · {section.short}
          </Link>
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">
          <RichText text={lesson.title} />
        </h1>
        <p className="mt-3 text-lg text-muted">
          <RichText text={lesson.summary} />
        </p>
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
          <div>
            <dt className="inline">Syllabus line: </dt>
            <dd className="inline text-muted">
              <RichText text={lesson.syllabus} />
            </dd>
          </div>
          <div>
            <dt className="inline">Time: </dt>
            <dd className="inline text-muted">about {lesson.minutes} min</dd>
          </div>
          <div>
            <dt className="inline">Practice: </dt>
            <dd className="inline text-muted">{lesson.questions.length} questions</dd>
          </div>
        </dl>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => toggle(lesson.slug)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${
              done ? "bg-leaf text-accent-ink" : "border border-line text-ink"
            }`}
          >
            {done ? "Completed · tap to undo" : "Mark lesson complete"}
          </button>
          <p className="mt-2 text-xs text-faint">Stored only in this browser.</p>
        </div>

        <nav className="no-print mt-6 flex gap-3 overflow-x-auto text-sm xl:hidden" aria-label="On this page">
          {nav.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 rounded-full border border-line px-3 py-1 text-muted">
              {label}
            </a>
          ))}
        </nav>

        <section id="intuition" className="mt-10">
          <h2 className="font-serif text-3xl">Intuition</h2>
          <hr className="rule mt-2" />
          <div className="mt-4 text-[1.05rem]">
            <MD>{lesson.intuition}</MD>
          </div>
        </section>

        <section id="definitions" className="mt-12">
          <h2 className="font-serif text-3xl">Definitions</h2>
          <hr className="rule mt-2" />
          <dl className="mt-4 space-y-5">
            {lesson.definitions.map((definition) => (
              <div key={definition.term}>
                <dt className="font-serif text-xl">
                  <RichText text={definition.term} />
                </dt>
                <dd className="mt-1 text-muted">
                  <MD>{definition.body}</MD>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="formulas" className="mt-12">
          <h2 className="font-serif text-3xl">Formulas</h2>
          <hr className="rule mt-2" />
          <div className="mt-4 space-y-4">
            {lesson.formulas.map((formula) => (
              <figure key={formula.name} className="rounded-2xl border border-line bg-raised p-4">
                <figcaption className="text-sm tracking-[0.14em] text-faint">
                  <RichText text={formula.name} textTransform="uppercase" />
                </figcaption>
                <Tex latex={formula.latex} display />
                {formula.note && (
                  <figcaption className="text-sm text-muted">
                    <MD className="tight">{formula.note}</MD>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>

        <section id="properties" className="mt-12">
          <h2 className="font-serif text-3xl">Properties and shortcuts</h2>
          <hr className="rule mt-2" />
          <ul className="mt-4 space-y-3">
            {lesson.properties.map((property) => (
              <li key={property} className="rounded-xl border border-line bg-raised px-4 py-3">
                <MD className="tight">{property}</MD>
              </li>
            ))}
          </ul>
        </section>

        <section id="examples" className="mt-12">
          <h2 className="font-serif text-3xl">Worked examples</h2>
          <hr className="rule mt-2" />
          <div className="mt-4 space-y-6">
            {lesson.examples.map((example, index) => (
              <article key={example.title} className="rounded-2xl border border-line p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">Example {index + 1}</p>
                <h3 className="mt-1 font-serif text-2xl">
                  <RichText text={example.title} />
                </h3>
                <div className="mt-3">
                  <MD>{example.prompt}</MD>
                </div>
                <SafeSvg svg={example.svg} />
                <ol className="mt-3 list-decimal space-y-2 pl-5">
                  {example.steps.map((step) => (
                    <li key={step}>
                      <MD className="tight">{step}</MD>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 rounded-xl bg-sunken px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-faint">Answer</p>
                  <MD>{example.answer}</MD>
                </div>
              </article>
            ))}
          </div>
        </section>

        {lesson.python && (
          <section id="python" className="mt-12">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-serif text-3xl">Python</h2>
              <button
                type="button"
                className="no-print rounded-full border border-line px-3 py-1 text-sm text-muted"
                onClick={async () => {
                  await navigator.clipboard.writeText(lesson.python ?? "");
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1200);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <hr className="rule mt-2" />
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-line bg-sunken p-4 font-mono text-sm leading-relaxed">
              <code>{lesson.python}</code>
            </pre>
          </section>
        )}

        <section id="traps" className="mt-12">
          <h2 className="font-serif text-3xl">Common traps</h2>
          <hr className="rule mt-2" />
          <ul className="mt-4 space-y-3">
            {lesson.traps.map((trap) => (
              <li key={trap} className="rounded-xl border border-[color-mix(in_srgb,var(--danger)_45%,var(--line))] bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] px-4 py-3">
                <MD className="tight">{trap}</MD>
              </li>
            ))}
          </ul>
        </section>

        <section id="practice" className="mt-12">
          <h2 className="font-serif text-3xl">Practice</h2>
          <hr className="rule mt-2" />
          <p className="mt-4 text-sm text-muted">
            Original questions for this vault. On the real paper an MCQ deducts {""}
            <span className="whitespace-nowrap">1/3</span> or {""}
            <span className="whitespace-nowrap">2/3</span> for a wrong answer. MSQ and NAT do not, and nothing awards partial credit.
            Solutions stay hidden until you open them.
          </p>
          <div className="mt-4">
            <Practice questions={lesson.questions} />
          </div>
        </section>

        <nav className="mt-12 grid gap-3 border-t border-line pt-6 sm:grid-cols-2" aria-label="Adjacent lessons">
          {prev ? (
            <Link href={`/lesson/${prev.slug}`} className="rounded-2xl border border-line p-4 hover:border-accent">
              <span className="text-xs uppercase tracking-[0.14em] text-faint">Previous</span>
              <span className="mt-1 block font-serif text-xl">
                <RichText text={prev.title} />
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/lesson/${next.slug}`} className="rounded-2xl border border-line p-4 text-right hover:border-accent sm:col-start-2">
              <span className="text-xs uppercase tracking-[0.14em] text-faint">Next</span>
              <span className="mt-1 block font-serif text-xl">
                <RichText text={next.title} />
              </span>
            </Link>
          )}
        </nav>
      </article>

      <aside className="no-print sticky top-20 hidden h-fit px-3 py-10 xl:block">
        <p className="text-xs uppercase tracking-[0.16em] text-faint">On this page</p>
        <ul className="mt-3 space-y-2 text-sm">
          {nav.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className="text-muted hover:text-accent">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
