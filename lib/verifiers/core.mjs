// lib/verifiers/core.mjs — fabrikens delade verktyg.
//
// Ett verifierar-registry (lib/verifiers/registry.mjs) driver alla pris-driftvakter genom
// EN runner (scripts/verify.mjs) och EN workflow. Varje källa är en modul som exporterar en
// definition { id, category, label, needsBrowser, schedule, run() }. run() returnerar
// { checks: [{name, expected, actual, ok}], notes?: string[] } — kärnan formatterar och
// avgör grönt/rött. Att lägga till en ny verifierad källa = en modul + en registry-rad + ett test.
// INGA nya handsmidda skript eller workflows.

const UA_BROWSER = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/** Hämta text/HTML med timeout. @returns {Promise<{status:number|string, text:string}>} */
export async function fetchText(url, { timeoutMs = 20000, ua = UA_BROWSER, accept = 'text/html,*/*' } = {}) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: ac.signal, redirect: 'follow', headers: { 'User-Agent': ua, Accept: accept, 'Accept-Language': 'sv-SE,sv;q=0.9' } });
    return { status: r.status, text: await r.text() };
  } catch (e) { return { status: 'ERR ' + e.name, text: '' }; }
  finally { clearTimeout(t); }
}

/** Hämta JSON med timeout. @returns {Promise<{status:number|string, json:any}>} */
export async function fetchJson(url, { timeoutMs = 15000, ua = 'ArvoFlow-Verifier/1.0 (+https://arvoflow.se)' } = {}) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': ua, Accept: 'application/json' } });
    let json = null; try { json = await r.json(); } catch {}
    return { status: r.status, json };
  } catch (e) { return { status: 'ERR ' + e.name, json: null }; }
  finally { clearTimeout(t); }
}

/**
 * Rendera en sida i Chromium och kör fn(page) → returvärde. Playwright importeras dynamiskt
 * så att icke-browser-verifierare aldrig behöver det. Endast verifierare med needsBrowser:true.
 */
export async function withPage(url, fn, { timeoutMs = 35000, waitUntil = 'domcontentloaded', settleMs = 2500 } = {}) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ userAgent: UA_BROWSER, locale: 'sv-SE', timezoneId: 'Europe/Stockholm' });
    const page = await context.newPage();
    page.setDefaultTimeout(timeoutMs);
    let status = 'ok';
    try { const r = await page.goto(url, { waitUntil, timeout: timeoutMs }); status = r ? r.status() : 'no-response'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    // best-effort cookie-accept
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera Alla")', 'button:has-text("Acceptera")', 'button:has-text("Godkänn")', 'button:has-text("Tillåt alla")']) {
      try { await page.click(sel, { force: true, timeout: 1500 }); await page.waitForTimeout(1200); break; } catch {}
    }
    await page.waitForTimeout(settleMs);
    return await fn(page, status);
  } finally { await browser.close().catch(() => {}); }
}

/**
 * STEALTH-render: som withPage men passerar bot-skydd (Akamai m.fl.) via playwright-extra +
 * puppeteer-extra-plugin-stealth + realistisk svensk kontext + headful (HEADFUL=1 under xvfb).
 * För källor med needsStealth:true (t.ex. Adobe). playwright-extra importeras DYNAMISKT inuti funktionen
 * så att moduler/test-sviten som bara IMPORTERAR en stealth-verifierare aldrig kräver paketet installerat.
 */
export async function withStealthPage(url, fn, { timeoutMs = 45000, waitUntil = 'domcontentloaded', settleMs = 3000 } = {}) {
  const { chromium } = await import('playwright-extra');
  const stealth = (await import('puppeteer-extra-plugin-stealth')).default;
  chromium.use(stealth());
  const browser = await chromium.launch({
    headless: process.env.HEADFUL !== '1',
    args: ['--disable-blink-features=AutomationControlled', '--no-sandbox', '--disable-dev-shm-usage', '--lang=sv-SE'],
  });
  try {
    const context = await browser.newContext({
      userAgent: UA_BROWSER, locale: 'sv-SE', timezoneId: 'Europe/Stockholm',
      viewport: { width: 1366, height: 900 },
      geolocation: { latitude: 59.3293, longitude: 18.0686 }, permissions: ['geolocation'],
      extraHTTPHeaders: { 'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8' },
    });
    const page = await context.newPage();
    page.setDefaultTimeout(timeoutMs);
    let status = 'ok';
    try { const r = await page.goto(url, { waitUntil, timeout: timeoutMs }); status = r ? r.status() : 'no-response'; }
    catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
    for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Acceptera alla")', 'button:has-text("Godkänn alla")', 'button:has-text("Godkänn")']) {
      try { await page.click(sel, { force: true, timeout: 2000 }); await page.waitForTimeout(900); break; } catch {}
    }
    await page.waitForTimeout(settleMs);
    return await fn(page, status);
  } finally { await browser.close().catch(() => {}); }
}

