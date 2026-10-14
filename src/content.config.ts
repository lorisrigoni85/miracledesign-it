import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Testi della Home, un file per lingua: src/content/home/it.yaml, en.yaml */
const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/home' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      label: z.string(),
      name: z.string(),
      claim: z.string(),
      subtitle: z.string(),
      imageAlt: z.string(),
      primary: z.string(),
      secondary: z.string(),
    }),
    work: z.object({
      label: z.string(),
      anchor: z.string(),
      telepass: z.object({
        eyebrow: z.string(),
        title: z.string(),
        text: z.string(),
        stats: z.array(z.string()),
        image: z.string(),
      }),
    }),
    path: z.object({
      label: z.string(),
      rows: z.array(z.object({ period: z.string(), company: z.string(), text: z.string() })),
    }),
    about: z.object({
      label: z.string(),
      title: z.string(),
      text: z.array(z.string()),
      button: z.string(),
      image: z.string(),
    }),
    archive: z.object({ label: z.string(), link: z.string() }),
    contact: z.object({
      title: z.string(),
      quote: z.string(),
      quoteAuthor: z.string(),
    }),
  }),
});

/** Pagine di testo (pagina madre Telepass, Chi sono, Archivio, Privacy), una per lingua. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lead: z.string().optional(),
  }),
});

/** Capitoli del caso Telepass: src/content/chapters/<lingua>/<slug>.md */
const chapters = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chapters' }),
  schema: z.object({
    /** Chiave comune alle due lingue, per il selettore di lingua. */
    key: z.string(),
    order: z.number(),
    year: z.string(),
    title: z.string(),
    teaser: z.string(),
    description: z.string(),
    summary: z.array(z.object({ term: z.string(), value: z.string() })),
  }),
});

export const collections = { home, pages, chapters };
