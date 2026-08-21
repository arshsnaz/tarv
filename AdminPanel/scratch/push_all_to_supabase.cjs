const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function pushAllData() {
  console.log('Uploading all initial catalog data to Supabase PostgreSQL...');

  // 1. Addins
  const addins = [
    {
      id: 'addin_sheet_export',
      name: 'SheetExport Pro',
      slug: 'sheet-export-pro',
      description: 'Automated bulk PDF/DWG sheet exporter for Autodesk Revit with naming rules.',
      category: 'Documentation',
      target_application: 'Autodesk Revit',
      version: 'v2.4.1',
      developer: 'Consistent Solutions',
      icon_bg_color: 'bg-emerald-500',
      status: 'active',
      created_at_utc: new Date().toISOString(),
      updated_at_utc: new Date().toISOString(),
      plans: [
        { id: 'plan_pro', name: 'Pro', price: '$299/yr', maxActivations: 5, offlineGraceDays: 14, features: ['DWGExport', 'PDFExport', 'BatchExport'] }
      ],
      stats: { totalCustomers: 1, totalLicenses: 2, activeLicenses: 2, activeDevices: 2, revokedLicenses: 0, securityEvents: 0 }
    },
    {
      id: 'addin_revit_exporter',
      name: 'Revit Exporter Suite',
      slug: 'revit-exporter-suite',
      description: 'Complete multi-format CAD/BIM model exporter for Revit 2022-2026.',
      category: 'BIM Automation',
      target_application: 'Autodesk Revit',
      version: 'v3.1.0',
      developer: 'Consistent Solutions',
      icon_bg_color: 'bg-blue-600',
      status: 'active',
      created_at_utc: new Date().toISOString(),
      updated_at_utc: new Date().toISOString(),
      plans: [
        { id: 'plan_enterprise', name: 'Enterprise', price: '$499/yr', maxActivations: 10, offlineGraceDays: 30, features: ['IFCExport', 'NWDExport', 'FBXExport'] }
      ],
      stats: { totalCustomers: 1, totalLicenses: 1, activeLicenses: 1, activeDevices: 1, revokedLicenses: 0, securityEvents: 0 }
    }
  ];

  for (const a of addins) {
    const { error } = await supabase.from('addins').upsert(a);
    if (error) console.error('Addin Upsert Error:', error);
    else console.log(`Addin ${a.name} saved to Supabase.`);
  }

  // 2. Customers
  const customerId = 'c0a80101-9999-4444-8888-111111111111';
  const customer = {
    id: customerId,
    name: 'Abubakar Chanda',
    email: 'abubakarchanda3@gmail.com',
    company: 'Consistent Solutions',
    created_at_utc: new Date().toISOString(),
    is_active: true
  };

  const { error: custErr } = await supabase.from('customers').upsert(customer);
  if (custErr) console.error('Customer Upsert Error:', custErr);
  else console.log('Customer Abubakar Chanda saved to Supabase.');

  // 3. Licenses
  const lic1Id = '44444444-5555-6666-7777-888888888888';
  const lic2Id = '99999999-8888-7777-6666-555555555555';
  const now = new Date().toISOString();
  const expiresAt = '2027-08-20T10:00:00.000Z';

  const licenses = [
    {
      id: lic1Id,
      license_key_hash: 'KEY-PRO-REVIT-EXPORTER-2026-A1-HASH',
      customer_id: customerId,
      product_id: 'addin_sheet_export',
      plan: 'Pro',
      expires_at_utc: expiresAt,
      max_activations: 5,
      offline_grace_days: 14,
      revoked: false,
      is_active: true,
      created_at_utc: now,
      updated_at_utc: now
    },
    {
      id: lic2Id,
      license_key_hash: 'KEY-PRO-SHEETEXPORT-2026-B2-HASH',
      customer_id: customerId,
      product_id: 'addin_revit_exporter',
      plan: 'Pro',
      expires_at_utc: expiresAt,
      max_activations: 5,
      offline_grace_days: 14,
      revoked: false,
      is_active: true,
      created_at_utc: now,
      updated_at_utc: now
    }
  ];

  for (const l of licenses) {
    const { error } = await supabase.from('licenses').upsert(l);
    if (error) console.error('License Upsert Error:', error);
    else console.log(`License ${l.id} saved to Supabase.`);
  }

  // 4. Activations
  const activations = [
    {
      id: '11111111-2222-3333-4444-555555555555',
      license_id: lic1Id,
      installation_id: 'HWID-ABUBAKAR-WORKSTATION-01',
      installation_public_key: 'PUBKEY_SAMPLE_KEY_RSA_3072',
      activated_at_utc: now,
      last_validated_at_utc: now,
      is_active: true,
      client_version: 'v2.4.1'
    },
    {
      id: '22222222-3333-4444-5555-666666666666',
      license_id: lic2Id,
      installation_id: 'HWID-ABUBAKAR-WORKSTATION-02',
      installation_public_key: 'PUBKEY_SAMPLE_KEY_RSA_3072',
      activated_at_utc: now,
      last_validated_at_utc: now,
      is_active: true,
      client_version: 'v3.1.0'
    }
  ];

  for (const act of activations) {
    const { error } = await supabase.from('activations').upsert(act);
    if (error) console.error('Activation Upsert Error:', error);
    else console.log(`Activation ${act.id} saved to Supabase.`);
  }

  console.log('\nSUCCESS! All data uploaded to Supabase PostgreSQL!');
}

pushAllData();
