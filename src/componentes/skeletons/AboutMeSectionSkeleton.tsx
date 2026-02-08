import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de AboutMeSection (imagen izquierda + texto derecha).
 */
export function AboutMeSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[700px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-[500px] h-[500px] md:h-[600px] rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-12 md:h-14 w-4/5" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-5/6" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-12 w-40 rounded-lg mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}
