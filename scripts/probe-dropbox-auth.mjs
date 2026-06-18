// scripts/probe-dropbox-auth.mjs — DROPBOX SOND (autentiserad): kliv förbi inloggningsväggen med en
// ÄKTA inloggad session och läs de faktiska SEK-priserna för Plus / Essentials / Standard / Advanced.
//
// Läser DROPBOX_AUTH_COOKIE (hela cookie-strängen från en inloggad dropbox.com-session) ur miljön —
// GH Actions secret ELLER lokal .env (dotenv laddas om tillgängligt). Cookie-VÄRDEN loggas ALDRIG.
// ZERO TRUST: vi extraherar bara den ÄKTA SEK-siffran sidan visar — ingen FX, ingen gissning.
// Read-only recon (rör ingen prisbok). Saknas cookie → snäll exit (workflow blir grön, ingen krasch).

try { await import('dotenv/config'); } catch { /* dotenv ej installerat (GH Actions) — env kommer ur secret */ }

const RAW = (process.env.DROPBOX_AUTH_COOKIE || '').trim();
if (!RAW) {
  console.log('[dropbox-auth] DROPBOX_AUTH_COOKIE saknas. Sätt secret (GH Actions) eller .env (lokalt) — se instruktioner. Avbryter snällt.');
  process.exit(0);
}

// Parsa "name=value; name2=value2; ..." → Playwright-cookies på .dropbox.com.
const cookies = RAW.split(';').map((s) => s.trim()).filter(Boolean).map((p) => {
  const i = p.indexOf('=');
  return i < 0 ? null : { name: p.slice(0, i).trim(), value: p.slice(i + 1).trim(), domain: '.dropbox.com', path: '/', secure: true, httpOnly: false };
}).filter((c) => c && c.name);
console.log(`[dropbox-auth] cookie laddad: ${cookies.length} cookies (total längd ${RAW.length}) — värden loggas ALDRIG`);
console.log(`[dropbox-auth] cookie-namn: ${cookies.map((c) => c.name).join(', ')}`);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const URLS = ['https://www.dropbox.com/sv_SE/plans', 'https://www.dropbox.com/sv_SE/business/pricing', 'https://www.dropbox.com/business/plans-comparison'];
const TIERS = ['Plus', 'Essentials', 'Professional', 'Standard', 'Advanced', 'Business'];

const priceHits = (t) => [...new Set((t.match(/.{0,42}\d[\d\s.,]*\s*kr\b.{0,18}/gi) || []).map((s) => s.replace(/\s+/g, ' ').trim()))].slice(0, 40);
function tierCtx(t) {
  const out = [];
  for (const x of TIERS) {
    const re = new RegExp(`.{0,5}\\b${x}\\b.{0,55}`, 'gi');
    let m, c = 0; while ((m = re.exec(t)) !== null && c < 2) { out.push(m[0].replace(/\s+/g, ' ').trim()); c++; }
  }
  return [...new Set(out)].slice(0, 12);
}

const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
const ctx = await browser.newContext({ userAgent: UA, locale: 'sv-SE', timezoneId: 'Europe/Stockholm', viewport: { width: 1366, height: 900 } });
try { await ctx.addCookies(cookies); } catch (e) { console.log('[dropbox-auth] addCookies-fel: ' + e.message.split('\n')[0]); }

for (const url of URLS) {
  const page = await ctx.newPage();
  let status = '?';
  try { const r = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 }); status = r ? r.status() : 'no-resp'; }
  catch (e) { status = 'ERR ' + e.message.split('\n')[0]; }
  try { await page.waitForFunction(() => /\d[\d\s.,]*\s*kr/i.test(document.body?.innerText || ''), { timeout: 10000 }); } catch {}
  await page.waitForTimeout(2500);
  const text = (await page.evaluate(() => document.body?.innerText || '')).replace(/\s+/g, ' ');
  const loggedIn = /logga ut|log out|mitt konto|kontomeny|account-menu|avatar/i.test(await page.content());
  const hits = priceHits(text);
  console.log(`\n#### ${url}`);
  console.log(`  status ${status} · innerText ${text.length}b · inloggad~${loggedIn} · kr-träffar ${hits.length}`);
  hits.slice(0, 30).forEach((s) => console.log(`   kr| ${s}`));
  tierCtx(text).forEach((s) => console.log(`   tier| ${s}`));
  await page.close();
}
await ctx.close(); await browser.close();
console.log('\n[dropbox-auth] klar');
