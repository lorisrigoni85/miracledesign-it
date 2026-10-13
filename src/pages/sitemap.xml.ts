import type { APIRoute } from 'astro';
import { routes } from '../i18n/ui';
import { getChapters, getTwin, chapterUrl } from '../i18n/chapters';

/** Sitemap con entrambe le lingue e le alternative hreflang (SITE-GUIDE.md, "SEO e condivisione"). */
export const GET: APIRoute = async ({ site }) => {
  const abs = (path: string) => new URL(path, site).href;
  const pairs: { it: string; en: string }[] = Object.values(routes).map((r) => ({ ...r }));
  for (const c of await getChapters('it')) {
    const twin = await getTwin(c);
    if (twin) pairs.push({ it: chapterUrl(c), en: chapterUrl(twin) });
  }
  const urls = pairs.flatMap((p) =>
    (['it', 'en'] as const).map(
      (lang) => `  <url>
    <loc>${abs(p[lang])}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${abs(p.it)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${abs(p.en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(p.it)}"/>
  </url>`,
    ),
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
