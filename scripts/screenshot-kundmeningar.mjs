#!/usr/bin/env node
// scripts/screenshot-kundmeningar.mjs — REGEL 8 för kundmeningsregistret (2026-09-23).
//
// Byggt paket i Chromium + de riktiga mejlbyggarna, 390 och 1600 px. Varje kontroll läser vad kunden
// SER, och varje förbjuden mening har ett motprov: den sanna meningen som ska stå där i stället.
//   1. bytesmodalen: inget låtsas-BankID, inget «aktiverat»; ber om ett förberett byte; mottagen-läget
//   2. valutan: en USD-faktura redovisar omräkningen
//   3. /intelligence: citaten märkta Exempel, ingen nätverksmening
//   4. /connect: inget raderingslöfte
//   5. /aktivera?savings=: talet ur URL:en visas inte
//   6. mejlen: bytesbekräftelsen, offertsvaret, månadsbriefen — renderade och fotograferade
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname } from 'node:path';

process.env.RESEND_API_KEY ??= 're_test_sond';
const { ANSVARSGRANS, UNDERLAGET, LOFTEN } = await import('../lib/kundmeningar.js');
const { fakturaLage } = await import('../lib/lagesregister.js');
const { buildHtml: bekraftelse } = await import('../api/send-confirmation.mjs');
const { buildCustomerEmail: offert } = await import('../api/quote-request.mjs');
const { buildHookEmail: brief } = await import('../api/cron/generate-briefings.mjs');

const ROT = new URL('..', import.meta.url).pathname;
const BUILD = join(ROT, 'build');
const UT = join(ROT, 'results/screenshots/kundmeningar');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.map': 'application/json' };
const server = createServer(async (req, res) => {
  const bana = decodeURIComponent(req.url.split('?')[0]).replace(/^\/flow/, '') || '/';
  const fil = join(BUILD, bana);
  try {
    if (bana !== '/' && existsSync(fil) && extname(fil)) { res.writeHead(200, { 'Content-Type': MIME[extname(fil)] ?? 'application/octet-stream' }); return res.end(await readFile(fil)); }
    res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(await readFile(join(BUILD, 'index.html')));
  } catch (e) { res.writeHead(500); res.end(String(e.message)); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const bas = `http://127.0.0.1:${server.address().port}/flow`;
await mkdir(UT, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_BIN || undefined });
const fel = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };
const ok = (m) => console.log(`✓ ${m}`);
const text = async (p) => (await p.innerText('body')).replace(/\s+/g, ' ');

// Läget räknas med produktionsfunktionen — en handskriven `lage` kan bära en kombination API:t aldrig skickar.
const medLage = (svar) => ({ ...svar, lage: fakturaLage(svar) });
const byteSvar = (valuta = 'SEK') => medLage({
  ok: true, route: 'auto',
  extracted: { supplier: 'Telia Sverige AB', amount: 4000, annualCost: 48000, recurringAmount: 4000, billingPeriod: 'monthly', recurring: true,
    confidenceScore: 0.95, notes: [], roamingZone: null, originalCurrency: valuta, fxRate: valuta === 'SEK' ? null : 10.52, fxSource: 'riksbanken', fxDate: '2026-09-22',
    lineItems: [{ type: 'recurring_subscription', description: 'Mobil 12 st', quantity: 12, unitPrice: 333, amount: 4000 }] },
  categorized: { category: 'mobil', normalizedSupplier: 'Telia', confidence: 0.95, reasoning: 'Mobilabonnemang' },
  recommendation: { recommendationType: 'switch', shouldSwitch: true, suggestedSupplier: 'Tele2', suggestedAnnualCost: 36000,
    grossSaving: 12000, arvoFee: 2400, netSaving: 9600, reasoning: 'Tele2 har ett lägre publicerat listpris för samma abonnemang.', switchSteps: [] },
});

async function sida(bredd, faktura) {
  const p = await browser.newPage({ viewport: { width: bredd, height: 1100 } });
  await p.route('**/api/**', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"token":"stub"}' }));
  if (faktura) await p.route('**/api/test-invoice', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(faktura) }));
  // Grinden (registrering efter första besparingen) prövas inte här — den täcker kortet vi ska se.
  await p.addInitScript(() => { try { localStorage.setItem('arvo_gate_passed', '1'); } catch {} });
  p.on('pageerror', (e) => fel(`sidfel: ${String(e).slice(0, 160)}`));
  return p;
}
async function ladda(p) {
  await p.goto(`${bas}/testa-faktura`, { waitUntil: 'networkidle' });
  await p.$('input[type=file]').then((i) => i.setInputFiles({ name: 'f.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4 sond') }));
  await p.waitForTimeout(400);
  const k = p.getByRole('button', { name: /Analysera fakturan/ });
  if (await k.count()) await k.first().click({ force: true });
  await p.waitForTimeout(2500);
}

