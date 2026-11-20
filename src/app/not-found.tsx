import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">404</p>
      <h1 className="mt-2 font-serif text-4xl">That page is not on the syllabus.</h1>
      <p className="mt-3 text-muted">The address does not match a lesson, a section, or the track.</p>
      <Link href="/" className="mt-6 inline-block text-accent">
        Back to the map
      </Link>
    </div>
  );
}
