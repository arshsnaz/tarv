const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function syncReadymade() {
  console.log('Cleaning Supabase addins table and setting up core Excel & Revit Add-in product lines...');

  // Delete all old dummy addins
  const { error: delErr } = await supabase.from('addins').delete().neq('id', 'non_existent_id');
  if (delErr) console.error('Delete error:', delErr);
  else console.log('Cleaned old addins from Supabase.');

  const now = new Date().toISOString();

  const coreAddins = [
    {
      id: 'addin_excel_sheet_export',
      name: 'Excel SheetExport Add-in',
      slug: 'excel-sheetexport-pro',
      description: 'Automated bidirectional data sync, sheet formatting, and live linking for Microsoft Excel.',
      category: 'Excel Add-in',
      target_application: 'Microsoft Excel',
      version: 'v1.0.0',
      developer: 'Consistent Solutions',
      icon_bg_color: 'bg-emerald-600',
      status: 'active',
      created_at_utc: now,
      updated_at_utc: now,
      plans: [
        { id: 'plan_excel_pro', name: 'Pro', priceYearly: 199, maxActivationsPerLicense: 5, features: ['ExcelLiveLink', 'BatchSheetExport', 'CustomCellTemplates'] }
      ],
      stats: { totalCustomers: 1, totalLicenses: 1, activeLicenses: 1, activeDevices: 1, revokedLicenses: 0, securityEvents: 0 }
    },
    {
      id: 'addin_revit_exporter',
      name: 'Revit Exporter Suite',
      slug: 'revit-exporter-suite',
      description: 'Complete multi-format CAD & BIM sheet exporter for Autodesk Revit 2022-2026.',
      category: 'Revit Add-in',
      target_application: 'Autodesk Revit',
      version: 'v3.1.0',
      developer: 'Consistent Solutions',
      icon_bg_color: 'bg-blue-600',
      status: 'active',
      created_at_utc: now,
      updated_at_utc: now,
      plans: [
        { id: 'plan_revit_pro', name: 'Pro', priceYearly: 299, maxActivationsPerLicense: 5, features: ['DWGExport', 'PDFExport', 'BatchExport', 'NamingTemplates'] }
      ],
      stats: { totalCustomers: 1, totalLicenses: 1, activeLicenses: 1, activeDevices: 1, revokedLicenses: 0, securityEvents: 0 }
    }
  ];

  for (const a of coreAddins) {
    const { error } = await supabase.from('addins').upsert(a);
    if (error) console.error('Addin Upsert Error:', error);
    else console.log(`Core Add-in ${a.name} saved to Supabase.`);
  }

  console.log('SUCCESS! Supabase addins table updated to core Excel and Revit Add-ins!');
}

syncReadymade();
