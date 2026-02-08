import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de ProjectsStatsSection (título + 4 estadísticas).
 */
export function StatsSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[500px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <Skeleton className="h-10 md:h-12 w-full max-w-xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-14 md:h-16 w-24 mx-auto mb-4" />
              <Skeleton className="h-5 w-24 mx-auto" variant="text" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
