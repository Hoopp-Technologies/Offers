import HeroSection from "../products/components/HeroSection";
import FilterSection from "../products/components/FilterSection";
import ProductGrid from "../products/components/ProductGrid";
import LoadMoreButton from "../products/components/LoadMoreButton";
import { useGetAllOffers } from "@/services/products/queries";

export const Home = () => {
  const {data, isLoading} = useGetAllOffers({})

  console.log({data, isLoading})
  return (
    <div className="pt-20">
        <HeroSection />
        <FilterSection />
        <ProductGrid />
        <LoadMoreButton />
    </div>
  );
};
