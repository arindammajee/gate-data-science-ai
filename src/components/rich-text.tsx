import { splitMath } from "@/lib/math-text";
import { Tex } from "./tex";

/**
 * Render a heading, title, card, or nav label. Dollar-delimited math becomes
 * KaTeX; the surrounding words stay as text so the element can live inside
 * headings, links, and buttons.
 */
export function RichText({
  text,
  className = "",
  textTransform,
}: {
  text: string;
  className?: string;
  textTransform?: "uppercase";
}) {
  if (!text.includes("$")) {
    const value = textTransform === "uppercase" ? text.toUpperCase() : text;
    return className ? <span className={className}>{value}</span> : <>{value}</>;
  }
  const parts = splitMath(text);
  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.kind === "text") {
          const value = textTransform === "uppercase" ? part.value.toUpperCase() : part.value;
          return <span key={index}>{value}</span>;
        }
        return <Tex key={index} latex={part.value} display={part.display} as="span" />;
      })}
    </span>
  );
}
