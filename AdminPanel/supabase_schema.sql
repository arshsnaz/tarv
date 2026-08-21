-- ====================================================================
-- SUPABASE POSTGRESQL SCHEMA MATCHING CONSISTENT.LICENSING.SERVER ENTITIES
-- Based directly on C# DbContext: Z:\09 PUBLIC SHARE\Abubakar Chanda\Server
-- ====================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users Table (AdminUser.cs)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'Admin',
    created_at_utc TIMESTAMPTZ DEFAULT NOW(),
    last_login_at_utc TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Single-Device Session Lock Table (Enforces single Super Admin device login)
CREATE TABLE IF NOT EXISTS public.admin_sessions (
    id TEXT PRIMARY KEY DEFAULT 'super_admin_single_session',
    active_session_id TEXT NOT NULL,
    active_device_info TEXT DEFAULT '',
    updated_at_utc TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customers Table (Customer.cs)
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    company TEXT DEFAULT '',
    created_at_utc TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- 4. Licenses Table (License.cs)
CREATE TABLE IF NOT EXISTS public.licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_key_hash TEXT NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL DEFAULT 'SheetExporter.Revit',
    plan TEXT NOT NULL DEFAULT 'Standard',
    expires_at_utc TIMESTAMPTZ NOT NULL,
    max_activations INT NOT NULL DEFAULT 1,
    offline_grace_days INT NOT NULL DEFAULT 14,
    revoked BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at_utc TIMESTAMPTZ DEFAULT NOW(),
    updated_at_utc TIMESTAMPTZ DEFAULT NOW()
);

-- 5. License Features Table (LicenseFeature.cs)
CREATE TABLE IF NOT EXISTS public.license_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES public.licenses(id) ON DELETE CASCADE,
    feature_name TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- 6. Activations Table (Activation.cs)
CREATE TABLE IF NOT EXISTS public.activations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES public.licenses(id) ON DELETE CASCADE,
    installation_id TEXT NOT NULL,
    installation_public_key TEXT DEFAULT '',
    activated_at_utc TIMESTAMPTZ DEFAULT NOW(),
    last_validated_at_utc TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    revoked_at_utc TIMESTAMPTZ,
    client_version TEXT DEFAULT ''
);

-- 7. Audit Logs Table (AuditLog.cs)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID,
    installation_id TEXT,
    event_type TEXT NOT NULL,
    timestamp_utc TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT DEFAULT '',
    details TEXT DEFAULT ''
);

-- 8. Add-ins Catalog Table (Multi-Addin Extension)
CREATE TABLE IF NOT EXISTS public.addins (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT,
    target_application TEXT,
    version TEXT,
    developer TEXT,
    icon_bg_color TEXT,
    status TEXT DEFAULT 'active',
    created_at_utc TIMESTAMPTZ DEFAULT NOW(),
    updated_at_utc TIMESTAMPTZ DEFAULT NOW(),
    plans JSONB DEFAULT '[]'::jsonb,
    stats JSONB DEFAULT '{}'::jsonb
);

-- Disable RLS for admin API access across all tables
ALTER TABLE public.admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_features DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.activations DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.addins DISABLE ROW LEVEL SECURITY;
