import React, { useState } from 'react';
import { useAddins } from '../context/AddinContext';
import { AddinModal } from '../components/AddinModal';
import { NETWORK_REPOSITORY_PATH, LOCAL_REPOSITORY_PATH } from '../services/addinScanner';

interface SuperAdminDashboardPageProps {
  onNavigateToTab: (tab: any) => void;
}

export const SuperAdminDashboardPage: React.FC<SuperAdminDashboardPageProps> = ({
  onNavigateToTab
}) => {
  const {
    addins,
    globalStats,
    allCustomers,
    allLicenses,
    setSelectedAddinId,
    toggleAddinStatus,
    deleteAddin,
    auditLogs
  } = useAddins();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [custSearchTerm, setCustSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredCustomers = allCustomers.filter((c) => {
    const q = custSearchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      (c.company && c.company.toLowerCase().includes(q))
    );
  });

  const filteredAddins = addins.filter((addin) => {
    const matchesSearch =
      addin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addin.targetApplication.toLowerCase().includes(searchTerm.toLowerCase()) ||
      addin.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || addin.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(addins.map((a) => a.category)));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold mb-3">
              <span>👑 Super Admin Central Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Multi-Addin Software Licensing Hub
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed font-normal">
              Centralized administrative hub to manage real add-ins, monitor compiled C# assemblies (.dll / .vsto), and issue verified keys.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <span className="text-base leading-none">+</span>
              <span>Import Readymade Add-in</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Performance Summary Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Global Performance Summary</h2>
          <span className="text-xs font-semibold text-slate-500">Real-time cross-addin telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                PRODUCT LINES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{globalStats.totalAddins}</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Live Team Productivity Excel Add-in (ClEmpAddIn)
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                TOTAL CUSTOMERS
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{globalStats.totalCustomers}</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Accounts
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Registered client organisations
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                ACTIVE LICENSES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{globalStats.totalActiveLicenses}</span>
              <span className="text-xs font-bold text-slate-500">
                out of {globalStats.totalLicenses} issued
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Valid product key licenses
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                BOUND DEVICES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{globalStats.totalActiveDevices}</span>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                Connected
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Hardware workstation identities bound
            </p>
          </div>
        </div>
      </div>

      {/* Add-in Repository & Release Bundles Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Active Add-in Products & Assemblies
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Super Admin monitoring of compiled C# release assemblies (<code className="font-mono text-emerald-700 font-bold">.dll</code>), VSTO manifests (<code className="font-mono text-emerald-700 font-bold">.vsto</code>), and client setup installers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search add-ins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 outline-none w-48 sm:w-64"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add-ins Grid with Compiled Package Telemetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredAddins.map((addin) => {
            const isClEmp = addin.id.includes('clemp');
            const dllName = isClEmp ? 'ClEmpAddIn.dll' : 'RevitExporterSuite.dll';
            const addinManifestName = isClEmp ? 'ClEmpAddIn.vsto' : 'RevitExporterSuite.addin';
            const installerName = isClEmp ? 'setup.exe' : 'RevitExporterSuite_v3.1.0.zip';

            return (
              <div
                key={addin.id}
                className="bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between transition-all hover:shadow-lg hover:border-slate-300 group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${
                          addin.iconBgColor || 'bg-slate-900'
                        } text-white font-extrabold flex items-center justify-center text-lg shadow-md shrink-0`}
                      >
                        {addin.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base group-hover:text-primary transition-colors">
                          {addin.name}
                        </h3>
                        <div className="text-[11px] font-semibold text-slate-500">
                          {addin.targetApplication}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                        addin.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {addin.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {addin.description}
                  </p>

                  {/* Compiled Release Package Metadata */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      📦 COMPILED RELEASE BUNDLE TELEMETRY
                    </div>
                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 block font-sans uppercase">Assembly DLL</span>
                        <span className="font-bold text-emerald-700 truncate block">{dllName}</span>
                        <span className="text-[9px] text-emerald-600 font-sans font-bold">✓ Assembly Verified</span>
                      </div>

                      <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[9px] font-bold text-slate-400 block font-sans uppercase">Manifest / VSTO</span>
                        <span className="font-bold text-blue-700 truncate block">{addinManifestName}</span>
                        <span className="text-[9px] text-blue-600 font-sans font-bold">✓ VSTO Valid</span>
                      </div>
                    </div>

                    <div className="p-2 bg-emerald-50/60 rounded-lg border border-emerald-200/80 flex items-center justify-between text-[11px]">
                      <div>
                        <span className="font-sans text-[10px] font-bold text-emerald-900 block">Setup Installer</span>
                        <span className="font-mono text-emerald-800 font-bold">{installerName}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-md">
                        Ready to Ship
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-slate-200/60 text-xs">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Customers</div>
                      <div className="font-bold text-blue-600">{addin.stats.totalCustomers} customers</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Category</div>
                      <div className="font-bold text-slate-800 truncate">{addin.category}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Active Licenses</div>
                      <div className="font-bold text-emerald-600">{addin.stats.activeLicenses} keys</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Bound Seats</div>
                      <div className="font-bold text-indigo-600">{addin.stats.activeDevices} devices</div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 flex items-center justify-between gap-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleAddinStatus(addin.id)}
                      className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 hover:bg-slate-200/70 transition-colors"
                    >
                      {addin.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteAddin(addin.id)}
                      className="px-2 py-1.5 rounded-xl text-[11px] font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedAddinId(addin.id);
                      onNavigateToTab('dashboard');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Launch Dashboard</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Audit Security Stream */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Global Security Audit Stream
            </h2>
            <p className="text-xs text-slate-500">
              Recent security events, license activations, and identity resets across all add-ins.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('audit')}
            className="text-xs font-bold text-primary hover:underline"
          >
            View All Logs →
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="py-3 flex items-center justify-between text-xs gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div className="min-w-0">
                  <div className="font-bold text-slate-900 truncate">{log.details}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {log.eventType} • IP: {log.ipAddress}
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-semibold text-slate-400 shrink-0">
                {new Date(log.timestampUtc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add-in Import Modal */}
      <AddinModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </div>
  );
};
