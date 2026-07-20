## Why

A landing atual de `/micro-saas` vende cedo demais: hero com dois CTAs concorrentes, preços sempre visíveis e zero sequência de relacionamento. Isso contradiz a Product Launch Formula (PLF) definida em `AGENTS.md` — relação e valor antes da oferta, CTA único progressivo e estados de fase de lançamento. Reformular a página alinhada à PLF aumenta confiança, antecipação e conversão qualificada para a consultoria Micro SaaS Seguro.

## What Changes

- Reestruturar `/micro-saas` em 7 seções PLF: Hero (pré-pré), História, 3 blocos de valor (PLC-style), Oferta, Escassez, FAQ, CTA final.
- Substituir CTAs concorrentes do hero por **um único CTA** de captura/lista (ou WhatsApp de lista, conforme fase) — sem preço nem compra na Seção 1.
- Adicionar bloco de storytelling pessoal (1ª pessoa) sobre a origem da consultoria.
- Reorganizar conteúdo educativo existente (stats, threat map, diagnóstico) como 3 blocos de valor que reforçam a lista/CTA, não a compra direta.
- Introduzir **flag de fase de lançamento** (`pre-launch` | `open` | `closed`) que troca o CTA principal sem redesign.
- Adicionar seção de escassez justificada (vagas/turma de atendimento) e FAQ com objeções reais.
- Extrair depoimentos/provas sociais e data de urgência para fonte editável (JSON/config).
- Manter design system encodere.se, quiz de risco e pacotes de preço como ativos reutilizáveis dentro da nova sequência.

## Capabilities

### New Capabilities

- `plf-landing-structure`: Landing `/micro-saas` com as 7 seções PLF, âncoras internas, CTA único por fase e copy orientada a fundadores de micro SaaS.
- `launch-phase-config`: Configuração de fase de lançamento, data de urgência e CTA principal alternável (`lista` → `compra`/`WhatsApp` → `fechado`).
- `social-proof-faq`: Fonte editável de depoimentos/provas e FAQ de objeções reais do público.

### Modified Capabilities

- _(nenhuma — `openspec/specs/` ainda não contém capabilities versionadas para micro-saas; o spec legado em `.specs/features/micro-saas-security-landing/` é referência de produto, não contrato OpenSpec)_

## Impact

- **Página:** `src/pages/micro-saas/index.astro` — reescrita de seções e fluxo.
- **Componentes:** reuso/adaptação de `RiskQuiz`, `BreachThreatMap`, `PricingGrid`, `WhatsAppButton`; novos blocos para história, PLC, FAQ, escassez e lead CTA.
- **Libs/config:** `lib/micro-saas/` — nova config de fase/lançamento, testimonials e FAQ; pricing existente permanece.
- **Estilos:** `src/styles/micro-saas.css` — estilos para novas seções sem quebrar tokens do design system.
- **Fora de escopo:** checkout online, backend de e-mail (definir endpoint/provedor na implementação; MVP pode usar WhatsApp como captura até haver lista), alteração do SiteLayout global.
