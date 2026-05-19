// Genererar preview-versioner av alla tre email-outputs för Ricoh-fakturan.
import Anthropic from '@anthropic-ai/sdk';
import { writeFileSync } from 'node:fs';

// ── Ricoh-faktura (Faktura 9988776) ──────────────────────────────────────────
const extractedData = {
  supplier:        'Ricoh Sverige AB',
  annualCost:      18_000,
  recurringAmount: 1_500,
  variableCharges: 2_890,
  amount:          4_390,
  date:            '2026-05-01',
  lineItems: [
    { description: 'Grundhyra MFP IM C5500A (Fast avgift)', type: 'recurring_subscription', amount: 1500, quantity: 1,      unitPrice: 1500 },
    { description: 'Svartvita klickutskrifter enl. serviceavtal',  type: 'variable_usage',       amount: 1000, quantity: 12500,  unitPrice: 0.08 },
    { description: 'Färgutskrifter klick enl. serviceavtal',       type: 'variable_usage',       amount: 1890, quantity: 4200,   unitPrice: 0.45 },
  ],
};
const categorized     = { category: 'skrivarleasing', normalizedSupplier: 'Ricoh' };
const contactName     = 'Anna Lindqvist';
const contactCompany  = 'Bygg & Maskin AB';
const contactEmail    = 'anna.lindqvist@byggmaskin.se';

// ── RFQ-generering ────────────────────────────────────────────────────────────
async function generateRfq() {
  const client = new Anthropic();

  const fixedLines = extractedData.lineItems
    .filter((l) => l.type === 'recurring_subscription')
    .map((l) => `- ${l.description}: ${l.amount.toLocaleString('sv-SE')} kr/mån`)
    .join('\n');

  const variableLines = extractedData.lineItems
    .filter((l) => l.type === 'variable_usage')
    .map((l) => {
      const qty  = l.quantity != null ? `${Number(l.quantity).toLocaleString('sv-SE')} sidor` : '';
      const unit = l.unitPrice != null ? ` à ${l.unitPrice} kr/sida` : '';
      return `- ${l.description}${qty ? ': ' + qty : ''}${unit} = ${l.amount.toLocaleString('sv-SE')} kr/mån`;
    })
    .join('\n');

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 700,
    system: `Du är inköpskonsult på Arvo Flow och kontaktar leverantörer å kunders vägnar.

Skriv en komplett, kliniskt formaterad email-draft som är redo att skickas direkt.

Format (följ exakt):
Till: [ange leverantörens e-postadress]
Ämne: [passande ämne]

[brödtext på professionell affärssvenska]

Med vänliga hälsningar,
Arvo Flow — Inköpsavdelningen

KRITISKT: Skriv ENBART emailen. Noll meta-kommentarer, noll förklaringar, ingen inledning som "Här är ett förslag". Första raden ska vara "Till:".`,
    messages: [{
      role: 'user',
      content: `Skriv offertförfrågan för skrivarleasing/Managed Print.

Kund vi representerar: ${contactCompany}
Nuvarande leverantör: ${extractedData.supplier}

Fasta avgifter per månad:
${fixedLines}

Rörliga klickkostnader per månad:
${variableLines}

Vi söker konkurrerande offert. Be leverantören specificera:
1. Fast maskinhyra/leasingavgift (kr/mån)
2. Klickpris per sida: svartvit och färg (SEK)
3. Inkluderade tjänster (service, toner, support-SLA)
4. Bindningstid och uppsägningstid

Avslutningsdatum för svar: ${new Date(Date.now() + 5 * 86400000).toLocaleDateString('sv-SE')}.`,
    }],
  });
  return msg.content[0].text.trim();
}

