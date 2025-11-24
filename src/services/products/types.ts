export type OfferData = {
  id: string;
  productName: string;
  productDescription: string;
  type: string;
  productPrice: number;
  productType: string;
  sizeColorSet: string[];
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

export type HomeData = {
  topOffers: HomeOfferData[];
  recentlyAddedOffers: HomeOfferData[];
};
