-- =====================================================
-- NEUROFORGE - SECCIÓN NUESTRA MISIÓN (ABOUT)
-- =====================================================
-- Ejecuta este script en el SQL Editor de Supabase
-- para insertar el contenido de la sección Nuestra Misión

INSERT INTO content_blocks (page, section, content) VALUES
('about', 'mission', '{
  "title": "Nuestra Misión",
  "paragraph1": "Capacitar a personas y apoyar a empresas para que aprovechen el poder de la inteligencia artificial.",
  "paragraph2": "En NeuroForge creemos que la tecnología debe liberarnos, no limitarnos. Apostamos por un futuro laboral más flexible, escalable y humano."
}'::jsonb)
ON CONFLICT (page, section) DO UPDATE SET
  content = EXCLUDED.content;
