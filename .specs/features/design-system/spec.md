# F-DS · Design System — GRIMÓRIO // XEQUE

## Problem Statement

A identidade visual da encodere.se estava fragmentada: tokens oklch com tema claro/escuro, tipografia só em JetBrains Mono, e um guia de spacing/tracking separado do visual real usado no XEQUE//CYBER e no Grimório de System Design. Agentes e devs não tinham uma fonte única da verdade para reproduzir a estética cyberpunk ritualística de forma idêntica.

## Goals

- [ ] Tokens GRIMÓRIO // XEQUE como fonte canônica (`--void`, `--cyan`, `--magenta`, `--gold`, `--mono`, `--disp`)
- [ ] Aliases `--encodere-*` mapeados para tokens grimório (migração incremental sem quebrar CSS existente)
- [ ] CSS base §8 aplicado globalmente (fundo, scanlines, seleção, foco, reduced-motion)
- [ ] Biblioteca de componentes §7 disponível em `grimorio.css`
- [ ] Chakra Petch + JetBrains Mono importadas conforme spec
- [ ] Guia completo em `design.md` — copiável para agentes com prompt §10

## Out of Scope

| Feature | Reason |
|---|---|
| Migrar todo markup Astro para classes grimório (`.topbar`, `.ccard`) | Incremental; aliases cobrem legado |
| Canvas de assinatura (pipeline, latência, consistent hashing) | Opcional §7.12; reaproveitar de `system-design.html` quando necessário |
| Remover ThemeToggle | Toggle permanece; ambos temas usam paleta grimório escura |
| Tailwind utility classes para tokens grimório | Fase 2; MVP via custom properties |

---

## User Stories

### P1: Tokens grimório canônicos ⭐ MVP

**User Story**: Como desenvolvedora, quero tokens nomeados `--void`, `--cyan`, etc. para que qualquer componente derive cores e fontes de uma única fonte.

**Acceptance Criteria**:

1. WHEN `tokens.css` é carregado THEN system SHALL expor todos os tokens da §2 do design system
2. WHEN componente legado usa `--encodere-*` THEN system SHALL resolver para equivalente grimório via alias
3. WHEN `npm run build` roda THEN system SHALL compilar sem erros

**Independent Test**: Inspecionar `:root` no dev server — tokens grimório presentes; `--encodere-bg` resolve para `#050308`.

---

### P1: CSS base global ⭐ MVP

**User Story**: Como leitora, quero a experiência CRT (fundo escuro, scanlines, gradientes radiais) em todas as páginas.

**Acceptance Criteria**:

1. WHEN página carrega THEN body SHALL usar fundo `--void` com gradientes radiais §3
2. WHEN texto é selecionado THEN `::selection` SHALL usar magenta translúcido
3. WHEN foco de teclado THEN `:focus-visible` SHALL usar contorno ouro
4. WHEN `prefers-reduced-motion: reduce` THEN scanlines e animações SHALL desligar

**Independent Test**: Inspecionar body — `background` com radial-gradient; `body::after` com scanlines.

---

### P1: Tipografia dual (mono + display) ⭐ MVP

**User Story**: Como leitora, quero títulos em Chakra Petch e corpo em JetBrains Mono conforme a identidade.

**Acceptance Criteria**:

1. WHEN elemento é h1–h5 THEN system SHALL usar `font-family: var(--disp)`
2. WHEN elemento é body/p/code THEN system SHALL usar `font-family: var(--mono)`
3. WHEN fontes carregam THEN Chakra Petch 400/500/600/700 e JetBrains Mono 400/500/700 SHALL estar disponíveis

**Independent Test**: Computed style de h2 → Chakra Petch; p → JetBrains Mono.

---

### P2: Biblioteca de componentes grimório

**User Story**: Como dev, quero classes `.ccard`, `.note`, `.steps`, etc. prontas para novas páginas long-form.

**Acceptance Criteria**:

1. WHEN `grimorio.css` é importado THEN system SHALL expor todos os componentes da §7
2. WHEN componente é usado THEN estilos SHALL corresponder ao CSS exato da spec

**Independent Test**: Página de teste com `.ccard` + `.note` renderiza conforme spec.

---

## Edge Cases

- WHEN viewport ≤ 880px THEN `.shell` grid SHALL colapsar para 1 coluna
- WHEN TheGrid CN / shadcn usa `--primary`, `--accent` THEN bridge tokens SHALL mapear para grimório
- WHEN landing page tem CSS próprio (`micro-saas.css`, `bruxa-desenvolvedora.css`) THEN aliases `--encodere-*` SHALL propagar nova paleta automaticamente

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
|---|---|---|---|
| DS-G01 | P1: Tokens grimório | Execute | In progress |
| DS-G02 | P1: CSS base global | Execute | In progress |
| DS-G03 | P1: Tipografia dual | Execute | In progress |
| DS-G04 | P2: Componentes grimório | Execute | In progress |
| DS-G05 | Aliases encodere-* | Execute | In progress |
| DS-G06 | Guia design.md | Specify | In progress |

**Coverage:** 6 total, 6 mapped ✅

---

## Success Criteria

- [ ] `design.md` contém spec completa GRIMÓRIO // XEQUE (agent-ready)
- [ ] Homepage e blog renderizam com paleta grimório (fundo `#050308`, ciano/magenta/ouro)
- [ ] Zero regressão de build
- [ ] Prompt §10 funcional para novos posts/páginas
