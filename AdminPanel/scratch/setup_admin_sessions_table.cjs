const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function setup() {
  console.log('Ensuring admin_sessions table exists in Supabase...');

  // Create admin_sessions table via insert test or SQL query
  const { error } = await supabase.from('admin_sessions').upsert({
    id: 'super_admin_single_session',
    active_session_id: 'session_init_' + Date.now(),
    active_device_info: 'Server Host',
    updated_at_utc: new Date().toISOString()
  });

  if (error) {
    console.log('Notice on admin_sessions table:', error.message);
  } else {
    console.log('SUCCESS! admin_sessions single-device lock table is active in Supabase!');
  }
}

setup();
