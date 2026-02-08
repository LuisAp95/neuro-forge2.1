-- =====================================================
-- NEUROFORGE - SCHEMA INICIAL DE BASE DE DATOS
-- =====================================================
-- Ejecuta este script en el SQL Editor de Supabase
-- para crear todas las tablas necesarias

-- Tabla: testimonios
CREATE TABLE testimonials (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  comment TEXT NOT NULL,
  image_url TEXT,
  sort_order INT DEFAULT 0
);

-- Tabla: niveles Make Academy
CREATE TABLE academy_levels (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  level TEXT NOT NULL,
  stars INT NOT NULL,
  image_url TEXT,
  sort_order INT DEFAULT 0
);

-- Tabla: servicios del slider (IA, Automatización, CRM, Asistente)
CREATE TABLE slider_services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  description_completa TEXT,
  implementacion JSONB DEFAULT '[]',
  beneficios JSONB DEFAULT '[]',
  sort_order INT DEFAULT 0
);

-- Tabla: items del grid de servicios
CREATE TABLE services_grid (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Tabla: estadísticas (números que importan)
CREATE TABLE stats (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  value INT NOT NULL,
  label TEXT NOT NULL,
  suffix TEXT DEFAULT '+',
  sort_order INT DEFAULT 0
);

-- Tabla: herramientas
CREATE TABLE tools (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

-- Tabla: bloques de contenido por página (hero, intro, etc.)
-- Almacena textos editables por página y sección
CREATE TABLE content_blocks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  content JSONB NOT NULL,
  UNIQUE(page, section)
);

-- =====================================================
-- HABILITAR ROW LEVEL SECURITY (RLS)
-- =====================================================
-- Lectura pública, solo admin puede escribir

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE slider_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_grid ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS DE ACCESO PÚBLICO (LECTURA)
-- =====================================================

CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read academy_levels" ON academy_levels FOR SELECT USING (true);
CREATE POLICY "Public read slider_services" ON slider_services FOR SELECT USING (true);
CREATE POLICY "Public read services_grid" ON services_grid FOR SELECT USING (true);
CREATE POLICY "Public read stats" ON stats FOR SELECT USING (true);
CREATE POLICY "Public read tools" ON tools FOR SELECT USING (true);
CREATE POLICY "Public read content_blocks" ON content_blocks FOR SELECT USING (true);
