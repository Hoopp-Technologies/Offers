import HomeProductsSkeleton from "@/features/products/components/HomeProductsSkeleton";
import ProductCard from "@/features/products/components/ProductCard";
import type { HomeData } from "@/services/products/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const OffersSection = ({
  data,
  isLoading,
}: {
  data?: HomeData;
  isLoading?: boolean;
}) => {
  const topOffersRef = useRef<HTMLDivElement>(null);
  const bottomOffersRef = useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 300; // Adjust scroll distance as needed
      const newScrollLeft =
        ref.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      ref.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto px-3">
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold mb-3">Top offers</h1>
            <p className="text-sm font-medium">
              Discover top offers based on what other shoppers are buying
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(topOffersRef, "left")}
              className="p-2 rounded-[4px] hover:bg-gray-400 transition-colors bg-[#E5E9EB] "
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
            <button
              onClick={() => scroll(topOffersRef, "right")}
              className="p-2 rounded-[4px] hover:bg-gray-400 transition-colors bg-[#E5E9EB]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
          </div>
        </div>
        <div
          ref={topOffersRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading ? (
            <HomeProductsSkeleton />
          ) : (
            data?.topOffers?.map((product) => (
              <div
                key={product.offerId}
                className="shrink-0"
                style={{ minWidth: "280px" }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="mb-24">
        <div className="flex justify-between items-center mb-4">
          <div className="mb-5">
            <h1 className="text-2xl font-semibold mb-3">
              Recently added offers
            </h1>
            <p className="text-sm font-medium">
              Looking for the latest deals? We’ve got you covered
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(bottomOffersRef, "left")}
              className="p-2 rounded-[4px] hover:bg-gray-400 transition-colors bg-[#E5E9EB] "
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
            <button
              onClick={() => scroll(bottomOffersRef, "right")}
              className="p-2 rounded-[4px] hover:bg-gray-400 transition-colors bg-[#E5E9EB] "
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
          </div>
        </div>
        <div
          ref={bottomOffersRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {isLoading ? (
            <HomeProductsSkeleton />
          ) : (
            data?.topOffers?.map((product) => (
              <div
                key={product.offerId}
                className="shrink-0"
                style={{ minWidth: "280px" }}
              >
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
