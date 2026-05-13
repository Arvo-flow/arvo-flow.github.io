// agents/orchestrator/fullmakt/template.js
// Structured fullmakt data + Markdown rendering.
//
// THIS IS A LEGAL DOCUMENT. The wording below is reviewed at v1 and should
// not be edited without consulting a Swedish jurist. The actual hot lines
// (rätt att säga upp, rätt att teckna, omfattning, återkallelse) follow
// standard Swedish fullmakts-praxis (Avtalslagen 2 kap.).
//
// For försäkring (license-pending categories), this fullmakt is NOT
// sufficient — försäkringsförmedlartillstånd requires additional
// documentation (IPID, behovsanalys). The orchestrator refuses to
// generate a fullmakt for license-pending categories until FI-licens
// is in place.

import { CATEGORIES } from '../../categorizer/categories.js';

const ARVO_LEGAL = {
  name: 'Arvo Flow AB',
  orgNumber: '559500-0000',
  address: 'Drottninggatan 1, 111 51 Stockholm',
  email: 'fullmakt@arvo.flow',
  phone: '+46 8 000 000 00',
};

// Per category, the SCOPE of authority granted.
// Specific enough to bind, narrow enough to not over-grant.
const SCOPE_BY_CATEGORY = {
  el: {
    label: 'elavtal',
    actions: [
      'säga upp ditt nuvarande elhandelsavtal med iakttagande av gällande uppsägningstid',
      'teckna nytt elhandelsavtal hos den leverantör som anges nedan, på de villkor som du tagit del av och godkänt',
      'ta emot bekräftelser och avtalsdokument från båda leverantörer i ditt namn',
      'koordinera leverantörsbyte enligt Energimarknadsinspektionens branschrutiner',
    ],
    notExceeds: [
      'Anslutningsavtalet med din elnätsleverantör berörs INTE och bryts INTE',
    ],
  },
  mobil: {
    label: 'mobilabonnemang',
    actions: [
      'säga upp dina nuvarande mobilabonnemang',
      'teckna nya mobilabonnemang hos den leverantör som anges nedan',
      'begära nummerportering av samtliga företagsmobilnummer',
      'ta emot SIM-kort och avtalsdokument i ditt namn',
    ],
    notExceeds: [],
  },
  bredband: {
    label: 'företagsbredband',
    actions: [
      'säga upp ditt nuvarande bredbandsavtal',
      'teckna nytt bredbandsavtal hos den leverantör som anges nedan',
      'begära porting av befintlig fiberanslutning där så är tekniskt möjligt',
    ],
    notExceeds: [],
  },
  kortterminal: {
    label: 'kortterminalavtal',
    actions: [
      'säga upp ditt nuvarande kortterminalavtal',
      'teckna nytt kortterminalavtal hos den leverantör som anges nedan',
      'koordinera överlämning av terminalutrustning',
    ],
    notExceeds: [],
  },
  'faktura-tjanst': {
    label: 'fakturatjänst',
    actions: [
      'säga upp ditt nuvarande externa fakturatjänstavtal',
      'aktivera motsvarande inbyggd funktionalitet i ditt bokföringssystem',
    ],
    notExceeds: [],
  },
  'leasing-bil': {
    label: 'företagsleasing',
    actions: [
      'förhandla nya leasingvillkor vid avtalsslut',
      'teckna nytt leasingavtal hos den leverantör som anges nedan',
    ],
    notExceeds: [
      'Pågående leasingavtal sägs INTE upp i förtid — endast vid avtalsslut',
    ],
  },
};

/**
 * Build the structured fullmakt data. Pure function — caller renders to PDF.
 *
 * @param {object} input
 * @param {object} input.customer            - { orgName, orgNumber, address, signerName, signerSsn }
 * @param {string} input.category            - one of CATEGORIES keys (NOT licensePending)
 * @param {object} input.currentSupplier     - { name, accountReference?, contractEnd? }
 * @param {object} input.newSupplier         - { name, productName, agreedPrice }
 * @param {string} input.switchId            - our internal switch reference
 */
