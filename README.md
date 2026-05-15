<div align="center">

# Folio Forge

**A deterministic portfolio operating system.**
Design, theme, and export complete Astro portfolio sites — without an AI runtime, a backend, or an account.

[![Live](https://img.shields.io/badge/live-zacgibson.work%2Ffolio--forge-8B5CF6?style=for-the-badge&labelColor=08090c)](https://zacgibson.work/folio-forge/)
[![Deploy guide](https://img.shields.io/badge/deploy_guide-walkthrough-A78BFA?style=for-the-badge&labelColor=08090c)](https://zacgibson.work/projects/folio-forge/deploy)
[![Astro 6](https://img.shields.io/badge/Astro-6.1-FF5D01?style=for-the-badge&logo=astro&labelColor=08090c)](https://astro.build)
[![License](https://img.shields.io/badge/license-MIT-3ECF8E?style=for-the-badge&labelColor=08090c)](#license)

</div>

---

## What this is

This repo is a small, opinionated **monorepo workspace** that produces *Folio Forge* — a browser-based portfolio builder that lets you assemble a static Astro site through schema-driven templates and ship it as a complete project ZIP.

You build in the editor → click Export → unzip → `npm install && npm run build` → deploy. There is no hosted account, no LLM API call, no rendered HTML guessing. Every output is deterministic and inspectable, and every section you place is a typed entity with a Zod schema behind it.

> **Live builder:** [zacgibson.work/folio-forge](https://zacgibson.work/folio-forge/)
> **End-to-end deploy guide:** [zacgibson.work/projects/folio-forge/deploy](https://zacgibson.work/projects/folio-forge/deploy)

## What's in the box

```
zacgibsonwork/
├─ apps/
│  └─ builder/                  # Folio Forge — the Astro 6 builder app (React island editor)
│
├─ packages/
│  ├─ section-schema/           # Zod schemas for every section type a portfolio can contain
│  ├─ theme-engine/             # Token system: typography, color, spacing, motion presets
│  ├─ exporter/                 # Packages a builder state into a complete Astro 6 project + ZIP
│  ├─ site-runtime/             # Runtime that exported portfolios use (View Transitions, theme switch, etc.)
│  └─ ui/                       # Primitives shared between builder and exported sites
│
├─ supabase/
│  └─ schema.sql                # (Optional, V2) account / portfolio / publish persistence
│
├─ docs/
│  └─ portfolio-os-architecture.md
│
├─ index.html                   # Legacy single-file portfolio (predates the workspace)
├─ tsconfig.base.json
└─ package.json                 # npm workspaces root
```

## Why deterministic

Generated portfolios drift. A schema-driven, deterministic builder produces the **same output for the same input** every time, ships static HTML, and lets the owner read every line of the export. Surface variety comes from theme tokens + motion presets + Pexels material packs; the Astro export is what actually gets deployed.

| Trait                              | Folio Forge                | LLM-generated portfolios |
|------------------------------------|----------------------------|--------------------------|
| Same input → same output           | ✅                         | ❌                       |
| Reads every line of the export     | ✅                         | ❌                       |
| Runs offline after first load      | ✅                         | ❌                       |
| Account or API key required        | ❌                         | usually                  |
| Token cost per regeneration        | $0                         | per request              |
| Output is a complete Astro project | ✅                         | usually a single HTML    |

## Quick start

Requires **Node ≥ 22** and **npm ≥ 10**.

```bash
git clone https://github.com/zgib89/zacgibsonwork.git
cd zacgibsonwork
npm install
npm run dev          # http://127.0.0.1:4321
```

Other workspace scripts:

```bash
npm run check        # TypeScript across every package + app
npm run build        # Build all workspaces
npm run preview      # Preview the production build of the builder
```

## Inside the builder

The Style panel (rebuilt April 2026) is split into 5 named subpanels — pill-toggle at the top to flip between them.

### Colors
- 6-token palette: `primary / accent / background / surface / text / muted`
- Click-anywhere-to-pick swatches, hex codes shown inline
- Single-strip palette preview at the top so you can see all six interacting

### Typography
- **28 fonts** organized into 4 categories — sans (9), serif (7), display (7), mono (5)
- Each option in the picker renders **its own name in its own font**, with a one-line "register" description
- Heading / body / mono pickers, all loaded via Google Fonts in both the live preview and the exported site

### Layout
- Corner radius
- Shadow depth
- Section spacing
- Max content width

### Motion
- **Six named personalities:** *Still · Quiet · Editorial · Cinematic · Brutalist · Playful* — one click sets entrance + hover + highlight + level + duration + stagger together
- Collapsible "Fine controls" details disclosure for the granular knobs

### Background
- **Live preview frame** at the top — composites material + dark overlay + opacity layer + blur in real time
- Category filter pills (`All · Stone · Metal · Wood · Fabric · Paper · Abstract`)
- 3-column grid of Pexels material thumbs with selected-state ring + check badge
- Sliders for image opacity, dark overlay strength, and blur

## Section + template system

Every renderable thing in a portfolio is a **typed section**. The contracts live in `@portfolio-os/section-schema`:

- `hero`, `about`, `work`, `services`, `stack`, `connect`, `now`, `projects`, `text`, `gallery`, ...
- Each section type has named **variants** (e.g. hero: `tight / wide / split`)
- Each section's content is validated via a Zod schema before render
- Templates are pre-built section orderings + theme token presets

A template change re-applies its theme tokens but preserves your content. A section reorder is a single-click affordance.

## Export pipeline

`@portfolio-os/exporter` builds a complete Astro 6 project from a `Portfolio` state object. The output ZIP includes:

```
your-portfolio/
├─ src/
│  ├─ pages/index.astro        # generated from your sections
│  ├─ layouts/                 # site-runtime layout + theme application
│  └─ styles/                  # tokens + motion + base.css
├─ public/                     # any selected Pexels material lives here
├─ astro.config.mjs            # Cloudflare-Pages-friendly defaults
├─ package.json                # pinned to the same Astro 6 / Node 22 baseline
└─ README.md                   # deploy instructions for the recipient
```

Recipient just runs:

```bash
npm install && npm run build
npx wrangler pages deploy dist
```

— or follows the [deploy guide on zacgibson.work](https://zacgibson.work/projects/folio-forge/deploy) for the full Cloudflare-Pages-with-custom-domain walkthrough.

## Tech stack

| Layer        | Choice                                |
|--------------|---------------------------------------|
| Framework    | [Astro 6.1](https://astro.build)      |
| UI islands   | [React 19](https://react.dev)         |
| Types        | TypeScript 5.8 (strict)               |
| Schemas      | [Zod](https://zod.dev) (via `astro/zod`) |
| Icons        | [Lucide](https://lucide.dev)          |
| Build        | Vite + Astro Sharp image pipeline     |
| Hosting      | [Cloudflare Pages](https://pages.cloudflare.com) (mounted under `/folio-forge/`) |
| Backend      | None at runtime. Optional Supabase schema in `/supabase/schema.sql` for V2 accounts. |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Folio Forge (apps/builder)               │
│                                                             │
│   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   │
│   │   Sections   │   │    Style     │   │    Export    │   │
│   │    panel     │   │    panel     │   │    panel     │   │
│   └──────┬───────┘   └──────┬───────┘   └──────┬───────┘   │
│          │                  │                  │           │
│          ▼                  ▼                  ▼           │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              Portfolio (state object)               │  │
│   │   sections[], theme, settings, slug, name, ...      │  │
│   └─────────┬────────────────────────┬──────────────────┘  │
└─────────────┼────────────────────────┼──────────────────────┘
              │                        │
   ┌──────────▼────────────┐     ┌─────▼──────────┐
   │   live iframe preview │     │   ZIP export   │
   │   (renderPortfolioHtml)│    │ (buildAstroProject) │
   └───────────────────────┘     └────────────────┘
```

### Package responsibilities

| Package                         | What it owns                                                        |
|---------------------------------|---------------------------------------------------------------------|
| `@portfolio-os/section-schema`  | Section types, variants, fields, templates, sample data factories.  |
| `@portfolio-os/theme-engine`    | Token mutation, CSS-var serialization, font library, motion presets.|
| `@portfolio-os/exporter`        | Render-to-HTML preview + Astro project generator + ZIP packer.      |
| `@portfolio-os/site-runtime`    | What the *exported* sites import — layout shell, theme application. |
| `@portfolio-os/ui`              | `cx()` and shared atoms used by both builder and exported sites.    |

The build pipeline is one direction: builder state → schema validation → rendered preview / exported project. The exporter never touches an LLM. The site-runtime never imports the builder.

## Deployment

Folio Forge currently lives at [`zacgibson.work/folio-forge/`](https://zacgibson.work/folio-forge/) — mounted as a sub-route of [zacgibson.work](https://zacgibson.work) so it shares a Cloudflare Pages project with the parent portfolio site. The builder is built with `base: "/folio-forge"` in its `astro.config.mjs`, then its `dist/` is copied into the parent site's `public/folio-forge/` at deploy time. (See [`docs/portfolio-os-architecture.md`](./docs/portfolio-os-architecture.md) for the full deploy story.)

For deploying *your own export* of a portfolio: see the step-by-step manual + Claude Code paths at [zacgibson.work/projects/folio-forge/deploy](https://zacgibson.work/projects/folio-forge/deploy).

## Contributing

This is a one-person workspace I build in the open. PRs and issues welcome, but priorities are mine. The repo's house style:

- TypeScript everywhere; no `.js` files.
- Validation through Zod at every system boundary.
- Schema first, UI second. Adding a section type starts in `@portfolio-os/section-schema`, never in the React component.
- Motion respects `prefers-reduced-motion` at every entry point.
- The exported site has no dependency on the builder. Ever.

## License

[MIT](./LICENSE) — the code, the section schemas, the export templates. The bundled Pexels materials are governed by [Pexels License](https://www.pexels.com/license/) (free for use, attribution appreciated, no resale of unaltered originals).

## Author

Built by **[Zac Gibson](https://zacgibson.work)** — IAM, developer, author. Tennessee, USA.

If Folio Forge saves you a weekend, that's the win.
