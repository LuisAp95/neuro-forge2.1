# NeuroForge - robots.txt

Documentación del archivo `public/robots.txt` y cómo usarlo para el SEO.

## Contenido actual

```txt
# NeuroForge - robots.txt
# https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt

User-agent: *
Allow: /

# Sitemap (reemplaza con tu dominio real cuando lo tengas)
Sitemap: https://www.neuroforge.com/sitemap.xml
```

## Qué hace cada directiva

| Directiva    | Significado |
|-------------|-------------|
| `User-agent: *` | Aplica a todos los rastreadores (Google, Bing, etc.). |
| `Allow: /`      | Permite indexar todo el sitio. |
| `Sitemap: ...`  | Indica la URL del sitemap para que los buscadores encuentren tus páginas. |

## Cuándo actualizar

- Cuando tengas tu **dominio real**, cambia la URL del Sitemap en `public/robots.txt`:
  - De: `https://www.neuroforge.com/sitemap.xml`
  - A: `https://tudominio.com/sitemap.xml` (o la URL donde esté publicado el sitio).

## Referencia

- [Crear un archivo robots.txt (Google)](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt)
