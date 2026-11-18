// tests/fakturakedjan/lagrade.mjs — de lagrade raderna genom ytorna som läser dem (FV-L, tests/fakturakedjan.mjs).
//
// En rad som koden före S1 lagrade (ett mobilbyte räknat mot det billigaste abonnemanget) läses av fyra ytor:
// rummet (api/invoice-history.mjs), avtalspåminnelsen och utfallsenkäten (hela api/cron/send-reminders.mjs)
// och månadsbriefen (lib/briefing-generator.js). Databasen och Resend är utbytta genom samma laddarkrok som
// fakturakedjan; läsningarna svarar med raden ur globalThis.__SVARA.
//
// Körs i en barnprocess: node --import ./tests/fakturakedjan/register.mjs tests/fakturakedjan/lagrade.mjs <rader.json>
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const imp = (p) => import(pathToFileURL(join(ROT, p)).href);
process.env.DATABASE_URL = 'postgres://stub.invalid/fakturakedjan';
process.env.RESEND_API_KEY = 're_stub';
delete process.env.NODE_ENV;
for (const niva of ['log', 'info', 'warn', 'error']) console[niva] = (...a) => process.stderr.write(`${a.join(' ')}\n`);

const { buildBranchAnchors, berikaRader, byggRum, delaRummet } = await imp('api/invoice-history.mjs');
const { radMotivering } = await imp('src/lib/rumstext.js');
const { default: paminnelser } = await imp('api/cron/send-reminders.mjs');
const { generateBriefingInsights } = await imp('lib/briefing-generator.js');

const dag = (n) => new Date(Date.now() + n * 864e5);
const text = (html) => String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

async function korRad(rad) {
  // Rummet
  const { prissatta } = delaRummet([{ ...rad }]);
  const a = { ...prissatta[0], _rader: rad.line_items_json };
  berikaRader([a], await buildBranchAnchors([a]));
  const rum = byggRum([a], []);

  // Påminnelsen och enkäten: hela cron-handlern
  globalThis.__MEJL = [];
  globalThis.__SVARA = (sql) => {
    if (/contract_end_date > CURRENT_DATE/.test(sql) && /contract_terms_json IS NULL/.test(sql)) return [{ ...rad }];
    if (/INTERVAL '61 days'/.test(sql)) return [{ ...rad }];
    return [];
  };
  const res = { statusCode: 0, headers: {}, body: null, setHeader(k, v) { this.headers[k] = v; }, end(s) { this.body = s; } };
  await paminnelser({ method: 'GET', headers: {}, query: {} }, res);
  const mejl = globalThis.__MEJL.map((m) => ({ amne: m.subject, text: text(m.html) }));

  // Briefen
  globalThis.__SVARA = (sql) => (/created_at\s*>=/.test(sql) && /suggested_annual_cost/.test(sql)
    ? [{ ...rad, created_at: dag(-1).toISOString() }] : []);
  const b = await generateBriefingInsights({ email: rad.user_email, periodStart: dag(-30).toISOString(), periodEnd: dag(1).toISOString() });
  globalThis.__SVARA = null;

  return {
    id: rad.id,
    rum: { score: rum.score, hasSwitchAction: rum.hasSwitchAction, totalSaving: rum.totalSaving, motivering: radMotivering(a) },
    cron: { status: res.statusCode, svar: res.body },
    mejl,
    briefing: { rubriker: (b?.insights ?? []).map((i) => `${i.headline} · ${i.subheadline}`), total: b?.totalSavingPotential ?? null },
  };
}

const rader = JSON.parse(readFileSync(process.argv[2], 'utf8')).map((r) => ({
  ...r,
  created_at: dag(-60).toISOString(), analyserad_at: dag(-60).toISOString(),
  contract_end_date: dag(40).toISOString().slice(0, 10),
}));
const ut = [];
for (const rad of rader) {
  try { ut.push(await korRad(rad)); } catch (err) { ut.push({ id: rad.id, kraschade: `${err.name}: ${err.message}` }); }
}
process.stdout.write(`LAGRADE:${JSON.stringify(ut)}\n`);
