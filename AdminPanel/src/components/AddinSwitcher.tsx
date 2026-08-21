import React, { useState, useRef, useEffect } from 'react';
import { useAddins } from '../context/AddinContext';

interface AddinSwitcherProps {
  onOpenRegisterModal: () => void;
  compact?: boolean;
}

export const AddinSwitcher: React.FC<AddinSwitcherProps> = ({ onOpenRegisterModal, compact = false }) => {
  const { addins, selectedAddinId, selectedAddin, setSelectedAddinId } = useAddins();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all text-left w-full ${
          selectedAddinId === null
            ? 'bg-slate-900 text-white border-slate-800 hover:bg-slate-800 shadow-xs'
            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
        }`}
      >
        {/* Status Indicator Icon */}
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0 ${
            selectedAddinId === null
              ? 'bg-amber-500 shadow-xs'
              : selectedAddin?.iconBgColor || 'bg-primary'
          }`}
        >
          {selectedAddinId === null ? '👑' : selectedAddin?.name.charAt(0) || 'A'}
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold truncate leading-tight">
            {selectedAddinId === null ? 'Super Admin Console' : selectedAddin?.name}
          </div>
          <div className="text-[10px] font-medium opacity-70 truncate">
            {selectedAddinId === null
              ? `${addins.length} Registered Add-ins`
              : selectedAddin?.targetApplication || 'Selected Add-in'}
          </div>
        </div>

        {/* Dropdown Chevron */}
        <svg
          className={`w-4 h-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 min-w-[260px] animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Switch Workspace Scoping
          </div>

          {/* Super Admin Switch Option */}
          <button
            onClick={() => {
              setSelectedAddinId(null);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold transition-colors ${
              selectedAddinId === null
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
              👑
            </div>
            <div className="flex-1 text-left">
              <div className="font-bold">Super Admin Console</div>
              <div className="text-[10px] opacity-70 font-normal">Manage all add-ins & global data</div>
            </div>
            {selectedAddinId === null && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
          </button>

          <div className="my-1 border-t border-slate-100" />

          <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Registered Add-ins ({addins.length})
          </div>

          <div className="max-h-60 overflow-y-auto space-y-0.5 px-1">
            {addins.map((addin) => {
              const isSelected = selectedAddinId === addin.id;
              return (
                <button
                  key={addin.id}
                  onClick={() => {
                    setSelectedAddinId(addin.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isSelected
                      ? 'bg-primary-light text-primary font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-md text-white flex items-center justify-center text-xs font-bold ${
                      addin.iconBgColor || 'bg-slate-600'
                    }`}
                  >
                    {addin.name.charAt(0)}
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <div className="truncate font-semibold">{addin.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {addin.stats.activeLicenses} Active Licenses • {addin.stats.activeDevices} Devices
                    </div>
                  </div>

                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      addin.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    title={`Status: ${addin.status}`}
                  />
                </button>
              );
            })}
          </div>

          <div className="my-1 border-t border-slate-100" />

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenRegisterModal();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-primary hover:bg-primary-light/50 transition-colors"
          >
            <span>+ Register New Add-in</span>
          </button>
        </div>
      )}
    </div>
  );
};
