// api/test-invoice.mjs
// Vercel Serverless Function — kör hela pipelinen extract → categorize → recommend.
// Frontend POSTar JSON { pdfBase64, industry, employees, revenue? }.
//
// Vercel-konfig (vercel.json): maxDuration: 60. På Hobby-plan är gränsen 10s
// vilket sannolikt inte räcker — Pro krävs för publik exponering.

import { Resend } from 'resend';
import { extractInvoice, routeExtraction, ExtractorError } from '../agents/test-invoice/extract.js';
import { categorize, CategorizerError } from '../agents/categorizer/categorize.js';
import { recommend, RecommenderError } from '../agents/recommender/recommend.js';
import { storeDatapoint } from '../lib/benchmark.js';
import { BRANCHINDEX } from '../agents/recommender/branchindex.js';

const FROM_ALERT = process.env.RESEND_FROM        ?? 'Arvo Flow <analys@arvo-flow.se>';
const ALERT_TO   = process.env.ARVO_ALERT_EMAIL   ?? 'team@arvo-flow.se';

// ── Internt larm för review_queue ─────────────────────────────────────────────

function buildAlertHtml(extracted, reason) {
  const pct   = extracted.confidenceScore != null
    ? `${Math.round(extracted.confidenceScore * 100)} %` : '–';
  const total = extracted.amount != null
    ? extracted.amount.toLocaleString('sv-SE') + ' kr' : '–';
  const ts    = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });

  const rows = (extracted.lineItems ?? []).map((l) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;font-family:Arial,sans-serif">${l.description ?? ''}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;text-align:right;white-space:nowrap;font-family:Arial,sans-serif">${(l.amount ?? 0).toLocaleString('sv-SE')} kr</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">${l.type ?? ''}</td>
    </tr>`).join('');

  const notesBlock = extracted.confidenceNotes ? `
  <tr><td style="padding:0 32px 20px">
    <div style="background:#F4DAD0;border-left:3px solid #9F3B22;padding:12px 16px;border-radius:0 6px 6px 0">
      <p style="margin:0;font-size:13px;color:#6B2516;font-family:Arial,sans-serif">${extracted.confidenceNotes}</p>
    </div>
  </td></tr>` : '';

  const itemsBlock = rows ? `
  <tr><td style="padding:0 32px 28px">
    <p style="margin:0 0 10px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Extraherade rader</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E8F0EC">
      <tr style="background:#F1F6F3">
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Beskrivning</th>
        <th style="padding:8px 12px;text-align:right;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Belopp</th>
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Typ</th>
      </tr>
      ${rows}
    </table>
  </td></tr>` : '';

  return `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F1F6F3">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">

  <tr>
    <td style="background:#9F3B22;padding:22px 32px">
      <p style="margin:0 0 4px;font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.12em;font-family:Arial,sans-serif">Arvo intern — manuell granskning</p>
      <p style="margin:0;font-size:22px;font-weight:700;color:#fff;font-family:Arial,sans-serif">${extracted.supplier ?? 'Okänd leverantör'}</p>
    </td>
  </tr>

  <tr><td style="padding:24px 32px 20px">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:33%;padding-right:16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Confidence</p>
          <p style="margin:0;font-size:26px;font-weight:700;color:#9F3B22;font-family:Arial,sans-serif">${pct}</p>
        </td>
        <td style="width:33%;padding:0 16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fakturadatum</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17;font-family:Arial,sans-serif">${extracted.date ?? '–'}</p>
        </td>
        <td style="width:33%;padding-left:16px">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fakturerat (exkl. moms)</p>
          <p style="margin:0;font-size:16px;font-weight:600;color:#0E1A17;font-family:Arial,sans-serif">${total}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  ${notesBlock}
  ${itemsBlock}

  <tr>
    <td style="border-top:1px solid #D5E2DC;padding:14px 32px;background:#F1F6F3">
      <p style="margin:0;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">Arvo Flow &nbsp;·&nbsp; ${ts}</p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body></html>`;
}

async function notifyReviewQueue(extracted, reason) {
  if (!process.env.RESEND_API_KEY) return;
  const pct = extracted.confidenceScore != null
    ? `${Math.round(extracted.confidenceScore * 100)} %` : '–';
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from:    FROM_ALERT,
      to:      ALERT_TO,
      subject: `[Review Queue] ${extracted.supplier ?? 'Okänd'} — confidence ${pct}`,
      html:    buildAlertHtml(extracted, reason),
    });
  } catch (err) {
    console.error('[test-invoice] notifyReviewQueue failed:', err.message);
  }
}

// ── El-specifik säsongslogik ──────────────────────────────────────────────

// Svenska och engelska månadsnamn → säsong
const MONTH_TO_SEASON = {
  'januari': 'winter',    'februari': 'winter',
  'november': 'winter',   'december': 'winter',
  'mars': 'spring_fall',  'april': 'spring_fall',
  'september': 'spring_fall', 'oktober': 'spring_fall',
  'maj': 'summer',  'juni': 'summer', 'juli': 'summer', 'augusti': 'summer',
  'january': 'winter',  'february': 'winter',
  'march': 'spring_fall', 'october': 'spring_fall',
  'may': 'summer', 'june': 'summer', 'july': 'summer', 'august': 'summer',
};

// Exakta bråk: 1/9 + 1/12 + 1/18 = 4/9+4/12+4/18 över 12 månader = 1.00
// annual_kwh = monthly_kwh × multiplier
const SEASON_MULTIPLIER = { winter: 9, spring_fall: 12, summer: 18 };

// Benchmark: välförhandlat spotprisavtal energipris (kr/kWh) per elområde + säsong
// Exkluderar nätavgift, energiskatt, elcertifikat (ej förhandlingsbara)
// Interna MVP-estimat — uppdateras med riktig aggregerad faktурadata
const EL_BENCHMARK_KWH = {
  SE1: { winter: 0.82, spring_fall: 0.55, summer: 0.34 },
  SE2: { winter: 0.88, spring_fall: 0.58, summer: 0.37 },
  SE3: { winter: 0.95, spring_fall: 0.63, summer: 0.40 },
  SE4: { winter: 1.05, spring_fall: 0.70, summer: 0.44 },
};

function computeElRecommendation(extracted) {
  const kwh    = extracted.elKwh;
  const month  = (extracted.elBillingMonth ?? '').toLowerCase().trim();
  const omrade = ['SE1', 'SE2', 'SE3', 'SE4'].includes(extracted.elOmrade)
    ? extracted.elOmrade : 'SE3';

  if (!kwh || kwh <= 0) return null;

  const season     = MONTH_TO_SEASON[month] ?? 'spring_fall';
  const multiplier = SEASON_MULTIPLIER[season];
  const annualKwh  = Math.round(kwh * multiplier);

  // Energipris per kWh — föredrar explicit extraktion, fallback till härlett
  let energiPerKwh = extracted.elEnergiPerKwh;
  if (!(energiPerKwh > 0) && extracted.recurringAmount > 0) {
    energiPerKwh = extracted.recurringAmount / kwh;
  }
  if (!(energiPerKwh > 0)) return null;
  // elPriceExplicit = null/false → priset beräknat, inte tryckt på fakturan → brasklapp
  const elPriceDerived = extracted.elPriceExplicit !== true;

  const fastAvgift     = extracted.elFastAvgiftKr ?? 0;
  const currentAnnual  = Math.round(energiPerKwh * annualKwh) + fastAvgift * 12;
  const benchmarkKwh   = (EL_BENCHMARK_KWH[omrade] ?? EL_BENCHMARK_KWH.SE3)[season];
  const benchmarkAnnual = Math.round(benchmarkKwh * annualKwh);
  const grossSaving    = Math.max(0, currentAnnual - benchmarkAnnual);
  const shouldSwitch   = grossSaving >= 500;
  const arvoFee        = Math.round(grossSaving * 0.20);
  const netSaving      = grossSaving - arvoFee;

  const seasonLabel  = { winter: 'vinter', spring_fall: 'vår/höst', summer: 'sommar' }[season];
  const seasonContext = {
    winter:      'vinterförbrukning är normalt högre än årsgenomsnittet',
    spring_fall: 'vår/höst-förbrukning speglar årsgenomsnittet väl',
    summer:      'sommarförbrukning är normalt lägre än årsgenomsnittet',
  }[season];
  const monthLabel   = extracted.elBillingMonth ?? 'fakturamånad';
  const mwhEstimate  = Math.round(annualKwh / 100) / 10;

  return {
    annualKwh, currentAnnual, benchmarkAnnual, grossSaving, arvoFee, netSaving, shouldSwitch,
    omrade, season: seasonLabel, billingMonth: monthLabel, energiPerKwh, benchmarkKwh,
    suggestedAnnualCost: shouldSwitch ? benchmarkAnnual : null,
    reasoning: shouldSwitch
      ? `Er faktura visar ${energiPerKwh.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel}. Arvo estimerar att ett välförhandlat spotprisavtal i ${omrade} under ${seasonLabel} bör ligga kring ${benchmarkKwh.toFixed(2)} kr/kWh. På uppskattad årsförbrukning om ${mwhEstimate} MWh innebär det en bruttobesparing på ca ${grossSaving.toLocaleString('sv-SE')} kr/år — er nettobesparing efter Arvos besparingsarvode (20 %): ${netSaving.toLocaleString('sv-SE')} kr/år.`
      : `Er faktura visar ${energiPerKwh.toFixed(3)} kr/kWh i elenergiavgift för ${monthLabel}, vilket är i linje med ett välförhandlat spotprisavtal i ${omrade} (benchmark ${seasonLabel}: ${benchmarkKwh.toFixed(2)} kr/kWh). Ert nuvarande avtal verkar konkurrenskraftigt.`,
    uncertaintyNote: [
      `Årsförbrukning ${mwhEstimate} MWh är uppskattad från ${monthLabel}s ${kwh.toLocaleString('sv-SE')} kWh, justerat för att ${seasonContext}. Faktisk årsförbrukning kan avvika ±30–40 %.`,
      elPriceDerived ? 'Elpriset är beräknat som fakturabelopp / kWh. Om fakturan innehåller energiskatt eller nätavgift kan besparingen vara annorlunda.' : null,
    ].filter(Boolean).join(' '),
  };
}

export const config = {
  maxDuration: 60,
};

const ALLOWED_INDUSTRIES = [
  'ehandel', 'tillverkning', 'it-tech', 'bygg',
  'hotell', 'konsult', 'transport', 'vard', 'ovrigt',
];
// 3 MB ger ~4 MB JSON-body efter base64 — håller sig under Vercel Hobbys 4.5 MB.
// Höj till 5 MB om du är på Pro och vill ta större fakturor.
const MAX_PDF_SIZE = 3 * 1024 * 1024;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Endast POST stöds' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return send(res, 500, {
      error: 'Servern är inte konfigurerad — ANTHROPIC_API_KEY saknas',
    });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
  } catch {
    return send(res, 400, { error: 'Ogiltig JSON i request body' });
  }

  const { pdfBase64, industry, employees, revenue } = body;

  if (!pdfBase64 || typeof pdfBase64 !== 'string') {
    return send(res, 400, { error: 'pdfBase64 är obligatoriskt' });
  }
  if (!ALLOWED_INDUSTRIES.includes(industry)) {
    return send(res, 400, {
      error: `Ogiltig industry. Tillåtna: ${ALLOWED_INDUSTRIES.join(', ')}`,
    });
  }
  const employeesNum = Number(employees);
  if (!Number.isFinite(employeesNum) || employeesNum < 1 || employeesNum > 5000) {
    return send(res, 400, { error: 'employees måste vara 1–5000' });
  }
  const revenueNum = revenue == null || revenue === '' ? null : Number(revenue);
  if (revenueNum != null && (!Number.isFinite(revenueNum) || revenueNum < 0)) {
    return send(res, 400, { error: 'revenue måste vara ett positivt tal eller null' });
  }

  let pdfBytes;
  try {
    pdfBytes = Buffer.from(pdfBase64, 'base64');
  } catch {
    return send(res, 400, { error: 'Kunde inte avkoda pdfBase64' });
  }
  if (pdfBytes.length === 0) {
    return send(res, 400, { error: 'PDF-bytes är tomma' });
  }
  if (pdfBytes.length > MAX_PDF_SIZE) {
    return send(res, 413, {
      error: `PDF är för stor (${(pdfBytes.length / 1024 / 1024).toFixed(1)} MB). Max: 3 MB`,
    });
  }
  if (pdfBytes.subarray(0, 4).toString() !== '%PDF') {
    return send(res, 400, {
      error: 'Filen verkar inte vara en PDF (saknar %PDF-header)',
    });
  }

  const timing = {};
  try {
    const t0 = Date.now();
    const extracted = await extractInvoice({ pdfBytes });
    timing.extractMs = Date.now() - t0;
    console.log('[test-invoice] extracted:', JSON.stringify({
      supplier:        extracted.supplier,
      description:     extracted.description,
      billingPeriod:   extracted.billingPeriod,
      lineItems:       extracted.lineItems?.length,
      recurringAmount: extracted.recurringAmount,
      variableCharges: extracted.variableCharges,
      annualCost:      extracted.annualCost,
      confidenceScore: extracted.confidenceScore,
      outOfScope:      extracted.outOfScope,
    }));

    // Triage — review_queue eller unsupported avbryter pipeline
    const routing = routeExtraction(extracted);

    if (routing.route === 'review_queue') {
      // Fire-and-forget — skickar internt larm utan att blockera kundsvaret
      notifyReviewQueue(extracted, routing.reason).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue threw:', err.message)
      );
      return send(res, 200, {
        ok:     true,
        route:  'review_queue',
        reason: routing.reason,
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          confidenceScore: extracted.confidenceScore,
          confidenceNotes: extracted.confidenceNotes,
          lineItems:       extracted.lineItems,
        },
        timing: { extractMs: timing.extractMs },
      });
    }

    if (routing.route === 'unsupported') {
      return send(res, 200, {
        ok:    true,
        route: 'unsupported',
        extracted: {
          supplier:   extracted.supplier,
          date:       extracted.date,
          outOfScope: true,
        },
        categorized:    { category: 'uncategorized' },
        recommendation: { shouldSwitch: false, reasoning: '' },
        timing: { extractMs: timing.extractMs },
      });
    }

    const t1 = Date.now();
    const categorized = await categorize({
      supplier: extracted.supplier,
      amount: extracted.amount,
      date: extracted.date,
      account: extracted.account,
      description: extracted.description,
      recurring: extracted.recurring,
    });
    timing.categorizeMs = Date.now() - t1;
    console.log('[test-invoice] categorized:', JSON.stringify({
      category: categorized.category,
      confidence: categorized.confidence,
      normalizedSupplier: categorized.normalizedSupplier,
    }));

    // ── Avtalslås-detektering (körs före alla tidiga exits) ───────────────────
    if (extracted.servicePeriodStart && extracted.cancellationNoticeDays != null) {
      const periodStart  = new Date(extracted.servicePeriodStart);
      const periodEnd    = extracted.servicePeriodEnd ? new Date(extracted.servicePeriodEnd) : null;
      const lockDeadline = new Date(periodStart);
      lockDeadline.setDate(lockDeadline.getDate() - extracted.cancellationNoticeDays);
      const today        = new Date();

      if (today > lockDeadline && (!periodEnd || today <= periodEnd)) {
        const monitoringDate = periodEnd ? new Date(periodEnd) : null;
        if (monitoringDate) monitoringDate.setDate(monitoringDate.getDate() - 90);

        timing.totalMs = Date.now() - t0;
        return send(res, 200, {
          ok:    true,
          route: 'monitoring',
          contractLocked:         true,
          servicePeriodEnd:       extracted.servicePeriodEnd,
          cancellationNoticeDays: extracted.cancellationNoticeDays,
          monitoringDate:         monitoringDate ? monitoringDate.toISOString().slice(0, 10) : null,
          extracted: {
            supplier:           extracted.supplier,
            amount:             extracted.amount,
            annualCost:         extracted.annualCost,
            recurringAmount:    extracted.recurringAmount,
            variableCharges:    extracted.variableCharges,
            oneTimeFees:        extracted.oneTimeFees,
            date:               extracted.date,
            recurring:          extracted.recurring,
            seatCount:          extracted.seatCount ?? null,
            servicePeriodStart: extracted.servicePeriodStart,
            servicePeriodEnd:   extracted.servicePeriodEnd,
          },
          categorized: {
            category:           categorized.category,
            subType:            categorized.subType,
            normalizedSupplier: categorized.normalizedSupplier,
            confidence:         categorized.confidence,
            licensePending:     categorized.licensePending ?? false,
          },
          timing,
        });
      }
    }

    // Proxy-skydd: kategorier där antal anställda inte är en giltig kostnadsdrivare
    // ska aldrig få en automatisk besparingsberäkning — det vore vilseledande.
    const catDef = BRANCHINDEX[categorized.category];
    if (catDef?.requiresVolumeData) {
      const reason = catDef.volumeDataNote ?? 'Kräver volymdata för korrekt analys';
      notifyReviewQueue(extracted, `[Volymdata] ${reason}`).catch(
        (err) => console.error('[test-invoice] notifyReviewQueue (volume) threw:', err.message)
      );
      const creditBalance = extracted.startupCreditBalance;
      const creditBurn    = extracted.startupCreditMonthlyBurn;
      const creditExpiryMonths = (creditBalance > 0 && creditBurn > 0)
        ? Math.round(creditBalance / creditBurn)
        : null;
      return send(res, 200, {
        ok:     true,
        route:  'review_queue',
        reason: 'volume_data_required',
        volumeDataNote: reason,
        creditExpiryMonths,
        startupCreditBalance:     creditBalance ?? null,
        startupCreditMonthlyBurn: creditBurn ?? null,
        startupCreditCurrency:    extracted.startupCreditCurrency ?? null,
        extracted: {
          supplier:        extracted.supplier,
          date:            extracted.date,
          amount:          extracted.amount,
          annualCost:      extracted.annualCost,
          confidenceScore: extracted.confidenceScore,
          lineItems:       extracted.lineItems,
        },
        categorized: {
          category:           categorized.category,
          normalizedSupplier: categorized.normalizedSupplier,
        },
        timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
      });
    }

    // Ingen benchmark — kategori finns ej i branschindex. Skicka till review_queue
    // istället för att låta rekommenderaren hitta på siffror utan underlag.
    if (!catDef) {
      notifyReviewQueue(extracted, `[Ingen benchmark] Kategori '${categorized.category}' saknas i branschindex`).catch((e) =>
        console.error('[test-invoice] alert failed:', e.message)
      );
      return send(res, 200, {
        ok:     true,
        route:  'review_queue',
        reason: 'no_benchmark',
        extracted: { supplier: extracted.supplier, date: extracted.date, amount: extracted.amount, annualCost: extracted.annualCost, confidenceScore: extracted.confidenceScore, lineItems: extracted.lineItems },
        categorized: { category: categorized.category, normalizedSupplier: categorized.normalizedSupplier },
        timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
      });
    }

    // El-specifik deterministisk rekommendation — hoppar över AI-rekommenderaren
    if (categorized.category === 'el') {
      const elRec = computeElRecommendation(extracted);
      if (!elRec) {
        return send(res, 200, {
          ok: true, route: 'review_queue', reason: 'el_data_missing',
          extracted: {
            supplier: extracted.supplier, date: extracted.date,
            amount: extracted.amount, confidenceScore: extracted.confidenceScore,
            lineItems: extracted.lineItems,
          },
          categorized: {
            category: categorized.category,
            normalizedSupplier: categorized.normalizedSupplier,
          },
          timing: { extractMs: timing.extractMs, categorizeMs: timing.categorizeMs },
        });
      }
      timing.recommendMs = 0;
      timing.totalMs = Date.now() - t0;

      storeDatapoint({
        category: 'el', supplier: categorized.normalizedSupplier,
        annualCost: elRec.currentAnnual, industry, employees: employeesNum,
      }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

      const { arvoFee, netSaving } = elRec;

      return send(res, 200, {
        ok: true, route: 'auto',
        extracted: {
          supplier:             extracted.supplier,
          amount:               extracted.amount,
          recurringAmount:      extracted.recurringAmount,
          variableCharges:      extracted.variableCharges,
          oneTimeFees:          extracted.oneTimeFees,
          annualCost:           elRec.currentAnnual,
          date:                 extracted.date,
          description:          extracted.description,
          billingPeriod:        extracted.billingPeriod,
          lineItems:            extracted.lineItems,
          recurring:            extracted.recurring,
          confidenceScore:      extracted.confidenceScore,
          notes:                extracted.notes,
          seatCount:            null,
          elKwh:                extracted.elKwh,
          elBillingMonth:       extracted.elBillingMonth,
          elOmrade:             elRec.omrade,
          elAnnualKwhEstimated: elRec.annualKwh,
          elUncertaintyNote:    elRec.uncertaintyNote,
          elSkatterKr:          extracted.elSkatterKr,
        },
        categorized: {
          category:           categorized.category,
          subType:            categorized.subType,
          normalizedSupplier: categorized.normalizedSupplier,
          confidence:         categorized.confidence,
          reasoning:          categorized.reasoning,
          licensePending:     categorized.licensePending,
        },
        recommendation: {
          shouldSwitch:        elRec.shouldSwitch,
          suggestedSupplier:   null,
          suggestedAnnualCost: elRec.suggestedAnnualCost,
          grossSaving:         elRec.grossSaving,
          arvoFee,
          netSaving,
          confidence:          0.72,
          reasoning:           elRec.reasoning,
          switchSteps:         elRec.shouldSwitch ? [
            'Arvo analyserar ert nuvarande elavtal och identifierar uppsägningstidpunkt',
            'Vi begär in offerter från kvalificerade elleverantörer med Arvo-volymrabatt',
            'Bästa erbjudandet presenteras — ni godkänner, Arvo sköter hela bytet',
          ] : [],
          licenseOverage:  null,
          overageSavings:  null,
        },
        timing,
      });
    }

    const t2 = Date.now();
    const recommendation = await recommend({
      customer: { industry, employees: employeesNum, revenue: revenueNum },
      invoice: {
        amount:             extracted.amount,
        annualCost:         extracted.annualCost,
        recurringAmount:    extracted.recurringAmount,
        variableCharges:    extracted.variableCharges,
        seatCount:          extracted.seatCount ?? null,
        mobileAddonMonthly: extracted.mobileAddonMonthly ?? null,
      },
      categorized,
    });
    timing.recommendMs = Date.now() - t2;
    timing.totalMs = Date.now() - t0;

    // Fire-and-forget — lagrar anonymiserad datapunkt för branschindex.
    // Felet får aldrig blockera svaret till kunden.
    storeDatapoint({
      category: categorized.category,
      supplier: categorized.normalizedSupplier,
      annualCost: extracted.annualCost ?? extracted.amount,
      industry,
      employees: employeesNum,
    }).catch((err) => console.error('[test-invoice] storeDatapoint failed:', err.message));

    // Räkna netto/fee enligt samma modell som resten av appen
    const grossSaving = recommendation.savingPerYear ?? recommendation.estimatedAnnualSaving ?? 0;
    const arvoFee = categorized.licensePending ? 0 : Math.round(grossSaving * 0.20);
    const netSaving = categorized.licensePending ? grossSaving : grossSaving - arvoFee;

    return send(res, 200, {
      ok:    true,
      route: 'auto',
      extracted: {
        supplier:        extracted.supplier,
        amount:          extracted.amount,
        recurringAmount: extracted.recurringAmount,
        variableCharges: extracted.variableCharges,
        oneTimeFees:     extracted.oneTimeFees,
        annualCost:      extracted.annualCost,
        date:            extracted.date,
        description:     extracted.description,
        billingPeriod:   extracted.billingPeriod,
        lineItems:       extracted.lineItems,
        recurring:       extracted.recurring,
        confidenceScore: extracted.confidenceScore,
        notes:           extracted.notes,
        seatCount:       extracted.seatCount ?? null,
      },
      categorized: {
        category: categorized.category,
        subType: categorized.subType,
        normalizedSupplier: categorized.normalizedSupplier,
        confidence: categorized.confidence,
        reasoning: categorized.reasoning,
        licensePending: categorized.licensePending,
      },
      recommendation: {
        recommendationType: recommendation.recommendationType ?? (recommendation.shouldSwitch ? 'switch' : 'no_action'),
        optimizationSaving: recommendation.optimizationSaving ?? null,
        requiresQuote: recommendation.requiresQuote ?? false,
        shouldSwitch: recommendation.shouldSwitch,
        suggestedSupplier: recommendation.suggestedSupplier ?? null,
        suggestedAnnualCost: recommendation.suggestedAnnualCost ?? null,
        grossSaving,
        arvoFee,
        netSaving,
        confidence: recommendation.confidence,
        reasoning: recommendation.reasoning,
        switchSteps: recommendation.switchSteps ?? [],
        licenseOverage: recommendation.licenseOverage ?? null,
        overageSavings: recommendation.overageSavings ?? null,
      },
      timing,
    });
  } catch (err) {
    const isKnown =
      err instanceof ExtractorError
      || err instanceof CategorizerError
      || err instanceof RecommenderError;
    return send(res, isKnown ? 422 : 500, {
      error: err.message ?? 'Internt fel',
      stage:
        err instanceof ExtractorError ? 'extract'
        : err instanceof CategorizerError ? 'categorize'
        : err instanceof RecommenderError ? 'recommend'
        : 'unknown',
    });
  }
}
