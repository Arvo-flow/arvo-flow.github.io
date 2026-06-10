import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

// ─── animations ──────────────────────────────────────────────────────────────
const fadeUp = keyframes`from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}`;

// ─── styled ──────────────────────────────────────────────────────────────────
const Page    = styled.div`min-height:100vh;background:#0E1A17;color:#fff;font-family:system-ui,sans-serif;padding:32px 24px;`;
const H1      = styled.h1`font-size:24px;font-weight:800;letter-spacing:-.02em;margin:0 0 4px;`;
const Sub     = styled.p`font-size:13px;color:rgba(255,255,255,.45);margin:0 0 28px;`;
const Grid    = styled.div`display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:28px;@media(max-width:700px){grid-template-columns:1fr 1fr;}`;
const StatBox = styled.div`background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:16px 18px;`;
const SLabel  = styled.p`font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.4);margin:0 0 4px;`;
const SValue  = styled.p`font-size:22px;font-weight:800;color:#5DD6CA;margin:0;letter-spacing:-.02em;`;
const Section = styled.div`margin-bottom:28px;animation:${fadeUp} .4s ease both;`;
const STitle  = styled.h2`font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:0 0 10px;`;
const Table   = styled.div`background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;`;
const THead   = styled.div`display:grid;grid-template-columns:${({$cols})=>$cols};padding:10px 16px;background:rgba(255,255,255,.06);font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.4);gap:12px;`;
const TRow    = styled.div`display:grid;grid-template-columns:${({$cols})=>$cols};padding:11px 16px;border-top:1px solid rgba(255,255,255,.06);font-size:12.5px;gap:12px;align-items:center;&:hover{background:rgba(255,255,255,.03);}`;
const Tag     = styled.span`display:inline-block;padding:2px 8px;border-radius:100px;font-size:11px;font-weight:600;background:${({$c})=>$c??'rgba(255,255,255,.1)'};color:#fff;`;
const MagicForm = styled.form`display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;`;
const Input   = styled.input`padding:10px 14px;border-radius:100px;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#fff;font-size:13px;flex:1;min-width:200px;outline:none;&::placeholder{color:rgba(255,255,255,.3);}`;
const Btn     = styled.button`padding:10px 20px;border-radius:100px;border:none;cursor:pointer;font-size:13px;font-weight:700;background:linear-gradient(135deg,#5DD6CA,#1B6E66);color:#fff;white-space:nowrap;&:disabled{opacity:.5;cursor:not-allowed;}`;
const LinkBox = styled.div`margin-top:8px;background:rgba(93,214,202,.1);border:1px solid rgba(93,214,202,.25);border-radius:8px;padding:10px 14px;font-size:12px;color:#5DD6CA;word-break:break-all;`;
const LoginWrap = styled.div`max-width:360px;margin:80px auto;text-align:center;`;
const EmptyRow  = styled.p`padding:20px 16px;font-size:13px;color:rgba(255,255,255,.3);margin:0;`;

