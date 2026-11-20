export type MathPart =
  | { kind: "text"; value: string }
  | { kind: "math"; value: string; display: boolean };

const MATH_PATTERN = /\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g;

/** Split a string into prose and `$...$` / `$$...$$` segments. */
export function splitMath(input: string): MathPart[] {
  if (!input.includes("$")) return [{ kind: "text", value: input }];
  const parts: MathPart[] = [];
  const pattern = new RegExp(MATH_PATTERN.source, "g");
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ kind: "text", value: input.slice(last, index) });
    if (match[1] != null) parts.push({ kind: "math", value: match[1], display: true });
    else parts.push({ kind: "math", value: match[2] ?? "", display: false });
    last = index + match[0].length;
  }
  if (last < input.length) parts.push({ kind: "text", value: input.slice(last) });
  if (parts.length === 0) parts.push({ kind: "text", value: input });
  return parts;
}

const SUPERSCRIPT: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
  n: "ⁿ",
  i: "ⁱ",
  T: "ᵀ",
};

const SUBSCRIPT: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
  n: "ₙ",
  i: "ᵢ",
  a: "ₐ",
  e: "ₑ",
  o: "ₒ",
  x: "ₓ",
  h: "ₕ",
  k: "ₖ",
  j: "ⱼ",
  m: "ₘ",
  p: "ₚ",
  s: "ₛ",
  t: "ₜ",
};

function toScript(value: string, table: Record<string, string>) {
  return [...value].map((char) => table[char] ?? char).join("");
}

/**
 * Turn a LaTeX fragment into readable plain text with no backslashes.
 * Used for titles, meta descriptions, JSON-LD, and the search index.
 */
