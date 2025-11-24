import ProductCard from "./ProductCard";
import type { HomeData } from "@/services/products/types";

const ProductGrid = ({ data }: { data?: HomeData }) => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 md:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
          {data?.topOffers?.map((product) => (
            <ProductCard key={product.offerId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
