# Brand Miracle Design

Logo ricostruito in vettoriale dal png del sito (2026). Il file originale non esiste più.

- `miracle-design-logo-dark.svg`: per fondi chiari (colore #15181A).
- `miracle-design-logo-light.svg`: per fondi scuri (bianco).
- `miracle-design-logo-currentcolor.svg`: prende il colore del testo in cui è inserito; è quello da usare nel sito.
- `miracle-design-script-dark.svg`: solo la scritta "miracle", per spazi ridotti.

La scritta "miracle" è ricalcata dal png originale. "DESIGN" e la linea sono ridisegnati in geometria pulita sulle stesse posizioni, perché dal png risultavano irregolari.

**Dimensione minima**: il logo completo sotto i 200 px di larghezza rende "DESIGN" quasi illeggibile. Sotto quella misura usare la sola scritta.

## Favicon

In `favicon/`: la "m" è presa dal logo, così marchio e favicon coincidono. Da inserire nell'`<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
```

In `alternative/` c'è la "m" della vecchia favicon, ricalcata: più compatta e leggibile a 16 px, ma di stile diverso dal logo.
