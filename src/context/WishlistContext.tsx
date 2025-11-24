import React, { createContext, useContext } from "react";
import usePersistedState from "@/hooks/usePersistedState";
import type { Product } from "@/utils/schema";
import {
  useAddToWishlistFn,
  useDeleteFromWishlistFn,
} from "@/services/products/mutations";
import { AuthContext } from "./authContext";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistDefaults: WishlistContextType = {
  wishlistItems: [],
  addToWishlist: () => undefined,
  removeFromWishlist: () => undefined,
  clearWishlist: () => undefined,
  isInWishlist: () => false,
};

export const WishlistContext =
  createContext<WishlistContextType>(WishlistDefaults);

export const WishlistContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = usePersistedState({
    key: "wishlist",
    defaultValue: [],
  });
  const { loggedIn } = useContext(AuthContext);

  const addToWishlist = (product: Product) => {
    if (isInWishlist(product.id)) return;
    const newItems = [...(wishlistItems as Product[]), product];
    setWishlistItems(newItems);
    if (loggedIn) {
      // Assuming backend accepts the product ID or the whole product object
      // Adjust payload based on backend requirements.
      // For now sending productId.
      const useAddToWishlist = useAddToWishlistFn(product.id);
      const { mutate: syncWishlist } = useAddToWishlist({});
      syncWishlist({});
    }

    toast.success("Offer has been added to wishlist");
  };

  const removeFromWishlist = (productId: string) => {
    const newItems = (wishlistItems as Product[]).filter(
      (item) => item.id !== productId
    );
    setWishlistItems(newItems);
    if (loggedIn) {
      // TODO: Handle backend removal if API supports it separately or sync full list
      const useAddToWishlist = useDeleteFromWishlistFn(productId);
      const { mutate: removeFromWishlist } = useAddToWishlist({});
      removeFromWishlist({});
    }

    toast.success("Offer has been removed from wishlist");
  };

  const clearWishlist = () => {
    setWishlistItems([]);

    toast.success("Wishlist has been cleared");
  };

  const isInWishlist = (productId: string) => {
    return (wishlistItems as Product[]).some((item) => item.id === productId);
  };

  // Sync on login could be handled here or in a separate effect
  // For now, we rely on the user adding items to trigger sync or initial load logic (not fully defined in PRD)

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: wishlistItems as Product[],
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