export function latexToPlain(source: string): string {
  let text = source.trim();
  text = text.replace(/\\(?:left|right|bigl|bigr|Bigl|Bigr|biggl|biggr|big|Big|bigg|Bigg)\b/g, "");
  text = text.replace(/\\(?:quad|qquad|,|;|:|!| |\n)\s*/g, " ");
  text = text.replace(/\\(?:hat|bar|tilde|vec|dot|ddot|overline|underline)\{([^{}]*)\}/g, "$1");
  text = text.replace(/\\(?:hat|bar|tilde|vec|dot|ddot)\s*/g, "");
  for (let pass = 0; pass < 4; pass += 1) {
    text = text.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "($1)/($2)");
    text = text.replace(/\\binom\{([^{}]*)\}\{([^{}]*)\}/g, "C($1,$2)");
    text = text.replace(/\\sqrt\{([^{}]*)\}/g, "sqrt($1)");
    text = text.replace(/\\(?:mathrm|text|operatorname|mathbf|mathit|mathsf|mbox)\{([^{}]*)\}/g, "$1");
  }
  const symbols: [RegExp, string][] = [
    [/\\mathbb\{R\}/g, "ℝ"],
    [/\\mathbb\{N\}/g, "ℕ"],
    [/\\mathbb\{Z\}/g, "ℤ"],
    [/\\mathbb\{Q\}/g, "ℚ"],
    [/\\mathbb\{C\}/g, "ℂ"],
    [/\\mathbb\{E\}/g, "E"],
    [/\\times(?![a-zA-Z])/g, "×"],
    [/\\cdot(?![a-zA-Z])/g, "·"],
    [/\\pm(?![a-zA-Z])/g, "±"],
    [/\\mp(?![a-zA-Z])/g, "∓"],
    [/\\(?:leq|le)(?![a-zA-Z])/g, "≤"],
    [/\\(?:geq|ge)(?![a-zA-Z])/g, "≥"],
    [/\\(?:neq|ne)(?![a-zA-Z])/g, "≠"],
    [/\\approx(?![a-zA-Z])/g, "≈"],
    [/\\equiv(?![a-zA-Z])/g, "≡"],
    [/\\sim(?![a-zA-Z])/g, "∼"],
    [/\\propto(?![a-zA-Z])/g, "∝"],
    [/\\notin(?![a-zA-Z])/g, "∉"],
    [/\\in(?![a-zA-Z])/g, "∈"],
    [/\\subseteq(?![a-zA-Z])/g, "⊆"],
    [/\\subset(?![a-zA-Z])/g, "⊂"],
    [/\\supseteq(?![a-zA-Z])/g, "⊇"],
    [/\\supset(?![a-zA-Z])/g, "⊃"],
    [/\\cup(?![a-zA-Z])/g, "∪"],
    [/\\cap(?![a-zA-Z])/g, "∩"],
    [/\\leftrightarrow(?![a-zA-Z])/g, "↔"],
    [/\\rightarrow(?![a-zA-Z])/g, "→"],
    [/\\leftarrow(?![a-zA-Z])/g, "←"],
    [/\\Rightarrow(?![a-zA-Z])/g, "⇒"],
    [/\\Leftarrow(?![a-zA-Z])/g, "⇐"],
    [/\\mapsto(?![a-zA-Z])/g, "↦"],
    [/\\top(?![a-zA-Z])/g, "ᵀ"],
    [/\\to(?![a-zA-Z])/g, "→"],
    [/\\infty(?![a-zA-Z])/g, "∞"],
    [/\\partial(?![a-zA-Z])/g, "∂"],
    [/\\nabla(?![a-zA-Z])/g, "∇"],
    [/\\sum(?![a-zA-Z])/g, "Σ"],
    [/\\prod(?![a-zA-Z])/g, "Π"],
    [/\\int(?![a-zA-Z])/g, "∫"],
    [/\\varepsilon(?![a-zA-Z])/g, "ε"],
    [/\\epsilon(?![a-zA-Z])/g, "ε"],
    [/\\vartheta(?![a-zA-Z])/g, "θ"],
    [/\\theta(?![a-zA-Z])/g, "θ"],
    [/\\varphi(?![a-zA-Z])/g, "φ"],
    [/\\phi(?![a-zA-Z])/g, "φ"],
    [/\\alpha(?![a-zA-Z])/g, "α"],
    [/\\beta(?![a-zA-Z])/g, "β"],
    [/\\gamma(?![a-zA-Z])/g, "γ"],
    [/\\delta(?![a-zA-Z])/g, "δ"],
    [/\\zeta(?![a-zA-Z])/g, "ζ"],
    [/\\eta(?![a-zA-Z])/g, "η"],
    [/\\iota(?![a-zA-Z])/g, "ι"],
    [/\\kappa(?![a-zA-Z])/g, "κ"],
    [/\\lambda(?![a-zA-Z])/g, "λ"],
    [/\\mu(?![a-zA-Z])/g, "μ"],
    [/\\nu(?![a-zA-Z])/g, "ν"],
    [/\\xi(?![a-zA-Z])/g, "ξ"],
    [/\\pi(?![a-zA-Z])/g, "π"],
    [/\\rho(?![a-zA-Z])/g, "ρ"],
    [/\\sigma(?![a-zA-Z])/g, "σ"],
    [/\\tau(?![a-zA-Z])/g, "τ"],
    [/\\chi(?![a-zA-Z])/g, "χ"],
    [/\\psi(?![a-zA-Z])/g, "ψ"],
    [/\\omega(?![a-zA-Z])/g, "ω"],
    [/\\Gamma(?![a-zA-Z])/g, "Γ"],
    [/\\Delta(?![a-zA-Z])/g, "Δ"],
    [/\\Theta(?![a-zA-Z])/g, "Θ"],
    [/\\Lambda(?![a-zA-Z])/g, "Λ"],
    [/\\Sigma(?![a-zA-Z])/g, "Σ"],
    [/\\Omega(?![a-zA-Z])/g, "Ω"],
    [/\\log(?![a-zA-Z])/g, "log"],
    [/\\ln(?![a-zA-Z])/g, "ln"],
    [/\\exp(?![a-zA-Z])/g, "exp"],
    [/\\sin(?![a-zA-Z])/g, "sin"],
    [/\\cos(?![a-zA-Z])/g, "cos"],
    [/\\tan(?![a-zA-Z])/g, "tan"],
    [/\\min(?![a-zA-Z])/g, "min"],
    [/\\max(?![a-zA-Z])/g, "max"],
    [/\\det(?![a-zA-Z])/g, "det"],
    [/\\dim(?![a-zA-Z])/g, "dim"],
    [/\\rank(?![a-zA-Z])/g, "rank"],
    [/\\Pr(?![a-zA-Z])/g, "P"],
    [/\\mid(?![a-zA-Z])/g, "|"],
    [/\\\|/g, "‖"],
    [/\\%/g, "%"],
    [/\\&/g, "&"],
    [/\\#/g, "#"],
    [/\\_/g, "_"],
    [/\\\{/g, "{"],
    [/\\\}/g, "}"],
    [/\\\\/g, " "],
  ];
  for (const [pattern, replacement] of symbols) text = text.replace(pattern, replacement);
  text = text.replace(/\^\{([^{}]+)\}/g, (_, inner: string) => toScript(inner, SUPERSCRIPT));
  text = text.replace(/\^([A-Za-z0-9])/g, (_, char: string) => toScript(char, SUPERSCRIPT));
  text = text.replace(/\^ᵀ/g, "ᵀ");
  text = text.replace(/_\{([^{}]+)\}/g, (_, inner: string) => toScript(inner, SUBSCRIPT));
  text = text.replace(/_([A-Za-z0-9])/g, (_, char: string) => toScript(char, SUBSCRIPT));
  text = text.replace(/\\([a-zA-Z]+)/g, "$1");
  text = text.replace(/[{}\\]/g, "");
  return text.replace(/\s+/g, " ").trim();
}

/** Prose for `<title>`, descriptions, JSON-LD, aria labels, and the search index. */
export function plainMath(input: string): string {
  if (!input.includes("$") && !input.includes("\\")) return input;
  const plain = splitMath(input)
    .map((part) => (part.kind === "math" ? latexToPlain(part.value) : part.value))
    .join("");
  return plain
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/([([\]])\s+/g, "$1")
    .trim();
}
