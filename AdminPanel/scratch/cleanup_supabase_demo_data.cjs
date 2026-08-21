const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function clean() {
  console.log('Cleaning up stale demo licenses and activations from Supabase PostgreSQL...');

  // Get active valid addin IDs
  const { data: addins } = await supabase.from('addins').select('id');
  const validAddinIds = (addins || []).map((a) => a.id);
  console.log('Valid Addin IDs in DB:', validAddinIds);

  // Delete licenses that don't match active addin IDs
  const { data: allLics } = await supabase.from('licenses').select('id, product_id');
  const staleLics = (allLics || []).filter((l) => !validAddinIds.includes(l.product_id));
  for (const s of staleLics) {
    console.log('Deleting stale license:', s.id, s.product_id);
    await supabase.from('activations').delete().eq('license_id', s.id);
    await supabase.from('license_features').delete().eq('license_id', s.id);
    await supabase.from('licenses').delete().eq('id', s.id);
  }

  // Delete orphaned activations
  const { data: remainingLics } = await supabase.from('licenses').select('id');
  const validLicIds = (remainingLics || []).map((l) => l.id);
  const { data: allActs } = await supabase.from('activations').select('id, license_id');
  const staleActs = (allActs || []).filter((a) => !validLicIds.includes(a.license_id));
  for (const s of staleActs) {
    console.log('Deleting stale activation:', s.id);
    await supabase.from('activations').delete().eq('id', s.id);
  }

  console.log('CLEANUP COMPLETE!');
}

clean();
