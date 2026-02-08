import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de la sección de características (título + 3 cards).
 */
export function FeaturesSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[800px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-12 md:h-14 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto" variant="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 p-6 space-y-4 bg-gray-900/30"
            >
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-10 w-28 rounded-lg mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
