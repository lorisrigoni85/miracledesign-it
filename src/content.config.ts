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
      /** Pulsante verso la pagina Lavori. */
      all: z.string(),
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
    moments: z.array(
      z.object({
        id: z.string(),
        year: z.string(),
        short: z.string(),
        where: z.string(),
        title: z.string(),
        text: z.array(z.string()),
        /** Link esterno facoltativo: semplice sotto il testo, oppure scheda con immagine e testo dopo lo schema */
        link: z
          .object({
            label: z.string(),
            url: z.string().url(),
            text: z.string().optional(),
            image: z.string().optional(),
          })
          .optional(),
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

/** Caso studio "Questo portfolio", un file per lingua: src/content/portfolio/it.yaml, en.yaml */
const portfolio = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/portfolio' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    name: z.string(),
    title: z.string(),
    lead: z.string(),
    mockupAlt: z.string(),
    facts: z.array(z.object({ value: z.string(), label: z.string() })),
    navLabel: z.string(),
    moments: z.array(
      z.object({
        id: z.string(),
        year: z.string(),
        short: z.string(),
        where: z.string(),
        title: z.string(),
        text: z.array(z.string()),
        /** Elenco facoltativo dopo il testo: titoletto in grassetto e frase. */
        list: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
        principle: z.string(),
        diagram: z.enum(['spec', 'loop', 'choices', 'pipeline', 'report']),
      }),
    ),
    diagrams: z.object({
      spec: z.object({ doc: z.string(), items: z.array(z.string()), rule: z.string(), agent: z.string(), alt: z.string() }),
      loop: z.object({ steps: z.array(z.string()).length(4), chart: z.string(), alt: z.string() }),
      choices: z.object({ before: z.string(), after: z.string(), alt: z.string() }),
      pipeline: z.object({ steps: z.array(z.string()).length(4), dns: z.string(), site: z.string(), mail: z.string(), alt: z.string() }),
      report: z.object({
        title: z.string(),
        numbers: z.array(z.object({ value: z.string(), label: z.string() })),
        parts: z.array(z.string()).length(3),
        alt: z.string(),
      }),
    }),
    learned: z.object({
      label: z.string(),
      intro: z.string(),
      points: z.array(z.object({ title: z.string(), text: z.string() })),
      repo: z.string(),
    }),
  }),
});

/** Caso studio Grigna, un file per lingua: src/content/grigna/it.yaml, en.yaml */
const titled = z.object({ title: z.string(), text: z.string() });
const grigna = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/grigna' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    name: z.string(),
    label: z.string(),
    title: z.string(),
    lead: z.string(),
    siteLabel: z.string(),
    demoTitle: z.string(),
    facts: z.array(z.object({ value: z.string(), label: z.string() })),
    principles: z.object({ label: z.string(), intro: z.string(), items: z.array(titled).length(6) }),
    components: z.object({
      label: z.string(),
      intro: z.string(),
      hint: z.string(),
      theme: z.string(),
      light: z.string(),
      dark: z.string(),
      quote: z.string(),
    }),
    a11y: z.object({
      label: z.string(),
      intro: z.string(),
      items: z.array(titled),
      toggle: z.string(),
      toggleHint: z.string(),
      quote: z.string(),
    }),
    readers: z.object({
      label: z.string(),
      intro: z.string(),
      items: z.array(titled),
      example: z.string(),
      always: z.string(),
      alwaysItems: z.array(z.string()),
      never: z.string(),
      neverItems: z.array(z.string()),
      quote: z.string(),
    }),
    tokens: z.object({
      label: z.string(),
      intro: z.string(),
      levels: z.array(z.object({ name: z.string(), text: z.string(), token: z.string(), code: z.string() })).length(3),
      dark: z.string(),
    }),
    experiment: z.object({
      label: z.string(),
      intro: z.array(z.string()),
      honest: z.string(),
      without: z.string(),
      with: z.string(),
      rows: z.array(z.object({ label: z.string(), without: z.string(), with: z.string() })),
      shotWithout: z.string(),
      shotWith: z.string(),
      learned: z.string(),
      improvements: z.array(titled),
      quote: z.string(),
    }),
    closing: z.object({ button: z.string() }),
  }),
});

/** Pagina Lavori, un file per lingua: src/content/work/it.yaml, en.yaml. I casi sono in ordine di pagina. */
const work = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/work' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    title: z.string(),
    lead: z.string(),
    cases: z.array(
      z.object({
        /** Chiave di routes (src/i18n/ui.ts) della pagina del caso. */
        route: z.enum(['telepass', 'portfolio', 'grigna']),
        /** Immagine della scheda, scelta in WorkPage.astro (portfolio: mockup animato). */
        image: z.enum(['telepass', 'portfolio', 'grigna']),
        eyebrow: z.string(),
        title: z.string(),
        text: z.string(),
        tags: z.array(z.string()),
        imageAlt: z.string(),
      }),
    ),
    archive: z.object({ eyebrow: z.string(), title: z.string(), text: z.string(), link: z.string() }),
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
    certifications: z.array(z.object({ name: z.string(), issuer: z.string(), url: z.string().url().optional() })),
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

export const collections = { home, pages, telepass, portfolio, grigna, work, cv, mountains };
