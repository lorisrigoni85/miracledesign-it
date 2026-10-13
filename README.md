# miracledesign.it

Sito personale di Loris Rigoni, statico, costruito con [Astro](https://astro.build).
La fonte di tutte le scelte e dei testi è `SITE-GUIDE.md`, che resta solo in locale (contiene dati personali, è esclusa da git): leggerla prima di modificare qualsiasi cosa.

## Comandi

```bash
npm run dev
```

Avvia il sito in locale su http://localhost:4321.

```bash
npm run build
```

Genera il sito pubblicabile nella cartella `dist/`.

## Pubblicazione

Il sito è ospitato su GitHub Pages. A ogni push sul ramo `main`, `.github/workflows/deploy.yml` compila il sito e lo pubblica su https://miracledesign.it (dominio indicato in `public/CNAME`). Dominio e posta restano su Aruba.

## Dove sono i testi

| Cosa | File |
| --- | --- |
| Home | `src/content/home/it.yaml`, `en.yaml` |
| Capitoli Telepass | `src/content/chapters/<lingua>/<indirizzo>.md` |
| Pagina madre Telepass, Chi sono, Archivio, Privacy | `src/content/pages/<lingua>/*.md` |
| Elenco dell'archivio | `src/data/archive.ts` |
| Menu, pulsanti, etichette, indirizzi delle pagine | `src/i18n/ui.ts` |
| Colori, font, spaziature | `src/styles/tokens.css` |
| Banner cookie e Google Analytics | `src/components/CookieBanner.astro` (ID in `src/i18n/ui.ts`) |

I testi tra parentesi quadre sono segnaposto: si completano con dati veri.

## Da fare prima della pubblicazione

- Logo e favicon definitivi dal pacchetto `portfolio-start` (oggi `src/components/Logo.astro` e `public/favicon.svg` sono provvisori).
- PDF del CV in `public/cv/loris-rigoni-cv-it.pdf` e `public/cv/loris-rigoni-cv-en.pdf`.
- Immagini al posto dei riquadri segnaposto.
- Versioni inglesi dei capitoli e della pagina Telepass, dopo l'approvazione dell'italiano.
- Decisioni aperte: SITE-GUIDE.md, "Cosa resta da decidere o raccogliere".
