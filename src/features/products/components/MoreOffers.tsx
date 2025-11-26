import React from "react";
import ProductCard from "./ProductCard";
import { useGetAllOffers } from "@/services/products/queries";
import { usePreferences } from "@/context";

const MoreOffers: React.FC = () => {
  const { selectedCurrency, selectedCountry } = usePreferences();
  const { data } = useGetAllOffers({
    queryParams: {
      currencyCode: selectedCurrency,
      country: selectedCountry,
    },
    enabled: !!selectedCurrency && !!selectedCountry,
  });

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-2">More offers by same vendor</h2>
        <p className="text-gray-600 mb-6">
          Interested in this vendor? check out more of their offers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.recentlyAddedOffers.map((product) => (
            <ProductCard key={product.offerId} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreOffers;
