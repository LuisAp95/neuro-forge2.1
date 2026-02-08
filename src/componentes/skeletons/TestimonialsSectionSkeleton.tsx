import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de TestimonialsSection (título + slider de 3 cards).
 */
export function TestimonialsSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[700px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <Skeleton className="h-12 md:h-14 w-full max-w-2xl mx-auto" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <div className="flex-1 max-w-[450px] rounded-xl border border-white/10 p-6 space-y-4 bg-gray-900/30">
            <Skeleton variant="circle" className="w-14 h-14" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
          </div>
          <div className="flex-1 max-w-[450px] rounded-xl border border-cyan-400/30 p-6 space-y-4 bg-gray-900/50">
            <Skeleton variant="circle" className="w-14 h-14" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
          </div>
          <div className="flex-1 max-w-[450px] rounded-xl border border-white/10 p-6 space-y-4 bg-gray-900/30">
            <Skeleton variant="circle" className="w-14 h-14" />
            <Skeleton className="h-5 w-1/3" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-2 w-8 rounded-full" />
          <Skeleton className="h-2 w-2 rounded-full" />
        </div>
      </div>
    </section>
  );
}