export function buildFullmaktData(input) {
  const { customer, category, currentSupplier, newSupplier, switchId } = input;

  const categoryDef = CATEGORIES[category];
  if (!categoryDef) {
    throw new Error(`Unknown category: ${category}`);
  }
  if (categoryDef.licensePending) {
    throw new Error(
      `Cannot generate standard fullmakt for license-pending category "${category}". ` +
        `Försäkringsförmedlartillstånd hos Finansinspektionen krävs och separat IPID-flöde måste användas.`
    );
  }

  const scope = SCOPE_BY_CATEGORY[category];
  if (!scope) {
    throw new Error(`No scope template for category: ${category}`);
  }

  const validFrom = new Date();
  const validTo = new Date(validFrom);
  validTo.setMonth(validTo.getMonth() + 6); // 6 months max validity

  return {
    documentTitle: `Fullmakt — byte av ${scope.label}`,
    documentVersion: '2026-04-v1',
    switchId,
    issuedAt: validFrom.toISOString(),
    validFrom: validFrom.toISOString().slice(0, 10),
    validTo: validTo.toISOString().slice(0, 10),

    grantor: {
      role: 'Fullmaktsgivare',
      name: customer.orgName,
      orgNumber: customer.orgNumber,
      address: customer.address,
      signer: {
        name: customer.signerName,
        ssn: customer.signerSsn, // BankID-bound
        title: customer.signerTitle ?? 'Behörig firmatecknare',
      },
    },
    grantee: {
      role: 'Fullmaktshavare',
      ...ARVO_LEGAL,
    },
    scope: {
      category,
      categoryLabel: scope.label,
      actions: scope.actions,
      notExceeds: scope.notExceeds,
    },
    transaction: {
      currentSupplier: {
        name: currentSupplier.name,
        accountReference: currentSupplier.accountReference ?? null,
        contractEnd: currentSupplier.contractEnd ?? null,
      },
      newSupplier: {
        name: newSupplier.name,
        productName: newSupplier.productName,
        agreedPrice: newSupplier.agreedPrice, // SEK/year
      },
    },
    revocation: {
      method: 'Skriftlig återkallelse via mejl till fullmakt@arvo.flow eller via inställningssidan i Arvo Flow',
      effect:
        'Återkallelse träder i kraft inom 24 h. Eventuella påbörjade åtgärder slutförs inte; redan utförda åtgärder kan inte återkallas men ny leverantör kan därefter sägas upp av kund med iakttagande av nytt avtals uppsägningstid.',
    },
    legalBasis: 'Fullmakt enligt 2 kap. avtalslagen (1915:218).',
  };
}

/**
 * Render the fullmakt as Markdown — used as fallback when pdf-lib isn't
 * installed, and as the source-of-truth for what goes into the PDF.
 */
export function renderMarkdown(data) {
  const { grantor, grantee, scope, transaction, revocation } = data;

  return `# ${data.documentTitle}

**Dokumentversion:** ${data.documentVersion}
**Utfärdat:** ${data.issuedAt}
**Giltigt:** ${data.validFrom} — ${data.validTo}
**Ärende-ID:** ${data.switchId}

---

## Fullmaktsgivare

**${grantor.name}**
Org.nr ${grantor.orgNumber}
${grantor.address}

Företrädare:
${grantor.signer.title}: **${grantor.signer.name}**
Personnummer: ${grantor.signer.ssn}

## Fullmaktshavare

**${grantee.name}**
Org.nr ${grantee.orgNumber}
${grantee.address}
${grantee.email} · ${grantee.phone}

---

## Omfattning

Fullmaktsgivaren ger härmed Fullmaktshavaren rätt att, i Fullmaktsgivarens namn och för Fullmaktsgivarens räkning, vidta följande åtgärder avseende **${scope.categoryLabel}**:

${scope.actions.map((a, i) => `${i + 1}. ${a}.`).join('\n')}

${
  scope.notExceeds.length > 0
    ? `### Avgränsningar\n\n${scope.notExceeds.map((n) => `- ${n}.`).join('\n')}\n`
    : ''
}

## Transaktion

**Nuvarande leverantör:** ${transaction.currentSupplier.name}
${transaction.currentSupplier.accountReference ? `Avtals-/kundnummer: ${transaction.currentSupplier.accountReference}` : ''}

**Ny leverantör:** ${transaction.newSupplier.name}
**Produkt:** ${transaction.newSupplier.productName}
**Avtalat pris:** ${transaction.newSupplier.agreedPrice.toLocaleString('sv-SE')} kr/år

## Återkallelse

**Metod:** ${revocation.method}

**Effekt:** ${revocation.effect}

---

## Rättslig grund

${data.legalBasis}

---

## Signering

Detta dokument signeras elektroniskt med BankID. Den elektroniska signaturen utgör fullmaktsgivarens bekräftelse på att samtliga uppgifter ovan är korrekta och att fullmakten upprättas medvetet och i samförstånd.

Signaturuppgifter (fylls av Scrive vid signering):

- Personnummer: \`{{ssn}}\`
- Tidsstämpel: \`{{timestamp}}\`
- Scrive document-ID: \`{{scriveDocId}}\`
`;
}
