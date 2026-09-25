// tests/inkorgsadress.mjs — RUMMETS EGEN ADRESS (IA). Bakgrund i lib/inkorgsadress.js.
//
// FÅNGAR: en adress i fel form eller på fel domän som blir en identitet; en okänd nyckel som analyseras;
//   ett svar till avsändaren på en rumsadress; en kö som tappar adressens identitet; en ägd adress som byter
//   ägare på en delad dator; en Gmail-kod som visas efter att den blivit inaktuell; telemetri med en annan
//   fils detaljer; ett oprövat e-postfält som blir adressens ägare.
// BLIND: intagets koppling (IA-05) är en källtextvakt — den ser att svaren går till `svaraTill`, inte att
//   varje gren nås. Samma gäller dagsgränsens bokföring (IA-13): ett villkor som kortsluter anropet
//   (`if (false && adress)`) syns inte — handlern läser db/KV på modulnivå och kan inte köras här.
//   Gmail-kodens form är obekräftad mot ett riktigt verifieringsmejl (IA-06). Den fejkade databasen tolkar
//   SQL genom att leta villkorstext.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  nyAdressnyckel, ADRESSNYCKEL_RE, adressFor, nyckelUrMottagare, mottagarnyckel, intagsIdentitet, gmailKod, adressStatus,
  adressForRum, hittaRumsadress, rumsadressForLasning, rumHash, GMAIL_KOD_GILTIG_MS, plattformForEpost,
} from '../lib/inkorgsadress.js';
import { jobbIdentitet, enqueueJobs, claimBatch, bokforAvvisade } from '../lib/ingest-queue.js';
import { byggIntag } from '../lib/intagstelemetri.js';

const ROT = new URL('..', import.meta.url).pathname;
const las = (p) => readFileSync(join(ROT, p), 'utf8');
const RUM_A = 'a'.repeat(32);

/** Fejkad sql-tagg över en tabell inkorgsadresser — nog för ägarskapsreglerna. */
function fejkDb(rader = []) {
  const db = async (strings, ...v) => {
    const q = strings.join('?');
    if (/^\s*SELECT \* FROM inkorgsadresser WHERE agare_epost = \?/.test(q)) return rader.filter((r) => r.agare_epost === v[0]).slice(0, 1);
    if (/^\s*SELECT \* FROM inkorgsadresser WHERE rum_hash = \?/.test(q)) return rader.filter((r) => r.rum_hash === v[0]).slice(0, 1);
    if (/^\s*SELECT \* FROM inkorgsadresser WHERE nyckel = \?/.test(q)) return rader.filter((r) => r.nyckel === v[0]).slice(0, 1);
    if (/UPDATE inkorgsadresser SET agare_epost = \? WHERE nyckel = \?/.test(q)) { const r = rader.find((x) => x.nyckel === v[1]); if (r) r.agare_epost = v[0]; return []; }
    if (/UPDATE inkorgsadresser SET plattform = \? WHERE nyckel = \?/.test(q)) { const r = rader.find((x) => x.nyckel === v[1]); if (r) r.plattform = v[0]; return []; }
    if (/INSERT INTO inkorgsadresser/.test(q)) {
      const ny = { nyckel: v[0], rum_hash: v[1], agare_epost: v[2], plattform: v[3], skapad_at: new Date() };
      const krock = (ny.rum_hash && rader.some((r) => r.rum_hash === ny.rum_hash))
        || (ny.agare_epost && rader.some((r) => r.agare_epost === ny.agare_epost));
      if (krock) { if (/ON CONFLICT DO NOTHING/.test(q)) return []; throw new Error('duplicate key'); }
      rader.push(ny); return [ny];
    }
    throw new Error(`fejkDb: okänd fråga ${q.slice(0, 80)}`);
  };
  db.rader = rader;
  return db;
}

