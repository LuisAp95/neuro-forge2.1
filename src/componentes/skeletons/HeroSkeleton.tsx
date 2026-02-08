import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton del Hero (home). Misma estructura: título, subtítulo, botones.
 */
export function HeroSkeleton() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-12 md:h-16 lg:h-20 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-3/4 max-w-xl mx-auto" />
          </div>
          <Skeleton className="h-6 w-full max-w-xl mx-auto" variant="text" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-lg" />
            <Skeleton className="h-12 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
