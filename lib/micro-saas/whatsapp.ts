import { getTierById, type PricingTierId } from './pricing';

const DEFAULT_WHATSAPP_NUMBER = '5511999999999';

export function getWhatsAppNumber(): string {
	const fromEnv = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
	if (typeof fromEnv === 'string' && fromEnv.trim()) {
		return fromEnv.replace(/\D/g, '');
	}
	return DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppUrl(message: string): string {
	const number = getWhatsAppNumber();
	return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildQuizWhatsAppMessage(
	summaryLines: string[],
	recommendedTier: PricingTierId,
): string {
	const tier = getTierById(recommendedTier);
	const tierName = tier?.name ?? recommendedTier;

	return [
		'Olá! Fiz o diagnóstico rápido no encodere.se/micro-saas.',
		'',
		'📊 Resumo do meu micro SaaS:',
		...summaryLines.map((line) => `• ${line}`),
		'',
		`Tenho interesse no pacote *${tierName}*.`,
		'Podemos conversar sobre os próximos passos?',
	].join('\n');
}

export function buildPricingWhatsAppMessage(tierId: PricingTierId): string {
	const tier = getTierById(tierId);
	if (!tier) return buildWhatsAppUrl('Olá! Quero saber mais sobre consultoria de segurança para micro SaaS.');

	return [
		`Olá! Vi o pacote *${tier.name}* (${tier.price}${tier.priceNote ?? ''}) no encodere.se/micro-saas.`,
		'',
		'Quero entender se faz sentido para o meu produto. Podemos agendar uma call?',
	].join('\n');
}
