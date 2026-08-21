export * from './types/superAdmin';

export interface AdminUser {
  id: string;
  username: string;
  role: string;
  createdAtUtc: string;
  lastLoginAtUtc: string | null;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  expiresAtUtc: string;
  user: AdminUser;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiActionResponse {
  success: boolean;
  message: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  createdAtUtc: string;
  isActive: boolean;
  totalLicenses: number;
  activeLicenses: number;
}

export interface CustomerDetail extends Customer {
  licenses: License[];
  activations: Activation[];
}

export interface License {
  id: string;
  licenseKeyHash: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  productId: string;
  plan: string;
  expiresAtUtc: string;
  maxActivations: number;
  activeActivationsCount: number;
  offlineGraceDays: number;
  revoked: boolean;
  isActive: boolean;
  isExpired: boolean;
  status: 'Active' | 'Expired' | 'Revoked' | 'Inactive';
  createdAtUtc: string;
  updatedAtUtc: string;
  features: string[];
  lastActivationAtUtc: string | null;
}

export interface LicenseDetail extends License {
  activations: Activation[];
}

export interface CreateLicenseRequest {
  customerId?: string;
  customerName?: string;
  customerEmail?: string;
  customerCompany?: string;
  productId: string;
  plan: string;
  maxActivations: number;
  offlineGraceDays: number;
  validDays?: number;
  expirationDate?: string;
  features: string[];
  customKey?: string;
  notes?: string;
}

export interface CreateLicenseResponse {
  success: boolean;
  licenseKey: string;
  license: License;
}

export interface Activation {
  id: string;
  licenseId: string;
  productId: string;
  plan: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  installationId: string;
  clientVersion: string;
  activatedAtUtc: string;
  lastValidatedAtUtc: string;
  isActive: boolean;
  revokedAtUtc: string | null;
  status: string;
}

export interface DashboardStats {
  totalCustomers: number;
  totalLicenses: number;
  activeLicenses: number;
  expiredLicenses: number;
  revokedLicenses: number;
  totalActivations: number;
  activeActivations: number;
  recentActivities: RecentActivity[];
  recentLicenses: License[];
  recentActivations: Activation[];
}

export interface RecentActivity {
  id: string;
  eventType: string;
  details: string;
  ipAddress: string;
  timestampUtc: string;
  licenseId: string | null;
  installationId: string | null;
}

export interface AuditLog {
  id: string;
  licenseId: string | null;
  installationId: string | null;
  eventType: string;
  timestampUtc: string;
  ipAddress: string;
  details: string;
}

export interface SystemInfo {
  serverUtcTime: string;
  databaseProvider: string;
  keyId: string;
  version: string;
  environment: string;
}
