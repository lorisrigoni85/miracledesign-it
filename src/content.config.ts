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

/** Pagine di testo (Chi sono, Archivio, Privacy), una per lingua. */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lead: z.string().optional(),
  }),
});

/** Pagina Telepass, un file per lingua: src/content/telepass/it.yaml, en.yaml */
const telepass = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/telepass' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    name: z.string(),
    title: z.string(),
    lead: z.string(),
    mockupAlt: z.string(),
    positions: z.array(z.object({ period: z.string(), name: z.string(), text: z.string() })),
    navLabel: z.string(),
    closing: z.string(),
    moments: z.array(
      z.object({
        id: z.string(),
        year: z.string(),
        short: z.string(),
        where: z.string(),
        title: z.string(),
        text: z.array(z.string()),
        principle: z.string(),
        diagram: z.enum(['map', 'research', 'cards', 'business']),
      }),
    ),
    diagrams: z.object({
      map: z.object({ components: z.string(), templates: z.string(), alt: z.string() }),
      research: z.object({ sources: z.array(z.string()).length(3), workshop: z.string(), result: z.string(), alt: z.string() }),
      cards: z.object({
        foundation: z.string(),
        foundationItems: z.string(),
        kits: z.array(z.string()).length(2),
        before: z.string(),
        after: z.string(),
        names: z.array(z.string()).length(3),
        alt: z.string(),
      }),
      business: z.object({
        page: z.string(),
        ask: z.string(),
        newcomer: z.string(),
        customer: z.string(),
        activate: z.string(),
        app: z.string(),
        alt: z.string(),
      }),
    }),
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

/** Pagina Montagna, un file per lingua: src/content/mountains/it.yaml, en.yaml */
const mountains = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/mountains' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    label: z.string(),
    title: z.string(),
    lead: z.string(),
    activitiesLabel: z.string(),
    activities: z.array(z.object({ name: z.string(), icon: z.enum(['ski', 'axe', 'couloir', 'trek']), text: z.string() })),
    peaksLabel: z.string(),
    peaksHead: z.object({ peak: z.string(), height: z.string(), where: z.string() }),
    peaks: z.array(z.object({ name: z.string(), height: z.string(), where: z.string(), country: z.array(z.enum(['IT', 'CH', 'NP', 'AM'])) })),
    photosLabel: z.string(),
    photos: z.array(z.object({ file: z.string(), alt: z.string(), position: z.string().optional() })),
    gallery: z.object({ open: z.string(), close: z.string(), prev: z.string(), next: z.string() }),
    teaser: z.object({ text: z.string(), link: z.string(), photo: z.string() }),
  }),
});

export const collections = { home, pages, telepass, cv, mountains };
