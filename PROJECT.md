# encodere.se — Blog & Site Institucional

> Implementação do site da **encodere.se** — escola de tecnomancia — em **Astro + React (islands)**.

| Campo | Valor |
|---|---|
| **Produto** | encodere.se / site institucional + área da aluna |
| **Versão da spec** | v1.0 · derivada do protótipo no canvas |
| **Stack-alvo** | Astro 6 · React 19 · TypeScript · Tailwind 4 |
| **Data** | junho 2026 |
| **Spec completa** | [`docs/Especificação Técnica.html`](docs/Especificação%20Técnica.html) |

---

## Índice

1. [Visão & princípios](#1-visão--princípios)
2. [Estado atual do repositório](#2-estado-atual-do-repositório)
3. [Stack & decisões de arquitetura](#3-stack--decisões-de-arquitetura)
4. [Estrutura de pastas (alvo)](#4-estrutura-de-pastas-alvo)
5. [Design tokens](#5-design-tokens)
6. [Modo claro / escuro](#6-modo-claro--escuro)
7. [Biblioteca de componentes](#7-biblioteca-de-componentes)
8. [Rotas & páginas](#8-rotas--páginas)
9. [Modelagem de conteúdo](#9-modelagem-de-conteúdo)
10. [Microinterações](#10-microinterações)
11. [Dashboard & autenticação](#11-dashboard--autenticação)
12. [Performance · A11y · SEO](#12-performance--a11y--seo)
13. [Deploy & ambientes](#13-deploy--ambientes)
14. [Roadmap de implementação](#14-roadmap-de-implementação)
15. [Comandos de desenvolvimento](#15-comandos-de-desenvolvimento)

---

## 1. Visão & princípios

Construir o site público da encodere.se e a área logada da aluna como um único projeto Astro, otimizado para conteúdo (marketing/currículo é estático) mas com ilhas React onde há interatividade real (filtros de trilha, dashboard, toggles).

### Premissa central

O protótipo aprovado é a **fonte da verdade visual**. Esta spec traduz aquele HTML/JSX exploratório para uma base de produção sustentável — sem reinventar o visual, mantendo o vocabulário (tecnomancia, cybermagia, ciclos lunares, "rituais").

### Princípios de engenharia

- **Estático por padrão, JS sob demanda.** Cada quilobyte de JavaScript precisa se justificar. Landing e trilhas renderizam como HTML puro; React só hidrata onde há estado.
- **O conteúdo é dado, não markup.** Disciplinas, mestras, depoimentos e fases vivem em content collections tipadas — não hardcoded em JSX.
- **Tokens primeiro.** Nenhuma cor literal em componente. Tudo via CSS custom properties (oklch violeta/cyan).
- **Acessível e legível no claro e no escuro.** O cyberpunk é sutil — contraste AA é inegociável.
- **Direct-editável e tipado.** TypeScript em tudo; componentes pequenos e single-purpose.

### Não-objetivos (v1)

- Não construir CMS próprio — conteúdo em arquivos versionados (MDX/JSON) basta para o volume atual.
- Não construir LMS completo. O dashboard v1 é painel de leitura + links; entregas e vídeo-aulas ficam em ferramentas externas (Discord, Zoom, repositório).
- Não suportar i18n agora — só PT-BR. A estrutura deve permitir adicionar depois.

---

## 2. Estado atual do repositório

O projeto partiu do template **Astro Starter Kit: Blog** e já incorpora componentes do protótipo TheGrid CN. Ainda falta alinhar com a spec v1.0.

| Área | Status | Notas |
|---|---|---|
| Scaffold Astro + React + Tailwind | ✅ Feito | Astro 6, React 19, Tailwind 4 via `@tailwindcss/vite` |
| Blog (content collection) | ✅ Parcial | Collection `blog` com schema Zod; posts de exemplo |
| Componentes TheGrid CN | ✅ Parcial | `boot-sequence`, `data-stream`, `bento-grid`, `diagnostics-panel`, etc. |
| shadcn/ui | ✅ Parcial | `button`, `card`, `tooltip` em `components/ui/` |
| Design tokens `--encodere-*` | ✅ Feito | `src/styles/tokens.css` + `effects.css` |
| JetBrains Mono self-host | ✅ Feito | `@fontsource-variable/jetbrains-mono` |
| Script anti-flash de tema | ✅ Feito | `BaseLayout` + `ThemeToggle` |
| Páginas institucionais | ✅ Feito | `/`, `/trilhas`, `/mestras`, `/manifesto`, `/matricula` |
| Content collections de negócio | ✅ Parcial | `disciplinas`, `mestras`, `depoimentos`; `fases.json` import direto |
| Área da aluna (`/aluna/*`) | ⬜ Stub | `/aluna/entrar` UI; auth SSR na Fase 4 |
| Output híbrido + adapter Vercel | ⬜ Pendente | Build estático; adapter na Fase 4 |
| SEO / OG / JSON-LD | ✅ Parcial | OG por página; JSON-LD em `/trilhas` |

### Dívida técnica imediata

1. Migrar tokens de `components/thegridcn-theme.css` → `src/styles/tokens.css` com prefixo `--encodere-*`.
2. Substituir fonte Atkinson/Google Fonts por JetBrains Mono self-host.
3. Renomear/reorganizar `components/` → `src/components/` conforme estrutura alvo.
4. Atualizar `site` em `astro.config.mjs` para `https://encodere.se`.

---

## 3. Stack & decisões de arquitetura

| Camada | Escolha (spec) | Instalado | Razão |
|---|---|---|---|
| Framework | Astro 6 | ✅ Astro 6.3 | HTML-first, zero-JS por padrão, ilhas sob demanda |
| UI interativa | React 19 + `@astrojs/react` | ✅ | Reaproveita protótipo; só onde há estado |
| Linguagem | TypeScript (strict) | ✅ | Tipagem de conteúdo + props |
| Estilo | Tailwind 4 + CSS vars | ✅ | Tokens como custom properties; `@theme` mapeia tokens |
| Conteúdo | Content Collections (MDX/JSON) | ✅ Parcial | Tipado via Zod |
| Fonte | JetBrains Mono (self-host) | ⬜ | `@fontsource-variable/jetbrains-mono` — sem FOIT |
| Dashboard | Astro SSR + ilha React | ⬜ | Rota protegida; render no servidor com sessão |
| Auth | Lucia / Auth.js | ⬜ | Sessão por cookie; magic-link por e-mail |
| Hospedagem | Vercel ou Netlify | ⬜ | Adapter híbrido: estático + funções SSR |

### Decisão-chave · output híbrido

Output `hybrid`: site inteiro pré-renderizado (estático), exceto `/aluna/*` que roda SSR sob demanda com sessão. Marketing voa; dashboard é dinâmico.

```js
// astro.config.mjs — esqueleto alvo
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',
  adapter: vercel(),
  site: 'https://encodere.se',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
```

---

## 4. Estrutura de pastas (alvo)

Mapeamento direto: cada arquivo `.jsx` do protótipo vira um diretório de componentes + uma rota. O `shared.jsx` vira `components/ui/` + `styles/tokens.css`.

```
encodere-se/
├─ src/
│  ├─ pages/                      # rotas (file-based)
│  │  ├─ index.astro              # landing escolhida em prod
│  │  ├─ trilhas.astro            # ← cursos.jsx
│  │  ├─ mestras.astro
│  │  ├─ manifesto.astro
│  │  ├─ matricula.astro          # processo por carta
│  │  └─ aluna/                   # SSR · protegido
│  │     ├─ index.astro           # ← dashboard.jsx
│  │     └─ entrar.astro          # magic-link
│  ├─ layouts/
│  │  ├─ BaseLayout.astro         # <head>, tokens, theme-init
│  │  ├─ SiteLayout.astro         # TopNav + Footer públicos
│  │  └─ AlunaLayout.astro        # DashNav + guarda de sessão
│  ├─ components/
│  │  ├─ ui/                      # ← shared.jsx (primitivos)
│  │  │  ├─ GlitchTitle.tsx       # ilha · hover glitch
│  │  │  ├─ MonoButton.astro
│  │  │  ├─ AsciiRule.astro
│  │  │  ├─ Stat.astro
│  │  │  ├─ BootSequence.tsx      # ilha · client:load
│  │  │  └─ ThemeToggle.tsx       # ilha · client:idle
│  │  ├─ site/
│  │  │  ├─ TopNav.astro
│  │  │  ├─ Footer.astro
│  │  │  ├─ Roadmap.astro         # 5 fases lunares
│  │  │  ├─ Depoimentos.astro
│  │  │  └─ CtaMatricula.astro
│  │  ├─ trilhas/
│  │  │  └─ CatalogoTrilhas.tsx   # ilha · filtro por fase
│  │  └─ aluna/
│  │     ├─ ProgressoCiclo.tsx
│  │     ├─ ProximoEncontro.astro
│  │     ├─ RituaisPendentes.tsx
│  │     └─ DiarioFeiticos.astro
│  ├─ content/
│  │  ├─ config.ts                # schemas Zod
│  │  ├─ disciplinas/             # 12× .md
│  │  ├─ mestras/
│  │  ├─ depoimentos/
│  │  └─ fases.json
│  ├─ styles/
│  │  ├─ tokens.css               # :root + [data-theme]
│  │  └─ global.css
│  └─ lib/
│     ├─ auth.ts                  # sessão / magic-link
│     └─ theme.ts                 # helper anti-flash
├─ docs/
│  └─ Especificação Técnica.html  # spec visual completa
├─ astro.config.mjs
└─ tsconfig.json
```

---

## 5. Design tokens

Portados literalmente do protótipo (objetos `DARK`/`LIGHT` do `shared.jsx`) para `styles/tokens.css`. Nenhum componente usa cor crua.

### Acentos da marca

| Token | Escuro | Claro |
|---|---|---|
| `--encodere-violet` | `oklch(0.72 0.21 305)` | `oklch(0.45 0.22 305)` |
| `--encodere-cyan` | `oklch(0.84 0.14 195)` | `oklch(0.55 0.14 200)` |
| `--encodere-bg` | `oklch(0.13 0.02 295)` | `oklch(0.97 0.005 295)` |
| `--encodere-fg` | `oklch(0.96 0.008 295)` | `oklch(0.18 0.02 295)` |

> **Regra de contraste:** o violeta de marca (`0.72 0.21 305`) **não** tem contraste AA sobre `--encodere-bg` escuro para texto pequeno. Use-o em texto ≥18px/bold, bordas e fills — nunca em corpo de texto. Para links/labels pequenos no escuro, suba a luminância para `~0.80`.

### tokens.css — forma

```css
/* claro = base; escuro sobrescreve via [data-theme="dark"] */
:root {
  --encodere-bg:      oklch(0.97 0.005 295);
  --encodere-fg:      oklch(0.18 0.02 295);
  --encodere-violet:  oklch(0.45 0.22 305);
  --encodere-cyan:    oklch(0.55 0.14 200);
  /* …rule, fg-2, fg-3, bg-elev, bg-card… */
  --encodere-step: 4px;
  --encodere-font: 'JetBrains Mono', ui-monospace, monospace;
}
[data-theme="dark"] {
  --encodere-bg:      oklch(0.13 0.02 295);
  --encodere-fg:      oklch(0.96 0.008 295);
  --encodere-violet:  oklch(0.72 0.21 305);
  --encodere-cyan:    oklch(0.84 0.14 195);
}
```

### Escalas

| Dimensão | Valores |
|---|---|
| **Tipo** | 11 · 12 · 13 · 14 · 16 · 22 · 38 · 56 · 76 · 120 px (mono, pesos 300–800) |
| **Espaço** | múltiplos de 4px (gap/padding via Tailwind sobre `--encodere-step`) |
| **Borda** | 1px sólida `--encodere-rule` · sem border-radius (estética terminal) |
| **Letter-spacing** | títulos grandes negativos (-1 a -5px); labels caixa-alta +1.5px |

---

## 6. Modo claro / escuro

O protótipo detecta `prefers-color-scheme` e persiste no `localStorage`. Em produção, unificamos num único tema global com **script anti-flash** inline no `<head>`, antes do paint.

1. **Script bloqueante no `<head>`:** lê `localStorage['encodere-theme']`; se ausente, cai em `matchMedia('(prefers-color-scheme: dark)')`; aplica `data-theme` no `<html>` antes de qualquer render.
2. **Toggle (ilha React, `client:idle`):** alterna `data-theme` e grava no `localStorage`. Único JS de tema na página.
3. **CSS reage** só via `[data-theme="dark"]` — nenhum componente sabe do tema, apenas consome tokens.

```html
<!-- BaseLayout.astro · inline, antes do CSS -->
<script is:inline>
  const k = 'encodere-theme';
  const saved = localStorage.getItem(k);
  const sys = matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved ?? (sys ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
</script>
```

Respeitar `prefers-reduced-motion`: glitch, scanline e boot só animam em `@media (prefers-reduced-motion: no-preference)`. O estado final (conteúdo visível) é sempre o default.

---

## 7. Biblioteca de componentes

**Regra de ouro:** tem estado/evento? → ilha React. É só markup? → `.astro` (zero JS no cliente).

| Componente | Tipo | Hidratação | Origem no protótipo |
|---|---|---|---|
| TopNav | `.astro` | — | shared · TopNav |
| Footer | `.astro` | — | inline nas landings |
| MonoButton | `.astro` | — | shared · MonoButton |
| AsciiRule / Stat | `.astro` | — | shared |
| Roadmap | `.astro` | — | seção das 5 fases |
| Depoimentos | `.astro` | — | seção depoimentos |
| GlitchTitle | ilha | `client:visible` | shared · GlitchTitle |
| BootSequence | ilha | `client:load` | shared · BootSequence |
| ThemeToggle | ilha | `client:idle` | useArtboardMode |
| CatalogoTrilhas | ilha | `client:visible` | cursos · filtro+linhas |
| Dashboard* | ilha | `client:load` | dashboard.jsx |

> **Nota sobre GlitchTitle:** o glitch é puramente CSS (`::before/::after` + `@keyframes`). Pode virar `.astro` com classe utilitária e dispensar a ilha — só precisa do atributo `data-text`. Preferir versão sem-JS quando o título não muda em runtime.

### Exemplo · MonoButton.astro

```astro
---
interface Props {
  variant?: 'primary' | 'ghost' | 'violet' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}
const { variant = 'primary', size = 'md', href } = Astro.props;
const Tag = href ? 'a' : 'button';
---
<Tag class={`btn btn--${variant} btn--${size}`} href={href}>
  <slot />
</Tag>
```

---

## 8. Rotas & páginas

| Rota | Render | Conteúdo |
|---|---|---|
| `/` | estático | Landing escolhida (hero + manifesto + roadmap + depoimentos + CTA) |
| `/trilhas` | estático | Catálogo de 12 disciplinas + filtro por fase (ilha) + mestras |
| `/mestras` | estático | Perfis completos das mestras (`content/mestras`) |
| `/manifesto` | estático | Manifesto longo + definições (tecnomancia, cybermagia) |
| `/matricula` | híbrido | Processo "por carta": formulário → e-mail via serverless |
| `/aluna` | **SSR** | Dashboard. Exige sessão; sem ela → redirect `/aluna/entrar` |
| `/aluna/entrar` | híbrido | Magic-link por e-mail (Lucia/Auth.js) |

### Sobre as 3 variações de landing

O protótipo entregou três direções (terminal sutil, manifesto-zine, holo grid):

- **Escolher uma** como `/` canônica (recomendado: **manifesto-zine** — mais identidade, melhor para topo de funil).
- Manter as outras como variantes A/B sob `/v/terminal` e `/v/holo`, reaproveitando as mesmas seções (Roadmap, Depoimentos, CTA) com layouts diferentes.
- Seções compartilhadas vivem em `components/site/` e recebem conteúdo por props — landing é só composição.

---

## 9. Modelagem de conteúdo

No protótipo, disciplinas e depoimentos são arrays hardcoded no JSX. Em produção viram **content collections tipadas por Zod**.

```ts
// src/content/config.ts — alvo
import { defineCollection, z } from 'astro:content';

const disciplinas = defineCollection({
  type: 'content',
  schema: z.object({
    fase:   z.enum(['I', 'II', 'III', 'IV', 'V']),
    nome:   z.string(),
    horas:  z.number(),
    mestra: z.string(),          // ref → mestras
    resumo: z.string(),
    tags:   z.array(z.string()),
    ordem:  z.number(),
  }),
});

const depoimentos = defineCollection({
  type: 'data',
  schema: z.object({
    nome: z.string(),
    turma: z.string(),
    papel: z.string(),
    texto: z.string(),
    projeto: z.string().optional(),
  }),
});

export const collections = { disciplinas, depoimentos /* mestras, fases */ };
```

Consumo na página de trilhas:

```astro
---
import { getCollection } from 'astro:content';
const disciplinas = (await getCollection('disciplinas'))
  .sort((a, b) => a.data.ordem - b.data.ordem);
---
<CatalogoTrilhas client:visible disciplinas={disciplinas.map(d => d.data)} />
```

As mestras editam um `.md` por disciplina; o build valida o schema e quebra cedo se algo estiver errado.

---

## 10. Microinterações

| Efeito | Técnica | Onde | Custo |
|---|---|---|---|
| Boot sequence | React + `setInterval`; ~1.1s; uma vez por sessão (`sessionStorage`) | topo das landings | ilha pequena |
| Glitch hover | CSS puro · `::before/::after` + `clip-path` | títulos | 0 JS |
| Scanline | CSS `repeating-linear-gradient` + `mix-blend` | cards holo / dashboard | 0 JS |
| Cursor piscante | CSS `@keyframes steps(1)` | terminais | 0 JS |
| Toggle tema | React mínimo | nav | ilha idle |

**Orçamento de animação:** nada de loop decorativo infinito em conteúdo (só o cursor). Tudo gated em `prefers-reduced-motion`. Boot roda **uma vez por sessão** — não a cada navegação.

```tsx
const [booting, setBooting] = useState(
  () => !sessionStorage.getItem('encodere-booted')
);
function finish() {
  sessionStorage.setItem('encodere-booted', '1');
  setBooting(false);
}
```

---

## 11. Dashboard & autenticação

A rota `/aluna` é SSR e protegida. Render no servidor já com os dados da aluna; React hidrata só as partes interativas.

### Fluxo de sessão

1. **Entrar:** aluna informa e-mail em `/aluna/entrar` → recebe magic-link ("processo por carta").
2. **Callback:** link valida token, cria sessão (cookie `httpOnly`, Lucia/Auth.js).
3. **Guarda:** `AlunaLayout.astro` checa sessão no topo; sem ela → `Astro.redirect('/aluna/entrar')`.
4. **Dados:** progresso, próximo encontro, rituais e diário vêm de API/DB (v1: JSON por aluna + Turso/SQLite).

### Modelo de dados mínimo (v1)

- `Aluna` — `{ id, nome, turma, fase, pct }`
- `Ritual` — `{ id, alunaId, titulo, prazo, feito }`
- `EntradaDiario` — `{ id, alunaId, quando, texto, ref }`

---

## 12. Performance · A11y · SEO

### Orçamentos de performance

| Métrica | Meta | Como |
|---|---|---|
| JS na landing | < 30 KB (gz) | só ilhas glitch/boot/toggle; resto é HTML |
| LCP | < 1.5s | fonte self-host + preload; sem hero-JS bloqueante |
| CLS | < 0.02 | theme anti-flash; `font-display: swap` + métrica reservada |
| Lighthouse | ≥ 98 | orçamento no CI |

### Acessibilidade

- Contraste AA em ambos os temas — violeta de marca só em texto grande/bold.
- `prefers-reduced-motion` desliga glitch/scanline/boot.
- Navegação por teclado em nav, filtros de trilha e dashboard; `focus-visible` com anel cyan.
- HTML semântico: `<nav>`, `<main>`, `<section>`, `<article>`; títulos hierárquicos reais.
- `aria-label` nos toggles; estados do filtro anunciados.

### SEO

- Metatags por página + OpenGraph (OG-image estática no estilo terminal).
- Sitemap via `@astrojs/sitemap`; `robots.txt`.
- JSON-LD `Course` / `EducationalOrganization` nas trilhas.

---

## 13. Deploy & ambientes

| Ambiente | Configuração |
|---|---|
| **Host** | Vercel (adapter serverless) — estático na edge, `/aluna/*` em função |
| **Preview** | deploy por PR (preview URL automática) |
| **Produção** | merge em `main` → build → deploy |
| **Secrets** | chaves de e-mail (magic-link), DB (Turso), session secret |
| **Domínio** | encodere.se + `www` → apex |

### Pipeline (CI)

1. **Lint + typecheck:** `astro check` + ESLint/Prettier.
2. **Build:** `astro build` — falha se schema de conteúdo inválido.
3. **Lighthouse CI:** orçamentos de perf/a11y; bloqueia merge se regredir.
4. **Deploy:** preview no PR, produção no merge.

### Variáveis de ambiente (`.env.example`)

`EMAIL_API_KEY` · `DATABASE_URL` · `AUTH_SECRET` · `PUBLIC_SITE_URL` — documentar todas; nunca commitar valores.

---

## 14. Roadmap de implementação

Ordenado para entregar valor cedo: site público no ar primeiro, dashboard depois.

### Fase 0 · fundação (~2 dias)

- [x] Scaffold Astro + React + Tailwind + TS
- [x] Portar `tokens.css` e `global.css` (incl. keyframes glitch/scanline)
- [x] BaseLayout + script anti-flash + self-host JetBrains Mono

### Fase 1 · biblioteca de UI (~3 dias)

- [x] Primitivos: MonoButton, AsciiRule, Stat, TopNav, Footer, GlitchTitle, ThemeToggle, LandingBoot
- [ ] Página de showcase dedicada para validar claro + escuro

### Fase 2 · site público (~4 dias)

- [x] Content collections + conteúdo inicial (6 disciplinas, 2 mestras, 2 depoimentos)
- [x] `/` (manifesto-zine), `/trilhas` (+filtro), `/mestras`, `/manifesto`
- [ ] OG-images estáticas → **marco: site no ar** (parcial)

### Fase 3 · matrícula (~2 dias)

- [ ] `/matricula` + função serverless de e-mail (carta)

### Fase 4 · área da aluna (~5 dias)

- [ ] Auth (magic-link) + sessão + guarda de rota
- [ ] DB (Turso) + dashboard data-driven → **marco: turma 04 usando**

### Fase 5 · polimento (contínuo)

- [ ] A/B das landings, OG dinâmica, analytics, Lighthouse no CI

---

## 15. Comandos de desenvolvimento

Requer **Node.js ≥ 22.12.0**.

```bash
npm install          # instalar dependências
npm run dev          # dev server → http://localhost:4321
npm run build        # build de produção → dist/
npm run preview      # preview do build local
```

---

*encodere.se · especificação técnica v1.0 · junho 2026*
