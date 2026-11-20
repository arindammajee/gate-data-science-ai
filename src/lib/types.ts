export type Question = {
  id: string;
  type: "mcq" | "msq" | "nat";
  marks: 1 | 2;
  stem: string;
  options?: string[];
  answer: string[];
  tolerance?: number;
  solution: string;
  svg?: string;
};

export type Example = {
  title: string;
  prompt: string;
  steps: string[];
  answer: string;
  svg?: string;
};

export type Formula = {
  name: string;
  latex: string;
  note?: string;
};

export type Lesson = {
  slug: string;
  section: string;
  title: string;
  syllabus: string;
  minutes: number;
  summary: string;
  keywords: string[];
  intuition: string;
  definitions: { term: string; body: string }[];
  formulas: Formula[];
  properties: string[];
  examples: Example[];
  traps: string[];
  python?: string | null;
  questions: Question[];
};

export type CatalogItem = {
  slug: string;
  section: string;
  title: string;
  syllabus: string;
  minutes: number;
  summary: string;
  keywords: string[];
};
