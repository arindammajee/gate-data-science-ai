import fs from "fs";
import path from "path";
import type { CatalogItem, Lesson } from "./types";
import { orderIndex, sectionOfSlug } from "./order";

const DIR = path.join(process.cwd(), "src/content/lessons");

function readLessons(): Lesson[] {
  if (!fs.existsSync(DIR)) return [];
  const files = fs.readdirSync(DIR).filter((file) => file.endsWith(".json"));
  const lessons: Lesson[] = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    lessons.push(JSON.parse(raw) as Lesson);
  }
  lessons.sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug));
  return lessons;
}

export function getLessons(): Lesson[] {
  return readLessons();
}

export function getLesson(slug: string): Lesson | undefined {
  return readLessons().find((lesson) => lesson.slug === slug);
}

export function getCatalog(): CatalogItem[] {
  return readLessons().map((lesson) => ({
    slug: lesson.slug,
    section: lesson.section || sectionOfSlug(lesson.slug) || "",
    title: lesson.title,
    syllabus: lesson.syllabus,
    minutes: lesson.minutes,
    summary: lesson.summary,
    keywords: lesson.keywords ?? [],
  }));
}

export function getNeighbors(slug: string) {
  const catalog = getCatalog();
  const index = catalog.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? catalog[index - 1] : null,
    next: index >= 0 && index < catalog.length - 1 ? catalog[index + 1] : null,
  };
}
