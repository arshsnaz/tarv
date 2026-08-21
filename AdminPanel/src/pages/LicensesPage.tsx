import React, { useState, useEffect, useMemo } from 'react';
import { useAddins } from '../context/AddinContext';
import { License, LicenseDetail, CreateLicenseRequest } from '../types';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { SearchIcon, PlusIcon, RefreshIcon, CopyIcon, CheckIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { formatDate } from '../utils/dateUtils';
import { copyTextToClipboard } from '../utils/copyToClipboard';

interface LicensesPageProps {
  isCreateOpen?: boolean;
  onCloseCreate?: () => void;
}

const AVAILABLE_FEATURES = ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync', 'DWGExport', 'PDFExport', 'BatchExport'];

export const LicensesPage: React.FC<LicensesPageProps> = ({ isCreateOpen = false, onCloseCreate }) => {
  const {
    licenses,
    selectedAddin,
    selectedAddinId,
    allCustomers,
    allActivations,
    addLicenseForAddin,
    revokeLicenseInContext,
    reactivateLicenseInContext
  } = useAddins();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [sortDesc, setSortDesc] = useState(true);

  // Create License State
  const [isModalOpen, setIsModalOpen] = useState(isCreateOpen);
  const [createForm, setCreateForm] = useState<CreateLicenseRequest>({
    customerId: '',
    customerName: '',
    customerEmail: '',
    customerCompany: '',
    productId: selectedAddinId || 'addin_clemp_excel',
    plan: 'Pro',
    maxActivations: 5,
    offlineGraceDays: 14,
    validDays: 365,
    features: ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync']
  });

  const [customerMode, setCustomerMode] = useState<'existing' | 'new'>('new');

  // Generated Key Dialog
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // View Details Modal
  const [selectedLicense, setSelectedLicense] = useState<LicenseDetail | null>(null);

  // Revoke Dialog
  const [licenseToRevoke, setLicenseToRevoke] = useState<License | null>(null);
  const [revokeReason, setRevokeReason] = useState('Revoked by administrator');

  const { showToast } = useToast();

  useEffect(() => {
    if (isCreateOpen) {
      setIsModalOpen(true);
    }
  }, [isCreateOpen]);

  useEffect(() => {
    if (selectedAddinId) {
      setCreateForm((prev) => ({ ...prev, productId: selectedAddinId }));
    }
  }, [selectedAddinId]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (onCloseCreate) onCloseCreate();
  };

  const filteredLicenses = useMemo(() => {
    return licenses
      .filter((l) => {
        const q = search.toLowerCase();
        const matchesSearch =
          l.customerName.toLowerCase().includes(q) ||
          l.customerEmail.toLowerCase().includes(q) ||
          l.plan.toLowerCase().includes(q) ||
          l.licenseKeyHash.toLowerCase().includes(q);

        const matchesStatus = !statusFilter || l.status === statusFilter;
        const matchesPlan = !planFilter || l.plan === planFilter;

        return matchesSearch && matchesStatus && matchesPlan;
      })
      .sort((a, b) => {
        if (sortBy === 'customer') {
          return sortDesc ? b.customerName.localeCompare(a.customerName) : a.customerName.localeCompare(b.customerName);
        }
        if (sortBy === 'activations') {
          return sortDesc ? b.activeActivationsCount - a.activeActivationsCount : a.activeActivationsCount - b.activeActivationsCount;
        }
        const dateA = new Date(a.createdAtUtc).getTime();
        const dateB = new Date(b.createdAtUtc).getTime();
        return sortDesc ? dateB - dateA : dateA - dateB;
      });
  }, [licenses, search, statusFilter, planFilter, sortBy, sortDesc]);

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (customerMode === 'new') {
      if (!createForm.customerName?.trim() || !createForm.customerEmail?.trim()) {
        showToast('Customer Name and Email are required.', 'error');
        return;
      }
    } else {
      if (!createForm.customerId) {
        showToast('Please select an existing customer.', 'error');
        return;
      }
    }

    const selectedCust = allCustomers.find((c) => c.id === createForm.customerId);
    const mockKey = `KEY-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const payload: Partial<License> = {
      ...createForm,
      licenseKeyHash: mockKey,
      productId: selectedAddinId || createForm.productId,
      customerId: customerMode === 'existing' ? createForm.customerId : undefined,
      customerName: customerMode === 'new' ? createForm.customerName : selectedCust?.name || 'Customer',
      customerEmail: customerMode === 'new' ? createForm.customerEmail : selectedCust?.email || 'email@corp.com',
      customerCompany: customerMode === 'new' ? createForm.customerCompany : selectedCust?.company || ''
    };

    await addLicenseForAddin(payload);

    setGeneratedKey(mockKey);
    showToast('License key generated and saved to database!', 'success');
    handleCloseModal();
  };

  const handleCopyKey = async (keyText: string) => {
    if (!keyText) return;
    const ok = await copyTextToClipboard(keyText);
    if (ok) {
      setCopiedKey(keyText);
      showToast('License Key copied to clipboard!', 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    } else {
      showToast('Please select and copy the key manually.', 'error');
    }
  };

  const handleViewLicense = (lic: License) => {
    const licActivations = allActivations.filter((a) => a.licenseId === lic.id);
    setSelectedLicense({
      ...lic,
      activations: licActivations
    });
  };

  const handleConfirmRevoke = () => {
    if (!licenseToRevoke) return;
    revokeLicenseInContext(licenseToRevoke.id, revokeReason);
    showToast('License has been revoked.', 'success');
    setLicenseToRevoke(null);
  };

  const handleReactivate = (lic: License) => {
    reactivateLicenseInContext(lic.id);
    showToast('License reactivated successfully!', 'success');
  };

  const toggleFeature = (feature: string) => {
    setCreateForm((prev) => {
      const exists = prev.features.includes(feature);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== feature)
          : [...prev.features, feature]
      };
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Scope Banner */}
      {selectedAddin && (
        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${selectedAddin.iconBgColor} text-white font-bold flex items-center justify-center text-sm`}>
              {selectedAddin.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-black text-blue-950 uppercase tracking-wider">
                Product Scoped License Management
              </div>
              <div className="text-xs font-bold text-blue-800">
                Displaying product keys for {selectedAddin.name} ({selectedAddin.targetApplication})
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white">
            {filteredLicenses.length} Product Keys
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
            License Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Issue cryptographically verified keys and manage limits for {selectedAddin ? selectedAddin.name : 'All Products'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => showToast('Licenses list refreshed', 'success')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            <RefreshIcon size={14} /> Refresh
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
          >
            <PlusIcon size={14} /> Create License
          </button>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-card">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
            placeholder="Search by customer, email, plan, key..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Revoked">Revoked</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
          >
            <option value="">All Plans</option>
            <option value="Standard">Standard</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Trial">Trial</option>
          </select>

          <select
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
            value={`${sortBy}-${sortDesc}`}
            onChange={(e) => {
              const [sb, sd] = e.target.value.split('-');
              setSortBy(sb);
              setSortDesc(sd === 'true');
            }}
          >
            <option value="created-true">Newest Issued</option>
            <option value="created-false">Oldest Issued</option>
            <option value="customer-false">Customer (A-Z)</option>
            <option value="activations-true">Most Active Seats</option>
          </select>
        </div>
      </div>

      {/* Licenses Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Product License Key</th>
                <th className="px-5 py-3.5">Plan</th>
                <th className="px-5 py-3.5">Active / Max Seats</th>
                <th className="px-5 py-3.5">Offline Grace</th>
                <th className="px-5 py-3.5">Expires</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLicenses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No license keys found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLicenses.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-dark font-bold">
                      {l.customerName}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {l.customerEmail}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 select-all">
                          {l.licenseKeyHash}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyKey(l.licenseKeyHash)}
                          className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                          title="Copy License Key"
                        >
                          {copiedKey === l.licenseKeyHash ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEF5EE] text-primary">
                        {l.plan}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-bold text-dark">
                      {l.activeActivationsCount} / {l.maxActivations}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{l.offlineGraceDays} days</td>
                    <td className="px-5 py-3.5 text-slate-500 font-normal">
                      {formatDate(l.expiresAtUtc)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={l.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleViewLicense(l)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          Details
                        </button>
                        {l.revoked ? (
                          <button
                            onClick={() => handleReactivate(l)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#34B1AA] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            Reactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => setLicenseToRevoke(l)}
                            className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create License Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`Issue New License ${selectedAddin ? `for ${selectedAddin.name}` : ''}`}
        maxWidth="max-w-xl"
        footer={
          <>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateLicense}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Generate License Key
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateLicense} className="space-y-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setCustomerMode('new')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                customerMode === 'new' ? 'bg-white text-dark shadow-xs' : 'text-slate-500 hover:text-dark'
              }`}
            >
              New Customer
            </button>
            <button
              type="button"
              onClick={() => setCustomerMode('existing')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                customerMode === 'existing' ? 'bg-white text-dark shadow-xs' : 'text-slate-500 hover:text-dark'
              }`}
            >
              Existing Customer
            </button>
          </div>

          {customerMode === 'new' ? (
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Customer Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                  value={createForm.customerName}
                  onChange={(e) => setCreateForm({ ...createForm, customerName: e.target.value })}
                  placeholder="e.g. Sarah Connor"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-dark mb-1">Email Address *</label>
                <input
                  type="email"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                  value={createForm.customerEmail}
                  onChange={(e) => setCreateForm({ ...createForm, customerEmail: e.target.value })}
                  placeholder="sarah@corp.com"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold text-dark mb-1">Company</label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                  value={createForm.customerCompany}
                  onChange={(e) => setCreateForm({ ...createForm, customerCompany: e.target.value })}
                  placeholder="Cyberdyne Systems"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Select Customer *</label>
              <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                value={createForm.customerId}
                onChange={(e) => setCreateForm({ ...createForm, customerId: e.target.value })}
                required
              >
                <option value="">-- Choose Account --</option>
                {allCustomers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email}) - {c.company || 'No Company'}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Target Product</label>
              <input
                type="text"
                disabled
                className="w-full px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs text-slate-700 font-bold"
                value={selectedAddin ? selectedAddin.name : createForm.productId}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Plan</label>
              <select
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                value={createForm.plan}
                onChange={(e) => setCreateForm({ ...createForm, plan: e.target.value })}
              >
                {selectedAddin
                  ? selectedAddin.plans.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} (${p.priceYearly}/yr)
                      </option>
                    ))
                  : [
                      <option key="std" value="Standard">Standard</option>,
                      <option key="pro" value="Pro">Pro</option>,
                      <option key="ent" value="Enterprise">Enterprise</option>
                    ]}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Max Seats</label>
              <input
                type="number"
                min="1"
                max="100"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                value={createForm.maxActivations}
                onChange={(e) => setCreateForm({ ...createForm, maxActivations: parseInt(e.target.value) || 1 })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Offline Grace</label>
              <input
                type="number"
                min="1"
                max="90"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                value={createForm.offlineGraceDays}
                onChange={(e) => setCreateForm({ ...createForm, offlineGraceDays: parseInt(e.target.value) || 14 })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-dark mb-1">Validity (Days)</label>
              <input
                type="number"
                min="1"
                max="3650"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-primary"
                value={createForm.validDays}
                onChange={(e) => setCreateForm({ ...createForm, validDays: parseInt(e.target.value) || 365 })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1.5">Enabled Features</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_FEATURES.map((f) => {
                const isChecked = createForm.features.includes(f);
                return (
                  <label
                    key={f}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-primary-light text-primary border-primary'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFeature(f)}
                      className="accent-[#F29F67]"
                    />
                    {f}
                  </label>
                );
              })}
            </div>
          </div>
        </form>
      </Modal>

      {/* Generated Key Popup Dialog */}
      <Modal
        isOpen={generatedKey !== null}
        onClose={() => setGeneratedKey(null)}
        title="License Key Generated"
        footer={
          <button
            onClick={() => setGeneratedKey(null)}
            className="px-5 py-2.5 bg-[#F29F67] hover:bg-[#e88d53] text-white text-xs font-black rounded-xl shadow-md transition-colors"
          >
            Done
          </button>
        }
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#34B1AA] flex items-center justify-center text-xl font-bold mx-auto border border-emerald-200">
            ✓
          </div>
          <div>
            <h3 className="text-base font-bold text-dark">Ready for Client Activation</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Provide this key to the customer. This product key binds to {selectedAddin ? selectedAddin.name : 'the product'}.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
            <span className="font-mono text-sm sm:text-base font-bold text-dark tracking-wide truncate select-all">
              {generatedKey}
            </span>
            <button
              type="button"
              onClick={() => generatedKey && handleCopyKey(generatedKey)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F29F67] text-white hover:bg-[#e88d53] text-xs font-black rounded-xl shadow-sm shrink-0 transition-colors cursor-pointer"
            >
              {copiedKey === generatedKey ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              <span>{copiedKey === generatedKey ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Revoke Modal */}
      <Modal
        isOpen={licenseToRevoke !== null}
        onClose={() => setLicenseToRevoke(null)}
        title="Revoke License"
        footer={
          <>
            <button
              onClick={() => setLicenseToRevoke(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRevoke}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Confirm Revocation
            </button>
          </>
        }
      >
        {licenseToRevoke && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
              <strong>Warning:</strong> Revoking this license immediately invalidates all active client installations.
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div><strong>Customer:</strong> {licenseToRevoke.customerName}</div>
              <div><strong>Plan:</strong> {licenseToRevoke.plan}</div>
              <div><strong>Active Seats:</strong> {licenseToRevoke.activeActivationsCount}</div>
            </div>

            <div>
              <label className="block font-bold text-dark mb-1">Reason *</label>
              <textarea
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-rose-500"
                rows={3}
                value={revokeReason}
                onChange={(e) => setRevokeReason(e.target.value)}
                placeholder="e.g. Non-payment, refund issued"
                required
              />
            </div>
          </div>
        )}
      </Modal>

      {/* License Details Modal */}
      <Modal
        isOpen={selectedLicense !== null}
        onClose={() => setSelectedLicense(null)}
        title="License Details"
        maxWidth="max-w-2xl"
        footer={
          <button
            onClick={() => setSelectedLicense(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        }
      >
        {selectedLicense && (
          <div className="space-y-5">
            {/* Product Key Display Box */}
            <div className="p-4 bg-slate-900 text-white rounded-2xl shadow-md space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                🔑 Cryptographic License Key
              </span>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-white tracking-wider truncate select-all">
                  {selectedLicense.licenseKeyHash}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyKey(selectedLicense.licenseKeyHash)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs shrink-0 transition-colors"
                >
                  {copiedKey === selectedLicense.licenseKeyHash ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
                  <span>{copiedKey === selectedLicense.licenseKeyHash ? 'Copied!' : 'Copy Key'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Customer</span>
                <strong className="text-dark font-semibold text-sm">{selectedLicense.customerName}</strong>
                <span className="text-slate-500 block">{selectedLicense.customerEmail}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Plan & Product</span>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-[#FEF5EE] text-primary">
                  {selectedLicense.plan}
                </span>
                <span className="text-slate-500 block mt-0.5">{selectedLicense.productId}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Seats Allocation</span>
                <strong className="text-dark font-semibold">
                  {selectedLicense.activeActivationsCount} / {selectedLicense.maxActivations} bound
                </strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Expiration</span>
                <span className="text-slate-600 font-semibold">{formatDate(selectedLicense.expiresAtUtc)}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Offline Grace</span>
                <span className="text-slate-600">{selectedLicense.offlineGraceDays} Days</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Status</span>
                <Badge status={selectedLicense.status} />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Feature Flags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedLicense.features.map((f) => (
                  <span key={f} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-[#34B1AA] border border-emerald-200">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Active Devices ({selectedLicense.activations.length})
              </h4>
              {selectedLicense.activations.length === 0 ? (
                <p className="text-xs text-slate-400">No activations recorded.</p>
              ) : (
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                        <th className="px-4 py-2.5">Device ID</th>
                        <th className="px-4 py-2.5">Version</th>
                        <th className="px-4 py-2.5">Activated</th>
                        <th className="px-4 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {selectedLicense.activations.map((a) => (
                        <tr key={a.id}>
                          <td className="px-4 py-2.5 font-mono text-[11px] text-slate-600 truncate max-w-xs">{a.installationId}</td>
                          <td className="px-4 py-2.5 text-slate-500">{a.clientVersion || '1.0.0'}</td>
                          <td className="px-4 py-2.5 text-slate-500">{formatDate(a.activatedAtUtc)}</td>
                          <td className="px-4 py-2.5"><Badge status={a.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
