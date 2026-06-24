# F-BD · Landing Bruxa Desenvolvedora — Mentoria

## Problem Statement

Mulheres e pessoas em transição de carreira aprendem a codar sozinhas — tutoriais, bootcamps, vídeos — mas raramente encontram uma mentoria que combine técnica real com identidade, pertencimento e método. Falta um funil narrativo que (1) conte a jornada da impostora à bruxa desenvolvedora, (2) apresente a mentoria como transformação (não curso genérico), e (3) converta para checkout Kiwify.

## Audience

**Público:** mulheres e pessoas não-binárias em tech (ou entrando), 20–40 anos, que já codam algo mas se sentem perdidas, impostoras ou sem referência de mentora.

## Goals

- [ ] Landing dedicada em `/bruxa-desenvolvedora` com narrativa em capítulos
- [ ] Copy alinhada à identidade encodere.se (tecnomancia, cybermagia, PT-BR)
- [ ] CTA final redirecionando para checkout Kiwify (`PUBLIC_KIWIFY_BRUXA_URL`)
- [ ] Visual consistente com design system (monospace, tokens, seções encodere)

## Out of Scope

| Feature | Reason |
|---|---|
| Checkout embutido | Kiwify hospeda pagamento |
| Backend / leads | MVP usa redirect direto |
| Quiz ou formulário | Narrativa + CTA único no MVP |
| i18n | PT-BR apenas |

---

## User Stories

### P1: Landing narrativa ⭐ MVP

**User Story**: Como pessoa em transição, quero ler uma história que me faça sentir vista antes de comprar a mentoria.

**Acceptance Criteria**:

1. WHEN visito `/bruxa-desenvolvedora` THEN system SHALL exibir hero + capítulos narrativos + o que inclui + para quem é + CTA final
2. WHEN leio a página THEN copy SHALL seguir arco: tutorial hell → véu → mentoria → transformação → compra
3. WHEN `npm run build` roda THEN página SHALL compilar sem erros

**Req IDs**: BD-001, BD-002

---

### P1: CTA Kiwify ⭐ MVP

**User Story**: Como prospect convencida, quero ir direto ao checkout com um clique.

**Acceptance Criteria**:

1. WHEN clico no CTA principal THEN system SHALL abrir URL Kiwify em nova aba
2. WHEN `PUBLIC_KIWIFY_BRUXA_URL` não está definido THEN system SHALL usar placeholder documentado em `.env.example`
3. WHEN CTA é exibido THEN link SHALL ser acessível (texto descritivo, `rel="noopener noreferrer"`)

**Req IDs**: BD-003, BD-004

---

## Non-Functional

| ID | Requirement |
|---|---|
| BD-NF-01 | Página 100% estática (Astro); zero JS obrigatório |
| BD-NF-02 | Mobile-first: capítulos empilham em viewport estreito |
| BD-NF-03 | SEO: title e description únicos |

---

## Traceability

| Req ID | Component / File |
|---|---|
| BD-001 | `src/pages/bruxa-desenvolvedora/index.astro` |
| BD-002 | copy em seções hero/capítulos/cta |
| BD-003 | `lib/bruxa-desenvolvedora/kiwify.ts` |
| BD-004 | `.env.example` → `PUBLIC_KIWIFY_BRUXA_URL` |
