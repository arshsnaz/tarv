const Database = require('better-sqlite3');
const fs = require('fs');

const dbPath = 'Z:\\09 PUBLIC SHARE\\Abubakar Chanda\\Server\\Consistent.Licensing.Server\\licensing.db';

console.log('Connecting to licensing.db at:', dbPath);
const db = new Database(dbPath);

// Ensure tables exist
db.exec(`
CREATE TABLE IF NOT EXISTS "Customers" (
  "Id" TEXT NOT NULL PRIMARY KEY,
  "Name" TEXT NOT NULL,
  "Email" TEXT NOT NULL,
  "Company" TEXT NOT NULL,
  "CreatedAtUtc" TEXT NOT NULL,
  "IsActive" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "Licenses" (
  "Id" TEXT NOT NULL PRIMARY KEY,
  "LicenseKeyHash" TEXT NOT NULL UNIQUE,
  "CustomerId" TEXT NOT NULL,
  "ProductId" TEXT NOT NULL,
  "Plan" TEXT NOT NULL,
  "MaxActivations" INTEGER NOT NULL,
  "OfflineGraceDays" INTEGER NOT NULL,
  "ExpiresAtUtc" TEXT NOT NULL,
  "CreatedAtUtc" TEXT NOT NULL,
  "UpdatedAtUtc" TEXT NOT NULL,
  "IsActive" INTEGER NOT NULL,
  "Revoked" INTEGER NOT NULL,
  FOREIGN KEY ("CustomerId") REFERENCES "Customers" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Activations" (
  "Id" TEXT NOT NULL PRIMARY KEY,
  "LicenseId" TEXT NOT NULL,
  "InstallationId" TEXT NOT NULL,
  "ClientVersion" TEXT NOT NULL,
  "ActivatedAtUtc" TEXT NOT NULL,
  "LastValidatedAtUtc" TEXT NOT NULL,
  "IsActive" INTEGER NOT NULL,
  "RevokedAtUtc" TEXT,
  FOREIGN KEY ("LicenseId") REFERENCES "Licenses" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "LicenseFeatures" (
  "Id" TEXT NOT NULL PRIMARY KEY,
  "LicenseId" TEXT NOT NULL,
  "FeatureName" TEXT NOT NULL,
  "IsEnabled" INTEGER NOT NULL,
  FOREIGN KEY ("LicenseId") REFERENCES "Licenses" ("Id") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "AuditLogs" (
  "Id" TEXT NOT NULL PRIMARY KEY,
  "LicenseId" TEXT,
  "InstallationId" TEXT,
  "EventType" TEXT NOT NULL,
  "TimestampUtc" TEXT NOT NULL,
  "IPAddress" TEXT,
  "Details" TEXT
);
`);

console.log('Database tables ready.');

// Check current counts
const custCount = db.prepare('SELECT COUNT(*) as c FROM Customers').get().c;
const licCount = db.prepare('SELECT COUNT(*) as c FROM Licenses').get().c;
const actCount = db.prepare('SELECT COUNT(*) as c FROM Activations').get().c;

console.log(`Current DB Counts -> Customers: ${custCount}, Licenses: ${licCount}, Activations: ${actCount}`);
