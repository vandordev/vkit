# Roadmap

Only v0 is fixed. Later versions describe the direction and may change.

## v0: home

- This repository, the landing page in `site/`, MIT licenses on vkit, vkit-zenith
  and vkit-orbit.
- Start from zenith or orbit with `bunx giget gh:vandordev/vkit-<name> my-app`.
- zenith and orbit are the v0 entry points only.

## v1: generator

A better-t-stack-style generator (`bunx vkit create`) that composes a project from
template fragments harvested from zenith and orbit.

- Borrow better-t-stack's engine and test approach (MIT, its notice kept with any
  copied code), not its stack templates.
- CI generates every core combination in memory and installs and builds a curated
  set. Generated code is exercised, never only documented (the lesson from orbit's
  recipes, which drifted because nothing ran them).
- Staged:
  - v1.0: one base reproducing zenith exactly, no options.
  - v1.1: first axis, backend Go or TypeScript, with the shared TypeScript frontend.
  - v1.x: one axis at a time, when a product needs it.
- Fragments are shaped so v2 can apply them to an existing project.

## v2: setups

Capabilities added after init (`vkit add`), reusing v1 fragments: storage, cache,
queue, payment (Polar or Dodo). Each setup has one verify command that CI runs
against a fresh generated project.

## v3 and later

- Community contributions by pull request.
- More backend languages (Python, Rust) when a product needs them.
- A web builder for choosing a stack.
