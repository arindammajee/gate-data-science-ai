import Link from "next/link";
import { notFound } from "next/navigation";
import { MD } from "@/components/markdown";
import { SectionLessons } from "@/components/section-lessons";
import { getCatalog } from "@/lib/content";
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
      title: "Section not found | GATE DA 2027 Notes",
      description: "This section is not part of the GATE DA 2027 Data Science and AI syllabus.",
      path: `/section/${slug}`,
    });
  }
  return pageMetadata({
    title: `${section.title} Notes | GATE DA 2027 Data Science and AI`,
    description: `${section.title} notes and practice questions for GATE DA 2027. ${section.blurb}`,
    path: `/section/${slug}`,
  });
}

export default async function SectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const section = getSection(slug);
  if (!section) notFound();
  const lessons = getCatalog().filter((lesson) => lesson.section === section.slug);
  const minutes = lessons.reduce((sum, lesson) => sum + (lesson.minutes || 0), 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        {section.num === 8 ? "Common to every paper" : `Section ${section.num} of the DA syllabus`}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{section.title}</h1>
      <p className="mt-4 text-lg text-muted">{section.blurb}</p>
      <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-faint">
        <div>
          Study budget <span className="text-muted">{section.budget}</span>
        </div>
        <div>
          Plan <span className="text-muted">{section.weeks}</span>
        </div>
        <div>
          <span className="text-muted">{lessons.length} lessons</span>
          {minutes > 0 ? ` · about ${Math.round(minutes / 60)} hours` : ""}
        </div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-3 text-sm">
        <Link href={`/section/${section.slug}/cheatsheet`} className="rounded-full bg-accent px-4 py-1.5 font-medium text-accent-ink">
          Formula sheet
        </Link>
        <Link href="/track" className="rounded-full border border-line px-4 py-1.5">
          Place in the track
        </Link>
      </div>

      <div className="mt-8 text-[1.05rem]">
        <MD>{section.overview}</MD>
      </div>

      <h2 className="mt-10 font-serif text-3xl">What the questions tend to be</h2>
      <ul className="mt-3 space-y-2">
        {section.tested.map((item) => (
          <li key={item} className="rounded-xl border border-line px-4 py-3 text-muted">
            <MD className="tight">{item}</MD>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-serif text-3xl">Lessons</h2>
      <div className="mt-4">
        {lessons.length === 0 ? (
          <p className="text-muted">No lesson files are in this section yet.</p>
        ) : (
          <SectionLessons lessons={lessons} />
        )}
      </div>
    </div>
  );
}
