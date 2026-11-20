"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-full border border-line px-4 py-1.5 text-sm"
    >
      Print
    </button>
  );
}
