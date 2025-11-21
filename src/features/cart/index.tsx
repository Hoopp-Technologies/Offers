import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CartProduct from "./components/CartProduct";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context";

const CartPage: React.FC = () => {
  const { cartItems, cartTotal } = useCart();

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
          <div className="col-span-5 lg:col-span-2">
            <div className="bg-white pt-8 rounded-lg">
              <div className="border-b px-8 pb-6">
                <p className=" font-bold">Cart summary</p>
                <div className=" mt-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <p>Cart subtotal</p>
                    <p className=" font-semibold">₦{cartTotal.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>Discount</p>
                    <p className=" font-semibold">-N2,500</p>
                  </div>
                </div>
                {/* <div className="flex justify-end">
                  <p className=" px-3 py-0.5 text-xs bg-[#73BF451A] rounded-full mt-4.5">
                    You are saving 20%
                  </p>
                </div> */}
              </div>
              <div className="px-8 py-5 border-b pr-12">
                <p className=" font-bold">Choose payment method</p>

                <RadioGroup defaultValue="option-one">
                  <div className="flex items-start space-x-2 mt-5">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one" className="cursor-pointer">
                      <div className="">
                        <p className="font-medium mb-2">Pay with Stripe</p>
                        <p className="text-sm text-(--color-muted)">
                          Stripe processes VISA, Mastercard, Google Pay and more.
                          1.5% processing fee will apply to your order.
                        </p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2 mt-5">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two" className="cursor-pointer">
                      <div className="">
                        <p className=" font-medium mb-2">Pay with Paystack</p>
                        <p className="text-sm text-(--color-muted)">
                          Paystack is the preferred payment option for Nigerians
                          and other African countries who want to enjoy mobile
                          money, bank transfer or USSD payment options.
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className=" py-6 px-8">
                <div className="flex items-center justify-between mb-5">
                  <p>Cart Total</p>
                  <p className=" font-semibold">₦{cartTotal.toLocaleString()}</p>
                </div>
                <Button size={"lg"} className=" rounded-full w-full text-lg py-6">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartItems.length > 0 &&
      <div className="py-20 flex items-center justify-center">
        <Button asChild className="rounded-full text-lg px-36" size={"lg"}>
          <Link to={"/"}>Continue Shopping</Link>
        </Button>
      </div>
}
    </main>
  );
};

export default CartPage;
