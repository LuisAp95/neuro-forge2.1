-- =====================================================
-- TABLA: contact_url_directions
-- URLs externas para la página de contactos (Calendly, formularios, etc.)
-- =====================================================
-- Ejecuta este script en el SQL Editor de Supabase

CREATE TABLE contact_url_directions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0
);

-- RLS
ALTER TABLE contact_url_directions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read contact_url_directions"
  ON contact_url_directions FOR SELECT USING (true);

-- Datos iniciales: una fila para el botón principal (puedes editar la URL en Supabase)
INSERT INTO contact_url_directions (label, url, is_primary, sort_order)
VALUES
  ('Agendar consulta', 'https://calendly.com', true, 0);
