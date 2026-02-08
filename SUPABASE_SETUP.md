# Integración con Supabase - NeuroForge

## Estado de la implementación

✅ **Completado**:

- Scripts SQL para crear tablas (`supabase/001_initial_schema.sql`)
- Script SQL con datos iniciales (`supabase/002_seed_data.sql`)
- Cliente de Supabase (`src/lib/supabase.ts`)
- 5 hooks personalizados para cargar datos desde Supabase
- Todos los componentes (13) migrados para usar hooks en lugar de JSON
- Variables de entorno configuradas (`.env.example`)

## Pasos para completar la configuración

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Haz clic en "New Project"
3. Configura:
   - **Name**: `neuroforge`
   - **Database Password**: (guarda esta contraseña)
   - **Region**: South America (o la más cercana)
4. Espera a que el proyecto se cree (puede tomar 1-2 minutos)

### 2. Ejecutar scripts SQL

1. En el panel de Supabase, ve a **SQL Editor** (menú lateral izquierdo)
2. Crea una nueva query
3. Copia y pega el contenido de `supabase/001_initial_schema.sql`
4. Haz clic en **Run** (o presiona Ctrl+Enter)
5. Verifica que aparezca un mensaje de éxito
6. Repite el proceso con `supabase/002_seed_data.sql` para cargar los datos iniciales

### 3. Configurar Storage para imágenes

1. Ve a **Storage** en el menú lateral
2. Haz clic en "Create a new bucket"
3. Configura:
   - **Name**: `images`
   - **Public bucket**: ✅ Activado
4. Dentro del bucket `images`, crea las siguientes carpetas:
   - `testimonials/`
   - `academy/`
   - `pages/`
   - `features/`

### 4. Configurar variables de entorno

1. En el panel de Supabase, ve a **Settings** → **API**
2. Copia los siguientes valores:
   - **Project URL** (ej: `https://xxxxx.supabase.co`)
   - **anon/public key** (es la API Key pública)
3. Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

4. Abre `.env` y reemplaza los valores:

```
VITE_SUPABASE_URL=https://tu-proyecto-aqui.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

### 5. Probar la aplicación

```bash
npm run dev
```

La aplicación ahora carga todos los datos desde Supabase.

## Estructura de datos

### Tablas creadas:

| Tabla             | Descripción                                               |
| ----------------- | --------------------------------------------------------- |
| `testimonials`    | Testimonios de clientes                                   |
| `academy_levels`  | Niveles de Make Academy                                   |
| `slider_services` | Servicios del slider (IA, Automatización, CRM, Asistente) |
| `services_grid`   | Grid de servicios                                         |
| `stats`           | Estadísticas (números que importan)                       |
| `tools`           | Herramientas que usamos                                   |
| `content_blocks`  | Bloques de contenido por página (hero, intro, etc.)       |

### Hooks disponibles:

| Hook                 | Descripción                 |
| -------------------- | --------------------------- |
| `useHomeData()`      | Datos de la página home     |
| `useAboutData()`     | Datos de la página about    |
| `useServicesData()`  | Datos de la página services |
| `useTestimonials()`  | Lista de testimonios        |
| `useAcademyLevels()` | Niveles de Make Academy     |

## Cómo modificar contenido

### Opción 1: Desde Supabase (recomendado)

1. Ve a **Table Editor** en Supabase
2. Selecciona la tabla que deseas editar
3. Haz clic en una fila para editarla
4. Los cambios se reflejan automáticamente en la app

### Opción 2: Desde SQL Editor

```sql
-- Ejemplo: actualizar un testimonio
UPDATE testimonials
SET comment = 'Nuevo comentario aquí'
WHERE id = 1;

