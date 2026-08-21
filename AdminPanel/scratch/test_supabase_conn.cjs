const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMG_sb_secret_ULT1j';

console.log('Testing Supabase Connection to:', url);

try {
  const supabase = createClient(url, key);
  supabase.from('customers').select('*').then(({ data, error }) => {
    if (error) {
      console.error('Supabase Query Error:', error);
    } else {
      console.log('Supabase Query Success! Customers:', data);
    }
  });
} catch (e) {
  console.error('Supabase Exception:', e);
}
