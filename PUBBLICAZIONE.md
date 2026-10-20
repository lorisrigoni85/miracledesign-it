# Come è pubblicato il sito (e come si aggiorna)

Il sito è online su https://miracledesign.it dal 20 ottobre 2026.

## Chi fa cosa

| | Cosa fa | Dove |
| --- | --- | --- |
| **Il Mac** | Il "laboratorio": i file sorgente del sito (testi, foto, codice); qui si provano le modifiche in anteprima. | cartella `prova claude` |
| **GitHub** | L'archivio di tutte le versioni del codice e la "tipografia": costruisce il sito e lo ospita gratis (GitHub Pages). | github.com/lorisrigoni85/miracledesign-it |
| **Aruba** | Il proprietario dell'indirizzo: dominio miracledesign.it, DNS (la "rubrica" che dice dove sta il sito) e posta. | pannello Aruba |

Quando qualcuno scrive **miracledesign.it**:

```
Visitatore → chiede ad Aruba: "dove sta miracledesign.it?"
          ← Aruba (DNS): "sta da GitHub, a questi indirizzi"
Visitatore → GitHub → riceve le pagine del sito
```

La **posta** segue un'altra strada: i record MX la mandano ad Aruba, come prima.

## Cosa è stato fatto per la pubblicazione

1. **Archivio del vecchio sito**: copia nella cartella `Old/`, solo sul Mac (esclusa da git). Contiene le pagine come le vede un visitatore; i sorgenti PHP originali si scaricano solo dall'FTP di Aruba.
2. **Controllo privacy**: verificato che nel codice e nella sua cronologia non ci fossero dati personali (telefono, linee guida), prima di renderlo pubblico.
3. **Repository pubblico**: GitHub ospita gratis solo i siti con codice pubblico. Il codice di un sito è comunque visibile a chi lo visita.
4. **GitHub Pages acceso**: il sito si costruisce con l'automatismo `.github/workflows/deploy.yml`; dominio impostato su miracledesign.it (anche nel file `public/CNAME`).
5. **Prima pubblicazione**: GitHub ha costruito il sito (dai sorgenti alle pagine web finite) e lo ha messo sui suoi server.
6. **DNS su Aruba**:
   - `@` (miracledesign.it): record A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` e AAAA `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` (tolti i vecchi A `89.46.104.35` e AAAA `2a00:6d40:4:2::c207:35`)
   - `www`: CNAME `lorisrigoni85.github.io`
   - Non toccati: MX, mx, mail, smtp, imap, webmail, ftp, TXT (SPF)
7. **Attesa**: i quattro server DNS di Aruba si allineano tra loro e quelli del mondo aggiornano la loro memoria (da minuti a un'ora).
8. **Certificato HTTPS**: GitHub lo chiede a Let's Encrypt e lo rinnova da solo ogni tre mesi. Poi è stato acceso "Enforce HTTPS" (sempre col lucchetto).
   Nota: il certificato è partito solo dopo che tutti i server DNS di Aruba erano allineati, togliendo e rimettendo il dominio nelle impostazioni di Pages.
9. **Verifiche**: tutte le pagine, la 404, la posta, Google Analytics (non parte prima del consenso, funziona dopo "Accetta").

## Come fare le modifiche

**Il principio**: ogni modifica che arriva su GitHub (un *push* sul ramo *main*) fa ricostruire e ripubblicare il sito in automatico, in circa 2 minuti. Aruba e i DNS non si toccano più.

### Modo 1 (consigliato): chiedere a Claude

1. Aprire Claude Code in questa cartella e chiedere la modifica.
2. Claude la prepara e la mostra in anteprima sul Mac (http://localhost:4321).
3. Se va bene, Claude la salva e la pubblica.
4. Dopo un paio di minuti è su miracledesign.it.

### Modo 2: un testo al volo dal sito di GitHub

1. Aprire il repository e il file del testo (vedi la tabella "Dove sono i testi" nel README, per esempio `src/content/home/it.yaml`).
2. Cliccare la **matita** ✏️, modificare, poi **Commit changes**.
3. GitHub pubblica da solo. Nella scheda **Actions**: pallino giallo = sta lavorando, spunta verde = online, X rossa = errore (il sito resta com'era: chiedere a Claude).

**Se qualcosa va storto**: ogni modifica è una versione salvata, si può sempre tornare indietro.

## Da ricordare

- **DNS**: non toccarli. Se un giorno servisse, lasciare stare i record della posta (MX, mail, smtp, imap).
- **Aruba**: continuare a pagare dominio e posta. Il vecchio spazio web non serve più, ma prima di disdirlo controllare che la posta non sia nello stesso pacchetto.
- **GitHub**: gratuito finché il repository resta pubblico.
- **Certificato**: si rinnova da solo; la scadenza mostrata su GitHub cambia ogni tre mesi.
