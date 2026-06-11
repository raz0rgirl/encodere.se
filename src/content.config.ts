import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			tags: z.array(z.string()).optional(),
		}),
});

const disciplinas = defineCollection({
	loader: glob({ base: './src/content/disciplinas', pattern: '**/*.md' }),
	schema: z.object({
		fase: z.enum(['I', 'II', 'III', 'IV', 'V']),
		nome: z.string(),
		horas: z.number(),
		mestra: z.string(),
		resumo: z.string(),
		tags: z.array(z.string()),
		ordem: z.number(),
	}),
});

const mestras = defineCollection({
	loader: glob({ base: './src/content/mestras', pattern: '**/*.md' }),
	schema: z.object({
		nome: z.string(),
		titulo: z.string(),
		especialidade: z.string(),
		ordem: z.number(),
	}),
});

const depoimentos = defineCollection({
	loader: glob({ base: './src/content/depoimentos', pattern: '**/*.json' }),
	schema: z.object({
		nome: z.string(),
		turma: z.string(),
		papel: z.string(),
		texto: z.string(),
		projeto: z.string().optional(),
	}),
});

export const collections = { blog, disciplinas, mestras, depoimentos };
