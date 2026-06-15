// scripts/screenshot-shelfware.mjs — visuell verifiering (regel 8) av licensrevisions-kortet.
// Trogen statisk repro av kortets markup/inline-stilar (samma som TestaFaktura) i båda
// lägena (review + bekräftat) vid mobil 390px och desktop 1600px. Endast QA, ingen prod.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const card = (inner) => `
<div style="font-family: Inter, system-ui, sans-serif; max-width: 720px; margin: 0 auto;">
<div style="display:grid; grid-template-columns: 1fr 1fr; gap: 16px; background:#fff; padding:18px; border-radius:16px;">
${inner}
</div></div>`;

const head = (t) => `<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#1B7A6E;margin-bottom:8px;">${t}</div>`;
const cardStyle = 'grid-column:1 / -1;margin-top:14px;padding:16px 18px;background:#F1F6F3;border:1px solid #BFD8D0;border-radius:12px;';

const review = `<div style="${cardStyle}">
  ${head('Licensrevision — vi behöver er bekräftelse')}
  <p style="margin:0;font-size:14px;line-height:1.55;color:#0E1A17;">Vi noterar att ni har 100 anställda men betalar för 120 licenser. Används de överskjutande 20 licenserna till andra ändamål (mötesrum, inhyrd personal, servicekonton), eller kan vi klassificera dem som outnyttjat svinn?</p>
  <p style="margin:8px 0 0;font-size:12px;color:#5C6E68;">Om de står oanvända motsvarar det upp till 28 675 kr/år. Vi räknar ingen besparing förrän ni bekräftat — siffror utan källa visar vi aldrig.</p>
  <form style="display:flex;gap:8px;align-items:center;margin-top:12px;flex-wrap:wrap;">
    <label style="font-size:13px;color:#0E1A17;">Hur många av de 20 används till annat?</label>
    <input type="number" value="" placeholder="0" style="width:72px;padding:7px 9px;font-size:14px;border:1px solid #BFD8D0;border-radius:8px;background:#fff;" />
    <button style="padding:8px 16px;font-size:13px;font-weight:600;color:#fff;background:#1B7A6E;border:none;border-radius:8px;cursor:pointer;">Bekräfta</button>
  </form>
</div>`;

const confirmed = `<div style="${cardStyle}">
  ${head('Licensrevision — bekräftat')}
  <p style="margin:0;font-size:14px;line-height:1.55;color:#0E1A17;"><strong>12 bekräftat oanvända platser</strong> à 119.48 kr/plats/mån = <strong style="color:#1B7A6E;">17 205 kr/år</strong> i verifierat svinn att avveckla.</p>
</div>`;

mkdirSync('/tmp/shelfware-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 700 } });
  await page.setContent(`<body style="margin:0;padding:24px;background:#E9F0EC;">${card(review + confirmed)}</body>`);
  await page.screenshot({ path: `/tmp/shelfware-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/shelfware-shots/${tag}.png`);
}
await browser.close();
