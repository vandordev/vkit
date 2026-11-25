# AGENTS.md

Map for agents working in this repository.

## Start here

Run `git status --short` and preserve unrelated changes. Read `ROADMAP.md` and the
current spec and plan in `docs/superpowers/{specs,plans}`. Do not silently change
agreed scope; discuss anything outside the spec first.

## Rules

- Everything written in this repository is English: code, docs, specs, plans and
  commit messages.
- Frontend is TypeScript only: strict, `allowJs: false`, no `.js` or `.jsx` sources.
  Tool configs may be `.mjs` only where the tool cannot load TypeScript.
- Generated or added code must be exercised by CI, never only documented.
- One implementation per capability.
- UI: no eyebrow or kicker labels above headings; no copy that narrates the interface; no horizontal scroll at any width (check with real scrollbars, not Playwright's default hidden ones).

## Commands

From the repository root:

- `bun install --frozen-lockfile`
- `bun run dev:site`: landing on http://127.0.0.1:3002
- `bun run dev:storybook`: Storybook on http://127.0.0.1:6006
- `bun run check-types`, `bun run lint`, `bun run test`
- `bun run build`: prerenders the landing to `apps/site/dist/client`

## Layout

- `apps/site`: TanStack Start; landing components and their stories live in
  `src/components/landing`; copy lives in `src/content.ts`.
- `packages/ui`, `packages/brand`: copied from vkit-zenith (see their READMEs);
  keep their APIs identical to zenith's so changes can flow both ways.
- Stories sit next to the component they show; `apps/storybook` discovers them.
