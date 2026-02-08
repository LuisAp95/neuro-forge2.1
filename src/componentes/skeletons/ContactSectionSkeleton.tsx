import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de ContactSection (título + botón + badges de academia).
 */
export function ContactSectionSkeleton() {
  return (
    <section className="relative py-20 px-6 min-h-[700px]">
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <Skeleton className="h-12 md:h-14 w-full max-w-3xl mx-auto" />
        </div>
        <div className="flex justify-center mb-16">
          <Skeleton className="h-12 w-48 rounded-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="circle" className="w-24 h-24 md:w-28 md:h-28" />
          ))}
        </div>
      </div>
    </section>
  );
}
