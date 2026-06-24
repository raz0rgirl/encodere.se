import {
	formatMultiLabels,
	getOptionLabel,
	type QuizAnswers,
} from './quiz-questions';
import type { PricingTierId } from './pricing';

export type RiskLevel = 'baixo' | 'médio' | 'alto' | 'crítico';

export interface RiskAssessment {
	riskScore: number;
	riskLevel: RiskLevel;
	annualExposureBRL: number;
	recommendedTier: PricingTierId;
	summaryLines: string[];
}

const MRR_MIDPOINT: Record<string, number> = {
	'under-5k': 2500,
	'5k-20k': 12500,
	'20k-50k': 35000,
	'50k-plus': 75000,
};

const USER_SCORE: Record<string, number> = {
	'under-100': 5,
	'100-1k': 10,
	'1k-10k': 18,
	'10k-plus': 25,
};

const DATA_SCORE: Record<string, number> = {
	basic: 0,
	pii: 18,
	payment: 25,
	health: 30,
};

const CONTROL_REDUCTION: Record<string, number> = {
	mfa: 8,
	encryption: 10,
	backups: 8,
	pentest: 12,
	none: 0,
};

const COMPLIANCE_SCORE: Record<string, number> = {
	none: 20,
	'lgpd-basic': 10,
	gdpr: 5,
	'cert-in-progress': 0,
};

const INCIDENT_MULTIPLIER: Record<string, number> = {
	no: 1,
	minor: 1.3,
	major: 1.8,
};

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function scoreToLevel(score: number): RiskLevel {
	if (score <= 25) return 'baixo';
	if (score <= 45) return 'médio';
	if (score <= 70) return 'alto';
	return 'crítico';
}

function scoreToTier(score: number): PricingTierId {
	if (score <= 35) return 'diagnostico';
	if (score <= 65) return 'sprint';
	return 'guardiao';
}

function formatBRL(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumFractionDigits: 0,
	}).format(value);
}

export function calculateRisk(answers: QuizAnswers): RiskAssessment {
	const users = answers.activeUsers as string | undefined;
	const revenue = answers.monthlyRevenue as string | undefined;
	const dataTypes = (answers.dataTypes as string[] | undefined) ?? [];
	const controls = (answers.controls as string[] | undefined) ?? [];
	const compliance = answers.compliance as string | undefined;
	const incident = answers.recentIncident as string | undefined;

	let score = 10;

	if (users) score += USER_SCORE[users] ?? 10;

	for (const type of dataTypes) {
		if (type !== 'basic') score += DATA_SCORE[type] ?? 0;
	}
	if (dataTypes.length === 0) score += 15;

	if (controls.includes('none') || controls.length === 0) {
		score += 20;
	} else {
		for (const control of controls) {
			score -= CONTROL_REDUCTION[control] ?? 0;
		}
	}

	if (compliance) score += COMPLIANCE_SCORE[compliance] ?? 10;

	score = clamp(Math.round(score), 5, 95);

	const mrr = MRR_MIDPOINT[revenue ?? 'under-5k'] ?? 2500;
	let exposureMultiplier = 0.15 + score / 200;

	if (dataTypes.includes('payment')) exposureMultiplier += 0.12;
	if (dataTypes.includes('health')) exposureMultiplier += 0.15;
	if (dataTypes.includes('pii')) exposureMultiplier += 0.08;

	const incidentMult = INCIDENT_MULTIPLIER[incident ?? 'no'] ?? 1;
	let annualExposure = mrr * 12 * exposureMultiplier * incidentMult;
	annualExposure = clamp(annualExposure, 5000, mrr * 12 * 2.5);

	const riskLevel = scoreToLevel(score);
	const recommendedTier = scoreToTier(score);

	const productName =
		typeof answers.productName === 'string' && answers.productName.trim()
			? answers.productName.trim()
			: null;

	const summaryLines = [
		productName ? `Produto: ${productName}` : null,
		users ? `Usuários: ${getOptionLabel('activeUsers', users)}` : null,
		revenue ? `MRR: ${getOptionLabel('monthlyRevenue', revenue)}` : null,
		dataTypes.length
			? `Dados: ${formatMultiLabels('dataTypes', dataTypes)}`
			: null,
		controls.length
			? `Controles: ${formatMultiLabels('controls', controls)}`
			: null,
		compliance
			? `Compliance: ${getOptionLabel('compliance', compliance)}`
			: null,
		incident
			? `Incidentes (12m): ${getOptionLabel('recentIncident', incident)}`
			: null,
		`Score de risco: ${score}/100 (${riskLevel})`,
		`Exposição estimada: ${formatBRL(annualExposure)}/ano`,
	].filter(Boolean) as string[];

	return {
		riskScore: score,
		riskLevel,
		annualExposureBRL: Math.round(annualExposure),
		recommendedTier,
		summaryLines,
	};
}

export { formatBRL };
