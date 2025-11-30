import type { CartItem } from "@/context/CartContext";

export type ProductData = {
  id: string;
  offerId: string;
  productName: string;
  productDescription: string;
  type: string;
  price: Price;
  productType: string;
  sizeColorSet: { size: string; color: string; quantity: number }[];
  discountType: DiscountType;
  triggerType: TriggerType;
  offerEnds: string;
  discount: number;
  numberOfClaims: number;
  cartValue: number;
  orderQuantity: number;
  imageUrls: string[];
  brandName: string;
};

export const DiscountType = {
  PERCENTAGE: "PERCENTAGE",
  FIXED_AMOUNT: "FIXED_AMOUNT",
  TIERED: "TIERED",
  BUY_X_GET_Y: "BUY_X_GET_Y",
} as const;

export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const TriggerType = {
  MINIMUM_CART_VALUE: "MINIMUM_CART_VALUE",
  MINIMUM_QUANTITY: "MINIMUM_QUANTITY",
  DONT_APPLY: "DONT_APPLY",
} as const;

export type TriggerType = (typeof TriggerType)[keyof typeof TriggerType];

export type Price = {
  currencyCode: "USD" | "NGN" | "EUR";
  originalPrice: number;
  discountedPrice: number;
  discountType: DiscountType;
  discountValue: number;
};

export type HomeOfferData = {
  offerId: string;
  offerName: string;
  offerEndDate: string;
  price: Price;
  discountType: DiscountType;
  discountValue: number;
  quantityBought: number;
  category: "Physical" | "Service" | "Digital";
  imageUrls: string[];
};

// Merged type combining ProductData and HomeOfferData
// Using intersection type (&) to merge both types
export type UnifiedProductType = Partial<ProductData> &
  Partial<HomeOfferData> & {
    // Common required fields
    id?: string;
    offerId?: string;
  };

// Alternative: If you want all properties from both types
// export type FullProductType = ProductData & HomeOfferData;

export type HomeData = {
  topOffers: HomeOfferData[];
  recentlyAddedOffers: HomeOfferData[];
};

export type CheckoutRes = {
  transactionId: string;
  finalAmount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  accessCode: string;
};

export type CartRes = {
  cartId: number;
  cartTotal: number;
  cartItems: CartItem[];
};
