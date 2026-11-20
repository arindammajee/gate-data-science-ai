import { TrackView } from "@/components/track-view";
import { getCatalog } from "@/lib/content";
import { weeks } from "@/lib/order";
import { pageMetadata } from "@/lib/site";
import type { CatalogItem } from "@/lib/types";

export const metadata = pageMetadata({
  title: "GATE DA 2027 Study Plan | Data Science and AI Lesson Track",
  description:
    "An 18-week GATE Data Science and AI study plan. Track GATE DA 2027 notes and practice questions across probability, linear algebra, machine learning, databases, and aptitude.",
  path: "/track",
});

export default function TrackPage() {
  const catalog = getCatalog();
  const bySlug: Record<string, CatalogItem | undefined> = {};
  for (const lesson of catalog) bySlug[lesson.slug] = lesson;
  return <TrackView weeks={weeks} bySlug={bySlug} />;
}
