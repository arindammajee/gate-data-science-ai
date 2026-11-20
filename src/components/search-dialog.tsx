"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import type { CatalogItem } from "@/lib/types";
import { plainMath } from "@/lib/math-text";
import { getSection } from "@/lib/sections";
import { RichText } from "./rich-text";

export function SearchDialog({
  catalog,
  open,
  onClose,
}: {
  catalog: CatalogItem[];
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const indexed = useMemo(
    () =>
      catalog.map((item) => ({
        item,
        plainTitle: plainMath(item.title),
        plainSyllabus: plainMath(item.syllabus),
        plainKeywords: item.keywords.map((keyword) => plainMath(keyword)).join(" "),
        plainSummary: plainMath(item.summary),
      })),
    [catalog],
  );
  const fuse = useMemo(
    () =>
      new Fuse(indexed, {
        keys: [
          { name: "plainTitle", weight: 0.4 },
          { name: "plainSyllabus", weight: 0.22 },
          { name: "plainKeywords", weight: 0.24 },
          { name: "plainSummary", weight: 0.14 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
      }),
    [indexed],
  );

  const results = query.trim() ? fuse.search(query.trim()).slice(0, 12).map((hit) => hit.item.item) : [];

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const id = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const go = (slug: string) => {
    onClose();
    router.push(`/lesson/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
      <button type="button" aria-label="Close search" className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search lessons"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-raised shadow-[var(--shadow)]"
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((value) => Math.min(value + 1, Math.max(results.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((value) => Math.max(value - 1, 0));
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              go(results[active].slug);
            } else if (event.key === "Escape") {
              onClose();
            }
          }}
          placeholder="Search lessons, formulas, syllabus lines"
          className="w-full border-b border-line bg-transparent px-4 py-4 text-lg text-ink outline-none placeholder:text-faint"
        />
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-3 py-6 text-sm text-muted">
              Try Bayes, SVD, normal forms, LOOCV, Dijkstra, or alpha-beta.
            </p>
          )}
          {query.trim() && results.length === 0 && (
            <p className="px-3 py-6 text-sm text-muted">No lesson matches that.</p>
          )}
          <ul>
            {results.map((item, index) => {
              const section = getSection(item.section);
              return (
                <li key={item.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onClick={() => go(item.slug)}
                    className={`w-full rounded-xl px-3 py-2.5 text-left ${index === active ? "bg-sunken" : ""}`}
                  >
                    <span className="block text-xs uppercase tracking-[0.14em] text-faint">
                      {section ? `${section.num}. ${section.short}` : item.section}
                    </span>
                    <span className="block font-serif text-lg leading-snug">
                      <RichText text={item.title} />
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      <RichText text={item.summary} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
