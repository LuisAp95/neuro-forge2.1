import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de la página About: primera sección (hero + contenido) y segunda (qué hacemos).
 */
export function AboutmeSkeleton() {
  return (
    <>
      {/* Primera sección: Acerca de - dos columnas */}
      <section className="relative w-full min-h-screen">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="flex justify-center">
              <Skeleton className="w-full max-w-[500px] h-[600px] rounded-lg" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-12 md:h-14 w-4/5" />
              <Skeleton className="h-5 w-full" variant="text" />
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-4 w-5/6" variant="text" />
              <Skeleton className="h-4 w-full" variant="text" />
              <Skeleton className="h-12 w-36 rounded-lg mt-4" />
            </div>
          </div>
        </div>
      </section>
      {/* Segunda sección: Qué hacemos */}
      <section className="relative w-full min-h-screen">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-6">
              <Skeleton className="h-12 md:h-14 w-3/4" />
              <Skeleton className="h-4 w-full" variant="text" />
              <div className="space-y-4 pt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton variant="circle" className="w-6 h-6 flex-shrink-0 mt-1" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-1/3" />
                      <Skeleton className="h-4 w-full" variant="text" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Skeleton className="w-full max-w-[500px] h-[600px] rounded-lg" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
