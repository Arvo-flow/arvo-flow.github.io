// scripts/screenshot-loneadmin.mjs — visuell verifiering (regel 8) av löneadmin-kortet (AdvisoryCard)
// över dess tre tillstånd: över golvet (warn), redan Fortnox (neutral), i nivå (ok). Trogen repro av
// AdvisoryCard-markupen i TestaFaktura/styles.js med theme-tokens inlinade. Driver RIKTIGA recommend-logiken.
//   CHROME_BIN=/opt/pw-browsers/chromium-1194/chrome-linux/chrome node scripts/screenshot-loneadmin.mjs
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { loneadminRecommendation } from '../lib/loneadmin-rightsizing.js';

const fmtKr = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);
const L = (description, total, quantity) => ({ type: 'recurring_subscription', description, amount: total, quantity });
const CASES = [
  { name: 'Konsult AB (Visma Lön, 20 anst)', supplier: null, seatCount: 20, lineItems: [L('Visma Lön lönekörning', 1200, 20), L('Lönebesked Kivra-utskick', 100, 20)] },
  { name: 'Bygg & Co (redan Fortnox, 20 anst)', supplier: 'Fortnox', seatCount: 20, lineItems: [L('Fortnox Lön', 700, 20)] },
  { name: 'Handel AB (Hogia, i nivå, 20 anst)', supplier: null, seatCount: 20, lineItems: [L('Hogia Lön', 600, 20)] },
];

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
  const map = { warn: [T.warning, T.warningSoft], ok: [T.success, T.successSoft], neutral: [T.muted, T.surfaceAlt] };
  const [c, bg] = map[cls];
  return `<span style="display:inline-flex;align-items:center;margin-top:16px;padding:6px 12px;border-radius:${T.radiusPill};font-size:12px;font-weight:600;color:${c};background:${bg}">${text}</span>`;
}

function card(name, rec) {
  const la = rec.loneadminRightsizing;
  if (!la) return `<div style="margin-bottom:22px;color:${T.muted}">${name}: offert-läge (ingen siffra)</div>`;
  const over = la.aboveFloor && la.overFloorPct != null && la.overFloorPct >= 15;
  const scaleMax = Math.max(la.perEmployeeMonthly || 0, la.floorPerEmployee || 0) || 1;
  const youW = Math.max(6, Math.round(((la.perEmployeeMonthly || 0) / scaleMax) * 100));
  const floorW = Math.max(6, Math.round(((la.floorPerEmployee || 0) / scaleMax) * 100));

  const signal = la.alreadyFortnox ? pill('neutral', 'Redan på Fortnox Löns verifierade nivå')
    : over ? pill('warn', `~${la.overFloorPct} % över Fortnox-golvet`) : pill('ok', 'I nivå med Fortnox-golvet');
  const prose = la.alreadyFortnox ? 'Ni ligger redan på Fortnox Löns verifierade nivå — vi bevakar att det förblir så.'
    : la.aboveFloor ? `<strong>${la.fortnoxProduct}</strong> — verifierat lägst — kostar 199 kr/mån + 25 kr/anställd. Ryms er lönehantering (kollektivavtal, integrationer) där? Bekräfta så realiserar vi upp till <strong>${fmtKr(la.annualSaving)} kr/år</strong>.`
    : 'Ni ligger i nivå med Fortnox Löns verifierade golv — ni ligger rätt, vi bevakar.';
  const addon = la.hasPayslip ? `<p style="margin:12px 0 0;font-size:12.5px;line-height:1.55;color:${T.muted}">Lönebesked-/utskicksavgifter (Kivra) är rörliga och ingår inte i golvjämförelsen.</p>` : '';

  return `
  <div style="font-size:12px;color:${T.muted};margin:0 0 8px;font-weight:600">${name}</div>
  <div style="position:relative;margin:0 0 28px;padding:22px 24px 18px;background:${T.surface};border:1px solid ${T.border};border-radius:${T.radiusLg};box-shadow:${T.shadowSm};overflow:hidden">
    <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${T.brandGradient}"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px">
      <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.09em;color:${T.brand}">Löneadministration · per anställd</span>
      <span style="display:inline-flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${T.brand};background:${T.brandSoft};border-radius:${T.radiusPill};padding:3px 9px"><span style="width:5px;height:5px;border-radius:50%;background:${T.brand};display:inline-block"></span>Verifierad referens</span>
    </div>
    <div style="font-family:${T.mono};font-size:40px;font-weight:600;line-height:1;letter-spacing:-0.02em;color:${T.ink}">${la.perEmployeeLabel} kr<span style="display:block;margin-top:6px;font-family:${T.sans};font-size:12px;font-weight:500;letter-spacing:0;color:${T.muted}">per anställd/mån · exkl moms · ${la.headcount} anställda</span></div>
    <div style="margin-top:18px;display:flex;flex-direction:column;gap:10px">
      ${bar('you', 'Ni betalar', youW, `${la.perEmployeeLabel} kr`, over)}
      ${bar('floor', 'Fortnox-golv', floorW, `${la.floorPerEmployeeLabel} kr`, false)}
    </div>
    ${signal}
    <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:${T.inkSoft}">${prose}</p>
    ${addon}
    <div style="margin-top:16px;padding-top:12px;border-top:1px solid ${T.border};font-size:11px;line-height:1.55;color:${T.mutedSoft}">Fortnox Löns listpris exkl moms verifierat mot fortnox.se. Golvet är ett fast pris; exakt utfall beror på om behovet ryms i Fortnox Lön.</div>
  </div>`;
}

const cards = CASES.map((c) => card(c.name, loneadminRecommendation({ invoice: { lineItems: c.lineItems, seatCount: c.seatCount, billingPeriod: 'monthly' }, categorized: { category: 'loneadmin', normalizedSupplier: c.supplier } }))).join('');
const wrap = `<body style="margin:0;padding:24px;background:#F1F6F3;font-family:${T.sans}"><div style="max-width:640px;margin:0 auto">${cards}</div></body>`;

mkdirSync('/tmp/loneadmin-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(wrap);
  await page.screenshot({ path: `/tmp/loneadmin-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px)`);
}
await browser.close();
