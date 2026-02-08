# Guía completa: Supabase en NeuroForge

Esta guía detalla la estructura de la base de datos, qué se puede modificar y cómo hacerlo paso a paso.

---

## Índice

1. [Resumen de la estructura](#1-resumen-de-la-estructura)
2. [Orden de ejecución de los scripts SQL](#2-orden-de-ejecución-de-los-scripts-sql)
3. [Tablas y qué modificar en cada una](#3-tablas-y-qué-modificar-en-cada-una)
4. [Contenido editable por página: `content_blocks`](#4-contenido-editable-por-página-content_blocks)
5. [Cómo modificar desde el Dashboard de Supabase](#5-cómo-modificar-desde-el-dashboard-de-supabase)
6. [Modificaciones avanzadas (SQL)](#6-modificaciones-avanzadas-sql)
7. [Imágenes y Storage](#7-imágenes-y-storage)
8. [Seguridad (RLS)](#8-seguridad-rls)
9. [Checklist de cambios frecuentes](#9-checklist-de-cambios-frecuentes)

---

## 1. Resumen de la estructura

El proyecto usa **8 tablas** en Supabase:

| Tabla | Archivo SQL | Uso en la app |
|-------|-------------|----------------|
| `testimonials` | 001, 002 | Testimonios en Home |
| `academy_levels` | 001, 002 | Niveles Make Academy |
| `slider_services` | 001, 002 | Slider de servicios (IA, Automatización, CRM, Asistente) |
| `services_grid` | 001, 002 | Grid de servicios en página Servicios |
| `stats` | 001, 002 | Números que importan (clientes, proyectos, etc.) |
| `tools` | 001, 002 | Herramientas que usamos (Make, Airtable, etc.) |
| `content_blocks` | 001, 002, 004 | Textos e imágenes por página y sección |
| `contact_url_directions` | 003 | URLs de contacto (Calendly, formularios) |

- **001_initial_schema.sql**: crea las tablas y políticas RLS (solo ejecutar una vez).
- **002_seed_data.sql**: inserta todos los datos iniciales (testimonios, servicios, content_blocks, etc.).
- **003_contact_url_directions.sql**: crea la tabla de URLs de contacto y un registro por defecto.
- **004_about_mission.sql**: inserta o actualiza el bloque "Nuestra Misión" en la página About.

---

## 2. Orden de ejecución de los scripts SQL

Si montas la base desde cero en Supabase:

1. **001_initial_schema.sql** — Crear tablas y RLS.
2. **002_seed_data.sql** — Cargar datos iniciales.
3. **003_contact_url_directions.sql** — Tabla y dato de contacto.
4. **004_about_mission.sql** — Bloque "Nuestra Misión" (usa `ON CONFLICT` para no duplicar).

No hace falta re-ejecutar 001 ni 003 una vez creadas las tablas. Los datos que quieras cambiar los editas en el **Table Editor** o con SQL puntual.

---

## 3. Tablas y qué modificar en cada una

### 3.1 `testimonials`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `name` | TEXT | Nombre del cliente |
| `title` | TEXT | Cargo o rol (ej. "Emprendedora", "CEO") |
| `comment` | TEXT | Texto del testimonio |
| `image_url` | TEXT | URL de la foto (puede ser Unsplash, Supabase Storage, etc.) |
| `sort_order` | INT | Orden de aparición (menor = primero) |

**Qué puedes modificar:**

- Añadir, editar o borrar testimonios.
- Cambiar textos (`name`, `title`, `comment`).
- Cambiar `image_url` por otra URL.
- Cambiar el orden modificando `sort_order`.

**Dónde se usa en la app:** componente de testimonios en la página Home (hook `useTestimonials`).

---

### 3.2 `academy_levels`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `level` | TEXT | Nombre del nivel (ej. FOUNDATION, BASICS) |
| `stars` | INT | Número de estrellas (1–3) |
| `image_url` | TEXT | URL de la imagen del nivel |
| `sort_order` | INT | Orden de aparición |

**Qué puedes modificar:**

- Añadir o quitar niveles.
- Cambiar nombre, estrellas e imagen.
- Reordenar con `sort_order`.

**Dónde se usa:** lógica de niveles de Make Academy (hook `useAcademyLevels`).

---

### 3.3 `slider_services`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `title` | TEXT | Título corto (ej. "IA para tu Organización") |
| `description` | TEXT | Descripción breve |
| `description_completa` | TEXT | Texto largo del servicio |
| `implementacion` | JSONB | Array de strings: pasos de implementación |
| `beneficios` | JSONB | Array de strings: beneficios |
| `sort_order` | INT | Orden en el slider |

**Qué puedes modificar:**

- Editar títulos y descripciones.
- Cambiar listas de implementación y beneficios (manteniendo formato JSON array de strings).
- Añadir o quitar servicios del slider.
- Reordenar con `sort_order`.

**Dónde se usa:** página Servicios, slider principal (hook `useServicesData` → `slider_services`).

---

### 3.4 `services_grid`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `title` | TEXT | Título del servicio (ej. "AUTOMATIZA ATENCIÓN AL CLIENTE") |
| `description` | TEXT | Descripción |
| `image_url` | TEXT | URL de la imagen (Storage; opcional) |
| `image_alt` | TEXT | Texto alternativo de la imagen (opcional) |
| `sort_order` | INT | Orden en el grid |

**Qué puedes modificar:**

- Añadir, editar o borrar ítems del grid.
- Cambiar orden con `sort_order`.
- Asignar imagen a cada tarjeta: sube la imagen en Storage → `images/services/`, copia la URL y pégala en `image_url`. Si la tabla no tiene estas columnas, ejecuta `006_services_grid_images.sql`.

**Dónde se usa:** página Servicios, sección grid de servicios (hook `useServicesData` → `services_grid`).

---

### 3.5 `stats`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `value` | INT | Número (ej. 350, 100) |
| `label` | TEXT | Etiqueta (ej. "CLIENTES FELICES") |
| `suffix` | TEXT | Sufijo (por defecto "+") |
| `sort_order` | INT | Orden |

**Qué puedes modificar:**

- Actualizar números y etiquetas.
- Cambiar sufijo (ej. "%", "k", "").
- Añadir o quitar estadísticas.
- Reordenar con `sort_order`.

**Dónde se usa:** página Servicios (y posiblemente Home), sección "Números que importan" (hook `useServicesData` → `stats`).

---

### 3.6 `tools`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `name` | TEXT | Nombre de la herramienta (ej. "make", "Airtable") |
| `sort_order` | INT | Orden |

**Qué puedes modificar:**

- Añadir, editar o borrar herramientas.
- Reordenar con `sort_order`.

**Dónde se usa:** página Servicios, sección "Herramientas que usamos" (hook `useServicesData` → `tools`).

---

### 3.7 `contact_url_directions`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `label` | TEXT | Texto del botón/enlace (ej. "Agendar consulta") |
| `url` | TEXT | URL (Calendly, Typeform, etc.) |
| `is_primary` | BOOLEAN | Si es el enlace principal de contacto |
| `sort_order` | INT | Orden si hay varios enlaces |

**Qué puedes modificar:**

- Cambiar la URL de Calendly u otro formulario (muy frecuente).
- Cambiar el texto del botón (`label`).
- Añadir más enlaces (ej. WhatsApp, formulario secundario) y marcar cuál es principal con `is_primary`.

**Dónde se usa:** botón de contacto / CTA (hook `useContactDirections` → `primaryUrl` y lista `directions`).

---

### 3.8 `content_blocks`

**Columnas:**

| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | BIGINT (auto) | Clave primaria |
| `page` | TEXT | Página: `home`, `about`, `services` |
| `section` | TEXT | Sección dentro de la página |
| `content` | JSONB | Objeto JSON con todos los textos e URLs de esa sección |

**Restricción:** una sola fila por combinación `(page, section)` (UNIQUE).

**Qué puedes modificar:**

- Cualquier texto, título, párrafo o etiqueta que viva dentro de `content`.
- URLs de imágenes dentro de `content` (hero, intro, about, founder, etc.).
- Estructura del JSON siempre que el frontend espere las mismas claves (ver sección 4).

**Dónde se usa:** hooks `useHomeData`, `useAboutData` y `useServicesData` (títulos y textos de secciones; no los ítems de slider/grid/stats, que vienen de sus tablas).

---

## 4. Contenido editable por página: `content_blocks`

El frontend espera bloques por `page` y `section`. Resumen de bloques definidos en el seed:

### Página `home`

| section | Contenido típico en `content` |
|---------|-------------------------------|
| `hero` | `titleLine1`, `titleHighlight`, `subtitle`, `ctaPrimary`, `ctaSecondary` |
| `introSection` | `title`, `titleHighlight`, `paragraph1`, `paragraph2`, `imageUrl` |
| `features` | `sectionTitle`, `titleHighlight`, `subtitle`, `items` (array con title, description, buttonText, imageUrl, imageAlt) |
| `aboutMe` | `title`, `paragraph1`, `paragraph2`, `buttonText`, `imageAlt`, `imageUrl` |
| `testimonials` | `sectionTitle`, `titleHighlight` |
| `contact` | `title`, `titleHighlight`, `titleSuffix`, `ctaButton` |

### Página `about`

| section | Contenido típico en `content` |
|---------|-------------------------------|
| `hero` | `titleHighlight`, `titleMain`, `subtitle`, `paragraph1`, `paragraph2`, `ctaButton`, `imageUrl`, `imageAlt` |
| `whatWeDo` | `title`, `intro`, `imageUrl`, `imageAlt`, `services` (array de `{ title, description }`) |
| `mission` | `title`, `paragraph1`, `paragraph2` |
| `founder` | `title`, `paragraph1`, `paragraph2`, `paragraph3`, `highlightQuote`, `imageAlt`, `imageUrl` |
| `officePhoto` | `imageAlt`, `placeholderText` (y opcionalmente `imageUrl` si se usa) |

### Página `services`

| section | Contenido típico en `content` |
|---------|-------------------------------|
| `slider` | `titlePart1`, `titleHighlight`, `implementLabel`, `benefitsLabel` |
| `stats` | `titlePart1`, `titleHighlight` |
| `servicesGrid` | `titlePart1`, `titleHighlight`, `subtitle` |
| `tools` | `titlePart1`, `titleHighlight` |

**Importante:** si cambias o añades claves dentro de `content`, hay que actualizar el código de los componentes que lean ese bloque para que usen las nuevas claves. Si solo cambias valores (textos o URLs) manteniendo las mismas claves, no hace falta tocar código.

---

## 5. Cómo modificar desde el Dashboard de Supabase

### Paso 1: Entrar al proyecto

1. Entra en [app.supabase.com](https://app.supabase.com).
2. Abre el proyecto de NeuroForge.

### Paso 2: Table Editor (editar filas)

1. En el menú izquierdo: **Table Editor**.
2. Elige la tabla (por ejemplo `testimonials`, `contact_url_directions`, `content_blocks`).
3. Para **editar**: doble clic en la celda, cambia el valor y confirma.
4. Para **añadir fila**: botón "Insert row" y rellena columnas.
5. Para **borrar**: selecciona la fila y usa la opción de eliminar.

Para tablas con **JSONB** (`content_blocks.content`, `slider_services.implementacion`, `slider_services.beneficios`):

- En Table Editor puedes editar el JSON directamente (cuidado con comas y comillas).
- Para cambios grandes, suele ser más cómodo usar el **SQL Editor** (ver sección 6).

### Paso 3: Cambiar la URL de contacto (Calendly)

1. **Table Editor** → tabla **contact_url_directions**.
2. Localiza la fila con `is_primary = true` (o la que uses como principal).
3. Edita la columna **url** y pon tu enlace de Calendly (o el que quieras).
4. Opcional: edita **label** (ej. "Agendar una llamada").
5. Guarda. El frontend usa `useContactDirections` y mostrará la nueva URL en el siguiente carga (y con cache, al refrescar o tras limpiar cache).

### Paso 4: Cambiar textos de una sección (content_blocks)

1. **Table Editor** → **content_blocks**.
2. Filtra por **page** y **section** (ej. `page = home`, `section = hero`).
3. Haz clic en la celda **content**.
4. Edita el JSON (títulos, párrafos, `imageUrl`, etc.) manteniendo las mismas claves que usa el frontend.
5. Guarda.

Si el JSON es largo, es más seguro copiarlo, editarlo en un editor de texto, validar que sea JSON válido y pegarlo de nuevo, o usar SQL (ver más abajo).

---

## 6. Modificaciones avanzadas (SQL)

### Dónde ejecutar SQL

1. En Supabase: **SQL Editor**.
2. Crear una nueva query y pegar el SQL.
3. Ejecutar (Run).

### Ejemplos útiles

**Actualizar URL de Calendly:**

```sql
UPDATE contact_url_directions
SET url = 'https://calendly.com/tu-usuario/30min'
WHERE is_primary = true;
```

**Actualizar un solo testimonio:**

```sql
UPDATE testimonials
SET name = 'Nuevo Nombre', title = 'Nuevo Cargo', comment = 'Nuevo comentario.'
WHERE id = 1;
```

**Actualizar el hero de Home (solo algunos campos):**

```sql
UPDATE content_blocks
SET content = jsonb_set(
  jsonb_set(content, '{titleLine1}', '"Nuevo título"'),
  '{subtitle}',
  '"Nuevo subtítulo."'
)
WHERE page = 'home' AND section = 'hero';
```

**Reemplazar todo el contenido de una sección (ej. about/founder):**

```sql
UPDATE content_blocks
SET content = '{
  "title": "Sobre la fundadora",
  "paragraph1": "Texto nuevo...",
  "paragraph2": "...",
  "paragraph3": "...",
  "highlightQuote": "Cita destacada",
  "imageAlt": "Fundadora",
  "imageUrl": "https://..."
}'::jsonb
WHERE page = 'about' AND section = 'founder';
```

**Añadir un nuevo ítem al grid de servicios:**

```sql
INSERT INTO services_grid (title, description, sort_order)
VALUES (
  'NUEVO SERVICIO',
  'Descripción del nuevo servicio.',
  10
);
```

**Cambiar orden de testimonios (poner el id 3 primero):**

```sql
UPDATE testimonials SET sort_order = 0 WHERE id = 3;
UPDATE testimonials SET sort_order = 1 WHERE id = 1;
UPDATE testimonials SET sort_order = 2 WHERE id = 2;
-- etc.
```

**Actualizar estadísticas:**

```sql
UPDATE stats SET value = 400, label = 'CLIENTES FELICES' WHERE id = 1;
UPDATE stats SET value = 150, label = 'PROYECTOS HECHOS' WHERE id = 2;
```

---

## 7. Imágenes y Storage

Varias celdas guardan **URLs de imágenes**, no los archivos:

- `testimonials.image_url`
- `academy_levels.image_url`
- `content_blocks.content` (claves como `imageUrl` dentro del JSON)

Opciones:

1. **URLs externas:** Unsplash, Imgur, etc. Solo cambias la URL en la tabla o en el JSON.
2. **Supabase Storage:**  
   - Creas un bucket (ej. `images`), subes archivos y obtienes la URL pública.  
   - Esa URL es la que pones en `image_url` o dentro de `content.imageUrl`.  
   - En el seed ya se usan URLs de Supabase Storage (ej. `.../images/pages/rox.png`). Puedes reemplazarlas por otras del mismo bucket o de otro.

Para cambiar una imagen:

- Sube el nuevo archivo a Storage (o usa una URL externa).
- Actualiza la URL en la tabla o en el bloque `content_blocks` correspondiente.

---

## 8. Seguridad (RLS)

En **001_initial_schema.sql** y **003_contact_url_directions.sql**:

- **RLS está activado** en todas las tablas.
- **Políticas:** solo hay políticas de **SELECT** público (`USING (true)`). Es decir: cualquiera con la URL y anon key puede **leer**.
- **No hay políticas de INSERT/UPDATE/DELETE** para usuarios anónimos, por lo que los visitantes de la web no pueden modificar datos. Las modificaciones se hacen desde el **Dashboard de Supabase** (con tu cuenta) o con un rol de servicio/admin si lo implementas después.

Si en el futuro quieres que solo un “admin” pueda escribir:

- Crearías un usuario/rol en Auth o usarías una service role key en un backend.
- Añadirías políticas de INSERT/UPDATE/DELETE para ese rol y mantendrías el SELECT público para la web.

---

## 9. Checklist de cambios frecuentes

| Quiero... | Dónde | Cómo |
|-----------|--------|------|
| Cambiar enlace de “Agendar consulta” | `contact_url_directions` | Table Editor o SQL: columna `url` (y opcionalmente `label`) |
| Cambiar textos del hero de Home | `content_blocks` (page=home, section=hero) | Editar JSON en `content` o usar `jsonb_set` en SQL |
| Añadir o quitar testimonio | `testimonials` | Table Editor: Insert row / Delete row; revisar `sort_order` |
| Cambiar números (clientes, proyectos…) | `stats` | Table Editor o SQL en `value` y `label` |
| Cambiar servicios del slider | `slider_services` | Table Editor o SQL; `implementacion` y `beneficios` son JSONB array |
| Cambiar textos de “Nuestra Misión” | `content_blocks` (page=about, section=mission) | Editar `content` o reemplazar con UPDATE |
| Cambiar foto o texto de la fundadora | `content_blocks` (page=about, section=founder) | Editar `content` (paragraphs, imageUrl, imageAlt) |
| Añadir herramienta (Make, Airtable…) | `tools` | Insert en `tools` con `name` y `sort_order` |
| Cambiar títulos de sección en Servicios | `content_blocks` (page=services, section=slider/stats/servicesGrid/tools) | Editar el `content` del bloque correspondiente |

---

## Resumen de archivos SQL

| Archivo | Qué hace |
|---------|----------|
| **001_initial_schema.sql** | Crea tablas: testimonials, academy_levels, slider_services, services_grid, stats, tools, content_blocks. Habilita RLS y políticas de lectura pública. |
| **002_seed_data.sql** | Inserta datos en todas esas tablas y en content_blocks (home, about, services). |
| **003_contact_url_directions.sql** | Crea tabla contact_url_directions, RLS, política de lectura e inserta una fila “Agendar consulta” con URL Calendly. |
| **004_about_mission.sql** | Inserta o actualiza (ON CONFLICT) el bloque about/mission en content_blocks. |

Con esta guía puedes modificar todo el contenido que vive en Supabase (textos, URLs, imágenes, orden y listas) desde el Table Editor o con SQL, sin tocar código salvo que cambies la estructura de los JSON en `content_blocks` o añadas nuevas secciones/páginas en el frontend.
