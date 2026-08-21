const Database = require('better-sqlite3');
const path = require('path');

const dbPath = 'Z:\\09 PUBLIC SHARE\\Abubakar Chanda\\Server\\Consistent.Licensing.Server\\licensing.db';
const db = new Database(dbPath, { readonly: true });

console.log('=== DATABASE TABLES & RECORD COUNTS ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__EF%';").all();

for (const t of tables) {
  const count = db.prepare(`SELECT COUNT(*) as count FROM "${t.name}"`).get();
  console.log(`Table "${t.name}": ${count.count} rows`);
}

console.log('\n=== ALL CUSTOMERS ===');
const customers = db.prepare('SELECT * FROM Customers').all();
console.log(JSON.stringify(customers, null, 2));

console.log('\n=== ALL LICENSES ===');
const licenses = db.prepare('SELECT * FROM Licenses').all();
console.log(JSON.stringify(licenses, null, 2));

console.log('\n=== ALL ACTIVATIONS ===');
const activations = db.prepare('SELECT * FROM Activations').all();
console.log(JSON.stringify(activations, null, 2));

console.log('\n=== ALL LICENSE FEATURES ===');
const features = db.prepare('SELECT * FROM LicenseFeatures').all();
console.log(JSON.stringify(features, null, 2));

console.log('\n=== ALL AUDIT LOGS ===');
const auditLogs = db.prepare('SELECT * FROM AuditLogs').all();
console.log(JSON.stringify(auditLogs, null, 2));

console.log('\n=== ALL ADMIN USERS ===');
const adminUsers = db.prepare('SELECT * FROM AdminUsers').all();
console.log(JSON.stringify(adminUsers, null, 2));
