import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de la sección Fundadora (imagen + texto).
 */
export function FundadoraSkeleton() {
  return (
    <section className="relative w-full min-h-screen">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-[500px] h-[600px] rounded-lg" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-12 md:h-14 w-4/5" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-4 w-5/6" variant="text" />
            <Skeleton className="h-4 w-full" variant="text" />
            <Skeleton className="h-6 w-full border-l-4 border-cyan-400/60 pl-6 mt-4" variant="text" />
          </div>
        </div>
      </div>
    </section>
  );
}
