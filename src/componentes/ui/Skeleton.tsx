import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "text" | "circle" | "rect" - rect es el default */
  variant?: "text" | "circle" | "rect";
}

/**
 * Primitiva reutilizable para skeletons. Usa la clase .skeleton de index.css.
 * No modifica colores del tema; usa --muted del layout existente.
 */
export function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "skeleton",
        variant === "circle" && "skeleton-circle",
        variant === "text" && "h-4",
        className
      )}
      aria-hidden
      {...props}
    />
  );
}