function fmtDate(iso) {
  if (!iso) return '–';
  return new Date(iso).toLocaleDateString('sv-SE', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
}

function fmtNum(n) {
  if (n == null) return '–';
  return Math.round(n).toLocaleString('sv-SE');
}

// ─── component ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [adminToken, setAdminToken]       = useState(() => sessionStorage.getItem('arvo_admin_token') ?? '');
  const [tokenInput, setTokenInput]       = useState('');
  const [authed, setAuthed]               = useState(false);
  const [data, setData]                   = useState(null);
  const [loadError, setLoadError]         = useState('');
  const [magicEmail, setMagicEmail]       = useState('');
  const [magicNote, setMagicNote]         = useState('');
  const [magicHours, setMagicHours]       = useState('72');
  const [magicLink, setMagicLink]         = useState('');
  const [magicState, setMagicState]       = useState('idle'); // idle | loading | done | error
  const [activeTab, setActiveTab]         = useState('queue'); // queue | waitlist | feedback | corrections
  const [migrState, setMigrState]         = useState('idle'); // idle | loading | done | error
  const [migrResult, setMigrResult]       = useState(null);
  const [corrections, setCorrections]     = useState(null);
  const [patterns, setPatterns]           = useState(null);
  const [corrView, setCorrView]           = useState('list'); // list | patterns | learning | market
  const [corrReasoning, setCorrReasoning]      = useState('');
  const [learningQueue, setLearningQueue]      = useState(null);
  const [marketData, setMarketData]            = useState(null);
  const [connections, setConnections]     = useState(null);
  const [connStats, setConnStats]         = useState(null);
  const [expandedQueueRow, setExpandedQueueRow] = useState(null);
  const [corrField, setCorrField]              = useState('category');
  const [corrValue, setCorrValue]              = useState('');
  const [corrReason, setCorrReason]            = useState('');
  const [corrSubmitting, setCorrSubmitting]    = useState(false);
  const [corrSuccess, setCorrSuccess]          = useState(null);
  const [prospects, setProspects]              = useState(null);
  const [prospectStats, setProspectStats]      = useState(null);
  const [newProspect, setNewProspect]          = useState({ companyName: '', sniCode: '', employees: '', contactEmail: '', sendEmail: false });
  const [createState, setCreateState]          = useState('idle');
  const [createResult, setCreateResult]        = useState(null);

  const load = useCallback(async (token) => {
    setLoadError('');
    try {
      const res  = await fetch('/api/admin/dashboard', { headers: { 'x-admin-token': token } });
      const json = await res.json();
      if (!res.ok) { setLoadError(json.error ?? 'Ej behörig'); return; }
      setData(json);
      setAuthed(true);
      sessionStorage.setItem('arvo_admin_token', token);
    } catch {
      setLoadError('Nätverksfel');
    }
  }, []);

  useEffect(() => {
    if (adminToken) load(adminToken);
  }, [adminToken, load]);

  async function login(e) {
    e.preventDefault();
    setAdminToken(tokenInput);
  }

  async function runMigration() {
    setMigrState('loading');
    setMigrResult(null);
    try {
      const res  = await fetch('/api/admin/run-migration', {
        method:  'POST',
        headers: { 'x-admin-token': adminToken },
      });
      const json = await res.json();
      setMigrResult(json);
      setMigrState(json.ok ? 'done' : 'error');
    } catch {
      setMigrState('error');
    }
  }

  async function generateMagicLink(e) {
    e.preventDefault();
    if (!magicEmail) return;
    setMagicState('loading');
    setMagicLink('');
    try {
      const res  = await fetch('/api/admin/magic-link', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body:    JSON.stringify({ email: magicEmail, note: magicNote || undefined, expiresInHours: Number(magicHours) }),
      });
      const json = await res.json();
      if (!res.ok) { setMagicState('error'); return; }
      setMagicLink(json.link);
      setMagicState('done');
    } catch {
      setMagicState('error');
    }
  }

  async function submitCorrection(row) {
    if (!corrValue || corrSubmitting) return;
    setCorrSubmitting(true);
    try {
      const originalValue = corrField === 'category' ? (row.category ?? '') :
                            corrField === 'recurring' ? 'false' : '';
      const res = await fetch('/api/admin/corrections', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
        body: JSON.stringify({
          analysisId:        row.id,
          field:             corrField,
          originalValue,
          correctedValue:    corrValue,
          reason:            corrReason || 'operator_manual_review',
          category:          corrField === 'category' ? corrValue : (row.category ?? null),
          supplier:          row.normalized_supplier || row.supplier || null,
          operatorReasoning: corrReasoning || null,
        }),
      });
      if (res.ok) {
        setCorrSuccess(row.id);
        setTimeout(() => {
          setCorrSuccess(null);
          setExpandedQueueRow(null);
          setCorrValue('');
          setCorrReason('');
          setCorrReasoning('');
          setCorrField('category');
        }, 2500);
      }
    } catch { /* silent */ } finally {
      setCorrSubmitting(false);
    }
  }

  const [prisbok, setPrisbok] = useState(null);
  const loadPrisbok = useCallback(() => {
    fetch('/api/admin/benchmark-stats', { headers: { 'x-admin-token': adminToken } })
      .then(r => r.json())
      .then(setPrisbok)
      .catch(() => {});
  }, [adminToken]);

  const loadProspects = useCallback(() => {
    fetch('/api/admin/prospects', { headers: { 'x-admin-token': adminToken } })
      .then(r => r.json())
      .then(j => { setProspects(j.prospects ?? []); setProspectStats(j.stats ?? {}); })
      .catch(() => {});
  }, [adminToken]);

  async function createProspect(e) {
    e.preventDefault();
    if (createState === 'loading' || !newProspect.companyName || !newProspect.employees) return;
    setCreateState('loading');
    setCreateResult(null);
    try {
      const res = await fetch('/api/generate-prospect', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'x-arvo-admin': adminToken },
        body:    JSON.stringify({
          companyName:  newProspect.companyName,
          sniCode:      newProspect.sniCode || undefined,
          employees:    Number(newProspect.employees),
          contactEmail: newProspect.contactEmail || undefined,
          sendEmail:    newProspect.sendEmail,
          createdBy:    'admin-ui',
        }),
      });
      const json = await res.json();
      setCreateResult(json);
      if (json.ok) {
        setNewProspect({ companyName: '', sniCode: '', employees: '', contactEmail: '', sendEmail: false });
        loadProspects();
      }
    } catch {
      setCreateResult({ ok: false, error: 'Nätverksfel' });
    } finally {
      setCreateState('idle');
    }
  }

  if (!authed) {
    return (
      <Page>
        <LoginWrap>
          <H1>Arvo Admin</H1>
          <Sub>Ange ADMIN_TOKEN för att fortsätta</Sub>
          {loadError && <p style={{ color: '#EF4444', fontSize: 13, marginBottom: 12 }}>{loadError}</p>}
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input
              type="password"
              placeholder="Admin-token"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{ borderRadius: 10, textAlign: 'center' }}
            />
            <Btn type="submit" disabled={!tokenInput}>Logga in →</Btn>
          </form>
        </LoginWrap>
      </Page>
    );
  }

  const s = data?.stats ?? {};

  const QUEUE_COLS  = '2fr 1.5fr 1fr 1fr 1fr 1.2fr 84px';
  const SEL_STYLE   = { padding:'6px 10px', borderRadius:8, border:'1.5px solid rgba(255,255,255,.15)', background:'rgba(255,255,255,.06)', color:'#fff', fontSize:12.5, cursor:'pointer', outline:'none' };
  const ALL_CATS    = ['saas-crm','saas-productivity','saas-finance','saas-devtools','saas-other','mobil','bredband','el','skrivarleasing','kortterminal','vaxel','loneadmin','utrustningsleasing','managed-workplace','larm-bevakning','foretagshalsovard','bankavgifter','forsakring-foretag','serverhosting','it-support','faktura-tjanst','leasing-bil'];
  const WAIT_COLS   = '2fr 1.5fr 1.5fr 1.5fr';
  const FB_COLS     = '2fr 1.5fr 0.5fr 2fr 1.5fr';

  return (
    <Page>
      <H1>Arvo Admin</H1>
      <Sub>Live-data från Neon Postgres · senast laddad {new Date().toLocaleTimeString('sv-SE')}</Sub>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <Grid>
        <StatBox><SLabel>Totalt analyserade</SLabel><SValue>{fmtNum(s.total_analyses)}</SValue></StatBox>
        <StatBox><SLabel>Auto (klara)</SLabel><SValue>{fmtNum(s.auto_count)}</SValue></StatBox>
        <StatBox><SLabel>Review queue</SLabel><SValue style={{ color: '#F59E0B' }}>{fmtNum(s.review_count)}</SValue></StatBox>
        <StatBox><SLabel>Unika användare</SLabel><SValue>{fmtNum(s.unique_users)}</SValue></StatBox>
        <StatBox><SLabel>Byten rekommenderade</SLabel><SValue>{fmtNum(s.switch_recommended)}</SValue></StatBox>
        <StatBox><SLabel>Snitt nettobesparing</SLabel><SValue>{fmtNum(s.avg_net_saving)} kr</SValue></StatBox>
        <StatBox><SLabel>Waitlist</SLabel><SValue>{data?.waitlist?.length ?? '–'}</SValue></StatBox>
        <StatBox><SLabel>Feedback</SLabel><SValue>{data?.feedback?.length ?? '–'}</SValue></StatBox>
      </Grid>

      {/* ── DB Migration ───────────────────────────────────────── */}
      <Section>
        <STitle>Databasmigration</STitle>
        <Table>
          <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,.6)', flex: 1 }}>
              Skapar tabellerna <code style={{ background: 'rgba(255,255,255,.1)', padding: '1px 6px', borderRadius: 4 }}>waitlist</code>,{' '}
              <code style={{ background: 'rgba(255,255,255,.1)', padding: '1px 6px', borderRadius: 4 }}>invoice_feedback</code> och{' '}
              <code style={{ background: 'rgba(255,255,255,.1)', padding: '1px 6px', borderRadius: 4 }}>magic_tokens</code> i databasen.
              Säkert att köra flera gånger (IF NOT EXISTS).
            </p>
            <Btn
              type="button"
              onClick={runMigration}
              disabled={migrState === 'loading'}
              style={{ background: migrState === 'done' ? '#16a34a' : undefined }}
            >
              {migrState === 'loading' ? 'Kör migration…'
                : migrState === 'done' ? '✓ Migration klar!'
                : 'Kör migration →'}
            </Btn>
          </div>
          {migrResult && (
            <div style={{ padding: '0 18px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {migrResult.results?.map((r) => (
                <div key={r.name} style={{ fontSize: 12, color: r.ok ? '#5DD6CA' : '#EF4444' }}>
                  {r.ok ? '✓' : '✗'} {r.name}{r.error ? ` — ${r.error}` : ''}
                </div>
              ))}
            </div>
          )}
        </Table>
      </Section>

      {/* ── Magic link-generator ───────────────────────────────── */}
      <Section>
        <STitle>Generera demo-länk (Magic Link)</STitle>
        <Table>
          <div style={{ padding: '16px 18px' }}>
            <p style={{ margin: '0 0 12px', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
              Skickar en tidsbegränsad länk som ger direktåtkomst utan gate.
            </p>
            <MagicForm onSubmit={generateMagicLink}>
              <Input type="email" placeholder="mottagare@foretag.se" value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)} required />
              <Input placeholder="Notering (frivillig)" value={magicNote}
                onChange={(e) => setMagicNote(e.target.value)} style={{ maxWidth: 200 }} />
              <Input type="number" placeholder="Timmar (default 72)" value={magicHours}
                onChange={(e) => setMagicHours(e.target.value)} style={{ maxWidth: 140 }} />
              <Btn type="submit" disabled={!magicEmail || magicState === 'loading'}>
                {magicState === 'loading' ? 'Genererar…' : 'Skicka magic link →'}
              </Btn>
            </MagicForm>
            {magicLink && (
              <LinkBox>
                ✓ Länk skickad till {magicEmail}<br />
                <strong>{magicLink}</strong>
              </LinkBox>
            )}
            {magicState === 'error' && <p style={{ color: '#EF4444', fontSize: 12, marginTop: 8 }}>Misslyckades — kontrollera ADMIN_TOKEN och RESEND_API_KEY.</p>}
          </div>
        </Table>
      </Section>

      {/* ── Tabs ───────────────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
        {[['queue','Review Queue'], ['waitlist','Waitlist'], ['feedback','Feedback'], ['corrections','Korrektioner 🧠'], ['connections','Anslutningar 🔗'], ['outbound','Outbound 🚀'], ['prisbok','Prisboken 📒']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)} style={{
            padding: '7px 16px', borderRadius: 100, border: 'none', cursor: 'pointer',
            fontSize: 12.5, fontWeight: 600,
            background: activeTab === id ? '#5DD6CA' : 'rgba(255,255,255,.08)',
            color: activeTab === id ? '#0E1A17' : 'rgba(255,255,255,.6)',
          }}>{label}</button>
        ))}
      </div>

      {activeTab === 'queue' && (
        <Section>
          <Table>
            <THead $cols={QUEUE_COLS}>
              <span>Leverantör</span><span>Kategori</span><span>Årskkostnad</span>
              <span>Bransch</span><span>Anställda</span><span>Datum</span><span>Åtgärd</span>
            </THead>
            {(data?.reviewQueue ?? []).length === 0 && <EmptyRow>Inga review_queue-fakturor ännu.</EmptyRow>}
            {(data?.reviewQueue ?? []).map((r) => (
              <React.Fragment key={r.id}>
                <TRow $cols={QUEUE_COLS}>
                  <span style={{ fontWeight: 600 }}>{r.supplier || r.normalized_supplier || '–'}</span>
                  <Tag $c="rgba(93,214,202,.15)">{r.category}</Tag>
                  <span>{fmtNum(r.annual_cost)} kr</span>
                  <span style={{ color: 'rgba(255,255,255,.5)' }}>{r.industry}</span>
                  <span style={{ color: 'rgba(255,255,255,.5)' }}>{r.employees}</span>
                  <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(r.created_at)}</span>
                  <button
                    onClick={() => {
                      const isOpen = expandedQueueRow === r.id;
                      setExpandedQueueRow(isOpen ? null : r.id);
                      setCorrValue(''); setCorrReason(''); setCorrField('category'); setCorrSuccess(null);
                    }}
                    style={{ padding:'4px 10px', borderRadius:100, border:'1px solid rgba(93,214,202,.3)', background: expandedQueueRow===r.id ? 'rgba(93,214,202,.15)' : 'transparent', color:'#5DD6CA', cursor:'pointer', fontSize:11.5, fontWeight:600 }}
                  >{expandedQueueRow === r.id ? '✕' : 'Korrigera'}</button>
                </TRow>
                {expandedQueueRow === r.id && (
                  <div style={{ padding:'14px 16px', borderTop:'1px solid rgba(93,214,202,.12)', background:'rgba(93,214,202,.03)' }}>
                    <p style={{ margin:'0 0 10px', fontSize:12, color:'rgba(255,255,255,.45)' }}>
                      Manuell korrektion — sparas som labeled data och tränar systemet.
                    </p>
                    <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
                      <select value={corrField} onChange={e => { setCorrField(e.target.value); setCorrValue(''); }} style={SEL_STYLE}>
                        <option value="category">Kategori</option>
                        <option value="recurring">Återkommande</option>
                        <option value="route">Route</option>
                      </select>
                      {corrField === 'category' && (
                        <select value={corrValue} onChange={e => setCorrValue(e.target.value)} style={SEL_STYLE}>
                          <option value="">Välj rätt kategori…</option>
                          {ALL_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      )}
                      {corrField === 'recurring' && (
                        <select value={corrValue} onChange={e => setCorrValue(e.target.value)} style={SEL_STYLE}>
                          <option value="">Välj…</option>
                          <option value="true">true (återkommande)</option>
                          <option value="false">false (engångskostnad)</option>
                        </select>
                      )}
                      {corrField === 'route' && (
                        <select value={corrValue} onChange={e => setCorrValue(e.target.value)} style={SEL_STYLE}>
                          <option value="">Välj…</option>
                          <option value="auto">auto</option>
                          <option value="review_queue">review_queue</option>
                          <option value="unsupported">unsupported</option>
                        </select>
                      )}
                      <Input
                        placeholder="Anledning (valfri)"
                        value={corrReason}
                        onChange={e => setCorrReason(e.target.value)}
                        style={{ flex:'1 1 140px', borderRadius:8, padding:'6px 12px', fontSize:12.5 }}
                      />
                      <Btn type="button" onClick={() => submitCorrection(r)} disabled={!corrValue || corrSubmitting} style={{ padding:'7px 18px', fontSize:12.5 }}>
                        {corrSubmitting ? 'Sparar…' : 'Spara →'}
                      </Btn>
                    </div>
                    <textarea
                      placeholder="Resonemang / princip (valfri men värdefullt — används som few-shot-exempel i AI:n nästa gång)"
                      value={corrReasoning}
                      onChange={e => setCorrReasoning(e.target.value)}
                      style={{ marginTop:8, width:'100%', boxSizing:'border-box', padding:'8px 12px', borderRadius:8, border:'1.5px solid rgba(255,255,255,.12)', background:'rgba(255,255,255,.05)', color:'#fff', fontSize:12, fontFamily:'inherit', resize:'vertical', minHeight:56, outline:'none' }}
                    />
                    {corrSuccess === r.id && (
                      <p style={{ color:'#5DD6CA', fontSize:12, margin:'8px 0 0' }}>✓ Korrektion sparad — systemet lär sig.</p>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'waitlist' && (
        <Section>
          <Table>
            <THead $cols={WAIT_COLS}><span>E-post</span><span>Källa</span><span>Reason</span><span>Datum</span></THead>
            {(data?.waitlist ?? []).length === 0 && <EmptyRow>Ingen waitlist ännu.</EmptyRow>}
            {(data?.waitlist ?? []).map((w) => (
              <TRow key={w.id} $cols={WAIT_COLS}>
                <span style={{ fontWeight: 600 }}>{w.email}</span>
                <Tag $c="rgba(245,158,11,.15)">{w.source}</Tag>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{w.reason ?? '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(w.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'feedback' && (
        <Section>
          <Table>
            <THead $cols={FB_COLS}><span>Leverantör</span><span>Kategori</span><span>Röst</span><span>Kommentar</span><span>Datum</span></THead>
            {(data?.feedback ?? []).length === 0 && <EmptyRow>Ingen feedback ännu.</EmptyRow>}
            {(data?.feedback ?? []).map((f) => (
              <TRow key={f.id} $cols={FB_COLS}>
                <span style={{ fontWeight: 600 }}>{f.supplier || '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{f.category ?? '–'}</span>
                <span style={{ fontSize: 18 }}>{f.vote === 'up' ? '👍' : '👎'}</span>
                <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 11.5 }}>{f.comment ?? '–'}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(f.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'corrections' && (
        <Section>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <STitle style={{ margin: 0 }}>Flywheel — Labeled Corrections</STitle>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {[['list','Lista'], ['patterns','Mönster'], ['learning','Aktiv inlärning 🔬'], ['market','Marknadsdata 📊']].map(([v, l]) => (
                <button key={v} onClick={() => {
                  setCorrView(v);
                  const hdr = { 'x-admin-token': adminToken };
                  if (v === 'patterns'  && !patterns)      fetch('/api/admin/corrections?patterns', { headers: hdr }).then(r => r.json()).then(j => setPatterns(j.patterns ?? [])).catch(() => {});
                  if (v === 'list'      && !corrections)   fetch('/api/admin/corrections',           { headers: hdr }).then(r => r.json()).then(j => setCorrections(j.corrections ?? [])).catch(() => {});
                  if (v === 'learning'  && !learningQueue) fetch('/api/admin/corrections?learning',  { headers: hdr }).then(r => r.json()).then(j => setLearningQueue(j.queue ?? [])).catch(() => {});
                  if (v === 'market'    && !marketData)    fetch('/api/admin/corrections?market',    { headers: hdr }).then(r => r.json()).then(j => setMarketData(j)).catch(() => {});
                }} style={{
                  padding: '5px 12px', borderRadius: 100, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                  background: corrView === v ? '#5DD6CA' : 'rgba(255,255,255,.08)',
                  color: corrView === v ? '#0E1A17' : 'rgba(255,255,255,.6)',
                }}>{l}</button>
              ))}
              <button onClick={() => {
                const hdr = { 'x-admin-token': adminToken };
                if (corrView === 'patterns')  fetch('/api/admin/corrections?patterns', { headers: hdr }).then(r => r.json()).then(j => setPatterns(j.patterns ?? [])).catch(() => {});
                if (corrView === 'list')      fetch('/api/admin/corrections',          { headers: hdr }).then(r => r.json()).then(j => setCorrections(j.corrections ?? [])).catch(() => {});
                if (corrView === 'learning')  fetch('/api/admin/corrections?learning', { headers: hdr }).then(r => r.json()).then(j => setLearningQueue(j.queue ?? [])).catch(() => {});
                if (corrView === 'market')    fetch('/api/admin/corrections?market',   { headers: hdr }).then(r => r.json()).then(j => setMarketData(j)).catch(() => {});
              }} style={{ padding: '5px 12px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.6)' }}>↻ Ladda</button>
            </div>
          </div>

          {corrView === 'list' && (
            <Table>
              <THead $cols="1fr 1fr 1fr 1fr 80px 110px">
                <span>Fält</span><span>Från</span><span>Till</span>
                <span>Anledning</span><span>Av</span><span>Datum</span>
              </THead>
              {corrections === null && <EmptyRow>Klicka ↻ Ladda för att hämta korrektioner.</EmptyRow>}
              {corrections?.length === 0 && <EmptyRow>Inga korrektioner ännu — systemet är nytt.</EmptyRow>}
              {(corrections ?? []).map((c) => (
                <React.Fragment key={c.id}>
                  <TRow $cols="1fr 1fr 1fr 1fr 80px 110px">
                    <Tag $c="rgba(93,214,202,.15)">{c.field}</Tag>
                    <span style={{ color: 'rgba(255,100,100,.8)', fontSize: 11.5 }}>{c.original_value || '–'}</span>
                    <span style={{ color: 'rgba(100,220,180,.8)', fontSize: 11.5 }}>{c.corrected_value || '–'}</span>
                    <span style={{ color: 'rgba(255,255,255,.45)', fontSize: 11 }}>{c.reason}</span>
                    <Tag $c={c.corrected_by === 'operator' ? 'rgba(245,158,11,.2)' : 'rgba(93,214,202,.1)'}>{c.corrected_by}</Tag>
                    <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>{fmtDate(c.created_at)}</span>
                  </TRow>
                  {c.operator_reasoning && (
                    <div style={{ padding: '6px 16px 10px', borderTop: '1px solid rgba(255,255,255,.04)', background: 'rgba(93,214,202,.02)' }}>
                      <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'rgba(93,214,202,.5)', marginRight: 8 }}>Princip</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,.55)' }}>{c.operator_reasoning}</span>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </Table>
          )}

          {corrView === 'patterns' && (
            <Table>
              <THead $cols="1fr 2fr 80px 80px">
                <span>Fält</span><span>Mönster (reason)</span><span>Antal</span><span>Av</span>
              </THead>
              {patterns === null && <EmptyRow>Klicka ↻ Ladda för att analysera mönster.</EmptyRow>}
              {patterns?.length === 0 && <EmptyRow>Inga mönster ännu.</EmptyRow>}
              {(patterns ?? []).map((p, i) => (
                <TRow key={i} $cols="1fr 2fr 80px 80px">
                  <Tag $c="rgba(93,214,202,.15)">{p.field}</Tag>
                  <span style={{ color: 'rgba(255,255,255,.6)', fontSize: 11.5 }}>{p.reason}</span>
                  <span style={{ fontWeight: 700, color: p.count >= 5 ? '#F59E0B' : '#5DD6CA' }}>{p.count}×</span>
                  <Tag $c={p.corrected_by === 'operator' ? 'rgba(245,158,11,.2)' : 'rgba(93,214,202,.1)'}>{p.corrected_by}</Tag>
                </TRow>
              ))}
            </Table>
          )}

          {corrView === 'learning' && (
            <>
              <div style={{ marginBottom: 12, padding: '10px 14px', background: 'rgba(245,158,11,.08)', border: '1px solid rgba(245,158,11,.2)', borderRadius: 10, fontSize: 12.5, color: 'rgba(255,255,255,.7)' }}>
                Leverantörer som inte matchar något känt fingerprint — flaggade automatiskt av pipeline. Lägg till korrektion för att lära systemet.
              </div>
              <Table>
                <THead $cols="2fr 80px 1.5fr">
                  <span>Leverantör (okänd)</span><span>Sedd</span><span>Senast</span>
                </THead>
                {learningQueue === null && <EmptyRow>Klicka ↻ Ladda för att hämta kön.</EmptyRow>}
                {learningQueue?.length === 0 && <EmptyRow>Inga okända leverantörer — systemet känner igen alla det sett.</EmptyRow>}
                {(learningQueue ?? []).map((item, i) => (
                  <TRow key={i} $cols="2fr 80px 1.5fr">
                    <span style={{ fontWeight: 600, color: '#F59E0B' }}>{item.supplier}</span>
                    <span style={{ fontWeight: 700, color: item.seen_count >= 3 ? '#EF4444' : '#F59E0B' }}>{item.seen_count}×</span>
                    <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(item.last_seen)}</span>
                  </TRow>
                ))}
              </Table>
            </>
          )}

          {corrView === 'market' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <STitle>Kategorifördelning (operatörskorrektioner)</STitle>
                  <Table>
                    <THead $cols="2fr 80px"><span>Kategori</span><span>Antal</span></THead>
                    {!marketData && <EmptyRow>Klicka ↻ Ladda.</EmptyRow>}
                    {marketData?.categoryDist?.length === 0 && <EmptyRow>Inga korrektioner ännu.</EmptyRow>}
                    {(marketData?.categoryDist ?? []).map((d, i) => (
                      <TRow key={i} $cols="2fr 80px">
                        <Tag $c="rgba(93,214,202,.15)">{d.category}</Tag>
                        <span style={{ fontWeight: 700, color: '#5DD6CA' }}>{d.count}×</span>
                      </TRow>
                    ))}
                  </Table>
                </div>
                <div>
                  <STitle>Mest korrigerade leverantörer</STitle>
                  <Table>
                    <THead $cols="2fr 80px 1fr"><span>Leverantör</span><span>Korr.</span><span>Senast</span></THead>
                    {!marketData && <EmptyRow>Klicka ↻ Ladda.</EmptyRow>}
                    {marketData?.topSuppliers?.length === 0 && <EmptyRow>Inga korrektioner ännu.</EmptyRow>}
                    {(marketData?.topSuppliers ?? []).map((s, i) => (
                      <TRow key={i} $cols="2fr 80px 1fr">
                        <span style={{ fontWeight: 600, fontSize: 12 }}>{s.supplier}</span>
                        <span style={{ fontWeight: 700, color: s.correction_count >= 5 ? '#F59E0B' : '#5DD6CA' }}>{s.correction_count}×</span>
                        <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>{fmtDate(s.last_corrected)}</span>
                      </TRow>
                    ))}
                  </Table>
                </div>
              </div>
              <STitle>Nya leverantörer per vecka (senaste 90 dagar)</STitle>
              {marketData?.discoveryTrend?.length > 0 ? (
                <Table>
                  <THead $cols="2fr 1fr"><span>Vecka</span><span>Ny leverantörer</span></THead>
                  {(marketData.discoveryTrend ?? []).map((d, i) => (
                    <TRow key={i} $cols="2fr 1fr">
                      <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>{d.week}</span>
                      <span style={{ fontWeight: 700, color: '#5DD6CA' }}>{d.new_suppliers}</span>
                    </TRow>
                  ))}
                </Table>
              ) : (
                <EmptyRow>{marketData ? 'Inga data ännu — skicka in fakturor för att bygga marknadsdata.' : 'Klicka ↻ Ladda.'}</EmptyRow>
              )}
            </>
          )}
        </Section>
      )}

      {activeTab === 'connections' && (
        <Section>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, alignItems: 'center' }}>
            <STitle style={{ margin: 0 }}>OAuth-anslutningar — Gmail &amp; Outlook</STitle>
            <button onClick={() => {
              fetch('/api/admin/connections', { headers: { 'x-admin-token': adminToken } })
                .then(r => r.json())
                .then(j => { setConnections(j.connections ?? []); setConnStats(j.stats ?? []); })
                .catch(() => {});
            }} style={{
              marginLeft: 'auto', padding: '5px 12px', borderRadius: 100, border: 'none',
              cursor: 'pointer', fontSize: 12, fontWeight: 600,
              background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.6)',
            }}>↻ Ladda</button>
          </div>

          {/* Provider-statistik */}
          {connStats && connStats.length > 0 && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              {connStats.map((s) => (
                <div key={s.provider} style={{
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 10, padding: '10px 16px', minWidth: 130,
                }}>
                  <SLabel>{s.provider}</SLabel>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#5DD6CA' }}>{s.total}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>totalt</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#4ADE80' }}>{s.active}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>aktiva</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B' }}>{s.last_7d}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.35)' }}>7 dagar</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Table>
            <THead $cols="2fr 1fr 1fr 1.5fr 1.5fr 80px">
              <span>E-post</span><span>Leverantör</span><span>Token</span>
              <span>Kopplad</span><span>Uppdaterad</span><span>Status</span>
            </THead>
            {connections === null && <EmptyRow>Klicka ↻ Ladda för att hämta anslutningar.</EmptyRow>}
            {connections?.length === 0 && <EmptyRow>Inga anslutningar ännu — ingen har kopplat Gmail/Outlook.</EmptyRow>}
            {(connections ?? []).map((c) => (
              <TRow key={c.id} $cols="2fr 1fr 1fr 1.5fr 1.5fr 80px">
                <span style={{ fontWeight: 600, fontSize: 12.5 }}>{c.email}</span>
                <Tag $c={c.provider === 'gmail' ? 'rgba(234,67,53,.2)' : 'rgba(0,120,212,.2)'}>
                  {c.provider}
                </Tag>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>
                  {c.token_expiry ? new Date(c.token_expiry).toLocaleDateString('sv-SE') : '–'}
                </span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(c.created_at)}</span>
                <span style={{ color: 'rgba(255,255,255,.4)', fontSize: 11.5 }}>{fmtDate(c.updated_at)}</span>
                <Tag $c={c.token_valid ? 'rgba(74,222,128,.2)' : 'rgba(239,68,68,.2)'}>
                  {c.token_valid ? 'OK' : 'Utgången'}
                </Tag>
              </TRow>
            ))}
          </Table>
        </Section>
      )}

      {activeTab === 'prisbok' && (
        <Section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <STitle style={{ margin: 0 }}>Prisbokens cellteckning</STitle>
            <button onClick={loadPrisbok} style={{ marginLeft: 'auto', padding: '6px 14px', borderRadius: 100, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)' }}>Uppdatera</button>
          </div>
          {!prisbok ? (
            <EmptyRow>Klicka Uppdatera för att läsa cellteckningen.</EmptyRow>
          ) : (
            <>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.55)', margin: '0 0 14px' }}>
                {prisbok.total_datapoints ?? 0} datapunkter totalt · {prisbok.segments_with_real_data ?? 0} celler bär (≥{prisbok.min_points_threshold}) ·
                celler nära tröskeln fylls medvetet — välj nästa outbound-lista på SNI-koder som tippar dem över.
              </p>
              <Table>
                <THead $cols="1.2fr 1fr .8fr .5fr .8fr"><span>Kategori</span><span>Bransch</span><span>Storlek</span><span>n</span><span>Status</span></THead>
                {(prisbok.segments ?? []).length === 0 && <EmptyRow>Prisboken är tom — varje analyserad faktura lägger en datapunkt.</EmptyRow>}
                {(prisbok.segments ?? []).map((c, i) => (
                  <TRow key={i} $cols="1.2fr 1fr .8fr .5fr .8fr">
                    <span style={{ fontWeight: 600 }}>{c.category}</span>
                    <span style={{ color: 'rgba(255,255,255,.6)' }}>{c.industry}</span>
                    <span style={{ color: 'rgba(255,255,255,.5)' }}>{c.size_bucket}</span>
                    <span style={{ fontWeight: 700 }}>{c.n}</span>
                    <Tag $c={c.status === 'BÄR' ? 'rgba(93,214,202,.2)' : c.status === 'LIVE-LIGHT' ? 'rgba(93,214,202,.12)' : c.status === 'NÄRA' ? 'rgba(245,158,11,.15)' : 'rgba(255,255,255,.08)'}>{c.status}</Tag>
                  </TRow>
                ))}
              </Table>
            </>
          )}
        </Section>
      )}

      {activeTab === 'outbound' && (
        <Section>
          {/* ── Prospect stats ──────────────────────────────────── */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {[
              ['Skapade', prospectStats?.total, '#5DD6CA'],
              ['Mail skickade', prospectStats?.email_sent, '#5DD6CA'],
              ['Öppnade länken', prospectStats?.opened, '#F59E0B'],
              ['Konverterade', prospectStats?.converted, '#4ADE80'],
            ].map(([label, val, color]) => (
              <StatBox key={label} style={{ minWidth: 120 }}>
                <SLabel>{label}</SLabel>
                <SValue style={{ color }}>{val ?? '–'}</SValue>
              </StatBox>
            ))}
          </div>

          {/* ── Create form ─────────────────────────────────────── */}
          <STitle>Skapa prospect</STitle>
          <Table>
            <div style={{ padding: '16px 18px' }}>
              <form onSubmit={createProspect} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <Input placeholder="Bolagsnamn *" value={newProspect.companyName}
                  onChange={e => setNewProspect(p => ({ ...p, companyName: e.target.value }))}
                  style={{ minWidth: 180, borderRadius: 8 }} />
                <Input placeholder="SNI-kod (t.ex. 41)" value={newProspect.sniCode}
                  onChange={e => setNewProspect(p => ({ ...p, sniCode: e.target.value }))}
                  style={{ width: 130, borderRadius: 8 }} />
                <Input placeholder="Antal anst. *" type="number" value={newProspect.employees}
                  onChange={e => setNewProspect(p => ({ ...p, employees: e.target.value }))}
                  style={{ width: 110, borderRadius: 8 }} />
                <Input placeholder="Kontakt-mail" value={newProspect.contactEmail}
                  onChange={e => setNewProspect(p => ({ ...p, contactEmail: e.target.value }))}
                  style={{ minWidth: 200, borderRadius: 8 }} />
                <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'rgba(255,255,255,.6)', whiteSpace:'nowrap', cursor:'pointer' }}>
                  <input type="checkbox" checked={newProspect.sendEmail}
                    onChange={e => setNewProspect(p => ({ ...p, sendEmail: e.target.checked }))} />
                  Skicka mail
                </label>
                <Btn type="submit" disabled={createState === 'loading' || !newProspect.companyName || !newProspect.employees}>
                  {createState === 'loading' ? '…' : 'Skapa →'}
                </Btn>
              </form>
              {createResult && (
                <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 8,
                  background: createResult.ok ? 'rgba(74,222,128,.1)' : 'rgba(239,68,68,.1)',
                  border: `1px solid ${createResult.ok ? 'rgba(74,222,128,.25)' : 'rgba(239,68,68,.25)'}` }}>
                  {createResult.ok ? (
                    <span style={{ fontSize: 12.5, color: '#4ADE80' }}>
                      ✓ Skapad:&nbsp;
                      <a href={createResult.url} target="_blank" rel="noopener noreferrer"
                        style={{ color: '#5DD6CA', wordBreak: 'break-all' }}>{createResult.url}</a>
                      {createResult.emailSent && ' · mail skickat'}
                    </span>
                  ) : (
                    <span style={{ fontSize: 12.5, color: '#F87171' }}>Fel: {createResult.error}</span>
                  )}
                </div>
              )}
            </div>
          </Table>

          {/* ── Prospect list ────────────────────────────────────── */}
          <div style={{ display:'flex', gap:8, marginBottom:12, marginTop:20, alignItems:'center' }}>
            <STitle style={{ margin:0 }}>Prospects</STitle>
            <button onClick={loadProspects} style={{
              marginLeft:'auto', padding:'5px 12px', borderRadius:100, border:'none',
              cursor:'pointer', fontSize:12, fontWeight:600,
              background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.6)',
            }}>↻ Ladda</button>
          </div>
          <Table>
            <THead $cols="2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr">
              <span>Bolag</span><span>Bransch</span><span>Anst.</span>
              <span>Mail skickat</span><span>Öppnat</span><span>Åtgärd</span><span>Skapad</span>
            </THead>
            {prospects === null && <EmptyRow>Klicka ↻ Ladda för att hämta prospects.</EmptyRow>}
            {prospects?.length === 0 && <EmptyRow>Inga prospects än — skapa ett ovan.</EmptyRow>}
            {(prospects ?? []).map((p) => (
              <TRow key={p.id} $cols="2fr 1.5fr 0.6fr 1.3fr 1.3fr 1fr 1fr">
                <span style={{ fontWeight:600, fontSize:12.5 }}>{p.company_name}</span>
                <span style={{ fontSize:11.5, color:'rgba(255,255,255,.50)' }}>{p.industry}</span>
                <span style={{ fontSize:12 }}>{p.employees}</span>
                <span style={{ fontSize:11, color: p.email_sent_at ? 'rgba(255,255,255,.5)' : 'rgba(255,255,255,.2)' }}>
                  {fmtDate(p.email_sent_at)}
                </span>
                <span style={{ fontSize:11, color: p.opened_at ? '#F59E0B' : 'rgba(255,255,255,.2)' }}>
                  {fmtDate(p.opened_at)}
                </span>
                <Tag $c={
                  p.action === 'upload'   ? 'rgba(74,222,128,.25)' :
                  p.action === 'activate' ? 'rgba(93,214,202,.25)' :
                  'rgba(255,255,255,.07)'
                }>{p.action ?? '–'}</Tag>
                <span style={{ fontSize:11, color:'rgba(255,255,255,.30)' }}>{fmtDate(p.created_at)}</span>
              </TRow>
            ))}
          </Table>
        </Section>
      )}
    </Page>
  );
}
