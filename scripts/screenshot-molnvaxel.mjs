// scripts/screenshot-molnvaxel.mjs — visuell verifiering (regel 8) av det OMBYGGDA molnväxel-kortet
// (AdvisoryCard, premium dossier-standard) för de tre pilotfakturorna. Trogen repro av styled-component-
// markupen i TestaFaktura/styles.js → AdvisoryCard, med theme-tokens inlinade som CSS. Driver den
// RIKTIGA recommend-logiken för datan. Kör:
//   CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-molnvaxel.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { molnvaxelRecommendation } from '../lib/molnvaxel-recommendation.js';

const L = (description, total, quantity) => ({ type: 'recurring_subscription', description, amount: total, quantity });
const PILOTS = [
  { name: 'Skåne Konsult AB', supplier: 'Telia', seatCount: 45, lineItems: [L('Telia Jobbmobil Obegränsad', 15705, 45), L('Telia Smart Connect Använd.', 5310, 45), L('Svarsgrupp / Köhantering', 297, 3)] },
  { name: 'Arvo Logistics AB', supplier: 'Telavox', seatCount: 22, lineItems: [L('Telavox Premium (PBX-Växel & 100GB Surf)', 8778, 22), L('Hårdvara: Hyra IP-telefon.', 745, 5)] },
  { name: 'Nordic Bygg & Fastighet', supplier: 'Telia', seatCount: 80, lineItems: [L('Telia Touchpoint Plus (Huvudlicens)', 19920, 80), L('Företagsabonnemang 50GB', 23920, 80), L('Administratörslicens (Touchpoint)', 998, 2)] },
];

// Theme-tokens (src/theme.js) — speglar AdvisoryCard 1:1 så skärmdumpen är trogen produktionen.
const T = {
  surface: '#FFFFFF', surfaceAlt: '#E5EFEA', ink: '#0E1A17', inkSoft: '#1F2E2A',
  muted: '#3F4B47', mutedSoft: '#5C6E68', border: '#D5E2DC', borderStrong: '#BACBC2',
  brand: '#1B7A6E', brandSoft: '#DCEEEA', brandGradient: 'linear-gradient(135deg, #5DD6CA 0%, #1B6E66 100%)',
  success: '#1B7A6E', successSoft: '#DCEEEA', warning: '#A8761A', warningSoft: '#F3E5C7',
  radiusLg: '20px', radiusPill: '999px', shadowSm: '0 2px 8px rgba(14, 26, 23, 0.06)',
  mono: "'JetBrains Mono', ui-monospace, monospace", sans: "'Inter', system-ui, sans-serif",
};

function bar(kind, lbl, width, amt, over) {
  const fill = kind === 'floor' ? T.borderStrong : (over ? T.warning : T.brand);
  return `<div style="display:grid;grid-template-columns:92px 1fr auto;align-items:center;gap:12px">
    <span style="font-size:11.5px;font-weight:600;color:${T.muted}">${lbl}</span>
    <span style="height:8px;border-radius:${T.radiusPill};background:${T.surfaceAlt};overflow:hidden;display:block"><span style="display:block;height:100%;width:${width}%;border-radius:${T.radiusPill};background:${fill}"></span></span>
    <span style="font-family:${T.mono};font-size:13px;font-weight:600;color:${T.inkSoft};white-space:nowrap">${amt}</span>
  </div>`;
}

function pill(cls, text) {
  const map = {
    warn: [T.warning, T.warningSoft], ok: [T.success, T.successSoft], neutral: [T.muted, T.surfaceAlt],
  };
  const [c, bg] = map[cls];
  return `<span style="display:inline-flex;align-items:center;margin-top:16px;padding:6px 12px;border-radius:${T.radiusPill};font-size:12px;font-weight:600;color:${c};background:${bg}">${text}</span>`;
}

