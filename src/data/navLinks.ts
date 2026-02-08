/**
 * Configuración centralizada de enlaces de navegación.
 * Único punto de verdad para navbar desktop y mobile sidebar.
 */

export interface NavLinkItem {
  label: string;
  to: string;
  type: "internal" | "external";
}

/** Enlaces internos de la aplicación (rutas React Router) */
export const INTERNAL_NAV_LINKS: NavLinkItem[] = [
  { label: "Home", to: "/", type: "internal" },
  { label: "Acerca", to: "/about", type: "internal" },
  { label: "Servicios", to: "/services", type: "internal" },
];

/** Clave para el ítem Contactos (URL dinámica desde useContactDirections) */
export const CONTACT_LABEL = "Contactos";
