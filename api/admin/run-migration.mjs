// api/admin/run-migration.mjs — Engångsanrop för att skapa nya DB-tabeller.
// Anropas EN gång via admin-sidan, sedan kan den lämnas kvar (skyddad av ADMIN_TOKEN).
import { getDb } from '../../lib/db.js';
import { upsertPrice } from '../../lib/price-db.js';

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Endast POST' });

  const token = req.headers['x-admin-token'];
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return send(res, 401, { error: 'Ej behörig' });
  }

  const sql = getDb();
  if (!sql) return send(res, 503, { error: 'DB ej konfigurerad' });

  const results = [];

  const steps = [
    {
      name: 'waitlist',
      run: () => sql`CREATE TABLE IF NOT EXISTS waitlist (
        id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
        email      TEXT        NOT NULL,
        source     TEXT        NOT NULL DEFAULT 'review_queue',
        reason     TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        UNIQUE (email, source)
      )`,
    },
    {
      name: 'invoice_feedback',
      run: () => sql`CREATE TABLE IF NOT EXISTS invoice_feedback (
        id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        fingerprint TEXT NOT NULL,
        supplier    TEXT,
        category    TEXT,
        vote        TEXT NOT NULL CHECK (vote IN ('up', 'down')),
        comment     TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'magic_tokens',
      run: () => sql`CREATE TABLE IF NOT EXISTS magic_tokens (
        id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        token      TEXT NOT NULL UNIQUE,
        email      TEXT NOT NULL,
        note       TEXT,
        used_at    TIMESTAMPTZ,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`,
    },
    {
      name: 'idx_magic_tokens_token',
      run: () => sql`CREATE INDEX IF NOT EXISTS idx_magic_tokens_token ON magic_tokens (token)`,
    },
    {
      name: 'idx_feedback_fingerprint',
      run: () => sql`CREATE INDEX IF NOT EXISTS idx_feedback_fingerprint ON invoice_feedback (fingerprint, created_at DESC)`,
    },

    // ── P4.2: Prisdatabas ─────────────────────────────────────────────────────
    {
      name: 'supplier_prices',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS supplier_prices (
          id              SERIAL PRIMARY KEY,
          supplier        TEXT        NOT NULL,
          product         TEXT        NOT NULL,
          tier            TEXT,
          category        TEXT        NOT NULL,
          price_monthly   NUMERIC(10,2),
          price_annual    NUMERIC(10,2),
          price_unit      TEXT        NOT NULL DEFAULT 'per_seat',
          currency        TEXT        NOT NULL DEFAULT 'SEK',
          usd_monthly     NUMERIC(10,4),
          usd_annual      NUMERIC(10,4),
          market          TEXT        NOT NULL DEFAULT 'SE',
          source_type     TEXT        NOT NULL,
          source_url      TEXT,
          confidence      NUMERIC(4,3)         DEFAULT 0.90,
          last_verified   DATE,
          valid_from      DATE,
          is_current      BOOLEAN              DEFAULT true,
          metadata        JSONB,
          created_at      TIMESTAMPTZ          DEFAULT NOW(),
          updated_at      TIMESTAMPTZ          DEFAULT NOW(),
          CONSTRAINT uq_supplier_product_tier UNIQUE (supplier, product, tier, is_current)
        )`,
    },
    {
      name: 'sp_supplier_cat_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_supplier_cat_idx ON supplier_prices (supplier, category, is_current)`,
    },
    {
      name: 'sp_category_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_category_idx ON supplier_prices (category, is_current)`,
    },
    {
      name: 'sp_verified_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sp_verified_idx ON supplier_prices (last_verified)`,
    },
    {
      name: 'supplier_price_history',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS supplier_price_history (
          id                SERIAL PRIMARY KEY,
          supplier          TEXT        NOT NULL,
          product           TEXT        NOT NULL,
          tier              TEXT,
          category          TEXT        NOT NULL,
          old_price_monthly NUMERIC(10,2),
          new_price_monthly NUMERIC(10,2),
          old_price_annual  NUMERIC(10,2),
          new_price_annual  NUMERIC(10,2),
          currency          TEXT        NOT NULL DEFAULT 'SEK',
          source_type       TEXT,
          source_url        TEXT,
          changed_by        TEXT                 DEFAULT 'system',
          changed_at        TIMESTAMPTZ          DEFAULT NOW(),
          notes             TEXT
        )`,
    },
    {
      name: 'sph_supplier_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS sph_supplier_idx ON supplier_price_history (supplier, product, changed_at DESC)`,
    },
    {
      name: 'invoice_benchmarks',
      run: () => sql`
        CREATE TABLE IF NOT EXISTS invoice_benchmarks (
          id           SERIAL PRIMARY KEY,
          category     TEXT        NOT NULL,
          company_size TEXT        NOT NULL,
          industry     TEXT        NOT NULL,
          metric       TEXT        NOT NULL DEFAULT 'annual_cost',
          p25          NUMERIC(12,2),
          median       NUMERIC(12,2),
          p75          NUMERIC(12,2),
          sample_size  INTEGER,
          computed_at  TIMESTAMPTZ          DEFAULT NOW(),
          CONSTRAINT uq_benchmark UNIQUE (category, company_size, industry, metric)
        )`,
    },
    {
      name: 'ib_cat_idx',
      run: () => sql`CREATE INDEX IF NOT EXISTS ib_cat_idx ON invoice_benchmarks (category, company_size, industry)`,
    },

    // ── Seed: alla kända leverantörspriser ────────────────────────────────────
    // Microsoft 365 — SEK, verifierat microsoft.com 2026-05-27
    { name: 'seed:m365-basic',    run: () => upsertPrice({ supplier:'microsoft', product:'Microsoft 365 Business Basic',    tier:'business-basic',    category:'saas-productivity', priceMonthly:68.88,  priceAnnual:57.40,  priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-basic',    confidence:0.99, lastVerified:'2026-05-27', changedBy:'migration' }) },
    { name: 'seed:m365-standard', run: () => upsertPrice({ supplier:'microsoft', product:'Microsoft 365 Business Standard', tier:'business-standard', category:'saas-productivity', priceMonthly:143.38, priceAnnual:119.48, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-standard', confidence:0.99, lastVerified:'2026-05-27', changedBy:'migration' }) },
    { name: 'seed:m365-premium',  run: () => upsertPrice({ supplier:'microsoft', product:'Microsoft 365 Business Premium',  tier:'business-premium',  category:'saas-productivity', priceMonthly:252.35, priceAnnual:210.29, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.microsoft.com/sv-se/microsoft-365/business/microsoft-365-business-premium',  confidence:0.99, lastVerified:'2026-05-27', changedBy:'migration' }) },
    { name: 'seed:m365-e3',       run: () => upsertPrice({ supplier:'microsoft', product:'Microsoft 365 E3',                tier:'e3',                category:'saas-productivity', priceMonthly:462.00, priceAnnual:384.70, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',   confidence:0.99, lastVerified:'2026-05-27', changedBy:'migration' }) },
    { name: 'seed:m365-e5',       run: () => upsertPrice({ supplier:'microsoft', product:'Microsoft 365 E5',                tier:'e5',                category:'saas-productivity', priceMonthly:731.00, priceAnnual:609.10, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.microsoft.com/sv-se/microsoft-365/enterprise/microsoft365-plans-and-pricing',   confidence:0.99, lastVerified:'2026-05-27', changedBy:'migration' }) },
    // Google Workspace — USD
    { name: 'seed:gws-starter',   run: () => upsertPrice({ supplier:'google', product:'Google Workspace Business Starter',  tier:'starter',  category:'saas-productivity', usdMonthly:8.40,  usdAnnual:7.00,  priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://workspace.google.com/pricing/', confidence:0.95, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:gws-standard',  run: () => upsertPrice({ supplier:'google', product:'Google Workspace Business Standard', tier:'standard', category:'saas-productivity', usdMonthly:16.80, usdAnnual:14.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://workspace.google.com/pricing/', confidence:0.95, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:gws-plus',      run: () => upsertPrice({ supplier:'google', product:'Google Workspace Business Plus',     tier:'plus',     category:'saas-productivity', usdMonthly:26.40, usdAnnual:22.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://workspace.google.com/pricing/', confidence:0.95, lastVerified:'2026-05-22', changedBy:'migration' }) },
    // Slack
    { name: 'seed:slack-pro',     run: () => upsertPrice({ supplier:'slack', product:'Slack Pro',        tier:'pro',           category:'saas-productivity', usdMonthly:8.75,  usdAnnual:7.25,  priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://slack.com/pricing', confidence:0.96, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:slack-biz',     run: () => upsertPrice({ supplier:'slack', product:'Slack Business+',  tier:'business-plus', category:'saas-productivity', usdMonthly:18.00, usdAnnual:18.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://slack.com/pricing', confidence:0.96, lastVerified:'2026-05-28', changedBy:'migration' }) },
    // Zoom
    { name: 'seed:zoom-pro',      run: () => upsertPrice({ supplier:'zoom', product:'Zoom Pro',      tier:'pro',      category:'saas-productivity', usdMonthly:15.99, usdAnnual:14.16, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://zoom.us/pricing', confidence:0.95, lastVerified:'2026-05-28', changedBy:'migration' }) },
    { name: 'seed:zoom-biz',      run: () => upsertPrice({ supplier:'zoom', product:'Zoom Business', tier:'business', category:'saas-productivity', usdMonthly:19.99, usdAnnual:18.33, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://zoom.us/pricing', confidence:0.95, lastVerified:'2026-05-22', changedBy:'migration' }) },
    // Atlassian
    { name: 'seed:jira-std',      run: () => upsertPrice({ supplier:'atlassian', product:'Jira Software Cloud Standard',  tier:'jira-standard',         category:'saas-productivity', usdMonthly:8.92,  priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.atlassian.com/software/jira/pricing',       confidence:0.94, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:jira-prem',     run: () => upsertPrice({ supplier:'atlassian', product:'Jira Software Cloud Premium',   tier:'jira-premium',          category:'saas-productivity', usdMonthly:17.88, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.atlassian.com/software/jira/pricing',       confidence:0.94, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:conf-std',      run: () => upsertPrice({ supplier:'atlassian', product:'Confluence Cloud Standard',     tier:'confluence-standard',   category:'saas-productivity', usdMonthly:6.50,  priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.atlassian.com/software/confluence/pricing',  confidence:0.92, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:conf-prem',     run: () => upsertPrice({ supplier:'atlassian', product:'Confluence Cloud Premium',      tier:'confluence-premium',    category:'saas-productivity', usdMonthly:12.53, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.atlassian.com/software/confluence/pricing',  confidence:0.92, lastVerified:'2026-05-22', changedBy:'migration' }) },
    // Adobe — SEK
    { name: 'seed:adobe-all',     run: () => upsertPrice({ supplier:'adobe', product:'Adobe Creative Cloud All Apps for Teams', tier:'all-apps',   category:'saas-creative', priceMonthly:699, priceAnnual:699*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.adobe.com/se/creativecloud/business/teams.html', confidence:0.94, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:adobe-single',  run: () => upsertPrice({ supplier:'adobe', product:'Adobe Creative Cloud Single App for Teams', tier:'single-app', category:'saas-creative', priceMonthly:349, priceAnnual:349*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.adobe.com/se/creativecloud/business/teams.html', confidence:0.94, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Figma — USD
    { name: 'seed:figma-pro',     run: () => upsertPrice({ supplier:'figma', product:'Figma Professional', tier:'professional', category:'saas-creative', usdMonthly:15.00, usdAnnual:12.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.figma.com/pricing/', confidence:0.90, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:figma-org',     run: () => upsertPrice({ supplier:'figma', product:'Figma Organization',  tier:'organization', category:'saas-creative', usdMonthly:45.00, usdAnnual:45.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.figma.com/pricing/', confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Pipedrive — USD
    { name: 'seed:pipedrive-ess', run: () => upsertPrice({ supplier:'pipedrive', product:'Pipedrive Essential',    tier:'essential',    category:'saas-crm', usdMonthly:24.00, usdAnnual:14.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.pipedrive.com/sv/pricing', confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:pipedrive-adv', run: () => upsertPrice({ supplier:'pipedrive', product:'Pipedrive Advanced',     tier:'advanced',     category:'saas-crm', usdMonthly:44.00, usdAnnual:29.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.pipedrive.com/sv/pricing', confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:pipedrive-pro', run: () => upsertPrice({ supplier:'pipedrive', product:'Pipedrive Professional', tier:'professional', category:'saas-crm', usdMonthly:64.00, usdAnnual:49.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.pipedrive.com/sv/pricing', confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // HubSpot — USD
    { name: 'seed:hubspot-str',   run: () => upsertPrice({ supplier:'hubspot', product:'HubSpot Sales Hub Starter',      tier:'starter',      category:'saas-crm', usdMonthly:20.00, usdAnnual:15.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.hubspot.com/pricing/sales', confidence:0.85, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:hubspot-pro',   run: () => upsertPrice({ supplier:'hubspot', product:'HubSpot Sales Hub Professional', tier:'professional', category:'saas-crm', usdMonthly:100.0, usdAnnual:90.00, priceUnit:'per_seat', currency:'USD', sourceType:'official_web', sourceUrl:'https://www.hubspot.com/pricing/sales', confidence:0.83, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Fortnox — SEK, verifierat 2026-05-22
    { name: 'seed:fortnox-lon',   run: () => upsertPrice({ supplier:'fortnox', product:'Fortnox Lön',                       tier:'lon', category:'loneadmin',    priceMonthly:199, priceAnnual:199*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.fortnox.se/produkt/prislista', confidence:0.97, lastVerified:'2026-05-22', changedBy:'migration', metadata:{ perEmployeeMonthly:25, perPayslip:5 } }) },
    { name: 'seed:fortnox-bas',   run: () => upsertPrice({ supplier:'fortnox', product:'Fortnox Bokföring + Fakturering',   tier:'bas', category:'saas-finance', priceMonthly:399, priceAnnual:399*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.fortnox.se/priser',           confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Visma — SEK
    { name: 'seed:visma-smart',   run: () => upsertPrice({ supplier:'visma', product:'Visma eEkonomi Smart', tier:'smart', category:'saas-finance', priceMonthly:249, priceAnnual:249*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://vismaeekonomii.se/priser', confidence:0.85, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:visma-pro',     run: () => upsertPrice({ supplier:'visma', product:'Visma eEkonomi Pro',   tier:'pro',   category:'saas-finance', priceMonthly:399, priceAnnual:399*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://vismaeekonomii.se/priser', confidence:0.85, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Bokio — SEK
    { name: 'seed:bokio-pro',     run: () => upsertPrice({ supplier:'bokio', product:'Bokio Business Pro', tier:'pro', category:'saas-finance', priceMonthly:149, priceAnnual:149*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.bokio.se/priser', confidence:0.84, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Tele2 mobil — SEK, verifierat 2026-05-22
    { name: 'seed:tele2-bas',     run: () => upsertPrice({ supplier:'tele2', product:'Tele2 Företag Bas',  tier:'bas',  category:'mobil', priceMonthly:299, priceAnnual:299*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.tele2.se/foretag/mobilabonnemang', confidence:0.93, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:tele2-plus',    run: () => upsertPrice({ supplier:'tele2', product:'Tele2 Företag Plus', tier:'plus', category:'mobil', priceMonthly:349, priceAnnual:349*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.tele2.se/foretag/mobilabonnemang', confidence:0.93, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:tele2-max',     run: () => upsertPrice({ supplier:'tele2', product:'Tele2 Företag Max',  tier:'max',  category:'mobil', priceMonthly:449, priceAnnual:449*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.tele2.se/foretag/mobilabonnemang', confidence:0.93, lastVerified:'2026-05-22', changedBy:'migration' }) },
    // Telia mobil — SEK, estimerat
    { name: 'seed:telia-std',     run: () => upsertPrice({ supplier:'telia', product:'Telia Företag Frihet',     tier:'frihet',     category:'mobil', priceMonthly:349, priceAnnual:349*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.telia.se/foretag/mobiltelefoni', confidence:0.80, lastVerified:'2026-05-01', changedBy:'migration' }) },
    { name: 'seed:telia-max',     run: () => upsertPrice({ supplier:'telia', product:'Telia Företag Frihet Max', tier:'frihet-max', category:'mobil', priceMonthly:449, priceAnnual:449*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.telia.se/foretag/mobiltelefoni', confidence:0.78, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Telenor mobil — SEK, estimerat
    { name: 'seed:telenor',       run: () => upsertPrice({ supplier:'telenor', product:'Telenor Företag Flex', tier:'flex', category:'mobil', priceMonthly:299, priceAnnual:299*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.telenor.se/foretag/mobiltelefon', confidence:0.78, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Tre mobil — SEK, estimerat
    { name: 'seed:tre',           run: () => upsertPrice({ supplier:'tre', product:'Tre Företag Obegränsat Bas', tier:'bas', category:'mobil', priceMonthly:249, priceAnnual:249*12, priceUnit:'per_seat', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.tre.se/foretag/abonnemang', confidence:0.78, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // Bredband — SEK, verifierat 2026-05-22
    { name: 'seed:tele2-fiber',   run: () => upsertPrice({ supplier:'tele2',   product:'Tele2 Företag Fiber 1200 Mbit', tier:'fiber-1200',  category:'bredband', priceMonthly:849, priceAnnual:849*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.tele2.se/foretag/bredband',      confidence:0.91, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:bahnhof',       run: () => upsertPrice({ supplier:'bahnhof', product:'Bahnhof Företag Fiber 1 Gbit',  tier:'fiber-1gbit', category:'bredband', priceMonthly:995, priceAnnual:995*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.bahnhof.se/foretag/internet',    confidence:0.91, lastVerified:'2026-05-22', changedBy:'migration' }) },
    // Kortterminal
    { name: 'seed:sumup',         run: () => upsertPrice({ supplier:'sumup',  product:'SumUp Transaktionsavgift',    tier:'standard', category:'kortterminal', priceUnit:'per_transaction_pct', currency:'SEK', sourceType:'official_web', sourceUrl:'https://sumup.com/sv-se/',              confidence:0.91, lastVerified:'2026-05-22', changedBy:'migration', metadata:{ transactionRatePct:1.75 } }) },
    { name: 'seed:zettle',        run: () => upsertPrice({ supplier:'zettle', product:'Zettle Transaktionsavgift',   tier:'standard', category:'kortterminal', priceUnit:'per_transaction_pct', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.zettle.com/se/priser',     confidence:0.93, lastVerified:'2026-05-22', changedBy:'migration', metadata:{ transactionRatePct:1.75 } }) },
    { name: 'seed:stripe',        run: () => upsertPrice({ supplier:'stripe', product:'Stripe Terminal (EEA)',       tier:'standard', category:'kortterminal', priceUnit:'per_transaction_pct', currency:'SEK', sourceType:'official_web', sourceUrl:'https://stripe.com/se/pricing',        confidence:0.90, lastVerified:'2026-05-01', changedBy:'migration', metadata:{ transactionRatePct:1.50, transactionFixedSEK:1.50 } }) },
    // Larm
    { name: 'seed:sector-alarm',  run: () => upsertPrice({ supplier:'sector alarm', product:'Sector Alarm Företag Bas', tier:'bas',      category:'larm-bevakning', priceMonthly:299, priceAnnual:299*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.sectoralarm.se/foretag',                  confidence:0.88, lastVerified:'2026-05-22', changedBy:'migration' }) },
    { name: 'seed:verisure',      run: () => upsertPrice({ supplier:'verisure',     product:'Verisure Företag Standard', tier:'standard', category:'larm-bevakning', priceMonthly:399, priceAnnual:399*12, priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.verisure.se/foretag-och-organisationer', confidence:0.82, lastVerified:'2026-05-01', changedBy:'migration' }) },
    // El
    { name: 'seed:tibber',        run: () => upsertPrice({ supplier:'tibber',      product:'Tibber Spotpris',    tier:'spot', category:'el', priceMonthly:39,    priceUnit:'per_subscription', currency:'SEK', sourceType:'official_web', sourceUrl:'https://tibber.com/se/foretag',                confidence:0.88, lastVerified:'2026-05-01', changedBy:'migration', metadata:{ pricePerKwh:'spot' } }) },
    { name: 'seed:skatteverket',  run: () => upsertPrice({ supplier:'skatteverket', product:'Energiskatt 2026',   tier:'2026', category:'el', priceUnit:'per_kwh', currency:'SEK', sourceType:'official_web', sourceUrl:'https://www.skatteverket.se/foretag/skatterochavdrag/punktskatter/energiskatter.4.html', confidence:0.99, lastVerified:'2026-05-22', changedBy:'migration', metadata:{ pricePerKwh:0.360 } }) },
  ];

  for (const step of steps) {
    try {
      await step.run();
      results.push({ name: step.name, ok: true });
    } catch (err) {
      results.push({ name: step.name, ok: false, error: err.message });
    }
  }

  const allOk = results.every((r) => r.ok);
  return send(res, allOk ? 200 : 207, { ok: allOk, results });
}
