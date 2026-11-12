// tests/fakturakedjan/kor.mjs — barnprocessen bakom instrument A (FV, tests/fakturakedjan.mjs).
//
// HELA handlern i api/test-invoice.mjs körs, ingen kopia. Bara nätverket är stubbat, genom
// laddarkroken (register.mjs): modellens svar, KV, databasen och Resend. PDF:en är en riktig PDF
// (pdfkit) vars textlager bär fakturans rader, så att textlagrets vittnen (antal, fakturanummer) läser
// samma tal som extraktionen påstår. Per fall skrivs ut:
//   · svaret (body) som handlern skickade,
//   · den lagrade raden, ihopbyggd ur de SQL-satser lagringen faktiskt skickade,
//   · rummet byggt ur den raden med rummets egna funktioner och radtexter (src/lib/rumstext.js),
//   · mejlen byggda ur samma svar med mejlbyggarnas egna funktioner,
//   · loggraderna för `[secondary-override]` och `[planvalsgrind]`.
//
// Kör: node --import ./tests/fakturakedjan/register.mjs tests/fakturakedjan/kor.mjs <fall.json>
// Utdata: EN JSON-rad på stdout efter markören FAKTURAKEDJAN:. All annan utskrift går till stderr.
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import PDFDocument from 'pdfkit';

const ROT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const imp = (p) => import(pathToFileURL(join(ROT, p)).href);

process.env.ANTHROPIC_API_KEY = 'stub';
process.env.ARVO_BYPASS_SECRET = 'fakturakedjan';
process.env.KV_REST_API_URL = 'http://kv.invalid';
process.env.KV_REST_API_TOKEN = 'stub';
process.env.DATABASE_URL = 'postgres://stub.invalid/db';
for (const k of ['RESEND_API_KEY', 'ARVO_HMAC_SECRET', 'VERCEL_GIT_COMMIT_SHA', 'POSTGRES_URL',
  'POSTGRES_PRISMA_URL', 'POSTGRES_URL_DATABASE_URL']) delete process.env[k];

// stdout är reserverad för utdataraden; varje logg går till stderr och fångas per fall.
let fangade = [];
for (const niva of ['log', 'info', 'warn', 'error']) {
  console[niva] = (...a) => {
    const rad = a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ');
    fangade.push(rad);
    process.stderr.write(`${rad}\n`);
  };
}

const { default: handler } = await imp('api/test-invoice.mjs');
const { buildBranchAnchors, berikaRader, byggRum, watchedCard, delaRummet } = await imp('api/invoice-history.mjs');
const { radMotivering, radMarke } = await imp('src/lib/rumstext.js');
const { htmlEmail, mejlLage } = await imp('api/send-analysis.mjs');
const { replyHtml, buildReplySubject, svarsKort } = await imp('api/inbound-email.mjs');
const { buildBriefingHtml } = await imp('api/activate-intelligence.mjs');
const { diagnosMening } = await imp('src/lib/diagnos.js');

/** En riktig PDF vars textlager bär fakturans rader. */
function skapaPdf(fall) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const delar = [];
    doc.on('data', (d) => delar.push(d));
    doc.on('end', () => resolve(Buffer.concat(delar)));
    doc.on('error', reject);
    const ex = fall.extraktion;
    doc.fontSize(14).text(ex.supplier);
    doc.fontSize(10).text(`Fakturadatum ${ex.date}`);
    doc.moveDown();
    doc.text('Beskrivning   Antal   À-pris   Belopp');
    for (const l of ex.lineItems) {
      doc.text(`${l.description}   ${l.quantity ?? ''}   ${l.unitPrice ?? ''}   ${l.amount}`);
    }
    doc.moveDown();
    doc.text(`Summa exkl. moms ${ex.invoiceTotal ?? ''}`);
    doc.end();
  });
}

function svarsobjekt() {
  return {
    statusCode: 200, headers: {}, body: null,
    setHeader(k, v) { this.headers[k.toLowerCase()] = v; },
    status(c) { this.statusCode = c; return this; },
    end(s) { this.body = s ?? null; },
    json(o) { this.body = JSON.stringify(o); },
    send(o) { this.body = typeof o === 'string' ? o : JSON.stringify(o); },
  };
}

