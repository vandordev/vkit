# vkit v0 Foundation Implementation Plan

> **For agentic workers:** Execute inline in the current session. Steps use checkbox (- [x]) syntax.

**Goal:** Ship the vkit repository foundation and a static English landing in
`site/` that points to vkit-zenith and vkit-orbit, plus MIT licenses on all three repos.

**Architecture:** Root docs (README, ROADMAP, AGENTS, LICENSE). `site/` is a
standalone Next.js static export with brand files and UI components copied from
zenith; page copy lives in one typed content module.

**Tech Stack:** Bun 1.4, Next.js 16.4 (`output: "export"`), React 19, TypeScript 5.9
strict, Tailwind v4 (PostCSS), motion 14, @base-ui/react, class-variance-authority, cn.

**Spec:** `docs/superpowers/specs/2026-11-26-v0-foundation-design.md`

## Global Constraints

- Everything written in this repository is English, including commits.
- Frontend source is TypeScript only: `allowJs: false`, no `.js`/`.jsx` under `site/src`.
  Tool configs may be `.mjs` only where the tool cannot load TypeScript (PostCSS).
- `LICENSE` text: MIT, `Copyright (c) 2026 Vandor`.
- Start command format, verbatim: `bunx giget gh:vandordev/vkit-<name> my-app`.
- Work on branch `alfarizi/feat/v0-foundation` in `~/dev/vandor/vkit`; license work
  on `alfarizi/chore/mit-license` in zenith and orbit. Commit locally; never push,
  merge or create remote resources without the user's explicit go-ahead.
- Copied code keeps a `shortcut:` comment naming its source and the upgrade path
  (spec, Design section).

## Review Focus

1. Clipboard missing or rejected (insecure context, denied permission) → button
   shows "Copy failed", and the command is still visible, selectable text (Task 7 test).
2. Long start command at 375 px → wraps or scrolls inside its code box; the page
   never scrolls horizontally (Task 9 check).
3. Dark mode via `prefers-color-scheme` → tokens switch; no unreadable text (Task 9).
4. `prefers-reduced-motion: reduce` → no entrance or press animation (Task 9).
5. JavaScript disabled → static HTML still shows every command and link (Task 9).

---

## Batch 1: Repository foundation

Goal: root documents exist and match the spec. Depends on: nothing.
Gate: `git diff --check` clean; each file's content checked against spec Scope §1.

### Task 1: LICENSE, .gitignore, spec commit

**Files:** Create `LICENSE`, `.gitignore` (`node_modules/`, `.next/`, `out/`, `.turbo/`, `*.tsbuildinfo`, `.env*`, `.vercel/`).

- [x] Create branch: `git switch -c alfarizi/feat/v0-foundation`
- [x] Write the standard MIT text with the copyright line from Global Constraints.
- [x] Commit spec, plan, LICENSE, .gitignore: `docs: add v0 spec, plan and MIT license`

### Task 2: README.md and ROADMAP.md

**Files:** Create `README.md`, `ROADMAP.md`.

- [x] README: one-paragraph intro; a table of the two kits (name, backend, what
  it is, start command); "Repository layout" (`site/` now, generator folders from
  v1); link to ROADMAP and LICENSE.
- [x] ROADMAP: v0–v3+ exactly as spec Scope §1 `ROADMAP.md` bullet, including
  v1.0/v1.1/v1.x staging, the better-t-stack borrowing rule (engine and tests,
  MIT notice kept, not stack templates), CI matrix, and "Only v0 is fixed".
- [x] Commit: `docs: add readme and roadmap`

### Task 3: AGENTS.md and CLAUDE.md

