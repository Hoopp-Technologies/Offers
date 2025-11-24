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

// export type  OfferFullData = OfferData & HomeOfferData;

export type HomeData = {
  topOffers: HomeOfferData[];
  recentlyAddedOffers: HomeOfferData[];
};
