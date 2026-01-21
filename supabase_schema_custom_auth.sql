-- Recreate admin_users table for custom auth (decoupling from Supabase Auth)
DROP TABLE IF EXISTS public.admin_users;

CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_operator', 'business_operator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (though backend uses Service Role, it's good practice)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Since we are not using Supabase Auth, we don't have auth.uid().
-- So we strictly rely on the Backend (Service Role) to access this table.
-- We can block all public access.
CREATE POLICY "Deny public access" ON public.admin_users FOR ALL USING (false);

-- Example user (Password: 123456)
-- You will need to generate a hash using Python passlib or pgcrypto.
-- For now, I will insert a placeholder. You must update it via the backend registration or script.
-- INSERT INTO public.admin_users (username, password_hash, role) VALUES ('admin', '$2b$12$MQ...', 'super_admin');
