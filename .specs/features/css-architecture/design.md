# F-CSS · Design

## Cascata

```
global.css
├── tailwindcss
├── tokens.css      (--encodere-* + @theme + shadcn bridge)
├── effects.css     (glitch, scanline, focus)
├── thegridcn.css   (glow em data-slot shadcn)
├── components/
│   ├── layout.css  (topnav, footer, theme-toggle)
│   ├── sections.css (roadmap, depoimentos, cta, landing-boot)
│   └── forms.css   (encodere-form)
└── blog.css        (listagem + post)
```

## Convenções

- Prefixo BEM: `encodere-block__element--modifier`
- Espaçamento: `calc(var(--encodere-step) * N)` — nunca px solto exceto media queries
- Cores: somente `var(--encodere-*)` ou bridge shadcn (`var(--primary)` etc.)
- Componentes Astro: zero `<style>` — CSS vive em `src/styles/`

## Bridge shadcn

`--primary` → `--encodere-violet`, `--accent` → `--encodere-cyan`, `--background` → `--encodere-bg`.
Permite `components/ui/*` e TheGrid CN funcionarem sem tema Aphrodite rosa.
