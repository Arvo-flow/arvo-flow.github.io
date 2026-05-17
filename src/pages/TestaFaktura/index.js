import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { formatKr } from '../../data/mockData';
import {
  Page, Hero, Eyebrow, Headline, Lede, Body, Card,
  Dropzone, FormRow, Field, SubmitRow, Disclaimer, ErrorBox, Spinner,
  ProgressList, ProgressItem,
  ResultHead, SavingsBlock, NoSwitchBlock, CreditAlert, PriceNote, PartnerBlock, KV,
  Reasoning, LicenseOverageNote, NextSteps, ServiceList, EmailGate,
  ModalOverlay, ModalCard,
} from './styles';

const formatNum = (n) => new Intl.NumberFormat('sv-SE', { maximumFractionDigits: 0 }).format(n);

const FOUNDING_WEBHOOK_URL = 'https://hook.eu1.make.com/39vtq7yfxeyojg2acnmmjxsq5a9gi3fb';
const ANALYS_WEBHOOK_URL   = 'https://hook.eu1.make.com/eeaax2i1k03cycl39zqlpdt9ixlu4o2x';

const MAX_PDF_SIZE = 3 * 1024 * 1024;

// Categories with verified public list prices — show supplier name proudly.
const REAL_PRICE_CATEGORIES = new Set(['saas-productivity', 'mobil']);

// Scrub the suggested supplier name from reasoning text so the tier/price
// analysis stays visible but the specific alternative brand stays hidden.
function redactSupplier(text, supplier) {
  if (!text || !supplier) return text;
  const words = supplier.split(/\s+/);
  const terms = [supplier];
  if (words[0].length >= 4) terms.push(words[0]);
  if (words.length >= 2) terms.push(`${words[0]} ${words[1]}`);
  let out = text;
  for (const term of [...new Set(terms)]) {
    out = out.replace(
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
      'Arvo-verifierad partner',
    );
  }
  return out;
}

// Category 2: contract-based benchmark prices — hide supplier, show verified partner.
const CATEGORY_PARTNER_LABEL = {
  el:                 'Kvalificerad Elleverantör',
  bredband:           'Kvalificerad Bredbandsoperatör',
  kortterminal:       'Kvalificerad Betaltjänstleverantör',
  'faktura-tjanst':   'Kvalificerad Affärssystemsleverantör',
  'leasing-bil':      'Kvalificerad Leasingpartner',
  skrivarleasing:     'Kvalificerad Print-leverantör',
  loneadmin:          'Kvalificerad Lönesystemleverantör',
  'larm-bevakning':   'Kvalificerad Säkerhetsleverantör',
  foretagshalsovard:  'Kvalificerad Hälsovårdspartner',
  bankavgifter:       'Kvalificerad Bankpartner',
  kontorsmaterial:    'Kvalificerad Förbrukningsleverantör',
  'städ-rengöring':   'Kvalificerad Städleverantör',
  'transport-frakt':  'Kvalificerad Fraktleverantör',
  'it-support':       'Kvalificerad IT-partner',
};

const INDUSTRY_LABELS = {
  ehandel:     'E-handel & Detaljhandel',
  tillverkning:'Industri & Tillverkning',
  'it-tech':   'IT, Tech & Mjukvara',
  bygg:        'Bygg, Hantverk & Fastighet',
  hotell:      'Hotell, Restaurang & Event',
  konsult:     'Konsult & Företagstjänster',
  transport:   'Transport & Logistik',
  vard:        'Vård, Omsorg & Hälsa',
  ovrigt:      'Övrigt / Annan bransch',
};

