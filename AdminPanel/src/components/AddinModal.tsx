import React, { useState, useRef } from 'react';
import { useAddins } from '../context/AddinContext';
import { addinScanner, NETWORK_REPOSITORY_PATH, LOCAL_REPOSITORY_PATH } from '../services/addinScanner';
import { XIcon, CopyIcon, CheckIcon } from './Icons';
import { copyTextToClipboard } from '../utils/copyToClipboard';

interface AddinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddinModal: React.FC<AddinModalProps> = ({ isOpen, onClose }) => {
  const { registerAddin, refreshDataFromServer } = useAddins();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    setStatusMsg(null);

    const file = files[0];
    const result = await addinScanner.importAddinFromFile(file);

    setLoading(false);
    setStatusMsg(result.message);

    if (result.success && result.addin) {
      registerAddin({
        name: result.addin.name,
        slug: result.addin.slug,
        description: result.addin.description,
        category: result.addin.category,
        targetApplication: result.addin.targetApplication,
        version: result.addin.version,
        developer: result.addin.developer,
        iconBgColor: result.addin.iconBgColor,
        status: 'active',
        plans: result.addin.plans
      });
      refreshDataFromServer();
    }
  };

  const handleCopyPath = async (pathText: string) => {
    const ok = await copyTextToClipboard(pathText);
    if (ok) {
      setCopiedPath(pathText);
      setTimeout(() => setCopiedPath(null), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
              Compiled Add-in Release Importer
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">Import Developer Add-in</h2>
            <p className="text-xs text-slate-500">Auto-load readymade Excel or Revit compiled assemblies & manifests</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
          >
            <XIcon size={18} />
          </button>
        </div>

        {statusMsg && (
          <div className={`mb-5 p-3.5 text-xs rounded-xl font-semibold leading-relaxed ${statusMsg.includes('Successfully') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
            {statusMsg}
          </div>
        )}

        {/* File Drop / Select Area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 p-8 rounded-2xl text-center cursor-pointer transition-all mb-6 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,.addin,.manifest,.zip,.dll"
            className="hidden"
          />
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold mx-auto mb-3 shadow-md group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            {loading ? 'Parsing Add-in Package...' : 'Click or Drop Compiled Add-in File Here'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Supports <code className="text-emerald-700 font-bold font-mono">.json</code>, <code className="text-emerald-700 font-bold font-mono">.addin</code>, <code className="text-emerald-700 font-bold font-mono">.dll</code>, or manifest packages
          </p>
        </div>

        {/* Repository Directory Instructions */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
              📁 Central Add-in Repository Directories
            </span>
            <span className="text-[10px] font-bold text-slate-500">Auto-scanned by project</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block text-[11px]">Network Share Repository</span>
                <span className="font-mono text-[10px] text-slate-500 select-all">{NETWORK_REPOSITORY_PATH}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyPath(NETWORK_REPOSITORY_PATH)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy network path"
              >
                {copiedPath === NETWORK_REPOSITORY_PATH ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
              </button>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-700 block text-[11px]">Local Project Repository</span>
                <span className="font-mono text-[10px] text-slate-500 select-all">{LOCAL_REPOSITORY_PATH}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopyPath(LOCAL_REPOSITORY_PATH)}
                className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                title="Copy local path"
              >
                {copiedPath === LOCAL_REPOSITORY_PATH ? <CheckIcon size={14} className="text-emerald-600" /> : <CopyIcon size={14} />}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
