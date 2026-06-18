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
