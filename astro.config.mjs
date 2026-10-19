// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://miracledesign.it',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    // "Lavori" / "Work" vivono come sezione della Home (SITE-GUIDE.md, Menu)
    '/lavori/': '/#lavori',
    '/en/work/': '/en/#work',
    // Vecchie pagine dei capitoli Telepass: ora sono momenti della pagina Telepass.
    '/lavori/telepass/mappatura-2019/': '/lavori/telepass/#mappare',
    '/lavori/telepass/ricerca-2022/': '/lavori/telepass/#ascoltare',
    '/lavori/telepass/redesign-2024/': '/lavori/telepass/#ridisegnare',
    '/lavori/telepass/offerta-sempre/': '/lavori/telepass/#conversione',
    '/lavori/telepass/download-app/': '/lavori/telepass/#conversione',
    '/en/work/telepass/site-audit-2019/': '/en/work/telepass/#mapping',
    '/en/work/telepass/research-2022/': '/en/work/telepass/#listening',
    '/en/work/telepass/redesign-2024/': '/en/work/telepass/#redesigning',
    '/en/work/telepass/sempre-offer/': '/en/work/telepass/#business',
    '/en/work/telepass/app-download/': '/en/work/telepass/#business',
  },
});
