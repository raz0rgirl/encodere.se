# encodere.se — State

**Last session:** 2026-06-11

## Decisions

| Date | Decision | Rationale |
|---|---|---|
| 2026-06-10 | Landing canônica: manifesto-zine | Spec recomenda; melhor identidade para topo de funil |
| 2026-06-10 | GlitchTitle como `.astro` (CSS puro) | Spec prefere zero-JS quando título é estático |
| 2026-06-10 | Manter `components/thegridcn/` na raiz | `@/*` já mapeia; LandingBoot reutiliza BootSequence existente |
| 2026-06-10 | Fase 4 (auth) adiada | Requer adapter Vercel + secrets; não bloqueia site público |
| 2026-06-10 | `fases.json` import direto | `file()` loader do Astro 6 falhou validação Zod; JSON estático é suficiente |
| 2026-06-11 | CSS centralizado em `src/styles/` | Cascata única via global.css; bridge shadcn em tokens.css; blog migrado para SiteLayout |

## Blockers

_Nenhum._

## Deferred Ideas

- Variantes A/B landing (`/v/terminal`, `/v/holo`)
- Output `hybrid` + `@astrojs/vercel` (Fase 4)
- Página showcase dedicada (Fase 1 restante)
- OG-images estáticas por rota
- ~~Migrar TheGrid CN para tokens `--encodere-*` gradualmente~~ → bridge em tokens.css + thegridcn.css
- Endpoints `/api/matricula` e `/api/auth/magic-link`

## Lessons Learned

- `npm install` falhou no sandbox — usar `required_permissions: ["all"]` quando necessário
- Collection `fases` via `file()` loader: schema Zod incompatível com JSON root — usar import ou glob

## Todos

- [x] Inicializar `.specs/`
- [x] Completar Fase 0
- [x] Completar Fase 1 (exceto showcase)
- [x] Completar Fase 2 (exceto OG-images)
- [ ] Fase 3 — matrícula + e-mail
- [ ] Fase 4 — auth + dashboard SSR
