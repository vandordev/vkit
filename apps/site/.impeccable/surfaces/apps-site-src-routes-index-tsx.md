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
FIRST VIEWPORT: Headline and lead left with the selected kit's one-line summary; terminal right with kit tabs, bun/npm/pnpm tabs, copyable command, giget output and ls listing.
FORM: Developer-tool landing after research of 18 references (Turborepo, Bun, T3, Hono, Better-T-Stack). seed: none (direction chosen with the user, no concept roll).
SIGNATURE: Switching kit or package manager re-types the command and replays the terminal output; every section below follows the chosen kit.
