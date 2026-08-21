import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Addin, AddinStatus, GlobalStats, Customer, License, Activation, AuditLog } from '../types';
import {
  INITIAL_ADDINS,
  INITIAL_CUSTOMERS,
  INITIAL_LICENSES,
  INITIAL_ACTIVATIONS,
  INITIAL_AUDIT_LOGS
} from '../services/mockAddinsData';
import { serverApi } from '../services/serverApi';
import { supabaseService, isSupabaseConnected } from '../services/supabaseClient';

interface AddinContextType {
  addins: Addin[];
  selectedAddinId: string | null; // null means "Super Admin View (All Add-ins)"
  selectedAddin: Addin | null;
  globalStats: GlobalStats;

  // Raw state arrays
  allCustomers: Customer[];
  allLicenses: License[];
  allActivations: Activation[];
  allAuditLogs: AuditLog[];

  // Dynamically scoped state arrays based on selectedAddinId & valid addins
  customers: Customer[];
  licenses: License[];
  activations: Activation[];
  auditLogs: AuditLog[];

  setSelectedAddinId: (id: string | null) => void;
  registerAddin: (addinData: Omit<Addin, 'id' | 'createdAtUtc' | 'updatedAtUtc' | 'stats'>) => void;
  updateAddin: (id: string, updates: Partial<Addin>) => void;
  deleteAddin: (id: string) => void;
  toggleAddinStatus: (id: string) => void;
  addLicenseForAddin: (licenseData: Partial<License>) => Promise<void>;
  addCustomerForAddin: (customerData: { name: string; email: string; company?: string }) => Promise<Customer>;
  revokeLicenseInContext: (id: string, reason: string) => Promise<void>;
  reactivateLicenseInContext: (id: string) => Promise<void>;
  releaseActivationInContext: (id: string, reason: string) => Promise<void>;
  resetIdentityInContext: (id: string, reason: string) => Promise<void>;
  refreshDataFromServer: () => Promise<void>;
}

const AddinContext = createContext<AddinContextType | null>(null);

const STORAGE_KEY_ADDINS = 'sheetexport_real_addins_v4';
const STORAGE_KEY_CUSTOMERS = 'sheetexport_real_customers_v4';
const STORAGE_KEY_LICENSES = 'sheetexport_real_licenses_v4';
const STORAGE_KEY_ACTIVATIONS = 'sheetexport_real_activations_v4';

