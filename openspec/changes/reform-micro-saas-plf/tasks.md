## 1. Launch config & data sources

- [x] 1.1 Criar `lib/micro-saas/launch-config.ts` com `LaunchPhase`, `LaunchConfig`, `getPrimaryCta(phase)` e placeholders de deadline/vagas/`scarcityReason`
- [x] 1.2 Criar `lib/micro-saas/testimonials.ts` com array tipado de provas sociais (mesmo que draft inicial)
- [x] 1.3 Criar `lib/micro-saas/faq.ts` com ≥ 4 perguntas (preço, tempo, adequação micro SaaS, próximo passo)
- [x] 1.4 Adicionar helper de URL WhatsApp para mensagem de lista de acesso (reusar `buildWhatsAppUrl`)

## 2. Seções PLF na página

- [x] 2.1 Reescrever hero em `src/pages/micro-saas/index.astro`: promessa + público, um único CTA da fase, sem preço/`#precos`
- [x] 2.2 Adicionar seção História (`#historia`) com storytelling em 1ª pessoa
- [x] 2.3 Montar 3 blocos de valor: oportunidade (stats), método (passos + BreachThreatMap), resultado (testimonials + RiskQuiz), cada um com CTA de fase
- [x] 2.4 Integrar Oferta (`#oferta`) com PricingGrid + comparação antes/depois, condicionando CTAs de compra a `phase === 'open'`
- [x] 2.5 Adicionar seção Escassez (`#urgencia`) lendo deadline/seats/reason da config; omitir números se vazios
- [x] 2.6 Adicionar FAQ (`#faq`) a partir de `faq.ts`
- [x] 2.7 Adicionar CTA final (`#entrar`) com mesmo label do CTA primário + reforço de comunidade/suporte

## 3. Componentes & estilos

- [x] 3.1 Adaptar `PricingGrid` (ou wrapper) para ocultar/desabilitar CTAs de compra em `pre-launch`/`closed`
- [x] 3.2 Extrair componentes Astro leves se o markup da página ficar pesado (`ScarcityBanner`, `FaqSection`, etc.)
- [x] 3.3 Atualizar `src/styles/micro-saas.css` para as novas seções sem quebrar tokens existentes

## 4. Verificação

- [x] 4.1 Checklist PLF do `AGENTS.md`: hero só lead, storytelling, 3 blocos valor, oferta+prova, escassez justificada, FAQ, CTA único, flag de fase
- [x] 4.2 Validar visualmente as 3 fases (`pre-launch` / `open` / `closed`) trocando config
- [x] 4.3 Rodar `npm run build` e confirmar `/micro-saas` sem erros
    