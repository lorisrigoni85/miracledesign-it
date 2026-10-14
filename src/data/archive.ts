/** Archivio 2016 – 2020 (SITE-GUIDE.md, "Archivio 2016 – 2020"). `preview`: le sei voci mostrate in Home. */

/** Paese del cliente: 'IT' Italia, 'CH' Svizzera. Assente = da confermare. */
export type Country = 'IT' | 'CH';

export const countryName: Record<Country, { it: string; en: string }> = {
  IT: { it: 'Italia', en: 'Italy' },
  CH: { it: 'Svizzera', en: 'Switzerland' },
};

export const archive: { client: string; year: number; country?: Country; type: { it: string; en: string }; preview?: boolean }[] = [
  { client: 'Danilo Radice Architetto', year: 2020, type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Innofida Studio', year: 2020, type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Sinergia HR', year: 2020, type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Banca BPS (Suisse) SA', year: 2019, country: 'CH', type: { it: 'UX/UI', en: 'UX/UI' }, preview: true },
  { client: 'Caffè Moka Efti', year: 2019, type: { it: 'UX/UI, e-commerce', en: 'UX/UI, e-commerce' }, preview: true },
  { client: "Portofino's Centri Estetici", year: 2019, type: { it: 'UX/UI, e-commerce', en: 'UX/UI, e-commerce' } },
  { client: 'Loris Kessel Auto SA', year: 2018, country: 'CH', type: { it: 'UX/UI', en: 'UX/UI' }, preview: true },
  { client: 'ATED Ticino', year: 2018, country: 'CH', type: { it: 'UX/UI, e-commerce', en: 'UX/UI, e-commerce' }, preview: true },
  { client: 'Cocktail House', year: 2018, country: 'CH', type: { it: 'UX/UI, e-commerce', en: 'UX/UI, e-commerce' } },
  { client: 'C.S.C. Allestimenti S.r.l.', year: 2018, country: 'IT', type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Helios Elio Cavagna S.r.l.', year: 2018, country: 'IT', type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Tingenia ingegneria e geomatica SA', year: 2018, country: 'CH', type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'SNDS socialandsearch Sagl', year: 2017, country: 'CH', type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Istituto Carlo Secoli S.r.l.', year: 2017, country: 'IT', type: { it: 'UX/UI', en: 'UX/UI' }, preview: true },
  { client: 'Monte Tamaro SA', year: 2017, country: 'CH', type: { it: 'UX/UI, e-commerce', en: 'UX/UI, e-commerce' }, preview: true },
  { client: 'Quantasia Benessere emozionale', year: 2017, type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'Dick & Figli Arredamenti', year: 2017, type: { it: 'UX/UI', en: 'UX/UI' } },
  { client: 'PRO-M Mtb shop', year: 2016, type: { it: 'Social media marketing', en: 'Social media marketing' } },
];
