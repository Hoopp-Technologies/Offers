import React, { useMemo } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import OfferBanner from "../components/OfferBanner";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import OfferDetail from "../components/OfferDetail";
import MoreOffers from "../components/MoreOffers";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { Flag, Share2 } from "lucide-react";
import { useGetOfferDetails } from "@/services/products/queries";
import { usePreferences } from "@/context";
import { useParams } from "react-router-dom";
import type { ProductData } from "@/services/products/types";
import { capitalizeText } from "@/utils/textUtils";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { selectedCurrency } = usePreferences();

  const {
    data: productDetails,
    isLoading,
    isRefetching,
  } = useGetOfferDetails({
    path: productId,
    queryParams: {
      currencyCode: selectedCurrency,
    },
  });

  const product = useMemo(
    () => productDetails ?? ({} as ProductData),
    [productId, productDetails]
  );

  const breadcrumbs = [
    { label: "All offers", href: "/products" },
    {
      label: capitalizeText(product.type?.replaceAll("_", " ")),
      href: `#`,
    },
    { label: product.productName, href: `#` },
  ];

  // Show skeleton while loading or refetching
  if (isLoading || isRefetching) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <Breadcrumbs items={breadcrumbs} />
      <div className="bg-white border border-[#E5E9EB] rounded-3xl px-6 lg:px-12 pb-20">
        <OfferBanner product={product} />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-20">
          <div className="md:col-span-3 flex gap-8 flex-col-reverse md:flex-row">
            <ProductImage
              imageUrls={product.imageUrls}
              title={product?.productName}
            />
            <ProductDetails product={product} />
          </div>
          <div className="border-t lg:border-t-0 lg:border-l lg:col-span-2 lg:pl-8 pt-4 lg:pt-0">
            <div className="flex justify-end items-center gap-[9px] text-(--color-muted) mb-4.5">
              <div className="rounded-full bg-[#F4F6F5] p-2 cursor-pointer">
                <Share2 className="h-6" />
              </div>
              <div className="rounded-full bg-[#F4F6F5] p-2 cursor-pointer">
                <Flag className="h-6" />
              </div>
            </div>
            <OfferDetail data={product} />
          </div>
        </div>
      </div>
      <MoreOffers />
    </main>
  );
};

export default ProductDetailsPage;
