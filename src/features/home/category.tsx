import HeroSection from "../products/components/HeroSection";
import FilterSection from "../products/components/FilterSection";
import ProductGrid from "../products/components/ProductGrid";
import LoadMoreButton from "../products/components/LoadMoreButton";
import { useGetAllOffers } from "@/services/products/queries";
import { usePreferences } from "@/context";

export const Products = () => {
  const { selectedCurrency } = usePreferences();
  const { data, isLoading } = useGetAllOffers({
    queryParams: {
      currencyCode: selectedCurrency,
    },
    enabled: !!selectedCurrency,
  });

  console.log({ data, isLoading });
  return (
    <div className="pt-20">
      <HeroSection />
      <FilterSection />
      <ProductGrid data={data} />
      <LoadMoreButton />
    </div>
  );
};
