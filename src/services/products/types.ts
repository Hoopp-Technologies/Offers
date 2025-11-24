export type ProductData = {
  id: string;
  productName: string;
  productDescription: string;
  type: string;
  productPrice: number;
  productType: string;
  sizeColorSet: { size: string; color: string; quantity: number }[];
  discountType: "PERCENTAGE";
  triggerType: "MINIMUM_CART_VALUE";
  offerEnds: string;
  discount: number;
  numberOfClaims: number;
  cartValue: number;
  orderQuantity: number;
};

export type HomeOfferData = {
  offerId: string;
  offerName: string;
  offerEndDate: string;
  price: number;
  discountType: "PERCENTAGE";
  discountValue: number;
  quantityBought: number;
  category: "Digital";
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
