import React, { createContext, useContext, useEffect } from "react";
import usePersistedState from "@/hooks/usePersistedState";
import { useAddToCart } from "@/services/products/mutations";
import { AuthContext } from "./authContext";
import type { ProductData } from "@/services/products/types";
import { usePreferences } from ".";
import { useGetCart } from "@/services/products/queries";
import Axios from "@/services";

export interface CartItem extends ProductData {
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
  const { selectedCurrency } = usePreferences();
  const [cartItems, setCartItems] = usePersistedState({
    key: "cart",
    defaultValue: [],
  });
  const { loggedIn } = useContext(AuthContext);
  const { mutate: syncCart } = useAddToCart({});
  const { data: cart } = useGetCart({});

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
        currencyCode: selectedCurrency,
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    const newItems = (cartItems as CartItem[]).filter(
      (item) => item.id !== productId
    );
    setCartItems(newItems);

    if (loggedIn) {
      try {
        const token = localStorage.getItem("token");
        await Axios.delete(`ecommerce/customer/cart/items/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = (cartItems as CartItem[]).reduce(
    (total, item) => total + item.price.discountedPrice * item.quantity,
    0
  );

  const cartCount = (cartItems as CartItem[]).reduce(
    (count, item) => count + item.quantity,
    0
  );

  useEffect(() => {
    if (cart) {
      setCartItems(cart);
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
