/**
 * Combina clases CSS; ignora undefined/null. Útil para condicionales con Tailwind.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
