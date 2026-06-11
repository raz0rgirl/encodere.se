# F-CSS · Arquitetura CSS

## Problem Statement

Estilos espalhados em `<style>` scoped de 12+ componentes Astro, tokens legados do starter (`--black`, `--gray`) quebrados no blog, e `thegridcn-*.css` desconectados do sistema `--encodere-*`.

## Goals

- [ ] Uma única cascata via `global.css` com camadas claras
- [ ] Zero cores literais fora de `tokens.css`
- [ ] Blog e site institucional no mesmo design system

## Out of Scope

| Feature | Reason |
|---|---|
| Migrar componentes TheGrid CN para Astro | Escopo UI, não CSS |
| Showcase dedicado (Fase 1) | Roadmap separado |

## Requirements

| ID | Requirement | Priority |
|---|---|---|
| R-CSS-01 | Tokens `--encodere-*` + bridge shadcn/TheGrid em `tokens.css` | Must |
| R-CSS-02 | Componentes `encodere-*` em `src/styles/components/` | Must |
| R-CSS-03 | Blog usa `SiteLayout` + classes `encodere-blog-*` | Must |
| R-CSS-04 | Remover `<style>` scoped dos componentes migrados | Must |
| R-CSS-05 | Efeitos glow TheGrid em `thegridcn.css` com tokens `--encodere-*` | Must |

## Done when

- `npm run build` passa
- Nenhum `rgb(var(--black))` ou `--white` legado no `src/`
- Estilos de layout/sections/forms/blog importados por `global.css`
