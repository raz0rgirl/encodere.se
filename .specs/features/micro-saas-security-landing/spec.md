# F-MS · Landing Micro SaaS Seguro — Consultoria

## Problem Statement

Donos de micro SaaS operam produtos com dados sensíveis, faturamento recorrente e equipes enxutas — mas raramente têm budget ou clareza sobre quanto um incidente de segurança custaria. Falta um funil de topo que (1) eduque sobre risco financeiro real, (2) capture contexto do produto via trivia rápida, e (3) converta para consultoria de hardening com CTA WhatsApp.

## Audience

**Público:** donos e fundadores de micro SaaS (1–5 pessoas, MRR até ~R$ 50k, stack web moderna).

## Goals

- [ ] Landing dedicada em `/micro-saas` com proposta de valor clara para micro SaaS
- [ ] Trivia interativa (≤ 7 perguntas) que calcula exposição financeira estimada em BRL
- [ ] Seção de preços com 3 pacotes de consultoria
- [ ] CTA WhatsApp com mensagem pré-preenchida contendo resumo do diagnóstico
- [ ] Visual e copy alinhados ao design system encodere.se (monospace, tokens, PT-BR)

## Out of Scope

| Feature | Reason |
|---|---|
| Backend / persistência de leads | MVP usa WhatsApp como canal; API na Fase 3+ |
| Pagamento online | Conversão via WhatsApp; checkout futuro |
| Pentest automatizado | Consultoria humana; quiz é estimativa educativa |
| i18n | PT-BR apenas |

---

## User Stories

### P1: Landing page ⭐ MVP

**User Story**: Como dono de micro SaaS, quero entender em 30 segundos por que segurança importa para meu negócio.

**Acceptance Criteria**:

1. WHEN visito `/micro-saas` THEN system SHALL exibir hero, dores, como funciona, quiz, preços e CTA final
2. WHEN leio a página THEN copy SHALL ser direcionada a micro SaaS (MRR, LGPD, auth, incidentes)
3. WHEN `npm run build` roda THEN página SHALL compilar sem erros

**Req IDs**: MS-001, MS-002

---

### P1: Trivia de diagnóstico ⭐ MVP

**User Story**: Como fundador, quero responder perguntas rápidas e ver quanto um breach pode me custar.

**Acceptance Criteria**:

1. WHEN inicio o quiz THEN system SHALL apresentar ≤ 7 perguntas em fluxo step-by-step com progresso
2. WHEN completo THEN system SHALL calcular score de risco (baixo/médio/alto/crítico) e exposição anual em BRL
3. WHEN resultado é exibido THEN system SHALL recomendar pacote de consultoria adequado
4. WHEN dados são inválidos THEN system SHALL impedir avanço até resposta válida

**Req IDs**: MS-003, MS-004, MS-005

---

### P1: Preços ⭐ MVP

**User Story**: Como prospect, quero ver pacotes e preços claros antes de falar no WhatsApp.

**Acceptance Criteria**:

1. WHEN rolo até preços THEN system SHALL exibir 3 tiers: Diagnóstico Express, Hardening Sprint, Guardião Mensal
2. WHEN cada tier é exibido THEN system SHALL listar entregáveis e preço em BRL
3. WHEN clico em CTA de preço THEN system SHALL abrir WhatsApp com mensagem mencionando o pacote

**Req IDs**: MS-006, MS-007

---

### P1: WhatsApp CTA ⭐ MVP

**User Story**: Como prospect qualificado, quero enviar meu diagnóstico por WhatsApp com um clique.

**Acceptance Criteria**:

1. WHEN clico "Falar no WhatsApp" THEN system SHALL abrir `wa.me/{numero}?text={mensagem}` em nova aba
2. WHEN venho do quiz THEN mensagem SHALL incluir respostas-chave, exposição estimada e pacote sugerido
3. WHEN `PUBLIC_WHATSAPP_NUMBER` não está definido THEN system SHALL usar placeholder documentado em `.env.example`

**Req IDs**: MS-008, MS-009

---

## Non-Functional

| ID | Requirement |
|---|---|
| MS-NF-01 | Quiz hidrata como React island (`client:visible`); resto estático |
| MS-NF-02 | Estimativa financeira inclui disclaimer de caráter educativo |
| MS-NF-03 | A11y: labels, aria-progress, foco em botões de quiz |
| MS-NF-04 | Mobile-first: pricing stack vertical em viewport estreito |

---

## Traceability

| Req ID | Component / File |
|---|---|
| MS-001 | `src/pages/micro-saas/index.astro` |
| MS-002 | copy em seções hero/dores/como-funciona |
| MS-003 | `src/components/micro-saas/RiskQuiz.tsx` |
| MS-004 | `lib/micro-saas/risk-calculator.ts` |
| MS-005 | `lib/micro-saas/quiz-questions.ts` |
| MS-006 | `src/components/micro-saas/PricingGrid.astro` |
| MS-007 | `lib/micro-saas/pricing.ts` |
| MS-008 | `lib/micro-saas/whatsapp.ts` |
| MS-009 | `.env.example` → `PUBLIC_WHATSAPP_NUMBER` |
