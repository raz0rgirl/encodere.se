export type SigilKind =
	| 'hearth'
	| 'scroll'
	| 'crystal'
	| 'portal'
	| 'candle'
	| 'moon'
	| 'rune';

const TAG_HINTS: Array<[RegExp, SigilKind]> = [
	[/mdx|jsx|react|component/i, 'portal'],
	[/code|terminal|dev|api|stack/i, 'rune'],
	[/magia|manifesto|tecnomanc|cyber/i, 'moon'],
	[/aprend|tutorial|guia|curso/i, 'crystal'],
	[/blog|texto|escrit/i, 'scroll'],
];

const FALLBACK: SigilKind[] = ['candle', 'scroll', 'crystal', 'moon', 'rune', 'portal'];

export function resolveSigil(tags: string[] | undefined, id: string): SigilKind {
	if (tags?.length) {
		for (const tag of tags) {
			for (const [pattern, kind] of TAG_HINTS) {
				if (pattern.test(tag)) return kind;
			}
		}
	}

	const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
	return FALLBACK[hash % FALLBACK.length];
}

export function roomLabel(index: number): string {
	const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
	return numerals[index] ?? String(index + 1);
}
