import { Customer, License, Activation, AuditLog } from '../types';

const getHost = () => {
  if (typeof window !== 'undefined' && window.location.hostname && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return window.location.hostname;
  }
  return '192.168.1.9';
};

const API_BASE_URL = `http://${getHost()}:5000/api/admin`;

let authToken: string | null = localStorage.getItem('admin_token');

export const setServerAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('admin_token', token);
  } else {
    localStorage.removeItem('admin_token');
  }
};

const getHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  return headers;
};

export const serverApi = {
  // Fetch Customers from Server API
  async getCustomers(page = 1, pageSize = 50, search = ''): Promise<{ items: Customer[]; totalCount: number }> {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search
      });
      const res = await fetch(`${API_BASE_URL}/customers?${query}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      return {
        items: data.items || [],
        totalCount: data.totalCount || 0
      };
    } catch {
      return { items: [], totalCount: 0 };
    }
  },

  // Create Customer on Server API
  async createCustomer(customer: { name: string; email: string; company?: string }): Promise<Customer | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(customer)
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      return await res.json();
    } catch {
      return null;
    }
  },

  // Fetch Licenses from Server API
  async getLicenses(page = 1, pageSize = 50, search = ''): Promise<{ items: License[]; totalCount: number }> {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search
      });
      const res = await fetch(`${API_BASE_URL}/licenses?${query}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      return {
        items: data.items || [],
        totalCount: data.totalCount || 0
      };
    } catch {
      return { items: [], totalCount: 0 };
    }
  },

  // Create License on Server API
  async createLicense(licenseData: Partial<License>): Promise<License | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/licenses`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(licenseData)
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      return data.license || null;
    } catch {
      return null;
    }
  },

  // Revoke License on Server API
  async revokeLicense(id: string, reason: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/licenses/${id}/revoke`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ reason })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch Activations from Server API
  async getActivations(page = 1, pageSize = 50, search = ''): Promise<{ items: Activation[]; totalCount: number }> {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search
      });
      const res = await fetch(`${API_BASE_URL}/activations?${query}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      return {
        items: data.items || [],
        totalCount: data.totalCount || 0
      };
    } catch {
      return { items: [], totalCount: 0 };
    }
  },

  // Release Activation on Server API
  async releaseActivation(id: string, reason: string): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/activations/${id}/release`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ reason })
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch Audit Logs from Server API
  async getAuditLogs(page = 1, pageSize = 50, search = ''): Promise<{ items: AuditLog[]; totalCount: number }> {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        search
      });
      const res = await fetch(`${API_BASE_URL}/audit-logs?${query}`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const data = await res.json();
      return {
        items: data.items || [],
        totalCount: data.totalCount || 0
      };
    } catch {
      return { items: [], totalCount: 0 };
    }
  }
};
