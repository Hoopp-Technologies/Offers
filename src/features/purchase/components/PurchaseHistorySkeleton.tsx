import { Skeleton } from "@/components/ui/skeleton";

const PurchaseHistorySkeleton = () => {
  return (
    <main className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-[10px] px-6 py-4 bg-white border border-[#F4F6F5]"
          >
            <Skeleton className="h-8 w-20 rounded-full mb-3" />
            <div className="flex mb-6 items-center gap-2.5">
              <Skeleton className="w-2/5 h-24 rounded-[10px]" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <Skeleton className="h-24 w-full rounded-[10px] mb-4" />
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PurchaseHistorySkeleton;
