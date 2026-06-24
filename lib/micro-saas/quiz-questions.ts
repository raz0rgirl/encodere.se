export type QuizField =
	| 'productName'
	| 'activeUsers'
	| 'monthlyRevenue'
	| 'dataTypes'
	| 'controls'
	| 'compliance'
	| 'recentIncident';

export interface QuizOption {
	value: string;
	label: string;
}

export interface QuizQuestion {
	id: QuizField;
	question: string;
	helper?: string;
	type: 'text' | 'single' | 'multi';
	options?: QuizOption[];
	required?: boolean;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
	{
		id: 'productName',
		question: 'Qual o nome do seu micro SaaS?',
		helper: 'Opcional — ajuda a personalizar o diagnóstico no WhatsApp.',
		type: 'text',
		required: false,
	},
	{
		id: 'activeUsers',
		question: 'Quantos usuários ativos você tem?',
		type: 'single',
		required: true,
		options: [
			{ value: 'under-100', label: 'Menos de 100' },
			{ value: '100-1k', label: '100 – 1.000' },
			{ value: '1k-10k', label: '1.000 – 10.000' },
			{ value: '10k-plus', label: 'Mais de 10.000' },
		],
	},
	{
		id: 'monthlyRevenue',
		question: 'Qual seu faturamento mensal recorrente (MRR)?',
		type: 'single',
		required: true,
		options: [
			{ value: 'under-5k', label: 'Até R$ 5.000' },
			{ value: '5k-20k', label: 'R$ 5.000 – R$ 20.000' },
			{ value: '20k-50k', label: 'R$ 20.000 – R$ 50.000' },
			{ value: '50k-plus', label: 'Acima de R$ 50.000' },
		],
	},
	{
		id: 'dataTypes',
		question: 'Quais dados sensíveis seu produto processa?',
		helper: 'Selecione todos que se aplicam.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'basic', label: 'Apenas e-mail e nome' },
			{ value: 'pii', label: 'PII (CPF, endereço, documentos)' },
			{ value: 'payment', label: 'Dados de pagamento / cartão' },
			{ value: 'health', label: 'Dados de saúde ou crianças' },
		],
	},
	{
		id: 'controls',
		question: 'Quais controles de segurança você já tem?',
		helper: 'Selecione todos que se aplicam.',
		type: 'multi',
		required: true,
		options: [
			{ value: 'mfa', label: 'MFA nos admins' },
			{ value: 'encryption', label: 'Criptografia em repouso' },
			{ value: 'backups', label: 'Backups testados regularmente' },
			{ value: 'pentest', label: 'Pentest ou audit nos últimos 12 meses' },
			{ value: 'none', label: 'Nenhum dos acima' },
		],
	},
	{
		id: 'compliance',
		question: 'Onde você está com compliance?',
		type: 'single',
		required: true,
		options: [
			{ value: 'none', label: 'Ainda não olhei para isso' },
			{ value: 'lgpd-basic', label: 'LGPD básico (política + consentimento)' },
			{ value: 'gdpr', label: 'GDPR ou equivalente internacional' },
			{ value: 'cert-in-progress', label: 'SOC 2 / ISO 27001 em andamento' },
		],
	},
	{
		id: 'recentIncident',
		question: 'Teve incidente de segurança nos últimos 12 meses?',
		type: 'single',
		required: true,
		options: [
			{ value: 'no', label: 'Não' },
			{ value: 'minor', label: 'Sim, menor (sem vazamento confirmado)' },
			{ value: 'major', label: 'Sim, com impacto em usuários ou dados' },
		],
	},
];

export type QuizAnswers = Partial<Record<QuizField, string | string[]>>;

export function getOptionLabel(
	field: QuizField,
	value: string,
): string {
	const question = QUIZ_QUESTIONS.find((q) => q.id === field);
	return question?.options?.find((o) => o.value === value)?.label ?? value;
}

export function formatMultiLabels(field: QuizField, values: string[]): string {
	return values.map((v) => getOptionLabel(field, v)).join(', ');
}
