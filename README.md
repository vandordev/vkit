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

- `site/`: the static landing page (Next.js export, deployed on Vercel).
- `docs/superpowers/`: specs and plans.
- Generator folders arrive with v1.

## License

[MIT](LICENSE)
