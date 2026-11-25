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
  Tool configs may be `.mjs` only where the tool cannot load TypeScript (PostCSS).
- Generated or added code must be exercised by CI, never only documented.
- One implementation per capability.

## Site commands

Run from `site/`:

- `bun install --frozen-lockfile`
- `bun run dev`: serves http://127.0.0.1:3002
- `bun run check-types`, `bun run lint`, `bun run test`
- `bun run build`: static export to `site/out/`