/** Strippa HTML → flat text (för regex-extraktion). */
export function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

/** Numerisk check med tolerans. */
export function numCheck(name, expected, actual, { tol = 0, unit = '' } = {}) {
  const ok = actual != null && Math.abs(Number(actual) - Number(expected)) <= tol;
  return { name, expected: `${expected}${unit}`, actual: actual == null ? '(saknas)' : `${actual}${unit}`, ok };
}

/** Närvaro-check (en sträng/mönster ska finnas live). */
export function presenceCheck(name, present, detail = '') {
  return { name, expected: 'finns', actual: present ? 'finns' : '(saknas)', ok: !!present, detail };
}

// ── PLANPRIS UR RENDERAD TEXT (grundarfynd 2026-08-05, "Copilot-fällan" generaliserad) ──────
//
// Microsofts prissida slutade visa den rena planen och listade i stället "Business Standard OCH
// Microsoft 365 Copilot för företag" till ett HÖGRE pris — plus "EES (exkl. Teams)" till ett LÄGRE.
// Tre SKU:er, samma plannamn. En verifierare som tar första bästa tal bredvid "Standard" ankrar
// kundens rena licens mot ett paket eller en nedbantad variant. Felet går åt BÅDA håll och är
// osynligt i utfallet — priset ser rimligt ut.
//
// Läxan är inte Microsoft-specifik: varje leverantör som säljer tillägg gör samma sak förr eller
// senare. Därför bor skyddet här, i fabrikens kärna, så att VARJE ny verifierare ärver det:
// hittas en förbjuden kontextmarkör nära träffen förkastas talet. Hellre "(saknas)" än fel SKU —
// okänt är ärligt, ett fel pris är en lögn med decimaler.
export const FORBJUDEN_KONTEXT_STANDARD = /\b(copilot|bundle|add-?on|EES|exkl\.? Teams|promo|% off|save \d|first \d+ months?|trial|per month billed monthly.*then)\b/i;

/**
 * Plocka priset som hör till EN namngiven plan ur renderad text.
 *
 * @param {string} text        renderad sidtext (innerText)
 * @param {string} plan        plannamnet, t.ex. 'Business' eller 'Pro'
 * @param {object} opt
 *  - valuta   RegExp för beloppet inkl. valutatecken (default US-dollar)
 *  - fonster  hur många tecken efter plannamnet priset får ligga (default 160)
 *  - forbjud  RegExp som diskvalificerar träffen (default FORBJUDEN_KONTEXT_STANDARD)
 *  - kravOrd  RegExp som MÅSTE finnas i kontexten (t.ex. /per user|användare/) — annars null
 * @returns {{value:number|null, context:string|null, forkastade:string[]}}
 */
export function planPriceFromText(text, plan, opt = {}) {
  const {
    valuta = /(?:US\s?\$|\$|USD\s?)(\d+(?:[.,]\d{1,2})?)/,
    fonster = 160,
    forbjud = FORBJUDEN_KONTEXT_STANDARD,
    kravOrd = null,
  } = opt;
  const flat = String(text || '').replace(/\s+/g, ' ');
  // Avslutande gräns som (?!\w) i stället för \b: plannamn kan sluta på icke-ordtecken
  // ("Business+", "Pro*") — \b matchar då aldrig och verifieraren tystnar av fel skäl.
  const planRe = new RegExp(`(?<!\\w)${plan.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\w)`, 'gi');
  const forkastade = [];
  for (const m of flat.matchAll(planRe)) {
    const efter = flat.slice(m.index, m.index + fonster);
    const pris = valuta.exec(efter);
    if (!pris) continue;
    // Avgörande: den förbjudna kontexten prövas på spannet MELLAN plannamnet och priset (plus en
    // kort inledning före namnet för prefixkvalificerare som "EES"). Ett bredare fönster läcker in
    // grannplanens paketord och förkastar rena träffar — tystnad av fel skäl är också ett fel.
    const mellan = efter.slice(0, pris.index + pris[0].length);
    const inledning = flat.slice(Math.max(0, m.index - 22), m.index);
    if (forbjud && forbjud.test(inledning + mellan)) { forkastade.push((inledning + mellan).trim().slice(0, 100)); continue; }
    // kravOrd prövas DIREKT efter priset, inte i hela fönstret: annars räddas en totalsumma
    // av att ett "per user" råkar stå längre fram i texten (enhetsfel förklätt till träff).
    if (kravOrd && !kravOrd.test(efter.slice(pris.index, pris.index + pris[0].length + 40))) continue;
    const värde = Number(String(pris[1]).replace(',', '.'));
    if (!Number.isFinite(värde) || värde <= 0) continue;
    return { value: värde, context: efter.trim().slice(0, 120), forkastade };
  }
  return { value: null, context: null, forkastade };
}
