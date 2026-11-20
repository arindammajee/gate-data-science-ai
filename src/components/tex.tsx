import katex from "katex";

export function cleanLatex(input: string) {
  return input
    .trim()
    .replace(/^\$\$/, "")
    .replace(/\$\$$/, "")
    .replace(/^\$/, "")
    .replace(/\$$/, "")
    .trim();
}

export function Tex({
  latex,
  display = false,
  className = "",
  as,
}: {
  latex: string;
  display?: boolean;
  className?: string;
  as?: "span" | "div";
}) {
  const html = katex.renderToString(cleanLatex(latex), {
    throwOnError: false,
    displayMode: display,
    strict: "ignore",
  });
  const Tag = as ?? (display ? "div" : "span");
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
