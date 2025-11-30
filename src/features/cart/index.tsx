import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CartProduct from "./components/CartProduct";
import { useCart } from "@/context";
import CartSummary from "./components/CartSummary";

const CartPage: React.FC = () => {
  const { cartItems } = useCart();

  return (
    <main className="container mx-auto px-6 py-8 pt-32">
      <div className="mb-12">
        <h1 className="text-4xl font-semibold mb-3.5">Your cart</h1>
        <p className="text-lg">Your cart is ready for checkout</p>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 mb-8">Your cart is empty.</p>
          <Button asChild className="rounded-full text-lg px-12" size={"lg"}>
            <Link to={"/"}>Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-9">
          <div className="col-span-5 lg:col-span-3 flex flex-col gap-[22px]">
            {cartItems.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="py-20 flex items-center justify-center">
          <Button asChild className="rounded-full text-lg px-36" size={"lg"}>
            <Link to={"/"}>Continue Shopping</Link>
          </Button>
        </div>
      )}
    </main>
  );
};

export default CartPage;
