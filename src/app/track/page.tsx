import type { Metadata } from "next";
import { TrackView } from "@/components/track-view";
import { getCatalog } from "@/lib/content";
import { weeks } from "@/lib/order";
import type { CatalogItem } from "@/lib/types";

export const metadata: Metadata = {
  title: "Study track",
  description: "Eighteen-week lesson track for GATE 2027 Data Science and Artificial Intelligence.",
};

export default function TrackPage() {
  const catalog = getCatalog();
  const bySlug: Record<string, CatalogItem | undefined> = {};
  for (const lesson of catalog) bySlug[lesson.slug] = lesson;
  return <TrackView weeks={weeks} bySlug={bySlug} />;
}
