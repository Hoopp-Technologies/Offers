import React from "react";
import {
  FireIcon,
  ClockBadgeIcon,
  CartIcon,
  MenuIcon,
  HeartIcon,
} from "@/components/icons";
import type { Product } from "../../../utils/schema";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const {
    imageUrl,
    badgeType,
    title,
    currentPrice,
    originalPrice,
    discountPercentage,
    boughtCount,
    category,
    id
  } = product;

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isWishlisted = isInWishlist(id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product);
      toast.success("Offer has been added to cart")
    }
  };

  const renderBadge = () => {
    if (badgeType === "Bestseller") {
      return (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <FireIcon className="h-4 w-4 mr-1" />
          Bestseller
        </div>
      );
    }
    if (badgeType.includes("left")) {
      return (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center z-10">
          <ClockBadgeIcon className="h-4 w-4 mr-1" />
          {badgeType}
        </div>
      );
    }
    return null;
  };

  return (
    <Link to={`/products/${id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden group relative h-full flex flex-col">
        <div className="relative">
            <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
            {renderBadge()}
            <button
                onClick={handleWishlistClick}
                className={`absolute top-2 left-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors z-10 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}
            >
                <HeartIcon className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <span className="text-xl font-bold text-red-600">
              ₦{currentPrice.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₦{originalPrice.toLocaleString()}
            </span>
            <span className="bg-[#73BF451A] rounded-full px-3 py-0.5 text-xs whitespace-nowrap">
              Save {discountPercentage}%
            </span>
          </div>
          
          <div className="mt-auto">
              <div className="flex gap-4 items-center text-xs text-gray-600 mb-4">
                <div className="flex gap-1.5 items-center">
                  <CartIcon className="h-3" />
                  <span className="flex whitespace-nowrap">{boughtCount} bought</span>
                </div>
                <div className="flex gap-1.5 items-center">
                  <MenuIcon className="h-2.5" />
                  {category}
                </div>
              </div>
              
              <Button 
                onClick={handleAddToCartClick}
                className="w-full gap-2"
                variant="secondary"
              >
                <CartIcon className="h-4 w-4" />
                Add to Cart
              </Button>
          </div>
        </div>
        
        {/* Hover overlay for quick view or other actions if needed, keeping it simple for now or removing if interfering */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 pointer-events-none transition-all" /> */}
      </div>
    </Link>
  );
};

export default ProductCard;
