# F-DS · Design System Tasks — GRIMÓRIO // XEQUE

**Design**: `.specs/features/design-system/design.md`
**Status**: Foundation complete — component markup migration incremental

---

## Completed (2026-06-24)

| Task | What | Files |
|---|---|---|
| T-G1 | Tokens grimório canônicos + aliases `--encodere-*` | `tokens.css` |
| T-G2 | CSS base global (fundo, tipografia, links, code) | `global.css` |
| T-G3 | Efeitos CRT (scanlines, seleção, foco ouro, reduced-motion) | `effects.css` |
| T-G4 | Biblioteca componentes §7 | `components/grimorio.css` |
| T-G5 | Topbar grimório (gradiente marca, sticky blur) | `layout.css` |
| T-G6 | Chakra Petch + JetBrains Mono | `BaseHead.astro` |
| T-G7 | Tema escuro único | `BaseLayout.astro` |
| T-G8 | Spec + design.md canônicos | `.specs/features/design-system/` |

**Gate**: `npm run build` ✅

---

## Deferred (incremental)

| Task | What | Priority |
|---|---|---|
| T-G9 | Migrar blog post layout para `.shell` + `nav.toc` | P2 |
| T-G10 | Migrar homepage hero para classes `.hero` grimório | P2 |
| T-G11 | Remover ou repurpose ThemeToggle (tema único) | P3 |
| T-G12 | Canvas assinatura §7.12 em páginas long-form | P3 |

---

## Verification

```bash
npm run build
# Inspecionar :root — --void, --cyan, --magenta, --gold presentes
# body background — radial-gradient + #050308
# h2 font-family — Chakra Petch
# ::selection — magenta translúcido
```
