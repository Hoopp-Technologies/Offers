import React, { useMemo } from "react";
import type { Product } from "../../../utils/schema";
import Breadcrumbs from "../components/Breadcrumbs";
import OfferBanner from "../components/OfferBanner";
import ProductImage from "../components/ProductImage";
import ProductDetails from "../components/ProductDetails";
import OfferDetail from "../components/OfferDetail";
import MoreOffers from "../components/MoreOffers";
import cake from "@/assets/cake.png";
import { Flag, Share2 } from "lucide-react";
import { HeartIcon } from "@/components/icons";
import { useGetOfferDetails } from "@/services/products/queries";
import { useWishlist } from "@/context";
import { useParams } from "react-router-dom";
import type { ProductData } from "@/services/products/types";
import { capitalizeText } from "@/utils/textUtils";

const mockProduct: Product = {
  id: "1",
  title: "Adidas Crocs Viper",
  currentPrice: 64,
  originalPrice: 80,
  discountPercentage: 20,
  boughtCount: 10,
  category: "Shoes",
  badgeType: "",
  imageUrl: cake,
  description:
    'The "Adidas Crocs Viper" has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
};

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const { data: productDetails } = useGetOfferDetails({
    path: productId,
  });

  const product = useMemo(
    () => productDetails ?? ({} as ProductData),
    [productId, productDetails]
  );
  console.log({ product });
  const breadcrumbs = [
    { label: "All offers", href: "/" },
    {
      label: capitalizeText(product.type),
      href: `#`,
    },
    { label: product.productName, href: `#` },
  ];

  const handleWishlistClick = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(mockProduct.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <Breadcrumbs items={breadcrumbs} />
      <div className="bg-white border border-[#E5E9EB] rounded-3xl px-12 pb-20">
        <OfferBanner />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-20">
          <div className="md:col-span-3 flex gap-8">
            <ProductImage
              imageUrl={mockProduct.imageUrl}
              title={mockProduct.title}
            />
            <ProductDetails product={product} />
          </div>
          <div className="border-l md:col-span-2 pl-8">
            <div className="flex justify-end items-center gap-[9px] text-(--color-muted) mb-4.5">
              <div
                className="rounded-full bg-[#F4F6F5] p-2"
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
