import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { AddinProvider, useAddins } from './context/AddinContext';
import { Sidebar, NavTab } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { SuperAdminDashboardPage } from './pages/SuperAdminDashboardPage';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { LicensesPage } from './pages/LicensesPage';
import { ActivationsPage } from './pages/ActivationsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SystemInfoPage } from './pages/SystemInfoPage';
import { AddinModal } from './components/AddinModal';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const { selectedAddin, selectedAddinId } = useAddins();

  const [currentTab, setCurrentTab] = useState<NavTab>('super-admin');
  const [isCreateLicenseOpen, setIsCreateLicenseOpen] = useState(false);
  const [isRegisterAddinOpen, setIsRegisterAddinOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Automatically align current tab with workspace scoping
  useEffect(() => {
    if (selectedAddinId !== null && currentTab === 'super-admin') {
      setCurrentTab('dashboard');
    }
  }, [selectedAddinId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FB] text-slate-400 text-sm font-medium">
        Loading Multi-Addin Super Admin Hub...
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const tabTitles: Record<NavTab, string> = {
    'super-admin': 'Super Admin Management Console',
    dashboard: selectedAddinId ? `${selectedAddin?.name} Dashboard` : 'Add-in Performance Summary',
    customers: 'Customer Accounts',
    licenses: 'Product Key Licenses',
    activations: 'Device Activations & Seats',
    audit: 'Security & Audit Event Trail',
    system: 'System Health & Licensing Server Info'
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenRegisterModal={() => setIsRegisterAddinOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <Navbar
          currentTabName={tabTitles[currentTab]}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenCreateLicense={() => {
            setCurrentTab('licenses');
            setIsCreateLicenseOpen(true);
          }}
          onOpenRegisterAddin={() => setIsRegisterAddinOpen(true)}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'super-admin' && (
            <SuperAdminDashboardPage
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenCreateLicense={() => {
                setCurrentTab('licenses');
                setIsCreateLicenseOpen(true);
              }}
            />
          )}

          {currentTab === 'customers' && <CustomersPage />}

          {currentTab === 'licenses' && (
            <LicensesPage
              isCreateOpen={isCreateLicenseOpen}
              onCloseCreate={() => setIsCreateLicenseOpen(false)}
            />
          )}

          {currentTab === 'activations' && <ActivationsPage />}
          {currentTab === 'audit' && <AuditLogsPage />}
          {currentTab === 'system' && <SystemInfoPage />}
        </main>
      </div>

      {/* Add-in Registration Modal */}
      <AddinModal
        isOpen={isRegisterAddinOpen}
        onClose={() => setIsRegisterAddinOpen(false)}
      />

      {/* Supabase Connection & Migration Modal */}
      <SupabaseConfigModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AddinProvider>
      <AppContent />
    </AddinProvider>
  );
};
