"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <h1 className="font-serif text-4xl">This page did not render.</h1>
      <p className="mt-3 text-muted">
        A lesson file may contain markup KaTeX could not recover from. You can try again.
      </p>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-ink">
        Try again
      </button>
    </div>
  );
}
