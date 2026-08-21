import React, { useState, useEffect } from 'react';
import { getSavedSupabaseConfig, saveSupabaseConfig, isSupabaseConnected, supabaseService } from '../services/supabaseClient';
import { useAddins } from '../context/AddinContext';
import { DatabaseIcon, XIcon, CheckCircleIcon } from './Icons';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({ isOpen, onClose }) => {
  const { addins, allCustomers, allLicenses, allActivations, allAuditLogs, refreshDataFromServer } = useAddins();
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cfg = getSavedSupabaseConfig();
      setUrl(cfg.url);
      setKey(cfg.key);
      checkConnection();
    }
  }, [isOpen]);

  const checkConnection = async () => {
    setTesting(true);
    const isConn = await isSupabaseConnected();
    setConnected(isConn);
    setTesting(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !key.trim()) {
      setStatusMsg('Please enter both Supabase Project URL and Anon Key.');
      return;
    }
    saveSupabaseConfig(url, key);
    setTesting(true);
    setStatusMsg(null);
    const isConn = await isSupabaseConnected();
    setConnected(isConn);
    setTesting(false);
    if (isConn) {
      setStatusMsg('✅ Connected successfully to Supabase PostgreSQL!');
      refreshDataFromServer();
    } else {
      setStatusMsg('⚠️ Could not connect. Please verify your Project URL, Anon Key, and ensure supabase_schema.sql has been run in Supabase SQL Editor.');
    }
  };

  const handleSyncLocalData = async () => {
    setSyncing(true);
    setStatusMsg('Migrating local data to Supabase PostgreSQL...');
    const result = await supabaseService.syncAllLocalDataToSupabase(
      addins,
      allCustomers,
      allLicenses,
      allActivations,
      allAuditLogs
    );
    setSyncing(false);
    setStatusMsg(result.message);
    if (result.success) {
      refreshDataFromServer();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <DatabaseIcon size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Supabase PostgreSQL Connection</h2>
              <p className="text-xs text-slate-500">Cloud database persistence & real-time sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          >
            <XIcon size={18} />
          </button>
        </div>

        {statusMsg && (
          <div className={`mb-5 p-3.5 text-xs rounded-xl font-semibold ${statusMsg.includes('✅') || statusMsg.includes('Successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Supabase Project URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://xyzcompany.supabase.co"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Supabase Anon / Public Key
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 font-mono"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              required
            />
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={testing}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              {testing ? 'Connecting...' : 'Save & Test Connection'}
            </button>

            {connected && (
              <button
                type="button"
                onClick={handleSyncLocalData}
                disabled={syncing}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50"
              >
                {syncing ? 'Syncing...' : 'Sync Local Data to Supabase'}
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
          <p className="font-bold text-slate-700">Setup Quick Guide:</p>
          <ol className="list-decimal pl-4 space-y-1">
            <li>In Supabase, click <strong>"New Project"</strong> → Name it (e.g. <em>SheetExport Licensing</em>).</li>
            <li>Go to <strong>Project Settings → API</strong> → Copy Project URL & Anon Key above.</li>
            <li>Go to <strong>SQL Editor</strong> in Supabase → Run <code className="text-emerald-700 font-mono">supabase_schema.sql</code> to create all 5 PostgreSQL tables.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
