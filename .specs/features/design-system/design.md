# Design System — `GRIMÓRIO // XEQUE`

### Identidade visual encodere.se · Bruxa Desenvolvedora

> **O que é isto.** A especificação completa e exata do visual usado no XEQUE//CYBER e no Grimório de System Design. Tokens, fontes, cores, efeitos e componentes — com o CSS real, não descrições aproximadas. Entregue este arquivo a um agente (ou dev) com a instrução *"use este design system; reproduza idêntico"* e tudo na encodere.se fica consistente.
>
> **Estética em uma frase:** manual técnico de terminal sob luz de CRT — cyberpunk ritualístico, fundo quase-preto, tipografia mono, três acentos de fósforo (ciano, magenta, ouro) com significado semântico. Disciplina no corpo, ousadia na assinatura.
>
> **Stack alvo:** HTML/CSS puro (zero dependência além de duas fontes do Google Fonts). Funciona em qualquer blog (Astro, Next, Hugo, WordPress) colando o CSS base.
>
> **Implementação no repo:** `src/styles/tokens.css` (tokens + aliases), `src/styles/components/grimorio.css` (componentes §7), `src/styles/global.css` + `effects.css` (base §8).

**Spec**: `.specs/features/design-system/spec.md`
**Status**: Approved — fonte canônica desde 2026-06-24
**Extends**: spacing/tracking tokens (`--space-*`, `--tracking-*`) permanecem para ritmo vertical

---

## 1. Princípios

1. **A ousadia mora num lugar só.** Cada página tem *um* elemento de assinatura memorável (um diagrama animado, um anel, um tabuleiro). Todo o resto fica quieto e legível.
2. **Cor é semântica, não decoração.** Ciano = primário/defesa. Magenta = acento/ataque. Ouro = objetivo/destaque. Nunca use uma cor por "ficar bonito" — use pelo que ela significa.
3. **Monoespaçada é a textura.** JetBrains Mono no corpo dá o ar de documento técnico/terminal. Chakra Petch nos títulos dá a aresta. Não troque as fontes.
4. **Escuro de verdade.** O fundo é `#050308` (quase preto com tinta roxa), não cinza. Os painéis sobem em camadas (`--void-2`, `--void-3`).
5. **Brilho com parcimônia.** Glows (`box-shadow` colorido) só em elementos ativos/de assinatura. Texto comum não brilha.
6. **Piso de qualidade, sempre:** responsivo até mobile, foco de teclado visível (contorno ouro), `prefers-reduced-motion` respeitado.
7. **Tire um acessório antes de sair.** Se um efeito não serve à compreensão, corte.

---

## 2. Tokens (CSS Custom Properties)

Cole no `:root`. É a fonte única da verdade — todo componente deriva daqui.

```css
:root{
  /* fundos (do mais fundo ao mais elevado) */
  --void:#050308;       /* fundo da página */
  --void-2:#0c0a16;     /* painéis, cards, topbar */
  --void-3:#13101f;     /* superfícies elevadas, chips, code, botões */

  /* acentos de fósforo (semânticos) */
  --cyan:#00fff0;       /* primário · defesa · links · bordas/glow */
  --magenta:#ff00aa;    /* acento · ataque · numeração · seleção · alerta */
  --gold:#ffe600;       /* objetivo · destaque · números importantes · foco */
  --danger:#ff3b3b;     /* erro · crítico */

  /* texto */
  --ink:#e9e7f5;        /* texto primário */
  --ash-2:#a9a6c0;      /* texto de corpo / secundário */
  --ash:#7a7790;        /* texto terciário / labels / legendas */

  /* linhas */
  --line:rgba(0,255,240,.14);       /* bordas padrão (ciano translúcido) */
  --line-soft:rgba(0,255,240,.08);  /* divisórias sutis */

  /* tipografia */
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  --disp:'Chakra Petch',var(--mono);
}
```

### Aliases legado (`--encodere-*`)

Componentes existentes usam `--encodere-*`. Mapeamento em `tokens.css`:

| Legado | Grimório |
|---|---|
| `--encodere-bg` | `--void` |
| `--encodere-fg` | `--ink` |
| `--encodere-fg-2` | `--ash-2` |
| `--encodere-fg-3` | `--ash` |
| `--encodere-cyan` | `--cyan` |
| `--encodere-violet` / `--encodere-violet-bright` | `--magenta` |
| `--encodere-rule` | `--line` |
| `--encodere-rule-2` | `--line-soft` |
| `--encodere-bg-elev` / `--encodere-bg-card` | `--void-2` |
| `--encodere-font` | `--mono` |
| `--encodere-display` | `--disp` |

