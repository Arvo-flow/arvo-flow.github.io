// api/admin/preview-briefing.mjs — Genererar en testbriefing på begäran.
// Skyddad av ADMIN_TOKEN. Returnerar magic link redo att öppna.
//
// GET /api/admin/preview-briefing?token=ADMIN_TOKEN&email=EMAIL
//
// Flöde:
//   1. Försök generera riktiga insikter från invoice_analyses för emailt
//   2. Om för lite data → generera en demonstrationsinsikt så sidan alltid kan visas
//   3. Skapa magic token (24h TTL för preview)
//   4. Upserta briefing_reports för innevarande månad
//   5. Returnera { briefingUrl, insightCount, totalSavingPotential, isDemo }

import { getDb }                    from '../../lib/db.js';
import { generateBriefingInsights } from '../../lib/briefing-generator.js';
import crypto                       from 'crypto';

const BASE_URL = process.env.ARVO_BASE_URL ?? 'https://arvoflow.se';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  const url   = new URL(req.url, 'https://x');
  const token = url.searchParams.get('token');
  const email = url.searchParams.get('email');

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }
  if (!email) {
    return send(res, 400, { error: 'email-parameter saknas' });
  }

  const db = getDb();
  if (!db) return send(res, 503, { error: 'DB ej tillgänglig' });

  // Period = innevarande månad
  const now         = new Date();
  const period      = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const periodStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const periodEnd   = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString();

  // Försök generera riktiga insikter
  let data   = await generateBriefingInsights({ email, periodStart, periodEnd }).catch(() => null);
  let isDemo = false;

  // Ingen riktig data → demonstrationsinsikter så briefingen alltid kan visas
  if (!data || data.insightCount === 0) {
    isDemo = true;
    data = {
      insights: [
        {
          id:          crypto.randomUUID(),
          type:        'recommendation',
          headline:    'Byt Microsoft 365 — spara 18 400 kr/år',
          subheadline: 'Er SaaS-kostnad är 28% över marknadspris',
          metric: {
            primary:   { value: 18400, label: 'nettobesparing/år' },
            secondary: { value: 21600, label: 'bruttobesparing'   },
          },
          context:    'Arvo har analyserat er Microsoft 365-faktura och identifierat att ni betalar mer än jämförbara bolag. Arvo sköter hela bytesprocessen — från uppsägning av befintligt avtal till nytt signerat kontrakt.',
          supplier:   'Microsoft',
          category:   'saas-productivity',
          analysisId: null,
          action: {
            label:              'Aktivera bytet — Arvo sköter allt',
            type:               'approve_switch',
            estimatedNetSaving: 18400,
          },
        },
        {
          id:          crypto.randomUUID(),
          type:        'cost_trend',
          headline:    'Telia höjde priset 9% sedan förra månaden',
          subheadline: 'Från 124 800 kr/år till 136 080 kr/år — oannonserad höjning?',
          metric: {
            primary:   { value: 9,      label: '% prishöjning' },
            secondary: { value: 11280,  label: 'kr/år mer'     },
          },
          context:    'Arvo har detekterat en prisökning hos Telia. Smyghöjningar utan kundinformation är vanliga — och kan ifrågasättas och förhandlas tillbaka. Arvo granskar om höjningen är befogad och agerar direkt.',
          supplier:   'Telia',
          category:   'mobil',
          analysisId: null,
          action: {
            label:              'Be Arvo granska och förhandla',
            type:               'renegotiate',
            estimatedNetSaving: 9588,
          },
        },
      ],
      totalSavingPotential:  27988,
      totalInvoicesAnalyzed: 0,
      insightCount:          2,
    };
  }

  // Radera eventuell befintlig preview-briefing för denna email+period
  // (så man alltid får ett fräscht token)
  await db`
    DELETE FROM briefing_reports WHERE customer_email = ${email} AND period = ${period}
  `.catch(() => {});

  // Magic token — 24h TTL för preview
  const magicToken  = crypto.randomBytes(32).toString('hex');
  const tokenExpiry = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const tokenRows   = await db`
    INSERT INTO magic_tokens (token, email, note, expires_at)
    VALUES (${magicToken}, ${email}, ${'preview:' + period}, ${tokenExpiry.toISOString()})
    RETURNING id
  `;
  const tokenId = tokenRows[0]?.id;

  // Upsert briefing_reports
  await db`
    INSERT INTO briefing_reports
      (customer_email, period, insights, total_saving_potential,
       total_invoices_analyzed, insight_count, token_id)
    VALUES
      (${email}, ${period},
       ${JSON.stringify(data.insights)}::jsonb,
       ${data.totalSavingPotential},
       ${data.totalInvoicesAnalyzed},
       ${data.insightCount},
       ${tokenId})
    ON CONFLICT (customer_email, period) DO UPDATE
      SET insights               = EXCLUDED.insights,
          total_saving_potential = EXCLUDED.total_saving_potential,
          insight_count          = EXCLUDED.insight_count,
          token_id               = EXCLUDED.token_id
  `;

  const briefingUrl = `${BASE_URL}/briefing/${magicToken}`;

  return send(res, 200, {
    ok:                   true,
    briefingUrl,
    token:                magicToken,
    isDemo,
    insightCount:         data.insightCount,
    totalSavingPotential: data.totalSavingPotential,
    message:              isDemo
      ? 'Demonstrationsdata — lägg till invoices med user_email för riktiga insikter'
      : `${data.insightCount} riktiga insikter genererade från din analyshistorik`,
  });
}
