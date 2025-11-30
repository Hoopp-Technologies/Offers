import { Skeleton } from "@/components/ui/skeleton";

const PurchaseSuccessSkeleton = () => {
  return (
    <div className="container mx-auto px-6 pb-32 py-48 flex items-center justify-center">
      <div className="rounded-[10px] pt-9 py-5 bg-white border border-[#F4F6F5] w-lg">
        <div className="px-6">
          <Skeleton className="h-10 w-64 mx-auto mb-14" />
          <div className="flex mb-6 items-center gap-2.5">
            <Skeleton className="w-1/3 h-24 rounded-[10px]" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-7 w-3/4" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="px-8 py-4.5">
          <Skeleton className="h-24 w-full rounded-[10px] mb-4.5" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessSkeleton;