-- Ejemplo: actualizar texto del hero de home
UPDATE content_blocks
SET content = jsonb_set(
  content,
  '{subtitle}',
  '"Nuevo subtítulo aquí"'
)
WHERE page = 'home' AND section = 'hero';
```

## Subir imágenes

### Para testimonios:

1. Ve a **Storage** → `images` → `testimonials/`
2. Sube la imagen (ej: `maria-gonzalez.jpg`)
3. Haz clic derecho en la imagen → "Copy URL"
4. Ve a **Table Editor** → `testimonials`
5. Edita la fila correspondiente y pega la URL en `image_url`

### Para la imagen junto a "Transformamos Ideas en Realidad Digital" (home):

1. Ve a **Storage** → `images` → carpeta `pages/`
2. Sube tu imagen (ej: `intro-hero.jpg`)
3. Clic derecho en la imagen → **Copy URL** (URL pública)
4. Ve a **Table Editor** → tabla `content_blocks`
5. Localiza la fila donde `page` = `home` y `section` = `introSection`
6. En la columna `content` (JSON), edita y añade o modifica la clave `"imageUrl"` con la URL copiada, por ejemplo: `"imageUrl": "https://tu-proyecto.supabase.co/storage/v1/object/public/images/pages/intro-hero.jpg"`
7. Si tu seed no tenía `imageUrl`, puedes añadirlo con SQL:

```sql
UPDATE content_blocks
SET content = content || '{"imageUrl": "https://TU-URL-AQUI"}'::jsonb
WHERE page = 'home' AND section = 'introSection';
```

(Reemplaza `https://TU-URL-AQUI` por la URL que copiaste de Storage.)

### Para la imagen de la sección "Sobre mí" (home):

1. Ve a **Storage** → `images` → carpeta `pages/`
2. Sube la foto (ej: `roxana-aparicio.jpg` o `sobre-mi.jpg`)
3. Clic derecho en la imagen → **Copy URL**
4. Ve a **Table Editor** → tabla `content_blocks`
5. Fila donde `page` = `home` y `section` = `aboutMe`
6. En la columna `content`, añade o edita la clave `"imageUrl"` con esa URL

Si el bloque no tiene `imageUrl`, puedes usar:

```sql
UPDATE content_blocks
SET content = content || '{"imageUrl": "https://TU-URL-AQUI"}'::jsonb
WHERE page = 'home' AND section = 'aboutMe';
```

### Para las imágenes de "Esto es lo que hacemos" (home, 3 tarjetas):

Cada tarjeta puede tener su propia imagen. Los datos están en `content_blocks` → `page` = `home`, `section` = `features`; dentro de `content` hay un array `items` con 3 objetos (uno por tarjeta).

1. Ve a **Storage** → `images` → crea la carpeta `features/` si no existe
2. Sube las 3 imágenes (ej: `atencion-cliente.jpg`, `chatbots-multicanal.jpg`, `soporte-ia.jpg`)
3. Copia la URL pública de cada una (clic derecho → Copy URL)
4. Ve a **Table Editor** → `content_blocks` → fila `page` = `home`, `section` = `features`
5. Edita la columna `content`. Dentro de `items`, cada objeto debe tener `"imageUrl": "https://..."` y opcionalmente `"imageAlt": "Texto descriptivo"`. Ejemplo para el primer ítem:

```json
{
  "title": "AUTOMATIZA ATENCION AL CLIENTE",
  "description": "...",
  "buttonText": "Saber mas",
  "imageUrl": "https://tu-proyecto.supabase.co/storage/v1/object/public/images/features/atencion-cliente.jpg",
  "imageAlt": "Automatiza atención al cliente"
}
```

Si no pones `imageUrl` en un ítem, esa tarjeta seguirá mostrando el icono/ilustración por defecto.

### Para la imagen "Acerca de Neuro Forge" (hero de la página Acerca):

Es la imagen que va a la izquierda del título "Acerca de Neuro Forge" (donde antes decía "Imagen del robot por agregar").

1. Ve a **Storage** → `images` → carpeta `pages/`
2. Sube la imagen (ej: `about-hero.jpg` o `robot.jpg`)
3. Clic derecho en la imagen → **Copy URL**
4. Ve a **Table Editor** → tabla `content_blocks`
5. Fila donde `page` = `about` y `section` = `hero`
6. En la columna `content`, añade o edita `"imageUrl"` con la URL y opcionalmente `"imageAlt"`

Si el bloque no tiene `imageUrl`:

```sql
UPDATE content_blocks
SET content = content || '{"imageUrl": "https://TU-URL-AQUI", "imageAlt": "Acerca de Neuro Forge"}'::jsonb
WHERE page = 'about' AND section = 'hero';
```

### Para la imagen de "¿Qué hacemos?" (página Acerca):

Es la imagen a la derecha del título "¿Qué hacemos?" (donde antes decía "Imagen del cohete por agregar").

