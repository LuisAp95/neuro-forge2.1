import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton del Slider de servicios (título + área de cards).
 */
export function SliderSkeleton() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 flex-col">
      <div className="text-center mb-12 w-full">
        <Skeleton className="h-12 md:h-14 w-full max-w-2xl mx-auto" />
      </div>
      <div className="relative h-96 w-full max-w-6xl flex items-center justify-center">
        <Skeleton className="w-64 md:w-80 h-80 max-w-md rounded-2xl" />
      </div>
      <div className="flex gap-2 mt-6">
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-8 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>
    </div>
  );
}
