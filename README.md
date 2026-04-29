# UNDP Somalia · Partnership Dashboard

An executive-grade, tab-based dashboard for the UNDP Somalia Country Office
Partnership & Communication team. Built with Next.js 14, Tailwind, Recharts
and Framer Motion. Static-exportable, deployable to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Update data

All numbers come from a single file: [`data/data.json`](./data/data.json).
The file is the only source of truth for every tab. Edit it directly and
the dashboard refreshes.

Top-level keys:

| Key | Drives |
| --- | --- |
| `asOfDate`, `lastUpdated` | Header timestamps |
| `snapshot` | Tab 1 — eight KPI tiles |
| `donorTypeCounts` / `pipelineByDonorType` | Tab 1 charts |
| `pipelineByStage` | Tab 1 stage funnel |
| `donorRegister` | Tab 2 register table |
| `pipeline` / `delivery` | Tab 3 hero metrics |
| `opportunities` | Tab 3 live opportunities table |
| `agreementsReview` / `fundApplications` | Tab 3 right column |
| `innovativeFinance` / `deRiskingInstruments` | Tab 4 |
| `toolkits` | Tab 5 resource grid |
| `team` / `faqs` | Tab 6 |
| `pipelineStages` | Tab 8 stage cards |

## Build & deploy (Vercel)

```bash
npm run build       # produces /out — static export
```

Push to GitHub and import the repo at https://vercel.com/new. Framework
detection picks Next.js automatically; no env vars are required. The
project is configured for static export (`output: "export"` in
`next.config.js`).

## Project layout

```
app/                Next.js App Router shell (layout, page, globals.css)
components/
  Dashboard.tsx     Tab state + animated crossfade
  TopNav.tsx        Two-row masthead with animated underline (layoutId)
  primitives/       KpiTile, RagDot, TrendArrow, StatusPill, SectionLabel
  charts/           DonorTypeBar, StageFunnel
  tabs/             One file per tab (Snapshot, DonorRelations, …)
data/data.json      Single source of truth for all numbers
lib/format.ts       $110.8M · 7.8% · date helpers · RAG / trend mappings
public/             UNDP logo
```

## Design system

- **Inter** for body text, **Newsreader** (serif) for section headings,
  **IBM Plex Mono** for tabular figures and editorial numerals.
- Strict 8px spacing grid; hairline 1px borders only — no drop shadows.
- UNDP blue (`#006EB5`) used as a single accent against an editorial
  near-white surface (`#FBFBF9`).
- Numbers set in light weight at large sizes; tabular numerals everywhere
  numbers appear.
- Charts strip the Recharts defaults (gridlines, axis lines, legends) and
  rebuild from custom SVG/divs.
- Status pills are outline-only with uppercase tracked monospace.
- RAG dots are 8px circles, not traffic-light buttons.
- Tab transitions are a Framer-Motion crossfade; the active-tab underline
  is a single `motion.div` with a shared `layoutId` for smooth slide.
