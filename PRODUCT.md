# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers deciding which foundation to start a web product from: public developers
evaluating Vandor's kits, and the Vandor team starting its own products. Their job on
the site is to understand what each kit is and copy its start command.

## Product Purpose

vkit is the home of Vandor Kits. In v0 it points to two real, running kits
(vkit-zenith, vkit-orbit) that a product starts from with one command. Success: a
visitor picks a kit and runs its start command.

## Positioning

The kits are extracted from production systems, not demo templates: zenith from a
payment SaaS (multi-tenant auth, organizations, backoffice with audit, public API
keys, Go backend); orbit is a complete TypeScript reference application. Later
versions compose projects from these kits' pieces (v1) and add capabilities to a
running project (v2).

## Capabilities and Constraints

- v0 is a prerendered static site (landing and roadmap): no accounts, forms, analytics or cookies; light and dark themes follow the system by default.
- Start command: `bunx giget gh:vandordev/vkit-<name> my-app`.
- Frontends are TypeScript only. All site text is English.
- Generator (v1) and setups (v2) do not exist yet; present them as roadmap only.

## Brand Commitments

Vandor brand: tokens and fonts (Plus Jakarta Sans, JetBrains Mono) and the
two-hexagon mark, copied from vkit-zenith `packages/brand`.

## Evidence on Hand

Public MIT repositories vandordev/vkit-zenith and vandordev/vkit-orbit. No users,
testimonials, benchmarks or stars to cite; do not fabricate any.

## Product Principles

- Show real code and real commands, never claims the repositories cannot back.
- One action per visit: copy a start command.
- Be honest about what exists now versus what is planned.
