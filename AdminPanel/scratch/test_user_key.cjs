const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';

console.log('Testing user Key:', key);

const client = createClient(url, key);

async function test() {
  const { data, error } = await client.from('customers').select('*');
  if (error) {
    console.error('Supabase query error:', error);
  } else {
    console.log('SUCCESS! Customers count in Supabase:', data.length, data);
  }
}

test();
