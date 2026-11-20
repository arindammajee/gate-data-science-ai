import Link from "next/link";
import { sections } from "@/lib/sections";
import { weeks } from "@/lib/order";
import type { CatalogItem } from "@/lib/types";
import { Tex } from "./tex";
import { RichText } from "./rich-text";
import { ContinueLink } from "./continue-link";

const facts = [
  ["65", "questions", "10 aptitude + 55 subject"],
  ["100", "marks", "3 hours, computer-based"],
  ["15", "aptitude", "5 × 1 mark and 5 × 2 marks"],
  ["85", "DA core", "25 × 1 mark and 30 × 2 marks"],
];

export function Home({ catalog }: { catalog: CatalogItem[] }) {
  const counts = new Map<string, number>();
  for (const item of catalog) counts.set(item.section, (counts.get(item.section) ?? 0) + 1);

  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.35fr_0.8fr] md:py-20">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              GATE 2027 · Data Science & AI · IIT Madras syllabus
            </p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[1.02] sm:text-6xl">
              The paper, one subtopic at a time.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              GATE Data Science &amp; AI Guide is a study vault for the GATE DA 2027 paper. Every line of the
              official syllabus has notes: a definition you can use, the formula written properly, two worked
              examples, the traps that cost the mark, and five original practice questions in MCQ, MSQ, and NAT form.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContinueLink lessons={catalog} />
              <Link href="/#map" className="rounded-full border border-line px-5 py-2.5 text-sm">
                Syllabus map
              </Link>
            </div>
            <p className="mt-4 text-sm text-faint">
              {catalog.length} {catalog.length === 1 ? "lesson" : "lessons"} on this site. Progress stays in this browser. No account.
            </p>
          </div>
          <aside className="rounded-3xl border border-line bg-raised p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <p className="text-xs uppercase tracking-[0.18em] text-faint">A specimen, not a slogan</p>
            <h2 className="mt-2 font-serif text-3xl">Bayes&apos; theorem</h2>
            <Tex
              display
              latex={String.raw`P(H_i\mid E)=\frac{P(E\mid H_i)\,P(H_i)}{\sum_j P(E\mid H_j)\,P(H_j)}`}
            />
            <p className="text-sm text-muted">
              The posterior is the prior, reweighted by how well that hypothesis predicted the evidence, then
              divided so the hypotheses still add to one. The false-positive rate is not one minus the
              true-positive rate.
            </p>
            <Link href="/lesson/bayes-theorem" className="mt-4 inline-block text-sm text-accent">
              Open the lesson
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {facts.map(([value, label, note]) => (
            <div key={label} className="border-line px-5 py-6 md:border-l first:md:border-l-0">
              <p className="font-serif text-4xl text-accent">{value}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.14em]">{label}</p>
              <p className="text-sm text-muted">{note}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto max-w-6xl px-5 pb-6 text-sm text-faint">
          The brochure fixes 65 questions and 100 marks, with aptitude at 15 and the DA subject at 85.
          That forces the subject split: 25 questions of one mark and 30 of two marks. A wrong MCQ costs
          1/3 or 2/3. MSQ and NAT have no negative marking and no partial credit.
        </p>
      </section>

      <section id="map" className="mx-auto max-w-6xl px-5 py-14">
        <div className="max-w-2xl">
          <h2 className="font-serif text-4xl">Syllabus map</h2>
          <p className="mt-3 text-muted">
            Seven sections from the IIT Madras DA syllabus, plus General Aptitude, which is common to every
            paper. Open a section for the overview, or the one-page sheet when you only need the identities.
          </p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <li key={section.slug} className="rounded-3xl border border-line bg-raised p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-sm text-accent">
                  {section.num === 8 ? "GA" : `0${section.num}`}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-faint">{section.weeks}</p>
              </div>
              <h3 className="mt-2 font-serif text-2xl leading-snug">
                <RichText text={section.title} />
              </h3>
              <p className="mt-2 text-sm text-muted">
                <RichText text={section.blurb} />
              </p>
              <p className="mt-3 text-sm text-faint">
                {(() => {
                  const count = counts.get(section.slug) ?? 0;
                  return `${count} ${count === 1 ? "lesson" : "lessons"}`;
                })()}{" "}
                · study budget {section.budget}
              </p>
              <div className="mt-4 flex gap-4 text-sm">
                <Link href={`/section/${section.slug}`} className="text-accent">
                  Overview
                </Link>
                <Link href={`/section/${section.slug}/cheatsheet`} className="text-muted hover:text-ink">
                  Cheat sheet
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-raised/40">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-serif text-4xl">How to budget the 85 marks</h2>
          <p className="mt-3 max-w-3xl text-muted">
            GATE 2027 does not publish a mark split inside DA. The ranges below are a revision budget, based
            on how long each section is and on the shape of the DA papers so far: probability and machine
            learning have carried more of the paper than single-variable calculus. They are not a promise
            about the 2027 question paper. Aptitude is the exception — that 15 is written down.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.14em] text-faint">
                <tr className="border-b border-line">
                  <th className="py-2 pr-4 font-medium">Section</th>
                  <th className="py-2 pr-4 font-medium">Budget</th>
                  <th className="py-2 font-medium">Why this much time</th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr key={section.slug} className="border-b border-line align-top">
                    <td className="py-3 pr-4">{section.short}</td>
                    <td className="py-3 pr-4 font-mono text-accent">{section.budget}</td>
                    <td className="py-3 text-muted">
                      <RichText text={section.blurb} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <h2 className="font-serif text-4xl">An 18-week track</h2>
        <p className="mt-3 max-w-3xl text-muted">
          About one lesson a day, with a weekly pass back over the sheet. Aptitude does not depend on the
          core, so you can pull those lessons forward — one every other evening — and keep week 18 for mixed
          sets instead.
        </p>
        <ol className="mt-8 grid gap-3 md:grid-cols-2">
          {weeks.map((week) => (
            <li key={week.id} className="rounded-2xl border border-line px-4 py-3">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">Week {week.id}</p>
              <p className="font-serif text-xl">{week.title}</p>
              <p className="text-sm text-muted">{week.blurb}</p>
              <p className="mt-1 text-xs text-faint">{week.slugs.length} lessons</p>
            </li>
          ))}
        </ol>
        <Link href="/track" className="mt-6 inline-block text-accent">
          Open the track and tick as you go
        </Link>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-serif text-4xl">What a lesson contains</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              ["Intuition", "Why the definition is shaped the way it is, before the symbols."],
              ["Definitions and formulas", "The statement you would write on the first line of a solution, set in KaTeX."],
              ["Properties", "The shortcuts that turn a two-mark calculation into a one-line one."],
              ["Two worked examples", "Every step visible, including the arithmetic."],
              ["Traps", "The confusion that looks like the right formula: rate versus scale, stable versus in-place, prior versus posterior."],
              ["Five questions", "MCQ, MSQ, and NAT. The solution is closed until you ask for it."],
            ].map(([title, body]) => (
              <li key={title} className="rounded-2xl border border-line p-4">
                <p className="font-serif text-xl">{title}</p>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-line px-5 py-8 text-sm text-faint">
        <div className="mx-auto flex max-w-6xl flex-col gap-2">
          <p>
            Syllabus source: GATE 2027 Data Science &amp; Artificial Intelligence and General Aptitude, IIT Madras
            (organising institute).
          </p>
          <p>
            <a className="text-muted underline decoration-line underline-offset-2" href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf">
              Official DA syllabus PDF
            </a>
            {" · "}
            <a className="text-muted underline decoration-line underline-offset-2" href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/GA_GATE2027_Syllabus.pdf">
              Official GA syllabus PDF
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
