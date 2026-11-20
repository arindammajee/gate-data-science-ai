import Link from "next/link";
import { notFound } from "next/navigation";
import { MD } from "@/components/markdown";
import { PrintButton } from "@/components/print-button";
import { Tex } from "@/components/tex";
import { getCheatsheet } from "@/lib/cheatsheets";
import { getSection, sections } from "@/lib/sections";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return sections.map((section) => ({ slug: section.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) {
    return pageMetadata({
      title: "Cheat sheet not found | GATE DA 2027",
      description: "This formula sheet is not part of the GATE DA 2027 Data Science and AI notes.",
      path: `/section/${slug}/cheatsheet`,
    });
  }
  return pageMetadata({
    title: `${section.short} Formula Cheat Sheet | GATE DA 2027`,
    description: `${section.title} formulas and shortcuts for GATE Data Science and AI (GATE DA 2027). A one-page cheat sheet for the notes and practice questions.`,
    path: `/section/${section.slug}/cheatsheet`,
  });
}

export default async function CheatSheetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();
  const blocks = getCheatsheet(section.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        <Link href={`/section/${section.slug}`} className="hover:underline">
          {section.short}
        </Link>
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-4xl sm:text-5xl">Cheat sheet</h1>
        <PrintButton />
      </div>
      <p className="mt-3 text-muted">
        The identities worth having in your head for {section.title.toLowerCase()}. Conditions sit under the
        formula. When a line is easy to misread, the lesson next to it has the worked arithmetic.
      </p>
      <div className="mt-8 space-y-8">
        {blocks.map((block) => (
          <section key={block.heading} className="sheet-block">
            <h2 className="font-serif text-2xl">{block.heading}</h2>
            <hr className="rule mt-2" />
            {block.intro && <p className="mt-3 text-sm text-muted">{block.intro}</p>}
            {block.rows && (
              <div className="mt-3 space-y-3">
                {block.rows.map((row) => (
                  <figure key={`${block.heading}-${row.name}`} className="rounded-2xl border border-line bg-raised px-4 py-3">
                    <figcaption className="text-sm text-faint">{row.name}</figcaption>
                    <Tex latex={row.latex} display />
                    {row.note && <figcaption className="text-sm text-muted">{row.note}</figcaption>}
                  </figure>
                ))}
              </div>
            )}
            {block.bullets && (
              <ul className="mt-3 space-y-2">
                {block.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-xl border border-line px-4 py-2">
                    <MD className="tight">{bullet}</MD>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
