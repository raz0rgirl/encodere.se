## Context

`/micro-saas` já existe como landing de consultoria (hero, stats, BreachThreatMap, RiskQuiz, PricingGrid, CTA WhatsApp) no design system encodere.se. O handoff em `AGENTS.md` exige reformulação pela Product Launch Formula (PLF): sequência de fases, relação antes da oferta, prova de método, storytelling pessoal, escassez real e CTA único progressivo.

**Placeholders PLF preenchidos para este produto:**

| Placeholder | Valor |
|---|---|
| `[PRODUTO]` | Micro SaaS Seguro — consultoria hands-on de segurança |
| `[PÚBLICO]` | Fundadores/donos de micro SaaS (1–5 pessoas, MRR recorrente, stack web) |
| `[PROMESSA CENTRAL]` | Shippar com segurança real — sem enterprise theater — antes que um breach coma meses de MRR |

**Constraints:** Astro estático + ilhas React existentes; PT-BR; tokens/CSS do projeto; WhatsApp já é o canal de conversão MVP; sem checkout online nesta mudança.

## Goals / Non-Goals

**Goals:**

- Página em scroll único com 7 seções PLF e âncoras.
- Flag de fase (`pre-launch` | `open` | `closed`) controlando CTA principal e visibilidade da oferta.
- Reaproveitar quiz, mapa de ameaça e pricing dentro da sequência PLF.
- Copy em 2ª pessoa (exceto storytelling em 1ª); CTA único e consistente por fase.
- Dados editáveis: depoimentos, FAQ, data de urgência, capacidade de vagas.

**Non-Goals:**

- Backend de e-mail/CRM (definir hook; MVP pode mapear “lista” → WhatsApp com mensagem de espera).
- Checkout/pagamento online.
- Redesign do SiteLayout global ou mudança de marca visual fora de `micro-saas.css`.
- Escassez falsa ou contadores reiniciáveis.

## Decisions

### D1 — Sequência de seções (ordem PLF)

Ordem fixa na `index.astro`:

1. **Hero** (`#hero`) — promessa + público; CTA lista/fase; sem preço.
2. **História** (`#historia`) — storytelling 1ª pessoa.
3. **Valor / PLC** (`#oportunidade`, `#metodo`, `#resultado`) — 3 blocos:
   - Oportunidade/problema → reusa stats + framing de risco.
   - Método → reusa “como funciona” + `BreachThreatMap` e/ou passos.
   - Resultado → prova social + `RiskQuiz` como conteúdo de valor (não checkout).
4. **Oferta** (`#oferta`) — `PricingGrid` + comparação antes/depois; só com CTA de compra quando `phase === 'open'` (em `pre-launch`, oferta pode aparecer soft ou ficar colapsada atrás da lista — default: mostrar preview sem botões de compra, CTA = lista).
5. **Escassez** (`#urgencia`) — vagas/turma + countdown a partir de config.
6. **FAQ** (`#faq`) — objeções reais.
7. **CTA final** (`#entrar`) — reforço de comunidade/suporte + mesmo label do CTA principal.

**Alternativa considerada:** manter ordem atual e só trocar copy → rejeitada (viola sequência PLF).

### D2 — Launch phase config

Arquivo `lib/micro-saas/launch-config.ts` (ou similar) exportando:

```ts
type LaunchPhase = 'pre-launch' | 'open' | 'closed';

interface LaunchConfig {
  phase: LaunchPhase;
  ctaLabel: string;           // derivado ou override por fase
  listDeadline?: string;      // ISO date para countdown
  seatsRemaining?: number;    // escassez narrativa
  scarcityReason: string;     // justificativa ética
}
```

Mapa de CTA:

| Phase | Hero / final CTA | Oferta |
|---|---|---|
| `pre-launch` | Entrar na lista / WhatsApp “lista de acesso” | Preços informativos ou ocultos; sem “comprar” |
| `open` | Garantir vaga / WhatsApp pacote | PricingGrid com CTAs de pacote |
| `closed` | Entrar na lista da próxima turma | Oferta marcada como encerrada |

**Alternativa:** query string `?phase=` → só para preview local; produção usa config commitada.

### D3 — Captura de lead no MVP

Sem provedor de e-mail no repo hoje. Decisão: **WhatsApp como canal de “lista”** em `pre-launch`/`closed`, com mensagem pré-preenchida (`Quero entrar na lista de acesso antecipado…`). Interface do botão permanece `LeadCta` / `WhatsAppButton` para trocar endpoint depois sem relayout.

**Alternativa:** formulário nome+email → Formspree/Buttondown — adiado até haver conta/API; deixar ponto de extensão no componente.

### D4 — Dados editáveis

- `lib/micro-saas/testimonials.ts` — array de provas.
- `lib/micro-saas/faq.ts` — perguntas/respostas.
- Countdown e seats em `launch-config.ts`.
- Pricing continua em `pricing.ts`.

### D5 — Componentização

Preferir seções Astro leves + dados da lib:

- Manter: `RiskQuiz`, `BreachThreatMap`, `PricingGrid`, `WhatsAppButton`.
- Novos (Astro): `PlfHero`, `StorySection`, `ValueBlock`, `ScarcityBanner`, `FaqSection`, `FinalCta` — ou seções inline na página se forem curtas; extrair quando o markup repetir.

CTA label/href vêm da config (função `getPrimaryCta(phase)`), nunca duplicados hardcoded em 5 lugares.

### D6 — Copywriting

- 2ª pessoa ao `[PÚBLICO]`; storytelling Seção 2 em 1ª pessoa.
- Uma ideia por seção; linguagem de resultado testado.
- CTAs: verbo + benefício (ex.: “Quero minha vaga na lista”, “Garantir meu diagnóstico”).
- Preservar tom encodere.se (direto, técnico-acessível, PT-BR), sem tom corporativo genérico.

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Página fica longa e perde conversão imediata do quiz | Quiz permanece como bloco de valor #3 com CTA de lista/WhatsApp no fim; fase `open` desbloqueia compra. |
| WhatsApp como “lista” parece gambiarra | Documentar no config; API de e-mail como follow-up; UX do botão não promete newsletter falsa — copy fala “lista de acesso” via WhatsApp. |
| Escassez sem fonte real de vagas | Config exige `scarcityReason` + `seatsRemaining` opcional; se indefinido, seção mostra só prazo real ou some. |
| Regressão do design system | Reusar classes `encodere-*` / `ms-*`; novos estilos só em `micro-saas.css`. |

## Migration Plan

1. Adicionar configs e dados editáveis sem mudar a página.
2. Reordenar/reescrever `index.astro` e CSS; manter rotas e assets.
3. Validar `npm run build`.
4. Rollback = revert do commit da página/config (página estática).

## Open Questions

1. Data real da primeira turma / deadline do countdown — placeholder em config até definição da criadora.
2. Texto definitivo do storytelling em 1ª pessoa — draft na implementação; revisão humana recomendada.
3. Provedor de e-mail futuro (quando a lista sair do WhatsApp).
