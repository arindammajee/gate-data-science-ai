import type { Metadata } from "next";

export const SITE_NAME = "GATE Data Science & AI Guide";

export const HOME_TITLE = "GATE Data Science & AI Guide | GATE DA 2027 Notes and Practice Questions";

export const HOME_DESCRIPTION =
  "GATE DA 2027 notes and practice questions for Data Science and Artificial Intelligence. Every IIT Madras syllabus topic, with formulas, worked examples, and original MCQ, MSQ, and NAT questions.";

/** Public path prefix. Empty when the site is served at the domain root. */
export function basePath(): string {
  const raw = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
  if (!raw || raw === "/") return "";
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withSlash.replace(/\/$/, "");
}

/**
 * Absolute URL of the site root, without a trailing slash.
 * On GitHub Pages this includes the repo path, for example
 * https://arindammajee.github.io/gate-data-science-ai
 */
export function siteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:4178").trim();
  return raw.replace(/\/$/, "");
}

export function siteOrigin(): string {
  try {
    return new URL(siteUrl()).origin;
  } catch {
    return "http://127.0.0.1:4178";
  }
}

/** Absolute URL for a site path such as `/lesson/bayes-theorem/`. */
export function pageUrl(path: string): string {
  if (!path || path === "/") return `${siteUrl()}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(normalized);
  const withSlash = isFile || normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${siteUrl()}${withSlash}`;
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = pageUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "en_IN",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
