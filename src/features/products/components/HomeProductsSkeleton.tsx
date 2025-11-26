import { Skeleton } from "@/components/ui/skeleton";

const HomeProductsSkeleton = () => {
  return (
    <main className="">
      {/* Breadcrumbs Skeleton */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-64 w-64" />
        <Skeleton className="h-64 w-64" />
        <Skeleton className="h-64 w-64" />
        <Skeleton className="h-64 w-64" />
        <Skeleton className="h-64 w-64" />
        <Skeleton className="h-64 w-64" />
      </div>
    </main>
  );
};

export default HomeProductsSkeleton;
