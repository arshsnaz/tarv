import React, { useState, useMemo } from 'react';
import { useAddins } from '../context/AddinContext';
import { Activation } from '../types';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { SearchIcon, RefreshIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { formatDate, formatDateTime } from '../utils/dateUtils';

export const ActivationsPage: React.FC = () => {
  const {
    activations,
    selectedAddin,
    releaseActivationInContext,
    resetIdentityInContext
  } = useAddins();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Release Seat Dialog
  const [actToRelease, setActToRelease] = useState<Activation | null>(null);
  const [releaseReason, setReleaseReason] = useState('Workstation decommissioned by admin');

  // Reset Identity Dialog
  const [actToReset, setActToReset] = useState<Activation | null>(null);
  const [resetReason, setResetReason] = useState('Client identity corruption repair');

  const { showToast } = useToast();

  // Filter Activations
  const filteredActivations = useMemo(() => {
    return activations.filter((a) => {
      const q = search.toLowerCase();
      const matchesSearch =
        (a.customerName && a.customerName.toLowerCase().includes(q)) ||
        (a.customerEmail && a.customerEmail.toLowerCase().includes(q)) ||
        (a.installationId && a.installationId.toLowerCase().includes(q)) ||
        (a.plan && a.plan.toLowerCase().includes(q));

      const matchesStatus = !statusFilter || a.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [activations, search, statusFilter]);

  const handleConfirmRelease = () => {
    if (!actToRelease) return;
    releaseActivationInContext(actToRelease.id, releaseReason);
    showToast('Device seat has been released successfully.', 'success');
    setActToRelease(null);
  };

  const handleConfirmReset = () => {
    if (!actToReset) return;
    resetIdentityInContext(actToReset.id, resetReason);
    showToast('Workstation hardware identity rebound successfully.', 'success');
    setActToReset(null);
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
                Product Scoped Device Activations
              </div>
              <div className="text-xs font-bold text-blue-800">
                Displaying connected workstation seats for {selectedAddin.name} ({selectedAddin.targetApplication})
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white">
            {filteredActivations.length} Bound Seats
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
            Device Activations & Seats
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Monitor client hardware installation IDs and rebind bound seats for {selectedAddin ? selectedAddin.name : 'All Products'}
          </p>
        </div>

        <button
          onClick={() => showToast('Activations list refreshed', 'success')}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <RefreshIcon size={14} /> Refresh
        </button>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-card">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <SearchIcon size={16} />
          </div>
          <input
            type="text"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all"
            placeholder="Search by device ID, customer, plan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Released">Released</option>
          <option value="Rebound">Rebound</option>
          <option value="Revoked">Revoked</option>
        </select>
      </div>

      {/* Activations Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Workstation Identity</th>
                <th className="px-5 py-3.5">Version</th>
                <th className="px-5 py-3.5">Activated</th>
                <th className="px-5 py-3.5">Last Validated</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredActivations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No active device seats found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredActivations.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 text-dark font-bold">
                      {a.customerName || 'Dev Customer'}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        {a.plan || 'Pro'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-600">
                      {a.installationId ? `${a.installationId.substring(0, 20)}...` : '—'}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{a.clientVersion || '1.0.0'}</td>
                    <td className="px-5 py-3.5 text-slate-500 font-normal">
                      {formatDate(a.activatedAtUtc)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-400 font-normal">
                      {formatDateTime(a.lastValidatedAtUtc)}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge status={a.status} />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {a.isActive && (
                          <>
                            <button
                              onClick={() => setActToReset(a)}
                              className="px-2.5 py-1 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
                              title="Rebind hardware fingerprint"
                            >
                              Rebind Identity
                            </button>
                            <button
                              onClick={() => setActToRelease(a)}
                              className="px-2.5 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                              title="Release seat allocation"
                            >
                              Release Seat
                            </button>
                          </>
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

      {/* Release Seat Modal */}
      <Modal
        isOpen={actToRelease !== null}
        onClose={() => setActToRelease(null)}
        title="Release Hardware Seat Allocation"
        footer={
          <>
            <button
              onClick={() => setActToRelease(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmRelease}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Release Seat
            </button>
          </>
        }
      >
        {actToRelease && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
              Releasing this seat frees up 1 hardware activation slot for {actToRelease.customerName}.
            </div>

            <div>
              <label className="block font-bold text-dark mb-1">Reason *</label>
              <textarea
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-rose-500"
                rows={3}
                value={releaseReason}
                onChange={(e) => setReleaseReason(e.target.value)}
                placeholder="e.g. Workstation replaced"
                required
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Reset Identity Modal */}
      <Modal
        isOpen={actToReset !== null}
        onClose={() => setActToReset(null)}
        title="Rebind Workstation Identity"
        footer={
          <>
            <button
              onClick={() => setActToReset(null)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmReset}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
            >
              Rebind Fingerprint
            </button>
          </>
        }
      >
        {actToReset && (
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
              Rebinding replaces the workstation hardware hash key to resolve client machine OS format or hardware upgrades.
            </div>

            <div>
              <label className="block font-bold text-dark mb-1">Reason *</label>
              <textarea
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-dark focus:outline-none focus:border-amber-500"
                rows={3}
                value={resetReason}
                onChange={(e) => setResetReason(e.target.value)}
                placeholder="e.g. Motherboard upgraded"
                required
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