// ── Email-builders (identiska med api/quote-request.mjs) ─────────────────────
function buildCustomerEmail() {
  const greeting = `Hej ${contactName.split(' ')[0]},`;
  const ts = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F1F6F3">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:600px;width:100%">
  <tr><td style="background:#1A7A5E;padding:22px 32px">
    <p style="margin:0 0 4px;font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.12em;font-family:Arial,sans-serif">Arvo Flow — Offertprocess startad</p>
    <p style="margin:0;font-size:22px;font-weight:700;color:#fff;font-family:Arial,sans-serif">Vi tar det härifrån</p>
  </td></tr>
  <tr><td style="padding:28px 32px">
    <p style="margin:0 0 16px;font-size:15px;color:#1F2E2A;font-family:Arial,sans-serif">${greeting}</p>
    <p style="margin:0 0 16px;font-size:15px;color:#1F2E2A;font-family:Arial,sans-serif">
      Vi har tagit emot er faktura från <strong>${extractedData.supplier}</strong> och initierat offertprocessen
      hos kvalificerade Print-leverantörer.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:#1F2E2A;font-family:Arial,sans-serif">
      Arvo analyserar era klickvolymer och återkommer med ett konkret besparingsförslag inom
      <strong>1–2 arbetsdagar</strong>. Ni behöver inte göra något mer.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E8F0EC;border-radius:8px;overflow:hidden;margin-bottom:24px">
      <tr style="background:#F1F6F3">
        <td colspan="2" style="padding:10px 16px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Nuvarande kostnad</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-size:14px;color:#1F2E2A;font-family:Arial,sans-serif">Fasta avgifter / år</td>
        <td style="padding:12px 16px;font-size:14px;font-weight:600;color:#1F2E2A;text-align:right;font-family:Arial,sans-serif">${extractedData.annualCost.toLocaleString('sv-SE')} kr</td>
      </tr>
      <tr style="background:#F8FBF9">
        <td style="padding:12px 16px;font-size:14px;color:#5C6E68;font-family:Arial,sans-serif">Rörliga klickkostnader / mån</td>
        <td style="padding:12px 16px;font-size:14px;color:#5C6E68;text-align:right;font-family:Arial,sans-serif">${extractedData.variableCharges.toLocaleString('sv-SE')} kr</td>
      </tr>
    </table>
    <p style="margin:0;font-size:13px;color:#5C6E68;font-family:Arial,sans-serif">
      Arvo tar 20 % av realiserad besparing — ni betalar ingenting om vi inte lyckas.
    </p>
  </td></tr>
  <tr><td style="border-top:1px solid #D5E2DC;padding:14px 32px;background:#F1F6F3">
    <p style="margin:0;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">Arvo Flow · arvoflow.se · ${ts}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function buildInternalEmail(rfqDraft) {
  const ts = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  const rowsHtml = extractedData.lineItems.map((l) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;font-family:Arial,sans-serif">${l.description}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:13px;color:#1F2E2A;text-align:right;white-space:nowrap;font-family:Arial,sans-serif">${l.amount.toLocaleString('sv-SE')} kr</td>
      <td style="padding:8px 12px;border-bottom:1px solid #E8F0EC;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">${l.type}</td>
    </tr>`).join('');

  const rfqHtml = rfqDraft
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="sv"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F1F6F3">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F1F6F3;padding:32px 16px">
<tr><td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;max-width:620px;width:100%">
  <tr><td style="background:#9F3B22;padding:22px 32px">
    <p style="margin:0 0 4px;font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:.12em;font-family:Arial,sans-serif">Arvo intern — ny offertlead</p>
    <p style="margin:0;font-size:22px;font-weight:700;color:#fff;font-family:Arial,sans-serif">${extractedData.supplier}</p>
  </td></tr>
  <tr><td style="padding:24px 32px 0">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:40%;padding-right:16px;vertical-align:top">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Kontakt</p>
          <p style="margin:0;font-size:15px;font-weight:600;color:#0E1A17;font-family:Arial,sans-serif">${contactName}</p>
          <p style="margin:2px 0 0;font-size:13px;color:#1F2E2A;font-family:Arial,sans-serif">${contactCompany}</p>
          <p style="margin:2px 0 0;font-size:13px;color:#1A7A5E;font-family:Arial,sans-serif">${contactEmail}</p>
        </td>
        <td style="width:30%;padding:0 8px;vertical-align:top">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fast / år</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#0E1A17;font-family:Arial,sans-serif">${extractedData.annualCost.toLocaleString('sv-SE')} kr</p>
        </td>
        <td style="width:30%;padding-left:8px;vertical-align:top">
          <p style="margin:0 0 4px;font-size:10px;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Rörligt / mån</p>
          <p style="margin:0;font-size:24px;font-weight:700;color:#0E1A17;font-family:Arial,sans-serif">${extractedData.variableCharges.toLocaleString('sv-SE')} kr</p>
        </td>
      </tr>
    </table>
  </td></tr>
  <tr><td style="padding:20px 32px 0">
    <p style="margin:0 0 8px;font-size:10px;font-weight:700;color:#5C6E68;text-transform:uppercase;letter-spacing:.08em;font-family:Arial,sans-serif">Fakturarader</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E8F0EC">
      <tr style="background:#F1F6F3">
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Beskrivning</th>
        <th style="padding:8px 12px;text-align:right;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Belopp</th>
        <th style="padding:8px 12px;text-align:left;font-size:10px;color:#5C6E68;font-weight:600;font-family:Arial,sans-serif">Typ</th>
      </tr>
      ${rowsHtml}
    </table>
  </td></tr>
  <tr><td style="padding:24px 32px">
    <div style="background:#0C1410;border-radius:8px;padding:24px">
      <p style="margin:0 0 4px;font-size:9px;font-weight:700;color:#4ADE80;text-transform:uppercase;letter-spacing:.14em;font-family:monospace">✉ KLAR ATT SKICKA TILL LEVERANTÖR</p>
      <p style="margin:0 0 16px;font-size:9px;color:#6B8C7A;font-family:monospace">Öppna nytt mail → klistra in nedan → skriv in leverantörens adress → skicka</p>
      <div style="font-size:13.5px;line-height:1.8;color:#D4EDDA;font-family:monospace;white-space:pre-wrap">${rfqHtml}</div>
    </div>
  </td></tr>
  <tr><td style="border-top:1px solid #D5E2DC;padding:14px 32px;background:#F1F6F3">
    <p style="margin:0;font-size:11px;color:#5C6E68;font-family:Arial,sans-serif">Arvo Flow · ${ts}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

// ── Kör ───────────────────────────────────────────────────────────────────────
console.log('Genererar RFQ via Claude Haiku...');
const rfqDraft = await generateRfq();

writeFileSync('/tmp/preview-1-kund.html',    buildCustomerEmail());
writeFileSync('/tmp/preview-2-intern.html',  buildInternalEmail(rfqDraft));
writeFileSync('/tmp/preview-3-rfq.txt',      rfqDraft);

console.log('\n── RFQ-DRAFT ────────────────────────────────────────────────────\n');
console.log(rfqDraft);
console.log('\n─────────────────────────────────────────────────────────────────');
console.log('Filer sparade:');
console.log('  /tmp/preview-1-kund.html');
console.log('  /tmp/preview-2-intern.html');
console.log('  /tmp/preview-3-rfq.txt');