const generateGuid = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const AddinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addins, setAddins] = useState<Addin[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ADDINS);
    return saved ? JSON.parse(saved) : INITIAL_ADDINS;
  });

  const [allCustomers, setAllCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [allLicenses, setAllLicenses] = useState<License[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LICENSES);
    return saved ? JSON.parse(saved) : INITIAL_LICENSES;
  });

  const [allActivations, setAllActivations] = useState<Activation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ACTIVATIONS);
    return saved ? JSON.parse(saved) : INITIAL_ACTIVATIONS;
  });

  const [allAuditLogs, setAllAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  const [selectedAddinId, setSelectedAddinId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ADDINS, JSON.stringify(addins));
  }, [addins]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CUSTOMERS, JSON.stringify(allCustomers));
  }, [allCustomers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LICENSES, JSON.stringify(allLicenses));
  }, [allLicenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ACTIVATIONS, JSON.stringify(allActivations));
  }, [allActivations]);

  const refreshDataFromServer = async () => {
    const connected = await isSupabaseConnected();
    if (connected) {
      const supaAddins = await supabaseService.getAddins();
      if (supaAddins && supaAddins.length > 0) setAddins(supaAddins);

      const supaCust = await supabaseService.getCustomers();
      let combinedCustomers = supaCust || [];

      // Merge local vault signups
      if (typeof window !== "undefined") {
        try {
          const localVault = JSON.parse(localStorage.getItem("tarv_user_credentials_vault_v1") || "{}");
          Object.values(localVault).forEach((u: any) => {
            if (u.email && !combinedCustomers.some((c) => c.email.toLowerCase() === u.email.toLowerCase())) {
              combinedCustomers.push({
                id: u.id || `cust-local-${Math.random().toString(36).substring(2, 8)}`,
                name: u.name || "TARV User",
                email: u.email,
                company: u.company || "MEP Engineering Firm",
                createdAtUtc: u.createdAt || new Date().toISOString(),
                isActive: true,
                totalLicenses: 1,
                activeLicenses: 1
              });
            }
          });
        } catch {
          // ignore
        }
      }

      // Merge initial seed signups
      INITIAL_CUSTOMERS.forEach((seed) => {
        if (!combinedCustomers.some((c) => c.email.toLowerCase() === seed.email.toLowerCase())) {
          combinedCustomers.push(seed);
        }
      });

      setAllCustomers(combinedCustomers);

      const supaLic = await supabaseService.getLicenses();
      if (supaLic) setAllLicenses(supaLic);

      const supaAct = await supabaseService.getActivations();
      if (supaAct) setAllActivations(supaAct);

      const supaLog = await supabaseService.getAuditLogs();
      if (supaLog) setAllAuditLogs(supaLog);

      return;
    }

    try {
      const custData = await serverApi.getCustomers(1, 100);
      if (custData.items && custData.items.length > 0) setAllCustomers(custData.items);

      const licData = await serverApi.getLicenses(1, 100);
      if (licData.items && licData.items.length > 0) setAllLicenses(licData.items);

      const actData = await serverApi.getActivations(1, 100);
      if (actData.items && actData.items.length > 0) setAllActivations(actData.items);

      const logData = await serverApi.getAuditLogs(1, 100);
      if (logData.items && logData.items.length > 0) setAllAuditLogs(logData.items);
    } catch {
      // Local fallback
    }
  };

  // Real-time multi-device LAN auto-poll (every 3 seconds)
  useEffect(() => {
    refreshDataFromServer();
    const interval = setInterval(() => {
      refreshDataFromServer();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validAddinIds = useMemo(() => new Set(addins.map((a) => a.id)), [addins]);

  // Dynamically calculate live add-in telemetry stats for ALL registered add-ins
  const computedAddins = useMemo(() => {
    return addins.map((addin) => {
      const targetLicenses = allLicenses.filter((l) => l.productId === addin.id);
      const activeLicCount = targetLicenses.filter((l) => l.isActive && !l.revoked && !l.isExpired).length;
      const revokedLicCount = targetLicenses.filter((l) => l.revoked).length;

      const targetActivations = allActivations.filter((a) => a.productId === addin.id);
      const activeActCount = targetActivations.filter((a) => a.isActive).length;

      const uniqueCustomers = new Set(targetLicenses.map((l) => l.customerId)).size;

      return {
        ...addin,
        stats: {
          totalCustomers: uniqueCustomers,
          totalLicenses: targetLicenses.length,
          activeLicenses: activeLicCount,
          activeDevices: activeActCount,
          revokedLicenses: revokedLicCount,
          securityEvents: allAuditLogs.filter((log) => log.licenseId && targetLicenses.some((l) => l.id === log.licenseId)).length
        }
      };
    });
  }, [addins, allLicenses, allActivations, allAuditLogs]);

  // Dynamically calculate live add-in telemetry stats for selected add-in
  const selectedAddin = useMemo(() => {
    if (!selectedAddinId) return null;
    return computedAddins.find((a) => a.id === selectedAddinId) || null;
  }, [computedAddins, selectedAddinId]);

  // Product-scoped licenses with DYNAMIC active seat calculation
  const licenses = useMemo(() => {
    const filtered = selectedAddinId
      ? allLicenses.filter((l) => l.productId === selectedAddinId)
      : allLicenses.filter((l) => validAddinIds.has(l.productId) || !l.productId);

    return filtered.map((lic) => {
      const activeSeatsCount = allActivations.filter(
        (a) => a.licenseId === lic.id && a.isActive
      ).length;

      return {
        ...lic,
        activeActivationsCount: activeSeatsCount
      };
    });
  }, [allLicenses, allActivations, selectedAddinId, validAddinIds]);

  // Product-scoped activations
  const activations = useMemo(() => {
    if (selectedAddinId) {
      return allActivations.filter((a) => a.productId === selectedAddinId);
    }
    if (addins.length === 0) return [];
    return allActivations.filter((a) => validAddinIds.has(a.productId) || !a.productId);
  }, [allActivations, selectedAddinId, validAddinIds, addins]);

  // Product-scoped customers with DYNAMIC seat and license calculations
  const customers = useMemo(() => {
    if (addins.length === 0) return [];

    const scopedCustList = selectedAddinId
      ? allCustomers.filter((cust) => allLicenses.some((l) => l.customerId === cust.id && l.productId === selectedAddinId))
      : allCustomers;

    return scopedCustList.map((cust) => {
      const custLicenses = allLicenses.filter(
        (l) => l.customerId === cust.id && (!selectedAddinId || l.productId === selectedAddinId)
      );
      const activeCount = custLicenses.filter((l) => l.isActive && !l.revoked && !l.isExpired).length;

      const custActivations = allActivations.filter(
        (a) => a.customerId === cust.id && (!selectedAddinId || a.productId === selectedAddinId) && a.isActive
      );

      return {
        ...cust,
        totalLicenses: custLicenses.length,
        activeLicenses: activeCount,
        activeSeats: custActivations.length
      };
    });
  }, [allCustomers, allLicenses, allActivations, selectedAddinId, addins]);

  const auditLogs = useMemo(() => {
    if (addins.length === 0) return [];
    if (!selectedAddinId) return allAuditLogs;
    const productLicenseIds = new Set(
      allLicenses.filter((l) => l.productId === selectedAddinId).map((l) => l.id)
    );
    return allAuditLogs.filter(
      (log) =>
        (log.licenseId && productLicenseIds.has(log.licenseId)) ||
        (selectedAddin && log.details.toLowerCase().includes(selectedAddin.name.toLowerCase()))
    );
  }, [allAuditLogs, allLicenses, selectedAddinId, selectedAddin, addins]);

  const globalStats: GlobalStats = useMemo(() => {
    const totalAddins = addins.length;
    const activeAddins = addins.filter((a) => a.status === 'active').length;

    const totalCustomers = addins.length === 0 ? 0 : allCustomers.length;
    const totalLicenses = addins.length === 0 ? 0 : allLicenses.length;
    const totalActiveLicenses = addins.length === 0 ? 0 : allLicenses.filter((l) => l.isActive && !l.revoked).length;
    const totalActiveDevices = addins.length === 0 ? 0 : allActivations.filter((a) => a.isActive).length;
    const totalSecurityEvents = addins.length === 0 ? 0 : allAuditLogs.length;

    return {
      totalAddins,
      activeAddins,
      totalCustomers,
      totalLicenses,
      totalActiveLicenses,
      totalActiveDevices,
      totalSecurityEvents
    };
  }, [addins, allCustomers, allLicenses, allActivations, allAuditLogs]);

  // Action: Register new Addin
  const registerAddin = async (addinData: Omit<Addin, 'id' | 'createdAtUtc' | 'updatedAtUtc' | 'stats'>) => {
    const now = new Date().toISOString();
    const newId = addinData.slug ? `addin_${addinData.slug}` : `addin_${Date.now()}`;
    const newAddin: Addin = {
      ...addinData,
      id: newId,
      createdAtUtc: now,
      updatedAtUtc: now,
      stats: {
        totalCustomers: 0,
        totalLicenses: 0,
        activeLicenses: 0,
        activeDevices: 0,
        revokedLicenses: 0,
        securityEvents: 0
      }
    };

    setAddins((prev) => [newAddin, ...prev]);

    const newLog: AuditLog = {
      id: generateGuid(),
      licenseId: null,
      installationId: null,
      eventType: 'ADDIN_REGISTERED',
      timestampUtc: now,
      ipAddress: '127.0.0.1 (Super Admin)',
      details: `New Add-in registered: "${newAddin.name}" (${newAddin.targetApplication})`
    };
    setAllAuditLogs((prev) => [newLog, ...prev]);

    await supabaseService.saveAddin(newAddin);
    await supabaseService.saveAuditLog(newLog);
    await refreshDataFromServer();
  };

  // Action: Update Addin
  const updateAddin = async (id: string, updates: Partial<Addin>) => {
    const now = new Date().toISOString();
    let updatedAddin: Addin | null = null;

    setAddins((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          updatedAddin = { ...a, ...updates, updatedAtUtc: now };
          return updatedAddin;
        }
        return a;
      })
    );

    if (updatedAddin) {
      await supabaseService.saveAddin(updatedAddin);
      await refreshDataFromServer();
    }
  };

  // Action: Delete Addin
  const deleteAddin = async (id: string) => {
    setAddins((prev) => prev.filter((a) => a.id !== id));
    setAllLicenses((prev) => prev.filter((l) => l.productId !== id));
    setAllActivations((prev) => prev.filter((a) => a.productId !== id));
    if (selectedAddinId === id) {
      setSelectedAddinId(null);
    }
    await supabaseService.deleteAddin(id);
    await refreshDataFromServer();
  };

  // Action: Toggle Status
  const toggleAddinStatus = async (id: string) => {
    let updatedAddin: Addin | null = null;
    setAddins((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus: AddinStatus = a.status === 'active' ? 'maintenance' : 'active';
          updatedAddin = { ...a, status: nextStatus, updatedAtUtc: new Date().toISOString() };
          return updatedAddin;
        }
        return a;
      })
    );

    if (updatedAddin) {
      await supabaseService.saveAddin(updatedAddin);
      await refreshDataFromServer();
    }
  };

  // Action: Add Customer
  const addCustomerForAddin = async (customerData: { name: string; email: string; company?: string }): Promise<Customer> => {
    const now = new Date().toISOString();
    const newCust: Customer = {
      id: generateGuid(),
      name: customerData.name,
      email: customerData.email,
      company: customerData.company || '',
      createdAtUtc: now,
      isActive: true,
      totalLicenses: 0,
      activeLicenses: 0
    };

    setAllCustomers((prev) => [newCust, ...prev]);

    // Save to Supabase PostgreSQL immediately
    await supabaseService.saveCustomer(newCust);
    await refreshDataFromServer();
    return newCust;
  };

  // Action: Generate/Add License for specific Addin
  const addLicenseForAddin = async (licenseData: Partial<License>) => {
    const now = new Date().toISOString();
    const targetAddinId = licenseData.productId || selectedAddinId || 'addin_clemp_excel';
    const targetAddin = addins.find((a) => a.id === targetAddinId);

    // 1. Ensure Customer exists in Supabase first to satisfy Foreign Key constraint
    let custId = licenseData.customerId;
    if (!custId || custId.startsWith('cust_')) {
      custId = generateGuid();
    }

    const existingCust = allCustomers.find((c) => c.id === custId || c.email === licenseData.customerEmail);
    const finalCustId = existingCust ? existingCust.id : custId;

    const newCustomer: Customer = {
      id: finalCustId,
      name: licenseData.customerName || 'Enterprise Partner',
      email: licenseData.customerEmail || 'customer@corp.com',
      company: licenseData.customerCompany || '',
      createdAtUtc: now,
      isActive: true,
      totalLicenses: 1,
      activeLicenses: 1
    };

    // Save Customer FIRST to satisfy Foreign Key in Supabase
    await supabaseService.saveCustomer(newCustomer);
    setAllCustomers((prev) => {
      if (prev.some((c) => c.id === newCustomer.id)) return prev;
      return [newCustomer, ...prev];
    });

    // 2. Create License
    const newLicId = generateGuid();
    const newLicense: License = {
      id: newLicId,
      licenseKeyHash: licenseData.licenseKeyHash || `KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      customerId: finalCustId,
      customerName: newCustomer.name,
      customerEmail: newCustomer.email,
      customerCompany: newCustomer.company,
      productId: targetAddinId,
      plan: licenseData.plan || 'Pro',
      expiresAtUtc: licenseData.expiresAtUtc || new Date(Date.now() + 365 * 86400000).toISOString(),
      maxActivations: licenseData.maxActivations || 5,
      activeActivationsCount: 1,
      offlineGraceDays: licenseData.offlineGraceDays || 14,
      revoked: false,
      isActive: true,
      isExpired: false,
      status: 'Active',
      createdAtUtc: now,
      updatedAtUtc: now,
      features: licenseData.features || ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync'],
      lastActivationAtUtc: now
    };

    setAllLicenses((prev) => [newLicense, ...prev]);

    // 3. Create Initial Bound Workstation Seat Activation
    const newActivation: Activation = {
      id: generateGuid(),
      licenseId: newLicId,
      productId: targetAddinId,
      plan: newLicense.plan,
      customerId: finalCustId,
      customerName: newCustomer.name,
      customerEmail: newCustomer.email,
      customerCompany: newCustomer.company,
      installationId: `HWID-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      clientVersion: targetAddin?.version || 'v1.0.0',
      activatedAtUtc: now,
      lastValidatedAtUtc: now,
      isActive: true,
      revokedAtUtc: null,
      status: 'Active'
    };

    setAllActivations((prev) => [newActivation, ...prev]);

    const auditLog: AuditLog = {
      id: generateGuid(),
      licenseId: newLicId,
      installationId: newActivation.installationId,
      eventType: 'LICENSE_GENERATED',
      timestampUtc: now,
      ipAddress: '127.0.0.1 (Admin)',
      details: `License key generated for ${newLicense.customerName} (${targetAddin?.name || 'Addin'})`
    };

    setAllAuditLogs((prev) => [auditLog, ...prev]);

    // Await all Supabase saves BEFORE refreshing
    await supabaseService.saveLicense(newLicense);
    await supabaseService.saveActivation(newActivation);
    await supabaseService.saveAuditLog(auditLog);

    await refreshDataFromServer();
  };

  // Revoke License in Context
  const revokeLicenseInContext = async (id: string, reason: string) => {
    const now = new Date().toISOString();
    const targetLicense = allLicenses.find((l) => l.id === id);

    const updatedLicense: License | undefined = targetLicense
      ? { ...targetLicense, revoked: true, isActive: false, status: 'Revoked', updatedAtUtc: now }
      : undefined;

    setAllLicenses((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, revoked: true, isActive: false, status: 'Revoked', updatedAtUtc: now } : l
      )
    );

    // Atomically revoke all bound workstation seats for this license
    setAllActivations((prev) =>
      prev.map((a) =>
        a.licenseId === id
          ? { ...a, isActive: false, status: 'Revoked', revokedAtUtc: now }
          : a
      )
    );

    const auditLog: AuditLog = {
      id: generateGuid(),
      licenseId: id,
      installationId: null,
      eventType: 'LICENSE_REVOKED',
      timestampUtc: now,
      ipAddress: '127.0.0.1 (Admin)',
      details: `License ${id} revoked. Reason: ${reason}`
    };
    setAllAuditLogs((prev) => [auditLog, ...prev]);

    // Await Supabase writes FIRST before polling
    if (updatedLicense) {
      await supabaseService.saveLicense(updatedLicense);
    }

    const boundActs = allActivations.filter((a) => a.licenseId === id);
    for (const a of boundActs) {
      await supabaseService.saveActivation({ ...a, isActive: false, revokedAtUtc: now });
    }

    await supabaseService.saveAuditLog(auditLog);
    serverApi.revokeLicense(id, reason);
    await refreshDataFromServer();
  };

  // Reactivate License in Context
  const reactivateLicenseInContext = async (id: string) => {
    const now = new Date().toISOString();
    const targetLicense = allLicenses.find((l) => l.id === id);
    const updatedLicense: License | undefined = targetLicense
      ? { ...targetLicense, revoked: false, isActive: true, status: 'Active', updatedAtUtc: now }
      : undefined;

    setAllLicenses((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, revoked: false, isActive: true, status: 'Active', updatedAtUtc: now } : l
      )
    );

    // Re-enable activations for this license
    setAllActivations((prev) =>
      prev.map((a) =>
        a.licenseId === id
          ? { ...a, isActive: true, status: 'Active', revokedAtUtc: null }
          : a
      )
    );

    if (updatedLicense) {
      await supabaseService.saveLicense(updatedLicense);
      const boundActs = allActivations.filter((a) => a.licenseId === id);
      for (const a of boundActs) {
        await supabaseService.saveActivation({ ...a, isActive: true, revokedAtUtc: null });
      }
      await refreshDataFromServer();
    }
  };

  // Release Activation in Context
  const releaseActivationInContext = async (id: string, reason: string) => {
    const targetAct = allActivations.find((a) => a.id === id);
    const updatedAct: Activation | undefined = targetAct
      ? { ...targetAct, isActive: false, status: 'Released' }
      : undefined;

    setAllActivations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isActive: false, status: 'Released' } : a))
    );

    if (updatedAct) {
      await supabaseService.saveActivation(updatedAct);
      await refreshDataFromServer();
    }
    serverApi.releaseActivation(id, reason);
  };

  // Reset Identity in Context
  const resetIdentityInContext = async (id: string, reason: string) => {
    const now = new Date().toISOString();
    const targetAct = allActivations.find((a) => a.id === id);
    if (targetAct) {
      const updated: Activation = {
        ...targetAct,
        installationId: `HWID-REBOUND-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        lastValidatedAtUtc: now,
        status: 'Rebound' as const
      };
      setAllActivations((prev) => prev.map((a) => (a.id === id ? updated : a)));
      await supabaseService.saveActivation(updated);
      await refreshDataFromServer();
    }
  };

  return (
    <AddinContext.Provider
      value={{
        addins: computedAddins,
        selectedAddinId,
        selectedAddin,
        globalStats,
        allCustomers,
        allLicenses,
        allActivations,
        allAuditLogs,
        customers,
        licenses,
        activations,
        auditLogs,
        setSelectedAddinId,
        registerAddin,
        updateAddin,
        deleteAddin,
        toggleAddinStatus,
        addLicenseForAddin,
        addCustomerForAddin,
        revokeLicenseInContext,
        reactivateLicenseInContext,
        releaseActivationInContext,
        resetIdentityInContext,
        refreshDataFromServer
      }}
    >
      {children}
    </AddinContext.Provider>
  );
};

export const useAddins = () => {
  const context = useContext(AddinContext);
  if (!context) {
    throw new Error('useAddins must be used within an AddinProvider');
  }
  return context;
};
