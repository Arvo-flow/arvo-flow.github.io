// scripts/screenshot-molnvaxel.mjs — visuell verifiering (regel 8) av molnväxel-kortet för de tre
// pilotfakturorna (korrigerad rad-isolerad data). Trogen statisk repro av kortets markup/inline-stilar
// (samma som TestaFaktura) vid 390px & 1600px. Driver den RIKTIGA recommend-logiken för datan.
// Kör: CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-molnvaxel.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { molnvaxelRecommendation } from '../lib/molnvaxel-recommendation.js';

const L = (description, total, quantity) => ({ type: 'recurring_subscription', description, amount: total, quantity });
const PILOTS = [
  { name: 'Skåne Konsult AB', supplier: 'Telia', seatCount: 45, lineItems: [L('Telia Jobbmobil Obegränsad', 15705, 45), L('Telia Smart Connect Använd.', 5310, 45), L('Svarsgrupp / Köhantering', 297, 3)] },
  { name: 'Arvo Logistics AB', supplier: 'Telavox', seatCount: 22, lineItems: [L('Telavox Premium (PBX-Växel & 100GB Surf)', 8778, 22), L('Hårdvara: Hyra IP-telefon.', 745, 5)] },
  { name: 'Nordic Bygg & Fastighet', supplier: 'Telia', seatCount: 80, lineItems: [L('Telia Touchpoint Plus (Huvudlicens)', 19920, 80), L('Företagsabonnemang 50GB', 23920, 80), L('Administratörslicens (Touchpoint)', 998, 2)] },
];

// Trogen repro av <molnväxel-kortet> ur TestaFaktura (samma inline-stilar).
function card(name, rec) {
  const mv = rec.molnvaxel;
  const addons = (mv.addons || []).filter((a) => a.monthlyExVat != null);
  let mid;
  if (mv.bundled) {
    mid = `Priset buntar växel <strong>och</strong> mobilabonnemang (inkl. surf) — inte direkt jämförbart med en ren växellicens. Vi jämför mot ert faktiska pris i en genomgång istället för en missvisande siffra.`;
  } else if (mv.teliaFloorLabel != null) {
    mid = `Telia Smart Connect — marknadens instegsväxel — kostar <strong>från ${mv.teliaFloorLabel} kr/anv/mån</strong> (exkl moms) för motsvarande nivå.`;
    if (mv.overFloorPct != null && mv.overFloorPct >= 30) mid += ` Ni ligger <strong style="color:#1B7A6E">~${mv.overFloorPct} % över instegsgolvet</strong> — värt en offertjämförelse.`;
  } else {
    mid = `På kontaktcenter-nivå sätts pris via offert — vi jämför mot er faktiska kostnad i en genomgång.`;
  }
  return `
  <div style="font-size:12px;color:#3F4B47;margin:0 0 6px;font-weight:600">${name} — faktura</div>
  <div style="margin-top:0;padding:16px 18px;background:#F1F6F3;border:1px solid #BFD8D0;border-radius:12px;margin-bottom:22px;">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#1B7A6E;margin-bottom:8px;">Företagsväxel — ${mv.tierLabel}-nivå (verifierad referens)</div>
    <p style="margin:0;font-size:14px;line-height:1.55;color:#0E1A17;">Ni betalar <strong>${mv.perUserLabel} kr/användare/mån</strong> (exkl moms) för era ${mv.seats} användare. ${mid}</p>
    ${addons.length ? `<p style="margin:8px 0 0;font-size:12px;color:#5C6E68;">Ni betalar för ${addons.map((a) => `${a.label} (${a.monthlyExVat} kr/mån)`).join(', ')} — bekräfta att de används, annars är det ren besparing.</p>` : ''}
    <p style="margin:8px 0 0;font-size:11px;color:#8A988F;">Telias instegspris exkl moms verifierat mot telia.se. "Från"-pris = golv; exakt jämförelse mot er bransch görs när underlaget räcker.</p>
  </div>`;
}

const cards = PILOTS.map((p) => card(p.name, molnvaxelRecommendation({ invoice: { lineItems: p.lineItems, seatCount: p.seatCount, billingPeriod: 'monthly' }, categorized: { category: 'molnvaxel', normalizedSupplier: p.supplier } }))).join('');
const wrap = `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:Inter,system-ui,sans-serif;"><div style="max-width:640px;margin:0 auto;">${cards}</div></body>`;

mkdirSync('/tmp/molnvaxel-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap);
  await page.screenshot({ path: `/tmp/molnvaxel-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px)`);
}
await browser.close();
