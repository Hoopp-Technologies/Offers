import { useContext } from "react";
import { AuthContext } from "./authContext";
import { CartContext } from "./CartContext";
import { WishlistContext } from "./WishlistContext";


export const useAuth= () => useContext(AuthContext);
export const useCart = () => useContext(CartContext);
export const useWishlist = () => useContext(WishlistContext);


