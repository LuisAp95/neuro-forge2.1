-- =====================================================
-- TABLA: social_links
-- URLs de redes sociales para el footer (Facebook, YouTube, Instagram)
-- =====================================================
-- Ejecuta este script en el SQL Editor de Supabase

CREATE TABLE social_links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  platform TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read social_links"
  ON social_links FOR SELECT USING (true);

-- Datos iniciales: edita las URLs en Supabase con tus perfiles reales
INSERT INTO social_links (platform, url, sort_order)
VALUES
  ('facebook',  'https://www.facebook.com',  1),
  ('youtube',   'https://www.youtube.com',   2),
  ('instagram', 'https://www.instagram.com', 3);