const CATEGORY_LABELS = {
  el:                  'Elavtal',
  mobil:               'Mobilabonnemang',
  bredband:            'Företagsbredband',
  'forsakring-foretag':'Företagsförsäkring',
  'forsakring-ansvar': 'Yrkesansvarsförsäkring',
  leasing:             'Företagsleasing',
  kortterminal:        'Kortterminal',
  'faktura-tjanst':    'Fakturatjänst / Affärssystem',
  'saas-productivity': 'Programvarulicenser / SaaS',
  'saas-creative':     'Kreativ mjukvara / Design',
  'saas-crm':          'CRM-system',
  'saas-finance':      'Affärssystem / Bokföring',
  'saas-other':        'Programvarulicenser / SaaS · övrigt',
  serverhosting:       'Serverhosting & Cloud-infrastruktur',
  utrustningsleasing:  'IT-utrustningsleasing',
  skrivarleasing:      'Skrivare & Managed Print',
  loneadmin:           'Löneadministration',
  'larm-bevakning':    'Larm & Bevakning',
  foretagshalsovard:   'Företagshälsovård',
  bankavgifter:        'Bankavgifter & Betaltjänster',
  kontorsmaterial:     'Kontorsmaterial & Förbrukning',
  'städ-rengöring':    'Städ & Rengöring',
  'transport-frakt':   'Transport & Frakt',
  'it-support':        'IT-drift & Support',
  uncategorized:       'Okategoriserad',
};

const PHASES = [
  { id: 'extract', label: 'Läser fakturan' },
  { id: 'categorize', label: 'Identifierar leverantör & kategori' },
  { id: 'recommend', label: 'Jämför mot branschindex' },
];

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const result = String(reader.result || '');
    const base64 = result.includes(',') ? result.split(',')[1] : result;
    resolve(base64);
  };
  reader.onerror = () => reject(new Error('Kunde inte läsa filen'));
  reader.readAsDataURL(file);
});

