import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LessonView } from "@/components/lesson-view";
import { getCatalog, getLesson, getNeighbors } from "@/lib/content";
import { getSection } from "@/lib/sections";
import { SITE_NAME, pageMetadata, pageUrl } from "@/lib/site";

export function generateStaticParams() {
  return getCatalog().map((lesson) => ({ slug: lesson.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) {
    return pageMetadata({
      title: "Lesson not found | GATE DA 2027 Notes",
      description: "This GATE Data Science and AI lesson is not on the GATE DA 2027 syllabus map.",
      path: `/lesson/${slug}`,
    });
  }
  const title = `${lesson.title} | GATE DA 2027 Notes and Practice Questions`;
  const description = `${lesson.title} notes for GATE Data Science and AI (GATE DA 2027). Definitions, formulas, worked examples, and original practice questions on ${lesson.syllabus}.`;
  return pageMetadata({ title, description, path: `/lesson/${slug}`, type: "article" });
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const section = getSection(lesson.section);
  if (!section) notFound();
  const { prev, next } = getNeighbors(slug);
  const url = pageUrl(`/lesson/${slug}`);
  const description = `${lesson.title} notes for GATE Data Science and AI (GATE DA 2027). Definitions, formulas, worked examples, and original practice questions on ${lesson.syllabus}.`;
  const resource = {
    "@context": "https://schema.org",
    "@type": ["LearningResource", "Article"],
    name: lesson.title,
    headline: lesson.title,
    description,
    url,
    inLanguage: "en",
    isAccessibleForFree: true,
    learningResourceType: "Lesson notes and practice questions",
    educationalLevel: "GATE DA 2027",
    teaches: lesson.syllabus,
    isPartOf: {
      "@type": "Course",
      name: SITE_NAME,
      url: pageUrl("/"),
    },
  };
  return (
    <>
      <JsonLd data={resource} />
      <LessonView lesson={lesson} section={section} prev={prev} next={next} />
    </>
  );
}
