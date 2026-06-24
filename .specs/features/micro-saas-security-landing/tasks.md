# F-MS · Tasks — Landing Micro SaaS Seguro

## T1 · Libs de domínio `[P]`

**What:** Criar quiz-questions, risk-calculator, pricing, whatsapp em `lib/micro-saas/`

**Where:** `lib/micro-saas/*.ts`

**Done when:** Funções exportadas; calculator retorna score, level, exposure, tier para inputs de exemplo

**Gate:** `npx tsc --noEmit` passa

**Status:** ✅

---

## T2 · RiskQuiz React island

**What:** Componente step-by-step com progresso, validação e tela de resultado + CTA WhatsApp

**Where:** `src/components/micro-saas/RiskQuiz.tsx`

**Depends on:** T1

**Done when:** 7 steps navegáveis; resultado exibe BRL formatado e link WhatsApp

**Gate:** Build compila; componente usa tokens CSS existentes

**Status:** ✅

---

## T3 · PricingGrid + WhatsAppButton

**What:** Grid de 3 pacotes com CTAs WhatsApp por tier

**Where:** `src/components/micro-saas/PricingGrid.astro`, `WhatsAppButton.astro`

**Depends on:** T1

**Done when:** 3 cards renderizam preços e links wa.me corretos

**Status:** ✅

---

## T4 · Landing page + estilos

**What:** Página `/micro-saas` com hero, dores, fluxo, quiz, preços, CTA; CSS dedicado; nav link

**Where:** `src/pages/micro-saas/index.astro`, `src/styles/micro-saas.css`, `TopNav.astro`, `global.css`

**Depends on:** T2, T3

**Done when:** Rota acessível; layout responsivo; build passa

**Gate:** `npm run build`

**Status:** ✅

---

## T5 · Config + docs projeto

**What:** `.env.example`, ROADMAP, STATE atualizados

**Depends on:** T4

**Status:** ✅
