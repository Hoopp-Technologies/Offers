import { createQuery } from "../query";
import type {
  ProfileData,
  PurchaseHistoryData,
  TransactionData,
} from "./types";
export const getOfferByIdKey = (arg: string) => ["/market-place/offer", arg];

export const useGetProfile = createQuery<ProfileData>({
  key: ["profile"],
  url: "ecommerce/customer/profile",
});

export const useGetPurchaseHistory = createQuery<PurchaseHistoryData>({
  key: ["purchase-history"],
  url: "ecommerce/customer/purchases",
});

export const useGetTransaction = (arg: string) =>
  createQuery<TransactionData[]>({
    key: ["purchase-success", arg],
    url: `ecommerce/checkout/${arg}`,
  });