describe('IA · rummets egen adress', () => {
  test('IA-01 · adressnyckeln är 16 tecken base32 (80 bitar slump) och unik', () => {
    const n = new Set(Array.from({ length: 2000 }, () => nyAdressnyckel()));
    assert.equal(n.size, 2000);
    for (const k of n) assert.match(k, ADRESSNYCKEL_RE);
    assert.equal(adressFor('abcdefghjkmnpq23'), 'faktura+abcdefghjkmnpq23@inbox.arvoflow.se');
  });

  test('IA-02 · bara exakt formen på vår domän blir en adressidentitet (motprov: skiftläge och listformer tolkas)', () => {
    const k = 'abcdefghjkmnpq23';
    assert.equal(nyckelUrMottagare(`faktura+${k}@inbox.arvoflow.se`), k);
    assert.equal(nyckelUrMottagare([{ email: `Faktura+${k.toUpperCase()}@Inbox.Arvoflow.se` }]), k);
    assert.equal(nyckelUrMottagare(`Kund <faktura+${k}@inbox.arvoflow.se>, annan@x.se`), k);
    for (const fel of ['faktura@inbox.arvoflow.se', `faktura+${k}@evil.se`, `test+${k}@inbox.arvoflow.se`,
      `faktura+${k}x@inbox.arvoflow.se`, `faktura+${k.slice(1)}@inbox.arvoflow.se`, `faktura+${k}@inbox.arvoflow.se.evil.se`, null, '']) {
      assert.equal(nyckelUrMottagare(fel), null, `«${fel}» blev en identitet`);
    }
  });

  test('IA-03 · mottagaren vinner: identiteten och svaret följer adressen, aldrig avsändaren', () => {
    const r = intagsIdentitet({ nyckel: 'abcdefghjkmnpq23', rad: { nyckel: 'abcdefghjkmnpq23', agare_epost: 'Kund@Bolag.se' }, avsandare: 'faktura@telia.se' });
    assert.deepEqual(r, { lage: 'rumsadress', fingerprint: 'adress:abcdefghjkmnpq23', userEmail: 'kund@bolag.se', svaraTill: 'kund@bolag.se' });
    const utanAgare = intagsIdentitet({ nyckel: 'abcdefghjkmnpq23', rad: { nyckel: 'abcdefghjkmnpq23', agare_epost: null }, avsandare: 'faktura@telia.se' });
    assert.equal(utanAgare.svaraTill, null, 'utan ägare svarar vi ingen — leverantören får aldrig analysen');
    assert.equal(utanAgare.userEmail, null);
    // Motprov: en okänd nyckel är ingen identitet; bara avsändaren får beskedet.
    assert.deepEqual(intagsIdentitet({ nyckel: 'abcdefghjkmnpq23', rad: null, avsandare: 'x@y.se' }), { lage: 'okand_adress', svaraTill: 'x@y.se' });
  });

  test('IA-04 · kön bär adressens identitet genom drainen (motprov: gamla vägen följer avsändaren)', () => {
    const sha = (s) => `h${s.length}`;
    assert.deepEqual(jobbIdentitet({ sender: 'faktura@telia.se', fingerprint: 'adress:k', agareEpost: 'kund@b.se' }, sha),
      { fingerprint: 'adress:k', email: 'kund@b.se', userEmail: 'kund@b.se' });
    assert.throws(() => jobbIdentitet({ sender: 'faktura@telia.se', fingerprint: 'adress:k', agare_epost: 'kund@b.se' }, sha), /agareEpost/);
    assert.deepEqual(jobbIdentitet({ sender: 'faktura@telia.se', fingerprint: 'adress:k', agareEpost: null }, sha),
      { fingerprint: 'adress:k', email: null, userEmail: null });
    assert.deepEqual(jobbIdentitet({ sender: 'kund@b.se' }, sha), { fingerprint: 'mail:h9', email: 'kund@b.se', userEmail: 'kund@b.se' });
    assert.match(las('api/cron/drain-ingest.mjs'), /\.\.\.jobbIdentitet\(job, sha16\)/, 'drainen härleder inte identiteten ur jobbet');
  });

  test('IA-05 · intaget: varje svar går till svaraTill — bara beskedet om en okänd adress går till avsändaren', () => {
    const k = las('api/inbound-email.mjs').split('\n').filter((l) => !/^\s*\/\//.test(l)).join('\n');
    assert.equal((k.match(/to:\s*sender\b/g) ?? []).length, 1, 'ett svar till avsändaren utöver beskedet om okänd adress');
    assert.ok((k.match(/to:\s*svaraTill\b/g) ?? []).length >= 3, 'rate limit, bulkkvitto och svarsmejl ska gå till svaraTill');
    // svaraTill måste komma ur adressens identitet — annars är «to: svaraTill» bara avsändaren med ett annat namn.
    assert.match(k, /const svaraTill = adress \? adress\.svaraTill : sender;/, 'svaraTill binds inte till adressens ägare');
    assert.match(k, /const identityFp = adress \? adress\.fingerprint/);
    assert.match(k, /fingerprint: adress\?\.fingerprint \?\? null, agareEpost: adress\?\.userEmail \?\? null/, 'bulkjobben tappar adressens identitet');
    assert.match(k, /inbound:rate:adress:\$\{adressnyckel\}/, 'rate limit ska räknas per rumsadress, inte per leverantör');
    // Adressen avgörs före rate limit och testytan.
    assert.ok(k.indexOf('mottagarnyckel(data)') > 0 && k.indexOf('mottagarnyckel(data)') < k.indexOf('inbound:rate:'), 'adressen avgörs efter rate limit');
    assert.match(k, /if \(!traff\) \{\n\s*const hamtat = await hamtaMottaget\(/, 'en vidarebefordran utan rumsadress i webhooken läses aldrig i det mottagna mejlet');
    assert.match(k, /if \(hamtat\.tillfalligt\) \{[\s\S]{0,300}kv\.del\(`inbound:started:\$\{mailId\}`\)[\s\S]{0,120}return send\(res, 500/, 'ett okänt läsfel blev «ingen rumsadress»');
    assert.match(k, /\n\s*traff = mottagarnyckel\(hamtat\.mejl\);\n/, 'det hämtade mejlet läses aldrig efter rumsadressen');
  });

  test('IA-06 · Gmails verifieringskod: ur ämnet, ur brödtexten, bara från Gmails avsändare (motprov)', () => {
    const g = 'forwarding-noreply@google.com';
    assert.equal(gmailKod({ avsandare: g, amne: '(#482913650) Gmail Forwarding Confirmation - Receive Mail from kund@gmail.com' }), '482913650'); // hemlighet-ok: påhittad adress i en fixtur
    assert.equal(gmailKod({ avsandare: g, amne: 'Gmail Forwarding Confirmation', text: 'Confirmation code: 123456789' }), '123456789');
    assert.equal(gmailKod({ avsandare: g, amne: 'Bekräftelse', text: 'Bekräftelsekod: 5566778899' }), '5566778899');
    assert.equal(gmailKod({ avsandare: 'lurendrejare@x.se', amne: '(#482913650) Gmail Forwarding Confirmation' }), null, 'en förfalskad avsändare får ingen kod');
    assert.equal(gmailKod({ avsandare: g, amne: 'Hej', text: 'inget här' }), null);
  });

  test('IA-07 · koden visas bara medan den är färsk', () => {
    const nu = Date.parse('2026-09-24T12:00:00Z');
    const rad = { nyckel: 'abcdefghjkmnpq23', gmail_kod: '482913650', gmail_kod_at: new Date(nu - 5 * 60e3), plattform: 'gmail' };
    assert.equal(adressStatus(rad, { nu }).gmailKod, '482913650');
    assert.equal(adressStatus({ ...rad, gmail_kod_at: new Date(nu - GMAIL_KOD_GILTIG_MS - 1) }, { nu }).gmailKod, null);
    assert.equal(adressStatus(null), null);
    assert.equal(adressStatus(rad, { nu }).adress, 'faktura+abcdefghjkmnpq23@inbox.arvoflow.se');
  });

  test('IA-08 · ägarskap: en enhetsadress knyts aldrig till en e-post, en ägd adress byter aldrig ägare', async () => {
    const db = fejkDb();
    const enhet = await adressForRum(db, { rumsnyckel: RUM_A });
    assert.equal(enhet.rum_hash, rumHash(RUM_A));
    assert.equal(enhet.agare_epost, null);
    assert.ok(!db.rader.some((r) => r.rum_hash === RUM_A), 'rumsnyckeln själv får aldrig lagras');
    // Delad dator: den som loggar in får en EGEN adress — enhetens adress (någon annans vidarebefordran) tas inte över.
    const x = await adressForRum(db, { rumsnyckel: RUM_A, agareEpost: 'X@bolag.se' });
    assert.notEqual(x.nyckel, enhet.nyckel, 'den inloggade tog över enhetens adress');
    assert.equal(x.agare_epost, 'x@bolag.se');
    assert.equal(x.rum_hash, null, 'enhetens hash är redan enhetens');
    assert.equal(db.rader.find((r) => r.nyckel === enhet.nyckel).agare_epost, null, 'enhetens adress fick en ägare');
    // Samma e-post igen får samma adress; en annan e-post får en egen.
    assert.equal((await adressForRum(db, { rumsnyckel: RUM_A, agareEpost: 'x@bolag.se' })).nyckel, x.nyckel);
    const y = await adressForRum(db, { rumsnyckel: RUM_A, agareEpost: 'y@annat.se' });
    assert.ok(![enhet.nyckel, x.nyckel].includes(y.nyckel));
    // Uppslaget följer samma regel: Y ser Y:s adress, aldrig X:s eller enhetens — trots samma enhet.
    assert.equal((await hittaRumsadress(db, { rumsnyckel: RUM_A, agareEpost: 'y@annat.se' })).nyckel, y.nyckel);
    // Motprov: utan e-post är det enheten som gäller.
    assert.equal((await hittaRumsadress(db, { rumsnyckel: RUM_A })).nyckel, enhet.nyckel);
    // Omvänt: loggar någon in FÖRST på en ny dator får den ägda adressen ingen enhetshash — nästa utloggade
    // person på samma dator ser den aldrig.
    const db2 = fejkDb();
    const RUM_B = 'b'.repeat(32);
    const anna = await adressForRum(db2, { rumsnyckel: RUM_B, agareEpost: 'anna@x.se' });
    assert.equal(anna.rum_hash, null, 'den ägda adressen fick enhetens hash');
    assert.equal(await hittaRumsadress(db2, { rumsnyckel: RUM_B }), null, 'en utloggad på samma dator ser ägarens adress');
  });

  test('IA-16 · två samtidiga förfrågningar för samma ägare ger EN adress (motprov: enheten likaså)', async () => {
    const db = fejkDb();
    const forsta = await adressForRum(db, { agareEpost: 'kund@b.se' });
    // Kapplöpningen: den andra förfrågan läste «ingen adress» innan den första hann skriva.
    const blind = async (strings, ...v) => {
      const q = strings.join('?');
      if (/^\s*SELECT \* FROM inkorgsadresser WHERE (agare_epost|rum_hash) = \?/.test(q) && !blind.sett) { blind.sett = true; return []; }
      return db(strings, ...v);
    };
    const andra = await adressForRum(blind, { agareEpost: 'kund@b.se' });
    assert.equal(andra.nyckel, forsta.nyckel, 'kapplöpningen skapade en andra adress som rummet aldrig läser');
    assert.equal(db.rader.length, 1);
    const enhet = await adressForRum(db, { rumsnyckel: RUM_A });
    blind.sett = false;
    assert.equal((await adressForRum(blind, { rumsnyckel: RUM_A })).nyckel, enhet.nyckel);
    assert.match(las('scripts/migrate-v2.mjs'), /CREATE UNIQUE INDEX IF NOT EXISTS inkorgsadresser_agare_uniq ON inkorgsadresser \(agare_epost\) WHERE agare_epost IS NOT NULL/);
  });

  test('IA-15 · dagsgränsen är inget tekniskt fel, och ett adressjobb räknas en gång (källtext)', () => {
    const q = las('lib/ingest-queue.js');
    for (const fraga of [/sender=\$\{sender\} AND fingerprint IS NULL AND status IN \('pending','processing'\)/,
      /COUNT\(\*\)::int AS n FROM ingest_jobs WHERE sender=\$\{sender\} AND fingerprint IS NULL AND status='failed'/,
      /SELECT filename FROM ingest_jobs WHERE sender=\$\{sender\} AND fingerprint IS NULL AND status='failed'/,
      /WHERE sender=\$\{sender\} AND fingerprint IS NULL AND status='failed'\n\s*RETURNING id/]) {
      assert.match(q, fraga, `avsändarens fråga räknar rumsadressens jobb en gång till: ${fraga}`);
    }
    const h = las('api/invoice-history.mjs');
    assert.match(h, /adressAvvisadeFiler = fallna\.filter\(\(j\) => j\.error === DAGSGRANS_SKAL\)/);
    assert.match(h, /adressFallnaFiler = fallna\.filter\(\(j\) => j\.error !== DAGSGRANS_SKAL\)/);
    const k = las('api/inbound-email.mjs');
    assert.match(k, /\}\)\), DAGSGRANS_SKAL\) \?\? 0;/, 'bokföringen bär inte dagsgränsens skäl');
    const mejl = k.slice(k.indexOf("html: iRummet ? `"), k.indexOf("` : `<p>Hej,</p>"));
    assert.ok(mejl.length > 100, 'dagsgränsmejlet för rummet hittades inte');
    assert.match(mejl, /Försök igen/);
    assert.doesNotMatch(mejl, /skicka om/, 'mejlet säger «skicka om» medan rummet säger «inget nytt mejl behövs»');
    assert.ok(k.indexOf('bokfort = await bokforAvvisade(') < k.indexOf('html: iRummet'), 'mejlet skrivs innan bokföringen är känd');
  });

  test('IA-09 · telemetrin: detaljer bara ur den lagrade analysen jobbet pekar på', () => {
    const a = [{ id: '11111111-aaaa', supplier: 'Telia', line_items_json: [1, 2, 3], route: 'auto' }];
    const t = byggIntag([
      { filename: 'a.pdf', status: 'done', outcome: 'auto:mobil·lagrad#11111111-aaaa' },
      { filename: 'b.pdf', status: 'done', outcome: 'auto:mobil·lagrad#99999999-zzzz' },
      { filename: 'c.pdf', status: 'done', outcome: 'unsupported:larm-bevakning' },
      { filename: 'd.pdf', status: 'failed' }, { filename: 'e.pdf', status: 'processing' }, { filename: 'f.pdf', status: 'pending' },
    ], a);
    assert.deepEqual(t.filer[0], { fil: 'a.pdf', status: 'klar', leverantor: 'Telia', rader: 3, rutt: 'auto' });
    assert.deepEqual(t.filer[1], { fil: 'b.pdf', status: 'klar', leverantor: null, rader: null, rutt: 'auto' }, 'en saknad analys får aldrig en annan fils detaljer');
    assert.equal(t.filer[2].rutt, 'unsupported');
    assert.deepEqual([t.klara, t.fallna, t.lases, t.vantar], [3, 1, 1, 1]);
  });

  test('IA-10 · adress-API:t: oprövad e-post blir aldrig ägare; utan bevis ingen adress; rummet läser adressens rader', async () => {
    process.env.RESEND_API_KEY ??= 're_test';
    const { default: handler, rumsIdentitet } = await import('../api/inkorgsadress.mjs');
    const utanMagic = { magicTillEpost: async () => null };
    assert.equal(await rumsIdentitet({ rumsnyckel: 'kort', session: null, magic: null }, utanMagic), null);
    assert.deepEqual(await rumsIdentitet({ rumsnyckel: RUM_A }, utanMagic), { rumsnyckel: RUM_A, agareEpost: null });
    const kor = async (body, db) => {
      let status = null, svar = null;
      const res = { statusCode: 0, setHeader() {}, end(b) { status = this.statusCode; svar = JSON.parse(b); } };
      await handler({ method: 'POST', body }, res, { db, magicTillEpost: async (m) => (m === 'testmagic' ? 'testyta@arvoflow.se' : null) });
      return { status, svar };
    };
    assert.equal((await kor({ magic: 'testmagic' }, fejkDb())).status, 400, 'testrummet fick en egen adress');
    assert.equal((await kor({ epost: 'x@gmail.com' }, fejkDb())).status, 400, 'en e-post utan bevis öppnar ingen adress'); // hemlighet-ok: påhittad adress i en fixtur
    const db = fejkDb();
    const r = await kor({ rumsnyckel: RUM_A, epost: 'x@gmail.com' }, db); // hemlighet-ok: påhittad adress i en fixtur
    assert.equal(r.status, 200);
    assert.match(r.svar.adress.adress, /^faktura\+[a-z2-7]{16}@inbox\.arvoflow\.se$/);
    assert.equal(r.svar.adress.plattform, 'gmail', 'plattformen väljs ur den oprövade adressen …');
    assert.equal(db.rader[0].agare_epost, null, '… men den blir aldrig ägare');
    assert.equal(await plattformForEpost('kund@bolag.se', { posture: async () => ({ mx: 'microsoft365' }) }), 'microsoft365');
    const hist = las('api/invoice-history.mjs');
    assert.match(hist, /const merged = \[\.\.\.byEmail, \.\.\.byAdress, /, 'rummet slår inte in adressens analyser');
    assert.match(hist, /rumsadressForLasning\(dbA, \{ rumsnyckel: hasFp \? fp : null, agareEpost: email \}\)/);
  });
  test('IA-11 · kedjan enqueue → claimBatch → jobbIdentitet: bulkjobbet landar i rumsadressens rum', async () => {
    // Fejkdatabasen svarar BARA med de kolumner RETURNING-satsen namnger — annars prövar testet sitt eget indata.
    const tabell = [];
    const db = async (strings, ...v) => {
      const q = strings.join('?');
      if (/INSERT INTO ingest_jobs/.test(q)) {
        const [email_id, sender, filename, attachment_index, fingerprint, agare_epost] = v;
        tabell.push({ id: tabell.length + 1, email_id, sender, filename, attachment_index, attempts: 0, status: 'pending', fingerprint, agare_epost });
        return [{ id: tabell.length }];
      }
      if (/WITH claimed AS/.test(q)) {
        const kol = q.split('RETURNING')[1].split(',').map((c) => c.trim().replace(/^j\./, ''));
        return tabell.filter((r) => r.status === 'pending').map((r) => { r.status = 'processing'; r.attempts++; return Object.fromEntries(kol.map((c) => [c, r[c]])); });
      }
      return [];
    };
    await enqueueJobs([
      { emailId: 'e1', sender: 'faktura@telia.se', filename: 'a.pdf', attachmentIndex: 0, fingerprint: 'adress:abcdefghjkmnpq23', agareEpost: 'kund@b.se' },
      { emailId: 'e2', sender: 'kund@b.se', filename: 'b.pdf', attachmentIndex: 0 },
    ], { db });
    const jobb = await claimBatch(6, { db });
    assert.equal(jobb.length, 2);
    const sha = (s) => `h${s.length}`;
    assert.deepEqual(jobbIdentitet(jobb[0], sha), { fingerprint: 'adress:abcdefghjkmnpq23', email: 'kund@b.se', userEmail: 'kund@b.se' },
      'bulkjobbet till rumsadressen föll till avsändarens rum');
    // Motprov: ett jobb utan adress följer avsändaren, som förr.
    assert.deepEqual(jobbIdentitet(jobb[1], sha), { fingerprint: 'mail:h9', email: 'kund@b.se', userEmail: 'kund@b.se' });
  });
  test('IA-12 · rummets läsväg: bara en saknad tabell blir «ingen adress», allt annat är ett fel (motprov)', async () => {
    const kastar = (msg) => async () => { throw new Error(msg); };
    assert.equal(await rumsadressForLasning(kastar('relation "inkorgsadresser" does not exist'), { rumsnyckel: RUM_A }), null);
    await assert.rejects(rumsadressForLasning(kastar('connection terminated'), { rumsnyckel: RUM_A }), /connection terminated/,
      'ett läsfel blev ett rum utan adressens fakturor');
    const db = fejkDb();
    const enhet = await adressForRum(db, { rumsnyckel: RUM_A });
    assert.equal((await rumsadressForLasning(db, { rumsnyckel: RUM_A })).nyckel, enhet.nyckel);
  });
  test('IA-13 · över dagsgränsen: rumsadressens PDF:er bokförs som fallna och «Försök igen» når dem (motprov utan bevis)', async () => {
    const jobbrader = [];
    const bas = fejkDb();
    const db = async (strings, ...v) => {
      const q = strings.join('?');
      if (/INSERT INTO ingest_jobs/.test(q)) {
        const [email_id, sender, filename, attachment_index, attempts, error, fingerprint, agare_epost] = v;
        jobbrader.push({ email_id, sender, filename, attachment_index, status: 'failed', attempts, error, fingerprint, agare_epost });
        return [{ id: jobbrader.length }];
      }
      if (/UPDATE ingest_jobs SET status='pending'/.test(q)) {
        const trafade = jobbrader.filter((r) => r.fingerprint === v[0] && r.status === 'failed');
        trafade.forEach((r) => { r.status = 'pending'; r.attempts = 0; });
        return trafade.map((_, i) => ({ id: i }));
      }
      if (/ingest_jobs/.test(q)) return [];
      return bas(strings, ...v);
    };
    db.rader = bas.rader;
    const enhet = await adressForRum(db, { rumsnyckel: RUM_A });
    const fp = `adress:${enhet.nyckel}`;
    const n = await bokforAvvisade([{ emailId: 'e1', sender: 'faktura@telia.se', filename: 'a.pdf', attachmentIndex: 0, fingerprint: fp, agareEpost: null }], 'dagsgransen_nadd', { db });
    assert.equal(n, 1);
    assert.equal(jobbrader[0].status, 'failed');
    assert.ok(jobbrader[0].attempts >= 3, 'ett bokfört avvisat jobb får aldrig plockas av drainen på egen hand');
    const { default: retry } = await import('../api/ingest/retry.mjs');
    const kor = async (body) => {
      let status = null, svar = null;
      const res = { statusCode: 0, setHeader() {}, end(b) { status = this.statusCode; svar = JSON.parse(b); } };
      await retry({ method: 'POST', body }, res, { db, magicTillEpost: async () => null });
      return { status, svar };
    };
    assert.equal((await kor({})).status, 401, 'utan bevis körs ingenting om');
    const r = await kor({ rumsnyckel: RUM_A });
    assert.equal(r.status, 200);
    assert.equal(r.svar.requeued, 1, '«Försök igen» nådde inte rumsadressens fallna jobb');
    assert.equal(jobbrader[0].status, 'pending');
    const k = las('api/inbound-email.mjs');
    const gren = k.slice(k.indexOf('if (n > RATE_LIMIT_PER_DAY)'), k.indexOf("skipped: 'rate limit'"));
    assert.ok(gren.length > 200, 'rate limit-grenen hittades inte');
    assert.match(gren, /\n\s*let bokfort = 0;\n\s*if \(adress\) \{\n[^\n]*\n\s*bokfort = await bokforAvvisade\(/, 'dagsgränsen tappar rumsadressens mejl spårlöst');
    assert.match(gren, /if \(bokfort > 0\) varnad = true;/);
    assert.match(gren, /fingerprint: adress\.fingerprint/);
  });
  test('IA-14 · en vidarebefordran: rumsadressen hittas i kuvert och leveransrubrik, inte bara i To (motprov)', () => {
    const k = 'abcdefghjkmnpq23', a = `faktura+${k}@inbox.arvoflow.se`;
    assert.deepEqual(mottagarnyckel({ to: [a] }), { nyckel: k, falt: 'to' });
    assert.deepEqual(mottagarnyckel({ to: ['kund@bolag.se'], bcc: [a] }), { nyckel: k, falt: 'bcc' });
    assert.deepEqual(mottagarnyckel({ to: ['kund@bolag.se'], envelope: { to: [a] } }), { nyckel: k, falt: 'envelope.to' });
    assert.deepEqual(mottagarnyckel({ to: ['kund@bolag.se'], headers: { 'Delivered-To': a } }), { nyckel: k, falt: 'rubrik:delivered-to' });
    assert.deepEqual(mottagarnyckel({ to: 'kund@bolag.se', headers: [{ name: 'X-Forwarded-To', value: a }] }), { nyckel: k, falt: 'rubrik:x-forwarded-to' });
    // Motprov: en vidarebefordran till den gemensamma adressen är ingen rumsadress.
    assert.equal(mottagarnyckel({ to: ['kund@bolag.se'], headers: { 'Delivered-To': 'faktura@inbox.arvoflow.se' } }), null);
    assert.equal(mottagarnyckel(null), null);
  });
  test('IA-17 · det mottagna mejlet: «kunde inte läsa» skiljs från «ingen rumsadress» (motprov)', async () => {
    process.env.RESEND_API_KEY ??= 're_test';
    process.env.INBOUND_WEBHOOK_SECRET ??= 'test';
    const { hamtaMottaget } = await import('../api/inbound-email.mjs');
    const svar = (status, body = {}) => async () => ({ ok: status < 300, status, json: async () => body });
    assert.deepEqual(await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: svar(200, { to: ['a@b.se'] }) }), { mejl: { to: ['a@b.se'] }, skal: null, tillfalligt: false });
    assert.equal((await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: svar(503) })).tillfalligt, true);
    assert.equal((await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: svar(429) })).tillfalligt, true);
    assert.equal((await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: async () => { throw new Error('ECONNRESET'); } })).tillfalligt, true);
    const hang = (_, { signal }) => new Promise((_, rej) => signal.addEventListener('abort', () => rej(Object.assign(new Error('a'), { name: 'AbortError' }))));
    assert.deepEqual(await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: hang, tidsgransMs: 20 }), { mejl: null, skal: 'tidsgrans', tillfalligt: true });
    // Motprov: ett definitivt svar och en saknad nyckel är inte «tillfälligt» — gamla vägen får inte fastna i omleveranser.
    assert.equal((await hamtaMottaget('e1', { nyckel: 'k', fetchImpl: svar(404) })).tillfalligt, false);
    assert.equal((await hamtaMottaget('e1', { nyckel: null })).tillfalligt, false);
  });
});
