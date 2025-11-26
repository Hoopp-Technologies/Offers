import HeroSection from "../products/components/HeroSection";
import FilterSection from "../products/components/FilterSection";
import ProductGrid from "../products/components/ProductGrid";
import LoadMoreButton from "../products/components/LoadMoreButton";
import {
  useGetAllOffers,
  useProductsFilter,
} from "@/services/products/queries";
import { usePreferences } from "@/context";
import useFilterStore from "@/store/filter";
import { useEffect } from "react";

export const Products = () => {
  const { selectedCurrency, selectedCountry } = usePreferences();
  const {
    minPrice,
    maxPrice,
    category,
    discountType,
    offerDuration,
    search,
    isApplied,
    setIsApplied,
  } = useFilterStore((state) => state);

  const { data, isLoading } = useGetAllOffers({
    queryParams: {
      currencyCode: selectedCurrency,
      country: selectedCountry,
    },
    enabled: !!selectedCurrency && !!selectedCountry,
  });

  const {
    data: filterData,
    isRefetching: filterRefetching,
    refetch,
  } = useProductsFilter({
    queryParams: {
      currencyCode: selectedCurrency,
      country: selectedCountry,
      pageNumber: 0,
      search: search,
      minPrice: !!minPrice ? Number(minPrice) : undefined,
      maxPrice: !!maxPrice ? Number(maxPrice) : undefined,
      discountType: discountType,
      category: category?.toLowerCase(),
      endingInDays: offerDuration,
    },
    enabled: !!selectedCurrency && !!selectedCountry,
  });
  console.log({ filterData, isApplied });

  // Trigger refetch when filters are applied
  useEffect(() => {
    if (isApplied) {
      refetch();
    }
  }, [isApplied, refetch]);

  // Reset isApplied after refetch completes
  useEffect(() => {
    if (!filterRefetching && isApplied) {
      setIsApplied(false);
    }
  }, [filterRefetching, isApplied, setIsApplied]);

  return (
    <div className="pt-20">
      <HeroSection />
      <FilterSection />
      <ProductGrid data={data} isLoading={isLoading || filterRefetching} />
      <LoadMoreButton />
    </div>
  );
};
