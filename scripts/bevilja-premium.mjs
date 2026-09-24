#!/usr/bin/env node
// scripts/bevilja-premium.mjs — GRUNDARENS ENDA VÄG IN I PREMIUMKRETSEN (lib/premiumkrets.js).
//
// Användning: node scripts/bevilja-premium.mjs <bevilja|avsluta> sha256:<hex av lower(trim(adress))>
// Körs från workflowen bevilja-premium (workflow_dispatch = kräver skrivrätt till repot).
// Loggen är publik: den skriver antal rader, aldrig adressen.
//
// bevilja → premium_beviljad_at = NOW(), premium_avslutad_at = NULL på adressens alla anmälningsrader.
// avsluta → premium_avslutad_at = NOW(). Raderna raderas aldrig (bibeln: arkivera, radera inte).

import { createHash } from 'node:crypto';
import { getDb } from '../lib/db.js';
import { matchaAdress, lasPremiumkrets } from '../lib/premiumkrets.js';

const [atgard, arg] = process.argv.slice(2);
if (!['bevilja', 'avsluta'].includes(atgard)) { console.error('✗ åtgärd måste vara bevilja eller avsluta'); process.exit(1); }
const db = getDb();
if (!db) { console.error('✗ INGEN DATABAS — ingenting ändrat.'); process.exit(1); }

const sha = (s) => createHash('sha256').update(s).digest('hex');
const rader = await db`SELECT email FROM intelligence_activations`;
const m = matchaAdress(rader.map((r) => r.email), arg, sha);
if (m.fel) { console.error(`✗ ${m.fel} — ingenting ändrat.`); process.exit(1); }

const fore = (await lasPremiumkrets(db)).size;
const andrade = atgard === 'bevilja'
  ? await db`UPDATE intelligence_activations SET premium_beviljad_at = NOW(), premium_avslutad_at = NULL
             WHERE lower(trim(email)) = ${m.adress} RETURNING id`
  : await db`UPDATE intelligence_activations SET premium_avslutad_at = NOW()
             WHERE lower(trim(email)) = ${m.adress} AND premium_beviljad_at IS NOT NULL RETURNING id`;
const efter = (await lasPremiumkrets(db)).size;
console.log(`✓ ${atgard}: ${andrade.length} anmälningsrad(er) ändrade · premiumkretsen ${fore} → ${efter} adress(er)`);
if (andrade.length === 0) process.exit(1);
