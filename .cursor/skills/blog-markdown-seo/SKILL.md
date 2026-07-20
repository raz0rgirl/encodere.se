---
name: blog-markdown-seo
description: >-
  Drafts and edits blog Markdown with SEO-aware titles, meta descriptions,
  structure, and frontmatter. Use when creating or revising .md posts, writing
  blog titles, improving descriptions for search/social, or adding content under
  src/content/blog.
---

# Blog Markdown & SEO Titles

Apply this skill for **blog posts** in this repo (`src/content/blog/`). For other collections (`disciplinas`, `mestras`), use only the generic Markdown quality sections—not the blog frontmatter block.

## Workflow

1. **Clarify intent** (briefly; infer when obvious):
   - Primary topic and **one primary keyword phrase** (what someone would type).
   - Search intent: informational, how-to, opinion/essay, news reaction, comparison.
   - Audience and language (default: **pt-BR** for this blog unless the user says otherwise).
2. **Generate titles before drafting** — always produce **6–8 candidate titles** using distinct formulas from [title-formulas.md](title-formulas.md). Label each with its formula name.
3. **Recommend 1–2 winners** with one sentence each: keyword placement, specificity, and intent match. If the user did not pick yet, ask which title to use—or pick the best match to the draft angle if they asked for a full post.
4. **Draft the file** using the template below; align `description` with the chosen title (expand, do not repeat verbatim).
5. **Self-check** with the checklist at the end.

When the user only wants titles, stop after step 3 (still give 6–8 options + recommendation).

## Blog frontmatter (Astro)

Required fields match `src/content.config.ts`:

```yaml
---
title: 'Chosen SEO title'
description: 'Meta description: benefit + specificity, 120–160 characters when possible.'
pubDate: 'Mon DD YYYY'
heroImage: '../../assets/thumbnails/post-NN.png'
tags: ['tag1', 'tag2']
---
```

Optional: `updatedDate` when materially revising a published post.

**Filename / slug:** kebab-case, ASCII, primary keyword early, no filler words. Example: `ea-sports-previsao-ganhador-copa.md`. Slug should read naturally in URLs and match title keywords without copying the full title.

## Title rules (summary)

- **One clear promise** — the title states what the reader gets; the post must deliver it.
- **Keyword early** — put the main phrase in the first half when it still sounds human in pt-BR.
- **Specificity** — numbers, names, outcomes, or constraints beat vague claims ("5 vezes", "Monte Carlo", "2026").
- **Length** — aim **50–70 characters** for pt-BR titles; hard cap ~**72** before SERP truncation risk. Shorter is fine for strong brand hooks.
- **No empty clickbait** — curiosity gaps are OK only if the description and intro pay them off.
- **Distinct from description** — title = hook + primary keyword; description = secondary keywords + concrete benefit.

Full formulas and anti-patterns: [title-formulas.md](title-formulas.md).  
Before/after samples: [examples.md](examples.md).

## Body structure

- **Opening:** 1–3 short paragraphs; answer why this matters before background.
- **Headings:** one H1 worth of meaning in `title`; use `##` for main sections, `###` sparingly. Headings should be scannable and may include secondary keywords naturally.
- **Paragraphs:** short; one idea each. Lists for sequences, results, or steps.
- **Links:** descriptive anchor text (not "clique aqui").
- **Close:** clear takeaway or next step—not a generic engagement bait line.

Match the blog voice: essayistic, precise, tech-culture aware (see existing posts in `src/content/blog/`).

## Markdown quality

- Correct heading hierarchy (no skipped levels).
- Consistent punctuation and quotes for pt-BR.
- Code blocks with language tags when showing code.
- Alt text if adding images in MDX/HTML (blog loader supports `.md` and `.mdx`).

## Pre-publish checklist

- [ ] Title uses a distinct formula; primary keyword appears naturally.
- [ ] Description is unique vs title, ~120–160 chars, accurate summary.
- [ ] Slug is kebab-case and keyword-aligned.
- [ ] Intro delivers on the title promise in the first screen.
- [ ] `pubDate` format matches existing posts (`'Jul 19 2026'` style).
- [ ] `tags` reflect topics people search/share, not only vibes.
