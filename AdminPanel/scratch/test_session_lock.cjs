const { createClient } = require('@supabase/supabase-js');

const url = 'https://veatcorbgwgqpficxwri.supabase.co';
const key = 'sb_publishable_te3DmR_oZ7u16qjyW7AW7A_1QNMGRLa';
const supabase = createClient(url, key);

async function testLock() {
  const sessionId = 'session_token_' + Date.now();
  console.log('Registering single active Super Admin session:', sessionId);

  const { error } = await supabase.from('admin_users').upsert({
    id: '00000000-0000-0000-0000-000000000001',
    username: 'superadmin',
    password_hash: sessionId,
    password_salt: 'Workstation LAN PC',
    role: 'Super Administrator',
    created_at_utc: new Date().toISOString(),
    last_login_at_utc: new Date().toISOString(),
    is_active: true
  });

  if (error) {
    console.error('Session registration error:', error);
  } else {
    console.log('Session lock registered successfully!');

    // Read back
    const { data } = await supabase.from('admin_users').select('*').eq('username', 'superadmin').single();
    console.log('Active session in Supabase DB:', data.password_hash);
  }
}

testLock();