---

## 3. Cores

### Paleta semântica

- **Ciano `--cyan`** → primário. Links, bordas, brilho de elementos ativos.
- **Magenta `--magenta`** → acento e tensão. Números de seção, seleção de texto, callouts de aviso.
- **Ouro `--gold`** → o que importa. Números-chave, contorno de foco.
- **Danger `--danger`** → só erro/crítico.
- **Texto:** `--ink` (primário), `--ash-2` (corpo), `--ash` (labels).

### Gradientes de assinatura

```css
/* texto em gradiente — só em títulos de marca/hero */
background:linear-gradient(92deg,var(--magenta),var(--cyan));
-webkit-background-clip:text;background-clip:text;color:transparent;

/* hero (invertido) */
background:linear-gradient(92deg,var(--cyan),var(--magenta));
-webkit-background-clip:text;background-clip:text;color:transparent;

/* barra de progresso / régua */
background:linear-gradient(90deg,var(--magenta),var(--cyan),var(--gold));
```

### Receitas de glow

```css
box-shadow:0 0 14px rgba(0,255,240,.25);   /* ciano */
box-shadow:0 0 14px rgba(255,0,170,.2);    /* magenta */
box-shadow:0 0 14px rgba(255,230,0,.3);    /* ouro */
```

### Fundo da página

```css
background:
  radial-gradient(1100px 640px at 88% -8%, rgba(255,0,170,.07), transparent 60%),
  radial-gradient(900px 640px at -8% 8%, rgba(0,255,240,.06), transparent 55%),
  var(--void);
```

---

## 4. Tipografia

### Importação

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

No repo: Google Fonts em `BaseHead.astro` + `@fontsource-variable/jetbrains-mono` como fallback.

### Escala de tipo

| Papel | Família | Peso | Tamanho | Line-height | Tracking | Cor |
|---|---|---|---|---|---|---|
| Marca (h1 topbar) | Chakra Petch | 700 | `clamp(17px,3vw,22px)` | 1 | `.02em` | gradiente magenta→ciano |
| Hero (h2) | Chakra Petch | 700 | `clamp(30px,7vw,58px)` | 1.02 | `.01em` | `--ink` (com `.em` em gradiente) |
| Seção (h3) | Chakra Petch | 600 | `clamp(20px,3.6vw,28px)` | — | `.01em` | `--ink` |
| Subtítulo (h4) | Chakra Petch | 600 | 16px | — | `.02em` | `--ink` |
| Card title (h5) | Chakra Petch | 600 | 14px | — | `.03em` | `--ink` |
| Corpo (p) | JetBrains Mono | 400 | 15px | 1.75 | — | `--ash-2` |
| Lede/intro | JetBrains Mono | 400 | 16px | 1.7 | — | `--ash-2` (~62ch) |
| Eyebrow/kicker | JetBrains Mono | 400 | 10–11px | — | `.30–.34em` UPPER | `--ash` ou `--gold` |
| Label de tabela | Chakra Petch | 600 | 10.5px | — | `.12em` UPPER | `--cyan` |
| `code` | JetBrains Mono | 400 | `.86em` | — | — | `--cyan` |

**Regras:** negrito (`b`/`strong`) → `--ink`, peso 500. Medida de leitura ~62–68ch. Eyebrows/labels UPPERCASE com tracking largo.

### Spacing & tracking (legado DS)

Tokens `--space-*`, `--tracking-*`, `--text-*`, `--leading-*` permanecem para ritmo vertical. Ver seção anterior em git history se necessário.

---

## 5. Efeitos & texturas

### Scanlines CRT (overlay global)

```css
body::after{
  content:"";position:fixed;inset:0;pointer-events:none;z-index:50;
  background:repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0 2px, rgba(0,0,0,.20) 2px 3px);
  mix-blend-mode:multiply;opacity:.45;
}
```

### Seleção de texto

```css
::selection{background:rgba(255,0,170,.3);color:#fff}
```

### Foco de teclado

```css
:focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:4px}
```

### Movimento reduzido

```css
html{scroll-behavior:smooth}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *{animation:none!important;transition:none!important}
  body::after{display:none}
}
```

---

## 6. Layout

