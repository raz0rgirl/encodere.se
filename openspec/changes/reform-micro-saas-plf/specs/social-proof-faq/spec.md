## ADDED Requirements

### Requirement: Editable social proof source
Provas sociais e depoimentos SHALL ser carregados de uma fonte de dados editável (módulo TypeScript/JSON em `lib/micro-saas/`), não hardcoded inline no markup da página.

#### Scenario: Testimonials rendered from data source
- **WHEN** a página renderiza o bloco de resultado/prova social
- **THEN** os itens SHALL ser obtidos do array/módulo de testimonials configurado

#### Scenario: Empty testimonials degrade gracefully
- **WHEN** a lista de testimonials está vazia
- **THEN** a página SHALL continuar compilando e SHALL omitir ou colapsar o carousel/lista de depoimentos sem quebrar o layout das demais seções

---

### Requirement: Offer includes concrete social proof
A seção Oferta (e/ou o bloco de resultado) SHALL incluir prova social concreta — depoimento, número ou resultado real — proveniente da fonte editável.

#### Scenario: At least one proof when data present
- **WHEN** existe ao menos um item válido em testimonials
- **THEN** a página SHALL exibir esse item com citação e atribuição (nome/papel)

---

### Requirement: Editable FAQ with real objections
A página SHALL incluir uma seção FAQ cujas perguntas e respostas vêm de fonte editável, em tom conversacional, cobrindo objeções tipícas do público (preço, tempo, “já uso ferramenta X”, LGPD, etc.).

#### Scenario: FAQ renders from data source
- **WHEN** o visitante abre `#faq`
- **THEN** o sistema SHALL listar as perguntas/respostas definidas no módulo FAQ

#### Scenario: FAQ items are conversational
- **WHEN** as respostas são exibidas
- **THEN** o tom SHALL ser conversacional (não jurídico/termos de serviço)

#### Scenario: Minimum FAQ coverage
- **WHEN** a página é publicada
- **THEN** a fonte FAQ SHALL conter no mínimo 4 perguntas cobrindo objeções de preço, tempo/compromisso, adequação a micro SaaS e próximo passo/como funciona
