# UNDP Somalia · Partnership & Communication Dashboard

A static, donor-facing dashboard for the UNDP Somalia Country Office Partnership
& Communication team. Single scrolling page, editorial aesthetic, built with
Next.js 14, Tailwind CSS, Recharts, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Update data

All numbers come from a single file: [`data/data.json`](./data/data.json).

Edit the JSON directly to refresh the dashboard. The shape is:

```ts
{
  asOfDate: "YYYY-MM-DD",
  lastUpdated: "YYYY-MM-DD",
  kpis: { totalPipeline, adjustedPipeline2026, cashReceived2026,
          annualTarget, totalBudget, totalExpenditure,
          pctDeliveryTarget, pctDeliveryBudget,
          opportunityCount, donorCount, ... },
  pipelineByStage: [{ stage, label, value, count, order }],
  pipelineByDonorType: [{ type, label, value }],
  byPortfolio: [{ code, name, pipeline, cash, target }],
  cashByMonth: [{ month, y2025, y2026 }],
  topDonors: [{ rank, name, type, pipeline, cash }]
}
```

A future `scripts/generate.py` can read `pipeline_and_programme_v2.xlsx` and
emit this JSON; for now the file is hand-maintained.

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Import the repo at https://vercel.com/new.
3. Accept defaults (Framework: Next.js). No environment variables required.

Or, via the CLI:

```bash
npm i -g vercel
vercel
```

## Project layout

```
app/                Next.js App Router entry
  layout.tsx        Fonts (Inter + Newsreader) and shell
  page.tsx          Single scrolling page composition
  globals.css       Tailwind + small global utilities
components/         Each section as its own component
data/data.json      Single source of truth for all numbers
lib/format.ts       $110.8M / 7.8% formatting helpers
public/             UNDP logo
```

## Design notes

- **Numbers are the hero.** KPI values lead at large weight-300 type with small
  uppercase eyebrow labels.
- **Restrained palette.** UNDP blue used as accent; ink/muted/surface tokens
  carry the rest. No drop shadows; lift comes from background contrast and
  hairline rules.
- **Charts custom-styled.** Recharts defaults are stripped and rebuilt; the
  stage funnel and stacked bar are custom SVG/divs rather than the built-in
  Recharts equivalents.
- **Typography.** Inter for body, Newsreader (serif) for the page title and
  every section heading — that pairing alone makes the report feel editorial.
- **Animations.** Subtle fade-up on scroll, staggered, with prefers-reduced-motion
  honoured.
