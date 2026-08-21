const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function check() {
  const { data: customers, error: cErr } = await supabase.from('customers').select('*');
  console.log('--- SUPABASE CUSTOMERS ---', cErr ? cErr.message : customers);

  const { data: licenses, error: lErr } = await supabase.from('licenses').select('*');
  console.log('--- SUPABASE LICENSES ---', lErr ? lErr.message : licenses);

  const { data: activations, error: aErr } = await supabase.from('activations').select('*');
  console.log('--- SUPABASE ACTIVATIONS ---', aErr ? aErr.message : activations);
}

check();
