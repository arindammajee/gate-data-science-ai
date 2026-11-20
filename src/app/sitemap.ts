import type { MetadataRoute } from "next";
import { getCatalog } from "@/lib/content";
import { sections } from "@/lib/sections";
import { pageUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const lessons = getCatalog().map((lesson) => ({
    url: pageUrl(`/lesson/${lesson.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const sectionPages = sections.flatMap((section) => [
    {
      url: pageUrl(`/section/${section.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: pageUrl(`/section/${section.slug}/cheatsheet`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  return [
    { url: pageUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: pageUrl("/track"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...sectionPages,
    ...lessons,
  ];
}
