# vkit

Vandor Kits: production foundations for web products. Today vkit points to two
existing kits you can start from in one command. Next, a generator composes a
project from their pieces, then setups add capabilities to a project that is
already running. See [ROADMAP.md](ROADMAP.md).

## Kits

| Kit | Backend | What it is | Start |
| --- | --- | --- | --- |
| [zenith](https://github.com/vandordev/vkit-zenith) | Go | Multi-tenant SaaS foundation: auth, organizations, backoffice, public API keys; TypeScript frontend. | `bunx giget gh:vandordev/vkit-zenith my-app` |
| [orbit](https://github.com/vandordev/vkit-orbit) | TypeScript | Complete reference application (document processing) showing the architecture end to end; replace the domain. | `bunx giget gh:vandordev/vkit-orbit my-app` |

Frontends are TypeScript only.

## Repository layout

Bun-workspaces monorepo, same shape as vkit-zenith:

- `apps/site`: the landing page (TanStack Start, prerendered to static files).
- `apps/storybook`: shared Storybook for every `*.stories.tsx` in the repository.
- `packages/brand`, `packages/ui`: brand tokens and UI components copied from vkit-zenith.
- `packages/typescript-config`: shared TypeScript options.
- `docs/superpowers/`: specs and plans.
- `apps/cli` and template packages arrive with v1.

## License

[MIT](LICENSE), except `apps/site/src/components/reactbits/`: components vendored from
[React Bits](https://reactbits.dev) under MIT + Commons Clause (see that folder's `LICENSE.md`). They are
part of this site only and are never copied into the kits or generator output.
