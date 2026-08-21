const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function checkKey() {
  const { data: lics, error } = await supabase.from('licenses').select('*, customers(*)');
  console.log('All licenses in Supabase:', lics);
  if (error) console.error('Error fetching licenses:', error);
}

checkKey();
