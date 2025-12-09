import HeroSection from "../products/components/HeroSection";
import FilterSection from "../products/components/FilterSection";
import ProductGrid from "../products/components/ProductGrid";
import LoadMoreButton from "../products/components/LoadMoreButton";
import {
  useProductsExplore,
  useProductsFilter,
} from "@/services/products/queries";
import { usePreferences } from "@/context";
import useFilterStore from "@/store/filter";
import { useEffect, useState } from "react";
import { getDaysRemaining } from "./components/utils";
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const { selectedCurrency, selectedCountry } = usePreferences();
  const [searchParams] = useSearchParams();
  const exploreOption = searchParams.get("explore");
  const [dataToShow, setDataToShow] = useState(
    exploreOption ? "explore" : "filter"
  );

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

  const {
    data: filterData,
    isLoading: filterLoading,
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
      endingInDays: getDaysRemaining(offerDuration),
    },
    enabled: !!selectedCurrency && !!selectedCountry,
  });

  const {
    data: exploreData,
    isLoading: exploreLoading,
    isRefetching: exploreRefetching,
    refetch: refetchExplore,
  } = useProductsExplore({
    queryParams: {
      currencyCode: selectedCurrency,
      country: selectedCountry,
      pageNumber: 0,
      exploreOption: exploreOption ?? "",
    },
    enabled: !!selectedCurrency && !!selectedCountry && !!exploreOption,
  });

  // Trigger refetch when filters are applied
  useEffect(() => {
    if (isApplied) {
      setDataToShow("filter");
      refetch();
    }
  }, [isApplied, refetch]);

  // Trigger refetch when exploreOption changes
  useEffect(() => {
    if (exploreOption) {
      setDataToShow("explore");
      refetchExplore();
    }
  }, [exploreOption, refetchExplore]);

  // Reset isApplied after refetch completes
  useEffect(() => {
    if (!filterRefetching && isApplied) {
      setIsApplied(false);
    }
  }, [filterRefetching, isApplied, setIsApplied]);

  return (
    <div className="pt-20">
      <HeroSection />
      <div className="sticky top-[78px] z-50">
        <FilterSection />
      </div>
      <ProductGrid
        data={dataToShow === "filter" ? filterData : exploreData?.content}
        isLoading={
          filterLoading ||
          filterRefetching ||
          exploreLoading ||
          exploreRefetching
        }
      />
      <LoadMoreButton />
    </div>
  );
};
