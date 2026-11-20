# GATE Data Science & AI Guide

Notes, worked examples, and original practice questions for **GATE 2027 Data Science & Artificial Intelligence (DA)**. Every subtopic in the official IIT Madras syllabus, plus General Aptitude, has its own lesson.

Progress (lesson and section ticks) is stored in `localStorage` in your browser.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on [http://127.0.0.1:4178](http://127.0.0.1:4178). Leave `NEXT_PUBLIC_BASE_PATH` unset so the app is served at the root.

## Static build

```bash
npm run build
```

The build checks that every syllabus lesson is present, then writes a static export to `out/`.

Canonical URLs, the sitemap, and Open Graph tags use `NEXT_PUBLIC_SITE_URL`. GitHub Pages also needs the path prefix:

```bash
NEXT_PUBLIC_BASE_PATH=/gate-data-science-ai \
NEXT_PUBLIC_SITE_URL=https://arindammajee.com/gate-data-science-ai \
npm run build
```

See `.env.example`.

## GitHub Pages

Pushes to `main` run `.github/workflows/deploy.yml`, which builds with that base path and deploys the `out/` folder with GitHub Actions. The live site is [https://arindammajee.com/gate-data-science-ai/](https://arindammajee.com/gate-data-science-ai/).

## Syllabus

- [GATE 2027 DA syllabus (IIT Madras)](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf)
- [GATE 2027 General Aptitude syllabus](https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/GA_GATE2027_Syllabus.pdf)

Section mark ranges on the site are a study budget. The brochure assigns 15 marks to General Aptitude and 85 to the DA subject; it does not split the 85 further.
