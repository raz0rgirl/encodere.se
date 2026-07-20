## ADDED Requirements

### Requirement: Configurable launch phase
O sistema SHALL expor uma configuração de fase de lançamento com valores `pre-launch`, `open` e `closed`, usada pela landing `/micro-saas` para determinar o CTA principal e o comportamento da seção de oferta.

#### Scenario: Phase drives primary CTA
- **WHEN** `phase` é alterada na configuração e a página é rebuildada/servida
- **THEN** o CTA primário (Hero e final) SHALL refletir o destino e label da nova fase sem exigir alteração de layout

#### Scenario: Invalid phase rejected at type level
- **WHEN** o código de configuração é tipado
- **THEN** apenas `pre-launch` | `open` | `closed` SHALL ser aceitos como valores de fase

---

### Requirement: Urgency derived from real config dates
A seção de escassez/urgência SHALL calcular prazo a partir de uma data ISO definida na configuração, não hardcoded no markup visual. A escassez SHALL incluir justificativa narrativa explícita.

#### Scenario: Countdown uses config deadline
- **WHEN** `listDeadline` está definida na configuração
- **THEN** o indicador de urgência SHALL basear-se nessa data

#### Scenario: Scarcity requires narrative justification
- **WHEN** a seção de escassez é exibida
- **THEN** o sistema SHALL renderizar o texto de `scarcityReason` junto ao indicador de vagas ou prazo

#### Scenario: Missing urgency config hides hard scarcity
- **WHEN** não há deadline nem `seatsRemaining` configurados
- **THEN** a página SHALL omitir contador/vagas hard (pode manter apenas copy de fase `closed`/`pre-launch` sem números inventados)

---

### Requirement: Phase-specific offer affordances
O sistema SHALL restringir ações de compra conforme a fase.

#### Scenario: Pre-launch blocks purchase CTAs
- **WHEN** `phase === 'pre-launch'`
- **THEN** CTAs de compra por pacote SHALL NÃO ser o caminho primário; a ação promovida SHALL ser entrar na lista

#### Scenario: Open enables package conversion
- **WHEN** `phase === 'open'`
- **THEN** os CTAs dos pacotes SHALL abrir o canal de conversão (WhatsApp) com mensagem referenciando o pacote

#### Scenario: Closed redirects to waitlist
- **WHEN** `phase === 'closed'`
- **THEN** o CTA primário SHALL direcionar à lista da próxima turma e a oferta SHALL comunicar que o lote atual está encerrado

---

### Requirement: Lead capture channel for list phases
Nas fases `pre-launch` e `closed`, o CTA de lista SHALL usar o canal de captura definido no projeto (MVP: WhatsApp com mensagem de lista de acesso), com ponto de extensão para provedor de e-mail futuro.

#### Scenario: WhatsApp waitlist message
- **WHEN** o visitante clica no CTA de lista em `pre-launch` ou `closed`
- **THEN** o sistema SHALL abrir WhatsApp com mensagem pré-preenchida indicando interesse na lista de acesso antecipado / próxima turma
