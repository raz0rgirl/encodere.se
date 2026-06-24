const DEFAULT_KIWIFY_URL = 'https://kiwify.com.br/';

export function getKiwifyBruxaUrl(): string {
	const fromEnv = import.meta.env.PUBLIC_KIWIFY_BRUXA_URL;
	if (typeof fromEnv === 'string' && fromEnv.trim()) {
		return fromEnv.trim();
	}
	return DEFAULT_KIWIFY_URL;
}