for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  // 1 · bytesmodalen
  let p = await sida(bredd, byteSvar());
  await ladda(p);
  // Kortet ovanför knappen (SwitchCard): strikt förberedande — inget «Arvo tar det därifrån».
  let t0 = await text(p);
  if (/tar det därifrån|Fullmakt och bytesplan|identifierade besparingen|förbereder (hela )?bytet/.test(t0)) fel(`1. ${namn}: bytkortet lovar fortfarande att Arvo agerar`);
  else if (!t0.includes(ANSVARSGRANS.niAgerar)) fel(`1. ${namn}: bytkortet säger inte att kunden byter själv`);
  else ok(`1. ${namn}: bytkortet är strikt förberedande`);
  // 10 · Intelligence-kortet på samma sida: inget inkorgslöfte utan mekanism, inget kohortexempel.
  if (/söker igenom er inkorg|samma kohort|\d+ av \d+ bolag/.test(t0)) fel(`10. ${namn}: inkorgslöfte eller kohortexempel står kvar`);
  else if (!t0.includes(LOFTEN.vidarebefordran.text)) fel(`10. ${namn}: vidarebefordringsdörren saknas under knappen`);
  else ok(`10. ${namn}: Intelligence-kortet lovar bara det som finns`);
  await p.screenshot({ path: join(UT, `bytkort-${namn}.png`), fullPage: true });
  const cta = p.getByRole('button', { name: new RegExp(UNDERLAGET.cta) });
  if (!(await cta.count())) fel(`1. ${namn}: knappen «${UNDERLAGET.cta}» syns inte`);
  else {
    await cta.first().click();
    await p.waitForTimeout(500);
    let t = await text(p);
    if (/BankID/i.test(t.replace(/signerar med BankID|med BankID/gi, '')) || /Signera med BankID|är aktiverat|Allt är förberett/.test(t)) fel(`1. ${namn}: modalen lovar fortfarande BankID/aktivering`);
    else if (!t.includes(ANSVARSGRANS.inteOmbud)) fel(`1. ${namn}: modalen bär inte ansvarsgränsen`);
    else ok(`1. ${namn}: modalen beställer ett underlag och bär ansvarsgränsen`);
    await p.screenshot({ path: join(UT, `bytesmodal-${namn}.png`), fullPage: false });
    const inp = await p.$('.modal-form input[type=email]');
    if (inp) { await inp.fill('sond@example.se'); await p.getByRole('button', { name: new RegExp(UNDERLAGET.skicka) }).first().click(); await p.waitForTimeout(800);
      t = await text(p);
      t.includes(UNDERLAGET.mottagen) ? ok(`1. ${namn}: mottagen-läget är sant`) : fel(`1. ${namn}: mottagen-läget saknas: «${t.slice(0, 120)}»`);
      await p.screenshot({ path: join(UT, `bytesmodal-mottagen-${namn}.png`), fullPage: false }); }
  }
  await p.close();

  // 1b · uppladdningen bär den signerade sessionen, aldrig en uppgiven adress (RN-07)
  p = await sida(bredd, byteSvar());
  await p.addInitScript(() => { try { localStorage.setItem('arvo_user_email', 'offer@example.se'); localStorage.setItem('arvo_session', 'sess.sig'); } catch {} });
  let skickat = null;
  await p.route('**/api/test-invoice', (r) => { skickat = JSON.parse(r.request().postData() || '{}');
    r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(byteSvar()) }); });
  await ladda(p);
  if (!skickat) fel(`1b. ${namn}: uppladdningen nådde aldrig /api/test-invoice`);
  else if ('userEmail' in skickat) fel(`1b. ${namn}: webbläsaren skickar en adress (${skickat.userEmail})`);
  else if (skickat.session !== 'sess.sig') fel(`1b. ${namn}: sessionen skickas inte (${skickat.session})`);
  else ok(`1b. ${namn}: uppladdningen bär sessionen, ingen adress`);
  await p.close();

  // 2 · valutan
  p = await sida(bredd, byteSvar('USD'));
  await ladda(p);
  const t2 = await text(p);
  /Fakturan är i USD\. Beloppen är omräknade till SEK med 10\.52 SEK\/USD/.test(t2) ? ok(`2. ${namn}: USD-omräkningen redovisas`) : fel(`2. ${namn}: USD-omräkningen syns inte`);
  await p.close();

  // 3–5 · sidorna
  for (const [vag, forbjudet, kravs, etikett] of [
    ['/intelligence', /8 av 14 bolag|jämförbara bolag i nätverket|mot känt avtalspris/, /Exempel ·/, '3. /intelligence'],
    ['/connect', /raderar Fortnox-kopplingen|redan optimerat/, /Kopplingen tar du bort när du vill/, '4. /connect'],
    ['/aktivera?savings=99999&supplier=Telia', /99\s?999|identifierade redan/, /./, '5. /aktivera'],
    // Andra blicken 2026-09-24: Nivå 1 lovade «Arvo genomför bytet (BankID)» — rälsen är mode:stub.
    ['/bias', /genomför bytet|BankID|förbereder bytet/, /Arvo tar fram underlaget, ni byter själva/, '7. /bias'],
    ['/', /godkänner varje byte med BankID|signerat av er med BankID|BankID-signatur|godkänner med BankID|förberett i sin helhet/, /Uppsägning och nyteckning gör ni själva, direkt med leverantörerna/, '8. /'],
  ]) {
    p = await sida(bredd);
    await p.goto(`${bas}${vag}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(600);
    const t = await text(p);
    if (forbjudet.test(t)) fel(`${etikett} ${namn}: förbjuden mening står kvar`);
    else if (!kravs.test(t)) fel(`${etikett} ${namn}: den sanna meningen saknas`);
    else ok(`${etikett} ${namn}: rätt`);
    await p.screenshot({ path: join(UT, `${vag.split('?')[0].slice(1)}-${namn}.png`), fullPage: true });
    await p.close();
  }
}

// 9 · diagnosraden (DM): avstånd till verifierat listpris, aldrig «branschsnittet», aldrig beröm av överbetalning.
//   Med byte står raden i fakturavyn. Utan byte ritas inget diagnoskort (mätt: bara monitoring och
//   byte-med-nettobesparing) — men meningen och etiketten går till AKTIVERINGSMEJLET från varje rutt,
//   så där prövas den: sonden fångar sidans anrop och renderar mejlet med produktionsbyggaren.
const { buildBriefingHtml } = await import('../api/activate-intelligence.mjs');
const utanByte = medLage({ ...byteSvar(), recommendation: { recommendationType: 'no_action', shouldSwitch: false, suggestedSupplier: null,
  suggestedAnnualCost: 43200, grossSaving: 0, arvoFee: 0, netSaving: 0, reasoning: 'Tele2 har ett abonnemang som ligger lägre i pris.', switchSteps: [] } });
for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
  let p = await sida(bredd, byteSvar());
  await ladda(p);
  let t = await text(p);
  if (/branschsnitt|branschpris|marknadsmässigt avtal/.test(t)) fel(`9. ${namn} med byte: förbjuden mening står kvar`);
  else if (!/Ni betalar 33 % över verifierat publikt listpris\. Ett lägre verifierat pris finns att hämta\./.test(t)) fel(`9. ${namn} med byte: diagnosraden saknas`);
  else ok(`9. ${namn} med byte: diagnosraden mäter mot listpris`);
  await p.screenshot({ path: join(UT, `diagnos-med-byte-${namn}.png`), fullPage: false });
  await p.close();

  p = await sida(bredd, utanByte);
  let aktivering = null;
  await p.route('**/api/activate-intelligence', (r) => { aktivering = JSON.parse(r.request().postData() || '{}');
    r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }); });
  await ladda(p);
  const knapp = p.getByRole('button', { name: /Aktivera Arvo Intelligence/ });
  if (await knapp.count()) {
    await knapp.first().click(); await p.waitForTimeout(500);
    const inp = await p.$('.ac-email-input');
    if (inp) { await inp.fill('sond@example.se'); await inp.press('Enter'); await p.waitForTimeout(800); }
  }
  if (!aktivering) fel(`9. ${namn} utan byte: aktiveringen nådde aldrig /api/activate-intelligence — grenen prövades inte`);
  else {
    const mejl = buildBriefingHtml(aktivering).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
    if (/branschsnitt|marknadsmässigt avtal|Optimalt/.test(mejl)) fel(`9. ${namn} utan byte: aktiveringsmejlet berömmer en överbetalning`);
    else if (!/Ni betalar 11 % över verifierat publikt listpris\. Vi föreslår inget byte i dag\./.test(mejl)) fel(`9. ${namn} utan byte: mejlets diagnosrad saknas («${String(aktivering.diagInsight).slice(0, 90)}»)`);
    else ok(`9. ${namn} utan byte: aktiveringsmejlet säger 11 % över listpris, etikett ${aktivering.diagLabel}`);
  }
  await p.close();
}

// 6 · mejlen — de riktiga byggarna
const mejl = {
  bekraftelse: bekraftelse(byteSvar()),
  offert: offert({ contactName: 'Anna', supplier: 'Canon', annualCost: 42000, variableCharges: 900 }),
  brief: brief({ insightCount: 2, totalSaving: 9600, period: 'oktober 2026', briefingUrl: 'https://arvoflow.se/briefing/x' }),
  'brief-utan-tal': brief({ insightCount: 1, totalSaving: 0, period: 'oktober 2026', briefingUrl: 'https://arvoflow.se/briefing/x' }),
};
for (const [n, html] of Object.entries(mejl)) {
  const t = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const forbjudet = /igångsatt|skickar uppsägning|sköter (hela|allt)|förhandl|20 % av realiserad|i era böcker|identifierat|avviker från marknadsnivå|bytesbegäran|ångerrätt|ångerfrist|påbörjar/i;
  // «0 kr/år» som hjältetal — talen PARSAS; en första version matchade «0 kr/år» inuti «9 600 kr/år».
  const nollor = [...t.matchAll(/(\d[\d\s\u00a0]*) kr\/år/g)].filter((m) => Number(m[1].replace(/\D/g, '')) === 0);
  if (forbjudet.test(t)) fel(`6. mejl ${n}: förbjuden mening: «${t.match(forbjudet)[0]}»`);
  else if (nollor.length) fel(`6. mejl ${n}: «0 kr/år» visas`);
  else ok(`6. mejl ${n}: inga förbjudna meningar, inget nolltal`);
  await writeFile(join(UT, `mejl-${n}.html`), html);
  for (const [bredd, namn] of [[390, 'mobil'], [1600, 'desktop']]) {
    const p = await browser.newPage({ viewport: { width: bredd, height: 1000 } });
    await p.setContent(html, { waitUntil: 'load' });
    await p.screenshot({ path: join(UT, `mejl-${n}-${namn}.png`), fullPage: true });
    await p.close();
  }
}
if (!mejl.bekraftelse.includes(ANSVARSGRANS.inteOmbud) || !mejl.bekraftelse.includes(ANSVARSGRANS.niAgerar)) fel('6. bekräftelsen bär inte ansvarsgränsen');
if (!/tre månader efter att det nya avtalet aktiverats/.test(mejl.bekraftelse)) fel('6. bekräftelsens arvode följer inte villkoren §3.2');

await browser.close(); server.close();
