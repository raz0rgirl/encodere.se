## ADDED Requirements

### Requirement: Landing follows PLF seven-section sequence
A página `/micro-saas` SHALL renderizar, em ordem, as seções: Hero, História, três blocos de valor (oportunidade, método, resultado), Oferta, Escassez/Urgência, FAQ e CTA final, com âncoras internas navegáveis.

#### Scenario: Visitor lands on micro-saas page
- **WHEN** o visitante acessa `/micro-saas`
- **THEN** o sistema SHALL exibir as sete seções PLF na ordem definida, cada uma com id de âncora estável

#### Scenario: Internal anchors resolve
- **WHEN** o visitante navega para um hash de seção válido (ex.: `#historia`, `#oferta`, `#faq`)
- **THEN** o navegador SHALL posicionar a viewport na seção correspondente

---

### Requirement: Hero is pre-launch only with single CTA
A seção Hero SHALL comunicar a promessa central e o público-alvo, SHALL NÃO exibir preço nem botão de compra, e SHALL oferecer exatamente um CTA primário alinhado à fase de lançamento atual.

#### Scenario: Hero has no purchase affordance
- **WHEN** o visitante lê o Hero
- **THEN** o Hero SHALL NÃO conter preço, tabela de pacotes nem segundo CTA concorrente (ex.: “ver preços” ao lado do CTA principal)

#### Scenario: Hero CTA matches phase
- **WHEN** a fase configurada é `pre-launch`, `open` ou `closed`
- **THEN** o CTA primário do Hero SHALL usar o label e o destino definidos para essa fase

---

### Requirement: Personal storytelling section
A página SHALL incluir um bloco de história em primeira pessoa sobre a origem da consultória / dor que motivou o produto, com linguagem autêntica (não corporativa genérica).

#### Scenario: Story section present
- **WHEN** o visitante rola até a seção História
- **THEN** o sistema SHALL exibir narrativa em 1ª pessoa com origem, crise/dor e momento de virada

---

### Requirement: Three value blocks before the offer
A página SHALL apresentar três blocos de conteúdo de valor antes da oferta plena: (1) oportunidade/problema, (2) método/transformação, (3) resultado + prova/diagnóstico. Cada bloco SHALL reforçar o CTA da fase atual, não múltiplas ações concorrentes.

#### Scenario: Value blocks precede full offer
- **WHEN** o visitante percorre a página de cima para baixo
- **THEN** os três blocos de valor SHALL aparecer antes da seção Oferta completa

#### Scenario: Each value block ends with phase CTA
- **WHEN** o visitante chega ao fim de um bloco de valor
- **THEN** o bloco SHALL incluir no máximo um CTA alinhado à fase (lista/compra/fechado), sem CTAs rivais

#### Scenario: Existing diagnostic assets reused as value
- **WHEN** a página é renderizada
- **THEN** o sistema SHALL reutilizar o quiz de risco e/ou o mapa de ameaça dentro dos blocos de valor (método e/ou resultado), sem exigir compra para completar o diagnóstico

---

### Requirement: Offer section with transformation and packages
A seção Oferta SHALL descrever o produto, para quem é, o que inclui, uma comparação antes/depois (ou equivalente) e os pacotes de consultoria existentes.

#### Scenario: Packages visible in open phase
- **WHEN** `phase === 'open'`
- **THEN** a Oferta SHALL exibir os tiers de preço com CTA de conversão por pacote

#### Scenario: Soft offer in pre-launch
- **WHEN** `phase === 'pre-launch'`
- **THEN** a Oferta SHALL NÃO apresentar CTAs de compra diretos; o visitante SHALL ser direcionado ao CTA de lista

---

### Requirement: Final CTA reinforces community and matches primary CTA
A seção final SHALL reforçar pertencimento/suporte pós-conversão e SHALL usar o mesmo texto de CTA primário da fase atual.

#### Scenario: Final CTA label consistency
- **WHEN** a página é renderizada em qualquer fase
- **THEN** o botão primário do Hero e o botão primário do CTA final SHALL compartilhar o mesmo label

---

### Requirement: Copy voice and language
O copy das seções (exceto História) SHALL ser em segunda pessoa, direcionado a fundadores de micro SaaS, em PT-BR, com uma ideia central por seção.

#### Scenario: Audience-specific copy
- **WHEN** o visitante lê headlines e body copy
- **THEN** o texto SHALL referenciar contexto de micro SaaS (MRR, equipe enxuta, LGPD/risco) e NÃO SHALL usar tom de enterprise genérico
