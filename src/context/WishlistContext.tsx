import React, { createContext, useContext, useEffect } from "react";
import usePersistedState from "@/hooks/usePersistedState";
import Axios from "@/services";
import { AuthContext } from "./authContext";
import { toast } from "sonner";
import type { ProductData } from "@/services/products/types";
import { useGetWishlist } from "@/services/products/queries";

interface WishlistContextType {
  wishlistItems: ProductData[];
  addToWishlist: (product: ProductData) => void;
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

  const addToWishlist = async (product: ProductData) => {
    if (isInWishlist(product.id)) return;

    const newItems = [...(wishlistItems as ProductData[]), product];
    setWishlistItems(newItems);

    if (loggedIn) {
      try {
        const token = localStorage.getItem("token");
        await Axios.post(
          `ecommerce/customer/wishlist/${product.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to sync wishlist to server:", error);
        // Optionally revert the local state if backend sync fails
        // setWishlistItems(wishlistItems as ProductData[]);
      }
    }

    toast.success("Offer has been added to wishlist");
  };

  const removeFromWishlist = async (productId: string) => {
    const newItems = (wishlistItems as ProductData[]).filter(
      (item) => (item.id ?? item.offerId) !== productId
    );
    setWishlistItems(newItems);

    if (loggedIn) {
      try {
        const token = localStorage.getItem("token");
        await Axios.delete(`ecommerce/customer/wishlist/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Failed to remove from wishlist on backend:", error);
        // Optionally revert the local state if backend sync fails
        // setWishlistItems(wishlistItems as ProductData[]);
      }
    }

    toast.success("Offer has been removed from wishlist");
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success("Wishlist has been cleared");
  };

  const isInWishlist = (productId: string) => {
    return (wishlistItems as ProductData[]).some(
      (item) => (item.id ?? item.offerId) === productId
    );
  };

  const { data: wishlist } = useGetWishlist({
    enabled: !!loggedIn,
  });

  useEffect(() => {
    if (wishlist && loggedIn) {
      const localItems = wishlistItems as ProductData[];
      const serverItems = wishlist;

      // Find items that exist locally but not on server
      const localOnlyItems = localItems.filter(
        (localItem) =>
          !serverItems.some(
            (serverItem) =>
              (serverItem.id ?? serverItem.offerId) ===
              (localItem.id ?? localItem.offerId)
          )
      );

      // Sync local-only items to server
      if (localOnlyItems.length > 0) {
        localOnlyItems.forEach(async (item) => {
          try {
            const token = localStorage.getItem("token");
            await Axios.post(
              `ecommerce/customer/wishlist/${item.id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (error) {
            console.error("Failed to sync wishlist item to server:", error);
          }
        });
      }

      // Update local state with server data
      setWishlistItems(wishlist);
    }
  }, [wishlist, loggedIn]);

  // Sync on login could be handled here or in a separate effect
  // For now, we rely on the user adding items to trigger sync or initial load logic (not fully defined in PRD)

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: wishlistItems as ProductData[],
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
