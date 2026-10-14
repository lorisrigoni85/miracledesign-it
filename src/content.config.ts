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
      /** Parte finale della citazione, in evidenza. */
      quoteStrong: z.string(),
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

/** CV, un file per lingua: src/content/cv/it.yaml, en.yaml (stessi contenuti del PDF). */
const cv = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/cv' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    title: z.string(),
    role: z.string(),
    tagline: z.string(),
    location: z.string(),
    download: z.string(),
    profile: z.string(),
    labels: z.object({
      experience: z.string(),
      skills: z.string(),
      certifications: z.string(),
      languages: z.string(),
      education: z.string(),
    }),
    experience: z.array(z.object({ role: z.string(), period: z.string(), company: z.string(), points: z.array(z.string()) })),
    skills: z.array(z.object({ group: z.string(), items: z.string() })),
    certifications: z.array(z.object({ name: z.string(), issuer: z.string() })),
    languages: z.array(z.string()),
    education: z.array(z.object({ name: z.string(), issuer: z.string() })),
  }),
});

export const collections = { home, pages, chapters, cv };
