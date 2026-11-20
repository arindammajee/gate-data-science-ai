# Pramana

A static study vault for **GATE 2027 Data Science & Artificial Intelligence**. Every subtopic in the official IIT Madras DA syllabus, plus General Aptitude, has its own lesson: intuition, definitions, KaTeX formulas, properties, two worked examples, traps, and original MCQ, MSQ, and NAT practice.

Progress (lesson and section ticks) is stored in `localStorage` in your browser.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4178](http://127.0.0.1:4178).

## Static build

```bash
npm run build
```

`npm run build` checks that every syllabus lesson is present, then writes a static export to `out/`. That folder can be deployed on Vercel as a static site. With `output: "export"` in `next.config.ts`, Vercel’s Next.js preset publishes the export.

Content lives in `src/content/lessons/*.json`. The syllabus order is `src/content/outline.json`.

## Syllabus

The lesson list follows:

- [GATE 2027 DA syllabus (IIT Madras)](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf)
- [GATE 2027 General Aptitude syllabus](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/GA_GATE2027_Syllabus.pdf)

Section mark ranges on the site are a study budget. The brochure assigns 15 marks to General Aptitude and 85 to the DA subject; it does not split the 85 further.
