// scripts/screenshot-dropbox-card.mjs — visuell verifiering (regel 8) av Dropbox-korselden
// (arkitektonisk substitutionsinsikt). Trogen statisk repro vid 390px & 1600px. Endast QA.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const card = `
<div style="margin-bottom:20px;padding:18px 22px;background:#0E1A17;border-radius:20px;border:1.5px solid #1B7A6E;">
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
    <span style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#5DD6CA;">Arkitektonisk insikt</span>
    <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#0E1A17;background:#5DD6CA;border-radius:4px;padding:2px 6px;">Dropbox · USD</span>
  </div>
  <p style="margin:0;font-size:15px;line-height:1.55;color:#F1F6F3;font-weight:600;">Ni betalar för molnlagring (Dropbox) i amerikanska dollar — rörliga växelkurser och dolda bankavgifter (valutapåslag) ovanpå listpriset.</p>
  <p style="margin:10px 0 0;font-size:14px;line-height:1.55;color:#C7D6D0;">Fildelning och lagring (OneDrive + SharePoint) ingår i Microsoft 365 Business Basic och uppåt. Har ni redan M365 betalar ni Dropbox för lagring ni redan äger.</p>
  <p style="margin:12px 0 0;padding-top:12px;border-top:1px solid #2A3A35;font-size:12px;line-height:1.5;color:#8FA39C;">Vi visar ingen påhittad kronbesparing — molnlagring prissätts i USD och vi FX-konverterar aldrig. Substitutionen bekräftas i en kort genomgång av ert M365-paket.</p>
</div>`;

const wrap = (inner) => `<body style="margin:0;padding:24px;background:#E9F0EC;font-family:Inter,system-ui,sans-serif;"><div style="max-width:640px;margin:0 auto;">${inner}</div></body>`;
mkdirSync('/tmp/dropbox-card-shots', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
for (const [w, tag] of [[390, 'mobil'], [1600, 'desktop']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 600 } });
  await page.setContent(wrap(card));
  await page.screenshot({ path: `/tmp/dropbox-card-shots/${tag}.png`, fullPage: true });
  console.log(`✓ ${tag} (${w}px) → /tmp/dropbox-card-shots/${tag}.png`);
}
await browser.close();
