import React from "react";
import ProductCard from "../products/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart, useWishlist } from "@/context";


const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-3.5">Your wishlist</h1>
        <p className="text-lg">
          Found something you like? Add it to your wishlist
        </p>
      </div>
      <div className="flex gap-y-2 flex-wrap justify-center md:justify-start space-x-2 mb-4 md:mb-0">
        {["Expiring soon", "Already bought items"].map((category) => (
          <span
            key={category}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm cursor-pointer hover:bg-gray-300"
          >
            {category}
          </span>
        ))}
      </div>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {wishlistItems.map((product) => (
            <div key={product.id} className="relative group h-full">
              <ProductCard 
                product={product} 
                onAddToCart={handleMoveToCart}
              />
            </div>
          ))}
        </div>
      )}
      <div className="py-20 flex items-center justify-center">
        <Button asChild className="rounded-full text-lg px-36" size={"lg"}>
          <Link to={"/"}>Continue Shopping</Link>
        </Button>
      </div>
    </main>
  );
};

export default Wishlist;
