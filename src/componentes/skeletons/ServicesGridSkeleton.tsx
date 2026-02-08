import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de ServicesGridSection (título + subtítulo + 3 cards).
 */
export function ServicesGridSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[600px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-10 md:h-12 w-full max-w-xl mx-auto" />
          <Skeleton className="h-5 w-full max-w-2xl mx-auto" variant="text" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 p-6 md:p-8 space-y-4 bg-gray-900/30"
            >
              <Skeleton className="h-40 w-full rounded-lg mx-auto max-w-[160px]" />
              <Skeleton className="h-6 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-4 w-5/6" variant="text" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
