import { Skeleton } from "../ui/Skeleton";

/**
 * Skeleton de OfficePhotoSection (imagen centrada).
 */
export function OfficePhotoSkeleton() {
  return (
    <section className="relative w-full min-h-screen">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <Skeleton className="w-full max-w-[700px] h-[600px] rounded-lg" />
        </div>
      </div>
    </section>
  );
}
