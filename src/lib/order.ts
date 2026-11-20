import outline from "@/content/outline.json";

export type WeekPlan = {
  id: string;
  title: string;
  blurb: string;
  section: string;
  slugs: string[];
};

export const weeks = outline.weeks as WeekPlan[];

export const LESSON_ORDER: string[] = weeks.flatMap((week) => week.slugs);

const sectionBySlug = new Map<string, string>();
const weekBySlug = new Map<string, WeekPlan>();
for (const week of weeks) {
  for (const slug of week.slugs) {
    sectionBySlug.set(slug, week.section);
    weekBySlug.set(slug, week);
  }
}

export function sectionOfSlug(slug: string) {
  return sectionBySlug.get(slug);
}

export function weekOfSlug(slug: string) {
  return weekBySlug.get(slug);
}

export function orderIndex(slug: string) {
  const index = LESSON_ORDER.indexOf(slug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}
