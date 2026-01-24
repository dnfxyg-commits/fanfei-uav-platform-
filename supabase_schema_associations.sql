
-- Create associations table
CREATE TABLE IF NOT EXISTS associations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- '协会' or '联盟' or '媒体'
    description TEXT,
    content TEXT,
    join_info TEXT,
    logo TEXT,
    contact_info TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE associations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view associations" ON associations
    FOR SELECT TO public USING (true);

CREATE POLICY "Authenticated users can insert associations" ON associations
    FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update associations" ON associations
    FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete associations" ON associations
    FOR DELETE TO authenticated USING (true);