- **Largura de conteúdo:** `1180px` (`--grimorio-content-max`)
- **Padding lateral:** `20px`
- **Medida de leitura:** ~68ch
- **Topbar:** `position:sticky; top:0; z-index:40; backdrop-filter:blur(10px)`
- **Índice (desktop):** coluna fixa `228px`, `position:sticky; top:74px`
- **Raios:** cards `12–16px`, chips `999px`, code `5px`, botões `9–10px`

```css
.wrap, .shell, .hero .inner { max-width:1180px; margin:0 auto; }
.shell{
  max-width:1180px;margin:0 auto;padding:8px 20px 80px;
  display:grid;grid-template-columns:228px minmax(0,1fr);gap:40px;align-items:start;
}
@media(max-width:880px){ .shell{grid-template-columns:1fr;gap:0} }
```

---

## 7. Componentes

Implementados em `src/styles/components/grimorio.css`. Classes:

| Classe | Uso |
|---|---|
| `.topbar` | Navegação sticky + marca + progressline |
| `.hero` | Cabeçalho de página long-form |
| `.block` + `.sec-head` | Seção numerada |
| `.ccard` | Card com tradeoff |
| `.tablewrap` | Tabela responsiva |
| `.note` / `.note.warn` | Callouts |
| `.chip` | Tags |
| `.steps` / `.step` | Lista numerada com trilho |
| `button` / `button.danger` | Botões |
| `nav.toc` | Índice scroll-spy |

Ver `grimorio.css` para CSS exato de cada componente.

---

## 8. CSS base

Em `global.css` + `effects.css`. Bloco mínimo:

```css
:root{
  --void:#050308;--void-2:#0c0a16;--void-3:#13101f;
  --cyan:#00fff0;--magenta:#ff00aa;--gold:#ffe600;--danger:#ff3b3b;
  --ink:#e9e7f5;--ash-2:#a9a6c0;--ash:#7a7790;
  --line:rgba(0,255,240,.14);--line-soft:rgba(0,255,240,.08);
  --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;
  --disp:'Chakra Petch',var(--mono);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{
  margin:0;min-height:100%;color:var(--ink);
  font-family:var(--mono);font-size:15px;line-height:1.75;
  -webkit-font-smoothing:antialiased;
  background:
    radial-gradient(1100px 640px at 88% -8%, rgba(255,0,170,.07), transparent 60%),
    radial-gradient(900px 640px at -8% 8%, rgba(0,255,240,.06), transparent 55%),
    var(--void);
}
/* scanlines, selection, focus, reduced-motion — ver §5 */
h1,h2,h3,h4,h5{font-family:var(--disp);letter-spacing:.02em;color:var(--ink)}
p{margin:0 0 15px;color:var(--ash-2)}
b,strong{color:var(--ink);font-weight:500}
a{color:var(--cyan);text-decoration:none}
a:hover{text-decoration:underline}
code{font-family:var(--mono);font-size:.86em;background:var(--void-3);border:1px solid var(--line-soft);border-radius:5px;padding:1px 6px;color:var(--cyan)}
```

---

## 9. Voz & regras de uso

- **Idioma:** português-BR. Termos técnicos em inglês quando é o uso real da comunidade.
- **Tom:** direto, afiado, de mentora. Camada simbólica leve (grimório, sigilo, ritual) — técnico primeiro.
- **Botões e labels** dizem o que acontece.
- **Erros não pedem desculpa** — dizem o que houve e como resolver.
- **Não faça:** gradiente em texto de corpo; glow em texto comum; mais de um elemento de assinatura por tela; fundo cinza; trocar as fontes.

---

## 10. Prompt pronto (cole no agente)

> Use o **Design System `GRIMÓRIO // XEQUE` da encodere.se** descrito em `.specs/features/design-system/design.md` para construir esta página/post. Reproduza a identidade **exatamente**:
>
> - Importe Chakra Petch (400;500;600;700) e JetBrains Mono (400;500;700).
> - Cole o **CSS base** da §8 sem alterar valores.
> - Tokens, cores semânticas (ciano=primário, magenta=acento, ouro=destaque), tipografia, scanlines CRT, glows e raios conforme a spec.
> - Monte com componentes da §7 (topbar, hero, seção numerada, cards, tabelas, callouts, chips, steps, botões).
> - Piso de qualidade: responsivo, foco ouro, `prefers-reduced-motion`.
> - Voz: português-BR, direta, de mentora. Um único elemento de assinatura por página.
>
> [Conteúdo específico do post.]

---

*Design System v1 · `GRIMÓRIO // XEQUE` · encodere.se — Bruxa Desenvolvedora.*
