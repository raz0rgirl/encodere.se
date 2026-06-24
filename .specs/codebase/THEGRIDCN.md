# The Gridcn — Guia de Adoção & Mapa de Componentes

**Atualizado:** 2026-06-21  
**Registry:** [`https://thegridcn.com/r/registry.json`](https://thegridcn.com/r/registry.json) · **Docs:** [Install Guide](https://thegridcn.com/docs/install) · **Showcase:** [Components](https://thegridcn.com/components)

Este arquivo é a **fonte de verdade** para decidir *quando* trazer um componente do The Gridcn para o encodere.se, *como* instalá-lo, e *o que* já existe no projeto vs. no registry público.

---

## 1. Framework de decisão

Use esta árvore **antes** de `npx shadcn add @thegridcn/...` ou copiar TSX manualmente.

```
Precisa de interatividade React (estado, scroll, drag, 3D)?
├─ NÃO → preferir componente Astro existente (GlitchTitle, MonoButton, Stat, AsciiRule)
│         ou CSS puro com tokens `--encodere-*` / `.encodere-tron-panel`
└─ SIM → continuar ↓

Já existe equivalente encodere.se que resolve 80% do caso?
├─ SIM → estender o existente (não duplicar)
└─ NÃO → continuar ↓

O componente está no registry público?
├─ SIM → npx shadcn@latest add @thegridcn/<name>
└─ NÃO → copiar do template/thegridcn-ui OU compor com primitivos locais
         (ex.: blog-post-card, blog-table-of-contents — custom encodere)

Precisa de hidratação no Astro?
├─ Estático (sem hooks) → import React sem client:* (SSR HTML)
├─ Scroll / DOM / teclado → client:load ou client:visible
└─ 3D (three.js) → client:only="react" + lazy; evitar above-the-fold

Impacto de bundle / deps aceitável?
├─ lucide-react, radix → OK (shadcn baseline)
├─ three, @react-three/fiber → só hero/showcase; documentar em CONCERNS
└─ recharts, embla, cmdk → só quando a feature exigir (dashboard, carousel)

Visual alinhado com identidade encodere.se?
├─ SIM → usar via bridge tokens (tokens.css → --primary, --card, etc.)
└─ NÃO → adaptar classes ou envolver em wrapper Astro com eyebrow/GlitchTitle
```

### Regras rápidas (heurísticas)

| Situação | Decisão |
|---|---|
| Texto estático, título editorial, separador ASCII | **Astro** (`GlitchTitle`, `AsciiRule`) — zero JS |
| Card com hover glow, tags, cantos Tron | **Gridcn** (`feature-card`, `blog-post-card`, `tag`) |
| Formulário matrícula / auth | **Gridcn forms** (`text-input`, `field`) + validação; Fase 3 |
| Painel HUD decorativo no hero | **Gridcn** (`hud`, `radar`) com `client:visible`; parcimonioso |
| Layout de página inteira | **Template Gridcn** como referência; implementar em Astro + ilhas React |
| Blog / conteúdo longo | **Compor**: Astro layout + Gridcn cards + 1–2 ilhas (`blog-table-of-contents`) |
| Dashboard aluna (Fase 4) | **Gridcn** `stat-card`, `data-table`, `sidebar-nav`* em massa |

\* `sidebar-nav`, `code-block`, `newsletter-form` aparecem nos [templates](https://thegridcn.com/templates) mas **ainda não** estão no registry público (404 em `/r/<name>.json` em 2026-06-21). Copiar do repo ou compor localmente.

### Anti-patterns

- Instalar componente só porque existe no showcase.
- Duplicar `button` Gridcn quando `MonoButton.astro` basta.
- Hidratar React desnecessário (custo LCP).
- Ignorar bridge `--encodere-*` → quebra coerência com design system.

---

## 2. Instalação & manutenção

Registry já configurado em `components.json`:

```json
"@thegridcn": "https://thegridcn.com/r/{name}.json"
```

```bash
# instalar um componente
npx shadcn@latest add @thegridcn/glow-container

# listar / buscar
npx shadcn@latest list @thegridcn
npx shadcn@latest search @thegridcn --query "hud"

# atualizar lista deste doc (nomes canônicos)
curl -sL https://thegridcn.com/r/registry.json | jq -r '.items[].name' | sort -u
```

**Destino no repo:** `components/thegridcn/<name>.tsx` (padrão shadcn).  
**Tokens:** bridge em `src/styles/tokens.css` + glow em `src/styles/thegridcn.css`.  
**Temas Gridcn** (Ares, Tron, Clu…): import opcional; encodere.se usa tokens próprios mapeados para shadcn.

---

## 3. Estado no projeto encodere.se

### 3.1 Instalados (`components/thegridcn/`)

| Arquivo | Registry | Em uso | Onde |
|---|---|---|---|
| `boot-sequence.tsx` | ✅ | parcial | `LandingBoot.tsx` (comentado na home) |
| `breadcrumb-nav.tsx` | ✅ | ✅ | `/blog`, post |
| `tag.tsx` | ✅ | ✅ | blog index + post |
| `feature-card.tsx` | ✅ | — | substituído por `blog-post-card` na listagem |
| `marquee.tsx` | ✅ | import | `CtaMatricula.astro` (não renderizado no markup atual) |
| `bento-grid.tsx` | ✅ | — | reservado |
| `cta-banner.tsx` | ✅ | — | candidato CTA / matrícula |
| `data-stream.tsx` | ✅ | — | decorativo |
| `diagnostics-panel.tsx` | ✅ | — | candidato dashboard |
| `hud.tsx` | ✅ | — | candidato hero/showcase |
| `radar.tsx` | ✅ | — | candidato hero/showcase |

### 3.2 Custom encodere (não estão no registry)

| Arquivo | Motivo | Baseado em |
|---|---|---|
| `blog-post-card.tsx` | listagem + related posts | template Blog · Related Transmissions |
| `blog-table-of-contents.tsx` | TOC sticky + scroll spy | template Blog · sidebar |
| `blog-scroll-top.tsx` | botão voltar ao topo | template Blog |

### 3.3 shadcn base (`components/ui/`)

`button`, `card`, `tooltip` — usar quando Gridcn Tron não for necessário.

### 3.4 Preferência encodere (Astro)

`GlitchTitle`, `AsciiRule`, `MonoButton`, `Stat` — **sempre** para hierarquia editorial e CTAs simples.

---

## 4. Mapa completo do registry público

**Total:** 140 entradas · 52 base UI · 88 Tron-flavored  
**Fonte:** `registry.json` em 2026-06-21

### 4.1 Base UI → `components/ui/` (52)

Instalar com `@thegridcn/<name>` (versão temática do shadcn).

`accordion` · `alert` · `alert-dialog` · `aspect-ratio` · `avatar` · `badge` · `breadcrumb` · `button` · `button-group` · `calendar` · `card` · `carousel` · `chart` · `checkbox` · `collapsible` · `command` · `context-menu` · `dialog` · `drawer` · `dropdown-menu` · `empty` · `field` · `form` · `hover-card` · `input` · `input-group` · `input-otp` · `item` · `kbd` · `label` · `menubar` · `navigation-menu` · `pagination` · `popover` · `progress` · `radio-group` · `scroll-area` · `select` · `separator` · `sheet` · `sidebar` · `skeleton` · `slider` · `sonner` · `spinner` · `switch` · `table` · `tabs` · `textarea` · `toggle` · `toggle-group` · `tooltip`

### 4.2 Tron / Gridcn → `components/thegridcn/` (88)

#### Navegação & layout
`announcement-bar` · `breadcrumb-nav` · `command-menu` · `divider` · `floating-panel` · `modal` · `uplink-header`

#### Marketing & landing
`bento-grid` · `changelog` · `comparison-table` · `cta-banner` · `faq` · `feature-card` · `logo-cloud` · `marquee` · `pricing-card` · `testimonial-card` · `stats-counter`

#### Dados & dashboard
`data-card` · `data-stream` · `data-table` · `diagnostics-panel` · `empty-state` · `heatmap` · `kanban-board` · `sparkline` · `stat` · `stat-card` · `thegridcn-pagination` · `thegridcn-tabs`

#### Formulários (Tron)
`chip` · `dropdown` · `file-upload` · `number-input` · `text-input` · `thegridcn-badge` · `thegridcn-select` · `thegridcn-slider` · `thegridcn-toggle` · `thegridcn-tooltip` · `toast`

#### Feedback & status
`alert` · `anomaly-banner` · `notification` · `progress-bar` · `progress-ring` · `rating` · `signal-indicator` · `status-bar` · `stepper` · `thegridcn-alert` · `thegridcn-skeleton`

#### HUD & sci-fi
`agent-avatar` · `arrival-panel` · `avatar-group` · `beam-marker` · `coordinate-display` · `crt-effect` · `energy-meter` · `gauge` · `hud` · `hud-corner-frame` · `hud-frame` · `identity-disc` · `location-display` · `map` · `map-marker` · `radar` · `regen-indicator` · `reticle` · `speed-indicator` · `waveform`

#### Efeitos & 3D
`circuit-background` · `glow-container` · `grid` · `grid-floor` · `grid-scan-overlay` · `tunnel` · `video-player` · `video-progress`

#### Tempo & animação
`boot-sequence` · `countdown` · `derez-timer` · `terminal` · `thegridcn-timeline` · `timeline-bar` · `timer`

#### Conteúdo & mídia
`tag` · `terminal`

### 4.3 Templates oficiais (composições)

Referência de *como* combinar componentes — não são itens do registry.

| Template | URL | Componentes-chave |
|---|---|---|
| Dashboard | [/templates/dashboard](https://thegridcn.com/templates/dashboard) | `sidebar`, `stat-card`, `data-table`, `chart`, `activity-feed`* |
| Landing | [/templates/landing](https://thegridcn.com/templates/landing) | `uplink-header`, `bento-grid`, `pricing-card`, `faq`, `newsletter-form`* |
| **Blog** | [/templates/blog](https://thegridcn.com/templates/blog) | `breadcrumb-nav`, `tag`, `agent-avatar`, `glow-container`, `code-block`* , `newsletter-form`* , TOC |
| Login | [/templates/login](https://thegridcn.com/templates/login) | `circuit-background`, `text-input`, social buttons |
| Analytics | [/templates/analytics](https://thegridcn.com/templates/analytics) | `stat-card`, `chart`, `heatmap`, tabs |

\* Não publicados no registry em 2026-06-21 — ver §4.4.

### 4.4 Gap registry vs. templates (copiar manualmente se necessário)

Componentes vistos nos templates mas **sem** `/r/<name>.json`:

- `code-block` / `tron-code-block`
- `newsletter-form`
- `activity-feed`
- `footer`, `search-input`, `sidebar-nav`, `status-dot`
- variantes `tron-card`, `tron-accordion`, `tron-drawer`, etc.

**Ação:** antes de implementar, tentar `npx shadcn@latest search @thegridcn`; se 404, copiar de [educlopez/thegridcn-ui](https://github.com/educlopez/thegridcn-ui) ou compor com itens §4.2.

---

## 5. Candidatos por rota / fase (backlog)

Prioridade sugerida quando a feature for implementada — **não** instalar antecipadamente.

| Rota / Fase | Componentes Gridcn candidatos | Alternativa encodere |
|---|---|---|
| `/` hero | `boot-sequence`, `hud`, `stats-counter` | `GlitchTitle`, `Stat.astro` |
| `/trilhas` | `bento-grid`, `feature-card`, `stepper` | layout Astro + cards CSS |
| `/mestras` | `agent-avatar`, `avatar-group`, `testimonial-card` | markdown + Astro |
| `/matricula` (F3) | `text-input`, `field`, `cta-banner`, `newsletter-form`* | `MonoButton` + forms.css |
| `/aluna/*` (F4) | `sidebar`, `stat-card`, `data-table`, `terminal` | — |
| `/blog` | ✅ feito | `blog-*` custom + registry |
| Blog post | `agent-avatar`, `glow-container`, `code-block`* | blockquote CSS (atual) |
| Showcase (F1) | amostra de §4.2 por categoria | página dedicada |

---

## 6. Lições do blog (2026-06-21)

Decisões que funcionaram e devem repetir:

1. **Layout em Astro, interatividade em ilhas** — `BlogPost.astro` estrutura HTML; só TOC e scroll-top hidratam.
2. **Custom quando o registry não tem** — cards e TOC adaptados ao conteúdo real (collection `blog`), não mock do template.
3. **Panel CSS reutilizável** — `.encodere-tron-panel` para sidebar sem instalar mais React.
4. **Largura contextual** — `.encodere-main:has(.encodere-blog-post)` expande para two-column.
5. **Português na UI** — "índice", "transmissões", "ler mais"; Gridcn defaults em inglês.

Próximos incrementos opcionais no post (quando fizer sentido):

- `agent-avatar` + bio (requer campo `author` no schema)
- `glow-container` em blockquotes
- `newsletter-form` no rodapé (F3 leads)

---

## 7. Checklist antes de merge

- [ ] Componente justificado pela árvore §1
- [ ] Tokens `--encodere-*` / bridge shadcn intactos
- [ ] Hidratação mínima (`client:*` só se necessário)
- [ ] `npm run build` passa
- [ ] Entrada atualizada em §3 (instalados / em uso)
- [ ] Se custom: documentar origem (template / composição)

---

## 8. Referências cruzadas

- Decisão manter `components/thegridcn/` na raiz → `.specs/project/STATE.md`
- Bridge tokens → `.specs/features/css-architecture/design.md`
- Design system spacing → `.specs/features/design-system/spec.md`
- Stack → `.specs/codebase/STACK.md`
