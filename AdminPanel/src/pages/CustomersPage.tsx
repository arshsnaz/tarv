import React, { useState, useMemo } from 'react';
import { useAddins } from '../context/AddinContext';
import { Customer, CustomerDetail, License } from '../types';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { SearchIcon, PlusIcon, RefreshIcon, CopyIcon, CheckIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { formatDate } from '../utils/dateUtils';
import { copyTextToClipboard } from '../utils/copyToClipboard';

export const CustomersPage: React.FC = () => {
  const {
    customers,
    selectedAddin,
    selectedAddinId,
    setSelectedAddinId,
    allLicenses,
    allActivations,
    addCustomerForAddin,
    refreshDataFromServer
  } = useAddins();

  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created');
  const [sortDesc, setSortDesc] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', company: '' });
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDetail | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { showToast } = useToast();

  const [originFilter, setOriginFilter] = useState('ALL');

  const getCustomerOrigin = (c: Customer, custLicenses: License[]) => {
    const planNames = custLicenses.map((l) => (l.plan || '').toLowerCase());
    const productIds = custLicenses.map((l) => (l.productId || '').toLowerCase());

    if (planNames.some((p) => p.includes('beta access') || p.includes('access request'))) {
      return { id: 'beta', label: 'Private Beta Request (/access)', bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-700', icon: '🚀' };
    }
    if (planNames.some((p) => p.includes('contact lead'))) {
      return { id: 'contact', label: 'Contact Lead (/contact)', bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', icon: '📩' };
    }
    if (productIds.some((p) => p.includes('clemp'))) {
      return { id: 'excel', label: 'ClEmpAddIn (Excel)', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: '⚡' };
    }
    if (productIds.some((p) => p.includes('revit'))) {
      return { id: 'revit', label: 'Revit Exporter Suite', bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', icon: '🏗️' };
    }
    if (planNames.some((p) => p.includes('registered customer'))) {
      return { id: 'portal', label: 'Customer Portal SSO (/portal)', bg: 'bg-indigo-50 border-indigo-200', text: 'text-indigo-700', icon: '🔑' };
    }
    return { id: 'direct', label: 'Direct Enterprise Account', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-700', icon: '💼' };
  };

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((c) => {
        const q = search.toLowerCase();
        const custLics = allLicenses.filter((l) => l.customerId === c.id);
        const origin = getCustomerOrigin(c, custLics);

        const matchesSearch =
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.company.toLowerCase().includes(q) ||
          origin.label.toLowerCase().includes(q);

        if (originFilter === 'ALL') return matchesSearch;
        return matchesSearch && origin.id === originFilter;
      })
      .sort((a, b) => {
        if (sortBy === 'name') {
          return sortDesc ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        }
        if (sortBy === 'licenses') {
          return sortDesc ? b.totalLicenses - a.totalLicenses : a.totalLicenses - b.totalLicenses;
        }
        const dateA = new Date(a.createdAtUtc).getTime();
        const dateB = new Date(b.createdAtUtc).getTime();
        return sortDesc ? dateB - dateA : dateA - dateB;
      });
  }, [customers, search, originFilter, sortBy, sortDesc, allLicenses]);

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name.trim() || !newCustomer.email.trim()) {
      showToast('Name and Email are required.', 'error');
      return;
    }

    await addCustomerForAddin(newCustomer);
    showToast(`Customer '${newCustomer.name}' created successfully!`, 'success');
    setIsAddModalOpen(false);
    setNewCustomer({ name: '', email: '', company: '' });
  };

  const handleCopyKey = async (keyText: string) => {
    if (!keyText) return;
    const ok = await copyTextToClipboard(keyText);
    if (ok) {
      setCopiedKey(keyText);
      showToast('License Key copied!', 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleViewCustomer = (cust: Customer) => {
    const custLicenses = allLicenses.filter(
      (l) => l.customerId === cust.id && (!selectedAddinId || l.productId === selectedAddinId)
    );
    const custActivations = allActivations.filter(
      (a) => a.customerId === cust.id && (!selectedAddinId || a.productId === selectedAddinId)
    );

    const detail: CustomerDetail = {
      ...cust,
      totalLicenses: custLicenses.length,
      activeLicenses: custLicenses.filter((l) => l.isActive && !l.revoked).length,
      licenses: custLicenses,
      activations: custActivations
    };

    setSelectedCustomer(detail);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Scope Banner */}
      {selectedAddin && (
        <div className="bg-blue-50 border border-blue-200/80 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${selectedAddin.iconBgColor || 'bg-blue-600'} text-white font-bold flex items-center justify-center text-sm`}>
              {selectedAddin.name.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-black text-blue-950 uppercase tracking-wider">
                Product Scoped Customer View
              </div>
              <div className="text-xs font-bold text-blue-800">
                Displaying accounts registered for {selectedAddin.name} ({selectedAddin.targetApplication})
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedAddinId(null)}
              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              Show All TARV Customer Signups →
            </button>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
              {filteredCustomers.length} Accounts
            </span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
            Customer Directory & Signup Origins
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Manage registered client accounts, acquisition sources, and assigned license keys for {selectedAddin ? selectedAddin.name : 'All TARV Signups'}.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              refreshDataFromServer();
              showToast('Customer directory refreshed', 'success');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <RefreshIcon size={14} />
            <span>Refresh Data</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <PlusIcon size={14} />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Acquisition Origin Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Filter Origin:</span>
        {[
          { id: 'ALL', label: 'All Customer Signups', icon: '🌐' },
          { id: 'excel', label: 'ClEmpAddIn Excel', icon: '⚡' },
          { id: 'revit', label: 'Revit Exporter Suite', icon: '🏗️' },
          { id: 'beta', label: 'Beta Requests (/access)', icon: '🚀' },
          { id: 'portal', label: 'Portal SSO (/portal)', icon: '🔑' },
          { id: 'contact', label: 'Contact Leads (/contact)', icon: '📩' },
        ].map((pill) => (
          <button
            key={pill.id}
            onClick={() => setOriginFilter(pill.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              originFilter === pill.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{pill.icon}</span>
            <span>{pill.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search name, email, company, or origin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-dark placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-slate-400" size={14} />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium self-end sm:self-auto">
          <span>Sort by:</span>
          <select
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none"
            value={`${sortBy}-${sortDesc}`}
            onChange={(e) => {
              const [sb, sd] = e.target.value.split('-');
              setSortBy(sb);
              setSortDesc(sd === 'true');
            }}
          >
            <option value="created-true">Newest Registered</option>
            <option value="created-false">Oldest Registered</option>
            <option value="name-false">Name (A-Z)</option>
            <option value="name-true">Name (Z-A)</option>
            <option value="licenses-true">Most Licenses</option>
          </select>
        </div>
      </div>

      {/* Customer Data Table with Acquisition Source Column */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200/80">
                <th className="px-5 py-3.5">Customer Name</th>
                <th className="px-5 py-3.5">Work Email</th>
                <th className="px-5 py-3.5">Signup Origin / Portal</th>
                <th className="px-5 py-3.5">Company / Firm</th>
                <th className="px-5 py-3.5">Licenses</th>
                <th className="px-5 py-3.5">Active Seats</th>
                <th className="px-5 py-3.5">Registered</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    No customer accounts found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const custLicenses = allLicenses.filter(
                    (l) => l.customerId === c.id && (!selectedAddinId || l.productId === selectedAddinId)
                  );
                  const activeCount = custLicenses.filter((l) => l.isActive && !l.revoked && !l.isExpired).length;
                  const revokedCount = custLicenses.filter((l) => l.revoked).length;
                  const expiredCount = custLicenses.filter((l) => l.isExpired).length;

                  const activeSeats = allActivations.filter(
                    (a) => a.customerId === c.id && (!selectedAddinId || a.productId === selectedAddinId) && a.isActive
                  ).length;

                  const origin = getCustomerOrigin(c, custLicenses);

                  // Dynamically determine Customer Product Licensing Status
                  let productStatus: 'Active' | 'Revoked' | 'Expired' | 'Inactive' = 'Inactive';
                  if (activeCount > 0) {
                    productStatus = 'Active';
                  } else if (revokedCount > 0 && revokedCount === custLicenses.length) {
                    productStatus = 'Revoked';
                  } else if (expiredCount > 0 && expiredCount === custLicenses.length) {
                    productStatus = 'Expired';
                  } else {
                    productStatus = 'Inactive';
                  }

                  return (
                    <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-black text-xs grid place-items-center shrink-0">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{c.id.substring(0, 10)}...</div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-blue-600 font-semibold">{c.email}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${origin.bg} ${origin.text}`}>
                          <span>{origin.icon}</span>
                          <span>{origin.label}</span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-semibold">{c.company || '—'}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {custLicenses.length}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`font-bold ${activeSeats > 0 ? 'text-[#34B1AA]' : 'text-slate-400'}`}>
                          {activeSeats}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 font-mono text-[11px]">
                        {formatDate(c.createdAtUtc)}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge status={productStatus} />
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleViewCustomer(c)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Customer Account"
        footer={
          <>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateCustomer}
              className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Create Customer
            </button>
          </>
        }
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-dark mb-1">Full Name *</label>
            <input
              type="text"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              placeholder="e.g. John Smith"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Email Address *</label>
            <input
              type="email"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              placeholder="e.g. john@architecture.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-dark mb-1">Company / Firm</label>
            <input
              type="text"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-dark focus:outline-none focus:border-primary focus:bg-white transition-all"
              value={newCustomer.company}
              onChange={(e) => setNewCustomer({ ...newCustomer, company: e.target.value })}
              placeholder="e.g. Smith & Partners Architects"
            />
          </div>
        </form>
      </Modal>

      {/* Customer Details Modal */}
      <Modal
        isOpen={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        title={`Customer: ${selectedCustomer?.name || ''}`}
        maxWidth="max-w-2xl"
        footer={
          <button
            onClick={() => setSelectedCustomer(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        }
      >
        {selectedCustomer && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Email Address</span>
                <strong className="text-dark font-semibold text-sm">{selectedCustomer.email}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Company</span>
                <strong className="text-dark font-semibold text-sm">{selectedCustomer.company || 'N/A'}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Registered Since</span>
                <span className="text-slate-600 font-medium">{formatDate(selectedCustomer.createdAtUtc)}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Account Status</span>
                <Badge status={selectedCustomer.isActive ? 'Active' : 'Inactive'} />
              </div>
            </div>

            {/* Owned Licenses */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Assigned Licenses ({selectedCustomer.licenses.length})
              </h4>

              {selectedCustomer.licenses.length === 0 ? (
                <p className="text-xs text-slate-400">No licenses issued yet for this product scope.</p>
              ) : (
                <div className="border border-slate-100 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                        <th className="px-4 py-2.5">License Key</th>
                        <th className="px-4 py-2.5">Plan</th>
                        <th className="px-4 py-2.5">Seats</th>
                        <th className="px-4 py-2.5">Expires</th>
                        <th className="px-4 py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {selectedCustomer.licenses.map((l) => (
                        <tr key={l.id}>
                          <td className="px-4 py-2.5 font-mono text-[11px] font-bold text-slate-900">
                            <div className="flex items-center gap-1.5">
                              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 select-all">
                                {l.licenseKeyHash}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyKey(l.licenseKeyHash)}
                                className="p-1 text-slate-400 hover:text-emerald-600 transition-colors"
                                title="Copy Key"
                              >
                                {copiedKey === l.licenseKeyHash ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-2.5 font-bold text-dark">{l.plan}</td>
                          <td className="px-4 py-2.5 text-slate-600">{l.activeActivationsCount} / {l.maxActivations}</td>
                          <td className="px-4 py-2.5 text-slate-500">{formatDate(l.expiresAtUtc)}</td>
                          <td className="px-4 py-2.5"><Badge status={l.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Device Activations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Active Devices ({selectedCustomer.activations.length})
              </h4>

              {selectedCustomer.activations.length === 0 ? (
                <p className="text-xs text-slate-400">No devices connected.</p>
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
                      {selectedCustomer.activations.map((a) => (
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
