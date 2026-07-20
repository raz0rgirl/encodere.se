export interface Testimonial {
	quote: string;
	name: string;
	role: string;
}

/** Editable social proof — keep empty array to hide the list gracefully. */
export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			'Em uma semana fechamos MFA, rotação de secrets e um runbook que eu consegui explicar pro co-founder. Parecia impossível com time de três.',
		name: 'Marina Costa',
		role: 'Founder · SaaS de billing B2B',
	},
	{
		quote:
			'O diagnóstico mostrou exposição em reais — não checklist genérico. Priorizei o que realmente ameaçava o MRR.',
		name: 'Pedro Alves',
		role: 'Solo founder · API de automação',
	},
	{
		quote:
			'Parei de fingir que “depois a gente vê segurança”. Hoje tem playbook de incidente e dependências sob controle.',
		name: 'Julia Ferreira',
		role: 'CTO · marketplace niche',
	},
];
