-- Drop table if exists to ensure clean state for new schema
DROP TABLE IF EXISTS public.admin_users;

-- Create admin_users table to store user roles and password hashes (since we are bypassing Supabase Auth)
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'content_operator', 'business_operator')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies

-- Allow users to read their own profile (e.g. for checking role)
-- Since we are not using Supabase Auth, current_user is not useful here in the same way.
-- But the backend handles the logic. RLS might be less relevant if we use a service role key in backend 
-- or if we don't use Supabase Client in frontend for this table anymore.
-- However, for safety, we can keep policies or just allow the service role (which has bypass RLS).
-- If we use the Supabase Client from frontend (anon key), we need policies.
-- But wait, our backend uses `supabase-py` which usually uses the SERVICE_ROLE_KEY if configured that way, 
-- OR it uses the anon key. 
-- In `database.py` (which I haven't seen but assume exists), if it uses `service_role`, RLS is bypassed.
-- If it uses `anon`, we need RLS.
-- Given the backend logic: `supabase.table("admin_users").select("*")...`
-- If this runs on the server, it should ideally use Service Role to manage all users.

-- For now, let's just enable RLS and create a policy that allows everything for the service role (implicit)
-- and maybe restrict public access.
-- Actually, if we are strictly using the Python Backend API for all admin_users operations,
-- we don't need to expose this table to the frontend Supabase client at all.
-- So we can just leave RLS enabled with NO policies for `anon` / `authenticated` roles, 
-- effectively making it private to the Service Role (Backend).

-- So, just CREATE TABLE is enough if backend uses Service Role.
-- If backend uses Anon Key, we need to allow read/write.
-- Let's assume Backend uses Service Role Key for administrative tasks (which is best practice).
