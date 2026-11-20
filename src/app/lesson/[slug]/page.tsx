import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LessonView } from "@/components/lesson-view";
import { getCatalog, getLesson, getNeighbors } from "@/lib/content";
import { getSection } from "@/lib/sections";

export function generateStaticParams() {
  return getCatalog().map((lesson) => ({ slug: lesson.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "Lesson" };
  return { title: lesson.title, description: lesson.summary };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const section = getSection(lesson.section);
  if (!section) notFound();
  const { prev, next } = getNeighbors(slug);
  return <LessonView lesson={lesson} section={section} prev={prev} next={next} />;
}
