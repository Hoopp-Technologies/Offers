import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      {/* Breadcrumbs Skeleton */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="bg-white border border-[#E5E9EB] rounded-3xl px-12 pb-20">
        {/* Offer Banner Skeleton */}
        <div className="py-6">
          <Skeleton className="h-12 w-full max-w-md mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-20">
          {/* Left Section - Image and Details */}
          <div className="md:col-span-3 flex gap-8">
            {/* Product Image Skeleton */}
            <div className="shrink-0">
              <Skeleton className="h-96 w-96 rounded-lg" />
            </div>

            {/* Product Details Skeleton */}
            <div className="flex-1 space-y-6">
              {/* Title */}
              <Skeleton className="h-10 w-3/4" />

              {/* Price */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-28" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-16 rounded-full" />
                  <Skeleton className="h-10 w-16 rounded-full" />
                  <Skeleton className="h-10 w-16 rounded-full" />
                  <Skeleton className="h-10 w-16 rounded-full" />
                </div>
              </div>

              {/* Color Selector */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-28" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>

              {/* Quantity and Buttons */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>

              {/* Discount Info */}
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          {/* Right Section - Offer Details */}
          <div className="border-l md:col-span-2 pl-8">
            {/* Action Icons */}
            <div className="flex justify-end items-center gap-2 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>

            {/* Offer Details */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Offers Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsSkeleton;
