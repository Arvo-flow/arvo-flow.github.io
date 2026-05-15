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
  ResultHead, SavingsBlock, NoSwitchBlock, KV, Reasoning, NextSteps,
  ServiceList, EmailGate,
} from './styles';

const FOUNDING_WEBHOOK_URL = 'https://hook.eu1.make.com/39vtq7yfxeyojg2acnmmjxsq5a9gi3fb';
const ANALYS_WEBHOOK_URL   = 'https://hook.eu1.make.com/eeaax2i1k03cycl39zqlpdt9ixlu4o2x';

const MAX_PDF_SIZE = 3 * 1024 * 1024;

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
  el: 'Elavtal',
  mobil: 'Mobilabonnemang',
  bredband: 'Företagsbredband',
  'forsakring-foretag': 'Företagsförsäkring',
  'forsakring-ansvar': 'Yrkesansvarsförsäkring',
  leasing: 'Företagsleasing',
  kortterminal: 'Kortterminal',
  'faktura-tjanst': 'Fakturatjänst / Affärssystem',
  uncategorized: 'Okategoriserad',
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
    if (fileInputRef.current) fileInputRef.current.value = '';
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
                <span className="subtitle">
                  {CATEGORY_LABELS[result.categorized.category] || result.categorized.category}
                  {result.categorized.subType ? ` · ${result.categorized.subType}` : ''}
                </span>
              </div>
              <Button onClick={reset} $variant="secondary" $size="md">
                Testa en till
              </Button>
            </ResultHead>

            {result.recommendation.shouldSwitch && result.recommendation.netSaving > 0 ? (
              <SavingsBlock>
                <span className="kicker">
                  {result.categorized.licensePending
                    ? 'Möjlig årlig besparing'
                    : 'Din nettobesparing år 1'}
                </span>
                <span className="amount">+{formatKr(result.recommendation.netSaving)}</span>
                <span className="unit">
                  {result.categorized.licensePending
                    ? 'Försäkring kräver FI-licens — vi byter inte själva ännu, men visar gapet.'
                    : (
                      <>
                        Bruttobesparing {formatKr(result.recommendation.grossSaving)} −
                        Arvos fee {formatKr(result.recommendation.arvoFee)} (20 %)
                        {result.recommendation.suggestedSupplier && (
                          <><br />Föreslagen leverantör: <strong>{result.recommendation.suggestedSupplier}</strong></>
                        )}
                      </>
                    )}
                </span>
              </SavingsBlock>
            ) : (
              <NoSwitchBlock>
                <strong>Inget byte föreslås just nu.</strong>
                <p>{result.recommendation.reasoning}</p>
              </NoSwitchBlock>
            )}

            <KV>
              <div>
                <dt>Du betalar idag</dt>
                <dd>{formatKr(result.extracted.annualCost)} / år</dd>
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
              {result.recommendation.shouldSwitch && result.recommendation.suggestedAnnualCost && (
                <div className="full">
                  <dt>Arvo-volympris hos {result.recommendation.suggestedSupplier}</dt>
                  <dd>
                    {formatKr(result.recommendation.suggestedAnnualCost)} / år
                    <small>Baseras på Arvos samlade databas av förhandlade volymrabatter som sällan är tillgängliga för enskilda bolag vid direktkontakt.</small>
                  </dd>
                </div>
              )}
            </KV>

            {result.recommendation.reasoning && result.recommendation.shouldSwitch && (
              <Reasoning>
                <span className="kicker">Varför vi tror du kan spara</span>
                <p>{result.recommendation.reasoning}</p>
              </Reasoning>
            )}

            {result.recommendation.shouldSwitch && result.recommendation.netSaving > 0 && (
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
                  Du betalar 20 % av det vi faktiskt sparar — inget annat, inga fasta avgifter
                </li>
              </ServiceList>
            )}

            <NextSteps>
              <h3>Vill du att vi byter åt dig?</h3>
              <p>
                Med Arvo Flow kopplar du Fortnox en gång och vi sköter hela bytet
                — uppsägning, nytt avtal, signering. Du betalar bara 20 % av faktisk
                realiserad besparing.
              </p>
              <div className="actions">
                <Button as={Link} to="/connect" $variant="primary" $size="lg">
                  Koppla Fortnox <Icon name="arrow" size={18} />
                </Button>
                <Button as={Link} to="/" $variant="ghost" $size="lg">
                  Läs mer
                </Button>
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
    </Page>
  );
};

export default TestaFaktura;
