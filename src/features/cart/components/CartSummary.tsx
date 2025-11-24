import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context";
import { Link, useLocation } from "react-router-dom";

const CartSummary = () => {
  const { cartTotal } = useCart();
  const path = useLocation().pathname;
  const isCheckout = path === "/checkout";
  console.log({ isCheckout });

  return (
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
                    Stripe processes VISA, Mastercard, Google Pay and more. 1.5%
                    processing fee will apply to your order.
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
                    Paystack is the preferred payment option for Nigerians and
                    other African countries who want to enjoy mobile money, bank
                    transfer or USSD payment options.
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
          <Button
            asChild
            className="rounded-full text-lg py-6 w-full"
            size={"lg"}
          >
            <Link to={"/checkout"}>Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
