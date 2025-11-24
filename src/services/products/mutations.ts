import { createMutation } from "../mutation";

export const useAddToCart = createMutation({
  method: "POST",
  url: "ecommerce/customer/cart/items",
});

export const useAddToWishlistFn = (id: string) =>
  createMutation({
    method: "POST",
    url: `ecommerce/customer/wishlist/${id}`,
  });

export const useDeleteFromWishlistFn = (id: string) =>
  createMutation({
    method: "DELETE",
    url: `ecommerce/customer/wishlist/${id}`,
  });

export const useDeleteFromCartFn = (id: string) =>
  createMutation({
    method: "DELETE",
    url: `ecommerce/customer/cart/items/${id}`,
  });

export const useCheckout = createMutation({
  method: "POST",
  url: `ecommerce/checkout`,
});