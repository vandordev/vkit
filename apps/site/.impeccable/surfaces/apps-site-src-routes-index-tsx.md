---
version: 1
slug: "apps-site-src-routes-index-tsx"
primary_target: "apps/site/src/routes/index.tsx"
related_targets: []
---

Scope: vkit landing `/` and `/roadmap` (apps/site). Mode: persuade (developer tool).
Audience: public developers and the Vandor team choosing a foundation. Action: copy a kit's start command (or the agent prompt).
Proof: facts generated from the kits' repositories (apps, packages, ADRs, tables), ADR links, real giget output. No invented stats.
Constraints: prerendered static, English, TypeScript, light and dark (system default), works without JS except copy and theme.

## Direction contract

THESIS: The repository is the interface: show the command, what lands on disk, and the decisions, instead of selling outcomes; refuses the SaaS hero, gradients and pastel bento of the previous version.
OWN-WORLD: Vandor neutral tokens in both themes, hairline rules, Plus Jakarta Sans for prose, JetBrains Mono (no ligatures) for commands and paths; one fixed dark terminal surface with its own syntax colors.
STORY: Visitor sees one command, picks kit and package manager, sees the real tree and facts, reads the decisions, copies a prompt for their agent; roadmap lives on its own page.
FIRST VIEWPORT: Headline, lead and the dark command box (kit and bun/npm/pnpm tabs) on the left; on the right, bleeding to the viewport edge, the kit's live architecture graph on a dot grid with a legend of real facts.
FORM: Developer-tool landing after research of 18 references (Turborepo, Bun, T3, Hono, Better-T-Stack). seed: none (direction chosen with the user, no concept roll).
SIGNATURE: The live architecture graph: the kit's real app→package dependencies as Vandor hexagons under physics (Go left, TypeScript right), pushed by the pointer, draggable, hover reveals dependencies, and it morphs when the kit changes.
