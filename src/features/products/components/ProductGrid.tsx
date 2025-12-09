import { EmptyState } from "@/components/ui/empty-state";
import HomeProductsSkeleton from "./HomeProductsSkeleton";
import ProductCard from "./ProductCard";
import type { HomeOfferData } from "@/services/products/types";

const ProductGrid = ({
  data,
  isLoading,
}: {
  data?: HomeOfferData[];
  isLoading: boolean;
}) => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-0">
        {isLoading ? (
          <div
            className="flex gap-9 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <HomeProductsSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
            {data?.map((product) => (
              <ProductCard key={product.offerId} product={product} />
            ))}
          </div>
        )}
        {!isLoading && data?.length === 0 && <EmptyState />}
      </div>
    </section>
  );
};

export default ProductGrid;
