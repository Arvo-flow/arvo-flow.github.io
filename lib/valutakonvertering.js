// lib/valutakonvertering.js — EN sanning för «räkna om fakturan till SEK».
//
// ══ VARFÖR (2026-09-09, ur grundarens 25 skarpa fakturor) ══════════════════════════════════
// Konverteringen bodde i `api/test-invoice.mjs` som TVÅ handskrivna fältlistor — en för EUR och
// en för USD. Båda var ofullständiga, och på olika sätt. Mätt i produktion:
//
//   · `invoiceTotal` konverterades ALDRIG. Ring 1 jämför radsumman (konverterad, SEK) mot
//     fakturatotalen (okonverterad, EUR/USD) och fällde fyra av grundarens fakturor:
//        Google  6 595 SEK ≠ 575 EUR   → kvoten 11,47 = EUR/SEK
//        Slack, Atlassian, AWS         → kvoten 10,42 = USD/SEK
//     Det är precis de fyra leverantörer prisboken har verifierade golv för. Grinden gjorde rätt
//     — den såg en motsägelse som fanns — men motsägelsen var VÅR.
//
//   · `amountOre` och `unitPriceOre` konverterades inte heller, och EUR-grenen glömde dessutom
//     `unitPrice`. Öresfälten är de som `recommend.js` läser sedan 9 sep för att slippa
//     kronorfältets avrundning. MÄTT genom produktionskedjan på Googles faktura: kundens
//     per-licenspris blev **11,50 kr i stället för 131,90 kr** — en faktor 11,47, i ett tal som
//     når kundens prosa. En halv dag gammal fix, redan osann på varje utländsk faktura.
//
// ── DÄRFÖR EN LISTA, INTE TVÅ ─────────────────────────────────────────────────────────────
// Två kopior av samma fältlista glider isär (regel 1), och den som glider är inte nödvändigtvis
// den man läser. Här finns EN lista, och `tests/valutakrav.mjs` kräver att VARJE penningfält i
// extraktionsschemat står antingen i den eller i `EJ_PENGAR` med ett skäl. Ett nytt fält kan
// alltså inte glömmas bort — det fäller sviten tills någon klassat det.

/** Fält på toppnivå som bär ett belopp i fakturans valuta. */
export const BELOPPSFALT = Object.freeze([
  'amount', 'recurringAmount', 'variableCharges', 'oneTimeFees', 'annualCost',
  'projectedRecurringAmount', 'pricePerSeatMonthly', 'invoiceTotal',
]);

/** Fält på VARJE radpost som bär ett belopp. Öresfälten är hundradelar — samma multiplikation. */
export const RADFALT = Object.freeze(['amount', 'unitPrice', 'amountOre', 'unitPriceOre']);

/**
 * Fält som SER ut som pengar men inte är det, med skäl. Listan är en DEKLARATION: den som lägger
 * till ett fält måste välja sida, och valet står i koden i stället för i någons minne.
 */
export const EJ_PENGAR = Object.freeze({
  seatCount:        'ett antal licenser, inte ett belopp',
  quantity:         'ett antal enheter',
  employees:        'ett antal anställda',
  moms_sats:        'en procentsats (0,25), valutalös',
  momsSats:         'samma, camelCase-formen',
  roaming_zone:     'ett zonnummer',
  confidenceScore:  'en sannolikhet',
  fxRate:           'SJÄLVA KURSEN — att konvertera den vore cirkulärt',
  billingPeriod:    'en period',
  // ── VK-01 FÄLLDE TRE FÄLT PÅ SIN FÖRSTA KÖRNING, och alla tre visade sig vara RÄTT otouchade.
  // Vakten tvingade fram en läsning av schemat i stället för ett antagande ur fältnamnet — och
  // det är hela poängen: «ser ut som pengar» är inte samma sak som «är pengar».
  el_price_explicit: 'BOOLEAN i schemat — en flagga för att fakturan visar ett kWh-pris alls',
  cancellation_fee_explicit: 'STRING i schemat — den citerade avtalstexten, inte ett belopp',
  el_spot_price_kwh: 'Nordpool-spotpris i SEK/kWh. Ett MARKNADSPRIS, inte ett belopp på kundens '
    + 'faktura — att gånga det med fakturans valutakurs vore att räkna om ett tal som redan är '
    + 'i kronor. Samma enhetsfel som obduktionens «vad är talet per?» (21 aug).',
});