function card(name, rec) {
  const mv = rec.molnvaxel;
  const addons = (mv.addons || []).filter((a) => a.monthlyExVat != null);
  const hasFloor = !mv.bundled && mv.teliaFloorLabel != null && mv.teliaFloor != null;
  const over = mv.overFloorPct != null && mv.overFloorPct >= 30;
  const scaleMax = Math.max(mv.perUserMonthlyExVat || 0, mv.teliaFloor || 0) || 1;
  const youW = Math.max(6, Math.round(((mv.perUserMonthlyExVat || 0) / scaleMax) * 100));
  const floorW = Math.max(6, Math.round(((mv.teliaFloor || 0) / scaleMax) * 100));

  const compare = hasFloor ? `<div style="margin-top:18px;display:flex;flex-direction:column;gap:10px">
    ${bar('you', 'Ni betalar', youW, `${mv.perUserLabel} kr`, over)}
    ${bar('floor', 'Telia-golv', floorW, `${mv.teliaFloorLabel} kr`, false)}
  </div>` : '';

  const signal = mv.bundled
    ? pill('neutral', 'Buntat pris — jämförs i genomgång, inte mot golv')
    : hasFloor
      ? (over ? pill('warn', `~${mv.overFloorPct} % över Telias instegsgolv`) : pill('ok', 'I nivå med marknadens instegsväxel'))
      : pill('neutral', 'Kontaktcenter — pris sätts via offert');

  const prose = mv.bundled
    ? `Priset buntar växel <strong>och</strong> mobilabonnemang (inkl. surf) — inte direkt jämförbart med en ren växellicens. Vi jämför mot ert faktiska pris i en genomgång istället för en missvisande siffra.`
    : hasFloor
      ? `Telia Smart Connect — marknadens instegsväxel för motsvarande nivå — kostar <strong>från ${mv.teliaFloorLabel} kr/anv/mån</strong> (exkl moms)${over ? '. Glappet är värt en offertjämförelse.' : '. Ni ligger redan rätt — vi bevakar att det förblir så.'}`
      : `På kontaktcenter-nivå sätter leverantörerna pris via offert — vi jämför mot er faktiska kostnad i en genomgång.`;

  const addonRow = addons.length
    ? `<p style="margin:12px 0 0;font-size:12.5px;line-height:1.55;color:${T.muted}">Ni betalar för ${addons.map((a) => `${a.label} (${a.monthlyExVat} kr/mån)`).join(', ')} — bekräfta att de används, annars är det ren besparing.</p>`
    : '';

  return `
  <div style="font-size:12px;color:${T.muted};margin:0 0 8px;font-weight:600">${name} — faktura</div>
  <div style="position:relative;margin:0 0 28px;padding:22px 24px 18px;background:${T.surface};border:1px solid ${T.border};border-radius:${T.radiusLg};box-shadow:${T.shadowSm};overflow:hidden">
    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${T.brandGradient}"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
      <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.09em;color:${T.brand}">Företagsväxel · ${mv.tierLabel}-nivå</span>
      <span style="display:inline-flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${T.brand};background:${T.brandSoft};border-radius:${T.radiusPill};padding:3px 9px"><span style="width:5px;height:5px;border-radius:50%;background:${T.brand};display:inline-block"></span>Verifierad referens</span>
    </div>
    <div style="font-family:${T.mono};font-size:40px;font-weight:600;line-height:1;letter-spacing:-0.02em;color:${T.ink}">${mv.perUserLabel} kr<span style="display:block;margin-top:6px;font-family:${T.sans};font-size:12px;font-weight:500;letter-spacing:0;color:${T.muted}">per användare/mån · exkl moms · ${mv.seats} användare</span></div>
    ${compare}
    ${signal}
    <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:${T.inkSoft}">${prose}</p>
    ${addonRow}
    <div style="margin-top:16px;padding-top:12px;border-top:1px solid ${T.border};font-size:11px;line-height:1.55;color:${T.mutedSoft}">Telias instegspris exkl moms verifierat mot telia.se. ”Från”-pris = golv; exakt jämförelse mot er bransch görs när underlaget räcker.</div>
  </div>`;
}

const cards = PILOTS.map((p) => card(p.name, molnvaxelRecommendation({ invoice: { lineItems: p.lineItems, seatCount: p.seatCount, billingPeriod: 'monthly' }, categorized: { category: 'molnvaxel', normalizedSupplier: p.supplier } }))).join('');
const wrap = `<body style="margin:0;padding:24px;background:#F1F6F3;font-family:${T.sans}"><div style="max-width:640px;margin:0 auto">${cards}</div></body>`;

mkdirSync('/tmp/molnvaxel-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap);
  await page.screenshot({ path: `/tmp/molnvaxel-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px)`);
}
await browser.close();
