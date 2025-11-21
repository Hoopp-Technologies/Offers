import React from "react";
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
  const breadcrumbs = [
    { label: "All offers", href: "/" },
    {
      label: mockProduct.category,
      href: `/categories/${mockProduct.category}`,
    },
    { label: mockProduct.title, href: `/products/${mockProduct.id}` },
  ];

    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    
    const handleWishlistClick = () => {
      if (isInWishlist(mockProduct.id)) {
        removeFromWishlist(mockProduct.id);
      } else {
        addToWishlist(mockProduct);
      }
    };
  
  const {data: offerDetails} = useGetOfferDetails({
    path : mockProduct.id
  });

  console.log({offerDetails})

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
            <ProductDetails product={mockProduct} />
          </div>
          <div className="border-l md:col-span-2 pl-8">
            <div className="flex justify-end items-center gap-[9px] text-(--color-muted) mb-4.5">
              <div className="rounded-full bg-[#F4F6F5] p-2" onClick={handleWishlistClick}>
                <HeartIcon className="h-6" />
              </div>
              <div className="rounded-full bg-[#F4F6F5] p-2">
                <Share2 className="h-6" />
              </div>
              <div className="rounded-full bg-[#F4F6F5] p-2">
                <Flag className="h-6" />
              </div>
            </div>
            <OfferDetail />
          </div>
        </div>
      </div>
      <MoreOffers />
    </main>
  );
};

export default ProductDetailsPage;
