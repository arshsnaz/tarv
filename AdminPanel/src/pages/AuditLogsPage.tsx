import React, { useState, useMemo } from 'react';
import { useAddins } from '../context/AddinContext';
import { SearchIcon, RefreshIcon } from '../components/Icons';
import { useToast } from '../components/Toast';
import { formatDateTime } from '../utils/dateUtils';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs, selectedAddin } = useAddins();

  const [search, setSearch] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState('');

  const { showToast } = useToast();

  // Filter audit logs
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const q = search.toLowerCase();
      const matchesSearch =
        log.details.toLowerCase().includes(q) ||
        log.eventType.toLowerCase().includes(q) ||
        (log.ipAddress && log.ipAddress.toLowerCase().includes(q));

      const matchesType = !eventTypeFilter || log.eventType === eventTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [auditLogs, search, eventTypeFilter]);

  const eventTypes = Array.from(new Set(auditLogs.map((l) => l.eventType)));

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
                Product Scoped Security Audit Trail
              </div>
              <div className="text-xs font-bold text-blue-800">
                Displaying security events for {selectedAddin.name} ({selectedAddin.targetApplication})
              </div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-blue-600 text-white">
            {filteredLogs.length} Events
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-dark tracking-tight">
            Security Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Immutable system logs, validation attempts, and administrative security actions for {selectedAddin ? selectedAddin.name : 'All Products'}
          </p>
        </div>

        <button
          onClick={() => showToast('Audit logs refreshed', 'success')}
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
            placeholder="Search details, event type, IP address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-primary"
          value={eventTypeFilter}
          onChange={(e) => setEventTypeFilter(e.target.value)}
        >
          <option value="">All Event Types</option>
          {eventTypes.map((et) => (
            <option key={et} value={et}>
              {et}
            </option>
          ))}
        </select>
      </div>

      {/* Audit Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                <th className="px-5 py-3.5">Event Type</th>
                <th className="px-5 py-3.5">Audit Details</th>
                <th className="px-5 py-3.5">IP Address</th>
                <th className="px-5 py-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No security audit logs found.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5 font-bold">
                      <span
                        className={
                          log.eventType.includes('SUCCESS') || log.eventType.includes('ACTIVATED') || log.eventType.includes('REGISTERED')
                            ? 'text-[#34B1AA]'
                            : log.eventType.includes('FAILED') || log.eventType.includes('REVOKED')
                            ? 'text-rose-600'
                            : 'text-dark'
                        }
                      >
                        {log.eventType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-700 font-medium">{log.details}</td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500">
                      {log.ipAddress || '127.0.0.1'}
                    </td>
                    <td className="px-5 py-3.5 text-right text-slate-400 font-normal">
                      {formatDateTime(log.timestampUtc)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
