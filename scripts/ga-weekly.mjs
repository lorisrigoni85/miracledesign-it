// Dati settimanali di Google Analytics 4 per il rapporto del lunedì.
// Legge la chiave dell'account di servizio da ~/.config/miracledesign/ga-key.json
// e l'ID della proprietà da ~/.config/miracledesign/ga.json ({ "propertyId": "123456789" }).
// Nessuna dipendenza: firma il token con il modulo crypto di Node e chiama la Data API v1beta.
// Uso: node scripts/ga-weekly.mjs  → stampa un JSON con la settimana scorsa e quella prima.
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createSign } from 'node:crypto';

const dir = join(homedir(), '.config', 'miracledesign');
const key = JSON.parse(readFileSync(join(dir, 'ga-key.json'), 'utf8'));
const { propertyId } = JSON.parse(readFileSync(join(dir, 'ga.json'), 'utf8'));

const b64 = (v) => Buffer.from(typeof v === 'string' ? v : JSON.stringify(v)).toString('base64url');

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'RS256', typ: 'JWT' });
  const claim = b64({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });
  const sign = createSign('RSA-SHA256');
  sign.update(`${head}.${claim}`);
  const jwt = `${head}.${claim}.${sign.sign(key.private_key, 'base64url')}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`Token non ottenuto: ${JSON.stringify(data)}`);
  return data.access_token;
}

// Settimana scorsa (lunedì–domenica) e quella precedente, in date locali
const day = 864e5;
const fmt = (d) => d.toISOString().slice(0, 10);
const today = new Date();
const dow = (today.getDay() + 6) % 7; // 0 = lunedì
const lastMonday = new Date(today.getTime() - (dow + 7) * day);
const ranges = [
  { name: 'settimana', startDate: fmt(lastMonday), endDate: fmt(new Date(lastMonday.getTime() + 6 * day)) },
  { name: 'precedente', startDate: fmt(new Date(lastMonday.getTime() - 7 * day)), endDate: fmt(new Date(lastMonday.getTime() - day)) },
];

const reports = {
  totali: { metrics: ['activeUsers', 'newUsers', 'sessions', 'screenPageViews', 'userEngagementDuration', 'engagedSessions'] },
  pagine: { dimensions: ['pagePath'], metrics: ['screenPageViews', 'activeUsers', 'userEngagementDuration'], limit: 15 },
  canali: { dimensions: ['sessionDefaultChannelGroup', 'sessionSource'], metrics: ['sessions', 'activeUsers'], limit: 15 },
  paesi: { dimensions: ['country', 'city'], metrics: ['activeUsers'], limit: 15 },
  dispositivi: { dimensions: ['deviceCategory'], metrics: ['activeUsers'] },
  eventi: { dimensions: ['eventName'], metrics: ['eventCount'], limit: 30 },
  download: { dimensions: ['fileName'], metrics: ['eventCount'], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'file_download' } } } },
  contatti: { dimensions: ['eventName'], metrics: ['eventCount'], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'contact_click' } } } },
  linkEsterni: { dimensions: ['linkUrl'], metrics: ['eventCount'], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'click' } } }, limit: 20 },
  scroll: { dimensions: ['pagePath'], metrics: ['eventCount'], dimensionFilter: { filter: { fieldName: 'eventName', stringFilter: { value: 'scroll' } } }, limit: 15 },
  pagina404: { dimensions: ['pagePath', 'pageReferrer'], metrics: ['screenPageViews'], dimensionFilter: { filter: { fieldName: 'pageTitle', stringFilter: { matchType: 'CONTAINS', value: 'Fuori sentiero' } } }, limit: 15 },
};

const access = await token();
const out = { proprieta: propertyId, periodi: ranges, dati: {} };

for (const [name, body] of Object.entries(reports)) {
  out.dati[name] = {};
  for (const r of ranges) {
    const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`, {
      method: 'POST',
      headers: { authorization: `Bearer ${access}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate: r.startDate, endDate: r.endDate }],
        dimensions: (body.dimensions || []).map((n) => ({ name: n })),
        metrics: body.metrics.map((n) => ({ name: n })),
        ...(body.dimensionFilter ? { dimensionFilter: body.dimensionFilter } : {}),
        ...(body.dimensions ? { orderBys: [{ metric: { metricName: body.metrics[0] }, desc: true }] } : {}),
        limit: body.limit || 10,
      }),
    });
    const data = await res.json();
    if (data.error) {
      out.dati[name][r.name] = { errore: data.error.message };
      continue;
    }
    const dims = (data.dimensionHeaders || []).map((h) => h.name);
    const mets = (data.metricHeaders || []).map((h) => h.name);
    out.dati[name][r.name] = (data.rows || []).map((row) => ({
      ...Object.fromEntries(dims.map((d, i) => [d, row.dimensionValues[i].value])),
      ...Object.fromEntries(mets.map((m, i) => [m, Number(row.metricValues[i].value)])),
    }));
  }
}

console.log(JSON.stringify(out, null, 2));
