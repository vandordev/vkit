# vkit v0 — foundation and landing

Status: Approved · 2026-11-26

## Goal

Give Vandor Kits one public home before any CLI exists: a repository with the
roadmap and rules, and a one-page site that points to the two existing kits,
`vkit-zenith` and `vkit-orbit`, with a start command that works today.

## Scope

1. **Repository `vandordev/vkit`** (currently empty, public):
   - `README.md` — what vkit is, the two kits, how to start, planned layout
     (`site/` now; generator folders arrive in v1, not created as empty folders).
   - `ROADMAP.md` — zenith and orbit are the v0 entry points only:
     - v0: this home; start from zenith or orbit with `giget`.
     - v1: a better-t-stack-style generator (`bunx vkit create`) that composes a
       project from template fragments harvested from zenith and orbit. Borrow
       better-t-stack's engine and test approach (MIT, notice kept), not its
       stack templates. CI generates every core combination in memory and
       installs/builds a curated set (the drift lesson from orbit's recipes).
       Staged: v1.0 one base reproducing zenith exactly, no options; v1.1 first
       axis, backend Go or TypeScript with the shared TypeScript frontend;
       v1.x one axis at a time when needed. Fragments are shaped so v2 can
       apply them to an existing project.
     - v2: setups added after init (`vkit add`), reusing v1 fragments: storage,
       cache, queue, payment (Polar or Dodo), each with one verify command run
       in CI against a fresh generated project.
     - v3+: community contributions by PR, more backend languages (Python,
       Rust) when a product needs them, web builder.
     Only v0 is fixed; later versions may change.
   - `AGENTS.md` (+ `CLAUDE.md` pointer, same pattern as zenith) — everything
     written in this repository is English (code, docs, specs, plans, commits);
     frontend is TypeScript only (strict, `allowJs: false`, no `.js` sources);
     generated or added code must be exercised by CI, never only documented;
     one implementation per capability.
   - `LICENSE` — MIT, `Copyright (c) 2026 Vandor`.
2. **`site/`** — static one-page landing, English (developer audience, like
   Vandor UI):
   - Hero: one sentence on vkit ("production foundations for web products,
     composable soon"), primary action = copy the zenith start command.
   - Two kit cards:
     - **zenith** — Go backend (Echo/Huma, pgx, River) + TypeScript frontend
       (TanStack Start); multi-tenant SaaS: auth, organizations, backoffice,
       public API keys.
     - **orbit** — a complete TypeScript reference application (document
       processing) showing the architecture end to end: TanStack Start + tRPC
       web, Elysia public API, Prisma, BullMQ/Redis worker and scheduler,
       S3-compatible storage, Socket.IO realtime. Start from it and replace the
       domain. (Orbit became a reference app on 2026-09-16; its GitHub
       description, "domain-neutral … Go/River worker", is stale on both counts.)
     - Each card: stack line, GitHub link, start command
       `bunx giget gh:vandordev/vkit-<name> my-app` with a copy button.
   - "What's next" strip: v1 generator, v2 add-later setups, linking `ROADMAP.md`.
   - Footer: MIT, GitHub repo link.
   - States: copy button shows copied/failed feedback; no other dynamic data,
     so no loading/empty states.
3. **MIT `LICENSE`** added to `vkit-zenith` and `vkit-orbit`, each on branch
   `alfarizi/chore/mit-license`.
4. **Deploy**: Vercel Hobby via the GitHub integration, root directory `site/`.
   The user imports the project in their own Vercel account; no team, no Pro
   trial, no card.

## Design

- `site/` mirrors zenith `apps/landing`: Next.js App Router, React 19,
  TypeScript strict, Tailwind v4, `output: "export"` to `out/`, Bun.
  It is a standalone package, not a workspace (one app, nothing to share yet).
- Brand: copy `tokens.css`, `fonts.css` (+ font files), `logo.svg`/logo mark
  from zenith `packages/brand` into `site/src/brand/`.
  `shortcut: brand is duplicated from zenith; extract a published package when
  a third consumer appears or the copies drift.`
- Controls: copy the components the page uses (`button`, `display-heading`,
  `zenith-mark`, plus their `cn`/motion helpers) from zenith
  `packages/ui/src/components/ui/` into `site/src/components/ui/`. Zenith's
  versions are the refined ones (its `button.tsx` differs from the `@vandor`
  registry's by ~48 lines; `display-heading` and `zenith-mark` exist only in
  zenith). `shortcut: copied from zenith, not installed from the registry;
  upstream zenith's refinements into Vandor UI, then install from @vandor.`
- Built with the `impeccable` skill; reuse zenith landing's section structure
  where it fits, not its placeholder copy.
- SEO basics from zenith landing (`seo.ts`, `robots.ts`, `sitemap.ts`) with the
  Vercel URL as canonical until a domain exists.

## Verification

- `bun run check-types`, `bun run lint`, `bun run build` pass in `site/`;
  `out/index.html` exists.
- Both start commands, run fresh, produce a project (already checked
  2026-11-26: zenith 1206 files, orbit 635 files, no submodules/LFS); re-run
  against the final copy on the page.
- Rendered page checked at desktop and 375 px width, light and dark; no
  horizontal scroll; copy button works with keyboard.
- After the user's import: the Vercel production URL serves the page.

## Simplest alternative considered

A single hand-written `index.html` (or GitHub Pages from `README.md`). Cheaper
today, but the brand components are React, zenith's landing pattern is Next
static export, and v1's generator and the later web builder will live
in this repository; rewriting later costs
more than starting on the known pattern. GitHub Pages stays the fallback host if
Vercel Hobby's non-commercial rule turns out to apply.

## Not doing

- Generator, CLI, setups, or their folders (v1, v2).
- Custom domain, analytics, cookies, forms, contact CTA.
- GitHub Actions deploy, preview environments beyond what the integration gives.
- Changing zenith or orbit beyond adding `LICENSE` (e.g. zenith's failing
  tests, orbit's stale GitHub description, orbit's dead `recipes/`).
- Upstreaming zenith's component styles into the Vandor UI registry (separate
  task in `vandordev/ui`, after v0).
- Docs pages, i18n, blog, per-kit detail pages.
- Pushing or merging without the user's go-ahead.

## Built now on purpose

- MIT licenses on all three repos: without them the public kits are legally
  unusable, and relicensing after outside use is harder.
- `AGENTS.md` rules (English only, TypeScript-only frontend, CI exercises
  generated/added code): they shape every v1+ contribution, agent or human.
- Roadmap file in the repo: v1 planning and community readers start from it.

## Decided

- 2026-11-26 revision (after first build): the repository is a Bun-workspaces
  monorepo like zenith: `apps/site` now, `apps/cli` and more `packages/*` in v1.
  Turborepo joins when a second app arrives. `apps/site` uses TanStack Start with
  static prerendering (the framework of zenith/orbit `apps/web`), replacing the
  Next.js export. Design combines zenith `apps/landing` (nav, hero, bento tiles,
  closing CTA, footer, its light-only `landing.css`) with the kit picker and copy
  command as bento tiles. `packages/brand` and `packages/ui` are copied from
  zenith so landing components keep their `@repo/*` imports. This supersedes
  `site/`, the Next.js bullets in Design, and the dark-mode check (zenith's
  landing is light only).

- Site and all repository text are English.
- zenith and orbit are v0 entry points only; v1 is a generator composed from
  their fragments, v2 adds setups after init (see ROADMAP above).
- Orbit is presented as a TypeScript reference application, not a neutral
  boilerplate.
- Orbit's `recipes/` format is not adopted: orbit dropped it on 2026-09-16
  because copied instructions drift, and its recipe tests never ran in CI.
