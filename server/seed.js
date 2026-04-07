/**
 * Seed-skript: Skapar en testanvändare i databasen.
 * Kör med: node server/seed.js
 *
 * Ange ditt WhatsApp-telefonnummer (med landskod utan +, t.ex. 46701234567)
 * som argument: node server/seed.js 46701234567
 */
const { insertUser, db } = require("./db");

const phone = process.argv[2] || "46701234567";
const name = process.argv[3] || "Test User";

try {
  // Check if user already exists
  const existing = db
    .prepare("SELECT * FROM users WHERE phone = ?")
    .get(phone);
  if (existing) {
    console.log(`User already exists: ${existing.name} (id=${existing.id}, phone=${existing.phone})`);
    process.exit(0);
  }

  const result = insertUser.run({ name, phone, email: null });
  console.log(`Created user: ${name} (id=${result.lastInsertRowid}, phone=${phone})`);
  console.log("\nDu kan nu testa webhooken med detta telefonnummer.");
} catch (err) {
  console.error("Seed error:", err.message);
  process.exit(1);
}
