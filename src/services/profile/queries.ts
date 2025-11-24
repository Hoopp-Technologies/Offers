import { createQuery } from "../query";
import type { ProfileData } from "./types";
export const getOfferByIdKey = (arg: string) => ["/market-place/offer", arg];

export const useGetProfile = createQuery<ProfileData>({
  key: ["profile"],
  url: "ecommerce/customer/profile",
});
