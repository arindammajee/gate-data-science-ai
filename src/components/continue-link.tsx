"use client";

import Link from "next/link";
import type { CatalogItem } from "@/lib/types";
import { useProgress } from "@/lib/progress";
import { RichText } from "./rich-text";

export function ContinueLink({ lessons }: { lessons: CatalogItem[] }) {
  const { ready, completed } = useProgress();
  const next = lessons.find((lesson) => !completed.has(lesson.slug)) ?? lessons[0];
  if (!next) {
    return (
      <Link href="/track" className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink">
        Open the track
      </Link>
    );
  }
  const starting = !ready || completed.size === 0;
  return (
    <Link href={`/lesson/${next.slug}`} className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink">
      {starting ? "Start: " : "Continue: "}
      <RichText text={next.title} />
    </Link>
  );
}
