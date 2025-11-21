import { createMutation } from "../mutation";

export const useAddToCart= createMutation<any>({
  method: "POST",
  url: `cart`,
});

export const useAddToWishlist= createMutation<any>({
  method: "POST",
  url: `wishlist`,
});