import type { CartItem } from "@/context/CartContext";

interface TransformedCart {
  cartId: number;
  cartItems: {
    claimedOfferPrice: number;
    offerId: string;
    quantity: number;
    currencyCode: string;
  }[];
  claimedFinalPrice: number;
}

export function transformCart(
  items: CartItem[],
  cartId: number
): TransformedCart {
  const cartItems = items.map((item) => ({
    claimedOfferPrice: item.totalPrice * item.quantity,
    offerId: item.offerId,
    quantity: item.quantity,
    currencyCode: "NGN",
  }));

  const claimedFinalPrice = cartItems.reduce(
    (sum, item) => sum + item.claimedOfferPrice,
    0
  );

  return {
    cartId,
    cartItems,
    claimedFinalPrice,
  };
}
