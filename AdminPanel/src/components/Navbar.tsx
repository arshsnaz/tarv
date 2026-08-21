import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAddins } from '../context/AddinContext';
import { PlusIcon, DatabaseIcon } from './Icons';

interface NavbarProps {
  currentTabName: string;
  onToggleSidebar: () => void;
  onOpenCreateLicense: () => void;
  onOpenRegisterAddin: () => void;
  onOpenSupabaseModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTabName,
  onToggleSidebar,
  onOpenCreateLicense,
  onOpenRegisterAddin,
  onOpenSupabaseModal
}) => {
  const { user } = useAuth();
  const { selectedAddinId, selectedAddin, globalStats } = useAddins();

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-2xs">
      {/* Left Title & Scope */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl lg:hidden transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
              {currentTabName}
            </h1>

            {/* Scope Badge */}
            {selectedAddinId === null ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                Super Admin Mode
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                {selectedAddin?.name}
              </span>
            )}
          </div>

          <div className="text-[11px] font-medium text-slate-500 hidden sm:block">
            {selectedAddinId === null
              ? `Global Licensing Console • ${globalStats.totalAddins} Active Product Lines`
              : `Managing ${selectedAddin?.targetApplication} Module (${selectedAddin?.version})`}
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Supabase Connection Button */}
        <button
          onClick={onOpenSupabaseModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl transition-all shadow-2xs"
          title="Connect & Sync Supabase PostgreSQL Database"
        >
          <DatabaseIcon size={14} />
          <span className="hidden md:inline">Supabase DB</span>
        </button>

        {/* Date Display */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 text-xs font-semibold text-slate-600 border border-slate-200/60">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{currentDate}</span>
        </div>

        {/* Action Button */}
        {selectedAddinId === null ? (
          <button
            onClick={onOpenRegisterAddin}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 text-xs font-bold rounded-xl shadow-xs transition-all border border-slate-800"
          >
            <span>+ Import Readymade Add-in</span>
          </button>
        ) : (
          <button
            onClick={onOpenCreateLicense}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl shadow-xs transition-all"
          >
            <PlusIcon size={14} />
            <span>+ New License</span>
          </button>
        )}
      </div>
    </header>
  );
};
