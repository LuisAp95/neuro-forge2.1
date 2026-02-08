import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de ToolsSection (título + 3 tool cards).
 */
export function ToolsSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[500px]">
      <div className="py-12 mb-16">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-center">
          <Skeleton className="h-10 md:h-12 w-48" />
          <Skeleton className="h-10 md:h-12 w-32" />
        </div>
      </div>
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="min-h-[150px] rounded-xl p-8 md:p-12"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
