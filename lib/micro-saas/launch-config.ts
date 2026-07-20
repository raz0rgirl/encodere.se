import { buildWaitlistWhatsAppMessage, buildWhatsAppUrl } from './whatsapp';

export type LaunchPhase = 'pre-launch' | 'open' | 'closed';

export interface LaunchConfig {
	phase: LaunchPhase;
	/** ISO date (YYYY-MM-DD or full ISO) for urgency countdown */
	listDeadline?: string;
	/** Remaining seats — omit to hide hard seat count */
	seatsRemaining?: number;
	/** Narrative justification for scarcity (required when section shows) */
	scarcityReason: string;
	ctaLabelOverrides?: Partial<Record<LaunchPhase, string>>;
}

export interface PrimaryCta {
	label: string;
	href: string;
	/** true when CTA opens WhatsApp / external channel */
	external: boolean;
}

const DEFAULT_CTA_LABELS: Record<LaunchPhase, string> = {
	'pre-launch': 'Quero minha vaga na lista',
	open: 'Garantir meu diagnóstico',
	closed: 'Entrar na lista da próxima turma',
};

/**
 * Single source of truth for launch timing / CTA.
 * Flip `phase` to switch list → purchase → waitlist without layout redeploy.
 */
export const LAUNCH_CONFIG: LaunchConfig = {
	phase: 'pre-launch',
	listDeadline: '2026-08-15',
	seatsRemaining: 5,
	scarcityReason:
		'Atendo no máximo cinco micro SaaS por turma — cada engajamento é hands-on, não escalonado por slide deck.',
};

export function getLaunchConfig(): LaunchConfig {
	return LAUNCH_CONFIG;
}

export function getPrimaryCta(phase: LaunchPhase = LAUNCH_CONFIG.phase): PrimaryCta {
	const label =
		LAUNCH_CONFIG.ctaLabelOverrides?.[phase] ?? DEFAULT_CTA_LABELS[phase];

	if (phase === 'open') {
		return {
			label,
			href: '#oferta',
			external: false,
		};
	}

	return {
		label,
		href: buildWhatsAppUrl(buildWaitlistWhatsAppMessage(phase)),
		external: true,
	};
}

export function canPurchase(phase: LaunchPhase = LAUNCH_CONFIG.phase): boolean {
	return phase === 'open';}

export function formatDeadline(deadline?: string): string | null {
	if (!deadline) return null;
	const date = new Date(deadline);
	if (Number.isNaN(date.getTime())) return null;
	return date.toLocaleDateString('pt-BR', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'America/Sao_Paulo',
	});
}

export function daysUntilDeadline(deadline?: string, now = new Date()): number | null {
	if (!deadline) return null;
	const target = new Date(deadline);
	if (Number.isNaN(target.getTime())) return null;
	const msPerDay = 24 * 60 * 60 * 1000;
	const start = new Date(now);
	start.setHours(0, 0, 0, 0);
	target.setHours(0, 0, 0, 0);
	return Math.ceil((target.getTime() - start.getTime()) / msPerDay);
}

export function hasHardScarcity(config: LaunchConfig = LAUNCH_CONFIG): boolean {
	return Boolean(config.listDeadline || typeof config.seatsRemaining === 'number');
}
