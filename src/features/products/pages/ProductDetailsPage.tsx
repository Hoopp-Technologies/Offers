import React, { useMemo } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import OfferBanner from "../components/OfferBanner";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import OfferDetail from "../components/OfferDetail";
import MoreOffers from "../components/MoreOffers";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { Flag, Share2 } from "lucide-react";
import { HeartIcon } from "@/components/icons";
import { useGetOfferDetails } from "@/services/products/queries";
import { usePreferences, useWishlist } from "@/context";
import { useParams } from "react-router-dom";
import type { ProductData } from "@/services/products/types";
import { capitalizeText } from "@/utils/textUtils";
import { cn } from "@/lib/utils";

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { selectedCurrency } = usePreferences();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

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
  const isWishlisted = isInWishlist(product.id ?? "");

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id ?? "");
    } else {
      addToWishlist(product);
    }
  };
  console.log({ productDetails });

  // Show skeleton while loading or refetching
  if (isLoading || isRefetching) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <Breadcrumbs items={breadcrumbs} />
      <div className="bg-white border border-[#E5E9EB] rounded-3xl px-12 pb-20">
        <OfferBanner product={product} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-20">
          <div className="md:col-span-3 flex gap-8">
            <ProductImage
              imageUrls={product.imageUrls}
              title={product?.productName}
            />
            <ProductDetails product={product} />
          </div>
          <div className="border-l md:col-span-2 pl-8">
            <div className="flex justify-end items-center gap-[9px] text-(--color-muted) mb-4.5">
              <div
                className={cn("rounded-full bg-[#F4F6F5] p-2", {
                  "text-red-600": isWishlisted,
                })}
                onClick={handleWishlistClick}
              >
                <HeartIcon className="h-6" />
              </div>
              <div className="rounded-full bg-[#F4F6F5] p-2">
                <Share2 className="h-6" />
              </div>
              <div className="rounded-full bg-[#F4F6F5] p-2">
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
