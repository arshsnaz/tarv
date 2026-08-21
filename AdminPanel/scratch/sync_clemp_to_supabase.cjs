const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function syncClEmpAddIn() {
  console.log('Cleaning Supabase addins table and registering real ClEmpAddIn Excel Add-in...');

  // Delete old demo add-ins
  const { error: delErr } = await supabase.from('addins').delete().neq('id', 'non_existent_id');
  if (delErr) console.error('Delete error:', delErr.message);
  else console.log('Cleaned old demo add-ins from Supabase.');

  const now = new Date().toISOString();

  const realAddin = {
    id: 'addin_clemp_excel',
    name: 'Team Productivity Report Excel Add-in (ClEmpAddIn)',
    slug: 'clemp-excel-addin',
    description: 'Automated Employee Productivity Reporting & Live Data Orchestrator for Microsoft Excel.',
    category: 'Excel Add-in',
    target_application: 'Microsoft Excel',
    version: 'v1.0.0',
    developer: 'Consistent Solutions',
    icon_bg_color: 'bg-emerald-600',
    status: 'active',
    created_at_utc: now,
    updated_at_utc: now,
    plans: [
      { id: 'plan_clemp_pro', name: 'Pro', priceYearly: 199, maxActivationsPerLicense: 5, features: ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync'] }
    ],
    stats: { totalCustomers: 1, totalLicenses: 1, activeLicenses: 1, activeDevices: 1, revokedLicenses: 0, securityEvents: 0 }
  };

  const { error } = await supabase.from('addins').upsert(realAddin);
  if (error) console.error('Supabase Upsert Error:', error.message);
  else console.log(`SUCCESS! Real ClEmpAddIn Excel Add-in registered in Supabase cloud database!`);
}

syncClEmpAddIn();
