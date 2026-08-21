import React, { useState, useEffect } from 'react';
import { useAddins } from '../context/AddinContext';
import { DashboardStats } from '../types';
import { Badge } from '../components/Badge';
import { RefreshIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { formatDate } from '../utils/dateUtils';

interface DashboardPageProps {
  onNavigate: (tab: 'customers' | 'licenses' | 'activations' | 'audit') => void;
  onOpenCreateLicense: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onOpenCreateLicense }) => {
  const { selectedAddin, selectedAddinId, licenses, activations, customers, auditLogs, refreshDataFromServer } = useAddins();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const loadStats = async () => {
    setLoading(true);
    try {
      await refreshDataFromServer();
      computeLocalStats();
      showToast('Telemetry stats refreshed from database', 'success');
    } finally {
      setLoading(false);
    }
  };

  const computeLocalStats = () => {
    // Filter licenses & activations for the selected add-in if selectedAddinId exists
    const scopedLicenses = selectedAddinId
      ? licenses.filter((l) => l.productId === selectedAddinId)
      : licenses;

    const scopedActivations = selectedAddinId
      ? activations.filter((a) => a.productId === selectedAddinId)
      : activations;

    const activeLicenses = scopedLicenses.filter((l) => l.isActive && !l.revoked && !l.isExpired).length;
    const expiredLicenses = scopedLicenses.filter((l) => l.isExpired).length;
    const revokedLicenses = scopedLicenses.filter((l) => l.revoked).length;
    const activeActivations = scopedActivations.filter((a) => a.isActive).length;

    const localDashboardStats: DashboardStats = {
      totalCustomers: customers.length,
      totalLicenses: scopedLicenses.length,
      activeLicenses: activeLicenses,
      expiredLicenses: expiredLicenses,
      revokedLicenses: revokedLicenses,
      totalActivations: scopedActivations.length,
      activeActivations: activeActivations,
      recentActivities: auditLogs.slice(0, 5).map((log) => ({
        id: log.id,
        eventType: log.eventType,
        details: log.details,
        ipAddress: log.ipAddress,
        timestampUtc: log.timestampUtc,
        licenseId: log.licenseId,
        installationId: log.installationId
      })),
      recentLicenses: scopedLicenses.slice(0, 5),
      recentActivations: scopedActivations.slice(0, 5)
    };

    setStats(localDashboardStats);
  };

  useEffect(() => {
    computeLocalStats();
  }, [selectedAddinId, licenses, activations, customers, auditLogs]);

  const addinName = selectedAddin ? selectedAddin.name : 'SheetExport';
  const addinPlans = selectedAddin
    ? selectedAddin.plans.map((p) => p.name).join(' & ')
    : 'Sheet Export Pro & Standard';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner & Refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
              Performance Summary
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-primary/10 text-primary border border-primary/20">
              {addinName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Real-time licensing activity, customer seats, and machine activations for {addinName}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadStats}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <RefreshIcon size={14} /> Refresh
          </button>
        </div>
      </div>

      {stats && (
        <>
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Active Licenses */}
            <div
              onClick={() => onNavigate('licenses')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Licenses
                </span>
                <span className={`w-2 h-2 rounded-full ${stats.activeLicenses > 0 ? 'bg-[#34B1AA]' : 'bg-slate-300'}`} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                  {stats.activeLicenses}
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${stats.activeLicenses > 0 ? 'text-[#34B1AA] bg-emerald-50' : 'text-slate-500 bg-slate-100'}`}>
                  {stats.activeLicenses > 0 ? 'Live' : 'None Active'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                out of {stats.totalLicenses} total licenses
              </p>
            </div>

            {/* Total Customers */}
            <div
              onClick={() => onNavigate('customers')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Total Customers
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3B8FF3]" />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                  {stats.totalCustomers}
                </span>
                <span className="text-xs font-bold text-[#3B8FF3] bg-blue-50 px-1.5 py-0.5 rounded">
                  Accounts
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                registered client organizations
              </p>
            </div>

            {/* Active Activations */}
            <div
              onClick={() => onNavigate('activations')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Active Devices
                </span>
                <span className={`w-2 h-2 rounded-full ${stats.activeActivations > 0 ? 'bg-primary' : 'bg-slate-300'}`} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                  {stats.activeActivations}
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${stats.activeActivations > 0 ? 'text-primary bg-primary-light' : 'text-slate-500 bg-slate-100'}`}>
                  {stats.activeActivations > 0 ? 'Connected' : '0 Seats Bound'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                of {stats.totalActivations} total bound seats
              </p>
            </div>

            {/* Expired / Attention */}
            <div
              onClick={() => onNavigate('licenses')}
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Expired / Revoked
                </span>
                <span className={`w-2 h-2 rounded-full ${stats.revokedLicenses + stats.expiredLicenses > 0 ? 'bg-rose-500' : 'bg-slate-300'}`} />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                  {stats.expiredLicenses + stats.revokedLicenses}
                </span>
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${stats.revokedLicenses > 0 ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'}`}>
                  Attention
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {stats.expiredLicenses} expired, {stats.revokedLicenses} revoked
              </p>
            </div>
          </div>

          {/* Featured Summary Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Deep Navy Status Card */}
            <div className="bg-dark text-white p-6 rounded-2xl shadow-card flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Licensing Status Summary
                </div>
                <div className="mt-4">
                  <div className="text-xs text-slate-400 font-medium">Active Customer Coverage</div>
                  <div className="text-3xl font-extrabold text-[#34B1AA] mt-1">
                    {stats.totalLicenses > 0
                      ? `${Math.round((stats.activeLicenses / stats.totalLicenses) * 100)}%`
                      : '0%'}
                  </div>
                </div>
              </div>

              {/* Stat breakdown badges */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block">Active Seats</span>
                  <strong className="text-white text-sm">{stats.activeActivations}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Issued</span>
                  <strong className="text-white text-sm">{stats.totalLicenses}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Revoked Keys</span>
                  <strong className="text-rose-400 text-sm">{stats.revokedLicenses}</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions Shortcuts Card */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-dark">Quick License Management</h3>
                  <span className="text-xs font-semibold text-primary bg-primary-light px-2.5 py-1 rounded-full">
                    {addinPlans}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1.5 max-w-xl">
                  Generate signed trial or enterprise product keys for {addinName}, manage hardware seats, and rebind corrupted client identity files.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenCreateLicense}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  + Generate New License Key
                </button>
                <button
                  onClick={() => onNavigate('activations')}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Inspect Active Devices
                </button>
                <button
                  onClick={() => onNavigate('customers')}
                  className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  View All Customers
                </button>
              </div>
            </div>
          </div>

          {/* Two-Column Feeds: Recent Activations & Recent Licenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Recent Activations */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-dark">Recent Activations</h3>
                  <p className="text-xs text-slate-400">Latest machine connections for {addinName}</p>
                </div>
                <button
                  onClick={() => onNavigate('activations')}
                  className="text-xs font-bold text-[#3B8FF3] hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                      <th className="px-5 py-3">Customer</th>
                      <th className="px-5 py-3">Device Identifier</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {stats.recentActivations.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400">
                          No workstation activations found for this add-in.
                        </td>
                      </tr>
                    ) : (
                      stats.recentActivations.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3 text-dark font-semibold">
                            {a.customerName || 'Customer'}
                            <span className="block text-[11px] text-slate-400 font-normal">
                              {a.plan || 'Pro'}
                            </span>
                          </td>
                          <td className="px-5 py-3 font-mono text-[11px] text-slate-600">
                            {a.installationId ? `${a.installationId.substring(0, 16)}...` : 'HWID-...'}
                          </td>
                          <td className="px-5 py-3">
                            <Badge status={a.status || 'Active'} />
                          </td>
                          <td className="px-5 py-3 text-right text-slate-400 font-normal">
                            {formatDate(a.activatedAtUtc)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Licenses Created */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-dark">Recent Licenses</h3>
                  <p className="text-xs text-slate-400">Newly issued customer licenses</p>
                </div>
                <button
                  onClick={() => onNavigate('licenses')}
                  className="text-xs font-bold text-[#3B8FF3] hover:underline"
                >
                  View All →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                      <th className="px-5 py-3">Customer</th>
                      <th className="px-5 py-3">Plan</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3 text-right">Expires</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {stats.recentLicenses.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-6 text-center text-slate-400">
                          No licenses issued yet for this add-in.
                        </td>
                      </tr>
                    ) : (
                      stats.recentLicenses.map((l) => (
                        <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3 text-dark font-semibold">
                            {l.customerName}
                            <span className="block text-[11px] text-slate-400 font-normal">
                              {l.customerEmail}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-[#FEF5EE] text-primary">
                              {l.plan}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <Badge status={l.status} />
                          </td>
                          <td className="px-5 py-3 text-right text-slate-400 font-normal">
                            {formatDate(l.expiresAtUtc)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