const TestaFaktura = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [industry, setIndustry] = useState('konsult');
  const [employees, setEmployees] = useState(5);
  const [revenue, setRevenue] = useState('');
  const [phase, setPhase] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [email, setEmail] = useState('');
  const [emailState, setEmailState] = useState('idle'); // idle | submitting | sent
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState('fortnox'); // fortnox | email
  const [modalEmail, setModalEmail] = useState('');
  const [modalEmailState, setModalEmailState] = useState('idle'); // idle | submitting | sent

  const validateAndSetFile = (f) => {
    setError(null);
    if (!f) return;
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Endast PDF-filer stöds.');
      return;
    }
    if (f.size > MAX_PDF_SIZE) {
      setError(`PDF är för stor (${(f.size / 1024 / 1024).toFixed(1)} MB). Max: 3 MB.`);
      return;
    }
    setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) validateAndSetFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = (e) => { e.preventDefault(); setDragActive(false); };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Välj en PDF-faktura först.');
      return;
    }

    setError(null);
    setResult(null);
    setPhase('uploading');

    // Advance progress phases on a timer so all 3 steps are visible.
    // Timers are cleared immediately if the real response arrives early.
    let t1, t2;
    try {
      const pdfBase64 = await fileToBase64(file);
      setPhase('extract');
      t1 = setTimeout(() => setPhase('categorize'), 3500);
      t2 = setTimeout(() => setPhase('recommend'),  6500);

      const res = await fetch('/api/test-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          industry,
          employees: Number(employees),
          revenue: revenue === '' ? null : Number(revenue),
        }),
      });

      clearTimeout(t1);
      clearTimeout(t2);

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || `Servern returnerade ${res.status}`);
      }

      setPhase('done');
      setResult(data);
    } catch (err) {
      clearTimeout(t1);
      clearTimeout(t2);
      setPhase(null);
      setError(err.message || 'Något gick fel. Försök igen.');
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setPhase(null);
    setError(null);
    setEmail('');
    setEmailState('idle');
    setModalOpen(false);
    setModalView('fortnox');
    setModalEmail('');
    setModalEmailState('idle');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submitModalEmail = async (e) => {
    e.preventDefault();
    if (!modalEmail || modalEmailState !== 'idle') return;
    setModalEmailState('submitting');
    try {
      await fetch(ANALYS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          type: 'unlock_supplier',
          email: modalEmail,
          supplier: result?.extracted?.supplier,
          category: result?.categorized?.category,
          annual_cost: result?.extracted?.annualCost,
          net_saving: result?.recommendation?.netSaving,
          suggested_annual_cost: result?.recommendation?.suggestedAnnualCost,
        }),
      });
    } catch { /* non-fatal */ }
    setModalEmailState('sent');
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!email || emailState !== 'idle') return;
    setEmailState('submitting');
    try {
      await fetch(ANALYS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          type: 'analys_pdf',
          email,
          supplier: result?.extracted?.supplier,
          category: result?.categorized?.category,
          annual_cost: result?.extracted?.annualCost,
          net_saving: result?.recommendation?.netSaving,
          suggested_supplier: result?.recommendation?.suggestedSupplier,
        }),
      });
    } catch { /* non-fatal */ }
    setEmailState('sent');
  };

  const phaseState = (id) => {
    if (!phase) return 'pending';
    if (phase === 'done') return 'done';
    const order = ['uploading', 'extract', 'categorize', 'recommend'];
    const currentIdx = order.indexOf(phase);
    const myIdx = order.indexOf(id);
    if (myIdx < currentIdx) return 'done';
    if (myIdx === currentIdx) return 'active';
    return 'pending';
  };

  const loading = phase && phase !== 'done';

  return (
    <Page>
      <Nav variant="public" />

      <Hero>
        <Eyebrow><span className="dot" /> Testa själv · Gratis · 10 sekunder</Eyebrow>
        <Headline>Ladda upp <em>en</em> leverantörsfaktura — få svar direkt.</Headline>
        <Lede>
          Vi visar exakt vad du betalar, hur du ligger mot branschsnittet och vad du kan
          spara om du byter. Inget Fortnox-konto behövs, ingen signering, ingen kostnad.
        </Lede>
      </Hero>

      <Body>
        {!result && (
          <Card>
            <form onSubmit={onSubmit}>
              <Dropzone
                $active={dragActive}
                $hasFile={!!file}
                onClick={() => fileInputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => validateAndSetFile(e.target.files?.[0])}
                />
                <div className="icon">
                  <Icon name={file ? 'check' : 'arrow'} size={26} stroke={2} />
                </div>
                {file ? (
                  <>
                    <strong className="primary">PDF vald</strong>
                    <span className="filename">{file.name} · {(file.size / 1024).toFixed(0)} kB</span>
                  </>
                ) : (
                  <>
                    <strong className="primary">Dra hit din faktura — eller klicka för att välja</strong>
                    <span className="secondary">PDF, max 3 MB. Vi sparar inte filen.</span>
                  </>
                )}
              </Dropzone>

              <FormRow>
                <Field>
                  <span className="label">Bransch</span>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                    {Object.entries(INDUSTRY_LABELS).map(([id, label]) => (
                      <option key={id} value={id}>{label}</option>
                    ))}
                  </select>
                </Field>
                <Field>
                  <span className="label">Antal anställda</span>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={employees}
                    onChange={(e) => setEmployees(e.target.value)}
                  />
                </Field>
              </FormRow>

              {error && <ErrorBox>{error}</ErrorBox>}

              <SubmitRow>
                <Button
                  type="submit"
                  $variant="gradient"
                  $size="lg"
                  $full
                  disabled={loading || !file}
                >
                  {loading ? (
                    <>
                      <Spinner /> Analyserar… (~10 sekunder)
                    </>
                  ) : (
                    <>
                      Analysera fakturan <Icon name="arrow" size={18} />
                    </>
                  )}
                </Button>
              </SubmitRow>

              {loading && (
                <ProgressList>
                  {PHASES.map((p) => {
                    const state = phaseState(p.id);
                    return (
                      <ProgressItem key={p.id} $state={state}>
                        <div className="bullet">
                          {state === 'done'
                            ? <Icon name="check" size={14} stroke={2.5} />
                            : <span>{PHASES.findIndex((x) => x.id === p.id) + 1}</span>}
                        </div>
                        <div className="label">{p.label}</div>
                        <div className="time">
                          {state === 'done' ? '✓' : state === 'active' ? '…' : ''}
                        </div>
                      </ProgressItem>
                    );
                  })}
                </ProgressList>
              )}

              <Disclaimer>
                Genom att fortsätta godkänner du våra <Link to="/villkor">villkor</Link>{' '}
                och vår <Link to="/integritet">integritetspolicy</Link>. Fakturan analyseras
                via AI och raderas omedelbart efter analysen.
              </Disclaimer>
            </form>
          </Card>
        )}

        {result && (
          <Card>
            <ResultHead>
              <div>
                <h2>{result.extracted.supplier}</h2>
                {result.categorized && (
                  <span className="subtitle">
                    {CATEGORY_LABELS[result.categorized.category] || result.categorized.category}
                    {result.categorized.subType ? ` · ${result.categorized.subType}` : ''}
                  </span>
                )}
              </div>
              <Button onClick={reset} $variant="secondary" $size="md">
                Testa en till
              </Button>
            </ResultHead>

            {result.route === 'unsupported' ? (
              <NoSwitchBlock>
                <strong>Utanför analysräckvidden.</strong>
                <p>
                  Denna faktura avser en tjänst vi inte optimerar (t.ex. juridik, redovisning,
                  bemanning eller myndighetsavgifter). Koppla Fortnox / Visma för att analysera era
                  övriga leverantörer.
                </p>
              </NoSwitchBlock>
            ) : result.route === 'review_queue' ? (
              <NoSwitchBlock>
                {result.reason === 'volume_data_required' ? (
                  <>
                    <strong>Kräver offert — våra experter kikar på detta.</strong>
                    <p>
                      {result.volumeDataNote ||
                        'Kostnaden för denna kategori styrs av specifika volymer och specifikationer, inte antalet anställda. Våra experter kikar på detta manuellt för att ge er en rättvis analys.'}
                    </p>
                    {result.creditExpiryMonths != null && (
                      <CreditAlert>
                        <strong>
                          Era startup-krediter räcker ca {result.creditExpiryMonths} {result.creditExpiryMonths === 1 ? 'månad' : 'månader'} till
                        </strong>
                        <p>
                          Ni förbrukar {result.startupCreditCurrency} {result.startupCreditMonthlyBurn?.toLocaleString('sv-SE')}/mån men
                          betalar ingenting tack vare kvarvarande kredit ({result.startupCreditCurrency} {result.startupCreditBalance?.toLocaleString('sv-SE')}).
                          Nu är rätt tid att planera ert molnavtal — vi hjälper er att förhandla rätt pris innan fakturorna börjar landa.
                        </p>
                      </CreditAlert>
                    )}
                  </>
                ) : result.reason === 'no_benchmark' ? (
                  <>
                    <strong>Utanför vår nuvarande täckning.</strong>
                    <p>
                      Vi har ännu inte benchmarkdata för denna leverantörskategori.
                      Vi noterar fakturan och återkommer när vi kan göra en fullständig analys.
                    </p>
                  </>
                ) : (
                  <>
                    <strong>Fakturan behöver djupare analys.</strong>
                    <p>
                      Vår algoritm är inte tillräckligt säker på klassificeringen för att
                      visa automatiska besparingssiffror. Koppla Fortnox / Visma för en komplett,
                      felfri analys av hela er leverantörsreskontra.
                    </p>
                  </>
                )}
              </NoSwitchBlock>
            ) : result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 ? (
              <>
                {(() => {
                  const isRealPrice = REAL_PRICE_CATEGORIES.has(result.categorized.category);
                  const isLicensePending = result.categorized.licensePending;
                  const partnerLabel = CATEGORY_PARTNER_LABEL[result.categorized.category] ?? 'Arvo-verifierad Partner';
                  return (
                    <>
                      <SavingsBlock>
                        <span className="kicker">
                          {isLicensePending ? 'Möjlig årlig besparing' : 'Din nettobesparing'}
                        </span>
                        <span className="amount">+{formatKr(result.recommendation.netSaving)}</span>
                        <span className="unit">
                          {isLicensePending
                            ? 'Försäkring kräver FI-licens — vi byter inte själva ännu, men visar gapet.'
                            : isRealPrice
                              ? (
                                <>
                                  {formatNum(result.extracted.annualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år hos <strong>{result.recommendation.suggestedSupplier}</strong>
                                  {' '}· Arvos fee {formatKr(result.recommendation.arvoFee)} (20 %)
                                </>
                              )
                              : (
                                <>
                                  {formatNum(result.extracted.annualCost)} → {formatNum(result.recommendation.suggestedAnnualCost)} kr/år (Arvos kalkylerade riktpris)
                                  {' '}· Arvos fee {formatKr(result.recommendation.arvoFee)} (20 %)
                                </>
                              )}
                        </span>
                      </SavingsBlock>
                      {!isLicensePending && (
                        <PriceNote $compact>
                          Detta pris baseras på Arvos samlade databas av förhandlade volymrabatter, vilket ger dig tillgång till prisnivåer som ligger utanför leverantörernas ordinarie listpriser.
                        </PriceNote>
                      )}
                      {result.recommendation.suggestedAnnualCost && !isLicensePending && (
                        <PartnerBlock>
                          <div className="left">
                            <span className="verified-badge">
                              <Icon name="check" size={12} stroke={2.5} />
                            </span>
                            <div>
                              <p className="partner-name">
                                {isRealPrice
                                  ? result.recommendation.suggestedSupplier
                                  : partnerLabel}
                              </p>
                              <p className="price-label">
                                {isRealPrice ? 'Verifierat marknadspris' : 'Arvos kalkylerade riktpris'}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            $variant="gradient"
                            $size="sm"
                            onClick={() => setModalOpen(true)}
                          >
                            {isRealPrice ? 'Aktivera bytet' : 'Säkra besparingen'} <Icon name="arrow" size={14} />
                          </Button>
                        </PartnerBlock>
                      )}
                    </>
                  );
                })()}
              </>
            ) : (
              <NoSwitchBlock>
                {result.categorized.category === 'uncategorized' ? (
                  <>
                    <strong>Kategorin är under analys.</strong>
                    <p>Koppla Fortnox / Visma så mappar vi era volymer mot marknadens bästa priser direkt.</p>
                  </>
                ) : (
                  <>
                    <strong>Inget byte föreslås just nu.</strong>
                    <p>{result.recommendation?.reasoning}</p>
                  </>
                )}
              </NoSwitchBlock>
            )}

            {result.route === 'auto' && <KV>
              <div>
                <dt>Du betalar idag</dt>
                <dd>
                  {formatKr(result.extracted.annualCost)} / år
                  {result.extracted.variableCharges > 0 && (
                    <small>Varav fasta abonnemang. Exkl. rörliga avgifter ({formatKr(result.extracted.variableCharges)}/mån).</small>
                  )}
                </dd>
              </div>
              <div>
                <dt>Fakturadatum</dt>
                <dd>{result.extracted.date}</dd>
              </div>
              <div>
                <dt>Belopp på fakturan (ex moms)</dt>
                <dd>{formatKr(result.extracted.amount)}</dd>
              </div>
              <div>
                <dt>Återkommande</dt>
                <dd>{result.extracted.recurring ? 'Ja (abonnemang / premie)' : 'Nej'}</dd>
              </div>
              {result.extracted.elUncertaintyNote && (
                <div>
                  <dt>Årsuppskattning</dt>
                  <dd>
                    <small>{result.extracted.elUncertaintyNote}</small>
                  </dd>
                </div>
              )}
              {result.extracted.elSkatterKr > 0 && (
                <div>
                  <dt>Skatter &amp; lagstadgade avgifter</dt>
                  <dd>
                    {formatKr(result.extracted.elSkatterKr)}
                    <small>Energiskatt, elcertifikat m.m. — ej förhandlingsbara, ingår ej i besparingskalkylen.</small>
                  </dd>
                </div>
              )}
              {result.extracted.variableCharges > 0 && (
                <div>
                  <dt>Rörliga avgifter denna period</dt>
                  <dd>
                    {formatKr(result.extracted.variableCharges)}
                    <small>{result.categorized?.category === 'el' ? 'Rörliga elkostnader — ej inkluderat i årsberäkningen.' : 'Roaming, övertrafik m.m. — ej inkluderat i årsberäkningen.'}</small>
                  </dd>
                </div>
              )}
            </KV>}

            {result.recommendation?.reasoning && result.recommendation?.shouldSwitch && (
              <Reasoning>
                <span className="kicker">Varför vi tror du kan spara</span>
                <p>
                  {REAL_PRICE_CATEGORIES.has(result.categorized.category)
                    ? result.recommendation.reasoning
                    : redactSupplier(
                        result.recommendation.reasoning,
                        result.recommendation.suggestedSupplier,
                      )}
                </p>
              </Reasoning>
            )}

            {result.recommendation?.licenseOverage > 0 && result.extracted.seatCount != null && (
              <LicenseOverageNote>
                <span className="kicker">Notering om licenser</span>
                <p>
                  Kalkylen ovan bygger på att vi behåller era {result.extracted.seatCount} licenser,
                  men sänker styckpriset genom att flytta er till rätt avtalsnivå. Vi noterar dock
                  att ni enligt uppgift är {employees} anställda. Om man dessutom hade städat bort
                  dessa {result.recommendation.licenseOverage} överflödiga licenser, hade er kostnad
                  sänkts ytterligare.
                </p>
              </LicenseOverageNote>
            )}

            {result.recommendation?.shouldSwitch && result.recommendation?.netSaving > 0 && (
              <ServiceList>
                <li>
                  <span className="check"><Icon name="check" size={11} stroke={2.8} /></span>
                  Vi säger upp ditt nuvarande avtal — inga samtal, inga väntetider
                </li>
                <li>
                  <span className="check"><Icon name="check" size={11} stroke={2.8} /></span>
                  Vi förhandlar med volymmakt och säkrar marknadens bästa pris åt dig
                </li>
                <li>
                  <span className="check"><Icon name="check" size={11} stroke={2.8} /></span>
                  Du betalar 20 % av identifierad besparing — en engångsavgift, inget annat
                </li>
                <li>
                  <span className="check"><Icon name="check" size={11} stroke={2.8} /></span>
                  Fr.o.m. år 2 tillfaller hela besparingen er
                </li>
              </ServiceList>
            )}

            <NextSteps>
              <h3>Låt Arvo sköta hela bytet</h3>
              <p>
                Med Arvo Flow kopplar du Fortnox / Visma en gång så sköter vi hela bytet – från
                uppsägning till nytt avtal och signering. Samtidigt identifierar vi
                automatiskt fler onödiga kostnader i resten av er leverantörsreskontra.
                Du betalar bara 20 % av identifierad besparing. Inga fasta avgifter.
              </p>
              <div className="actions">
                <div className="cta-row">
                  <Button as={Link} to="/connect" $variant="primary" $size="lg">
                    Koppla Fortnox / Visma <Icon name="arrow" size={16} />
                  </Button>
                  <Link to="/" className="read-more">Läs mer →</Link>
                </div>
                <div className="permission-card">
                  <div className="perm-header">
                    <span className="perm-icon"><Icon name="lock" size={16} stroke={2} /></span>
                    <strong>Vi får bara läsa, aldrig ändra</strong>
                  </div>
                  <div className="perm-cols">
                    <div>
                      <span className="perm-label">VAD VI LÄSER</span>
                      <ul>
                        <li>
                          <span className="perm-check"><Icon name="check" size={11} stroke={2.5} /></span>
                          Leverantörsfakturor
                        </li>
                        <li>
                          <span className="perm-check"><Icon name="check" size={11} stroke={2.5} /></span>
                          Kostnadshistorik &amp; förfallodatum
                        </li>
                      </ul>
                    </div>
                    <div>
                      <span className="perm-label">UTANFÖR VÅR RÄCKVIDD</span>
                      <ul>
                        <li>
                          <span className="perm-lock"><Icon name="lock" size={11} stroke={2} /></span>
                          Lön &amp; personnummer
                        </li>
                        <li>
                          <span className="perm-lock"><Icon name="lock" size={11} stroke={2} /></span>
                          Kundfakturor
                        </li>
                        <li>
                          <span className="perm-lock"><Icon name="lock" size={11} stroke={2} /></span>
                          Bokföring &amp; huvudbok
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </NextSteps>

            <EmailGate>
              <p className="label">📄 Ladda ner analysen som PDF</p>
              {emailState === 'sent' ? (
                <div className="sent">
                  <Icon name="check" size={16} stroke={2.5} />
                  Vi skickar analysen till {email} inom några minuter.
                </div>
              ) : (
                <form onSubmit={submitEmail}>
                  <div className="row">
                    <input
                      type="email"
                      placeholder="din@epost.se"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      $variant="secondary"
                      $size="md"
                      disabled={emailState === 'submitting'}
                    >
                      {emailState === 'submitting' ? 'Skickar…' : 'Skicka analysen'}
                    </Button>
                  </div>
                  <p className="note">Ingen spam. Vi skickar ett e-postmeddelande med din analys och hur vi kan hjälpa till.</p>
                </form>
              )}
            </EmailGate>
          </Card>
        )}
      </Body>

      <Footer />

      {modalOpen && result && (
        <ModalOverlay onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); setModalView('fortnox'); } }}>
          <ModalCard>
            <button className="close" onClick={() => { setModalOpen(false); setModalView('fortnox'); }} aria-label="Stäng">×</button>

            {modalEmailState === 'sent' ? (
              <div className="sent-state">
                <span className="sent-icon"><Icon name="check" size={20} stroke={2.5} /></span>
                <p className="sent-title">Vi hör av oss inom 24 timmar.</p>
                <p className="sent-sub">
                  Analysen och nästa steg skickas till {modalEmail}.
                </p>
              </div>
            ) : modalView === 'fortnox' ? (
              <>
                <h3>Säkra dina <em>{formatNum(result.recommendation.netSaving)} kr</em></h3>
                <p className="sub">
                  {REAL_PRICE_CATEGORIES.has(result.categorized.category)
                    ? <>För att vi ska kunna verkställa bytet till <strong>{result.recommendation.suggestedSupplier}</strong> – och automatiskt hitta fler onödiga kostnader – gör vi en säker och smidig synk med er Fortnox / Visma. Snabbt, tryggt och du har alltid full kontroll.</>
                    : 'För att vi ska få rätt underlag att vinna förhandlingen åt er – och automatiskt hitta fler onödiga kostnader – gör vi en säker och smidig synk med er Fortnox / Visma. Snabbt, tryggt och du har alltid full kontroll.'}
                </p>
                <div className="context-badge">
                  {CATEGORY_LABELS[result.categorized.category]} · {result.extracted.supplier}
                </div>
                <Button as={Link} to="/connect" $variant="primary" $size="lg" $full onClick={() => setModalOpen(false)}>
                  Koppla Fortnox / Visma <Icon name="arrow" size={16} />
                </Button>
                <button className="manual-link" type="button" onClick={() => setModalView('email')}>
                  Jag använder inte Fortnox, fortsätt manuellt via e-post.
                </button>
              </>
            ) : (
              <>
                <button className="back-link" type="button" onClick={() => setModalView('fortnox')}>
                  ← Tillbaka
                </button>
                <h3>Säkra dina <em>{formatNum(result.recommendation.netSaving)} kr</em></h3>
                <p className="sub">
                  Vi skickar analysen och leverantörsidentiteten direkt till er inkorg.
                </p>
                <div className="context-badge">
                  {CATEGORY_LABELS[result.categorized.category]} · {result.extracted.supplier}
                </div>
                <form className="modal-form" onSubmit={submitModalEmail}>
                  <input
                    type="email"
                    placeholder="din@epost.se"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    required
                    autoFocus
                  />
                  <Button
                    type="submit"
                    $variant="gradient"
                    $size="lg"
                    $full
                    disabled={modalEmailState === 'submitting'}
                  >
                    {modalEmailState === 'submitting' ? 'Skickar…' : <>Skicka analysen <Icon name="arrow" size={16} /></>}
                  </Button>
                  <p className="fine-print">Ingen spam. Inga fasta avgifter. Du betalar 20 % av identifierad besparing.</p>
                </form>
              </>
            )}
          </ModalCard>
        </ModalOverlay>
      )}
    </Page>
  );
};

export default TestaFaktura;
