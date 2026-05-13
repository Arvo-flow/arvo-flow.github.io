// agents/orchestrator/store.js
// File-based persistence for switch lifecycle records. One JSON file per switch,
// stored under agents/orchestrator/data/. The data/ folder is gitignored so
// runtime state never leaks into commits.
//
// Designed to be swapped for a real DB (Postgres, SQLite via better-sqlite3
// which is already in our root deps) without changing the orchestrator API.
// The Store class below is the interface — swap the implementation.

import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_DATA_DIR = resolve(__dirname, 'data');

export class FileStore {
  constructor({ dataDir = DEFAULT_DATA_DIR } = {}) {
    this.dataDir = dataDir;
  }

  async _ensureDir() {
    if (!existsSync(this.dataDir)) {
      await mkdir(this.dataDir, { recursive: true });
    }
  }

  _pathFor(switchId) {
    if (!/^[A-Za-z0-9_-]+$/.test(switchId)) {
      throw new Error(`Invalid switchId (must be alphanumeric/underscore/dash): ${switchId}`);
    }
    return resolve(this.dataDir, `${switchId}.json`);
  }

  /**
   * Save the full switch record. Atomic via write-then-rename.
   */
  async save(record) {
    if (!record?.id) throw new Error('record.id required');
    await this._ensureDir();
    const path = this._pathFor(record.id);
    const tmp = `${path}.tmp`;
    await writeFile(tmp, JSON.stringify(record, null, 2), 'utf8');
    // Rename is atomic on POSIX
    const { rename } = await import('node:fs/promises');
    await rename(tmp, path);
    return record;
  }

  /**
   * Load a switch record. Returns null if not found.
   */
  async load(switchId) {
    const path = this._pathFor(switchId);
    if (!existsSync(path)) return null;
    const text = await readFile(path, 'utf8');
    return JSON.parse(text);
  }

  /**
   * List all switch IDs currently in the store.
   */
  async list() {
    if (!existsSync(this.dataDir)) return [];
    const files = await readdir(this.dataDir);
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));
  }

  /**
   * Append a history event without rewriting the whole record.
   * Cheaper for high-frequency events but here we just rewrite — acceptable
   * at our scale and simpler to reason about.
   */
  async appendHistory(switchId, event) {
    const record = await this.load(switchId);
    if (!record) throw new Error(`Switch ${switchId} not found`);
    record.history = record.history ?? [];
    record.history.push(event);
    record.updatedAt = event.timestamp;
    record.state = event.to;
    return this.save(record);
  }
}
