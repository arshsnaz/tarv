const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function testPurchase() {
  const email = 'john@miller-mep.com';
  const name = 'John Miller';
  const company = 'Miller MEP Solutions';
  const productId = 'addin_clemp_excel';
  const now = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 365 * 86400000).toISOString();

  // 1. Check existing customer
  let { data: existingCusts } = await supabase.from('customers').select('*').eq('email', email);
  let custId;

  if (existingCusts && existingCusts.length > 0) {
    custId = existingCusts[0].id;
    console.log('Found existing customer:', custId);
  } else {
    const { data: newCust, error: custErr } = await supabase.from('customers').insert([
      { name, email, company, is_active: true, created_at_utc: now }
    ]).select();
    if (custErr) {
      console.error('Customer insert error:', custErr);
      return;
    }
    custId = newCust[0].id;
    console.log('Created new customer:', custId);
  }

  // 2. Insert License
  const keyHash = `KEY-TARV-JKDH-9DH9`;
  const { data: newLic, error: licErr } = await supabase.from('licenses').insert([
    {
      license_key_hash: keyHash,
      customer_id: custId,
      product_id: productId,
      plan: 'Enterprise Annual',
      max_activations: 5,
      offline_grace_days: 14,
      expires_at_utc: expiresAt,
      created_at_utc: now,
      updated_at_utc: now,
      is_active: true,
      revoked: false
    }
  ]).select();

  if (licErr) {
    console.error('License insert error:', licErr);
    return;
  }
  console.log('Successfully saved license into Supabase:', newLic);
}

testPurchase();
