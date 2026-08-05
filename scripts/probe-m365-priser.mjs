// scripts/probe-m365-priser.mjs — SOND: vad säger Microsofts svenska prissidor NU?
//
// Bakgrund (2026-08-05): verifierar-fabriken larmade att Business Basic drivit 57,40 → 66,91 kr
// medan Standard och Premium gav "(saknas)". Första sonden avslöjade varför: översiktssidan visar
// inte längre rena Standard/Premium — bara "Business Standard OCH Microsoft 365 Copilot för
// företag" (224,63 kr) respektive Premium+Copilot (305,87 kr). Att verifieraren sa "saknas" var
// maskinen som SKYDDADE oss: hade den tagit 224,63 som Standard hade vi jämfört kundens rena
// licens mot ett Copilot-paket — precis den like-for-like-lögn bibeln förbjuder.
//
// Den här sonden hämtar därför PER-PLAN-sidorna (kanoniska källan, samma URL:er som prisboken
// anger) och dumpar varje kr-belopp med kontext, så att prisboken kan uppdateras mot vad Microsoft
// FAKTISKT skriver om VARJE plan för sig. Okänt får aldrig bli ett kundsynligt pris.
import { fetchText, stripHtml } from '../lib/verifiers/core.mjs';

const SIDOR = [
  ['översikt', 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-plans-and-pricing'],
  ['basic', 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic'],
  ['standard', 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard'],
  ['premium', 'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium'],
  ['enterprise', 'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing'],
];

for (const [namn, url] of SIDOR) {
  console.log(`\n════════ ${namn.toUpperCase()} ════════\n${url}`);
  const { status, text } = await fetchText(url, { timeoutMs: 25000 });
  console.log('HTTP', status, '· html-längd', text.length);
  if (status !== 200) continue;

  const flat = stripHtml(text);
  const prisRe = /(.{0,110}?)(\d[\d ]*[.,]\d{2})\s*kr([\s\S]{0,60})/g;
  const sedda = new Set();
  for (const m of flat.matchAll(prisRe)) {
    const fore = m[1].replace(/\s+/g, ' ').trim();
    const efter = m[3].replace(/\s+/g, ' ').trim();
    const rad = `${m[2].padStart(7)} kr | ${fore} ⟦PRIS⟧ ${efter}`;
    if (sedda.has(rad)) continue;
    sedda.add(rad);
    // Markera Copilot-paket tydligt — de får ALDRIG förväxlas med den rena planen.
    const bundle = /copilot/i.test(fore) || /copilot/i.test(efter) ? '  ⚠️ COPILOT-PAKET' : '';
    console.log('  ' + rad + bundle);
    if (sedda.size >= 25) break;
  }
  if (sedda.size === 0) console.log('  (inga kr-belopp i serverrenderad HTML — priset kräver rendering)');
}
