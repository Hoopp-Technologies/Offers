import { useState } from "react";
import {
  FireIcon,
  ClockBadgeIcon,
  CartIcon,
  MenuIcon,
  // HeartIcon,
} from "@/components/icons";
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { useCart, usePreferences, useWishlist } from "@/context";
// import { toast } from "sonner";
import type {
  ProductData,
  UnifiedProductType,
} from "@/services/products/types";
import { capitalizeText, getCurrencySymbol } from "@/utils/textUtils";
import { formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: UnifiedProductType;
  onAddToCart?: (product: ProductData) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { selectedCurrency } = usePreferences();
  const {
    imageUrls,
    discountType,
    offerName,
    productName,
    price,
    offerEndDate,
    quantityBought,
    productType,
    category,
    id,
    offerId,
  } = product;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isWishlisted = isInWishlist(offerId ?? id ?? "");
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

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? (imageUrls?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === (imageUrls?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const renderBadge = () => {
    if (discountType === "PERCENTAGE") {
      return (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <FireIcon className="h-4 w-4 mr-1" />
          {price?.percentageSaved}%
        </div>
      );
    }
    if (offerEndDate) {
      try {
        const endDate = new Date(offerEndDate);
        const timeRemaining = formatDistanceToNow(endDate, {
          addSuffix: false,
        });
        return (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
            <ClockBadgeIcon className="h-4 w-4 mr-1" />
            {timeRemaining} left
          </div>
        );
      } catch (error) {
        console.error("Invalid date format:", offerEndDate);
        return null;
      }
    }
    return null;
  };

  const hasMultipleImages = imageUrls && imageUrls.length > 1;

  return (
    <Link to={`/products/${offerId ?? id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden group relative h-full flex flex-col">
        <div className="relative">
          <img
            src={imageUrls?.[currentImageIndex] || imageUrls?.[0]}
            alt={offerName ?? productName}
            className="w-full h-40 object-cover"
          />
          {renderBadge()}

          {/* Image Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4 text-gray-800" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4 text-gray-800" />
              </button>

              {/* Image Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {imageUrls.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-3"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
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
            {offerName ?? productName}
          </h3>
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <span className="text-xl font-bold text-red-600">
              {getCurrencySymbol(selectedCurrency)}
              {Number(price?.discountedPrice).toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              {getCurrencySymbol(selectedCurrency)}
              {Number(price?.originalPrice).toLocaleString()}
            </span>
            <span className="bg-[#73BF451A] rounded-full px-3 py-0.5 text-xs whitespace-nowrap">
              Save {price?.percentageSaved ?? price?.discountValue ?? 0}%
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
                {capitalizeText(category ?? productType ?? "")}
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
