import React, { useState } from "react";
import { CartIcon, HeartIcon } from "../../../components/icons";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, usePreferences, useWishlist } from "@/context";
import type { ProductData } from "@/services/products/types";
import { getCurrencySymbol } from "@/utils/textUtils";
import { cn } from "@/lib/utils";

interface ProductDetailsProps {
  product: ProductData;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { selectedCurrency } = usePreferences();

  const { productName, discount, productDescription, sizeColorSet, price } =
    product;
  const [quantity, setQuantity] = useState(1);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Extract unique sizes and colors
  const uniqueSizes = Array.from(
    new Set(
      sizeColorSet?.map((set) => set.size).filter((s) => s && s !== "") || []
    )
  );
  const uniqueColors = Array.from(
    new Set(
      sizeColorSet?.map((set) => set.color).filter((c) => c && c !== "") || []
    )
  );

  const handleAddtToCart = () => {
    addToCart(product, quantity);
  };

  const isWishlisted = isInWishlist(product.id ?? "");
  const isCarted = isInCart(product.id ?? "");

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id ?? "");
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between h-full">
        <div className="">
          <h1 className="text-4xl font-bold mb-4.5">{productName}</h1>
          <div className="flex items-center mb-4.5">
            <span className="text-3xl font-bold text-black mr-4">
              {getCurrencySymbol(selectedCurrency)}
              {Number(price?.discountedPrice).toLocaleString()}
            </span>
            <span className="text-xl text-red-600 line-through">
              {getCurrencySymbol(selectedCurrency)}
              {Number(price?.originalPrice).toLocaleString()}
            </span>
          </div>
          <p className="font-bold">Description</p>
          <p className="text-gray-700 mb-5 mt-3 border-b pb-4.5">
            {productDescription}
          </p>

          {/* Size Selector */}
          <div
            className={cn(
              "mb-5 border-b pb-4.5",
              uniqueSizes?.length > 0 ? "" : "hidden"
            )}
          >
            <h4 className="font-semibold mb-2">Select size</h4>
            <div className="flex space-x-2">
              {uniqueSizes?.map((size, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-[#FFF1EE] rounded-full hover:bg-(--color-primary) focus:bg-(--color-primary) hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div
            className={cn(
              "mb-5 border-b pb-4.5",
              uniqueColors?.length > 0 ? "" : "hidden"
            )}
          >
            <h4 className="font-semibold mb-2">Select color</h4>
            <div className="flex space-x-2">
              {uniqueColors?.map((color, i) => (
                <button
                  key={i}
                  style={{ backgroundColor: color }}
                  className="w-8 h-8 rounded-full border-2 group border-transparent flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <Check
                    className=" text-white group-focus:opacity-100 opacity-0"
                    size={20}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          {/* Quantity and Checkout */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="flex items-center justify-between border border-[#F15822] rounded-md py-1 px-4 w-20 lg:w-32">
              <button
                className="cursor-pointer"
                onClick={() => setQuantity((prev) => prev - 1)}
                disabled={quantity === 1 || isCarted}
              >
                <Minus className="cursor-pointer" size={18} color="#494747" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                disabled={isCarted}
              >
                <Plus className="cursor-pointer" size={18} color="#494747" />
              </button>
            </div>
            <Button
              onClick={() => {
                handleAddtToCart();
              }}
              disabled={isCarted}
              size={"lg"}
              className=" text-white px-6 py-6 text-lg rounded-md hover:bg-orange-600 grow"
            >
              {isCarted ? "Item is in cart" : "Add to cart"}
              <CartIcon className="h-9 w-9 scale-125 ml-2" />
            </Button>
            <div
              className={cn("rounded-full bg-[#F4F6F5] p-2 cursor-pointer", {
                "text-red-600": isWishlisted,
              })}
              onClick={handleWishlistClick}
            >
              <HeartIcon className="h-6" />
            </div>
          </div>
          <p className="text-sm mt-2">
            The discount offer of {discount}% has been automatically applied to
            your order total.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