**Files:** Create `AGENTS.md`, `CLAUDE.md` (pointer only, same wording pattern as
zenith's `CLAUDE.md`).

- [x] AGENTS.md sections: Start here (read ROADMAP, current spec/plan in
  `docs/superpowers/{specs,plans}`); Rules (the four rules of spec Scope §1
  `AGENTS.md` bullet, with the `.mjs` exception from Global Constraints);
  Site commands (filled in Task 4).
- [x] Commit: `docs: add agent instructions`

## Batch 2: Site foundation

Goal: `site/` builds a static export with brand, components and typed content.
Depends on: Batch 1. Gate: in `site/`, `bun run check-types`, `bun run lint`,
`bun test`, `bun run build` pass and `out/index.html` exists.
Can invalidate: Batch 1 AGENTS.md "Site commands" (update if script names change).

### Task 4: Site package scaffold

**Files:** Create `site/package.json`, `site/tsconfig.json`, `site/next.config.ts`,
`site/postcss.config.mjs`, `site/eslint.config.ts`, `site/next-env.d.ts`,
`site/src/app/layout.tsx`, `site/src/app/page.tsx` (placeholder), `site/src/app/globals.css`, `site/bun.lock`.

- [x] `package.json`: `"name": "vkit-site"`, private, `"type": "module"`, scripts
  `dev` (`next dev --hostname 127.0.0.1 --port 3002`), `build`, `check-types`
  (`tsc --noEmit`), `lint` (`eslint .`), `test` (`bun test`); dependency versions
  copied from zenith `apps/landing`, `packages/ui`, `packages/brand`,
  `packages/eslint-config` (`@eslint/js`, `typescript-eslint`, `eslint`),
  plus `jiti` (ESLint 9 needs it to load `eslint.config.ts`).
- [x] `tsconfig.json`: zenith `packages/typescript-config/base.json` options inlined,
  plus Next options from its `nextjs.json`, but `"allowJs": false`, `"paths": {"@/*": ["./src/*"]}`.
- [x] `next.config.ts`: `output: "export"`; no `transpilePackages`.
- [x] `eslint.config.ts`: `js.configs.recommended` + `tseslint.configs.recommended`,
  ignores `.next/**`, `out/**`, `next-env.d.ts` (no turbo/only-warn plugins: lint must fail on errors).
- [x] `bun install`, then run the four scripts. Expected: pass; `out/index.html` exists.
- [x] Fill AGENTS.md "Site commands"; commit: `feat(site): scaffold static next app`

### Task 5: Brand and UI components

**Files:** Create `site/src/brand/{tokens.css,fonts.css,brand.ts,logo-mark.ts,motion.ts}`,
`site/public/{favicon.svg,logo.svg}`, `site/src/components/ui/{button,loading-arc,display-heading,zenith-mark}.tsx`,
`site/src/components/ui/styles.css`.

- [x] Copy from zenith `packages/brand/src` and `packages/brand/assets/logo.svg`;
  `brand.ts` exports `brand = { name: "vkit" } as const`.
- [x] Copy the four components from zenith `packages/ui/src/components/ui/`;
  rewrite `@repo/brand*` imports to `@/brand/*`; copy only the rules of zenith
  `packages/ui/src/styles.css` the four components use.
- [x] First line of each copied file: `// shortcut: copied from vkit-zenith <path>; upstream to the @vandor registry, then install from it.`
- [x] Stop condition: if a component needs files beyond these four plus helpers,
  copy them with the same comment and list them in the commit body (blocks Task 8 only).
- [x] Run check-types and lint. Expected: pass. Commit: `feat(site): add brand and ui components from zenith`

### Task 6: Typed content module

**Files:** Create `site/src/content.ts`, `site/src/content.test.ts`.

**Interfaces:** Produces `type Kit = { name: "zenith" | "orbit"; backend: "Go" | "TypeScript"; summary: string; stack: string; repoUrl: string; startCommand: string }`,
`kits: readonly Kit[]`, `hero: { title: string; lead: string }`, `nextSteps: readonly { version: string; text: string }[]`,
`siteUrl: string`, `roadmapUrl: string`.

- [x] Write `content.test.ts`: for each kit, `startCommand === \`bunx giget gh:vandordev/vkit-${name} my-app\``
  and `repoUrl === \`https://github.com/vandordev/vkit-${name}\``; `kits.map(k => k.name)` equals `["zenith", "orbit"]`.
- [x] Run `bun test`. Expected: FAIL (module missing).
- [x] Write `content.ts` with the card copy from spec Scope §2 (orbit as reference
  application), hero copy, v1/v2 next steps, `roadmapUrl` =
  `https://github.com/vandordev/vkit/blob/main/ROADMAP.md`, `siteUrl` =
  `https://vkit.vercel.app` with comment `// replaced by the real URL after the Vercel import (Task 14)`.
- [x] Run `bun test`. Expected: PASS. Commit: `feat(site): add typed landing content`

## Batch 3: Landing page

Goal: the page from spec Scope §2 renders correctly. Depends on: Batch 2.
Gate: Batch 2 gate still passes; Task 9 checks all pass.
Can invalidate: Task 6 copy (if layout forces copy changes, update test values too).

### Task 7: Copy command component

**Files:** Create `site/src/lib/copy.ts`, `site/src/lib/copy.test.ts`, `site/src/components/copy-command.tsx`.

**Interfaces:** Produces `copyText(text: string, clipboard: Pick<Clipboard, "writeText"> | undefined): Promise<"copied" | "failed">`;
`<CopyCommand command={string} />`.

- [x] Tests: resolving `writeText` → `"copied"` and called with the text; rejecting → `"failed"`; `undefined` clipboard → `"failed"`.
- [x] Run `bun test`. Expected: FAIL.
- [x] Implement `copyText`; `CopyCommand` renders the command in `<code>` (selectable,
  wraps inside its box) and a `Button` labelled "Copy", showing "Copied" or
  "Copy failed" for 2 s, announced via `aria-live="polite"`.
- [x] Run `bun test`. Expected: PASS. Commit: `feat(site): add copyable start command`

### Task 8: Page sections

**Files:** Create `site/src/app/_components/{hero,kit-card,next-steps,site-footer}.tsx`,
`site/src/app/landing.css`, `site/src/lib/seo.ts`, `site/src/app/{robots.ts,sitemap.ts}`; modify `page.tsx`, `layout.tsx`.

- [x] Load the `impeccable` skill and design the page with it; one primary action
  (hero copy of the zenith command); reuse zenith landing's section structure
  only where it fits.
- [x] Sections render `content.ts` values only (no hard-coded copy in components).
- [x] `seo.ts`: title "vkit", description from `hero.lead`, `metadataBase` from `siteUrl`;
  robots/sitemap as in zenith `apps/landing/src/app/{robots,sitemap}.ts`.
- [x] Batch 2 gate commands pass. Commit: `feat(site): build landing page`

### Task 9: Rendered checks

- [x] Serve `out/` (`bunx serve out -l 3002`) and screenshot with the browser from
  the `orca-cli` skill: 1280 px and 375 px, light and dark.
- [x] Verify Review Focus 2–5: no horizontal scroll at 375 px; dark tokens readable;
  reduced motion disables animation; with JavaScript disabled, commands and links show.
- [x] Keyboard: Tab reaches each Copy button, Enter copies, focus ring visible.
- [x] Fix and commit any finding: `fix(site): <finding>`

## Batch 4: Kit licenses

Goal: MIT `LICENSE` committed in zenith and orbit. Depends on: Task 1 (same text).
Independent of Batches 2–3. Gate: each repo's branch has exactly one new commit adding only `LICENSE`.

### Task 10: zenith license

- [x] In `~/dev/vandor/vkit-zenith`: `git status --short` (stop if dirty files would
  be touched; never stash), `git switch -c alfarizi/chore/mit-license`, copy `LICENSE`
  from vkit, commit `chore: add MIT license`.

### Task 11: orbit license

- [x] Clone `https://github.com/vandordev/vkit-orbit.git` to `~/dev/vandor/vkit-orbit`
  (absent locally), then the same steps as Task 10.

## Batch 4b: Monorepo and TanStack Start rework (spec revision 2026-11-26)

Goal: replace `site/` with `apps/site` (TanStack Start, prerendered) in a Bun-workspaces
monorepo, design from zenith `apps/landing` plus kit picker and copy command.
Depends on: Batches 1–3 (reuses `content.ts`, `copy.ts` and their tests).
Gate: from the root, `bun install --frozen-lockfile`; in `apps/site`, check-types, lint,
test, build pass and the build output contains a prerendered `index.html` with both
start commands. Invalidates: Task 9 checks and Task 12's site gate (rerun in Batch 5).

- [x] Root `package.json` (workspaces `apps/*`, `packages/*`), move to `apps/site`,
  `packages/brand` and `packages/ui` (button, loading-arc, display-heading, zenith-mark,
  styles) copied from zenith; delete `site/`. Commit `refactor: convert to bun workspaces monorepo`.
- [x] `apps/site` on TanStack Start + Vite + Tailwind v4, versions from zenith `apps/web`,
  static prerender of `/`. Commit `feat(site): move to tanstack start`.
- [x] Copy zenith landing components and `landing.css`; nav, hero, kit bento (two kit
  radio tiles + wide command tile with `CopyCommand`), closing CTA as "What's next",
  footer; content from `content.ts`. Commit `feat(site): adopt zenith landing design`.
- [x] Rerun Task 9 checks (light only) and the Playwright behavior script; update README,
  AGENTS.md site commands and paths. Commit `docs: update paths for monorepo`.
- [x] `apps/storybook` from zenith's pattern with stories for ui, brand and landing
  components; `storybook build` passes. Commit `feat(storybook): add shared storybook`.

## Batch 4c: Developer-tool landing redesign (user-approved after research of 18 landings)

Goal: replace the SaaS-style landing with "repository as the interface": hero terminal
(kit tabs × bun/npm/pnpm tabs, copy), generated file tree, verifiable facts, decisions,
"for agents" copy-prompt, light/dark with system default; roadmap on `/roadmap` from
ROADMAP.md. Gate: Batch 4b gate plus both routes prerendered, no-JS tab switching,
theme switch persists, Storybook builds.

- [x] `scripts/gen-kits.ts` (GitHub trees API → `src/kits.generated.json`) with tested pure helpers.
- [x] Theme (zenith `theme.ts` pattern), new `site.css`, sections and stories.
- [x] `/roadmap` route rendering ROADMAP.md; verify, commit.

## Batch 4d: Live architecture graph and tech stack (user-picked signature)

- [x] `buildGraph` (tested) adds each kit's real app→package dependency graph to `kits.generated.json`; `parseKitData` narrows it.
- [x] Hero `ArchGraph`: d3-force canvas of hexagons, Go/TS lanes, pointer push, drag, hover deps, staggered intro, drift, kit morph; static under reduced motion; list fallback without JS.
- [x] Tech stack section with Simple Icons logos (monogram when none exists); facts move into the graph legend.

## Batch 4e: Pinned architecture story (anime.js-style chapters, user-picked)

- [x] One sticky stage (graph, chapter command card, scrubber, legend); chapters Stack → On disk (graph folds into a two-column folder tree) → Decisions (each ADR/rule lights its nodes, tested ids) → Agents (reading head walks the map). Mobile pins the stage as a band.

## Batch 5: Final integrated gate

Goal: everything verified together; hand off push and deploy. Depends on: Batches 1–4.

### Task 12: Full gate

- [x] In `site/`: clean install `bun install --frozen-lockfile`, then check-types,
  lint, test, build. Expected: all pass.
- [x] Extract both start commands from `out/index.html` and run each in a new empty
  scratchpad directory. Expected: zenith and orbit trees created (≈1206 and ≈635 files).
- [x] `git diff --check` in all three repos; no `.js` files under `apps/*/src`, `packages/*/src`.
- [x] Re-read the spec Scope and Not doing; confirm each item is done or absent.

### Task 13: Handoff

- [ ] Report results and ask the user to approve: push the three branches, merge
  the vkit branch into `main`.
- [ ] Stop condition: the Vercel import is the user's (Hobby, no team, no trial,
  no card; root directory `apps/site`). If Hobby cannot import the org repo, ask whether
  to switch to GitHub Pages (blocks Task 14 only).

### Task 14: Production URL

- [ ] After the import: set `siteUrl` to the real URL, rebuild, commit
  `chore(site): set production url`, push on approval, and confirm the production
  URL serves the page.
