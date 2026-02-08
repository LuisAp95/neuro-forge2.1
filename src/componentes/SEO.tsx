import { useEffect } from "react";

const SITE_URL = import.meta.env.VITE_SITE_URL || "";

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Actualiza title, meta description, canonical y robots por ruta.
 * Uso: <SEO title="..." description="..." path="/services" />
 */
export function SEO({ title, description, path = "/", noIndex = false }: SEOProps) {
  const fullTitle = title.includes("NeuroForge") ? title : `${title} | NeuroForge`;
  const canonical = SITE_URL ? `${SITE_URL.replace(/\/$/, "")}${path === "/" ? "" : path}` : undefined;

  useEffect(() => {
    document.title = fullTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    if (noIndex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement("meta");
        metaRobots.setAttribute("name", "robots");
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute("content", "noindex, nofollow");
    } else {
      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) metaRobots.setAttribute("content", "index, follow");
    }

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      if (!linkCanonical) {
        linkCanonical = document.createElement("link");
        linkCanonical.setAttribute("rel", "canonical");
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute("href", canonical);
    } else if (linkCanonical) {
      linkCanonical.remove();
    }

    // Open Graph (para compartir en redes)
    const setMeta = (attr: string, value: string, isProperty = true) => {
      const key = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${key}="${attr}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, attr);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    if (canonical) setMeta("og:url", canonical);

    return () => {
      // Opcional: restaurar valores por defecto al desmontar
      document.title = "NeuroForge | IA, Automatización y Asistentes Virtuales";
    };
  }, [fullTitle, description, canonical, noIndex]);

  return null;
}
