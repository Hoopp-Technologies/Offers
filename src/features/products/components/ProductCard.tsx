// import React from "react";
import {
  FireIcon,
  ClockBadgeIcon,
  CartIcon,
  MenuIcon,
  // HeartIcon,
} from "@/components/icons";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/context";
// import { toast } from "sonner";
import type { HomeOfferData } from "@/services/products/types";

interface ProductCardProps {
  product: HomeOfferData;
  onAddToCart?: (product: HomeOfferData) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const {
    imageUrls,
    discountType,
    offerName,
    price,
    offerEndDate,
    discountValue,
    quantityBought,
    category,
    offerId,
  } = product;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isWishlisted = isInWishlist(offerId);
  console.log({
    addToWishlist,
    removeFromWishlist,
    addToCart,
    isWishlisted,
    onAddToCart,
    price,
  });
  // const handleWishlistClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (isWishlisted) {
  //     removeFromWishlist(offerId);
  //   } else {
  //     addToWishlist(product);
  //   }
  // };

  // const handleAddToCartClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (onAddToCart) {
  //     onAddToCart(product);
  //   } else {
  //     addToCart(product);
  //     toast.success("Offer has been added to cart");
  //   }
  // };

  const renderBadge = () => {
    if (discountType === "PERCENTAGE") {
      return (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <FireIcon className="h-4 w-4 mr-1" />
          {discountValue}%
        </div>
      );
    }
    if (true) {
      return (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <ClockBadgeIcon className="h-4 w-4 mr-1" />
          {offerEndDate}
        </div>
      );
    }
    return null;
  };

  return (
    <Link to={`/products/${offerId}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden group relative h-full flex flex-col">
        <div className="relative">
          <img
            src={imageUrls?.[0]}
            alt={offerName}
            className="w-full h-40 object-cover"
          />
          {renderBadge()}
          {/* <button
            onClick={handleWishlistClick}
            className={`absolute top-2 left-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-10 ${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          >
            <HeartIcon
              className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button> */}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {offerName}
          </h3>
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <span className="text-xl font-bold text-red-600">
              ₦{Number(0).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₦{Number(0).toLocaleString()}
            </span>
            <span className="bg-[#73BF451A] rounded-full px-3 py-0.5 text-xs whitespace-nowrap">
              Save {discountValue}%
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex gap-4 items-center text-xs text-gray-600 mb-4">
              <div className="flex gap-1.5 items-center">
                <CartIcon className="h-3" />
                <span className="flex whitespace-nowrap">
                  {quantityBought} bought
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <MenuIcon className="h-2.5" />
                {category}
              </div>
            </div>

            {/* <Button
              onClick={handleAddToCartClick}
              className="w-full gap-2"
              variant="secondary"
            >
              <CartIcon className="h-4 w-4" />
              Add to Cart
            </Button> */}
          </div>
        </div>

        {/* Hover overlay for quick view or other actions if needed, keeping it simple for now or removing if interfering */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 pointer-events-none transition-all" /> */}
      </div>
    </Link>
  );
};

export default ProductCard;
