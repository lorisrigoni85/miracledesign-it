# miracledesign.it

Sito personale di Loris Rigoni, statico, costruito con [Astro](https://astro.build).
La fonte di tutte le scelte e dei testi è `SITE-GUIDE.md`, che resta solo in locale (contiene dati personali, è esclusa da git): leggerla prima di modificare qualsiasi cosa.

## Vedere il sito sul Mac

I comandi vanno lanciati **dalla cartella del progetto**. Se la riga del terminale finisce con `~ %` sei nella cartella utente e `npm run dev` dà l'errore `ENOENT ... package.json`. Prima spostati nel progetto (le virgolette servono per lo spazio nel nome):

```bash
cd "/Users/loris/Documents/prova claude"
```

Ora la riga finisce con `prova claude %`. Poi avvia il sito:

```bash
npm run dev
```

Il sito si apre su http://localhost:4321. Se quell'indirizzo è già occupato (per esempio perché il sito l'ha già avviato Claude), parte su http://localhost:4322: l'indirizzo giusto è scritto nel terminale. Per spegnerlo, nel terminale premi `Ctrl` + `C`.

Se il sito è già acceso basta aprire l'indirizzo nel browser, senza usare il terminale.

## Comandi

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
| Pagina Telepass (apertura, posizioni, quattro momenti, testi degli schemi) | `src/content/telepass/it.yaml`, `en.yaml` |
| Chi sono, Archivio, Privacy | `src/content/pages/<lingua>/*.md` |
| Elenco dell'archivio | `src/data/archive.ts` |
| Pagina Montagna (attività, cime, didascalie) | `src/content/mountains/it.yaml`, `en.yaml`; foto in `src/assets/montagna/` |
| CV (pagina) | `src/content/cv/it.yaml`, `en.yaml`; PDF in `public/cv/` (senza telefono) |
| Menu, pulsanti, etichette, indirizzi delle pagine | `src/i18n/ui.ts` |
| Colori, font, spaziature | `src/styles/tokens.css` |
| Logo (vettoriale) e note sul brand | `src/assets/brand/` (favicon in `public/`) |
| Banner cookie e Google Analytics | `src/components/CookieBanner.astro` (ID in `src/i18n/ui.ts`) |

I testi tra parentesi quadre sono segnaposto: si completano con dati veri.

## Da fare prima della pubblicazione

- Immagini al posto dei riquadri segnaposto.
- Decisioni aperte: SITE-GUIDE.md, "Cosa resta da decidere o raccogliere".
