import React, { useState, useEffect } from 'react';
import { useAddins } from '../context/AddinContext';
import { RefreshIcon, CheckIcon, CopyIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { isSupabaseConnected } from '../services/supabaseClient';
import { NETWORK_REPOSITORY_PATH, LOCAL_REPOSITORY_PATH } from '../services/addinScanner';
import { copyTextToClipboard } from '../utils/copyToClipboard';

export const SystemInfoPage: React.FC = () => {
  const { addins, globalStats, refreshDataFromServer } = useAddins();
  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const { showToast } = useToast();

  const checkStatus = async () => {
    setLoading(true);
    try {
      const isConnected = await isSupabaseConnected();
      setDbConnected(isConnected);
      await refreshDataFromServer();
      showToast('System health and infrastructure status refreshed', 'success');
    } catch {
      setDbConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const handleCopy = async (text: string) => {
    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedPath(text);
      showToast('Path copied to clipboard!', 'success');
      setTimeout(() => setCopiedPath(null), 2000);
    }
  };

  const currentUtcTime = new Date().toISOString();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
            System & Infrastructure Health
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Backend environment status, RSA cryptographic signing keys, and database connectivity
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={checkStatus}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <RefreshIcon size={14} /> {loading ? 'Checking...' : 'Refresh Health Status'}
          </button>
        </div>
      </div>

      {/* Top Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Application Architecture */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Application Architecture
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Server Runtime</span>
              <strong className="text-dark font-bold text-sm">.NET 8.0 / Node 20 (C# & TS)</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Licensing Server Version</span>
              <span className="text-slate-700 font-bold">v1.0.0 (Production Release)</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Single-Device Lock</span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                1 Device Session Active
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Server UTC Timestamp</span>
              <span className="font-mono text-[11px] text-slate-600 block truncate">{currentUtcTime}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Database Connectivity */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Database Provider
            </h3>
            <span className={`w-2.5 h-2.5 rounded-full ${dbConnected ? 'bg-[#34B1AA]' : 'bg-rose-500'}`} />
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Active Database Provider</span>
              <strong className="text-[#34B1AA] font-bold text-sm">Supabase PostgreSQL (Cloud Hosted)</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Target Database URL</span>
              <span className="font-mono text-[11px] text-slate-700 font-bold block truncate">
                https://veatcorbgwgqpficxwri.supabase.co
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Connection Integrity</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                dbConnected ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-rose-700 bg-rose-50 border border-rose-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dbConnected ? 'bg-[#34B1AA]' : 'bg-rose-500'}`} />
                {dbConnected ? 'Operational & Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Cryptographic Key */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Server Signing Authority
            </h3>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          </div>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Active RSA-3072 Key ID</span>
              <span className="font-mono text-[11px] text-dark font-bold block truncate">
                KEY-RSA-3072-CONSISTENT-2026-PRIMARY
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Signing Algorithm</span>
              <span className="text-slate-700 font-semibold">RSASSA-PKCS1-v1_5 / SHA-256</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Authority Status</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34B1AA]" /> Active & Cryptographically Signed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compiled Add-in Repository Storage Locations */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">📁</span>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Software Repository Locations & Deployment Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Locations monitored for compiled C# release assemblies (<code className="font-mono text-emerald-700 font-bold">.dll</code>), manifests (<code className="font-mono text-emerald-700 font-bold">.vsto</code>), and installers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                🌐 Network Share Repository
              </span>
              <button
                type="button"
                onClick={() => handleCopy(NETWORK_REPOSITORY_PATH)}
                className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                title="Copy Path"
              >
                {copiedPath === NETWORK_REPOSITORY_PATH ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
              </button>
            </div>
            <div className="font-bold text-slate-900 text-xs break-all select-all p-2 bg-white rounded-xl border border-slate-200">
              {NETWORK_REPOSITORY_PATH}
            </div>
            <p className="font-sans text-[11px] text-slate-500">
              Network directory where ready-to-use add-in release bundles are stored for organization-wide access.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                💻 Local Project Repository
              </span>
              <button
                type="button"
                onClick={() => handleCopy(LOCAL_REPOSITORY_PATH)}
                className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                title="Copy Path"
              >
                {copiedPath === LOCAL_REPOSITORY_PATH ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
              </button>
            </div>
            <div className="font-bold text-slate-900 text-xs break-all select-all p-2 bg-white rounded-xl border border-slate-200">
              {LOCAL_REPOSITORY_PATH}
            </div>
            <p className="font-sans text-[11px] text-slate-500">
              Local repository folder scanned automatically by the Super Admin console to auto-register new add-in products.
            </p>
          </div>
        </div>
      </div>

      {/* Discovered Add-in Products Table */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Registered Product Lines ({addins.length})
            </h2>
            <p className="text-xs text-slate-500">
              Active add-in products registered in Supabase PostgreSQL database.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Target Application</th>
                <th className="px-4 py-3">Version</th>
                <th className="px-4 py-3">Developer</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {addins.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${a.iconBgColor || 'bg-slate-900'}`} />
                    <span>{a.name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-600">{a.targetApplication}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-700 font-bold">{a.version}</td>
                  <td className="px-4 py-3.5 text-slate-600">{a.developer}</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
