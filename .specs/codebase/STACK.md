# Tech Stack

**Analyzed:** 2026-06-10

## Core

- Framework: Astro 6.3
- Language: TypeScript (strict)
- Runtime: Node.js ≥ 22.12.0
- Package manager: npm

## Frontend

- UI: React 19 + `@astrojs/react` (islands)
- Styling: Tailwind CSS 4 via `@tailwindcss/vite`
- Components: shadcn/ui (`components/ui/`), TheGrid CN (`components/thegridcn/`)
- Font (alvo): JetBrains Mono via `@fontsource-variable/jetbrains-mono`

## Content

- Astro Content Collections + Zod schemas (`src/content.config.ts`)
- MDX via `@astrojs/mdx`

## Integrations

- Sitemap: `@astrojs/sitemap`
- RSS: `@astrojs/rss`

## Testing

- Nenhum framework de testes configurado ainda

## Pending (spec)

- Auth: Lucia / Auth.js
- DB: Turso/SQLite
- Deploy: Vercel adapter (hybrid output)
