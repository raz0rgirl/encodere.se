# encodere.se — State

**Last session:** 2026-06-24

## Decisions

| Date | Decision | Rationale |
|---|---|---|
| 2026-06-24 | Design system canônico: GRIMÓRIO // XEQUE | Guia completo com tokens, componentes, voz; substitui oklch light/dark como identidade primária |
| 2026-06-24 | Aliases `--encodere-*` → tokens grimório | Migração incremental sem reescrever todo CSS legado |
| 2026-06-24 | Tema escuro único (grimório) | Spec é CRT/void; light theme removido do default |
| 2026-06-24 | Chakra Petch display + JetBrains Mono body | Tipografia dual conforme XEQUE//CYBER e Grimório System Design |
| 2026-06-10 | Landing canônica: manifesto-zine | Spec recomenda; melhor identidade para topo de funil |
| 2026-06-10 | GlitchTitle como `.astro` (CSS puro) | Spec prefere zero-JS quando título é estático |
| 2026-06-10 | Manter `components/thegridcn/` na raiz | `@/*` já mapeia; LandingBoot reutiliza BootSequence existente |
| 2026-06-10 | Fase 4 (auth) adiada | Requer adapter Vercel + secrets; não bloqueia site público |
| 2026-06-10 | `fases.json` import direto | `file()` loader do Astro 6 falhou validação Zod; JSON estático é suficiente |
| 2026-06-11 | CSS centralizado em `src/styles/` | Cascata única via global.css; bridge shadcn em tokens.css; blog migrado para SiteLayout |
| 2026-06-19 | Design system spacing + tracking em `em` | Escala `--space-*`, `--tracking-*`, `--text-*`, `--leading-*`; letter-spacing positivo para uppercase mono |
| 2026-06-21 | Blog Gridcn: layout Astro + ilhas React mínimas | TOC/scroll-top hidratam; cards custom quando registry não cobre |
| 2026-06-21 | Guia The Gridcn em `.specs/codebase/THEGRIDCN.md` | Framework de decisão + mapa 140 componentes registry + gaps vs templates |
| 2026-06-21 | Landing `/micro-saas` com quiz + WhatsApp | Funil consultoria segurança; estimativa BRL client-side; CTA wa.me com diagnóstico pré-preenchido |
| 2026-06-21 | Landing `/bruxa-desenvolvedora` narrativa + Kiwify | Funil mentoria; arco em capítulos; CTA final via `PUBLIC_KIWIFY_BRUXA_URL` |

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
