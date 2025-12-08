import { createMutation } from "../mutation";
import type { CheckoutRes } from "./types";

export const useAddToCart = createMutation({
  method: "POST",
  url: "ecommerce/customer/cart/items",
  keysToRefetch: [["cart"]],
});

export const useAddToWishlistFn = (id: string) =>
  createMutation({
    method: "POST",
    url: `ecommerce/customer/wishlist/${id}`,
    keysToRefetch: [["wishlist"]],
  });

export const useDeleteFromWishlistFn = (id: string) =>
  createMutation({
    method: "DELETE",
    url: `ecommerce/customer/wishlist/${id}`,
    keysToRefetch: [["wishlist"]],
  });

export const useDeleteFromCartFn = (id: string) =>
  createMutation({
    method: "DELETE",
    url: `ecommerce/customer/cart/items/${id}`,
    keysToRefetch: [["cart"]],
  });

export const useCheckout = createMutation<CheckoutRes>({
  method: "POST",
  url: `ecommerce/checkout`,
  keysToRefetch: [["wishlist"]],
});
