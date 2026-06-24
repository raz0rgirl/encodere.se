export type PricingTierId = 'diagnostico' | 'sprint' | 'guardiao';

export interface PricingTier {
	id: PricingTierId;
	name: string;
	price: string;
	priceNote?: string;
	description: string;
	deliverables: string[];
	highlight?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
	{
		id: 'diagnostico',
		name: 'Diagnóstico Express',
		price: 'R$ 1.490',
		description: 'Entenda onde você está exposto — antes que vire headline.',
		deliverables: [
			'Audit de 2 horas (auth, secrets, infra)',
			'Relatório PDF com gaps priorizados',
			'Plano de ação para 30 dias',
			'Call de entrega com Q&A',
		],
	},
	{
		id: 'sprint',
		name: 'Hardening Sprint',
		price: 'R$ 4.900',
		description: 'Uma semana hands-on para fechar os buracos críticos.',
		deliverables: [
			'Tudo do Diagnóstico Express',
			'MFA, RBAC e rotação de secrets',
			'Backups testados + runbook de restore',
			'Checklist LGPD aplicado ao produto',
			'Revisão de dependências vulneráveis',
		],
		highlight: true,
	},
	{
		id: 'guardiao',
		name: 'Guardião Mensal',
		price: 'R$ 1.200',
		priceNote: '/mês · mín. 3 meses',
		description: 'Segurança contínua para quem não pode parar de shippar.',
		deliverables: [
			'Revisão mensal de mudanças críticas',
			'Monitoramento de CVEs nas dependências',
			'Playbook de resposta a incidentes',
			'Canal direto para dúvidas de segurança',
			'Relatório trimestral para investidores',
		],
	},
];

export function getTierById(id: PricingTierId): PricingTier | undefined {
	return PRICING_TIERS.find((tier) => tier.id === id);
}
