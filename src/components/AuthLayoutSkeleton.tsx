import { Skeleton } from "@/components/ui/skeleton";

export function AuthLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1C16] text-white p-6">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className="h-32 w-full mb-4" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
