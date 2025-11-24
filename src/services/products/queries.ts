import { createQuery } from "../query";
import type { HomeData, OfferData } from "./types";
export const getOfferByIdKey = (arg: string) => ["/market-place/offer", arg];

export const useGetAllOffers = createQuery<HomeData>({
  key: ["allOffers"],
  url: "market-place/home",
});

export const useGetOfferDetails = createQuery<OfferData>({
  key: getOfferByIdKey,
  url: "market-place/offer",
});

export const useGetWishlist = createQuery<OfferData>({
  key: ["wishlist"],
  url: "ecommerce/customer/wishlist",
});

export const useGetCart = createQuery<OfferData>({
  key: ["cart"],
  url: "ecommerce/customer/cart",
});
