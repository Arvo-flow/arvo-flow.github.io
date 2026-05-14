// lib/kv.js — Vercel KV (Redis) client.
// Returns null when env vars are not set so callers degrade gracefully.
import { createClient } from '@vercel/kv';

let _kv;

export function getKv() {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  if (!_kv) _kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
  return _kv;
}
