const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "arvo.db");
const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// ── Schema ──────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    email TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    status TEXT DEFAULT 'Lead',
    value REAL DEFAULT 0,
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    client TEXT,
    status TEXT DEFAULT 'Planering',
    progress INTEGER DEFAULT 0,
    deadline TEXT,
    budget REAL DEFAULT 0,
    spent REAL DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    invoice_number TEXT,
    client TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT DEFAULT 'Utkast',
    description TEXT,
    due_date TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS time_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    project TEXT NOT NULL,
    task TEXT,
    date TEXT NOT NULL,
    hours REAL NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    amount REAL NOT NULL,
    client TEXT,
    project TEXT,
    date TEXT DEFAULT (date('now')),
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// ── Queries ─────────────────────────────────────────────────────────

const findUserByPhone = db.prepare(
  "SELECT * FROM users WHERE phone = ? OR phone = replace(?, '+', '') OR '+' || phone = ?"
);

const insertContact = db.prepare(`
  INSERT INTO contacts (user_id, name, company, email, phone, status, value, notes)
  VALUES (@user_id, @name, @company, @email, @phone, @status, @value, @notes)
`);

const insertTimeEntry = db.prepare(`
  INSERT INTO time_entries (user_id, project, task, date, hours)
  VALUES (@user_id, @project, @task, @date, @hours)
`);

const insertExpense = db.prepare(`
  INSERT INTO expenses (user_id, description, amount, client, project, date)
  VALUES (@user_id, @description, @amount, @client, @project, @date)
`);

const insertInvoiceDraft = db.prepare(`
  INSERT INTO invoices (user_id, invoice_number, client, amount, status, description, due_date)
  VALUES (@user_id, @invoice_number, @client, @amount, 'Utkast', @description, @due_date)
`);

const updateProject = db.prepare(`
  UPDATE projects SET status = COALESCE(@status, status),
    progress = COALESCE(@progress, progress),
    spent = COALESCE(@spent, spent)
  WHERE user_id = @user_id AND name LIKE '%' || @name || '%'
`);

const findProjectByName = db.prepare(
  "SELECT * FROM projects WHERE user_id = ? AND name LIKE '%' || ? || '%' LIMIT 1"
);

const insertUser = db.prepare(
  "INSERT INTO users (name, phone, email) VALUES (@name, @phone, @email)"
);

const getNextInvoiceNumber = (userId) => {
  const row = db.prepare(
    "SELECT COUNT(*) as cnt FROM invoices WHERE user_id = ?"
  ).get(userId);
  const year = new Date().getFullYear();
  return `F${year}-${String((row.cnt || 0) + 1).padStart(3, "0")}`;
};

module.exports = {
  db,
  findUserByPhone,
  insertContact,
  insertTimeEntry,
  insertExpense,
  insertInvoiceDraft,
  updateProject,
  findProjectByName,
  insertUser,
  getNextInvoiceNumber,
};
