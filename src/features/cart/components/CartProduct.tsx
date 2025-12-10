import React from "react";
import { CartIcon } from "@/components/icons";
import { Minus, Plus, Trash2 } from "lucide-react";
import { type CartItem } from "@/context/CartContext";
import { useCart, usePreferences } from "@/context";
import { getCurrencySymbol } from "@/utils/textUtils";
import { DiscountType } from "@/services/products/types";

interface ProductCardProps {
  product: CartItem;
}

const CartProduct: React.FC<ProductCardProps> = ({ product }) => {
  const {
    price,
    productName,
    quantity,
    id,
    numberOfClaims,
    offerName,
    offerId,
    originalPrice,
    discountedPrice,
    imageUrl,
    imageUrls,
    discountValue,
    discountType,
  } = product;
  const { updateQuantity, removeFromCart } = useCart();
  const { selectedCurrency } = usePreferences();
  console.log({ product });

  return (
    <div className="flex items-center gap-2 lg:gap-4.5">
      <Trash2
        className="bg-white p-2 rounded-full cursor-pointer hover:text-red-500 transition-colors"
        size={40}
        onClick={() => removeFromCart(id ?? offerId)}
      />
      <div className="bg-white rounded-lg overflow-hidden group relative flex p-4.5 flex-col lg:flex-row lg:gap-3 items-end flex-1 ">
        <div className="flex flex-col md:flex-row gap-2 w-full flex-1">
          <img
            src={imageUrls?.[0] ?? imageUrl?.[0]}
            alt={productName}
            className="w-full lg:w-40 h-32 object-cover rounded-lg "
          />
          <div className="px-0 py-4 lg:p-4 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {productName ?? offerName}
            </h3>
            <div className="flex items-center mb-2">
              <span className=" font-bold text-black mr-2">
                {getCurrencySymbol(selectedCurrency)}
                {(
                  price?.discountedPrice ??
                  discountedPrice ??
                  0
                ).toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {getCurrencySymbol(selectedCurrency)}
                {(price?.originalPrice ?? originalPrice ?? 0).toLocaleString()}
              </span>
              <span className="bg-[#73BF451A] rounded-full px-3 py-0.5 text-xs ml-3">
                Save{" "}
                {discountType === DiscountType.FIXED_AMOUNT
                  ? `${getCurrencySymbol(selectedCurrency)}${(
                      (price?.originalPrice ?? originalPrice) -
                      (price?.discountedPrice ?? discountedPrice)
                    ).toLocaleString()}`
                  : `${price?.discountValue ?? discountValue}%`}
              </span>
            </div>
            <div className=" gap-4 items-center text-xs text-black mt-4 hidden">
              <div className="flex gap-1.5 items-center">
                <CartIcon className="h-4" color="#808080" />
                <span className="flex">Bought by {numberOfClaims} people</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between w-full lg:w-auto items-center  lg:items-end lg:flex-col">
          <p className="text-right text-lg font-bold">
            {getCurrencySymbol(selectedCurrency)}
            {(
              (price?.discountedPrice ?? discountedPrice ?? 0) * quantity
            ).toLocaleString()}
          </p>
          <div className="flex items-center justify-between py-1 px-2 w-32 mt-0 lg:mt-2">
            <Minus
              className="cursor-pointer hover:text-gray-700"
              onClick={() => updateQuantity(id ?? offerId, quantity - 1)}
            />
            <span className="px-4 py-2">{quantity}</span>
            <Plus
              className="cursor-pointer hover:text-gray-700"
              onClick={() => updateQuantity(id ?? offerId, quantity + 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
