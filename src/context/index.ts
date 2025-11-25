import { useContext } from "react";
import { AuthContext } from "./authContext";
import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";
import { PreferencesContext } from "./PreferencesContext";

export const useAuth = () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);
export const usePreferences = () => useContext(PreferencesContext);
