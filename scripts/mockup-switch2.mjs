// scripts/mockup-switch2.mjs — DOM-FÖRST bytes-kort. Inte en faktaruta — vakten talar.
// En asymmetrisk dom bär kortet; bevisen (like-for-like, pengar, BankID-utgång) ligger
// hopvikt UNDER. Två genuint olika lägen: datum känt (vakten VET när) / datum saknas
// (vakten vet vad den inte vet — bristen blir nästa drag). Trogen dossier-tokens.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const T = {
  bg: '#050B09', raised: '#0A1411', teal: '#2BC4AC', tealBright: '#5DD6CA', warn: '#E0A23C',
  ink: '#F4F9F7', muted: 'rgba(236,244,241,0.82)', faint: 'rgba(228,238,234,0.60)', ghost: 'rgba(228,238,234,0.40)',
  hair: 'rgba(255,255,255,0.10)', hairSoft: 'rgba(255,255,255,0.06)',
  mono: "'JetBrains Mono', ui-monospace, monospace", serif: "'Playfair Display', Georgia, serif", sans: "'Inter', system-ui, sans-serif",
};

const tnum = `font-feature-settings:'tnum'`;
const W = (s) => `<span style="color:${T.tealBright}">${s}</span>`;
const ink = (s) => `<span style="color:${T.ink}">${s}</span>`;

// Liten bevis-rad inne i den hopvikta sektionen
const evRow = (k, v, sub = '', strong = false) => `
  <div style="display:flex;justify-content:space-between;align-items:baseline;padding:7px 0">
    <span style="font-family:${T.sans};font-size:12.5px;color:${T.muted}">${k}${sub ? `<span style="display:block;font-size:10.5px;color:${T.ghost};margin-top:2px">${sub}</span>` : ''}</span>
    <span style="font-family:${T.mono};font-size:${strong ? 15 : 13}px;color:${strong ? T.tealBright : T.ink};${tnum};white-space:nowrap">${v}</span></div>`;

// Hopvikt bevis-sektion: hårfin etikett + rader. (I produkt = <details>; i mockup alltid öppen-sekundär.)
const proof = (label, inner) => `
  <div style="margin-top:4px;padding:13px 0 2px;border-top:1px solid ${T.hairSoft}">
    <div style="font-family:${T.mono};font-size:9.5px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin-bottom:6px">${label}</div>
    ${inner}</div>`;

// KORTET — domen är hjälte; eyebrow + serif-dom + en stödmening, sedan bevisen hopvikta.
const card = (accent, eyebrowTxt, verdictHtml, supportHtml, proofs) => `
<div style="position:relative;border:1px solid ${T.hair};border-radius:20px;overflow:hidden;
   background:radial-gradient(680px 320px at 12% -10%, ${accent}14, transparent 60%), ${T.raised};
   padding:24px 26px 20px;margin-bottom:14px">
  <div style="display:flex;align-items:center;gap:9px;font-family:${T.mono};font-size:10px;letter-spacing:.26em;
     text-transform:uppercase;color:${T.ghost};margin-bottom:16px">
    <span style="width:6px;height:6px;border-radius:50%;background:${accent};box-shadow:0 0 0 4px ${accent}22,0 0 12px ${accent}"></span>
    ${eyebrowTxt}</div>
  <div style="font-family:${T.serif};font-weight:500;font-size:25px;line-height:1.22;color:${T.ink};letter-spacing:-.01em;margin-bottom:14px">
    ${verdictHtml}</div>
  <div style="font-family:${T.sans};font-size:13.5px;line-height:1.62;color:${T.muted};margin-bottom:6px">
    ${supportHtml}</div>
  ${proofs}
</div>`;

// ── Läge 1: datum KÄNT — vakten vet exakt när ─────────────────────────────
const known = card(T.teal,
  'Vakten · ert byte',
  `Ni kan byta — och vi vet <span style="color:${T.teal}">exakt när</span>.`,
  `Ert Tele2-avtal löper till ${ink('30 september')}. Vi avfyrar bytet på dagen, i ert namn — ni betalar ${ink('aldrig en dag dubbelt')}, och vi flyttar er ${ink('aldrig in i en avgift')}.`,
  proof('Vad ni får', `
    <div style="font-family:${T.sans};font-size:12.5px;line-height:1.6;color:${T.muted};padding:2px 0 4px">
      Bahnhof Företag matchat mot er nivå — svensk support, statisk IP, stark SLA. Samma eller bättre, aldrig en nedgradering.</div>`)
  + proof('Vad ni betalar · realiserad besparing', `
    ${evRow('Idag', '23 388 kr/år', 'er faktura')}
    ${evRow('Marknadsgolv för er nivå', '13 980 kr/år', 'verifierat publikt listpris · 2026-06-17')}
    ${evRow('Ni behåller', '+9 408 kr/år', 'efter Arvos arvode · vi fakturerar först när det landat', true)}
    <div style="margin-top:8px;font-family:${T.sans};font-size:11px;line-height:1.55;color:${T.faint}">
      Bahnhof sätter exakt pris per adress — slutpriset bekräftas innan ni signerar.</div>`)
  + proof('Er enda handling', `
    <div style="font-family:${T.sans};font-size:12.5px;line-height:1.6;color:${T.muted};padding:2px 0">
      En BankID-signatur. Inget är bindande förrän ni skriver under, offerten kan tackas nej till utan kostnad, och porteringen ger ingen driftstörning — den vinnande leverantören verkställer.</div>`));

// ── Läge 2: datum SAKNAS — vakten vet vad den inte vet ────────────────────
const unknown = card(T.warn,
  'Vakten · ett drag kvar',
  `En sak står mellan er och <span style="color:${T.tealBright}">9 408 kr</span>: vad ert avtal säger.`,
  `Vi ser besparingen tydligt — men inget bindningsdatum på er faktura. Skicka avtalet, så ${ink('läser vi bindningstiden')} och tajmar bytet så ni ${ink('aldrig betalar dubbelt')} och ${ink('aldrig hamnar i en brytavgift')}.`,
  proof('Besparingen vi redan ser', `
    ${evRow('Idag', '23 388 kr/år', 'er faktura')}
    ${evRow('Marknadsgolv för er nivå', '13 980 kr/år', 'verifierat publikt listpris · 2026-06-17')}
    ${evRow('Möjlig behållning', '+9 408 kr/år', 'efter arvode — bekräftas när avtalet lästs', true)}`)
  + proof('Varför vi väntar på datumet', `
    <div style="font-family:${T.sans};font-size:12.5px;line-height:1.6;color:${T.muted};padding:2px 0">
      En bindningstid eller brytavgift kan äta besparingen om bytet sker fel dag. Vi rör er aldrig förrän vi vet att kalkylen håller — bristen är nästa drag, inte ett hinder.</div>`));

const cap = (t) => `<div style="font-family:${T.mono};font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${T.ghost};margin:30px 6px 13px">${t}</div>`;

const body = `<body style="margin:0;padding:38px 22px;background:${T.bg};font-family:${T.sans}">
  <div style="max-width:520px;margin:0 auto">
    ${cap('Dom-först · datum KÄNT (vakten vet när)')}${known}
    ${cap('Dom-först · datum SAKNAS (vakten vet vad den inte vet)')}${unknown}
  </div></body>`;

mkdirSync('/tmp/mockup', { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const p = await browser.newPage({ viewport: { width: 560, height: 1100 }, deviceScaleFactor: 2 });
await p.setContent(body);
await p.screenshot({ path: `/tmp/mockup/switch2.png`, fullPage: true });
console.log('✓ switch2');
await browser.close();
