-- Añade imagen por herramienta (logo desde Supabase Storage o URL externa)
-- Ejecuta en SQL Editor de Supabase

ALTER TABLE tools
  ADD COLUMN IF NOT EXISTS image_url TEXT;

COMMENT ON COLUMN tools.image_url IS 'URL del logo (Supabase Storage: images/tools/ o URL externa). Si es NULL se muestra el nombre como texto.';
