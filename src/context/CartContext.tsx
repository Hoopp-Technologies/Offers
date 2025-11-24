import React, { createContext, useContext } from "react";
import usePersistedState from "@/hooks/usePersistedState";
import type { Product } from "@/utils/schema";
import { useAddToCart } from "@/services/products/mutations";
import { AuthContext } from "./authContext";
import type { ProductData } from "@/services/products/types";

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: string;
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
}

const CartDefaults: CartContextType = {
  cartItems: [],
  addToCart: () => undefined,
  removeFromCart: () => undefined,
  clearCart: () => undefined,
  updateQuantity: () => undefined,
  cartTotal: 0,
  cartCount: 0,
};

export const CartContext = createContext<CartContextType>(CartDefaults);

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = usePersistedState({
    key: "cart",
    defaultValue: [],
  });
  const { loggedIn } = useContext(AuthContext);
  const { mutate: syncCart } = useAddToCart({});

  const addToCart = (product: ProductData, quantity = 1, variant?: string) => {
    console.log("addToCart called", {
      product,
      quantity,
      variant,
      currentItems: cartItems,
    });
    const currentItems = cartItems as CartItem[];
    const existingItemIndex = currentItems.findIndex(
      (item) => item.id === product.id
    );
    console.log("existingItemIndex", existingItemIndex);

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
    if (loggedIn) {
      syncCart({
        offerId: product.id,
        quantity: quantity,
      });
    }
  };

  const removeFromCart = (productId: string) => {
    const newItems = (cartItems as CartItem[]).filter(
      (item) => item.id !== productId
    );
    setCartItems(newItems);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    const newItems = (cartItems as CartItem[]).map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = (cartItems as CartItem[]).reduce(
    (total, item) => total + item.currentPrice * item.quantity,
    0
  );

  const cartCount = (cartItems as CartItem[]).reduce(
    (count, item) => count + item.quantity,
    0
  );

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