1. Ve a **Storage** → `images` → carpeta `pages/`
2. Sube la imagen (ej: `que-hacemos.jpg` o `cohete.jpg`)
3. Clic derecho en la imagen → **Copy URL**
4. Ve a **Table Editor** → tabla `content_blocks`
5. Fila donde `page` = `about` y `section` = `whatWeDo`
6. En la columna `content`, añade o edita `"imageUrl"` con la URL y opcionalmente `"imageAlt"`

Si el bloque no tiene `imageUrl`:

```sql
UPDATE content_blocks
SET content = content || '{"imageUrl": "https://TU-URL-AQUI", "imageAlt": "¿Qué hacemos?"}'::jsonb
WHERE page = 'about' AND section = 'whatWeDo';
```

### Para la imagen de "Sobre la fundadora" (página Acerca):

1. Ve a **Storage** → `images` → carpeta `pages/`
2. Sube la foto de la fundadora (ej: `fundadora.jpg`)
3. Clic derecho en la imagen → **Copy URL**
4. Ve a **Table Editor** → tabla `content_blocks`
5. Fila donde `page` = `about` y `section` = `founder`
6. En la columna `content`, añade o edita la clave `"imageUrl"` con esa URL

Si el bloque no tiene `imageUrl`, puedes usar:

```sql
UPDATE content_blocks
SET content = content || '{"imageUrl": "https://TU-URL-AQUI"}'::jsonb
WHERE page = 'about' AND section = 'founder';
```

Si no configuras `imageUrl`, la sección usará la imagen local por defecto (`fundadora.jpeg`).

### Para las imágenes de "Nuestros Servicios" (página Servicios):

Las tres tarjetas (Atención al cliente, Chatbots multicanal, Soluciones de soporte IA) pueden tener imagen. Los datos están en la tabla **`services_grid`** (no en content_blocks).

**Si tu base de datos se creó antes de tener estas columnas**, ejecuta primero en el SQL Editor:

```sql
-- Contenido de supabase/006_services_grid_images.sql
ALTER TABLE services_grid
  ADD COLUMN IF NOT EXISTS image_url TEXT,
  ADD COLUMN IF NOT EXISTS image_alt TEXT;
```

Luego:

1. Ve a **Storage** → `images` → crea la carpeta `services/` si no existe
2. Sube las 3 imágenes (ej: `atencion-cliente.jpg`, `chatbots-multicanal.jpg`, `soporte-ia.jpg`)
3. Copia la URL pública de cada una (clic derecho → Copy URL)
4. Ve a **Table Editor** → tabla **`services_grid`**
5. Edita cada fila y pega la URL en la columna **`image_url`**; opcionalmente rellena **`image_alt`** (ej: "Automatiza atención al cliente")

Si una fila no tiene `image_url`, esa tarjeta seguirá mostrando el icono por defecto.

### Para Make Academy:

Las imágenes ya están configuradas con URLs de Trello. Si deseas cambiarlas:

1. Sube a **Storage** → `images` → `academy/`
2. Copia la URL pública
3. Actualiza en `academy_levels` → `image_url`

## Limpieza (opcional)

Una vez que todo funcione correctamente, puedes eliminar los archivos JSON originales:

```bash
rm -rf src/data/*.json src/data/testimonials.ts
```

## Solución de problemas

### Error: "Las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY deben estar configuradas"

→ Verifica que el archivo `.env` esté en la raíz del proyecto y tenga los valores correctos.

### Las imágenes no se muestran

→ Verifica que el bucket `images` esté configurado como **público** en Supabase Storage.

### Los datos no se cargan

→ Verifica en la consola del navegador (F12) si hay errores. Asegúrate de haber ejecutado los scripts SQL correctamente.

## Seguridad

- Las políticas RLS (Row Level Security) están configuradas para permitir **lectura pública**.
- Para operaciones de escritura (INSERT, UPDATE, DELETE), necesitarás autenticación o configurar políticas personalizadas.
- **Nunca** expongas la `service_role key` en el frontend.

## Próximos pasos sugeridos

1. **Autenticación**: Agregar login para administradores que puedan editar contenido
2. **Panel de administración**: Crear una interfaz en React para editar contenido sin usar Supabase directamente
3. **Caché**: Implementar caché local para mejorar el rendimiento
4. **Realtime**: Usar Supabase Realtime para actualizar contenido en vivo sin recargar la página
