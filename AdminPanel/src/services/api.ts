import {
  AuthResponse,
  PagedResult,
  Customer,
  CustomerDetail,
  License,
  LicenseDetail,
  CreateLicenseRequest,
  CreateLicenseResponse,
  Activation,
  DashboardStats,
  AuditLog,
  SystemInfo,
  ApiActionResponse
} from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

export function setToken(token: string | null) {
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (token && !token.startsWith('super_admin_session_token_')) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  let response: Response;

  try {
    response = await fetch(url, {
      ...options,
      headers
    });
  } catch (err: any) {
    throw new Error(`Licensing server is unavailable (${err.message || 'Network Error'}).`);
  }

  if (response.status === 401) {
    // Only dispatch auth:unauthorized for real JWT server tokens, not local Super Admin session
    if (token && !token.startsWith('super_admin_session_token_')) {
      setToken(null);
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    throw new Error('Session expired or unauthorized. Please log in again.');
  }

  const contentType = response.headers.get('content-type') || '';
  let data: any = null;
  if (contentType.includes('application/json')) {
    data = await response.json();
  }

  if (!response.ok) {
    const errorMsg = data?.message || data?.title || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    request<AuthResponse>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),

  getCurrentUser: () =>
    request<AuthResponse['user']>('/api/admin/auth/me'),

  // Dashboard
  getDashboardStats: () =>
    request<DashboardStats>('/api/admin/dashboard/stats'),

  // Customers
  getCustomers: (page = 1, pageSize = 20, search = '', sortBy = '', sortDesc = false) =>
    request<PagedResult<Customer>>(
      `/api/admin/customers?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&sortBy=${sortBy}&sortDesc=${sortDesc}`
    ),

  getCustomer: (id: string) =>
    request<CustomerDetail>(`/api/admin/customers/${id}`),

  createCustomer: (customer: { name: string; email: string; company: string }) =>
    request<Customer>('/api/admin/customers', {
      method: 'POST',
      body: JSON.stringify(customer)
    }),

  updateCustomer: (id: string, customer: { name: string; email: string; company: string; isActive: boolean }) =>
    request<Customer>(`/api/admin/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer)
    }),

  // Licenses
  getLicenses: (page = 1, pageSize = 20, search = '', status = '', plan = '', sortBy = '', sortDesc = false) =>
    request<PagedResult<License>>(
      `/api/admin/licenses?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&plan=${encodeURIComponent(plan)}&sortBy=${sortBy}&sortDesc=${sortDesc}`
    ),

  getLicense: (id: string) =>
    request<LicenseDetail>(`/api/admin/licenses/${id}`),

  createLicense: (data: CreateLicenseRequest) =>
    request<CreateLicenseResponse>('/api/admin/licenses/create', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateLicense: (id: string, data: { plan: string; maxActivations: number; offlineGraceDays: number; expiresAtUtc: string; isActive: boolean; features: string[] }) =>
    request<License>(`/api/admin/licenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

  revokeLicense: (id: string, reason: string) =>
    request<ApiActionResponse>(`/api/admin/licenses/${id}/revoke`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),

  reactivateLicense: (id: string) =>
    request<ApiActionResponse>(`/api/admin/licenses/${id}/reactivate`, {
      method: 'POST'
    }),

  // Activations
  getActivations: (page = 1, pageSize = 20, search = '', status = '', sortBy = '', sortDesc = false) =>
    request<PagedResult<Activation>>(
      `/api/admin/activations?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}&sortBy=${sortBy}&sortDesc=${sortDesc}`
    ),

  getActivation: (id: string) =>
    request<Activation>(`/api/admin/activations/${id}`),

  releaseActivation: (id: string, reason: string) =>
    request<ApiActionResponse>(`/api/admin/activations/${id}/release`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),

  resetInstallationIdentity: (id: string, reason: string) =>
    request<ApiActionResponse>(`/api/admin/activations/${id}/reset-identity`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),

  // Audit Logs
  getAuditLogs: (page = 1, pageSize = 25, search = '', eventType = '', fromUtc = '', toUtc = '') =>
    request<PagedResult<AuditLog>>(
      `/api/admin/audit-logs?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&eventType=${encodeURIComponent(eventType)}&fromUtc=${encodeURIComponent(fromUtc)}&toUtc=${encodeURIComponent(toUtc)}`
    ),

  // System Info
  getSystemInfo: () =>
    request<SystemInfo>('/api/admin/system/info')
};