/**
 * Räknar om en extraktion till SEK. MUTERAR inte — returnerar ett nytt objekt.
 *
 * FAIL-CLOSED PÅ KURSEN (VK-05): utan en ändlig, positiv kurs konverteras ingenting och
 * `extracted` returneras orört med sin ursprungsvaluta kvar. Att gånga med `undefined` hade gett
 * `NaN` i varje belopp — ett tillstånd som är omöjligt att skilja från «fakturan saknade tal».
 */
export function konverteraTillSek(extracted, { rate, valuta, source = null, date = null } = {}) {
  if (!extracted || typeof extracted !== 'object') return extracted;
  if (!Number.isFinite(rate) || rate <= 0) return extracted;

  const ut = { ...extracted };
  for (const f of BELOPPSFALT) {
    if (ut[f] != null && Number.isFinite(Number(ut[f]))) ut[f] = Math.round(Number(ut[f]) * rate);
  }
  // ⚠️ RO-08 SER INTE DEN HÄR LOOPEN, och det ska stå skrivet. Vakten mot felstavade öresfält
  // matchar PUNKTNOTATION (`l.amountOre`), och vi läser via beräknad nyckel (`rad[f]`). Det är
  // exakt den blindfläck RO-08 deklarerar i sitt eget huvud. Skyddet här är i stället att
  // fältnamnen bor i RADFALT och att VK-01 kräver att varje penningfält i schemat är klassat —
  // en annan vakt, inte ingen vakt.
  ut.lineItems = (extracted.lineItems ?? []).map((li) => {
    const rad = { ...li };
    for (const f of RADFALT) {
      const v = rad[f];
      if (v == null || !Number.isFinite(Number(v))) continue;
      // Öresfälten är hundradelar, kronorfälten hela kronor — men multiplikationen är densamma
      // och avrundningen sker i respektive enhet. Ingen grenning behövs, och en gren vars två
      // sidor är identiska antyder en skillnad som inte finns.
      rad[f] = Math.round(Number(v) * rate);
    }
    return rad;
  });

  // ── URSPRUNGET BEVARAS, för Ring 1 dömer i fakturans egna enheter ────────────────────────
  // `invoiceTotal` bär ingen deklarerad valuta: modellen kan ha läst USD-totalen ELLER ett
  // SEK-motvärde som står tryckt bredvid (microsoft-direkt-usd gör precis det). Att konvertera
  // den är därför en gissning, och att låta bli likaså. Lösningen är att INTE ställa ett
  // omräknat tal mot ett annat: Ring 1 får båda sidorna som de stod på pappret, i samma valuta,
  // och behöver då ingen kurs alls. Frysta, för det här är en observation — aldrig ett fält
  // någon nedströms ska räkna vidare på.
  ut.ursprungsbelopp = Object.freeze({
    valuta: valuta ?? extracted.currency ?? null,
    radsumma: (extracted.lineItems ?? []).reduce((s, l) => s + (Number(l?.amount) || 0), 0),
    invoiceTotal: Number.isFinite(Number(extracted.invoiceTotal)) ? Number(extracted.invoiceTotal) : null,
  });

  ut.originalCurrency = valuta ?? extracted.currency ?? null;
  ut.fxRate  = rate;
  ut.fxSource = source;
  ut.fxDate   = date;
  ut.currency = 'SEK';
  return ut;
}
