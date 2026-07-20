export interface FaqItem {
	question: string;
	answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
	{
		question: 'Quanto custa e faz sentido no meu ticket de MRR?',
		answer:
			'Os pacotes vão de diagnóstico pontual a acompanhamento mensal. Se o seu produto já tem receita recorrente e dados de usuários, o custo de um incidente costuma eclipsar o investimento — o quiz te dá uma estimativa em reais antes de falar comigo.',
	},
	{
		question: 'Quanto tempo preciso dedicar? Meu time é minúsculo.',
		answer:
			'O Diagnóstico Express cabe em poucas horas do seu lado. O Hardening Sprint é uma semana hands-on comigo no teclado — você não precisa virar security engineer; precisa estar disponível para decisions e acesso à stack.',
	},
	{
		question: 'Isso serve pra micro SaaS de verdade ou é teatro de enterprise?',
		answer:
			'Serve exatamente pra stack enxuta: auth, secrets, backups, LGPD aplicada ao produto, dependências. Sem auditoria de 200 slides. Se você shippa sozinho ou com até cinco pessoas, é o público.',
	},
	{
		question: 'Como funciona o próximo passo na prática?',
		answer:
			'Você entra na lista (ou garante vaga, quando o lote está aberto), me manda contexto do produto pelo WhatsApp, agendamos uma call curta e definimos o pacote. Sem formulário de 40 campos.',
	},
	{
		question: 'Já uso ferramenta X de scan — ainda preciso disso?',
		answer:
			'Scanner ajuda a achar sintoma. Aqui o foco é priorizar o que quebra o negócio, fechar buracos críticos e deixar um playbook que o time minúsculo consegue executar sob pressão.',
	},
];
