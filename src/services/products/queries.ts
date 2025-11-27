import { createQuery } from "../query";
import type { HomeData, ProductData } from "./types";
export const getOfferByIdKey = (arg: string) => ["/market-place/offer", arg];

export const useGetAllOffers = createQuery<HomeData>({
  key: ["allOffers"],
  url: "market-place/home",
});

export const useGetOfferDetails = createQuery<ProductData>({
  key: getOfferByIdKey,
  url: "market-place/offer",
});

export const useGetWishlist = createQuery<ProductData[]>({
  key: ["wishlist"],
  url: "ecommerce/customer/wishlist",
});

export const useGetCart = createQuery<ProductData>({
  key: ["cart"],
  url: "ecommerce/customer/cart",
});

export const useGetTopCategories = createQuery<string[]>({
  key: ["topCategories"],
  url: "market-place/top-category",
});

export const useProductsFilter = createQuery<any>({
  key: ["market-place/search-filter"],
  url: "market-place/search-filter",
});
