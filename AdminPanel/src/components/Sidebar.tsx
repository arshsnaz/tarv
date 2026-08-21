import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useAddins } from '../context/AddinContext';
import { AddinSwitcher } from './AddinSwitcher';
import {
  DashboardIcon,
  CustomersIcon,
  KeyIcon,
  ActivationsIcon,
  AuditIcon,
  SystemIcon,
  LogoutIcon
} from './Icons';

export type NavTab = 'super-admin' | 'dashboard' | 'customers' | 'licenses' | 'activations' | 'audit' | 'system';

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenRegisterModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onClose,
  onOpenRegisterModal
}) => {
  const { user, logout } = useAuth();
  const { selectedAddinId, selectedAddin } = useAddins();

  const isSuperAdminMode = selectedAddinId === null;

  const navGroups: NavGroup[] = isSuperAdminMode
    ? [
        {
          title: 'SUPER ADMIN CONTROL',
          items: [
            {
              id: 'super-admin' as NavTab,
              label: 'Super Admin Hub',
              icon: <span className="text-base">👑</span>,
              badge: 'Global'
            },
            {
              id: 'customers' as NavTab,
              label: 'All Customers Roster',
              icon: <CustomersIcon size={18} />,
              badge: 'Signups'
            },
            {
              id: 'licenses' as NavTab,
              label: 'Global Licenses',
              icon: <KeyIcon size={18} />
            },
            {
              id: 'activations' as NavTab,
              label: 'Global Activations',
              icon: <ActivationsIcon size={18} />
            }
          ]
        },
        {
          title: 'SYSTEM & LOGS',
          items: [
            { id: 'audit' as NavTab, label: 'Audit Logs', icon: <AuditIcon size={18} /> },
            { id: 'system' as NavTab, label: 'System Info', icon: <SystemIcon size={18} /> }
          ]
        }
      ]
    : [
        {
          title: `${selectedAddin?.name.toUpperCase()} VIEW`,
          items: [
            {
              id: 'dashboard' as NavTab,
              label: 'Add-in Dashboard',
              icon: <DashboardIcon size={18} />
            }
          ]
        },
        {
          title: 'ADD-IN MANAGEMENT',
          items: [
            { id: 'customers' as NavTab, label: 'Customers', icon: <CustomersIcon size={18} /> },
            { id: 'licenses' as NavTab, label: 'Licenses', icon: <KeyIcon size={18} /> },
            { id: 'activations' as NavTab, label: 'Activations', icon: <ActivationsIcon size={18} /> }
          ]
        },
        {
          title: 'SYSTEM & LOGS',
          items: [
            { id: 'audit' as NavTab, label: 'Audit Logs', icon: <AuditIcon size={18} /> },
            { id: 'system' as NavTab, label: 'System Info', icon: <SystemIcon size={18} /> }
          ]
        }
      ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand & Add-in Selector Header */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold shadow-xs">
                <KeyIcon size={16} />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 tracking-tight leading-none">
                  Licensing Hub
                </div>
                <div className="text-[10px] font-bold text-amber-600 mt-0.5 uppercase tracking-wider">
                  Super Admin Console
                </div>
              </div>
            </div>

            <button
              className="p-1.5 text-slate-400 hover:text-slate-600 lg:hidden"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Add-in Scoping Switcher Dropdown */}
          <AddinSwitcher onOpenRegisterModal={onOpenRegisterModal} compact />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto space-y-5">
          {navGroups.map((group) => (
            <div key={group.title}>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase flex items-center justify-between">
                <span>{group.title}</span>
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-sm font-bold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span className={isActive ? 'text-amber-400' : 'text-slate-400'}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-amber-500/20 text-amber-700">
                          {item.badge}
                        </span>
                      )}
                      {isActive && !item.badge && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Admin Info */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 text-xs font-extrabold flex items-center justify-center uppercase shrink-0 ring-2 ring-amber-400/30">
              {user?.username?.charAt(0) || 'S'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-black text-slate-900 truncate">
                {user?.username || 'Super Admin'}
              </div>
              <div className="text-[10px] font-semibold text-amber-600 truncate">
                Super Administrator
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Sign out"
          >
            <LogoutIcon size={18} />
          </button>
        </div>
      </aside>
    </>
  );
};
