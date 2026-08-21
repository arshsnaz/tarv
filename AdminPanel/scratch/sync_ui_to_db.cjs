const Database = require('better-sqlite3');
const crypto = require('crypto');

const dbPath = 'Z:\\09 PUBLIC SHARE\\Abubakar Chanda\\Server\\Consistent.Licensing.Server\\licensing.db';
const db = new Database(dbPath);

console.log('Syncing UI data to licensing.db SQLite database...');

const customerId = 'c0a80101-9999-4444-8888-111111111111';
const customerName = 'Abubakar Chanda';
const customerEmail = 'abubakarchanda3@gmail.com';
const company = 'Consistent Solutions';
const now = new Date().toISOString();
const expiresAt = '2027-08-20T10:00:00.000Z';

// Insert or replace Customer
const insertCust = db.prepare(`
  INSERT OR REPLACE INTO Customers (Id, Name, Email, Company, CreatedAtUtc, IsActive)
  VALUES (?, ?, ?, ?, ?, 1)
`);
insertCust.run(customerId, customerName, customerEmail, company, now);
console.log('Customer inserted/verified in SQLite.');

// Insert 2 Licenses for SheetExport Pro & Revit Exporter Suite
const lic1Id = 'lic_abubakar_sheet_export_01';
const lic2Id = 'lic_abubakar_revit_suite_02';

const insertLic = db.prepare(`
  INSERT OR REPLACE INTO Licenses (Id, LicenseKeyHash, CustomerId, ProductId, Plan, MaxActivations, OfflineGraceDays, ExpiresAtUtc, CreatedAtUtc, UpdatedAtUtc, IsActive, Revoked)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0)
`);

const keyHash1 = crypto.createHash('sha256').update('KEY-PRO-REVIT-EXPORTER-2026-A1').digest('hex');
const keyHash2 = crypto.createHash('sha256').update('KEY-PRO-SHEETEXPORT-2026-B2').digest('hex');

insertLic.run(lic1Id, keyHash1, customerId, 'addin_sheet_export', 'Pro', 5, 14, expiresAt, now, now);
insertLic.run(lic2Id, keyHash2, customerId, 'addin_revit_exporter', 'Pro', 5, 14, expiresAt, now, now);

console.log('2 Licenses inserted into SQLite.');

// Insert 2 Workstation Activations
const act1Id = 'act_abubakar_pc_01';
const act2Id = 'act_abubakar_pc_02';

const cols = db.prepare("PRAGMA table_info('Activations')").all().map(c => c.name);

let insertAct;
if (cols.includes('InstallationPublicKey')) {
  insertAct = db.prepare(`
    INSERT OR REPLACE INTO Activations (Id, LicenseId, InstallationId, InstallationPublicKey, ClientVersion, ActivatedAtUtc, LastValidatedAtUtc, IsActive, RevokedAtUtc)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, NULL)
  `);
  insertAct.run(act1Id, lic1Id, 'HWID-ABUBAKAR-WORKSTATION-01', 'PUBKEY_SAMPLE_KEY_RSA_2048', 'v2.4.1', now, now);
  insertAct.run(act2Id, lic2Id, 'HWID-ABUBAKAR-WORKSTATION-02', 'PUBKEY_SAMPLE_KEY_RSA_2048', 'v3.1.0', now, now);
} else {
  insertAct = db.prepare(`
    INSERT OR REPLACE INTO Activations (Id, LicenseId, InstallationId, ClientVersion, ActivatedAtUtc, LastValidatedAtUtc, IsActive, RevokedAtUtc)
    VALUES (?, ?, ?, ?, ?, ?, 1, NULL)
  `);
  insertAct.run(act1Id, lic1Id, 'HWID-ABUBAKAR-WORKSTATION-01', 'v2.4.1', now, now);
  insertAct.run(act2Id, lic2Id, 'HWID-ABUBAKAR-WORKSTATION-02', 'v3.1.0', now, now);
}

console.log('2 Activations inserted into SQLite.');

// Insert Audit Log entries
const insertLog = db.prepare(`
  INSERT OR REPLACE INTO AuditLogs (Id, LicenseId, InstallationId, EventType, TimestampUtc, IPAddress, Details)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertLog.run(crypto.randomUUID(), lic1Id, 'HWID-ABUBAKAR-WORKSTATION-01', 'LICENSE_GENERATED', now, '::1 (Super Admin)', 'License created for Abubakar Chanda (SheetExport Pro)');
insertLog.run(crypto.randomUUID(), lic2Id, 'HWID-ABUBAKAR-WORKSTATION-02', 'LICENSE_GENERATED', now, '::1 (Super Admin)', 'License created for Abubakar Chanda (Revit Exporter Suite)');

console.log('\n=== UPDATED DATABASE COUNTS ===');
const custs = db.prepare('SELECT * FROM Customers').all();
const lics = db.prepare('SELECT * FROM Licenses').all();
const acts = db.prepare('SELECT * FROM Activations').all();

console.log('Customers in DB:', custs.length, custs);
console.log('Licenses in DB:', lics.length, lics);
console.log('Activations in DB:', acts.length, acts);
