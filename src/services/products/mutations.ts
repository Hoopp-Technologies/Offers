import { createMutation } from "../mutation";

export const useAddToCart= createMutation({
  method: "POST",
  url: `cart`,
});

export const useAddToWishlist= createMutation({
  method: "POST",
  url: `wishlist`,
});