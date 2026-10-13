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
  },
});
