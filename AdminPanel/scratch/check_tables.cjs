const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function check() {
  const { data: users, error: uErr } = await supabase.from('admin_users').select('*');
  console.log('admin_users table:', uErr ? uErr.message : users);

  const { data: addins, error: aErr } = await supabase.from('addins').select('*');
  console.log('addins table:', aErr ? aErr.message : addins.length);
}

check();
