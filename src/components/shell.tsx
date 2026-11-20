"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { CatalogItem } from "@/lib/types";
import { plainMath } from "@/lib/math-text";
import { sections } from "@/lib/sections";
import { useProgress } from "@/lib/progress";
import { RichText } from "./rich-text";
import { SearchDialog } from "./search-dialog";

function lessonActive(pathname: string, slug: string) {
  return pathname === `/lesson/${slug}` || pathname === `/lesson/${slug}/`;
}

export function AppShell({
  catalog,
  children,
}: {
  catalog: CatalogItem[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { ready, completed, toggle, setMany } = useProgress();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const showSidebar = pathname !== "/";
  const doneCount = catalog.filter((item) => completed.has(item.slug)).length;
  const percent = catalog.length ? Math.round((100 * doneCount) / catalog.length) : 0;

  useEffect(() => {
    const current =
      catalog.find((item) => lessonActive(pathname, item.slug))?.section ??
      sections.find((section) => pathname.startsWith(`/section/${section.slug}`))?.slug;
    if (current) setOpenSections((value) => ({ ...value, [current]: true }));
    setMobileOpen(false);
  }, [pathname, catalog]);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (!typing && (event.key === "/" || (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)))) {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("pramana-theme", next);
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-4 py-4">
        <p className="text-xs uppercase tracking-[0.16em] text-faint">Syllabus</p>
        <p className="mt-1 font-serif text-2xl leading-none">
          {ready ? `${percent}%` : "—"}
        </p>
        <p className="text-sm text-muted">
          {ready ? `${doneCount} of ${catalog.length || 154} lessons` : "Progress is stored in this browser."}
        </p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-sunken">
          <div className="h-full bg-accent" style={{ width: ready ? `${percent}%` : "0%" }} />
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Lessons">
        {sections.map((section) => {
          const items = catalog.filter((item) => item.section === section.slug);
          const done = items.filter((item) => completed.has(item.slug)).length;
          const all = items.length > 0 && done === items.length;
          const partial = done > 0 && !all;
          const expanded = openSections[section.slug] ?? false;
          return (
            <div key={section.slug} className="mb-1">
              <div className="flex items-center gap-1 rounded-lg pr-1">
                <input
                  type="checkbox"
                  className="ml-2 h-3.5 w-3.5 accent-[var(--accent)]"
                  checked={all}
                  ref={(element) => {
                    if (element) element.indeterminate = partial;
                  }}
                  aria-label={`Mark ${section.short} ${all ? "incomplete" : "complete"}`}
                  onChange={() => setMany(items.map((item) => item.slug), !all)}
                />
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg px-2 py-2 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpenSections((value) => ({ ...value, [section.slug]: !expanded }))}
                >
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-[0.14em] text-faint">
                      {section.num < 8 ? `Section ${section.num}` : "Common"}
                    </span>
                    <span className="block truncate text-sm">{section.short}</span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-faint">
                    {items.length ? `${done}/${items.length}` : "0"}
                  </span>
                </button>
              </div>
              {expanded && (
                <ul className="mb-2 ml-3 border-l border-line pl-2">
                  <li>
                    <Link
                      href={`/section/${section.slug}`}
                      className={`block rounded-md px-2 py-1 text-sm text-muted hover:text-ink ${
                        pathname.startsWith(`/section/${section.slug}`) && !pathname.includes("/cheatsheet")
                          ? "text-accent"
                          : ""
                      }`}
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/section/${section.slug}/cheatsheet`}
                      className={`block rounded-md px-2 py-1 text-sm text-muted hover:text-ink ${
                        pathname.includes(`/section/${section.slug}/cheatsheet`) ? "text-accent" : ""
                      }`}
                    >
                      Cheat sheet
                    </Link>
                  </li>
                  {items.map((item) => {
                    const active = lessonActive(pathname, item.slug);
                    const checked = completed.has(item.slug);
                    return (
                      <li key={item.slug} className="flex items-start gap-1.5">
                        <input
                          type="checkbox"
                          className="mt-2 h-3.5 w-3.5 shrink-0 accent-[var(--accent)]"
                          checked={checked}
                          aria-label={`Mark ${plainMath(item.title)} complete`}
                          onChange={() => toggle(item.slug)}
                        />
                        <Link
                          href={`/lesson/${item.slug}`}
                          className={`block rounded-md px-1.5 py-1 text-sm leading-snug ${
                            active ? "bg-sunken text-accent" : "text-muted hover:text-ink"
                          }`}
                        >
                          <RichText text={item.title} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded bg-accent px-3 py-1 text-accent-ink">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--canvas)_88%,transparent)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-3 sm:px-5">
          {showSidebar && (
            <button
              type="button"
              className="rounded-md border border-line px-2 py-1 text-sm lg:hidden"
              aria-label="Open syllabus menu"
              onClick={() => setMobileOpen(true)}
            >
              Menu
            </button>
          )}
          <Link href="/" className="min-w-0 truncate font-serif text-sm leading-tight tracking-tight sm:text-lg">
            GATE Data Science &amp; AI Guide
          </Link>
          <nav className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link href="/track" className="rounded-full px-3 py-1 text-sm text-muted hover:text-ink">
              Track
            </Link>
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-full border border-line px-3 py-1 text-sm text-muted hover:text-ink"
            >
              Search <span className="hidden font-mono text-xs text-faint md:inline">/</span>
            </button>
            <Link
              href="/track"
              className="hidden rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-ink sm:inline"
            >
              {ready ? `${percent}%` : "Progress"}
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full border border-line px-3 py-1 text-sm text-muted"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </nav>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1400px]">
        {showSidebar && (
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-72 shrink-0 border-r border-line lg:block">
            {sidebar}
          </aside>
        )}
        <main id="content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/55" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] overflow-hidden border-r border-line bg-canvas">
            {sidebar}
          </aside>
        </div>
      )}

      <SearchDialog catalog={catalog} open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
