# Estrategia SEO - NeuroForge

Resumen de lo implementado y pasos recomendados para posicionar en Google.

## Implementado

### 1. **index.html**
- `lang="es"` para idioma.
- **Title** y **meta description** por defecto con palabras clave (IA, automatización, chatbots, asistentes virtuales).
- **Meta keywords** y **author**.
- **Open Graph** (og:title, og:description, og:locale, og:site_name) para redes sociales.
- **Twitter Card** (twitter:card, twitter:title, twitter:description).
- **JSON-LD** (Organization) para Google (nombre, descripción, fundadora).
- Comentarios en el HTML para que añadas `og:url`, `og:image` y `canonical` cuando tengas dominio e imagen.

### 2. **Meta por ruta (componente SEO)**
- Cada página define su propio **title** y **description** vía `<SEO />`.
- URLs **canonical** si defines `VITE_SITE_URL` en `.env`.
- Actualización dinámica de **og:title** y **og:description** al cambiar de ruta.

### 3. **public/robots.txt**
- `User-agent: *` y `Allow: /`.
- Referencia a `Sitemap` (cambiar la URL cuando tengas dominio).

### 4. **public/sitemap.xml**
- Incluye `/`, `/services` y `/about` con prioridad y changefreq.
- **Importante:** sustituir `https://www.neuroforge.com` por tu dominio real antes de subir a producción.

---

## Antes de publicar (buenas prácticas)

1. **Dominio real**
   - En `.env`: `VITE_SITE_URL=https://tudominio.com` (sin barra final).
   - En `public/robots.txt`: línea `Sitemap: https://tudominio.com/sitemap.xml`.
   - En `public/sitemap.xml`: reemplazar todas las `<loc>` con `https://tudominio.com/...`.
   - En `index.html`: descomentar y rellenar `og:url`, `og:image` y `link rel="canonical"`; actualizar la `url` del JSON-LD.

2. **Imagen para redes (Open Graph / Twitter)**
   - Crear una imagen **1200×630 px** (logo + texto o claim).
   - Subirla a `public/` (ej: `og-image.jpg`).
   - Añadir en `index.html`:
     - `<meta property="og:image" content="https://tudominio.com/og-image.jpg" />`
     - `<meta name="twitter:image" content="https://tudominio.com/og-image.jpg" />`

3. **Favicon**
   - Sustituir `vite.svg` por tu favicon (`.ico` o `.png`) y actualizar la referencia en `index.html`.

4. **Contenido y estructura**
   - Una sola **H1** por página (ya tienes títulos en hero/secciones).
   - **Alt** en todas las imágenes (revisado en servicios y about).
   - Enlaces internos entre Home, Servicios y Sobre mí (navbar/footer ya lo hacen).

5. **Rendimiento y técnico**
   - `npm run build` y revisar que no haya errores.
   - Desplegar con **HTTPS**.
   - Probar con [PageSpeed Insights](https://pagespeed.web.dev/) y [Rich Results Test](https://search.google.com/test/rich-results) (para el JSON-LD).

---

## Después de publicar

- **Google Search Console:** añadir la propiedad con tu dominio y enviar el sitemap (`https://tudominio.com/sitemap.xml`).
- **Bing Webmaster Tools:** opcional; también permite enviar sitemap.
- Revisar cobertura e indexación en Search Console y corregir errores si aparecen.

Si quieres, el siguiente paso puede ser generar la imagen OG 1200×630 o revisar los H1/alt de cada página en detalle.