const vila = () => new Promise((r) => setTimeout(r, 25));
const text = (html) => String(html ?? '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

async function korFall(fall) {
  globalThis.__FALL = fall;
  globalThis.__KV = new Map();
  globalThis.__SQL = [];
  globalThis.__RADER = new Map();
  globalThis.__MEJL = [];
  globalThis.__AI = [];
  fangade = [];

  const pdf = await skapaPdf(fall);
  const res = svarsobjekt();
  await handler({
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    socket: { remoteAddress: '127.0.0.1' },
    body: {
      pdfBase64: pdf.toString('base64'),
      industry: fall.industry ?? 'konsult',
      employees: fall.employees ?? 10,
      fingerprint: `fv-${fall.id}`,
      bypass: 'fakturakedjan',
    },
  }, res);
  // Eld-och-glöm-anrop (platsoraklet, bokföringen) får landa innan raden läses.
  for (let i = 0; i < 8; i++) await vila();

  let body = null;
  try { body = JSON.parse(res.body ?? 'null'); } catch { body = { _otolkbart: String(res.body).slice(0, 300) }; }

  const lagrade = [...globalThis.__RADER.values()];
  const rad = lagrade[lagrade.length - 1] ?? null;

  // Rummet: handlerns egen uppdelning (delaRummet) och sedan berikaRader, som api/invoice-history.mjs.
  let rum = null;
  if (rad) {
    const { triagerade, prissatta } = delaRummet([{ ...rad }]);
    if (triagerade.length + prissatta.length !== 1) throw new Error('raden hamnade i båda eller ingen av rummets listor');
    if (triagerade.length) {
      const kort = watchedCard(triagerade[0]);
      rum = { bevakad: true, kort, rum: byggRum([], [kort]), rader: [] };
    } else {
      const a = { ...prissatta[0], _rader: rad.line_items_json ?? null };
      const ankare = await buildBranchAnchors([a]);
      berikaRader([a], ankare);
      rum = {
        bevakad: false,
        rum: byggRum([a], []),
        rader: [{
          lage: a.lage ?? null,
          arvoScore: a.arvoScore ?? null,
          ovissNiva: a.prisunderlag?.ovissNiva ?? null,
          harUnderlag: a.prisunderlag != null,
          bytetUndanhallet: a.bytetUndanhallet ?? null,
          should_switch: a.should_switch ?? null,
          gross_saving: a.gross_saving ?? null,
          motivering: radMotivering(a),
          marke: radMarke(a),
        }],
      };
    }
  }

  // Mejlen ur samma svar, med mejlbyggarnas egna funktioner.
  let mejl = null;
  if (body?.ok && body?.extracted && body?.recommendation) {
    // Kortet i svarsmejlet byggs av handlerns egen funktion (api/inbound-email.mjs svarsKort).
    const kort = svarsKort(body, 'faktura.pdf');
    const rek = body.recommendation;
    mejl = {
      analys: text(htmlEmail(body)),
      analysLage: mejlLage(body),
      svarAmne: buildReplySubject([kort]),
      svar: text(replyHtml({ results: [kort], portalLink: 'https://arvoflow.se/portfolio' })),
      // Aktiveringsmejlet byggs av endpointens egen funktion, med de fält klienten skickar
      // (src/pages/TestaFaktura/index.js handleActivate: poängen och etiketten ur `lage`, meningen ur
      // diagnosMening). Klientens hårdvarujustering speglas inte; ingen mobilfaktura bär en.
      aktivering: text(buildBriefingHtml({
        supplier: body.extracted.supplier, annualCost: body.extracted.annualCost,
        suggestedAnnualCost: rek.suggestedAnnualCost, netSaving: rek.netSaving, arvoFee: rek.arvoFee,
        reasoning: rek.reasoning, diagScore: body.lage?.score ?? null, diagLabel: body.lage?.etikett ?? null,
        diagInsight: diagnosMening(body.lage, { harByte: !!body.lage?.harByte }),
      })),
    };
  }

  const r = body?.recommendation ?? {};
  return {
    id: fall.id,
    status: res.statusCode,
    ok: body?.ok ?? null,
    route: body?.route ?? null,
    fel: body?.error ?? body?._otolkbart ?? null,
    kategori: body?.categorized?.category ?? null,
    rek: {
      shouldSwitch: r.shouldSwitch ?? null,
      savingPerYear: r.savingPerYear ?? null,
      grossSaving: r.grossSaving ?? null,
      netSaving: r.netSaving ?? null,
      suggestedAnnualCost: r.suggestedAnnualCost ?? null,
      suggestedSupplier: r.suggestedSupplier ?? null,
      recommendationType: r.recommendationType ?? null,
      planvalsgrind: r.planvalsgrind ?? null,
      reasoning: r.reasoning ?? null,
      healthScore: r.healthScore ?? null,
    },
    sekundar: body?.secondarySaving ?? body?.recommendation?.secondarySaving ?? null,
    berakningsunderlag: body?.calculationChain ?? null,
    fynd: body?.leadFinding ? { typ: body.leadFinding.type ?? null, titel: body.leadFinding.title ?? null,
      text: body.leadFinding.text ?? null, skal: body.leadFinding.fyndSkal ?? null,
      belopp: body.leadFinding.annualImpact ?? body.leadFinding.amount ?? null } : null,
    lage: body?.lage ?? null,
    rad: rad && {
      route: rad.route, category: rad.category, should_switch: rad.should_switch,
      gross_saving: rad.gross_saving, net_saving: rad.net_saving,
      suggested_annual_cost: rad.suggested_annual_cost, health_score: rad.health_score ?? null,
      annual_cost: rad.annual_cost, triage_reason: rad.triage_reason ?? null,
    },
    rum,
    mejl,
    loggar: fangade.filter((l) => /\[(secondary-override|planvalsgrind|guard:finansiell)\]/.test(l)),
    ai: globalThis.__AI.map((x) => x.verktyg ?? `text:${x.max_tokens}`),
    // Renderingssonden (scripts/screenshot-planvalsgrind.mjs) visar handlerns hela svar i fakturavyn.
    ...(process.env.FAKTURAKEDJAN_SVAR === '1' ? { svar: body } : {}),
  };
}

const fallen = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const ut = [];
for (const fall of fallen) {
  try {
    ut.push(await korFall(fall));
  } catch (err) {
    ut.push({ id: fall.id, kraschade: `${err.name}: ${err.message}`, stack: String(err.stack).split('\n').slice(0, 4) });
  }
}
process.stdout.write(`FAKTURAKEDJAN:${JSON.stringify(ut)}\n`);
