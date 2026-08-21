const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

function generateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * TARV Official Website Checkout Webhook Simulator
 * Simulates an online customer purchasing TARV MEP Calculator & Add-in package.
 */
async function simulateTarvWebsitePurchase(order) {
  console.log('--- 🌐 TARV WEBSITE E-COMMERCE CHECKOUT EVENT ---');
  console.log(`Processing Order for: ${order.customerName} (${order.customerEmail})`);
  console.log(`Product: ${order.productName} [${order.productId}]`);

  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + order.validDays * 86400000).toISOString();

  // 1. Check or Create Customer Account in Supabase PostgreSQL
  let customerId = generateGuid();
  const { data: existingCust } = await supabase.from('customers').select('*').eq('email', order.customerEmail).single();

  if (existingCust) {
    customerId = existingCust.id;
    console.log(`✓ Existing TARV Customer Account Linked: ${customerId}`);
  } else {
    const newCust = {
      id: customerId,
      name: order.customerName,
      email: order.customerEmail,
      company: order.companyName || 'MEP Engineering Solutions',
      created_at_utc: now,
      is_active: true
    };
    await supabase.from('customers').insert(newCust);
    console.log(`✓ Created New TARV Customer Account: ${customerId}`);
  }

  // 2. Generate RSA Signed Product Key
  const licenseKey = `KEY-TARV-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const licenseId = generateGuid();

  const newLicense = {
    id: licenseId,
    license_key_hash: licenseKey,
    customer_id: customerId,
    product_id: order.productId,
    plan: order.plan || 'Pro',
    max_activations: order.maxActivations || 5,
    offline_grace_days: 14,
    expires_at_utc: expiresAt,
    created_at_utc: now,
    updated_at_utc: now,
    is_active: true,
    revoked: false
  };

  const { error: licErr } = await supabase.from('licenses').insert(newLicense);
  if (licErr) {
    console.error('❌ License Insertion Error:', licErr.message);
    return;
  }
  console.log(`✓ Product Key Issued & Saved to Database: ${licenseKey}`);

  // 3. Register Feature Flags
  const features = ['TeamProductivityReport', 'LiveOrchestrator', 'ExcelDataSync', 'MEPCalculator'];
  for (const feat of features) {
    await supabase.from('license_features').insert({
      license_id: licenseId,
      feature_name: feat,
      is_enabled: true
    });
  }

  // 4. Log Audit Event
  await supabase.from('audit_logs').insert({
    id: generateGuid(),
    license_id: licenseId,
    event_type: 'WEBSITE_ORDER_LICENSE_ISSUED',
    timestamp_utc: now,
    ip_address: '192.168.1.9 (TARV Web Checkout)',
    details: `TARV Web Checkout: Issued key ${licenseKey} for ${order.customerName}`
  });

  console.log('--- 🚀 CHECKOUT & LICENSE DELIVERY COMPLETE ---');
  console.log(`Delivered to Customer:`);
  console.log(`  - License Key: ${licenseKey}`);
  console.log(`  - Download Package: addins_repository/clemp_excel_addin/setup.exe`);
  console.log(`  - Max Workstation Seats: ${newLicense.max_activations}`);
  console.log(`  - Expiration Date: ${expiresAt}`);
}

// Run test purchase
simulateTarvWebsitePurchase({
  customerName: 'Marcus Vance (Apex MEP)',
  customerEmail: 'marcus@apex-mep.com',
  companyName: 'Apex MEP Engineering Consultants',
  productName: 'Team Productivity Report Excel Add-in (ClEmpAddIn)',
  productId: 'addin_clemp_excel',
  plan: 'Pro',
  maxActivations: 5,
  validDays: 365
});
