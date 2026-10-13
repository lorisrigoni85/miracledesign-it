export const languages = ['it', 'en'] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'it';

/** Pagine fisse con il loro indirizzo in ciascuna lingua (SITE-GUIDE.md, "Mappa del sito e URL"). */
export const routes = {
  home: { it: '/', en: '/en/' },
  telepass: { it: '/lavori/telepass/', en: '/en/work/telepass/' },
  archive: { it: '/archivio/', en: '/en/archive/' },
  about: { it: '/chi-sono/', en: '/en/about/' },
  privacy: { it: '/privacy/', en: '/en/privacy/' },
} satisfies Record<string, Record<Lang, string>>;

export type RouteId = keyof typeof routes;

export const chapterBase: Record<Lang, string> = {
  it: '/lavori/telepass/',
  en: '/en/work/telepass/',
};

export const cvUrl: Record<Lang, string> = {
  it: '/cv/loris-rigoni-cv-it.pdf',
  en: '/cv/loris-rigoni-cv-en.pdf',
};

export const email = 'loris@miracledesign.it';
export const linkedin = 'https://www.linkedin.com/in/loris-rigoni-b60a516b/';

/** Google Analytics 4: si carica solo dopo il consenso (components/CookieBanner.astro). */
export const analyticsId = 'G-0HE3S5SD1Z';

export const ui = {
  it: {
    skip: 'Vai al contenuto',
    nav: { work: 'Lavori', about: 'Chi sono', cv: 'CV', contact: 'Contatti' },
    workAnchor: '/#lavori',
    contactAnchor: '#contatti',
    menuOpen: 'Apri il menu',
    menuClose: 'Chiudi il menu',
    langLabel: 'Lingua',
    home: 'Home',
    work: 'Lavori',
    readCase: 'Leggi il caso',
    downloadCv: 'Scarica il CV',
    writeMe: 'Scrivimi',
    chapter: 'Capitolo',
    chapters: 'Capitoli',
    prevChapter: 'Capitolo precedente',
    nextChapter: 'Capitolo successivo',
    backToIndex: 'Torna a Telepass, 2019 – oggi',
    footerLine: 'Loris Rigoni · Como, Italia',
    privacy: 'Privacy e cookie',
    summary: 'Sintesi',
    cookies: {
      label: 'Cookie',
      text: 'Uso Google Analytics per capire quante persone visitano il sito e quali pagine leggono. Si attiva solo se accetti; senza consenso il sito funziona allo stesso modo.',
      more: 'Informativa',
      accept: 'Accetta',
      reject: 'Rifiuta',
      close: 'Chiudi e rifiuta',
      preferences: 'Preferenze cookie',
    },
  },
  en: {
    skip: 'Skip to content',
    nav: { work: 'Work', about: 'About', cv: 'CV', contact: 'Contact' },
    workAnchor: '/en/#work',
    contactAnchor: '#contact',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langLabel: 'Language',
    home: 'Home',
    work: 'Work',
    readCase: 'Read the case study',
    downloadCv: 'Download CV',
    writeMe: 'Get in touch',
    chapter: 'Chapter',
    chapters: 'Chapters',
    prevChapter: 'Previous chapter',
    nextChapter: 'Next chapter',
    backToIndex: 'Back to Telepass, 2019 – today',
    footerLine: 'Loris Rigoni · Como, Italy',
    privacy: 'Privacy and cookies',
    summary: 'Summary',
    cookies: {
      label: 'Cookies',
      text: 'I use Google Analytics to understand how many people visit the site and which pages they read. It only runs if you accept; without consent the site works the same way.',
      more: 'Privacy notice',
      accept: 'Accept',
      reject: 'Reject',
      close: 'Close and reject',
      preferences: 'Cookie preferences',
    },
  },
} as const;
