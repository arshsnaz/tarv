import { Addin, Customer, License, Activation, AuditLog } from '../types';

// Real Core Desktop Add-in Products (ClEmpAddIn Excel Add-in)
export const INITIAL_ADDINS: Addin[] = [
  {
    id: 'addin_clemp_excel',
    name: 'Team Productivity Report Excel Add-in (ClEmpAddIn)',
    slug: 'clemp-excel-addin',
    description: 'Automated Employee Productivity Reporting & Live Data Orchestrator for Microsoft Excel.',
    category: 'Excel Add-in',
    targetApplication: 'Microsoft Excel',
    version: 'v1.0.0',
    developer: 'Consistent Solutions',
    iconBgColor: 'bg-emerald-600',
    status: 'active',
    createdAtUtc: '2025-01-10T08:00:00Z',
    updatedAtUtc: '2026-08-20T16:00:00Z',
    plans: [
      { id: 'plan_clemp_pro', name: 'Pro', priceYearly: 199, maxActivationsPerLicense: 5, features: ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync'] }
    ],
    stats: {
      totalCustomers: 1,
      totalLicenses: 1,
      activeLicenses: 1,
      activeDevices: 1,
      revokedLicenses: 0,
      securityEvents: 0
    }
  }
];

// Clean real initial data seeds (matching live server & Supabase schema)
export const INITIAL_CUSTOMERS: Customer[] = [];
export const INITIAL_LICENSES: License[] = [];
export const INITIAL_ACTIVATIONS: Activation[] = [];
export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit_init_1',
    licenseId: null,
    installationId: null,
    eventType: 'ADMIN_LOGIN_SUCCESS',
    timestampUtc: new Date().toISOString(),
    ipAddress: '::1 (Super Admin)',
    details: "Admin 'admin' logged in successfully."
  }
];
