import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Components } from "react-markdown";

const components: Components = {
  a({ href, children }) {
    const external = href?.startsWith("http");
    return (
      <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
        {children}
      </a>
    );
  },
  pre({ children }) {
    return <pre className="overflow-x-auto rounded-lg border border-line bg-sunken p-3 text-sm">{children}</pre>;
  },
};

export function MD({ children, className = "" }: { children: string; className?: string }) {
  return (
    <div className={`prose-pramana ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: "ignore" }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

export function SafeSvg({ svg }: { svg?: string | null }) {
  if (!svg) return null;
  const trimmed = svg.trim();
  if (!trimmed.startsWith("<svg") || /<script|on\w+=|javascript:/i.test(trimmed)) return null;
  return <div className="svg-frame my-3" dangerouslySetInnerHTML={{ __html: trimmed }} />;
}
