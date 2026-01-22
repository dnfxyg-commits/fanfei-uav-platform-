-- Add sort_order column to products table if it doesn't exist
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Optional: Initialize sort_order based on creation date or id
-- This ensures existing products have a meaningful order initially
WITH ranked_products AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) as rn
  FROM public.products
)
UPDATE public.products
SET sort_order = ranked_products.rn * 10
FROM ranked_products
WHERE public.products.id = ranked_products.id;
