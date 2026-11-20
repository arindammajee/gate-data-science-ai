"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const KEY = "pramana-progress-v1";

type ProgressContextValue = {
  ready: boolean;
  completed: Set<string>;
  toggle: (slug: string) => void;
  setMany: (slugs: string[], on: boolean) => void;
  isDone: (slug: string) => boolean;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function readStored(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompleted(new Set(readStored()));
    setReady(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === KEY) setCompleted(new Set(readStored()));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setCompleted(next);
    localStorage.setItem(KEY, JSON.stringify([...next]));
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const next = new Set(completed);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      persist(next);
    },
    [completed, persist],
  );

  const setMany = useCallback(
    (slugs: string[], on: boolean) => {
      const next = new Set(completed);
      for (const slug of slugs) {
        if (on) next.add(slug);
        else next.delete(slug);
      }
      persist(next);
    },
    [completed, persist],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      ready,
      completed,
      toggle,
      setMany,
      isDone: (slug: string) => completed.has(slug),
    }),
    [ready, completed, toggle, setMany],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress must be used inside ProgressProvider");
  return value;
}
