-- Añadir columnas de imagen al grid de servicios (para bases de datos ya creadas)
-- Ejecuta este script si ya tenías la tabla services_grid sin image_url/image_alt

ALTER TABLE services_grid
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS image_alt TEXT;
