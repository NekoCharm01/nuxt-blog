# AGENTS.md

## Commands

- Use latest `pnpm` only; pnpm version is defined in `package.json` and the lockfile is `pnpm-lock.yaml`.
- Install with `pnpm install`; the `postinstall` hook runs `nuxt prepare`, which creates the `.nuxt` TypeScript configs referenced by root `tsconfig.json`.
- Dev server: `pnpm dev`.
- Production build: `pnpm build`; preview with `pnpm preview` after building.
- Lint: `pnpm lint`; auto-fix lint issues with `pnpm lint:fix`.
- Format check: `pnpm fmt:check`; apply formatting with `pnpm fmt`.
- There are no tests or typecheck scripts in `package.json` yet; use lint/format/build as the available verification steps unless you add scripts.

## Project Shape

- This is a single Nuxt 4 app, not a multi-package workspace; `pnpm-workspace.yaml` only configures allowed dependency build scripts.
- Nuxt app source lives under `app/`, server source under `server/`; routes are `app/pages/*.vue`, root layout is `app/app.vue`, and Nuxt auto-imports components/composables.
- Shared types live under `shared/types/`; `server/` currently has no files.
- Generated/build outputs `.nuxt/`, `.output/`, `.nitro/`, `.cache/`, and `dist/` are ignored and should not be edited by hand.

## Framework Details

- `nuxt.config.ts` enables Nuxt future compatibility version 5 and `typescriptBundlerResolution`.
- Modules are `@nuxtjs/i18n`, `@bg-dev/nuxt-naiveui`, `@pinia/nuxt`, and `@unocss/nuxt`.
- i18n uses `strategy: 'no_prefix'`, default locale `zh-Hans`, and locale files in `i18n/locales/en.json` and `i18n/locales/zh-Hans.json`.
- `app/app.vue` wraps pages in Naive UI `NConfigProvider` and switches themes depending on the settings of os/browser using `useOsTheme()`.
- UnoCSS uses `presetWind4()` and `presetIcons()`; icon classes such as `i-fa-solid-external-link-alt` rely on installed Iconify packages.
- Some Vue components use Pug templates (`<template lang="pug">`), and `app/components/ExternalLink.tsx` shows TSX is part of the codebase.

## Style

- `oxfmt` is the formatter: no semicolons, single quotes, trailing commas where valid in ES5, 100-column print width, 2-space tabs.
- VS Code settings also point JS/TS/Vue/JSON/Markdown/TSX formatting to the OXC formatter.
