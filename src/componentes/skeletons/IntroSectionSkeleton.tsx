import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de la sección intro (dos columnas: texto + imagen) en Home.
 */
export function IntroSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[600px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Skeleton className="h-10 md:h-12 w-4/5" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-5/6" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-4/5" variant="text" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-full h-[400px] rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
