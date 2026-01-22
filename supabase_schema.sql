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

-- Create exhibition_applications table for ticket bookings and booth applications
CREATE TABLE IF NOT EXISTS public.exhibition_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  exhibition_id TEXT NOT NULL,
  exhibition_title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('ticket', 'booth')),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.exhibition_applications ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone (anon) to insert applications
CREATE POLICY "Allow public submission" 
ON public.exhibition_applications
FOR INSERT 
TO anon
WITH CHECK (true);

-- Policy: Allow service role (backend) to do everything
-- (Implicitly allowed, but explicit policy for authenticated users/admin might be needed if accessing from frontend)
-- Since we are accessing this via backend API (service role), we don't strictly need more policies for anon.
