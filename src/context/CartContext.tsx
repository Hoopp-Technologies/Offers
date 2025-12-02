import React, { createContext, useContext, useEffect } from "react";
import usePersistedState from "@/hooks/usePersistedState";
import { useAddToCart } from "@/services/products/mutations";
import { AuthContext } from "./authContext";
import type { DiscountType, ProductData } from "@/services/products/types";
import { usePreferences } from ".";
import { useGetCart } from "@/services/products/queries";
import Axios from "@/services";
import { toast } from "sonner";

export interface CartItem extends ProductData {
  cartItemId: number;
  offerId: string;
  offerName: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  discountValue: number;
  discountType: DiscountType;
  totalPrice: number;
  imageUrl: string[];
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: ProductData,
    quantity?: number,
    variant?: string
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartId: number;
  setCartId: (cartId: number) => void;
}

const CartDefaults: CartContextType = {
  cartItems: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  clearCart: () => undefined,
  updateQuantity: () => undefined,
  cartTotal: 0,
  cartCount: 0,
  cartId: 0,
  setCartId: () => undefined,
};

export const CartContext = createContext<CartContextType>(CartDefaults);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { selectedCurrency } = usePreferences();
  const [cartItems, setCartItems] = usePersistedState({
    key: "cart",
    defaultValue: [],
  });
  const [cartId, setCartId] = usePersistedState({
    key: "cartId",
    defaultValue: 0,
  });
  const { loggedIn } = useContext(AuthContext);
  const { mutate: syncCart } = useAddToCart({});
  const { data: cart } = useGetCart({
    enabled: loggedIn,
  });

  const addToCart = (product: ProductData, quantity = 1, variant?: string) => {
    const currentItems = cartItems as CartItem[];
    const existingItemIndex = currentItems.findIndex(
      (item) => (item.offerId ?? item.id) === product.id
    );
    // console.log("existingItemIndex", existingItemIndex);

    let newItems;
    if (existingItemIndex > -1) {
      newItems = [...currentItems];
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems = [
        ...currentItems,
        { ...product, quantity, selectedVariant: variant },
      ];
    }

    setCartItems(newItems);
    toast.success("Product added to cart");
    if (loggedIn) {
      syncCart({
        offerId: product.id,
        quantity: quantity,
        currencyCode: selectedCurrency,
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    const newItems = (cartItems as CartItem[]).filter(
      (item) => (item.offerId ?? item.id) !== productId
    );
    setCartItems(newItems);

    if (loggedIn) {
      try {
        const token = localStorage.getItem("token");
        await Axios.delete(
          `ecommerce/customer/cart/items/${productId}?cartId=${cart?.cartId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Failed to remove from cart on server:", error);
        // Optionally revert the local state if backend sync fails
        // setWishlistItems(wishlistItems as ProductData[]);
      }
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    const newItems = (cartItems as CartItem[]).map((item) =>
      (item.id ?? item.offerId) === productId ? { ...item, quantity } : item
    );

    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = (cartItems as CartItem[]).reduce(
    (total, item) =>
      total +
      (item?.price?.discountedPrice ?? item?.discountedPrice ?? 0) *
        item?.quantity,
    0
  );

  const cartCount = (cartItems as CartItem[]).reduce(
    (count, item) => count + item?.quantity,
    0
  );

  useEffect(() => {
    if (cart) {
      setCartItems(cart.cartItems);
      setCartId(cart.cartId);
    }
  }, [cart, loggedIn]);

  return (
    <CartContext.Provider
      value={{
        cartItems: cartItems as CartItem[],
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        cartId,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
