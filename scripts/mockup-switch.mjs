// scripts/mockup-switch.mjs — MOCKUP av ett "Förutsättningar inför bytet"-block i bytes-kortet.
// Ger CFO:n det den behöver för beslutet: kontraktsläget, like-for-like, vad ni betalar, risken/utgången.
// Källbelagt, aldrig påhittat. Två kontrakt-lägen (känt datum / okänt). Trogen dossier-tokens.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0A1411', teal: '#2BC4AC', tealBright: '#5DD6CA', warn: '#E0A23C',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.82)', faint: 'rgba(228,238,234,0.60)', ghost: 'rgba(228,238,234,0.40)',
  hair: 'rgba(255,255,255,0.10)',
  mono: "'JetBrains Mono', ui-monospace, monospace", serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif",
};

const eyebrow = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:${T.teal};margin-bottom:16px">${t}</div>`;

// En förutsättnings-rad: ikon-prick + rubrik + brödtext
const cond = (title, body, accent = T.teal) => `
  <div style="display:flex;gap:13px;padding:14px 0;border-top:1px solid ${T.hair}">
    <span style="flex-shrink:0;width:8px;height:8px;border-radius:50%;background:${accent};margin-top:6px;box-shadow:0 0 8px ${accent}66"></span>
    <div><div style="font-family:${T.sans};font-size:14px;font-weight:600;color:${T.ink};margin-bottom:4px">${title}</div>
      <div style="font-family:${T.sans};font-size:13px;line-height:1.6;color:${T.muted}">${body}</div></div></div>`;

const moneyRow = (k, v, sub = '', strong = false) => `
  <div style="display:flex;justify-content:space-between;align-items:baseline;padding:8px 0">
    <span style="font-family:${T.sans};font-size:13px;color:${T.muted}">${k}${sub ? `<span style="display:block;font-size:11px;color:${T.ghost};margin-top:2px">${sub}</span>` : ''}</span>
    <span style="font-family:${T.mono};font-size:${strong ? 16 : 14}px;color:${strong ? T.tealBright : T.ink};font-feature-settings:'tnum';white-space:nowrap">${v}</span></div>`;

const block = (kontraktHtml) => `
<div style="border:1px solid ${T.hair};border-radius:18px;background:${T.raised};padding:22px 24px;margin-bottom:14px">
  ${eyebrow('Förutsättningar inför bytet')}

  ${kontraktHtml}

  ${cond('Vad ni får', 'Bahnhof Företag matchat mot er nuvarande nivå — <b style="color:'+T.ink+'">svensk support, statisk IP, stark SLA</b>. Samma eller bättre, aldrig en nedgradering. Matchar inte offerten er nivå byter vi inte.')}

  <div style="padding:14px 0;border-top:1px solid ${T.hair}">
    <div style="font-family:${T.sans};font-size:14px;font-weight:600;color:${T.ink};margin-bottom:8px">Vad ni betalar</div>
    ${moneyRow('Ni betalar idag', '23 388 kr/år', 'er faktura')}
    ${moneyRow('Marknadsgolv för er nivå', '13 980 kr/år', 'verifierat publikt listpris · 2026-06-17')}
    ${moneyRow('Realiserad besparing', '+9 408 kr/år', 'efter Arvos arvode (20 % av år 1)', true)}
    <div style="margin-top:10px;font-family:${T.sans};font-size:12px;line-height:1.6;color:${T.faint}">
      Bahnhof sätter exakt pris per adress i offert — slutpriset <b style="color:${T.muted}">bekräftas innan ni signerar</b>. Vi fakturerar först när besparingen landat i era böcker.</div>
  </div>

  ${cond('Risken är er vinst — inte er börda', 'Inget är bindande förrän <b style="color:'+T.ink+'">ni signerar med BankID</b>. Offerten kan tackas nej till utan kostnad. Ingen driftstörning — bredbandsbyte är lagstadgat systematiserat; den vinnande leverantören verkställer porteringen.')}
</div>`;

const kontraktKnown = cond('Kontraktsläget · ni kan byta',
  'Ert Tele2-avtal löper till <b style="color:'+T.ink+'">2026-09-30</b> · uppsägning 30 dagar. Bytet <b style="color:'+T.ink+'">tajmas till avtalsslutet</b> — ingen dubbelbetalning, ingen brytavgift.', T.teal);

const kontraktUnknown = cond('Kontraktsläget · vi behöver ett datum',
  'Vi ser inget bindningsdatum på er faktura. Sitter ni i ett avtal kan en <b style="color:'+T.ink+'">bindningstid eller brytavgift</b> dölja besparingen. Ladda upp avtalet så läser vi det och tajmar bytet rätt — vi flyttar er aldrig in i en avgift.', T.warn);

const cap = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:30px 6px 13px">${t}</div>`;

const body = `<body style="margin:0;padding:38px 22px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:520px;margin:0 auto">
    ${cap('Nytt block — kontrakt KÄNT (ni kan byta nu)')}${block(kontraktKnown)}
    ${cap('Nytt block — kontrakt OKÄNT (ärlig flagga)')}${block(kontraktUnknown)}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await browser.newPage({ viewport: { width: 560, height: 1000 }, deviceScaleFactor: 2 });
await p.setContent(body);
await p.screenshot({ path: `/tmp/mockup/switch.png`, fullPage: true });
console.log('✓ switch');
await browser.close();
