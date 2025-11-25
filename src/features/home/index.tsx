import HeroSection from "../products/components/HomeHeroSection";
import { useGetAllOffers } from "@/services/products/queries";
import { usePreferences } from "@/context";
import HomeCategories from "./components/HomeCategories";
import OffersSection from "./components/OffersSection";

export const Home = () => {
  const { selectedCurrency } = usePreferences();
  const { data, isLoading } = useGetAllOffers({
    queryParams: {
      currencyCode: selectedCurrency,
    },
    enabled: !!selectedCurrency,
  });

  console.log({ data, isLoading });
  return (
    <div className="pt-18">
      <HeroSection />
      <div className="-mt-10">
        <HomeCategories />
      </div>
      <OffersSection data={data} />
    </div>
  );
};
